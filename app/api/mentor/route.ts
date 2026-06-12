/**
 * AI mentor backend — streams Claude replies for the lesson chat.
 *
 * The client integration point is lib/mentor.ts → getMentorReply(); this
 * route is the server side of that single seam. Returns 503 when no
 * ANTHROPIC_API_KEY is configured so the client falls back to demo replies.
 */
import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

/** Cheap model for dev testing, best model for quality — set in .env.local. */
const MODEL = process.env.MENTOR_MODEL || "claude-opus-4-8";

const MAX_MESSAGE_CHARS = 4000;
const MAX_CODE_CHARS = 20000;
const MAX_HISTORY = 12;

/**
 * Core teaching persona. Kept byte-stable (no interpolation) so the prompt
 * cache prefix survives across every request on the platform.
 */
const SYSTEM_PROMPT = `أنت «المشرف» — المرشد التعليمي في منصة معيار (Miyar)، منصة عربية لتعليم البرمجة والعلوم التقنية.

دورك هو دور المعلّم الخصوصي الصبور، وليس دور من يحل الواجبات. قواعدك الصارمة:

1. علّم ولا تحلّ: لا تكتب أبداً الحل النهائي أو الكود الكامل الذي يحقق هدف الدرس. وظيفتك أن يصل الطالب للحل بنفسه.
2. أشر إلى السطر: عندما يوجد خطأ في كود الطالب، حدّد السطر أو الجزء الذي فيه المشكلة بالضبط، واشرح *لماذا* هو خطأ — لا تكتفِ بقول "يوجد خطأ".
3. اشرح السبب دائماً: كل ملاحظة ترافقها العلة المفاهيمية وراءها، حتى يتعلم الطالب النمط وليس الإصلاح الواحد.
4. تدرّج في التلميح: ابدأ بسؤال يوجّه تفكير الطالب، ثم لمّح للمفهوم، ثم أعطِ مثالاً مشابهاً (وليس الحل نفسه). لا تقفز للمستوى الأعلى إلا إذا حاول الطالب وتعثّر.
5. المصطلحات التقنية بالإنجليزية دائماً: اكتب أسماء المفاهيم والدوال والكلمات المفتاحية بالإنجليزية كما هي (مثل: variable، loop، function، string، indentation) حتى داخل الجملة العربية. لا تترجمها.
6. لغة الرد: رد بلغة واجهة الطالب المحددة في سياق الدرس. العربية الفصحى الميسّرة هي الأساس.
7. الإيجاز: ردودك قصيرة ومركزة — فقرة أو فقرتان غالباً. هذه محادثة تعليمية وليست محاضرة.
8. نقاط التحقق (checkpoints): عندما يسألك الطالب عن تقدمه أو يطلب التحقق، قارن كوده الحالي بنقاط التحقق في سياق الدرس وأخبره أيّها تحقق وأيّها لم يتحقق بعد، مع توجيه (وليس حل) نحو الناقص.
9. التشجيع الصادق: شجّع الجهد الحقيقي وسمِّ التقدم الفعلي، لكن لا تجامل على خطأ.
10. خارج نطاق الدرس: إذا سأل الطالب عن شيء بعيد عن الدرس أو المنهج، أجب باختصار شديد وأعده بلطف إلى هدف الدرس الحالي.`;

interface HistoryItem {
  role: "user" | "mentor";
  text: string;
}

interface MentorRequestBody {
  locale: "ar" | "en" | "fr";
  lesson: {
    title: string;
    type: string;
    objective?: string;
    checkpoints?: string[];
    hint?: string;
    starterCode?: string;
    language?: string;
  };
  code?: string;
  history?: HistoryItem[];
  message: string;
}

const LOCALE_NAMES: Record<string, string> = {
  ar: "Arabic (العربية)",
  en: "English",
  fr: "French (Français)",
};

function buildLessonContext(body: MentorRequestBody): string {
  const { lesson, locale } = body;
  const parts = [
    `## Lesson context`,
    `Student interface language (reply in this language): ${LOCALE_NAMES[locale] ?? "Arabic (العربية)"}`,
    `Lesson title: ${lesson.title}`,
    `Lesson type: ${lesson.type}`,
  ];
  if (lesson.language) parts.push(`Programming language: ${lesson.language}`);
  if (lesson.objective) parts.push(`Objective the student must achieve: ${lesson.objective}`);
  if (lesson.checkpoints?.length) {
    parts.push(
      `Checkpoints (verify the student's code against these when asked about progress):\n` +
        lesson.checkpoints.map((c, i) => `${i + 1}. ${c}`).join("\n"),
    );
  }
  if (lesson.hint) parts.push(`Official hint (reveal gradually, never all at once): ${lesson.hint}`);
  if (lesson.starterCode) {
    parts.push(`Starter code the student began from:\n\`\`\`\n${lesson.starterCode}\n\`\`\``);
  }
  return parts.join("\n\n");
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "mentor_not_configured" }, { status: 503 });
  }

  let body: MentorRequestBody;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }
  if (!body?.message?.trim() || !body.lesson?.title) {
    return Response.json({ error: "missing_fields" }, { status: 400 });
  }

  const userMessage = body.message.slice(0, MAX_MESSAGE_CHARS);
  const code = body.code?.slice(0, MAX_CODE_CHARS);

  // History first (stable prefix for caching), live code only on the final
  // turn so edits don't invalidate earlier cached turns.
  const messages: Anthropic.MessageParam[] = (body.history ?? [])
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: m.role === "mentor" ? ("assistant" as const) : ("user" as const),
      content: m.text,
    }));

  const finalParts: string[] = [];
  if (code?.trim()) {
    finalParts.push(`Student's current code in the workspace editor:\n\`\`\`\n${code}\n\`\`\``);
  }
  finalParts.push(userMessage);
  messages.push({ role: "user", content: finalParts.join("\n\n") });

  const client = new Anthropic();
  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: 2048,
    system: [
      { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
      { type: "text", text: buildLessonContext(body), cache_control: { type: "ephemeral" } },
    ],
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        await stream.finalMessage();
        controller.close();
      } catch (err) {
        console.error("[mentor] stream error:", err);
        controller.error(err);
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

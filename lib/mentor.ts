/**
 * AI mentor — client side of the single integration point.
 *
 * `getMentorReply` calls the real AI backend (app/api/mentor/route.ts) and
 * streams the reply. When the server has no ANTHROPIC_API_KEY (demo mode)
 * or the request fails, it falls back to the canned demo replies below —
 * the chat keeps working either way.
 */
import type { Lesson, Locale, MentorMessage } from "@/lib/types";

interface MentorContext {
  lesson: Lesson;
  locale: Locale;
  /** student's current code, when in a workspace lesson */
  code?: string;
  /** prior chat turns, oldest first (greeting included) */
  history?: MentorMessage[];
  userMessage: string;
}

const cannedReplies: Record<Locale, string[]> = {
  ar: [
    "سؤال ممتاز! دعني أشرح لك: المفهوم الأساسي في هذا الدرس هو أن كل خطوة تبني على ما قبلها. لاحظ المثال في الدرس — جرّب تغييره بنفسك وأخبرني ماذا حدث.",
    "لاحظت أنك تقترب من الفهم الصحيح. النقطة التي تحتاج انتباهك: راجع السطر الذي يحتوي على الشرط — هل تتحقق من القيمة الصحيحة؟ جرّب وأنا أتابع معك.",
    "أحسنت المحاولة! الخطأ هنا شائع جداً بين المتعلمين: الخلط بين الإسناد (=) والمقارنة (==). الأول يخزّن قيمة، والثاني يسأل سؤالاً. أعد المحاولة بهذا الفهم.",
    "دعني أبسّطها لك بمثال من الحياة: تخيل أنك تعطي تعليمات لصديق خطوة بخطوة. الحاسوب ينفذ تعليماتك حرفياً وبالترتيب — لهذا ترتيب الأسطر مهم جداً.",
    "تقدمك في هذا الدرس جيد. أقترح أن تحل التمرين التالي قبل الانتقال — ملاحظاتي من جلستك السابقة تشير إلى أن هذا المفهوم يحتاج تثبيتاً عملياً.",
  ],
  en: [
    "Excellent question! Let me explain: the core idea in this lesson is that each step builds on the previous one. Look at the lesson's example — try changing it yourself and tell me what happens.",
    "You're getting close to the right understanding. The point that needs your attention: re-check the line with the condition — are you testing the right value? Try it and I'll follow along.",
    "Good attempt! This mistake is very common: mixing up assignment (=) and comparison (==). The first stores a value; the second asks a question. Try again with that in mind.",
    "Let me simplify with a real-life example: imagine giving a friend step-by-step instructions. The computer executes your instructions literally and in order — that's why line order matters so much.",
    "Your progress in this lesson is good. I suggest solving the next exercise before moving on — my notes from your last session show this concept needs hands-on reinforcement.",
  ],
  fr: [
    "Excellente question ! Laissez-moi expliquer : l'idée centrale de cette leçon est que chaque étape s'appuie sur la précédente. Regardez l'exemple — modifiez-le vous-même et dites-moi ce qui se passe.",
    "Vous approchez de la bonne compréhension. Le point à vérifier : relisez la ligne avec la condition — testez-vous la bonne valeur ? Essayez, je vous suis.",
    "Bonne tentative ! Cette erreur est très courante : confondre l'affectation (=) et la comparaison (==). La première stocke une valeur ; la seconde pose une question. Réessayez avec ça en tête.",
    "Simplifions avec un exemple concret : imaginez donner des instructions à un ami, étape par étape. L'ordinateur exécute vos instructions littéralement et dans l'ordre — voilà pourquoi l'ordre des lignes compte.",
    "Votre progrès dans cette leçon est bon. Je suggère de résoudre le prochain exercice avant de continuer — mes notes de votre dernière session montrent que ce concept demande de la pratique.",
  ],
};

const greetings: Record<Locale, (lessonTitle: string) => string> = {
  ar: (t) =>
    `أهلاً بك في درس «${t}». أنا مشرفك في هذه الجلسة — أتابع ما تكتبه وأتدخل عندما تحتاجني. اسألني أي شيء، أو ابدأ الدرس وسأكون معك خطوة بخطوة.`,
  en: (t) =>
    `Welcome to "${t}". I'm your mentor for this session — I follow what you write and step in when you need me. Ask me anything, or start the lesson and I'll be with you step by step.`,
  fr: (t) =>
    `Bienvenue dans « ${t} ». Je suis votre mentor pour cette session — je suis ce que vous écrivez et j'interviens quand vous en avez besoin. Demandez-moi tout, ou commencez la leçon.`,
};

export function getMentorGreeting(lessonTitle: string, locale: Locale): string {
  return greetings[locale](lessonTitle);
}

/** Demo-mode reply with a small delay to feel like real thinking. */
async function getDemoReply(ctx: MentorContext): Promise<string> {
  await new Promise((r) => setTimeout(r, 900 + Math.random() * 800));
  const pool = cannedReplies[ctx.locale];
  // Deterministic-ish pick so the same question doesn't repeat the same answer
  const idx =
    (ctx.userMessage.length + ctx.lesson.id.length + Date.now()) % pool.length;
  return pool[idx];
}

/**
 * Ask the AI mentor. Streams the reply through `onDelta` (called with the
 * accumulated text so far) and resolves with the full text. Falls back to
 * demo replies when the backend is not configured or unreachable.
 */
export async function getMentorReply(
  ctx: MentorContext,
  onDelta?: (textSoFar: string) => void,
): Promise<string> {
  const { lesson, locale } = ctx;
  try {
    const res = await fetch("/api/mentor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        locale,
        lesson: {
          title: lesson.title[locale],
          type: lesson.type,
          language: lesson.language,
          objective: lesson.objective?.[locale],
          checkpoints: lesson.checkpoints?.map((c) => c.text[locale]),
          hint: lesson.hint?.[locale],
          starterCode: lesson.starterCode,
        },
        code: ctx.code,
        history: ctx.history?.map((m) => ({ role: m.role, text: m.text })),
        message: ctx.userMessage,
      }),
    });

    // 503 = no API key on the server → demo mode, by design
    if (res.status === 503) return getDemoReply(ctx);
    if (!res.ok || !res.body) throw new Error(`mentor api ${res.status}`);

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let full = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      full += decoder.decode(value, { stream: true });
      if (full) onDelta?.(full);
    }
    return full || getDemoReply(ctx);
  } catch {
    return getDemoReply(ctx);
  }
}

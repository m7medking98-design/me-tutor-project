/**
 * Checkpoint verification — grades the student's code against the lesson
 * checkpoints when they hit Run. Returns per-checkpoint pass/fail as JSON.
 * Cheap by design: small prompt, JSON-only answer, same model env var as
 * the mentor. Returns 503 when no ANTHROPIC_API_KEY (demo mode: the task
 * panel simply stays manual/empty).
 */
import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

const MODEL = process.env.MENTOR_MODEL || "claude-opus-4-8";

const MAX_CODE_CHARS = 20000;
const MAX_OUTPUT_LINES = 50;

const SYSTEM_PROMPT = `You are an automated grader for a programming learning platform. You receive a lesson objective, a list of checkpoints, the student's code, and the program output from their latest run.

For each checkpoint decide whether the student's code (and its output) genuinely satisfies it.

Rules:
- Be strict but fair: the checkpoint must actually be achieved, not just attempted.
- Checkpoints about running the code or confirming output count as passed when the relevant output is present.
- Judge only from the provided code and output. Never invent evidence.
- Return one result per checkpoint, covering every checkpoint exactly once, using each checkpoint's exact id.`;

/** Guarantees the response shape via structured outputs — no JSON parsing gambles. */
const RESULT_SCHEMA = {
  type: "object" as const,
  properties: {
    results: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const },
          passed: { type: "boolean" as const },
        },
        required: ["id", "passed"],
        additionalProperties: false,
      },
    },
  },
  required: ["results"],
  additionalProperties: false,
};

interface VerifyRequestBody {
  lesson: {
    objective?: string;
    language?: string;
    checkpoints: { id: string; text: string }[];
  };
  code: string;
  /** stdout/stderr lines from the run (empty for HTML lessons) */
  output?: string[];
  hasError?: boolean;
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "verify_not_configured" }, { status: 503 });
  }

  let body: VerifyRequestBody;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }
  const checkpoints = body?.lesson?.checkpoints ?? [];
  if (!body?.code?.trim() || checkpoints.length === 0) {
    return Response.json({ error: "missing_fields" }, { status: 400 });
  }

  const parts = [
    body.lesson.objective ? `Lesson objective: ${body.lesson.objective}` : null,
    body.lesson.language ? `Language: ${body.lesson.language}` : null,
    `Checkpoints:\n${checkpoints.map((c) => `- id "${c.id}": ${c.text}`).join("\n")}`,
    `Student code:\n\`\`\`\n${body.code.slice(0, MAX_CODE_CHARS)}\n\`\`\``,
    `Program output from the latest run${body.hasError ? " (the run ended with an error)" : ""}:\n${
      body.output?.length
        ? body.output.slice(0, MAX_OUTPUT_LINES).join("\n")
        : "(no output)"
    }`,
  ].filter(Boolean);

  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: parts.join("\n\n") }],
      output_config: { format: { type: "json_schema", schema: RESULT_SCHEMA } },
    });

    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("");
    const parsed = JSON.parse(text);
    const results = Array.isArray(parsed?.results) ? parsed.results : [];
    if (results.length === 0) {
      console.warn("[verify] empty results from model. Raw:", text.slice(0, 500));
    }

    // Only return statuses for checkpoints we actually know about
    const known = new Set(checkpoints.map((c) => c.id));
    const clean = results
      .filter((r: { id?: string }) => r?.id && known.has(r.id))
      .map((r: { id: string; passed?: boolean }) => ({ id: r.id, passed: Boolean(r.passed) }));

    return Response.json({ results: clean });
  } catch (err) {
    console.error("[verify] error:", err);
    return Response.json({ error: "verification_failed" }, { status: 502 });
  }
}

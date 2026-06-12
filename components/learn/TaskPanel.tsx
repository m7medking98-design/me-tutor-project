"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Check, Lightbulb, Loader2, Target } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { RichMarkdown } from "@/components/learn/Markdown";
import { useLanguage } from "@/lib/language-context";
import type { Lesson } from "@/lib/types";

export type CheckStatus = "passed" | "warning" | "pending";

/**
 * Lesson task panel: objective + checkpoints + hint.
 * Checkpoints are verified automatically by the AI when the student hits
 * Run (statuses come from the learn page via /api/verify): green check =
 * achieved, orange warning = the run had an error, empty = not yet done.
 * In demo mode (no statuses ever arrive) checkpoints stay manually
 * clickable.
 */
export function TaskPanel({
  lesson,
  statuses,
  verifying,
}: {
  lesson: Lesson;
  /** auto-verification result per checkpoint id; undefined until the first Run */
  statuses?: Record<string, CheckStatus>;
  verifying?: boolean;
}) {
  const { t, loc } = useLanguage();
  const [manualDone, setManualDone] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState(false);

  // Reset state when navigating between lessons
  useEffect(() => {
    setManualDone({});
    setShowHint(false);
  }, [lesson.id]);

  if (!lesson.objective) return null;
  const checkpoints = lesson.checkpoints ?? [];
  const autoMode = Boolean(statuses && Object.keys(statuses).length > 0);

  const statusOf = (id: string): CheckStatus => {
    if (autoMode) return statuses?.[id] ?? "pending";
    return manualDone[id] ? "passed" : "pending";
  };
  const completed = checkpoints.filter((c) => statusOf(c.id) === "passed").length;
  const hasWarning = checkpoints.some((c) => statusOf(c.id) === "warning");

  return (
    <Card className="border-accent/25 p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
          <Target className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-ink">{t("learn.taskTitle")}</h3>
          <div className="mt-1 text-sm leading-relaxed text-muted">
            <RichMarkdown text={loc(lesson.objective)} />
          </div>
        </div>
      </div>

      {checkpoints.length > 0 && (
        <div className="mt-4">
          <p className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted">
            <span className="flex items-center gap-2">
              {t("learn.checkpoints")}
              {verifying && (
                <span className="flex items-center gap-1 font-normal normal-case tracking-normal text-primary dark:text-primary-strong">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  {t("learn.verifying")}
                </span>
              )}
            </span>
            <span className="font-mono">
              {completed}/{checkpoints.length}
            </span>
          </p>
          <ul className="mt-2.5 space-y-1.5">
            {checkpoints.map((cp, i) => {
              const status = statusOf(cp.id);
              return (
                <li key={cp.id}>
                  <button
                    onClick={() =>
                      !autoMode &&
                      setManualDone((d) => ({ ...d, [cp.id]: !d[cp.id] }))
                    }
                    className={`flex w-full items-start gap-2.5 rounded-lg px-2 py-1.5 text-start transition-colors ${
                      autoMode ? "cursor-default" : "hover:bg-surface-2"
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-all ${
                        status === "passed"
                          ? "border-success bg-success text-white"
                          : status === "warning"
                            ? "border-warning bg-warning/15 text-warning"
                            : "border-line/30 text-transparent"
                      }`}
                    >
                      {status === "warning" ? (
                        <AlertTriangle className="h-3 w-3" strokeWidth={2.5} />
                      ) : (
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      )}
                    </span>
                    <span
                      className={`text-sm leading-relaxed ${
                        status === "passed"
                          ? "text-muted line-through decoration-success/50"
                          : "text-ink"
                      }`}
                    >
                      <span className="me-1">{i + 1}.</span>
                      <span className="[&>p]:inline">
                        <RichMarkdown text={loc(cp.text)} />
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-2 px-2 text-[11px] text-muted">
            {hasWarning ? (
              <span className="text-warning">{t("learn.fixErrorFirst")}</span>
            ) : (
              t("learn.checkpointsAuto")
            )}
          </p>
        </div>
      )}

      {lesson.hint && (
        <div className="mt-3 border-t border-line/10 pt-3">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 text-xs font-semibold text-accent transition-opacity hover:opacity-80"
          >
            <Lightbulb className="h-3.5 w-3.5" />
            {showHint ? t("learn.hideHint") : t("learn.showHint")}
          </button>
          {showHint && (
            <div className="mt-2 rounded-xl bg-accent/10 px-4 py-3 text-sm leading-relaxed text-ink">
              <RichMarkdown text={loc(lesson.hint)} />
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

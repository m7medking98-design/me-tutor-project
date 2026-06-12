"use client";

import { useEffect, useState } from "react";
import { Check, Lightbulb, Target } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/lib/language-context";
import type { Lesson } from "@/lib/types";

/**
 * Lesson task panel: objective + self-check checkpoints + hint.
 * In phase 2 the AI mentor verifies these checkpoints against the
 * student's actual code instead of relying on self-checking.
 */
export function TaskPanel({ lesson }: { lesson: Lesson }) {
  const { t, loc } = useLanguage();
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState(false);

  // Reset state when navigating between lessons
  useEffect(() => {
    setDone({});
    setShowHint(false);
  }, [lesson.id]);

  if (!lesson.objective) return null;
  const checkpoints = lesson.checkpoints ?? [];
  const completed = checkpoints.filter((c) => done[c.id]).length;

  return (
    <Card className="border-accent/25 p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
          <Target className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-ink">{t("learn.taskTitle")}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">{loc(lesson.objective)}</p>
        </div>
      </div>

      {checkpoints.length > 0 && (
        <div className="mt-4">
          <p className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted">
            {t("learn.checkpoints")}
            <span className="font-mono">
              {completed}/{checkpoints.length}
            </span>
          </p>
          <ul className="mt-2.5 space-y-1.5">
            {checkpoints.map((cp, i) => {
              const checked = Boolean(done[cp.id]);
              return (
                <li key={cp.id}>
                  <button
                    onClick={() => setDone((d) => ({ ...d, [cp.id]: !checked }))}
                    className="flex w-full items-start gap-2.5 rounded-lg px-2 py-1.5 text-start transition-colors hover:bg-surface-2"
                  >
                    <span
                      className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-all ${
                        checked
                          ? "border-accent bg-accent text-[#1a1205]"
                          : "border-line/30 text-transparent"
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span
                      className={`text-sm leading-relaxed ${
                        checked ? "text-muted line-through decoration-accent/50" : "text-ink"
                      }`}
                    >
                      {i + 1}. {loc(cp.text)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
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
            <p className="mt-2 rounded-xl bg-accent/10 px-4 py-3 text-sm leading-relaxed text-ink">
              {loc(lesson.hint)}
            </p>
          )}
        </div>
      )}
    </Card>
  );
}

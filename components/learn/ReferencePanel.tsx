"use client";

import { FileText } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { Lesson } from "@/lib/types";
import { RichMarkdown } from "@/components/learn/Markdown";

/** Typeset reading view. Renders authored markdown when present, else a TOC placeholder. */
export function ReferencePanel({ lesson }: { lesson: Lesson }) {
  const { t, loc } = useLanguage();
  const sections = lesson.sections ?? [];

  // Authored curriculum content: render the full markdown body.
  if (lesson.body) {
    return (
      <article className="min-w-0 max-w-3xl">
        <h2 className="text-2xl font-bold text-ink">{loc(lesson.title)}</h2>
        <div className="mt-6 text-[15px] leading-7 text-ink/90">
          <RichMarkdown text={loc(lesson.body)} />
        </div>
      </article>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <h3 className="text-xs font-bold uppercase tracking-wide text-muted">
          {t("learn.tableOfContents")}
        </h3>
        <nav className="mt-3 space-y-1 border-s-2 border-line/15">
          {sections.map((s, i) => (
            <a
              key={s.en}
              href={`#section-${i}`}
              className="block border-s-2 border-transparent px-3 py-1.5 text-sm text-muted transition-colors hover:border-primary hover:text-ink"
              style={{ marginInlineStart: "-2px" }}
            >
              {loc(s)}
            </a>
          ))}
        </nav>
      </aside>

      <article className="min-w-0">
        <h2 className="text-2xl font-bold text-ink">{loc(lesson.title)}</h2>
        {sections.map((s, i) => (
          <section key={s.en} id={`section-${i}`} className="mt-8">
            <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
              <FileText className="h-4 w-4 text-primary dark:text-primary-strong" />
              {loc(s)}
            </h3>
            {/* Placeholder paragraphs until the curriculum phase fills real content */}
            <div className="mt-3 space-y-2.5">
              <div className="h-3.5 w-full rounded bg-surface-2" />
              <div className="h-3.5 w-[92%] rounded bg-surface-2" />
              <div className="h-3.5 w-[96%] rounded bg-surface-2" />
              <div className="h-3.5 w-2/3 rounded bg-surface-2" />
            </div>
            {i === 1 && (
              <div className="mt-4 rounded-xl bg-[#0b1416] p-4 font-mono text-[13px] leading-6 text-[#d6e7e9]" dir="ltr">
                <span className="text-[#7fd6c2]">name</span> = <span className="text-accent">&quot;Miyar&quot;</span>
                <br />
                <span className="text-[#9ab8f3]">print</span>(name)
              </div>
            )}
          </section>
        ))}
      </article>
    </div>
  );
}

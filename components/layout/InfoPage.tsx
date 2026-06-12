"use client";

/**
 * Shared layout for long-form content pages (about, privacy, terms).
 * Pages pass trilingual sections; rendering and typography live here once.
 */
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/lib/language-context";
import type { L10n } from "@/lib/types";

export interface InfoSection {
  title: L10n;
  paragraphs: L10n[];
  bullets?: L10n[];
}

export function InfoPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: L10n;
  intro: L10n;
  /** ISO date of last revision (shown on legal pages) */
  updated?: string;
  sections: InfoSection[];
}) {
  const { t, loc } = useLanguage();

  return (
    <>
      <main className="mx-auto min-h-[70vh] max-w-3xl px-4 py-14 sm:px-6">
        <header>
          <h1 className="text-3xl font-bold text-ink sm:text-4xl">{loc(title)}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{loc(intro)}</p>
          {updated && (
            <p className="mt-3 text-xs text-muted/70">
              {t("info.lastUpdated")}: {updated}
            </p>
          )}
        </header>

        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <section key={s.title.en}>
              <h2 className="text-xl font-bold text-ink">{loc(s.title)}</h2>
              {s.paragraphs.map((p) => (
                <p key={p.en} className="mt-3 leading-relaxed text-muted">
                  {loc(p)}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-3 space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b.en} className="flex items-start gap-2.5 leading-relaxed text-muted">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      {loc(b)}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

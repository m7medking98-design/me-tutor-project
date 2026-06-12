"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CourseCard } from "@/components/courses/CourseCard";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/lib/language-context";
import { getCourses } from "@/lib/data";
import { useEnrollments } from "@/lib/data/student-context";
import { localeMeta } from "@/lib/language-context";
import type { CourseLevel, Locale, SubjectCategory } from "@/lib/types";

const CATEGORIES: SubjectCategory[] = ["programming", "math", "physics", "engineering", "data"];
const LEVELS: CourseLevel[] = ["beginner", "intermediate", "advanced"];
const LANGS: Locale[] = ["ar", "en", "fr"];

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
        active
          ? "bg-primary text-white shadow-sm shadow-primary/25"
          : "bg-surface text-muted card-line hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

export default function CoursesPage() {
  const { t, loc } = useLanguage();
  const { enrollments } = useEnrollments();

  const [category, setCategory] = useState<SubjectCategory | null>(null);
  const [level, setLevel] = useState<CourseLevel | null>(null);
  const [lang, setLang] = useState<Locale | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return getCourses().filter((c) => {
      if (category && c.category !== category) return false;
      if (level && c.level !== level) return false;
      if (lang && !c.languages.includes(lang)) return false;
      if (query) {
        const q = query.toLowerCase();
        const hit =
          c.title.ar.includes(query) ||
          c.title.en.toLowerCase().includes(q) ||
          c.title.fr.toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    });
  }, [category, level, lang, query]);

  return (
    <>
      <main className="mx-auto min-h-[70vh] max-w-7xl px-4 py-12 sm:px-6">
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-ink sm:text-4xl">{t("courses.title")}</h1>
            <p className="mt-2 text-muted">{t("courses.subtitle")}</p>
          </div>
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("common.search")}
              className="w-full rounded-xl border border-line/20 bg-surface py-2.5 pe-4 ps-10 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </header>

        {/* Filters */}
        <div className="mt-8 space-y-3 rounded-2xl border border-line/10 bg-surface/60 p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="me-1 text-xs font-semibold uppercase tracking-wide text-muted">
              {t("courses.filterSubject")}
            </span>
            <FilterChip active={category === null} onClick={() => setCategory(null)}>
              {t("courses.filterAll")}
            </FilterChip>
            {CATEGORIES.map((c) => (
              <FilterChip key={c} active={category === c} onClick={() => setCategory(category === c ? null : c)}>
                {t(`courses.${c}`)}
              </FilterChip>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="me-1 text-xs font-semibold uppercase tracking-wide text-muted">
              {t("courses.filterLevel")}
            </span>
            <FilterChip active={level === null} onClick={() => setLevel(null)}>
              {t("courses.filterAll")}
            </FilterChip>
            {LEVELS.map((l) => (
              <FilterChip key={l} active={level === l} onClick={() => setLevel(level === l ? null : l)}>
                {t(`common.${l}`)}
              </FilterChip>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="me-1 text-xs font-semibold uppercase tracking-wide text-muted">
              {t("courses.filterLanguage")}
            </span>
            <FilterChip active={lang === null} onClick={() => setLang(null)}>
              {t("courses.filterAll")}
            </FilterChip>
            {LANGS.map((l) => (
              <FilterChip key={l} active={lang === l} onClick={() => setLang(lang === l ? null : l)}>
                {localeMeta[l].label}
              </FilterChip>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="mt-20 text-center text-muted">{t("courses.noResults")}</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course) => {
              const enrollment = enrollments.find((e) => e.courseId === course.id);
              return (
                <CourseCard key={course.id} course={course} progress={enrollment?.progress} />
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

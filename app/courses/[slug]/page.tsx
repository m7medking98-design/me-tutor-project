"use client";

import { notFound, useParams } from "next/navigation";
import {
  BookOpen,
  Bot,
  CheckCircle2,
  Clock,
  FileText,
  Play,
  SquareTerminal,
  Star,
  Users,
} from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import { getCourseBySlug, getEnrollment, getLessonSequence } from "@/lib/data";
import type { LessonType } from "@/lib/types";

const lessonIcons: Record<LessonType, typeof Play> = {
  video: Play,
  workspace: SquareTerminal,
  reference: FileText,
};

export default function CourseDetailPage() {
  const params = useParams<{ slug: string }>();
  const { t, loc } = useLanguage();
  const { user } = useAuth();

  const course = getCourseBySlug(params.slug);
  if (!course) notFound();

  const enrollment = user ? getEnrollment(user.uid, course.id) : undefined;
  const lessonCount = getLessonSequence(course).length;
  const firstLesson = getLessonSequence(course)[0]?.lesson;
  const continueSlug = enrollment?.lastLessonSlug ?? firstLesson?.slug;

  return (
    <>
      <main className="min-h-[70vh]">
        {/* Header band */}
        <div className={`relative overflow-hidden bg-gradient-to-br ${course.gradient}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_10%,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
            <div className="flex flex-wrap gap-2">
              <Badge tone="gold">{t(`common.${course.level}`)}</Badge>
              <Badge tone="muted" className="bg-black/30 text-white">
                {t(`courses.${course.category}`)}
              </Badge>
              {course.certificate && (
                <Badge tone="muted" className="bg-black/30 text-white">
                  ✦ {t("common.certificate")}
                </Badge>
              )}
            </div>
            <h1 className="mt-4 max-w-2xl text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {loc(course.title)}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85">
              {loc(course.tagline)}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" /> {lessonCount} {t("common.lessons")}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {course.totalHours} {t("common.hours")}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" /> {course.enrolledCount.toLocaleString()} {t("common.students")}
              </span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <Star className="h-4 w-4 fill-current" /> {course.rating}
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px]">
          {/* Left: description + syllabus */}
          <div>
            <section>
              <h2 className="text-xl font-bold text-ink">{t("courses.aboutCourse")}</h2>
              <p className="mt-3 leading-relaxed text-muted">{loc(course.description)}</p>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-bold text-ink">{t("courses.outcomes")}</h2>
              <ul className="mt-4 space-y-3">
                {course.outcomes.map((o) => (
                  <li key={o.en} className="flex items-start gap-2.5 text-ink">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    {loc(o)}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-bold text-ink">
                {t("courses.syllabus")}{" "}
                <span className="text-sm font-normal text-muted">
                  ({course.modules.length} {t("courses.modules")})
                </span>
              </h2>
              <div className="mt-4">
                <Accordion
                  items={course.modules.map((mod, mi) => ({
                    id: mod.id,
                    title: (
                      <span className="flex items-center gap-3">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-xs font-bold text-primary dark:text-primary-strong">
                          {mi + 1}
                        </span>
                        {loc(mod.title)}
                      </span>
                    ),
                    content: (
                      <ul className="space-y-1">
                        {mod.lessons.map((lesson) => {
                          const Icon = lessonIcons[lesson.type];
                          const done = enrollment?.completedLessonIds.includes(lesson.id);
                          return (
                            <li
                              key={lesson.id}
                              className="flex items-center justify-between gap-3 rounded-lg px-2 py-2"
                            >
                              <span className="flex items-center gap-2.5 text-sm text-ink">
                                <Icon className="h-4 w-4 text-muted" />
                                {loc(lesson.title)}
                                {done && <CheckCircle2 className="h-3.5 w-3.5 text-success" />}
                              </span>
                              <span className="flex items-center gap-2 text-xs text-muted">
                                <Badge tone="muted">{t(`common.${lesson.type}`)}</Badge>
                                {lesson.durationMin} {t("common.minutes")}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    ),
                  }))}
                />
              </div>
            </section>
          </div>

          {/* Right: enroll card + mentor note */}
          <aside className="space-y-5 lg:-mt-28">
            <Card className="p-6 shadow-xl">
              {enrollment ? (
                <>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-muted">{t("courses.yourProgress")}</span>
                    <span className="font-bold text-primary dark:text-primary-strong">
                      {enrollment.progress}%
                    </span>
                  </div>
                  <ProgressBar value={enrollment.progress} />
                  <Button
                    href={`/learn/${course.slug}/${continueSlug}`}
                    variant="gold"
                    size="lg"
                    className="mt-5 w-full"
                  >
                    {t("courses.continueLearning")}
                  </Button>
                </>
              ) : (
                <Button
                  href={user ? `/learn/${course.slug}/${continueSlug}` : "/signup"}
                  variant="gold"
                  size="lg"
                  className="w-full"
                >
                  {t("courses.enrollNow")}
                </Button>
              )}
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary dark:text-primary-strong">
                  <Bot className="h-5 w-5" />
                </span>
                <h3 className="font-bold text-ink">{t("courses.mentorNote")}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t("courses.mentorNoteDesc")}
              </p>
            </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

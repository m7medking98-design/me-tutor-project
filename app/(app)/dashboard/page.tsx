"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  Flame,
  Play,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatCard } from "@/components/ui/StatCard";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import {
  getCourseById,
  getMastery,
  getMilestones,
  getSessions,
} from "@/lib/data";
import { useEnrollments } from "@/lib/data/student-context";

const WEEKDAYS = {
  ar: ["س", "ح", "ن", "ث", "ر", "خ", "ج"],
  en: ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"],
  fr: ["Sa", "Di", "Lu", "Ma", "Me", "Je", "Ve"],
};

export default function DashboardPage() {
  const { t, loc, locale, dir } = useLanguage();
  const { user } = useAuth();
  const { enrollments } = useEnrollments();
  if (!user) return null; // AuthGuard handles redirect

  const sessions = getSessions(user.uid).slice(0, 3);
  const weakAreas = getMastery(user.uid)
    .filter((m) => m.mastery > 0 && m.mastery < 65)
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, 3);
  const milestones = getMilestones(user.uid);

  const lastEnrollment = [...enrollments].sort((a, b) =>
    b.lastActivityAt.localeCompare(a.lastActivityAt)
  )[0];
  const lastCourse = lastEnrollment && getCourseById(lastEnrollment.courseId);

  const xpInLevel = user.xp % 500;
  const maxWeekly = Math.max(...user.weeklyActivity, 1);
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">
        {t("dashboard.welcome")}{" "}
        <span className="text-gold-gradient">{user.displayName.split(" ")[0]}</span> 👋
      </h1>

      {/* Continue learning hero */}
      {lastCourse && (
        <Card className="relative mt-8 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${lastCourse.gradient} opacity-[0.08]`} />
          <div className="relative flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-sm font-medium text-accent">
                <Sparkles className="h-4 w-4" /> {t("dashboard.continueTitle")}
              </p>
              <h2 className="mt-2 text-xl font-bold text-ink sm:text-2xl">
                {loc(lastCourse.title)}
              </h2>
              <div className="mt-3 max-w-md">
                <div className="mb-1.5 flex justify-between text-xs text-muted">
                  <span>{t("courses.yourProgress")}</span>
                  <span className="font-semibold text-primary dark:text-primary-strong">
                    {lastEnrollment.progress}%
                  </span>
                </div>
                <ProgressBar value={lastEnrollment.progress} />
              </div>
            </div>
            <Button
              href={`/learn/${lastCourse.slug}/${lastEnrollment.lastLessonSlug}`}
              variant="gold"
              size="lg"
              className="shrink-0"
            >
              <Play className="h-4 w-4" /> {t("common.continue")}
            </Button>
          </div>
        </Card>
      )}

      {/* Stats row */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={<Flame className="h-5 w-5" />}
          label={t("dashboard.streakTitle")}
          value={
            <>
              {user.streakDays}{" "}
              <span className="text-base font-medium text-muted">{t("dashboard.streak")}</span>
            </>
          }
          gold
        />
        <StatCard
          icon={<Trophy className="h-5 w-5" />}
          label={t("dashboard.xpTitle")}
          value={user.xp.toLocaleString()}
          sub={
            <div className="mt-2 w-40">
              <div className="mb-1 flex justify-between text-[10px]">
                <span>
                  {t("dashboard.levelLabel")} {user.level}
                </span>
                <span>
                  {500 - xpInLevel} {t("dashboard.toNextLevel")}
                </span>
              </div>
              <ProgressBar value={(xpInLevel / 500) * 100} gold className="h-1.5" />
            </div>
          }
        />
        <Card className="p-5 sm:col-span-2 lg:col-span-1">
          <p className="text-sm text-muted">{t("dashboard.weeklyActivity")}</p>
          <div className="mt-4 flex h-20 items-end justify-between gap-2">
            {user.weeklyActivity.map((min, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                <div
                  className={`w-full rounded-md transition-all ${
                    min > 0 ? "bg-primary/70" : "bg-surface-2"
                  }`}
                  style={{ height: `${Math.max(8, (min / maxWeekly) * 100)}%` }}
                  title={`${min} ${t("dashboard.minutesStudied")}`}
                />
                <span className="text-[10px] text-muted">
                  {WEEKDAYS[locale][i]}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          {/* Active courses */}
          <section>
            <h2 className="text-lg font-bold text-ink">{t("dashboard.activeCourses")}</h2>
            <div className="mt-4 space-y-4">
              {enrollments.length === 0 && (
                <Card className="flex flex-col items-center gap-4 p-8 text-center">
                  <p className="text-sm text-muted">{t("dashboard.emptyCourses")}</p>
                  <Button href="/courses" variant="gold">
                    {t("dashboard.browseCourses")}
                  </Button>
                </Card>
              )}
              {enrollments.map((enr) => {
                const course = getCourseById(enr.courseId);
                if (!course) return null;
                return (
                  <Link
                    key={enr.courseId}
                    href={`/learn/${course.slug}/${enr.lastLessonSlug}`}
                    className="block"
                  >
                    <Card hover className="flex items-center gap-4 p-5">
                      <span
                        className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${course.gradient} text-white`}
                      >
                        <Play className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-ink">{loc(course.title)}</h3>
                        <div className="mt-2 flex items-center gap-3">
                          <ProgressBar value={enr.progress} className="flex-1" />
                          <span className="shrink-0 text-xs font-semibold text-primary dark:text-primary-strong">
                            {enr.progress}%
                          </span>
                        </div>
                      </div>
                      <Arrow className="h-4 w-4 shrink-0 text-muted" />
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Recent sessions */}
          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-ink">{t("dashboard.recentSessions")}</h2>
              <Link
                href="/progress"
                className="text-sm font-medium text-primary hover:underline dark:text-primary-strong"
              >
                {t("common.viewAll")}
              </Link>
            </div>
            <div className="mt-4 space-y-4">
              {sessions.length === 0 && (
                <Card className="p-6 text-center">
                  <p className="text-sm text-muted">{t("dashboard.emptySessions")}</p>
                </Card>
              )}
              {sessions.map((s) => {
                const course = getCourseById(s.courseId);
                return (
                  <Card key={s.id} className="p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-ink">{loc(s.lessonTitle)}</h3>
                        <p className="mt-0.5 text-xs text-muted">
                          {course ? loc(course.title) : ""} · {s.date} · {s.durationMin}{" "}
                          {t("dashboard.minutesStudied")}
                        </p>
                      </div>
                      <Badge tone="gold">+{s.xpEarned} XP</Badge>
                    </div>
                    <p className="mt-3 rounded-xl bg-primary/5 px-4 py-3 text-sm leading-relaxed text-muted">
                      <span className="font-semibold text-primary dark:text-primary-strong">
                        {t("dashboard.mentorSummary")}:
                      </span>{" "}
                      {loc(s.aiSummary)}
                    </p>
                  </Card>
                );
              })}
            </div>
          </section>
        </div>

        <div className="space-y-10">
          {/* Weak areas — hidden until the mentor has analysis to show */}
          {weakAreas.length > 0 && (
          <section>
            <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
              <AlertTriangle className="h-4 w-4 text-accent" />
              {t("dashboard.weakAreas")}
            </h2>
            <p className="mt-1 text-xs text-muted">{t("dashboard.weakAreasDesc")}</p>
            <div className="mt-4 space-y-3">
              {weakAreas.map((m) => {
                const course = getCourseById(m.courseId);
                return (
                  <Card key={m.topicId} className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-ink">{loc(m.topic)}</h3>
                      <span className="text-xs font-bold text-accent">{m.mastery}%</span>
                    </div>
                    <ProgressBar value={m.mastery} gold className="mt-2 h-1.5" />
                    <p className="mt-2.5 text-xs leading-relaxed text-muted">{loc(m.aiNote)}</p>
                    {course && (
                      <Link
                        href={`/courses/${course.slug}`}
                        className="mt-2 inline-block text-xs font-semibold text-primary hover:underline dark:text-primary-strong"
                      >
                        {t("dashboard.reviewNow")} ←
                      </Link>
                    )}
                  </Card>
                );
              })}
            </div>
          </section>
          )}

          {/* Milestones — hidden until real assessments exist */}
          {milestones.length > 0 && (
          <section>
            <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
              <CalendarClock className="h-4 w-4 text-primary dark:text-primary-strong" />
              {t("dashboard.upcomingMilestones")}
            </h2>
            <div className="mt-4 space-y-3">
              {milestones.map((ms) => {
                const course = getCourseById(ms.courseId);
                return (
                  <Card key={ms.id} className="p-4">
                    <h3 className="text-sm font-semibold text-ink">{loc(ms.title)}</h3>
                    <p className="mt-1 text-xs text-muted">
                      {course ? loc(course.title) : ""} · <span className="text-accent">{loc(ms.due)}</span>
                    </p>
                  </Card>
                );
              })}
            </div>
          </section>
          )}
        </div>
      </div>
    </main>
  );
}

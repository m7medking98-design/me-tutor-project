"use client";

import {
  Award,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock,
  Lock,
  ThumbsUp,
  TrendingDown,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatCard } from "@/components/ui/StatCard";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import {
  getCertificates,
  getCourseById,
  getLessonSequence,
  getMastery,
  getSessions,
} from "@/lib/data";
import { useEnrollments } from "@/lib/data/student-context";

/** mastery 0..100 → heat color (surface → teal → gold at the top end) */
function heatStyle(mastery: number): React.CSSProperties {
  if (mastery >= 85) return { background: "rgb(var(--accent) / 0.85)", color: "#1a1205" };
  if (mastery >= 65) return { background: "rgb(var(--primary) / 0.75)", color: "white" };
  if (mastery >= 40) return { background: "rgb(var(--primary) / 0.35)" };
  if (mastery > 0) return { background: "rgb(var(--primary) / 0.15)" };
  return { background: "rgb(var(--surface-2))" };
}

export default function ProgressPage() {
  const { t, loc } = useLanguage();
  const { user } = useAuth();
  const { enrollments } = useEnrollments();
  if (!user) return null;

  const mastery = getMastery(user.uid);
  const sessions = getSessions(user.uid);
  const certificates = getCertificates(user.uid);

  const strong = mastery.filter((m) => m.mastery >= 65).sort((a, b) => b.mastery - a.mastery);
  const weak = mastery
    .filter((m) => m.mastery > 0 && m.mastery < 65)
    .sort((a, b) => a.mastery - b.mastery);

  const totalMinutes = sessions.reduce((acc, s) => acc + s.durationMin, 0);
  const completedLessonsTotal = enrollments.reduce(
    (acc, e) => acc + e.completedLessonIds.length,
    0
  );
  // time per course (mock: sum of session durations)
  const timePerCourse = enrollments.map((e) => {
    const course = getCourseById(e.courseId);
    const minutes = sessions
      .filter((s) => s.courseId === e.courseId)
      .reduce((acc, s) => acc + s.durationMin, 0);
    return { course, minutes };
  });
  const maxMinutes = Math.max(...timePerCourse.map((tp) => tp.minutes), 1);

  // group mastery by course for the heatmap
  const byCourse = new Map<string, typeof mastery>();
  for (const m of mastery) {
    const list = byCourse.get(m.courseId) ?? [];
    list.push(m);
    byCourse.set(m.courseId, list);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header>
        <h1 className="text-3xl font-bold text-ink">{t("progressPage.title")}</h1>
        <p className="mt-2 text-muted">{t("progressPage.subtitle")}</p>
      </header>

      {/* Summary stats */}
      <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
        <StatCard
          icon={<BookOpen className="h-5 w-5" />}
          label={t("progressPage.enrolledTracks")}
          value={enrollments.length}
        />
        <StatCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          label={t("progressPage.completedLessons")}
          value={completedLessonsTotal}
          gold
        />
        <StatCard
          icon={<Clock className="h-5 w-5" />}
          label={t("progressPage.totalHours")}
          value={`${Math.round(totalMinutes / 60 * 10) / 10}`}
        />
        <StatCard
          icon={<Brain className="h-5 w-5" />}
          label={t("progressPage.mastered")}
          value={strong.length}
        />
      </div>

      {/* Per-track progress — real persisted data */}
      {enrollments.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-ink">{t("progressPage.courseProgress")}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {enrollments.map((e) => {
              const course = getCourseById(e.courseId);
              if (!course) return null;
              const total = getLessonSequence(course).length;
              return (
                <Card key={e.courseId} className="overflow-hidden p-5">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${course.gradient} text-white`}
                    >
                      <BookOpen className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-ink">{loc(course.title)}</h3>
                      <p className="text-xs text-muted">
                        {e.completedLessonIds.length} / {total} {t("common.lessons")}
                      </p>
                    </div>
                    <span className="shrink-0 text-lg font-bold text-primary dark:text-primary-strong">
                      {e.progress}%
                    </span>
                  </div>
                  <ProgressBar value={e.progress} className="mt-4" />
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Mastery heatmap */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-ink">{t("progressPage.masteryMap")}</h2>
        <p className="mt-1 text-sm text-muted">{t("progressPage.masteryMapDesc")}</p>
        <Card className="mt-5 space-y-6 p-6">
          {byCourse.size === 0 && (
            <p className="py-6 text-center text-sm text-muted">
              {t("progressPage.emptyMastery")}
            </p>
          )}
          {Array.from(byCourse.entries()).map(([courseId, records]) => {
            const course = getCourseById(courseId);
            return (
              <div key={courseId}>
                <p className="mb-2.5 text-sm font-semibold text-ink">
                  {course ? loc(course.title) : courseId}
                </p>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {records.map((m) => (
                    <div
                      key={m.topicId}
                      className="rounded-xl px-3.5 py-3 text-ink transition-transform hover:scale-[1.03]"
                      style={heatStyle(m.mastery)}
                      title={loc(m.aiNote)}
                    >
                      <p className="truncate text-xs font-semibold">{loc(m.topic)}</p>
                      <p className="mt-1 text-lg font-bold">{m.mastery}%</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </Card>
      </section>

      {/* Strong vs weak — shown once the mentor has analysis */}
      {mastery.length > 0 && (
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
            <ThumbsUp className="h-5 w-5 text-success" /> {t("progressPage.strongAreas")}
          </h2>
          <div className="mt-4 space-y-3">
            {strong.map((m) => (
              <Card key={m.topicId} className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink">{loc(m.topic)}</p>
                  <Badge tone="success">{m.mastery}%</Badge>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted">{loc(m.aiNote)}</p>
              </Card>
            ))}
          </div>
        </section>
        <section>
          <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
            <TrendingDown className="h-5 w-5 text-accent" /> {t("progressPage.weakAreas")}
          </h2>
          <div className="mt-4 space-y-3">
            {weak.map((m) => (
              <Card key={m.topicId} className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink">{loc(m.topic)}</p>
                  <Badge tone="gold">{m.mastery}%</Badge>
                </div>
                <ProgressBar value={m.mastery} gold className="mt-2 h-1.5" />
                <p className="mt-2 text-xs leading-relaxed text-muted">{loc(m.aiNote)}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
      )}

      {/* Time per course — needs recorded sessions */}
      {totalMinutes > 0 && (
      <section className="mt-12">
        <h2 className="text-xl font-bold text-ink">{t("progressPage.timeSpent")}</h2>
        <Card className="mt-5 space-y-5 p-6">
          {timePerCourse.map(({ course, minutes }) => (
            <div key={course?.id ?? "?"}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-ink">{course ? loc(course.title) : ""}</span>
                <span className="text-xs text-muted">
                  {Math.floor(minutes / 60)}:{String(minutes % 60).padStart(2, "0")} {t("common.hours")}
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-surface-2">
                <div
                  className={`h-full rounded-full bg-gradient-to-e ${course?.gradient ?? "from-teal-600 to-cyan-700"} bg-gradient-to-r`}
                  style={{ width: `${(minutes / maxMinutes) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </Card>
      </section>
      )}

      {/* Session history */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-ink">{t("progressPage.sessionHistory")}</h2>
        <div className="mt-5 space-y-4">
          {sessions.length === 0 && (
            <Card className="p-6 text-center">
              <p className="text-sm text-muted">{t("progressPage.emptySessions")}</p>
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
                      {t("common.minutes")}
                    </p>
                  </div>
                  <Badge tone="gold">+{s.xpEarned} XP</Badge>
                </div>
                <p className="mt-3 rounded-xl bg-primary/5 px-4 py-3 text-sm leading-relaxed text-muted">
                  <span className="font-semibold text-primary dark:text-primary-strong">
                    {t("progressPage.aiSummaryLabel")}:
                  </span>{" "}
                  {loc(s.aiSummary)}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Certificates — hidden until real certificates can be earned */}
      {certificates.length > 0 && (
      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
          <Award className="h-5 w-5 text-accent" /> {t("progressPage.certificates")}
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => {
            const earned = Boolean(cert.issuedAt);
            return (
              <Card
                key={cert.id}
                className={`relative overflow-hidden p-6 ${
                  earned ? "border-2 border-accent/60" : "opacity-70"
                }`}
              >
                {earned && (
                  <div className="absolute -end-8 -top-8 h-24 w-24 rounded-full bg-accent/15 blur-xl" />
                )}
                <div className="flex items-start justify-between">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-xl ${
                      earned ? "bg-accent/15 text-accent" : "bg-surface-2 text-muted"
                    }`}
                  >
                    {earned ? <Award className="h-6 w-6" /> : <Lock className="h-5 w-5" />}
                  </span>
                  {earned ? (
                    <Badge tone="gold">
                      <CheckCircle2 className="h-3 w-3" /> {t("progressPage.certEarned")}
                    </Badge>
                  ) : (
                    <Badge tone="muted">{t("progressPage.certLocked")}</Badge>
                  )}
                </div>
                <h3 className="mt-4 font-bold text-ink">{loc(cert.title)}</h3>
                {earned && (
                  <div className="mt-3 space-y-1 text-xs text-muted">
                    <p>
                      {t("progressPage.certIssuedAt")}: {cert.issuedAt}
                    </p>
                    <p className="font-mono" dir="ltr">
                      {t("progressPage.credentialId")}: {cert.credentialId}
                    </p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </section>
      )}
    </main>
  );
}

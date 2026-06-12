"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  Bot,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  List,
  Play,
  SquareTerminal,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { VideoPanel } from "@/components/learn/VideoPanel";
import { WorkspacePanel, type RunReport } from "@/components/learn/WorkspacePanel";
import { ReferencePanel } from "@/components/learn/ReferencePanel";
import { MentorChat } from "@/components/learn/MentorChat";
import { TaskPanel, type CheckStatus } from "@/components/learn/TaskPanel";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import { findLesson, getLessonSequence } from "@/lib/data";
import { useEnrollment, useLessonState } from "@/lib/data/student-context";
import {
  enrollInCourse,
  markLessonComplete,
  saveCheckpointResults,
  saveCodeDraft,
  updateLastPosition,
} from "@/lib/data/student-store";
import type { LessonType } from "@/lib/types";

const lessonIcons: Record<LessonType, typeof Play> = {
  video: Play,
  workspace: SquareTerminal,
  reference: FileText,
};

export default function LearnPage() {
  const params = useParams<{ subject: string; topic: string }>();
  const { t, loc, dir, locale } = useLanguage();
  const { user } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [code, setCode] = useState<string | undefined>(undefined);
  const [checkStatuses, setCheckStatuses] = useState<Record<string, CheckStatus>>({});
  const [verifying, setVerifying] = useState(false);

  const hit = findLesson(params.subject, params.topic);
  const { enrollment, loading: enrollmentLoading } = useEnrollment(hit?.course.id);
  const { state: lessonState, loading: lessonStateLoading } = useLessonState(
    hit?.lesson.id
  );

  // Fresh checklist when navigating between lessons
  const hydratedRef = useRef<string | null>(null);
  useEffect(() => {
    setCheckStatuses({});
    setVerifying(false);
    hydratedRef.current = null;
  }, [params.subject, params.topic]);

  // Restore saved checkpoint results once per lesson (snapshot echoes from
  // our own writes must not clobber fresher local state).
  useEffect(() => {
    if (!hit || lessonStateLoading || !lessonState) return;
    if (hydratedRef.current === hit.lesson.id) return;
    hydratedRef.current = hit.lesson.id;
    if (Object.keys(lessonState.checkpointResults).length > 0) {
      setCheckStatuses(lessonState.checkpointResults);
    }
  }, [hit, lessonState, lessonStateLoading]);

  // Flush guard for the code-draft debounce timer
  const draftTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (draftTimer.current) clearTimeout(draftTimer.current);
    };
  }, []);

  // Opening a lesson enrolls (first visit) and saves the student's position.
  // The ref makes this once-per-lesson: enrollment snapshots re-fire the
  // effect, and without it every write would loop through the listener.
  const positionedRef = useRef<string | null>(null);
  useEffect(() => {
    if (!user || !hit || enrollmentLoading) return;
    const key = `${user.uid}:${hit.course.id}/${hit.lesson.slug}`;
    if (positionedRef.current === key) return;
    positionedRef.current = key;
    if (!enrollment) void enrollInCourse(user.uid, hit.course);
    void updateLastPosition(user.uid, hit.course.id, hit.lesson.slug, hit.module.id);
  }, [user, hit, enrollment, enrollmentLoading]);

  if (!hit) notFound();
  const { course, module, lesson, index, total } = hit;

  // Auto-verify checkpoints on every Run: error → orange warnings,
  // clean run → ask the AI grader which checkpoints are achieved.
  async function handleRun(report: RunReport) {
    const checkpoints = lesson.checkpoints ?? [];
    if (checkpoints.length === 0) return;

    if (report.hasError) {
      setCheckStatuses(
        Object.fromEntries(checkpoints.map((cp) => [cp.id, "warning" as CheckStatus])),
      );
      return;
    }

    setVerifying(true);
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lesson: {
            objective: lesson.objective?.[locale],
            language: lesson.language,
            checkpoints: checkpoints.map((cp) => ({ id: cp.id, text: cp.text[locale] })),
          },
          code: report.code,
          output: report.output,
          hasError: report.hasError,
        }),
      });
      // 503 = demo mode (no API key) — leave the checklist manual
      if (!res.ok) return;
      const data: { results?: { id: string; passed: boolean }[] } = await res.json();
      const next: Record<string, "passed" | "pending"> = Object.fromEntries(
        checkpoints.map((cp) => [cp.id, "pending" as const]),
      );
      for (const r of data.results ?? []) {
        if (r.id in next) next[r.id] = r.passed ? "passed" : "pending";
      }
      setCheckStatuses(next);
      if (user) {
        void saveCheckpointResults(user.uid, course.id, lesson.id, next);
        // All green = the lesson is done — progress, XP and streak update
        if (checkpoints.every((cp) => next[cp.id] === "passed")) {
          void markLessonComplete(user.uid, course, lesson.id);
        }
      }
    } catch {
      // Network hiccup — keep previous statuses; next Run retries
    } finally {
      setVerifying(false);
    }
  }

  const seq = getLessonSequence(course);
  const prev = index > 0 ? seq[index - 1].lesson : null;
  const next = index < total - 1 ? seq[index + 1].lesson : null;

  function handleCodeChange(nextCode: string) {
    setCode(nextCode);
    if (!user) return;
    if (draftTimer.current) clearTimeout(draftTimer.current);
    draftTimer.current = setTimeout(() => {
      void saveCodeDraft(user.uid, course.id, lesson.id, nextCode);
    }, 1500);
  }

  // Video/reference lessons have no checkpoints — moving on completes them.
  function completePassiveLesson() {
    if (user && lesson.type !== "workspace") {
      void markLessonComplete(user.uid, course, lesson.id);
    }
  }

  // Module progress = completed lessons within this module
  const moduleDone = module.lessons.filter((l) =>
    enrollment?.completedLessonIds.includes(l.id)
  ).length;
  const moduleProgress = (moduleDone / module.lessons.length) * 100;

  const PrevIcon = dir === "rtl" ? ChevronRight : ChevronLeft;
  const NextIcon = dir === "rtl" ? ChevronLeft : ChevronRight;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Top bar */}
      <div className="sticky top-16 z-30 border-b border-line/10 bg-bg/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1700px] items-center gap-3 px-4 py-3 sm:px-6">
          <button
            onClick={() => setDrawerOpen(true)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-ink"
            aria-label={t("learn.lessonList")}
          >
            <List className="h-4 w-4" />
          </button>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">{loc(lesson.title)}</p>
            <div className="mt-1 flex items-center gap-3">
              <span className="shrink-0 text-[11px] text-muted">
                {index + 1} {t("learn.lessonOf")} {total} · {loc(module.title)}
              </span>
              <div className="hidden max-w-44 flex-1 sm:block">
                <ProgressBar value={moduleProgress} className="h-1.5" />
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            {prev && (
              <Button
                href={`/learn/${course.slug}/${prev.slug}`}
                variant="ghost"
                size="sm"
              >
                <PrevIcon className="h-4 w-4" />
                <span className="hidden sm:inline">{t("common.previous")}</span>
              </Button>
            )}
            {next ? (
              <Button
                href={`/learn/${course.slug}/${next.slug}`}
                size="sm"
                onClick={completePassiveLesson}
              >
                <span className="hidden sm:inline">{t("common.next")}</span>
                <NextIcon className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                href={`/courses/${course.slug}`}
                variant="gold"
                size="sm"
                onClick={completePassiveLesson}
              >
                {t("learn.markComplete")}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Split layout */}
      <div className="mx-auto grid w-full max-w-[1700px] flex-1 lg:grid-cols-[1fr_400px]">
        {/* main panel */}
        <main className="min-w-0 space-y-5 px-4 py-6 sm:px-6 lg:border-e lg:border-line/10">
          {lesson.type === "workspace" && (
            <TaskPanel lesson={lesson} statuses={checkStatuses} verifying={verifying} />
          )}
          {lesson.type === "video" && <VideoPanel lesson={lesson} />}
          {lesson.type === "workspace" && !lessonStateLoading && (
            <WorkspacePanel
              key={lesson.id}
              lesson={lesson}
              initialCode={lessonState?.codeDraft ?? undefined}
              onCodeChange={handleCodeChange}
              onRun={handleRun}
            />
          )}
          {lesson.type === "reference" && <ReferencePanel lesson={lesson} />}
        </main>

        {/* mentor chat — desktop */}
        <aside className="sticky top-[7.6rem] hidden h-[calc(100vh-7.6rem)] lg:block">
          <MentorChat lesson={lesson} code={code} />
        </aside>
      </div>

      {/* mentor chat — mobile floating tab + sheet */}
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-5 end-5 z-40 flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-white shadow-xl shadow-primary/30 lg:hidden"
      >
        <Bot className="h-5 w-5" /> {t("learn.openMentor")}
      </button>
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/40 lg:hidden">
          <button className="flex-1" onClick={() => setChatOpen(false)} aria-label={t("common.close")} />
          <div className="relative h-[78vh] overflow-hidden rounded-t-3xl border-t border-line/15">
            <button
              onClick={() => setChatOpen(false)}
              className="absolute end-4 top-3.5 z-10 grid h-8 w-8 place-items-center rounded-full bg-surface-2 text-muted"
              aria-label={t("common.close")}
            >
              <X className="h-4 w-4" />
            </button>
            <MentorChat lesson={lesson} code={code} />
          </div>
        </div>
      )}

      {/* lesson list drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="h-full w-80 max-w-[85vw] overflow-y-auto border-e border-line/15 bg-surface">
            <div className="sticky top-0 flex items-center justify-between border-b border-line/10 bg-surface px-4 py-3.5">
              <h3 className="font-bold text-ink">{t("learn.lessonList")}</h3>
              <button
                onClick={() => setDrawerOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-surface-2"
                aria-label={t("common.close")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-3">
              {course.modules.map((mod, mi) => (
                <div key={mod.id} className="mb-4">
                  <p className="px-2 py-1.5 text-xs font-bold uppercase tracking-wide text-muted">
                    {mi + 1}. {loc(mod.title)}
                  </p>
                  {mod.lessons.map((l) => {
                    const Icon = lessonIcons[l.type];
                    const active = l.id === lesson.id;
                    const done = enrollment?.completedLessonIds.includes(l.id);
                    return (
                      <Link
                        key={l.id}
                        href={`/learn/${course.slug}/${l.slug}`}
                        onClick={() => setDrawerOpen(false)}
                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                          active
                            ? "bg-primary/10 font-semibold text-primary dark:text-primary-strong"
                            : "text-ink hover:bg-surface-2"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0 text-muted" />
                        <span className="min-w-0 flex-1 truncate">{loc(l.title)}</span>
                        {done && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" />}
                        <Badge tone="muted" className="shrink-0">
                          {l.durationMin}′
                        </Badge>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <button
            className="flex-1 bg-black/40"
            onClick={() => setDrawerOpen(false)}
            aria-label={t("common.close")}
          />
        </div>
      )}
    </div>
  );
}

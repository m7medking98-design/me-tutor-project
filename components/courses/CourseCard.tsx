"use client";

import Link from "next/link";
import { BookOpen, Clock, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useLanguage } from "@/lib/language-context";
import { getLessonSequence } from "@/lib/data";
import type { Course } from "@/lib/types";

export function CourseCard({
  course,
  progress,
}: {
  course: Course;
  /** 0..100 when the user is enrolled */
  progress?: number;
}) {
  const { t, loc } = useLanguage();
  const lessonCount = getLessonSequence(course).length;

  return (
    <Link href={`/courses/${course.slug}`} className="block h-full">
      <Card hover className="flex h-full flex-col overflow-hidden">
        {/* gradient thumbnail */}
        <div className={`relative h-36 bg-gradient-to-br ${course.gradient}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
          <div className="absolute bottom-3 start-4 flex gap-2">
            <Badge tone="gold" className="backdrop-blur-sm">
              {t(`common.${course.level}`)}
            </Badge>
            {course.certificate && (
              <Badge tone="muted" className="bg-black/30 text-white backdrop-blur-sm">
                ✦ {t("common.certificate")}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-bold leading-snug text-ink">{loc(course.title)}</h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
            {loc(course.tagline)}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted">
            <span className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" /> {lessonCount} {t("common.lessons")}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {course.totalHours} {t("common.hours")}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" /> {course.enrolledCount.toLocaleString()}
            </span>
            <span className="flex items-center gap-1 text-accent">
              <Star className="h-3.5 w-3.5 fill-current" /> {course.rating}
            </span>
          </div>

          {progress !== undefined && (
            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-muted">{t("courses.yourProgress")}</span>
                <span className="font-semibold text-primary dark:text-primary-strong">
                  {progress}%
                </span>
              </div>
              <ProgressBar value={progress} />
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}

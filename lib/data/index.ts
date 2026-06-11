/**
 * Data access layer.
 *
 * Currently backed by mock data so the entire product works without a
 * backend. When Firebase goes live, these functions keep the exact same
 * signatures and read from Firestore instead — no page needs to change.
 */
import {
  certificates,
  courses,
  demoUser,
  enrollments,
  mastery,
  milestones,
  sessions,
} from "@/lib/data/mock";
import type {
  Certificate,
  Course,
  Enrollment,
  Lesson,
  MasteryRecord,
  Milestone,
  Module,
  SessionRecord,
  UserProfile,
} from "@/lib/types";

export function getCourses(): Course[] {
  return courses;
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getDemoUser(): UserProfile {
  return demoUser;
}

export function getEnrollments(_uid: string): Enrollment[] {
  return enrollments;
}

export function getEnrollment(_uid: string, courseId: string): Enrollment | undefined {
  return enrollments.find((e) => e.courseId === courseId);
}

export function getSessions(_uid: string): SessionRecord[] {
  return sessions;
}

export function getMastery(_uid: string): MasteryRecord[] {
  return mastery;
}

export function getCertificates(_uid: string): Certificate[] {
  return certificates;
}

export function getMilestones(_uid: string): Milestone[] {
  return milestones;
}

/** Flattened, ordered list of all lessons in a course. */
export function getLessonSequence(
  course: Course
): { lesson: Lesson; module: Module; index: number }[] {
  const seq: { lesson: Lesson; module: Module; index: number }[] = [];
  let i = 0;
  for (const mod of course.modules) {
    for (const lesson of mod.lessons) {
      seq.push({ lesson, module: mod, index: i });
      i += 1;
    }
  }
  return seq;
}

export function findLesson(
  courseSlug: string,
  lessonSlug: string
):
  | { course: Course; module: Module; lesson: Lesson; index: number; total: number }
  | undefined {
  const course = getCourseBySlug(courseSlug);
  if (!course) return undefined;
  const seq = getLessonSequence(course);
  const hit = seq.find((s) => s.lesson.slug === lessonSlug);
  if (!hit) return undefined;
  return {
    course,
    module: hit.module,
    lesson: hit.lesson,
    index: hit.index,
    total: seq.length,
  };
}

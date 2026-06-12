/**
 * Data access layer.
 *
 * Course/curriculum content is authored locally and always comes from mock.ts.
 * User data is live: enrollments/lesson state stream from Firestore through
 * lib/data/student-context.tsx hooks, and the seeded demo records below serve
 * demo mode only. Features not yet built for real users (sessions, mastery,
 * certificates, milestones) return empty in Firebase mode rather than showing
 * fabricated data to real students.
 */
// Same check as lib/firebase.ts isFirebaseEnabled — duplicated here on purpose:
// importing lib/firebase would pull the whole Firebase SDK into every page
// that only reads course content (e.g. the public landing page).
const isFirebaseEnabled = Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

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
  return isFirebaseEnabled ? [] : sessions;
}

export function getMastery(_uid: string): MasteryRecord[] {
  return isFirebaseEnabled ? [] : mastery;
}

export function getCertificates(_uid: string): Certificate[] {
  return isFirebaseEnabled ? [] : certificates;
}

export function getMilestones(_uid: string): Milestone[] {
  return isFirebaseEnabled ? [] : milestones;
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

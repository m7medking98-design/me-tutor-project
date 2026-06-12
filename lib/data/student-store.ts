/**
 * Firestore student store — the ONLY module that writes user data.
 *
 * Data model (all under the student's own uid; see firestore.rules):
 *   users/{uid}                         — UserProfile
 *   users/{uid}/enrollments/{courseId}  — Enrollment
 *   users/{uid}/lessonState/{lessonId}  — checkpoint results, code draft, completion
 *
 * Every function is a silent no-op in demo mode (no Firebase keys), so
 * pages and hooks never need to branch on the mode themselves.
 */
import type { User as FirebaseUser } from "firebase/auth";
import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db, isFirebaseEnabled } from "@/lib/firebase";
import { getLessonSequence } from "@/lib/data";
import type { Course, UserProfile } from "@/lib/types";

function userDoc(uid: string) {
  if (!db) throw new Error("Firestore is not initialized");
  return doc(db, "users", uid);
}

function enrollmentDoc(uid: string, courseId: string) {
  if (!db) throw new Error("Firestore is not initialized");
  return doc(db, "users", uid, "enrollments", courseId);
}

function lessonStateDoc(uid: string, lessonId: string) {
  if (!db) throw new Error("Firestore is not initialized");
  return doc(db, "users", uid, "lessonState", lessonId);
}

/** What a student did inside one lesson — survives refresh. */
export interface LessonState {
  checkpointResults: Record<string, "passed" | "pending">;
  codeDraft: string | null;
  completedAt: string | null;
}

/** Today as a local YYYY-MM-DD string (streaks are calendar-day based). */
export function localDateKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function newProfile(fbUser: FirebaseUser, name?: string): UserProfile {
  return {
    uid: fbUser.uid,
    displayName: name ?? fbUser.displayName ?? fbUser.email?.split("@")[0] ?? "",
    email: fbUser.email ?? "",
    photoURL: fbUser.photoURL,
    locale: "ar",
    plan: "free",
    xp: 0,
    level: 1,
    streakDays: 0,
    weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
    joinedAt: localDateKey(),
  };
}

/**
 * Create the profile doc if it doesn't exist yet (first email signup OR first
 * Google sign-in). Idempotent — safe to call on every auth-state change.
 */
export async function ensureUserProfile(
  fbUser: FirebaseUser,
  name?: string
): Promise<void> {
  if (!isFirebaseEnabled || !db) return;
  const ref = userDoc(fbUser.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    // Signup path may lose the race with onAuthStateChanged's create —
    // an explicitly provided name always wins.
    if (name && snap.data().displayName !== name) {
      await setDoc(ref, { displayName: name }, { merge: true });
    }
    return;
  }
  await setDoc(
    ref,
    { ...newProfile(fbUser, name), createdAt: serverTimestamp() },
    { merge: true }
  );
}

/**
 * Live profile subscription. Fires with null until the doc exists.
 * Returns the unsubscribe function.
 */
export function subscribeProfile(
  uid: string,
  cb: (profile: UserProfile | null) => void
): () => void {
  if (!isFirebaseEnabled || !db) {
    cb(null);
    return () => {};
  }
  return onSnapshot(userDoc(uid), (snap) => {
    if (!snap.exists()) {
      cb(null);
      return;
    }
    const data = snap.data() as UserProfile & { xp?: number };
    const xp = data.xp ?? 0;
    cb({
      ...data,
      uid,
      xp,
      // level is always derived, never trusted from storage
      level: Math.floor(xp / 500) + 1,
    });
  });
}

/**
 * Keep the calendar-day streak honest: first activity today extends a streak
 * that was alive yesterday, otherwise restarts it at 1. No write when the
 * student was already active today.
 */
export async function touchStreak(uid: string): Promise<void> {
  if (!isFirebaseEnabled || !db) return;
  const snap = await getDoc(userDoc(uid));
  if (!snap.exists()) return;
  const today = localDateKey();
  const last = (snap.data().lastActiveDate as string | undefined) ?? "";
  if (last === today) return;
  const yesterday = localDateKey(new Date(Date.now() - 24 * 60 * 60 * 1000));
  const streakDays =
    last === yesterday ? ((snap.data().streakDays as number) ?? 0) + 1 : 1;
  await setDoc(
    userDoc(uid),
    { lastActiveDate: today, streakDays },
    { merge: true }
  );
}

/** Enroll the student in a course, positioned at its first lesson. */
export async function enrollInCourse(
  uid: string,
  course: Course
): Promise<void> {
  if (!isFirebaseEnabled || !db) return;
  const first = getLessonSequence(course)[0];
  await setDoc(
    enrollmentDoc(uid, course.id),
    {
      courseId: course.id,
      progress: 0,
      completedLessonIds: [],
      lastLessonSlug: first?.lesson.slug ?? "",
      lastModuleId: first?.module.id ?? "",
      lastActivityAt: new Date().toISOString(),
      enrolledAt: serverTimestamp(),
    },
    { merge: true }
  );
  void touchStreak(uid);
}

/** Live subscription to one lesson's saved state (null until the doc exists). */
export function subscribeLessonState(
  uid: string,
  lessonId: string,
  cb: (state: LessonState) => void
): () => void {
  if (!isFirebaseEnabled || !db) return () => {};
  return onSnapshot(lessonStateDoc(uid, lessonId), (snap) => {
    const data = snap.data();
    cb({
      checkpointResults: data?.checkpointResults ?? {},
      codeDraft: data?.codeDraft ?? null,
      completedAt: data?.completedAt ?? null,
    });
  });
}

/** Persist the auto-grader's verdict for this lesson's checkpoints. */
export async function saveCheckpointResults(
  uid: string,
  courseId: string,
  lessonId: string,
  results: Record<string, "passed" | "pending">
): Promise<void> {
  if (!isFirebaseEnabled || !db) return;
  await setDoc(
    lessonStateDoc(uid, lessonId),
    { courseId, checkpointResults: results, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

/** Persist the student's editor content (call sites debounce). */
export async function saveCodeDraft(
  uid: string,
  courseId: string,
  lessonId: string,
  code: string
): Promise<void> {
  if (!isFirebaseEnabled || !db) return;
  await setDoc(
    lessonStateDoc(uid, lessonId),
    { courseId, codeDraft: code, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

/**
 * Mark a lesson complete: completedLessonIds + course progress % + XP +
 * streak. Idempotent — re-passing an already-completed lesson changes
 * nothing, so XP can't be farmed by re-running the same code.
 */
export async function markLessonComplete(
  uid: string,
  course: Course,
  lessonId: string
): Promise<void> {
  if (!isFirebaseEnabled || !db) return;
  const enrRef = enrollmentDoc(uid, course.id);
  const snap = await getDoc(enrRef);
  const already: string[] = snap.exists()
    ? (snap.data().completedLessonIds ?? [])
    : [];
  if (already.includes(lessonId)) return;

  const total = getLessonSequence(course).length;
  const completedCount = already.length + 1;
  const progress = Math.min(100, Math.round((completedCount / total) * 100));

  await Promise.all([
    setDoc(
      enrRef,
      {
        courseId: course.id,
        completedLessonIds: arrayUnion(lessonId),
        progress,
        lastActivityAt: new Date().toISOString(),
      },
      { merge: true }
    ),
    setDoc(userDoc(uid), { xp: increment(50) }, { merge: true }),
    setDoc(
      lessonStateDoc(uid, lessonId),
      { courseId: course.id, completedAt: new Date().toISOString() },
      { merge: true }
    ),
  ]);
  void touchStreak(uid);
}

/** Remember where the student is in a course (called when a lesson opens). */
export async function updateLastPosition(
  uid: string,
  courseId: string,
  lessonSlug: string,
  moduleId: string
): Promise<void> {
  if (!isFirebaseEnabled || !db) return;
  await setDoc(
    enrollmentDoc(uid, courseId),
    {
      lastLessonSlug: lessonSlug,
      lastModuleId: moduleId,
      lastActivityAt: new Date().toISOString(),
    },
    { merge: true }
  );
  void touchStreak(uid);
}

"use client";

/**
 * Live student data for pages.
 *
 * One Firestore subscription on users/{uid}/enrollments feeds the whole app;
 * pages read it through `useEnrollments()` / `useEnrollment(courseId)` and
 * never touch Firestore (or mock.ts) directly. In demo mode the hooks return
 * the seeded mock data synchronously, so pages need no mode branches.
 */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db, isFirebaseEnabled } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { getEnrollments } from "@/lib/data";
import type { Enrollment } from "@/lib/types";

interface StudentDataValue {
  enrollments: Enrollment[];
  /** true while the first Firestore snapshot is still in flight */
  loading: boolean;
}

const StudentDataContext = createContext<StudentDataValue | null>(null);

export function StudentDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [live, setLive] = useState<{ list: Enrollment[]; ready: boolean }>({
    list: [],
    ready: false,
  });

  const uid = user?.uid;

  useEffect(() => {
    if (!isFirebaseEnabled || !db || !uid) {
      setLive({ list: [], ready: false });
      return;
    }
    return onSnapshot(collection(db, "users", uid, "enrollments"), (snap) => {
      const list = snap.docs.map((d) => {
        const data = d.data();
        return {
          courseId: d.id,
          progress: data.progress ?? 0,
          completedLessonIds: data.completedLessonIds ?? [],
          lastLessonSlug: data.lastLessonSlug ?? "",
          lastModuleId: data.lastModuleId ?? "",
          lastActivityAt: data.lastActivityAt ?? "",
        } satisfies Enrollment;
      });
      setLive({ list, ready: true });
    });
  }, [uid]);

  const value = useMemo<StudentDataValue>(() => {
    if (!isFirebaseEnabled) {
      // Demo mode: seeded data, available synchronously
      return { enrollments: uid ? getEnrollments(uid) : [], loading: false };
    }
    return { enrollments: live.list, loading: Boolean(uid) && !live.ready };
  }, [uid, live]);

  return (
    <StudentDataContext.Provider value={value}>
      {children}
    </StudentDataContext.Provider>
  );
}

export function useEnrollments(): StudentDataValue {
  const ctx = useContext(StudentDataContext);
  if (!ctx)
    throw new Error("useEnrollments must be used within StudentDataProvider");
  return ctx;
}

export function useEnrollment(courseId: string | undefined): {
  enrollment: Enrollment | undefined;
  loading: boolean;
} {
  const { enrollments, loading } = useEnrollments();
  return {
    enrollment: courseId
      ? enrollments.find((e) => e.courseId === courseId)
      : undefined,
    loading,
  };
}

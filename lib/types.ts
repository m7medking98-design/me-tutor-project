/** Localized string — every user-facing piece of content carries all three. */
export interface L10n {
  ar: string;
  en: string;
  fr: string;
}

export type Locale = "ar" | "en" | "fr";

export type SubjectCategory =
  | "programming"
  | "math"
  | "physics"
  | "engineering"
  | "data";

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export type LessonType = "video" | "workspace" | "reference";

export interface Lesson {
  id: string;
  slug: string;
  title: L10n;
  type: LessonType;
  durationMin: number;
  /** for workspace lessons: starter code shown in the editor */
  starterCode?: string;
  /** for workspace lessons: execution target (defaults to python) */
  language?: "python" | "html";
  /** for workspace lessons: short markdown intro to the new syntax/functions this
   *  lesson uses — shown above the objective; the video carries the deeper teaching */
  concept?: L10n;
  /** for workspace lessons: what the student must achieve */
  objective?: L10n;
  /** for workspace lessons: self-check steps (the AI will verify these in phase 2) */
  checkpoints?: { id: string; text: L10n }[];
  /** for workspace lessons: revealed on demand */
  hint?: L10n;
  /** for video lessons: chapter markers */
  chapters?: { time: string; title: L10n }[];
  /** for reference lessons: section headings (table of contents) */
  sections?: L10n[];
  /** for reference lessons: full markdown body, rendered via RichMarkdown */
  body?: L10n;
}

export interface Module {
  id: string;
  title: L10n;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: L10n;
  tagline: L10n;
  description: L10n;
  category: SubjectCategory;
  level: CourseLevel;
  languages: Locale[];
  modules: Module[];
  outcomes: L10n[];
  totalHours: number;
  enrolledCount: number;
  rating: number;
  certificate: boolean;
  /** tailwind gradient classes for the card thumbnail */
  gradient: string;
}

export interface Enrollment {
  courseId: string;
  /** 0..100 */
  progress: number;
  completedLessonIds: string[];
  lastLessonSlug: string;
  lastModuleId: string;
  lastActivityAt: string; // ISO date
}

export interface SessionRecord {
  id: string;
  courseId: string;
  date: string; // ISO date
  durationMin: number;
  lessonTitle: L10n;
  /** AI-generated summary of the session */
  aiSummary: L10n;
  xpEarned: number;
}

export interface MasteryRecord {
  topicId: string;
  topic: L10n;
  courseId: string;
  /** 0..100 */
  mastery: number;
  /** AI explanation of why this is strong/weak */
  aiNote: L10n;
}

export interface Certificate {
  id: string;
  courseId: string;
  title: L10n;
  issuedAt: string | null; // null = locked / not yet earned
  credentialId: string | null;
}

export interface Milestone {
  id: string;
  courseId: string;
  title: L10n;
  /** e.g. "after 2 lessons" */
  due: L10n;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string | null;
  locale: Locale;
  plan: "free" | "basic" | "pro";
  xp: number;
  level: number;
  streakDays: number;
  /** minutes studied per weekday, Sat..Fri (MENA week) */
  weeklyActivity: number[];
  joinedAt: string;
}

export interface MentorMessage {
  id: string;
  role: "user" | "mentor";
  text: string;
  at: number;
}

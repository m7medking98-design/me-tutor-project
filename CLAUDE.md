# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Miyar (معيار) — a premium Arab EdTech platform: structured learning (videos, code workspaces, references) supervised by an AI mentor. Arabic-first with RTL by default. Built in phases: **1) the site (done), 2) AI supervision (next), 3) curriculum content.** Phases 2–3 have deliberate integration points (see below) — preserve them.

## Current status & next steps (updated 2026-06-13)

**Done — AI phase LIVE and user-tested (2026-06-12):** Full site (8 pages); task panels; real Python via Pyodide (`lib/runtime.ts`); live HTML preview. `app/api/mentor/route.ts` streams Claude replies (Arabic-first teach-don't-solve prompt, prompt caching, lesson context + live code + history; model via `MENTOR_MODEL` env var — user runs `claude-haiku-4-5` for testing, funded API key in `.env.local`, $5 credit / $10 monthly cap). `app/api/verify/route.ts` auto-grades checkpoints on every Run. CodeMirror editor (`components/learn/CodeEditor.tsx`; autocomplete deliberately OFF). Mentor replies + hints/checkpoints render via shared `components/learn/Markdown.tsx`.

**Done — Firebase persistence LIVE and user-verified (2026-06-13):** Real Auth + Firestore fully wired (see "Persistence layer" under Architecture). User created the `miyar-edu` Firebase project (Standard edition Firestore, Email/Password + Google auth, rules from `firestore.rules` published), keys live in `.env.local`. End-to-end test passed: signup → enroll → pass checkpoints → refresh → code, green checks, progress % and XP all persist. Demo mode (keys removed) still fully works for showcasing.

**Lesson template is defined by the AI phase** (objective + plain-language checkpoints → auto-graded on Run): all future course content just needs checkpoints written this way and grading comes free. The 5 Python workspace lessons are the reference examples.

**Phase 3 (curriculum) STARTED — plan approved 2026-06-13, full details in `docs/curriculum-python.md` (the source of truth — read it before any curriculum work).** User's decision: the Python path is a **certification ladder** of multiple courses modeled on Python Institute levels — Course 1 أساسيات Python (**PCEP**, active build), Course 2 Python المتوسط (PCAP), Course 3 Python الاحترافي (PCPP), then specializations (Python for IT/Cloud/SysAdmin, analytics…). Honesty rule: courses *prepare for* those exams; the official exam is Python Institute's own — never blur this.

**Done — Module 5 هياكل البيانات BUILT & PCEP-aligned (2026-06-14):** 11 lessons (2 video + 8 workspace + 1 reference) in `lib/data/mock.ts` module `m-py-data`, inserted between control-flow and functions. Strengthened against the official PCEP-30-02 syllabus (fetched from pythoninstitute.org) — covers Block 3 (Data Collections, 25%) 100%, incl. list comprehensions, copy/clone aliasing, nested lists/matrices, immutability. **New defensible artifact `docs/pcep-coverage.md`** maps every PCEP objective (1.1–4.4) → lesson with status. Video script outlines in `docs/video-scripts-python-m5.md`. **New `Lesson.body` field (L10n markdown)** added to `lib/types.ts` + rendered by `ReferencePanel` via shared `RichMarkdown` (which gained heading/table/blockquote styling) — references can now hold real content (was placeholder bars before). All Arabic still pending user review.

**RESUME HERE next session: build Module 7 الأخطاء والاستثناءات (Errors & Exceptions)** — next in build order, fully new, covers PCEP Block 4 objectives 4.3 (exception hierarchy) + 4.4 (try/except). After M7: extend M2/M3/M4/M6 to close remaining PCEP gaps (tracked in `docs/pcep-coverage.md`) → M8 capstones → M1 polish. Work split: Claude writes all workspace lessons (objective + checkpoints in the auto-gradable style + starter code + hints), references (with `body` markdown), and video script outlines; user records videos and reviews all Arabic. The M5 lessons + existing 5 are the quality bar.

Deferred by user until later: landing-page fabricated testimonials/stats cleanup (MUST happen before public sharing) and Vercel deployment (pointless before content exists).

**Launch blockers table (path to charging money):**

| Blocker | Whose work | Status |
|---|---|---|
| Real AI mentor + checkpoint auto-grading | Claude | ✅ done 2026-06-12 |
| Real persistence (Firebase: accounts, saved progress) | Claude + user | ✅ done & verified 2026-06-13 |
| Remove fabricated testimonials/stats from landing page | Claude | deferred by user (do before public sharing) |
| Real about/privacy/terms pages | Claude | ✅ done 2026-06-13 (`/about`, `/privacy`, `/terms` via shared `components/layout/InfoPage.tsx`; footer wired; contact email is the user's gmail — swap when a real domain exists) |
| Certificate verification page `/verify/[credentialId]` | Claude | after that |
| Real content for flagship Python course (videos + lessons) | user | user's homework — script/record against existing lesson template |
| Payments + plan gating + per-user token budgets | Claude | after free beta validates retention |
| Company registration + real domain | user | business side — needed for NELC and payment providers |

**Business decisions discussed (2026-06-12):**
- Unit economics: per-user token budgets tied to plan tier from day one; model tier matches plan tier (free → cheapest model, paid → better); fair-use daily ceiling on "unlimited"; average student ≈ $1–2/month in tokens vs $9 plan → healthy margin.
- Launch readiness: site is ready to SHOW, not to SELL — see blockers table above. The fabricated testimonials/stats on the landing page MUST be replaced with real beta feedback before any public launch.
- Credibility ladder (user's "global recognition" goal, discussed 2026-06-12): trusted certificates → employer-verifiable certs (`/verify/[credentialId]` page) mapped to recognized frameworks (e.g. Python Institute PCEP objectives) → official approval (Saudi NELC licenses e-learning platforms; requires registered company). **Degrees are explicitly NOT the goal — recognized certificates are.** Assessment integrity in the AI phase supports this.
- Strategy: free beta first (10–30 students; lesson-completion retention is THE metric; collect real testimonials), then charge.

## Commands

```bash
npm run dev     # dev server at http://localhost:3000
npm run build   # production build — also the type-check; run before committing
npm run lint    # ESLint (next/core-web-vitals)
```

No test suite exists yet. The app runs fully on mock data ("demo mode"); on the login page use the demo-login button to sign in as the seeded student. Adding Firebase keys to `.env.local` (copy `.env.local.example`) activates real Auth automatically.

## Workflow

After every meaningful change: create a clean commit (imperative subject + short body explaining what/why) and push to `origin/master` (github.com/m7medking98-design/me-tutor-project). Don't batch unrelated changes into one commit.

## Architecture

Next.js 14 App Router + TypeScript + Tailwind. All pages are client components reading synchronously from a mock data layer.

**Data flow:** course/curriculum CONTENT is local and synchronous forever — pages call `getCourses()`, `getCourseBySlug()`, `findLesson()`, `getLessonSequence()` in `lib/data/index.ts`, which read `lib/data/mock.ts`. No page imports `mock.ts` directly. Domain types live in `lib/types.ts`; every user-facing content string is an `L10n` object (`{ar, en, fr}`).

**Persistence layer (USER data — Firestore in Firebase mode, mock in demo mode):**
- Model: `users/{uid}` (profile, xp, streakDays, lastActiveDate) · `users/{uid}/enrollments/{courseId}` · `users/{uid}/lessonState/{lessonId}` (checkpointResults, codeDraft, completedAt). Rules in `firestore.rules` (each student reads/writes only their own subtree).
- Reads: hooks in `lib/data/student-context.tsx` — `useEnrollments()`, `useEnrollment(courseId)`, `useLessonState(lessonId)` — backed by `onSnapshot`; in demo mode they return seeded mock data synchronously. `StudentDataProvider` is mounted in `components/layout/Providers.tsx`.
- Writes: ONLY in `lib/data/student-store.ts` (`enrollInCourse`, `updateLastPosition`, `saveCheckpointResults`, `saveCodeDraft` — debounced 1.5s at the call site, `markLessonComplete` — idempotent, +50 XP, recomputes progress %, touches streak). Every write is a silent no-op in demo mode, so **pages never branch on the mode and never import firebase directly** — keep it that way.
- Completion rule: workspace lesson = all checkpoints passed on a Run; video/reference = clicking Next / mark-complete. Level is always derived `floor(xp/500)+1`, never stored.
- `getSessions/getMastery/getCertificates/getMilestones` return `[]` in Firebase mode (those features aren't built for real users yet — never show seeded demo stats to real students). The check reads `process.env.NEXT_PUBLIC_FIREBASE_API_KEY` directly, NOT `lib/firebase`, to keep the Firebase SDK out of public-page bundles.
- Known accepted risk for free beta: XP/progress are client-trusted. Certificate issuance MUST move server-side before building `/verify/[credentialId]`.

**AI mentor (phase-2 integration point):** `lib/mentor.ts → getMentorReply()` is the *single* function to replace with the real AI backend. It already receives lesson context, the student's live workspace code, and the user message. The chat UI (`components/learn/MentorChat.tsx`), greeting, and typing states are finished — don't add AI logic anywhere else.

**Auth:** `lib/auth-context.tsx` provides `useAuth()`. Dual-mode: real Firebase when `NEXT_PUBLIC_FIREBASE_API_KEY` exists (checked in `lib/firebase.ts` via `isFirebaseEnabled`), otherwise demo mode backed by localStorage. In Firebase mode the `users/{uid}` Firestore doc is the profile source of truth: created idempotently by `ensureUserProfile()` on first sign-in (signup writes it with the typed name to beat the displayName race), streamed via `subscribeProfile()`; `loading` stays true until the doc resolves. Auth errors are localized in `components/auth/AuthScreen.tsx` (`auth.err*` message keys). Routes under `app/(app)/` (dashboard, learn, progress, profile) are guarded by `components/layout/AuthGuard.tsx` in the group layout; `app/courses/` is intentionally public.

**i18n:** custom provider in `lib/language-context.tsx` — no URL locale prefixes. `useLanguage()` gives `t("section.key")` for UI strings (dictionaries in `messages/{ar,en,fr}.json`), `loc(l10nObject)` for content, plus `locale` and `dir`. Locale persists in the `miyar-locale` cookie, read server-side in `app/layout.tsx` to set `<html lang dir>` without a flash. Arabic (`ar`) is the default and is RTL.

**Styling:** semantic design tokens as raw RGB triplets in `app/globals.css` (`--bg`, `--surface`, `--primary` teal, `--accent` gold, `--ink`, `--muted`...), mapped in `tailwind.config.ts` so alpha modifiers work (`bg-primary/10`). Dark mode is class-based via next-themes, **dark is default**. Always use Tailwind logical properties (`ms-`/`me-`/`ps-`/`pe-`/`start-`/`end-`/`text-start`) instead of left/right so layouts flip with RTL. Gold (`accent`) is reserved for CTAs, achievements, and certificates — keep it scarce. Code editors/output panes stay LTR (`dir="ltr"`) even in Arabic UI.

**Learning page:** `app/(app)/learn/[subject]/[topic]/page.tsx` resolves params via `findLesson(courseSlug, lessonSlug)` and renders one of three panels by `lesson.type`: `VideoPanel`, `WorkspacePanel`, or `ReferencePanel`, with `MentorChat` beside it (bottom sheet on mobile). Workspace lessons additionally show `TaskPanel` (objective + checkpoints + hint from the `Lesson` fields — these double as the AI's future grading criteria).

**Code execution:** `lib/runtime.ts` loads Pyodide (real CPython in WASM) lazily from CDN on first Run and exposes `runPython(code)` returning stdout/stderr lines. HTML workspace lessons (`lesson.language === "html"`) render a sandboxed iframe preview instead. Editors and output panes stay `dir="ltr"`.

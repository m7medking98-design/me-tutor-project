# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Miyar (معيار) — a premium Arab EdTech platform: structured learning (videos, code workspaces, references) supervised by an AI mentor. Arabic-first with RTL by default. Built in phases: **1) the site (done), 2) AI supervision (next), 3) curriculum content.** Phases 2–3 have deliberate integration points (see below) — preserve them.

## Current status & next steps (updated 2026-06-12, end of session)

**Done — AI phase is LIVE and user-tested:** Full site (8 pages); task panels; real Python via Pyodide (`lib/runtime.ts`); live HTML preview. `app/api/mentor/route.ts` streams Claude replies (Arabic-first teach-don't-solve prompt, prompt caching, lesson context + live code + history; model via `MENTOR_MODEL` env var — user runs `claude-haiku-4-5` for testing, funded API key in `.env.local`, $5 credit / $10 monthly cap). `app/api/verify/route.ts` auto-grades checkpoints on every Run (structured outputs guarantee the JSON; green check / orange warning on error / empty = not yet). CodeMirror editor with syntax highlighting (`components/learn/CodeEditor.tsx`; autocomplete deliberately OFF for learners). Mentor replies + hints/checkpoints render via shared `components/learn/Markdown.tsx` (inline code stays LTR inside Arabic). User is very satisfied with the teaching behavior and auto-checklist.

**Lesson template is now defined by the AI phase** (objective + plain-language checkpoints → auto-graded on Run): all future course content just needs checkpoints written this way and grading comes free. The 5 Python workspace lessons are the reference examples.

**AGREED NEXT STEP (user confirmed — resume here): Firebase persistence.** User creates a Firebase project at console.firebase.google.com (walk them through it step-by-step like the API-key flow); then wire real Auth + Firestore. The data layer is already Firestore-ready — only `lib/data/index.ts` changes; no page should import `mock.ts` directly. Without persistence beta students lose all progress on refresh, so this blocks the free beta.

**Launch blockers table (path to charging money):**

| Blocker | Whose work | Status |
|---|---|---|
| Real AI mentor + checkpoint auto-grading | Claude | ✅ done 2026-06-12 |
| Real persistence (Firebase: accounts, saved progress) | Claude | ⏳ NEXT |
| Remove fabricated testimonials/stats from landing page | Claude | quick, after Firebase |
| Real about/privacy/terms pages | Claude | after that |
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

**Data flow:** pages call functions in `lib/data/index.ts` (e.g. `getCourses()`, `getEnrollments(uid)`), which read from `lib/data/mock.ts`. These signatures are Firestore-ready — when Firebase goes live, only `lib/data/index.ts` changes; no page should ever import from `mock.ts` directly. Domain types live in `lib/types.ts`; every user-facing content string is an `L10n` object (`{ar, en, fr}`).

**AI mentor (phase-2 integration point):** `lib/mentor.ts → getMentorReply()` is the *single* function to replace with the real AI backend. It already receives lesson context, the student's live workspace code, and the user message. The chat UI (`components/learn/MentorChat.tsx`), greeting, and typing states are finished — don't add AI logic anywhere else.

**Auth:** `lib/auth-context.tsx` provides `useAuth()`. Dual-mode: real Firebase when `NEXT_PUBLIC_FIREBASE_API_KEY` exists (checked in `lib/firebase.ts` via `isFirebaseEnabled`), otherwise demo mode backed by localStorage. Routes under `app/(app)/` (dashboard, learn, progress, profile) are guarded by `components/layout/AuthGuard.tsx` in the group layout; `app/courses/` is intentionally public.

**i18n:** custom provider in `lib/language-context.tsx` — no URL locale prefixes. `useLanguage()` gives `t("section.key")` for UI strings (dictionaries in `messages/{ar,en,fr}.json`), `loc(l10nObject)` for content, plus `locale` and `dir`. Locale persists in the `miyar-locale` cookie, read server-side in `app/layout.tsx` to set `<html lang dir>` without a flash. Arabic (`ar`) is the default and is RTL.

**Styling:** semantic design tokens as raw RGB triplets in `app/globals.css` (`--bg`, `--surface`, `--primary` teal, `--accent` gold, `--ink`, `--muted`...), mapped in `tailwind.config.ts` so alpha modifiers work (`bg-primary/10`). Dark mode is class-based via next-themes, **dark is default**. Always use Tailwind logical properties (`ms-`/`me-`/`ps-`/`pe-`/`start-`/`end-`/`text-start`) instead of left/right so layouts flip with RTL. Gold (`accent`) is reserved for CTAs, achievements, and certificates — keep it scarce. Code editors/output panes stay LTR (`dir="ltr"`) even in Arabic UI.

**Learning page:** `app/(app)/learn/[subject]/[topic]/page.tsx` resolves params via `findLesson(courseSlug, lessonSlug)` and renders one of three panels by `lesson.type`: `VideoPanel`, `WorkspacePanel`, or `ReferencePanel`, with `MentorChat` beside it (bottom sheet on mobile). Workspace lessons additionally show `TaskPanel` (objective + checkpoints + hint from the `Lesson` fields — these double as the AI's future grading criteria).

**Code execution:** `lib/runtime.ts` loads Pyodide (real CPython in WASM) lazily from CDN on first Run and exposes `runPython(code)` returning stdout/stderr lines. HTML workspace lessons (`lesson.language === "html"`) render a sandboxed iframe preview instead. Editors and output panes stay `dir="ltr"`.

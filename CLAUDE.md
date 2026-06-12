# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Miyar (معيار) — a premium Arab EdTech platform: structured learning (videos, code workspaces, references) supervised by an AI mentor. Arabic-first with RTL by default. Built in phases: **1) the site (done), 2) AI supervision (next), 3) curriculum content.** Phases 2–3 have deliberate integration points (see below) — preserve them.

## Current status & next steps (updated 2026-06-12)

**Done:** Full site (8 pages) + workspace upgrade: task panels (objective/checkpoints/hint on workspace lessons), real Python execution in-browser via Pyodide (`lib/runtime.ts`), live HTML preview, English-terms content rule applied everywhere.

**Agreed plan — AI supervision comes BEFORE curriculum.** Reason: the AI defines the lesson template (checkpoints, expected outputs, common mistakes) that all future content must follow; building content first would mean rewriting it. The existing 5 Python workspace lessons are the AI testing ground.

**Immediate next step:** build the AI mentor backend — Next.js API route calling the Claude API, Arabic-first system prompt (teach, don't solve; point at the line; explain why; never give final answers; English technical terms), lesson context + live student code injection, streaming replies, prompt caching, checkpoint verification, model configurable via env var (cheap model for testing / best model for quality). **Blocked on:** user creating an Anthropic API key at console.anthropic.com (advised: add payment method, set $10/month spend cap for dev testing; raise to ~$50 when beta students arrive).

**Business decisions discussed (2026-06-12):**
- Unit economics: per-user token budgets tied to plan tier from day one; model tier matches plan tier (free → cheapest model, paid → better); fair-use daily ceiling on "unlimited"; average student ≈ $1–2/month in tokens vs $9 plan → healthy margin.
- Launch readiness: site is ready to SHOW, not to SELL. Blockers before charging money: real persistence (Firebase live), real AI mentor, real content for one flagship course (Python), payments + plan gating, and **removing the fabricated testimonials/stats on the landing page** (placeholder marketing copy — must be replaced with real beta feedback before any public launch).
- Credibility roadmap (for future "globally professional" goal): public certificate verification page (`/verify/[credentialId]`), real privacy/terms/about pages, curriculum mapped to recognized frameworks (e.g. Python Institute PCEP objectives), assessment integrity in the AI phase. Business-side (user's tasks): register a company, real domain, later approach accreditation bodies (e.g. Saudi NELC licenses e-learning platforms).
- Strategy: free beta first to gather real testimonials and validate retention (lesson completion is the metric that matters), then charge.

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

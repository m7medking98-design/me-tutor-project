# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Miyar (معيار) — a premium Arab EdTech platform: structured learning (videos, code workspaces, references) supervised by an AI mentor. Arabic-first with RTL by default. Built in phases: **1) the site (done), 2) AI supervision, 3) curriculum content.** Phases 2–3 have deliberate integration points (see below) — preserve them.

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

**Learning page:** `app/(app)/learn/[subject]/[topic]/page.tsx` resolves params via `findLesson(courseSlug, lessonSlug)` and renders one of three panels by `lesson.type`: `VideoPanel`, `WorkspacePanel` (mock code runner), or `ReferencePanel`, with `MentorChat` beside it (bottom sheet on mobile).

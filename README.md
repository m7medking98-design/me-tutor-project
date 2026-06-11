# معيار — Miyar

**A premium Arab EdTech platform: structured learning under real AI supervision.**

Miyar (Arabic for *"a standard"*) is a hybrid learning platform for MENA students — programming, math, physics and engineering through structured content (videos, code workspaces, references) with an AI mentor that follows every step, pinpoints mistakes the moment they happen, and explains *why*. Not a chat-only product, and not passive video watching.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with a custom design system (deep teal `#0D5C63` + warm gold `#E8B14E`, dark/light themes)
- **Firebase** Auth + Firestore (activates automatically when configured — see below)
- `framer-motion`, `lucide-react`, `next-themes`
- Arabic-first: RTL by default, ar/en/fr language toggle, Noto Sans Arabic

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

The platform runs fully in **demo mode** out of the box: click *"دخول تجريبي / Demo login"* on the login page to explore with a seeded student account (courses, progress, streak, mentor sessions, certificates).

## Pages

| Route | What it is |
|---|---|
| `/` | Marketing landing: animated mentor preview, how-it-works, catalog, testimonials, pricing, FAQ |
| `/courses` | Filterable catalog (subject / level / language) with per-user progress |
| `/courses/[slug]` | Course detail: syllabus, outcomes, enroll/continue |
| `/dashboard` | Student home: continue card, streak + XP, weak areas, sessions, milestones |
| `/learn/[subject]/[topic]` | **The core experience**: video / code workspace / reference panel + AI mentor chat |
| `/progress` | Mastery heatmap, strengths/weaknesses, time charts, session history, certificates |
| `/profile` | Language, theme, notifications, subscription, connected accounts |
| `/login`, `/signup` | Auth (demo mode or Firebase) |

## Activating Firebase

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com), enable **Authentication** (Email/Password + Google) and **Firestore**.
2. Copy `.env.local.example` → `.env.local` and fill in the web-app config values.
3. Restart the dev server. Real auth replaces demo mode automatically — no code changes.

## Architecture notes for the next phases

- **AI supervision phase:** `lib/mentor.ts → getMentorReply()` is the single integration point. Replace its body with a call to the AI backend (it already receives lesson context, the student's live workspace code, and the message). Everything else — chat UI, greeting, typing states — is done.
- **Data:** all pages read through `lib/data/index.ts`, whose function signatures are Firestore-ready. Swap the mock reads for Firestore queries without touching any page.
- **Curriculum phase:** course/module/lesson content lives as typed `L10n` objects (`lib/types.ts`); the reference-lesson reading view and video chapters are ready to receive real content.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build (type-checks everything)
- `npm run lint` — ESLint

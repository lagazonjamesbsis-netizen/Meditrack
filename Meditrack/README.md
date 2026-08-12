# MediTrack

MediTrack (PRAMIS — Patient Records and Appointment Management Information System) is a healthcare-focused **Next.js 16** application. It provides patient registration, government ID verification, appointment booking, medical records, and role-based account management — deployed on Vercel with Neon PostgreSQL and Vercel Blob.

> **Project root:** the application lives in the `Meditrack/` subdirectory of the repository, **not** at the repo root. Everything below is relative to `Meditrack/`. All commands must be run from `Meditrack/` (or Vercel must be configured with Root Directory = `Meditrack`).

---

## Features

- **Authentication** — Email/password login via NextAuth.js v4 (Credentials provider, JWT sessions)
- **User management** — Role-based access control (`SUPERADMIN`, `ADMIN`, `USER`), soft-delete, paginated user table
- **Profile management** — Users update their own name, email, avatar image, and password
- **File uploads** — Avatar images stored on Vercel Blob
- **Email** — Password reset via Nodemailer + Brevo SMTP
- **Data tables** — Paginated, server-side sorted user list
- **UI** — Tailwind CSS 4, Lucide icons, Sonner toasts, responsive layouts (desktop + mobile)

---

## Tech Stack

| Layer | Package |
|---|---|
| Framework | Next.js 16 (App Router) |
| Auth | NextAuth.js v4 |
| Database | Neon PostgreSQL via Prisma 7 |
| File storage | Vercel Blob |
| Email | Nodemailer + Brevo SMTP |
| State (client) | Zustand 5 |
| Toasts | Sonner |
| Icons | Lucide React |
| CSS | Tailwind CSS 4 (PostCSS, no config file) |
| Language | TypeScript (strict mode OFF) |

*Exact versions are documented in `AGENTS.md` for CI/CD reproducibility.*

---

## Terminology & Conventions

### Role hierarchy

```
SUPERADMIN  →  ADMIN  →  USER
```

- `SUPERADMIN` has full access (can manage all users, including admins).
- `ADMIN` can manage regular users.
- `USER` has no admin access — profile and security only.

### Soft delete

Users are never hard-deleted. When deleted, their `deletedAt` field is set to the current timestamp. Every query for active users must filter `deletedAt: null`. This is the single most important convention in the codebase.

### Template system

Pages use layouts defined in `templates/`:

| Template | Layout | Used for |
|---|---|---|
| `Default` | Header + main + Footer | Public pages (home, etc.) |
| `Blank` | Main only | Auth pages (login, signup, password reset) |
| `Dashboard` | Aside + HeaderDashboard + main + Footer | All `/dashboard/*` routes |

Route protection is done per-page using `getServerSession()` — there is no middleware.

### Authentication model

JWT sessions (no database session table). Session max age is 1 day. The session user object contains `id`, `name`, `email`, `role`, and `image`. The JWT is refreshed when the user updates their profile (you must call `update()` on the client after mutation).

### Caching (two distinct mechanisms)

1. **`'use cache'`** — Persistent, tag-based caching for read queries (list and detail). Tags like `users` and `user-{id}` are invalidated after mutations.
2. **`react cache()`** — Per-request deduplication only (used by `getMe()`). Lives for one HTTP request, not shared across requests.

Do not mix the two up. See `AGENTS.md` for exact code patterns.

### Zustand — client UI state only

Zustand stores hold purely presentational state (sidebar minimized, mobile drawer open). They **never** store server data. A `<HydrationZustand>` wrapper prevents SSR hydration mismatches.

---

## Architecture Overview

### Auth flow

```
Browser                  Next.js Server                 Neon DB
   │                         │                            │
   │── POST /login ──────────┤                            │
   │    { email, password }  │                            │
   │                         │── findUnique(email) ───────┤
   │                         │◄── { id, name, role, … } ──┤
   │                         │                            │
   │                         │── bcrypt.compare(password)  │
   │                         │── update loggedInAt ───────┤
   │                         │                            │
   │                         │── Sign JWT (id, name,      │
   │                         │    email, image, role)      │
   │◄── Set httpOnly cookie ──┤                            │
```

### Data flow (server actions)

All mutations go through server actions in `lib/actions/`. They follow this pattern:

1. Client form calls server action via `useActionState`
2. Server action validates session (`getServerSession`)
3. Mutates database via Prisma
4. Revalidates cache tags if needed
5. Returns `{ success: boolean, message: string, payload?: any }`

Read queries use `'use cache'` with tags for automatic deduplication and manual invalidation. `getMe()` uses `react cache()` for per-request dedup only.

### Directory layout

```
src/
  app/                      # Next.js App Router
    api/auth/[...nextauth]/ # NextAuth API handler
    dashboard/              # Protected pages (users, profile, security)
    login/                  # Public auth pages
    signup/
    forgot-password/
    reset-password/
    settings/               # Patient settings pages
  components/               # patient/, onboarding/, globals/
  lib/                      # dateUtils, etc.

components/                 # Shared UI (imported via @/components/...)
  forms/                    # Login, Signup, Profile, Security forms
  globals/                  # Header, Footer, Aside, Drawer
  users/UsersTable.tsx      # Paginated user list

config/constants.ts         # APP_NAME, APP_BASE_URL, SMTP constants, USERS_PER_PAGE

lib/                        # @/lib/... (prisma.ts, authOptions.ts, mailer.ts, actions/)
  authOptions.ts            # NextAuth config
  prisma.ts                 # Prisma singleton (Neon adapter)
  mailer.ts                 # Nodemailer/Brevo SMTP transport
  actions/                  # Server actions (user.ts, me.ts, media.ts, util.ts)

prisma/
  schema.prisma             # Database schema
  seed.ts                   # Seeds default admin + midwife
  migrations/               # Migration history

store/                      # Zustand stores (useAside, useDrawer)

templates/                  # Layout templates (Default, Dashboard, Blank)

types/                      # Shared TypeScript types
```

> **Path resolution:** `@/*` maps to `./src/*` first, then `./*` (see `tsconfig.json`). So `@/lib/prisma` resolves to root `lib/prisma.ts` (there is no `src/lib/prisma`), while components under `src/components/` win over any name collision with root `components/`. Keep this in mind when adding new shared modules.

---

## Setup

### Prerequisites

- **Node.js v22.14.x** (CI and Vercel are pinned here; v20.9+ works)
- **A Neon PostgreSQL database** (free tier is fine)
- **A Vercel account** — only needed for deploy/img-upload (optional for local dev)
- **vercel CLI** (`npm i -g vercel`) — only needed for `vercel env pull`
- **npm ≥ 11.16**: installs may block postinstall scripts by default. If you see `allow-scripts` warnings (esbuild / bcrypt / sharp / prisma), run `npm approve-scripts --allow-scripts-pending` once, then re-run `npm install`.

### Installation

The app root is `Meditrack/`, so from a fresh clone:

```bash
git clone https://github.com/lagazonjamesbsis-netizen/Meditrack.git
cd Meditrack              # ← project root (app subdirectory)
npm ci                    # or npm install (approve scripts if prompted)
cp .env.example .env.local   # then fill in real values (see table below)
npx prisma generate       # REQUIRED — Prisma 7 does not auto-generate the client
```

> Alternative env bootstrap: `vercel env pull .env.local` (if the Vercel project is configured and you have CLI access). Otherwise copy `.env.example` and fill it manually.

### Database setup

```bash
npm run db:push            # Create/update schema on Neon
npm run db:seed            # Create default admin + midwife accounts
npm run dev                # Start dev server on http://localhost:3000
```

### Default accounts (after seeding)

```
email:    admin@domain.com      role: SUPERADMIN
password: defaultpass

email:    vhernandez@meditrack.com   role: USER
password: Midwife@2026
```

> **Important:** `next build` also requires the Prisma client to be generated *first*
> (production command is `prisma generate && next build`). A build run without
> `prisma generate` fails with `@prisma/client` errors.

---

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Build for production (run `npx prisma generate` first) |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run `tsc --noEmit` |
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:migrate` | Create + apply migration (add `--name <name>`) |
| `npm run db:push` | Push schema without migration (dev only) |
| `npm run db:reset` | Drop DB, re-run migrations + seed |
| `npm run db:seed` | Seed default admin user |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:deploy` | Apply pending migrations (production) |

---

## Verification (defense readiness)

```bash
npm ci                 # install
npx prisma generate    # generate Prisma client
npm run build          # production build
npm run lint           # ESLint (0 errors; only no-img-element warnings)
npm run type-check     # tsc --noEmit
npm run dev            # dev server on :3000
```

All of the above pass on a clean clone **without any Vercel involvement**.

---

## Environment Variables

Loaded from `.env.local` (never committed). Copy `.env.example` → `.env.local` and fill values, or use `vercel env pull .env.local`.

Legend: **[DEV]** needed locally · **[BUILD]** needed for `prisma generate` + `next build` · **[DEPLOY]** needed on Vercel.

| Variable | Purpose | Dev | Build | Deploy |
|---|---|---|---|---|
| `DATABASE_URL` | Pooled Neon connection (runtime, `lib/prisma.ts`, seed) | ✅ | ✅ | ✅ |
| `DATABASE_URL_UNPOOLED` | Direct Neon connection (Prisma CLI via `prisma.config.ts`) | ✅ | ✅ | ✅ |
| `NEXTAUTH_SECRET` | JWT signing key (`lib/authOptions.ts`) | ✅ | ✅ | ✅ |
| `NEXTAUTH_URL` | Base URL for auth callbacks — dev `http://localhost:3000`, prod `https://meditrack.vercel.app` | ✅ | ✅ | ✅ |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob API token (`lib/actions/media.ts`) | ✅ | – | ✅ |
| `SMTP_HOST` | Brevo SMTP host (`lib/mailer.ts`) | ✅ | – | ✅ |
| `SMTP_USER` | Brevo SMTP login email (`lib/mailer.ts`) | ✅ | – | ✅ |
| `SMTP_KEY` | Brevo SMTP API key (`lib/mailer.ts`) | ✅ | – | ✅ |

**Notes**
- `BLOB_STORE_ID`, `BLOB_WEBHOOK_PUBLIC_KEY`, `PG*/POSTGRES_*/NEON_*/VITE_NEON_AUTH_URL`, `VERCEL_OIDC_TOKEN` also appear in `.env.local` pulls but are **not read by application code** — optional/tooling only.
- Missing `SMTP_USER` (or any SMTP var) degrades gracefully: password-reset emails fail silently, the rest of the app works.
- Missing `DATABASE_URL_UNPOOLED` breaks `prisma generate`/`migrate`/`seed` (Prisma CLI aborts), which in turn breaks the build.

---

## Deployment (Vercel)

The app root is the `Meditrack/` subdirectory. Vercel project settings that must match:

| Setting | Value |
|---|---|
| **Root Directory** | `Meditrack` ← the critical one |
| **Framework** | Next.js |
| **Build Command** | `prisma generate && next build` |
| **Install Command** | `npm install` |
| **Output Directory** | `.next` (Next.js default) |
| **Node.js Version** | `22.14.x` (or `22.x`) |
| **Environment Variables** | all 8 from the table above |

1. In Vercel → Project → Settings → General → set **Root Directory** to `Meditrack`
2. Under Settings, set the **Build Command** shown above
3. Add all environment variables (Production + Preview) in Settings → Environment Variables
4. Redeploy

> **Why:** the repository is structured as `Meditrack/` (app) inside the repo root. If Root Directory stays `/`, Vercel finds no `package.json` and the deploy fails instantly — while GitHub CI passes because it runs with `working-directory: Meditrack`.

The Vercel Blob storage domain is allowlisted in `next.config.ts` for use with `<Image>`.

---

## For AI Agents

If you're an AI agent working on this codebase, read `AGENTS.md` for the full technical reference — exact import paths, caching gotchas, auth callback internals, and code conventions that are critical for correct code generation.

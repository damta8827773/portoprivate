# Damta Portfolio — Full-Stack (v3.0)

Professional full-stack migration of Damta Noviyan Muhamad Faiz's portfolio, from a
static HTML/CSS/vanilla-JS site to a typed monorepo.

- **Frontend:** React 18 · TypeScript · Vite · Tailwind CSS · React Router · React Query · Zustand
- **Backend:** Node.js · Express · TypeScript · Prisma ORM · Zod
- **Database:** MySQL 8 (via Docker)
- **Auth:** Firebase Google sign-in (chat-room identity only)

The UI is intentionally **identical** to the original: the proven design system in
`apps/web/src/styles/app.css` is reused verbatim, while Tailwind powers new layout
utilities. All previously hard-coded content (projects, certificates, skills, timeline,
history, demographics, visitor stats, comments) now lives in MySQL behind a REST API.

## Structure

```
portofolio/
├─ apps/
│  ├─ web/        # React + Vite frontend
│  └─ api/        # Express + Prisma backend
├─ packages/
│  └─ types/      # Shared TypeScript DTOs (web ⇄ api)
├─ legacy/        # Original static HTML/CSS/JS (reference)
├─ docker-compose.yml   # MySQL 8
├─ .env.example
└─ package.json   # npm workspaces orchestrator
```

## Prerequisites

- Node.js ≥ 20
- Docker (for local MySQL) — or an existing MySQL 8 instance

## Quick start

```bash
# 1. Install all workspace dependencies
npm install

# 2. Configure environment
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
#   (fill VITE_FIREBASE_* in apps/web/.env if you want the chat login)

# 3. Start MySQL
npm run db:up

# 4. Create schema + seed data
npm run db:migrate     # prisma migrate dev
npm run db:seed        # loads projects, certs, skills, timeline, etc.

# 5. Run both apps (api:4000, web:5173)
npm run dev
```

Open http://localhost:5173. The Vite dev server proxies `/api` → `http://localhost:4000`.

## Scripts (root)

| Script | Description |
|---|---|
| `npm run dev` | Run API + web concurrently |
| `npm run dev:api` / `npm run dev:web` | Run one side |
| `npm run build` | Build API then web |
| `npm run db:up` / `db:down` | Start / stop MySQL container |
| `npm run db:migrate` | Prisma migrate (dev) |
| `npm run db:seed` | Seed database |
| `npm run lint` / `npm run format` | ESLint / Prettier |

## API endpoints

Base: `http://localhost:4000/api` — standard envelope `{ success, data }` / `{ success:false, error }`.

| Method | Path | Purpose |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/projects` | Featured + extra projects |
| GET | `/certificates` | Achievements |
| GET | `/skills` | Tech marquee items (row 1/2) |
| GET | `/timeline` | Career & education |
| GET | `/history` | Journey by year |
| GET | `/stats/countries` | Demographics bars |
| GET | `/stats/visitors` | Monthly visitor chart data |
| GET | `/visitors/count` · POST `/visitors/hit` | Total visitor counter |
| GET | `/github` | Cached GitHub profile/repos/languages |
| GET · POST | `/comments` | Chat room (list / create + replies) |
| POST | `/contact` | Contact form submissions |

## The 7 UI adjustments (from `CLAUDE.md`)

1. Loading screen → professional **gold & brown** palette
2. Light-mode hero video → overlay reduced (no white fog)
3. Hero marquee hidden on mobile (laptop only)
4. 15+ technologies represented
5. Projects show 6, rest behind a bilingual **See More**
6. Demographics & statistics laid out **side-by-side**
7. 3D robot greeting works on **all devices** (touch enabled)

## Notes

- Comments were migrated off Firestore to MySQL; Firebase is kept only for Google
  sign-in identity. Owner replies are supported (`damtafaiz@gmail.com`).
- The GitHub dashboard is proxied/cached server-side to respect API rate limits.
- The original static files remain in `legacy/` for reference.

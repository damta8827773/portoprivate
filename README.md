<div align="center">

# Damta Portfolio — Full-Stack Platform

**Official source code of the personal portfolio of Damta Noviyan Muhamad Faiz.**
A production-grade, full-stack web application — engineered, typed, and run from the terminal.

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](#)
[![React](https://img.shields.io/badge/React%2018-20232A?logo=react&logoColor=61DAFB)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](#)
[![Node.js](https://img.shields.io/badge/Node.js%2020+-339933?logo=node.js&logoColor=white)](#)
[![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](#)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)](#)
[![MySQL](https://img.shields.io/badge/MySQL%208-4479A1?logo=mysql&logoColor=white)](#)

</div>

---

## Overview

This repository is a **monorepo** that hosts a complete, type-safe full-stack
application. It is **not** a static HTML page served by a live-preview extension —
it is a real client/server system started from the command line: a React + Vite
frontend, an Express REST API, and a MySQL database managed through Prisma.

Every piece of content (projects, certificates, skills, career timeline,
demographics, visitor analytics, and the live chat room) is served by the API and
persisted in the database, with end-to-end TypeScript types shared between the two
applications.

## Tech Stack

| Layer | Technologies |
| --- | --- |
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, React Router, TanStack Query, Zustand |
| **Backend** | Node.js, Express, TypeScript, Prisma ORM, Zod |
| **Database** | MySQL 8 (Docker) |
| **Auth** | Firebase Authentication (Google) — identity only |
| **Tooling** | npm workspaces, ESLint, Prettier, Pino, Helmet |

## Architecture

```
portofolio/
├─ apps/
│  ├─ web/                 # React + Vite client
│  │  └─ src/
│  │     ├─ components/    # layout + ui primitives
│  │     ├─ features/      # hero, projects, dashboard, comments, …
│  │     ├─ hooks/         # data + interaction hooks
│  │     ├─ i18n/          # ID / EN dictionaries
│  │     ├─ lib/           # api client, query client, firebase
│  │     └─ store/         # Zustand (theme, language)
│  └─ api/                 # Express + Prisma server
│     ├─ prisma/           # schema + seed
│     └─ src/
│        ├─ controllers/   # request handlers
│        ├─ services/      # business logic (GitHub, …)
│        ├─ middleware/    # auth, validation, errors
│        ├─ schemas/       # Zod input contracts
│        └─ config / lib   # env, prisma, logger
├─ packages/
│  └─ types/               # shared DTOs (web ⇄ api)
├─ docker-compose.yml      # MySQL 8 service
└─ package.json            # workspace orchestrator
```

## Getting Started

> Everything runs from the terminal. No "Open with Live Server" required.

### Prerequisites

- **Node.js** ≥ 20
- **Docker** (for local MySQL) — or any MySQL 8 instance

### 1. Install

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

Fill `apps/web/.env` Firebase keys to enable the chat sign-in (optional — the app
runs without them).

### 3. Database

```bash
npm run db:up        # start MySQL (Docker)
npm run db:migrate   # apply Prisma schema
npm run db:seed      # load initial content
```

### 4. Run

```bash
npm run dev          # API → :4000   ·   Web → :5173
```

Open **http://localhost:5173**. The Vite dev server proxies `/api` to the backend.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Run API and web concurrently |
| `npm run dev:api` · `npm run dev:web` | Run a single app |
| `npm run build` | Production build (API + web) |
| `npm run db:up` · `db:down` | Start / stop MySQL |
| `npm run db:migrate` · `db:seed` | Schema migration / seeding |
| `npm run lint` · `npm run format` | ESLint / Prettier |

## API Reference

Base URL `http://localhost:4000/api` — every response uses a consistent envelope:
`{ "success": true, "data": … }` or `{ "success": false, "error": { … } }`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/health` | Service health check |
| `GET` | `/projects` · `/certificates` · `/skills` | Portfolio content |
| `GET` | `/timeline` · `/history` | Career & education |
| `GET` | `/stats/countries` · `/stats/visitors` | Dashboard analytics |
| `GET` `POST` | `/visitors/count` · `/visitors/hit` | Visitor counter |
| `GET` | `/github` | Cached GitHub profile, repos & languages |
| `GET` `POST` | `/comments` | Chat room (authenticated writes) |
| `POST` | `/contact` | Contact form |

## Security

- **Token-verified writes** — comment submissions require a Firebase ID token that
  is verified server-side (`firebase-admin`); identity is derived from the token,
  never from the request body, preventing impersonation.
- **Input validation** — every write endpoint is validated with Zod.
- **Hardened transport** — Helmet, configurable CORS allow-list, and rate limiting
  on write endpoints.
- **No secret leakage** — secrets live only in `.env` (git-ignored); the GitHub
  token is server-side only and never shipped to the client.
- **Safe persistence** — all database access is parameterized through Prisma.

## License & Usage

Published as the official source code for educational analysis and technical
reference. Please use this repository to understand the underlying engineering and
architecture rather than for direct duplication.

<div align="center">

**Built by Damta Noviyan Muhamad Faiz** · Full Stack Developer

</div>

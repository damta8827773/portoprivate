# 👨‍💻 Damta Noviyan Muhamad Faiz | Full-Stack Portfolio Platform

![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Frontend](https://img.shields.io/badge/Frontend-React%2018%20%7C%20TypeScript%20%7C%20Vite-61DAFB)
![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express%20%7C%20Prisma-339933)
![Database](https://img.shields.io/badge/Database-MySQL%208-4479A1)

## 📌 Project Overview

Welcome to the official repository of my personal portfolio - now re-engineered into
a **production-grade, full-stack platform**.

What began as a static site has been architected into a **typed monorepo**: a
**React 18 + TypeScript (Vite)** frontend talking to a **Node.js + Express + Prisma**
REST API backed by **MySQL**. All content - projects, certificates, skills, career
timeline, analytics, and the live chat room - is served dynamically from the API and
persisted in the database.

The signature **Glassmorphism Design**, **Neon Aesthetics**, and **interactive 3D/scroll
animations** are fully preserved - this is the same experience, rebuilt on a
professional, scalable foundation that **runs from the terminal**, not a live-preview
extension.

---

## ⚠️ Academic Integrity & Usage Policy

**Please read this section carefully before exploring the code.**

This repository is strictly categorized as **Open Source for Educational Analysis**.

> "Official source code for my personal portfolio. Published for **educational analysis and technical reference only**. To foster authentic learning and professional growth, please utilize this repository to understand the underlying logic rather than for direct duplication."

### ✅ Permitted Use:
* **Code Analysis:** Reviewing the architecture to understand monorepo structure, API design, and state management.
* **Reference:** Using specific patterns (e.g. the i18n system, theme store, or token-verified comments) to implement in your own unique projects.
* **Inspiration:** Observing how a static site is migrated into a typed full-stack application.

### ❌ Prohibited Use:
* **Direct Cloning:** Copy-pasting the entire codebase and deploying it as your own portfolio.
* **Plagiarism:** Claiming this work, design, or architecture as your own intellectual property.

> *"True mastery in engineering comes from building, breaking, and fixing code yourself-not by copying results."*

---

## 🛠️ Technical Specifications

This project demonstrates mastery across the full stack:

| Layer | Implementation Details |
| :--- | :--- |
| **Frontend** | React 18 + TypeScript, Vite, Tailwind CSS, React Router, TanStack Query (server state), Zustand (UI state). |
| **Backend** | Node.js + Express + TypeScript, layered controllers/services/middleware, Pino logging, Helmet, CORS allow-list, rate limiting. |
| **Database** | MySQL 8 modeled with Prisma ORM - type-safe queries, migrations, and seeding. |
| **Validation** | Zod schemas guarding every write endpoint. |
| **Auth** | Firebase Authentication (Google) with **server-side ID-token verification** to prevent identity spoofing. |
| **Architecture** | npm-workspaces monorepo (`frontend`, `backend`, `shared/types`) with shared end-to-end types. |

---

## 📂 Project Structure

```
portoprivate/
├─ frontend/            # React + TypeScript + Vite client
│  └─ src/
│     ├─ components/    # layout + ui primitives
│     ├─ features/      # hero, projects, dashboard, comments, ...
│     ├─ hooks/         # data + interaction hooks
│     ├─ i18n/          # ID / EN dictionaries
│     ├─ lib/           # api client, query client, firebase
│     └─ store/         # global UI state (theme, language)
│
├─ backend/             # Node.js + Express + Prisma API
│  ├─ prisma/           # schema + seed
│  └─ src/
│     ├─ controllers/   # request handlers
│     ├─ services/      # business logic (GitHub, ...)
│     ├─ middleware/    # auth, validation, errors
│     ├─ schemas/       # Zod input contracts
│     └─ config, lib    # env, prisma, logger
│
├─ shared/
│  └─ types/            # shared TypeScript DTOs (frontend + backend)
│
├─ docker-compose.yml   # MySQL 8 service
├─ tsconfig.base.json   # shared TypeScript config
└─ package.json         # workspace orchestrator
```

---

## ✨ Key Features

* **⚡ Dynamic Theme Switcher:** Seamless toggle between Dark Mode (Neon) and Light Mode.
* **🌐 Internationalization (i18n):** Built-in dual-language support (Indonesian & English).
* **📱 Fully Responsive:** Optimized for Desktop, Tablet, and Mobile with a custom hamburger menu.
* **🎨 Advanced UI/UX:** 3D hover/tilt effects, particle background, command palette (`Ctrl+K`), and an interactive 3D robot.
* **🔌 REST API:** All portfolio data served from a documented, versioned Express API.
* **💬 Live Chat Room:** Authenticated comments & owner replies, secured by verified Firebase tokens.
* **📊 Live Dashboard:** Real-time GitHub stats, visitor analytics, and country demographics.

---

## 🚀 Getting Started (Local Development)

> This is a real client/server application - it runs **from the terminal**, not by opening an HTML file.

### Prerequisites
- **Node.js** >= 20
- **Docker** (for local MySQL) - or any MySQL 8 instance

### 1. Clone & install
```bash
git clone https://github.com/damta8827773/portoprivate.git
cd portoprivate
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 3. Set up the database
```bash
npm run db:up        # start MySQL (Docker)
npm run db:migrate   # apply the Prisma schema
npm run db:seed      # load initial content
```

### 4. Run the apps
```bash
npm run dev          # API -> http://localhost:4000   -   Web -> http://localhost:5173
```

Open **http://localhost:5173** in your browser.

---

## 📬 Contact

If you have any questions regarding the architecture or want to discuss a potential collaboration, feel free to reach out.

* **LinkedIn:** [Damta Noviyan Muhamad Faiz](https://www.linkedin.com/in/damta-faiz-955493221)
* **Email:** damtafaiz@gmail.com

---

<p align="center">
  Created with passion by <strong>Damta Noviyan Muhamad Faiz</strong>. <br>
  <em>Happy Coding & Keep Learning! 🚀</em>
</p>

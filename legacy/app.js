// ==========================================================================
// 0-A. CUSTOM CURSOR — Minimal Professional
// ==========================================================================
(function initCursor() {
    const dot  = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    // Skip pada touch device
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';
    });

    (function raf() {
        rx += (mx - rx) * 0.1;
        ry += (my - ry) * 0.1;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        requestAnimationFrame(raf);
    })();

    const CLICK_SEL = 'a, button, [onclick], label, .btn-view, .cta-primary, .cta-secondary, .control-btn, .social-icon-btn, .hamburger, .profil-social-item, .tech-item, .project-card, .cert-card, .timeline-card, .cmdK-hint, .cmd-item, .about-us-header';
    const TEXT_SEL  = 'p, h1, h2, h3, h4, h5, span, li, textarea';

    document.addEventListener('mouseover', e => {
        const t = e.target;
        if (t.closest(CLICK_SEL)) {
            dot.classList.add('hov');   ring.classList.add('hov');
            dot.classList.remove('txt'); ring.classList.remove('txt');
        } else if (t.matches(TEXT_SEL)) {
            dot.classList.add('txt');   ring.classList.add('txt');
            dot.classList.remove('hov'); ring.classList.remove('hov');
        }
    });

    document.addEventListener('mouseout', () => {
        dot.classList.remove('hov', 'txt');
        ring.classList.remove('hov', 'txt');
    });

    document.addEventListener('mousedown', () => { dot.classList.add('clk'); ring.classList.add('clk'); });
    document.addEventListener('mouseup',   () => { dot.classList.remove('clk'); ring.classList.remove('clk'); });

    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
})();

// ==========================================================================
// 0-B. FULL STACK ARCHITECTURE — VS CODE WINDOW
// ==========================================================================
const VS_TECH = {
    'HTML5':      { img: null, icon: 'ri-html5-fill', color: '#e34f26', cat: 'Frontend', level: 95, desc: '// Pondasi semua proyek web saya.\n// Semantik HTML5 untuk SEO & aksesibilitas optimal.', projects: ['Semua Proyek', 'Web Portfolio', 'Web Ecommerce'], code: '<!-- index.html -->\n<!DOCTYPE html>\n<html lang="id">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>Damta Portfolio</title>\n</head>\n<body>\n  <div id="root"></div>\n</body>\n</html>' },
    'CSS3':       { img: null, icon: 'ri-css3-fill',  color: '#264de4', cat: 'Frontend', level: 92, desc: '// Styling kompleks: Grid, Flexbox, Animasi.\n// Glassmorphism, Neon effects, dan desain responsif.', projects: ['Semua Proyek', 'Web Portfolio'], code: '/* Modern CSS — Grid + Custom Properties */\n:root {\n  --primary: #1d4ed8;\n  --radius: 1rem;\n}\n\n.hero {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 2rem;\n  min-height: 100vh;\n  place-items: center;\n}' },
    'JavaScript': { img: null, icon: 'ri-javascript-fill', color: '#f7df1e', cat: 'Frontend', level: 88, desc: '// Logika interaktif sisi klien.\n// DOM manipulation, async/await, dan Fetch API.', projects: ['Semua Proyek', 'Web Relationship', 'Web Roadmap'], code: '// Vanilla JS — async fetch + DOM\nconst fetchData = async (url) => {\n  try {\n    const res = await fetch(url);\n    const data = await res.json();\n    document.querySelector("#app").innerHTML =\n      data.map(item => item.name).join(", ");\n  } catch (e) {\n    console.error("Error:", e);\n  }\n};\n\nfetchData("/api/projects");' },
    /* ── POLYGLOT PRO: Backend Languages ── */
    'Go':         { img: 'assets/img/go.png', cat: 'Backend (Go)', level: 72, desc: '// Compiled, statically-typed, lightning-fast.\n// Dipakai untuk high-performance API & microservices.', projects: ['API Service', 'CLI Tools', 'Microservices'], code: 'package main\n\nimport (\n\t"encoding/json"\n\t"net/http"\n)\n\nfunc usersHandler(w http.ResponseWriter, r *http.Request) {\n\tusers := []string{"Damta", "BKI", "UIN"}\n\tw.Header().Set("Content-Type", "application/json")\n\tjson.NewEncoder(w).Encode(users)\n}\n\nfunc main() {\n\thttp.HandleFunc("/api/users", usersHandler)\n\thttp.ListenAndServe(":8080", nil)\n}' },
    'Python':     { img: 'assets/img/python.png', cat: 'AI / Scripting', level: 74, desc: '// Versatile: data science, scripting, automation.\n// Digunakan untuk AI pipeline dan data processing.', projects: ['AI Service', 'Data Tools', 'Automation'], code: 'from fastapi import FastAPI\nfrom google.generativeai import GenerativeModel\nimport google.generativeai as genai\n\napp = FastAPI()\ngenai.configure(api_key="GEMINI_KEY")\nmodel = GenerativeModel("gemini-2.5-flash")\n\n@app.post("/ai/chat")\nasync def chat(prompt: str):\n    response = model.generate_content(prompt)\n    return {"reply": response.text}' },
    'Rust':       { img: 'assets/img/rust.png', cat: 'Systems (Rust)', level: 55, desc: '// Memory-safe, blazingly fast systems programming.\n// Zero-cost abstractions, no garbage collector.', projects: ['CLI Tools', 'Systems Programming'], code: 'use std::collections::HashMap;\n\nfn word_count(text: &str) -> HashMap<&str, usize> {\n    let mut map = HashMap::new();\n    for word in text.split_whitespace() {\n        let count = map.entry(word).or_insert(0);\n        *count += 1;\n    }\n    map\n}\n\nfn main() {\n    let text = "hello world hello rust";\n    let counts = word_count(text);\n    println!("{:?}", counts);\n}' },
    'Kotlin':     { img: 'assets/img/kotlin.png', cat: 'Mobile (Android)', level: 63, desc: '// Modern JVM language for Android development.\n// Concise, null-safe, and fully interoperable with Java.', projects: ['Android App', 'Mobile Projects'], code: 'import android.os.Bundle\nimport androidx.appcompat.app.AppCompatActivity\n\nclass MainActivity : AppCompatActivity() {\n\n    override fun onCreate(savedInstanceState: Bundle?) {\n        super.onCreate(savedInstanceState)\n        setContentView(R.layout.activity_main)\n\n        val greeting = buildGreeting("Damta")\n        println(greeting)\n    }\n\n    private fun buildGreeting(name: String) =\n        "Hello, $name! Welcome to BKI."\n}' },
    'Java':       { img: 'assets/img/java.png', cat: 'Backend (JVM)', level: 62, desc: '// Enterprise-grade OOP, JVM ecosystem.\n// Spring Boot, Jakarta EE, dan Android SDK.', projects: ['Enterprise Apps', 'Android SDK', 'Kampus'], code: 'import java.util.List;\nimport java.util.stream.Collectors;\n\npublic class ProjectService {\n\n    public List<String> getActiveProjects(List<Project> projects) {\n        return projects.stream()\n            .filter(Project::isActive)\n            .map(Project::getName)\n            .sorted()\n            .collect(Collectors.toList());\n    }\n}' },
    'Elixir':     { img: 'assets/img/elixir.png', cat: 'Functional (Elixir)', level: 50, desc: '// Functional, fault-tolerant, built on Erlang VM.\n// Ideal untuk distributed systems & real-time apps.', projects: ['Functional Projects', 'Learning'], code: 'defmodule Portfolio.Router do\n  use Plug.Router\n\n  plug :match\n  plug :dispatch\n\n  get "/api/projects" do\n    projects = Portfolio.Repo.list_projects()\n    json = Jason.encode!(projects)\n    send_resp(conn, 200, json)\n  end\n\n  match _ do\n    send_resp(conn, 404, "Not Found")\n  end\nend' },
    'C++':        { img: 'assets/img/cpp.png', cat: 'Systems (C++)', level: 58, desc: '// High-performance systems & game dev.\n// Manual memory management dengan RAII pattern.', projects: ['Systems Programming', 'Algorithms'], code: '#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> nums = {5, 2, 8, 1, 9, 3};\n\n    std::sort(nums.begin(), nums.end());\n\n    for (const auto& n : nums) {\n        std::cout << n << " ";\n    }\n    return 0;\n}' },
    'Ruby':       { img: 'assets/img/ruby.png', cat: 'Scripting (Ruby)', level: 48, desc: '// Elegant scripting & Rails web framework.\n// Convention over configuration.', projects: ['Web Scripting', 'Automation'], code: 'require "sinatra"\nrequire "json"\n\nget "/api/hello" do\n  content_type :json\n  { message: "Hello from Ruby!", author: "Damta" }.to_json\nend\n\npost "/api/data" do\n  body = JSON.parse(request.body.read)\n  { received: body }.to_json\nend' },
    'Lua':        { img: 'assets/img/lua.png', cat: 'Scripting (Lua)', level: 45, desc: '// Lightweight embedded scripting language.\n// Digunakan untuk game modding & plugin scripting.', projects: ['Game Scripting', 'Config Tools'], code: '-- Lua script: simple event system\nlocal EventEmitter = {}\nEventEmitter.__index = EventEmitter\n\nfunction EventEmitter:new()\n  return setmetatable({ handlers = {} }, self)\nend\n\nfunction EventEmitter:on(event, fn)\n  self.handlers[event] = fn\nend\n\nfunction EventEmitter:emit(event, data)\n  if self.handlers[event] then\n    self.handlers[event](data)\n  end\nend' },
    'React.js':      { img: 'assets/img/react.png',   cat: 'Frontend', level: 82, desc: '// Komponen reusable & state management.\n// Dipakai untuk web portfolio & aplikasi dinamis.', projects: ['Web Portfolio', 'Web Rangkum Bisnis'], code: `import { useState } from 'react';\n\nfunction App() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(c=>c+1)}>{count}</button>;\n}` },
    'Next.js':       { img: 'assets/img/nextjs.png', cat: 'Frontend', level: 78, desc: '// SSR & SSG untuk performa tinggi.\n// Digunakan dalam proyek full-stack modern.', projects: ['Web Rangkum Bisnis', 'Web Premium'], code: `// app/page.tsx\nexport default async function Page() {\n  const data = await fetch('/api/hello');\n  return <main>{await data.json()}</main>;\n}` },
    'TypeScript':    { img: 'assets/img/typescript.png', cat: 'Frontend', level: 76, desc: '// Superset JavaScript dengan static typing.\n// Mencegah bug & meningkatkan DX secara signifikan.', projects: ['Web Rangkum Bisnis', 'Web Premium'], code: `interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nconst getUser = async (id: number): Promise<User> => {\n  return await db.user.findUnique({ where: { id } });\n};` },
    'Tailwind CSS':  { img: 'assets/img/tailwind.png', cat: 'Frontend', level: 85, desc: '// Utility-first CSS framework.\n// Mempercepat development tanpa meninggalkan custom design.', projects: ['Web Rangkum Bisnis', 'Web Premium'], code: `<div className="flex items-center gap-4 \n  rounded-2xl bg-white/10 backdrop-blur-md \n  border border-white/20 p-6 shadow-xl">\n  <h2 className="text-2xl font-bold text-white">\n    Hello World\n  </h2>\n</div>` },
    'Bootstrap':     { img: 'assets/img/bootstrap.png', cat: 'Frontend', level: 80, desc: '// Framework CSS responsif siap pakai.\n// Digunakan untuk prototyping dan admin panel.', projects: ['Web Absensi', 'Web Ecommerce'], code: `<div class="container">\n  <div class="row g-3">\n    <div class="col-md-6">\n      <div class="card shadow-sm">\n        <div class="card-body">\n          <h5 class="card-title">Card Title</h5>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>` },
    'Framer Motion': { img: null, icon: 'ri-pulse-line', color: '#e74c3c', cat: 'Frontend', level: 68, desc: '// Library animasi React yang powerful.\n// Gesture, drag, stagger animations.', projects: ['Web Premium', 'Web Rangkum Bisnis'], code: `import { motion } from 'framer-motion';\n\n<motion.div\n  initial={{ opacity: 0, y: 20 }}\n  animate={{ opacity: 1, y: 0 }}\n  transition={{ duration: 0.5 }}\n>\n  Hello World\n</motion.div>` },
    'GSAP':          { img: null, icon: 'ri-magic-line', color: '#88ce02', cat: 'Frontend', level: 72, desc: '// GreenSock Animation Platform.\n// Digunakan untuk scroll animations & timeline.', projects: ['Web Portfolio', 'Semua Proyek'], code: `import gsap from 'gsap';\nimport ScrollTrigger from 'gsap/ScrollTrigger';\n\ngsap.registerPlugin(ScrollTrigger);\n\ngsap.to('.hero', {\n  opacity: 1, y: 0,\n  scrollTrigger: { trigger: '.hero', start: 'top 80%' }\n});` },
    'Three.js':      { img: null, icon: 'ri-box-3-line', color: '#049ef4', cat: 'Frontend', level: 55, desc: '// 3D graphics di browser.\n// Digunakan untuk efek visual 3D interaktif.', projects: ['Web Portfolio'], code: `import * as THREE from 'three';\n\nconst scene = new THREE.Scene();\nconst camera = new THREE.PerspectiveCamera(75, W/H, 0.1, 1000);\nconst geometry = new THREE.BoxGeometry();\nconst mesh = new THREE.Mesh(\n  geometry, \n  new THREE.MeshStandardMaterial({ color: 0x60a5fa })\n);\nscene.add(mesh);` },
    'Vite':          { img: null, icon: 'ri-flashlight-line', color: '#a855f7', cat: 'Frontend', level: 75, desc: '// Build tool modern super cepat.\n// HMR (Hot Module Replacement) dan bundle optimal.', projects: ['Web Rangkum Bisnis', 'Web Premium'], code: `// vite.config.ts\nimport { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({\n  plugins: [react()],\n  server: { port: 3000 }\n});` },
    'Node.js':       { img: 'assets/img/node.png',   cat: 'Backend',  level: 78, desc: '// Runtime JavaScript sisi server.\n// Digunakan bersama Express.js untuk REST API.', projects: ['Web Rangkum Bisnis', 'Backend API'], code: `import http from 'http';\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, {'Content-Type': 'application/json'});\n  res.end(JSON.stringify({ status: 'ok' }));\n});\n\nserver.listen(3000, () => console.log('Server running'));` },
    'PHP':           { img: 'assets/img/php.png',    cat: 'Backend',  level: 85, desc: '// Server-side scripting paling banyak digunakan.\n// Native PHP tanpa framework untuk proyek custom.', projects: ['Web Absensi', 'Web Ecommerce', 'Web Couple', 'Web Viral'], code: `<?php\nheader('Content-Type: application/json');\n$pdo = new PDO("mysql:host=localhost;dbname=mydb", $user, $pass);\n$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");\n$stmt->execute([$_GET['id']]);\necho json_encode($stmt->fetch());` },
    'Express.js':    { img: null, icon: 'ri-server-line', color: '#888', cat: 'Backend', level: 72, desc: '// Minimalist web framework untuk Node.js.\n// Routing, middleware, dan REST API yang efisien.', projects: ['Web Rangkum Bisnis'], code: `import express from 'express';\nconst app = express();\n\napp.use(express.json());\n\napp.get('/api/users', async (req, res) => {\n  const users = await db.user.findMany();\n  res.json(users);\n});\n\napp.listen(3000);` },
    'Hono':          { img: null, icon: 'ri-fire-line', color: '#e36002', cat: 'Backend', level: 65, desc: '// Ultra-fast web framework untuk edge runtime.\n// Lebih ringan dari Express, support Cloudflare Workers.', projects: ['Web Rangkum Bisnis', 'API Projects'], code: `import { Hono } from 'hono';\nconst app = new Hono();\n\napp.get('/api/hello', (c) => {\n  return c.json({ message: 'Hello from Hono!' });\n});\n\nexport default app;` },
    'Firebase':      { img: 'assets/img/firebase.png', cat: 'Backend/DB', level: 80, desc: '// Backend-as-a-Service dari Google.\n// Realtime Database, Auth Google OAuth, dan Hosting.', projects: ['Web Portfolio', 'Ruang Obrolan', 'Web Premium'], code: `import { initializeApp } from 'firebase/app';\nimport { getFirestore, collection, addDoc } from 'firebase/firestore';\n\nconst db = getFirestore(app);\n\nawait addDoc(collection(db, 'messages'), {\n  text: 'Hello World',\n  createdAt: new Date()\n});` },
    'Midtrans':      { img: null, icon: 'ri-bank-card-line', color: '#003d73', cat: 'Backend', level: 70, desc: '// Payment gateway Indonesia.\n// Transfer bank, QRIS, e-wallet terintegrasi.', projects: ['Web Premium', 'Web Ecommerce'], code: `const snap = new MidtransClient.Snap({\n  isProduction: false,\n  serverKey: process.env.MIDTRANS_SERVER_KEY\n});\n\nconst transaction = await snap.createTransaction({\n  transaction_details: {\n    order_id: 'ORDER-123',\n    gross_amount: 100000\n  }\n});` },
    'Cloudinary':    { img: null, icon: 'ri-cloud-line', color: '#3448c5', cat: 'Backend', level: 68, desc: '// Cloud image & video management.\n// Upload, transform, dan serve media secara optimal.', projects: ['Web Premium', 'Web Couple'], code: `import { v2 as cloudinary } from 'cloudinary';\n\ncloudinary.config({ cloud_name: 'mycloud', ... });\n\nconst result = await cloudinary.uploader.upload(file, {\n  folder: 'portfolio',\n  transformation: [{ width: 800, crop: 'limit' }]\n});` },
    'NextAuth':      { img: null, icon: 'ri-shield-keyhole-line', color: '#9c5de9', cat: 'Backend', level: 65, desc: '// Authentication untuk Next.js.\n// Google OAuth, JWT session, dan role-based access.', projects: ['Web Rangkum Bisnis'], code: `import NextAuth from 'next-auth';\nimport GoogleProvider from 'next-auth/providers/google';\n\nexport const { handlers, auth } = NextAuth({\n  providers: [\n    GoogleProvider({\n      clientId: process.env.GOOGLE_ID,\n      clientSecret: process.env.GOOGLE_SECRET\n    })\n  ]\n});` },
    'C Language':    { img: 'assets/img/c.png',      cat: 'Backend',  level: 65, desc: '// Bahasa pemrograman level rendah.\n// Dipelajari untuk memahami dasar algoritma & memori.', projects: ['Tugas Kampus', 'Kompetisi Pemrograman'], code: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr = malloc(10 * sizeof(int));\n    for (int i = 0; i < 10; i++) arr[i] = i * 2;\n    printf("arr[5] = %d\\n", arr[5]);\n    free(arr);\n    return 0;\n}` },
    'MySQL':         { img: 'assets/img/mysql.png',  cat: 'Database', level: 87, desc: '// Relational database management system.\n// Query kompleks, normalisasi, dan stored procedures.', projects: ['Web Absensi', 'Web Ecommerce', 'Web Couple', 'Web Viral'], code: `-- Schema Web Absensi\nCREATE TABLE absensi (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  karyawan_id INT NOT NULL,\n  tanggal DATE NOT NULL,\n  status ENUM('hadir','izin','sakit') DEFAULT 'hadir',\n  foto_path VARCHAR(255),\n  FOREIGN KEY (karyawan_id) REFERENCES karyawan(id)\n);` },
    'Prisma ORM':    { img: null, icon: 'ri-database-2-line', color: '#5a67d8', cat: 'Database', level: 70, desc: '// ORM modern untuk TypeScript/Node.js.\n// Type-safe query builder dengan auto-migration.', projects: ['Web Rangkum Bisnis'], code: `// schema.prisma\nmodel User {\n  id        Int      @id @default(autoincrement())\n  email     String   @unique\n  name      String?\n  posts     Post[]\n  createdAt DateTime @default(now())\n}\n\nconst user = await prisma.user.create({\n  data: { email: 'damta@gmail.com' }\n});` },
    'Supabase':      { img: null, icon: 'ri-database-fill', color: '#3ecf8e', cat: 'Database', level: 65, desc: '// Open-source Firebase alternative.\n// PostgreSQL, realtime, storage, dan auth.', projects: ['Web Premium', 'Proyek Terbaru'], code: `import { createClient } from '@supabase/supabase-js';\n\nconst supabase = createClient(url, key);\n\nconst { data, error } = await supabase\n  .from('products')\n  .select('*')\n  .eq('active', true)\n  .order('created_at', { ascending: false });` },
    'MongoDB':       { img: null, icon: 'ri-leaf-line', color: '#4db33d', cat: 'Database', level: 60, desc: '// NoSQL document database.\n// Fleksibel untuk data tidak terstruktur.', projects: ['Proyek Kampus', 'Backend API'], code: `import mongoose from 'mongoose';\n\nconst userSchema = new mongoose.Schema({\n  name: String,\n  email: { type: String, unique: true },\n  createdAt: { type: Date, default: Date.now }\n});\n\nconst User = mongoose.model('User', userSchema);\nawait User.create({ name: 'Damta', email: 'damta@example.com' });` },
    'Redis':         { img: null, icon: 'ri-speed-line', color: '#dc382d', cat: 'Database', level: 60, desc: '// In-memory data store.\n// Caching, session storage, dan rate limiting.', projects: ['Web Rangkum Bisnis', 'Backend API'], code: `import { Redis } from 'ioredis';\n\nconst redis = new Redis();\n\n// Cache result selama 1 jam\nawait redis.setex('user:123', 3600, JSON.stringify(userData));\n\n// Ambil dari cache\nconst cached = await redis.get('user:123');\nif (cached) return JSON.parse(cached);` },
    'GitHub':        { img: 'assets/img/github.png', cat: 'DevOps',   level: 88, desc: '// Version control dan kolaborasi kode.\n// Branching strategy, PR review, dan GitHub Actions.', projects: ['Semua Proyek'], code: `# Git workflow\ngit checkout -b feature/new-ui\ngit add .\ngit commit -m "feat: add new dashboard"\ngit push origin feature/new-ui\n\n# GitHub Actions CI/CD\n- name: Deploy to Hostinger\n  run: rsync -avz ./dist/ user@server:/var/www/html/` },
    'cPanel':        { img: 'assets/img/cpanel.png', cat: 'DevOps',   level: 80, desc: '// Web hosting control panel.\n// Deploy aplikasi, domain management, dan SSL.', projects: ['Web Absensi', 'Web Ecommerce', 'Web Portfolio Live'], code: `# Deploy via FTP/SSH ke cPanel\nftp_upload() {\n  ncftpput -R -v -u "$USER" -p "$PASS" \\\n    "$HOST" /public_html/project ./build\n}\n\n# SSL wildcard via Let's Encrypt\ncertbot certonly --webroot \\\n  -w /public_html -d damtaweb.com` },
    'Docker':        { img: null, icon: 'ri-ship-line', color: '#2496ed', cat: 'DevOps', level: 58, desc: '// Containerization untuk konsistensi environment.\n// Dockerfile dan docker-compose untuk local dev.', projects: ['Web Rangkum Bisnis', 'Backend API'], code: `# Dockerfile\nFROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "dist/index.js"]\n\n# docker-compose.yml\nservices:\n  app:\n    build: .\n    ports: ["3000:3000"]\n  db:\n    image: postgres:16` },
    'Google Search Console': { img: 'assets/img/google search console.png', cat: 'DevOps', level: 75, desc: '// SEO monitoring & indexing tool.\n// Memastikan web terindeks Google dengan baik.', projects: ['Web Portfolio', 'damtaweb.com'], code: `<!-- sitemap.xml -->\n<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>https://damtaweb.com/</loc>\n    <lastmod>2026-06-04</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>` },
    'Gemini AI':     { img: 'assets/img/gemini.png', cat: 'AI Tools', level: 85, desc: '// AI assistant dari Google.\n// Brainstorming, debugging, code review, dan optimasi.', projects: ['Semua Proyek'], code: `import { GoogleGenerativeAI } from "@google/generative-ai";\n\nconst genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);\nconst model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });\n\nconst result = await model.generateContent(\n  "Jelaskan arsitektur microservices"\n);\nconsole.log(result.response.text());` },
    'VS Code':       { img: 'assets/img/vscode.png', cat: 'Tools',    level: 95, desc: '// IDE utama untuk semua pengembangan.\n// Extensions: ESLint, Prettier, GitLens, Tailwind IntelliSense.', projects: ['Semua Proyek'], code: '// .vscode/settings.json\n{\n  "editor.formatOnSave": true,\n  "editor.defaultFormatter": "esbenp.prettier-vscode",\n  "editor.tabSize": 2,\n  "emmet.includeLanguages": {\n    "javascript": "javascriptreact"\n  },\n  "typescript.preferences.importModuleSpecifier": "relative",\n  "git.autofetch": true\n}' },
    'Project':       { img: null, icon: 'ri-file-text-line', color: '#94a3b8', cat: 'Config', level: 100, desc: '// File konfigurasi proyek.\n// package.json, README.md, .gitignore, .env setup.', projects: ['Semua Proyek'], code: `// package.json\n{\n  "name": "damta-portfolio",\n  "version": "3.0.0",\n  "scripts": {\n    "dev": "next dev",\n    "build": "next build",\n    "start": "next start",\n    "lint": "eslint . --fix"\n  },\n  "dependencies": {\n    "next": "^15.0.0",\n    "react": "^19.0.0",\n    "prisma": "^5.0.0"\n  }\n}` },
};

function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function vsToggleFolder(headEl) {
    const folder = headEl.parentElement;
    folder.classList.toggle('open');
}

function vsShowTech(name) {
    const main = document.getElementById('vsMain');
    if (!main) return;

    // highlight active file
    document.querySelectorAll('.vs-file').forEach(f => f.classList.remove('active'));
    event.currentTarget.classList.add('active');

    const t = VS_TECH[name];
    if (!t) return;

    let iconHtml = '';
    if (t.img)          iconHtml = `<img src="${t.img}" class="vs-detail-img" />`;
    else if (t.iconTxt) iconHtml = `<span class="vs-detail-icon-txt" style="color:${t.color}">${t.icon}</span>`;
    else                iconHtml = `<i class="${t.icon} vs-detail-icon-txt" style="color:${t.color}"></i>`;

    const tags = t.projects.map(p => `<span class="vs-tag">${p}</span>`).join('');

    const codeContent = t.code
        ? escapeHtml(t.code)
        : `<span class="vs-key">const</span> skill = {\n  <span class="vs-key">name</span>: <span class="vs-string">"${name}"</span>,\n  <span class="vs-key">level</span>: ${t.level}\n};`;

    main.innerHTML = `
      <div class="vs-detail">
        <div class="vs-detail-header">
          ${iconHtml}
          <div>
            <div class="vs-detail-name">${name}</div>
            <div class="vs-detail-cat">${t.cat}</div>
          </div>
        </div>
        <pre class="vs-detail-code">${t.code ? codeContent : codeContent}</pre>
        <div class="vs-bar-label"><span>Profisiensi</span><span>${t.level}%</span></div>
        <div class="vs-bar-bg"><div class="vs-bar-fill" id="vsBarFill"></div></div>
        <div class="vs-used-title">Digunakan di</div>
        <div>${tags}</div>
      </div>`;

    requestAnimationFrame(() => {
        const bar = document.getElementById('vsBarFill');
        if (bar) bar.style.width = t.level + '%';
    });
}

// ==========================================================================
// 0-B. PARTICLE NETWORK BACKGROUND
// ==========================================================================
(function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, particles = [];
    let mouse = { x: -999, y: -999 };
    const COUNT  = Math.min(55, Math.floor(window.innerWidth / 22));
    const DIST   = 130;
    const REPEL  = 90;
    const SPEED  = 0.35;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function spawn() {
        particles = Array.from({ length: COUNT }, () => ({
            x:  Math.random() * W,
            y:  Math.random() * H,
            vx: (Math.random() - 0.5) * SPEED,
            vy: (Math.random() - 0.5) * SPEED,
            r:  Math.random() * 1.2 + 0.5,
        }));
    }

    function isLightMode() { return document.body.classList.contains('light-mode'); }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        const light      = isLightMode();
        const dotColor   = light ? 'rgba(37,99,235,' : 'rgba(96,165,250,';
        const lineColor  = light ? 'rgba(37,99,235,' : 'rgba(96,165,250,';
        const dotAlpha   = light ? 0.35 : 0.5;

        particles.forEach(p => {
            // move
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;

            // mouse repel
            const dx = p.x - mouse.x, dy = p.y - mouse.y;
            const d  = Math.sqrt(dx * dx + dy * dy);
            if (d < REPEL && d > 0) {
                const f = (REPEL - d) / REPEL;
                p.x += (dx / d) * f * 1.5;
                p.y += (dy / d) * f * 1.5;
            }

            // dot
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = dotColor + dotAlpha + ')';
            ctx.fill();
        });

        // lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d  = Math.sqrt(dx * dx + dy * dy);
                if (d < DIST) {
                    const a = (1 - d / DIST) * (light ? 0.2 : 0.28);
                    ctx.beginPath();
                    ctx.strokeStyle = lineColor + a + ')';
                    ctx.lineWidth   = 0.6;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }

    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('resize',    () => { resize(); spawn(); });
    resize(); spawn(); draw();
})();

// ==========================================================================
// 0-C. SCROLL PROGRESS + BACK TO TOP
// ==========================================================================
(function initScrollUI() {
    const bar = document.getElementById('scrollProgress');
    const btn = document.getElementById('btnTop');

    window.addEventListener('scroll', () => {
        const st  = document.documentElement.scrollTop;
        const sh  = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (bar) bar.style.width = (st / sh * 100) + '%';
        if (btn) btn.classList.toggle('show', st > 450);
    });
})();

// ==========================================================================
// 0-D. COMMAND PALETTE (Ctrl+K)
// ==========================================================================
(function initCmdPalette() {
    const overlay  = document.getElementById('cmdOverlay');
    const input    = document.getElementById('cmdSearch');
    const list     = document.getElementById('cmdList');
    const hintBtn  = document.getElementById('cmdKHint');
    if (!overlay || !input || !list) return;

    const ITEMS = [
        { group: 'Navigasi', icon: 'ri-home-4-line',      label: 'Beranda',              tag: '#home',         action: () => nav('home') },
        { group: 'Navigasi', icon: 'ri-user-3-line',       label: 'Profil',               tag: '#profil',       action: () => nav('profil') },
        { group: 'Navigasi', icon: 'ri-code-s-slash-line', label: 'Kemampuan & Tools',    tag: '#skill',        action: () => nav('skill') },
        { group: 'Navigasi', icon: 'ri-folder-3-line',     label: 'Proyek Unggulan',      tag: '#projects',     action: () => nav('projects') },
        { group: 'Navigasi', icon: 'ri-award-line',        label: 'Pencapaian & Sertifikat', tag: '#certificates', action: () => nav('certificates') },
        { group: 'Navigasi', icon: 'ri-information-line',  label: 'Visi Misi & Tentang', tag: '#about',        action: () => nav('about') },
        { group: 'Navigasi', icon: 'ri-terminal-box-line',   label: 'Full Stack Architecture', tag: '#stack',      action: () => nav('stack') },
        { group: 'Navigasi', icon: 'ri-bar-chart-line',    label: 'Dasbor Statistik',     tag: '#dashboard',    action: () => nav('dashboard') },
        { group: 'Navigasi', icon: 'ri-chat-3-line',       label: 'Ruang Obrolan',        tag: '#comments',     action: () => nav('comments') },
        { group: 'Navigasi', icon: 'ri-phone-line',        label: 'Kontak',               tag: '#contact',      action: () => nav('contact') },
        { group: 'Sosial',   icon: 'ri-instagram-line',    label: 'Instagram @tadamta_',  tag: '↗',             href: 'https://instagram.com/tadamta_' },
        { group: 'Sosial',   icon: 'ri-linkedin-fill',     label: 'LinkedIn',             tag: '↗',             href: 'https://www.linkedin.com/in/damta-faiz-955493221' },
        { group: 'Sosial',   icon: 'ri-github-fill',       label: 'GitHub damta8827773',  tag: '↗',             href: 'https://github.com/damta8827773' },
        { group: 'Sosial',   icon: 'ri-mail-line',         label: 'Email damtafaiz@gmail.com', tag: '↗',        href: 'mailto:damtafaiz@gmail.com' },
        { group: 'Proyek',   icon: 'ri-heart-line',        label: 'Web Relationship',     tag: '↗',             href: 'https://najwaweb.site' },
        { group: 'Proyek',   icon: 'ri-briefcase-line',    label: 'Web Absensi Karyawan', tag: '↗',             href: 'https://presensi.ecommercedamta.com/' },
        { group: 'Proyek',   icon: 'ri-shopping-cart-line','label': 'Web Ecommerce',      tag: '↗',             href: 'https://api3.ecommercedamta.com/' },
        { group: 'Proyek',   icon: 'ri-bank-card-line',    label: 'Web Rangkum Bisnis',   tag: '↗',             href: 'https://financecreps.site/' },
        { group: 'Proyek',   icon: 'ri-map-pin-line',      label: 'Web Roadmap Bahan Baku', tag: '↗',           href: 'https://konsepsi.site/' },
    ];

    function nav(id) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        close();
    }

    let active = 0;
    let filtered = [...ITEMS];

    function open() {
        overlay.classList.add('open');
        input.value = '';
        input.focus();
        render(ITEMS);
    }

    function close() {
        overlay.classList.remove('open');
        input.blur();
    }

    function render(items) {
        filtered = items;
        active   = 0;
        list.innerHTML = '';
        let lastGroup  = '';

        items.forEach((item, idx) => {
            if (item.group !== lastGroup) {
                const g   = document.createElement('li');
                g.className = 'cmd-group-label';
                g.textContent = item.group;
                list.appendChild(g);
                lastGroup = item.group;
            }
            const li = document.createElement('li');
            li.className = 'cmd-item' + (idx === 0 ? ' active' : '');
            li.setAttribute('role', 'option');
            li.innerHTML = `<i class="${item.icon}"></i><span>${item.label}</span><span class="cmd-tag">${item.tag}</span>`;
            li.addEventListener('click', () => execItem(item));
            list.appendChild(li);
        });
    }

    function execItem(item) {
        if (item.action) item.action();
        else if (item.href) { window.open(item.href, item.href.startsWith('mailto') ? '_self' : '_blank'); close(); }
    }

    function setActive(idx) {
        const els = list.querySelectorAll('.cmd-item');
        els.forEach((el, i) => el.classList.toggle('active', i === idx));
        if (els[idx]) els[idx].scrollIntoView({ block: 'nearest' });
    }

    input.addEventListener('input', () => {
        const q = input.value.toLowerCase().trim();
        const res = q ? ITEMS.filter(it => it.label.toLowerCase().includes(q) || it.group.toLowerCase().includes(q)) : ITEMS;
        render(res);
    });

    document.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); overlay.classList.contains('open') ? close() : open(); return; }
        if (e.key === '/' && !overlay.classList.contains('open') && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') { e.preventDefault(); open(); return; }
        if (!overlay.classList.contains('open')) return;
        const items = list.querySelectorAll('.cmd-item');
        if (e.key === 'Escape') { close(); }
        else if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(active + 1, items.length - 1); setActive(active); }
        else if (e.key === 'ArrowUp')   { e.preventDefault(); active = Math.max(active - 1, 0); setActive(active); }
        else if (e.key === 'Enter')     { if (filtered[active]) execItem(filtered[active]); }
    });

    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    if (hintBtn) hintBtn.addEventListener('click', () => open());
})();


// ==========================================================================
// 1. PENGATURAN AWAL & EVENT LISTENER UTAMA
// ==========================================================================

window.addEventListener('load', () => {

    // --- A. LOGIKA WELCOME SCREEN & MOUSE EFFECT ---
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    const heroVideo = document.getElementById('heroVideo');

    // Logika Auto Audio Berdasarkan Click
    if(heroVideo) {
        heroVideo.volume = 0.5; // Set volume 50%
        
        let isUserHasInteracted = false; 

        const enableSound = () => {
            heroVideo.muted = false;
            isUserHasInteracted = true;
            heroVideo.play().catch(e => console.log("Menunggu interaksi klik user..."));
            
            document.removeEventListener('click', enableSound);
            document.removeEventListener('touchstart', enableSound);
        };

        document.addEventListener('click', enableSound);
        document.addEventListener('touchstart', enableSound);

        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const triggerHeight = window.innerHeight * 0.5; 

            if (scrollPosition > triggerHeight) {
                if (!heroVideo.muted) {
                    heroVideo.muted = true;
                }
            } else {
                if (heroVideo.muted && isUserHasInteracted) {
                    heroVideo.muted = false;
                    heroVideo.play().catch(e => {}); 
                }
            }
        });
    }

    // Logika Animasi Layar Pembuka
    if(welcomeScreen) {

        // — DOT MATRIX CANVAS (Canvas Reveal Effect) —
        (function initWelcomeCanvas() {
            const cv = document.getElementById('welcomeCanvas');
            if (!cv) return;
            const ctx = cv.getContext('2d');
            cv.width  = window.innerWidth;
            cv.height = window.innerHeight;

            const CELL     = 22;   // grid spacing px
            const DOT_R    = 1.5;  // dot radius px
            const OPACITIES = [0.3,0.3,0.3,0.5,0.5,0.5,0.8,0.8,0.8,1.0];
            const COLORS    = [[96,165,250],[167,139,250],[52,211,153],[244,114,182]];

            const cxC = cv.width / 2, cyC = cv.height / 2;
            const maxD = Math.hypot(cxC, cyC);
            const ox = (cv.width  % CELL) / 2;
            const oy = (cv.height % CELL) / 2;

            const dots = [];
            for (let x = ox; x < cv.width; x += CELL) {
                for (let y = oy; y < cv.height; y += CELL) {
                    const rnd = Math.random();
                    dots.push({
                        x, y,
                        threshold : Math.hypot(x - cxC, y - cyC) / maxD * 0.78 + rnd * 0.14,
                        opi       : Math.floor(rnd * OPACITIES.length),
                        ci        : Math.floor(rnd * COLORS.length),
                        nextFlick : rnd * 0.6,
                    });
                }
            }

            let raf, dead = false;
            const T0 = performance.now();
            const REVEAL_MS = 2800;  // full grid reveal duration
            const TOTAL_MS  = 5600;

            function draw() {
                if (dead) return;
                const prog = (performance.now() - T0) / REVEAL_MS;
                ctx.clearRect(0, 0, cv.width, cv.height);

                dots.forEach(d => {
                    if (prog < d.threshold) return;
                    if (prog > d.nextFlick) {
                        d.opi       = Math.floor(Math.random() * OPACITIES.length);
                        d.nextFlick = prog + 0.12 + Math.random() * 0.38;
                    }
                    const fadeIn = Math.min((prog - d.threshold) / 0.1, 1);
                    const [r,g,b] = COLORS[d.ci];
                    ctx.globalAlpha = OPACITIES[d.opi] * fadeIn;
                    ctx.fillStyle   = `rgb(${r},${g},${b})`;
                    ctx.beginPath();
                    ctx.arc(d.x, d.y, DOT_R, 0, Math.PI * 2);
                    ctx.fill();
                });

                ctx.globalAlpha = 1;
                raf = requestAnimationFrame(draw);
            }
            draw();
            setTimeout(() => { dead = true; cancelAnimationFrame(raf); }, TOTAL_MS);
        })();

        // — TERMINAL TYPEWRITER + PROGRESS —
        (function initWelcomeAnim() {
            const termEl  = document.getElementById('wsTerminal');
            const fillEl  = document.getElementById('wsLoaderFill');
            const pctEl   = document.getElementById('wsLoaderPct');
            if (!termEl || !fillEl || !pctEl) return;

            const STEPS = [
                { msg: 'Initializing portfolio modules...', pct: 28, t: 500 },
                { msg: 'Connecting to GitHub API...',        pct: 55, t: 1500 },
                { msg: 'Loading projects & certificates...', pct: 80, t: 2600 },
                { msg: 'All systems ready. Welcome!',        pct: 100, t: 3700 },
            ];

            let curPct = 0;

            function typeText(el, txt, done) {
                el.textContent = '';
                let i = 0;
                const iv = setInterval(() => {
                    el.textContent += txt[i++];
                    if (i >= txt.length) { clearInterval(iv); if (done) setTimeout(done, 150); }
                }, 28);
            }

            function animPct(target) {
                const from = curPct, diff = target - from;
                const dur  = 900;
                const t0   = performance.now();
                function tick(now) {
                    const p = Math.min((now - t0) / dur, 1);
                    const v = Math.round(from + diff * p);
                    pctEl.textContent  = v + '%';
                    fillEl.style.width = v + '%';
                    if (p < 1) requestAnimationFrame(tick);
                    else curPct = target;
                }
                requestAnimationFrame(tick);
            }

            STEPS.forEach(step => {
                setTimeout(() => {
                    typeText(termEl, step.msg);
                    animPct(step.pct);
                }, step.t);
            });
        })();

        // — FADE OUT —
        setTimeout(() => {
            try {
                if (window._wsFailsafe) clearTimeout(window._wsFailsafe);
                welcomeScreen.style.transition = 'opacity 1s ease';
                welcomeScreen.style.opacity = '0';
                setTimeout(() => {
                    welcomeScreen.style.display = 'none';
                    if (mainContent) {
                        mainContent.style.display = 'block';
                        mainContent.style.opacity = '1';
                    }
                }, 1000);
            } catch(e) {
                welcomeScreen.style.display = 'none';
                if (mainContent) { mainContent.style.display = 'block'; mainContent.style.opacity = '1'; }
            }
        }, 4800);
    }
    
    // Logika Efek Spotlight Mouse Hover
    const cards = document.querySelectorAll('.profil-card, .tech-item, .project-card, .cert-card, .vm-card, .timeline-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });

    // --- B. LOGIKA ANIMASI SCROLL (DIPERBAIKI) ---
    // Hanya observasi elemen utama di luar popup
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 }); 

    const hiddenElements = document.querySelectorAll(
        '.hero, .profil-card, .skill-section, .project-card, .cert-card, .visi-misi-container, .vm-card, section h2, #comments, #dashboard, .vscode-window, .stack-desc'
    );
    hiddenElements.forEach((el) => observer.observe(el));

    // --- C. LOGIKA FIREBASE ---
    initFirebaseApps();
});


// ==========================================================================
// 2. FUNGSI FIREBASE (DATABASE & AUTHENTICATION)
// ==========================================================================
function initFirebaseApps() {
    const firebaseConfig = {
        apiKey: "AIzaSyC80W6y97OPM8m6VeiKs_0vt7oCd5HsTi8",
        authDomain: "projectdamta.firebaseapp.com",
        projectId: "projectdamta",
        storageBucket: "projectdamta.firebasestorage.app",
        messagingSenderId: "118530088464",
        appId: "1:118530088464:web:f193173dcc75d7557b7495"
    };

    if (typeof firebase !== 'undefined' && !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    if (typeof firebase === 'undefined') {
        console.error("Firebase script tidak terdeteksi di HTML!");
        return;
    }

    const auth = firebase.auth();
    const db = firebase.firestore();
    const provider = new firebase.auth.GoogleAuthProvider();

    // Komentar Ruang Obrolan
    const authSection = document.getElementById('auth-section');
    const commentForm = document.getElementById('comment-form');
    const listContainer = document.getElementById('comments-display-list');
    const btnLogin = document.getElementById('btn-login-google');
    const btnLogout = document.getElementById('btn-logout');

    if(btnLogin) {
        btnLogin.onclick = () => {
            auth.signInWithPopup(provider).catch((error) => {
                console.error("Error login:", error);
                alert("Gagal login: " + error.message);
            });
        };
    }

    if(btnLogout) {
        btnLogout.onclick = () => auth.signOut();
    }

    let currentUser = null;

    auth.onAuthStateChanged((user) => {
        currentUser = user;
        if (user) {
            if(authSection) authSection.style.display = 'none';
            if(commentForm) commentForm.style.display = 'flex';
            if(document.getElementById('user-photo')) document.getElementById('user-photo').src = user.photoURL;
            if(document.getElementById('user-name-display')) document.getElementById('user-name-display').innerText = user.displayName;
        } else {
            if(authSection) authSection.style.display = 'block';
            if(commentForm) commentForm.style.display = 'none';
        }
    });

    if(commentForm) {
        commentForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            const text = document.getElementById('comment-input').value;
            const ratingInput = document.querySelector('input[name="stars"]:checked');
            const rating = ratingInput ? ratingInput.value : 0;
            const user = auth.currentUser;

            if (!text || rating == 0) return alert("Isi pesan dan pilih bintang rating terlebih dahulu!");

            try {
                await db.collection("comments").add({
                    name: user.displayName,
                    photo: user.photoURL,
                    email: user.email,
                    comment: text,
                    rating: parseInt(rating),
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                document.getElementById('comment-input').value = "";
                
                const radios = document.querySelectorAll('input[name="stars"]');
                radios.forEach(radio => radio.checked = false);

                alert("Pesan/ulasan berhasil terkirim!");
            } catch (error) { 
                alert("Gagal mengirim: " + error.message); 
            }
        });
    }

    const OWNER_EMAIL = 'damtafaiz@gmail.com';
    let replyListeners = [];
    /* Map untuk menyimpan data komentar — hindari masalah escaping di onclick */
    const commentMetaMap = new Map();

    if(listContainer) {
        db.collection("comments").orderBy("timestamp", "asc").onSnapshot((snapshot) => {
            // Bersihkan reply listeners lama
            replyListeners.forEach(unsub => unsub());
            replyListeners = [];
            commentMetaMap.clear();
            listContainer.innerHTML = "";

            if (snapshot.empty) {
                listContainer.innerHTML = "<p style='text-align:center; color:var(--text-muted);'>Belum ada percakapan. Jadilah yang pertama!</p>";
                return;
            }

            snapshot.forEach((doc) => {
                const d = doc.data();
                const commentId = doc.id;
                const stars = "⭐".repeat(d.rating || 0);

                const isOwnerMsg   = d.email === OWNER_EMAIL;
                const alignClass   = isOwnerMsg ? "align-right" : "align-left";
                const bubbleClass  = isOwnerMsg ? "owner" : "";
                const badgeHTML    = isOwnerMsg ? `<span class="owner-badge">Owner</span>` : "";
                const canReply     = currentUser && currentUser.email === OWNER_EMAIL && !isOwnerMsg;

                /* Simpan meta komentar di Map — aman dari masalah escaping HTML */
                if (canReply) {
                    commentMetaMap.set(commentId, {
                        email:   d.email   || '',
                        name:    d.name    || 'Anonim',
                        comment: (d.comment || '').substring(0, 100)
                    });
                }

                const replyBtnHTML = canReply ? `
                    <button class="chat-reply-btn" onclick="toggleReplyForm('${commentId}')">
                        <i class="ri-reply-line"></i> Balas
                    </button>
                    <div class="reply-form-inline" id="reply-form-${commentId}">
                        <input class="reply-input" id="reply-input-${commentId}" placeholder="Tulis balasan..." />
                        <button class="reply-submit-btn" onclick="submitReply('${commentId}')">
                            <i class="ri-send-plane-fill"></i> Kirim
                        </button>
                    </div>` : '';

                const wrapper = document.createElement('div');
                wrapper.className = `chat-item-wrapper ${alignClass}`;
                wrapper.innerHTML = `
                    <div style="width:100%">
                        <div class="chat-item ${alignClass}">
                            <img src="${d.photo||''}" class="chat-avatar" onerror="this.src='https://ui-avatars.com/api/?name=U&background=random'">
                            <div class="chat-content">
                                <div class="chat-header">
                                    <span class="chat-name">${d.name||'Anonim'} ${badgeHTML}</span>
                                    <span class="chat-stars">${stars}</span>
                                </div>
                                <div class="chat-bubble ${bubbleClass}">${d.comment||''}</div>
                                ${replyBtnHTML}
                            </div>
                        </div>
                        <div class="chat-replies-container" id="replies-${commentId}" style="margin-left:60px"></div>
                    </div>`;
                listContainer.appendChild(wrapper);

                // Dengarkan replies subcollection
                const unsubReply = db.collection("comments").doc(commentId)
                    .collection("replies").orderBy("timestamp","asc")
                    .onSnapshot((repSnap) => {
                        const repliesEl = document.getElementById(`replies-${commentId}`);
                        if (!repliesEl) return;
                        repliesEl.innerHTML = "";
                        repSnap.forEach((rDoc) => {
                            const r = rDoc.data();
                            repliesEl.innerHTML += `
                                <div class="chat-reply-item">
                                    <img src="${r.photo||''}" class="chat-reply-avatar"
                                         onerror="this.src='https://ui-avatars.com/api/?name=D&background=60a5fa&color=fff'">
                                    <div>
                                        <div class="chat-reply-name">
                                            <i class="ri-shield-star-fill" style="font-size:0.65rem"></i>${r.name||'Owner'}
                                        </div>
                                        <div class="chat-reply-bubble">${r.reply||''}</div>
                                    </div>
                                </div>`;
                        });
                    });
                replyListeners.push(unsubReply);
            });

            listContainer.scrollTop = listContainer.scrollHeight;
        });
    }

    // Dasbor Firebase
    const visitorDisplay = document.getElementById('visitor-count');
    if(visitorDisplay) {
        (async () => {
            try {
                const visitorRef = db.collection("statistics").doc("visitors");
                const docSnap = await visitorRef.get();
                let targetCount = 0;

                if (!docSnap.exists) {
                    await visitorRef.set({ count: 1 });
                    targetCount = 1;
                    sessionStorage.setItem("hasVisited", "true");
                } else {
                    const hasVisited = sessionStorage.getItem("hasVisited");
                    if (!hasVisited) {
                        await visitorRef.update({ count: firebase.firestore.FieldValue.increment(1) });
                        sessionStorage.setItem("hasVisited", "true");
                        targetCount = docSnap.data().count + 1;
                    } else {
                        targetCount = docSnap.data().count;
                    }
                }
                
                animateValue(visitorDisplay, 0, targetCount, 2000, true);

            } catch (error) {
                console.error("Error Firebase Visitor:", error);
                visitorDisplay.innerText = "00000"; 
            }
        })();
    }

    // === GitHub API Extended ===
    const GH_USER = 'damta8827773';

    fetch(`https://api.github.com/users/${GH_USER}`)
        .then(r => r.json())
        .then(userData => {
            const ghAvatar   = document.getElementById('gh-avatar');
            const ghName     = document.getElementById('gh-fullname');
            const ghBio      = document.getElementById('gh-bio-text');
            if (ghAvatar && userData.avatar_url) ghAvatar.src = userData.avatar_url;
            if (ghName)  ghName.textContent  = userData.name  || GH_USER;
            if (ghBio)   ghBio.textContent   = userData.bio   || 'Full Stack Developer';

            const reposEl    = document.getElementById('gh-repos-count');
            const followersEl= document.getElementById('gh-followers-count');
            const followingEl= document.getElementById('gh-following-count');
            if (reposEl)     animateValue(reposEl,     0, userData.public_repos || 0, 1500, false);
            if (followersEl) animateValue(followersEl, 0, userData.followers    || 0, 1500, false);
            if (followingEl) animateValue(followingEl, 0, userData.following    || 0, 1500, false);

            return fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`);
        })
        .then(r => r.json())
        .then(repos => {
            if (!Array.isArray(repos)) return;
            const totalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
            const starsEl = document.getElementById('gh-stars-count');
            if (starsEl) animateValue(starsEl, 0, totalStars, 1500, false);

            renderGhRepos(repos.slice(0, 6));

            const langCount = {};
            repos.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1; });
            renderGhLanguages(langCount);
        })
        .catch(err => {
            console.error('GitHub API error:', err);
            ['gh-repos-count','gh-followers-count','gh-following-count','gh-stars-count'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.textContent = '-';
            });
        });

    const ghChart = document.getElementById('gh-chart-img');
    if (ghChart) ghChart.src = `https://ghchart.rshah.org/60a5fa/${GH_USER}?v=${Date.now()}`;
}

// Fungsi Bantuan Animasi Angka Dasbor
function animateValue(element, start, end, duration, isPadded) {
    if(!element) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        let currentVal = Math.floor(progress * (end - start) + start);

        if (isPadded) {
            element.innerText = String(currentVal).padStart(5, '0');
        } else {
            element.innerText = currentVal;
        }

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}


// ==========================================================================
// 3. FUNGSI KLIK UI GLOBAL (MENU, TIMELINE, DLL)
// ==========================================================================

// PENTING: Logika ini diperbaiki agar isi timeline langsung terlihat
window.toggleHistory = function() {
    const historyPopup = document.getElementById('historyPopup');
    if(historyPopup) {
        historyPopup.classList.toggle('active');
        
        // Memaksa elemen di dalam popup langsung di-render opacity-nya menjadi 1
        if (historyPopup.classList.contains('active')) {
            const items = historyPopup.querySelectorAll('.timeline-card, .history-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                    item.style.filter = 'blur(0)';
                }, index * 100); // Animasi masuk berurutan
            });
        }
    }
}

window.toggleTimelineCard = function(element) {
    const details = element.querySelector('.timeline-details');
    const openText = element.querySelector('.open-text');
    const closeText = element.querySelector('.close-text');
    const icon = element.querySelector('.ri-arrow-down-s-line');

    element.classList.toggle('active');

    if (element.classList.contains('active')) {
        details.style.maxHeight = details.scrollHeight + "px";
        openText.style.display = "none";
        closeText.style.display = "inline";
        icon.classList.add('rotate');
    } else {
        details.style.maxHeight = "0px";
        openText.style.display = "inline";
        closeText.style.display = "none";
        icon.classList.remove('rotate');
    }
}

/* ── See More / See Less for Projects ── */
window.toggleSeeMore = function() {
    const extras = document.querySelectorAll('.project-extra');
    const btn    = document.getElementById('btnSeeMore');
    const icon   = document.getElementById('seeMoreIcon');
    const label  = btn && btn.querySelector('[data-i18n]');
    const isExpanded = btn && btn.classList.contains('expanded');

    extras.forEach(el => {
        if (isExpanded) {
            el.classList.remove('show');
        } else {
            el.classList.add('show');
            // trigger IntersectionObserver reveal animation
            el.classList.remove('hidden');
        }
    });

    if (btn) btn.classList.toggle('expanded', !isExpanded);
    if (label) {
        const key = isExpanded ? 'see_more' : 'see_less';
        if (translations[currentLang] && translations[currentLang][key]) {
            label.textContent = translations[currentLang][key];
        }
        label.setAttribute('data-i18n', key);
    }
};

window.toggleMenu = function() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    if(navMenu) navMenu.classList.toggle('active');
    if(hamburger) hamburger.classList.toggle('active');
}

window.closeMenu = function() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    if(navMenu) navMenu.classList.remove('active');
    if(hamburger) hamburger.classList.remove('active');
}

let isLightMode = true;
window.toggleTheme = function() {
    document.body.classList.toggle('light-mode');
    isLightMode = !isLightMode;

    const icon  = document.getElementById('theme-icon');
    const btn   = document.getElementById('themePillBtn');

    if (isLightMode) {
        if (icon) { icon.classList.replace('ri-moon-line', 'ri-sun-line'); }
        if (btn)  btn.setAttribute('aria-checked', 'false');
    } else {
        if (icon) { icon.classList.replace('ri-sun-line', 'ri-moon-line'); }
        if (btn)  btn.setAttribute('aria-checked', 'true');
    }

    // Burst particle effect
    if (btn) {
        btn.classList.remove('bursting');
        void btn.offsetWidth; // reflow to restart animation
        btn.classList.add('bursting');
        setTimeout(() => btn.classList.remove('bursting'), 550);
    }

    // Update chart colors for light/dark
    if (window._visitorChart) {
        const dark = !isLightMode;
        const tc = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
        const gc = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)';
        window._visitorChart.options.scales.x.ticks.color = tc;
        window._visitorChart.options.scales.y.ticks.color = tc;
        window._visitorChart.options.scales.y.grid.color  = gc;
        if (window._visitorChart.options.plugins.legend.labels)
            window._visitorChart.options.plugins.legend.labels.color = tc;
        window._visitorChart.update('none');
    }
}

let currentLang = 'id';
window.toggleLanguage = function() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    const langText = document.getElementById('lang-text');
    if(langText) langText.innerText = currentLang.toUpperCase();
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            element.innerHTML = translations[currentLang][key];
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[currentLang] && translations[currentLang][key]) {
            element.placeholder = translations[currentLang][key];
        }
    });
}

// Translations Object
const translations = {
    id: {
        nav_home: "Beranda", 
        nav_profil: "Profil", 
        nav_skill: "Kemampuan", 
        nav_project: "Proyek",
        nav_cert: "Pencapaian", 
        about_us: "Tentang Saya", 
        nav_contact: "Kontak",
        hero_title: "HAI, SAYA <br> <span class='hero-name-text'>DAMTA NOVIYAN MUHAMAD FAIZ</span>",
        hero_subtitle: "Pengembang Frontend & Backend | Mahasiswa Sistem Informasi | Ketertarikan Tinggi di Bidang Teknologi",
        profil_title: "Profil", 
        label_user: "Nama:", 
        label_loc: "Lokasi:", 
        label_guild: "Kampus:", 
        label_role: "Posisi:",
        skill_title: "Alat & Kemampuan", 
        project_title: "Proyek Unggulan",
        desc_p1: "Website interaktif yang dibangun menggunakan HTML, CSS, dan JavaScript murni (Vanilla JS) tanpa framework, menonjolkan desain UI/UX yang romantis dan personal.",
        desc_p2: "Website portofolio profesional bergaya modern dengan efek visual Glassmorphism dan animasi Neon 6D. Dikembangkan secara dinamis dan responsif menggunakan framework React.js.",
        desc_p3: "Sistem absensi berbasis web terintegrasi yang memanfaatkan PHP dan MySQL untuk verifikasi kehadiran karyawan secara real-time. Dilengkapi fitur unggah foto bukti fisik.",
        desc_p4: "Sistem toko online berbasis database yang mengintegrasikan logika PHP Native untuk menampilkan produk secara dinamis. Menggunakan CSS modern untuk efek visual Glassmorphism.",
        desc_p5: "Web App Roadmap menggunakan PHP, HTML5, dan CSS3 Neon Style. Backend menggunakan MySQL dengan fitur keamanan Login Google (OAuth 2.0).",
        desc_p6: "Sistem pemesanan web interaktif dengan menggunakan PHP Native dan MySQL. Dilengkapi fitur kustomisasi desain, manajemen database pesanan, integrasi invoice WhatsApp.",
        btn_view: "Lihat Website",
        cert_title: "Pencapaian", 
        cert_1: "Belajar Public Speaking", 
        desc_c1: "Menyelesaikan Program yang Berfokus gimana caranya Public Speaking.",
        cert_2: "Belajar Dasar AI", 
        desc_c2: "Menyelesaikan gimana cara menggunakan AI yang Efektif.",
        cert_3: "CISCO Packet Tracer", 
        desc_c3: "Pemahaman mendalam tentang pembuatan Proyek Mandiri (Karya Tulis Ilmiah).",
        cert_4: "Microsoft APPS", 
        desc_c4: "Mempelajari Aplikasi Perkantoran (Spereadsheet, Document, Presentation).",
        cert_5: "Ekstra Skill", 
        desc_c5: "Mempelajari tentang gimana cara menyelesaikan Sistem Pendingin Udara (Air Conditioner/AC).",
        cert_6: "REDHAT", 
        desc_c6: "Mempelajari Tentang Dasar-dasar Red Hat System Administration.",
        about_title_main: "Tentang",
        visi_title: "Visi",
        visi_desc: "Menjadi seseorang yang haus akan pengetahun teknologi, terus membuat inovasi baru dan mengimplementasikan di dunia nyata apa yang ada di dalam ide dan pikiran.",
        misi_title: "Misi",
        misi_desc: "Membangun keterampilan komunikasi terhadap tim yang efektif dan kolaboratif.",
        bio_heading: "Tentang",
        about_bio_1: "Pengenalan singkat mengenai siapa saya.",
        about_bio_2: "Saya Damta Noviyan Muhamad Faiz, seorang Full Stack Developer yang berbasis di Jakarta, berdedikasi untuk membangun solusi digital yang berdampak dan memanjakan mata. Saya spesialis dalam pengembangan platform web dinamis menggunakan tech stack modern, termasuk React.js, JavaScript, PHP, serta manajemen basis data relasional.",
        about_bio_3: "Fokus utama saya adalah merancang arsitektur sistem yang tidak hanya memiliki antarmuka (UI/UX) yang interaktif, tetapi juga terstruktur dengan baik di sisi backend, mudah dipelihara, dan skalabel untuk memenuhi kebutuhan bisnis. Saya percaya bahwa kode berkualitas tinggi harus berjalan beriringan dengan efisiensi sistem dan pengalaman pengguna yang mulus.",
        about_bio_4: "Sebagai seseorang yang memiliki ketertarikan tinggi di bidang inovasi teknologi, saya memadukan keahlian teknis dengan pemikiran kritis, komunikasi proaktif, and kolaborasi tim yang efektif. Saya terus berkembang untuk memastikan setiap proyek memberikan hasil optimal dan dampak nyata.",
        about_bio_5: "Salam hangat,",
        career_title: "Karier & Pendidikan",
        tl_title_1: "Full Stack Developer",
        tl_comp_1: "PT. Biro Klasifikasi Indonesia (Persero)",
        tl_date_1: "2026 - Sekarang • Jakarta, Indonesia",
        show_detail: "Tampilkan detail",
        hide_detail: "Sembunyikan detail",
        tl_desc_1: "Menjadi pengembang profesional di BKI dan berkontribusi pada proyek nasional. Bertanggung jawab dalam merancang arsitektur perangkat lunak yang fungsional dan efisien.",
        tl_title_2: "Mahasiswa Sistem Informasi",
        tl_comp_2: "UIN Syarif Hidayatullah Jakarta",
        tl_date_2: "2025 - Sekarang • Ciputat, Indonesia",
        tl_desc_2: "Lulus dari SMK Yappenda dan melanjutkan pendidikan tinggi di UIN Jakarta. Titik awal saya mendalami dunia Web Developer secara komprehensif.",
        tl_title_3: "Teknik Komputer Jaringan (TKJ)",
        tl_comp_3: "SMK Yappenda Jakarta",
        tl_date_3: "2022 - 2025 • Jakarta, Indonesia",
        tl_desc_3: "Fokus mendalami ilmu Teknik Komputer Jaringan. Aktif di ekstrakurikuler dan Ekskill untuk penajaman skill. Menguasai CISCO dan mempraktekannya dalam PKL.",
        history_title: "Perjalanan Berdasarkan Tahun",
        hist_2022: "Awal mula perjalanan di dunia teknologi dan dasar pemrograman Kelas X. Awalnya coba VSCode, sempat berhenti karena susah, tapi tetap penasaran.",
        hist_2023: "Mulai bisa menggunakan CISCO dibanding awal masuk kelas XI dan mulai PKL (Praktek Kerja Lapangan).",
        hist_2024: "Kelas XII, fokus mendalami TKJ, aktif di Ekskul dan Ekskill untuk penajaman skill.",
        hist_2025: "Lulus SMK Yappenda, masuk UIN Jakarta. Titik awal mendalami Web Developer.",
        hist_2026: "Menjadi pengembang profesional di BKI dan berkontribusi pada proyek nasional.",
        comment_title: "Ruang Obrolan",
        footer: "Hak Cipta Dilindungi.",
        dashboard_title: "Dasbor Statistik",
        visitor_title: "Total Pengunjung",
        visitor_desc: "Orang telah melihat portofolio ini",
        repo_title: "Total Repositori",
        follower_title: "Pengikut",
        contrib_title: "Aktivitas Kontribusi GitHub",
        country_title: "Demografi Negara",
        country_desc: "Asal negara pengunjung website",
        hero_greeting: "Hai, saya",
        hero_stat_exp: "Tahun Exp",
        hero_stat_live: "Proyek Live",
        hero_stat_tech: "Teknologi",
        hero_btn_projects: "Lihat Proyek",
        hero_btn_contact: "Hubungi Saya",
        stack_desc: "Ekosistem teknologi yang saya kuasai, terstruktur layaknya proyek industri nyata.",
        vs_select_file: "Pilih file untuk melihat detail teknologi",
        vs_explore_stack: "Klik salah satu file di sidebar untuk menjelajahi tech stack saya sebagai Full Stack Developer.",
        vs_stat_projects: "Proyek Live",
        vs_stat_tech: "Teknologi",
        vs_stat_years: "Tahun Coding",
        cmd_nav: "navigasi",
        cmd_select: "pilih",
        cmd_close: "tutup",
        cmd_placeholder: "Cari section, proyek, sosial media...",
        dash_repos: "Repositori",
        dash_followers: "Pengikut",
        dash_following: "Mengikuti",
        dash_stars: "Bintang ⭐",
        dash_repos_header: "Repositori Publik Terbaru",
        dash_view_all: "Lihat Semua",
        dash_languages: "Bahasa Favorit",
        dash_loading_repos: "Memuat repositori...",
        dash_loading_data: "Memuat data...",
        dash_negara: "Negara",
        chat_loading: "Memuat percakapan...",
        chat_login_prompt: "Silakan masuk untuk bergabung dalam percakapan.",
        btn_login_google: "Masuk dengan Google",
        btn_logout: "Keluar",
        comment_placeholder: "Tulis pesan...",
        desc_p7: "Aplikasi pencatatan keuangan Full-Stack berstandar industri yang dibangun menggunakan ekosistem JavaScript/TypeScript modern. Antarmuka (Frontend) dirancang menggunakan Next.js dan Tailwind CSS untuk performa yang cepat dan estetik. Sementara sisi peladen (Backend) ditenagai oleh Node.js dan Express.js yang terhubung ke database melalui Prisma ORM.",
        desc_p8: "Platform jual-beli akun premium (Canva, Netflix, Spotify, YouTube Premium, CapCut, AlightMotion) dengan sistem deposit saldo, manajemen stok otomatis, dan admin dashboard lengkap. Dibangun menggunakan PHP murni, Firebase (Auth, Firestore, Storage), dan Vanilla JS dengan Canvas 2D API untuk efek visual futuristik. Pembayaran via Midtrans Snap.js (transfer bank & QRIS otomatis). Fitur: Google Login, reseller tier, sistem garansi, voucher redeem, OTP & invite tools.",
        desc_p9: "Web App Roadmap menggunakan PHP, HTML5, dan CSS3 Neon Style. Backend menggunakan MySQL dengan fitur keamanan Login Google (OAuth 2.0).",
        see_more: "Lihat Semua",
        see_less: "Lebih Sedikit"
    },
    en: {
        nav_home: "Home", 
        nav_profil: "Profile", 
        nav_skill: "Skills", 
        nav_project: "Projects",
        nav_cert: "Achievements", 
        about_us: "About Me", 
        nav_contact: "Contact",
        hero_title: "HI, I AM <br> <span class='hero-name-text'>DAMTA NOVIYAN MUHAMAD FAIZ</span>",
        hero_subtitle: "Frontend & Backend Developer | Information Systems Student | Tech Enthusiast",
        profil_title: "Profile", 
        label_user: "Name:", 
        label_loc: "Location:", 
        label_guild: "Campus:", 
        label_role: "Role:",
        skill_title: "Tools & Skills", 
        project_title: "Featured Projects",
        desc_p1: "An interactive website built using HTML, CSS, and pure JavaScript (Vanilla JS) without frameworks, highlighting a romantic and personal UI/UX design.",
        desc_p2: "A modern professional portfolio website with Glassmorphism visual effects and 6D Neon animation. Dynamically and responsively developed using React.js.",
        desc_p3: "An integrated web-based attendance system utilizing PHP and MySQL for real-time employee attendance verification. Equipped with physical proof photo upload features.",
        desc_p4: "A database-based online store system integrating PHP Native logic to display products dynamically. Uses modern CSS for Glassmorphism visual effects.",
        desc_p5: "Roadmap Web App using PHP, HTML5, and CSS3 Neon Style. Backend uses MySQL with Google Login security features (OAuth 2.0).",
        desc_p6: "Interactive web ordering system using PHP Native and MySQL. Equipped with design customization, order database management, and automatic WhatsApp invoice integration.",
        btn_view: "View Website",
        cert_title: "Achievements", 
        cert_1: "Learning Public Speaking", 
        desc_c1: "Completed a program focused on Public Speaking techniques.",
        cert_2: "Learning Basic AI", 
        desc_c2: "Completed how to use AI effectively.",
        cert_3: "CISCO Packet Tracer", 
        desc_c3: "In-depth understanding of making Independent Projects (Scientific Writing).",
        cert_4: "Microsoft APPS", 
        desc_c4: "Studying Office Applications (Spreadsheet, Document, Presentation).",
        cert_5: "Extra Skill", 
        desc_c5: "Learning how to solve Air Conditioning (AC) system problems.",
        cert_6: "REDHAT", 
        desc_c6: "Learning about Red Hat System Administration Basics.",
        about_title_main: "About",
        visi_title: "Vision",
        visi_desc: "To be someone hungry for technological knowledge, constantly making new innovations and implementing what is in my mind and ideas into the real world.",
        misi_title: "Mission",
        misi_desc: "Build effective and collaborative team communication skills.",
        bio_heading: "About",
        about_bio_1: "A brief introduction about who I am.",
        about_bio_2: "I am Damta Noviyan Muhamad Faiz, a Full Stack Developer based in Jakarta, dedicated to building impactful and eye-catching digital solutions. I specialize in developing dynamic web platforms using modern tech stacks, including React.js, JavaScript, PHP, and relational database management.",
        about_bio_3: "My main focus is designing system architectures that not only have interactive user interfaces (UI/UX) but are also well-structured on the backend, easily maintainable, and scalable to meet business needs. I believe that high-quality code must go hand in hand with system efficiency and seamless user experience.",
        about_bio_4: "As someone with a high interest in technological innovation, I combine technical expertise with critical thinking, proactive communication, and effective team collaboration. I am constantly growing to ensure every project delivers optimal results and real impact.",
        about_bio_5: "Warm regards,",
        career_title: "Career & Education",
        tl_title_1: "Full Stack Developer",
        tl_comp_1: "PT. Biro Klasifikasi Indonesia (Persero)",
        tl_date_1: "2026 - Present • Jakarta, Indonesia",
        show_detail: "Show details",
        hide_detail: "Hide details",
        tl_desc_1: "Became a professional developer at BKI and contributed to national projects. Responsible for designing functional and efficient software architecture.",
        tl_title_2: "Information Systems Student",
        tl_comp_2: "UIN Syarif Hidayatullah Jakarta",
        tl_date_2: "2025 - Present • Ciputat, Indonesia",
        tl_desc_2: "Graduated from SMK Yappenda and continued higher education at UIN Jakarta. The starting point for me to delve into the world of Web Developers comprehensively.",
        tl_title_3: "Computer and Network Engineering (TKJ)",
        tl_comp_3: "SMK Yappenda Jakarta",
        tl_date_3: "2022 - 2025 • Jakarta, Indonesia",
        tl_desc_3: "Focusing on Computer and Network Engineering. Active in extracurriculars for skill sharpening. Mastered CISCO and put it into practice during internship.",
        history_title: "Journey By Year",
        hist_2022: "The beginning of the journey in technology and basic programming in 10th grade. Tried VSCode, stopped because it was hard, but remained curious.",
        hist_2023: "Started being able to use CISCO compared to early 11th grade and started internship.",
        hist_2024: "12th grade, focusing on TKJ, active in extracurriculars for skill sharpening.",
        hist_2025: "Graduated from SMK Yappenda, entered UIN Jakarta. The starting point of Web Development.",
        hist_2026: "Became a professional developer at BKI and contributed to national projects.",
        comment_title: "Chat Room",
        footer: "All Rights Reserved.",
        dashboard_title: "Statistics Dashboard",
        visitor_title: "Total Visitors",
        visitor_desc: "People have viewed this portfolio",
        repo_title: "Total Repositories",
        follower_title: "Followers",
        contrib_title: "GitHub Contribution Activity",
        country_title: "Country Demographics",
        country_desc: "Visitor's country of origin",
        hero_greeting: "Hi, I am",
        hero_stat_exp: "Years Exp",
        hero_stat_live: "Live Projects",
        hero_stat_tech: "Technologies",
        hero_btn_projects: "View Projects",
        hero_btn_contact: "Contact Me",
        stack_desc: "The technology ecosystem I master, structured like a real industry project.",
        vs_select_file: "Select a file to view technology details",
        vs_explore_stack: "Click one of the files in the sidebar to explore my tech stack as a Full Stack Developer.",
        vs_stat_projects: "Live Projects",
        vs_stat_tech: "Technologies",
        vs_stat_years: "Years Coding",
        cmd_nav: "navigate",
        cmd_select: "select",
        cmd_close: "close",
        cmd_placeholder: "Search section, project, social media...",
        dash_repos: "Repositories",
        dash_followers: "Followers",
        dash_following: "Following",
        dash_stars: "Stars ⭐",
        dash_repos_header: "Latest Public Repositories",
        dash_view_all: "View All",
        dash_languages: "Favourite Languages",
        dash_loading_repos: "Loading repositories...",
        dash_loading_data: "Loading data...",
        dash_negara: "Countries",
        chat_loading: "Loading conversation...",
        chat_login_prompt: "Please sign in to join the conversation.",
        btn_login_google: "Sign in with Google",
        btn_logout: "Sign out",
        comment_placeholder: "Write a message...",
        desc_p7: "An industry-standard Full-Stack financial recording application built using a modern JavaScript/TypeScript ecosystem. The frontend interface is designed using Next.js and Tailwind CSS for fast and aesthetic performance. While the backend is powered by Node.js and Express.js connected to a database through Prisma ORM.",
        desc_p8: "A premium account marketplace platform (Canva, Netflix, Spotify, YouTube Premium, CapCut, AlightMotion) featuring a balance deposit system, automatic stock management, and a complete admin dashboard. Built with pure PHP, Firebase (Auth, Firestore, Storage), and Vanilla JS with Canvas 2D API for futuristic visual effects (liquid background, holographic card, glitch text). Payments via Midtrans Snap.js (bank transfer & auto QRIS). Features: Google Login, reseller tiers, warranty system, voucher redemption, OTP & invite tools.",
        desc_p9: "Roadmap Web App using PHP, HTML5, and CSS3 Neon Style. Backend uses MySQL with Google Login security features (OAuth 2.0).",
        see_more: "See More",
        see_less: "See Less"
    }
};

// ==========================================================================
// 4. GITHUB REPO & LANGUAGE RENDERER
// ==========================================================================
const LANG_COLORS = {
    JavaScript:'#f7df1e', TypeScript:'#3178c6', PHP:'#777bb4',
    HTML:'#e34f26', CSS:'#264de4', Python:'#3572a5',
    Java:'#b07219', 'C#':'#178600', C:'#555555',
    Vue:'#41b883', Go:'#00add8', Ruby:'#701516',
    Rust:'#dea584', Swift:'#f05138', Kotlin:'#a97bff',
    Shell:'#89e051', SCSS:'#c6538c', Dart:'#00b4ab'
};

function renderGhRepos(repos) {
    const grid = document.getElementById('gh-repos-grid');
    if (!grid) return;
    if (!repos.length) { grid.innerHTML = '<p class="repo-loading">Tidak ada repositori publik.</p>'; return; }

    grid.innerHTML = repos.map(repo => {
        const color = LANG_COLORS[repo.language] || '#888';
        const langDot = repo.language
            ? `<span><span class="repo-lang-dot" style="background:${color}"></span> ${repo.language}</span>` : '';
        return `
        <a href="${repo.html_url}" target="_blank" class="repo-card">
            <div class="repo-card-name"><i class="ri-git-repository-line"></i>${repo.name}</div>
            <div class="repo-card-desc">${repo.description || 'Tidak ada deskripsi.'}</div>
            <div class="repo-card-meta">
                ${langDot}
                <span><i class="ri-star-line"></i> ${repo.stargazers_count || 0}</span>
                <span><i class="ri-git-branch-line"></i> ${repo.forks_count || 0}</span>
            </div>
        </a>`;
    }).join('');
}

function renderGhLanguages(langCount) {
    const container = document.getElementById('gh-langs-list');
    if (!container) return;
    const total = Object.values(langCount).reduce((a, b) => a + b, 0);
    if (!total) { container.innerHTML = '<p class="repo-loading">Data bahasa tidak tersedia.</p>'; return; }

    const sorted = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 7);
    container.innerHTML = sorted.map(([lang, count]) => {
        const pct = Math.round((count / total) * 100);
        const color = LANG_COLORS[lang] || '#94a3b8';
        return `
        <div class="lang-item">
            <div class="lang-item-header">
                <span class="lang-name"><span class="repo-lang-dot" style="background:${color}"></span>${lang}</span>
                <span class="lang-pct">${pct}%</span>
            </div>
            <div class="lang-bar-bg">
                <div class="lang-bar-fill" style="background:${color}" data-w="${pct}%"></div>
            </div>
        </div>`;
    }).join('');

    requestAnimationFrame(() => {
        container.querySelectorAll('.lang-bar-fill').forEach(b => { b.style.width = b.dataset.w; });
    });
}

// ==========================================================================
// 5. REPLY SYSTEM — Balasan Komentar + Notifikasi Email via EmailJS
// ==========================================================================

const EMAILJS_SERVICE_ID  = 'service_x3ywsyi';
const EMAILJS_TEMPLATE_ID = 'bm3li3y';
const EMAILJS_PUBLIC_KEY  = 'mKDqgvRxiQmiif3aQ';

(function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        /* EmailJS v4 — format objek, bukan string langsung */
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
        console.log('EmailJS siap.');
    }
})();

/* Toast notifikasi ringan untuk reply system */
function showReplyToast(msg, type) {
    const t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = `
        position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
        background:${type==='ok'?'rgba(34,197,94,0.92)':'rgba(239,68,68,0.92)'};
        color:#fff;padding:10px 22px;border-radius:20px;font-size:0.82rem;
        font-family:Poppins,sans-serif;z-index:99999;
        box-shadow:0 4px 20px rgba(0,0,0,0.3);pointer-events:none;
        animation:fadeIn .25s ease;
    `;
    document.body.appendChild(t);
    setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity .4s'; setTimeout(()=>t.remove(),400); }, 3500);
}

window.toggleReplyForm = function(commentId) {
    const form = document.getElementById(`reply-form-${commentId}`);
    if (!form) return;
    const isVisible = form.style.display === 'flex';
    form.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible) {
        const input = document.getElementById(`reply-input-${commentId}`);
        if (input) input.focus();
    }
};

/* submitReply sekarang hanya butuh commentId — data diambil dari commentMetaMap */
window.submitReply = async function(commentId) {
    const input = document.getElementById(`reply-input-${commentId}`);
    if (!input || !input.value.trim()) return alert('Tulis balasan terlebih dahulu!');

    const replyText = input.value.trim();
    const user = firebase.auth().currentUser;
    if (!user) return alert('Anda harus login terlebih dahulu!');

    /* Ambil data komentar dari Map — aman dari masalah escaping */
    const meta = (typeof commentMetaMap !== 'undefined' && commentMetaMap.get(commentId)) || {};
    const commenterEmail   = meta.email   || '';
    const commenterName    = meta.name    || 'Anonim';
    const originalComment  = meta.comment || '';

    const btn = input.nextElementSibling;
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i>'; }

    try {
        // 1. Simpan balasan ke Firestore
        await firebase.firestore()
            .collection('comments').doc(commentId)
            .collection('replies').add({
                name:      user.displayName,
                photo:     user.photoURL,
                email:     user.email,
                reply:     replyText,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

        input.value = '';
        window.toggleReplyForm(commentId);

        // 2. Kirim notifikasi email via EmailJS
        if (commenterEmail && typeof emailjs !== 'undefined') {
            /* Re-init defensif sebelum kirim */
            emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                name:     commenterName,
                email:    commenterEmail,
                to_email: commenterEmail,
                message:  replyText,
                time:     new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
                portfolio_url: 'https://damtaweb.com'
            }).then(() => {
                console.log('Email terkirim ke:', commenterEmail);
                showReplyToast('Balasan + notifikasi email terkirim!', 'ok');
            }).catch(err => {
                console.error('EmailJS error:', err);
                showReplyToast('Balasan tersimpan, email gagal: ' + (err.text||err.message||'error'), 'err');
            });
        } else {
            showReplyToast('Balasan terkirim!', 'ok');
            if (!commenterEmail) console.warn('Email teman tidak tersedia di Map');
        }

    } catch (error) {
        alert('Gagal kirim balasan: ' + error.message);
    } finally {
        if (btn) { btn.disabled = false; btn.innerHTML = '<i class="ri-send-plane-fill"></i> Kirim'; }
    }
};

// ==========================================================================
// 6. HERO CINEMA CANVAS — Tech Background Animation
// ==========================================================================
(function initHeroCinema() {
    const canvas = document.getElementById('heroCinema');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W, H, t = 0, mouse = { x: 0, y: 0 };

    // Palette
    const C = {
        blue:   '#60a5fa',
        violet: '#a78bfa',
        green:  '#34d399',
        orange: '#f97316',
        white:  'rgba(241,245,249,',
        bg:     '#020408'
    };

    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
        init();
    }

    // ── CIRCUIT NODES ──
    let nodes = [], traces = [];
    function initNodes() {
        nodes = [];
        const cols = Math.ceil(W / 90), rows = Math.ceil(H / 90);
        for (let r = 0; r <= rows; r++) {
            for (let c = 0; c <= cols; c++) {
                if (Math.random() < 0.55) {
                    nodes.push({
                        x: c * 90 + (Math.random() - 0.5) * 30,
                        y: r * 90 + (Math.random() - 0.5) * 30,
                        r: Math.random() * 2.5 + 1,
                        pulse: Math.random() * Math.PI * 2,
                        color: [C.blue, C.violet, C.green][Math.floor(Math.random() * 3)],
                        active: Math.random() < 0.4
                    });
                }
            }
        }
        traces = [];
        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            const candidates = nodes.filter(m => m !== n && Math.abs(m.x - n.x) < 95 && Math.abs(m.y - n.y) < 95 && Math.random() < 0.3);
            candidates.slice(0, 2).forEach(m => {
                traces.push({
                    x1: n.x, y1: n.y, x2: m.x, y2: m.y,
                    progress: 0, speed: Math.random() * 0.008 + 0.003,
                    color: n.color, pulse: Math.random() * Math.PI * 2,
                    active: Math.random() < 0.5
                });
            });
        }
    }

    // ── DATA STREAM COLUMNS ──
    let columns = [];
    const CHARS = '01アイウエオカキクケコABCDEF0123456789{}[]<>/|\\=-+*&%$#@!';
    function initColumns() {
        columns = [];
        const count = Math.floor(W / 28);
        for (let i = 0; i < count; i++) {
            columns.push({
                x: i * 28 + 14,
                y: Math.random() * H,
                speed: Math.random() * 1.2 + 0.4,
                chars: Array.from({ length: Math.floor(Math.random() * 16 + 8) }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
                color: [C.blue, C.green, C.violet][Math.floor(Math.random() * 3)],
                opacity: Math.random() * 0.18 + 0.04,
                size: Math.random() * 4 + 8
            });
        }
    }

    // ── FLOATING HOLOGRAPHIC PANELS ──
    let panels = [];
    const PANEL_DATA = [
        { title: '> Projects', lines: ['const projects = 8+', 'status: "deployed"', 'stack: fullstack'] },
        { title: '> Skills',   lines: ['languages: 15+', 'frameworks: 8', 'databases: 3'] },
        { title: '> System',   lines: ['uptime: 99.9%', 'build: success ✓', 'deploy: live'] },
        { title: '> Profile',  lines: ['role: "Full Stack"', 'loc: "Jakarta, ID"', 'open: true'] },
    ];
    function initPanels() {
        panels = PANEL_DATA.map((d, i) => ({
            ...d,
            x: (i % 2 === 0 ? 0.06 : 0.72) * W + (Math.random() - 0.5) * 40,
            y: (i < 2 ? 0.1 : 0.58) * H + (Math.random() - 0.5) * 30,
            w: 180, h: 88,
            opacity: 0, targetOpacity: Math.random() * 0.55 + 0.25,
            color: [C.blue, C.green, C.violet, C.orange][i],
            drift: { x: (Math.random() - 0.5) * 0.15, y: (Math.random() - 0.5) * 0.12 },
            phase: Math.random() * Math.PI * 2
        }));
    }

    // ── HEXAGONAL GRID ──
    function drawHexGrid() {
        const size = 38, rows = Math.ceil(H / (size * 1.7)) + 1, cols = Math.ceil(W / (size * 2)) + 1;
        ctx.save();
        ctx.strokeStyle = 'rgba(96,165,250,0.045)';
        ctx.lineWidth = 0.6;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const cx = c * size * 1.75 + (r % 2 === 0 ? 0 : size * 0.875);
                const cy = r * size * 1.52;
                ctx.beginPath();
                for (let k = 0; k < 6; k++) {
                    const angle = (Math.PI / 3) * k - Math.PI / 6;
                    const px = cx + size * Math.cos(angle);
                    const py = cy + size * Math.sin(angle);
                    k === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
                }
                ctx.closePath();
                ctx.stroke();
            }
        }
        ctx.restore();
    }

    // ── ROTATING WIREFRAME SHAPE ──
    let wireAngle = 0;
    function drawWireframe() {
        const cx = W * 0.5, cy = H * 0.5;
        const R = Math.min(W, H) * 0.18;
        wireAngle += 0.004;
        ctx.save();
        ctx.translate(cx, cy);

        // Outer ring
        ctx.beginPath();
        ctx.arc(0, 0, R * 1.05, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(96,165,250,0.07)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Rotating octahedron projection
        const verts = [];
        const pts = 8;
        for (let i = 0; i < pts; i++) {
            const a = (Math.PI * 2 / pts) * i + wireAngle;
            const a2 = (Math.PI * 2 / pts) * i + wireAngle * 0.6;
            verts.push({
                ox: Math.cos(a) * R * 0.85,
                oy: Math.sin(a) * R * 0.5,
                ix: Math.cos(a2) * R * 0.45,
                iy: Math.sin(a2) * R * 0.45
            });
        }

        // Outer polygon
        ctx.beginPath();
        verts.forEach((v, i) => {
            i === 0 ? ctx.moveTo(v.ox, v.oy) : ctx.lineTo(v.ox, v.oy);
        });
        ctx.closePath();
        const gOut = ctx.createLinearGradient(-R, -R, R, R);
        gOut.addColorStop(0, 'rgba(96,165,250,0.18)');
        gOut.addColorStop(0.5, 'rgba(167,139,250,0.14)');
        gOut.addColorStop(1, 'rgba(52,211,153,0.18)');
        ctx.strokeStyle = gOut;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Inner polygon
        ctx.beginPath();
        verts.forEach((v, i) => {
            i === 0 ? ctx.moveTo(v.ix, v.iy) : ctx.lineTo(v.ix, v.iy);
        });
        ctx.closePath();
        ctx.strokeStyle = 'rgba(167,139,250,0.25)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Spoke lines + cross dots
        verts.forEach((v, i) => {
            ctx.beginPath();
            ctx.moveTo(v.ox, v.oy);
            ctx.lineTo(v.ix, v.iy);
            ctx.strokeStyle = 'rgba(52,211,153,0.12)';
            ctx.lineWidth = 0.6;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(v.ox, v.oy, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(96,165,250,0.6)';
            ctx.fill();
        });

        // Center glow
        const gC = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.35);
        gC.addColorStop(0, 'rgba(167,139,250,0.12)');
        gC.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(0, 0, R * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = gC;
        ctx.fill();

        ctx.restore();
    }

    // ── SCANNING LINE ──
    let scanY = 0;
    function drawScanLine() {
        scanY = (scanY + 0.6) % H;
        const g = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
        g.addColorStop(0, 'transparent');
        g.addColorStop(0.5, 'rgba(96,165,250,0.06)');
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.fillRect(0, scanY - 40, W, 80);
    }

    // ── DRAW FUNCTIONS ──
    function drawTraces() {
        traces.forEach(tr => {
            if (!tr.active) return;
            tr.progress = Math.min(1, tr.progress + tr.speed);
            const ex = tr.x1 + (tr.x2 - tr.x1) * tr.progress;
            const ey = tr.y1 + (tr.y2 - tr.y1) * tr.progress;
            const alpha = (0.06 + 0.04 * Math.sin(t * 0.02 + tr.pulse));
            ctx.beginPath();
            ctx.moveTo(tr.x1, tr.y1);
            ctx.lineTo(ex, ey);
            ctx.strokeStyle = tr.color.replace('#', 'rgba(') + `,${alpha})`.replace('rgba(', 'rgba(0x'.slice(0,5));
            ctx.strokeStyle = tr.color + Math.round(alpha * 255).toString(16).padStart(2,'0');
            ctx.lineWidth = 0.7;
            ctx.stroke();
            // Data pulse dot
            if (tr.progress < 1) {
                ctx.beginPath();
                ctx.arc(ex, ey, 2, 0, Math.PI * 2);
                ctx.fillStyle = tr.color + 'cc';
                ctx.fill();
            }
            if (tr.progress >= 1 && Math.random() < 0.003) tr.progress = 0;
        });
    }

    function drawNodes() {
        nodes.forEach(n => {
            n.pulse += 0.04;
            const a = n.active ? (0.5 + 0.3 * Math.sin(n.pulse)) : (0.1 + 0.08 * Math.sin(n.pulse));
            // Outer glow
            if (n.active) {
                const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
                g.addColorStop(0, n.color + '55');
                g.addColorStop(1, 'transparent');
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
                ctx.fillStyle = g;
                ctx.fill();
            }
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = n.color + Math.round(a * 255).toString(16).padStart(2,'0');
            ctx.fill();
        });
    }

    function drawColumns() {
        columns.forEach(col => {
            col.y += col.speed;
            if (col.y > H + col.chars.length * col.size) col.y = -col.chars.length * col.size;
            ctx.save();
            ctx.font = `${col.size}px monospace`;
            col.chars.forEach((ch, i) => {
                const fy = col.y + i * col.size;
                if (fy < -col.size || fy > H + col.size) return;
                const fade = i === col.chars.length - 1 ? 0.7 : col.opacity * (1 - i / col.chars.length);
                ctx.fillStyle = i === col.chars.length - 1 ? (col.color + 'bb') : (col.color + Math.round(fade * 255).toString(16).padStart(2,'0'));
                ctx.fillText(ch, col.x, fy);
            });
            ctx.restore();
        });
    }

    function drawPanels() {
        panels.forEach(p => {
            p.x += p.drift.x;
            p.y += p.drift.y;
            p.opacity += (p.targetOpacity - p.opacity) * 0.02;
            p.phase += 0.015;
            // Boundary bounce
            if (p.x < 0 || p.x + p.w > W) p.drift.x *= -1;
            if (p.y < 0 || p.y + p.h > H) p.drift.y *= -1;

            const a = p.opacity * (0.85 + 0.15 * Math.sin(p.phase));
            ctx.save();
            ctx.globalAlpha = a;
            // Background
            ctx.fillStyle = 'rgba(2,6,14,0.75)';
            ctx.strokeStyle = p.color + '55';
            ctx.lineWidth = 1;
            roundRect(ctx, p.x, p.y, p.w, p.h, 6);
            ctx.fill();
            ctx.stroke();
            // Corner accents
            const ca = p.color + 'aa';
            drawCorner(ctx, p.x, p.y, ca);
            drawCorner(ctx, p.x + p.w, p.y, ca, true);
            // Title
            ctx.fillStyle = p.color;
            ctx.font = 'bold 9px monospace';
            ctx.fillText(p.title, p.x + 8, p.y + 14);
            // Lines
            ctx.font = '8px monospace';
            p.lines.forEach((line, i) => {
                ctx.fillStyle = i === 0 ? '#60a5facc' : '#94a3b8aa';
                ctx.fillText(line, p.x + 8, p.y + 28 + i * 18);
            });
            // Bottom bar
            ctx.fillStyle = p.color + '33';
            ctx.fillRect(p.x, p.y + p.h - 3, p.w * (0.4 + 0.3 * Math.sin(t * 0.03 + p.phase)), 3);
            ctx.restore();
        });
    }

    function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }

    function drawCorner(ctx, x, y, color, flipX = false) {
        const s = 8, d = flipX ? -1 : 1;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + d * s, y);
        ctx.lineTo(x, y);
        ctx.lineTo(x, y + s);
        ctx.stroke();
    }

    // ── MAIN DRAW LOOP ──
    function draw() {
        t++;
        // Transparan — video tetap keliatan di bawah
        ctx.clearRect(0, 0, W, H);

        drawHexGrid();
        drawTraces();
        drawColumns();
        drawScanLine();
        drawWireframe();
        drawNodes();
        drawPanels();

        requestAnimationFrame(draw);
    }

    function init() {
        initNodes();
        initColumns();
        initPanels();
    }

    window.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('resize', resize);

    // Wait for layout
    requestAnimationFrame(() => { resize(); draw(); });
})();

// ==========================================================================
// 6. CINEMATIC SCROLL ANIMATIONS — GSAP + ScrollTrigger
// ==========================================================================
(function initCinematic() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.config({ ignoreMobileResize: true });

    const isMobile = window.innerWidth <= 768;

    // ── A. HERO — Parallax cinematic zoom-out saat scroll ──
    const heroTitle    = document.querySelector('.hero h1, .neon-title-blue');
    const heroSubtitle = document.querySelector('.hero-subtitle, .hero p');
    const heroCta      = document.querySelector('.hero-cta');
    const heroStrip    = document.querySelector('.hero-tech-strip');
    const heroBadge    = document.querySelector('.hero-status-badge');

    if (heroTitle) {
        // Mobile: opacity fade only (no y/scale — janky on touch scroll)
        gsap.to(heroTitle, {
            scrollTrigger: { trigger: '#home', start: 'top top', end: '60% top', scrub: isMobile ? 2 : 1.2 },
            y: isMobile ? 0 : -80,
            opacity: 0,
            scale: isMobile ? 1 : 0.92,
            ease: 'power2.inOut'
        });
    }
    if (heroSubtitle) {
        gsap.to(heroSubtitle, {
            scrollTrigger: { trigger: '#home', start: 'top top', end: '50% top', scrub: isMobile ? 2 : 1 },
            y: isMobile ? 0 : -50, opacity: 0, ease: 'power1.inOut'
        });
    }
    if (heroCta) {
        gsap.to(heroCta, {
            scrollTrigger: { trigger: '#home', start: 'top top', end: '45% top', scrub: isMobile ? 1.5 : 0.8 },
            y: isMobile ? 0 : -30, opacity: 0, ease: 'power1.inOut'
        });
    }
    if (heroStrip) {
        gsap.to(heroStrip, {
            scrollTrigger: { trigger: '#home', start: 'top top', end: '40% top', scrub: 0.6 },
            y: isMobile ? 0 : -20, opacity: 0
        });
    }
    if (heroBadge) {
        gsap.to(heroBadge, {
            scrollTrigger: { trigger: '#home', start: 'top top', end: '35% top', scrub: 0.5 },
            y: isMobile ? 0 : -15, opacity: 0
        });
    }

    // ── B. SECTION HEADERS — Cinematic depth entrance ──
    gsap.utils.toArray('section h2').forEach(h2 => {
        gsap.fromTo(h2,
            { opacity: 0, y: 60, scale: 0.94, filter: 'blur(6px)' },
            {
                scrollTrigger: { trigger: h2, start: 'top 88%', end: 'top 55%', scrub: false, toggleActions: 'play none none reverse' },
                opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
                duration: 0.9, ease: 'expo.out'
            }
        );
    });

    // ── C. PROFIL CARDS — Depth stagger ──
    gsap.utils.toArray('.profil-card').forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, y: 50, rotateX: 8, scale: 0.96 },
            {
                scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' },
                opacity: 1, y: 0, rotateX: 0, scale: 1,
                duration: 0.8, delay: i * 0.1, ease: 'back.out(1.4)'
            }
        );
    });

    // ── D. PROJECT CARDS — Stagger cinematic slide-up ──
    const projectCards = gsap.utils.toArray('.project-card');
    if (projectCards.length) {
        gsap.fromTo(projectCards,
            { opacity: 0, y: 70, scale: 0.95 },
            {
                scrollTrigger: { trigger: '#projects', start: 'top 80%', toggleActions: 'play none none reverse' },
                opacity: 1, y: 0, scale: 1,
                duration: 0.7, stagger: 0.12, ease: 'power3.out'
            }
        );
    }

    // ── E. CERT CARDS — Fan-in from bottom ──
    const certCards = gsap.utils.toArray('.cert-card');
    if (certCards.length) {
        gsap.fromTo(certCards,
            { opacity: 0, y: 50, rotation: gsap.utils.wrap([-3, 3]) },
            {
                scrollTrigger: { trigger: '#certificates', start: 'top 82%', toggleActions: 'play none none reverse' },
                opacity: 1, y: 0, rotation: 0,
                duration: 0.65, stagger: 0.08, ease: 'power2.out'
            }
        );
    }

    // ── F. SKILL ITEMS — Wave stagger ──
    const techItems = gsap.utils.toArray('.tech-item');
    if (techItems.length) {
        gsap.fromTo(techItems,
            { opacity: 0, scale: 0.7, y: 30 },
            {
                scrollTrigger: { trigger: '#skill', start: 'top 80%', toggleActions: 'play none none reverse' },
                opacity: 1, scale: 1, y: 0,
                duration: 0.5, stagger: { each: 0.06, from: 'center' }, ease: 'back.out(1.6)'
            }
        );
    }

    // ── G. VS CODE WINDOW — Slide in dari bawah dengan depth ──
    const vscodeWin = document.querySelector('.vscode-window');
    if (vscodeWin) {
        gsap.fromTo(vscodeWin,
            { opacity: 0, y: 80, scale: 0.97, rotateX: 4 },
            {
                scrollTrigger: { trigger: '#stack', start: 'top 80%', toggleActions: 'play none none reverse' },
                opacity: 1, y: 0, scale: 1, rotateX: 0,
                duration: 1, ease: 'expo.out'
            }
        );
    }

    // ── H. DASHBOARD CARDS — Slide dari kiri/kanan ──
    const dashCards = gsap.utils.toArray('.dash-card');
    dashCards.forEach((card, i) => {
        gsap.fromTo(card,
            { opacity: 0, x: i % 2 === 0 ? -50 : 50, y: 20 },
            {
                scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
                opacity: 1, x: 0, y: 0,
                duration: 0.75, delay: i * 0.08, ease: 'power3.out'
            }
        );
    });

    // ── I. VM CARDS — Depth flip ──
    const vmCards = gsap.utils.toArray('.vm-card');
    if (vmCards.length) {
        gsap.fromTo(vmCards,
            { opacity: 0, rotateY: 15, x: -40 },
            {
                scrollTrigger: { trigger: '#about', start: 'top 80%', toggleActions: 'play none none reverse' },
                opacity: 1, rotateY: 0, x: 0,
                duration: 0.8, stagger: 0.15, ease: 'power2.out'
            }
        );
    }

    // ── J. TIMELINE CARDS — Slide kanan berurutan ──
    const timelineCards = gsap.utils.toArray('.timeline-card');
    if (timelineCards.length) {
        gsap.fromTo(timelineCards,
            { opacity: 0, x: 60 },
            {
                scrollTrigger: { trigger: '.timeline-section, #about', start: 'top 78%', toggleActions: 'play none none reverse' },
                opacity: 1, x: 0,
                duration: 0.7, stagger: 0.18, ease: 'power3.out'
            }
        );
    }

    // ── K. REPO CARDS — Stagger masuk ──
    ScrollTrigger.create({
        trigger: '#dashboard',
        start: 'top 80%',
        onEnter: () => {
            setTimeout(() => {
                const repoCards = gsap.utils.toArray('.repo-card');
                if (repoCards.length) {
                    gsap.fromTo(repoCards,
                        { opacity: 0, y: 30, scale: 0.96 },
                        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
                    );
                }
            }, 600);
        }
    });

    // ── L. PROGRESS BARS NEGARA — Animate saat masuk viewport ──
    ScrollTrigger.create({
        trigger: '.country-list',
        start: 'top 85%',
        onEnter: () => {
            document.querySelectorAll('.progress-bar-fill').forEach(bar => {
                const target = bar.style.width;
                bar.style.width = '0%';
                gsap.to(bar, { width: target, duration: 1.5, ease: 'power2.out', delay: 0.2 });
            });
        }
    });

    console.log('Cinematic scroll ready.');
})();

// ==========================================================================
// 7. GOOEY TEXT MORPH — Hero Role Cycling
// ==========================================================================
(function initGooeyMorph() {
    const t1 = document.getElementById('hero-morph-t1');
    const t2 = document.getElementById('hero-morph-t2');
    if (!t1 || !t2) return;

    const roles = [
        'Full Stack Developer',
        'Frontend Specialist',
        'Backend Engineer',
        'UI/UX Enthusiast',
        'React & Next.js Dev',
        'BKI Software Engineer',
    ];

    const MORPH_S    = 1.2;  // seconds for one morph transition
    const COOLDOWN_S = 2.8;  // seconds to hold before next morph

    let idx      = 0;        // index of role shown in t1 (the visible/outgoing one)
    let morphing = false;
    let morphP   = 0;        // progress 0→1
    let cooldown = COOLDOWN_S;
    let lastTs   = null;

    // t1 = current (visible), t2 = next (pre-loaded, hidden)
    function resetState() {
        t1.textContent   = roles[idx];
        t2.textContent   = roles[(idx + 1) % roles.length];
        t1.style.filter  = '';   t1.style.opacity = '1';
        t2.style.filter  = 'blur(100px)'; t2.style.opacity = '0';
    }
    resetState();

    function applyMorph(f) {
        const b2 = Math.min(8 / (f + 0.001) - 8, 100);
        const b1 = Math.min(8 / (1 - f + 0.001) - 8, 100);
        t2.style.filter  = `blur(${b2.toFixed(1)}px)`;
        t2.style.opacity = Math.pow(f, 0.4).toFixed(4);
        t1.style.filter  = `blur(${b1.toFixed(1)}px)`;
        t1.style.opacity = Math.pow(1 - f, 0.4).toFixed(4);
    }

    function frame(ts) {
        if (!lastTs) lastTs = ts;
        const dt = Math.min((ts - lastTs) / 1000, 0.1);
        lastTs = ts;

        if (!morphing) {
            cooldown -= dt;
            if (cooldown <= 0) { morphing = true; morphP = 0; }
        } else {
            morphP += dt / MORPH_S;
            if (morphP >= 1) {
                // Morph done: next role is now visible (t2)
                idx      = (idx + 1) % roles.length;
                morphing = false;
                cooldown = COOLDOWN_S;
                // Swap: make t1 the newly-visible role, t2 the one after it
                resetState();
            } else {
                applyMorph(morphP);
            }
        }
        requestAnimationFrame(frame);
    }

    setTimeout(() => requestAnimationFrame(frame), 1400);
})();

// ==========================================================================
// 8. HERO STATS COUNTER — Animated numbers on load
// ==========================================================================
(function initHeroStats() {
    const statEls = document.querySelectorAll('.hero-stat-num');
    if (!statEls.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.target || '0');
            let current = 0;
            const step = Math.ceil(target / 40);
            const timer = setInterval(() => {
                current = Math.min(current + step, target);
                el.textContent = current;
                if (current >= target) clearInterval(timer);
            }, 40);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    statEls.forEach(el => observer.observe(el));
})();

// ==========================================================================
// 8-B. VISITOR BAR CHART — Monthly Statistics
// ==========================================================================
(function initVisitorChart() {
    const canvas = document.getElementById('visitorBarChart');
    if (!canvas || typeof Chart === 'undefined') return;

    const MONTHS = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    const DESKTOP = [128,215,187,293,342,412,387,521,468,587,634,712];
    const MOBILE  = [97, 163,142,218,267,318,291,398,357,442,489,543];

    const isDark = () => !document.body.classList.contains('light-mode');

    const gridColor  = () => isDark() ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)';
    const tickColor  = () => isDark() ? 'rgba(255,255,255,0.5)'  : 'rgba(0,0,0,0.5)';

    const chart = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: MONTHS,
            datasets: [
                {
                    label: 'Desktop',
                    data: DESKTOP,
                    backgroundColor: 'rgba(96,165,250,0.75)',
                    hoverBackgroundColor: 'rgba(96,165,250,1)',
                    borderRadius: 6,
                    borderSkipped: false,
                    barPercentage: 0.55,
                },
                {
                    label: 'Mobile',
                    data: MOBILE,
                    backgroundColor: 'rgba(167,139,250,0.75)',
                    hoverBackgroundColor: 'rgba(167,139,250,1)',
                    borderRadius: 6,
                    borderSkipped: false,
                    barPercentage: 0.55,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.8,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    align: 'end',
                    labels: {
                        color: tickColor(),
                        boxWidth: 10,
                        boxHeight: 10,
                        borderRadius: 3,
                        useBorderRadius: true,
                        font: { size: 11, family: 'Poppins' },
                        padding: 14,
                    },
                },
                tooltip: {
                    backgroundColor: 'rgba(15,23,42,0.92)',
                    borderColor: 'rgba(96,165,250,0.3)',
                    borderWidth: 1,
                    titleColor: '#e2e8f0',
                    bodyColor: '#94a3b8',
                    padding: 10,
                    cornerRadius: 8,
                    callbacks: {
                        label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString('id-ID')} pengunjung`,
                    },
                },
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: tickColor(), font: { size: 11, family: 'Poppins' } },
                    border: { display: false },
                },
                y: {
                    grid: { color: gridColor(), drawTicks: false },
                    ticks: {
                        color: tickColor(),
                        font: { size: 11, family: 'Poppins' },
                        padding: 8,
                        callback: v => v >= 1000 ? (v/1000).toFixed(1)+'k' : v,
                    },
                    border: { display: false, dash: [4,4] },
                },
            },
        },
    });

    window._visitorChart = chart;

    window.filterVisitorChart = function(filter) {
        document.querySelectorAll('.vcf-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.filter === filter);
        });
        chart.data.datasets.forEach(ds => {
            const key = ds.label.toLowerCase();
            if (filter === 'all') {
                ds.backgroundColor = key === 'desktop' ? 'rgba(96,165,250,0.75)' : 'rgba(167,139,250,0.75)';
                ds.hoverBackgroundColor = key === 'desktop' ? 'rgba(96,165,250,1)' : 'rgba(167,139,250,1)';
            } else {
                const isActive = key === filter;
                ds.backgroundColor      = isActive ? (key === 'desktop' ? 'rgba(96,165,250,0.75)' : 'rgba(167,139,250,0.75)') : 'rgba(255,255,255,0.06)';
                ds.hoverBackgroundColor = isActive ? (key === 'desktop' ? 'rgba(96,165,250,1)'    : 'rgba(167,139,250,1)')    : 'rgba(255,255,255,0.1)';
            }
        });
        chart.update();
    };
})();

// ==========================================================================
// 9. 3D TILT EFFECT — Cards
// ==========================================================================
(function initTilt() {
    const TILT_SEL = '.project-card, .cert-card, .vm-card, .dash-card, .stat-card';
    const MAX_TILT = 10;

    function applyTilt(card) {
        card.classList.add('tilt-card');
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width  - 0.5;
            const y = (e.clientY - r.top)  / r.height - 0.5;
            card.style.transform = `perspective(900px) rotateY(${x * MAX_TILT}deg) rotateX(${-y * MAX_TILT}deg) scale(1.025)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    }

    // Apply after DOM ready
    document.querySelectorAll(TILT_SEL).forEach(applyTilt);

    // Also watch for dynamically added cards (repos, etc.)
    new MutationObserver(mutations => {
        mutations.forEach(m => m.addedNodes.forEach(node => {
            if (node.nodeType !== 1) return;
            if (node.matches && node.matches(TILT_SEL)) applyTilt(node);
            node.querySelectorAll && node.querySelectorAll(TILT_SEL).forEach(applyTilt);
        }));
    }).observe(document.body, { childList: true, subtree: true });
})();

// ==========================================================================
// 10. MAGNETIC BUTTONS — CTA hover attraction
// ==========================================================================
(function initMagneticBtns() {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const r = btn.getBoundingClientRect();
            const x = (e.clientX - r.left - r.width  / 2) * 0.25;
            const y = (e.clientY - r.top  - r.height / 2) * 0.25;
            btn.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
})();

// ==========================================================================
// 11. SPLINE 3D SCENE — Interactive: speech bubble + greeting + click
// ==========================================================================
(function initSplineViewer() {
    const viewer  = document.getElementById('splineViewer');
    const loading = document.getElementById('splineLoading');
    const wrap    = document.getElementById('heroRobotWrap');
    if (!wrap) return;

    const SHOW_MS  = 3800; // how long speech bubble stays

    /* ── Speech bubble (typing effect) ── */
    function showBubble() {
        const old = wrap.querySelector('.robot-speech');
        if (old) old.remove();

        const isEN = (typeof currentLang !== 'undefined' ? currentLang : 'id') === 'en';
        const lines = isEN
            ? ['Hi there! 👋', "Welcome to Damta's", 'Portfolio!']
            : ['Hai! 👋', 'Selamat datang di', 'Portofolio Damta!'];

        const bubble = document.createElement('div');
        bubble.className = 'robot-speech';
        wrap.appendChild(bubble);

        let li = 0;
        function typeLine() {
            if (li >= lines.length) {
                setTimeout(() => {
                    bubble.classList.add('fade-out');
                    setTimeout(() => { if (bubble.parentNode) bubble.remove(); }, 400);
                }, SHOW_MS);
                return;
            }
            if (li > 0) bubble.appendChild(document.createElement('br'));
            const span = document.createElement('span');
            bubble.appendChild(span);
            const txt = lines[li]; let ci = 0;
            const iv = setInterval(() => {
                span.textContent += txt[ci++];
                if (ci >= txt.length) { clearInterval(iv); li++; setTimeout(typeLine, 130); }
            }, 36);
        }
        typeLine();
    }

    /* ── Web Speech API (no CDN, browser built-in) ── */
    function speak() {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        setTimeout(() => {
            const isEN = (typeof currentLang !== 'undefined' ? currentLang : 'id') === 'en';
            const utter = new SpeechSynthesisUtterance(
                isEN ? 'Hi! Welcome to Damta Noviyan portfolio!'
                     : 'Hai! Selamat datang di portofolio Damta Noviyan!'
            );
            utter.lang   = isEN ? 'en-US' : 'id-ID';
            utter.rate   = 1.0;
            utter.pitch  = 1.1;
            utter.volume = 0.85;
            window.speechSynthesis.resume();
            window.speechSynthesis.speak(utter);
        }, 150);
    }

    /* ── Pulse dot indicator while greeting ── */
    function pulseDot() {
        const dot = wrap.querySelector('.robot-label-dot');
        if (!dot) return;
        dot.style.cssText = 'background:#34d399;box-shadow:0 0 12px #34d399;animation:none';
        setTimeout(() => { dot.style.cssText = ''; }, SHOW_MS + 400);
    }

    /* ── Trigger greeting (byUser = clicked manually) ── */
    let greeted = false;
    function greet(byUser) {
        showBubble();
        pulseDot();
        if (byUser) speak(); // speech only on user gesture (browser policy)
    }

    /* ── Hide "Built with Spline" logo (inject CSS into shadow root) ── */
    function hideSplineLogo() {
        if (!viewer || !viewer.shadowRoot) return;
        if (viewer.shadowRoot.querySelector('#_hsl')) return; // already injected
        const s = document.createElement('style');
        s.id = '_hsl';
        s.textContent = 'a[href*="spline"],#logo,[class*="logo"]{display:none!important;opacity:0!important;pointer-events:none!important}';
        viewer.shadowRoot.appendChild(s);
    }
    [0, 800, 2000, 4000].forEach(ms => setTimeout(hideSplineLogo, ms));
    if (viewer) viewer.addEventListener('load', hideSplineLogo);

    /* ── Hide loading overlay when Spline scene is ready ── */
    function hideLoading() {
        if (!loading) return;
        loading.style.opacity = '0';
        setTimeout(() => { if (loading) loading.style.display = 'none'; }, 500);
        hideSplineLogo();
    }
    if (viewer) viewer.addEventListener('load', hideLoading);
    setTimeout(hideLoading, 10000); // fallback

    /* ── Reveal card + auto-greet when hero enters viewport ── */
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            wrap.style.opacity = '1';
            if (!greeted) { greeted = true; setTimeout(() => greet(false), 2400); }
        });
    }, { threshold: 0.1 });
    obs.observe(document.getElementById('home') || wrap);

    /* ── Label click / tap ── */
    const label = wrap.querySelector('.robot-label');
    const labelText = label && label.querySelector('.robot-label-text');
    if (label) {
        if (labelText) labelText.textContent = 'Klik untuk Sapa';
        label.addEventListener('click', () => greet(true));
        label.addEventListener('touchend', e => { e.preventDefault(); greet(true); }, { passive: false });
    }
})();


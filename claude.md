instruksi new :
-warna untuk tampilan yang loading itu buat sedemikian rupa supaya menjadi warna yang profesional dan itu yang element dari 21.st juga warnanya kayanya bagusan emas & coklat.
-untuk mode terang itu vidionya ga keliatan jelas kaya kabut gitu, beda dengan layar gelap terlihat jelas tolong perbaiki itu supaya gada putih'nya untuk bagian itu saja.
-untuk name tag itu jangan dikasih animasi scroll untuk mobile/hp. cukup laptop saja.
-teknologi kan itu 15+, update.
-untuk tampilan project yang di tampilkan hanya 6 saja selebihnya klik see more (bahasa inggris), buat 2 bahasa, ketika di translate menjadi see more.
-untuk demografi sama statistik itu buat samping sampingan. jangan susun kebawah
-dan memastikan untuk robot itu berfungsi untuk semua device.

instrukti new 6/4/2026

Aku punya project web yang sekarang masih pakai HTML, CSS, dan vanilla JS 
(satu file atau beberapa file static). Aku mau migrate ke arsitektur 
full-stack profesional dengan stack berikut:

STACK:
- Frontend: React 18 + TypeScript + Vite + Tailwind CSS + React Router
- Backend: Node.js + Express + TypeScript + Prisma ORM
- Database: MySQL
- Validation: Zod
- State management: Zustand (atau React Query buat server state)

PERSYARATAN:
1. UI/UX harus IDENTIK dengan versi HTML aslinya — jangan ubah design, 
   warna, layout, atau interaksi visual
2. Pecah HTML jadi React components yang reusable (atomic design: 
   ui/layout/features)
3. CSS inline / <style> tag di-convert ke Tailwind utility classes
4. Vanilla JS logic di-port ke React hooks + TypeScript
5. Bikin REST API di backend buat data yang sebelumnya hard-coded
6. Folder structure: monorepo dengan apps/web (frontend) dan apps/api (backend)
7. Setup TypeScript strict mode di kedua side
8. Tambahin ESLint + Prettier config
9. Bikin .env.example, README.md, dan docker-compose.yml buat MySQL local
10. Setup proper error handling, logging, dan API response standard

LANGKAH YANG AKU MAU:
1. Analisis dulu HTML/CSS/JS yang ada di file [nama-file.html]
2. Kasih aku migration plan + folder structure final
3. Generate scaffolding project (package.json, configs, folder kosong)
4. Migrate file per file secara bertahap, mulai dari komponen paling kecil
5. Setelah frontend jadi, baru bikin backend API yang nyambung

Mulai dari step 1: analisis file aku dulu dan kasih migration plan.

File yang mau dimigrate: [paste atau attach file HTML kamu]
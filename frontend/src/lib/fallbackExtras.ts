/**
 * Fallback content for the pages added in v3.1 (blog + external coding stats).
 * Same contract as fallbackData.ts: the UI renders this instantly and swaps in
 * live API data when the backend answers.
 */
import type {
  Post,
  WakatimeStats,
  CodewarsStats,
  MonkeytypeStats,
  UmamiStats,
} from '@damta/types';

/* ------------------------------------------------------------------ */
/* Blog                                                                */
/* ------------------------------------------------------------------ */

const migrationBodyId = [
  '## Kenapa saya migrasi ke React + TypeScript',
  '',
  'Portofolio ini awalnya satu berkas HTML raksasa dengan CSS dan JavaScript',
  'vanilla. Menyenangkan untuk dimulai, tapi menyakitkan untuk dirawat.',
  '',
  '### Masalah yang saya temui',
  '',
  '- Satu perubahan kecil memaksa saya membaca ribuan baris.',
  '- Tidak ada tipe, jadi salah ketik baru ketahuan di browser.',
  '- Sulit memakai ulang potongan UI yang sama.',
  '',
  '### Hasil setelah migrasi',
  '',
  '1. Komponen kecil yang bisa dipakai ulang.',
  '2. TypeScript **strict** menangkap kesalahan sebelum runtime.',
  '3. Backend Express + Prisma memisahkan data dari tampilan.',
  '',
  '> Kode yang baik bukan yang paling pintar, tapi yang paling mudah diubah.',
  '',
  'Contoh komponen yang sekarang saya pakai di banyak halaman:',
  '',
  '```tsx',
  'export function StatCard({ label, value }: Props) {',
  '  return (',
  '    <div className="dash-card stat-card">',
  '      <span className="gh-stat-num">{value}</span>',
  '      <span className="gh-stat-lab">{label}</span>',
  '    </div>',
  '  );',
  '}',
  '```',
  '',
  'Kalau kamu sedang mempertimbangkan hal yang sama: mulai dari komponen paling',
  'kecil, jangan langsung merombak semuanya.',
].join('\n');

const migrationBodyEn = [
  '## Why I migrated to React + TypeScript',
  '',
  'This portfolio started as one huge HTML file with vanilla CSS and JavaScript.',
  'Fun to start, painful to maintain.',
  '',
  '### Problems I ran into',
  '',
  '- One small change forced me to read thousands of lines.',
  '- No types, so typos only surfaced in the browser.',
  '- Hard to reuse the same piece of UI.',
  '',
  '### The result after migrating',
  '',
  '1. Small components I can reuse.',
  '2. TypeScript **strict** catches mistakes before runtime.',
  '3. An Express + Prisma backend separates data from presentation.',
  '',
  '> Good code is not the cleverest, it is the easiest to change.',
  '',
  'An example of a component I now reuse across pages:',
  '',
  '```tsx',
  'export function StatCard({ label, value }: Props) {',
  '  return (',
  '    <div className="dash-card stat-card">',
  '      <span className="gh-stat-num">{value}</span>',
  '      <span className="gh-stat-lab">{label}</span>',
  '    </div>',
  '  );',
  '}',
  '```',
  '',
  'If you are considering the same move: start with the smallest component, do',
  'not rewrite everything at once.',
].join('\n');

const stackBodyId = [
  '## Tumpukan teknologi yang saya pakai sehari-hari',
  '',
  'Saya memilih perkakas berdasarkan satu pertanyaan: **apakah ini mengurangi',
  'waktu saya memperbaiki bug?**',
  '',
  '### Frontend',
  '',
  '- **React + TypeScript** untuk komponen dan tipe.',
  '- **Vite** untuk dev server yang nyaris instan.',
  '- **Tailwind** untuk komponen baru, tanpa membuang design system lama.',
  '',
  '### Backend',
  '',
  '- **Express** karena kecil, jelas, dan mudah dibaca.',
  '- **Prisma** karena skema jadi sumber kebenaran dan migrasi dibuat otomatis.',
  '- **Zod** untuk memvalidasi input di perbatasan sistem.',
  '',
  '### Yang saya hindari',
  '',
  'Menambah pustaka baru hanya karena sedang populer. Setiap dependensi adalah',
  'utang yang harus dibayar saat upgrade.',
].join('\n');

const stackBodyEn = [
  '## The stack I use day to day',
  '',
  'I pick tools by asking one question: **does this reduce the time I spend',
  'fixing bugs?**',
  '',
  '### Frontend',
  '',
  '- **React + TypeScript** for components and types.',
  '- **Vite** for a near-instant dev server.',
  '- **Tailwind** for new components, without throwing away the old design system.',
  '',
  '### Backend',
  '',
  '- **Express** because it is small, explicit, and easy to read.',
  '- **Prisma** because the schema is the source of truth and migrations are generated.',
  '- **Zod** to validate input at the edge of the system.',
  '',
  '### What I avoid',
  '',
  'Adding a library just because it is trending. Every dependency is debt you',
  'pay back at upgrade time.',
].join('\n');

export const fallbackPosts: Post[] = [
  {
    id: 1,
    slug: 'migrasi-html-ke-react',
    titleId: 'Migrasi Portofolio dari HTML ke React + TypeScript',
    titleEn: 'Migrating a Portfolio from HTML to React + TypeScript',
    excerptId:
      'Catatan lengkap saat memindahkan portofolio satu berkas HTML ke arsitektur React, TypeScript, Express, dan Prisma.',
    excerptEn:
      'Full notes from moving a single-file HTML portfolio to a React, TypeScript, Express, and Prisma architecture.',
    contentId: migrationBodyId,
    contentEn: migrationBodyEn,
    cover: 'assets/img/Project2.png',
    tags: ['React', 'TypeScript', 'Migrasi'],
    published: true,
    publishedAt: '2026-05-18T09:00:00.000Z',
    readingMinutes: 6,
  },
  {
    id: 2,
    slug: 'tech-stack-2026',
    titleId: 'Tech Stack yang Saya Pakai di 2026',
    titleEn: 'The Tech Stack I Use in 2026',
    excerptId:
      'Alasan di balik pemilihan React, Vite, Express, Prisma, dan Zod, serta perkakas yang sengaja saya hindari.',
    excerptEn:
      'The reasoning behind React, Vite, Express, Prisma, and Zod, plus the tools I deliberately avoid.',
    contentId: stackBodyId,
    contentEn: stackBodyEn,
    cover: 'assets/img/Project7.png',
    tags: ['Stack', 'Backend', 'Frontend'],
    published: true,
    publishedAt: '2026-03-02T09:00:00.000Z',
    readingMinutes: 4,
  },
];

/* ------------------------------------------------------------------ */
/* External coding-activity providers                                  */
/* ------------------------------------------------------------------ */

export const fallbackWakatime: WakatimeStats = {
  allTimeText: '1.284 hrs 30 mins',
  allTimeSeconds: 4624200,
  last7Days: {
    startDate: '',
    endDate: '',
    dailyAverage: '4 hrs 12 mins',
    total: '29 hrs 24 mins',
    bestDay: { date: '', text: '7 hrs 5 mins' },
    languages: [
      { name: 'TypeScript', percent: 41.2, text: '12 hrs 6 mins' },
      { name: 'PHP', percent: 22.7, text: '6 hrs 40 mins' },
      { name: 'CSS', percent: 14.1, text: '4 hrs 8 mins' },
      { name: 'JavaScript', percent: 11.3, text: '3 hrs 19 mins' },
      { name: 'JSON', percent: 6.4, text: '1 hr 52 mins' },
      { name: 'Markdown', percent: 4.3, text: '1 hr 15 mins' },
    ],
    editors: [
      { name: 'VS Code', percent: 92.5, text: '27 hrs 12 mins' },
      { name: 'Neovim', percent: 7.5, text: '2 hrs 12 mins' },
    ],
  },
  configured: false,
};

export const fallbackCodewars: CodewarsStats = {
  username: 'damta',
  honor: 412,
  leaderboardPosition: 84210,
  rankName: '5 kyu',
  rankColor: 'yellow',
  rankScore: -5,
  totalCompleted: 96,
  languages: [
    { name: 'javascript', rankName: '5 kyu', score: 412 },
    { name: 'typescript', rankName: '6 kyu', score: 238 },
    { name: 'python', rankName: '7 kyu', score: 112 },
  ],
  configured: false,
};

export const fallbackMonkeytype: MonkeytypeStats = {
  username: 'damta',
  bestWpm: {
    '15': { wpm: 94, accuracy: 96.4, consistency: 78.2 },
    '30': { wpm: 88, accuracy: 95.1, consistency: 80.5 },
    '60': { wpm: 85, accuracy: 96.8, consistency: 82.1 },
    '120': { wpm: 81, accuracy: 95.7, consistency: 79.4 },
  },
  testsCompleted: 1240,
  testsStarted: 1608,
  timeTyping: 152400,
  configured: false,
};

const DAY_MS = 24 * 60 * 60 * 1000;
// Deterministic wave so the sample chart looks plausible instead of random.
const umamiSeries = Array.from({ length: 30 }, (_, index) => {
  const offset = 29 - index;
  const day = new Date(Date.now() - offset * DAY_MS).toISOString().slice(0, 10);
  return { day, base: 40 + Math.round(Math.sin(offset / 3) * 12) };
});

export const fallbackUmami: UmamiStats = {
  pageviews: umamiSeries.map(({ day, base }) => ({ x: day, y: base + 18 })),
  sessions: umamiSeries.map(({ day, base }) => ({ x: day, y: base })),
  totals: { pageviews: 1742, visitors: 946, visits: 1183, countries: 12 },
  configured: false,
};

export interface InsightsBundle {
  wakatime: WakatimeStats;
  codewars: CodewarsStats;
  monkeytype: MonkeytypeStats;
  umami: UmamiStats;
}

export const fallbackInsights: InsightsBundle = {
  wakatime: fallbackWakatime,
  codewars: fallbackCodewars,
  monkeytype: fallbackMonkeytype,
  umami: fallbackUmami,
};

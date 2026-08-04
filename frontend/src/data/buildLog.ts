/**
 * Build Log — the story behind every system in this portfolio.
 *
 * HOW TO FILL THIS IN
 * 1. Find the entry for the system you want to write about.
 * 2. Replace `bodyId` / `bodyEn` with your own story (what you built, the
 *    problem you hit, how you solved it, what you learned).
 * 3. Optional: put a screenshot in `frontend/public/assets/img/buildlog/`
 *    and set `image: 'assets/img/buildlog/your-file.png'`.
 * 4. Optional: adjust `date`, `stacks`, or add a `link`.
 *
 * Entries with an empty body are hidden from the page until you write one, so
 * you can fill them in one at a time without anything looking unfinished.
 */

export interface BuildLogEntry {
  /** Stable unique id (usually the project slug). */
  id: string;
  /** Group shown as the badge + filter, e.g. "Portofolio" or "Keamanan". */
  project: string;
  titleId: string;
  titleEn: string;
  /** Free-form label, e.g. "2025", "Juni 2026", "2024 - 2025". */
  date: string;
  /** YOUR STORY. Leave empty ('') to hide this entry for now. */
  bodyId: string;
  bodyEn: string;
  /** Optional: 'assets/img/buildlog/your-file.png' */
  image?: string;
  stacks?: string[];
  link?: { label: string; url: string };
}

export const buildLog: BuildLogEntry[] = [
  /* ------------------------------------------------------------------ */
  /* Web / klien                                                         */
  /* ------------------------------------------------------------------ */
  {
    id: 'web-portofolio',
    project: 'Portofolio',
    titleId: 'Portofolio Pribadi',
    titleEn: 'Personal Portfolio',
    date: '2025 - 2026',
    bodyId:
      'Berawal dari satu berkas HTML dengan CSS dan JavaScript murni. Ketika isinya makin banyak, semuanya jadi sulit dirawat karena bercampur dalam satu tempat. Akhirnya dipecah menjadi komponen React dengan TypeScript, ditambah backend Express dan Prisma, sehingga setiap bagian bisa diubah tanpa membongkar yang lain.',
    bodyEn:
      'It started as a single HTML file with plain CSS and JavaScript. As it grew, everything became hard to maintain because it all lived in one place. It was eventually split into React components with TypeScript, plus an Express and Prisma backend, so each part can change without disturbing the rest.',
    stacks: ['React', 'TypeScript', 'Vite', 'Express', 'Prisma'],
    link: { label: 'damtaweb.com', url: 'https://damtaweb.com' },
  },
  {
    id: 'web-relationship',
    project: 'Web',
    titleId: 'Web Relationship',
    titleEn: 'Web Relationship',
    date: '',
    bodyId: '',
    bodyEn: '',
    stacks: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'web-absensi',
    project: 'Web',
    titleId: 'Web Absensi Karyawan',
    titleEn: 'Employee Attendance Web',
    date: '',
    bodyId: '',
    bodyEn: '',
    stacks: ['PHP', 'MySQL', 'Bootstrap'],
  },
  {
    id: 'web-ecommerce',
    project: 'Web',
    titleId: 'Web Ecommerce',
    titleEn: 'Ecommerce Web',
    date: '',
    bodyId: '',
    bodyEn: '',
    stacks: ['PHP', 'MySQL', 'CSS'],
  },
  {
    id: 'web-vidio-viral',
    project: 'Web',
    titleId: 'Web Vidio Viral',
    titleEn: 'Viral Video Web',
    date: '',
    bodyId: '',
    bodyEn: '',
    stacks: ['PHP', 'MySQL', 'OAuth 2.0'],
  },
  {
    id: 'web-couple',
    project: 'Web',
    titleId: 'Web Couple',
    titleEn: 'Couple Web',
    date: '',
    bodyId: '',
    bodyEn: '',
    stacks: ['PHP', 'MySQL', 'WhatsApp API'],
  },
  {
    id: 'web-rangkum-bisnis',
    project: 'Web',
    titleId: 'Web Rangkum Bisnis',
    titleEn: 'Business Summary Web',
    date: '',
    bodyId: '',
    bodyEn: '',
    stacks: ['Next.js', 'Express', 'Prisma', 'Tailwind'],
  },
  {
    id: 'web-premium',
    project: 'Web',
    titleId: 'Web Premium',
    titleEn: 'Premium Store Web',
    date: '',
    bodyId: '',
    bodyEn: '',
    stacks: ['PHP', 'Firebase', 'Midtrans'],
  },

  /* ------------------------------------------------------------------ */
  /* Sistem besar / platform                                             */
  /* ------------------------------------------------------------------ */
  {
    id: 'sentinel-devsecops',
    project: 'Keamanan',
    titleId: 'Sentinel - Platform DevSecOps',
    titleEn: 'Sentinel - DevSecOps Platform',
    date: '',
    bodyId: '',
    bodyEn: '',
    stacks: ['Microservices', 'DevSecOps', 'Docker'],
  },
  {
    id: 'sentinel-parafrase',
    project: 'Keamanan',
    titleId: 'Sentinel - Deteksi AI & Parafrase',
    titleEn: 'Sentinel - AI Detection & Paraphrase',
    date: '',
    bodyId: '',
    bodyEn: '',
    stacks: ['Microservices', 'AI/NLP', 'Docker'],
  },
  {
    id: 'thunder-ashes-esports',
    project: 'Sistem Informasi',
    titleId: 'Thunder Ashes - Sistem Manajemen Esports',
    titleEn: 'Thunder Ashes - Esports MIS',
    date: '',
    bodyId: '',
    bodyEn: '',
    stacks: ['Next.js', 'React', 'TypeScript'],
  },
  {
    id: 'perpustakaan-digital-uin',
    project: 'Sistem Informasi',
    titleId: 'Perpustakaan Digital UIN Jakarta',
    titleEn: 'UIN Jakarta Digital Library',
    date: '',
    bodyId: '',
    bodyEn: '',
    stacks: ['React', 'TypeScript', 'Microservices'],
  },
  {
    id: 'neuro-nexus',
    project: 'Sistem Informasi',
    titleId: 'Neuro-Nexus - Cognitive Engine',
    titleEn: 'Neuro-Nexus - Cognitive Engine',
    date: '',
    bodyId: '',
    bodyEn: '',
    stacks: ['Microservices', 'Docker', 'Firebase'],
  },
  {
    id: 'absensi-face-recognition',
    project: 'Sistem Informasi',
    titleId: 'Absensi Pengenalan Wajah',
    titleEn: 'Face Recognition Attendance',
    date: '',
    bodyId: '',
    bodyEn: '',
    stacks: ['Python', 'Streamlit', 'MySQL'],
  },

  /* ------------------------------------------------------------------ */
  /* Toko / bisnis                                                       */
  /* ------------------------------------------------------------------ */
  {
    id: 'warung-analytics',
    project: 'Bisnis',
    titleId: 'Warung Analytics',
    titleEn: 'Warung Analytics',
    date: '',
    bodyId: '',
    bodyEn: '',
    stacks: ['Next.js', 'Firebase', 'Tailwind'],
  },
  {
    id: 'lumera-store',
    project: 'Bisnis',
    titleId: 'Lumera - General Store',
    titleEn: 'Lumera - General Store',
    date: '',
    bodyId: '',
    bodyEn: '',
    stacks: ['Node.js', 'Express', 'REST API'],
  },
  {
    id: 'dup-tokped',
    project: 'Bisnis',
    titleId: 'Marketplace Microservices',
    titleEn: 'Marketplace Microservices',
    date: '',
    bodyId: '',
    bodyEn: '',
    stacks: ['Microservices', 'Docker', 'API Gateway'],
  },
  {
    id: 'steam-cuci-motor',
    project: 'Bisnis',
    titleId: 'Steam Cuci Motor',
    titleEn: 'Motorcycle Wash POS',
    date: '',
    bodyId: '',
    bodyEn: '',
    stacks: ['Node.js', 'Express', 'React'],
  },
  {
    id: 'pendapatan-income-tracker',
    project: 'Bisnis',
    titleId: 'Pendapatan - Income Tracker',
    titleEn: 'Pendapatan - Income Tracker',
    date: '',
    bodyId: '',
    bodyEn: '',
    stacks: ['React', 'Node.js', 'Express'],
  },
  {
    id: 'gagas-inventory',
    project: 'Bisnis',
    titleId: 'Gagas Inventory',
    titleEn: 'Gagas Inventory',
    date: '',
    bodyId: '',
    bodyEn: '',
    stacks: ['Express', 'PHP', 'JavaScript'],
  },
];

/** Entries that actually have a story written; the page renders only these. */
export const filledBuildLog = buildLog.filter((e) => e.bodyId.trim() || e.bodyEn.trim());

/** How many stories are still waiting to be written. */
export const pendingBuildLogCount = buildLog.length - filledBuildLog.length;

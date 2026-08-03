/**
 * Build Log — the story of how each system was built.
 *
 * EDIT THIS FILE to tell your own story: add an entry per milestone, put the
 * screenshot in `frontend/public/assets/img/buildlog/` and reference it here.
 * Nothing else needs to change; the page renders whatever is in this array.
 */

export interface BuildLogEntry {
  /** Unique id — anything stable, e.g. "porto-v1". */
  id: string;
  /** Which system this milestone belongs to, e.g. "Portofolio" or "Sentinel". */
  project: string;
  /** Short title of the milestone. */
  titleId: string;
  titleEn: string;
  /** Free-form date label, e.g. "Juni 2026" or "2024 - 2025". */
  date: string;
  /** What happened / what you learned. Plain text; line breaks are kept. */
  bodyId: string;
  bodyEn: string;
  /** Optional screenshot: "assets/img/buildlog/your-file.png". */
  image?: string;
  /** Optional tech chips shown under the entry. */
  stacks?: string[];
  /** Optional outbound link (repo, live site, article). */
  link?: { label: string; url: string };
}

/**
 * ---------------------------------------------------------------------------
 * TEMPLATE — copy this block, fill it in, and add it to the array below.
 * ---------------------------------------------------------------------------
 * {
 *   id: 'nama-unik',
 *   project: 'Portofolio',
 *   titleId: 'Judul singkat',
 *   titleEn: 'Short title',
 *   date: 'Bulan Tahun',
 *   bodyId: 'Ceritakan apa yang dikerjakan, kendalanya, dan solusinya.',
 *   bodyEn: 'Describe what you built, the problem, and how you solved it.',
 *   image: 'assets/img/buildlog/contoh.png',
 *   stacks: ['React', 'TypeScript'],
 *   link: { label: 'Lihat', url: 'https://...' },
 * },
 */

export const buildLog: BuildLogEntry[] = [
  // Starter entries — replace the text/images with your own story.
  {
    id: 'porto-html',
    project: 'Portofolio',
    titleId: 'Versi pertama: satu berkas HTML',
    titleEn: 'First version: a single HTML file',
    date: '2025',
    bodyId:
      'Portofolio pertama dibuat dengan HTML, CSS, dan JavaScript murni dalam satu berkas. Mudah dimulai, tapi makin lama makin sulit dirawat karena semuanya bercampur.',
    bodyEn:
      'The first portfolio was plain HTML, CSS, and JavaScript in a single file. Easy to start, but harder to maintain as everything grew into one place.',
    stacks: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'porto-react',
    project: 'Portofolio',
    titleId: 'Migrasi ke React + TypeScript',
    titleEn: 'Migrating to React + TypeScript',
    date: '2026',
    bodyId:
      'Dipecah menjadi komponen React dengan TypeScript, ditambah backend Express + Prisma. Sekarang setiap bagian bisa diubah tanpa membongkar yang lain.',
    bodyEn:
      'Split into React components with TypeScript, plus an Express + Prisma backend. Each part can now change without disturbing the rest.',
    stacks: ['React', 'TypeScript', 'Express', 'Prisma'],
  },
];

/**
 * Projects catalogued from the local workspaces listed in VS Code
 * (C:\Users\ASUS\Desktop\*). Every description below was taken from that
 * project's own README / package.json - none of it is invented.
 *
 * Covers live in public/assets/img/covers/<slug>.svg - generated artwork, not
 * screenshots: these projects run locally only, so no live capture exists.
 */
import type { Project } from '@damta/types';

interface Seed {
  slug: string;
  title: string;
  descId: string;
  descEn: string;
  stacks: string[];
  /** Local folder name under Desktop, shown as the source of truth. */
  folder: string;
  url?: string;
}

const seeds: Seed[] = [
  {
    slug: 'sentinel-devsecops',
    title: 'Sentinel - DevSecOps Platform',
    folder: 'cybersecurity',
    descId:
      'Platform keamanan web terdistribusi. Melakukan DAST stateful dan auto-patching yang sadar AST, dijaga hierarki peran SOC enam tingkat serta audit log berantai hash.',
    descEn:
      'Distributed web-security platform. Stateful DAST and AST-aware auto-patching, gated by a six-tier SOC role hierarchy and a hash-chained audit log.',
    stacks: ['Polyglot Monorepo', 'DevSecOps', 'DAST', 'Docker'],
  },
  {
    slug: 'sentinel-parafrase',
    title: 'Sentinel - AI Detection & Paraphrase',
    folder: 'parafrase',
    descId:
      'Platform deteksi teks AI dan parafrase yang berjalan sepenuhnya di localhost. Arsitektur microservices polyglot, zero-trust, single-tenant.',
    descEn:
      'Private AI-detection and paraphrase platform that runs entirely on localhost. Polyglot microservices, zero-trust, single-tenant.',
    stacks: ['Microservices', 'AI/NLP', 'Monorepo', 'Docker'],
  },
  {
    slug: 'thunder-ashes-esports',
    title: 'Thunder Ashes - Esports MIS',
    folder: 'managament system esport',
    descId:
      'Sistem informasi manajemen untuk tim esports Mobile Legends di MPL Indonesia. Delapan modul: pemantauan performa tim, analitik pemain, valuasi dan bursa transfer, bedah pertandingan, simulator draft, penjadwalan, kebugaran pemain, dan kontrol akses.',
    descEn:
      'Management information system for a Mobile Legends esports team competing in MPL Indonesia. Eight modules: team performance monitoring, player analytics, valuation and transfer market, match breakdown, draft simulator, scheduling, player fitness, and access control.',
    stacks: ['Next.js', 'React', 'TypeScript'],
  },
  {
    slug: 'perpustakaan-digital-uin',
    title: 'Perpustakaan Digital UIN Jakarta',
    folder: 'perpus interaktif',
    descId:
      'Sistem perpustakaan digital dengan antarmuka Mahasiswa dan Admin yang terpisah. Pinjam buku fisik, baca e-book langsung di peramban, dan kelola koleksi dalam satu platform.',
    descEn:
      'Digital library system with separate Student and Admin interfaces. Borrow physical books, read e-books directly in the browser, and manage the collection on one platform.',
    stacks: ['React', 'TypeScript', 'Microservices'],
  },
  {
    slug: 'warung-analytics',
    title: 'Warung Analytics',
    folder: 'sj',
    descId:
      'Etalase toko sekaligus dasbor inventaris admin untuk warung kelontong. Satu aplikasi full-stack Next.js 14 dengan backend Firebase.',
    descEn:
      'Storefront plus an admin inventory dashboard for a grocery store. A single full-stack Next.js 14 app with a Firebase backend.',
    stacks: ['Next.js', 'React', 'Firebase', 'Tailwind', 'TypeScript'],
  },
  {
    slug: 'lumera-store',
    title: 'Lumera - General Store',
    folder: 'Toko Shopify',
    descId:
      'Toko e-commerce general store dengan arsitektur frontend/backend terpisah. Halaman produk berbasis problem-solution, sticky add-to-cart, quantity breaks, frequently bought together, dan ulasan.',
    descEn:
      'General-store e-commerce with a separated frontend/backend architecture. Problem-solution product pages, sticky add-to-cart, quantity breaks, frequently bought together, and reviews.',
    stacks: ['Node.js', 'Express', 'REST API'],
  },
  {
    slug: 'dup-tokped',
    title: 'Marketplace Microservices',
    folder: 'dup tokped',
    descId:
      'E-commerce berarsitektur microservices polyglot dalam satu monorepo: storefront, panel admin, dan API gateway.',
    descEn:
      'Polyglot microservices e-commerce in a single monorepo: storefront, admin panel, and API gateway.',
    stacks: ['Microservices', 'Docker', 'API Gateway'],
  },
  {
    slug: 'steam-cuci-motor',
    title: 'Steam Cuci Motor',
    folder: 'steam',
    descId:
      'Sistem kasir modern untuk bisnis cuci motor steam, dengan frontend dan backend terpisah.',
    descEn: 'A modern point-of-sale system for a motorcycle steam-wash business, with a separated frontend and backend.',
    stacks: ['Node.js', 'Express', 'REST API'],
  },
  {
    slug: 'pendapatan-income-tracker',
    title: 'Pendapatan - Income Tracker',
    folder: 'pendapatan',
    descId:
      'Aplikasi full-stack untuk mencatat dan memantau arus kas usaha. Catat pemasukan harian, lihat total bulan berjalan, dan kelola histori transaksi dalam satu dasbor.',
    descEn:
      'A fullstack app to record and monitor business cash flow. Log daily income, see the running monthly total, and manage transaction history in one dashboard.',
    stacks: ['React', 'Node.js', 'Express'],
  },
  {
    slug: 'gagas-inventory',
    title: 'Gagas Inventory',
    folder: 'gagas',
    descId:
      'Formulir master barang dengan frontend responsif dan backend ganda PHP serta Node.js/Express.',
    descEn:
      'A goods master-data form with a responsive frontend and a dual PHP plus Node.js/Express backend.',
    stacks: ['Node.js', 'Express', 'PHP', 'JavaScript'],
  },
  {
    slug: 'neuro-nexus',
    title: 'Neuro-Nexus - Cognitive Engine',
    folder: 'inovasi',
    descId:
      'Blueprint SaaS mesin kompilasi kognitif: neural gateway, cognitive engine, core memory vault, dan antarmuka klien yang terpisah sebagai layanan.',
    descEn:
      'A cognitive compilation engine SaaS blueprint: neural gateway, cognitive engine, core memory vault, and a client interface split into separate services.',
    stacks: ['Microservices', 'Docker', 'Firebase'],
  },
  {
    slug: 'absensi-face-recognition',
    title: 'Absensi Face Recognition',
    folder: 'absensi',
    descId:
      'Sistem absensi karyawan berbasis pengenalan wajah, dibangun murni dengan Python dan Streamlit tanpa HTML/CSS/JS. Terdiri dari sisi Karyawan (operasional) dan sisi Atasan (Executive Information System).',
    descEn:
      'Face-recognition employee attendance system built purely in Python and Streamlit with no HTML/CSS/JS. Split into an Employee (operational) side and a Manager side (Executive Information System).',
    stacks: ['Python', 'Streamlit', 'Face Recognition', 'SQL'],
  },
];

/**
 * Slugs with a real screenshot in public/assets/img/shots/, captured by
 * actually booting the project locally and photographing the rendered page.
 * Anything not listed here falls back to the generated cover artwork.
 */
const HAS_SCREENSHOT = new Set([
  'sentinel-devsecops',
  'sentinel-parafrase',
  'lumera-store',
  'warung-analytics',
  'thunder-ashes-esports',
  'gagas-inventory',
  'neuro-nexus',
  'steam-cuci-motor',
  'pendapatan-income-tracker',
  'absensi-face-recognition',
]);

/** Continues the id/order sequence after the nine hand-written entries. */
export const extraProjects: Project[] = seeds.map((seed, index) => ({
  id: 100 + index,
  slug: seed.slug,
  title: seed.title,
  descId: seed.descId,
  descEn: seed.descEn,
  image: HAS_SCREENSHOT.has(seed.slug)
    ? `assets/img/shots/${seed.slug}.png`
    : `assets/img/covers/${seed.slug}.svg`,
  url: seed.url ?? '',
  featured: false,
  order: 100 + index,
  stacks: seed.stacks,
  repoUrl: null,
  contentId: `Sumber proyek: folder lokal \`${seed.folder}\`.`,
  contentEn: `Project source: local folder \`${seed.folder}\`.`,
}));

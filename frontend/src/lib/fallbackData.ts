/**
 * Static fallback content used when the REST API is unavailable
 * (e.g. running `npm run dev:web` without the backend + database).
 * Mirrors the backend Prisma seed so the site is fully populated standalone.
 */
import type {
  Project,
  Certificate,
  Skill,
  TimelineEntry,
  HistoryEntry,
  CountryStat,
  VisitorStat,
  GithubSummary,
} from '@damta/types';
import { extraProjects } from './projectsExtra';

const baseProjects: Project[] = [
  { id: 1, slug: 'web-relationship', title: 'Web Relationship', image: 'assets/img/Project1.png', url: 'https://najwaweb.site', featured: true, order: 1, descId: 'Website interaktif yang dibangun menggunakan HTML, CSS, dan JavaScript murni (Vanilla JS) tanpa framework, menonjolkan desain UI/UX yang romantis dan personal.', descEn: 'An interactive website built using HTML, CSS, and pure JavaScript (Vanilla JS) without frameworks, highlighting a romantic and personal UI/UX design.' },
  { id: 2, slug: 'web-portofolio', title: 'Web Portofolio', image: 'assets/img/Project2.png', url: 'https://damtaweb.com', featured: true, order: 2, descId: 'Website portofolio profesional bergaya modern dengan efek Glassmorphism dan animasi Neon 6D. Dikembangkan secara dinamis dan responsif menggunakan framework React.js, HTML5, dan CSS3.', descEn: 'A modern professional portfolio website with Glassmorphism visual effects and 6D Neon animation. Dynamically and responsively developed using React.js, HTML5, and CSS3.' },
  { id: 3, slug: 'web-absensi', title: 'Web Absensi Karyawan', image: 'assets/img/Project3.png', url: 'https://presensi.ecommercedamta.com/', featured: true, order: 3, descId: 'Sistem absensi berbasis web terintegrasi yang memanfaatkan PHP dan MySQL untuk verifikasi kehadiran karyawan secara real-time. Dilengkapi fitur unggah foto bukti fisik dan laporan otomatis dalam format Excel.', descEn: 'An integrated web-based attendance system utilizing PHP and MySQL for real-time employee attendance verification. Equipped with physical proof photo upload features and automatic Excel reports.' },
  { id: 4, slug: 'web-ecommerce', title: 'Web Ecommerce', image: 'assets/img/Project4.png', url: 'https://api3.ecommercedamta.com/', featured: true, order: 4, descId: 'Sistem toko online berbasis database yang mengintegrasikan logika PHP Native untuk menampilkan produk secara dinamis. Menggunakan CSS modern untuk efek visual Glassmorphism dan tata letak responsif yang rapi di perangkat mobile.', descEn: 'A database-based online store system integrating PHP Native logic to display products dynamically. Uses modern CSS for Glassmorphism visual effects and a clean responsive layout on mobile.' },
  { id: 5, slug: 'web-vidio-viral', title: 'Web Vidio Viral', image: 'assets/img/Project5.png', url: 'https://damtaproyek.ecommercedamta.com/login.php', featured: true, order: 5, descId: 'Web App Roadmap menggunakan PHP, HTML5, and CSS3 Neon Style. Backend menggunakan MySQL dengan fitur keamanan Login Google (OAuth 2.0).', descEn: 'Roadmap Web App using PHP, HTML5, and CSS3 Neon Style. Backend uses MySQL with Google Login security features (OAuth 2.0).' },
  { id: 6, slug: 'web-couple', title: 'Web Couple', image: 'assets/img/Project6.png', url: 'https://proyek.ecommercedamta.com/', featured: true, order: 6, descId: 'Sistem pemesanan web interaktif dengan menggunakan PHP Native dan MySQL. Dilengkapi fitur kustomisasi desain (Tema/Font), manajemen database pesanan, serta integrasi invoice otomatis ke WhatsApp.', descEn: 'Interactive web ordering system using PHP Native and MySQL. Equipped with design customization (Theme/Font), order database management, and automatic WhatsApp invoice integration.' },
  { id: 7, slug: 'web-rangkum-bisnis', title: 'Web Rangkum Bisnis', image: 'assets/img/Project7.png', url: 'https://financecreps.site/', featured: false, order: 7, descId: 'Aplikasi pencatatan keuangan Full-Stack berstandar industri yang dibangun menggunakan ekosistem JavaScript/TypeScript modern. Antarmuka (Frontend) dirancang menggunakan Next.js dan Tailwind CSS. Sisi peladen (Backend) ditenagai Node.js dan Express.js yang terhubung ke database melalui Prisma ORM.', descEn: 'An industry-standard Full-Stack financial recording application built using a modern JavaScript/TypeScript ecosystem. The frontend uses Next.js and Tailwind CSS; the backend is powered by Node.js and Express.js connected to a database through Prisma ORM.' },
  { id: 8, slug: 'web-premium', title: 'Web Premium', image: 'assets/img/web premium.png', url: '#', featured: false, order: 8, descId: 'Platform jual-beli akun premium (Canva, Netflix, Spotify, YouTube Premium, CapCut, AlightMotion) dengan sistem deposit saldo, manajemen stok otomatis, dan admin dashboard lengkap. Dibangun menggunakan PHP murni, Firebase, dan Vanilla JS. Pembayaran via Midtrans Snap.js.', descEn: 'A premium account marketplace platform (Canva, Netflix, Spotify, YouTube Premium, CapCut, AlightMotion) featuring a balance deposit system, automatic stock management, and a complete admin dashboard. Built with pure PHP, Firebase, and Vanilla JS. Payments via Midtrans Snap.js.' },
  { id: 9, slug: 'web-vidio-viral-2', title: 'Web Vidio Viral', image: 'assets/img/covers/web-vidio-viral-2.svg', url: 'https://damtaproyek.ecommercedamta.com/login.php', featured: false, order: 9, descId: 'Web App Roadmap menggunakan PHP, HTML5, and CSS3 Neon Style. Backend menggunakan MySQL dengan fitur keamanan Login Google (OAuth 2.0).', descEn: 'Roadmap Web App using PHP, HTML5, and CSS3 Neon Style. Backend uses MySQL with Google Login security features (OAuth 2.0).' },
];

/** Tech badges per project - shown on the card and the /projects/:slug page. */
const projectStacks: Record<string, string[]> = {
  'web-relationship': ['HTML', 'CSS', 'JavaScript'],
  'web-portofolio': ['React', 'TypeScript', 'Vite', 'Tailwind'],
  'web-absensi': ['PHP', 'MySQL', 'Bootstrap'],
  'web-ecommerce': ['PHP', 'MySQL', 'CSS'],
  'web-vidio-viral': ['PHP', 'MySQL', 'OAuth 2.0'],
  'web-couple': ['PHP', 'MySQL', 'WhatsApp API'],
  'web-rangkum-bisnis': ['Next.js', 'Express', 'Prisma', 'Tailwind'],
  'web-premium': ['PHP', 'Firebase', 'Midtrans'],
  'web-vidio-viral-2': ['PHP', 'MySQL', 'OAuth 2.0'],
};

const projectRepos: Record<string, string> = {
  'web-portofolio': 'https://github.com/damta8827773/portoprivate',
};

export const fallbackProjects: Project[] = [
  ...baseProjects.map((p) => ({
    ...p,
    stacks: projectStacks[p.slug] ?? [],
    repoUrl: projectRepos[p.slug] ?? null,
    contentId: null,
    contentEn: null,
  })),
  // Everything else built locally - see projectsExtra.ts for provenance.
  ...extraProjects,
];

/** Category buckets used by the filter chips on /achievements. */
const certCategories: Record<string, string> = {
  'public-speaking': 'Soft Skill',
  'dasar-ai': 'Course',
  'cisco-packet-tracer': 'Networking',
  'microsoft-apps': 'Course',
  'ekstra-skill': 'Soft Skill',
  redhat: 'Networking',
};

const baseCertificates: Certificate[] = [
  { id: 1, slug: 'public-speaking', titleId: 'Belajar Public Speaking', titleEn: 'Learning Public Speaking', org: 'SMK Yappenda', year: '2024', image: 'assets/img/ser1.png', order: 1, descId: 'Menyelesaikan Program yang Berfokus gimana caranya Public Speaking.', descEn: 'Completed a program focused on Public Speaking techniques.' },
  { id: 2, slug: 'dasar-ai', titleId: 'Belajar Dasar AI', titleEn: 'Learning Basic AI', org: 'Dicoding Indonesia', year: '2025', image: 'assets/img/ser2.png', order: 2, descId: 'Menyelesaikan gimana cara menggunakan AI yang Efektif.', descEn: 'Completed how to use AI effectively.' },
  { id: 3, slug: 'cisco-packet-tracer', titleId: 'CISCO Packet Tracer', titleEn: 'CISCO Packet Tracer', org: 'SMK Yappenda', year: '2024', image: 'assets/img/ser3.png', order: 3, descId: 'Pemahaman mendalam tentang pembuatan Proyek Mandiri (Karya Tulis Ilmiah).', descEn: 'In-depth understanding of making Independent Projects (Scientific Writing).' },
  { id: 4, slug: 'microsoft-apps', titleId: 'Microsoft APPS', titleEn: 'Microsoft APPS', org: 'SMK Yappenda', year: '2024', image: 'assets/img/ser4.png', order: 4, descId: 'Mempelajari Aplikasi Perkantoran (Spereadsheet, Document, Presentation).', descEn: 'Studying Office Applications (Spreadsheet, Document, Presentation).' },
  { id: 5, slug: 'ekstra-skill', titleId: 'Ekstra Skill', titleEn: 'Extra Skill', org: 'SMK Yappenda', year: '2024', image: 'assets/img/ser5.png', order: 5, descId: 'Mempelajari tentang gimana cara menyelesaikan Sistem Pendingin Udara (Air Conditioner/AC).', descEn: 'Learning how to solve Air Conditioning (AC) system problems.' },
  { id: 6, slug: 'redhat', titleId: 'REDHAT', titleEn: 'REDHAT', org: 'SMK Yappenda', year: '2024', image: 'assets/img/ser6.png', order: 6, descId: 'Mempelajari Tentang Dasar-dasar Red Hat System Administration.', descEn: 'Learning about Red Hat System Administration Basics.' },
];

export const fallbackCertificates: Certificate[] = baseCertificates.map((c) => ({
  ...c,
  category: certCategories[c.slug] ?? 'Course',
  credentialUrl: null,
}));

const mkSkill = (id: number, name: string, image: string, category: string, level: number, row: number, order: number): Skill => ({ id, name, image, category, level, row, order });
export const fallbackSkills: Skill[] = [
  mkSkill(1, 'HTML', 'assets/img/html.png', 'Frontend', 95, 1, 1),
  mkSkill(2, 'CSS', 'assets/img/css.png', 'Frontend', 92, 1, 2),
  mkSkill(3, 'JS', 'assets/img/js.png', 'Frontend', 88, 1, 3),
  mkSkill(4, 'React', 'assets/img/react.png', 'Frontend', 82, 1, 4),
  mkSkill(5, 'NodeJS', 'assets/img/node.png', 'Backend', 78, 1, 5),
  mkSkill(6, 'Cpanel', 'assets/img/cpanel.png', 'DevOps', 80, 1, 6),
  mkSkill(7, 'Github', 'assets/img/github.png', 'DevOps', 88, 1, 7),
  mkSkill(8, 'Python', 'assets/img/python.png', 'AI / Scripting', 74, 1, 8),
  mkSkill(9, 'TypeScript', 'assets/img/typescript.png', 'Frontend', 76, 1, 9),
  mkSkill(10, 'Go', 'assets/img/go.png', 'Backend', 72, 1, 10),
  mkSkill(11, 'Next.js', 'assets/img/nextjs.png', 'Frontend', 78, 1, 11),
  mkSkill(12, 'Elixir', 'assets/img/elixir.png', 'Functional', 50, 1, 12),
  mkSkill(13, 'C', 'assets/img/c.png', 'Backend', 65, 1, 13),
  mkSkill(14, 'PHP', 'assets/img/php.png', 'Backend', 85, 2, 1),
  mkSkill(15, 'MySQL', 'assets/img/mysql.png', 'Database', 87, 2, 2),
  mkSkill(16, 'Bootstrap', 'assets/img/bootstrap.png', 'Frontend', 80, 2, 3),
  mkSkill(17, 'Tailwind', 'assets/img/tailwind.png', 'Frontend', 85, 2, 4),
  mkSkill(18, 'VS Code', 'assets/img/vscode.png', 'Tools', 95, 2, 5),
  mkSkill(19, 'Gemini', 'assets/img/gemini.png', 'AI Tools', 85, 2, 6),
  mkSkill(20, 'Google Search Console', 'assets/img/google search console.png', 'DevOps', 75, 2, 7),
  mkSkill(21, 'Firebase', 'assets/img/firebase.png', 'Backend/DB', 80, 2, 8),
  mkSkill(22, 'C++', 'assets/img/cpp.png', 'Systems', 58, 2, 9),
  mkSkill(23, 'Rust', 'assets/img/rust.png', 'Systems', 55, 2, 10),
  mkSkill(24, 'Java', 'assets/img/java.png', 'Backend', 62, 2, 11),
  mkSkill(25, 'Kotlin', 'assets/img/kotlin.png', 'Mobile', 63, 2, 12),
  mkSkill(26, 'Ruby', 'assets/img/ruby.png', 'Scripting', 48, 2, 13),
  mkSkill(27, 'Lua', 'assets/img/lua.png', 'Scripting', 45, 2, 14),
];

export const fallbackTimeline: TimelineEntry[] = [
  { id: 1, slug: 'bki', icon: 'ri-briefcase-4-fill', logo: 'assets/img/covers/bki.svg', order: 1, titleId: 'Full Stack Developer', titleEn: 'Full Stack Developer', companyId: 'PT. Biro Klasifikasi Indonesia (Persero)', companyEn: 'PT. Biro Klasifikasi Indonesia (Persero)', dateId: '2026 - Sekarang - Jakarta, Indonesia', dateEn: '2026 - Present - Jakarta, Indonesia', descId: 'Menjadi pengembang profesional di BKI dan berkontribusi pada proyek nasional. Bertanggung jawab dalam merancang arsitektur perangkat lunak yang fungsional dan efisien.', descEn: 'Became a professional developer at BKI and contributed to national projects. Responsible for designing functional and efficient software architecture.' },
  { id: 2, slug: 'uin', icon: 'ri-graduation-cap-fill', logo: 'assets/img/uin.png', order: 2, titleId: 'Mahasiswa Sistem Informasi', titleEn: 'Information Systems Student', companyId: 'UIN Syarif Hidayatullah Jakarta', companyEn: 'UIN Syarif Hidayatullah Jakarta', dateId: '2025 - Sekarang - Ciputat, Indonesia', dateEn: '2025 - Present - Ciputat, Indonesia', descId: 'Lulus dari SMK Yappenda dan melanjutkan pendidikan tinggi di UIN Jakarta. Titik awal saya mendalami dunia Web Developer secara komprehensif.', descEn: 'Graduated from SMK Yappenda and continued higher education at UIN Jakarta. The starting point for me to delve into the world of Web Developers comprehensively.' },
  { id: 3, slug: 'smk', icon: 'ri-school-fill', logo: 'assets/img/yappenda.png', order: 3, titleId: 'Teknik Komputer Jaringan (TKJ)', titleEn: 'Computer and Network Engineering (TKJ)', companyId: 'SMK Yappenda Jakarta', companyEn: 'SMK Yappenda Jakarta', dateId: '2022 - 2025 - Jakarta, Indonesia', dateEn: '2022 - 2025 - Jakarta, Indonesia', descId: 'Fokus mendalami ilmu Teknik Komputer Jaringan. Aktif di ekstrakurikuler dan Ekskill untuk penajaman skill. Menguasai CISCO dan mempraktekannya dalam PKL.', descEn: 'Focusing on Computer and Network Engineering. Active in extracurriculars for skill sharpening. Mastered CISCO and put it into practice during internship.' },
];

export const fallbackHistory: HistoryEntry[] = [
  { id: 1, year: '2022', image: 'assets/img/file1.png', order: 1, descId: 'Awal mula perjalanan di dunia teknologi dan dasar pemrograman Kelas X. Awalnya coba VSCode, sempat berhenti karena susah, tapi tetap penasaran.', descEn: 'The beginning of the journey in technology and basic programming in 10th grade. Tried VSCode, stopped because it was hard, but remained curious.' },
  { id: 2, year: '2023', image: 'assets/img/file2.png', order: 2, descId: 'Mulai bisa menggunakan CISCO dibanding awal masuk kelas XI dan mulai PKL (Praktek Kerja Lapangan).', descEn: 'Started being able to use CISCO compared to early 11th grade and started internship.' },
  { id: 3, year: '2024', image: 'assets/img/file3.png', order: 3, descId: 'Kelas XII, fokus mendalami TKJ, aktif di Ekskul dan Ekskill untuk penajaman skill.', descEn: '12th grade, focusing on TKJ, active in extracurriculars for skill sharpening.' },
  { id: 4, year: '2025', image: 'assets/img/file4.png', order: 4, descId: 'Lulus SMK Yappenda, masuk UIN Jakarta. Titik awal mendalami Web Developer.', descEn: 'Graduated from SMK Yappenda, entered UIN Jakarta. The starting point of Web Development.' },
  { id: 5, year: '2026', image: 'assets/img/file5.png', order: 5, descId: 'Menjadi pengembang profesional di BKI dan berkontribusi pada proyek nasional.', descEn: 'Became a professional developer at BKI and contributed to national projects.' },
];

// Visitor analytics are REAL accumulated visits served by the API's
// self-hosted store - so the offline fallbacks are deliberately empty,
// never invented numbers.
export const fallbackCountries: CountryStat[] = [];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
// Illustrative baseline so the monthly chart always renders a graph offline.
const dsk = [128, 215, 187, 293, 342, 412, 387, 521, 468, 587, 634, 712];
const mbl = [97, 163, 142, 218, 267, 318, 291, 398, 357, 442, 489, 543];
export const fallbackVisitorStats: VisitorStat[] = months.map((m, i) => ({ id: i + 1, month: m, monthIndex: i, desktop: dsk[i], mobile: mbl[i] }));

export const fallbackVisitorCount = 0;

export const fallbackGithub: GithubSummary = {
  profile: {
    login: 'damta8827773',
    name: 'Damta Faiz',
    bio: 'Full Stack Developer',
    avatar_url: 'https://avatars.githubusercontent.com/u/134025810?v=4',
    public_repos: 12,
    followers: 8,
    following: 10,
    html_url: 'https://github.com/damta8827773',
  },
  totalStars: 5,
  repos: [
    { name: 'portoprivate', description: 'Official full-stack portfolio (React + TS + Express + Prisma).', html_url: 'https://github.com/damta8827773/portoprivate', language: 'TypeScript', stargazers_count: 2, forks_count: 0 },
    { name: 'web-absensi', description: 'Employee attendance system (PHP + MySQL).', html_url: 'https://github.com/damta8827773', language: 'PHP', stargazers_count: 1, forks_count: 0 },
    { name: 'web-ecommerce', description: 'Database-driven online store.', html_url: 'https://github.com/damta8827773', language: 'PHP', stargazers_count: 1, forks_count: 0 },
    { name: 'web-relationship', description: 'Interactive vanilla-JS website.', html_url: 'https://github.com/damta8827773', language: 'JavaScript', stargazers_count: 1, forks_count: 0 },
  ],
  languages: { TypeScript: 6, PHP: 4, JavaScript: 3, CSS: 2, HTML: 2 },
};

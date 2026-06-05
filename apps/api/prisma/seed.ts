/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const projects = [
  {
    slug: 'web-relationship',
    title: 'Web Relationship',
    image: 'assets/img/Project1.png',
    url: 'https://najwaweb.site',
    featured: true,
    order: 1,
    descId:
      'Website interaktif yang dibangun menggunakan HTML, CSS, dan JavaScript murni (Vanilla JS) tanpa framework, menonjolkan desain UI/UX yang romantis dan personal.',
    descEn:
      'An interactive website built using HTML, CSS, and pure JavaScript (Vanilla JS) without frameworks, highlighting a romantic and personal UI/UX design.',
  },
  {
    slug: 'web-portofolio',
    title: 'Web Portofolio',
    image: 'assets/img/Project2.png',
    url: 'https://damtaweb.com',
    featured: true,
    order: 2,
    descId:
      'Website portofolio profesional bergaya modern dengan efek Glassmorphism dan animasi Neon 6D. Dikembangkan secara dinamis dan responsif menggunakan framework React.js, HTML5, dan CSS3.',
    descEn:
      'A modern professional portfolio website with Glassmorphism visual effects and 6D Neon animation. Dynamically and responsively developed using React.js, HTML5, and CSS3.',
  },
  {
    slug: 'web-absensi',
    title: 'Web Absensi Karyawan',
    image: 'assets/img/Project3.png',
    url: 'https://presensi.ecommercedamta.com/',
    featured: true,
    order: 3,
    descId:
      'Sistem absensi berbasis web terintegrasi yang memanfaatkan PHP dan MySQL untuk verifikasi kehadiran karyawan secara real-time. Dilengkapi fitur unggah foto bukti fisik dan laporan otomatis dalam format Excel.',
    descEn:
      'An integrated web-based attendance system utilizing PHP and MySQL for real-time employee attendance verification. Equipped with physical proof photo upload features and automatic Excel reports.',
  },
  {
    slug: 'web-ecommerce',
    title: 'Web Ecommerce',
    image: 'assets/img/Project4.png',
    url: 'https://api3.ecommercedamta.com/',
    featured: true,
    order: 4,
    descId:
      'Sistem toko online berbasis database yang mengintegrasikan logika PHP Native untuk menampilkan produk secara dinamis. Menggunakan CSS modern untuk efek visual Glassmorphism dan tata letak responsif yang rapi di perangkat mobile.',
    descEn:
      'A database-based online store system integrating PHP Native logic to display products dynamically. Uses modern CSS for Glassmorphism visual effects and a clean responsive layout on mobile.',
  },
  {
    slug: 'web-vidio-viral',
    title: 'Web Vidio Viral',
    image: 'assets/img/Project5.png',
    url: 'https://damtaproyek.ecommercedamta.com/login.php',
    featured: true,
    order: 5,
    descId:
      'Web App Roadmap menggunakan PHP, HTML5, and CSS3 Neon Style. Backend menggunakan MySQL dengan fitur keamanan Login Google (OAuth 2.0).',
    descEn:
      'Roadmap Web App using PHP, HTML5, and CSS3 Neon Style. Backend uses MySQL with Google Login security features (OAuth 2.0).',
  },
  {
    slug: 'web-couple',
    title: 'Web Couple',
    image: 'assets/img/Project6.png',
    url: 'https://proyek.ecommercedamta.com/',
    featured: true,
    order: 6,
    descId:
      'Sistem pemesanan web interaktif dengan menggunakan PHP Native dan MySQL. Dilengkapi fitur kustomisasi desain (Tema/Font), manajemen database pesanan, serta integrasi invoice otomatis ke WhatsApp.',
    descEn:
      'Interactive web ordering system using PHP Native and MySQL. Equipped with design customization (Theme/Font), order database management, and automatic WhatsApp invoice integration.',
  },
  {
    slug: 'web-rangkum-bisnis',
    title: 'Web Rangkum Bisnis',
    image: 'assets/img/Project7.png',
    url: 'https://financecreps.site/',
    featured: false,
    order: 7,
    descId:
      'Aplikasi pencatatan keuangan Full-Stack berstandar industri yang dibangun menggunakan ekosistem JavaScript/TypeScript modern. Antarmuka (Frontend) dirancang menggunakan Next.js dan Tailwind CSS untuk performa yang cepat dan estetik. Sementara sisi peladen (Backend) ditenagai oleh Node.js dan Express.js yang terhubung ke database melalui Prisma ORM.',
    descEn:
      'An industry-standard Full-Stack financial recording application built using a modern JavaScript/TypeScript ecosystem. The frontend is designed using Next.js and Tailwind CSS for fast and aesthetic performance. The backend is powered by Node.js and Express.js connected to a database through Prisma ORM.',
  },
  {
    slug: 'web-premium',
    title: 'Web Premium',
    image: 'assets/img/web premium.png',
    url: '#',
    featured: false,
    order: 8,
    descId:
      'Platform jual-beli akun premium (Canva, Netflix, Spotify, YouTube Premium, CapCut, AlightMotion) dengan sistem deposit saldo, manajemen stok otomatis, dan admin dashboard lengkap. Dibangun menggunakan PHP murni, Firebase (Auth, Firestore, Storage), dan Vanilla JS dengan Canvas 2D API untuk efek visual futuristik. Pembayaran via Midtrans Snap.js (transfer bank & QRIS otomatis).',
    descEn:
      'A premium account marketplace platform (Canva, Netflix, Spotify, YouTube Premium, CapCut, AlightMotion) featuring a balance deposit system, automatic stock management, and a complete admin dashboard. Built with pure PHP, Firebase (Auth, Firestore, Storage), and Vanilla JS with Canvas 2D API for futuristic visual effects. Payments via Midtrans Snap.js (bank transfer & auto QRIS).',
  },
  {
    slug: 'web-vidio-viral-2',
    title: 'Web Vidio Viral',
    image: 'assets/img/Project9.png',
    url: 'https://damtaproyek.ecommercedamta.com/login.php',
    featured: false,
    order: 9,
    descId:
      'Web App Roadmap menggunakan PHP, HTML5, and CSS3 Neon Style. Backend menggunakan MySQL dengan fitur keamanan Login Google (OAuth 2.0).',
    descEn:
      'Roadmap Web App using PHP, HTML5, and CSS3 Neon Style. Backend uses MySQL with Google Login security features (OAuth 2.0).',
  },
];

const certificates = [
  { slug: 'public-speaking', titleId: 'Belajar Public Speaking', titleEn: 'Learning Public Speaking', org: 'SMK Yappenda', year: '2024', image: 'assets/img/ser1.png', order: 1, descId: 'Menyelesaikan Program yang Berfokus gimana caranya Public Speaking.', descEn: 'Completed a program focused on Public Speaking techniques.' },
  { slug: 'dasar-ai', titleId: 'Belajar Dasar AI', titleEn: 'Learning Basic AI', org: 'Dicoding Indonesia', year: '2025', image: 'assets/img/ser2.png', order: 2, descId: 'Menyelesaikan gimana cara menggunakan AI yang Efektif.', descEn: 'Completed how to use AI effectively.' },
  { slug: 'cisco-packet-tracer', titleId: 'CISCO Packet Tracer', titleEn: 'CISCO Packet Tracer', org: 'SMK Yappenda', year: '2024', image: 'assets/img/ser3.png', order: 3, descId: 'Pemahaman mendalam tentang pembuatan Proyek Mandiri (Karya Tulis Ilmiah).', descEn: 'In-depth understanding of making Independent Projects (Scientific Writing).' },
  { slug: 'microsoft-apps', titleId: 'Microsoft APPS', titleEn: 'Microsoft APPS', org: 'SMK Yappenda', year: '2024', image: 'assets/img/ser4.png', order: 4, descId: 'Mempelajari Aplikasi Perkantoran (Spereadsheet, Document, Presentation).', descEn: 'Studying Office Applications (Spreadsheet, Document, Presentation).' },
  { slug: 'ekstra-skill', titleId: 'Ekstra Skill', titleEn: 'Extra Skill', org: 'SMK Yappenda', year: '2024', image: 'assets/img/ser5.png', order: 5, descId: 'Mempelajari tentang gimana cara menyelesaikan Sistem Pendingin Udara (Air Conditioner/AC).', descEn: 'Learning how to solve Air Conditioning (AC) system problems.' },
  { slug: 'redhat', titleId: 'REDHAT', titleEn: 'REDHAT', org: 'SMK Yappenda', year: '2024', image: 'assets/img/ser6.png', order: 6, descId: 'Mempelajari Tentang Dasar-dasar Red Hat System Administration.', descEn: 'Learning about Red Hat System Administration Basics.' },
];

// row 1 = top marquee (scroll-left), row 2 = bottom marquee (scroll-right)
const skills = [
  { name: 'HTML', image: 'assets/img/html.png', category: 'Frontend', level: 95, row: 1, order: 1 },
  { name: 'CSS', image: 'assets/img/css.png', category: 'Frontend', level: 92, row: 1, order: 2 },
  { name: 'JS', image: 'assets/img/js.png', category: 'Frontend', level: 88, row: 1, order: 3 },
  { name: 'React', image: 'assets/img/react.png', category: 'Frontend', level: 82, row: 1, order: 4 },
  { name: 'NodeJS', image: 'assets/img/node.png', category: 'Backend', level: 78, row: 1, order: 5 },
  { name: 'Cpanel', image: 'assets/img/cpanel.png', category: 'DevOps', level: 80, row: 1, order: 6 },
  { name: 'Github', image: 'assets/img/github.png', category: 'DevOps', level: 88, row: 1, order: 7 },
  { name: 'Python', image: 'assets/img/python.png', category: 'AI / Scripting', level: 74, row: 1, order: 8 },
  { name: 'TypeScript', image: 'assets/img/typescript.png', category: 'Frontend', level: 76, row: 1, order: 9 },
  { name: 'Go', image: 'assets/img/go.png', category: 'Backend', level: 72, row: 1, order: 10 },
  { name: 'Next.js', image: 'assets/img/nextjs.png', category: 'Frontend', level: 78, row: 1, order: 11 },
  { name: 'Elixir', image: 'assets/img/elixir.png', category: 'Functional', level: 50, row: 1, order: 12 },
  { name: 'C', image: 'assets/img/c.png', category: 'Backend', level: 65, row: 1, order: 13 },
  { name: 'PHP', image: 'assets/img/php.png', category: 'Backend', level: 85, row: 2, order: 1 },
  { name: 'MySQL', image: 'assets/img/mysql.png', category: 'Database', level: 87, row: 2, order: 2 },
  { name: 'Bootstrap', image: 'assets/img/bootstrap.png', category: 'Frontend', level: 80, row: 2, order: 3 },
  { name: 'Tailwind', image: 'assets/img/tailwind.png', category: 'Frontend', level: 85, row: 2, order: 4 },
  { name: 'VS Code', image: 'assets/img/vscode.png', category: 'Tools', level: 95, row: 2, order: 5 },
  { name: 'Gemini', image: 'assets/img/gemini.png', category: 'AI Tools', level: 85, row: 2, order: 6 },
  { name: 'Google Search Console', image: 'assets/img/google search console.png', category: 'DevOps', level: 75, row: 2, order: 7 },
  { name: 'Firebase', image: 'assets/img/firebase.png', category: 'Backend/DB', level: 80, row: 2, order: 8 },
  { name: 'C++', image: 'assets/img/cpp.png', category: 'Systems', level: 58, row: 2, order: 9 },
  { name: 'Rust', image: 'assets/img/rust.png', category: 'Systems', level: 55, row: 2, order: 10 },
  { name: 'Java', image: 'assets/img/java.png', category: 'Backend', level: 62, row: 2, order: 11 },
  { name: 'Kotlin', image: 'assets/img/kotlin.png', category: 'Mobile', level: 63, row: 2, order: 12 },
  { name: 'Ruby', image: 'assets/img/ruby.png', category: 'Scripting', level: 48, row: 2, order: 13 },
  { name: 'Lua', image: 'assets/img/lua.png', category: 'Scripting', level: 45, row: 2, order: 14 },
];

const timeline = [
  { slug: 'bki', icon: 'ri-briefcase-4-fill', logo: 'assets/img/bki.jpg', order: 1, titleId: 'Full Stack Developer', titleEn: 'Full Stack Developer', companyId: 'PT. Biro Klasifikasi Indonesia (Persero)', companyEn: 'PT. Biro Klasifikasi Indonesia (Persero)', dateId: '2026 - Sekarang • Jakarta, Indonesia', dateEn: '2026 - Present • Jakarta, Indonesia', descId: 'Menjadi pengembang profesional di BKI dan berkontribusi pada proyek nasional. Bertanggung jawab dalam merancang arsitektur perangkat lunak yang fungsional dan efisien.', descEn: 'Became a professional developer at BKI and contributed to national projects. Responsible for designing functional and efficient software architecture.' },
  { slug: 'uin', icon: 'ri-graduation-cap-fill', logo: 'assets/img/uin.png', order: 2, titleId: 'Mahasiswa Sistem Informasi', titleEn: 'Information Systems Student', companyId: 'UIN Syarif Hidayatullah Jakarta', companyEn: 'UIN Syarif Hidayatullah Jakarta', dateId: '2025 - Sekarang • Ciputat, Indonesia', dateEn: '2025 - Present • Ciputat, Indonesia', descId: 'Lulus dari SMK Yappenda dan melanjutkan pendidikan tinggi di UIN Jakarta. Titik awal saya mendalami dunia Web Developer secara komprehensif.', descEn: 'Graduated from SMK Yappenda and continued higher education at UIN Jakarta. The starting point for me to delve into the world of Web Developers comprehensively.' },
  { slug: 'smk', icon: 'ri-school-fill', logo: 'assets/img/yappenda.png', order: 3, titleId: 'Teknik Komputer Jaringan (TKJ)', titleEn: 'Computer and Network Engineering (TKJ)', companyId: 'SMK Yappenda Jakarta', companyEn: 'SMK Yappenda Jakarta', dateId: '2022 - 2025 • Jakarta, Indonesia', dateEn: '2022 - 2025 • Jakarta, Indonesia', descId: 'Fokus mendalami ilmu Teknik Komputer Jaringan. Aktif di ekstrakurikuler dan Ekskill untuk penajaman skill. Menguasai CISCO dan mempraktekannya dalam PKL.', descEn: 'Focusing on Computer and Network Engineering. Active in extracurriculars for skill sharpening. Mastered CISCO and put it into practice during internship.' },
];

const history = [
  { year: '2022', image: 'assets/img/file1.png', order: 1, descId: 'Awal mula perjalanan di dunia teknologi dan dasar pemrograman Kelas X. Awalnya coba VSCode, sempat berhenti karena susah, tapi tetap penasaran.', descEn: 'The beginning of the journey in technology and basic programming in 10th grade. Tried VSCode, stopped because it was hard, but remained curious.' },
  { year: '2023', image: 'assets/img/file2.png', order: 2, descId: 'Mulai bisa menggunakan CISCO dibanding awal masuk kelas XI dan mulai PKL (Praktek Kerja Lapangan).', descEn: 'Started being able to use CISCO compared to early 11th grade and started internship.' },
  { year: '2024', image: 'assets/img/file3.png', order: 3, descId: 'Kelas XII, fokus mendalami TKJ, aktif di Ekskul dan Ekskill untuk penajaman skill.', descEn: '12th grade, focusing on TKJ, active in extracurriculars for skill sharpening.' },
  { year: '2025', image: 'assets/img/file4.png', order: 4, descId: 'Lulus SMK Yappenda, masuk UIN Jakarta. Titik awal mendalami Web Developer.', descEn: 'Graduated from SMK Yappenda, entered UIN Jakarta. The starting point of Web Development.' },
  { year: '2026', image: 'assets/img/file5.png', order: 5, descId: 'Menjadi pengembang profesional di BKI dan berkontribusi pada proyek nasional.', descEn: 'Became a professional developer at BKI and contributed to national projects.' },
];

const countries = [
  { name: 'Indonesia', flag: '🇮🇩', percentage: 95, order: 1 },
  { name: 'Malaysia', flag: '🇲🇾', percentage: 3, order: 2 },
  { name: 'Amerika Serikat', flag: '🇺🇸', percentage: 2, order: 3 },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const desktop = [128, 215, 187, 293, 342, 412, 387, 521, 468, 587, 634, 712];
const mobile = [97, 163, 142, 218, 267, 318, 291, 398, 357, 442, 489, 543];
const visitorStats = months.map((m, i) => ({ month: m, monthIndex: i, desktop: desktop[i], mobile: mobile[i] }));

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.comment.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.project.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.timelineEntry.deleteMany();
  await prisma.historyEntry.deleteMany();
  await prisma.countryStat.deleteMany();
  await prisma.visitorStat.deleteMany();

  await prisma.project.createMany({ data: projects });
  await prisma.certificate.createMany({ data: certificates });
  await prisma.skill.createMany({ data: skills });
  await prisma.timelineEntry.createMany({ data: timeline });
  await prisma.historyEntry.createMany({ data: history });
  await prisma.countryStat.createMany({ data: countries });
  await prisma.visitorStat.createMany({ data: visitorStats });

  await prisma.visitorCounter.upsert({
    where: { id: 1 },
    create: { id: 1, count: 1280 },
    update: {},
  });

  console.log(
    `✅ Seeded: ${projects.length} projects, ${certificates.length} certs, ${skills.length} skills, ${timeline.length} timeline, ${history.length} history, ${countries.length} countries, ${visitorStats.length} visitor stats.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

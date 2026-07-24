/**
 * Factual role of each language / technology - what it does and why it fits a
 * project, phrased generally (not a claim about the author's personal reasoning).
 * Used on the project detail page to answer "why this language".
 */
export interface TechRole {
  id: string;
  en: string;
}

const ROLES: Record<string, TechRole> = {
  TypeScript: {
    id: 'Menambah tipe statis di atas JavaScript sehingga kesalahan tertangkap sebelum runtime - dipakai untuk logika aplikasi berskala besar yang aman.',
    en: 'Adds static typing on top of JavaScript so mistakes are caught before runtime - used for large, safe application logic.',
  },
  JavaScript: {
    id: 'Bahasa interaktivitas di peramban dan runtime Node.js - menggerakkan logika sisi klien maupun server.',
    en: 'The language of browser interactivity and the Node.js runtime - drives both client and server logic.',
  },
  PHP: {
    id: 'Bahasa server-side klasik yang cepat dipasang di hosting umum - dipakai untuk rendering halaman dinamis dan integrasi database.',
    en: 'A classic server-side language that deploys easily on common hosting - used for dynamic page rendering and database integration.',
  },
  Python: {
    id: 'Bahasa serbaguna untuk skrip, otomasi, data, dan AI/computer vision - ringkas dan cepat untuk membangun logika kompleks.',
    en: 'A versatile language for scripting, automation, data, and AI/computer vision - concise and fast to build complex logic.',
  },
  Go: {
    id: 'Bahasa terkompilasi yang cepat dan hemat memori dengan konkurensi bawaan - cocok untuk service dan tooling berkinerja tinggi.',
    en: 'A fast, memory-efficient compiled language with built-in concurrency - suited to high-performance services and tooling.',
  },
  Rust: {
    id: 'Bahasa sistem yang aman-memori tanpa garbage collector - dipakai untuk komponen kritis yang butuh kecepatan dan keandalan.',
    en: 'A memory-safe systems language with no garbage collector - used for critical components needing speed and reliability.',
  },
  C: {
    id: 'Bahasa tingkat rendah untuk komponen inti berkinerja tinggi dan akses langsung ke sistem.',
    en: 'A low-level language for high-performance core components and direct system access.',
  },
  'C++': {
    id: 'Ekstensi C dengan abstraksi objek - dipakai untuk modul komputasi berat yang tetap butuh kontrol memori.',
    en: 'A C extension with object abstractions - used for heavy computation modules that still need memory control.',
  },
  SQL: {
    id: 'Bahasa kueri untuk basis data relasional - mengatur penyimpanan, relasi, dan pengambilan data yang terstruktur.',
    en: 'The query language for relational databases - governs structured storage, relations, and retrieval.',
  },
  HTML: {
    id: 'Kerangka struktur halaman web - menyusun konten dan semantik antarmuka.',
    en: 'The structural skeleton of a web page - lays out content and interface semantics.',
  },
  CSS: {
    id: 'Lapisan gaya visual - menangani tata letak, warna, animasi, dan responsivitas antarmuka.',
    en: 'The visual styling layer - handles layout, colour, animation, and responsive design.',
  },
  SCSS: {
    id: 'CSS dengan variabel dan nesting - membuat styling berskala lebih terstruktur.',
    en: 'CSS with variables and nesting - keeps large-scale styling organised.',
  },
  Java: {
    id: 'Bahasa berorientasi objek yang matang dan portabel - dipakai untuk aplikasi backend yang kokoh.',
    en: 'A mature, portable object-oriented language - used for robust backend applications.',
  },
  Kotlin: {
    id: 'Bahasa modern yang ringkas di atas JVM - populer untuk backend dan mobile.',
    en: 'A concise modern language on the JVM - popular for backend and mobile.',
  },
  Ruby: {
    id: 'Bahasa yang ekspresif dan produktif - dipakai untuk skrip dan aplikasi web yang cepat dibangun.',
    en: 'An expressive, productive language - used for scripts and quickly-built web apps.',
  },
  Lua: {
    id: 'Bahasa skrip ringan yang mudah disematkan - dipakai untuk konfigurasi dan logika tertanam.',
    en: 'A lightweight embeddable scripting language - used for configuration and embedded logic.',
  },
  WebAssembly: {
    id: 'Target kompilasi berkinerja mendekati native di peramban - untuk komputasi berat sisi klien.',
    en: 'A near-native performance compile target in the browser - for heavy client-side computation.',
  },
  Vue: {
    id: 'Framework antarmuka progresif - membangun komponen UI yang reaktif.',
    en: 'A progressive UI framework - builds reactive interface components.',
  },
  Shell: {
    id: 'Skrip otomasi sistem - menjalankan tugas build, deploy, dan operasional.',
    en: 'System automation scripts - run build, deploy, and operational tasks.',
  },
};

/** Framework/tool labels that appear in `stacks` but are not languages. */
const TOOL_ROLES: Record<string, TechRole> = {
  React: { id: 'Pustaka UI berbasis komponen untuk antarmuka yang reaktif.', en: 'A component-based UI library for reactive interfaces.' },
  'Next.js': { id: 'Framework React dengan rendering server dan routing bawaan.', en: 'A React framework with server rendering and built-in routing.' },
  Express: { id: 'Framework server minimalis untuk REST API di Node.js.', en: 'A minimal server framework for REST APIs on Node.js.' },
  Prisma: { id: 'ORM type-safe yang menjembatani kode dengan basis data.', en: 'A type-safe ORM bridging code and the database.' },
  Tailwind: { id: 'Kerangka CSS utility-first untuk styling cepat dan konsisten.', en: 'A utility-first CSS framework for fast, consistent styling.' },
  Firebase: { id: 'Platform backend (Auth, Firestore, Storage) tanpa server sendiri.', en: 'A backend platform (Auth, Firestore, Storage) with no own server.' },
  Streamlit: { id: 'Framework Python untuk membangun antarmuka data tanpa HTML/JS.', en: 'A Python framework to build data interfaces with no HTML/JS.' },
  Docker: { id: 'Kontainerisasi agar layanan berjalan konsisten di mana saja.', en: 'Containerisation so services run consistently anywhere.' },
  MySQL: { id: 'Basis data relasional untuk penyimpanan terstruktur.', en: 'A relational database for structured storage.' },
  Bootstrap: { id: 'Kerangka CSS komponen siap pakai untuk tata letak responsif.', en: 'A ready-made component CSS framework for responsive layouts.' },
  'OAuth 2.0': { id: 'Standar otorisasi untuk login pihak ketiga yang aman.', en: 'An authorization standard for secure third-party login.' },
  Midtrans: { id: 'Gerbang pembayaran untuk transaksi otomatis.', en: 'A payment gateway for automated transactions.' },
  'Face Recognition': { id: 'Pengenalan wajah untuk verifikasi identitas otomatis.', en: 'Face recognition for automated identity verification.' },
  'AI/NLP': { id: 'Pemrosesan bahasa alami untuk analisis dan generasi teks.', en: 'Natural-language processing for text analysis and generation.' },
  DAST: { id: 'Pengujian keamanan dinamis terhadap aplikasi berjalan.', en: 'Dynamic security testing against a running application.' },
  Microservices: { id: 'Arsitektur layanan kecil yang independen dan mudah diskalakan.', en: 'An architecture of small, independent, scalable services.' },
  'API Gateway': { id: 'Pintu masuk tunggal yang merutekan permintaan antar-layanan.', en: 'A single entry point routing requests across services.' },
  'REST API': { id: 'Antarmuka HTTP standar untuk komunikasi antar sistem.', en: 'A standard HTTP interface for system-to-system communication.' },
  'WhatsApp API': { id: 'Integrasi pesan otomatis lewat WhatsApp.', en: 'Automated messaging integration via WhatsApp.' },
  Vite: { id: 'Build tool dan dev server frontend yang sangat cepat.', en: 'A very fast frontend build tool and dev server.' },
  Monorepo: { id: 'Satu repositori untuk banyak paket/layanan sekaligus.', en: 'One repository holding many packages/services together.' },
  'Node.js': { id: 'Runtime JavaScript sisi server untuk API dan tooling.', en: 'A server-side JavaScript runtime for APIs and tooling.' },
};

export function techRole(name: string, lang: 'id' | 'en'): string | null {
  const role = ROLES[name] ?? TOOL_ROLES[name] ?? TOOL_ROLES[name.replace(/\.js$/i, '')];
  return role ? role[lang] : null;
}

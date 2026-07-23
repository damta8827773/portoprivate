import { PageShell } from '../components/layout/PageShell';
import { useI18n } from '../i18n/useI18n';
import { renderMarkdown } from '../lib/markdown';

const LAST_UPDATED = '2026-07-22';

const privacyId = [
  '## Ringkasan',
  '',
  'Situs ini adalah portofolio pribadi. Saya mengumpulkan data seminimal mungkin,',
  'dan tidak pernah menjual data siapa pun kepada pihak ketiga.',
  '',
  '## Data yang dikumpulkan',
  '',
  '- **Komentar:** nama, alamat email, dan foto profil dari akun Google yang Anda pakai untuk masuk, beserta isi komentar Anda.',
  '- **Formulir kontak:** nama, email, dan pesan yang Anda kirim.',
  '- **Statistik kunjungan:** jumlah kunjungan dan perkiraan negara asal, dalam bentuk agregat tanpa identitas pribadi.',
  '',
  '## Cara data dipakai',
  '',
  '1. Menampilkan komentar dan balasan di halaman komentar.',
  '2. Mengirim notifikasi email ketika komentar Anda dibalas.',
  '3. Membalas pesan yang Anda kirim lewat formulir kontak.',
  '',
  '## Layanan pihak ketiga',
  '',
  'Situs ini memakai Google (autentikasi), Firebase Firestore (penyimpanan komentar),',
  'dan EmailJS (notifikasi email). Masing-masing punya kebijakan privasinya sendiri.',
  '',
  '## Hak Anda',
  '',
  'Anda berhak meminta salinan atau penghapusan data Anda kapan saja. Kirim',
  'permintaan ke **damtafaiz@gmail.com** dan akan saya proses secepatnya.',
  '',
  '## Cookie',
  '',
  'Situs ini tidak memakai cookie iklan. Penyimpanan lokal hanya dipakai untuk',
  'mengingat preferensi tema dan bahasa Anda.',
].join('\n');

const privacyEn = [
  '## Summary',
  '',
  'This site is a personal portfolio. I collect as little data as possible, and',
  'I never sell anyone\'s data to third parties.',
  '',
  '## Data collected',
  '',
  '- **Comments:** the name, email address, and profile photo from the Google account you sign in with, plus your comment text.',
  '- **Contact form:** the name, email, and message you submit.',
  '- **Visit statistics:** visit counts and approximate country of origin, aggregated and not personally identifying.',
  '',
  '## How the data is used',
  '',
  '1. To display comments and replies on the comments page.',
  '2. To send you an email notification when your comment is replied to.',
  '3. To reply to messages sent through the contact form.',
  '',
  '## Third-party services',
  '',
  'This site uses Google (authentication), Firebase Firestore (comment storage),',
  'and EmailJS (email notifications). Each has its own privacy policy.',
  '',
  '## Your rights',
  '',
  'You may request a copy or the deletion of your data at any time. Send your',
  'request to **damtafaiz@gmail.com** and I will handle it promptly.',
  '',
  '## Cookies',
  '',
  'This site uses no advertising cookies. Local storage is used only to remember',
  'your theme and language preferences.',
].join('\n');

const termsId = [
  '## Penerimaan ketentuan',
  '',
  'Dengan mengakses situs ini, Anda setuju dengan ketentuan di halaman ini.',
  'Jika tidak setuju, mohon berhenti menggunakan situs ini.',
  '',
  '## Hak cipta karya',
  '',
  'Seluruh kode, desain, tulisan, dan gambar di situs ini adalah karya',
  '**Damta Noviyan Muhamad Faiz**, kecuali disebutkan lain.',
  '',
  '### Diperbolehkan',
  '',
  '- Membaca, mempelajari, dan mengambil inspirasi dari karya di sini.',
  '- Mengutip sebagian dengan mencantumkan sumber dan tautan balik.',
  '',
  '### Tidak diperbolehkan',
  '',
  '- Menyalin situs ini secara utuh lalu mengakuinya sebagai karya sendiri.',
  '- Mengumpulkan sebagai tugas akademik atas nama orang lain.',
  '- Menggunakan ulang untuk tujuan komersial tanpa izin tertulis.',
  '',
  '## Aturan berkomentar',
  '',
  'Komentar yang berisi ujaran kebencian, spam, promosi, atau tautan berbahaya',
  'akan saya hapus tanpa pemberitahuan.',
  '',
  '## Batasan tanggung jawab',
  '',
  'Situs ini disediakan apa adanya. Saya berusaha menjaga akurasi isi, tetapi',
  'tidak menjamin situs bebas dari galat atau selalu dapat diakses.',
  '',
  '## Perubahan ketentuan',
  '',
  'Ketentuan ini dapat berubah sewaktu-waktu. Tanggal pembaruan terakhir selalu',
  'tercantum di bagian atas halaman.',
].join('\n');

const termsEn = [
  '## Acceptance of terms',
  '',
  'By accessing this site you agree to the terms on this page. If you do not',
  'agree, please stop using the site.',
  '',
  '## Copyright',
  '',
  'All code, design, writing, and images on this site are the work of',
  '**Damta Noviyan Muhamad Faiz**, unless stated otherwise.',
  '',
  '### Permitted',
  '',
  '- Reading, studying, and drawing inspiration from the work here.',
  '- Quoting portions with attribution and a link back.',
  '',
  '### Not permitted',
  '',
  '- Copying this site wholesale and claiming it as your own work.',
  '- Submitting it as academic work on someone else\'s behalf.',
  '- Reusing it commercially without written permission.',
  '',
  '## Commenting rules',
  '',
  'Comments containing hate speech, spam, promotion, or malicious links will be',
  'removed without notice.',
  '',
  '## Limitation of liability',
  '',
  'This site is provided as is. I work to keep its content accurate, but make no',
  'guarantee that it is free of errors or always available.',
  '',
  '## Changes to these terms',
  '',
  'These terms may change at any time. The last-updated date is always shown at',
  'the top of the page.',
].join('\n');

interface LegalPageProps {
  document: 'privacy' | 'terms';
}

export function LegalPage({ document: doc }: LegalPageProps) {
  const { t, lang } = useI18n();
  const isPrivacy = doc === 'privacy';

  const title = isPrivacy
    ? lang === 'en'
      ? 'Privacy Policy'
      : 'Kebijakan Privasi'
    : lang === 'en'
      ? 'Terms of Service'
      : 'Ketentuan Layanan';

  const body = isPrivacy
    ? lang === 'en'
      ? privacyEn
      : privacyId
    : lang === 'en'
      ? termsEn
      : termsId;

  const updatedLabel = lang === 'en' ? 'Last updated' : 'Terakhir diperbarui';
  const updated = new Date(LAST_UPDATED).toLocaleDateString(
    lang === 'en' ? 'en-US' : 'id-ID',
    { day: 'numeric', month: 'long', year: 'numeric' },
  );

  return (
    <PageShell title={title} backTo={{ to: '/', label: t('back_home') }}>
      <article className="detail-article">
        <p className="post-meta post-meta-lead">
          {updatedLabel}: {updated}
        </p>
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }} />
      </article>
    </PageShell>
  );
}

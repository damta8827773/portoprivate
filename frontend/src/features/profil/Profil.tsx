import { useI18n } from '../../i18n/useI18n';

const FLOATERS = [
  ['3%', '10%', '1.3rem', '0s', '0.07', '</>'],
  ['92%', '8%', '0.9rem', '1.5s', '0.06', '{ }'],
  ['6%', '55%', '1rem', '0.7s', '0.06', 'API'],
  ['88%', '48%', '1.1rem', '2.2s', '0.07', '[ ]'],
  ['15%', '88%', '0.8rem', '1.1s', '0.06', 'npm'],
  ['80%', '82%', '0.9rem', '0.4s', '0.07', '=>'],
] as const;

const SOCIALS = [
  { href: 'https://instagram.com/tadamta_', icon: 'ri-instagram-line', label: 'Instagram' },
  { href: 'https://www.tiktok.com/@n1876382987nsg?', icon: 'ri-tiktok-fill', label: 'TikTok' },
  { href: 'https://www.linkedin.com/in/damta-faiz-955493221', icon: 'ri-linkedin-fill', label: 'LinkedIn' },
  { href: 'mailto:damtafaiz@gmail.com', icon: 'ri-mail-line', label: 'Email' },
  { href: 'https://www.facebook.com/share/17kwhF8r9s/?mibextid=wwXIfr', icon: 'ri-facebook-circle-fill', label: 'Facebook' },
];

export function Profil() {
  const { t } = useI18n();
  return (
    <section id="profil">
      <div className="tech-bg-floaters" aria-hidden="true">
        {FLOATERS.map(([x, y, s, d, o, txt], i) => (
          <span key={i} className="tbf" style={{ ['--x' as string]: x, ['--y' as string]: y, ['--s' as string]: s, ['--d' as string]: d, ['--o' as string]: o }}>
            {txt}
          </span>
        ))}
      </div>
      <div className="profil-card hidden">
        <div className="profil-bg-decoration" />
        <span className="card-corner tl" aria-hidden="true" />
        <span className="card-corner tr" aria-hidden="true" />
        <span className="card-corner bl" aria-hidden="true" />
        <span className="card-corner br" aria-hidden="true" />
        <div className="card-scan" aria-hidden="true" />
        <h2 style={{ textAlign: 'center', marginBottom: 40, border: 'none' }}>{t('profil_title')}</h2>

        <div className="profil-layout">
          <div className="profil-left">
            <div className="profil-image-wrapper">
              <img
                src="/assets/img/profil foto.png"
                className="profil-media"
                alt="Foto Profil Damta"
                onError={(e) => ((e.currentTarget as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Damta&background=random')}
              />
            </div>
            <div className="profil-available-tag">
              <span className="status-dot" />
              <span>{t('hero_available')}</span>
            </div>
            <div className="profil-mini-socials">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.label} className="profil-social-item">
                  <i className={s.icon} />
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="profil-right">
            <div className="detail-row"><span className="detail-label">{t('label_user')}</span><span className="detail-text">Damta Noviyan Muhamad Faiz</span></div>
            <div className="detail-row"><span className="detail-label">{t('label_loc')}</span><span className="detail-text">Jakarta, Indonesia</span></div>
            <div className="detail-row"><span className="detail-label">{t('label_guild')}</span><span className="detail-text">UIN Syarif Hidayatullah Jakarta</span></div>
            <div className="detail-row"><span className="detail-label">{t('label_role')}</span><span className="detail-text">Full Stack Developer In PT. Biro Klasifikasi Indonesia</span></div>
          </div>
        </div>

        <div className="profil-singkat" style={{ textAlign: 'center', marginTop: 30, borderTop: '1px solid var(--card-border)', paddingTop: 20 }}>
          <p>{t('profil_singkat')}</p>
        </div>
      </div>
    </section>
  );
}

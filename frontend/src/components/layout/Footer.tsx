import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/useI18n';

const SOCIALS = [
  { href: 'https://instagram.com/tadamta_', name: 'Instagram', icon: 'ri-instagram-fill' },
  { href: 'https://www.linkedin.com/in/damta-faiz-955493221', name: 'LinkedIn', icon: 'ri-linkedin-fill' },
  { href: 'https://github.com/damta8827773', name: 'GitHub', icon: 'ri-github-fill' },
  { href: 'mailto:damtafaiz@gmail.com', name: 'Email', icon: 'ri-mail-line' },
];

export function Footer() {
  const { t } = useI18n();
  return (
    <footer id="contact">
      <div className="social-links">
        {SOCIALS.map((s) => (
          <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="social-icon-btn" data-name={s.name}>
            <i className={s.icon} />
          </a>
        ))}
      </div>
      <p>
        &copy; {new Date().getFullYear()} Damta Noviyan Muhamad Faiz.
        <span style={{ display: 'block', marginTop: 5, fontSize: '1rem', opacity: 1 }}>{t('footer')}</span>
      </p>
      <nav className="footer-legal">
        <Link to="/about">{t('about_title_main')}</Link>
        <span aria-hidden="true">·</span>
        <Link to="/journey">{t('journey_title')}</Link>
        <span aria-hidden="true">·</span>
        <Link to="/legal/privacy-policy">{t('legal_privacy')}</Link>
        <span aria-hidden="true">·</span>
        <Link to="/legal/terms-of-service">{t('legal_terms')}</Link>
      </nav>
    </footer>
  );
}

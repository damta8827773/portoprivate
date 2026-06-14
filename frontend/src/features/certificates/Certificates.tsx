import { useI18n } from '../../i18n/useI18n';
import { useCertificates } from '../../hooks/useContent';

export function Certificates() {
  const { t, lang } = useI18n();
  const { data } = useCertificates();
  const certs = data ?? [];

  return (
    <section id="certificates">
      <h2 style={{ marginBottom: 40 }} className="hidden neon-title">
        {t('cert_title')}
      </h2>
      <div className="cert-container">
        {certs.map((c) => (
          <div className="cert-card hidden" key={c.id}>
            <div className="cert-img-box">
              <img
                src={`/assets/img/${c.image.replace('assets/img/', '')}`}
                alt={lang === 'en' ? c.titleEn : c.titleId}
                onError={(e) =>
                  ((e.currentTarget as HTMLImageElement).src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(c.titleId)}`)
                }
              />
            </div>
            <div className="cert-content">
              <h4>{lang === 'en' ? c.titleEn : c.titleId}</h4>
              <span>
                {c.org} - {c.year}
              </span>
              <p>{lang === 'en' ? c.descEn : c.descId}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import { useMemo, useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { useCertificates } from '../hooks/useContent';
import { useI18n } from '../i18n/useI18n';
import { assetUrl } from '../lib/assetUrl';

const ALL = '__all__';

export function AchievementsPage() {
  const { t, lang } = useI18n();
  const { data } = useCertificates();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(ALL);

  const certificates = data ?? [];

  const categories = useMemo(() => {
    const unique = new Set(certificates.map((c) => c.category ?? 'Course'));
    return Array.from(unique).sort();
  }, [certificates]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return certificates.filter((c) => {
      const inCategory = category === ALL || (c.category ?? 'Course') === category;
      if (!inCategory) return false;
      if (!q) return true;
      const haystack = [c.titleId, c.titleEn, c.org, c.year].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [certificates, query, category]);

  return (
    <PageShell title={t('cert_title')} description={t('page_achievements_desc')}>
      <div className="page-toolbar">
        <label className="search-field">
          <i className="ri-search-line" />
          <input
            type="search"
            value={query}
            placeholder={t('search_placeholder')}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <span className="result-count">{filtered.length}</span>
      </div>

      <div className="filter-chips" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={category === ALL}
          className={`filter-chip${category === ALL ? ' active' : ''}`}
          onClick={() => setCategory(ALL)}
        >
          {t('filter_all')}
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={category === c}
            className={`filter-chip${category === c ? ' active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">{t('empty_result')}</p>
      ) : (
        <div className="cert-container">
          {filtered.map((c) => {
            const title = lang === 'en' ? c.titleEn : c.titleId;
            return (
              <article className="cert-card border-beam" key={c.id}>
                <div className="cert-img-box">
                  <img
                    src={assetUrl(c.image)}
                    alt={title}
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                  />
                </div>
                <div className="cert-content">
                  <span className="cert-category">{c.category ?? 'Course'}</span>
                  <h4>{title}</h4>
                  <span>
                    {c.org} - {c.year}
                  </span>
                  <p>{lang === 'en' ? c.descEn : c.descId}</p>
                  {c.credentialUrl && (
                    <a href={c.credentialUrl} target="_blank" rel="noreferrer" className="cert-link">
                      <i className="ri-external-link-line" /> {t('detail_visit')}
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}

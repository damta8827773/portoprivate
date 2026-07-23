import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { usePosts } from '../hooks/useInsights';
import { useI18n } from '../i18n/useI18n';
import { assetUrl } from '../lib/assetUrl';

const ALL = '__all__';

export function BlogPage() {
  const { t, lang } = useI18n();
  const { data } = usePosts();
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState(ALL);

  const posts = data ?? [];

  const tags = useMemo(() => {
    const unique = new Set(posts.flatMap((p) => p.tags));
    return Array.from(unique).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (tag !== ALL && !p.tags.includes(tag)) return false;
      if (!q) return true;
      return [p.titleId, p.titleEn, p.excerptId, p.excerptEn]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [posts, query, tag]);

  const dateLocale = lang === 'en' ? 'en-US' : 'id-ID';

  return (
    <PageShell title={t('page_blog_title')} description={t('page_blog_desc')}>
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
          aria-selected={tag === ALL}
          className={`filter-chip${tag === ALL ? ' active' : ''}`}
          onClick={() => setTag(ALL)}
        >
          {t('filter_all')}
        </button>
        {tags.map((tagName) => (
          <button
            key={tagName}
            type="button"
            role="tab"
            aria-selected={tag === tagName}
            className={`filter-chip${tag === tagName ? ' active' : ''}`}
            onClick={() => setTag(tagName)}
          >
            {tagName}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">{t('empty_result')}</p>
      ) : (
        <div className="post-grid">
          {filtered.map((post) => (
            <article className="post-card border-beam" key={post.id}>
              {post.cover && (
                <Link to={`/blog/${post.slug}`} className="post-cover">
                  <img
                    src={assetUrl(post.cover)}
                    alt={lang === 'en' ? post.titleEn : post.titleId}
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                  />
                </Link>
              )}
              <div className="post-body">
                <div className="post-meta">
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString(dateLocale, {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                  <span>
                    {post.readingMinutes} {t('reading_time')}
                  </span>
                </div>
                <h3>
                  <Link to={`/blog/${post.slug}`}>
                    {lang === 'en' ? post.titleEn : post.titleId}
                  </Link>
                </h3>
                <p>{lang === 'en' ? post.excerptEn : post.excerptId}</p>
                <ul className="stack-chips">
                  {post.tags.map((tagName) => (
                    <li key={tagName}>{tagName}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      )}
    </PageShell>
  );
}

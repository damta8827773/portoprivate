import { useParams } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { usePost } from '../hooks/useInsights';
import { useI18n } from '../i18n/useI18n';
import { assetUrl } from '../lib/assetUrl';
import { renderMarkdown } from '../lib/markdown';
import { NotFoundBody } from './NotFoundPage';

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useI18n();
  const { data: post, isLoading } = usePost(slug);

  const backTo = { to: '/blog', label: t('back_blog') };

  if (!post) {
    return (
      <PageShell title={isLoading ? '...' : t('not_found_title')} backTo={backTo}>
        {!isLoading && <NotFoundBody />}
      </PageShell>
    );
  }

  const title = lang === 'en' ? post.titleEn : post.titleId;
  const body = lang === 'en' ? post.contentEn : post.contentId;
  const dateLocale = lang === 'en' ? 'en-US' : 'id-ID';

  return (
    <PageShell title={title} backTo={backTo}>
      <article className="detail-article">
        <div className="post-meta post-meta-lead">
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

        {post.cover && (
          <div className="detail-cover">
            <img
              src={assetUrl(post.cover)}
              alt={title}
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
          </div>
        )}

        <ul className="stack-chips">
          {post.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        {/* Bodies come from our own database and are escaped by renderMarkdown. */}
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }} />
      </article>
    </PageShell>
  );
}

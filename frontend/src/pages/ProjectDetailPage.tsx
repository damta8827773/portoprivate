import { useParams } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { useProject } from '../hooks/useInsights';
import { useI18n } from '../i18n/useI18n';
import { ProjectThumb } from '../components/ui/ProjectThumb';
import { StackChips } from '../components/ui/StackChips';
import { renderMarkdown } from '../lib/markdown';
import { NotFoundBody } from './NotFoundPage';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useI18n();
  const { data: project, isLoading } = useProject(slug);

  if (!project) {
    return (
      <PageShell
        title={isLoading ? '...' : t('not_found_title')}
        backTo={{ to: '/projects', label: t('back_projects') }}
      >
        {!isLoading && <NotFoundBody />}
      </PageShell>
    );
  }

  const description = lang === 'en' ? project.descEn : project.descId;
  const body = lang === 'en' ? project.contentEn : project.contentId;
  const stacks = project.stacks ?? [];

  return (
    <PageShell
      title={project.title}
      description={description}
      backTo={{ to: '/projects', label: t('back_projects') }}
    >
      <article className="detail-article">
        <div className="detail-cover">
          <ProjectThumb image={project.image} title={project.title} slug={project.slug} />
        </div>

        {stacks.length > 0 && (
          <section className="detail-block">
            <h2 className="detail-block-title">{t('detail_stack')}</h2>
            <StackChips items={stacks} />
          </section>
        )}

        {/* Long-form body is optional - the summary above already stands alone. */}
        {body && (
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }}
          />
        )}

        <div className="detail-actions">
          {project.url && project.url !== '#' && (
            <a href={project.url} target="_blank" rel="noreferrer" className="btn-view magnetic-btn">
              <i className="ri-external-link-line arrow-icon" />
              <span className="btn-text">{t('detail_visit')}</span>
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-view btn-view-ghost magnetic-btn"
            >
              <i className="ri-github-fill arrow-icon" />
              <span className="btn-text">{t('detail_repo')}</span>
            </a>
          )}
        </div>
      </article>
    </PageShell>
  );
}

import { useParams } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { useProject } from '../hooks/useInsights';
import { useI18n } from '../i18n/useI18n';
import { ProjectThumb } from '../components/ui/ProjectThumb';
import { StackChips, techLogo } from '../components/ui/StackChips';
import { renderMarkdown } from '../lib/markdown';
import { projectLanguages } from '../lib/projectLanguages';
import { techRole } from '../lib/techRoles';
import { NotFoundBody } from './NotFoundPage';

/** Colour per language for the composition bar - falls back to a neutral tone. */
const LANG_COLOR: Record<string, string> = {
  TypeScript: '#3178c6', JavaScript: '#f7df1e', PHP: '#777bb4', Python: '#3572a5',
  HTML: '#e34f26', CSS: '#264de4', SCSS: '#c6538c', Go: '#00add8', Rust: '#dea584',
  C: '#555555', 'C++': '#f34b7d', SQL: '#e38c00', Java: '#b07219', Kotlin: '#a97bff',
  Ruby: '#701516', Lua: '#000080', Vue: '#41b883', Shell: '#89e051', WebAssembly: '#654ff0',
};

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
  const languages = projectLanguages[project.slug] ?? [];
  // Tech items that have a factual role note - answers "why this language".
  const rolesShown = stacks
    .map((s) => ({ name: s, role: techRole(s, lang) }))
    .filter((r) => r.role);

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

        {/* Purpose / what & why */}
        <section className="detail-block">
          <h2 className="detail-block-title">{t('detail_purpose')}</h2>
          <p className="detail-purpose">{description}</p>
        </section>

        {stacks.length > 0 && (
          <section className="detail-block">
            <h2 className="detail-block-title">{t('detail_stack')}</h2>
            <StackChips items={stacks} />
          </section>
        )}

        {/* Real language composition, measured from the project source. */}
        {languages.length > 0 && (
          <section className="detail-block">
            <h2 className="detail-block-title">
              {t('detail_languages')}
              <span className="lang-count">{languages.length} {t('detail_lang_unit')}</span>
            </h2>
            <div className="lang-bar" role="img" aria-label={t('detail_languages')}>
              {languages.map((l) => (
                <span
                  key={l.name}
                  className="lang-bar-seg"
                  style={{ width: `${l.percent}%`, background: LANG_COLOR[l.name] ?? '#94a3b8' }}
                  title={`${l.name} ${l.percent}%`}
                />
              ))}
            </div>
            <ul className="lang-legend">
              {languages.map((l) => (
                <li key={l.name}>
                  <span className="lang-dot" style={{ background: LANG_COLOR[l.name] ?? '#94a3b8' }} />
                  <span className="lang-name">{l.name}</span>
                  <span className="lang-pct">{l.percent}%</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Why each technology - factual role of each */}
        {rolesShown.length > 0 && (
          <section className="detail-block">
            <h2 className="detail-block-title">{t('detail_why')}</h2>
            <ul className="tech-roles">
              {rolesShown.map(({ name, role }) => {
                const logo = techLogo(name);
                return (
                  <li key={name}>
                    <span className="tech-role-head">
                      {logo && <img src={logo} alt="" aria-hidden="true" />}
                      <strong>{name}</strong>
                    </span>
                    <span className="tech-role-desc">{role}</span>
                  </li>
                );
              })}
            </ul>
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

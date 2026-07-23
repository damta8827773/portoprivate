import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '@damta/types';
import { PageShell } from '../components/layout/PageShell';
import { useProjects } from '../hooks/useContent';
import { useI18n } from '../i18n/useI18n';
import { ProjectThumb } from '../components/ui/ProjectThumb';
import { StackChips } from '../components/ui/StackChips';

function ProjectGridCard({ project }: { project: Project }) {
  const { t, lang } = useI18n();
  const stacks = project.stacks ?? [];

  return (
    <article className="project-card border-beam">
      <div className="project-img">
        <ProjectThumb image={project.image} title={project.title} slug={project.slug} />
      </div>
      <div className="project-info">
        <h3>{project.title}</h3>
        <p>{lang === 'en' ? project.descEn : project.descId}</p>
        <StackChips items={stacks} />
        <Link to={`/projects/${project.slug}`} className="btn-view">
          <i className="ri-arrow-right-line arrow-icon" />
          <span className="btn-text">{t('detail_read')}</span>
        </Link>
      </div>
    </article>
  );
}

export function ProjectsPage() {
  const { t } = useI18n();
  const { data } = useProjects();
  const [query, setQuery] = useState('');

  const projects = data ?? [];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.stacks ?? []).some((s) => s.toLowerCase().includes(q)),
    );
  }, [projects, query]);

  return (
    <PageShell title={t('project_title')} description={t('page_projects_desc')}>
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

      {filtered.length === 0 ? (
        <p className="empty-state">{t('empty_result')}</p>
      ) : (
        <div className="project-grid">
          {filtered.map((p) => (
            <ProjectGridCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </PageShell>
  );
}

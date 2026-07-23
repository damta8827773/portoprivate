import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n/useI18n';
import { useProjects } from '../../hooks/useContent';
import { ProjectThumb } from '../../components/ui/ProjectThumb';
import { StackChips } from '../../components/ui/StackChips';
import type { Project } from '@damta/types';

function ProjectCard({ project, extra }: { project: Project; extra: boolean }) {
  const { t, lang } = useI18n();
  const desc = lang === 'en' ? project.descEn : project.descId;
  return (
    <div className={`project-card border-beam hidden${extra ? ' project-extra show' : ''}`}>
      <div className="project-img">
        <ProjectThumb image={project.image} title={project.title} slug={project.slug} />
      </div>
      <div className="project-info">
        <h3>{project.title}</h3>
        <p>{desc}</p>
        <StackChips items={project.stacks ?? []} />
        <div className="project-card-actions">
          <a href={project.url} target="_blank" rel="noreferrer" className="btn-view">
            <i className="ri-arrow-right-line arrow-icon" /> <span className="btn-text">{t('btn_view')}</span>
          </a>
          <Link to={`/projects/${project.slug}`} className="btn-view btn-view-ghost">
            <i className="ri-file-list-3-line arrow-icon" />{' '}
            <span className="btn-text">{t('detail_read')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const { t } = useI18n();
  const { data } = useProjects();
  const [expanded, setExpanded] = useState(false);

  const projects = data ?? [];
  // UI FIX #5 - first 6 always shown, the rest revealed via "See More".
  const featured = projects.filter((p) => p.featured);
  const extra = projects.filter((p) => !p.featured);

  return (
    <section id="projects">
      <h2 className="hidden neon-title-blue">{t('project_title')}</h2>
      <div className="project-grid">
        {featured.map((p) => (
          <ProjectCard key={p.id} project={p} extra={false} />
        ))}
        {expanded && extra.map((p) => <ProjectCard key={p.id} project={p} extra />)}
      </div>

      <div className="see-more-wrap" id="seeMoreWrap">
        {extra.length > 0 && (
          <button
            className={`btn-see-more${expanded ? ' expanded' : ''}`}
            id="btnSeeMore"
            onClick={() => setExpanded((e) => !e)}
          >
            <span>{expanded ? t('see_less') : t('see_more')}</span>
            <i className={expanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} id="seeMoreIcon" />
          </button>
        )}
        <Link to="/projects" className="btn-see-more">
          <span>{t('back_projects')}</span>
          <i className="ri-arrow-right-line" />
        </Link>
      </div>
    </section>
  );
}

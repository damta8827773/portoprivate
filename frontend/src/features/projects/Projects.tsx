import { useState } from 'react';
import { useI18n } from '../../i18n/useI18n';
import { useProjects } from '../../hooks/useContent';
import type { Project } from '@damta/types';

function ProjectCard({ project, extra }: { project: Project; extra: boolean }) {
  const { t, lang } = useI18n();
  const desc = lang === 'en' ? project.descEn : project.descId;
  return (
    <div className={`project-card border-beam hidden${extra ? ' project-extra show' : ''}`}>
      <div className="project-img">
        <img
          src={`/assets/img/${project.image.replace('assets/img/', '')}`}
          alt={project.title}
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
      </div>
      <div className="project-info">
        <h3>{project.title}</h3>
        <p>{desc}</p>
        <a href={project.url} target="_blank" rel="noreferrer" className="btn-view">
          <i className="ri-arrow-right-line arrow-icon" /> <span className="btn-text">{t('btn_view')}</span>
        </a>
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

      {extra.length > 0 && (
        <div className="see-more-wrap" id="seeMoreWrap">
          <button
            className={`btn-see-more${expanded ? ' expanded' : ''}`}
            id="btnSeeMore"
            onClick={() => setExpanded((e) => !e)}
          >
            <span>{expanded ? t('see_less') : t('see_more')}</span>
            <i className={expanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} id="seeMoreIcon" />
          </button>
        </div>
      )}
    </section>
  );
}

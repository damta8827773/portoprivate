import { useMemo, useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { StackChips } from '../components/ui/StackChips';
import { useI18n } from '../i18n/useI18n';
import { assetUrl } from '../lib/assetUrl';
import { buildLog } from '../data/buildLog';

const ALL = '__all__';

/**
 * Build Log — a filterable timeline of how each system was built.
 * Content lives in src/data/buildLog.ts so it can be edited without touching
 * this component.
 */
export function BuildLogPage() {
  const { t, lang } = useI18n();
  const [project, setProject] = useState(ALL);

  const projects = useMemo(
    () => Array.from(new Set(buildLog.map((e) => e.project))).sort(),
    [],
  );

  const entries = useMemo(
    () => (project === ALL ? buildLog : buildLog.filter((e) => e.project === project)),
    [project],
  );

  return (
    <PageShell title={t('buildlog_title')} description={t('buildlog_desc')}>
      {projects.length > 1 && (
        <div className="filter-chips" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={project === ALL}
            className={`filter-chip${project === ALL ? ' active' : ''}`}
            onClick={() => setProject(ALL)}
          >
            {t('filter_all')}
          </button>
          {projects.map((p) => (
            <button
              key={p}
              type="button"
              role="tab"
              aria-selected={project === p}
              className={`filter-chip${project === p ? ' active' : ''}`}
              onClick={() => setProject(p)}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {entries.length === 0 ? (
        <p className="empty-state">{t('empty_result')}</p>
      ) : (
        <ol className="buildlog">
          {entries.map((e) => (
            <li className="buildlog-item" key={e.id}>
              <div className="buildlog-marker" aria-hidden="true" />
              <article className="buildlog-card">
                <header className="buildlog-head">
                  <span className="buildlog-project">{e.project}</span>
                  <time className="buildlog-date">{e.date}</time>
                </header>

                <h2 className="buildlog-title">{lang === 'en' ? e.titleEn : e.titleId}</h2>

                {e.image && (
                  <div className="buildlog-media">
                    <img
                      src={assetUrl(e.image)}
                      alt=""
                      loading="lazy"
                      onError={(ev) => ((ev.currentTarget as HTMLImageElement).style.display = 'none')}
                    />
                  </div>
                )}

                <p className="buildlog-body">{lang === 'en' ? e.bodyEn : e.bodyId}</p>

                {e.stacks && e.stacks.length > 0 && <StackChips items={e.stacks} />}

                {e.link && (
                  <a
                    className="btn-view btn-view-ghost buildlog-link"
                    href={e.link.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="ri-external-link-line arrow-icon" />
                    <span className="btn-text">{e.link.label}</span>
                  </a>
                )}
              </article>
            </li>
          ))}
        </ol>
      )}
    </PageShell>
  );
}

import { Link } from 'react-router-dom';
import type { TimelineEntry } from '@damta/types';
import { PageShell } from '../components/layout/PageShell';
import { useTimeline, useHistory, useSkills } from '../hooks/useContent';
import { useI18n } from '../i18n/useI18n';
import { assetUrl } from '../lib/assetUrl';
import { StackChips } from '../components/ui/StackChips';

/** Career entries use a briefcase icon; everything else is education. */
function isCareer(entry: TimelineEntry) {
  return entry.icon.includes('briefcase');
}

function TimelineList({ entries }: { entries: TimelineEntry[] }) {
  const { lang } = useI18n();

  return (
    <div className="about-timeline">
      {entries.map((entry) => (
        <article className="timeline-card active" key={entry.id}>
          <div className="timeline-icon">
            {entry.logo ? (
              <img
                src={assetUrl(entry.logo)}
                alt={entry.companyId}
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
              />
            ) : (
              <i className={entry.icon} />
            )}
          </div>
          <div className="timeline-info">
            <h4>{lang === 'en' ? entry.titleEn : entry.titleId}</h4>
            <span className="timeline-company">
              {lang === 'en' ? entry.companyEn : entry.companyId}
            </span>
            <span className="timeline-date">{lang === 'en' ? entry.dateEn : entry.dateId}</span>
            <p className="about-timeline-desc">
              {lang === 'en' ? entry.descEn : entry.descId}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function AboutPage() {
  const { t, lang } = useI18n();
  const { data: timeline } = useTimeline();
  const { data: history } = useHistory();
  const { data: skills } = useSkills();

  const entries = timeline ?? [];
  const career = entries.filter(isCareer);
  const education = entries.filter((e) => !isCareer(e));

  // Highest-rated skills stand in for a "core competencies" resume line.
  const topSkills = [...(skills ?? [])].sort((a, b) => b.level - a.level).slice(0, 10);

  return (
    <PageShell title={t('about_title_main')} description={t('about_bio_1')}>
      <div className="about-page">
        <section className="about-section">
          <h2 className="about-section-title">{t('bio_heading')}</h2>
          <div className="about-biography about-biography-page">
            <p>{t('about_bio_2')}</p>
            <p>{t('about_bio_3')}</p>
            <p>{t('about_bio_4')}</p>
            <p className="about-signoff">
              {t('about_bio_5')}
              <br />
              <strong>Damta Noviyan Muhamad Faiz</strong>
            </p>
          </div>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">
            <i className="ri-briefcase-4-fill" /> {t('about_career')}
          </h2>
          <TimelineList entries={career} />
        </section>

        <section className="about-section">
          <h2 className="about-section-title">
            <i className="ri-graduation-cap-fill" /> {t('about_education')}
          </h2>
          <TimelineList entries={education} />
        </section>

        <section className="about-section about-resume">
          <h2 className="about-section-title">
            <i className="ri-file-user-line" /> {t('about_resume')}
          </h2>
          <div className="resume-card">
            <dl className="resume-grid">
              <div>
                <dt>{t('label_role')}</dt>
                <dd>Full Stack Developer</dd>
              </div>
              <div>
                <dt>{t('label_loc')}</dt>
                <dd>Jakarta, Indonesia</dd>
              </div>
              <div>
                <dt>{t('label_guild')}</dt>
                <dd>UIN Syarif Hidayatullah Jakarta</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href="mailto:damtafaiz@gmail.com">damtafaiz@gmail.com</a>
                </dd>
              </div>
            </dl>

            <h3 className="resume-subhead">{t('skill_title')}</h3>
            <StackChips items={topSkills.map((skill) => skill.name)} />

            <div className="detail-actions">
              <button type="button" className="btn-view" onClick={() => window.print()}>
                <i className="ri-printer-line arrow-icon" />
                <span className="btn-text">{t('about_print')}</span>
              </button>
              <a
                href="https://www.linkedin.com/in/damta-faiz-955493221"
                target="_blank"
                rel="noreferrer"
                className="btn-view btn-view-ghost"
              >
                <i className="ri-linkedin-fill arrow-icon" />
                <span className="btn-text">LinkedIn</span>
              </a>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">
            <i className="ri-time-line" /> {t('history_title')}
          </h2>
          <Link to="/journey" className="btn-view btn-view-ghost" style={{ marginBottom: 20, display: 'inline-flex' }}>
            <i className="ri-history-line arrow-icon" />
            <span className="btn-text">{t('journey_title')}</span>
          </Link>
          {(history ?? []).map((item) => (
            <div className="history-item" key={item.id}>
              <div className="hist-img">
                <img
                  src={assetUrl(item.image)}
                  alt={item.year}
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />
              </div>
              <div className="hist-text">
                <h4>{item.year}</h4>
                <p>{lang === 'en' ? item.descEn : item.descId}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </PageShell>
  );
}

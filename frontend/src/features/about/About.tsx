import { useRef, useState } from 'react';
import { useI18n } from '../../i18n/useI18n';
import { useTimeline, useHistory } from '../../hooks/useContent';
import type { TimelineEntry } from '@damta/types';

function TimelineCard({ entry }: { entry: TimelineEntry }) {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);
  return (
    <div className={`timeline-card${open ? ' active' : ''}`} onClick={() => setOpen((o) => !o)}>
      <div className="timeline-icon">
        {entry.logo ? (
          <img
            src={`/assets/img/${entry.logo.replace('assets/img/', '')}`}
            alt={entry.companyId}
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              el.style.display = 'none';
              (el.nextElementSibling as HTMLElement).style.display = 'block';
            }}
          />
        ) : null}
        <i className={entry.icon} style={{ display: entry.logo ? 'none' : 'block' }} />
      </div>
      <div className="timeline-info">
        <h4>{lang === 'en' ? entry.titleEn : entry.titleId}</h4>
        <span className="timeline-company">{lang === 'en' ? entry.companyEn : entry.companyId}</span>
        <span className="timeline-date">{lang === 'en' ? entry.dateEn : entry.dateId}</span>
        <div className="timeline-toggle-text">
          <span className="open-text" style={{ display: open ? 'none' : 'inline' }}>{t('show_detail')}</span>
          <span className="close-text" style={{ display: open ? 'inline' : 'none' }}>{t('hide_detail')}</span>
          <i className={`ri-arrow-down-s-line${open ? ' rotate' : ''}`} />
        </div>
        <div
          className="timeline-details"
          ref={detailRef}
          style={{ maxHeight: open ? detailRef.current?.scrollHeight ?? 500 : 0 }}
        >
          <p>{lang === 'en' ? entry.descEn : entry.descId}</p>
        </div>
      </div>
    </div>
  );
}

export function About() {
  const { t, lang } = useI18n();
  const { data: timeline } = useTimeline();
  const { data: history } = useHistory();
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <section id="about">
      <h2 className="hidden neon-title">{t('about_title_main')}</h2>

      <div className="visi-misi-container hidden">
        <div className="vm-card">
          <h3>{t('visi_title')}</h3>
          <p>{t('visi_desc')}</p>
        </div>
        <div className="vm-card">
          <h3>{t('misi_title')}</h3>
          <p>{t('misi_desc')}</p>
        </div>
      </div>

      <div className="about-us-container">
        <div className="about-us-header" onClick={() => setHistoryOpen((o) => !o)}>
          <div className="line" />
          <h3>{t('about_us')}</h3>
          <div className="line" />
        </div>

        <div id="historyPopup" className={`history-content${historyOpen ? ' active' : ''}`}>
          <div className="about-biography">
            <h3 style={{ color: 'var(--primary-neon)', marginBottom: 15, textAlign: 'left', width: '100%' }}>
              {t('bio_heading')}
            </h3>
            <p>{t('about_bio_1')}</p>
            <p>{t('about_bio_2')}</p>
            <p>{t('about_bio_3')}</p>
            <p>{t('about_bio_4')}</p>
            <p>{t('about_bio_5')}</p>
          </div>

          <div className="timeline-container">
            <h3 className="timeline-main-title">{t('career_title')}</h3>
            {(timeline ?? []).map((entry) => (
              <TimelineCard key={entry.id} entry={entry} />
            ))}
          </div>

          <h3 className="timeline-main-title" style={{ marginTop: 40, marginBottom: 20 }}>
            {t('history_title')}
          </h3>
          {(history ?? []).map((h) => (
            <div className="history-item" key={h.id}>
              <div className="hist-img">
                <img src={`/assets/img/${h.image.replace('assets/img/', '')}`} alt={h.year} />
              </div>
              <div className="hist-text">
                <h4>{h.year}</h4>
                <p>{lang === 'en' ? h.descEn : h.descId}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

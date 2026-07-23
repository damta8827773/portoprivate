import { useEffect, useMemo, useRef, useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { useHistory, useTimeline } from '../hooks/useContent';
import { useI18n } from '../i18n/useI18n';
import { assetUrl } from '../lib/assetUrl';

/**
 * Portfolio Time Machine: drag (or autoplay) through the years and watch the
 * story rebuild itself from the SAME data the rest of the site uses - history
 * entries and the career/education timeline. No duplicated content to keep in
 * sync; the page is just another lens over real records.
 */

/** "2022 - 2025 - Jakarta" / "2026 - Sekarang" -> active year range. */
function parseRange(text: string): { from: number; to: number } | null {
  const m = text.match(/(\d{4})\s*[-–]\s*(\d{4}|Sekarang|Present|Now)/i);
  if (!m) return null;
  const from = Number(m[1]);
  const to = /\d{4}/.test(m[2]) ? Number(m[2]) : new Date().getFullYear();
  return { from, to };
}

export function JourneyPage() {
  const { t, lang } = useI18n();
  const { data: history } = useHistory();
  const { data: timeline } = useTimeline();

  const entries = useMemo(
    () => [...(history ?? [])].sort((a, b) => a.year.localeCompare(b.year)),
    [history],
  );
  const years = entries.map((e) => Number(e.year));

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<number | null>(null);

  const clamped = Math.min(index, Math.max(entries.length - 1, 0));
  const active = entries[clamped];
  const activeYear = active ? Number(active.year) : years[0] ?? 0;

  // Autoplay: advance every 2.4s, stop at the final year.
  useEffect(() => {
    if (!playing) return;
    timer.current = window.setInterval(() => {
      setIndex((i) => {
        if (i >= entries.length - 1) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, 2400);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [playing, entries.length]);

  const activeMilestones = (timeline ?? []).filter((entry) => {
    const range = parseRange(lang === 'en' ? entry.dateEn : entry.dateId);
    return range ? activeYear >= range.from && activeYear <= range.to : false;
  });

  const progress =
    years.length > 1 ? ((clamped / (years.length - 1)) * 100).toFixed(1) : '0';

  if (!active) {
    return (
      <PageShell title={t('journey_title')} description={t('journey_desc')}>
        <p className="empty-state">{t('empty_result')}</p>
      </PageShell>
    );
  }

  return (
    <PageShell title={t('journey_title')} description={t('journey_desc')}>
      {/* Controls */}
      <div className="tm-controls">
        <button
          type="button"
          className="tm-play"
          onClick={() => {
            if (!playing && clamped >= entries.length - 1) setIndex(0);
            setPlaying((p) => !p);
          }}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          <i className={playing ? 'ri-pause-fill' : 'ri-play-fill'} />
        </button>

        <div className="tm-slider-wrap">
          <input
            type="range"
            min={0}
            max={Math.max(entries.length - 1, 0)}
            step={1}
            value={clamped}
            onChange={(e) => {
              setPlaying(false);
              setIndex(Number(e.target.value));
            }}
            aria-label={t('journey_title')}
            style={{ ['--tm-progress' as string]: `${progress}%` }}
          />
          <div className="tm-ticks">
            {entries.map((entry, i) => (
              <button
                key={entry.id}
                type="button"
                className={`tm-tick${i === clamped ? ' active' : ''}`}
                onClick={() => {
                  setPlaying(false);
                  setIndex(i);
                }}
              >
                {entry.year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Era panel - keyed by year so the entrance animation replays. */}
      <div className="tm-era" key={active.year}>
        <div className="tm-year-display" aria-hidden="true">
          {active.year}
        </div>

        <div className="tm-era-grid">
          <div className="tm-era-media">
            <img
              src={assetUrl(active.image)}
              alt={active.year}
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
          </div>

          <div className="tm-era-body">
            <p className="tm-era-desc">{lang === 'en' ? active.descEn : active.descId}</p>

            {activeMilestones.length > 0 && (
              <>
                <h2 className="detail-block-title" style={{ marginTop: 22 }}>
                  {t('journey_active')}
                </h2>
                <ul className="tm-milestones">
                  {activeMilestones.map((m) => (
                    <li key={m.id}>
                      <i className={m.icon} />
                      <span>
                        <strong>{lang === 'en' ? m.titleEn : m.titleId}</strong>
                        <small>{lang === 'en' ? m.companyEn : m.companyId}</small>
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

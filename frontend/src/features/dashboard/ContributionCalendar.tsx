import { useState } from 'react';
import type { ContributionCalendar as CalendarData } from '@damta/types';
import { useI18n } from '../../i18n/useI18n';

/** Same gold ramp damtaweb.com uses, with an empty-cell colour in front. */
const LEVEL_COLORS = ['transparent', '#ffffb8', '#ffff8a', '#ffd84d', '#D4AF37'];

const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

interface Props {
  data: CalendarData;
}

/**
 * GitHub contribution grid, rendered from our own API instead of the
 * third-party ghchart image - so it follows the theme and shows tooltips.
 */
export function ContributionCalendar({ data }: Props) {
  const { t, lang } = useI18n();
  const [hovered, setHovered] = useState<{ date: string; count: number } | null>(null);

  const locale = lang === 'en' ? 'en-US' : 'id-ID';
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return (
    <div className="contrib">
      <div className="contrib-head">
        <span className="contrib-total">
          <strong>{data.totalContributions.toLocaleString(locale)}</strong> {t('contrib_total')}
        </span>
        {!data.configured && (
          <span className="sample-badge" title={t('sample_data_note')}>
            <i className="ri-information-line" /> demo
          </span>
        )}
      </div>

      <div className="contrib-scroll">
        <div className="contrib-body">
          <ul className="contrib-days" aria-hidden="true">
            {DAY_LABELS.map((label, i) => (
              <li key={i}>{label}</li>
            ))}
          </ul>

          <div className="contrib-grid">
            {data.weeks.map((week) => (
              <div className="contrib-week" key={week.firstDay}>
                {week.days.map((day) => (
                  <span
                    key={day.date}
                    className={`contrib-cell${day.level === 0 ? ' empty' : ''}`}
                    style={{ background: LEVEL_COLORS[day.level] }}
                    onMouseEnter={() => setHovered({ date: day.date, count: day.count })}
                    onMouseLeave={() => setHovered(null)}
                    title={`${day.count} - ${day.date}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="contrib-foot">
        <span className="contrib-hint">
          {hovered
            ? `${hovered.count} ${t('contrib_on')} ${formatDate(hovered.date)}`
            : `${t('contrib_avg')}: ${data.averagePerDay}`}
        </span>
        <span className="contrib-legend">
          {t('contrib_less')}
          {LEVEL_COLORS.map((color, i) => (
            <span
              key={i}
              className={`contrib-cell${i === 0 ? ' empty' : ''}`}
              style={{ background: color }}
            />
          ))}
          {t('contrib_more')}
        </span>
      </div>
    </div>
  );
}

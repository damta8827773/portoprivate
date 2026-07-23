import { useEffect, useMemo, useState } from 'react';
import type {
  CodewarsStats,
  MonkeytypeStats,
  UmamiStats,
  WakatimeStats,
} from '@damta/types';
import { NumberTicker } from '../../components/ui/NumberTicker';
import { Chart, CHART_COLORS } from '../../components/ui/Chart';
import { StackChips, techLogo } from '../../components/ui/StackChips';
import { useI18n } from '../../i18n/useI18n';

/** Marks a card whose provider has no API key configured yet. */
function SampleBadge({ show }: { show: boolean }) {
  const { t } = useI18n();
  if (!show) return null;
  return (
    <span className="sample-badge" title={t('sample_data_note')}>
      <i className="ri-information-line" /> demo
    </span>
  );
}

/**
 * Animated percentage bar - the shape damtaweb.com uses for Wakatime:
 * label, rounded track, right-aligned percentage.
 */
function ProgressRow({ name, percent, color }: { name: string; percent: number; color: string }) {
  const [width, setWidth] = useState(0);

  // Grow from zero on mount so the bars sweep in like the reference site.
  useEffect(() => {
    const id = window.setTimeout(() => setWidth(percent), 120);
    return () => window.clearTimeout(id);
  }, [percent]);

  const logo = techLogo(name);

  return (
    <div className="progress-row">
      <span className="progress-name">
        {logo && <img src={logo} alt="" aria-hidden="true" loading="lazy" />}
        {name}
      </span>
      <span className="progress-track">
        <span className="progress-fill" style={{ width: `${width}%`, background: color }} />
      </span>
      <span className="progress-pct">{percent.toFixed(0)}%</span>
    </div>
  );
}

export function WakatimeCard({ stats }: { stats: WakatimeStats }) {
  const { t } = useI18n();
  const { last7Days } = stats;

  return (
    <div className="dash-card stat-card">
      <div className="dash-card-header">
        <i className="ri-timer-flash-line" />
        <span>{t('wakatime_title')}</span>
        <SampleBadge show={!stats.configured} />
      </div>

      <div className="gh-stats-grid">
        <div className="gh-stat-box">
          <span className="gh-stat-num gh-stat-text">{last7Days.total}</span>
          <span className="gh-stat-lab">{t('wakatime_total')}</span>
        </div>
        <div className="gh-stat-box">
          <span className="gh-stat-num gh-stat-text">{last7Days.dailyAverage}</span>
          <span className="gh-stat-lab">{t('wakatime_daily')}</span>
        </div>
        <div className="gh-stat-box">
          <span className="gh-stat-num gh-stat-text">{last7Days.bestDay?.text ?? '-'}</span>
          <span className="gh-stat-lab">{t('wakatime_best')}</span>
        </div>
        <div className="gh-stat-box">
          <span className="gh-stat-num gh-stat-text">{stats.allTimeText}</span>
          <span className="gh-stat-lab">{t('wakatime_alltime')}</span>
        </div>
      </div>

      <div className="progress-list">
        {last7Days.languages.map((lang, i) => (
          <ProgressRow
            key={lang.name}
            name={lang.name}
            percent={lang.percent}
            color={CHART_COLORS[i % CHART_COLORS.length]}
          />
        ))}
      </div>

      {last7Days.editors.length > 0 && (
        <>
          <div className="dash-subhead">{t('wakatime_editors')}</div>
          <StackChips
            items={last7Days.editors.map((e) => `${e.name} - ${e.percent.toFixed(1)}%`)}
          />
        </>
      )}
    </div>
  );
}

export function CodewarsCard({ stats }: { stats: CodewarsStats }) {
  const { t } = useI18n();

  // Honor score per language - a horizontal bar reads better than a pie here.
  const languageChart = useMemo(
    () => ({
      type: 'bar' as const,
      data: {
        labels: stats.languages.map((l) => l.name),
        datasets: [
          {
            label: t('codewars_honor'),
            data: stats.languages.map((l) => l.score),
            backgroundColor: 'rgba(167,139,250,0.75)',
            hoverBackgroundColor: 'rgba(167,139,250,1)',
            borderRadius: 6,
            borderSkipped: false as const,
            barPercentage: 0.6,
          },
        ],
      },
      options: { indexAxis: 'y' as const },
    }),
    [stats.languages, t],
  );

  return (
    <div className="dash-card stat-card">
      <div className="dash-card-header">
        <i className="ri-sword-line" />
        <span>{t('codewars_title')}</span>
        <SampleBadge show={!stats.configured} />
      </div>

      <div className={`codewars-rank rank-${stats.rankColor}`}>{stats.rankName}</div>

      <div className="gh-stats-grid">
        <div className="gh-stat-box">
          <span className="gh-stat-num">
            <NumberTicker value={stats.honor} />
          </span>
          <span className="gh-stat-lab">{t('codewars_honor')}</span>
        </div>
        <div className="gh-stat-box">
          <span className="gh-stat-num">
            <NumberTicker value={stats.totalCompleted} />
          </span>
          <span className="gh-stat-lab">{t('codewars_solved')}</span>
        </div>
        <div className="gh-stat-box">
          <span className="gh-stat-num gh-stat-text">#{stats.leaderboardPosition ?? '-'}</span>
          <span className="gh-stat-lab">{t('codewars_leaderboard')}</span>
        </div>
        <div className="gh-stat-box">
          <span className="gh-stat-num gh-stat-text">{stats.rankName}</span>
          <span className="gh-stat-lab">{t('codewars_rank')}</span>
        </div>
      </div>

      <Chart config={languageChart} aspectRatio={1.9} ariaLabel={t('codewars_title')} />
    </div>
  );
}

export function MonkeytypeCard({ stats }: { stats: MonkeytypeStats }) {
  const { t } = useI18n();
  const durations = Object.keys(stats.bestWpm).sort((a, b) => Number(a) - Number(b));
  const fastest = durations.reduce(
    (max, d) => Math.max(max, stats.bestWpm[d]?.wpm ?? 0),
    0,
  );

  // Personal-best WPM against accuracy, per test duration.
  const wpmChart = useMemo(
    () => ({
      type: 'bar' as const,
      data: {
        labels: durations.map((d) => `${d}s`),
        datasets: [
          {
            label: 'WPM',
            data: durations.map((d) => stats.bestWpm[d].wpm),
            backgroundColor: 'rgba(212,175,55,0.8)',
            hoverBackgroundColor: 'rgba(212,175,55,1)',
            borderRadius: 6,
            borderSkipped: false as const,
            barPercentage: 0.55,
          },
          {
            label: t('monkeytype_acc'),
            data: durations.map((d) => stats.bestWpm[d].accuracy),
            backgroundColor: 'rgba(96,165,250,0.55)',
            hoverBackgroundColor: 'rgba(96,165,250,0.9)',
            borderRadius: 6,
            borderSkipped: false as const,
            barPercentage: 0.55,
          },
        ],
      },
      options: { plugins: { legend: { display: true, position: 'bottom' as const } } },
    }),
    [durations, stats.bestWpm, t],
  );

  return (
    <div className="dash-card stat-card">
      <div className="dash-card-header">
        <i className="ri-keyboard-box-line" />
        <span>{t('monkeytype_title')}</span>
        <SampleBadge show={!stats.configured} />
      </div>

      <div className="visitor-big-num primary-neon-shadow">
        <NumberTicker value={fastest} />
        <small className="wpm-unit">wpm</small>
      </div>

      <Chart config={wpmChart} aspectRatio={2.1} ariaLabel={t('monkeytype_title')} />

      <div className="wpm-grid">
        {durations.map((duration) => {
          const pb = stats.bestWpm[duration];
          return (
            <div className="wpm-item" key={duration}>
              <span className="wpm-duration">{duration}s</span>
              <span className="wpm-value">{pb.wpm}</span>
              <span className="wpm-acc">
                {pb.accuracy.toFixed(1)}% {t('monkeytype_acc')}
              </span>
            </div>
          );
        })}
      </div>

      <div className="visitor-mini-row">
        <div className="vm-item">
          <i className="ri-check-double-line" />
          <span>{stats.testsCompleted}</span>
          <small>{t('monkeytype_tests')}</small>
        </div>
        <div className="vm-divider" />
        <div className="vm-item">
          <i className="ri-time-line" />
          <span>{Math.round(stats.timeTyping / 3600)}h</span>
          <small>{t('wakatime_alltime')}</small>
        </div>
      </div>
    </div>
  );
}

export function UmamiCard({ stats }: { stats: UmamiStats }) {
  const { t } = useI18n();

  // Stacked sessions + pageviews, mirroring damtaweb.com's TrafficTrendsChart.
  const trafficChart = useMemo(
    () => ({
      type: 'bar' as const,
      data: {
        labels: stats.pageviews.map((p) => p.x.slice(5)),
        datasets: [
          {
            label: t('umami_visits'),
            data: stats.sessions.map((p) => p.y),
            backgroundColor: 'rgba(255, 235, 150, 0.75)',
            stack: 'traffic',
            borderRadius: 4,
          },
          {
            label: t('umami_pageviews'),
            data: stats.pageviews.map((p) => p.y),
            backgroundColor: 'rgba(212, 175, 55, 0.85)',
            stack: 'traffic',
            borderRadius: 4,
          },
        ],
      },
      options: {
        interaction: { mode: 'index' as const, intersect: false },
        plugins: {
          legend: {
            display: true,
            position: 'top' as const,
            labels: { usePointStyle: true, boxWidth: 8 },
          },
        },
        scales: {
          x: { stacked: true, grid: { display: false } },
          y: { stacked: true, beginAtZero: true },
        },
      },
    }),
    [stats.pageviews, stats.sessions, t],
  );

  return (
    <div className="dash-card stat-card">
      <div className="dash-card-header">
        <i className="ri-line-chart-line" />
        <span>{t('umami_title')}</span>
        <SampleBadge show={!stats.configured} />
      </div>

      <div className="gh-stats-grid">
        <div className="gh-stat-box">
          <span className="gh-stat-num">
            <NumberTicker value={stats.totals.pageviews} />
          </span>
          <span className="gh-stat-lab">{t('umami_pageviews')}</span>
        </div>
        <div className="gh-stat-box">
          <span className="gh-stat-num">
            <NumberTicker value={stats.totals.visitors} />
          </span>
          <span className="gh-stat-lab">{t('umami_visitors')}</span>
        </div>
        <div className="gh-stat-box">
          <span className="gh-stat-num">
            <NumberTicker value={stats.totals.visits} />
          </span>
          <span className="gh-stat-lab">{t('umami_visits')}</span>
        </div>
        <div className="gh-stat-box">
          <span className="gh-stat-num">
            <NumberTicker value={stats.totals.countries} />
          </span>
          <span className="gh-stat-lab">{t('umami_countries')}</span>
        </div>
      </div>

      <Chart config={trafficChart} aspectRatio={2.2} ariaLabel={t('umami_title')} />
    </div>
  );
}

import { useRef } from 'react';
import { useI18n } from '../../i18n/useI18n';
import { NumberTicker } from '../../components/ui/NumberTicker';
import { useGithub, useCountries } from '../../hooks/useContent';
import { useVisitorCounter } from '../../hooks/useVisitorCounter';
import { useContributions } from '../../hooks/useInsights';
import { useVisitorChart } from './useVisitorChart';
import { ContributionCalendar } from './ContributionCalendar';

const GH_USER = import.meta.env.VITE_GITHUB_USERNAME || 'damta8827773';

const LANG_COLORS: Record<string, string> = {
  JavaScript: '#f7df1e', TypeScript: '#3178c6', PHP: '#777bb4', HTML: '#e34f26',
  CSS: '#264de4', Python: '#3572a5', Java: '#b07219', 'C#': '#178600', C: '#555555',
  Vue: '#41b883', Go: '#00add8', Ruby: '#701516', Rust: '#dea584', Swift: '#f05138',
  Kotlin: '#a97bff', Shell: '#89e051', SCSS: '#c6538c', Dart: '#00b4ab',
};

interface DashboardProps {
  /** On /dashboard the section is the page - skip the scroll-reveal gate. */
  standalone?: boolean;
}

export function Dashboard({ standalone = false }: DashboardProps) {
  const { t } = useI18n();
  const { data: gh, isLoading: ghLoading } = useGithub();
  const { data: countries } = useCountries();
  const visitorCount = useVisitorCounter();
  const { data: contributions } = useContributions();
  const chartCanvas = useRef<HTMLCanvasElement>(null);
  const { filter, applyFilter } = useVisitorChart(chartCanvas);

  const langEntries = gh
    ? Object.entries(gh.languages).sort((a, b) => b[1] - a[1]).slice(0, 7)
    : [];
  const langTotal = langEntries.reduce((s, [, c]) => s + c, 0);

  return (
    <section id="dashboard" className={standalone ? 'dashboard-standalone' : 'hidden'}>
      {!standalone && <h2 className="neon-title">{t('dashboard_title')}</h2>}

      {/* Row 1: GitHub profile + visitor */}
      <div className="dash-top-row">
        <div className="dash-card stat-card">
          <div className="dash-card-header">
            <i className="ri-github-fill" />
            <span>GitHub Profile</span>
          </div>
          <div className="gh-profile-body">
            <img
              id="gh-avatar"
              src={gh?.profile.avatar_url || 'https://ui-avatars.com/api/?name=D&background=60a5fa&color=fff'}
              alt="GitHub Avatar"
              className="gh-avatar"
            />
            <div className="gh-info">
              <div className="gh-fullname">{gh?.profile.name || 'Damta Faiz'}</div>
              <div className="gh-bio-text">{gh?.profile.bio || 'Full Stack Developer'}</div>
              <a href={`https://github.com/${GH_USER}`} target="_blank" rel="noreferrer" className="gh-profile-link">
                <i className="ri-github-fill" /> @{GH_USER}
              </a>
            </div>
          </div>
          <div className="gh-stats-grid">
            <div className="gh-stat-box"><span className="gh-stat-num">{gh ? <NumberTicker value={gh.profile.public_repos} /> : '-'}</span><span className="gh-stat-lab">{t('dash_repos')}</span></div>
            <div className="gh-stat-box"><span className="gh-stat-num">{gh ? <NumberTicker value={gh.profile.followers} /> : '-'}</span><span className="gh-stat-lab">{t('dash_followers')}</span></div>
            <div className="gh-stat-box"><span className="gh-stat-num">{gh ? <NumberTicker value={gh.profile.following} /> : '-'}</span><span className="gh-stat-lab">{t('dash_following')}</span></div>
            <div className="gh-stat-box"><span className="gh-stat-num">{gh ? <NumberTicker value={gh.totalStars} /> : '-'}</span><span className="gh-stat-lab">{t('dash_stars')}</span></div>
          </div>
        </div>

        <div className="dash-card stat-card visitor-dash-card">
          <div className="dash-card-header">
            <i className="ri-eye-line" />
            <span>{t('visitor_title')}</span>
          </div>
          <div className="visitor-big-num primary-neon-shadow" id="visitor-count">
            {visitorCount === null ? <i className="ri-loader-4-line ri-spin" /> : <NumberTicker value={visitorCount} pad={5} durationMs={2000} />}
          </div>
          <div className="visitor-label">{t('visitor_desc')}</div>
          <div className="visitor-mini-row">
            <div className="vm-item"><i className="ri-calendar-check-line" /><span>2025</span><small>Launch</small></div>
            <div className="vm-divider" />
            <div className="vm-item"><i className="ri-earth-line" /><span>3+</span><small>{t('dash_negara')}</small></div>
            <div className="vm-divider" />
            <div className="vm-item"><i className="ri-flashlight-line" /><span>Live</span><small>Real-time</small></div>
          </div>
        </div>
      </div>

      {/* Row 2: recent repositories */}
      <div className="dash-card stat-card repos-dash-card">
        <div className="dash-card-header">
          <i className="ri-folder-open-line" />
          <span>{t('dash_repos_header')}</span>
          <a href={`https://github.com/${GH_USER}?tab=repositories`} target="_blank" rel="noreferrer" className="dash-view-all">
            <span>{t('dash_view_all')}</span> <i className="ri-external-link-line" />
          </a>
        </div>
        <div className="gh-repos-grid">
          {ghLoading || !gh ? (
            <p className="repo-loading"><i className="ri-loader-4-line ri-spin" /> {t('dash_loading_repos')}</p>
          ) : (
            gh.repos.map((repo) => {
              const color = LANG_COLORS[repo.language || ''] || '#888';
              return (
                <a key={repo.name} href={repo.html_url} target="_blank" rel="noreferrer" className="repo-card">
                  <div className="repo-card-name"><i className="ri-git-repository-line" />{repo.name}</div>
                  <div className="repo-card-desc">{repo.description || 'Tidak ada deskripsi.'}</div>
                  <div className="repo-card-meta">
                    {repo.language && (<span><span className="repo-lang-dot" style={{ background: color }} /> {repo.language}</span>)}
                    <span><i className="ri-star-line" /> {repo.stargazers_count}</span>
                    <span><i className="ri-git-branch-line" /> {repo.forks_count}</span>
                  </div>
                </a>
              );
            })
          )}
        </div>
      </div>

      {/* Row 3: contribution chart + languages */}
      <div className="dash-bottom-row">
        <div className="dash-card stat-card">
          <div className="dash-card-header">
            <i className="ri-bar-chart-grouped-line" />
            <span>{t('contrib_title')}</span>
          </div>
          <ContributionCalendar data={contributions} />
        </div>

        <div className="dash-card stat-card">
          <div className="dash-card-header">
            <i className="ri-code-s-slash-line" />
            <span>{t('dash_languages')}</span>
          </div>
          <div className="gh-langs-list">
            {!gh || !langTotal ? (
              <p className="repo-loading"><i className="ri-loader-4-line ri-spin" /> {t('dash_loading_data')}</p>
            ) : (
              langEntries.map(([lang, count]) => {
                const pct = Math.round((count / langTotal) * 100);
                const color = LANG_COLORS[lang] || '#94a3b8';
                return (
                  <div className="lang-item" key={lang}>
                    <div className="lang-item-header">
                      <span className="lang-name"><span className="repo-lang-dot" style={{ background: color }} />{lang}</span>
                      <span className="lang-pct">{pct}%</span>
                    </div>
                    <div className="lang-bar-bg">
                      <div className="lang-bar-fill grow-in" style={{ background: color, ['--target-w' as string]: `${pct}%` }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Row 4+5: country demographics + visitor chart - SIDE BY SIDE (UI fix #6) */}
      <div className="dash-side-row">
        <div className="dash-card stat-card">
          <div className="dash-card-header">
            <i className="ri-earth-line" />
            <span>{t('country_title')}</span>
          </div>
          <p className="stat-desc" style={{ marginBottom: 16, fontSize: '0.82rem', textAlign: 'left' }}>
            {t('country_desc')}
          </p>
          <div className="demo-globe" aria-hidden="true" />
          {(countries ?? []).length === 0 && (
            <p className="stat-desc" style={{ fontSize: '0.8rem' }}>{t('country_empty')}</p>
          )}
          <div className="country-list">
            {(countries ?? []).map((c) => (
              <div className="country-item" key={c.id}>
                <div className="country-info">
                  <span className="country-name">{c.flag} {c.name}</span>
                  <span className="country-count">{c.percentage}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${c.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-card stat-card visitor-chart-card">
          <div className="dash-card-header">
            <i className="ri-bar-chart-2-line" />
            <span>{t('visitor_chart_title')}</span>
            <div className="vcf-filter">
              {(['all', 'desktop', 'mobile'] as const).map((f) => (
                <button key={f} className={`vcf-btn${filter === f ? ' active' : ''}`} data-filter={f} onClick={() => applyFilter(f)}>
                  {f === 'all' ? 'Semua' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="visitor-chart-wrap">
            <canvas ref={chartCanvas} id="visitorBarChart" />
          </div>
        </div>
      </div>
    </section>
  );
}

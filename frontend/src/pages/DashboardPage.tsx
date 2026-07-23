import { PageShell } from '../components/layout/PageShell';
import { Dashboard } from '../features/dashboard/Dashboard';
import {
  WakatimeCard,
  CodewarsCard,
  MonkeytypeCard,
  UmamiCard,
} from '../features/dashboard/InsightCards';
import { useInsights } from '../hooks/useInsights';
import { useI18n } from '../i18n/useI18n';

export function DashboardPage() {
  const { t } = useI18n();
  const { data } = useInsights();

  return (
    <PageShell title={t('dashboard_title')} description={t('page_dashboard_desc')}>
      <div className="dash-insight-grid">
        <WakatimeCard stats={data.wakatime} />
        <CodewarsCard stats={data.codewars} />
        <MonkeytypeCard stats={data.monkeytype} />
        <UmamiCard stats={data.umami} />
      </div>

      {/* The GitHub / visitor / demographics blocks already live in this section. */}
      <Dashboard standalone />
    </PageShell>
  );
}

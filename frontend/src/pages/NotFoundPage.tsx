import { Link } from 'react-router-dom';
import { PageShell } from '../components/layout/PageShell';
import { useI18n } from '../i18n/useI18n';

/** The 404 body on its own, so detail pages can reuse it inside their shell. */
export function NotFoundBody() {
  const { t } = useI18n();
  return (
    <div className="empty-state">
      <p>{t('not_found_desc')}</p>
      <Link to="/" className="btn-view">
        <i className="ri-home-4-line arrow-icon" />
        <span className="btn-text">{t('back_home')}</span>
      </Link>
    </div>
  );
}

export function NotFoundPage() {
  const { t } = useI18n();
  return (
    <PageShell title={t('not_found_title')}>
      <NotFoundBody />
    </PageShell>
  );
}

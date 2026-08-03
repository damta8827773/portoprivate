import { PageShell } from '../components/layout/PageShell';
import { Profil } from '../features/profil/Profil';
import { Skills } from '../features/skills/Skills';
import { Stack } from '../features/stack/Stack';
import { Comments } from '../features/comments/Comments';
import { useI18n } from '../i18n/useI18n';

/**
 * Standalone pages for sections that also appear on the long home page, so the
 * site can be browsed page-by-page instead of one continuous scroll. Each one
 * reuses the exact same feature component - no duplicated markup to keep in
 * sync - wrapped in the shared page chrome.
 */

export function ProfilPage() {
  const { t } = useI18n();
  return (
    <PageShell title={t('profil_title')} description={t('profil_singkat')}>
      <div className="section-page">
        <Profil />
      </div>
    </PageShell>
  );
}

export function SkillsPage() {
  const { t } = useI18n();
  return (
    <PageShell title={t('skill_title')} description={t('page_skills_desc')}>
      <div className="section-page">
        <Skills />
        <Stack />
      </div>
    </PageShell>
  );
}

export function CommentsPage() {
  const { t } = useI18n();
  return (
    <PageShell title={t('comment_title')} description={t('page_comments_desc')}>
      <div className="section-page">
        <Comments />
      </div>
    </PageShell>
  );
}

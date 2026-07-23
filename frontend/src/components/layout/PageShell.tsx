import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useI18n } from '../../i18n/useI18n';

interface PageShellProps {
  title: string;
  description?: string;
  /** Overrides the default "back to home" link at the top of the page. */
  backTo?: { to: string; label: string };
  children: ReactNode;
}

/** Chrome shared by every sub-page: navbar, page header, footer, scroll reset. */
export function PageShell({ title, description, backTo, children }: PageShellProps) {
  const { t } = useI18n();

  // Sub-pages are entered from anywhere on the long home page - always start at the top.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [title]);

  const back = backTo ?? { to: '/', label: t('back_home') };

  return (
    <>
      <Navbar />
      <main className="page-shell">
        <Link to={back.to} className="page-back">
          <i className="ri-arrow-left-line" />
          <span>{back.label}</span>
        </Link>

        <header className="page-head">
          <h1 className="neon-title">{title}</h1>
          {description && <p className="page-head-desc">{description}</p>}
        </header>

        {children}
      </main>
      <Footer />
    </>
  );
}

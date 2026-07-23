import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Comments } from '../../features/comments/Comments';
import { useI18n } from '../../i18n/useI18n';

/**
 * Floating chat launcher, bottom-right (the macOS dock owns bottom-center).
 *
 * On the home page the full comments section already exists, so the button
 * scrolls to it instead of mounting a second Firestore listener.
 */
export function ChatWidget() {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const isHome = pathname === '/';

  // Never leave the panel open across a route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes the panel, matching the command palette's behaviour.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const handleClick = () => {
    if (isHome) {
      document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setOpen((o) => !o);
  };

  return (
    <>
      {open && !isHome && (
        <div className="chat-widget-panel" role="dialog" aria-label={t('comment_title')}>
          <div className="chat-widget-head">
            <span>
              <i className="ri-chat-3-line" /> {t('comment_title')}
            </span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Tutup">
              <i className="ri-close-line" />
            </button>
          </div>
          <div className="chat-widget-scroll">
            <Comments variant="widget" />
          </div>
        </div>
      )}

      <button
        type="button"
        className={`chat-widget-btn${open ? ' active' : ''}`}
        onClick={handleClick}
        aria-expanded={open}
        title={t('comment_title')}
      >
        <i className={open && !isHome ? 'ri-close-line' : 'ri-chat-3-fill'} />
      </button>
    </>
  );
}

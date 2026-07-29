import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n/useI18n';
import { useAppStore } from '../../store/useAppStore';
import type { TranslationKey } from '../../i18n/translations';

interface NavItem {
  /** "#id" scrolls to a home section; "/path" opens a dedicated page. */
  href: string;
  /** Remix icon class - vector, so every item is guaranteed the exact same size
   *  (the old PNG logos had different internal padding and looked uneven). */
  icon: string;
  key: TranslationKey;
}

const NAV: NavItem[] = [
  { href: '#home', icon: 'ri-home-5-line', key: 'nav_home' },
  { href: '#profil', icon: 'ri-user-3-line', key: 'nav_profil' },
  { href: '#skill', icon: 'ri-code-s-slash-line', key: 'nav_skill' },
  { href: '/projects', icon: 'ri-folder-3-line', key: 'nav_project' },
  { href: '/achievements', icon: 'ri-medal-line', key: 'nav_cert' },
  { href: '#about', icon: 'ri-information-line', key: 'about_title_main' },
  { href: '/blog', icon: 'ri-article-line', key: 'nav_blog' },
  { href: '/dashboard', icon: 'ri-dashboard-3-line', key: 'dashboard_title' },
  { href: '#comments', icon: 'ri-chat-3-line', key: 'comment_title' },
  { href: '#contact', icon: 'ri-mail-line', key: 'nav_contact' },
];

export function Navbar() {
  const { t, lang, toggleLang } = useI18n();
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bursting, setBursting] = useState(false);
  const isHome = useLocation().pathname === '/';

  const onTheme = () => {
    toggleTheme();
    setBursting(false);
    requestAnimationFrame(() => {
      setBursting(true);
      setTimeout(() => setBursting(false), 550);
    });
  };

  const isDark = theme === 'dark';

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo-container">
            <img src="/assets/img/logo.png" alt="Logo Damta" />
          </div>
        </div>

        <div
          className={`hamburger${menuOpen ? ' active' : ''}`}
          id="hamburger"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </div>

        <div className={`nav-links${menuOpen ? ' active' : ''}`} id="navMenu">
          <ul>
            {NAV.map((item) => {
              // BKI-style bar shows uppercase text labels; the vector icon is
              // kept in the DOM (hidden by CSS) so nothing breaks if reverted.
              const icon = (
                <>
                  <i className={`nav-ico ${item.icon}`} aria-hidden="true" />
                  <span>{t(item.key)}</span>
                </>
              );
              const close = () => setMenuOpen(false);
              // Narrow desktop widths hide the label - keep it as a tooltip.
              const label = t(item.key);

              return (
                <li key={item.href} title={label}>
                  {item.href.startsWith('#') ? (
                    // Section anchors only resolve on the home page - from a
                    // sub-page, route home first and let Home scroll to the hash.
                    isHome ? (
                      <a href={item.href} onClick={close}>
                        {icon}
                      </a>
                    ) : (
                      <Link to={`/${item.href}`} onClick={close}>
                        {icon}
                      </Link>
                    )
                  ) : (
                    <Link to={item.href} onClick={close}>
                      {icon}
                    </Link>
                  )}
                </li>
              );
            })}

            <div className="controls">
              <button className="control-btn" onClick={toggleLang}>
                <i className="ri-global-line" /> <span id="lang-text">{lang.toUpperCase()}</span>
              </button>
              <button
                className={`theme-pill-btn${bursting ? ' bursting' : ''}`}
                id="themePillBtn"
                onClick={onTheme}
                aria-label="Ganti tema"
                role="switch"
                aria-checked={isDark}
              >
                <i className="ri-sun-line theme-pill-icon-bg tp-sun" />
                <i className="ri-moon-line theme-pill-icon-bg tp-moon" />
                <span className="theme-pill-thumb" id="themePillThumb">
                  <i id="theme-icon" className={isDark ? 'ri-moon-line' : 'ri-sun-line'} />
                </span>
              </button>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '../../i18n/useI18n';

interface CmdItem {
  group: string;
  icon: string;
  label: string;
  tag: string;
  target?: string;
  href?: string;
}

const ITEMS: CmdItem[] = [
  { group: 'Navigasi', icon: 'ri-home-4-line', label: 'Beranda', tag: '#home', target: 'home' },
  { group: 'Navigasi', icon: 'ri-user-3-line', label: 'Profil', tag: '#profil', target: 'profil' },
  { group: 'Navigasi', icon: 'ri-code-s-slash-line', label: 'Kemampuan & Tools', tag: '#skill', target: 'skill' },
  { group: 'Navigasi', icon: 'ri-folder-3-line', label: 'Proyek Unggulan', tag: '#projects', target: 'projects' },
  { group: 'Navigasi', icon: 'ri-award-line', label: 'Pencapaian & Sertifikat', tag: '#certificates', target: 'certificates' },
  { group: 'Navigasi', icon: 'ri-information-line', label: 'Visi Misi & Tentang', tag: '#about', target: 'about' },
  { group: 'Navigasi', icon: 'ri-terminal-box-line', label: 'Full Stack Architecture', tag: '#stack', target: 'stack' },
  { group: 'Navigasi', icon: 'ri-bar-chart-line', label: 'Dasbor Statistik', tag: '#dashboard', target: 'dashboard' },
  { group: 'Navigasi', icon: 'ri-chat-3-line', label: 'Ruang Obrolan', tag: '#comments', target: 'comments' },
  { group: 'Navigasi', icon: 'ri-phone-line', label: 'Kontak', tag: '#contact', target: 'contact' },
  { group: 'Sosial', icon: 'ri-instagram-line', label: 'Instagram @tadamta_', tag: '↗', href: 'https://instagram.com/tadamta_' },
  { group: 'Sosial', icon: 'ri-linkedin-fill', label: 'LinkedIn', tag: '↗', href: 'https://www.linkedin.com/in/damta-faiz-955493221' },
  { group: 'Sosial', icon: 'ri-github-fill', label: 'GitHub damta8827773', tag: '↗', href: 'https://github.com/damta8827773' },
  { group: 'Sosial', icon: 'ri-mail-line', label: 'Email damtafaiz@gmail.com', tag: '↗', href: 'mailto:damtafaiz@gmail.com' },
  { group: 'Proyek', icon: 'ri-heart-line', label: 'Web Relationship', tag: '↗', href: 'https://najwaweb.site' },
  { group: 'Proyek', icon: 'ri-briefcase-line', label: 'Web Absensi Karyawan', tag: '↗', href: 'https://presensi.ecommercedamta.com/' },
  { group: 'Proyek', icon: 'ri-shopping-cart-line', label: 'Web Ecommerce', tag: '↗', href: 'https://api3.ecommercedamta.com/' },
  { group: 'Proyek', icon: 'ri-bank-card-line', label: 'Web Rangkum Bisnis', tag: '↗', href: 'https://financecreps.site/' },
];

export function CommandPalette() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return ITEMS;
    return ITEMS.filter(
      (it) => it.label.toLowerCase().includes(q) || it.group.toLowerCase().includes(q),
    );
  }, [query]);

  const close = () => {
    setOpen(false);
    setQuery('');
  };
  const exec = (item: CmdItem) => {
    if (item.target) {
      document.getElementById(item.target)?.scrollIntoView({ behavior: 'smooth' });
      close();
    } else if (item.href) {
      window.open(item.href, item.href.startsWith('mailto') ? '_self' : '_blank');
      close();
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      const el = document.activeElement?.tagName;
      if (e.key === '/' && !open && el !== 'INPUT' && el !== 'TEXTAREA') {
        e.preventDefault();
        setOpen(true);
        return;
      }
      if (!open) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (e.key === 'Enter') {
        if (filtered[active]) exec(filtered[active]);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, filtered, active]);

  useEffect(() => {
    if (open) {
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  let lastGroup = '';

  return (
    <>
      <div className="cmdK-hint" id="cmdKHint" title="Buka Command Palette" onClick={() => setOpen(true)}>
        <i className="ri-terminal-box-line" />
        <span>
          <kbd>Ctrl</kbd>+<kbd>K</kbd>
        </span>
      </div>

      <div
        id="cmdOverlay"
        className={`cmd-overlay${open ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="cmd-box">
          <div className="cmd-search-row">
            <i className="ri-search-line" />
            <input
              type="text"
              id="cmdSearch"
              ref={inputRef}
              placeholder={t('cmd_placeholder')}
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <kbd className="cmd-esc-key">ESC</kbd>
          </div>
          <ul className="cmd-list" id="cmdList" role="listbox">
            {filtered.map((item, idx) => {
              const showGroup = item.group !== lastGroup;
              lastGroup = item.group;
              return (
                <div key={item.label}>
                  {showGroup && <li className="cmd-group-label">{item.group}</li>}
                  <li
                    className={`cmd-item${idx === active ? ' active' : ''}`}
                    role="option"
                    aria-selected={idx === active}
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => exec(item)}
                  >
                    <i className={item.icon} />
                    <span>{item.label}</span>
                    <span className="cmd-tag">{item.tag}</span>
                  </li>
                </div>
              );
            })}
          </ul>
          <div className="cmd-footer-hint">
            <span>
              <kbd>↑</kbd>
              <kbd>↓</kbd> <span>{t('cmd_nav')}</span>
            </span>
            <span>
              <kbd>↵</kbd> <span>{t('cmd_select')}</span>
            </span>
            <span>
              <kbd>Esc</kbd> <span>{t('cmd_close')}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

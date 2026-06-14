import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Lang } from '../i18n/translations';

type Theme = 'light' | 'dark';

interface AppState {
  theme: Theme;
  lang: Lang;
  toggleTheme: () => void;
  toggleLang: () => void;
  setTheme: (t: Theme) => void;
}

/** Global UI state: theme + language, persisted to localStorage. */
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      lang: 'id',
      toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
      toggleLang: () => set((s) => ({ lang: s.lang === 'id' ? 'en' : 'id' })),
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'damta-ui' },
  ),
);

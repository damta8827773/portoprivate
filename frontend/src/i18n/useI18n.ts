import { useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';
import { translations, type TranslationKey } from './translations';

/** Reactive translation hook. `t(key)` returns the string for the active language. */
export function useI18n() {
  const lang = useAppStore((s) => s.lang);
  const toggleLang = useAppStore((s) => s.toggleLang);

  const t = useCallback(
    (key: TranslationKey) => translations[lang][key] ?? translations.id[key] ?? key,
    [lang],
  );

  return { lang, t, toggleLang };
}

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'zh' | 'pt' | 'es';

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const SUPPORTED_LANGUAGES: Language[] = ['en', 'zh', 'pt', 'es'];

/** The visitor's preferred language, if it is one we ship. */
export const getBrowserLanguage = (): Language => {
  if (typeof navigator === 'undefined') return 'en';

  const browserLang = navigator.language.split('-')[0] as Language;
  return SUPPORTED_LANGUAGES.includes(browserLang) ? browserLang : 'en';
};

/**
 * Language starts as `en` and is corrected after mount by `hydrateLanguage()`.
 *
 * The store must not read localStorage or `navigator` while the initial value
 * is computed: this is a static export, so the prerendered HTML is always
 * English, and a store that came up as `zh` would make the first client render
 * disagree with the server and throw away the hydrated markup. `skipHydration`
 * defers the persisted read for the same reason.
 */
export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => {
        set({ language });
      },
    }),
    {
      name: 'language-storage',
      skipHydration: true,
    }
  )
);

/**
 * Apply the stored or detected language. Call once from an effect, after
 * hydration has finished.
 */
export const hydrateLanguage = async (): Promise<void> => {
  // Check for a stored choice before rehydrating, so a visitor who deliberately
  // picked English is not overridden by a non-English browser locale.
  const hasStoredChoice =
    typeof localStorage !== 'undefined' && localStorage.getItem('language-storage') !== null;

  await useLanguageStore.persist.rehydrate();
  if (hasStoredChoice) return;

  const detected = getBrowserLanguage();
  if (detected !== useLanguageStore.getState().language) {
    useLanguageStore.getState().setLanguage(detected);
  }
};

interface ThemeState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
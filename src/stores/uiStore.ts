import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'zh' | 'pt' | 'es';

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

const getBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = navigator.language.split('-')[0] as Language;
  const supportedLanguages: Language[] = ['en', 'zh', 'pt', 'es'];
  
  return supportedLanguages.includes(browserLang) ? browserLang : 'en';
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: getBrowserLanguage(),
      setLanguage: (language) => {
        set({ language });
      },
    }),
    {
      name: 'language-storage',
    }
  )
);

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
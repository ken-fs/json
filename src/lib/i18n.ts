import en from '../locales/en.json';
import zh from '../locales/zh.json';

const translations = {
  en,
  zh,
} as const;

export type Language = 'en' | 'zh';
export type TranslationKey = keyof typeof en;

export function t(key: TranslationKey, language: Language = 'en'): string {
  const translation = translations[language] as unknown as Record<string, string>;
  return translation[key] || key;
}
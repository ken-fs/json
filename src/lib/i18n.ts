import en from '../locales/en.json';
import zh from '../locales/zh.json';

const translations: Record<string, Record<string, string>> = {
  en,
  zh,
};

export type Language = 'en' | 'zh';
export type TranslationKey = keyof typeof en;

export function t(key: TranslationKey, language: Language = 'en'): string {
  return translations[language][key] || key;
}
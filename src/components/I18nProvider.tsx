"use client";

import { useEffect, useState } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useLanguageStore, type Language } from '@/stores/uiStore';

import en from '../locales/en.json';
import zh from '../locales/zh.json';
import pt from '../locales/pt.json';
import es from '../locales/es.json';

const resources = {
  en: { translation: en },
  zh: { translation: zh },
  pt: { translation: pt },
  es: { translation: es },
};

let isInitialized = false;

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { language } = useLanguageStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
          resources,
          fallbackLng: 'en',
          debug: false,
          
          detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
          },

          interpolation: {
            escapeValue: false,
          },
        })
        .then(() => {
          isInitialized = true;
          setIsReady(true);
        });
    } else {
      setIsReady(true);
    }
  }, []);

  // 当 Zustand 语言状态改变时，更新 i18n
  useEffect(() => {
    if (isInitialized && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  // 在 i18n 初始化完成之前不渲染子组件
  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}
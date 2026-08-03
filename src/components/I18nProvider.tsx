"use client";

import { useEffect, useState } from "react";
import i18n from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { hydrateLanguage, useLanguageStore, type Language } from "@/stores/uiStore";

import en from "../locales/en.json";
import zh from "../locales/zh.json";
import pt from "../locales/pt.json";
import es from "../locales/es.json";

const resources = {
  en: { translation: en },
  zh: { translation: zh },
  pt: { translation: pt },
  es: { translation: es },
};

/**
 * Initialise i18next synchronously, in English, on both server and client.
 *
 * Two things depend on this being synchronous and English:
 *
 * 1. The site is a static export. This provider used to return `null` until an
 *    effect had run, so every prerendered page shipped an empty `<body>` — the
 *    pages had metadata but no crawlable content at all. Rendering on the first
 *    pass puts the real text into the exported HTML.
 * 2. Hydration has to match. The server can only produce English, so the
 *    client's first render must be English too. The visitor's own language is
 *    applied in an effect below, after hydration.
 *
 * `init()` completes synchronously here because the resources are bundled and
 * no async backend is configured. Language detection moved to the Zustand store
 * (which reads `navigator.language` and localStorage) so this stays sync.
 */
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    debug: false,
    interpolation: { escapeValue: false },
    // Suspense would reintroduce the blank-render problem during export.
    react: { useSuspense: false },
  });
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { language } = useLanguageStore();
  // i18n is not React state, so track the applied language to trigger the
  // re-render that swaps translated strings in after hydration.
  const [, setActiveLanguage] = useState<Language>("en");

  // Read the stored/detected language only after hydration, so the first client
  // render still matches the English HTML the export produced.
  useEffect(() => {
    void hydrateLanguage();
  }, []);

  useEffect(() => {
    if (i18n.language === language) return;
    void i18n.changeLanguage(language).then(() => setActiveLanguage(language));
  }, [language]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

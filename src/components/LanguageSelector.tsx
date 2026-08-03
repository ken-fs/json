"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguageStore, type Language } from "@/stores/uiStore";
import { LOCALE_FOR_LANGUAGE, wikiPathForLocale } from "@/lib/wikiMeta";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "es", name: "Español", flag: "🇪🇸" },
] as const;

export function LanguageSelector() {
  const { language, setLanguage } = useLanguageStore();
  const router = useRouter();
  const pathname = usePathname();

  /**
   * Everywhere but the wiki, the language is a store value and the URL never
   * changes. The wiki has real per-locale URLs, so switching there has to
   * navigate — see `wikiPathForLocale`, which owns the rewrite.
   */
  const handleLanguageChange = (value: string) => {
    const newLanguage = value as Language;
    setLanguage(newLanguage);

    if (pathname.startsWith("/wiki")) {
      router.push(wikiPathForLocale(pathname, LOCALE_FOR_LANGUAGE[newLanguage]));
    }
  };

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === language) || languages[0];
  };

  return (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="h-10 w-[132px] rounded-md border-[#d9d9d5] bg-white shadow-none sm:w-[148px]">
        <div className="flex items-center space-x-2">
          <Languages className="h-4 w-4" />
          <SelectValue>
            <div className="flex items-center space-x-2">
              <span>{getCurrentLanguage().flag}</span>
              <span className="hidden sm:inline">
                {getCurrentLanguage().name}
              </span>
            </div>
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <div className="flex items-center space-x-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

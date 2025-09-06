"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguageStore, type Language } from "@/stores/uiStore";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "es", name: "Español", flag: "🇪🇸" },
] as const;

export function LanguageSelector() {
  const { language, setLanguage } = useLanguageStore();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
  };

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === language) || languages[0];
  };

  return (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[220px]">
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

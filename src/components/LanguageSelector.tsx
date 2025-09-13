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

  const handleLanguageChange = (value: string) => {
    const newLanguage = value as Language;
    setLanguage(newLanguage);
    
    // Handle wiki route language switching
    if (pathname.startsWith('/wiki')) {
      let newPath = pathname;
      
      // If currently on wiki main page
      if (pathname === '/wiki') {
        // Chinese wiki
        if (newLanguage === 'zh') {
          newPath = '/wiki';
        } else {
          newPath = `/wiki/${newLanguage}`;
        }
      } else if (pathname.startsWith('/wiki/')) {
        // Extract the current language and remaining path
        const pathParts = pathname.split('/');
        const currentLang = pathParts[2]; // e.g., 'en', 'pt', 'es'
        
        if (['en', 'pt', 'es'].includes(currentLang)) {
          // Currently on a localized wiki page
          const remainingPath = pathParts.slice(3).join('/');
          
          if (newLanguage === 'zh') {
            newPath = remainingPath ? `/wiki/${remainingPath}` : '/wiki';
          } else {
            newPath = remainingPath ? `/wiki/${newLanguage}/${remainingPath}` : `/wiki/${newLanguage}`;
          }
        } else {
          // Currently on Chinese wiki page (no language prefix)
          const remainingPath = pathParts.slice(2).join('/');
          
          if (newLanguage === 'zh') {
            newPath = `/wiki/${remainingPath}`;
          } else {
            newPath = `/wiki/${newLanguage}/${remainingPath}`;
          }
        }
      }
      
      router.push(newPath);
    }
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

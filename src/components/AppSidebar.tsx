"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { CATEGORY_ORDER, toolsByCategory, type ToolCategory } from "@/lib/tools";
import {
  ArrowPathRoundedSquareIcon,
  BookOpenIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

/** English fallbacks for the category headings until locales define them. */
const CATEGORY_FALLBACK: Record<ToolCategory, string> = {
  format: "Formats",
  data: "Tabular",
  code: "Code",
};

export default function AppSidebar() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const linkClass = (active: boolean) =>
    `flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] font-medium transition-colors ${
      active
        ? "bg-[#edf3ff] text-[#1261ff]"
        : "text-[#3e4147] hover:bg-[#f0f0ec] hover:text-[#141414]"
    }`;

  return (
    <aside className="hidden w-[208px] shrink-0 flex-col border-r border-[#dedede] bg-[#fbfbf8] lg:flex">
      <Link
        href="/"
        className="flex h-24 shrink-0 items-center px-7 text-[28px] font-black tracking-[-0.06em] text-[#141414]"
        aria-label="JSON1 home"
      >
        JSON<span className="text-[#95ee1c]">1</span>
      </Link>

      {/* The catalogue is longer than the viewport on short screens, so the
          nav scrolls independently while the logo and footer links stay put. */}
      <nav
        className="flex-1 overflow-y-auto px-4 pb-4"
        aria-label={t("jsonTools", { defaultValue: "JSON Tools" })}
      >
        <Link href="/" className={linkClass(pathname === "/")}>
          <ArrowPathRoundedSquareIcon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
          <span>{t("tools.jsonFormatter.label")}</span>
        </Link>

        <Link href="/tools/" className={`mt-1 ${linkClass(pathname === "/tools")}`}>
          <Squares2X2Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
          <span>{t("allTools", { defaultValue: "All tools" })}</span>
        </Link>

        {CATEGORY_ORDER.map((category) => (
          <div key={category} className="mt-5">
            <h2 className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a9da3]">
              {t(`categories.${category}`, { defaultValue: CATEGORY_FALLBACK[category] })}
            </h2>
            <ul>
              {toolsByCategory(category).map((tool) => (
                <li key={tool.id}>
                  <Link
                    href={`/${tool.id}`}
                    className={linkClass(pathname === `/${tool.id}`)}
                  >
                    <span className="truncate">
                      {t(`tools.${tool.id}.short`, {
                        defaultValue: `${tool.inputLabel} → ${tool.outputLabel}`,
                      })}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* One link to the wiki, not two. The header already offers Help, and the
          second entry here was labelled About while pointing at a guide. */}
      <div className="shrink-0 border-t border-[#e6e6e1] px-4 py-3">
        <Link
          href="/wiki/"
          className="flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] text-[#5d6067] hover:bg-[#f0f0ec] hover:text-[#141414]"
        >
          <BookOpenIcon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
          {t("guides", { defaultValue: "Guides" })}
        </Link>
      </div>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { CATEGORY_ORDER, TOOLS, toolsByCategory } from "@/lib/tools";

/**
 * English copy for the index, with the blurb that introduces each category.
 *
 * Lives here as `defaultValue` for the same reason as `src/lib/intros.ts`: every
 * locale is bundled into every page, so the server-rendered English does not
 * need to be duplicated into `en.json` as well.
 */
const CATEGORY_COPY: Record<string, { title: string; blurb: string }> = {
  format: {
    title: "Formats",
    blurb: "Move between JSON and the configuration formats it shares work with.",
  },
  data: {
    title: "Tabular data",
    blurb: "Flatten JSON into spreadsheet rows, or lift rows back into objects.",
  },
  code: {
    title: "Code generation",
    blurb:
      "Turn a JSON sample into typed models. Every record is inspected, so optional fields and mixed types are detected rather than guessed from the first item.",
  },
};

/**
 * Body of the tools index.
 *
 * A client component so it can call `t()`. The page was previously a server
 * component with its headings, blurbs, and card copy written inline in English,
 * which meant the language switcher changed the sidebar around it and left this
 * page untranslated.
 */
export default function ToolsIndex() {
  const { t } = useTranslation();
  const count = TOOLS.length + 1;

  return (
    <main className="flex-1 bg-[#f7f7f4] px-4 py-6 sm:px-6 lg:px-9 lg:py-7">
      <div className="mx-auto max-w-[1480px]">
        <header className="mb-9 max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#1261ff]">
            JSON1 / {t("allTools", { defaultValue: "All tools" })}
          </p>
          {/* The count is interpolated rather than baked into the string so the
              headline stays correct as tools are added, in every locale. */}
          <h1 className="text-[38px] font-black leading-none tracking-[-0.055em] text-[#111] sm:text-[52px]">
            {t("toolsIndex.heading", {
              count,
              defaultValue: "{{count}} tools, no uploads",
            })}
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#666a72] sm:text-base">
            {t("toolsIndex.intro", {
              defaultValue:
                "Every converter runs entirely in your browser. Your data never leaves the page, so you can paste production payloads without thinking twice.",
            })}
          </p>
        </header>

        <section className="mb-10 rounded-lg border border-[#d9d9d5] bg-white p-6 sm:p-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[#6f7279]">
            {t("toolsIndex.startHere", { defaultValue: "Start here" })}
          </p>
          <h2 className="mb-2 text-2xl font-black tracking-[-0.03em] text-[#111]">
            <Link href="/" className="hover:text-[#1261ff]">
              {t("toolsIndex.formatterTitle", {
                defaultValue: "JSON Formatter and Validator",
              })}
            </Link>
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-[#666a72]">
            {t("toolsIndex.formatterBlurb", {
              defaultValue:
                "Format, minify, validate, escape, and inspect JSON in a collapsible tree. The main workspace handles everything you do most often.",
            })}
          </p>
        </section>

        {CATEGORY_ORDER.map((category) => {
          const tools = toolsByCategory(category);
          if (tools.length === 0) return null;
          const copy = CATEGORY_COPY[category];

          return (
            <section key={category} className="mb-12">
              <div className="mb-4 border-b border-[#dedede] pb-3">
                <h2 className="text-xl font-black tracking-[-0.03em] text-[#111]">
                  {t(`toolsIndex.categories.${category}.title`, {
                    defaultValue: copy.title,
                  })}
                </h2>
                <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[#666a72]">
                  {t(`toolsIndex.categories.${category}.blurb`, {
                    defaultValue: copy.blurb,
                  })}
                </p>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {tools.map((tool) => (
                  <li key={tool.id}>
                    <Link
                      href={`/${tool.id}/`}
                      className="group flex h-full flex-col rounded-lg border border-[#d9d9d5] bg-white p-5 transition-colors hover:border-[#1261ff]"
                    >
                      {/* Format names are proper nouns, so they stay untranslated. */}
                      <span className="mb-2 flex items-center gap-2">
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8a8d93]">
                          {tool.inputLabel}
                        </span>
                        <span aria-hidden="true" className="text-[#95ee1c]">
                          →
                        </span>
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8a8d93]">
                          {tool.outputLabel}
                        </span>
                      </span>
                      <h3 className="mb-2 text-base font-bold tracking-[-0.01em] text-[#111] group-hover:text-[#1261ff]">
                        {t(`tools.${tool.id}.label`, { defaultValue: tool.label })}
                      </h3>
                      <p className="text-sm leading-6 text-[#666a72]">
                        {t(`tools.${tool.id}.description`, {
                          defaultValue: tool.description,
                        })}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <footer className="flex flex-col gap-2 border-t border-[#dedede] py-5 text-xs text-[#6f7279] sm:flex-row sm:items-center sm:justify-between">
          <span>JSON1 — {t("footerTagline")}</span>
          {/* `-my-2 py-2` lifts the tap target from 16px to 48px without moving
              the text: at 12px type the link was well under the 24px minimum. */}
          <Link
            href="/wiki/"
            className="-my-2 inline-flex items-center py-2 hover:text-[#1261ff]"
          >
            {t("toolsIndex.readGuides", { defaultValue: "Read the JSON guides" })} →
          </Link>
        </footer>
      </div>
    </main>
  );
}

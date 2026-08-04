"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useLanguageStore } from "@/stores/uiStore";
import { guideForTool, relatedTools } from "@/lib/tools";
import { LOCALE_FOR_LANGUAGE } from "@/lib/wikiMeta";

interface RelatedToolsProps {
  /** Tool id of the page this block sits on. */
  id: string;
}

/**
 * Sibling tools and the matching guide, below the intro.
 *
 * Every tool page used to be a leaf: the sidebar and the index pointed in, and
 * nothing pointed out. Search Console had 14 of them as "crawled, not indexed",
 * which is a page that was fetched and judged not worth keeping — and a page
 * that links onward to nothing gives a crawler no evidence it belongs to a
 * topic rather than sitting on its own.
 *
 * The reverse converter leads because it is also the link a reader wants: the
 * round trip is how you check a conversion did what you meant. `relatedTools`
 * rotates through the catalogue so the nine code pages do not all funnel into
 * the same three targets.
 */
export default function RelatedTools({ id }: RelatedToolsProps) {
  const { t } = useTranslation();
  const language = useLanguageStore((state) => state.language);
  const related = relatedTools(id);
  const guide = guideForTool(id);

  if (related.length === 0 && !guide) return null;

  const locale = LOCALE_FOR_LANGUAGE[language];

  return (
    <section className="mt-8 border-t border-[#dedede] pt-8" aria-labelledby={`related-${id}`}>
      <h2
        id={`related-${id}`}
        className="mb-4 text-xl font-black tracking-[-0.03em] text-[#111]"
      >
        {t("relatedTools", { defaultValue: "Related tools" })}
      </h2>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((tool) => (
          <li key={tool.id}>
            <Link
              href={`/${tool.id}/`}
              className="block h-full rounded-lg border border-[#e4e4df] bg-white px-4 py-3.5 transition-colors hover:border-[#1261ff]"
            >
              <span className="block text-sm font-bold text-[#141414]">
                {t(`tools.${tool.id}.label`, { defaultValue: tool.label })}
              </span>
              {/* Truncated to two lines: these are signposts, and the full
                  sentence is the first thing on the page they point at. */}
              <span className="mt-1 block line-clamp-2 text-[13px] leading-6 text-[#666a72]">
                {t(`tools.${tool.id}.description`, { defaultValue: tool.description })}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {guide ? (
        <p className="mt-4 text-sm leading-7 text-[#4c5057]">
          <Link
            href={`/wiki/${locale}/${guide}/`}
            className="font-semibold text-[#1261ff] hover:underline"
          >
            {t("readTheGuide", { defaultValue: "Read the guide" })}
          </Link>{" "}
          {t("guideHint", {
            defaultValue: "for the edge cases this converter cannot decide for you.",
          })}
        </p>
      ) : null}
    </section>
  );
}

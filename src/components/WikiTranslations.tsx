import Link from "next/link";
import { WIKI_LOCALES, type WikiLocale } from "@/lib/wikiMeta";

/**
 * Links an article to its three translations.
 *
 * Fixes a crawl-depth problem, not a UX one. `/wiki/{cn,es,pt}/<slug>/` had
 * exactly one inbound link each — its own locale index — which put 30 pages at
 * click depth 3 with a single link pointing at them. Search Console reported
 * those same 30 as "discovered, not indexed": found, queued, never worth
 * fetching. Cross-linking the four locales takes each one to 4 inbound links at
 * depth 2.
 *
 * The `hreflang` on each anchor says the same thing as the `<link>` tags in the
 * head. Repeating it here is not redundant — it tells a crawler what it will
 * get before it follows, and it makes the language switch legible to a screen
 * reader that would otherwise read four near-identical link texts.
 */

/** Endonyms. A reader looking for Portuguese scans for "Português", not "PT". */
const LANGUAGE_NAME: Record<WikiLocale, string> = {
  en: "English",
  cn: "中文",
  es: "Español",
  pt: "Português",
};

/** BCP-47 tags, matching the head's hreflang set exactly. */
const LANGUAGE_TAG: Record<WikiLocale, string> = {
  en: "en-US",
  cn: "zh-CN",
  es: "es-ES",
  pt: "pt-BR",
};

/** Section heading, in the language of the page it sits on. */
const HEADING: Record<WikiLocale, string> = {
  en: "Read this in another language",
  cn: "其他语言版本",
  es: "Leer en otro idioma",
  pt: "Ler em outro idioma",
};

interface WikiTranslationsProps {
  locale: WikiLocale;
  /** Article slug. The same slug is the path segment in all four locales. */
  slug: string;
}

export default function WikiTranslations({ locale, slug }: WikiTranslationsProps) {
  const others = WIKI_LOCALES.filter((l) => l !== locale);

  return (
    <section aria-labelledby="wiki-translations" className="mt-11 border-t border-[#dedede] pt-7">
      <h2
        id="wiki-translations"
        className="mb-4 text-[22px] font-black tracking-[-0.035em] text-[#111]"
      >
        {HEADING[locale]}
      </h2>
      <ul className="flex flex-wrap gap-x-6 gap-y-2.5">
        {others.map((other) => (
          <li key={other}>
            <Link
              href={`/wiki/${other}/${slug}/`}
              hrefLang={LANGUAGE_TAG[other]}
              lang={LANGUAGE_TAG[other]}
              className="text-[15px] font-semibold text-[#1261ff] hover:underline"
            >
              {LANGUAGE_NAME[other]}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

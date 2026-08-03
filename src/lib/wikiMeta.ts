import type { Metadata } from 'next';

/**
 * Metadata boilerplate for the wiki, which is the one part of the site with
 * real per-locale URLs.
 *
 * Three problems this exists to fix, all of which hit all 24 article pages:
 *
 * 1. **Canonical.** None of them set one, so they inherited `canonical: "/"`
 *    from the root layout and told Google that the homepage was their canonical
 *    URL — asking to be dropped from the index.
 * 2. **Doubled brand suffix.** Each title already ended in `| JSON Tools`, and
 *    the root layout's `template: "%s | JSON1"` appended a second suffix. Titles
 *    here are absolute, so no template applies.
 * 3. **hreflang.** Unlike the tool pages, `/wiki/{en,cn,es,pt}/<slug>/` really
 *    are four distinct URLs for the same article, so hreflang belongs here and
 *    only here.
 *
 * `modifiedTime` is a required argument rather than `new Date()`: the pages used
 * to stamp build time into `article:modified_time`, which claimed every article
 * was revised on every deploy.
 */

const SITE_URL = 'https://www.json1.org';

/** Directory names under `/wiki/`. `cn` is the legacy spelling of `zh`. */
export type WikiLocale = 'en' | 'cn' | 'es' | 'pt';

export const WIKI_LOCALES: WikiLocale[] = ['en', 'cn', 'es', 'pt'];

/**
 * The article catalogue: every slug, with the date it was last substantively
 * revised.
 *
 * Two things used to derive this list independently. `sitemap.ts` hardcoded the
 * six slugs while the tool routes next to it were derived from `TOOL_IDS`, so a
 * seventh article would have shipped 4 pages that no sitemap listed. And the
 * sitemap stamped `new Date()` on all 49 URLs, contradicting the real
 * `article:modified_time` on the pages themselves.
 *
 * `revised` is the honest answer to "when did this change", so bump it only when
 * the prose changes — not when the build runs. `tests/seo.verify.py` asserts the
 * sitemap's `lastmod` matches each page's `article:modified_time`, so the two
 * cannot drift apart silently.
 */
export const WIKI_ARTICLES = [
  { slug: 'json-guide', revised: '2026-08-03' },
  { slug: 'json-api-best-practices', revised: '2026-08-03' },
  { slug: 'json-validation', revised: '2026-08-03' },
  { slug: 'json-performance', revised: '2026-08-03' },
  { slug: 'json-to-typescript', revised: '2026-08-03' },
  { slug: 'json-to-java', revised: '2026-08-03' },
  { slug: 'json-vs-yaml', revised: '2026-08-03' },
  { slug: 'json-to-csv-nested', revised: '2026-08-03' },
  { slug: 'json-escaping', revised: '2026-08-03' },
  { slug: 'json-comments', revised: '2026-08-03' },
] as const;

/**
 * Maps the URL segment to a BCP-47 tag for hreflang.
 *
 * The `cn` → `zh-CN` entry is the one piece of asymmetry: the directory is named
 * `cn` (a region code) while the language is `zh`. Renaming the route would cost
 * a redirect for every existing link, so the mapping absorbs it instead.
 */
const HREFLANG: Record<WikiLocale, string> = {
  en: 'en-US',
  cn: 'zh-CN',
  es: 'es-ES',
  pt: 'pt-BR',
};

export interface WikiMetaInput {
  locale: WikiLocale;
  /** Article slug, or omitted for a locale index page. */
  slug?: string;
  /** Full `<title>`. Keep it under 60 characters — no suffix is appended. */
  title: string;
  /** 120-160 characters. */
  description: string;
  keywords: string;
  /** Shorter title for social cards, where there is no SERP width limit. */
  socialTitle?: string;
  /** ISO date the article was last substantively revised. Required for articles. */
  modifiedTime?: string;
  /** ISO date first published. */
  publishedTime?: string;
  section?: string;
}

export function wikiMetadata({
  locale,
  slug,
  title,
  description,
  keywords,
  socialTitle,
  modifiedTime,
  publishedTime,
  section,
}: WikiMetaInput): Metadata {
  const path = slug ? `/wiki/${locale}/${slug}/` : `/wiki/${locale}/`;
  // A locale index is a listing, not a piece of writing, so it gets neither
  // `og:type=article` nor the `article:*` dates.
  const isArticle = Boolean(slug);

  const languages: Record<string, string> = {};
  for (const other of WIKI_LOCALES) {
    languages[HREFLANG[other]] = slug ? `/wiki/${other}/${slug}/` : `/wiki/${other}/`;
  }
  // English is the fallback for any locale we do not publish.
  languages['x-default'] = slug ? `/wiki/en/${slug}/` : '/wiki/en/';

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: path, languages },
    openGraph: {
      title: socialTitle ?? title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: 'JSON1',
      type: isArticle ? 'article' : 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle ?? title,
      description,
      images: ['/og-image.png'],
    },
    ...(isArticle
      ? {
          other: {
            'article:author': 'JSON1',
            ...(publishedTime ? { 'article:published_time': publishedTime } : {}),
            ...(modifiedTime ? { 'article:modified_time': modifiedTime } : {}),
            ...(section ? { 'article:section': section } : {}),
          },
        }
      : {}),
  };
}

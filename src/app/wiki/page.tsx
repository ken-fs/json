import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import SiteFooter from '@/components/SiteFooter';
import { SITE_URL, breadcrumbStructuredData } from '@/components/StructuredData';
import { TOOLS } from '@/lib/tools';
import { WIKI_ARTICLES } from '@/lib/wikiMeta';

/**
 * The wiki's language picker, and the only page that links every article.
 *
 * This file used to be a byte-for-byte copy of `/wiki/cn/page.tsx` — same
 * Chinese copy, same six cards, every link pointing into `/wiki/cn/`. Two URLs
 * serving identical content is a duplicate Google has to pick between, and
 * `canonical: '/wiki'` told it to index this one, so the copy that was actually
 * linked from the sidebar was the one being suppressed.
 *
 * Static export has no redirects, so `/wiki/` has to stay a page. It earns its
 * place by doing the one thing no locale index can: pointing at all four.
 *
 * The topic table is why all forty article URLs are reachable in two clicks.
 * Before it, this page listed six English slugs, so the thirty translated
 * articles were only reachable through their own locale index — three clicks
 * from the homepage, and Search Console had exactly thirty URLs sitting in
 * "discovered, not indexed". Crawl depth is a priority signal, and a page nobody
 * links to except one listing reads as one nobody thinks is important.
 */

const LOCALES = [
  {
    dir: 'en',
    name: 'English',
    native: 'English',
    blurb: 'From syntax to parsing performance.',
  },
  {
    dir: 'cn',
    name: 'Chinese',
    native: '简体中文',
    blurb: '从语法到解析性能。',
  },
  {
    dir: 'es',
    name: 'Spanish',
    native: 'Español',
    blurb: 'De la sintaxis al rendimiento.',
  },
  {
    dir: 'pt',
    name: 'Portuguese',
    native: 'Português',
    blurb: 'Da sintaxe à performance.',
  },
] as const;

/**
 * English labels for every slug in the catalogue.
 *
 * Keyed off `WIKI_ARTICLES` rather than repeating the slug list: this page
 * hardcoded six of the ten, so the four newest articles had no link here at all
 * and the copy still said "six guides". A missing key is now a type error.
 */
const TOPIC_LABELS: Record<(typeof WIKI_ARTICLES)[number]['slug'], string> = {
  'json-guide': 'Syntax and data types',
  'json-validation': 'JSON Schema validation',
  'json-api-best-practices': 'REST API design',
  'json-performance': 'Parsing performance',
  'json-to-typescript': 'TypeScript interfaces',
  'json-to-java': 'Java classes',
  'json-vs-yaml': 'JSON vs YAML',
  'json-to-csv-nested': 'Nested JSON to CSV',
  'json-escaping': 'Escaping and nested strings',
  'json-comments': 'Comments in JSON',
};

/** Short label for each locale column, in the language it links to. */
const COLUMN_LABEL: Record<(typeof LOCALES)[number]['dir'], string> = {
  en: 'EN',
  cn: '中文',
  es: 'ES',
  pt: 'PT',
};

export const metadata: Metadata = {
  title: { absolute: 'JSON Knowledge Base — Pick a Language' },
  description:
    'Ten JSON guides in English, Chinese, Spanish, and Portuguese: syntax, escaping, JSON Schema, REST APIs, parsing performance, and type generation.',
  keywords: 'JSON guides,JSON documentation,JSON knowledge base,JSON tutorial,multilingual',
  alternates: {
    // No hreflang here. This page has no translation — it is the page you land
    // on *before* choosing one. The four locale indexes reference each other.
    canonical: '/wiki/',
  },
  openGraph: {
    title: 'JSON Knowledge Base',
    description: 'Ten JSON guides in four languages.',
    url: `${SITE_URL}/wiki/`,
    siteName: 'JSON.how',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'JSON.how knowledge base' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Knowledge Base',
    description: 'Ten JSON guides in four languages.',
    images: ['/og-image.png'],
  },
};

export default function WikiHubPage() {
  const breadcrumb = breadcrumbStructuredData([{ name: 'Knowledge base', path: '/wiki/' }]);

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#141414]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#141414]/50">
          Knowledge base
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Ten JSON guides, four languages.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#141414]/70">
          The same ten articles are written in each language — not machine-translated from
          one original. Pick the one you read fastest.
        </p>

        <ul className="mt-12 divide-y divide-[#dedede] border-y border-[#dedede]">
          {LOCALES.map((locale) => (
            <li key={locale.dir}>
              <Link
                href={`/wiki/${locale.dir}/`}
                hrefLang={locale.dir === 'cn' ? 'zh-CN' : locale.dir}
                className="group flex items-baseline gap-6 py-5 transition-colors hover:bg-white focus-visible:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1261ff]"
              >
                <span className="w-32 shrink-0 text-lg font-medium group-hover:text-[#1261ff]">
                  {locale.native}
                </span>
                <span className="flex-1 text-[#141414]/70">{locale.blurb}</span>
                <span className="font-mono text-xs uppercase tracking-wider text-[#141414]/40">
                  {locale.dir === 'cn' ? 'zh' : locale.dir}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <section className="mt-16">
          <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-[#141414]/50">
            Every guide, every language
          </h2>
          {/* The title links English, because this hub is written in English and a
              reader who skips the picker should land on a language they can
              already read. The three short links after it are the direct route
              to each translation — without them those thirty URLs are one hop
              further from the homepage than the English ten. */}
          <ul className="mt-5 divide-y divide-[#ececea]">
            {WIKI_ARTICLES.map((article) => (
              <li
                key={article.slug}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3"
              >
                <Link
                  href={`/wiki/en/${article.slug}/`}
                  className="text-[#141414] underline decoration-[#dedede] decoration-2 underline-offset-4 transition-colors hover:decoration-[#1261ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1261ff]"
                >
                  {TOPIC_LABELS[article.slug]}
                </Link>
                <span className="flex shrink-0 gap-3 font-mono text-xs uppercase tracking-wider">
                  {LOCALES.filter((locale) => locale.dir !== 'en').map((locale) => (
                    <Link
                      key={locale.dir}
                      href={`/wiki/${locale.dir}/${article.slug}/`}
                      hrefLang={locale.dir === 'cn' ? 'zh-CN' : locale.dir}
                      aria-label={`${TOPIC_LABELS[article.slug]} in ${locale.name}`}
                      className="text-[#141414]/40 transition-colors hover:text-[#1261ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1261ff]"
                    >
                      {COLUMN_LABEL[locale.dir]}
                    </Link>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-16 border-t border-[#dedede] pt-6 text-sm text-[#141414]/60">
          Want the tools instead?{' '}
          <Link
            href="/tools/"
            className="text-[#1261ff] underline decoration-2 underline-offset-4"
          >
            All {TOOLS.length + 1} JSON tools
          </Link>{' '}
          run in your browser, no uploads.
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import { SITE_URL, breadcrumbStructuredData } from '@/components/StructuredData';
import { TOOLS } from '@/lib/tools';

/**
 * The wiki's language picker.
 *
 * This file used to be a byte-for-byte copy of `/wiki/cn/page.tsx` — same
 * Chinese copy, same six cards, every link pointing into `/wiki/cn/`. Two URLs
 * serving identical content is a duplicate Google has to pick between, and
 * `canonical: '/wiki'` told it to index this one, so the copy that was actually
 * linked from the sidebar was the one being suppressed.
 *
 * Static export has no redirects, so `/wiki/` has to stay a page. It earns its
 * place by doing the one thing no locale index can: pointing at all four.
 */

const LOCALES = [
  {
    dir: 'en',
    name: 'English',
    native: 'English',
    blurb: 'Six guides, from syntax to parsing performance.',
  },
  {
    dir: 'cn',
    name: 'Chinese',
    native: '简体中文',
    blurb: '六篇指南，从语法到解析性能。',
  },
  {
    dir: 'es',
    name: 'Spanish',
    native: 'Español',
    blurb: 'Seis guías, de la sintaxis al rendimiento.',
  },
  {
    dir: 'pt',
    name: 'Portuguese',
    native: 'Português',
    blurb: 'Seis guias, da sintaxe à performance.',
  },
] as const;

const TOPICS = [
  { slug: 'json-guide', label: 'Syntax and data types' },
  { slug: 'json-validation', label: 'JSON Schema validation' },
  { slug: 'json-api-best-practices', label: 'REST API design' },
  { slug: 'json-performance', label: 'Parsing performance' },
  { slug: 'json-to-typescript', label: 'TypeScript interfaces' },
  { slug: 'json-to-java', label: 'Java classes' },
] as const;

export const metadata: Metadata = {
  title: { absolute: 'JSON Knowledge Base — Pick a Language' },
  description:
    'Six JSON guides in English, Chinese, Spanish, and Portuguese: syntax, JSON Schema, REST API design, parsing performance, and type generation.',
  keywords: 'JSON guides,JSON documentation,JSON knowledge base,JSON tutorial,multilingual',
  alternates: {
    // No hreflang here. This page has no translation — it is the page you land
    // on *before* choosing one. The four locale indexes reference each other.
    canonical: '/wiki/',
  },
  openGraph: {
    title: 'JSON Knowledge Base',
    description: 'Six JSON guides in four languages.',
    url: `${SITE_URL}/wiki/`,
    siteName: 'JSON1',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'JSON1 knowledge base' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Knowledge Base',
    description: 'Six JSON guides in four languages.',
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
          Six JSON guides, four languages.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#141414]/70">
          The same six articles are written in each language — not machine-translated from
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
            What the guides cover
          </h2>
          {/* Links go to the English set: this hub is written in English, so a
              reader who skips the picker gets a language they can already read. */}
          <ul className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {TOPICS.map((topic) => (
              <li key={topic.slug}>
                <Link
                  href={`/wiki/en/${topic.slug}/`}
                  className="text-[#141414] underline decoration-[#dedede] decoration-2 underline-offset-4 transition-colors hover:decoration-[#1261ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1261ff]"
                >
                  {topic.label}
                </Link>
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
    </div>
  );
}

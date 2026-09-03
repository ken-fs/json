import { SITE_URL, breadcrumbStructuredData } from '@/components/StructuredData';
import type { WikiMetaInput, WikiLocale } from '@/lib/wikiMeta';

/**
 * `BreadcrumbList` + `Article` for one wiki page.
 *
 * The wiki had no breadcrumb markup on any of its 29 pages, which was the one
 * place on the site where it earns its keep: a guide sits three levels deep
 * (`Home › Knowledge base › Chinese › JSON 完全指南`) and breadcrumbs are still a
 * live rich result, unlike most of what schema.org offers.
 *
 * `Article` is here rather than in `wikiMetadata` because it needs the same input
 * and JSON-LD cannot go in a `Metadata` object. Pages pass one shared object to
 * both, so the title in the markup cannot drift from the title in the `<head>`.
 */

/** Name of the `/wiki/` hub, written in the language of the page linking to it. */
const HUB_LABEL: Record<WikiLocale, string> = {
  en: 'Knowledge base',
  cn: '知识库',
  es: 'Base de conocimiento',
  pt: 'Base de conhecimento',
};

/**
 * The locale index crumb, named the way the `/wiki/` picker names it — in the
 * language itself, not as a code. "简体中文" is a label a reader recognises in a
 * SERP breadcrumb; "cn" is an implementation detail of our directory layout.
 */
const ENDONYM: Record<WikiLocale, string> = {
  en: 'English',
  cn: '简体中文',
  es: 'Español',
  pt: 'Português',
};

const LANGUAGE: Record<WikiLocale, string> = {
  en: 'en-US',
  cn: 'zh-CN',
  es: 'es-ES',
  pt: 'pt-BR',
};

export default function WikiJsonLd({
  locale,
  slug,
  title,
  description,
  socialTitle,
  modifiedTime,
  publishedTime,
  section,
}: WikiMetaInput) {
  const path = slug ? `/wiki/${locale}/${slug}/` : `/wiki/${locale}/`;

  const crumbs = [
    { name: HUB_LABEL[locale], path: '/wiki/' },
    { name: ENDONYM[locale], path: `/wiki/${locale}/` },
  ];
  if (slug) {
    crumbs.push({ name: socialTitle ?? title, path });
  }
  const breadcrumb = breadcrumbStructuredData(crumbs);

  // Only an article gets `Article`. A locale index is a listing of them.
  const article = slug
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        inLanguage: LANGUAGE[locale],
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${path}` },
        image: `${SITE_URL}/og-image.png`,
        author: { '@type': 'Organization', name: 'JSON.how', url: `${SITE_URL}/about/` },
        publisher: {
          '@type': 'Organization',
          name: 'JSON.how',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
        },
        ...(publishedTime ? { datePublished: publishedTime } : {}),
        ...(modifiedTime ? { dateModified: modifiedTime } : {}),
        ...(section ? { articleSection: section } : {}),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {article ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
        />
      ) : null}
    </>
  );
}

import { MetadataRoute } from 'next';
import { TOOL_IDS } from '@/lib/tools';
import { WIKI_ARTICLES, WIKI_LOCALES } from '@/lib/wikiMeta';

export const dynamic = 'force-static';

/**
 * Two rules this file exists to hold.
 *
 * **Every URL ends in a slash.** `next.config.ts` sets `trailingSlash: true`, so
 * `/tools` 301s to `/tools/`. This file used to omit the slash, which meant 47 of
 * the 48 listed URLs were redirects — the sitemap was asking Google to crawl
 * addresses that all bounce, and contradicting the canonical tags at the same
 * time.
 *
 * **Nothing is listed twice or derived by hand.** Tool routes come from
 * `TOOL_IDS`, wiki routes from `WIKI_ARTICLES` × `WIKI_LOCALES`. A new tool or a
 * seventh article appears here without anyone remembering to add it.
 */

/**
 * `lastmod` for pages whose content is code, not prose.
 *
 * Every URL used to carry `new Date().toISOString()` — the build time. That
 * claimed all 49 pages were revised on every deploy, and directly contradicted
 * the `article:modified_time` on the wiki pages, which is a real date. Google
 * discounts a `lastmod` it catches lying, so an inaccurate one is worse than none.
 *
 * Wiki articles use their own `revised` date instead of this constant. Bump this
 * when a tool's behaviour or copy actually changes.
 */
const TOOLS_REVISED = '2026-08-03';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.json1.org';

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: TOOLS_REVISED,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/tools/`,
      lastModified: TOOLS_REVISED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: TOOLS_REVISED,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // The language picker. Not a locale index — see `src/app/wiki/page.tsx`.
    {
      url: `${baseUrl}/wiki/`,
      lastModified: TOOLS_REVISED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  for (const id of TOOL_IDS) {
    routes.push({
      url: `${baseUrl}/${id}/`,
      lastModified: TOOLS_REVISED,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  }

  // A locale index is only as fresh as the newest article it lists. `string`, not
  // inferred: `WIKI_ARTICLES` is `as const`, so the accumulator would otherwise
  // narrow to the first entry's literal date and fail to compile the moment two
  // articles carry different dates — which is the normal case.
  const newestArticle = WIKI_ARTICLES.reduce<string>(
    (latest, article) => (article.revised > latest ? article.revised : latest),
    WIKI_ARTICLES[0].revised,
  );

  for (const locale of WIKI_LOCALES) {
    routes.push({
      url: `${baseUrl}/wiki/${locale}/`,
      lastModified: newestArticle,
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    for (const { slug, revised } of WIKI_ARTICLES) {
      routes.push({
        url: `${baseUrl}/wiki/${locale}/${slug}/`,
        lastModified: revised,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return routes;
}

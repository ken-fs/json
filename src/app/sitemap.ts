import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.json1.org';
  const lastModified = new Date().toISOString();

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Core tools
    {
      url: `${baseUrl}/json-to-java`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/json-to-typescript`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Wiki index (default and locales)
    {
      url: `${baseUrl}/wiki`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const locales = ['en', 'cn', 'es', 'pt'] as const;
  const wikiSlugs = [
    'json-guide',
    'json-api-best-practices',
    'json-validation',
    'json-performance',
    'json-to-typescript',
    'json-to-java',
  ] as const;

  for (const locale of locales) {
    routes.push({
      url: `${baseUrl}/wiki/${locale}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    for (const slug of wikiSlugs) {
      routes.push({
        url: `${baseUrl}/wiki/${locale}/${slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return routes;
}

/**
 * Site-level JSON-LD, rendered once by the root layout.
 *
 * Deliberately narrow: this describes the *site*, not whatever page is being
 * viewed. Page-specific markup (the tool's own `WebApplication`, `FAQPage`,
 * `ItemList`, and the breadcrumb trail) lives with the page that can describe
 * itself accurately.
 *
 * Four things were removed here rather than fixed, because each one asserted
 * something untrue:
 *
 * - `aggregateRating` claimed 4.8 from 1,250 ratings. There is no review system
 *   and no visible reviews, so this was fabricated markup for content that does
 *   not exist on the page — a structured-data policy violation, not a mistake.
 * - `screenshot` pointed at /screenshot.png, which 404s.
 * - `sameAs` listed github.com/jsontools and twitter.com/jsontools, neither of
 *   which is ours.
 * - `SearchAction` advertised a sitelinks search box at /?q=, but there is no
 *   site search and nothing reads that parameter.
 *
 * The site-level `WebApplication` was also removed. Every tool page emits its
 * own, so each of the 17 carried two WebApplication nodes with different names
 * and URLs. The homepage declares the one that describes the formatter.
 *
 * Put any of them back only alongside the thing it describes.
 */

export const SITE_URL = "https://www.json.how";

/** One crumb in the trail: a name and the page it points at. */
export interface Crumb {
  name: string;
  /** Path with a leading and trailing slash, e.g. `/json-to-yaml/`. */
  path: string;
}

/**
 * Build a `BreadcrumbList` for one page. `Home` is prepended, so pass only the
 * trail below it.
 *
 * A hardcoded two-item list used to render identically on all 49 pages, always
 * ending at the homepage URL, so it contradicted both the visible breadcrumb
 * and the page it sat on. Breadcrumbs are still a live rich result, so it is
 * worth getting right.
 *
 * Returns `null` for an empty trail: a list containing only "Home" tells Google
 * nothing it does not already know.
 */
export function breadcrumbStructuredData(crumbs: Crumb[]) {
  if (crumbs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      ...crumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: crumb.name,
        item: `${SITE_URL}${crumb.path}`,
      })),
    ],
  };
}

export default function StructuredData() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "JSON1",
    url: `${SITE_URL}/`,
    description: "Free online JSON formatter, validator, and converter tools",
    inLanguage: ["en-US", "zh-CN", "es-ES", "pt-BR"],
    publisher: { "@type": "Organization", name: "JSON1" },
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "JSON1",
    url: `${SITE_URL}/`,
    description: "Browser-based JSON processing tools for developers",
    logo: `${SITE_URL}/logo.png`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
    </>
  );
}

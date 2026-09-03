import type { Metadata } from "next";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import JSONFormatter from "@/components/JSONFormatter";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL } from "@/components/StructuredData";
import { faqStructuredData } from "@/lib/intros";

// The root layout no longer sets a canonical (it leaked to every page that did
// not override it), so the homepage declares its own. `title.absolute` skips
// the "| JSON.how" template, which would otherwise double the brand name.
export const metadata: Metadata = {
  title: {
    absolute: "JSON.how: Free Online JSON Formatter, Validator & Converter",
  },
  alternates: { canonical: "/" },
};

/**
 * Describes the formatter itself.
 *
 * This lived in the site-wide `StructuredData` component, which meant every
 * tool page carried it *plus* its own `WebApplication` — two nodes with
 * different names and URLs on one page. It belongs to the page it describes.
 */
const webApplication = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON.how Formatter and Validator",
  url: `${SITE_URL}/`,
  description:
    "Format, minify, validate, escape, and inspect JSON in a collapsible tree. Runs entirely in the browser — nothing is uploaded.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  inLanguage: ["en", "zh", "es", "pt"],
  featureList: [
    "JSON formatting and beautification",
    "JSON validation with error positions",
    "JSON minification",
    "Collapsible tree view",
    "String escaping and unescaping",
    "Multi-language interface",
  ],
};

export default function Home() {
  // The intro below the workspace answers real questions, so describe it as an
  // FAQ. Scoped to this page rather than the shared `StructuredData`, which the
  // root layout renders everywhere.
  const faq = faqStructuredData("jsonFormatter");

  return (
    <div className="flex min-h-screen bg-[#f7f7f4] text-[#141414]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplication) }}
      />
      {/* No BreadcrumbList: the homepage is the root, and a one-item trail
          tells Google nothing. */}
      {faq ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
        />
      ) : null}
      <AppSidebar />
      <div className="relative flex min-w-0 flex-1 flex-col">
        <Header />
        <JSONFormatter />
        <SiteFooter />
      </div>
    </div>
  );
}

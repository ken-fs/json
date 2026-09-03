import type { Metadata } from "next";
import AppSidebar from "@/components/AppSidebar";
import ConverterWorkspace from "@/components/ConverterWorkspace";
import Header from "@/components/Header";
import { SITE_URL, breadcrumbStructuredData } from "@/components/StructuredData";
import { faqStructuredData } from "@/lib/intros";
import { getTool } from "@/lib/tools";

/**
 * Build the `metadata` export for a tool route.
 *
 * This lives in a server module so each page can export real metadata. The
 * previous converter pages were `"use client"` at the page level, which makes
 * Next silently drop any metadata export, so those routes shipped with only
 * the root layout's title.
 */
export function toolMetadata(id: string): Metadata {
  const tool = getTool(id);
  if (!tool) throw new Error(`Unknown tool id: ${id}`);

  const canonical = `${SITE_URL}/${tool.id}/`;

  // `title.absolute`, so the "| JSON.how" template does not apply. Bare labels
  // like "JSON to YAML | JSON.how" came to 25 characters and wasted most of the
  // ~60 characters a SERP will show; this lands in the 45-58 range and still
  // leads with the phrase people search for.
  const title = `${tool.label} Converter — Free & Private | JSON.how`;
  const socialTitle = `${tool.label} — free online converter`;

  return {
    title: { absolute: title },
    description: tool.description,
    keywords: [...tool.keywords, "json tools", "online converter", "free", "no upload"],
    alternates: { canonical },
    openGraph: {
      title: socialTitle,
      description: tool.description,
      url: canonical,
      siteName: "JSON.how",
      type: "website",
      images: [
        {
          url: `/og/${tool.id}.png`,
          width: 1200,
          height: 630,
          alt: `${tool.inputLabel} to ${tool.outputLabel} converter on JSON.how`,
        },
      ],
    },
    twitter: {
      // summary_large_image, not summary: there is a real 1200x630 card now.
      card: "summary_large_image",
      title: socialTitle,
      description: tool.description,
      images: [`/og/${tool.id}.png`],
    },
  };
}

/** JSON-LD describing the tool, so it can appear as a software result. */
function toolStructuredData(id: string) {
  const tool = getTool(id);
  if (!tool) return null;

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.label,
    url: `${SITE_URL}/${tool.id}/`,
    description: tool.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

interface ToolPageProps {
  id: string;
}

/** Page shell shared by every tool route. */
export default function ToolPage({ id }: ToolPageProps) {
  const tool = getTool(id);
  if (!tool) throw new Error(`Unknown tool id: ${id}`);

  const structuredData = toolStructuredData(id);
  const faq = faqStructuredData(id);
  // Matches the visible trail: JSON.how / <tool>, with /tools/ as the real
  // intermediate level a crawler can follow.
  const breadcrumb = breadcrumbStructuredData([
    { name: "All tools", path: "/tools/" },
    { name: tool.label, path: `/${tool.id}/` },
  ]);

  return (
    <div className="flex min-h-screen bg-[#f7f7f4]">
      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      ) : null}
      {breadcrumb ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
      ) : null}
      {faq ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
        />
      ) : null}
      <AppSidebar />
      {/* Header and content share a column so the mobile header stacks above
          the workspace instead of competing with it for horizontal space. */}
      <div className="relative flex min-w-0 flex-1 flex-col">
        <Header />
        <ConverterWorkspace tool={tool} />
      </div>
    </div>
  );
}

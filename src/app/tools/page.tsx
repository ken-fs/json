import type { Metadata } from "next";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import ToolsIndex from "@/components/ToolsIndex";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL, breadcrumbStructuredData } from "@/components/StructuredData";
import { TOOLS } from "@/lib/tools";

const TOOL_COUNT = TOOLS.length + 1;

export const metadata: Metadata = {
  title: { absolute: `All ${TOOL_COUNT} JSON Tools — Free & Private | JSON.how` },
  // Kept under 160 characters so the whole line survives in the SERP.
  description: `All ${TOOL_COUNT} JSON tools: format and validate JSON, convert to YAML, XML, CSV, and TOML, and generate types for nine languages. Runs in your browser.`,
  keywords: [
    "json tools",
    "json converter",
    "json formatter",
    "yaml converter",
    "xml converter",
    "csv converter",
    "code generator",
  ],
  alternates: { canonical: "/tools/" },
  openGraph: {
    title: `All ${TOOL_COUNT} JSON tools, no uploads`,
    description: `Format, validate, and convert JSON in your browser. ${TOOL_COUNT} tools, nothing leaves the page.`,
    url: `${SITE_URL}/tools/`,
    siteName: "JSON.how",
    type: "website",
    images: [{ url: "/og/tools.png", width: 1200, height: 630, alt: `All ${TOOL_COUNT} JSON.how tools` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `All ${TOOL_COUNT} JSON tools, no uploads`,
    images: ["/og/tools.png"],
  },
};

export default function ToolsIndexPage() {
  const breadcrumb = breadcrumbStructuredData([{ name: "All tools", path: "/tools/" }]);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "JSON.how Tools",
    numberOfItems: TOOL_COUNT,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "JSON Formatter",
        url: `${SITE_URL}/`,
      },
      ...TOOLS.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: tool.label,
        url: `${SITE_URL}/${tool.id}/`,
      })),
    ],
  };

  return (
    <div className="flex min-h-screen bg-[#f7f7f4]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      {breadcrumb ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
      ) : null}
      <AppSidebar />
      {/* The body is a client component so its copy can go through `t()`. This
          shell stays on the server to keep the metadata and JSON-LD exports. */}
      <div className="relative flex min-w-0 flex-1 flex-col">
        <Header />
        <ToolsIndex />
        <SiteFooter />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import JSONFormatter from "@/components/JSONFormatter";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL } from "@/components/StructuredData";
import { faqStructuredData } from "@/lib/intros";

export const metadata: Metadata = {
  title: "JSON Viewer Online — Collapsible Tree View",
  description:
    "View JSON as a collapsible tree: expand the branch you need, collapse the rest. Paste text or drop a .json file. Browser-only — nothing is uploaded.",
  alternates: { canonical: "/json-viewer/" },
};

const webApplication = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON.how Viewer",
  url: `${SITE_URL}/json-viewer/`,
  description:
    "Explore JSON as a collapsible tree with keys, values, and types at a glance. Runs entirely in the browser.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Collapsible JSON tree view",
    "File drop for .json files",
    "Browser-only — no upload",
  ],
};

export default function JsonViewerPage() {
  const faq = faqStructuredData("jsonViewer");

  return (
    <div className="flex min-h-screen bg-[#f7f7f4] text-[#141414]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplication) }}
      />
      {faq ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
        />
      ) : null}
      <AppSidebar />
      <div className="relative flex min-w-0 flex-1 flex-col">
        <Header />
        <JSONFormatter
          introId="jsonViewer"
          title="View JSON"
          subtitle="A collapsible tree for big payloads — expand the branch you need, collapse the rest. Drop a .json file or paste text."
          eyebrow="Viewer"
        />
        <SiteFooter />
      </div>
    </div>
  );
}

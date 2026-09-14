import type { Metadata } from "next";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import JSONFormatter from "@/components/JSONFormatter";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL } from "@/components/StructuredData";
import { faqStructuredData } from "@/lib/intros";

export const metadata: Metadata = {
  title: "JSON Minifier Online — Compress JSON Fast",
  description:
    "Minify JSON online: strip insignificant whitespace into the smallest valid form of the same data. Browser-only — nothing is uploaded. Format back anytime.",
  alternates: { canonical: "/json-minifier/" },
};

const webApplication = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON.how Minifier",
  url: `${SITE_URL}/json-minifier/`,
  description:
    "Minify JSON by stripping insignificant whitespace, and format it back when you need to read it. Runs entirely in the browser.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "JSON minification (whitespace stripping)",
    "Format / minify round-trip",
    "Browser-only — no upload",
  ],
};

export default function JsonMinifierPage() {
  const faq = faqStructuredData("jsonMinifier");

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
          introId="jsonMinifier"
          title="Minify JSON"
          subtitle="Strip insignificant whitespace into the smallest valid form of the same data — and format it back when you need to read it."
          eyebrow="Minifier"
        />
        <SiteFooter />
      </div>
    </div>
  );
}

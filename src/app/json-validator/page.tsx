import type { Metadata } from "next";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import JSONFormatter from "@/components/JSONFormatter";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL } from "@/components/StructuredData";
import { faqStructuredData } from "@/lib/intros";

export const metadata: Metadata = {
  title: "JSON Validator & Checker Online with Error Positions",
  description:
    "Free JSON checker and validator: see the exact line and column of the first error. Browser-only — nothing is uploaded. Also formats and shows a tree view.",
  alternates: { canonical: "/json-validator/" },
};

const webApplication = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON.how Validator",
  url: `${SITE_URL}/json-validator/`,
  description:
    "Validate JSON with exact error line and column, then inspect the parsed result as a collapsible tree. Runs entirely in the browser.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "JSON validation with error line and column",
    "Collapsible tree view of the parsed result",
    "Browser-only — no upload",
  ],
};

export default function JsonValidatorPage() {
  const faq = faqStructuredData("jsonValidator");

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
          introId="jsonValidator"
          title="Validate JSON"
          subtitle="Paste JSON and get the exact line and column of the first error — plus a tree view once it parses. Nothing leaves your browser."
          eyebrow="Validator"
        />
        <SiteFooter />
      </div>
    </div>
  );
}

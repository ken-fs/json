import type { Metadata } from "next";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import JsonDiffWorkspace from "@/components/JsonDiffWorkspace";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL } from "@/components/StructuredData";
import { faqStructuredData } from "@/lib/intros";

export const metadata: Metadata = {
  title: "JSON Diff Online — Compare Two JSON Documents",
  description:
    "Compare two JSON documents and see exactly what changed: fields added, removed or edited. Structural diff (key order never counts). Browser-only — nothing uploaded.",
  alternates: { canonical: "/json-diff/" },
};

const webApplication = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON.how Diff",
  url: `${SITE_URL}/json-diff/`,
  description:
    "Compare two JSON documents with a structural diff: additions, removals and edits with old and new values. Powered by jsondiffpatch, running entirely in the browser.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Structural JSON diff (key order ignored)",
    "Visual add/remove/change highlighting",
    "Browser-only — no upload",
  ],
};

export default function JsonDiffPage() {
  const faq = faqStructuredData("json-diff");

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
        <main className="relative flex-1 bg-[#f7f7f4] px-4 py-6 sm:px-6 lg:px-9 lg:py-7">
          <div className="mx-auto max-w-[1480px]">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#1261ff]">
              JSON.how / Diff
            </p>
            <h1 className="text-[42px] font-extrabold leading-none tracking-[-0.055em] text-[#111] sm:text-[54px]">
              Compare JSON
            </h1>
            <p className="mt-3 mb-7 max-w-xl text-sm leading-6 text-[#666a72] sm:text-base">
              Paste two documents and see exactly what changed — structural diff, so key
              order and whitespace never produce noise.
            </p>
            <JsonDiffWorkspace />
          </div>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}

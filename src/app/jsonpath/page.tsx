import type { Metadata } from "next";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import JsonPathWorkspace from "@/components/JsonPathWorkspace";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL } from "@/components/StructuredData";
import { faqStructuredData } from "@/lib/intros";

export const metadata: Metadata = {
  title: "JSONPath Online Evaluator — Query JSON in Your Browser",
  description:
    "Test JSONPath expressions online with live results as you type. Query nested JSON with filters, wildcards and recursive descent. Browser-only — nothing is uploaded.",
  alternates: { canonical: "/jsonpath/" },
};

const webApplication = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON.how JSONPath Evaluator",
  url: `${SITE_URL}/jsonpath/`,
  description:
    "Evaluate JSONPath expressions against pasted JSON with live results. Powered by jsonpath-plus, running entirely in the browser.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Live JSONPath evaluation",
    "Filters, wildcards, recursive descent",
    "Browser-only — no upload",
  ],
};

export default function JsonPathPage() {
  const faq = faqStructuredData("jsonpath");

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
              JSON.how / JSONPath
            </p>
            <h1 className="text-[42px] font-extrabold leading-none tracking-[-0.055em] text-[#111] sm:text-[54px]">
              JSONPath Evaluator
            </h1>
            <p className="mt-3 mb-7 max-w-xl text-sm leading-6 text-[#666a72] sm:text-base">
              Query JSON with expressions like $.store.book[*].author — live results as
              you type, in your browser.
            </p>
            <JsonPathWorkspace />
          </div>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}

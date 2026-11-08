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
        <section className="bg-[#f7f7f4] px-6 pb-12 text-[15px] leading-relaxed text-[#141414]">
          <div className="mx-auto max-w-3xl border-t border-[#dedede] pt-6">
            <h2 className="text-lg font-semibold">JSON syntax rules in 6 lines</h2>
            <p className="mt-2">These are the rules the checker enforces. Break one and you get an error.</p>
            <ul className="mt-2 list-disc pl-5">
              <li>Keys are strings in double quotes. Unquoted keys like <code>{"{name: 1}"}</code> are an error.</li>
              <li>Strings use double quotes only. Single quotes are an error.</li>
              <li>No comma after the last item in an object or array.</li>
              <li>Values can be a string, number, <code>true</code>, <code>false</code>, <code>null</code>, an object or an array.</li>
              <li>No comments. Both <code>{"//"}</code> and <code>{"/* */"}</code> are errors.</li>
              <li>Quotes and backslashes inside strings need a backslash in front.</li>
            </ul>
            <p className="mt-2">
              Can&apos;t fix it by hand? Try the{" "}
              <a className="text-[#1261ff] underline" href="/json-repair/">JSON repair tool</a>.
            </p>
          </div>
        </section>
        <SiteFooter />
      </div>
    </div>
  );
}

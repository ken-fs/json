import type { Metadata } from "next";
import Link from "next/link";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL, breadcrumbStructuredData } from "@/components/StructuredData";

/**
 * Terms of Use.
 *
 * A short, honest set of terms for a free static tool: what the site is, the
 * as-is disclaimer that matters when someone pastes a production payload, and
 * the limits on what we owe if a converter is wrong. No click-wrap theatre —
 * the terms say what is actually true of a client-side tool.
 */
export const metadata: Metadata = {
  title: { absolute: "Terms of Use — JSON1" },
  description:
    "The terms for using JSON1: a free, client-side developer tool provided as-is, with no warranty and no data collected from what you paste.",
  keywords: ["json1 terms of use", "terms of service", "developer tool terms", "as-is"],
  alternates: { canonical: "/terms/" },
  openGraph: {
    title: "Terms of Use — JSON1",
    description: "The terms for using a free, client-side JSON tool provided as-is.",
    url: `${SITE_URL}/terms/`,
    siteName: "JSON1",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JSON1 Terms of Use" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use — JSON1",
    description: "The terms for using a free, client-side JSON tool provided as-is.",
    images: ["/og-image.png"],
  },
};

const EFFECTIVE = "August 14, 2026";

export default function TermsPage() {
  const breadcrumb = breadcrumbStructuredData([{ name: "Terms of Use", path: "/terms/" }]);

  return (
    <div className="flex min-h-screen bg-[#f7f7f4] text-[#141414]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <AppSidebar />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex-1 px-4 py-10 sm:px-6 lg:px-9 lg:py-14">
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#1261ff]">
              JSON1 / Terms
            </p>
            <h1 className="text-[38px] font-black leading-[0.95] tracking-[-0.055em] sm:text-[48px]">
              Terms of Use
            </h1>
            <p className="mt-4 text-sm text-[#8a8d93]">Effective {EFFECTIVE}</p>

            <p className="mt-6 text-base leading-7 text-[#4a4d54] sm:text-lg sm:leading-8">
              JSON1 is a free set of browser-based tools for reading, checking, and converting
              JSON. Using the site means you accept the terms below. They are short because a
              static tool does not need long ones.
            </p>

            <section className="mt-12">
              <h2 className="text-xl font-black tracking-[-0.03em]">Use of the tools</h2>
              <p className="mt-4 text-sm leading-7 text-[#4a4d54] sm:text-base">
                The tools are free to use for any lawful purpose, no account required. You may
                not use the site to break the law, to attempt to disrupt or overload it, or to
                pass off its output as a paid service to others in a way that misrepresents
                where it came from. Everything runs in your browser, so how you use the output
                is your responsibility.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-xl font-black tracking-[-0.03em]">No warranty</h2>
              <p className="mt-4 text-sm leading-7 text-[#4a4d54] sm:text-base">
                The tools are provided &ldquo;as is&rdquo;, without warranty of any kind. Every
                generator is tested against real output, and the claims in the notes under each
                tool are checked rather than proofread — but no test suite is exhaustive, and
                you should treat converted or generated code as a starting point to review, not
                a guarantee. Do not rely on it, unread, for anything that matters.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-xl font-black tracking-[-0.03em]">Limitation of liability</h2>
              <p className="mt-4 text-sm leading-7 text-[#4a4d54] sm:text-base">
                To the extent the law allows, JSON1 is not liable for any loss or damage arising
                from using the site or relying on its output. Because the site is free and
                client-side, and never receives your data, any such liability would in any case
                be limited to the amount you paid to use it — which is nothing.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-xl font-black tracking-[-0.03em]">Intellectual property</h2>
              <p className="mt-4 text-sm leading-7 text-[#4a4d54] sm:text-base">
                The name, design, and written guides on JSON1 belong to the project. The output
                you produce from your own input — formatted JSON, generated types, converted
                files — is yours to use however you like; the tool claims nothing over it.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-xl font-black tracking-[-0.03em]">Ads and third parties</h2>
              <p className="mt-4 text-sm leading-7 text-[#4a4d54] sm:text-base">
                The site shows ads to pay for the domain and loads a few third-party scripts.
                What they are and what they see is set out in the{" "}
                <Link href="/privacy/" className="font-semibold text-[#1261ff] hover:underline">
                  Privacy Policy
                </Link>
                . Those third parties have their own terms, which govern their part.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-xl font-black tracking-[-0.03em]">Changes</h2>
              <p className="mt-4 text-sm leading-7 text-[#4a4d54] sm:text-base">
                These terms may change; the effective date at the top moves when they do.
                Continuing to use the site after a change means you accept the revised terms.
                Questions can go to{" "}
                <Link href="/contact/" className="font-semibold text-[#1261ff] hover:underline">
                  the contact page
                </Link>
                .
              </p>
            </section>

            <nav className="mt-14 flex flex-col gap-3 border-t border-[#dedede] pt-6 text-sm sm:flex-row sm:gap-8">
              <Link
                href="/privacy/"
                className="font-semibold text-[#1261ff] underline decoration-2 underline-offset-4"
              >
                Privacy Policy →
              </Link>
              <Link
                href="/"
                className="text-[#4a4d54] underline decoration-[#dedede] decoration-2 underline-offset-4 hover:decoration-[#1261ff]"
              >
                Back to the formatter
              </Link>
            </nav>
          </div>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL, breadcrumbStructuredData } from "@/components/StructuredData";

/**
 * The Privacy Policy.
 *
 * AdSense requires one — the program policies make a privacy notice a condition
 * of showing ads, and it has to name the third parties that set cookies and say
 * how a reader opts out. This page is written to that bar and no higher: it
 * describes exactly what the About page's network table already shows, in the
 * plain terms a policy is supposed to use, and it does not invent data
 * collection the static site does not do.
 */
export const metadata: Metadata = {
  title: { absolute: "Privacy Policy — JSON1" },
  description:
    "What JSON1 collects (nothing you paste), which scripts set cookies (Google AdSense, Analytics, Microsoft Clarity), and how to opt out of personalised ads.",
  keywords: [
    "json1 privacy policy",
    "adsense privacy",
    "cookies",
    "personalised ads opt out",
    "client-side json privacy",
  ],
  alternates: { canonical: "/privacy/" },
  openGraph: {
    title: "Privacy Policy — JSON1",
    description:
      "What is collected, which scripts set cookies, and how to opt out of personalised ads.",
    url: `${SITE_URL}/privacy/`,
    siteName: "JSON1",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JSON1 Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — JSON1",
    description: "What is collected, which scripts set cookies, and how to opt out.",
    images: ["/og-image.png"],
  },
};

/** Kept a constant so the About table and this policy cannot drift apart. */
const EFFECTIVE = "August 14, 2026";

export default function PrivacyPage() {
  const breadcrumb = breadcrumbStructuredData([{ name: "Privacy Policy", path: "/privacy/" }]);

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
              JSON1 / Privacy
            </p>
            <h1 className="text-[38px] font-black leading-[0.95] tracking-[-0.055em] sm:text-[48px]">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-[#8a8d93]">Effective {EFFECTIVE}</p>

            <p className="mt-6 text-base leading-7 text-[#4a4d54] sm:text-lg sm:leading-8">
              JSON1 is a set of static files that run in your browser. There is no server to
              upload your data to, no account, and no database of users. This page says what
              that means in practice, and — because the site shows ads to pay for the
              domain — exactly which third-party scripts run and what they can see.
            </p>

            <section className="mt-12">
              <h2 className="text-xl font-black tracking-[-0.03em]">The JSON you paste</h2>
              <p className="mt-4 text-sm leading-7 text-[#4a4d54] sm:text-base">
                Every tool — formatting, validation, and each converter — runs in JavaScript
                on your machine. The content you paste into an editor is never transmitted to
                us or to anyone else, because there is no endpoint that receives it. You can
                verify this: open your browser&apos;s network panel and run a conversion, or
                load a tool and switch to airplane mode. Everything still works.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-xl font-black tracking-[-0.03em]">Cookies and third-party scripts</h2>
              <p className="mt-4 text-sm leading-7 text-[#4a4d54] sm:text-base">
                The site loads four third-party scripts. Each is listed below with what it
                does and the data it sees. None of them receives the contents of your editor.
              </p>

              <div className="mt-6 space-y-6">
                <div className="border-t border-[#e4e4df] pt-4">
                  <h3 className="text-base font-bold">Google AdSense</h3>
                  <p className="mt-2 text-sm leading-7 text-[#4a4d54]">
                    Serves the ads. Google and its partners use cookies (including the DoubleClick
                    DART cookie) to serve ads based on your prior visits to this and other
                    sites, and report the URL of the page you are on. You can turn off
                    personalised advertising in your{" "}
                    <a
                      href="https://www.google.com/settings/ads"
                      className="font-semibold text-[#1261ff] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Ad Settings
                    </a>
                    , and opt out of third-party vendor cookies for personalised advertising at{" "}
                    <a
                      href="https://www.aboutads.info"
                      className="font-semibold text-[#1261ff] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      aboutads.info
                    </a>
                    . Google&apos;s own explanation of how it uses data from sites that show
                    its ads is at{" "}
                    <a
                      href="https://policies.google.com/technologies/partner-sites"
                      className="font-semibold text-[#1261ff] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      policies.google.com/technologies/partner-sites
                    </a>
                    .
                  </p>
                </div>

                <div className="border-t border-[#e4e4df] pt-4">
                  <h3 className="text-base font-bold">Google Analytics</h3>
                  <p className="mt-2 text-sm leading-7 text-[#4a4d54]">
                    Records which pages get opened and roughly where visitors arrive from,
                    using cookies. It is used to decide which converter to build next. It never
                    receives the contents of the editor, and there is no account to attach a
                    visit to. Google&apos;s data practices are described in the{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      className="font-semibold text-[#1261ff] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Privacy Policy
                    </a>
                    .
                  </p>
                </div>

                <div className="border-t border-[#e4e4df] pt-4">
                  <h3 className="text-base font-bold">Adsterra (highrevenueformat.com)</h3>
                  <p className="mt-2 text-sm leading-7 text-[#4a4d54] sm:text-base">
                    Serves additional banner ads on the wiki (knowledge base) pages only — the
                    tools themselves carry no units from this network. It runs inside a
                    sandboxed iframe, sets its own cookies for frequency capping and fraud
                    checks, and reports the URL of the page it appears on. It cannot read the
                    rest of the page.
                  </p>
                </div>

                <div className="border-t border-[#e4e4df] pt-4">
                  <h3 className="text-base font-bold">Microsoft Clarity</h3>
                  <p className="mt-2 text-sm leading-7 text-[#4a4d54]">
                    Aggregates how pages are used — clicks and scrolling — to find layout
                    problems. Editor contents are treated as sensitive and are not captured.
                    See the{" "}
                    <a
                      href="https://privacy.microsoft.com/privacystatement"
                      className="font-semibold text-[#1261ff] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Microsoft Privacy Statement
                    </a>
                    .
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm leading-7 text-[#4a4d54]">
                If you would rather none of these run, an ad blocker or your browser&apos;s
                tracking protection removes all four, and every tool on the site keeps
                working. The full, plain-language version of what crosses the network is on
                the{" "}
                <Link href="/about/" className="font-semibold text-[#1261ff] hover:underline">
                  About page
                </Link>
                .
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-xl font-black tracking-[-0.03em]">Your choices</h2>
              <p className="mt-4 text-sm leading-7 text-[#4a4d54] sm:text-base">
                You can clear or block cookies in your browser settings, opt out of
                personalised ads through the links above, or block the third-party scripts
                entirely. Because the site holds no account and no server-side record of you,
                there is nothing on our end to request the deletion of — clearing your
                browser is the whole of it.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-xl font-black tracking-[-0.03em]">Children</h2>
              <p className="mt-4 text-sm leading-7 text-[#4a4d54] sm:text-base">
                JSON1 is a developer tool with no audience among children and does not
                knowingly collect information from anyone under 13.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-xl font-black tracking-[-0.03em]">Changes and contact</h2>
              <p className="mt-4 text-sm leading-7 text-[#4a4d54] sm:text-base">
                If this policy changes, the effective date at the top changes with it. Any
                question about it can go to{" "}
                <Link href="/contact/" className="font-semibold text-[#1261ff] hover:underline">
                  the contact page
                </Link>
                .
              </p>
            </section>

            <nav className="mt-14 flex flex-col gap-3 border-t border-[#dedede] pt-6 text-sm sm:flex-row sm:gap-8">
              <Link
                href="/about/"
                className="font-semibold text-[#1261ff] underline decoration-2 underline-offset-4"
              >
                How it works →
              </Link>
              <Link
                href="/terms/"
                className="text-[#4a4d54] underline decoration-[#dedede] decoration-2 underline-offset-4 hover:decoration-[#1261ff]"
              >
                Terms of Use
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

import type { Metadata } from "next";
import Link from "next/link";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL, breadcrumbStructuredData } from "@/components/StructuredData";
import { TOOLS } from "@/lib/tools";

const TOOL_COUNT = TOOLS.length + 1;

/**
 * The page that answers "who is behind this and where does my data go".
 *
 * The audit's E-E-A-T finding was that the site makes a strong privacy claim —
 * nothing is uploaded — on every tool page, and nowhere explains or substantiates
 * it. A claim a reader cannot check is worth about as much as no claim. This page
 * is where the claim is made checkable: it says exactly what is loaded, what is
 * sent, and how to verify both without trusting the sentence.
 *
 * It is also the `Organization` schema's `url` target, so the entity Google reads
 * in the JSON-LD has a page describing it.
 */
export const metadata: Metadata = {
  title: { absolute: "About JSON.how: How It Works & Why Nothing Uploads" },
  description:
    "What JSON.how is, who maintains it, and why your data never leaves the browser — including which third-party scripts load and how to check for yourself.",
  keywords: [
    "about json.how",
    "json tools privacy",
    "client-side json",
    "offline json formatter",
    "no upload json",
  ],
  alternates: { canonical: "/about/" },
  openGraph: {
    title: "About JSON.how",
    description:
      "Why nothing you paste leaves the browser, and how to check that for yourself.",
    url: `${SITE_URL}/about/`,
    siteName: "JSON.how",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About JSON.how" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About JSON.how",
    description: "Why nothing you paste leaves the browser.",
    images: ["/og-image.png"],
  },
};

/**
 * The signature element: an honest network table.
 *
 * Two of these rows are things most privacy pages leave out. Saying "nothing is
 * uploaded" while an ad script loads is the kind of half-truth that costs more
 * trust than it buys, so the ads and the analytics are listed as plainly as the
 * zero-byte row that is the actual point.
 */
const NETWORK = [
  {
    what: "Your JSON",
    sent: "0 bytes",
    detail:
      "Parsing, formatting, and every conversion run in JavaScript on your machine. There is no API to send it to — the whole site is static files.",
    zero: true,
  },
  {
    what: "Page assets",
    sent: "once",
    detail:
      "HTML, CSS, JavaScript, and two fonts, all from this domain. After the first visit the browser caches them.",
    zero: false,
  },
  {
    what: "Google AdSense",
    sent: "on load",
    detail:
      "An ad script, which sets cookies and reports the URL you are on. Like any script on a page it could read the DOM — we do not pass it anything, but that is our word, not a guarantee the browser enforces. Ads pay for the domain.",
    zero: false,
  },
  {
    what: "Analytics",
    sent: "page views",
    detail:
      "Which pages get opened, and roughly where from. Never the editor contents, and there is no account to attach them to. Used to decide which converter to build next.",
    zero: false,
  },
] as const;

const FACTS = [
  {
    label: "Tools",
    value: String(TOOL_COUNT),
    note: "One formatter, nine code generators, eight format converters.",
  },
  {
    label: "Languages",
    value: "4",
    note: "English, 简体中文, Español, Português — full interface, not machine-translated labels.",
  },
  {
    label: "Server round-trips per conversion",
    value: "0",
    note: "Turn off your network after the page loads. Everything still works.",
  },
] as const;

export default function AboutPage() {
  const breadcrumb = breadcrumbStructuredData([{ name: "About", path: "/about/" }]);

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
              JSON.how / About
            </p>
            <h1 className="text-[38px] font-extrabold leading-[0.95] tracking-[-0.055em] sm:text-[52px]">
              Your JSON stays
              <br />
              on your machine.
            </h1>
            <p className="mt-5 text-base leading-7 text-[#4a4d54] sm:text-lg sm:leading-8">
              JSON.how is {TOOL_COUNT} tools for reading, checking, and converting JSON. All of
              them run in the browser tab you are reading this in. That is not a policy
              decision anyone has to honour — there is no server to upload to.
            </p>

            <section className="mt-14">
              <h2 className="text-xl font-extrabold tracking-[-0.03em]">
                What actually crosses the network
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666a72]">
                Every site says it respects your data. Here is the full list, including the
                parts that do not flatter us.
              </p>

              <ul className="mt-6 divide-y divide-[#e4e4df] border-y border-[#d9d9d5]">
                {NETWORK.map((row) => (
                  <li key={row.what} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
                    <div className="flex shrink-0 items-baseline gap-3 sm:w-56">
                      <span className="text-sm font-bold">{row.what}</span>
                      <span
                        className={
                          row.zero
                            ? "rounded bg-[#1261ff] px-1.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white"
                            : "font-mono text-[11px] uppercase tracking-wider text-[#8a8d93]"
                        }
                      >
                        {row.sent}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-[#4a4d54]">{row.detail}</p>
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-sm leading-6 text-[#666a72]">
                Do not take our word for any of it. Open your browser&apos;s network panel,
                paste a payload, and run a conversion — no request carrying it goes out. Or
                load a tool, switch to airplane mode, and keep working. If the last two rows
                bother you, an ad blocker removes them and every tool still runs.
              </p>
            </section>

            <section className="mt-14">
              <h2 className="text-xl font-extrabold tracking-[-0.03em]">By the numbers</h2>
              <dl className="mt-6 grid gap-6 sm:grid-cols-3">
                {FACTS.map((fact) => (
                  <div key={fact.label} className="border-t-2 border-[#141414] pt-3">
                    <dd className="text-4xl font-extrabold tracking-[-0.05em]">{fact.value}</dd>
                    <dt className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-[#6f7279]">
                      {fact.label}
                    </dt>
                    <p className="mt-2 text-sm leading-6 text-[#666a72]">{fact.note}</p>
                  </div>
                ))}
              </dl>
            </section>

            <section className="mt-14">
              <h2 className="text-xl font-extrabold tracking-[-0.03em]">Why build another one</h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-[#4a4d54] sm:text-base">
                <p>
                  Most JSON converters generate types from the first record in an array. That
                  works until the second record has a field the first one lacked, at which
                  point the generated interface is quietly wrong — and it is wrong exactly on
                  the payloads where the type would have helped.
                </p>
                <p>
                  Every generator here reads all the records. A field present in some and not
                  others comes out optional. A value that is sometimes null widens instead of
                  guessing. Where the target language cannot express absence in a primitive,
                  the boxed type is used, so a missing count does not silently become zero.
                </p>
                <p>
                  The claims in the notes under each tool are checked against real generator
                  output rather than proofread. Three bugs were found that way, which is a
                  reasonable argument for the practice.
                </p>
              </div>
            </section>

            <section className="mt-14">
              <h2 className="text-xl font-extrabold tracking-[-0.03em]">Who maintains it</h2>
              <p className="mt-4 text-sm leading-7 text-[#4a4d54] sm:text-base">
                JSON.how is a small independent project, not a company with a sales team. It is
                free, needs no account, and stays that way. If a converter gets something
                wrong, the fix is worth more to us than the compliment — the tool notes exist
                because someone checked.
              </p>
            </section>

            <nav className="mt-14 flex flex-col gap-3 border-t border-[#dedede] pt-6 text-sm sm:flex-row sm:gap-8">
              <Link
                href="/"
                className="font-semibold text-[#1261ff] underline decoration-2 underline-offset-4"
              >
                Format some JSON →
              </Link>
              <Link
                href="/tools/"
                className="text-[#4a4d54] underline decoration-[#dedede] decoration-2 underline-offset-4 hover:decoration-[#1261ff]"
              >
                All {TOOL_COUNT} tools
              </Link>
              <Link
                href="/wiki/"
                className="text-[#4a4d54] underline decoration-[#dedede] decoration-2 underline-offset-4 hover:decoration-[#1261ff]"
              >
                Read the guides
              </Link>
            </nav>
          </div>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}

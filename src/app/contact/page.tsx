import type { Metadata } from "next";
import Link from "next/link";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL, breadcrumbStructuredData } from "@/components/StructuredData";

/**
 * Contact.
 *
 * AdSense wants a working way to reach whoever runs the site. The site is
 * static with no backend, so a form would need a third-party endpoint and a
 * new place for data to go — an email address is the honest option for a
 * client-side site, and the one the About page's "small independent project"
 * framing implies.
 *
 * `CONTACT_EMAIL` is the single source of truth. Change it here and the mailto,
 * the visible address, and the schema all move together.
 */
const CONTACT_EMAIL = "17688973632ljw@gmail.com";

export const metadata: Metadata = {
  title: { absolute: "Contact | JSON.how" },
  description:
    "How to reach the people behind JSON.how: report a converter bug, suggest a tool, or ask about privacy and the ads.",
  keywords: ["contact json.how", "json.how support", "report bug", "json tool feedback"],
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: "Contact | JSON.how",
    description: "Report a bug, suggest a tool, or ask a question.",
    url: `${SITE_URL}/contact/`,
    siteName: "JSON.how",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact JSON.how" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | JSON.how",
    description: "Report a bug, suggest a tool, or ask a question.",
    images: ["/og-image.png"],
  },
};

export default function ContactPage() {
  const breadcrumb = breadcrumbStructuredData([{ name: "Contact", path: "/contact/" }]);

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact JSON.how",
    url: `${SITE_URL}/contact/`,
    mainEntity: {
      "@type": "Organization",
      name: "JSON.how",
      url: `${SITE_URL}/`,
      email: CONTACT_EMAIL,
    },
  };

  return (
    <div className="flex min-h-screen bg-[#f7f7f4] text-[#141414]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <AppSidebar />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex-1 px-4 py-10 sm:px-6 lg:px-9 lg:py-14">
          <div className="mx-auto max-w-3xl">
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#1261ff]">
              JSON.how / Contact
            </p>
            <h1 className="text-[38px] font-extrabold leading-[0.95] tracking-[-0.055em] sm:text-[48px]">
              Get in touch
            </h1>
            <p className="mt-5 text-base leading-7 text-[#4a4d54] sm:text-lg sm:leading-8">
              JSON.how is a small independent project. There is no support queue and no ticket
              form — one address reaches the person who maintains the tools.
            </p>

            <div className="mt-8 rounded-lg border border-[#d9d9d5] bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a8d93]">Email</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-2 inline-block text-2xl font-extrabold tracking-[-0.03em] text-[#1261ff] hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <section className="mt-12">
              <h2 className="text-xl font-extrabold tracking-[-0.03em]">What is worth an email</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4a4d54] sm:text-base">
                <li className="flex gap-3">
                  <span aria-hidden="true" className="font-semibold text-[#1261ff]">→</span>
                  <span>
                    <strong>A converter got something wrong.</strong> A payload and the output
                    you expected is the most useful thing you can send; the tool notes exist
                    because someone checked, and a fix is worth more than a compliment.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="font-semibold text-[#1261ff]">→</span>
                  <span>
                    <strong>A tool you wish existed.</strong> The catalogue grows from what
                    people actually reach for.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="font-semibold text-[#1261ff]">→</span>
                  <span>
                    <strong>Anything about privacy or the ads.</strong> The{" "}
                    <Link href="/privacy/" className="font-semibold text-[#1261ff] hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    covers most of it; if it does not answer your question, ask.
                  </span>
                </li>
              </ul>
            </section>

            <p className="mt-10 text-sm leading-7 text-[#666a72]">
              A reminder that belongs here too: nothing you paste into the tools is ever sent
              anywhere, so please do not paste a payload into an email either. A short,
              redacted example is enough to reproduce almost any bug.
            </p>

            <nav className="mt-14 flex flex-col gap-3 border-t border-[#dedede] pt-6 text-sm sm:flex-row sm:gap-8">
              <Link
                href="/about/"
                className="font-semibold text-[#1261ff] underline decoration-2 underline-offset-4"
              >
                About the project →
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

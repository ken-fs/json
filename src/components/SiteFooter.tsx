import Link from "next/link";
import { TOOLS } from "@/lib/tools";

const TOOL_COUNT = TOOLS.length + 1;

/**
 * The one footer every primary page shares.
 *
 * It exists for two audiences. A reader gets a way to the policy pages from the
 * bottom of any page. An AdSense reviewer gets what the program requires and a
 * tool site usually forgets: a Privacy Policy, Terms, and a Contact route that
 * are reachable from every page, not just the sitemap — and reachable on
 * mobile, where `AppSidebar` (`hidden lg:flex`) is not rendered and Google does
 * its indexing.
 *
 * Server-safe on purpose: no hooks, so it drops into both the server shells
 * (home, /tools, /about) and the client `ConverterWorkspace` without a
 * `"use client"` boundary. Labels are English to match the rest of the chrome
 * that ships English and localises client-side.
 */

const NAV: { href: string; label: string }[] = [
  { href: "/tools/", label: `All ${TOOL_COUNT} tools` },
  { href: "/wiki/", label: "Guides" },
  { href: "/about/", label: "About" },
  { href: "/privacy/", label: "Privacy" },
  { href: "/terms/", label: "Terms" },
  { href: "/contact/", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-[#dedede] px-4 py-8 sm:px-6 lg:px-9">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-medium text-[#4a4d54] hover:text-[#1261ff]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="text-[12px] text-[#8a8d93]">
          © JSON.how · Nothing you paste leaves your browser.
        </p>
      </div>
    </footer>
  );
}

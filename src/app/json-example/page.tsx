import type { Metadata } from "next";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "JSON Example: Simple, Nested and Array Samples You Can Copy",
  description:
    "Copy-ready JSON examples: a simple object, an array, nested data and every value type. Paste any of them into the validator to check it.",
  alternates: { canonical: "/json-example/" },
};

const SIMPLE = `{
  "name": "Ada",
  "age": 36,
  "active": true,
  "email": null
}`;

const ARRAY = `[
  { "id": 1, "title": "Buy milk" },
  { "id": 2, "title": "Call Sam" }
]`;

const NESTED = `{
  "user": {
    "name": "Ada",
    "address": { "city": "London", "zip": "N1 9GU" }
  },
  "orders": [
    { "id": 101, "items": ["pen", "paper"] },
    { "id": 102, "items": [] }
  ]
}`;

const TYPES = `{
  "string": "hello",
  "number": 3.14,
  "boolean": false,
  "null": null,
  "array": [1, 2, 3],
  "object": { "key": "value" }
}`;

const link = "text-[#1261ff] underline";

function Sample({ title, code, note }: { title: string; code: string; note: string }) {
  return (
    <>
      <h2 className="mt-8 text-lg font-semibold">{title}</h2>
      <p className="mt-2">{note}</p>
      <pre className="mt-3 overflow-x-auto rounded-md border border-[#dedede] bg-white p-4 text-[13px] leading-6">
        <code>{code}</code>
      </pre>
    </>
  );
}

export default function JsonExamplePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "JSON Example: Simple, Nested and Array Samples",
    url: `${SITE_URL}/json-example/`,
    dateModified: "2026-11-21",
    author: { "@type": "Organization", name: "JSON.how" },
  };
  return (
    <div className="flex min-h-screen bg-[#f7f7f4] text-[#141414]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AppSidebar />
      <div className="relative flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="px-6 py-10 text-[15px] leading-relaxed">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1261ff]">Examples</p>
            <h1 className="mt-2 text-[34px] font-extrabold leading-tight tracking-[-0.04em]">JSON Example</h1>
            <p className="mt-4">
              JSON is text made of key/value pairs in curly braces. Below are four samples you can copy. Each one is
              valid.
            </p>

            <Sample
              title="Simple JSON object"
              note="One object with a string, a number, a boolean and a null. Keys are always in double quotes."
              code={SIMPLE}
            />
            <Sample
              title="JSON array of objects"
              note="A list of records. This is what most APIs return. It also converts cleanly to a table or CSV."
              code={ARRAY}
            />
            <Sample
              title="Nested JSON example"
              note="Objects inside objects, and arrays inside objects. Use it to practice reading deep data."
              code={NESTED}
            />
            <Sample
              title="Every JSON value type"
              note="JSON has only six value types. Dates are not one of them, so people store dates as strings."
              code={TYPES}
            />

            <h2 className="mt-8 text-lg font-semibold">What to do with an example</h2>
            <ul className="mt-2 list-disc pl-5">
              <li>Check your own JSON with the <a className={link} href="/json-validator/">JSON validator</a>.</li>
              <li>Turn an array into a spreadsheet with <a className={link} href="/json-to-csv/">JSON to CSV</a>.</li>
              <li>Make a schema from a sample with <a className={link} href="/json-to-json-schema/">JSON to JSON Schema</a>.</li>
              <li>Broken sample? <a className={link} href="/json-repair/">Repair it</a>.</li>
              <li>Prefer Spanish? See <a className={link} href="/json-anidado/">JSON anidado</a>.</li>
            </ul>
          </div>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}


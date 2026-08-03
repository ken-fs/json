import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Header from "@/components/Header";
import WikiJsonLd from "@/components/WikiJsonLd";
import { withInlineCode } from "@/components/inlineCode";
import type { WikiArticleContent, WikiSample, WikiTable } from "@/lib/wikiArticle";
import type { WikiMetaInput, WikiLocale } from "@/lib/wikiMeta";

/**
 * Layout for a data-driven wiki article.
 *
 * Owns everything the four locales share, which is all of it apart from the
 * words. The six hand-written articles each carry their own copy of this markup
 * per locale; adding a seventh that way would have meant four more near-identical
 * 500-line files.
 *
 * Uses the design tokens from AGENTS.md rather than the `gray-*`/`blue-*` palette
 * the old wiki pages are still on. New surfaces follow the current rules; the
 * old ones get ported deliberately, not by accident in passing.
 *
 * A server component: nothing here is interactive, so the prose is in the static
 * export for a crawler to read without running the client bundle.
 */

interface WikiArticleProps {
  meta: WikiMetaInput;
  content: WikiArticleContent;
}

export default function WikiArticle({ meta, content }: WikiArticleProps) {
  const locale = meta.locale as WikiLocale;

  return (
    <div className="min-h-screen bg-[#f7f7f4]">
      <WikiJsonLd {...meta} />
      <Header />

      <main className="px-4 py-9 sm:px-6 lg:px-9">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]">
            <Link
              href={`/wiki/${locale}/`}
              className="inline-flex items-center gap-1.5 font-semibold text-[#1261ff] hover:underline"
            >
              <ArrowLeftIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {content.backToWiki}
            </Link>
            <span aria-hidden="true" className="text-[#c5c5c0]">
              /
            </span>
            <Link href="/" className="text-[#666a72] hover:text-[#141414] hover:underline">
              {content.backToTools}
            </Link>
          </div>

          <header className="mb-9 max-w-3xl">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#1261ff]">
              {content.eyebrow}
            </p>
            <h1 className="text-[36px] font-black leading-[1.05] tracking-[-0.05em] text-[#111] sm:text-[46px]">
              {content.heading}
            </h1>
            <p className="mt-4 text-base leading-7 text-[#4c5057]">
              {withInlineCode(content.standfirst)}
            </p>
          </header>

          {/* The article column is wider than the contents rail: prose and code
              samples need the room, and a table of contents does not. */}
          <div className="lg:flex lg:items-start lg:gap-12">
            <nav
              className="mb-8 shrink-0 border-t border-[#dedede] pt-4 lg:sticky lg:top-8 lg:order-2 lg:mb-0 lg:w-[220px] lg:border-t-0 lg:pt-0"
              aria-labelledby="wiki-toc"
            >
              <h2
                id="wiki-toc"
                className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a9da3]"
              >
                {content.contentsLabel}
              </h2>
              <ul className="space-y-2">
                {content.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-[13px] leading-snug text-[#4c5057] hover:text-[#1261ff] hover:underline"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <article className="min-w-0 max-w-3xl lg:order-1 lg:flex-1">
              {content.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="mb-11 scroll-mt-8 border-t border-[#dedede] pt-7"
                >
                  <h2 className="mb-4 text-[22px] font-black tracking-[-0.035em] text-[#111]">
                    {section.heading}
                  </h2>

                  {section.body.map((paragraph, index) => (
                    <p key={index} className="mb-3.5 text-[15px] leading-7 text-[#4c5057]">
                      {withInlineCode(paragraph)}
                    </p>
                  ))}

                  {section.points ? (
                    <ul className="mb-4 mt-4 space-y-2.5">
                      {section.points.map((point, index) => (
                        <li
                          key={index}
                          className="flex gap-3 text-[15px] leading-7 text-[#4c5057]"
                        >
                          <span aria-hidden="true" className="shrink-0 text-[#95ee1c]">
                            —
                          </span>
                          <span>{withInlineCode(point)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.table ? <ComparisonTable {...section.table} /> : null}
                  {section.sample ? <CodeSample {...section.sample} /> : null}
                </section>
              ))}

              <section
                aria-labelledby="wiki-related"
                className="border-t border-[#dedede] pt-7"
              >
                <h2
                  id="wiki-related"
                  className="mb-4 text-[22px] font-black tracking-[-0.035em] text-[#111]"
                >
                  {content.relatedLabel}
                </h2>
                <ul className="space-y-3">
                  {content.related.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[15px] font-semibold text-[#1261ff] hover:underline"
                      >
                        {link.label}
                      </Link>
                      <span className="block text-sm leading-6 text-[#666a72]">
                        {link.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}

function ComparisonTable({ caption, headers, rows }: WikiTable) {
  return (
    <div className="my-5 overflow-x-auto rounded-lg border border-[#d9d9d5] bg-white">
      <table className="w-full border-collapse text-left text-sm">
        {caption ? (
          <caption className="px-4 pt-3.5 text-left text-xs text-[#8a8d93]">{caption}</caption>
        ) : null}
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="border-b border-[#e2e2de] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#6f7279]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-[#eeeeea] last:border-b-0">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-2.5 align-top leading-6 text-[#4c5057]"
                >
                  {withInlineCode(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Input/output pair.
 *
 * Both panes get a visible label, because the whole point of every sample on
 * this site is which side you are looking at. Rendered as `<pre>` so the
 * whitespace that carries the meaning in YAML survives.
 */
function CodeSample({ inputLabel, input, outputLabel, output, note }: WikiSample) {
  return (
    <figure className="my-5">
      <div className={output === undefined ? "" : "grid gap-3 lg:grid-cols-2"}>
        <SamplePane label={inputLabel} body={input} />
        {output === undefined ? null : <SamplePane label={outputLabel} body={output} />}
      </div>
      {note ? (
        <figcaption className="mt-2.5 text-sm leading-6 text-[#666a72]">
          {withInlineCode(note)}
        </figcaption>
      ) : null}
    </figure>
  );
}

function SamplePane({ label, body }: { label?: string; body: string }) {
  return (
    <div className="min-w-0 overflow-hidden rounded-lg border border-[#d9d9d5] bg-white">
      {label ? (
        <p className="border-b border-[#e2e2de] bg-[#fbfbf8] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#6f7279]">
          {label}
        </p>
      ) : null}
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[12.5px] leading-6 text-[#25282d]">
        {body}
      </pre>
    </div>
  );
}

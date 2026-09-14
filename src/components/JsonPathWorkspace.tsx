"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { JSONPath } from "jsonpath-plus";
import ToolIntro from "./ToolIntro";

const EXAMPLE_JSON = JSON.stringify(
  {
    store: {
      book: [
        { title: "Sayings", price: 8.95, author: "Confucius" },
        { title: "Sword", price: 12.99, author: "Melville" },
        { title: "Omens", price: 8.99, author: "Roberts" },
      ],
      bicycle: { color: "red", price: 19.95 },
    },
  },
  null,
  2,
);

/**
 * JSONPath evaluator workspace: JSON on the left, live matches on the right.
 * Custom layout (query bar on top) so it does not fit the converter registry;
 * visual language mirrors ConverterWorkspace.
 */
export default function JsonPathWorkspace() {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("$.store.book[*].author");
  const [copied, setCopied] = useState(false);

  const { resultText, error } = useMemo(() => {
    if (!input.trim()) return { resultText: "", error: "" };
    let json: unknown;
    try {
      json = JSON.parse(input);
    } catch (e) {
      return { resultText: "", error: e instanceof Error ? e.message : String(e) };
    }
    if (!query.trim()) return { resultText: "", error: "" };
    try {
      const matches = JSONPath({ path: query, json: json as object });
      if (matches.length === 0) {
        return { resultText: "", error: "no-matches" };
      }
      return { resultText: JSON.stringify(matches, null, 2), error: "" };
    } catch (e) {
      return { resultText: "", error: e instanceof Error ? e.message : String(e) };
    }
  }, [input, query]);

  const hasOutput = resultText.length > 0;

  return (
    <div>
      {/* Query bar */}
      <div className="mb-4 flex items-center gap-3 rounded-lg border border-[#d9d9d5] bg-white px-4 py-3">
        <span className="shrink-0 text-sm font-bold uppercase tracking-[0.08em] text-[#27292e]">
          JSONPath
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="$.store.book[*].author"
          spellCheck={false}
          className="min-w-0 flex-1 border-none bg-transparent font-mono text-[13px] text-[#25282d] outline-none placeholder:text-[#9a9da3]"
          aria-label="JSONPath expression"
        />
      </div>

      <div className="grid min-h-[560px] overflow-hidden rounded-lg border border-[#d9d9d5] bg-white lg:grid-cols-2">
        <section className="flex min-h-[420px] min-w-0 flex-col border-b border-[#d9d9d5] lg:border-b-0 lg:border-r">
          <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-[#e2e2de] px-5">
            <span className="rounded bg-[#f0f0ec] px-2 py-1 text-xs font-medium text-[#666a72]">
              JSON
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setInput(EXAMPLE_JSON)}
                className="inline-flex h-9 items-center rounded-md border border-[#d6d6d1] px-3 text-sm font-semibold text-[#3a3d43] transition-colors hover:bg-[#f8f8f5]"
              >
                {t("example", { defaultValue: "Example" })}
              </button>
              <button
                type="button"
                onClick={() => setInput("")}
                className="inline-flex h-9 items-center rounded-md border border-[#d6d6d1] px-3 text-sm font-semibold text-[#3a3d43] transition-colors hover:bg-[#f8f8f5]"
              >
                {t("clear", { defaultValue: "Clear" })}
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[360px] flex-1 resize-none overflow-auto border-none bg-white p-5 font-mono text-[13px] leading-6 text-[#25282d] outline-none placeholder:font-sans placeholder:text-[#9a9da3]"
            placeholder={t("pasteInputPlaceholder", {
              defaultValue: "Paste JSON here",
            })}
            spellCheck={false}
            aria-label="JSON input"
            style={{ wordBreak: "break-all", whiteSpace: "pre-wrap" }}
          />
        </section>

        <section className="flex min-h-[420px] min-w-0 flex-col">
          <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-[#e2e2de] px-5">
            <span className="rounded bg-[#f0f0ec] px-2 py-1 text-xs font-medium text-[#666a72]">
              {t("matches", { defaultValue: "Matches" })}
            </span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(resultText).then(
                  () => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  },
                  () => {},
                );
              }}
              disabled={!hasOutput}
              className="inline-flex h-9 items-center rounded-md bg-[#1261ff] px-3 text-sm font-semibold text-white transition-colors hover:bg-[#064fdc] disabled:cursor-not-allowed disabled:bg-[#b9cdf8]"
            >
              {copied ? t("copied", { defaultValue: "Copied!" }) : t("copy", { defaultValue: "Copy" })}
            </button>
          </div>
          <div className="min-h-[360px] flex-1 overflow-auto bg-white p-5">
            {error === "no-matches" ? (
              <p className="text-sm text-[#8a8d93]">
                {t("jsonpathNoMatches", {
                  defaultValue: "No matches - check the path segment by segment.",
                })}
              </p>
            ) : error ? (
              <p className="font-mono text-[13px] leading-6 text-[#c92a2a]">{error}</p>
            ) : hasOutput ? (
              <pre className="font-mono text-[13px] leading-6 whitespace-pre-wrap break-all text-[#25282d]">
                {resultText}
              </pre>
            ) : (
              <p className="text-sm text-[#8a8d93]">
                {t("outputAppearsHere", { defaultValue: "Matches appear here as you type." })}
              </p>
            )}
          </div>
        </section>
      </div>

      <ToolIntro id="jsonpath" />
    </div>
  );
}

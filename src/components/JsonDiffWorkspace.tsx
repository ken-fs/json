"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import * as jsondiffpatch from "jsondiffpatch";
import * as htmlFormatter from "jsondiffpatch/formatters/html";
import "jsondiffpatch/formatters/styles/html.css";
import ToolIntro from "./ToolIntro";

const EXAMPLE_LEFT = JSON.stringify(
  { id: 1042, name: "Ada Lovelace", role: "engineer", tags: ["backend", "api"] },
  null,
  2,
);
const EXAMPLE_RIGHT = JSON.stringify(
  { id: 1042, name: "Ada Lovelace", role: "staff engineer", active: true, tags: ["backend", "api", "mentor"] },
  null,
  2,
);

const diffpatcher = jsondiffpatch.create();

/**
 * JSON diff workspace: original left, changed right, visual delta below.
 * Compares parsed structures (key order and whitespace never produce noise).
 */
export default function JsonDiffWorkspace() {
  const { t } = useTranslation();
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const { diffHtml, error, identical } = useMemo(() => {
    if (!left.trim() || !right.trim())
      return { diffHtml: "", error: "", identical: false };
    let a: unknown, b: unknown;
    try {
      a = JSON.parse(left);
      b = JSON.parse(right);
    } catch (e) {
      return { diffHtml: "", error: e instanceof Error ? e.message : String(e), identical: false };
    }
    const delta = diffpatcher.diff(a, b);
    if (!delta) return { diffHtml: "", error: "", identical: true };
    return {
      diffHtml: htmlFormatter.format(delta, a as object),
      error: "",
      identical: false,
    };
  }, [left, right]);

  return (
    <div>
      <div className="grid overflow-hidden rounded-lg border border-[#d9d9d5] bg-white lg:grid-cols-2">
        {(
          [
            [t("original", { defaultValue: "Original" }), left, setLeft, EXAMPLE_LEFT],
            [t("changed", { defaultValue: "Changed" }), right, setRight, EXAMPLE_RIGHT],
          ] as const
        ).map(([label, value, setter, example], i) => (
          <section
            key={label}
            className={`flex min-h-[300px] min-w-0 flex-col ${
              i === 0 ? "border-b border-[#d9d9d5] lg:border-b-0 lg:border-r" : ""
            }`}
          >
            <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-[#e2e2de] px-5">
              <span className="rounded bg-[#f0f0ec] px-2 py-1 text-xs font-medium text-[#666a72]">
                {label}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setter(example)}
                  className="inline-flex h-9 items-center rounded-md border border-[#d6d6d1] px-3 text-sm font-semibold text-[#3a3d43] transition-colors hover:bg-[#f8f8f5]"
                >
                  {t("example", { defaultValue: "Example" })}
                </button>
                <button
                  type="button"
                  onClick={() => setter("")}
                  className="inline-flex h-9 items-center rounded-md border border-[#d6d6d1] px-3 text-sm font-semibold text-[#3a3d43] transition-colors hover:bg-[#f8f8f5]"
                >
                  {t("clear", { defaultValue: "Clear" })}
                </button>
              </div>
            </div>
            <textarea
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="min-h-[240px] flex-1 resize-none overflow-auto border-none bg-white p-5 font-mono text-[13px] leading-6 text-[#25282d] outline-none placeholder:font-sans placeholder:text-[#9a9da3]"
              placeholder={t("pasteInputPlaceholder", { defaultValue: "Paste JSON here" })}
              spellCheck={false}
              aria-label={`${label} JSON`}
              style={{ wordBreak: "break-all", whiteSpace: "pre-wrap" }}
            />
          </section>
        ))}
      </div>

      {/* Result */}
      <div className="mt-4 rounded-lg border border-[#d9d9d5] bg-white">
        <div className="flex h-[60px] items-center justify-between border-b border-[#e2e2de] px-5">
          <span className="rounded bg-[#f0f0ec] px-2 py-1 text-xs font-medium text-[#666a72]">
            {t("difference", { defaultValue: "Difference" })}
          </span>
          <button
            type="button"
            onClick={() => {
              setLeft(right);
              setRight(left);
            }}
            className="inline-flex h-9 items-center rounded-md border border-[#d6d6d1] px-3 text-sm font-semibold text-[#3a3d43] transition-colors hover:bg-[#f8f8f5]"
          >
            {t("swap", { defaultValue: "Swap sides" })}
          </button>
        </div>
        <div className="overflow-auto p-5">
          {error ? (
            <p className="font-mono text-[13px] leading-6 text-[#c92a2a]">{error}</p>
          ) : identical ? (
            <p className="text-sm text-[#2f9e44]">
              {t("jsonDiffIdentical", { defaultValue: "The two documents are identical." })}
            </p>
          ) : diffHtml ? (
            <div
              className="jsondiffpatch-delta text-[13px]"
              // The delta HTML is generated locally from user input by
              // jsondiffpatch's formatter - it never includes markup from the
              // input itself (values are escaped by the formatter).
              dangerouslySetInnerHTML={{ __html: diffHtml }}
            />
          ) : (
            <p className="text-sm text-[#8a8d93]">
              {t("jsonDiffHint", {
                defaultValue: "Paste both documents - the delta appears here.",
              })}
            </p>
          )}
        </div>
      </div>

      <ToolIntro id="json-diff" />
    </div>
  );
}

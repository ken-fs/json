import React from "react";

/**
 * Render the two inline styles the copy uses: `` `code` `` and `**strong**`.
 *
 * Deliberately not markdown. The copy needs exactly these two, and a parser
 * would be more code than the feature plus a larger bundle on every page. The
 * split is done in one pass over one regex so a `**term**` containing a
 * backticked span still resolves — the alternation matches whichever opens first.
 *
 * Lives here rather than inside `ToolIntro` because the wiki articles need the
 * same thing. Not a component but a function returning nodes, so a server
 * component can call it without pulling anything into a client bundle.
 */
export function withInlineCode(text: string): React.ReactNode[] {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={index}
          className="rounded bg-[#f2f2ed] px-1.5 py-0.5 font-mono text-[0.9em] text-[#1261ff]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={index} className="font-bold text-[#141414]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

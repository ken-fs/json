/**
 * Content model for a wiki article.
 *
 * The six original articles are hand-written TSX, 250–590 lines each, with the
 * layout copied per locale — 24 files that all have to be edited in parallel to
 * change one heading. New articles are data instead: one object per locale, fed
 * to `<WikiArticle>`, which owns the layout. Four locales share one set of
 * classes, so a spacing fix lands everywhere at once.
 *
 * The old six are deliberately left alone. Porting them is its own task and
 * would touch every URL Google has already indexed.
 *
 * Backticks mark inline code: `` `{}` `` renders in the mono face, same as the
 * tool intros. Write claims that are actually true of the converters — the
 * examples in here were produced by running the real functions, not typed from
 * memory. `pnpm test:wiki` re-runs them and fails if the output has drifted.
 */

/** A prose block: a heading plus body copy, and optionally a code sample. */
export interface WikiSection {
  /** Anchor id, used by the table of contents. Keep it stable — it gets linked. */
  id: string;
  heading: string;
  /** Paragraphs. Backticked spans become inline code. */
  body: string[];
  /** Optional verified code sample rendered below the prose. */
  sample?: WikiSample;
  /** Optional comparison table. */
  table?: WikiTable;
  /** Optional list of short points. */
  points?: string[];
}

/**
 * A code sample. `input` / `output` are shown as a labelled pair when both are
 * present, which is most of the time on this site — the interesting thing is
 * almost always what a given input turns into.
 */
export interface WikiSample {
  /** What the reader is looking at, e.g. "Input JSON". */
  inputLabel?: string;
  input: string;
  outputLabel?: string;
  output?: string;
  /** One line under the sample, for the thing that is easy to miss. */
  note?: string;
}

export interface WikiTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

/** A link to a tool page or another article. */
export interface WikiLink {
  href: string;
  label: string;
  /** Why a reader would follow it. Not optional — a bare link list is noise. */
  detail: string;
}

export interface WikiArticleContent {
  /** Shown above the h1, e.g. "Formats". */
  eyebrow: string;
  /** The visible h1. May differ from the `<title>`, which is SERP-width bound. */
  heading: string;
  /** One paragraph under the h1: what this answers, and for whom. */
  standfirst: string;
  /** Label for the table-of-contents heading, translated per locale. */
  contentsLabel: string;
  sections: WikiSection[];
  /** Closing links. Renders as a labelled list, not a bare pile of anchors. */
  relatedLabel: string;
  related: WikiLink[];
  /** Back-navigation copy. */
  backToWiki: string;
  backToTools: string;
}

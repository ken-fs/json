/**
 * Re-derives every sample printed in the data-driven wiki articles from the real
 * converters.
 *
 * The articles in `src/lib/wiki/*` make claims about what the tools on this site
 * output — that `jsonToYAML` quotes `"01234"` so the round trip is lossless, that
 * `jsonToCSV` stops unwrapping when there are two arrays, that a trailing `#` in
 * YAML survives into the string value. Each of those is a real observed result,
 * and each would quietly become a lie if the converter changed. So the samples
 * are exported from the content files and checked here against a fresh call.
 *
 * Unlike the other two suites in this directory, this one exits non-zero on
 * failure. A doc page that has drifted from the code is worth breaking a build
 * over, and the point of the file is to be that gate.
 */

import { jsonToCSV, csvToJSON, jsonToYAML, yamlToJSON } from '../src/lib/json/formats';
import { escapeJSON, unescapeJSON, isEscapedJSON } from '../src/lib/utils';

import { SAMPLES as YAML_SAMPLES } from '../src/lib/wiki/json-vs-yaml';
import { SAMPLES as CSV_SAMPLES } from '../src/lib/wiki/json-to-csv-nested';
import { SAMPLES as ESCAPE_SAMPLES } from '../src/lib/wiki/json-escaping';
import { SAMPLES as COMMENT_SAMPLES } from '../src/lib/wiki/json-comments';

import { CONTENT as YAML_CONTENT, META as YAML_META } from '../src/lib/wiki/json-vs-yaml';
import { CONTENT as CSV_CONTENT, META as CSV_META } from '../src/lib/wiki/json-to-csv-nested';
import { CONTENT as ESCAPE_CONTENT, META as ESCAPE_META } from '../src/lib/wiki/json-escaping';
import { CONTENT as COMMENT_CONTENT, META as COMMENT_META } from '../src/lib/wiki/json-comments';

import {
  WIKI_ARTICLES,
  WIKI_LOCALES,
  LOCALE_FOR_LANGUAGE,
  languageForWikiPath,
  wikiPathForLocale,
  type WikiLocale,
} from '../src/lib/wikiMeta';
import type { WikiArticleContent } from '../src/lib/wikiArticle';
import type { WikiMetaInput } from '../src/lib/wikiMeta';

let failures = 0;

function check(label: string, actual: string, expected: string) {
  if (actual === expected) {
    console.log(`ok   ${label}`);
    return;
  }
  failures++;
  console.log(`FAIL ${label}\n  article says:\n${indent(expected)}\n  code produces:\n${indent(actual)}`);
}

function assert(label: string, condition: boolean, detail = '') {
  if (condition) {
    console.log(`ok   ${label}`);
    return;
  }
  failures++;
  console.log(`FAIL ${label}${detail ? `: ${detail}` : ''}`);
}

const indent = (text: string) => text.split('\n').map((line) => `    ${line}`).join('\n');

console.log('--- json-vs-yaml ---');
check('config JSON to YAML', jsonToYAML(YAML_SAMPLES.configInput), YAML_SAMPLES.configOutput);
check('ambiguous scalars quoted', jsonToYAML(YAML_SAMPLES.quotingInput), YAML_SAMPLES.quotingOutput);
check(
  'hand-written YAML loses data',
  yamlToJSON(YAML_SAMPLES.unquotedInput),
  YAML_SAMPLES.unquotedOutput,
);
assert(
  'generated YAML round-trips losslessly',
  yamlToJSON(jsonToYAML(YAML_SAMPLES.quotingInput)) ===
    JSON.stringify(JSON.parse(YAML_SAMPLES.quotingInput), null, 2),
  'the article claims the quoting makes the round trip exact',
);

console.log('\n--- json-to-csv-nested ---');
check('nested object flattens', jsonToCSV(CSV_SAMPLES.nestedInput), CSV_SAMPLES.nestedOutput);
check('scalar array', jsonToCSV(CSV_SAMPLES.scalarArrayInput), CSV_SAMPLES.scalarArrayOutput);
check('array of objects', jsonToCSV(CSV_SAMPLES.objectArrayInput), CSV_SAMPLES.objectArrayOutput);
check('ragged rows', jsonToCSV(CSV_SAMPLES.raggedInput), CSV_SAMPLES.raggedOutput);
check('single wrapper unwrapped', jsonToCSV(CSV_SAMPLES.wrapperInput), CSV_SAMPLES.wrapperOutput);
check('two arrays not unwrapped', jsonToCSV(CSV_SAMPLES.twoArraysInput), CSV_SAMPLES.twoArraysOutput);
check('formula cell quoted', jsonToCSV(CSV_SAMPLES.injectionInput), CSV_SAMPLES.injectionOutput);
check('CSV back to JSON stays flat', csvToJSON(CSV_SAMPLES.roundTripInput), CSV_SAMPLES.roundTripOutput);

console.log('\n--- json-escaping ---');
check('escape once', escapeJSON(ESCAPE_SAMPLES.plain), ESCAPE_SAMPLES.escapedOnce);
check('escape twice', escapeJSON(ESCAPE_SAMPLES.escapedOnce), ESCAPE_SAMPLES.escapedTwice);
check(
  'unescape returns the document',
  unescapeJSON(ESCAPE_SAMPLES.escapedOnce),
  ESCAPE_SAMPLES.unescapedPretty,
);
check('control chars', escapeJSON(ESCAPE_SAMPLES.controlInput), ESCAPE_SAMPLES.controlOutput);
check('unicode passes through', escapeJSON(ESCAPE_SAMPLES.unicodeInput), ESCAPE_SAMPLES.unicodeOutput);
assert(
  'one unescape of a double-encoded string leaves it escaped',
  isEscapedJSON(unescapeJSON(ESCAPE_SAMPLES.escapedTwice)),
  'the article tells the reader to press the button twice',
);
assert(
  'escaped input is detected',
  isEscapedJSON(ESCAPE_SAMPLES.escapedOnce) && !isEscapedJSON(ESCAPE_SAMPLES.plain),
  'the article claims the formatter notices escaped input',
);

console.log('\n--- json-comments ---');
assert(
  'a line comment is a parse error',
  (() => {
    try {
      JSON.parse(COMMENT_SAMPLES.withComment);
      return false;
    } catch {
      return true;
    }
  })(),
);
check(
  'YAML comments dropped, trailing # kept in value',
  yamlToJSON(COMMENT_SAMPLES.yamlInput),
  COMMENT_SAMPLES.yamlOutput,
);
assert(
  'the sidecar-key example is valid JSON',
  (() => {
    try {
      JSON.parse(COMMENT_SAMPLES.sidecar);
      return true;
    } catch {
      return false;
    }
  })(),
);

/**
 * The SEO invariants `tests/seo.verify.py` enforces on the built HTML, checked
 * here instead so a too-long title fails in seconds rather than after a build.
 */
console.log('\n--- metadata limits ---');

const ARTICLES: Array<{
  slug: string;
  meta: Record<WikiLocale, WikiMetaInput>;
  content: Record<WikiLocale, WikiArticleContent>;
}> = [
  { slug: 'json-vs-yaml', meta: YAML_META, content: YAML_CONTENT },
  { slug: 'json-to-csv-nested', meta: CSV_META, content: CSV_CONTENT },
  { slug: 'json-escaping', meta: ESCAPE_META, content: ESCAPE_CONTENT },
  { slug: 'json-comments', meta: COMMENT_META, content: COMMENT_CONTENT },
];

// The descriptions test:seo rejects outright, in the four languages the wiki has.
const BANNED = ['seo', 'optimizado para', 'otimizado para'];

for (const article of ARTICLES) {
  assert(
    `${article.slug} is registered in WIKI_ARTICLES`,
    WIKI_ARTICLES.some((entry) => entry.slug === article.slug),
    'otherwise it ships four pages the sitemap does not list',
  );

  for (const locale of WIKI_LOCALES) {
    const meta = article.meta[locale];
    const label = `${article.slug}/${locale}`;

    assert(`${label} meta locale matches`, meta.locale === locale);
    assert(`${label} meta slug matches`, meta.slug === article.slug);
    assert(`${label} title <= 60`, meta.title.length <= 60, `${meta.title.length} chars`);
    assert(
      `${label} description <= 160`,
      meta.description.length <= 160,
      `${meta.description.length} chars`,
    );
    // A floor as well as a ceiling, because a description short enough to look
    // like a stub is as bad in a SERP as one that gets truncated. Google
    // truncates on pixel width, not characters, and a CJK glyph carries far more
    // meaning per character than a Latin one — so `cn` gets a lower bound.
    const floor = locale === 'cn' ? 40 : 100;
    assert(
      `${label} description >= ${floor}`,
      meta.description.length >= floor,
      `${meta.description.length} chars`,
    );
    assert(
      `${label} description avoids banned words`,
      !BANNED.some((word) => meta.description.toLowerCase().includes(word)),
    );

    // A duplicate id would make two TOC links point at the same section.
    const ids = article.content[locale].sections.map((section) => section.id);
    assert(`${label} section ids unique`, new Set(ids).size === ids.length);

    // Every internal href must end in `/` — `trailingSlash: true` 301s otherwise.
    for (const link of article.content[locale].related) {
      assert(
        `${label} related href "${link.href}" ends in /`,
        link.href.endsWith('/'),
        'trailingSlash: true means a missing slash costs a redirect',
      );
    }
  }

  // All four locales must describe the same article, or the TOC anchors and the
  // hreflang cluster disagree about what the page contains.
  const shape = WIKI_LOCALES.map((locale) =>
    article.content[locale].sections.map((section) => section.id).join(','),
  );
  assert(
    `${article.slug} has the same sections in all four locales`,
    new Set(shape).size === 1,
    shape.join(' | '),
  );
}

/**
 * Language switching on the wiki.
 *
 * The selector used to build these paths itself and got Chinese wrong in both
 * directions — `/wiki/cn/json-guide/` + English gave `/wiki/en/cn/json-guide/`,
 * and English + Chinese gave `/wiki/json-guide/`. Both 404. Every case below is
 * checked against the real route list, so a path that does not exist fails here
 * rather than in a visitor's browser.
 */
console.log('\n--- locale switching ---');

const ROUTES: ReadonlySet<string> = new Set([
  '/wiki/',
  ...WIKI_LOCALES.map((locale) => `/wiki/${locale}/`),
  ...WIKI_LOCALES.flatMap((locale) =>
    WIKI_ARTICLES.map((article) => `/wiki/${locale}/${article.slug}/`),
  ),
]);

// Switching from anywhere to anywhere has to land on a route that exists.
for (const from of WIKI_LOCALES) {
  for (const to of WIKI_LOCALES) {
    for (const article of WIKI_ARTICLES) {
      const source = `/wiki/${from}/${article.slug}/`;
      const result = wikiPathForLocale(source, to);
      assert(
        `${source} + ${to} -> ${result}`,
        result === `/wiki/${to}/${article.slug}/` && ROUTES.has(result),
        'must keep the slug and change only the locale',
      );
    }
    const index = wikiPathForLocale(`/wiki/${from}/`, to);
    assert(`/wiki/${from}/ + ${to} -> ${index}`, index === `/wiki/${to}/` && ROUTES.has(index));
  }
}

// The edges: the bare picker, a slug that does not exist, a non-wiki path.
const EDGES: Array<[string, WikiLocale, string]> = [
  ['/wiki/', 'cn', '/wiki/cn/'],
  ['/wiki', 'en', '/wiki/en/'],
  ['/wiki/en/no-such-article/', 'cn', '/wiki/cn/'],
  ['/wiki/cn/json-guide', 'pt', '/wiki/pt/json-guide/'],
  ['/json-to-yaml/', 'en', '/json-to-yaml/'],
];
for (const [input, locale, expected] of EDGES) {
  const result = wikiPathForLocale(input, locale);
  assert(`edge ${input} + ${locale} -> ${result}`, result === expected, `expected ${expected}`);
}

// The store code and the directory name differ (`zh` vs `cn`); the two mappings
// must be inverses or switching language lands one directory off.
for (const locale of WIKI_LOCALES) {
  const language = languageForWikiPath(`/wiki/${locale}/json-guide/`);
  assert(
    `${locale} round-trips through the language mapping`,
    language !== null && LOCALE_FOR_LANGUAGE[language] === locale,
    `got ${language}`,
  );
}
assert('a non-wiki path has no locale', languageForWikiPath('/json-to-yaml/') === null);
assert('the bare picker has no locale', languageForWikiPath('/wiki/') === null);

console.log(failures === 0 ? '\nALL PASS' : `\n${failures} FAILURES`);
if (failures > 0) process.exit(1);

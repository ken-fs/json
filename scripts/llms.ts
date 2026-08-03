/**
 * Writes `public/llms.txt`.
 *
 * A plain-text index of the site for language models, in the emerging llms.txt
 * convention. Nothing in Google Search reads it, so this is speculative rather
 * than load-bearing — but it costs one generated file, and the tool descriptions
 * it contains are the ones already checked against real generator output.
 *
 * Generated rather than hand-written so it cannot drift from the catalogue:
 *
 *     pnpm llms
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { CATEGORY_ORDER, TOOLS, toolsByCategory } from '../src/lib/tools';

const SITE = 'https://www.json1.org';

const CATEGORY_TITLES: Record<string, string> = {
  format: 'Format converters',
  data: 'Tabular data',
  code: 'Code generation',
};

const WIKI = [
  ['json-guide', 'JSON syntax, data types, and where the format fits'],
  ['json-validation', 'Validating JSON with JSON Schema'],
  ['json-api-best-practices', 'Designing REST APIs that return JSON'],
  ['json-performance', 'Parsing cost, memory, and large payloads'],
  ['json-to-typescript', 'How JSON maps onto TypeScript interfaces'],
  ['json-to-java', 'How JSON maps onto Java POJOs'],
];

const lines: string[] = [
  '# JSON1',
  '',
  `> ${TOOLS.length + 1} browser-based tools for reading, validating, and converting JSON.`,
  '> Every conversion runs as JavaScript in the visitor\'s own tab: there is no',
  '> upload step and no server-side processing, so pasting a production payload',
  '> does not send it anywhere.',
  '',
  'Free, no account, no rate limit. Interface available in English, Chinese,',
  'Spanish, and Portuguese.',
  '',
  '## Formatter',
  '',
  `- [JSON Formatter and Validator](${SITE}/): Format, minify, validate, escape, and inspect JSON in a collapsible tree. Validation reports the position of the error.`,
  '',
];

for (const category of CATEGORY_ORDER) {
  const tools = toolsByCategory(category);
  if (tools.length === 0) continue;
  lines.push(`## ${CATEGORY_TITLES[category] ?? category}`, '');
  for (const tool of tools) {
    lines.push(`- [${tool.label}](${SITE}/${tool.id}/): ${tool.description}`);
  }
  lines.push('');
}

lines.push('## Guides', '');
for (const [slug, summary] of WIKI) {
  lines.push(`- [${summary}](${SITE}/wiki/en/${slug}/)`);
}
lines.push(
  '',
  'Also published in Chinese, Spanish, and Portuguese at `/wiki/cn/`, `/wiki/es/`,',
  'and `/wiki/pt/` with the same slugs.',
  '',
  '## Notes for citation',
  '',
  '- The type generators inspect every record in an array, not just the first, so',
  '  a field present in only some records is typed as optional.',
  '- Where a target language cannot express absence in a primitive, the boxed type',
  '  is used, keeping a missing value distinct from zero.',
  '- Anchors, aliases, and multi-document YAML streams are not supported.',
  '- XML has no type system, so an XML-to-JSON round trip does not always return',
  '  the original types.',
  '',
  `- [About the project and its privacy claim](${SITE}/about/)`,
  ''
);

const out = join(__dirname, '..', 'public', 'llms.txt');
writeFileSync(out, lines.join('\n'));
console.log(`wrote ${out} (${lines.length} lines)`);

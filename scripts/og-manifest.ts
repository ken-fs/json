/**
 * Dumps the data the OG image generator needs, as JSON on stdout.
 *
 * The generator itself is Python (Playwright is already installed there), but
 * the tool catalogue lives in TypeScript. Reading it through tsx rather than
 * re-listing the tools in the Python file means a new tool cannot end up with a
 * page but no social card.
 */
import { TOOLS } from '../src/lib/tools';

const cards = [
  {
    out: 'og-image.png',
    eyebrow: 'json.how',
    title: 'JSON, formatted\nand converted.',
    sub: `${TOOLS.length + 1} tools. Nothing uploads.`,
    from: null,
    to: null,
  },
  {
    out: 'og/tools.png',
    eyebrow: 'json.how / all tools',
    title: `${TOOLS.length + 1} tools,\nno uploads.`,
    sub: 'Format, validate, convert, generate types.',
    from: null,
    to: null,
  },
  // The title is built from the two format labels rather than `tool.label`, so
  // every card reads the same way: `JSON to YAML` and `YAML to JSON` both become
  // a two-line from/to pair instead of one being an arrow and the other prose.
  ...TOOLS.map((tool) => ({
    out: `og/${tool.id}.png`,
    eyebrow: 'json.how',
    title: `${tool.inputLabel} →\n${tool.outputLabel}`,
    sub: tool.description.split('. ')[0].replace(/\.$/, '') + '.',
    from: tool.inputLabel,
    to: tool.outputLabel,
  })),
];

process.stdout.write(JSON.stringify(cards, null, 2));

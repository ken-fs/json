/**
 * The tool catalogue — pure data, no functions.
 *
 * Every tool page, sidebar entry, index card, and sitemap URL is derived from
 * this list, so adding a tool means adding one entry here plus its converter in
 * `@/lib/json/convert`.
 *
 * Keeping this module free of function values matters twice over: server
 * components can pass entries straight to client components, and importing it
 * for a nav link does not pull the conversion engine into that page's bundle.
 *
 * English copy lives on the entry because page `metadata` is generated on the
 * server where the client i18n instance is not available; the in-page UI reads
 * the matching `tools.<id>.*` translation keys instead.
 */

/** Groups tools in the sidebar and on the index page. */
export type ToolCategory = 'format' | 'code' | 'data';

export interface ToolDefinition {
  /** URL slug and i18n key, e.g. `json-to-yaml`. */
  id: string;
  category: ToolCategory;
  /** English name, used in `<title>` and as the i18n fallback. */
  label: string;
  /** One sentence for the meta description and the index card. */
  description: string;
  /** Label above the left editor pane. */
  inputLabel: string;
  /** Label above the right output pane. */
  outputLabel: string;
  /** Syntax mode for the output pane. `json` gets the collapsible tree view. */
  outputMode: 'json' | 'code';
  /** Download filename extension for the output. */
  extension: string;
  /** Extra `<meta name="keywords">` terms beyond the derived ones. */
  keywords: string[];
  /** Sample input shown by the "Example" action. */
  example: string;
  /** Caveats worth stating on the page, e.g. lossy type mapping. */
  notes?: string[];
}

const OBJECT_EXAMPLE = JSON.stringify(
  {
    id: 1042,
    name: 'Ada Lovelace',
    active: true,
    score: 9.5,
    deletedAt: null,
    tags: ['engineer', 'analyst'],
    address: { street: '1 Main St', zipCode: '10001' },
    projects: [
      { id: 1, title: 'Analytical Engine', year: 1837 },
      { id: 2, title: 'Note G' },
    ],
  },
  null,
  2
);

const TABLE_EXAMPLE = JSON.stringify(
  [
    { id: 1, name: 'Ada Lovelace', role: 'engineer', active: true },
    { id: 2, name: 'Alan Turing', role: 'analyst', active: false },
  ],
  null,
  2
);

const YAML_EXAMPLE = `id: 1042
name: Ada Lovelace
active: true
tags:
- engineer
- analyst
address:
  street: 1 Main St
  zipCode: "10001"
projects:
- id: 1
  title: Analytical Engine
- id: 2
  title: Note G`;

const XML_EXAMPLE = `<?xml version="1.0" encoding="UTF-8"?>
<user id="1042">
  <name>Ada Lovelace</name>
  <active>true</active>
  <tags>engineer</tags>
  <tags>analyst</tags>
  <address>
    <street>1 Main St</street>
    <zipCode>10001</zipCode>
  </address>
</user>`;

const CSV_EXAMPLE = `id,name,role,active
1,Ada Lovelace,engineer,true
2,"Turing, Alan",analyst,false`;

const TOML_EXAMPLE = `title = "demo"
count = 42
enabled = true
ports = [80, 443]

[owner]
name = "Ada Lovelace"

[[products]]
name = "hammer"
sku = 738`;

/**
 * Code-generation targets.
 *
 * Duplicated from `LANGUAGE_TARGETS` in `@/lib/json/generators` rather than
 * imported, so this module stays data-only. `convert.ts` asserts the two lists
 * agree, which turns any drift into a loud failure instead of a missing page.
 */
const CODE_TARGETS: Array<{ id: string; label: string; extension: string; description: string }> = [
  {
    id: 'typescript',
    label: 'TypeScript',
    extension: 'ts',
    description:
      'Generate TypeScript interfaces from a JSON sample. Fields missing from some records become optional, and sometimes-null values widen to a union.',
  },
  {
    id: 'java',
    label: 'Java',
    extension: 'java',
    description:
      'Generate Java classes with Jackson annotations from a JSON sample. Optional primitives are boxed, so an absent field stays distinct from zero or false.',
  },
  {
    id: 'go',
    label: 'Go',
    extension: 'go',
    description:
      'Generate Go structs with JSON tags from a JSON sample. Optional fields become pointers tagged omitempty, so encoding/json can tell absent from the zero value.',
  },
  {
    id: 'python',
    label: 'Python',
    extension: 'py',
    description:
      'Generate Python dataclasses with type hints from a JSON sample. Optional fields default to None and come last, so the class compiles as written.',
  },
  {
    id: 'csharp',
    label: 'C#',
    extension: 'cs',
    description:
      'Generate C# classes with System.Text.Json attributes from a JSON sample. Each PascalCase property carries a JsonPropertyName with the original key.',
  },
  {
    id: 'rust',
    label: 'Rust',
    extension: 'rs',
    description:
      'Generate Rust structs with Serde derives from a JSON sample. Optional fields become Option, and unreachable keys get an explicit serde rename.',
  },
  {
    id: 'kotlin',
    label: 'Kotlin',
    extension: 'kt',
    description:
      'Generate Kotlin data classes with kotlinx.serialization from a JSON sample. SerialName is added only where the key differs from the property.',
  },
  {
    id: 'dart',
    label: 'Dart',
    extension: 'dart',
    description:
      'Generate Dart classes with fromJson and toJson from a JSON sample. Nested objects get their own class, so you never hold a raw dynamic map.',
  },
  {
    id: 'swift',
    label: 'Swift',
    extension: 'swift',
    description:
      'Generate Swift structs conforming to Codable from a JSON sample. CodingKeys appear only when a key differs from its property name.',
  },
];

/** Generator ids, used by `convert.ts` to check the two lists stay in step. */
export const CODE_TARGET_IDS: string[] = CODE_TARGETS.map((target) => target.id);

const CODE_TOOLS: ToolDefinition[] = CODE_TARGETS.map((target) => ({
  id: `json-to-${target.id}`,
  category: 'code',
  label: `JSON to ${target.label}`,
  description: target.description,
  inputLabel: 'JSON',
  outputLabel: target.label,
  outputMode: 'code',
  extension: target.extension,
  keywords: [
    `json to ${target.label.toLowerCase()}`,
    `${target.label.toLowerCase()} from json`,
    `generate ${target.label.toLowerCase()} types`,
  ],
  example: OBJECT_EXAMPLE,
  notes: [
    'Every record in an array is inspected, not just the first, so a field that appears in only some of them is typed as optional rather than required.',
    'Identical nested shapes are emitted once and reused, and reserved words are renamed to something legal in this language.',
  ],
}));

const FORMAT_TOOLS: ToolDefinition[] = [
  {
    id: 'json-to-yaml',
    category: 'format',
    label: 'JSON to YAML',
    description:
      'Convert JSON to YAML. Strings that would otherwise read as booleans, numbers, or nulls are quoted so the result parses back to the same value.',
    inputLabel: 'JSON',
    outputLabel: 'YAML',
    outputMode: 'code',
    extension: 'yaml',
    keywords: ['json to yaml', 'yaml converter', 'json yaml'],
    example: OBJECT_EXAMPLE,
  },
  {
    id: 'yaml-to-json',
    category: 'format',
    label: 'YAML to JSON',
    description:
      'Convert YAML to formatted JSON. Handles nested mappings, block and inline sequences, quoted scalars, and comments.',
    inputLabel: 'YAML',
    outputLabel: 'JSON',
    outputMode: 'json',
    extension: 'json',
    keywords: ['yaml to json', 'yaml parser', 'convert yaml'],
    example: YAML_EXAMPLE,
    notes: [
      'Anchors, aliases, and multi-document streams are not supported. Everything else in common data YAML is.',
    ],
  },
  {
    id: 'json-to-xml',
    category: 'format',
    label: 'JSON to XML',
    description:
      'Convert JSON to indented XML. Arrays repeat the parent tag, nulls become xsi:nil, and keys that are not legal element names are sanitised.',
    inputLabel: 'JSON',
    outputLabel: 'XML',
    outputMode: 'code',
    extension: 'xml',
    keywords: ['json to xml', 'xml converter', 'json xml'],
    example: OBJECT_EXAMPLE,
  },
  {
    id: 'xml-to-json',
    category: 'format',
    label: 'XML to JSON',
    description:
      'Convert XML to formatted JSON. Attributes become @name keys, repeated elements collapse into arrays, and mixed text lands under #text.',
    inputLabel: 'XML',
    outputLabel: 'JSON',
    outputMode: 'json',
    extension: 'json',
    keywords: ['xml to json', 'xml parser', 'convert xml'],
    example: XML_EXAMPLE,
    notes: [
      'XML has no type system, so values are guessed: "10001" becomes the number 10001 and an empty element becomes null. Round-tripping JSON through XML will not always return the original types.',
    ],
  },
  {
    id: 'json-to-csv',
    category: 'data',
    label: 'JSON to CSV',
    description:
      'Flatten a JSON array into CSV. Nested objects become dotted columns, sparse records still line up, and cells containing delimiters are quoted.',
    inputLabel: 'JSON',
    outputLabel: 'CSV',
    outputMode: 'code',
    extension: 'csv',
    keywords: ['json to csv', 'json to excel', 'csv converter'],
    example: TABLE_EXAMPLE,
    notes: ['Arrays of plain values share one cell, joined with "; ".'],
  },
  {
    id: 'csv-to-json',
    category: 'data',
    label: 'CSV to JSON',
    description:
      'Convert CSV to a JSON array of objects. Quoted fields, escaped quotes, and embedded newlines are parsed correctly, and numbers and booleans are typed.',
    inputLabel: 'CSV',
    outputLabel: 'JSON',
    outputMode: 'json',
    extension: 'json',
    keywords: ['csv to json', 'excel to json', 'convert csv'],
    example: CSV_EXAMPLE,
  },
  {
    id: 'json-to-toml',
    category: 'format',
    label: 'JSON to TOML',
    description:
      'Convert JSON to TOML. Nested objects become tables, arrays of objects become table arrays, and everything else inlines.',
    inputLabel: 'JSON',
    outputLabel: 'TOML',
    outputMode: 'code',
    extension: 'toml',
    keywords: ['json to toml', 'toml converter', 'json toml'],
    example: OBJECT_EXAMPLE,
    notes: [
      'TOML documents must have an object at the top level, so a JSON array cannot convert directly.',
    ],
  },
  {
    id: 'toml-to-json',
    category: 'format',
    label: 'TOML to JSON',
    description:
      'Convert TOML to formatted JSON. Tables, table arrays, dotted keys, inline tables, and multi-line arrays are all supported.',
    inputLabel: 'TOML',
    outputLabel: 'JSON',
    outputMode: 'json',
    extension: 'json',
    keywords: ['toml to json', 'toml parser', 'convert toml'],
    example: TOML_EXAMPLE,
    notes: ['JSON has no date type, so TOML datetimes are kept as strings.'],
  },
];

export const TOOLS: ToolDefinition[] = [...FORMAT_TOOLS, ...CODE_TOOLS];

export const TOOL_IDS: string[] = TOOLS.map((tool) => tool.id);

export function getTool(id: string): ToolDefinition | undefined {
  return TOOLS.find((tool) => tool.id === id);
}

export function toolsByCategory(category: ToolCategory): ToolDefinition[] {
  return TOOLS.filter((tool) => tool.category === category);
}

export const CATEGORY_ORDER: ToolCategory[] = ['format', 'data', 'code'];

/** Tools that read or write a delimited format expose a delimiter control. */
export function supportsDelimiter(tool: ToolDefinition): boolean {
  return tool.id === 'json-to-csv' || tool.id === 'csv-to-json';
}

/** Tools that generate source code let the user name the root type. */
export function supportsRootName(tool: ToolDefinition): boolean {
  return tool.category === 'code';
}

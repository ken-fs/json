/**
 * Data-format converters: JSON to and from YAML, XML, CSV, and TOML.
 *
 * These are hand-written rather than pulled from libraries because AGENTS.md
 * asks for a modest bundle and the site is a static export — js-yaml + fast-xml-parser
 * + a TOML parser would add far more weight than the subset of each format that
 * a JSON conversion tool actually round-trips.
 *
 * Scope is deliberate: the emitters handle everything JSON can express, and the
 * parsers handle the common, well-formed shapes these formats use for data
 * interchange. Anything outside that raises a message naming what was found.
 */

// ---------------------------------------------------------------------------
// YAML
// ---------------------------------------------------------------------------

/** Keys/scalars that would be ambiguous unquoted in YAML. */
const YAML_NEEDS_QUOTES =
  /^(?:|~|null|Null|NULL|true|True|TRUE|false|False|FALSE|yes|Yes|no|No|on|On|off|Off|-?\d+(?:\.\d+)?(?:[eE][-+]?\d+)?)$/;

function yamlScalar(value: string | number | boolean | null): string {
  if (value === null) return 'null';
  if (typeof value === 'boolean' || typeof value === 'number') return String(value);

  // Quote when the string would otherwise parse as another type, contains
  // structural characters, or has edge whitespace.
  const risky =
    YAML_NEEDS_QUOTES.test(value) ||
    /[:#\-?*&!|>'"%@`{}[\],]/.test(value) ||
    value !== value.trim() ||
    value.includes('\n');

  if (!risky) return value;
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
}

function yamlKey(key: string): string {
  if (key.length === 0) return '""';
  return /^[A-Za-z0-9_][A-Za-z0-9_.\-]*$/.test(key) && !YAML_NEEDS_QUOTES.test(key)
    ? key
    : `"${key.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function toYamlLines(value: unknown, indent: number): string[] {
  const pad = '  '.repeat(indent);

  if (value === null || typeof value !== 'object') {
    return [`${pad}${yamlScalar(value as string | number | boolean | null)}`];
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return [`${pad}[]`];

    return value.flatMap((item) => {
      if (item === null || typeof item !== 'object') {
        return [`${pad}- ${yamlScalar(item as string | number | boolean | null)}`];
      }
      // Nested collections hang off the dash, with the first line inlined.
      const nested = toYamlLines(item, indent + 1);
      const [first, ...rest] = nested;
      return [`${pad}- ${first.trimStart()}`, ...rest];
    });
  }

  const record = value as Record<string, unknown>;
  const keys = Object.keys(record);
  if (keys.length === 0) return [`${pad}{}`];

  return keys.flatMap((key) => {
    const child = record[key];
    const label = `${pad}${yamlKey(key)}:`;

    if (child === null || typeof child !== 'object') {
      return [`${label} ${yamlScalar(child as string | number | boolean | null)}`];
    }
    if (Array.isArray(child) && child.length === 0) return [`${label} []`];
    if (!Array.isArray(child) && Object.keys(child as object).length === 0) {
      return [`${label} {}`];
    }
    // Arrays sit at the parent's indent level, per common YAML style.
    return [label, ...toYamlLines(child, Array.isArray(child) ? indent : indent + 1)];
  });
}

export function jsonToYAML(text: string): string {
  const parsed = JSON.parse(text);
  return toYamlLines(parsed, 0).join('\n');
}

function parseYamlScalar(raw: string): unknown {
  const token = raw.trim();
  if (token === '' || token === '~' || /^null$/i.test(token)) return null;
  if (/^true$/i.test(token)) return true;
  if (/^false$/i.test(token)) return false;
  if (token === '[]') return [];
  if (token === '{}') return {};

  if (
    (token.startsWith('"') && token.endsWith('"') && token.length > 1) ||
    (token.startsWith("'") && token.endsWith("'") && token.length > 1)
  ) {
    const body = token.slice(1, -1);
    return token.startsWith('"')
      ? body.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\')
      : body.replace(/''/g, "'");
  }

  if (/^-?\d+$/.test(token)) {
    const asNumber = Number(token);
    if (Number.isSafeInteger(asNumber)) return asNumber;
  }
  if (/^-?\d*\.\d+(?:[eE][-+]?\d+)?$/.test(token)) return Number(token);

  // Inline flow sequence: [a, b, c]
  if (token.startsWith('[') && token.endsWith(']')) {
    const body = token.slice(1, -1).trim();
    if (body === '') return [];
    return splitFlow(body).map((part) => parseYamlScalar(part));
  }

  return token;
}

/** Split a flow collection on commas that are not nested or quoted. */
function splitFlow(body: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let quote: string | null = null;
  let current = '';

  for (const char of body) {
    if (quote) {
      current += char;
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      current += char;
      continue;
    }
    if (char === '[' || char === '{') depth += 1;
    if (char === ']' || char === '}') depth -= 1;
    if (char === ',' && depth === 0) {
      parts.push(current);
      current = '';
      continue;
    }
    current += char;
  }
  if (current.trim() !== '') parts.push(current);
  return parts;
}

interface YamlLine {
  indent: number;
  text: string;
}

/**
 * Parse the block-style YAML subset this tool emits: nested mappings, block
 * sequences, inline flow sequences, and quoted or plain scalars.
 */
export function yamlToJSON(text: string, indentWidth = 2): string {
  const lines: YamlLine[] = [];

  for (const raw of text.split(/\r?\n/)) {
    // Strip full-line comments and blanks; document markers carry no data.
    const withoutComment = raw.replace(/^\s*#.*$/, '');
    if (withoutComment.trim() === '' || withoutComment.trim() === '---') continue;
    if (/^\s*\.\.\.\s*$/.test(withoutComment)) continue;
    if (withoutComment.includes('\t')) {
      throw new Error('YAML cannot be indented with tabs. Use spaces.');
    }
    let indent = withoutComment.length - withoutComment.trimStart().length;
    let text = withoutComment.trim();

    // `- - 1` opens a nested sequence on one line. Expand it into the
    // equivalent indented lines so the block parser sees uniform structure.
    while (text.startsWith('- ')) {
      const rest = text.slice(2).trim();
      if (!rest.startsWith('- ') && rest !== '-') break;
      lines.push({ indent, text: '-' });
      indent += 2;
      text = rest;
    }

    lines.push({ indent, text });
  }

  if (lines.length === 0) return 'null';

  // A one-line document holding a bare scalar, `[]`, or `{}` has no block
  // structure to walk. Handled here so parseBlock can still treat an
  // unparseable nested line as the error it is.
  if (lines.length === 1 && !lines[0].text.startsWith('- ') && lines[0].text !== '-') {
    if (matchMapping(lines[0].text) === null) {
      return JSON.stringify(parseYamlScalar(lines[0].text), null, 2);
    }
  }

  let cursor = 0;

  function parseBlock(indent: number): unknown {
    if (cursor >= lines.length) return null;

    if (lines[cursor].text.startsWith('- ') || lines[cursor].text === '-') {
      const items: unknown[] = [];
      while (cursor < lines.length && lines[cursor].indent === indent) {
        const line = lines[cursor];
        if (!line.text.startsWith('- ') && line.text !== '-') break;

        const inline = line.text === '-' ? '' : line.text.slice(2).trim();
        cursor += 1;

        if (inline === '') {
          items.push(cursor < lines.length && lines[cursor].indent > indent
            ? parseBlock(lines[cursor].indent)
            : null);
          continue;
        }

        // `- key: value` starts a mapping whose remaining keys are indented.
        const mapping = matchMapping(inline);
        if (mapping) {
          const entry: Record<string, unknown> = {};
          if (mapping.value === '') {
            entry[mapping.key] =
              cursor < lines.length && lines[cursor].indent > indent
                ? parseBlock(lines[cursor].indent)
                : null;
          } else {
            entry[mapping.key] = parseYamlScalar(mapping.value);
          }
          while (cursor < lines.length && lines[cursor].indent > indent) {
            const nested = parseBlock(lines[cursor].indent);
            if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
              Object.assign(entry, nested);
            }
          }
          items.push(entry);
          continue;
        }

        items.push(parseYamlScalar(inline));
      }
      return items;
    }

    const record: Record<string, unknown> = {};
    while (cursor < lines.length && lines[cursor].indent === indent) {
      const line = lines[cursor];
      if (line.text.startsWith('- ')) break;

      const mapping = matchMapping(line.text);
      if (!mapping) {
        throw new Error(`Cannot parse YAML line: "${line.text}"`);
      }
      cursor += 1;

      if (mapping.value !== '') {
        record[mapping.key] = parseYamlScalar(mapping.value);
        continue;
      }

      // A bare `key:` owns the deeper block, or a sequence at the same indent.
      if (cursor < lines.length && lines[cursor].indent > indent) {
        record[mapping.key] = parseBlock(lines[cursor].indent);
      } else if (
        cursor < lines.length &&
        lines[cursor].indent === indent &&
        lines[cursor].text.startsWith('- ')
      ) {
        record[mapping.key] = parseBlock(indent);
      } else {
        record[mapping.key] = null;
      }
    }
    return record;
  }

  const result = parseBlock(lines[0].indent);
  void indentWidth;
  return JSON.stringify(result, null, 2);
}

/** Split `key: value` while ignoring colons inside quotes. */
function matchMapping(text: string): { key: string; value: string } | null {
  let quote: string | null = null;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quote) {
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }
    if (char === ':' && (i + 1 === text.length || /\s/.test(text[i + 1]))) {
      const rawKey = text.slice(0, i).trim();
      const key =
        (rawKey.startsWith('"') && rawKey.endsWith('"')) ||
        (rawKey.startsWith("'") && rawKey.endsWith("'"))
          ? rawKey.slice(1, -1)
          : rawKey;
      return { key, value: text.slice(i + 1).trim() };
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// XML
// ---------------------------------------------------------------------------

function escapeXmlText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** XML element names cannot start with a digit or contain most punctuation. */
function xmlTagName(key: string): string {
  const cleaned = key.replace(/[^A-Za-z0-9_.\-]/g, '_');
  return /^[A-Za-z_]/.test(cleaned) ? cleaned : `_${cleaned}`;
}

export function jsonToXML(text: string, rootName = 'root'): string {
  const parsed = JSON.parse(text);

  function build(value: unknown, tag: string, depth: number): string[] {
    const pad = '  '.repeat(depth);
    const name = xmlTagName(tag);

    if (value === null) return [`${pad}<${name} xsi:nil="true"/>`];

    if (typeof value !== 'object') {
      return [`${pad}<${name}>${escapeXmlText(String(value))}</${name}>`];
    }

    if (Array.isArray(value)) {
      if (value.length === 0) return [`${pad}<${name}/>`];
      // Repeat the parent tag per item, which is how XML models lists.
      return value.flatMap((item) => build(item, name, depth));
    }

    const record = value as Record<string, unknown>;
    const keys = Object.keys(record);
    if (keys.length === 0) return [`${pad}<${name}/>`];

    return [
      `${pad}<${name}>`,
      ...keys.flatMap((key) => build(record[key], key, depth + 1)),
      `${pad}</${name}>`,
    ];
  }

  // XML allows exactly one root element, but an array would emit one sibling
  // per item. Wrap it so the document stays well-formed.
  const body = Array.isArray(parsed)
    ? [
        `<${xmlTagName(rootName)}>`,
        ...parsed.flatMap((item) => build(item, 'item', 1)),
        `</${xmlTagName(rootName)}>`,
      ]
    : build(parsed, rootName, 0);

  return `<?xml version="1.0" encoding="UTF-8"?>\n${body.join('\n')}`;
}

function decodeXmlText(value: string): string {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, '&');
}

interface XmlNode {
  name: string;
  attributes: Record<string, string>;
  children: XmlNode[];
  text: string;
  selfClosing: boolean;
}

/**
 * Convert XML to JSON. Attributes become `@name` keys and mixed text becomes
 * `#text`, the convention most XML-to-JSON tools use.
 */
export function xmlToJSON(text: string): string {
  const withoutProlog = text
    .replace(/<\?xml[\s\S]*?\?>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<!DOCTYPE[^>]*>/gi, '');

  const tokenPattern = /<\/?([A-Za-z_][\w.\-:]*)((?:\s+[\w.\-:]+\s*=\s*(?:"[^"]*"|'[^']*'))*)\s*(\/?)>|([^<]+)/g;
  const root: XmlNode = { name: '#root', attributes: {}, children: [], text: '', selfClosing: false };
  const stack: XmlNode[] = [root];

  let match: RegExpExecArray | null;
  while ((match = tokenPattern.exec(withoutProlog)) !== null) {
    const [full, tagName, rawAttributes, selfClose, textRun] = match;

    if (textRun !== undefined) {
      const content = textRun.trim();
      if (content !== '') stack[stack.length - 1].text += decodeXmlText(content);
      continue;
    }

    if (full.startsWith('</')) {
      if (stack.length > 1) stack.pop();
      continue;
    }

    const attributes: Record<string, string> = {};
    if (rawAttributes) {
      const attrPattern = /([\w.\-:]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
      let attr: RegExpExecArray | null;
      while ((attr = attrPattern.exec(rawAttributes)) !== null) {
        attributes[attr[1]] = decodeXmlText(attr[2] ?? attr[3] ?? '');
      }
    }

    const node: XmlNode = {
      name: tagName,
      attributes,
      children: [],
      text: '',
      selfClosing: selfClose === '/',
    };
    stack[stack.length - 1].children.push(node);
    if (selfClose !== '/') stack.push(node);
  }

  function coerce(raw: string): unknown {
    const token = raw.trim();
    if (token === '') return '';
    if (/^true$/i.test(token)) return true;
    if (/^false$/i.test(token)) return false;
    if (/^-?\d+$/.test(token) && Number.isSafeInteger(Number(token))) return Number(token);
    if (/^-?\d*\.\d+$/.test(token)) return Number(token);
    return token;
  }

  function convert(node: XmlNode): unknown {
    const nilAttribute = Object.keys(node.attributes).some(
      (key) => key.endsWith('nil') && node.attributes[key] === 'true'
    );
    if (nilAttribute) return null;

    const hasAttributes = Object.keys(node.attributes).length > 0;

    if (node.children.length === 0) {
      if (!hasAttributes) return node.selfClosing && node.text === '' ? null : coerce(node.text);
      const leaf: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(node.attributes)) leaf[`@${key}`] = coerce(value);
      if (node.text !== '') leaf['#text'] = coerce(node.text);
      return leaf;
    }

    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(node.attributes)) result[`@${key}`] = coerce(value);

    // Repeated child names collapse into an array, matching jsonToXML's output.
    const grouped = new Map<string, XmlNode[]>();
    for (const child of node.children) {
      const bucket = grouped.get(child.name);
      if (bucket) bucket.push(child);
      else grouped.set(child.name, [child]);
    }

    for (const [name, group] of grouped) {
      result[name] = group.length === 1 ? convert(group[0]) : group.map(convert);
    }
    if (node.text !== '') result['#text'] = coerce(node.text);

    return result;
  }

  if (root.children.length === 0) {
    throw new Error('No XML elements found. Check that the input is well-formed XML.');
  }

  const documentRoot = root.children[0];
  return JSON.stringify({ [documentRoot.name]: convert(documentRoot) }, null, 2);
}

// ---------------------------------------------------------------------------
// CSV
// ---------------------------------------------------------------------------

/** Flatten nested values so each leaf gets its own `a.b.c` column. */
function flattenRecord(value: unknown, prefix = '', out: Record<string, unknown> = {}) {
  if (value === null || typeof value !== 'object') {
    out[prefix || 'value'] = value;
    return out;
  }

  if (Array.isArray(value)) {
    // Arrays of scalars stay in one cell; arrays of objects get indexed columns.
    const scalarOnly = value.every((item) => item === null || typeof item !== 'object');
    if (scalarOnly) {
      out[prefix || 'value'] = value.join('; ');
      return out;
    }
    value.forEach((item, index) => flattenRecord(item, `${prefix}[${index}]`, out));
    return out;
  }

  const record = value as Record<string, unknown>;
  const keys = Object.keys(record);
  if (keys.length === 0) {
    out[prefix || 'value'] = '';
    return out;
  }
  for (const key of keys) {
    flattenRecord(record[key], prefix ? `${prefix}.${key}` : key, out);
  }
  return out;
}

function csvCell(value: unknown, delimiter: string): string {
  if (value === null || value === undefined) return '';
  const text = typeof value === 'object' ? JSON.stringify(value) : String(value);
  // Quote when the cell contains the delimiter, quotes, or newlines. A leading
  // separator character is also quoted so spreadsheets don't read it as a formula.
  const risky =
    text.includes(delimiter) ||
    text.includes('"') ||
    /[\n\r]/.test(text) ||
    /^[=+\-@]/.test(text);
  return risky ? `"${text.replace(/"/g, '""')}"` : text;
}

export interface CsvOptions {
  delimiter?: string;
}

export function jsonToCSV(text: string, options: CsvOptions = {}): string {
  const { delimiter = ',' } = options;
  const parsed = JSON.parse(text);

  // Accept a bare object or a wrapper like `{ "items": [...] }` so users don't
  // have to reshape their payload before converting.
  let rows: unknown[];
  if (Array.isArray(parsed)) {
    rows = parsed;
  } else if (parsed && typeof parsed === 'object') {
    const arrayValues = Object.values(parsed as Record<string, unknown>).filter(Array.isArray);
    rows = arrayValues.length === 1 ? (arrayValues[0] as unknown[]) : [parsed];
  } else {
    rows = [parsed];
  }

  if (rows.length === 0) return '';

  const flattened = rows.map((row) => flattenRecord(row));

  // Union of all keys, in first-seen order, so sparse records still align.
  const headers: string[] = [];
  const seen = new Set<string>();
  for (const row of flattened) {
    for (const key of Object.keys(row)) {
      if (seen.has(key)) continue;
      seen.add(key);
      headers.push(key);
    }
  }

  const lines = [headers.map((header) => csvCell(header, delimiter)).join(delimiter)];
  for (const row of flattened) {
    lines.push(headers.map((header) => csvCell(row[header], delimiter)).join(delimiter));
  }

  return lines.join('\n');
}

/** Split CSV text into rows, honouring quoted fields and embedded newlines. */
function parseCsvRows(text: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      continue;
    }
    if (char === delimiter) {
      row.push(cell);
      cell = '';
      continue;
    }
    if (char === '\r') continue;
    if (char === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
      continue;
    }
    cell += char;
  }

  if (cell !== '' || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows.filter((entry) => entry.some((value) => value.trim() !== ''));
}

export function csvToJSON(text: string, options: CsvOptions = {}): string {
  const { delimiter = ',' } = options;
  const rows = parseCsvRows(text, delimiter);

  if (rows.length === 0) return '[]';
  if (rows.length === 1) {
    throw new Error('CSV has a header row but no data rows.');
  }

  const [headerRow, ...dataRows] = rows;
  const headers = headerRow.map((header, index) => header.trim() || `column${index + 1}`);

  const records = dataRows.map((cells) => {
    const record: Record<string, unknown> = {};
    headers.forEach((header, index) => {
      const raw = (cells[index] ?? '').trim();
      if (raw === '') {
        record[header] = null;
      } else if (/^true$/i.test(raw)) {
        record[header] = true;
      } else if (/^false$/i.test(raw)) {
        record[header] = false;
      } else if (/^-?\d+$/.test(raw) && Number.isSafeInteger(Number(raw))) {
        record[header] = Number(raw);
      } else if (/^-?\d*\.\d+$/.test(raw)) {
        record[header] = Number(raw);
      } else {
        record[header] = raw;
      }
    });
    return record;
  });

  return JSON.stringify(records, null, 2);
}

// ---------------------------------------------------------------------------
// TOML
// ---------------------------------------------------------------------------

function tomlValue(value: unknown): string {
  if (value === null) return '""';
  if (typeof value === 'boolean' || typeof value === 'number') return String(value);
  if (typeof value === 'string') {
    return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
  }
  if (Array.isArray(value)) return `[${value.map(tomlValue).join(', ')}]`;
  return `"${JSON.stringify(value).replace(/"/g, '\\"')}"`;
}

function tomlKey(key: string): string {
  return /^[A-Za-z0-9_-]+$/.test(key) ? key : `"${key.replace(/"/g, '\\"')}"`;
}

export function jsonToTOML(text: string): string {
  const parsed = JSON.parse(text);

  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('TOML requires an object at the top level.');
  }

  const lines: string[] = [];

  function emit(record: Record<string, unknown>, path: string[]) {
    const scalars: string[] = [];
    const tables: Array<[string, Record<string, unknown>]> = [];
    const tableArrays: Array<[string, Record<string, unknown>[]]> = [];

    for (const [key, value] of Object.entries(record)) {
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        tables.push([key, value as Record<string, unknown>]);
        continue;
      }
      // An array of objects becomes [[table]] entries; anything else inlines.
      if (
        Array.isArray(value) &&
        value.length > 0 &&
        value.every((item) => item !== null && typeof item === 'object' && !Array.isArray(item))
      ) {
        tableArrays.push([key, value as Record<string, unknown>[]]);
        continue;
      }
      scalars.push(`${tomlKey(key)} = ${tomlValue(value)}`);
    }

    if (path.length > 0 && (scalars.length > 0 || (tables.length === 0 && tableArrays.length === 0))) {
      lines.push(`[${path.map(tomlKey).join('.')}]`);
    }
    lines.push(...scalars);
    if (scalars.length > 0) lines.push('');

    for (const [key, value] of tables) {
      const nested = [...path, key];
      if (Object.keys(value).length === 0) {
        lines.push(`[${nested.map(tomlKey).join('.')}]`, '');
        continue;
      }
      if (!lines.includes(`[${nested.map(tomlKey).join('.')}]`)) {
        const hasScalars = Object.values(value).some(
          (child) => child === null || typeof child !== 'object' || Array.isArray(child)
        );
        if (!hasScalars) lines.push(`[${nested.map(tomlKey).join('.')}]`, '');
      }
      emit(value, nested);
    }

    for (const [key, group] of tableArrays) {
      const nested = [...path, key];
      for (const item of group) {
        lines.push(`[[${nested.map(tomlKey).join('.')}]]`);
        const inner: string[] = [];
        const deeper: Array<[string, Record<string, unknown>]> = [];
        for (const [childKey, childValue] of Object.entries(item)) {
          if (childValue !== null && typeof childValue === 'object' && !Array.isArray(childValue)) {
            deeper.push([childKey, childValue as Record<string, unknown>]);
          } else {
            inner.push(`${tomlKey(childKey)} = ${tomlValue(childValue)}`);
          }
        }
        lines.push(...inner, '');
        for (const [childKey, childValue] of deeper) emit(childValue, [...nested, childKey]);
      }
    }
  }

  emit(parsed as Record<string, unknown>, []);

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

export function tomlToJSON(text: string): string {
  const result: Record<string, unknown> = {};
  let current: Record<string, unknown> = result;

  function ensurePath(path: string[], asArray: boolean): Record<string, unknown> {
    let node: Record<string, unknown> = result;

    path.forEach((segment, index) => {
      const last = index === path.length - 1;

      if (last && asArray) {
        const existing = node[segment];
        const entry: Record<string, unknown> = {};
        if (Array.isArray(existing)) {
          (existing as unknown[]).push(entry);
        } else {
          node[segment] = [entry];
        }
        node = entry;
        return;
      }

      let child = node[segment];
      // Walk into the newest element when the path crosses a table array.
      if (Array.isArray(child)) {
        child = (child as unknown[])[child.length - 1];
      }
      if (child === undefined || child === null || typeof child !== 'object') {
        child = {};
        node[segment] = child;
      }
      node = child as Record<string, unknown>;
    });

    return node;
  }

  function parseValue(raw: string): unknown {
    const token = raw.trim();

    if (token.startsWith('"""') && token.endsWith('"""')) return token.slice(3, -3);
    if (token.startsWith('"') && token.endsWith('"') && token.length > 1) {
      return token
        .slice(1, -1)
        .replace(/\\n/g, '\n')
        .replace(/\\t/g, '\t')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\');
    }
    if (token.startsWith("'") && token.endsWith("'") && token.length > 1) {
      return token.slice(1, -1);
    }
    if (/^true$/i.test(token)) return true;
    if (/^false$/i.test(token)) return false;

    if (token.startsWith('[') && token.endsWith(']')) {
      const body = token.slice(1, -1).trim();
      if (body === '') return [];
      return splitFlow(body).map((part) => parseValue(part));
    }

    if (token.startsWith('{') && token.endsWith('}')) {
      const inline: Record<string, unknown> = {};
      const body = token.slice(1, -1).trim();
      if (body === '') return inline;
      for (const part of splitFlow(body)) {
        const eq = part.indexOf('=');
        if (eq === -1) continue;
        inline[stripKey(part.slice(0, eq).trim())] = parseValue(part.slice(eq + 1));
      }
      return inline;
    }

    const numeric = token.replace(/_/g, '');
    if (/^[-+]?\d+$/.test(numeric) && Number.isSafeInteger(Number(numeric))) return Number(numeric);
    if (/^[-+]?\d*\.\d+(?:[eE][-+]?\d+)?$/.test(numeric)) return Number(numeric);

    // Dates and anything unrecognized stay strings, which JSON has no type for.
    return token;
  }

  function stripKey(key: string): string {
    return (key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))
      ? key.slice(1, -1)
      : key;
  }

  function splitDottedKey(key: string): string[] {
    const parts: string[] = [];
    let quote: string | null = null;
    let current = '';
    for (const char of key) {
      if (quote) {
        if (char === quote) quote = null;
        else current += char;
        continue;
      }
      if (char === '"' || char === "'") {
        quote = char;
        continue;
      }
      if (char === '.') {
        parts.push(current.trim());
        current = '';
        continue;
      }
      current += char;
    }
    if (current.trim() !== '') parts.push(current.trim());
    return parts;
  }

  const lines = text.split(/\r?\n/);

  for (let i = 0; i < lines.length; i += 1) {
    let line = lines[i].trim();
    if (line === '' || line.startsWith('#')) continue;

    const tableArray = line.match(/^\[\[(.+)\]\]$/);
    if (tableArray) {
      current = ensurePath(splitDottedKey(tableArray[1].trim()), true);
      continue;
    }

    const table = line.match(/^\[(.+)\]$/);
    if (table) {
      current = ensurePath(splitDottedKey(table[1].trim()), false);
      continue;
    }

    const eq = line.indexOf('=');
    if (eq === -1) continue;

    const rawKey = line.slice(0, eq).trim();
    let rawValue = line.slice(eq + 1).trim();

    // Join a multi-line array before parsing it.
    if (rawValue.startsWith('[') && !rawValue.endsWith(']')) {
      let depth =
        (rawValue.match(/\[/g) ?? []).length - (rawValue.match(/\]/g) ?? []).length;
      while (depth > 0 && i + 1 < lines.length) {
        i += 1;
        const next = lines[i].trim().replace(/#.*$/, '');
        rawValue += ` ${next}`;
        depth += (next.match(/\[/g) ?? []).length - (next.match(/\]/g) ?? []).length;
      }
      line = rawValue;
    }

    const path = splitDottedKey(rawKey);
    if (path.length === 1) {
      current[stripKey(path[0])] = parseValue(rawValue);
    } else {
      // Dotted key inside a table: create the intermediate objects.
      let node = current;
      path.slice(0, -1).forEach((segment) => {
        const key = stripKey(segment);
        if (typeof node[key] !== 'object' || node[key] === null || Array.isArray(node[key])) {
          node[key] = {};
        }
        node = node[key] as Record<string, unknown>;
      });
      node[stripKey(path[path.length - 1])] = parseValue(rawValue);
    }
  }

  return JSON.stringify(result, null, 2);
}

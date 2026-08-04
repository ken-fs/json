import {
  jsonToYAML, yamlToJSON,
  jsonToXML, xmlToJSON,
  jsonToCSV, csvToJSON,
  jsonToTOML, tomlToJSON,
} from '../src/lib/json/formats';

let failures = 0;
function check(label: string, actual: unknown, expected: unknown) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) {
    failures++;
    console.log(`FAIL ${label}\n  expected ${e}\n  actual   ${a}`);
  } else {
    console.log(`ok   ${label}`);
  }
}

const hostile = {
  id: 1,
  'first-name': 'Ada',
  note: 'yes',
  version: '1.0',
  blank: '',
  colonly: 'a: b',
  hash: 'value # not comment',
  multi: 'line1\nline2',
  quote: 'say "hi"',
  score: 9.5,
  deleted_at: null,
  flag: true,
  tags: ['x', 'y'],
  empty: [],
  emptyObj: {},
  nested: { street: '1 Main', zip: '10001', geo: { lat: 1.5, lng: -2.5 } },
  users: [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
  ],
};

const yaml = jsonToYAML(JSON.stringify(hostile));
console.log('--- YAML ---\n' + yaml + '\n');
check('yaml round-trip', JSON.parse(yamlToJSON(yaml)), hostile);

const xml = jsonToXML(JSON.stringify(hostile));
console.log('--- XML ---\n' + xml + '\n');
console.log('xml back: ' + xmlToJSON(xml).slice(0, 500) + '\n');

const csv = jsonToCSV(JSON.stringify([
  { id: 1, name: 'Ada', tags: ['a', 'b'], addr: { zip: '10001' } },
  { id: 2, name: 'Bob, Jr.', note: 'say "hi"' },
]));
console.log('--- CSV ---\n' + csv + '\n');
const csvBack = JSON.parse(csvToJSON(csv));
check('csv keys', Object.keys(csvBack[0]), ['id', 'name', 'tags', 'addr.zip', 'note']);
check('csv quoted comma', csvBack[1].name, 'Bob, Jr.');
check('csv embedded quote', csvBack[1].note, 'say "hi"');

const tomlSrc = {
  title: 'demo',
  version: '1.0',
  count: 42,
  ratio: 0.5,
  enabled: true,
  list: [1, 2, 3],
  strs: ['a', 'b'],
  owner: { name: 'Ada', age: 36 },
  db: { server: '1.2.3.4', ports: [80, 443], opts: { tls: true } },
  products: [{ name: 'hammer', sku: 738 }, { name: 'nail', sku: 284 }],
};
const toml = jsonToTOML(JSON.stringify(tomlSrc));
console.log('--- TOML ---\n' + toml + '\n');
check('toml round-trip', JSON.parse(tomlToJSON(toml)), tomlSrc);

// Strings a YAML 1.1 loader would resolve to another type. Checked against
// PyYAML's actual behaviour, not just this file's own reader — our parser is
// stricter than the loaders these files get fed to, so a round trip through it
// would pass while `NO` came back as `false` in production.
//
// `NO` is the Norway problem proper: the case that matters is the one country
// codes are written in.
const YAML_TRAPS = [
  'NO', 'YES', 'ON', 'OFF', 'TRUE', 'False', 'no', 'Yes', 'null', 'NULL', '~',
  '0x1A', '-0x1f', '0b101', '0o17', '017', '1_000', '.inf', '-.INF', '.nan',
  '+5', '.5', '1e3', '1:30', '12:30:00', '2026-08-04', '2026-08-04T10:00:00Z',
];
for (const trap of YAML_TRAPS) {
  const emitted = jsonToYAML(JSON.stringify({ [trap]: trap }));
  // Both sides have to be quoted: the key is as exposed as the value.
  check(`yaml quotes ${trap}`, emitted.trim(), `"${trap}": "${trap}"`);
}
// ...and plain strings are still left alone, or the output is unreadable.
for (const plain of ['Ada', 'hello', 'v1.0', 'x_y', 'NORWAY', 'onward', 'nullable']) {
  check(`yaml leaves ${plain} bare`, jsonToYAML(JSON.stringify({ [plain]: plain })).trim(), `${plain}: ${plain}`);
}

// `xsi:nil` needs its prefix declared or the document is a namespace error, and
// the declaration should not appear on documents that never use it.
const xmlNil = jsonToXML('{"a":null,"b":{"c":null}}');
check(
  'xml declares xsi when nil is used',
  xmlNil.includes('xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"'),
  true
);
check('xml omits xsi when unused', jsonToXML('{"a":1}').includes('xmlns:xsi'), false);
// The declaration is markup. Reading it back as an `@xmlns:xsi` key would put a
// schema URL in the data and break the round trip for every document with a null.
check('xml null round-trips', JSON.parse(xmlToJSON(jsonToXML('{"a":null,"b":1}'))), {
  root: { a: null, b: 1 },
});
check(
  'xml drops namespace declarations',
  JSON.parse(xmlToJSON('<r xmlns="urn:x" xmlns:p="urn:y" id="3"><a>1</a></r>')),
  { r: { '@id': 3, a: 1 } }
);
// `<a/>` and `<a></a>` are the same element, so they cannot give different JSON.
check('xml empty element forms agree', JSON.parse(xmlToJSON('<r><a></a><b/></r>')), {
  r: { a: null, b: null },
});
check(
  'xml declares xsi on a nil root',
  jsonToXML('null').includes('xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"'),
  true
);

// TOML has no null. A null-valued key is commented out, not written as "" —
// an empty string is a different value and reads back as one.
const tomlNull = jsonToTOML('{"a":null,"b":1,"t":{"c":null,"d":2},"p":[{"e":null,"f":3}]}');
check('toml drops null keys', JSON.parse(tomlToJSON(tomlNull)), {
  b: 1,
  t: { d: 2 },
  p: [{ f: 3 }],
});
check('toml notes the dropped key', tomlNull.includes('# a = null'), true);

const edges: Array<[string, () => unknown]> = [
  ['yaml root array', () => JSON.parse(yamlToJSON(jsonToYAML('[1,2,3]')))],
  ['yaml root scalar', () => JSON.parse(yamlToJSON(jsonToYAML('42')))],
  ['yaml root string', () => JSON.parse(yamlToJSON(jsonToYAML('"hi"')))],
  ['yaml root null', () => JSON.parse(yamlToJSON(jsonToYAML('null')))],
  ['yaml empty obj', () => JSON.parse(yamlToJSON(jsonToYAML('{}')))],
  ['yaml arr of arr', () => JSON.parse(yamlToJSON(jsonToYAML('[[1,2],[3]]')))],
  ['yaml arr of obj root', () => JSON.parse(yamlToJSON(jsonToYAML('[{"a":1,"b":2},{"a":3,"b":4}]')))],
  ['yaml deep', () => JSON.parse(yamlToJSON(jsonToYAML('{"a":{"b":{"c":{"d":[{"e":1}]}}}}')))],
  ['xml root array', () => xmlToJSON(jsonToXML('[1,2,3]'))],
  ['xml attrs', () => xmlToJSON('<r a="1" b="x"><c>2</c><c>3</c></r>')],
  ['csv root object', () => csvToJSON(jsonToCSV('{"a":1,"b":2}'))],
  ['csv wrapper key', () => csvToJSON(jsonToCSV('{"items":[{"a":1},{"a":2}]}'))],
  ['csv semicolon delim', () => csvToJSON('a;b\n1;2', { delimiter: ';' })],
  ['toml rejects array root', () => { try { jsonToTOML('[1]'); return 'NO THROW'; } catch { return 'threw ok'; } }],
  ['yaml tab input', () => { try { return yamlToJSON('a: 1\n\tb: 2'); } catch { return 'threw ok'; } }],
  ['xml bad input', () => { try { return xmlToJSON('not xml'); } catch { return 'threw ok'; } }],
  ['csv header only', () => { try { return csvToJSON('a,b'); } catch { return 'threw ok'; } }],
  ['bad json to yaml', () => { try { return jsonToYAML('{a:1}'); } catch { return 'threw ok'; } }],
];

console.log('--- edges ---');
for (const [label, fn] of edges) {
  try {
    console.log(`${label}: ${JSON.stringify(fn())}`);
  } catch (error) {
    failures++;
    console.log(`FAIL ${label} unexpected throw: ${(error as Error).message}`);
  }
}

console.log(failures === 0 ? '\nALL PASS' : `\n${failures} FAILURES`);

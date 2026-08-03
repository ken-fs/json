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

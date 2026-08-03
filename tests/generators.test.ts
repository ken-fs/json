import { LANGUAGE_TARGETS } from '../src/lib/json/generators';

// Deliberately nasty input: optional field, mixed number types, null,
// array of heterogeneous records, illegal identifiers, reserved words,
// nested + repeated shapes, empty array, plural key.
const sample = JSON.stringify({
  "id": 1,
  "first-name": "Ada",
  "class": "premium",
  "2fa": true,
  "score": 9.5,
  "deleted_at": null,
  "users": [
    { "id": 1, "name": "A", "tags": ["x"] },
    { "id": 2, "name": "B", "nickname": "bee" }
  ],
  "empty": [],
  "mixed": ["a", 1],
  "address": { "street": "1 Main", "zip": "10001" },
  "billing": { "street": "2 Oak", "zip": "10002" }
});

for (const key of Object.keys(LANGUAGE_TARGETS)) {
  const t = LANGUAGE_TARGETS[key];
  console.log(`\n${'='.repeat(70)}\n${t.label}\n${'='.repeat(70)}`);
  try {
    console.log(t.generate(sample, { rootName: 'User' }));
  } catch (e) {
    console.log('!! THREW:', (e as Error).message);
  }
}

// Edge cases that must not throw.
console.log(`\n${'#'.repeat(70)}\nEDGE CASES\n${'#'.repeat(70)}`);
const edges: Array<[string, string]> = [
  ['root array', '[{"a":1},{"b":2}]'],
  ['root scalar', '42'],
  ['root string', '"hi"'],
  ['root null', 'null'],
  ['empty object', '{}'],
  ['empty array', '[]'],
  ['deep nest', '{"a":{"b":{"c":{"d":1}}}}'],
  ['weird keys', '{"":1,"***":2,"9":3}'],
];
for (const [name, json] of edges) {
  for (const key of Object.keys(LANGUAGE_TARGETS)) {
    try {
      LANGUAGE_TARGETS[key].generate(json);
    } catch (e) {
      console.log(`FAIL ${name} / ${key}: ${(e as Error).message}`);
    }
  }
  console.log(`ok: ${name}`);
}
console.log('\ninvalid json ->', (() => { try { LANGUAGE_TARGETS.typescript.generate('{bad'); return 'NO THROW (bug)'; } catch { return 'threw as expected'; } })());

import { jsonToJsonSchema, jsonSchemaToJson } from '../src/lib/json/schema';

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

function throws(label: string, fn: () => unknown) {
  try {
    fn();
    failures++;
    console.log(`FAIL ${label} — expected an error, none was thrown`);
  } catch {
    console.log(`ok   ${label}`);
  }
}

/* --- JSON → JSON Schema --- */

const doc = JSON.stringify({
  id: 1,
  name: 'Ada',
  score: 9.5,
  deletedAt: null,
  tags: ['a', 'b'],
  address: { street: '1 Main St' },
});

const schema = JSON.parse(jsonToJsonSchema(doc));
check('root declares draft 2020-12', schema.$schema, 'https://json-schema.org/draft/2020-12/schema');
check('root type', schema.type, 'object');
check('integer stays integer', schema.properties.id.type, 'integer');
check('decimal widens to number', schema.properties.score.type, 'number');
check('always-null field stays open', schema.properties.deletedAt, {});
check('array items', schema.properties.tags, { type: 'array', items: { type: 'string' } });
check('nested object', schema.properties.address.type, 'object');
check(
  'all keys required in a flat document',
  schema.required,
  ['id', 'name', 'score', 'deletedAt', 'tags', 'address']
);

// A field absent from one record is not required; a sometimes-null value widens.
const sparse = JSON.parse(
  jsonToJsonSchema('[{"a":1,"b":"x"},{"a":2.5,"b":null},{"a":3}]')
);
check('sparse field left out of required', sparse.items.required, ['a']);
check('numeric merge widens to number', sparse.items.properties.a.type, 'number');
check('sometimes-null becomes a type union', sparse.items.properties.b.type, ['string', 'null']);

// Mixed arrays become anyOf.
const mixed = JSON.parse(jsonToJsonSchema('[1,"x"]'));
check('mixed array items use anyOf', mixed.items.anyOf, [{ type: 'integer' }, { type: 'string' }]);

throws('invalid JSON input', () => jsonToJsonSchema('{oops'));

/* --- JSON Schema → JSON --- */

const from = (s: unknown) => JSON.parse(jsonSchemaToJson(JSON.stringify(s)));

check(
  'object fills every property, not just required',
  from({ type: 'object', properties: { a: { type: 'integer' }, b: { type: 'string' } }, required: ['a'] }),
  { a: 0, b: 'string' }
);
check('const wins', from({ const: 42, default: 1 }), 42);
check('enum takes first', from({ enum: ['x', 'y'] }), 'x');
check('default beats placeholder', from({ type: 'integer', default: 7 }), 7);
check('minimum becomes the number', from({ type: 'number', minimum: 5 }), 5);
check('format produces a realistic string', from({ type: 'string', format: 'email' }), 'user@example.com');
check('array holds one item', from({ type: 'array', items: { type: 'boolean' } }), [true]);
check('type list picks the non-null arm', from({ type: ['string', 'null'] }), 'string');
check('untyped schema with properties is an object', from({ properties: { a: { type: 'boolean' } } }), { a: true });
check('oneOf takes the first option', from({ oneOf: [{ type: 'integer' }, { type: 'string' }] }), 0);
check(
  'allOf merges object branches',
  from({ allOf: [{ properties: { a: { type: 'integer' } } }, { properties: { b: { type: 'string' } } }] }),
  { a: 0, b: 'string' }
);
check(
  'local $ref resolves',
  from({ $ref: '#/definitions/Port', definitions: { Port: { type: 'integer', default: 443 } } }),
  443
);
// A self-referencing schema expands one level, then the cycle guard stops it.
check(
  'cyclic $ref stops at null',
  from({ type: 'object', properties: { next: { $ref: '#' } } }),
  { next: { next: null } }
);

throws('remote $ref', () => from({ $ref: 'https://example.com/s.json' }));
throws('schema must be an object', () => jsonSchemaToJson('[1,2]'));
throws('invalid schema JSON', () => jsonSchemaToJson('{oops'));

// Round trip: the sample a schema describes validates against that schema's shape.
const roundTrip = JSON.parse(jsonSchemaToJson(jsonToJsonSchema(doc)));
check('round trip keeps the object shape', typeof roundTrip === 'object' && roundTrip !== null, true);
check('round trip tags is an array', Array.isArray(roundTrip.tags), true);

if (failures > 0) {
  console.log(`\n${failures} failure(s)`);
  process.exit(1);
}
console.log('\nall schema tests passed');

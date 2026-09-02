/**
 * Structural type inference over a parsed JSON value.
 *
 * The existing `jsonToTypeScript` / `jsonToJava` helpers infer array element
 * types from `value[0]` alone, so `[1, null]` becomes `number[]` and a field
 * missing from later records looks required. This module walks every element
 * and every record instead, producing one `JsonType` tree that all language
 * generators render. Inference happens once; generators only format.
 *
 * The tail of the module converts to and from JSON Schema: `jsonToJsonSchema`
 * renders the same `JsonType` tree as a draft 2020-12 schema, and
 * `jsonSchemaToJson` walks a schema the other way to emit one valid instance.
 */

export type JsonPrimitive = 'string' | 'integer' | 'double' | 'boolean' | 'null';

export type JsonType =
  | { kind: 'primitive'; type: JsonPrimitive }
  /** No usable sample (empty array, or a key seen only as null). */
  | { kind: 'unknown' }
  | { kind: 'array'; element: JsonType }
  | { kind: 'object'; name: string; fields: JsonField[] }
  /** Mixed types at one position, e.g. `["a", 1]`. */
  | { kind: 'union'; options: JsonType[] };

export interface JsonField {
  /** The key exactly as it appears in the JSON document. */
  key: string;
  type: JsonType;
  /** False when the key is absent from at least one sampled record. */
  required: boolean;
  /** True when at least one sample was literal `null`. */
  nullable: boolean;
}

/** A named object type, hoisted so generators can emit one class per object. */
export interface NamedObject {
  name: string;
  fields: JsonField[];
}

export interface InferOptions {
  /** Name for the outermost type. */
  rootName?: string;
}

function isInteger(value: number): boolean {
  return Number.isInteger(value) && Number.isSafeInteger(value);
}

function primitiveOf(value: string | number | boolean | null): JsonType {
  if (value === null) return { kind: 'primitive', type: 'null' };
  switch (typeof value) {
    case 'string':
      return { kind: 'primitive', type: 'string' };
    case 'boolean':
      return { kind: 'primitive', type: 'boolean' };
    case 'number':
      return { kind: 'primitive', type: isInteger(value) ? 'integer' : 'double' };
    default:
      return { kind: 'unknown' };
  }
}

/** Structural identity, used to dedupe union options. */
function signature(type: JsonType): string {
  switch (type.kind) {
    case 'primitive':
      return type.type;
    case 'unknown':
      return '?';
    case 'array':
      return `[${signature(type.element)}]`;
    case 'union':
      return `(${type.options.map(signature).sort().join('|')})`;
    case 'object':
      return `{${type.fields
        .map((field) => `${field.key}${field.required ? '' : '?'}:${signature(field.type)}`)
        .sort()
        .join(',')}}`;
  }
}

/**
 * Combine two types observed at the same position.
 *
 * Objects merge field-wise so a key missing on either side becomes optional.
 * `integer` widens to `double` (JSON has one number type; a field holding both
 * 1 and 1.5 is a double). `null` is tracked on the field, not as a union
 * member, because target languages express it with nullability.
 */
function merge(a: JsonType, b: JsonType): JsonType {
  if (a.kind === 'unknown') return b;
  if (b.kind === 'unknown') return a;

  if (a.kind === 'primitive' && b.kind === 'primitive') {
    if (a.type === b.type) return a;
    const numeric = new Set(['integer', 'double']);
    if (numeric.has(a.type) && numeric.has(b.type)) {
      return { kind: 'primitive', type: 'double' };
    }
  }

  if (a.kind === 'array' && b.kind === 'array') {
    return { kind: 'array', element: merge(a.element, b.element) };
  }

  if (a.kind === 'object' && b.kind === 'object') {
    return { kind: 'object', name: a.name, fields: mergeFields(a.fields, b.fields) };
  }

  // Flatten so merging three+ variants doesn't nest unions.
  const options = [
    ...(a.kind === 'union' ? a.options : [a]),
    ...(b.kind === 'union' ? b.options : [b]),
  ];

  const deduped: JsonType[] = [];
  const seen = new Set<string>();
  for (const option of options) {
    const key = signature(option);
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(option);
  }

  return deduped.length === 1 ? deduped[0] : { kind: 'union', options: deduped };
}

function mergeFields(a: JsonField[], b: JsonField[]): JsonField[] {
  const byKey = new Map<string, JsonField>();
  const order: string[] = [];

  for (const field of a) {
    byKey.set(field.key, { ...field });
    order.push(field.key);
  }

  for (const field of b) {
    const existing = byKey.get(field.key);
    if (!existing) {
      // Absent from `a`, so it cannot be required in the merged shape.
      byKey.set(field.key, { ...field, required: false });
      order.push(field.key);
      continue;
    }
    byKey.set(field.key, {
      key: field.key,
      type: merge(existing.type, field.type),
      required: existing.required && field.required,
      nullable: existing.nullable || field.nullable,
    });
  }

  // `a` fields missing from `b` also become optional.
  const bKeys = new Set(b.map((field) => field.key));
  for (const field of a) {
    if (bKeys.has(field.key)) continue;
    const current = byKey.get(field.key);
    if (current) byKey.set(field.key, { ...current, required: false });
  }

  return order.map((key) => byKey.get(key)!);
}

function infer(value: unknown, nameHint: string): JsonType {
  if (value === null || typeof value !== 'object') {
    return primitiveOf(value as string | number | boolean | null);
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return { kind: 'array', element: { kind: 'unknown' } };

    let element: JsonType = { kind: 'unknown' };
    for (const item of value) {
      element = merge(element, infer(item, nameHint));
    }
    return { kind: 'array', element };
  }

  const record = value as Record<string, unknown>;
  const fields: JsonField[] = Object.keys(record).map((key) => {
    const fieldValue = record[key];
    const nullable = fieldValue === null;
    return {
      key,
      type: infer(fieldValue, key),
      required: true,
      nullable,
    };
  });

  return { kind: 'object', name: nameHint, fields };
}

/**
 * Strip `null` out of a union and report it as nullability instead, so
 * generators can emit `string?` / `Optional<String>` rather than a union with
 * a null member.
 */
export function unwrapNullable(type: JsonType): { type: JsonType; nullable: boolean } {
  if (type.kind === 'primitive' && type.type === 'null') {
    return { type: { kind: 'unknown' }, nullable: true };
  }

  if (type.kind !== 'union') return { type, nullable: false };

  const nonNull = type.options.filter(
    (option) => !(option.kind === 'primitive' && option.type === 'null')
  );
  const nullable = nonNull.length !== type.options.length;

  if (nonNull.length === 0) return { type: { kind: 'unknown' }, nullable: true };
  if (nonNull.length === 1) return { type: nonNull[0], nullable };
  return { type: { kind: 'union', options: nonNull }, nullable };
}

export interface InferResult {
  root: JsonType;
  /** True when the document's outermost value is an array. */
  rootIsArray: boolean;
}

/** Infer a type tree from a parsed JSON value. */
export function inferType(value: unknown, options: InferOptions = {}): InferResult {
  const { rootName = 'Root' } = options;
  const root = infer(value, rootName);
  return { root, rootIsArray: Array.isArray(value) };
}

/**
 * Parse and infer in one step.
 *
 * @throws {SyntaxError} when `text` is not valid JSON.
 */
export function inferFromText(text: string, options: InferOptions = {}): InferResult {
  return inferType(JSON.parse(text), options);
}

/**
 * Walk a type tree and hoist every object into a flat, uniquely-named list in
 * declaration order (dependencies before the types that use them).
 *
 * `nameFor` lets each language apply its own casing, and `dedupe` reuses one
 * declaration for structurally identical objects instead of emitting near
 * duplicates.
 */
/**
 * Naming hint for the outermost type.
 *
 * `infer` records the root name on an object, but an array root has no name of
 * its own, so the hint has to come from the element it wraps — otherwise a
 * caller's `rootName` is silently discarded for every array-rooted document.
 */
function rootHint(root: JsonType): string {
  switch (root.kind) {
    case 'object':
      return root.name;
    case 'array':
      return rootHint(root.element);
    default:
      return 'Root';
  }
}

export function collectObjects(
  root: JsonType,
  nameFor: (hint: string) => string,
  options: { dedupe?: boolean } = {}
): { objects: NamedObject[]; nameOf: (type: JsonType) => string | undefined } {
  const { dedupe = true } = options;
  const objects: NamedObject[] = [];
  const assigned = new Map<JsonType, string>();
  const bySignature = new Map<string, string>();

  function visit(type: JsonType, hint: string): void {
    switch (type.kind) {
      case 'array':
        visit(type.element, hint);
        return;
      case 'union':
        for (const option of type.options) visit(option, hint);
        return;
      case 'object': {
        const key = signature(type);
        if (dedupe) {
          const existing = bySignature.get(key);
          if (existing) {
            assigned.set(type, existing);
            return;
          }
        }

        // Reserve the name before recursing so nested objects that reference
        // this one see a stable name and recursion cannot loop.
        const name = nameFor(hint);
        assigned.set(type, name);
        if (dedupe) bySignature.set(key, name);

        for (const field of type.fields) {
          visit(field.type, field.key);
        }

        objects.push({ name, fields: type.fields });
        return;
      }
      default:
        return;
    }
  }

  visit(root, rootHint(root));

  return {
    objects,
    nameOf: (type: JsonType) => assigned.get(type),
  };
}

/* -------------------------------------------------------------------------
 * JSON Schema rendering (JSON document → schema).
 * ----------------------------------------------------------------------- */

type JsonSchemaObject = Record<string, unknown>;

const SCHEMA_TYPE: Record<JsonPrimitive, string> = {
  string: 'string',
  integer: 'integer',
  double: 'number',
  boolean: 'boolean',
  null: 'null',
};

function baseSchema(type: JsonType): JsonSchemaObject {
  switch (type.kind) {
    case 'primitive':
      return { type: SCHEMA_TYPE[type.type] };
    case 'unknown':
      // No usable sample (empty array, key seen only as null) — anything goes.
      return {};
    case 'array':
      return { type: 'array', items: schemaOf(type.element) };
    case 'object': {
      const properties: Record<string, JsonSchemaObject> = {};
      const required: string[] = [];
      for (const field of type.fields) {
        properties[field.key] = schemaOf(field.type);
        if (field.required) required.push(field.key);
      }
      const schema: JsonSchemaObject = { type: 'object', properties };
      if (required.length > 0) schema.required = required;
      return schema;
    }
    case 'union':
      return { anyOf: type.options.map(schemaOf) };
  }
}

/** Render a type tree as a JSON Schema fragment. */
function schemaOf(type: JsonType): JsonSchemaObject {
  const { type: unwrapped, nullable } = unwrapNullable(type);
  const base = baseSchema(unwrapped);
  // An empty schema already allows null, so wrapping it would be noise.
  if (!nullable || Object.keys(base).length === 0) return base;
  // A scalar `type` folds null into the list; anything else needs a branch.
  if (typeof base.type === 'string') return { ...base, type: [base.type, 'null'] };
  return { anyOf: [base, { type: 'null' }] };
}

/**
 * Infer a draft 2020-12 JSON Schema from a JSON document.
 *
 * @throws {SyntaxError} when `text` is not valid JSON.
 */
export function jsonToJsonSchema(text: string): string {
  const { root } = inferFromText(text);
  return JSON.stringify(
    { $schema: 'https://json-schema.org/draft/2020-12/schema', ...schemaOf(root) },
    null,
    2
  );
}

/* -------------------------------------------------------------------------
 * JSON Schema sampling (schema → one valid JSON document).
 * ----------------------------------------------------------------------- */

/** Placeholder for a string with a recognised `format`. */
const FORMAT_SAMPLES: Record<string, string> = {
  'date-time': '2024-01-01T00:00:00Z',
  date: '2024-01-01',
  time: '00:00:00',
  email: 'user@example.com',
  uri: 'https://example.com',
  uuid: '00000000-0000-4000-8000-000000000000',
};

/** Resolve a local `#/...` JSON pointer against the root schema. */
function resolveRef(ref: string, root: unknown): unknown {
  if (ref === '#' || ref === '#/') return root;
  return ref
    .slice(2)
    .split('/')
    .reduce<unknown>(
      (node, part) =>
        node !== null && typeof node === 'object'
          ? (node as Record<string, unknown>)[part.replace(/~1/g, '/').replace(/~0/g, '~')]
          : undefined,
      root
    );
}

function sampleFromSchema(node: unknown, root: unknown, resolving: Set<string>): unknown {
  // Boolean schemas: `true` admits anything, `false` nothing.
  if (node === true) return null;
  if (node === null || typeof node !== 'object' || Array.isArray(node)) return null;
  const schema = node as Record<string, unknown>;

  const ref = schema.$ref;
  if (typeof ref === 'string') {
    if (!ref.startsWith('#/') && ref !== '#') {
      throw new Error(`Only local $ref pointers are supported, got "${ref}".`);
    }
    if (resolving.has(ref)) return null; // cyclic schema — stop instead of looping
    const target = resolveRef(ref, root);
    if (target === undefined) throw new Error(`Cannot resolve $ref "${ref}".`);
    resolving.add(ref);
    const value = sampleFromSchema(target, root, resolving);
    resolving.delete(ref);
    return value;
  }

  if ('const' in schema) return schema.const;
  if (Array.isArray(schema.enum) && schema.enum.length > 0) return schema.enum[0];
  if ('default' in schema) return schema.default;
  if (Array.isArray(schema.examples) && schema.examples.length > 0) return schema.examples[0];

  // allOf merges its branches; the other combinators take the first option.
  if (Array.isArray(schema.allOf) && schema.allOf.length > 0) {
    const merged = schema.allOf.map((branch) => sampleFromSchema(branch, root, resolving));
    if (merged.every((v) => v !== null && typeof v === 'object' && !Array.isArray(v))) {
      return Object.assign({}, ...merged);
    }
    return merged[0];
  }
  for (const combiner of ['oneOf', 'anyOf'] as const) {
    const options = schema[combiner];
    if (Array.isArray(options) && options.length > 0) {
      return sampleFromSchema(options[0], root, resolving);
    }
  }

  const declared = Array.isArray(schema.type)
    ? (schema.type.find((t) => t !== 'null') ?? 'null')
    : schema.type;
  const kind =
    typeof declared === 'string'
      ? declared
      : schema.properties
        ? 'object'
        : schema.items
          ? 'array'
          : undefined;

  switch (kind) {
    case 'object': {
      const properties =
        schema.properties !== null && typeof schema.properties === 'object'
          ? (schema.properties as Record<string, unknown>)
          : {};
      return Object.fromEntries(
        Object.keys(properties).map((key) => [
          key,
          sampleFromSchema(properties[key], root, resolving),
        ])
      );
    }
    case 'array':
      return schema.items ? [sampleFromSchema(schema.items, root, resolving)] : [];
    case 'string': {
      const format = typeof schema.format === 'string' ? schema.format : '';
      return FORMAT_SAMPLES[format] ?? 'string';
    }
    case 'integer':
    case 'number':
      return typeof schema.minimum === 'number' ? schema.minimum : 0;
    case 'boolean':
      return true;
    default:
      // `null`, and the empty schema `{}` which validates anything.
      return null;
  }
}

/**
 * Generate one sample JSON document from a JSON Schema.
 *
 * @throws {SyntaxError} when `text` is not valid JSON.
 * @throws {Error} when the schema is not an object or a $ref cannot resolve.
 */
export function jsonSchemaToJson(text: string): string {
  const parsed: unknown = JSON.parse(text);
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('A JSON Schema must be a JSON object.');
  }
  return JSON.stringify(sampleFromSchema(parsed, parsed, new Set()), null, 2);
}

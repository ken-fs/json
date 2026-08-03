/**
 * Structural type inference over a parsed JSON value.
 *
 * The existing `jsonToTypeScript` / `jsonToJava` helpers infer array element
 * types from `value[0]` alone, so `[1, null]` becomes `number[]` and a field
 * missing from later records looks required. This module walks every element
 * and every record instead, producing one `JsonType` tree that all language
 * generators render. Inference happens once; generators only format.
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

/**
 * Language generators.
 *
 * Every generator consumes the one type tree from `schema.ts` and only decides
 * how to spell it: casing, nullability, collection syntax, and the annotation
 * needed when a JSON key is not a legal identifier. Inference lives in
 * `schema.ts` so all targets agree on the same shape.
 */

import {
  camelCase,
  createNameRegistry,
  escapeStringLiteral,
  pascalCase,
  safeIdentifier,
  singularize,
  snakeCase,
} from './naming';
import {
  collectObjects,
  inferFromText,
  unwrapNullable,
  type JsonField,
  type JsonType,
  type NamedObject,
} from './schema';

export interface GenerateOptions {
  /** Name of the root type. Defaults per language. */
  rootName?: string;
}

/** Wrap a generator so invalid JSON always surfaces the same way. */
function generator(
  run: (text: string, rootName: string) => string,
  defaultRootName: string
) {
  return (text: string, options: GenerateOptions = {}): string => {
    const rootName = options.rootName?.trim() || defaultRootName;
    if (!text.trim()) return '';
    return run(text, rootName);
  };
}

/** `"first-name"` needs an annotation; `"id"` does not. */
function needsAnnotation(key: string, identifier: string): boolean {
  return key !== identifier;
}

/**
 * Base name for the alias that wraps a root-level JSON array.
 *
 * The array's element object already claims `rootName`, so the alias needs a
 * name of its own — `export type Root = Root[]` is a self-referential type that
 * does not compile. Callers pass the result through their language's identifier
 * and uniqueness helpers, which also covers the case where a nested object is
 * already called `RootList`.
 *
 * The stem is singularized to match the element type, so `rootName: "Users"`
 * gives `UserList` alongside `interface User` rather than `UsersList`.
 */
function rootArrayAliasName(rootName: string): string {
  return `${singularize(rootName)}List`;
}

// ---------------------------------------------------------------------------
// TypeScript
// ---------------------------------------------------------------------------

const TS_RESERVED = new Set([
  'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default',
  'delete', 'do', 'else', 'enum', 'export', 'extends', 'false', 'finally',
  'for', 'function', 'if', 'import', 'in', 'instanceof', 'new', 'null',
  'return', 'super', 'switch', 'this', 'throw', 'true', 'try', 'typeof',
  'var', 'void', 'while', 'with',
]);

/** A key that is not a valid JS identifier must be quoted in an interface. */
function tsPropertyName(key: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? key : `"${escapeStringLiteral(key)}"`;
}

export const jsonToTypeScript = generator((text, rootName) => {
  const { root } = inferFromText(text, { rootName });
  const unique = createNameRegistry();
  const { objects, nameOf } = collectObjects(root, (hint) => {
    const base = pascalCase(singularize(hint)) || 'Root';
    return unique(safeIdentifier(base, TS_RESERVED, { fallback: 'Root' }));
  });

  const render = (type: JsonType): string => {
    switch (type.kind) {
      case 'primitive':
        switch (type.type) {
          case 'integer':
          case 'double':
            return 'number';
          case 'null':
            return 'null';
          default:
            return type.type;
        }
      case 'unknown':
        return 'unknown';
      case 'array': {
        const element = render(type.element);
        // Union elements need parentheses: `(string | number)[]`.
        return type.element.kind === 'union' ? `(${element})[]` : `${element}[]`;
      }
      case 'union':
        return type.options.map(render).join(' | ');
      case 'object':
        return nameOf(type) ?? 'Record<string, unknown>';
    }
  };

  const declarations = objects.map((object) => {
    const lines = object.fields.map((field) => {
      const { type, nullable } = unwrapNullable(field.type);
      const optional = field.required ? '' : '?';
      const rendered = render(type);
      // `unknown` already admits null, so `unknown | null` is only noise.
      const value =
        (nullable || field.nullable) && rendered !== 'unknown' && rendered !== 'null'
          ? `${rendered} | null`
          : rendered;
      return `  ${tsPropertyName(field.key)}${optional}: ${value};`;
    });

    return `export interface ${object.name} {\n${lines.join('\n')}\n}`;
  });

  // A root array has no interface of its own, so alias it to the element type.
  if (root.kind === 'array') {
    const rendered = render(root);
    const alias = unique(
      safeIdentifier(pascalCase(rootArrayAliasName(rootName)), TS_RESERVED, { fallback: 'RootList' })
    );
    declarations.push(`export type ${alias} = ${rendered};`);
  }

  return declarations.join('\n\n');
}, 'Root');

// ---------------------------------------------------------------------------
// Java
// ---------------------------------------------------------------------------

const JAVA_RESERVED = new Set([
  'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char',
  'class', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum',
  'extends', 'final', 'finally', 'float', 'for', 'goto', 'if', 'implements',
  'import', 'instanceof', 'int', 'interface', 'long', 'native', 'new',
  'package', 'private', 'protected', 'public', 'return', 'short', 'static',
  'strictfp', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws',
  'transient', 'try', 'void', 'volatile', 'while', 'record', 'var',
]);

export const jsonToJava = generator((text, rootName) => {
  const { root } = inferFromText(text, { rootName });
  const unique = createNameRegistry();
  const { objects, nameOf } = collectObjects(root, (hint) => {
    const base = pascalCase(singularize(hint)) || 'Root';
    return unique(safeIdentifier(base, JAVA_RESERVED, { fallback: 'Root' }));
  });

  let usesList = false;

  // Java generics cannot hold primitives, so nested types use boxed names.
  const render = (type: JsonType, boxed: boolean): string => {
    switch (type.kind) {
      case 'primitive':
        switch (type.type) {
          case 'string':
            return 'String';
          case 'integer':
            return boxed ? 'Long' : 'long';
          case 'double':
            return boxed ? 'Double' : 'double';
          case 'boolean':
            return boxed ? 'Boolean' : 'boolean';
          case 'null':
            return 'Object';
        }
      // falls through for exhaustiveness
      case 'unknown':
        return 'Object';
      case 'array':
        usesList = true;
        return `List<${render(type.element, true)}>`;
      case 'union':
        return 'Object';
      case 'object':
        return nameOf(type) ?? 'Object';
    }
  };

  const declarations = objects.map((object) => {
    const members = object.fields.map((field) => {
      const { type, nullable } = unwrapNullable(field.type);
      // An optional or nullable primitive must be boxed to hold absence.
      const box = nullable || field.nullable || !field.required;
      const javaType = render(type, box);
      const name = safeIdentifier(camelCase(field.key), JAVA_RESERVED, {
        fallback: 'value',
        reservedSuffix: 'Value',
      });
      const accessor = pascalCase(name) || 'Value';
      return { field, javaType, name, accessor };
    });

    const fieldLines = members.map(({ field, javaType, name }) => {
      const annotation = needsAnnotation(field.key, name)
        ? `    @JsonProperty("${escapeStringLiteral(field.key)}")\n`
        : '';
      return `${annotation}    private ${javaType} ${name};`;
    });

    const accessorLines = members.flatMap(({ javaType, name, accessor }) => [
      `    public ${javaType} get${accessor}() {\n        return ${name};\n    }`,
      `    public void set${accessor}(${javaType} ${name}) {\n        this.${name} = ${name};\n    }`,
    ]);

    return `public class ${object.name} {\n${fieldLines.join('\n\n')}\n\n${accessorLines.join('\n\n')}\n}`;
  });

  // Java has no type alias, so a root array can only be pointed out in a note.
  // Built before the imports because `render` is what sets `usesList`.
  const rootNote =
    root.kind === 'array'
      ? `// The root JSON value is an array — deserialize it as ${render(root, true)}.\n\n`
      : '';

  const imports: string[] = [];
  if (usesList) imports.push('import java.util.List;');
  const anyAnnotation = objects.some((object) =>
    object.fields.some((field) =>
      needsAnnotation(field.key, safeIdentifier(camelCase(field.key), JAVA_RESERVED, { fallback: 'value', reservedSuffix: 'Value' }))
    )
  );
  if (anyAnnotation) imports.push('import com.fasterxml.jackson.annotation.JsonProperty;');

  const header = imports.length > 0 ? `${imports.join('\n')}\n\n` : '';
  return `${header}${rootNote}${declarations.join('\n\n')}`;
}, 'Root');

// ---------------------------------------------------------------------------
// Go
// ---------------------------------------------------------------------------

const GO_RESERVED = new Set([
  'break', 'case', 'chan', 'const', 'continue', 'default', 'defer', 'else',
  'fallthrough', 'for', 'func', 'go', 'goto', 'if', 'import', 'interface',
  'map', 'package', 'range', 'return', 'select', 'struct', 'switch', 'type', 'var',
]);

/** Go initialisms stay fully capitalized by convention (`ID`, `URL`). */
const GO_INITIALISMS = new Set([
  'id', 'url', 'uri', 'api', 'http', 'https', 'json', 'xml', 'html', 'sql',
  'uuid', 'ip', 'db', 'ttl', 'cpu', 'ram', 'os', 'io',
]);

function goExported(key: string): string {
  const parts = key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean);

  const name = parts
    .map((part) => {
      const lower = part.toLowerCase();
      return GO_INITIALISMS.has(lower)
        ? lower.toUpperCase()
        : lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');

  return name.length > 0 ? name : 'Field';
}

/**
 * Go only serializes exported fields, so an identifier that would start with
 * a digit or underscore gets an `F` prefix rather than the `_` that
 * `safeIdentifier` adds — `_2fa` would be silently skipped by encoding/json.
 */
function goFieldName(key: string): string {
  const name = goExported(key);
  const exported = /^[A-Z]/.test(name) ? name : `F${name}`;
  return safeIdentifier(exported, GO_RESERVED, { fallback: 'Field' });
}

export const jsonToGo = generator((text, rootName) => {
  const { root } = inferFromText(text, { rootName });
  const unique = createNameRegistry();
  const { objects, nameOf } = collectObjects(root, (hint) =>
    unique(safeIdentifier(goExported(singularize(hint)), GO_RESERVED, { fallback: 'Root' }))
  );

  const render = (type: JsonType, nullable: boolean): string => {
    let base: string;
    switch (type.kind) {
      case 'primitive':
        base =
          type.type === 'string' ? 'string'
          : type.type === 'integer' ? 'int64'
          : type.type === 'double' ? 'float64'
          : type.type === 'boolean' ? 'bool'
          : 'interface{}';
        break;
      case 'unknown':
      case 'union':
        base = 'interface{}';
        break;
      case 'array':
        // Slices are already nilable, so never add a pointer.
        return `[]${render(type.element, false)}`;
      case 'object':
        base = nameOf(type) ?? 'map[string]interface{}';
        break;
    }
    // Pointers let encoding/json distinguish "absent" from "zero value".
    return nullable && base !== 'interface{}' ? `*${base}` : base;
  };

  const declarations = objects.map((object) => {
    const rows = object.fields.map((field) => {
      const { type, nullable } = unwrapNullable(field.type);
      const isNullable = nullable || field.nullable || !field.required;
      const name = goFieldName(field.key);
      const goType = render(type, isNullable);
      const omit = field.required ? '' : ',omitempty';
      const tag = `\`json:"${escapeStringLiteral(field.key)}${omit}"\``;
      return { name, goType, tag };
    });

    // Align columns the way gofmt would.
    const nameWidth = Math.max(0, ...rows.map((row) => row.name.length));
    const typeWidth = Math.max(0, ...rows.map((row) => row.goType.length));
    const lines = rows.map(
      (row) =>
        `\t${row.name.padEnd(nameWidth)} ${row.goType.padEnd(typeWidth)} ${row.tag}`
    );

    return `type ${object.name} struct {\n${lines.join('\n')}\n}`;
  });

  if (root.kind === 'array') {
    const rendered = render(root, false);
    const alias = unique(
      safeIdentifier(goExported(rootArrayAliasName(rootName)), GO_RESERVED, { fallback: 'RootList' })
    );
    declarations.push(`type ${alias} ${rendered}`);
  }

  return declarations.join('\n\n');
}, 'Root');

// ---------------------------------------------------------------------------
// Python (dataclasses)
// ---------------------------------------------------------------------------

const PYTHON_RESERVED = new Set([
  'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break',
  'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally',
  'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal',
  'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield',
]);

export const jsonToPython = generator((text, rootName) => {
  const { root } = inferFromText(text, { rootName });
  const unique = createNameRegistry();
  const { objects, nameOf } = collectObjects(root, (hint) => {
    const base = pascalCase(singularize(hint)) || 'Root';
    return unique(safeIdentifier(base, PYTHON_RESERVED, { fallback: 'Root' }));
  });

  const typing = new Set<string>();

  const render = (type: JsonType): string => {
    switch (type.kind) {
      case 'primitive':
        return type.type === 'string' ? 'str'
          : type.type === 'integer' ? 'int'
          : type.type === 'double' ? 'float'
          : type.type === 'boolean' ? 'bool'
          : 'None';
      case 'unknown':
        typing.add('Any');
        return 'Any';
      case 'array':
        typing.add('List');
        return `List[${render(type.element)}]`;
      case 'union': {
        typing.add('Union');
        return `Union[${type.options.map(render).join(', ')}]`;
      }
      case 'object':
        return nameOf(type) ?? 'dict';
    }
  };

  const declarations = objects.map((object) => {
    // Fields with defaults must follow those without, or Python raises at
    // class-creation time.
    const rendered = object.fields.map((field) => {
      const { type, nullable } = unwrapNullable(field.type);
      const isOptional = nullable || field.nullable || !field.required;
      let annotation = render(type);
      if (isOptional) {
        typing.add('Optional');
        annotation = `Optional[${annotation}]`;
      }
      const name = safeIdentifier(snakeCase(field.key), PYTHON_RESERVED, {
        fallback: 'value',
        reservedSuffix: '_',
      });
      const alias = needsAnnotation(field.key, name)
        ? `  # JSON key: "${field.key}"`
        : '';
      return { name, annotation, isOptional, alias };
    });

    const ordered = [
      ...rendered.filter((entry) => !entry.isOptional),
      ...rendered.filter((entry) => entry.isOptional),
    ];

    const lines = ordered.map(
      (entry) =>
        `    ${entry.name}: ${entry.annotation}${entry.isOptional ? ' = None' : ''}${entry.alias}`
    );

    const body = lines.length > 0 ? lines.join('\n') : '    pass';
    return `@dataclass\nclass ${object.name}:\n${body}`;
  });

  // Render the root alias before the header, so the `List` it needs is in
  // `typing` by the time the import line is built.
  // PEP 8 puts type aliases in PascalCase, which also keeps this from reading
  // like a module-level variable.
  const rootAlias =
    root.kind === 'array'
      ? `\n${unique(
          safeIdentifier(pascalCase(rootArrayAliasName(rootName)), PYTHON_RESERVED, {
            fallback: 'RootList',
          })
        )} = ${render(root)}`
      : '';

  const header = ['from dataclasses import dataclass'];
  if (typing.size > 0) {
    header.push(`from typing import ${[...typing].sort().join(', ')}`);
  }

  const parts = [`${header.join('\n')}\n`, declarations.join('\n\n\n')];
  if (rootAlias) parts.push(rootAlias);

  return parts.join('\n');
}, 'Root');

// ---------------------------------------------------------------------------
// C#
// ---------------------------------------------------------------------------

const CSHARP_RESERVED = new Set([
  'abstract', 'as', 'base', 'bool', 'break', 'byte', 'case', 'catch', 'char',
  'checked', 'class', 'const', 'continue', 'decimal', 'default', 'delegate',
  'do', 'double', 'else', 'enum', 'event', 'explicit', 'extern', 'false',
  'finally', 'fixed', 'float', 'for', 'foreach', 'goto', 'if', 'implicit',
  'in', 'int', 'interface', 'internal', 'is', 'lock', 'long', 'namespace',
  'new', 'null', 'object', 'operator', 'out', 'override', 'params', 'private',
  'protected', 'public', 'readonly', 'ref', 'return', 'sbyte', 'sealed',
  'short', 'sizeof', 'stackalloc', 'static', 'string', 'struct', 'switch',
  'this', 'throw', 'true', 'try', 'typeof', 'uint', 'ulong', 'unchecked',
  'unsafe', 'ushort', 'using', 'virtual', 'void', 'volatile', 'while',
]);

export const jsonToCSharp = generator((text, rootName) => {
  const { root } = inferFromText(text, { rootName });
  const unique = createNameRegistry();
  const { objects, nameOf } = collectObjects(root, (hint) => {
    const base = pascalCase(singularize(hint)) || 'Root';
    return unique(safeIdentifier(base, CSHARP_RESERVED, { fallback: 'Root' }));
  });

  let usesCollections = false;

  const render = (type: JsonType): string => {
    switch (type.kind) {
      case 'primitive':
        return type.type === 'string' ? 'string'
          : type.type === 'integer' ? 'long'
          : type.type === 'double' ? 'double'
          : type.type === 'boolean' ? 'bool'
          : 'object';
      case 'unknown':
      case 'union':
        return 'object';
      case 'array':
        usesCollections = true;
        return `List<${render(type.element)}>`;
      case 'object':
        return nameOf(type) ?? 'object';
    }
  };

  /** Reference types are already nullable; value types need `?`. */
  const isValueType = (type: JsonType): boolean =>
    type.kind === 'primitive' && type.type !== 'string' && type.type !== 'null';

  const declarations = objects.map((object) => {
    const lines = object.fields.map((field) => {
      const { type, nullable } = unwrapNullable(field.type);
      const isNullable = nullable || field.nullable || !field.required;
      const name = safeIdentifier(pascalCase(field.key), CSHARP_RESERVED, {
        fallback: 'Value',
        reservedSuffix: 'Value',
      });
      const csharpType = `${render(type)}${isNullable && isValueType(type) ? '?' : ''}`;
      const annotation = needsAnnotation(field.key, name)
        ? `    [JsonPropertyName("${escapeStringLiteral(field.key)}")]\n`
        : '';
      return `${annotation}    public ${csharpType} ${name} { get; set; }`;
    });

    return `public class ${object.name}\n{\n${lines.join('\n\n')}\n}`;
  });

  // A `using` alias cannot name a generic type, so a root array gets a note.
  // Built before the imports because `render` is what sets `usesCollections`.
  const rootNote =
    root.kind === 'array'
      ? `// The root JSON value is an array — deserialize it as ${render(root)}.\n\n`
      : '';

  const imports: string[] = [];
  if (usesCollections) imports.push('using System.Collections.Generic;');
  const anyAnnotation = objects.some((object) =>
    object.fields.some((field) =>
      needsAnnotation(
        field.key,
        safeIdentifier(pascalCase(field.key), CSHARP_RESERVED, { fallback: 'Value', reservedSuffix: 'Value' })
      )
    )
  );
  if (anyAnnotation) imports.push('using System.Text.Json.Serialization;');

  const header = imports.length > 0 ? `${imports.join('\n')}\n\n` : '';
  return `${header}${rootNote}${declarations.join('\n\n')}`;
}, 'Root');

// ---------------------------------------------------------------------------
// Rust (serde)
// ---------------------------------------------------------------------------

const RUST_RESERVED = new Set([
  'as', 'async', 'await', 'break', 'const', 'continue', 'crate', 'dyn',
  'else', 'enum', 'extern', 'false', 'fn', 'for', 'if', 'impl', 'in', 'let',
  'loop', 'match', 'mod', 'move', 'mut', 'pub', 'ref', 'return', 'self',
  'static', 'struct', 'super', 'trait', 'true', 'type', 'unsafe', 'use',
  'where', 'while',
]);

export const jsonToRust = generator((text, rootName) => {
  const { root } = inferFromText(text, { rootName });
  const unique = createNameRegistry();
  const { objects, nameOf } = collectObjects(root, (hint) => {
    const base = pascalCase(singularize(hint)) || 'Root';
    return unique(safeIdentifier(base, RUST_RESERVED, { fallback: 'Root' }));
  });

  let usesValue = false;

  const render = (type: JsonType): string => {
    switch (type.kind) {
      case 'primitive':
        return type.type === 'string' ? 'String'
          : type.type === 'integer' ? 'i64'
          : type.type === 'double' ? 'f64'
          : type.type === 'boolean' ? 'bool'
          : (usesValue = true, 'Value');
      case 'unknown':
      case 'union':
        usesValue = true;
        return 'Value';
      case 'array':
        return `Vec<${render(type.element)}>`;
      case 'object':
        return nameOf(type) ?? (usesValue = true, 'Value');
    }
  };

  const declarations = objects.map((object) => {
    const lines = object.fields.map((field) => {
      const { type, nullable } = unwrapNullable(field.type);
      const isOptional = nullable || field.nullable || !field.required;
      const name = safeIdentifier(snakeCase(field.key), RUST_RESERVED, {
        fallback: 'value',
        reservedSuffix: '_',
      });
      const rustType = isOptional ? `Option<${render(type)}>` : render(type);
      // serde renames by default via rename_all, but irregular keys need one.
      const attribute = needsAnnotation(field.key, name)
        ? `    #[serde(rename = "${escapeStringLiteral(field.key)}")]\n`
        : '';
      return `${attribute}    pub ${name}: ${rustType},`;
    });

    return `#[derive(Debug, Clone, Serialize, Deserialize)]\npub struct ${object.name} {\n${lines.join('\n')}\n}`;
  });

  // Render the root alias first: `render` is what sets `usesValue`, so the
  // import list has to be built after every call to it.
  const rootAlias =
    root.kind === 'array'
      ? `\npub type ${unique(
          safeIdentifier(pascalCase(rootArrayAliasName(rootName)), RUST_RESERVED, {
            fallback: 'RootList',
          })
        )} = ${render(root)};`
      : '';

  const imports = ['use serde::{Deserialize, Serialize};'];
  if (usesValue) imports.push('use serde_json::Value;');

  const parts = [`${imports.join('\n')}\n`, declarations.join('\n\n')];
  if (rootAlias) parts.push(rootAlias);

  return parts.join('\n');
}, 'Root');

// ---------------------------------------------------------------------------
// Kotlin
// ---------------------------------------------------------------------------

const KOTLIN_RESERVED = new Set([
  'as', 'break', 'class', 'continue', 'do', 'else', 'false', 'for', 'fun',
  'if', 'in', 'interface', 'is', 'null', 'object', 'package', 'return',
  'super', 'this', 'throw', 'true', 'try', 'typealias', 'typeof', 'val',
  'var', 'when', 'while',
]);

export const jsonToKotlin = generator((text, rootName) => {
  const { root } = inferFromText(text, { rootName });
  const unique = createNameRegistry();
  const { objects, nameOf } = collectObjects(root, (hint) => {
    const base = pascalCase(singularize(hint)) || 'Root';
    return unique(safeIdentifier(base, KOTLIN_RESERVED, { fallback: 'Root' }));
  });

  const render = (type: JsonType): string => {
    switch (type.kind) {
      case 'primitive':
        return type.type === 'string' ? 'String'
          : type.type === 'integer' ? 'Long'
          : type.type === 'double' ? 'Double'
          : type.type === 'boolean' ? 'Boolean'
          : 'Any';
      case 'unknown':
      case 'union':
        return 'Any';
      case 'array':
        return `List<${render(type.element)}>`;
      case 'object':
        return nameOf(type) ?? 'Any';
    }
  };

  let usesSerialName = false;

  const declarations = objects.map((object) => {
    const lines = object.fields.map((field, index) => {
      const { type, nullable } = unwrapNullable(field.type);
      const isNullable = nullable || field.nullable || !field.required;
      const name = safeIdentifier(camelCase(field.key), KOTLIN_RESERVED, {
        fallback: 'value',
        reservedSuffix: 'Value',
      });
      const kotlinType = `${render(type)}${isNullable ? '?' : ''}`;
      const comma = index === object.fields.length - 1 ? '' : ',';
      let prefix = '';
      if (needsAnnotation(field.key, name)) {
        usesSerialName = true;
        prefix = `    @SerialName("${escapeStringLiteral(field.key)}")\n`;
      }
      const defaultValue = isNullable ? ' = null' : '';
      return `${prefix}    val ${name}: ${kotlinType}${defaultValue}${comma}`;
    });

    return `@Serializable\ndata class ${object.name}(\n${lines.join('\n')}\n)`;
  });

  const imports = ['import kotlinx.serialization.Serializable'];
  if (usesSerialName) imports.push('import kotlinx.serialization.SerialName');

  const parts = [`${imports.join('\n')}\n`, declarations.join('\n\n')];

  if (root.kind === 'array') {
    const alias = unique(
      safeIdentifier(pascalCase(rootArrayAliasName(rootName)), KOTLIN_RESERVED, {
        fallback: 'RootList',
      })
    );
    parts.push(`\ntypealias ${alias} = ${render(root)}`);
  }

  return parts.join('\n');
}, 'Root');

// ---------------------------------------------------------------------------
// Dart
// ---------------------------------------------------------------------------

const DART_RESERVED = new Set([
  'abstract', 'as', 'assert', 'async', 'await', 'break', 'case', 'catch',
  'class', 'const', 'continue', 'covariant', 'default', 'deferred', 'do',
  'dynamic', 'else', 'enum', 'export', 'extends', 'extension', 'external',
  'factory', 'false', 'final', 'finally', 'for', 'function', 'get', 'hide',
  'if', 'implements', 'import', 'in', 'interface', 'is', 'library', 'mixin',
  'new', 'null', 'on', 'operator', 'part', 'rethrow', 'return', 'set', 'show',
  'static', 'super', 'switch', 'sync', 'this', 'throw', 'true', 'try',
  'typedef', 'var', 'void', 'while', 'with', 'yield',
]);

export const jsonToDart = generator((text, rootName) => {
  const { root } = inferFromText(text, { rootName });
  const unique = createNameRegistry();
  const { objects, nameOf } = collectObjects(root, (hint) => {
    const base = pascalCase(singularize(hint)) || 'Root';
    return unique(safeIdentifier(base, DART_RESERVED, { fallback: 'Root' }));
  });

  const render = (type: JsonType): string => {
    switch (type.kind) {
      case 'primitive':
        return type.type === 'string' ? 'String'
          : type.type === 'integer' ? 'int'
          : type.type === 'double' ? 'double'
          : type.type === 'boolean' ? 'bool'
          : 'dynamic';
      case 'unknown':
      case 'union':
        return 'dynamic';
      case 'array':
        return `List<${render(type.element)}>`;
      case 'object':
        return nameOf(type) ?? 'dynamic';
    }
  };

  /** Build the `fromJson` expression for one field. */
  const fromJson = (type: JsonType, access: string, isNullable: boolean): string => {
    switch (type.kind) {
      case 'object': {
        const name = nameOf(type);
        if (!name) return access;
        const cast = `${name}.fromJson(${access} as Map<String, dynamic>)`;
        return isNullable ? `${access} == null ? null : ${cast}` : cast;
      }
      case 'array': {
        const element = type.element;
        const inner =
          element.kind === 'object' && nameOf(element)
            ? `${nameOf(element)}.fromJson(e as Map<String, dynamic>)`
            : `e as ${render(element)}`;
        const list = `(${access} as List<dynamic>).map((e) => ${inner}).toList()`;
        return isNullable ? `${access} == null ? null : ${list}` : list;
      }
      default: {
        const rendered = render(type);
        // `dynamic` already admits null; `dynamic?` is a compile error.
        const cast = rendered === 'dynamic' ? 'dynamic' : `${rendered}${isNullable ? '?' : ''}`;
        return `${access} as ${cast}`;
      }
    }
  };

  const declarations = objects.map((object) => {
    const members = object.fields.map((field) => {
      const { type, nullable } = unwrapNullable(field.type);
      const isNullable = nullable || field.nullable || !field.required;
      const name = safeIdentifier(camelCase(field.key), DART_RESERVED, {
        fallback: 'value',
        reservedSuffix: 'Value',
      });
      const rendered = render(type);
      return {
        field,
        name,
        // `dynamic` is implicitly nullable; suffixing `?` will not compile.
        dartType: rendered === 'dynamic' ? 'dynamic' : `${rendered}${isNullable ? '?' : ''}`,
        isNullable,
        type,
      };
    });

    const fieldLines = members.map((m) => `  final ${m.dartType} ${m.name};`);
    const ctorParams = members.map(
      (m) => `    ${m.isNullable ? '' : 'required '}this.${m.name},`
    );
    const fromJsonLines = members.map(
      (m) =>
        `      ${m.name}: ${fromJson(m.type, `json['${escapeStringLiteral(m.field.key)}']`, m.isNullable)},`
    );
    const toJsonLines = members.map((m) => {
      const value =
        m.type.kind === 'object'
          ? `${m.name}${m.isNullable ? '?' : ''}.toJson()`
          : m.type.kind === 'array' && m.type.element.kind === 'object'
            ? `${m.name}${m.isNullable ? '?' : ''}.map((e) => e.toJson()).toList()`
            : m.name;
      return `        '${escapeStringLiteral(m.field.key)}': ${value},`;
    });

    return [
      `class ${object.name} {`,
      fieldLines.join('\n'),
      '',
      `  const ${object.name}({`,
      ctorParams.join('\n'),
      '  });',
      '',
      `  factory ${object.name}.fromJson(Map<String, dynamic> json) => ${object.name}(`,
      fromJsonLines.join('\n'),
      '      );',
      '',
      '  Map<String, dynamic> toJson() => {',
      toJsonLines.join('\n'),
      '      };',
      '}',
    ].join('\n');
  });

  if (root.kind === 'array') {
    const alias = unique(
      safeIdentifier(pascalCase(rootArrayAliasName(rootName)), DART_RESERVED, {
        fallback: 'RootList',
      })
    );
    declarations.push(`typedef ${alias} = ${render(root)};`);
  }

  return declarations.join('\n\n');
}, 'Root');

// ---------------------------------------------------------------------------
// Swift
// ---------------------------------------------------------------------------

const SWIFT_RESERVED = new Set([
  'associatedtype', 'class', 'deinit', 'enum', 'extension', 'fileprivate',
  'func', 'import', 'init', 'inout', 'internal', 'let', 'open', 'operator',
  'private', 'protocol', 'public', 'rethrows', 'static', 'struct', 'subscript',
  'typealias', 'var', 'break', 'case', 'continue', 'default', 'defer', 'do',
  'else', 'fallthrough', 'for', 'guard', 'if', 'in', 'repeat', 'return',
  'switch', 'where', 'while', 'as', 'catch', 'false', 'is', 'nil', 'super',
  'self', 'throw', 'throws', 'true', 'try',
]);

export const jsonToSwift = generator((text, rootName) => {
  const { root } = inferFromText(text, { rootName });
  const unique = createNameRegistry();
  const { objects, nameOf } = collectObjects(root, (hint) => {
    const base = pascalCase(singularize(hint)) || 'Root';
    return unique(safeIdentifier(base, SWIFT_RESERVED, { fallback: 'Root' }));
  });

  const render = (type: JsonType): string => {
    switch (type.kind) {
      case 'primitive':
        return type.type === 'string' ? 'String'
          : type.type === 'integer' ? 'Int'
          : type.type === 'double' ? 'Double'
          : type.type === 'boolean' ? 'Bool'
          : 'String';
      case 'unknown':
      case 'union':
        // Codable cannot synthesize for `Any`, so fall back to a JSON box.
        return 'AnyCodable';
      case 'array':
        return `[${render(type.element)}]`;
      case 'object':
        return nameOf(type) ?? 'AnyCodable';
    }
  };

  const declarations = objects.map((object) => {
    const members = object.fields.map((field) => {
      const { type, nullable } = unwrapNullable(field.type);
      const isOptional = nullable || field.nullable || !field.required;
      const name = safeIdentifier(camelCase(field.key), SWIFT_RESERVED, {
        fallback: 'value',
        reservedSuffix: 'Value',
      });
      return {
        field,
        name,
        swiftType: `${render(type)}${isOptional ? '?' : ''}`,
      };
    });

    const propertyLines = members.map((m) => `    let ${m.name}: ${m.swiftType}`);

    // Only emit CodingKeys when at least one key differs from its property.
    const needsKeys = members.some((m) => needsAnnotation(m.field.key, m.name));
    const codingKeys = needsKeys
      ? [
          '',
          '    enum CodingKeys: String, CodingKey {',
          ...members.map((m) =>
            needsAnnotation(m.field.key, m.name)
              ? `        case ${m.name} = "${escapeStringLiteral(m.field.key)}"`
              : `        case ${m.name}`
          ),
          '    }',
        ].join('\n')
      : '';

    return `struct ${object.name}: Codable {\n${propertyLines.join('\n')}${codingKeys}\n}`;
  });

  const parts = [declarations.join('\n\n')];

  if (root.kind === 'array') {
    const alias = unique(
      safeIdentifier(pascalCase(rootArrayAliasName(rootName)), SWIFT_RESERVED, {
        fallback: 'RootList',
      })
    );
    parts.push(`\ntypealias ${alias} = ${render(root)}`);
  }

  return parts.join('\n');
}, 'Root');

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

export interface LanguageTarget {
  id: string;
  /** Display name, not translated: these are proper nouns. */
  label: string;
  /** Extension used for the download filename. */
  extension: string;
  /** Language id for the output pane's syntax label. */
  generate: (text: string, options?: GenerateOptions) => string;
  /** Comment syntax for the empty-state placeholder. */
  commentPrefix: string;
}

export const LANGUAGE_TARGETS: Record<string, LanguageTarget> = {
  typescript: { id: 'typescript', label: 'TypeScript', extension: 'ts', generate: jsonToTypeScript, commentPrefix: '//' },
  java: { id: 'java', label: 'Java', extension: 'java', generate: jsonToJava, commentPrefix: '//' },
  go: { id: 'go', label: 'Go', extension: 'go', generate: jsonToGo, commentPrefix: '//' },
  python: { id: 'python', label: 'Python', extension: 'py', generate: jsonToPython, commentPrefix: '#' },
  csharp: { id: 'csharp', label: 'C#', extension: 'cs', generate: jsonToCSharp, commentPrefix: '//' },
  rust: { id: 'rust', label: 'Rust', extension: 'rs', generate: jsonToRust, commentPrefix: '//' },
  kotlin: { id: 'kotlin', label: 'Kotlin', extension: 'kt', generate: jsonToKotlin, commentPrefix: '//' },
  dart: { id: 'dart', label: 'Dart', extension: 'dart', generate: jsonToDart, commentPrefix: '//' },
  swift: { id: 'swift', label: 'Swift', extension: 'swift', generate: jsonToSwift, commentPrefix: '//' },
};

export type { JsonField, JsonType, NamedObject };

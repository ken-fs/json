/**
 * Identifier naming helpers shared by every code generator.
 *
 * JSON keys are arbitrary strings ("first-name", "2fa", "class"), but target
 * languages have identifier rules and reserved words. Each generator picks the
 * casing its ecosystem expects and keeps the original key in an annotation.
 */

/** Split an arbitrary JSON key into lowercase word parts. */
export function words(key: string): string[] {
  return (
    key
      // camelCase / PascalCase boundaries
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      // consecutive capitals followed by a word (HTTPServer -> HTTP Server)
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
      // separators
      .split(/[^a-zA-Z0-9]+/)
      .filter(Boolean)
      .map((part) => part.toLowerCase())
  );
}

export function pascalCase(key: string): string {
  const parts = words(key);
  if (parts.length === 0) return '';
  return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}

export function camelCase(key: string): string {
  const pascal = pascalCase(key);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

export function snakeCase(key: string): string {
  return words(key).join('_');
}

export function screamingSnakeCase(key: string): string {
  return words(key).join('_').toUpperCase();
}

/**
 * Make `name` a legal identifier: strip illegal characters, prefix a leading
 * digit, and suffix reserved words. `fallback` covers keys with no usable
 * characters at all (e.g. "***").
 */
export function safeIdentifier(
  name: string,
  reserved: ReadonlySet<string>,
  options: { fallback?: string; reservedSuffix?: string } = {}
): string {
  const { fallback = 'field', reservedSuffix = '_' } = options;

  let identifier = name.replace(/[^a-zA-Z0-9_]/g, '');
  if (identifier.length === 0) identifier = fallback;
  if (/^[0-9]/.test(identifier)) identifier = `_${identifier}`;
  if (reserved.has(identifier)) identifier = `${identifier}${reservedSuffix}`;

  return identifier;
}

/**
 * Hand out unique names within one generated file. Collisions get a numeric
 * suffix (`User`, `User2`, `User3`) rather than silently overwriting.
 */
export function createNameRegistry() {
  const used = new Map<string, number>();

  return function unique(preferred: string): string {
    const base = preferred.length > 0 ? preferred : 'Object';
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    return count === 0 ? base : `${base}${count + 1}`;
  };
}

/** Singularize a plural key so `"users": [...]` yields a `User` type. */
export function singularize(key: string): string {
  if (/(?:ss|us|is|as|os)$/i.test(key)) return key;
  if (/ies$/i.test(key)) return key.replace(/ies$/i, 'y');
  if (/(?:ch|sh|x|z|s)es$/i.test(key)) return key.replace(/es$/i, '');
  if (/s$/i.test(key)) return key.replace(/s$/i, '');
  return key;
}

/** Escape a string for a double-quoted literal in C-like languages. */
export function escapeStringLiteral(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

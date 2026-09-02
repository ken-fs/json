/**
 * Maps a tool id to its conversion function.
 *
 * This is separate from `@/lib/tools` so that catalogue stays serialisable:
 * functions cannot cross the server/client boundary, and a nav link importing
 * the tool list should not pull the whole conversion engine with it. Only the
 * client workspace imports this module.
 */

import { CODE_TARGET_IDS } from '@/lib/tools';
import {
  csvToJSON,
  jsonToCSV,
  jsonToTOML,
  jsonToXML,
  jsonToYAML,
  tomlToJSON,
  xmlToJSON,
  yamlToJSON,
} from './formats';
import { LANGUAGE_TARGETS } from './generators';
import { jsonSchemaToJson, jsonToJsonSchema } from './schema';

export interface ConvertOptions {
  /** Name for the generated root type, used by the code generators. */
  rootName?: string;
  /** Field separator for the CSV tools. */
  delimiter?: string;
}

export type Converter = (input: string, options?: ConvertOptions) => string;

const FORMAT_CONVERTERS: Record<string, Converter> = {
  'json-to-yaml': (input) => jsonToYAML(input),
  'yaml-to-json': (input) => yamlToJSON(input),
  'json-to-xml': (input) => jsonToXML(input),
  'xml-to-json': (input) => xmlToJSON(input),
  'json-to-csv': (input, options) => jsonToCSV(input, { delimiter: options?.delimiter }),
  'csv-to-json': (input, options) => csvToJSON(input, { delimiter: options?.delimiter }),
  'json-to-toml': (input) => jsonToTOML(input),
  'toml-to-json': (input) => tomlToJSON(input),
  'json-to-json-schema': (input) => jsonToJsonSchema(input),
  'json-schema-to-json': (input) => jsonSchemaToJson(input),
};

const CODE_CONVERTERS: Record<string, Converter> = Object.fromEntries(
  Object.values(LANGUAGE_TARGETS).map((target) => [
    `json-to-${target.id}`,
    (input: string, options?: ConvertOptions) =>
      target.generate(input, { rootName: options?.rootName || 'Root' }),
  ])
);

export const CONVERTERS: Record<string, Converter> = {
  ...FORMAT_CONVERTERS,
  ...CODE_CONVERTERS,
};

// The catalogue lists code targets by hand to stay data-only, so verify the two
// lists still agree rather than shipping a page whose converter is missing.
const missing = CODE_TARGET_IDS.filter((id) => !(`json-to-${id}` in CODE_CONVERTERS));
if (missing.length > 0) {
  throw new Error(
    `Tool catalogue lists code targets with no generator: ${missing.join(', ')}`
  );
}

export function getConverter(id: string): Converter | undefined {
  return CONVERTERS[id];
}

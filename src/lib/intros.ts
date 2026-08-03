/**
 * Explanatory copy rendered below each workspace.
 *
 * Two jobs: give a first-time visitor the background they need to use the tool
 * correctly, and give the page real body text. Before this existed the tool
 * pages were almost entirely UI chrome, so there was nothing for a search
 * engine to read beyond the meta description.
 *
 * Pure data, like `@/lib/tools`, so a server component can render it and no
 * conversion code is pulled into a bundle that only needs the prose.
 *
 * English lives here and is passed to `t()` as `defaultValue`; `zh`, `es`, and
 * `pt` override it from the locale files. Keeping English in one place instead
 * of a fourth locale copy keeps it next to the code it describes.
 *
 * Backticks mark inline code: `` `{}` `` renders in the mono face. Write claims
 * that are actually true of the converter — these are checked against real
 * output, not just proofread.
 */

export interface IntroBullet {
  /** Rendered in the mono face, e.g. `{}`. */
  code: string;
  text: string;
}

export interface IntroQuestion {
  q: string;
  a: string;
}

export interface ToolIntro {
  /** Lead paragraphs. Backticked spans become inline code. */
  paragraphs: string[];
  /** Optional syntax/rule list shown between the prose and the questions. */
  bullets?: IntroBullet[];
  /** Practical questions people actually hit, with real answers. */
  questions: IntroQuestion[];
}

/**
 * The formatter on `/`. This is the one page where explaining JSON itself is
 * the point, so it carries the syntax table.
 */
const JSON_FORMATTER: ToolIntro = {
  paragraphs: [
    'JSON is a text format for structured data. It replaced XML for most APIs by being smaller and quicker to read, without giving up the ability to describe nested structures. A JSON document is just a string, with a handful of characters carrying all the meaning:',
  ],
  bullets: [
    { code: '{}', text: 'Braces hold an object — an unordered set of key/value pairs.' },
    { code: '[]', text: 'Brackets hold an array — an ordered list of values.' },
    { code: '""', text: 'Double quotes wrap every string, and every key.' },
    { code: ':', text: 'A colon separates a key from its value, which may itself be an object or an array.' },
  ],
  questions: [
    {
      q: "Why does {name:'json'} fail validation?",
      a: "JSON requires double quotes on both keys and string values, so that has to be {\"name\": \"json\"}. Single quotes and bare keys are valid JavaScript object literals, not valid JSON — which is the single most common reason a payload that looks fine gets rejected.",
    },
    {
      q: 'Why is my trailing comma an error?',
      a: 'JSON does not allow a comma after the last element of an object or array. {"a": 1,} is invalid. JavaScript, Python, and most linters tolerate it, so it survives right up to the point something strict parses it.',
    },
    {
      q: 'Can I include a comment?',
      a: 'No. JSON has no comment syntax, which is why formats like YAML and TOML exist for configuration files that humans maintain. If you need comments in a config, convert to one of those.',
    },
    {
      q: 'Is my data uploaded anywhere?',
      a: 'No. Every tool on this site runs in your browser. Nothing is sent to a server, so you can paste a production payload without it leaving your machine.',
    },
  ],
};

const FORMAT_INTROS: Record<string, ToolIntro> = {
  'json-to-yaml': {
    paragraphs: [
      'YAML expresses the same data as JSON but leans on indentation instead of braces, which makes it the usual choice for configuration a person has to read and edit. Every JSON document is convertible, since JSON is a subset of YAML.',
      'The hazard is that YAML infers types from unquoted text. A string like `yes`, `off`, `null`, or `1.0` would come back as a boolean, a null, or a number, so this converter quotes any string whose bare form would parse as something else. The result reloads to exactly the values you started with.',
    ],
    questions: [
      {
        q: 'Why did some of my strings come back quoted and others not?',
        a: 'Only the ambiguous ones are quoted. `name: Ada` is unmistakably a string, so quotes would be noise, but `version: "1.0"` needs them or YAML reads it as the number 1. This is sometimes called the Norway problem, after country code NO becoming false.',
      },
      {
        q: 'Are the indentation and key order stable?',
        a: 'Yes. Nested mappings indent by two spaces and keys keep the order they had in the JSON, so the output is diffable against a previous run.',
      },
    ],
  },
  'yaml-to-json': {
    paragraphs: [
      'Converting YAML back to JSON is the usual first step when a config file has to be consumed by something that only speaks JSON, or when you want to check what a YAML file actually parses to rather than what it looks like it says.',
      'Nested mappings, block sequences, inline flow collections, quoted scalars, and comments are all handled. Indentation is what defines structure, so a stray tab or a misaligned key is a parse error rather than a silent change in meaning.',
    ],
    questions: [
      {
        q: 'Why is my tab-indented file rejected?',
        a: 'The YAML spec forbids tabs for indentation. Most editors show them as identical to spaces, which makes this a genuinely hard bug to spot by eye — converting is a quick way to find it.',
      },
      {
        q: 'Are anchors and aliases supported?',
        a: 'No. Anchors (`&name`), aliases (`*name`), and multi-document streams separated by `---` are out of scope. Everything else in ordinary data YAML works.',
      },
    ],
  },
  'json-to-xml': {
    paragraphs: [
      'XML is still what many enterprise systems, SOAP services, and document formats expect. Converting JSON to XML means resolving a structural mismatch: JSON has arrays and a real null, XML has neither.',
      'Arrays repeat the parent tag once per element, nulls become an element carrying `xsi:nil="true"`, and any key that is not a legal element name is sanitised. A root-level array is wrapped in `<item>` elements, because a document with several top-level elements is not well-formed XML.',
    ],
    questions: [
      {
        q: 'Why is my array not visible as an array?',
        a: 'XML has no array type. A list of three items becomes the same element three times over, which is the conventional encoding — but it does mean a one-element array and a plain value look identical in the output.',
      },
      {
        q: 'What happens to a key like "first name" or "2fa"?',
        a: 'Element names cannot contain spaces or start with a digit, so those are rewritten to something legal. The conversion is not reversible for such keys, which is worth knowing before using this as a storage format.',
      },
    ],
  },
  'xml-to-json': {
    paragraphs: [
      'Turning XML into JSON is usually about getting a legacy or third-party payload into a shape modern code can work with. The mapping has to invent conventions, because XML distinguishes things JSON does not.',
      'Attributes become keys prefixed with `@`, repeated sibling elements collapse into an array, and text mixed in alongside child elements lands under `#text`. Those three rules cover the cases where a naive conversion would silently drop data.',
    ],
    questions: [
      {
        q: 'Why did my postcode 02134 become the number 2134?',
        a: 'XML has no type system — everything is text — so values have to be guessed. Anything that looks numeric becomes a number and an empty element becomes null. Round-tripping JSON through XML and back will not always return the original types, and this is the step where that happens.',
      },
      {
        q: 'Where did my attributes go?',
        a: 'Nowhere. An attribute `id="7"` becomes the key `@id`. The prefix keeps it from colliding with a child element that happens to be named `id` too.',
      },
    ],
  },
  'json-to-csv': {
    paragraphs: [
      'CSV is what spreadsheets and most data-analysis tools import, so this is the conversion to reach for when an API response needs to go to someone who works in Excel, Numbers, or Sheets.',
      'JSON is a tree and CSV is a grid, so nesting has to be flattened: a nested object becomes dotted column names like `address.zipCode`. Records that are missing a field still line up under the right headers, and any cell containing your delimiter, a quote, or a newline is quoted so it survives the round trip.',
    ],
    questions: [
      {
        q: 'My JSON is a single object, not an array. Why the error?',
        a: 'CSV rows are records, so the input needs to be an array of objects. Wrap a lone object in brackets to get a one-row file.',
      },
      {
        q: 'Why is a cell starting with = or + quoted?',
        a: 'Spreadsheets treat a leading `=`, `+`, `-`, or `@` as the start of a formula. Quoting those cells keeps a value like `-5` or `=SUM` as text instead of something the spreadsheet tries to evaluate.',
      },
      {
        q: 'What happens to an array of plain values?',
        a: 'It shares one cell, joined with a semicolon and a space, since there is no column to spread it across. An array of objects is flattened by index instead.',
      },
    ],
  },
  'csv-to-json': {
    paragraphs: [
      'Going the other way turns an export or a spreadsheet into an array of objects, which is the shape you want when feeding a CSV into an API, a database seeder, or a test fixture.',
      'The first row becomes the keys. Parsing follows the real CSV conventions rather than splitting on commas: quoted fields may contain the delimiter, `""` is an escaped quote, and a field may span multiple lines. Numbers and booleans are converted to their JSON types instead of staying strings.',
    ],
    questions: [
      {
        q: 'Why did my ID 007 become 7?',
        a: 'Values that look numeric are typed as numbers, which drops the leading zeros. For identifiers, postcodes, and phone numbers that matters — if you need them kept as text, quoting them in the CSV is not enough, so check the output before relying on it.',
      },
      {
        q: 'My file is semicolon separated. Can I still use this?',
        a: 'Yes. Set the delimiter control above the editor to semicolon, tab, or pipe. Exports from spreadsheets in locales that use a comma for decimals are usually semicolon separated.',
      },
    ],
  },
  'json-to-toml': {
    paragraphs: [
      'TOML is the configuration format used by Cargo, pyproject, and a growing number of tools. It aims to be unambiguous where YAML is subtle: types are explicit, and there is no significant whitespace.',
      'Nested objects become `[table]` headers, arrays of objects become `[[table]]` array-of-table blocks, and everything else is written inline. Key order is preserved, so the output stays diffable.',
    ],
    questions: [
      {
        q: 'Why is a top-level array rejected?',
        a: 'A TOML document is a table — a set of key/value pairs — so there is nowhere for a bare array to live. Wrap it in an object under a key first.',
      },
      {
        q: 'Do I get comments?',
        a: 'No, because there are none in the JSON to carry over. TOML supports `#` comments, so this is a good place to add them once the file is generated.',
      },
    ],
  },
  'toml-to-json': {
    paragraphs: [
      'Reading a TOML config as JSON is useful for inspecting what a tool will actually see, or for pulling values out of a `Cargo.toml` or `pyproject.toml` in a script that only handles JSON.',
      'Tables, array-of-tables, dotted keys, inline tables, and arrays spread over several lines are all supported, including the nesting that TOML section headers imply.',
    ],
    questions: [
      {
        q: 'What happens to a TOML date?',
        a: 'It stays a string. TOML has first-class datetime types and JSON has none, so `1979-05-27T07:32:00Z` is preserved verbatim rather than converted into something lossy.',
      },
      {
        q: 'How does a dotted key convert?',
        a: 'It becomes nesting: `owner.name = "Ada"` produces an `owner` object with a `name` inside, which is the same result as writing an `[owner]` section.',
      },
    ],
  },
};

/**
 * Shared opening for the nine code generators, plus the two facts that make
 * the output trustworthy. The per-language half is appended from `CODE_INTROS`.
 */
const CODE_SHARED: IntroQuestion[] = [
  {
    q: 'How are optional fields decided?',
    a: 'Every record in an array is inspected, not just the first. A field that appears in some records and not others is typed as optional, and a value that is sometimes null widens accordingly. Generators that read only the first element get this wrong on exactly the payloads where it matters.',
  },
  {
    q: 'What happens to a key that is a reserved word?',
    a: 'It is renamed to something legal in the target language, and where the language supports it, an annotation records the original JSON key so serialisation still round-trips.',
  },
];

const CODE_INTROS: Record<string, ToolIntro> = {
  'json-to-typescript': {
    paragraphs: [
      'Hand-writing an interface for an API response is tedious and easy to get subtly wrong, particularly around fields that are only sometimes present. Pasting a real response here gives you the interface it implies.',
      'Nested objects are hoisted into their own named interfaces rather than inlined, so you can refer to `Address` directly instead of repeating its shape. Structurally identical objects are emitted once and reused.',
    ],
    questions: [
      {
        q: "What is the difference between `field?: string` and `field: string | null`?",
        a: 'The first means the key may be absent; the second means the key is there but its value may be null. They are different failure modes and this generator distinguishes them, because the JSON does.',
      },
      {
        q: 'Why an interface and not a Zod schema?',
        a: 'An interface is erased at build time, so it costs nothing at runtime and tells you nothing about whether the response actually matched. If you need the check to happen against real traffic, take the interface as the shape and write the validator separately — a generated schema would imply the payload had been verified when it had only been observed once.',
      },
      ...CODE_SHARED,
    ],
  },
  'json-to-java': {
    paragraphs: [
      'Java POJOs for a JSON payload are mostly boilerplate: a private field, a getter, and a setter for every key. This generates all three, with the Jackson annotations needed when a JSON key is not a valid Java identifier.',
      'Nested objects become their own classes, and `java.util.List` is imported only when the payload actually contains an array.',
    ],
    questions: [
      {
        q: 'Why is my count a `Long` here but a `long` elsewhere?',
        a: 'A primitive cannot hold absence. Where a field is optional or nullable the boxed type is used, so a missing value stays distinguishable from 0 — with a primitive it would silently become zero.',
      },
      {
        q: 'Why full getters and setters instead of Lombok?',
        a: 'The output has to compile in a project that has never heard of Lombok, and `@Data` on a class you then paste into a codebase without the annotation processor fails in a confusing way. Deleting thirty lines of accessors and adding one annotation takes a moment; debugging a missing processor does not.',
      },
      ...CODE_SHARED,
    ],
  },
  'json-to-go': {
    paragraphs: [
      'Go structs need a tag on every field to map it to a JSON key, which makes writing them by hand for a large payload slow. This produces the full set, formatted the way gofmt would align them.',
      'Exported names follow Go conventions, including the initialisms the linter expects: an `id` key becomes `ID`, not `Id`.',
    ],
    questions: [
      {
        q: 'Why are some fields pointers?',
        a: 'Optional fields become pointers tagged `omitempty`, which is the only way `encoding/json` can tell a field that was absent from one that arrived as the zero value. Without it, a missing `count` and a `count` of 0 are indistinguishable.',
      },
      {
        q: 'Why interface{} instead of any?',
        a: '`any` is an alias for `interface{}` added in Go 1.18, so the two are identical to the compiler. The output uses `interface{}` because it also compiles on older toolchains, and a struct definition is the last place you want a build to break over a spelling.',
      },
      ...CODE_SHARED,
    ],
  },
  'json-to-python': {
    paragraphs: [
      'A dataclass gives you attribute access and a readable repr for a JSON payload without writing the constructor. This generates one per object in the sample, with type hints throughout.',
      'Keys are converted to snake_case, and where that changes the name a comment records the original JSON key so the mapping stays visible.',
    ],
    questions: [
      {
        q: 'Why are the optional fields at the bottom?',
        a: 'Python raises at class-creation time if a field with a default precedes one without. Optional fields default to None, so they have to come last — the generated class is ordered to compile as written.',
      },
      {
        q: 'Why a dataclass and not a Pydantic model?',
        a: 'A dataclass is in the standard library, so the output runs anywhere Python 3.7 does with nothing to install. Pydantic would add validation, but it would also add a dependency to a snippet you may only want for type hints. If you need the validation, the field list transfers over unchanged.',
      },
      ...CODE_SHARED,
    ],
  },
  'json-to-csharp': {
    paragraphs: [
      'C# classes for a JSON payload need attributes to bridge the naming conventions, since .NET properties are PascalCase and JSON keys usually are not. This generates the properties and the attributes together.',
      'Nested objects become their own classes and `System.Collections.Generic` is imported only when the payload contains a list.',
    ],
    questions: [
      {
        q: 'Why does every property have a JsonPropertyName?',
        a: 'Because PascalCase properties almost never match their JSON keys exactly. Carrying the original key in the attribute means serialisation works without relying on a global naming policy being configured.',
      },
      {
        q: 'Why System.Text.Json and not Newtonsoft?',
        a: '`System.Text.Json` ships with .NET Core 3.0 and later, so the attributes resolve without a package reference. Newtonsoft is still common in older projects — if that is where this is going, the change is `JsonPropertyName` to `JsonProperty` and a different using.',
      },
      ...CODE_SHARED,
    ],
  },
  'json-to-rust': {
    paragraphs: [
      'Serde does the work of deserialising JSON in Rust, but it needs structs that match the payload. This generates them with the derives already in place.',
      'Field names are converted to snake_case, and any key that snake_case cannot round-trip gets an explicit `#[serde(rename)]` so the mapping is exact rather than approximate.',
    ],
    questions: [
      {
        q: 'Why is a field wrapped in Option?',
        a: 'Rust has no null. A field that is optional or sometimes null becomes `Option<T>`, which forces the absent case to be handled at the point of use instead of panicking later.',
      },
      {
        q: 'Why serde_json::Value for some fields?',
        a: 'A field that was null in every record carries no type information at all, so nothing narrower would be honest. `Value` accepts whatever arrives; replace it with the concrete type once you have a sample where the field is populated.',
      },
      ...CODE_SHARED,
    ],
  },
  'json-to-kotlin': {
    paragraphs: [
      'A Kotlin data class gives you equality, a copy method, and destructuring for free, which makes it the natural target for a JSON payload. This generates one per object with kotlinx.serialization annotations.',
      'Keys become camelCase properties, and nested objects are hoisted into their own classes rather than inlined.',
    ],
    questions: [
      {
        q: 'When is a SerialName annotation added?',
        a: 'Only when the JSON key differs from the property name after camelCasing. Adding it everywhere would be noise, so simple models stay clean.',
      },
      {
        q: 'Why kotlinx.serialization and not Moshi or Gson?',
        a: "kotlinx.serialization is the JetBrains-maintained option and understands Kotlin's nullability and default values without reflection, which matters because a data class with defaults is exactly what Gson tends to mishandle. Swapping to Moshi means changing the annotations, not the class.",
      },
      ...CODE_SHARED,
    ],
  },
  'json-to-dart': {
    paragraphs: [
      'Dart has no built-in JSON reflection, so every model class needs `fromJson` and `toJson` written by hand. That is a lot of repetitive code for a Flutter app talking to a real API, and this generates all of it.',
      'Every nested object gets its own class with its own pair of methods, so decoding a payload leaves you holding typed models rather than a raw `Map<String, dynamic>` you have to keep casting.',
    ],
    questions: [
      {
        q: 'Are the fields immutable?',
        a: 'Yes. Fields are `final` with a const constructor and named required parameters, which is the conventional shape for a Flutter model and lets the widget tree treat instances as values.',
      },
      {
        q: 'Why hand-written fromJson instead of json_serializable?',
        a: 'Generated code needs `build_runner` in the project and a part file next to the class, neither of which exists when you are pasting a model into a scratch file. The methods here are complete as written — no build step, nothing to generate.',
      },
      ...CODE_SHARED,
    ],
  },
  'json-to-swift': {
    paragraphs: [
      'Conforming a struct to `Codable` is all Swift needs to decode JSON, provided the property names line up with the keys. This generates the structs, and the `CodingKeys` for the cases where they do not.',
      'Keys become camelCase properties and nested objects are hoisted into their own structs, so the decoded value is fully typed.',
    ],
    questions: [
      {
        q: 'Why do only some structs have a CodingKeys enum?',
        a: 'It is emitted only when at least one key differs from its property name. Where the names already match, Codable handles the mapping on its own and the enum would be dead weight.',
      },
      {
        q: 'Why a struct rather than a class?',
        a: 'A decoded API response is a value: two responses with the same fields are the same response, and nothing should be mutating one from a second reference. Structs give you that plus a free memberwise initialiser. Use a class only if you actually need identity or inheritance.',
      },
      ...CODE_SHARED,
    ],
  },
};

const INTROS: Record<string, ToolIntro> = {
  jsonFormatter: JSON_FORMATTER,
  ...FORMAT_INTROS,
  ...CODE_INTROS,
};

/** `id` is a tool id, or `jsonFormatter` for the homepage. */
export function getIntro(id: string): ToolIntro | undefined {
  return INTROS[id];
}

/** Backticks are display markup, so they do not belong in structured data. */
function stripCode(text: string): string {
  return text.replace(/`/g, '');
}

/**
 * `FAQPage` JSON-LD for an intro's questions.
 *
 * English only, matching the prerendered HTML — the translated copy appears
 * after hydration, which a crawler reading the static export never sees.
 */
export function faqStructuredData(id: string) {
  const intro = getIntro(id);
  if (!intro || intro.questions.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: intro.questions.map((question) => ({
      '@type': 'Question',
      name: stripCode(question.q),
      acceptedAnswer: { '@type': 'Answer', text: stripCode(question.a) },
    })),
  };
}

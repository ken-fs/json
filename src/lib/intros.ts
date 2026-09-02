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
  /**
   * Prose that has to come *after* the bullets, for the case where the list is
   * evidence for the sentence that follows it rather than a closing summary.
   */
  paragraphsAfterBullets?: string[];
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
      'YAML expresses the same data as JSON but leans on indentation instead of braces, which makes it the usual choice for configuration a person has to read and edit. Every JSON document converts, because JSON is a subset of YAML — the interesting part is not the structure, it is the quoting.',
      'YAML infers a type from unquoted text, and it infers generously. Most loaders in use today — PyYAML, Go\'s yaml.v2, Ruby\'s Psych — implement YAML 1.1, where all of the following are typed values rather than strings:',
    ],
    bullets: [
      { code: 'NO', text: 'A boolean, in any capitalisation, along with yes, on, and off. This is the Norway problem: the country code NO loads as false.' },
      { code: '0x1A', text: 'The number 26. Octal (017), binary (0b101), and underscore-separated digits (1_000) resolve too.' },
      { code: '.inf', text: 'A float, as are .nan, .5, and +5 — none of which look like decimals in the way a JSON number does.' },
      { code: '1:30', text: 'Sexagesimal: 90. A duration or a fragment of a timestamp becomes an integer nobody expects.' },
      { code: '2026-08-04', text: 'A date object, not the string you wrote. So is anything with a time appended.' },
    ],
    paragraphsAfterBullets: [
      'Every one of those is quoted on the way out, keys as well as values, so what you load is what you converted. Strings that are unambiguous are left bare, because a file where every scalar is quoted is a file nobody wants to edit.',
    ],
    questions: [
      {
        q: 'Why did some of my strings come back quoted and others not?',
        a: 'Only the ambiguous ones. `name: Ada` cannot be read as anything but a string, so quotes would be noise; `version: "1.0"` needs them or YAML gives you the number 1. The test for this converter checks each trap against a real YAML loader rather than against its own reader, because the point is surviving the parser at the other end.',
      },
      {
        q: 'Does the quoting cost me anything?',
        a: 'Only characters. A quoted scalar and a bare one parse to the same string, so nothing downstream behaves differently — and a config file that reads back the values you put in is worth a few quote marks.',
      },
      {
        q: 'Are the indentation and key order stable?',
        a: 'Yes. Nested mappings indent by two spaces, sequences sit at the parent key\'s level, and keys keep the order they had in the JSON. Convert twice and you get the same bytes, so the output is worth committing and diffing.',
      },
      {
        q: 'What about a JSON null?',
        a: 'It becomes a bare `null`. YAML also spells this `~` and treats an empty value as null, but `null` is the spelling every loader agrees on and the only one that reads unambiguously.',
      },
    ],
  },
  'yaml-to-json': {
    paragraphs: [
      'Two reasons to go this direction. One is plumbing: something downstream only speaks JSON. The other is diagnostic — reading a YAML file tells you what it looks like it says, and converting tells you what it actually parses to. Those differ more often than the format\'s reputation for readability suggests.',
      'Nested mappings, block sequences, inline flow collections (`[1, 2]` and `{a: 1}`), quoted scalars, and `#` comments are all handled. Structure comes from indentation, so misalignment is a parse error here rather than a silent change of meaning.',
    ],
    questions: [
      {
        q: 'Why is my tab-indented file rejected?',
        a: 'The YAML spec forbids tabs for indentation, and most editors render them identically to spaces — which makes this one of the harder bugs to find by reading. Converting is a fast way to locate it: the error names the line.',
      },
      {
        q: 'Will unquoted values keep their YAML types?',
        a: 'Yes, and that is the point of running this. `enabled: yes` gives you `true`, and `zip: 10001` gives you a number. If either surprises you, the YAML needed quotes — better to find out here than in the service that consumes it.',
      },
      {
        q: 'Are anchors and aliases supported?',
        a: 'No. Anchors (`&name`), aliases (`*name`), merge keys (`<<`), and multi-document streams split by `---` are out of scope. Ordinary data YAML — the kind a CI config or a Helm values file is made of — works.',
      },
      {
        q: 'What happens to comments?',
        a: 'They are dropped, because JSON has nowhere to put them. Worth knowing if you were planning to convert a documented config, edit the JSON, and convert back: the prose does not survive the trip.',
      },
    ],
  },
  'json-to-xml': {
    paragraphs: [
      'XML is still what SOAP services, enterprise integrations, and document formats like DOCX and RSS expect. Converting JSON to it means resolving a genuine mismatch rather than reformatting: JSON has arrays and a real null, XML has neither, and XML has attributes, which JSON does not.',
      'Four rules cover the whole conversion:',
    ],
    bullets: [
      { code: '[]', text: 'An array repeats the parent tag once per element. XML models lists by repetition, so there is nothing else to map it to.' },
      { code: 'null', text: 'Becomes an empty element carrying xsi:nil="true", with the xmlns:xsi namespace declared on the root — and only when a null is actually present.' },
      { code: '2fa', text: 'A key that is not a legal element name is sanitised: spaces become underscores, and a leading digit gets an underscore in front of it.' },
      { code: '<root>', text: 'A top-level array is wrapped, with each element as <item>, because a document with several root elements is not well-formed.' },
    ],
    paragraphsAfterBullets: [
      'Nothing here writes attributes. Every JSON key becomes a child element, which is verbose but unambiguous — the alternative is guessing which keys were "really" attributes, and a wrong guess is silent.',
    ],
    questions: [
      {
        q: 'Why is my array not visible as an array?',
        a: 'XML has no array type. A list of three items is the same element three times over, which is the conventional encoding — but it means a one-element array and a plain value are indistinguishable in the output. Converting back gives you the scalar, not a list of one.',
      },
      {
        q: 'Is the xsi:nil output actually valid?',
        a: 'Yes. `xsi` is a namespace prefix, and using one without declaring it is a namespace error even though the document parses — so `xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"` goes on the root element whenever a null appears. Documents with no nulls do not carry a declaration they never use.',
      },
      {
        q: 'What happens to a key like "first name" or "2fa"?',
        a: 'They become `first_name` and `_2fa`. Element names cannot contain spaces or start with a digit, so there is no faithful option — and the rewrite is not reversible, which is worth knowing before treating this as a storage format rather than a hand-off.',
      },
      {
        q: 'Are the values escaped?',
        a: 'Text is escaped for `&`, `<`, and `>`, so a value containing markup stays a value. Those three are the ones that would break the document; quotes are only special inside attributes, and nothing here writes attributes.',
      },
    ],
  },
  'xml-to-json': {
    paragraphs: [
      'Usually this is about getting a legacy or third-party payload into a shape modern code can work with. The mapping has to invent conventions, because XML distinguishes several things JSON does not — and every XML-to-JSON tool invents them slightly differently, which is worth knowing if you are comparing output.',
      'The conventions here are the common ones:',
    ],
    bullets: [
      { code: '@id', text: 'An attribute becomes a key with an @ prefix, so it cannot collide with a child element of the same name.' },
      { code: '#text', text: 'Text sitting alongside child elements lands here, rather than being dropped as it would be by a naive walk.' },
      { code: '[...]', text: 'Repeated sibling elements collapse into an array. One occurrence stays a scalar, because nothing in the document says it was a list.' },
      { code: 'null', text: 'An empty element becomes null, however it is written — <a/> and <a></a> are the same element, so they cannot give different JSON. So does one marked xsi:nil.' },
    ],
    paragraphsAfterBullets: [
      'The one thing no convention can fix is types. XML has none — every value is text — so they have to be guessed, and the guessing is where data gets quietly changed.',
    ],
    questions: [
      {
        q: 'Why did my postcode 02134 become the number 2134?',
        a: 'Because it looks numeric, and a number is the useful guess for the overwhelming majority of values. Identifiers, postcodes, phone numbers, and version strings are the exceptions, and they are exactly the fields where losing a leading zero matters. Check them before relying on the output.',
      },
      {
        q: 'Can I round-trip JSON through XML and back?',
        a: 'Not reliably, and the type guessing is why. A string `"10001"` goes out as `<zipCode>10001</zipCode>`, which has no way to say it was a string, so it comes back as a number. Structure survives the trip; types do not.',
      },
      {
        q: 'Where did my attributes go?',
        a: 'Nowhere — `id="7"` becomes the key `@id`. The prefix is what keeps it separate from a child element also called `id`, which is legal XML and would otherwise overwrite one with the other.',
      },
      {
        q: 'What about namespaces?',
        a: 'Prefixes are kept as part of the key, so `<ns:name>` becomes `ns:name`. Nothing is resolved against the declaration, because JSON has no way to express a namespace — the prefix is preserved as a name rather than interpreted.',
      },
    ],
  },
  'json-to-csv': {
    paragraphs: [
      'CSV is what spreadsheets and most analysis tools import, which makes this the conversion to reach for when an API response has to go to someone who works in Excel, Numbers, or Sheets. It is also the most lossy conversion on this site, because a tree does not fit in a grid without decisions being made for you.',
      'Those decisions: a nested object becomes dotted columns, so `address.zipCode` is a header rather than a structure. Records missing a field still line up under the right headers instead of shifting left. An array of plain values shares one cell, joined with `; `, because there is no column to spread it across. The union of every record\'s keys becomes the header row, so a field present in only one record still gets a column.',
      'Quoting follows RFC 4180 — any cell containing the delimiter, a quote, or a newline is wrapped, and an internal quote is doubled — with one addition aimed at spreadsheets rather than parsers.',
    ],
    questions: [
      {
        q: 'My JSON is a single object, not an array. Why the error?',
        a: 'CSV rows are records, so the input has to be an array of them. Wrap a lone object in brackets for a one-row file. If your payload is `{"items": [...]}`, convert the array itself rather than the wrapper.',
      },
      {
        q: 'Why is a cell starting with = or + quoted?',
        a: 'Because Excel, Sheets, and Numbers treat a leading `=`, `+`, `-`, or `@` as the start of a formula. Without the quotes, a value of `-5` becomes a calculation and `=SUM` becomes an error in the cell. This is not a CSV rule — it is the difference between a file that parses and a file that opens correctly.',
      },
      {
        q: 'What happens to a deeply nested array of objects?',
        a: 'It is flattened by index, with bracket notation: `projects[0].title`, `projects[1].title`, and so on. Honest, but it means a record with twenty items produces twenty sets of columns — usually the signal that CSV is the wrong target for that payload.',
      },
      {
        q: 'Can I convert the result back?',
        a: 'Structurally, no. Dotted headers do not rebuild into nested objects on the way back, and a cell holding `a; b` is a string rather than an array. Treat CSV as a hand-off format, not a storage one.',
      },
    ],
  },
  'csv-to-json': {
    paragraphs: [
      'Going the other way turns an export into an array of objects — the shape you want for feeding a CSV into an API, a database seeder, or a test fixture.',
      'The first row becomes the keys. Parsing follows the actual CSV conventions rather than splitting on the delimiter: a quoted field may contain the delimiter, `""` inside a quoted field is one escaped quote, and a field may span several lines. That last one is why splitting a CSV on newlines is a bug rather than a shortcut — a single address field with a line break in it silently becomes two broken records.',
      'Values are typed rather than left as strings, which is convenient for most fields and wrong for a few. The few are worth checking.',
    ],
    questions: [
      {
        q: 'Why did my ID 007 become 7?',
        a: 'Anything that looks numeric is typed as a number, and a number has no leading zeros. Identifiers, postcodes, phone numbers, and account codes are the fields where this loses real information — and quoting them in the CSV does not help, because quoting is about escaping, not type. Check them in the output before relying on it.',
      },
      {
        q: 'My file is semicolon separated. Can I still use this?',
        a: 'Yes — set the delimiter control above the editor to semicolon, tab, or pipe. Exports from spreadsheets in locales that use a comma as the decimal separator are usually semicolon separated, since a comma would be ambiguous.',
      },
      {
        q: 'What happens to an empty cell?',
        a: 'It becomes null, not an empty string. A blank in a CSV means "no value here" rather than "the empty string", and null is how JSON says the same thing.',
      },
      {
        q: 'Do duplicate headers work?',
        a: 'Not usefully — object keys are unique, so a repeated header means the last column wins and the earlier one is gone. Rename the columns before converting if both matter.',
      },
    ],
  },
  'json-to-toml': {
    paragraphs: [
      'TOML is what Cargo, `pyproject.toml`, and a growing number of tools read. Its design goal is being unambiguous where YAML is subtle: every type has one spelling, whitespace carries no meaning, and there are no traps of the `NO`-means-false kind. The cost of that clarity is a narrower type system than JSON\'s.',
      'Structure maps cleanly. A nested object becomes a `[table]` header, an array of objects becomes a sequence of `[[table]]` blocks, and scalars and arrays of scalars are written inline under whichever table they belong to. Key order is preserved, so converting the same JSON twice gives the same file and a diff means something.',
      'The one thing that cannot map is null. TOML has no such value — the way TOML says "absent" is to leave the key out — so a null-valued key is emitted as a comment recording what was dropped, rather than written as `""`. An empty string is a different value, and a config reader cannot tell the two apart.',
    ],
    questions: [
      {
        q: 'Why is a top-level array rejected?',
        a: 'A TOML document is itself a table — a set of key/value pairs — so a bare array has nowhere to live. Wrap it under a key first: `{"items": [...]}` converts to a run of `[[items]]` blocks.',
      },
      {
        q: 'What happened to my null?',
        a: 'It is commented out, with the key preserved: `# deletedAt = null  # omitted: TOML has no null`. Writing `deletedAt = ""` instead would compile and be wrong — the file would read back as an empty string, and anything checking whether the field was set would get the wrong answer.',
      },
      {
        q: 'And a null inside an array?',
        a: 'That one becomes `""`, because a list has no key to omit and dropping the element would change the length. It is the one lossy case, and it is visible in the output rather than silent.',
      },
      {
        q: 'Do I get comments?',
        a: 'Only the ones marking dropped nulls — there are none in the JSON to carry over. TOML supports `#` comments freely, so a generated file is a reasonable starting point for one you then document by hand.',
      },
    ],
  },
  'toml-to-json': {
    paragraphs: [
      'Two uses. One is inspection: TOML\'s section headers imply nesting that is not visible as indentation, so `[tool.poetry.dependencies]` looks flat and is three levels deep. Converting shows you the shape a tool actually receives. The other is scripting — pulling a version out of a `Cargo.toml` or a dependency list out of a `pyproject.toml` from something that only parses JSON.',
      'Tables, `[[array-of-tables]]`, dotted keys, inline tables, and arrays spread across several lines are all handled, including the nesting a dotted section header implies.',
    ],
    questions: [
      {
        q: 'What happens to a TOML date?',
        a: 'It stays a string. TOML has first-class offset datetime, local datetime, date, and time types; JSON has none of them. `1979-05-27T07:32:00Z` is preserved verbatim, which keeps the information intact and leaves the parsing to whatever reads the JSON.',
      },
      {
        q: 'How does a dotted key convert?',
        a: 'Into nesting. `owner.name = "Ada"` gives an `owner` object with `name` inside — the same result as an `[owner]` section with `name` under it, which is what TOML says those two spellings mean.',
      },
      {
        q: 'Why is `[tool.poetry]` two levels deep in the output?',
        a: 'Because a dot in a section header is nesting, not part of the name. `[tool.poetry]` is the `poetry` table inside the `tool` table, so the JSON has `tool` containing `poetry`. This is the single most common surprise when reading a `pyproject.toml` programmatically.',
      },
      {
        q: 'Are integers and floats distinguished?',
        a: 'They are in TOML, and JSON has only one number type, so `1` and `1.0` both become `1`. Nothing is lost numerically, but a field you deliberately wrote as a float is no longer marked as one.',
      },
    ],
  },
  'json-to-json-schema': {
    paragraphs: [
      'JSON Schema describes what a JSON document is allowed to look like — which keys exist, what type each holds, and which are required. Validators like Ajv check payloads against it, OpenAPI embeds it, and code generators consume it. Writing one by hand from a real payload is tedious, so this tool infers it: paste a sample, get a schema that sample already validates against.',
      'The inference walks every element of every array, not just the first record. A field missing from some records is left out of `required`, a value that is sometimes `null` widens to a type union, and whole numbers come out as `integer` while decimals come out as `number` — the distinctions a schema is actually for.',
    ],
    questions: [
      {
        q: 'Which draft does the output follow?',
        a: 'It declares draft 2020-12 in the `$schema` line. Only the structural keywords are emitted — `type`, `properties`, `required`, `items`, `anyOf` — and those have been stable since draft-04, so the schema works with older tooling too; delete the `$schema` line if your validator predates the declaration.',
      },
      {
        q: 'Why is a field missing from `required`?',
        a: 'Because it was absent from at least one record in the sample. A schema that required it would reject some of the very data it was inferred from, which is the failure mode of generators that only read the first array element.',
      },
      {
        q: 'Why does an always-null field accept any type?',
        a: 'A `null` sample carries no type information, so there is nothing to infer — the schema leaves that field open rather than pretending the type is known. Add one real value to the sample and the field gets a proper type.',
      },
      {
        q: 'Are string lengths and numeric ranges included?',
        a: 'No. Constraints the sample never exercises — `minLength`, `minimum`, `pattern`, `format` — are left open instead of guessed, because a guess would reject valid data. Tighten those by hand once the structure is in place.',
      },
    ],
  },
  'json-schema-to-json': {
    paragraphs: [
      'The reverse direction: given a JSON Schema, produce one document that validates against it. The use is fixtures and mocks — a concrete example for documentation, a payload to seed a test, or a quick check that a schema you wrote admits what you meant it to admit.',
      'Values are chosen deterministically. `const` wins, then the first `enum` entry, then `default`, then the first of `examples`; failing all of those, a placeholder follows the type — strings honour a recognised `format` like `date-time` or `email`, numbers take `minimum` if one is set, objects fill in every property, and arrays hold a single item.',
    ],
    questions: [
      {
        q: 'How are `$ref` pointers handled?',
        a: 'Local pointers like `#/definitions/Address` and `#/$defs/Address` are resolved against the document itself. Remote refs are not fetched — nothing leaves the browser — so a schema that depends on one reports it as an error instead of silently guessing.',
      },
      {
        q: 'What about `oneOf`, `anyOf`, and `allOf`?',
        a: '`oneOf` and `anyOf` take the first option, which is a valid choice by definition. `allOf` merges its branches when they all produce objects, the same way a validator intersects them.',
      },
      {
        q: 'Why does my `pattern` or `minLength` string not match?',
        a: 'Synthesising a string that satisfies an arbitrary regular expression is a problem of its own, and this tool does not attempt it — the sample uses plain placeholders. Treat the output as a structural skeleton and fill in constrained fields where the exact value matters.',
      },
      {
        q: 'What happens with a recursive schema?',
        a: 'The cycle is detected and the recursive branch comes out as `null` rather than looping forever. A linked-list schema, for example, produces a node whose `next` is null — one level of the structure, which is usually what a fixture needs.',
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
      'Hand-writing an interface for an API response is tedious and easy to get subtly wrong, particularly around fields that are only sometimes present. Pasting a real response gives you the interface it implies.',
      'Nested objects are hoisted into their own named interfaces rather than inlined, so you can refer to `Address` directly instead of repeating its shape, and structurally identical objects are emitted once and reused.',
      'TypeScript\'s mapping is the coarsest of the nine targets, which is worth knowing rather than a flaw: `number` covers every JSON number with no integer/float distinction and no 64-bit type, so an id past `Number.MAX_SAFE_INTEGER` needs `string` or `bigint` and a serialiser that agrees. A field with no observable type becomes `unknown` rather than `any`, which keeps the compiler asking about it instead of letting it spread silently through the call sites.',
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
      {
        q: 'Why `interface` rather than `type`?',
        a: 'For an object shape the two are near-interchangeable; interfaces are used here because declaration merging lets you extend one from your own code without editing the generated file, and their error messages name the interface rather than expanding the whole structure inline. Switch to `type` if you need a union or a mapped type, which a sample cannot tell you about.',
      },
      {
        q: 'Will this catch a response that changes shape?',
        a: 'No — and that is the trap. The interface describes what you observed once; nothing checks the next response against it. The compiler will be entirely confident about a field the API stopped sending. Use it for the shape and validate at the boundary if the payload is not yours.',
      },
      ...CODE_SHARED,
    ],
  },
  'json-to-java': {
    paragraphs: [
      'A Java POJO for a JSON payload is mostly boilerplate: a private field, a getter, and a setter per key. This generates all three, plus the Jackson `@JsonProperty` for keys that are not valid Java identifiers, with nested objects as their own classes and `java.util.List` imported only when an array actually appears.',
      'The boxing rules are the part worth reading, because Java is the one language here where the type system lets absence and zero become the same value:',
    ],
    bullets: [
      { code: 'long', text: 'A required integer. Primitive, because it is always present — and long rather than int so a large id does not overflow.' },
      { code: 'Long', text: 'An optional or nullable integer. The boxed type can hold null; a primitive would silently read a missing field as 0.' },
      { code: 'double', text: 'Fractional numbers, boxed to Double when optional. Use BigDecimal for money — double cannot represent 0.1 exactly.' },
      { code: 'boolean', text: 'Booleans, boxed to Boolean when optional. A missing flag defaulting to false is the classic version of this bug.' },
      { code: 'Object', text: 'A field that was null in every record. Jackson will hand you a Map or a List at runtime, so narrow it once you have a populated sample.' },
    ],
    questions: [
      {
        q: 'Why is my count a `Long` here but a `long` elsewhere?',
        a: 'Because a primitive cannot hold absence. Where the sample shows a field is optional or sometimes null, the boxed type is used so the missing case stays distinguishable — with `long` it would arrive as 0, and nothing downstream could tell that apart from a real zero.',
      },
      {
        q: 'Why full getters and setters instead of Lombok?',
        a: 'The output has to compile in a project that has never heard of Lombok, and `@Data` pasted into a codebase without the annotation processor fails in a way that is genuinely confusing to debug. Deleting thirty lines of accessors and adding one annotation takes a moment; the reverse does not.',
      },
      {
        q: 'Could these be records?',
        a: 'On Java 16 and up, yes, and Jackson supports them from 2.12 — a record is a better fit for a decoded response, being immutable with value equality. Classes are generated because they compile on Java 8, which is still what a great many projects target. Converting a POJO to a record is mechanical; going the other way to support an older JDK is not.',
      },
      {
        q: 'Does this need @JsonIgnoreProperties?',
        a: 'It does not use it, but you may want it. Jackson fails by default on a key the class does not declare, so the day the API adds a field, deserialisation throws. `@JsonIgnoreProperties(ignoreUnknown = true)` on the class is the usual fix, and the usual reason a generated POJO breaks weeks after it was generated.',
      },
      ...CODE_SHARED,
    ],
  },
  'json-to-go': {
    paragraphs: [
      'Every field in a Go struct needs a tag to map it to a JSON key, which makes hand-writing one for a large payload slow and easy to get subtly wrong. This produces the full set, with the field and tag columns aligned the way gofmt would align them, so it goes into a file without reformatting.',
      'Exported names follow the conventions the linters actually enforce — an `id` key becomes `ID`, not `Id`, and `url` becomes `URL` — because a field must be exported for `encoding/json` to see it at all.',
    ],
    bullets: [
      { code: 'int64', text: 'JSON integers. Explicitly sized rather than int, whose width depends on the platform.' },
      { code: 'float64', text: 'Fractional numbers. Also what encoding/json gives you for every number when decoding into an interface{}.' },
      { code: '*int64', text: 'An optional field, tagged omitempty — a pointer is the only way to distinguish absent from zero.' },
      { code: '[]string', text: 'Arrays. A nil slice and an empty one both marshal as [] with omitempty, and as null without it.' },
      { code: 'interface{}', text: 'A field with no observable type.' },
    ],
    questions: [
      {
        q: 'Why are some fields pointers?',
        a: 'Because `encoding/json` cannot otherwise tell a field that was absent from one that arrived as the zero value. A missing `count` and a `count` of 0 both leave an `int64` holding 0. The pointer plus `omitempty` is the standard workaround, and it is the reason a generated Go struct looks noisier than the equivalent in a language with an option type.',
      },
      {
        q: 'Why interface{} instead of any?',
        a: '`any` is a type alias for `interface{}` added in Go 1.18 — identical to the compiler, purely a spelling. The output uses the older form because it also compiles on earlier toolchains, and a struct definition is a bad place for a build to break over syntax.',
      },
      {
        q: 'Why is omitempty only on the pointer fields?',
        a: 'Because on a value field it is a footgun: `omitempty` on a plain `int64` drops a real 0 from the encoded output, and on a `string` it drops a real empty string. It means "omit when this is the zero value", which is only the same as "omit when absent" if the field is a pointer.',
      },
      {
        q: 'Will large integers survive a round trip?',
        a: 'In this struct, yes — `int64` holds anything JSON can express as an integer. The failure case is decoding into an `interface{}` or a `map[string]interface{}`, where every number becomes `float64` and integers above 2^53 lose precision silently. Using the generated struct is how you avoid that.',
      },
      ...CODE_SHARED,
    ],
  },
  'json-to-python': {
    paragraphs: [
      'A dataclass gives you attribute access, a readable `repr`, and equality without writing a constructor. This generates one per object in the sample with type hints throughout, snake_case field names, and a comment recording the original JSON key wherever the rename changes it.',
      'Python\'s hints are annotations rather than enforcement, which changes what the output is for — it is documentation your editor can check, not a guarantee about the data:',
    ],
    bullets: [
      { code: 'int', text: 'JSON integers. Python integers are arbitrary precision, so this is the one language here with no width to worry about.' },
      { code: 'float', text: 'Anything fractional. Note that a JSON integer will happily be assigned to a float-hinted field at runtime, because nothing checks.' },
      { code: 'Optional[str]', text: 'Optional or nullable, with a None default. Spelled this way rather than str | None so the output runs on Python 3.7 as well as 3.10.' },
      { code: 'List[str]', text: 'Arrays, from typing rather than the builtin generic, for the same compatibility reason.' },
      { code: 'Optional[Any]', text: 'A field with no observable type.' },
    ],
    questions: [
      {
        q: 'Why are the optional fields at the bottom?',
        a: 'Because Python raises `TypeError` at class-creation time — not at instantiation — if a field with a default comes before one without. Optional fields default to None, so they have to come last, and the generator reorders them so the class compiles exactly as written. It is the one place where the field order here deliberately differs from your JSON.',
      },
      {
        q: 'Why a dataclass and not a Pydantic model?',
        a: 'A dataclass is standard library, so this runs anywhere Python 3.7 does with nothing to install. Pydantic would add real validation — and a dependency, to a snippet you may only want for type hints. If you do want the validation, the field list transfers across unchanged: change the base class and the hints start being enforced.',
      },
      {
        q: 'Do the type hints actually do anything at runtime?',
        a: 'No. Nothing checks them, so `Root(id="not a number")` constructs happily and fails somewhere later. They exist for mypy, pyright, and your editor. This is the substantive difference between the Python output and the Rust or Kotlin output: those will not compile if the shape is wrong, this will run.',
      },
      {
        q: 'How do I build one of these from a dict?',
        a: '`Root(**payload)` works when the keys already match the field names, which after snake_casing they often will not — that is what the `# JSON key:` comments are marking. For a mismatched payload you need a mapping step, or a library like dacite or Pydantic that does the aliasing for you.',
      },
      ...CODE_SHARED,
    ],
  },
  'json-to-csharp': {
    paragraphs: [
      'C# is the one target here where the naming conventions of the language and of JSON are guaranteed to disagree: .NET properties are PascalCase, JSON keys almost never are. That makes the attribute, not the type, the interesting part of the output. This generates auto-properties with `System.Text.Json` attributes, nested objects as their own classes, and `System.Collections.Generic` imported only when a list actually appears.',
      'The type mapping itself:',
    ],
    bullets: [
      { code: 'long', text: 'JSON integers, so an id past two billion does not overflow. Narrow it to int where you know the range.' },
      { code: 'double', text: 'Fractional numbers. For money use decimal — double cannot represent 0.1 exactly, and .NET has a type that can.' },
      { code: 'long?', text: 'Optional or nullable numbers and bools. A nullable value type is how C# distinguishes absent from zero; without it a missing count silently reads as 0.' },
      { code: 'string', text: 'Reference types are left as-is. Under a project with nullable reference types enabled, expect warnings on the properties that can be absent.' },
      { code: 'object', text: 'A field that was null in every record. JsonElement is often the better replacement if you need to inspect it without deserialising again.' },
    ],
    questions: [
      {
        q: 'Why does every property have a JsonPropertyName?',
        a: 'Because the attribute makes the class work regardless of how the deserialiser is configured. A global `PropertyNamingPolicy` covers the common cases, but it is set once somewhere far from this class, and it cannot handle a key that is not simply a case variant. An explicit name is correct in every configuration.',
      },
      {
        q: 'Why System.Text.Json and not Newtonsoft?',
        a: 'It ships in the framework from .NET Core 3.0 on, so the attributes resolve with no package reference and no version conflict. Newtonsoft is still everywhere in older projects — porting is `JsonPropertyName` to `JsonProperty` plus a different using, and Newtonsoft is more forgiving about type mismatches if you need that.',
      },
      {
        q: 'Should these be records instead?',
        a: 'Often, yes — a `record` from C# 9 gives you value equality and a `with` expression, and a positional record deserialises through its primary constructor. The classes here are generated because they compile on every target from .NET Standard 2.0 forward, and converting one to a record is a mechanical edit; converting a record back to work on an older framework is not.',
      },
      {
        q: 'Why get and set rather than init or readonly?',
        a: '`init` requires C# 9, and a private setter stops System.Text.Json from populating the property at all unless you add a constructor it can match. Settable properties are what deserialises everywhere with no extra ceremony — tighten them once you know your target framework.',
      },
      ...CODE_SHARED,
    ],
  },
  'json-to-rust': {
    paragraphs: [
      'Serde does the deserialising; what it needs from you is a struct that matches the payload, with the right derives and the right renames. This generates that — `Debug`, `Clone`, `Serialize`, and `Deserialize` on every struct, snake_case fields, nested objects hoisted out, and an explicit `#[serde(rename)]` on any key that snake_casing would not round-trip.',
      'Rust is the strictest target here, and the mapping reflects that:',
    ],
    bullets: [
      { code: 'i64', text: 'JSON integers. Signed by default because JSON does not distinguish, and 64-bit because an id from an API frequently is.' },
      { code: 'f64', text: 'Anything fractional. Note that i64 and f64 are different types with no implicit conversion, so a field that arrives as 1 in one record and 1.5 in the next needs f64 or deserialisation fails.' },
      { code: 'Option<T>', text: 'Optional or nullable. Rust has no null at all, so the absent case has to be handled at the point of use — the compiler will not let you forget.' },
      { code: 'Vec<T>', text: 'Arrays, with T inferred from every element rather than the first.' },
      { code: 'Value', text: 'From serde_json, for a field with no observable type. It accepts whatever arrives and defers the decision.' },
    ],
    paragraphsAfterBullets: [
      'Unlike most targets, a mismatch here is a hard failure rather than a silent one. Serde returns an error on a type that does not fit, which is what makes the generated struct worth getting right up front.',
    ],
    questions: [
      {
        q: 'Why is a field wrapped in Option?',
        a: 'Because Rust has no null, so a field that is missing from some records or arrives as null has no other representation. `Option<T>` moves the absent case into the type, where the compiler makes you deal with it, rather than into a runtime surprise.',
      },
      {
        q: 'Why serde_json::Value for some fields?',
        a: 'A field that was null in every record carries no type information whatsoever, and Rust will not let you leave a type unspecified. `Value` accepts anything; swap it for the concrete type once you have a sample where the field is populated.',
      },
      {
        q: 'Should I add #[serde(deny_unknown_fields)]?',
        a: 'Only if you want new API fields to break your build. It is genuinely useful for a config file you own — a typo becomes an error rather than a default — and usually wrong for a third-party response, where the provider adding a field should not take your service down.',
      },
      {
        q: 'What about lifetimes and &str instead of String?',
        a: 'Borrowed fields (`&\'a str`) avoid an allocation per string, and serde supports them — but only when the deserialised value cannot outlive the input buffer, which for most code means it does not work where you want to use it. `String` owns its data and compiles wherever you put it.',
      },
      ...CODE_SHARED,
    ],
  },
  'json-to-kotlin': {
    paragraphs: [
      'A Kotlin data class gives you `equals`, `hashCode`, `copy`, and destructuring from the declaration alone, which is most of what a DTO needs. This generates one per object in the sample with kotlinx.serialization annotations, `val` throughout, and nested objects hoisted into classes of their own.',
      'Kotlin\'s type system is the reason its output differs from the other JVM target here. Nullability is part of the type rather than a convention, so JSON\'s optionality maps onto it exactly:',
    ],
    bullets: [
      { code: 'Long', text: 'Every JSON integer, not Int. JSON has no width limit, and a 64-bit id from an API is common enough that narrowing by default would be the wrong bet.' },
      { code: 'Double', text: 'Any number with a fractional part. Kotlin has no decimal type, so a monetary value needs BigDecimal and a custom serializer.' },
      { code: 'String?', text: 'A nullable or sometimes-absent field. The question mark is enforced by the compiler, so the absent case cannot be forgotten the way it can in Java.' },
      { code: '= null', text: 'Optional properties also get a default, which is what lets kotlinx.serialization accept a payload where the key is missing entirely rather than present and null.' },
      { code: 'Any?', text: 'A field that was null in every record. Nothing narrower would be honest — replace it once you have a sample where the field is populated.' },
    ],
    questions: [
      {
        q: 'When is a SerialName annotation added?',
        a: 'Only when the JSON key differs from the property name after camelCasing — `first_name` becoming `firstName` needs one, `title` does not. Annotating everything would triple the length of a simple model for no gain.',
      },
      {
        q: 'Why kotlinx.serialization and not Moshi or Gson?',
        a: 'It is the JetBrains-maintained option and the only one that understands Kotlin nullability and default values without reflection. That matters specifically here: Gson constructs objects through Unsafe, so it will happily leave a non-null `String` holding null and the failure surfaces somewhere else entirely. Switching to Moshi means changing annotations, not the class.',
      },
      {
        q: 'Why is `List<Any>` a problem under @Serializable?',
        a: 'Because kotlinx.serialization needs a serializer for every type at compile time and `Any` has none. A heterogeneous or always-empty array produces one, and it will not compile until you either give the element a real type or register a contextual serializer. The generator emits it rather than guessing, so the gap is visible instead of silent.',
      },
      {
        q: 'Could these be value classes or a sealed hierarchy?',
        a: 'Not from a sample. A `value class` needs to know an id is semantically distinct from any other Long, and a sealed hierarchy needs to know which field discriminates the variants. Neither fact is in the JSON — they are decisions about your domain, and the data class is the honest starting point for both.',
      },
      ...CODE_SHARED,
    ],
  },
  'json-to-dart': {
    paragraphs: [
      'Dart has no runtime reflection in the mode Flutter compiles to, so there is no library that can populate a model from a map without either code generation or hand-written methods. That makes this the most verbose output of the nine targets by a wide margin: every class needs a `fromJson` factory and a `toJson` method as well as its fields.',
      'All of it is generated. Every nested object gets its own class with its own pair of methods, so decoding leaves you holding typed models rather than a `Map<String, dynamic>` you keep casting at the point of use.',
    ],
    bullets: [
      { code: 'int', text: 'JSON integers. On the web, Dart ints are JavaScript doubles, so values above 2^53 lose precision there but not on mobile.' },
      { code: 'double', text: 'Fractional numbers — and the one real trap, because a JSON 1 decodes as int and will not cast to double.' },
      { code: 'int?', text: 'Optional or nullable, with the constructor parameter left off required so it defaults to null.' },
      { code: 'final', text: 'Every field, with a const constructor. Flutter rebuilds constantly; immutable models are what make that cheap.' },
      { code: 'dynamic', text: 'A field with no observable type — the one place the casts are not checked.' },
    ],
    questions: [
      {
        q: 'Why does my double field throw at runtime?',
        a: 'Because a JSON number written `1` rather than `1.0` decodes to `int`, and `json[\'x\'] as double` on an int throws. It is the single most common failure with hand-written Dart models, and it only shows up when a value happens to arrive whole. If a field can be either, `(json[\'x\'] as num).toDouble()` is the fix.',
      },
      {
        q: 'Are the fields immutable?',
        a: 'Yes — `final` fields, a const constructor, and named parameters marked required where the field is not nullable. That is the conventional shape for a Flutter model, and it lets the widget tree treat instances as values, so an equality check does not force a rebuild.',
      },
      {
        q: 'Why hand-written fromJson instead of json_serializable?',
        a: 'Generated code needs `build_runner` in the project and a `part` file beside the class, neither of which exists when you are pasting a model into a scratch file to see if it works. These methods are complete as written — no build step, no annotations, nothing to regenerate when you change a field.',
      },
      {
        q: 'Is there equality or copyWith?',
        a: 'No. Both are worth adding for a model you keep — Dart has no data classes, so `==` compares identity until you write it, which means two identical responses are unequal and a `setState` fires when nothing changed. It is left out because it is more generated code than the model itself, and packages like freezed do it better.',
      },
      ...CODE_SHARED,
    ],
  },
  'json-to-swift': {
    paragraphs: [
      'Conformance to `Codable` is the whole of JSON decoding in Swift — no annotations, no library, and no generated decoder, provided the property names line up with the keys. This produces the structs, `let` properties throughout, and a `CodingKeys` enum for the cases where the names do not line up.',
      'Swift\'s mapping is the tightest of the nine targets, because the language has an optional type and a synthesised initialiser and needs neither a builder nor an annotation to use them:',
    ],
    bullets: [
      { code: 'Int', text: 'JSON integers, not Int64. Int is 64-bit on every platform Swift ships on, and the shorter spelling is what Swift code actually uses.' },
      { code: 'Double', text: 'Anything with a fractional part. Codable will happily decode a JSON integer into a Double, so a field that is sometimes 1 and sometimes 1.5 is safe.' },
      { code: 'String?', text: 'Optional or nullable. Codable treats an absent key and an explicit null identically for an optional property, which is either exactly what you want or a distinction you will need to make by hand.' },
      { code: 'AnyCodable?', text: 'A field with no observable type. Not a standard library type — see below.' },
      { code: 'let', text: 'Every property. A decoded response is a value, and the memberwise initialiser comes free.' },
    ],
    questions: [
      {
        q: 'AnyCodable is not in the standard library. What do I do with it?',
        a: 'Right — it is a placeholder for a field that was null or empty in every record, and there is nothing in Foundation that means "any JSON value". Either replace it with the concrete type once you have a populated sample, or add one of the small AnyCodable implementations from the community. It is left in deliberately: emitting `String?` would be a guess presented as a fact.',
      },
      {
        q: 'Why do only some structs have a CodingKeys enum?',
        a: 'It appears only when at least one key differs from its property name. Where they match, Codable synthesises the mapping and the enum is dead weight — and the enum is all-or-nothing, so one mismatched key means listing every case.',
      },
      {
        q: 'Why a struct rather than a class?',
        a: 'A decoded response is a value: two responses with the same fields are the same response, and nothing should be mutating one through a second reference. Structs give you that, plus the memberwise initialiser. Reach for a class only when you genuinely need identity or inheritance.',
      },
      {
        q: 'Will this handle a snake_case API without CodingKeys?',
        a: 'It will, and then you do not need the enum at all: set `decoder.keyDecodingStrategy = .convertFromSnakeCase` and Codable does the renaming. Worth knowing before pasting a CodingKeys block with thirty cases in it — though the enum is more explicit, and it survives a key that the strategy converts wrongly.',
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

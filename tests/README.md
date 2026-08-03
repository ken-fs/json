# Tests

There is no test runner in this project, so these are plain scripts that print
`ALL PASS` and exit non-zero on failure.

```bash
pnpm test          # generators + format converters
pnpm test:pages    # browser pass over the built pages (see below)
```

## `generators.test.ts`

Feeds one deliberately nasty payload — optional field, mixed number types,
null, heterogeneous records, illegal identifiers, reserved words, repeated
nested shapes, empty array, plural key — through all nine language generators,
then runs a set of edge cases (root array, root scalar, deep nesting, weird
keys).

Output is printed rather than asserted against golden files, because the point
is to read the generated code and see that it would compile. The edge cases do
assert.

## `formats.test.ts`

Round-trips JSON through YAML, XML, CSV, and TOML. Covers the cases where a
naive converter loses data: strings that would re-parse as another type
(`"yes"`, `"1.0"`), embedded colons, hashes, quotes and newlines, empty
collections, and deep nesting. Also checks that bad input throws instead of
returning something plausible.

## `pages.verify.py`

Drives the real pages in Chromium. Requires the static export to be built and
served:

```bash
pnpm build
cd out && python3 -m http.server 4321
python3 tests/pages.verify.py
```

Checks that every tool page converts correctly, has the right `<h1>`, surfaces
an error state for invalid input, that the Example button works, that `/tools`
links to every route, that there are no console errors, and that nothing
overflows a 390px viewport.

It also guards the root-array regression: a top-level JSON array used to emit a
self-referential alias (`export type Root = Root[]`) that would not compile.
Third-party analytics requests are blocked, so a `net::ERR_FAILED` console
error from that blocking is expected and filtered out.

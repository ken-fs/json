# JSON1

Free, private JSON tools that run entirely in your browser — **[www.json.how](https://www.json.how)**

JSON1 is 18 tools for reading, checking, and converting JSON: a formatter/validator, eight format converters, and nine type generators. Everything runs in JavaScript on your machine. There is no server to upload to, no account, and no data store — you can paste a production payload, then switch to airplane mode and keep working.

## What's inside

- **Formatter & validator** — beautify, minify, and validate JSON with error positions, in a collapsible tree view.
- **Format converters (8)** — JSON ⇄ YAML, JSON ⇄ XML, JSON ⇄ TOML, JSON ⇄ CSV. The YAML converter quotes every scalar a YAML 1.1 loader would otherwise mistype (the Norway problem, sexagesimals, bare dates), checked against a real loader rather than its own reader.
- **Type generators (9)** — JSON → TypeScript, Java, Go, Python, C#, Rust, Kotlin, Dart, Swift. Every generator reads *all* records in an array, not just the first, so a field present in only some of them comes out optional instead of silently wrong.
- **Knowledge base** — 10 in-depth guides (syntax, escaping, JSON Schema, REST API design, parsing performance, type generation) in English, 简体中文, Español, and Português. Each language is written, not machine-translated.
- **Privacy pages** — [Privacy](https://www.json.how/privacy/), [Terms](https://www.json.how/terms/), and [Contact](https://www.json.how/contact/).

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**, exported as static files.
- **Tailwind CSS 4** for styling, **@heroicons/react** for icons.
- **Zustand** for language/theme state, persisted to `localStorage`.
- **i18next / react-i18next** for the four-language interface.
- **pnpm** as the package manager.

## Development

```bash
pnpm install
pnpm dev        # dev server (Turbopack) at http://localhost:3000
pnpm build      # static export to out/
pnpm lint       # ESLint
```

### Tests

```bash
pnpm test       # generator + format converter correctness
pnpm test:wiki  # wiki content checks
pnpm test:pages # rendered-page verification (Python)
pnpm test:seo   # SEO/metadata verification (Python)
```

The generator and converter claims shown under each tool are checked against real output rather than proofread — that practice has caught real bugs.

## Deployment

Deployed on Cloudflare Workers (static assets from `out/`). Pushing to `main` triggers a production build to `www.json.how` (the apex `json.how` redirects to `www`). The legacy `json1.org` domain 308-redirects here until it expires; its redirect lives on the old Vercel project.

## Privacy

Nothing you paste into a tool leaves the browser. The site loads three third-party scripts — Google AdSense, Google Analytics, and Microsoft Clarity — none of which receives editor contents; the full breakdown is on the [About](https://www.json.how/about/) and [Privacy](https://www.json.how/privacy/) pages. An ad blocker removes all three and every tool still works.

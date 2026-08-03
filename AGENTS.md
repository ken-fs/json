# Repository Guidelines

This is a Next.js 15 + React 19 TypeScript app for JSON tools (format, validate, convert). Prefer pnpm and keep changes small and well‑scoped.

Design rules live in [Design Rules](#design-rules--项目设计规则) and take precedence over anything in `CLAUDE.md` that contradicts them.

## Project Structure & Module Organization
- `src/app` — App Router pages and layouts (e.g., `src/app/page.tsx`, `sitemap.ts`).
- `src/components` — UI components (e.g., `JSONEditor.tsx`, `JSONFormatter.tsx`).
- `src/lib` — Utilities (e.g., `utils.ts` with `formatJSON`, `minifyJSON`, `jsonToXML`).
- `src/locales` — i18n JSON files (`en.json`, `zh.json`, `pt.json`, `es.json`).
- `src/stores` — Zustand stores (e.g., `uiStore.ts`).
- `tests` — Converter/generator suites plus a Playwright pass over the static export.
- `public` — Static assets. Config: `next.config.ts`, `eslint.config.mjs`, `tsconfig.json`.

## Build, Test, and Development Commands
- `pnpm install` — Install dependencies.
- `pnpm dev` — Start dev server at `http://localhost:3000` (Turbopack).
- `pnpm build` — Production build.
- `pnpm start` — Run production server.
- `pnpm lint` — ESLint (Next core‑web‑vitals + TypeScript rules).
- `pnpm og` — Regenerate every brand asset: 19 social cards, `logo.png`, both PWA
  icons, `src/app/favicon.ico`, and `src/app/icon.svg`. Rendered from the real
  `TOOLS` catalogue, so a new tool cannot ship with a page but no card. Run it
  after touching the catalogue, the card copy, or the design tokens.
- `pnpm llms` — Regenerate `public/llms.txt` from the same catalogue.

### Generated assets — do not hand‑edit
`public/og*`, `public/logo.png`, `public/icon-{192,512}.png`, `public/llms.txt`,
`src/app/favicon.ico`, and `src/app/icon.svg` are all outputs. Edit the generator
in `scripts/` and re‑run, or the next run silently reverts the change. They are
committed because a static export has nothing to build them at request time.

## Coding Style & Naming Conventions
- Language: TypeScript (strict). Path alias: `@/*` → `src/*`.
- Indentation 2 spaces; single quotes; prefer const/immutable patterns.
- Components: PascalCase files (e.g., `Header.tsx`). Utils/hooks: camelCase (e.g., `useLanguageStore`).
- Tailwind CSS 4 utility‑first classes; keep class lists readable and consistent.
- Run `pnpm lint` before pushing; fix warnings where reasonable.
- Icon‑only controls go through `ui/IconButton.tsx`. Never ship a bare icon with only
  a native `title` — it needs ~1s of holding still, styles itself as the OS, and does
  not exist for keyboard users. `label` is the action and the accessible name; `hint`
  is optional and should say something `label` does not, so skip it rather than
  restate the label.

## Testing Guidelines
- `pnpm test` — converter and generator suites (`tests/*.test.ts`, run with `tsx`). No framework; each file asserts and prints.
- `pnpm test:wiki` — Re-derives every code sample in `src/lib/wiki/*` from the real
  converters and checks the article metadata against the `test:seo` limits. Needs no
  server or build, and unlike the other suites it exits non‑zero, so it is the cheap
  gate to run first. A doc page that no longer matches the code is a bug.
- `pnpm test:pages` — Playwright pass over the static export. Needs a build first:
  `pnpm build && (cd out && python3 -m http.server 4321)`. Covers tool‑page content,
  i18n, mobile overflow, and the toolbar tooltips (hover, keyboard focus, viewport
  clamping, and that a touch tap does not leave one stuck on screen). Contexts must
  pin `locale="en-US"` — labels are translated and the detector reads the locale.
- `pnpm test:seo` — Asserts the SEO invariants against the same server: canonical
  correctness and uniqueness, title/description limits, hreflang only on the wiki's
  per‑locale routes, JSON‑LD validity, and that every referenced asset resolves.
  Routes come from `sitemap.xml`, so a new page is covered automatically. Run it
  after changing metadata, adding a page, or editing a `href`.
- Ensure JSON operations handle invalid input, and that i18n keys exist in all four locales — parity is checked by counting flattened keys per file.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, etc. (history shows `feat:` in use).
- PRs should include: clear description, linked issues, screenshots for UI changes, i18n updates when copy changes.
- CI checklist: `pnpm lint` passes; app runs locally; no large, unrelated changes.

## Security & Configuration Tips
- Do not commit secrets. Use `.env.local` for local variables (Next.js auto‑loads).
- Avoid heavy dependencies; keep bundle size modest; prefer code‑splitting and icon tree‑shaking.

---

# Design Rules / 项目设计规则

## 角色设定 / Role

You are a senior independent designer working in a deliberately anti‑mainstream
web aesthetic. Generic SaaS templates are not acceptable output here; every
pixel should be a decision you can defend.

## ❌ 绝对禁止项 / Never

**配色 / Colour**
- Purple, indigo, and violet‑blue gradients — `#6366F1`, `#8B5CF6` and neighbours.
- Flat dead backgrounds. A large surface needs noise texture or a gradient.
- Tailwind's default palette (`gray-*`, `blue-*`, `slate-*`, …) in new work. Use the hex tokens below.

**布局 / Layout**
- Hero + three cards.
- Everything centred.
- Equal‑width columns. Split the space asymmetrically.

**文案 / Copy**
- Jargon and empty claims.
- Lorem ipsum. Write the real thing, even as a placeholder.
- Passive voice and long sentences.

**组件 / Components**
- Stock shadcn/Material components. Customise deeply or build it.
- Emoji standing in for a functional icon.
- `ease-in-out` on everything. Pick a curve per interaction.

## ✅ 必须遵守项 / Always

**文案风格 / Copy voice**
- Conversational, like explaining to a colleague.
- Concrete: real numbers, real scenarios.
- Humour, self‑deprecation, even a little provocation are fine.
- Chinese copy: aim for ≤15 characters per sentence. Break long ones up.

Copy still has to be *true*: the tool descriptions and intros in `src/lib/tools.ts`
and `src/lib/intros.ts` make specific claims about generator output. Check the
claim against what the code actually emits before shipping it — three real bugs
were found this way.

**图片系统 / Image sources**
- Icons: [Iconify](https://iconify.design) for new work. `@heroicons/react` is already
  in 34 files — match the local file rather than mixing sets in one component.
- Placeholders: [Picsum Photos](https://picsum.photos)
- Real photography: [Pexels](https://www.pexels.com)
- Illustration: [unDraw](https://undraw.co)

## Design tokens (as built)

Defined in `src/app/globals.css`; the redesigned surfaces use the hex values directly.

| Token | Value | Use |
| --- | --- | --- |
| surface | `#f7f7f4` | Warm page background |
| ink | `#141414` | Body text |
| cobalt | `#1261ff` | Primary accent, focus rings, inline code |
| lime | `#95ee1c` | Secondary accent, used sparingly |
| borders | `#dedede` `#d9d9d5` `#e4e4df` | Hairlines, in descending contrast |

Type is Geist + Geist Mono. Radius stays low — `rounded` / `rounded-lg`, never pill
shapes on containers.

## Current state / 现状

Enforce these rules on new and edited code. Two areas do not comply yet, and
neither should be rewritten in passing:

- **The six original wiki articles** (`json-guide`, `json-api-best-practices`,
  `json-validation`, `json-performance`, `json-to-typescript`, `json-to-java`, and
  the four locale index pages) — entirely Tailwind default palette, up to 123
  utility hits in a single file. A full port is its own task. The SEO pass touched
  only their metadata and JSON‑LD (each page hoists a `META: WikiMetaInput`
  literal and feeds it to both `wikiMetadata()` and `<WikiJsonLd>`, so the two
  cannot disagree) — deliberately not their styling.
- **`src/components/ui/button.tsx`, `ui/select.tsx`, `JSONEditor.tsx`,
  `ToolSelector.tsx`** — still on default palette. `JSONFormatter.tsx` and
  `Header.tsx` are mid‑migration and carry both.

The redesigned surfaces to copy patterns from: `app/page.tsx`, `app/tools/page.tsx`,
`AppSidebar.tsx`, `ConverterWorkspace.tsx`, `ToolIntro.tsx`, `ToolPage.tsx`,
`WikiArticle.tsx`.

## Adding a wiki article / 新增 wiki 文章

New articles are data, not hand-written TSX. `WikiArticle.tsx` owns the layout and
is already on the design tokens, so four locales share one set of classes:

1. Write `src/lib/wiki/<slug>.ts` exporting `SLUG`, `REVISED`,
   `META: Record<WikiLocale, WikiMetaInput>`, `CONTENT: Record<WikiLocale,
   WikiArticleContent>`, and a `SAMPLES` object holding every code sample.
2. Add 4 route files under `src/app/wiki/{en,cn,es,pt}/<slug>/page.tsx` — seven
   lines each: `wikiMetadata(META.<locale>)` plus `<WikiArticle>`.
3. Register the slug in `WIKI_ARTICLES` (`src/lib/wikiMeta.ts`). Sitemap coverage
   and `test:seo` follow from that list, so skipping this ships four orphan pages.
4. Add the article to all four locale index pages, or nothing links to it.
5. Extend `tests/wiki.test.ts` so every sample is re-derived from the real
   converter. This is not optional: the article claims things about what this
   site's buttons output, and `pnpm test:wiki` is what keeps those claims true.
   It also checks the title/description limits, so a too-long title fails in
   seconds instead of after a build.

All four locales must ship together and carry the same section ids — `wikiMetadata()`
emits hreflang for all four unconditionally, so a partial set points hreflang at
404s and fails `test:seo`. Inline markup in the copy is `` `code` `` and
`**strong**` only, rendered by `withInlineCode`; anything else appears literally.

Two rules the redesign does not currently satisfy, so treat them as direction
rather than as a description of what exists: the `#f7f7f4` surface is flat with no noise
layer, and the editor panes in `ConverterWorkspace.tsx` are a symmetric
`lg:grid-cols-2`. Both are deliberate for a two‑pane diff‑style tool where input
and output deserve equal room — if you change them, change them on purpose.

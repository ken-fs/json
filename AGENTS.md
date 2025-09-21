# Repository Guidelines

This is a Next.js 15 + React 19 TypeScript app for JSON tools (format, validate, convert). Prefer pnpm and keep changes small and well‑scoped.

## Project Structure & Module Organization
- `src/app` — App Router pages and layouts (e.g., `src/app/page.tsx`, `sitemap.ts`).
- `src/components` — UI components (e.g., `JSONEditor.tsx`, `JSONFormatter.tsx`).
- `src/lib` — Utilities (e.g., `utils.ts` with `formatJSON`, `minifyJSON`, `jsonToXML`).
- `src/locales` — i18n JSON files (`en.json`, `zh.json`, `pt.json`, `es.json`).
- `src/stores` — Zustand stores (e.g., `uiStore.ts`).
- `public` — Static assets. Config: `next.config.ts`, `eslint.config.mjs`, `tsconfig.json`.

## Build, Test, and Development Commands
- `pnpm install` — Install dependencies.
- `pnpm dev` — Start dev server at `http://localhost:3000` (Turbopack).
- `pnpm build` — Production build.
- `pnpm start` — Run production server.
- `pnpm lint` — ESLint (Next core‑web‑vitals + TypeScript rules).

## Coding Style & Naming Conventions
- Language: TypeScript (strict). Path alias: `@/*` → `src/*`.
- Indentation 2 spaces; single quotes; prefer const/immutable patterns.
- Components: PascalCase files (e.g., `Header.tsx`). Utils/hooks: camelCase (e.g., `useLanguageStore`).
- Tailwind CSS 4 utility‑first classes; keep class lists readable and consistent.
- Run `pnpm lint` before pushing; fix warnings where reasonable.

## Testing Guidelines
- No unit test runner is configured. Validate user flows using `test-functionality.md` and the app UI.
- If adding tests, prefer Vitest + React Testing Library; name files `*.test.ts(x)` colocated with sources.
- Ensure JSON operations handle invalid input and i18n keys exist for all locales.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, etc. (history shows `feat:` in use).
- PRs should include: clear description, linked issues, screenshots for UI changes, i18n updates when copy changes.
- CI checklist: `pnpm lint` passes; app runs locally; no large, unrelated changes.

## Security & Configuration Tips
- Do not commit secrets. Use `.env.local` for local variables (Next.js auto‑loads).
- Avoid heavy dependencies; keep bundle size modest; prefer code‑splitting and icon tree‑shaking.

# AGENTS.md

This file provides guidance to AI coding agents (grok, claude, etc.) when working with code in this repository.

## Overview

Personal website for [palmer.earth](https://palmer.earth) — a single-page Next.js 16 site built with the **App Router** (`src/app`), TypeScript, React Server Components, and styled-components. The visible content is essentially one page (`src/app/page.tsx`).

## Commands

Package manager is **pnpm** (`pnpm@9.9.0`, pinned via `packageManager` in `package.json`). Do not use `npm`/`yarn`, and do not use corepack.

- `pnpm install` — install dependencies (`--frozen-lockfile` in CI)
- `pnpm dev` — run dev server at http://localhost:3000
- `pnpm build` — production build (runs `next-sitemap` automatically via `postbuild` to regenerate `public/sitemap*.xml` and `robots.txt`)
- `pnpm start` — serve the production build
- `pnpm lint` — ESLint (`eslint src`)
- `pnpm tsc --noEmit` — typecheck (the exact check CI runs)

There is **no test framework or test suite** in this repo; CI only runs lint + typecheck (`.github/workflows/main.yml`, triggered on every push).

## Pre-commit / formatting

- Husky runs `lint-staged` on pre-commit, which runs `eslint --fix` then `prettier --write` on staged `*.{js,jsx,ts,tsx}` files (`.lintstagedrc.js`).
- Prettier config (`.prettierrc.js`): 4-space tabs, semicolons, 150-char print width. Match this style in edits.

## Agent workflow

- use todo lists for tasks with 3+ steps
- enter plan mode before high-impact or ambiguous changes
- always run `pnpm lint` + `pnpm tsc --noEmit` before finishing
- follow the styling architecture strictly (single source of truth in theme)

## Architecture

**Styling is the core of this codebase** and follows a deliberate layered pattern:

- `src/config/theme.ts` defines the single source of truth `theme` object (colors, typography, breakpoints, transitions, layout, effects, form tokens) plus Google fonts (`Oswald` for headings, `Noto_Sans` for body, `IBM_Plex_Mono` for mono) loaded via `next/font/google`.
- `styled.d.ts` augments styled-components' `DefaultTheme` by deriving the interface from `typeof theme` exported by `theme.ts`. **When you add a field to `theme.ts`, the types update automatically — you no longer edit `styled.d.ts` by hand.**
- `src/config/fonts.ts` loads the Google fonts and exposes CSS variables; `theme.ts` references those variables and remains safe to consume from Client Components.
- `src/components/globalstyles.tsx` (`createGlobalStyle`) applies base/reset styles and theme-driven defaults.
- `src/components/mainstyles.tsx` exports layout primitives (`Shell`, `Nav`, `Main`, `H1`, `H2`, `RedBlock`, `Section`, `ProductList`/`ProductItem`, `PostList`/`PostItem`, `StatusBadge`, `P`, `Footer`, …). Shared list-row chrome (cyberpunk corner brackets) lives in one `listRowChrome` helper used by product and post rows. Media queries and layout values are driven from `theme.breakpoints` / `theme.layout`. `src/app/page.tsx` composes these as a Server Component.
- Nest display is snapshot-only (`src/data/nest-stats.json`); daily GHA on main (`.github/workflows/nest-stats.yml`) runs `pnpm nest:refresh` and commits the file so host deploy-on-push rebuilds production. Nest helpers: `src/lib/nest.ts`. Paragraph posts/subscribe (+ optional views via API key): `src/lib/paragraph.ts`.
- All styled-component template literals read from the theme via `${({ theme }) => theme...}` rather than hardcoded values — preserve this when editing styles.

**Extending the theme**

When adding tokens:

- Prefer semantic names under `breakpoints`, `transitions`, `layout`, or `typography`.
- Layout tokens (max-widths, headline widths, footer heights) belong in `theme.layout`.
- Repeated timing/easing strings belong in `theme.transitions`.
- Update consumers in `mainstyles.tsx` (or other styled files) to interpolate the new value.
- Artistic/one-off values (e.g., a specific pseudo-element `height: 83%`) can stay local to the component.

**Server-side rendering of styles:** `src/components/StyledComponentsRegistry.tsx` uses `ServerStyleSheet` plus `useServerInsertedHTML` to collect and stream styles during App Router SSR. `src/components/Providers.tsx` supplies `ThemeProvider` and global styles from the root layout. The `styledComponents: true` SWC compiler option is enabled in `next.config.js`; keep the registry and compiler flag consistent.

**SEO/metadata:** `src/config/seo.ts` centralizes `siteMetadata`, `socialLinks`, and JSON-LD structured data. `src/app/layout.tsx` exports Next metadata/viewport objects, while the homepage renders JSON-LD. Site-level sitemap/robots config lives in `next-sitemap.config.js`.

## Conventions

- Import alias: `@/*` maps to `./src/*` (see `tsconfig.json`). Use it instead of long relative paths.
- TypeScript is `strict: false` and targets `es5`; don't assume strict-mode guarantees.

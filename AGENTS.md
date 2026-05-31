# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview

Personal website for [palmer.earth](https://palmer.earth) — a single-page Next.js 15 site built with the **Pages Router** (`src/pages`, not the App Router), TypeScript, and styled-components. The visible content is essentially one page (`src/pages/index.tsx`).

## Commands

Package manager is **pnpm** (`pnpm@9.9.0`, pinned via `packageManager` in `package.json`). Do not use `npm`/`yarn`, and do not use corepack.

- `pnpm install` — install dependencies (`--frozen-lockfile` in CI)
- `pnpm dev` — run dev server at http://localhost:3000
- `pnpm build` — production build (runs `next-sitemap` automatically via `postbuild` to regenerate `public/sitemap*.xml` and `robots.txt`)
- `pnpm start` — serve the production build
- `pnpm lint` — ESLint (scoped to `src` via `next.config.js`)
- `pnpm tsc --noEmit` — typecheck (the exact check CI runs)

There is **no test framework or test suite** in this repo; CI only runs lint + typecheck (`.github/workflows/main.yml`, triggered on every push).

## Pre-commit / formatting

- Husky runs `lint-staged` on pre-commit, which runs `eslint --fix` then `prettier --write` on staged `*.{js,jsx,ts,tsx}` files (`.lintstagedrc.js`).
- Prettier config (`.prettierrc.js`): 4-space tabs, semicolons, 150-char print width. Match this style in edits.

## Architecture

**Styling is the core of this codebase** and follows a deliberate layered pattern:

- `src/config/theme.ts` defines the single source of truth `theme` object (colors, typography, font sizes, breakpoints-adjacent values) plus Google fonts (`Oswald` for headings, `Noto_Sans` for body) loaded via `next/font/google`.
- `styled.d.ts` augments styled-components' `DefaultTheme` so theme values are fully typed in every `styled` template. **When you add a field to `theme.ts`, also update the `DefaultTheme` interface in `styled.d.ts`** or typecheck will fail.
- `src/components/globalstyles.tsx` (`createGlobalStyle`) applies base/reset styles and theme-driven defaults.
- `src/components/mainstyles.tsx` exports the page's layout primitives (`Container`, `Main`, `H1`, `Nav`, `H2`, `RedBlock`, `P`, `Footer`) as styled-components, with media queries driven by a local `breakpoints` constant. `index.tsx` composes these.
- All styled-component template literals read from the theme via `${({ theme }) => theme...}` rather than hardcoded values — preserve this when editing styles.

**Server-side rendering of styles:** `src/pages/_document.tsx` uses styled-components' `ServerStyleSheet` to collect and inline styles during SSR (prevents FOUC). `src/pages/_app.tsx` wraps the app in `ThemeProvider` and injects the body font. The `styledComponents: true` SWC compiler option is enabled in `next.config.js`. If you change SSR/styling setup, keep `_document.tsx`, `_app.tsx`, and the compiler flag consistent.

**SEO/metadata:** `src/config/seo.ts` centralizes `siteMetadata`, `socialLinks`, and JSON-LD structured data, all consumed by the `<Head>` in `index.tsx`. Site-level sitemap/robots config lives in `next-sitemap.config.js`.

## Conventions

- Import alias: `@/*` maps to `./src/*` (see `tsconfig.json`). Use it instead of long relative paths.
- TypeScript is `strict: false` and targets `es5`; don't assume strict-mode guarantees.

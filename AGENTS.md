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
- `src/components/ui/` holds the styled primitives, split by concern and re-exported from `src/components/ui/index.ts`:
    - `styles.ts` — shared `css` helpers. `bracketChrome` draws the Control-style corner brackets (top-left `::before`, bottom-right `::after`, geometry overridable via `--bracket-*` custom properties); `chromeLink` and `linkHover` define the one link hover language.
    - `layout.tsx` (`Shell`, `Nav`, `Main`, `Hero`, `Section`, `Prose`, `Footer`), `typography.tsx` (`H1`, `H2`, `RedBlock`, `SectionLabel`, `P`, `Stat`), `lists.tsx` (`ProductList`/`PostList`, `ProductItem`/`PostItem`, `RowTitle`/`RowText`/`RowMetaBar`/`RowMeta`), `chrome.tsx` (`StatusBadge`, `MoreLink`).
- Composite components live directly in `src/components/`: `LabeledSection`, `ProductRow`, `PostRow`, `NestSourceInfo`, `SubscribeForm`. `src/app/page.tsx` composes those as a Server Component, so page markup stays content-shaped — don't reintroduce `className` string hooks for styling.
- Inline links inside `P` are deliberately **not** bracketed: an inline anchor wrapping across lines would draw broken corners. Brackets belong to rows and standalone chrome links.
- Copy data: `src/data/products.ts` (`buildProducts` takes live Nest stats). Nest: `src/lib/nest.ts`. Paragraph posts/subscribe (+ views via API key): `src/lib/paragraph.ts`.
- All styled-component template literals read from the theme via `${({ theme }) => theme...}` rather than hardcoded values — preserve this when editing styles.

**Data freshness**

Nest figures refresh **on visit**: `src/app/page.tsx` is statically generated with `export const revalidate = 3600`, so the first visitor after the window lapses triggers a background regeneration that re-pulls Nest and Paragraph. There is no cron job. `src/data/nest-stats.json` is only the fallback `loadNestStats()` returns when the Nest API is unreachable, so the page never fails. Keep that literal in sync with `NEST_REVALIDATE_SECONDS`.

**Environment**

`PARAGRAPH_API_KEY` (server-side only, never `NEXT_PUBLIC_`) unlocks post view counts at build/revalidate time and powers `POST /api/subscribe` at runtime. Both paths degrade gracefully when it is absent. On Vercel it must be set for Production, Preview, and Development, followed by a redeploy.

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

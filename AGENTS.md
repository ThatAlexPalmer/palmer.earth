# AGENTS.md

## Overview

Personal website for [palmer.earth](https://palmer.earth), built with Next.js 16 App Router, TypeScript, React Server Components, and styled-components. The visible site is composed in `src/app/page.tsx`.

## Commands

Use pnpm (`pnpm@9.9.0` in `package.json`); do not use npm, yarn, or corepack.

- `pnpm install`
- `pnpm dev`
- `pnpm build`
- `pnpm start`
- `pnpm lint`
- `pnpm tsc --noEmit`

There is no test suite. CI runs lint and typecheck. Husky invokes lint-staged, which fixes and formats staged JavaScript and TypeScript files. Follow `.prettierrc.js`: four-space indentation, semicolons, and a 150-character print width.

## Workflow

- Use todo lists for tasks with three or more steps.
- Plan high-impact or ambiguous changes before editing.
- Run `pnpm lint` and `pnpm tsc --noEmit` before finishing.
- Keep commits atomic when asked to commit.

## Architecture

- `src/app/page.tsx` is a Server Component that composes the page. Keep markup content-shaped; do not add class-name hooks for styling.
- `src/config/theme.ts` is the styling source of truth. All styled-component values should read from the theme rather than introducing repeated hardcoded tokens.
- `src/config/fonts.ts` provides font variables. `styled.d.ts` derives styled-components types from the exported theme, so it needs no manual updates when theme fields change.
- `src/components/globalstyles.tsx` provides global defaults. `src/components/ui/` owns shared styled primitives, and `src/components/` owns composite UI.
- `StyledComponentsRegistry.tsx`, `Providers.tsx`, and `next.config.js` work together for App Router style streaming. Keep them aligned.
- `src/lib/` contains server-side content integrations. Preserve graceful fallback behavior, keep credentials server-only, and avoid introducing client-visible provider details.
- `src/config/seo.ts`, `src/app/layout.tsx`, and `next-sitemap.config.js` own site metadata and sitemap configuration.

## Conventions

- Use the `@/*` alias for `src` imports.
- TypeScript targets ES5 with `strict: false`; do not rely on strict-mode guarantees.

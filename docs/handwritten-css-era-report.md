# Header type and hero slab: handwritten era vs main

Research for the mobile regressions on https://palmer.earth (name row GITHUB / ALEX PALMER / X, and the rust hero). Measurements in section 4 are from a local build of `main` at `c12ec794575d53673d2ba87a73d3006e92050c25` (viewport 390×844 and 1280×900, `document.fonts.ready`).

## 1. Git history

Styled-components have owned the page since the first style commit. There is no Tailwind era in this history. The header stopped being one type system in two steps: Alex’s own Oswald split in January 2025, then the July 2026 terminal refresh that put IBM Plex Mono on the links.

### One family (handwritten)

Shared parent for the whole page was `body` in `src/components/globalstyles.tsx`. Neither the name nor the links set `font-family`, `font-weight`, `letter-spacing`, or `text-transform` of their own. They inherited the body face.

**`205fdae` — 2022-09-22 — “Add content, setup styles”**

Body:

| property | value |
| --- | --- |
| font-family | `Archivo, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif` |
| font-weight | `400` |
| font-size | `18px` |
| letter-spacing | `normal` |
| color | theme text (later `#ffffff` in `_app`) |

`H1` (no social links on this commit yet): inherit family, weight, letter-spacing, and color; `font-size: 2.5rem`, tablet `2rem`, phone `1.6rem`; `text-transform` unset; `line-height: 1.25`.

**`7007f4b` — 2022-09-23 — “feat:(copy)-udpates copy, nav, and meta”**

This is the one-row handwritten header. `Nav` (`display: flex; flex-flow: row nowrap; justify-content: space-between; align-items: baseline`) wrapped both the `H1` and `.controls` links (Twitter, LinkedIn, NF.TD — GitHub / X came later, same rules).

| | H1 “Alex Palmer” | `.controls a` |
| --- | --- | --- |
| font-family | inherit Archivo stack | inherit Archivo stack |
| font-size | `2rem`; phone `1.2rem` | `1.2rem`; phone `1rem` |
| font-weight | inherit `400` | inherit `400` |
| letter-spacing | inherit `normal` | inherit `normal` |
| text-transform | none | none |
| color | inherit text | `theme.colors.text` |

**`0e2d3fb` — 2024-01-20 — “Themeing upgrade”**

Archivo leaves `globalstyles.tsx`. Body face becomes Noto Sans via `next/font` in `src/pages/_app.tsx` (the variable was misnamed `ibmPlexMono`; the import is `Noto_Sans`). H1 and nav links still do not set a family. Still one face.

**`60e0a67` — 2025-01-25 16:34:31 -0500 — “add oswald typeface and update sizing”**

Oswald is added as `headingFont` in the theme object only. `H1` still has no `font-family`. Link sizes move to tokens: `uiCopy: 1.5rem`, `uiCopyMobile: 1rem`. `H1` sizes: `heading: 2.5rem`, `headingMobile: 1.6rem`. `letterSpacing.wide` is introduced as `0.1em` but not applied to the links. Text color becomes `#dcdcdc` (was `#ffffff`). Accent becomes `#a32d15` (was `#ba382c`).

### Handwritten split (still Alex, still styled-components)

**`e6e6f3e` — 2025-01-25 16:34:51 -0500 — “improve type styles”**

Global rule, not a link rule:

```css
h1, h2, h3 {
  font-family: headingFont; /* Oswald */
  font-weight: bold;        /* 700 */
  line-height: heading;     /* 1.3 */
  text-transform: uppercase;
  letter-spacing: wide;     /* 0.1em on this commit */
}
```

Nav anchors stay on the body face (Noto Sans), weight 400, letter-spacing `normal` (`0`), no text-transform, color `#dcdcdc`, size `1.5rem` / `1rem`.

**`15eb90f` — 2025-10-04 — “refactor: use Oswald for headings and Noto Sans for body text”**

`H1` now sets the heading face itself. `letterSpacing.wide` becomes `0.05em`. Last handwritten header values, carried through **`a144831` (2026-05-30, theme tokens)** and still present on **`c08004d` (2026-07-20 20:02 -0400)**, the commit immediately before the terminal refresh:

| | H1 ALEX PALMER | Nav `a` (GitHub, X) | shared |
| --- | --- | --- | --- |
| font-family | `theme.typography.headingFont` (Oswald) | inherit `theme.typography.fontFamily` (Noto Sans) | — |
| font-size | `heading` `2.5rem`; phone `headingMobile` `1.6rem` | `.controls` `uiCopy` `1.5rem`; phone `uiCopyMobile` `1rem` | — |
| font-weight | `bold` `700` | `normal` `400` | — |
| letter-spacing | global `h1` `wide` `0.05em` | inherit body `normal` `0` | — |
| text-transform | global `h1` `uppercase` | none (markup “GitHub” / “X”) | — |
| color | inherit `#dcdcdc` | `#dcdcdc` | body color `#dcdcdc` |

Layout at `c08004d` is no longer one row: centered `H1`, then a full-width `Nav` with GitHub at the start and X at the end. Same component file: `src/components/mainstyles.tsx`.

### What the July 2026 refresh changed

**`7263345` — 2026-07-20 — “feat: terminal-minimal visual refresh + Paragraph writing”**

Introduces IBM Plex Mono (`--font-mono`). The top bar (not the name) is mono, `font-size: sm`, `letter-spacing: mono` (`0.1em`), `text-transform: uppercase`.

**`14a5af5` — 2026-07-20 20:19 -0400 — “fix: restore live RedBlock hero composition”**

Alex’s commit puts the live slab back and says the justified type “intentionally overflows the red slab.” Nav links return to Noto / `uiCopy`, not mono. `H2` margin returns to `12.5rem auto 0`. `RedBlock::before` height stays `83%`.

**`a8ebfd7` — 2026-07-20 — “fix: center name, neon status, simplify writing and footer”**

Mono comes back on `TopBar`: `font-family: monoFont`, `font-size: sm` (`0.75rem`), `letter-spacing: mono` (`0.1em`), uppercase. `H1` stays Oswald, `display` / `displayMobile`, weight 700, `letter-spacing: wide`.

**`1d9b417` — same day** sets those nav links to `theme.colors.g68` (the actual grey token). Later chrome uses `theme.colors.text` again, so the live grey is optical (mono, 400, 12px) rather than `g68`.

**`767e369` — 2026-08-05 — “refactor(ui): split styled primitives into components/ui”**

`Nav` in `src/components/ui/layout.tsx` keeps `monoFont`, `letterSpacing.mono`, uppercase; anchors are weight 400 and `font-size: paragraph` (`1.125rem`).

**`5650a83` — 2026-09-15 — “fix(site): put GitHub and X on the name row”** (PR #250, merged by **`c12ec79` — 2026-09-20**)

Replaces `Nav` with flex `NameRow` and moves GitHub and X onto the same row as `H1`. It keeps the mono face. Phone size drops from `paragraph` to `sm` (`0.75rem`). That is the live main treatment measured below.

PR #250 is already on main. This branch starts at `c12ec79`, keeps the flex row, and replaces the mono link face. #250 does not conflict with flex; it conflicts with the type system.

## 2. Design-system audit (main at `c12ec79`)

`src/config/fonts.ts`

| token | face | weights |
| --- | --- | --- |
| `--font-heading` / `typography.headingFont` | Oswald | 400, 600, 700 |
| `--font-body` / `typography.fontFamily` | Noto Sans | 300, 400, 500, 600 |
| `--font-mono` / `typography.monoFont` | IBM Plex Mono | 400, 500, 600 |

`src/config/theme.ts` sizes that the header actually uses:

| token | value | who uses it on main |
| --- | --- | --- |
| `display` / `displayMobile` | `2.75rem` / `1.85rem` | `H1` only. Not in the handwritten theme (that used `heading` `2.5rem` / `1.6rem`). |
| `paragraph` / `sm` | `1.125rem` / `0.75rem` | Name-row links (desktop / phone). Handwritten links used `uiCopy` `1.5rem` / `uiCopyMobile` `1rem`, which were deleted in the refresh. |
| `letterSpacing.wide` | `0.05em` | `H1` (and global `h1,h2,h3`) |
| `letterSpacing.mono` | `0.1em` | Name-row links, footer, section labels, status chips |
| `fontWeight.bold` `700` vs `normal` `400` | | `H1` vs links |

Deltas that read as two type systems:

- Family: Oswald on the name, IBM Plex Mono on GitHub and X. The handwritten row never used a mono face. Mono exists for section labels, stats, and the footer, and it leaked onto the name row.
- Weight: 700 vs 400.
- Tracking: `0.05em` vs `0.1em`.
- Size: phone `1.85rem` vs `0.75rem` (about 2.5×), and the link size is a body/chip token (`sm`), not the old `uiCopyMobile`.
- Color token is the same `#dcdcdc` on both (`chromeLink` sets `theme.colors.text`). At 12px / 400 / mono the links still look greyer. `g68` was an earlier refresh color (`1d9b417`) and is not what main computes today.
- `rem` vs `px`: both eras use `rem` for component type. The drift is which token, not a unit change. Body root size went from `18px` (2022) to `16px` (2024), so a copied `rem` is smaller than it was in 2022.

`NameRow` is already a flex row on main (`flex-flow: row nowrap`). There is no corner-bracket layout on the name itself. Bracket chrome is the hover affordance inside `chromeLink` (`src/components/ui/styles.ts`), shared with the footer.

## 3. Hero overflow — verified

`RedBlock` is a flex column. `H2` has `margin: 12.5rem auto 0` (200px at 16px root). The rust color is not a background on the text. It is `RedBlock::before`: `position: absolute; top: 0; height: 83%; background: accent #a32d15`.

The 83% is a percentage of the whole box, and that box includes the 12.5rem offset. Once the role line wraps, `(1 - 0.83) * (offset + text height)` is more than a line, so the tail sits on `#08080a`.

Not the cause: line-clamp (none), `overflow` clipping, a fixed hero height (height is `auto`), or a missing wrap (`H2` width is `18rem` on phone and the words fit). `text-align: justify` only changes spacing inside the line.

`height: 83%` is handwritten. It landed in **`7a1e4fd` — 2025-01-26 — “improve styles”** (from 87%). **`96579a7` — 2025-10-04** turned the old `150px` / `200px` offset into `12.5rem`. **`14a5af5`** restored both on purpose and described a slight overflow as the live composition. That math worked when the heading was shorter. The current line is “— Head of Regulatory Product Strategy at Plume, a public blockchain for scaling RWAs”.

Computed on main:

| | mobile 390×844 | desktop 1280×900 |
| --- | --- | --- |
| H2 box | top 250, bottom 389, height 139 (23.2px, weight 600, 5 lines) | top 275, bottom 491, height 216 (36px) |
| RedBlock box | height 339 | height 416 |
| `::before` | height 281.5px (83%), bottom at y=332 | height 345px, bottom at y=420 |
| text below the slab | **58px** (~2 × 27.8px line) | **71px** |

## 4. Computed main header (the regression)

390×844:

| | ALEX PALMER | GITHUB and X |
| --- | --- | --- |
| font-family | Oswald | IBM Plex Mono |
| font-size | 29.6px (`1.85rem`) | 12px (`0.75rem`) |
| font-weight | 700 | 400 |
| letter-spacing | 1.48px (`0.05em`) | 1.2px (`0.1em`) |
| text-transform | uppercase | uppercase |
| color | rgb(220, 220, 220) | rgb(220, 220, 220) |

1280×900 links are the same mono face at 18px / 400 / `0.1em`. The name is Oswald 44px / 700 / `0.05em`.

## 5. What this branch changes

The row stays flex. GitHub, the name, and X share `headingFace`: Oswald, weight 700, `letter-spacing: wide` (`0.05em`), uppercase, color `#dcdcdc`. Size is the only step: links use restored handwritten ui-copy sizes (`nameLink` `1.5rem`, `nameLinkMobile` `1rem`); the name stays `display` / `displayMobile`.

The 12.5rem offset moves from `H2` margin (which inflated the box the 83% slab was measured against) to `RedBlock` padding (`layout.heroOffset`). `RedBlock::before` stretches to that padding box (`top`/`right`/`bottom`/`left`: 0) instead of a percentage height, and `layout.heroSlabPad` (`2.5rem`) is rust under the heading. The accent color stays.

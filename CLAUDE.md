# CLAUDE.md

Static marketing/demo site for **Pulse**, built with plain HTML + Tailwind CSS v4. No framework, no JavaScript bundler.

**Before creating or changing any page or component, follow the design system:**

@DESIGN.md

## Stack & commands

- Package manager: **pnpm only** (never `npm`/`yarn` — it creates a second lockfile).
- `pnpm install` — install deps
- `pnpm dev` — Tailwind CLI in watch mode (`src/input.css` → `dist/output.css`)
- `pnpm build` — one-off minified build. Run this after every change to confirm it compiles.
- `pnpm lint:tw` — lists Tailwind CSS IntelliSense warnings (the same squiggles VS Code shows) for
  every `*.html` and `src/*.css` file. Must print `0 Tailwind warning(s)`.
- Preview: VS Code Live Server, or open the HTML file directly after a build.

## Project layout

| Path | Purpose |
| --- | --- |
| `src/input.css` | The only stylesheet you edit: `@theme` tokens + component `@utility` classes. |
| `src/assets/` | Images (`logo.webp` — the Pulse wordmark, 600×200). |
| `src/main.js` | Page motion (scroll reveal, count-up, typing, shelf grid, scroll-spy). Plain script, no imports. |
| `dist/output.css` | Generated — never edit, never commit (git-ignored). |
| `index.html` | Home page. |
| `components.html` | Living component spec — every reusable component is shown here. |
| `DESIGN.md` | Design rules (tokens, type, components, voice). |
| `scripts/tailwind-lint.py` | Runs the Tailwind language server headless; backs `pnpm lint:tw`. |

## Tailwind warnings — always resolve

After **every** change to HTML or CSS, run `pnpm lint:tw` and fix everything it reports before saying the work is done.
Never ignore, silence or disable a warning (no lint settings changes, no `@layer` tricks) — fix the class instead.

| Warning | Fix |
| --- | --- |
| `suggestCanonicalClasses` — "`min-w-[720px]` can be written as `min-w-180`" | Use the suggested class exactly. |
| `unknownClass` — "`bg-rose-500` generates no CSS" | Use a theme token; if none fits, add a role-named token to `@theme`. |
| `cssConflict` — "'p-4' applies the same CSS properties as 'p-6'" | Keep only one of the classes. If a component class needs a different value, add a modifier `@utility` (like `btn-sm`) or a new variant in `src/input.css`. |
| `recommendedVariantOrder` | Reorder the variants as suggested. |
| `invalidApply` / `invalidVariant` / `invalidSourceDirective` / other errors | Fix the CSS in `src/input.css`; the build may be silently wrong. |

## Rules for new pages

1. Put pages in the **project root** as `*.html` — `src/input.css` only scans `@source "../*.html"`.
   If you add a subfolder, add a matching `@source` line.
2. Copy the `<head>` from `index.html` exactly (and its `<body class="overflow-x-clip">`, so pages never scroll sideways): same Google Fonts link (Inter + Plus Jakarta Sans only),
   `<link rel="stylesheet" href="./dist/output.css" />` and `<script defer src="./src/main.js"></script>`.
   Use `defer`, never `type="module"` — module scripts are blocked when the page is opened from `file://`.
3. Use the ruled-frame layout (DESIGN.md §4) and the motion rules (DESIGN.md §6) — `index.html` is the reference page.
4. Reuse the icon sprite (`<svg class="hidden">…</svg>` at the top of `<body>`), header and footer markup from
   `index.html`, and add the new page to the header nav. Dropdowns must stay `<details>` elements (no-JS fallback).
5. Build the page from the existing component classes in DESIGN.md §5. Copy content patterns from `components.html`.

## Colours are not final

Colours come from the Figma brand palette but may still change. Changing colours must only ever require editing
the `--brand-*` values in the `COLOURS` block of `src/input.css` (role shades are derived with `color-mix()`).
After changing a brand colour, re-check WCAG AA contrast of the derived roles. So: never put a colour in HTML, JS or a utility; use role-named tokens (`primary`, not `coral`);
add new colours as tokens. `pnpm lint:tw` flags any class that generates no CSS (`[unknownClass]`), which
catches default-palette colours because that palette is switched off.

## Rules for new components

1. Check DESIGN.md §5 and `components.html` first — reuse or extend before creating.
2. If a pattern repeats on 2+ pages, add it to `src/input.css` as an `@utility` (not `@layer components`
   — Tailwind v4 can only `@apply` classes registered with `@utility`), built from theme tokens.
3. New colours, fonts or sizes go into `@theme` in `src/input.css` **and** into DESIGN.md — never inline.
4. Add a specimen of the new component to `components.html` and list it in DESIGN.md §5.

## Definition of done (pages and components)

- [ ] Colours only from theme tokens (DESIGN.md §2) — no hex/rgb, no default palette (`rose-*`, `white` …), no `style=""`, no `<style>`, no `font-mono`.
- [ ] No flexible sizes inline (DESIGN.md §3): no `[…]` arbitrary values, no `sm:`/`lg:` font sizes — use fluid `text-display`/`text-headline`/`text-title`; data widths as fractions (`w-94/216`).
- [ ] Numbers use `tabular-nums`. Copy follows DESIGN.md §8. No invented numbers — only real Pulse figures.
- [ ] Motion follows DESIGN.md §6 and works with reduced motion; the page is readable with JavaScript off.
- [ ] Responsive: checked at mobile (375px) and desktop (1440px) widths.
- [ ] `pnpm build` succeeds.
- [ ] `pnpm lint:tw` reports `0 Tailwind warning(s)`.
- [ ] Visually checked: take a headless Chrome screenshot and look at it (scroll-revealed content only appears
      after scrolling — capture several scroll positions), e.g.
      `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --window-size=1440,3000 --screenshot=/tmp/shot.png "file://$PWD/index.html"`

## Git workflow

- Branches: `main` (production) ← `dev` (integration) ← `feature/<name>` (work).
- Branch new work from `dev`; open pull requests into `dev`. Never commit directly to `main`.
- **Never commit or push automatically.** After making changes, stop and let the user review them.
  Only run `git commit` / `git push` when the user explicitly says so.
- Design sources: brand colours from Figma file `IfFMuiAP9dL6OcRTn5B6V8` ("Pulse Design Work" › Branding › Pulse Color);
  layout/components originally from Google Stitch project `15026689791361906848`.

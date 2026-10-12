# CLAUDE.md

Static marketing/demo site for **Pulse**, built with plain HTML + Tailwind CSS v4. No framework, no JavaScript bundler.

**Before creating or changing any page or component, follow the design system:**

@DESIGN.md

## Stack & commands

- Package manager: **pnpm only** (never `npm`/`yarn` — it creates a second lockfile).
- `pnpm install` — install deps
- `pnpm dev` — Tailwind CLI in watch mode (`src/input.css` → `dist/output.css`)
- `pnpm build` — one-off minified build. Run this after every change to confirm it compiles.
- Preview: VS Code Live Server, or open the HTML file directly after a build.

## Project layout

| Path | Purpose |
| --- | --- |
| `src/input.css` | The only stylesheet you edit: `@theme` tokens + component `@utility` classes. |
| `dist/output.css` | Generated — never edit, never commit (git-ignored). |
| `index.html` | Home page. |
| `components.html` | Living component spec — every reusable component is shown here. |
| `DESIGN.md` | Design rules (tokens, type, components, voice). |

## Rules for new pages

1. Put pages in the **project root** as `*.html` — `src/input.css` only scans `@source "../*.html"`.
   If you add a subfolder, add a matching `@source` line.
2. Copy the `<head>` from `index.html` exactly: same Google Fonts link (Inter + Plus Jakarta Sans only)
   and `<link rel="stylesheet" href="./dist/output.css" />`.
3. Reuse the header and footer markup from `index.html`, and add the new page to the header nav.
4. Build the page from the existing component classes in DESIGN.md §5. Copy content patterns from `components.html`.

## Rules for new components

1. Check DESIGN.md §5 and `components.html` first — reuse or extend before creating.
2. If a pattern repeats on 2+ pages, add it to `src/input.css` as an `@utility` (not `@layer components`
   — Tailwind v4 can only `@apply` classes registered with `@utility`), built from theme tokens.
3. New colours, fonts or sizes go into `@theme` in `src/input.css` **and** into DESIGN.md — never inline.
4. Add a specimen of the new component to `components.html` and list it in DESIGN.md §5.

## Definition of done (pages and components)

- [ ] Only theme tokens and component classes — no raw hex, no `style=""`, no `<style>`, no `font-mono`.
- [ ] Numbers use `tabular-nums`. Copy follows DESIGN.md §7.
- [ ] Responsive: checked at mobile (375px) and desktop (1440px) widths.
- [ ] `pnpm build` succeeds.
- [ ] Visually checked: take a headless Chrome screenshot and look at it, e.g.
      `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --window-size=1440,3000 --screenshot=/tmp/shot.png "file://$PWD/index.html"`

## Git workflow

- Branches: `main` (production) ← `dev` (integration) ← `feature/<name>` (work).
- Branch new work from `dev`; open pull requests into `dev`. Never commit directly to `main`.
- Commit/push only when asked.
- Design source: Google Stitch project `15026689791361906848` (screen "Pulse — Brand Guidelines (Electric Coral)").

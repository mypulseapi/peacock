# CLAUDE.md

Static marketing/demo site for **Pulse**, built with plain HTML + Tailwind CSS v4. No framework, no JavaScript bundler.

**Before creating or changing any page or component, follow the design system:**

@DESIGN.md

## Source of truth — what wins when rules disagree

1. `docs/pulse_brand_guidelines_final.md` — brand colour, type, logo, voice. Absolute.
2. `DESIGN.md` — tokens, layout, components, motion, accessibility.
3. This file — workflow, commands, definition of done.
4. Design skills (Impeccable, Taste, frontend-design) — judgement on hierarchy, rhythm, spacing and copy, applied
   **inside** 1–3, never instead of them.

If a skill's rule contradicts 1–3, follow 1–3, apply the skill's intent with the tools Pulse already has, and say in
the report which skill rule was overridden and why. Never change a token, the guideline or DESIGN.md to satisfy a skill.

## Design skills — how to use them here

### General rules for every skill

- **Plan, approve, then edit.** For a page-level change, run the read-only step first (`/impeccable critique` or
  `/impeccable audit`), write a numbered plan, and wait for the user to approve it. Then run **one command per step**,
  in the approved order, and finish the definition of done (below) after each step before starting the next.
- **No invented content.** Skills like to fill gaps with plausible copy, names, numbers, logos, quotes and links.
  Pulse never shows made-up content. If a step needs a fact you don't have (a name, a figure, a command, a URL),
  stop and ask for it; if it can't be supplied, keep the existing text or hide the element (see `/impeccable harden`).
- **Items marked _Proposed_** in the brand guideline §2 (mission, vision, values, audience) need sign-off before they
  appear on a page. Ask first.
- **Only existing building blocks.** Use the classes in DESIGN.md §5 and the tokens in `src/input.css`. A skill that
  wants a new colour, font, size, shadow or effect goes through "Rules for new components" below, with the user's OK.
- **Tools run through pnpm.** Where a skill says `npx <tool>`, use `pnpm dlx <tool>` (pnpm only, see Stack).
- **Report briefly:** what changed, which skill rules were overridden, what still needs a fact from the user.

### Impeccable — default for changing existing pages

Impeccable is the main skill for this repo: most work is refining pages that already exist.

- `/impeccable init`: `DESIGN.md` already exists and is the source of truth — **never let init create, overwrite or
  merge into it**. If init writes `PRODUCT.md`, fill it from the brand guideline §2 (core promise, positioning,
  audience) and mark _Proposed_ items as such.
- `/impeccable critique`, `/impeccable audit`: read-only. Score against DESIGN.md as well as Impeccable's own rules;
  list issues by severity. Re-run after a set of fixes to confirm the score improved.
- `/impeccable layout`: keep the ruled frame (DESIGN.md §4): `frame`, hairlines between sections, 12-column grid,
  at most one `bg-void` band per page.
- `/impeccable clarify`: copy follows DESIGN.md §8 and guideline §2 (plain English, concrete real numbers, state
  limits, no hype, no exclamation marks, headings without a full stop, "Pulse" with a capital P only).
- `/impeccable harden`: hide placeholders rather than filling them; replace them with a true sentence the page can
  already support. Readable with JavaScript off and with reduced motion.
- `/impeccable typeset`: only the type tokens in DESIGN.md §3 (Geist + Geist Mono, `font-mono` for data only). No
  breakpoint font sizes, no arbitrary sizes; a new size is a new fluid `--text-*` token.
- `/impeccable bolder`: make it bolder with hierarchy, scale, real data and contrast between `ink` and `muted` —
  **not** with extra colour, gradients, glows, shadows or decorative icons. Signal Red stays once per view,
  `bg-signal-gradient` once per page, one `btn-primary` per view.
- `/impeccable animate`: only the effects in DESIGN.md §6 (`reveal`, `reveal-bar`, `data-count` …). No decorative
  loops, no hover scale or lift, `motion-reduce` on everything.
- `/impeccable distill`, `/impeccable polish`: fine as-is; polish also checks the definition of done.
- `pnpm dlx impeccable detect --fast --json .`: run after a step that changed markup. Treat findings that conflict
  with DESIGN.md (for example the deliberate `hero-glow` or the `shadow-glow` on Why Pulse) as accepted exceptions.

### Taste — only when the user asks for a new visual direction

Use Taste for a redesign that should look clearly different, or for a new page. Use only `redesign-skill` (on existing
pages, audit first) and `design-taste-frontend`. Don't use the style variants (`soft-skill`, `minimalist-skill`,
`brutalist-skill`, `stitch-skill` …): each brings its own look, which conflicts with Signal.

- **Dials for Pulse** (override Taste's defaults):
  - `DESIGN_VARIANCE`: 4–5 (redesign "preserve": match the existing page; "overhaul": at most 6).
  - `MOTION_INTENSITY`: 2–3, never above 3. Motion only from DESIGN.md §6.
  - `VISUAL_DENSITY`: match the existing page; data-heavy blocks live inside cards.
- **Design Read first.** Before any code, write Taste's one-line Design Read (product, audience, design language,
  stack) and a short list of where Taste's rules conflict with DESIGN.md and how you'll resolve them. Wait for approval.
- **Taste rules that never apply here:** magnetic or cursor-pulled buttons, perpetual micro-animations, hover lift or
  scale, premium or extra fonts, stock or decorative imagery, glassmorphism, `shadow-lg`+ on light cards, new
  gradients, colours outside the tokens.
- **Keep on a redesign:** navigation names, page titles and SEO text, form fields, tracking attributes, real figures,
  the order of anything the user has not asked to change.
- Finish a Taste redesign with `/impeccable audit` and `/impeccable polish`: Taste sets the direction, Impeccable
  checks the craft.

### frontend-design (Anthropic)

Same rules as Taste. Don't combine it with Taste in one task; pick one.

## Stack & commands

- Package manager: **pnpm only** (never `npm`/`yarn` — it creates a second lockfile).
- `pnpm install` — install deps
- `pnpm dev` — Tailwind CLI in watch mode (`src/input.css` → `dist/output.css`)
- `pnpm build` — one-off minified build. Run this after every change to confirm it compiles.
- `pnpm format` / `pnpm format:check` — Prettier (pinned 3.7.4, default settings, same as the editor's format-on-save).
- `pnpm lint:tw` — lists Tailwind CSS IntelliSense warnings (the same squiggles VS Code shows) for
  every `*.html` and `src/*.css` file. Must print `0 Tailwind warning(s)`.
- Preview: VS Code Live Server, or open the HTML file directly after a build.

## Project layout

| Path                                                   | Purpose                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/input.css`                                        | The only stylesheet you edit: `@theme` tokens + component `@utility` classes.                                                                                                                                                                                                        |
| `src/assets/`                                          | `brand/` (logo SVG masters — `logo.svg`, `logo-white.svg`, `logo-mono-*.svg`, `symbol.svg` — the `.webp` logos and favicons rendered from them, `og-image.png`), `product/` (product hero background videos + posters) and `fonts/` (Geist + Geist Mono in `fonts/geist/`, SIL OFL). |
| `src/main.js`                                          | Page motion (scroll reveal, count-up, typing, shelf grid, scroll-spy). Plain script, no imports.                                                                                                                                                                                     |
| `dist/output.css`                                      | Generated — never edit, never commit (git-ignored).                                                                                                                                                                                                                                  |
| `index.html`                                           | Home page.                                                                                                                                                                                                                                                                           |
| `pricing.html` `about.html` `contact.html`             | Company pages (root, like the live site's `/pricing`, `/about`, `/contact`).                                                                                                                                                                                                         |
| `signin.html` `signup.html` `forgot-password.html`     | The sign-in pages (root, live copy from thepulseapi.com). Developer docs live on https://developer.thepulseapi.com/ (the header's Documentation link), not in this project. The site is static: the forms use `method="dialog"` and send nothing.                                    |
| `industries/`                                          | The six sector pages from the header's Templates menu (ecommerce, fmcg, technology, furniture, cosmetics, distribution), live copy from thepulseapi.com. No index page (the live site does not link one).                                                                            |
| `careers/`                                             | Careers page (`careers/index.html`, live copy). No open roles since 19 Oct 2026: the list shows an empty state; add one page per role in this folder when roles open. Applications go by email to careers@thepulseapi.com.                                                           |
| `privacy.html` `terms.html` `cookies.html` `gdpr.html` | Legal pages (root), linked from the footer.                                                                                                                                                                                                                                          |
| `product/`                                             | Product pages: overview (`product/index.html`) and Decision Audit / Verification / Monitor.                                                                                                                                                                                          |
| `scripts/sync-shell.py`                                | Copies the shared head, icon sprite, header and footer from `index.html` into every other page.                                                                                                                                                                                      |
| `components.html`                                      | Living component spec — every reusable component is shown here.                                                                                                                                                                                                                      |
| `DESIGN.md`                                            | Design rules (tokens, type, components, voice).                                                                                                                                                                                                                                      |
| `scripts/tailwind-lint.py`                             | Runs the Tailwind language server headless; backs `pnpm lint:tw`.                                                                                                                                                                                                                    |

## Formatting — always format what you save

The editor formats every file with **Prettier 3.7.4, default settings** on save (VS Code `editor.formatOnSave` +
`esbenp.prettier-vscode`, which uses the project's pinned `prettier`). So every file Claude writes must already be in
that format — otherwise the next manual save rewrites thousands of lines and buries the real change in the diff.

- After **every** edit or write of an HTML, CSS, JS, JSON, YAML or Markdown file, run
  `pnpm exec prettier --write <the files you changed>` (or `pnpm format` for everything) before building, linting
  or reporting the work as done.
- Generated or spliced markup (scripts that write into `index.html`) counts too — format after the script runs.
- `pnpm format:check` must pass before every commit. Never change `.prettierrc.json` / the Prettier version to make a
  check pass; keep them in sync with the editor.
- Search-and-replace against formatted files: match the formatted text (attributes may be wrapped onto their own
  lines), not the old single-line markup.

## Tailwind warnings — always resolve

After **every** change to HTML or CSS, run `pnpm lint:tw` and fix everything it reports before saying the work is done.
Never ignore, silence or disable a warning (no lint settings changes, no `@layer` tricks) — fix the class instead.

| Warning                                                                     | Fix                                                                                                                                                        |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `suggestCanonicalClasses` — "`min-w-[720px]` can be written as `min-w-180`" | Use the suggested class exactly.                                                                                                                           |
| `unknownClass` — "`bg-rose-500` generates no CSS"                           | Use a theme token; if none fits, add a role-named token to `@theme`.                                                                                       |
| `cssConflict` — "'p-4' applies the same CSS properties as 'p-6'"            | Keep only one of the classes. If a component class needs a different value, add a modifier `@utility` (like `btn-sm`) or a new variant in `src/input.css`. |
| `recommendedVariantOrder`                                                   | Reorder the variants as suggested.                                                                                                                         |
| `invalidApply` / `invalidVariant` / `invalidSourceDirective` / other errors | Fix the CSS in `src/input.css`; the build may be silently wrong.                                                                                           |

## Rules for new pages

1. Pages mirror the live site's paths: the home page in the root, others in folders (`product/decision-audit.html`).
   A new folder needs three additions: an `@source "../<folder>/*.html";` line in `src/input.css`, the folder in the
   deploy workflow's `cp -r` line (`.github/workflows/static.yml`), and nothing else (lint scans every folder).
2. Don't copy the head, header or footer by hand. Give the page empty shell markers, then run
   `python3 scripts/sync-shell.py` (and `pnpm format`). It fills `<!-- shell:head --><!-- /shell:head -->`,
   `shell:sprite`, `shell:header` and `shell:footer` from `index.html` and rewrites relative URLs for the folder depth.
   The call to action above the footer is opt-in: add `<!-- shell:cta --><!-- /shell:cta -->` right before the footer
   markers on pages where visitors explore the product (home, `product/`); company and legal pages leave it out.
   Copy an existing page in `product/` as the starting point: it has the page's own `<title>`, `<body class="overflow-x-clip">`
   and the markers. After editing the header or footer in `index.html`, run the script again so every page matches.
   Use `defer` for scripts, never `type="module"` (module scripts are blocked when a page is opened from `file://`).
3. Use the ruled-frame layout (DESIGN.md §4) and the motion rules (DESIGN.md §6) — `index.html` is the reference page.
4. Reuse the icon sprite (`<svg class="hidden">…</svg>` at the top of `<body>`), header and footer markup from
   `index.html`, and add the new page to the header nav. Dropdowns must stay `<details>` elements (no-JS fallback).
5. Build the page from the existing component classes in DESIGN.md §5. Copy content patterns from `components.html`.

## Colours (Signal palette)

Colour values come from `docs/pulse_brand_guidelines_final.md` §3–§6 (Signal; it replaces v2 Aurora) and live only in the `COLOURS` block of
`src/input.css`. Every text/surface role is an exact hex written as `light-dark(<light>, <dark>)` — dark mode follows
the OS, `<html data-theme>` overrides it. To change a colour, update the guideline and the token together, then
re-check WCAG AA contrast with a script in **both** themes. Never put a colour in HTML, JS or a utility; use role-named
tokens (`primary`, not `indigo`); add new colours as tokens (light + dark value). `pnpm lint:tw` flags any class that generates no CSS (`[unknownClass]`), which
catches default-palette colours because that palette is switched off.

## Rules for new components

1. Check DESIGN.md §5 and `components.html` first — reuse or extend before creating.
2. If a pattern repeats on 2+ pages, add it to `src/input.css` as an `@utility` (not `@layer components`
   — Tailwind v4 can only `@apply` classes registered with `@utility`), built from theme tokens.
3. New colours, fonts or sizes go into `@theme` in `src/input.css` **and** into DESIGN.md — never inline.
4. Add a specimen of the new component to `components.html` and list it in DESIGN.md §5.

## Definition of done (pages and components)

Run this after **each** skill step, not only at the end of a plan.

- [ ] No `reveal eyebrow` label above a heading (owner's rule, 19 Oct 2026): headings stand alone.
- [ ] Colours only from theme tokens (DESIGN.md §2) — no hex/rgb, no default palette (`rose-*`, `white` …), no `style=""`, no `<style>`, `font-mono` only for data (DESIGN.md §3).
- [ ] No flexible sizes inline (DESIGN.md §3): no `[…]` arbitrary values, no `sm:`/`lg:` font sizes — use fluid `text-display`/`text-headline`/`text-title`; data widths as fractions (`w-94/216`).
- [ ] Numbers use `tabular-nums`. Copy follows DESIGN.md §8. No invented numbers — only real Pulse figures.
- [ ] No invented content of any kind (names, quotes, logos, commands, links); _Proposed_ guideline items only with sign-off.
- [ ] Per-view limits hold: one `btn-primary`, Signal Red once (two at most), one `bg-signal-gradient` per page, one `bg-void` band per page.
- [ ] Motion follows DESIGN.md §6 and works with reduced motion; the page is readable with JavaScript off.
- [ ] Responsive: checked at mobile (375px) and desktop (1440px) widths.
- [ ] `pnpm format:check` passes (files are formatted exactly as the editor saves them).
- [ ] `pnpm build` succeeds.
- [ ] `pnpm lint:tw` reports `0 Tailwind warning(s)`.
- [ ] Visually checked: take a headless Chrome screenshot and look at it (scroll-revealed content only appears
      after scrolling — capture several scroll positions), e.g.
      `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --window-size=1440,3000 --screenshot=/tmp/shot.png "file://$PWD/index.html"`
- [ ] After a set of design-skill fixes: `/impeccable critique` re-run and the result reported.

## Git workflow

- **Branching: feature branch -> `develop` -> `main`** (20 Oct 2026), the same flow as the
  handbook. Work lands on `develop` first. **Merging `develop` into `main` is the release**: that
  is what deploys. A push to `develop` deploys nothing, which is the point.
- **Both branches are protected.** Rulesets block deletion and force-push and require a pull
  request with review threads resolved. `develop` needs `Lint` and `Type check`; `main` needs
  those plus `Build site` and `Source branch`. There are no bypass actors, so this applies to
  admins too.
- `Source branch` refuses a pull request into `main` from anything but `develop`. Without it a
  feature branch could publish work that never sat on `develop`, which is the whole point of
  having `develop`.
- This replaces "work directly on `main`" (15 Oct 2026), which the rulesets now make impossible.
- Every push to `main` deploys (GitHub Pages). The site answers on staging.thepulseapi.com until
  the apex DNS for thepulseapi.com is moved off Vercel; `PAGES_CUSTOM_DOMAIN` is what switches it.
- **Never commit or push automatically.** After making changes, stop and let the user review them.
  Only run `git commit` / `git push` when the user explicitly says so.
- Design sources: brand colours and typography from `docs/pulse_brand_guidelines_final.md` (Signal, 16 Oct 2026; the final version on 19 Oct 2026 replaced Inter with Geist + Geist Mono and navy dark surfaces with cool black `#0B0D12`; v2 Aurora and the earlier Figma "Pulse Color" palette are superseded);
  layout/components originally from Google Stitch project `15026689791361906848`.

# DESIGN.md — Pulse Design System

Source of truth for how every page and component in this project looks and reads.
Brand colours: Figma "Pulse Design Work" › Branding › **Pulse Color** (actual swatch fills).
Layout, components and voice: originally from the Google Stitch "Pulse Brand Guidelines System".
All tokens live in `src/input.css`.

Live reference: `components.html` shows every component below rendered with the real classes.

---

## 1. Principles

1. **Flat and typographic.** Matte, opaque fills. No glassmorphism, no glow, no decorative
   illustration or stock imagery. Depth comes from 1px borders, spacing and `shadow-sm` only.
   The only gradients are the brand gradient (`bg-brand-gradient`) and the hero stage backdrop (`hero-backdrop`), see §2.
2. **Data first.** Visual interest comes from tables, ranked lists, scores and status badges —
   not decoration.
3. **Colour has a job.** Every colour below has one meaning. Never use a colour outside its role.
4. **Generous whitespace.** Sections breathe (`py-20`); dense data lives inside cards.

## 2. Colour tokens

**The palette is not final.** Every colour is defined once, in the `COLOURS` block of `@theme` in
`src/input.css`, in two layers:

1. **Brand palette** — the 6 base colours from Figma (`--brand-ink`, `--brand-indigo`, `--brand-coral`,
   `--brand-violet`, `--brand-mint`, `--brand-mist`). **To re-theme, change these hex values.**
   They are not utilities — never use them in HTML.
2. **Roles** — what pages use (`primary`, `signal`, `void` …). Shades are derived from the brand palette with
   `color-mix(in oklab, …)` formulas, so they follow automatically. The mix percentages were checked for
   WCAG AA contrast; if you change a brand colour, re-check contrast.

Brand proportions (Figma): **Indigo 60%** (platform colour) · **Coral 30%** · **Violet 10%**.

Rules:
- Use only the token classes below (`bg-primary`, `text-muted`, `border-line` …). Tailwind's default palette
  is switched off (`--color-*: initial`), so `bg-rose-500`, `text-white`, `bg-slate-100` don't exist —
  `pnpm lint:tw` reports them as `[unknownClass]`.
- Never write colour values in HTML or utilities: no hex, no `rgb()`, no `bg-[#…]`. Need a new colour?
  Add a **role-named** token to the `COLOURS` block, then list it here.
- Name tokens by role, not hue (`primary`, not `coral`/`blue`), so names stay true when the palette changes.
- Opacity modifiers on tokens are fine (`bg-primary/70`, `text-void-muted/70`).

| Token | Role — and the only place it may be used |
| --- | --- |
| `primary` | **Indigo.** Buttons, links, active navigation and filters, brand marks, section tags. |
| `primary-dark` | Hover / pressed state of primary; text in primary badges. |
| `primary-light` | Primary on dark (`void`) backgrounds. |
| `primary-tint` / `primary-line` | Background / border of primary chips and badges. |
| `on-primary` | Text and icons on a primary fill. |
| `signal` | **Coral — the alive signal, use once per view:** the #1 ranked item (fill, bar, ring, large number ≥ 24px). |
| `signal-dark` | Small text in the signal colour (labels, small numbers) — plain `signal` is too light for small text. |
| `signal-tint` / `signal-line` | Background / border of `badge-signal`. |
| `accent` / `accent-tint` | **Violet — personalisation** highlights (10%). Not used on pages yet. |
| `gap` | **Missing data only** — dashed empty cells, missing attributes, catalogue leaks. Never for branding. |
| `gap-bg` / `gap-cell` / `gap-text` / `gap-border` | Panel fill / dashed-cell fill / text / border for gap elements. |
| `gap-dark` / `gap-text-dark` | Gap border / text on dark backgrounds. |
| `void` | **Ink.** Headlines and dark bands. |
| `void-elevated` | Cards on a dark band. |
| `void-line` / `void-line-strong` | Hairlines / accent rules on dark. |
| `void-text` / `void-muted` / `on-void` | Body text / captions / headings and numbers on dark. |
| `card` | Cards, panels, inputs, header background. |
| `surface-0` | **Mist.** Page background (set on `body`). |
| `surface-1` | Table headers, wells, progress tracks. |
| `line` | All 1px borders and dividers. |
| `ink` | Body text, table values. |
| `muted` | Captions, labels, metadata, secondary text. |
| `success` (+ `-bg`, `-line`) | **Mint.** Status: complete / ready. `success` is Mint darkened for readable text. |
| `warning` (+ `-bg`, `-line`) | Status: degraded / low confidence. |
| `critical` (+ `-bg`, `-line`) | Status: blocker / attribute missing completely. |
| `grid-line` / `grid-line-dark` | Used only inside `blueprint-grid` / `blueprint-grid-dark`. |
| `stage-base` / `stage-glow` / `stage-glow-accent` | Used only inside `hero-backdrop`: base tint, Indigo wash in the lower corners, faint Violet wash at the bottom centre. |
| `window-close` / `window-minimise` / `window-zoom` | Only the three window-control dots in the hero app-window frame (Coral, amber, Mint). |
| `critical-hatch` / `critical-ring` | Used only inside `missing-flag`: the red stripes and the 1px inner outline. |
| `scan-band` | Used only inside `demo-scan`: the translucent Indigo band that sweeps across the audit step. |

**Brand gradient:** `bg-brand-gradient` — Coral → Indigo at 112° (Figma "gradient"), built from the `signal`
and `primary` tokens. Allowed for big brand moments (hero or closing CTA backgrounds, dark bands) — at most one
per page, never behind small text. Not used on pages yet.

**Hero stage backdrop:** `hero-backdrop` (on a `relative isolate` element) — starts as the page colour at the top so
the headline area flows into it without a line, then turns into a soft, cool Indigo wash that is strongest at
the bottom and the sides, around the app window (attio.com style, no lines or patterns). Built from the `stage-*` tokens. Only behind the home hero's product stage.

Status colours are **only** for audit status — never decorative.

## 3. Typography

Only two font families. **No monospace font in this project** (JetBrains Mono was removed on purpose).

| Class | Font | Use |
| --- | --- | --- |
| `font-display` | Plus Jakarta Sans 500–800 | Headings, big numbers, logo wordmark. `h1`–`h3` get it automatically. |
| `font-sans` (default) | Inter 400–600 | Everything else, including data. |

| Class | Size / line-height / weight | Use |
| --- | --- | --- |
| `text-h1` | 40px / 1.15 / 800 | Fixed-size page title (prefer `text-display` for the main hero `h1`). |
| `text-h2` | 24px / 1.3 / 700 | Section headings. |
| `text-h3` | 18px / 1.4 / 600 | Card and component titles. |
| `text-body` | 14px / 1.6 | Paragraphs in cards. |
| `text-data` | 13px / 1.5 | Table cells, metrics, SKUs. |
| `text-caption` | 11px / 1.4 | Column notes, list sub-lines and small uppercase labels inside the hero demo. |
| `text-xs` | 12px | Captions, eyebrows, badges. |

Rules:
- Numbers, SKUs, prices, percentages and any column of data → add **`tabular-nums`** so digits line up.
- Never use `font-mono`, `<code>` styling, or load another font. Do not add fonts to the Google Fonts link.
- Headlines are short, sentence case, with a full stop when they are a statement
  ("Know which product data to fix first.").

### Sizes — no flexible sizes inline

Responsive and one-off sizes belong in `@theme`, not in class attributes:
- **No arbitrary values** in HTML: no `w-[43.5%]`, `text-[10px]`, `min-w-[720px]`, `border-[1.5px]`.
- **Data widths are fractions of the real numbers**: `w-94/216`, `w-80/162` (Tailwind computes
  `calc(94 / 216 * 100%)`), so a bar is traceable to its source figures and never hand-rounded.
- **No breakpoint font sizes** (`sm:text-5xl lg:text-6xl`). Big headings use the fluid tokens, which scale
  with the viewport via `clamp()` defined once in `@theme`:

| Class | Size | Use |
| --- | --- | --- |
| `text-display` | 40 → 60px, 800 | Page `h1` (one line from `xl`: `text-balance xl:whitespace-nowrap`), the dark-band statement |
| `text-headline` | 36 → 48px, 800 | Closing CTA heading |
| `text-title` | 30 → 36px, 700 | Section intro headings |
| `text-nav` / `text-micro` | 15px / 10px | Header links and buttons / dropdown section labels |

Need a new responsive size? Add a fluid `--text-*` token (with line-height/weight/letter-spacing) to `@theme`.

## 4. Layout & spacing — the ruled frame

Pages use an Attio-style **ruled layout**: one centred column (no side lines), with every section
separated by a horizontal hairline.

```html
<section class="border-b border-line">        <!-- full-width row, hairline below -->
  <div class="frame">                         <!-- centred column: max-w-frame (85.5rem) -->
    <div class="px-6 py-16 lg:px-12 lg:py-24">…</div>
  </div>
</section>
```

- Every section (and the header/footer inner row) wraps its content in `frame` so content edges line up.
  Dark bands use `bg-void` on the section and `frame-dark` inside.
- Split content **inside** the frame with hairlines, not gaps: `grid … md:divide-x md:divide-line`,
  `divide-y divide-line`, or `border-t border-line` between a heading area and its visual.
- Visual areas (mockups, charts) sit on `blueprint-grid bg-surface-1/50`; text areas sit on the plain page.
- Padding: text areas `px-6 py-12 lg:px-12 lg:py-16`; big statements `py-24 lg:py-32`.
- Desktop grid: 12 columns (`lg:grid-cols-12`). Common splits: 3/9 (sticky nav + content), 5/7, 7/5.
- **No sideways scrolling, ever.** `<body class="overflow-x-clip">` on every page (`clip`, not `hidden`, so the
  sticky header keeps working). Content must also fit by itself: no `min-w-*` tables in sideways-scrolling boxes —
  hide less important columns on small screens instead (the hero demo tables show 2 attribute columns below `sm`,
  SKU from `lg`).
- At most one dark (`bg-void`) band per page.
- Inside cards: `p-6` (compact `p-4`/`p-5`), gaps `gap-4`–`gap-6`.
- Radius: `rounded-xl` cards and windows, `rounded-lg` buttons and inner panels, `rounded` chips,
  `rounded-full` badges and bars.
- Mobile first: every grid collapses to one column below `md`/`lg`; sticky side navs are `hidden lg:block`
  and replaced by an `eyebrow` step label (`01 · The problem`) above each block.
- Long headlines get `text-balance`, paragraphs `text-pretty` — no single-word last lines.

## 5. Components (defined in `src/input.css` — reuse, don't re-style)

| Class | What it is |
| --- | --- |
| `btn-primary` | Indigo filled button. Main action — one per view. |
| `btn-secondary` | White, bordered. Supporting action next to a primary. |
| `btn-ghost` | No border. Low-emphasis utilities. |
| `btn-sm` | Size modifier — combine: `btn-primary btn-sm`. |
| `btn` | Base only — for one-off variants on dark backgrounds (`btn border border-void-line-strong text-void-text`). |
| `card` | `bg-card` panel, `border-line`, `rounded-xl`, `p-6`, `shadow-sm`. |
| `card-dark` | `void` panel for scores and the final CTA. |
| `eyebrow` | Small uppercase label above titles. |
| `section-tag` | Numbered primary (Indigo) chip before an `h2` (`01`, `02` …). |
| `badge-primary` / `badge-signal` (the #1 item only) / `badge-success` / `badge-warning` / `badge-critical` | Pill labels. Status badges map to audit states only. |
| `missing-cell` / `missing-cell-dark` | **Signature motif**: dashed amber box marking missing data. |
| `missing-flag` | Hero demo only (matches thepulseapi.com): red hatched flag with a warning icon for a missing value in the catalogue table. Its stripes slide sideways in an endless 1s loop (`--animate-missing-drift`; stopped with reduced motion). |
| `demo-pill` | Hero demo only: status pill in a step's title bar. Add the colours: critical (`border-critical-line bg-critical-bg text-critical`), running (`border-line bg-surface-1 text-muted` + spinner), done (`border-primary bg-primary text-on-primary`). |
| `scan-track` | Hatched `surface-1` track behind the demo's progress bars. |
| `blueprint-grid` / `blueprint-grid-dark` | Faint 24px grid background — behind mockups, visuals, dark bands and the final CTA. |
| `bg-brand-gradient` | Coral → Indigo brand gradient (see §2). |
| `nav-link` | Header menu link / dropdown trigger: Plus Jakarta 15px medium, `ink` text with a `surface-1` hover pill. |
| `nav-icon-tile` | 32px `primary-tint` square holding a 16px `primary` icon (mobile menu only). |
| `frame` / `frame-dark` | Centred page column, `max-w-frame` (see §4). No side borders. |
| `hero-backdrop` | Hero stage background: page colour → soft cool Indigo wash, strongest at the bottom and sides (see §2). Full width, no line above. The app window on it uses the attio.com frame: `rounded-2xl border border-line bg-surface-1 p-1.5` with the `window-*` dots, the app panel inset as `rounded-xl border border-line bg-card`. |
| `hero-window` / `hero-fade` / `hero-stage` | Hero scroll effect: the product window that grows, the headline block that fades out, and the stage whose bottom padding ends it exactly at the bottom of the screen at full focus (see §6, Hero scroll zoom). `hero-stage` assumes the `h-17` header. |
| `demo-stack` / `demo-step` | Hero workflow demo: steps stacked in one grid cell, only the `data-active` one visible. Without JS every step shows, one under another. |
| `demo-in` / `demo-out` / `demo-bar` (+ `demo-bar-slow`, `demo-bar-scan`) / `demo-draw` / `demo-fill` / `demo-scan` / `demo-timer` | Motion inside a demo step: enter with stagger (`delay-*`), fade a "before" label away (`demo-out`, hidden without JS), grow a bar (`demo-bar-scan`: 1.9s `ease-scan` fill with a running shimmer), draw an SVG path (`pathLength="1"`), fill a grid cell, sweep one band across the step once (`demo-scan`, first child of a `relative` step), run the tab timer. They replay every time the step becomes active. |
| `reveal` | Fades + slides an element up 1rem when it scrolls into view. |
| `reveal-bar` | Grows a bar from the left edge when it scrolls into view. |
| `animate-marquee` | Infinite horizontal scroll (40s). Content must be duplicated once for a seamless loop. |
| `animate-caret` | Blinking text caret for typing demos. |

### Patterns

Section header (use for every `h2` section):
```html
<div class="mb-10 flex items-baseline gap-3 border-b border-line pb-4">
  <span class="section-tag">01</span>
  <h2 class="text-h2">Section heading.</h2>
</div>
```

Ranked list: only rank **#1** is solid `bg-signal` + `badge-signal`; lower ranks use tints
(`bg-signal/70`, `/50`, `/35`, `/20`) and neutral badges (`badge border-line text-muted`).

Data table: wrapper `overflow-x-auto rounded-xl border border-line bg-card shadow-sm`;
`thead` `bg-surface-1 text-xs text-muted`; rows `divide-y divide-line`; values `tabular-nums text-data`;
empty values → `missing-cell`, not-applicable → `text-muted` "n/a".

Score / metric: big number in `font-display font-extrabold`, unit or denominator in
`text-data text-muted tabular-nums` next to it.

Two-tone heading (Attio style) — a short statement in `void`, the explanation continues in `muted`:
```html
<h3 class="text-h2">Two shelves, the same missing fact. <span class="text-muted">The shopper knows exactly what they need.</span></h3>
```

Sticky step navigation: left `lg:col-span-3` column with `sticky top-16` nav; links carry
`data-spy="<section-id>"` and style the active state with `data-active:border-primary data-active:text-void`
(set by `src/main.js`). Content blocks in `lg:col-span-9`, separated by `divide-y divide-line`.

Header / navbar (from thepulseapi.com): sticky, `h-17`, `bg-card`, bottom hairline. Logo `src/assets/logo.webp`
(84×28) left; menu `nav-link`s centred; language picker, Sign In and `btn-primary` CTA right; below `lg` a ☰ button
opens a full-screen menu. Dropdowns are native `<details data-dropdown>` — they work without JavaScript.
Mega menus (`<details data-dropdown data-mega>`): `[data-nav-content]` is `flex` with one
`nav-column w-76 p-3` column per group (light, inset divider between columns) — a small `text-xs text-muted` label, then items with a semibold `ink` title and a
one-line `text-sm text-pretty text-muted` description (keep it under ~35 characters); no intro panel, no icons
are taken over by `src/main.js` into one shared `nav-viewport` (attio.com style): the panel animates its
width/height (150ms, `ease-in-out-cubic`) and the contents slide ±200px with an 8px blur (200ms) in the direction
of travel. Give each menu's content a fixed width (`w-176`, `w-152` …) so the viewport can resize to it.
Copy the whole `<header>` from `index.html`.

Icons: Lucide-style stroke icons in an inline `<svg>` sprite at the top of `<body>`; use them with
`<svg class="size-4" aria-hidden="true"><use href="#i-name" /></svg>`. Add new icons to the sprite, never inline paths.

Product mockup: window `rounded-t-xl border border-b-0 border-line bg-card shadow-sm` with a
`h-10` title bar (three `size-2.5 rounded-full bg-line` dots + muted URL), sitting on `blueprint-grid`
and running into the section's bottom hairline. Use only real Pulse numbers in mockups.

## 6. Motion

Calm and functional, modelled on attio.com: elements settle into place as you scroll; nothing bounces,
spins or loops for decoration. All scroll effects are driven by `src/main.js` through classes and data attributes:

| Effect | How | Use for |
| --- | --- | --- |
| Fade-up on scroll | `reveal` (+ `delay-75` … `delay-1200` to stagger) | Headings, cards, rows, list items |
| Headline | the `h1` is one plain sentence with `reveal` (fades up as a whole); never split words into spans | Page `h1` |
| Growing bar | `reveal-bar` on the fill, real width as a fraction of the source numbers (`w-94/216`) | Progress, comparisons |
| Count-up | `data-count="94"` (+ `data-suffix="%"`), real number as the fallback text | Key metrics only |
| Typing | `data-type="text"` inside a `group` with `data-type-root`; reveal results with `group-data-typed:opacity-100` | Search / input demos |
| Product shelf | `data-shelf data-total="216" data-ready="94"` on a `grid grid-cols-18 gap-1` | The readiness visual |
| Marquee | `flex w-max animate-marquee motion-reduce:animate-none`, items duplicated with `aria-hidden="true"` | Attribute chips on the dark band |
| Scroll-spy | `data-spy="section-id"` on nav links | Sticky step navigation |
| Hero scroll zoom | `data-hero` on the section, `hero-fade` on the headline block, `hero-stage` + `data-hero-stage` on the visual area; `src/main.js` sets `--hero-p` 0 → 1 as the window scrolls up until it is centred in the screen below the header (attio.com style). The window sits near the top of the stage, 80px under the headline buttons (headline `pb-12` + stage `pt-8`). The headline fades out and lifts 2rem, the stage ends exactly at the bottom of the screen at focus (`hero-stage` bottom padding = (screen − header − window height) / 2, window height from `--hero-window-h` set by `src/main.js`; at least 5rem; plus 10px), so nothing below shows and no extra backdrop is left, and `hero-window` grows from its normal size (upright, no tilt) to +12% from `lg` (+4% below), centred on itself — but never beyond what fits below the header with 16px to spare (`--hero-zoom-fit`, set by `src/main.js`), so the step tabs are never hidden. If the window is taller than the screen, the effect stops with its top 16px under the header instead of centring it. The stage clips only sideways (`overflow-x-clip`) so the grown window is never cut at the top | The home hero only |
| Workflow demo | `data-demo` on the window: tabs `data-demo-tab` (each holds a `demo-timer`), captions `data-demo-caption`, steps `data-demo-step` (mark the first of each `data-active` in the HTML). A step lasts as long as `--animate-demo-timer` (6s); hover or scrolling away pauses it, clicking a tab jumps. `data-demo-count` counts up on each visit (optional `data-from` start value and `data-delay` in ms); `data-demo-grid` (`data-total/before/after`) draws the payoff grid. Steps follow thepulseapi.com: problem → audit → priority → repair → payoff, with its real numbers | The home hero only |
| Mega-menu switch | `nav-viewport` + `nav-content`, driven by `data-state` / `data-dir` from `src/main.js` | Header dropdowns only |

Timing tokens: `ease-out-soft` (default), `ease-emphasized` (bars), `ease-scan` (hero demo audit bars). Reveal = 700ms, bars = 1100ms,
hover = `transition-colors duration-200 ease-out-soft`. Keep the total stagger in one view under ~1.2s.

Rules:
- **Reduced motion is mandatory.** `reveal`/`reveal-bar` already switch off; every `animate-*` class needs `motion-reduce:animate-none`.
- Never put `reveal` on an element that also has `transition-*` classes (they override each other) — wrap it instead.
- Content must be readable without JavaScript: put the final value in the HTML (`data-count` elements contain the real number).
- Classes added from JavaScript must live in `src/*.js` (scanned by `@source "./*.js"`).

## 7. Interaction & accessibility

- Hover: colour/border change only (`hover:bg-primary-dark`, `hover:text-void`, `hover:border-ink`),
  `transition-colors duration-200 ease-out-soft`. No scale, lift or bounce on hover.
- Focus: keep the visible focus ring from `btn` (`outline-primary`). Never remove outlines.
- Disabled: `disabled` attribute (styles are built in).
- Text contrast ≥ WCAG AA. `muted` on white is the lightest allowed body text.
- Every icon-only button needs `aria-label`; decorative SVGs get `aria-hidden="true"`; generated visuals
  (`data-shelf`) need `role="img"` and an `aria-label` with the real numbers.
- Use semantic elements (`header`, `main`, `section`, `article`, `nav`, `table`, `ol/ul`).

## 8. Voice & tone — "The Honest Data Analyst"

Quietly confident, empirical, calm. Peer to a merchandising lead.

| Do | Don't |
| --- | --- |
| Concrete numbers and direct cause: "Fixing bottle volume on 42 SKUs unblocks filtered search." | Vague AI magic: "Revolutionary AI supercharges your catalogue!" |
| State confidence and limits: "Confidence 82%. Not enough data beyond rank #4." | Unfalsifiable guarantees: "100% infallible." |
| Prioritise: "Fix the top 3 attributes first." | Dump everything with no priority. |
| Calm, plain English. | Hype, jargon, emoji, exclamation marks. |

## 9. Never

- Gradients other than `bg-brand-gradient` and `hero-backdrop`; glassmorphism, neon/glow shadows, `shadow-lg`+ on light cards.
- Decorative looping animation (spinners, floating blobs, parallax); hover scale/lift effects.
- `signal` (Coral) more than once per view; `gap` for anything that isn't missing data.
- Colours outside the theme tokens; arbitrary `[…]` values or breakpoint font sizes in HTML (see §2, §3).
- Raw hex values or default Tailwind colours where a token exists.
- Monospace fonts, extra font families, icon fonts loaded from a CDN.
- Inline `style=""` or new `<style>` blocks in HTML — add to `src/input.css` instead.

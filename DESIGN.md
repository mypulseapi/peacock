# DESIGN.md — Pulse Design System (Electric Coral)

Source of truth for how every page and component in this project looks and reads.
Origin: Google Stitch project "Pulse Brand Guidelines System" → screen
"Pulse — Brand Guidelines (Electric Coral)". All tokens live in `src/input.css`.

Live reference: `components.html` shows every component below rendered with the real classes.

---

## 1. Principles

1. **Flat and typographic.** Matte, opaque fills. No gradients, no glassmorphism, no glow,
   no decorative illustration or stock imagery. Depth comes from 1px borders, spacing and `shadow-sm` only.
2. **Data first.** Visual interest comes from tables, ranked lists, scores and status badges —
   not decoration.
3. **Colour has a job.** Every colour below has one meaning. Never use a colour outside its role.
4. **Generous whitespace.** Sections breathe (`py-20`); dense data lives inside cards.

## 2. Colour tokens

Use the token class (`bg-coral`, `text-muted`, `border-line` …). **Never** write raw hex
(`bg-[#E11D48]`) or Tailwind default palettes for brand roles (`bg-red-600`, `text-slate-500`).

| Token | Hex | Role — and the only place it may be used |
| --- | --- | --- |
| `coral` | `#E11D48` | **Primary.** Primary CTAs, active filters, the **#1** ranked item. Never a background filler. Max one solid-coral CTA per view. |
| `coral-dark` | `#BE123C` | Hover / pressed state of coral. |
| `coral-light` | `#F43F5E` | Coral on dark (`void`) backgrounds. |
| `coral-tint` / `coral-line` | `#FFF1F2` / `#FECDD3` | Background / border of coral tags and badges. |
| `gap` | `#F59E0B` | **Missing data only** — dashed empty cells, missing attributes, catalogue leaks. Never for branding or general warnings in non-gap UI. |
| `gap-bg` / `gap-text` / `gap-border` | `#FFFBEB` / `#B45309` / `#D97706` | Fill / text / border for gap elements. |
| `gap-dark` | `#FBBF24` | Gap accent on dark backgrounds. |
| `void` | `#140B0E` | Headlines and dark sections/canvas. |
| `void-elevated` | `#241318` | Cards on top of a `void` section. |
| `ink` | `#1E293B` | Body text, table values. |
| `muted` | `#64748B` | Captions, labels, metadata, secondary text. |
| `surface-0` | `#FAFCFC` | Page background (set on `body`). |
| `surface-1` | `#F1F5F5` | Table headers, striped rows, wells, progress tracks. |
| `line` | `#E2E8F0` | All 1px borders and dividers. |
| `success` | `#059669` | Status: complete / ready. |
| `warning` | `#D97706` | Status: degraded / low confidence. |
| `critical` | `#DC2626` | Status: blocker / attribute missing completely. |

Status colours are **only** for audit status — never decorative.

Allowed exceptions: the Tailwind `rose-*` shades for text and borders **inside dark `void`
sections** (`text-rose-100`, `border-rose-950`), and `emerald/amber/red-50…200` for the
background/border of status badges (already wrapped in the `badge-*` classes).

## 3. Typography

Only two font families. **No monospace font in this project** (JetBrains Mono was removed on purpose).

| Class | Font | Use |
| --- | --- | --- |
| `font-display` | Plus Jakarta Sans 500–800 | Headings, big numbers, logo wordmark. `h1`–`h3` get it automatically. |
| `font-sans` (default) | Inter 400–600 | Everything else, including data. |

| Class | Size / line-height / weight | Use |
| --- | --- | --- |
| `text-h1` | 40px / 1.15 / 800 | One per page — the page title. May scale up on large screens (`lg:text-6xl`). |
| `text-h2` | 24px / 1.3 / 700 | Section headings. |
| `text-h3` | 18px / 1.4 / 600 | Card and component titles. |
| `text-body` | 14px / 1.6 | Paragraphs in cards. |
| `text-data` | 13px / 1.5 | Table cells, metrics, SKUs. |
| `text-xs` | 12px | Captions, eyebrows, badges. |

Rules:
- Numbers, SKUs, prices, percentages and any column of data → add **`tabular-nums`** so digits line up.
- Never use `font-mono`, `<code>` styling, or load another font. Do not add fonts to the Google Fonts link.
- Headlines are short, sentence case, with a full stop when they are a statement
  ("Know which product data to fix first.").

## 4. Layout & spacing

- Container: `mx-auto max-w-7xl px-6 lg:px-8`.
- Desktop grid: 12 columns (`lg:grid-cols-12`, children `lg:col-span-*`). Common splits: 7/5, 8/4, 5/7.
- Section rhythm: `py-20` between sections; alternate `bg-surface-0` and `bg-white` with `border-y border-line`.
  At most one dark (`bg-void`) band per page plus the final CTA.
- Inside cards: `p-6` (compact cards `p-4`/`p-5`), gaps `gap-4`–`gap-6`.
- Radius: `rounded-xl` cards, `rounded-lg` buttons and inner panels, `rounded` small chips, `rounded-full` badges and progress bars.
- Mobile first: every grid must collapse to one column below `md`/`lg`.

## 5. Components (defined in `src/input.css` — reuse, don't re-style)

| Class | What it is |
| --- | --- |
| `btn-primary` | Coral filled button. Main action. |
| `btn-secondary` | White, bordered. Supporting action next to a primary. |
| `btn-ghost` | No border. Low-emphasis utilities. |
| `btn-sm` | Size modifier — combine: `btn-primary btn-sm`. |
| `btn` | Base only — for one-off variants on dark backgrounds (`btn border border-rose-800 text-rose-100`). |
| `card` | White panel, `border-line`, `rounded-xl`, `p-6`, `shadow-sm`. |
| `card-dark` | `void` panel for scores and the final CTA. |
| `eyebrow` | Small uppercase label above titles. |
| `section-tag` | Numbered coral chip before an `h2` (`01`, `02` …). |
| `badge-coral` / `badge-success` / `badge-warning` / `badge-critical` | Pill labels. Status badges map to audit states only. |
| `missing-cell` / `missing-cell-dark` | **Signature motif**: dashed amber box marking missing data. |
| `blueprint-grid` / `blueprint-grid-dark` | Faint 24px grid background — hero and dark bands only. |

### Patterns

Section header (use for every `h2` section):
```html
<div class="mb-10 flex items-baseline gap-3 border-b border-line pb-4">
  <span class="section-tag">01</span>
  <h2 class="text-h2">Section heading.</h2>
</div>
```

Ranked list: only rank **#1** is solid `bg-coral` + `badge-coral`; lower ranks use tints
(`bg-coral/70`, `/50`, `/35`, `/20`) and neutral badges (`badge border-line text-muted`).

Data table: wrapper `overflow-x-auto rounded-xl border border-line bg-white shadow-sm`;
`thead` `bg-surface-1 text-xs text-muted`; rows `divide-y divide-line`; values `tabular-nums text-data`;
empty values → `missing-cell`, not-applicable → `text-muted` "n/a".

Score / metric: big number in `font-display font-extrabold`, unit or denominator in
`text-data text-muted tabular-nums` next to it.

## 6. Interaction & accessibility

- Hover: colour change only (`hover:bg-coral-dark`, `hover:text-coral`), `transition-colors duration-150`. No scale/bounce.
- Focus: keep the visible focus ring from `btn` (`outline-coral`). Never remove outlines.
- Disabled: `disabled` attribute (styles are built in).
- Text contrast ≥ WCAG AA. `muted` on white is the lightest allowed body text.
- Every icon-only button needs `aria-label`. Use semantic elements (`header`, `main`, `section`, `nav`, `table`, `ol/ul`).

## 7. Voice & tone — "The Honest Data Analyst"

Quietly confident, empirical, calm. Peer to a merchandising lead.

| Do | Don't |
| --- | --- |
| Concrete numbers and direct cause: "Fixing bottle volume on 42 SKUs unblocks filtered search." | Vague AI magic: "Revolutionary AI supercharges your catalogue!" |
| State confidence and limits: "Confidence 82%. Not enough data beyond rank #4." | Unfalsifiable guarantees: "100% infallible." |
| Prioritise: "Fix the top 3 attributes first." | Dump everything with no priority. |
| Calm, plain English. | Hype, jargon, emoji, exclamation marks. |

## 8. Never

- Gradients, glassmorphism, neon/glow shadows, `shadow-lg`+ on light cards.
- Coral as a background fill for large areas; amber for anything that isn't missing data.
- Raw hex values or default Tailwind colours where a token exists.
- Monospace fonts, extra font families, icon fonts loaded from a CDN.
- Inline `style=""` or new `<style>` blocks in HTML — add to `src/input.css` instead.

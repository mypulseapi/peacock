# Pulse — Brand Identity Guidelines v2.0 "Citrus"

**Brand:** Pulse (thepulseapi.com) · **Product:** Decision Audit
**Version:** 2.0 (proposed) · replaces the colour palette and logo of the current version (audit dated 14 Oct 2026)
**Kept as is:** fonts (Plus Jakarta Sans + Inter), the "Honest Data Analyst" voice, Lucide icons, the 4px spacing system, breakpoints.
**New:** colour palette, gradient, logo, visual motif, rules for the Missing state.

> **For Claude Code:** This file is the source of truth for every colour token. Section 12 maps the old tokens in `src/input.css` to the new ones. Every contrast ratio in this file was calculated with the WCAG formula, not estimated.

Status labels: **Proposed — needs approval** = strategic content not yet confirmed by an owner. **TBD** = no information yet.

---

## 1. Brand foundation

### 1.1 Brand idea

**Pulse makes a catalogue fresh again.** Missing product data is like fruit left out too long: still on the shelf, but nobody picks it. Pulse finds the gap that matters most and turns it into something shoppers can use to decide.

The visual system tells that story with two elements:
- **The Citrus band** (mint → lime → sun): data that is complete, alive and ready.
- **The dashed Coral cell**: a data gap. Coral sits deliberately *outside* the Citrus band, so the eye finds the gap immediately.

### 1.2 Brand strategy

| Element | Value | Status |
|---|---|---|
| Core promise | Know which product data to fix first. | Live on site, keep |
| Positioning | Pulse measures your product data against what shoppers actually decide on. Send one category export, get a ranked repair list back within 48 hours. | Live on site, keep |
| Mission | Help e-commerce teams know exactly which product data to fix first so shoppers can decide. | Proposed — needs approval |
| Vision | Every online catalogue has enough structured data for both people and AI shopping agents to choose the right product. | Proposed — needs approval |
| Values | Precision · Honesty about limits · Impact first · Respect for customer data | Proposed — needs approval |
| Personality | The Honest Data Analyst: quietly confident, evidence-based, a peer to a merchandising lead. v2 adds one trait: **bright and optimistic** — fixing data is doable, not a burden. | Keep + extend |
| Primary audience | 1. Merchandising leads · 2. E-commerce managers · 3. Budget approvers · 4. Engineering teams (Decision API only) | Proposed — needs approval |

### 1.3 Voice and tone

Keep the current voice: plain English, concrete numbers, state both confidence and limits, always prioritise. No hype, no jargon, no emoji, no exclamation marks.

Additions for screens that do not exist yet:

| Context | Write |
|---|---|
| Upload error | We couldn't read row 42: the price column is empty. Fix it and upload again. |
| Empty state | No audits yet. Upload one category as CSV or JSON to start. |
| Processing | Reading 216 products. This takes about a minute. |
| Result ready | Your audit is ready. Screen size fixes the most: 94 of 216 products. |
| Uncertainty | Rank 1 held in 12 of 12 runs. Ranks 2–4 vary between runs. |

---

## 2. Logo system

### 2.1 New logo

The current logo (gradient **P** coral → purple → blue, "ulse" in blue `#4542ed`) no longer belongs to the colour system and is **fully replaced**.

**Symbol "Citrus grid":** a 2×2 grid of slightly rounded squares, placed inside a Forest square:
- Top left: Mint · Top right: Lime · Bottom left: Sun
- Bottom right: **an empty cell with a dashed Coral outline** — the gap Pulse finds.

**Wordmark:** "Pulse" in Plus Jakarta Sans ExtraBold (800), Ink, letter-spacing −2%.

| Variant | Description | Use |
|---|---|---|
| Horizontal (default) | Symbol + wordmark | Website header, documents |
| Stacked | Symbol above wordmark | Square placements, slide covers |
| Symbol only | Symbol alone | Favicon, social avatar, app icon |
| Reversed | Wordmark in Paper, symbol unchanged | Ink or Forest backgrounds |
| One colour | All Ink (Coral cell becomes a dashed Ink outline) | One-colour print, engraving |

Wordmark contrast: Ink on Paper **16.25:1**; Paper on Ink **16.25:1**; Paper on Forest **11.74:1**. This fixes the weakness of the old logo (only 3.08:1 on dark backgrounds).

**Why the symbol sits on a Forest square:** Mint and Lime are very light; placed directly on white they wash out. The Forest background keeps the coloured cells clearly visible on any surface.

### 2.2 Size and clear space

- **x** = the side of one cell in the symbol.
- Minimum clear space: **1x** around the whole logo.
- Horizontal logo: at least **96px** wide (the current 84px header logo is too small for a logo with a symbol).
- Symbol: at least **24px**. At 16px (favicon), drop the dashes: the Coral cell becomes a solid outline.

### 2.3 Don't

Stretch, rotate, reorder the coloured cells, fill the Coral cell, place the symbol on white without its Forest square, add shadows or glows, redraw from a screenshot.

### 2.4 Files to export

`pulse_logo_horizontal_light_v2.svg`, `pulse_logo_horizontal_dark_v2.svg`, `pulse_logo_stacked_light_v2.svg`, `pulse_symbol_512_v2.png`, `pulse_symbol_compact_16_v2.svg`, `favicon.ico`, `apple-touch-icon.png` (180×180), `pulse_logo_mono_ink_v2.svg`. The master must be SVG; do not use WebP as the master.

---

## 3. Color standards

### 3.1 Brand palette

| Name | Hex | Role |
|---|---|---|
| **Forest** | `#0B3D2E` | Foundation colour: primary buttons, links, symbol background. Carries trust. |
| **Mint** | `#00C48C` | Start of the Citrus band. Decoration, charts, symbol. |
| **Lime** | `#C6F432` | Middle of the Citrus band. The strongest recognition colour; primary button in dark mode. |
| **Sun** | `#FFC83D` | End of the Citrus band. Decoration, charts, symbol. |
| **Coral** | `#FF6B57` | Reserved for data gaps (Missing). |
| **Ink** | `#10201A` | Text, headings, dark backgrounds. |
| **Paper** | `#FAFBF7` | Page background, white with a very slight green tint. |

**Suggested balance (not a rigid rule):** Paper and white dominate; Ink for text; Forest for actions; the Citrus band appears in large accents (hero, charts, social); Coral appears only where data is missing.

### 3.2 The Citrus band (signature gradient)

```css
--gradient-citrus: linear-gradient(112deg, #00C48C 0%, #C6F432 55%, #FFC83D 100%);
```

The 112° angle is kept from the old gradient for continuity.

**Signature form — "Citrus mosaic":** Stripe uses waves, Lovable uses a glow. Pulse renders its gradient as a **grid of squares** (each cell one step along the band), like a coloured data table. In the hero and on social images, place a few dashed Coral cells inside the grid. This is what keeps Pulse distinctive while using a multi-colour gradient.

**Text on the Citrus band:**

| Text colour | Mint | Lime | Sun | Conclusion |
|---|---:|---:|---:|---|
| Ink | 7.46 | 13.18 | 10.92 | Passes at every size, everywhere on the band |
| White | 2.26 | — | — | **Never** place white text on the Citrus band |

This is a major strength of the Citrus direction: Ink text is readable across the whole gradient.

### 3.3 Semantic tokens — light mode

| Token | Hex | Use |
|---|---|---|
| `ink` | `#10201A` | Main text, headings |
| `muted` | `#55625B` | Secondary text |
| `surface-0` | `#FAFBF7` | Page background (Paper) |
| `card` | `#FFFFFF` | Cards, panels, header |
| `surface-1` | `#F0F3EC` | Wells, progress tracks, table headers |
| `line` | `#E1E6DD` | Decorative hairlines |
| `line-control` | `#7D8981` | Input, checkbox, dropdown borders |
| `primary` | `#0B3D2E` | Primary buttons, links, active tabs, ranking bars |
| `primary-hover` | `#072A20` | Hover / pressed |
| `primary-tint` | `#E7ECEA` | Badge and chip backgrounds |
| `mint` / `lime` / `sun` | see 3.1 | Decoration, charts — **never as text on light backgrounds** |
| `gap` | `#FF6B57` | Dots, icons, large bars indicating a gap |
| `gap-fill` | `#FBDED7` | Missing cell background |
| `gap-strong` | `#B23A2A` | Dashed Missing cell border, "Missing" text |
| `success` / `success-bg` | `#0B6B47` / `#E5F7EE` | Complete, ready |
| `warning` / `warning-bg` | `#845300` / `#FFF6DB` | Low confidence, degraded |
| `critical` / `critical-bg` | `#A8102B` / `#FDECEE` | Blocking errors |

**Missing vs Critical:** Missing (Coral) is a gap to fill — a normal state of a catalogue. Critical (deep red) is an error that stops processing, such as a broken file. These two states never share a colour. The current version uses `critical` for the "Missing" flags in the hero demo; v2 moves those flags to the `gap` family.

**Primary vs Success:** both are green. Rule: buttons are always `primary`; success states always have a check icon and text, on a `success-bg` background. Never use the success colour for a button.

### 3.4 Semantic tokens — dark mode

| Token | Hex | Notes |
|---|---|---|
| `surface-0` | `#0C1611` | Page background |
| `card` | `#15221B` | Cards, panels |
| `ink` (main text) | `#F1F4EE` | |
| `muted` | `#A3AFA7` | |
| `primary` | `#C6F432` (Lime) | Primary buttons; button text uses `#0C1611` |
| `link` | `#2EE0A6` | Links on dark backgrounds |
| `gap` / `gap-strong` | `#FF6B57` | In dark mode, Coral works for both text and borders |
| `success` | `#5FE0A9` | |
| `warning` | `#FFC83D` | |
| `critical` | `#FF8A94` | |
| `line-control` | `#6B7A71` | |

### 3.5 Contrast check (WCAG 2.2 AA)

Normal text needs ≥ 4.5:1; large text and meaningful graphics need ≥ 3:1.

**Light mode**

| Pair | Ratio | Result |
|---|---:|---|
| ink / Paper · white · surface-1 | 16.25 · 16.89 · 15.07 | Pass |
| muted / Paper · white · surface-1 | 6.15 · 6.39 · 5.70 | Pass |
| primary / Paper | 11.74 | Pass |
| white / primary · primary-hover | 12.20 · 15.43 | Pass |
| primary / primary-tint | 10.22 | Pass |
| ink / gap-fill | 13.29 | Pass |
| gap-strong / gap-fill (dashed border, "Missing" text) | 4.68 | Pass |
| gap-strong / Paper | 5.72 | Pass |
| success / success-bg · white | 5.88 · 6.55 | Pass |
| warning / warning-bg · white | 6.05 · 6.52 | Pass |
| critical / critical-bg · white | 6.64 · 7.57 | Pass |
| white / critical | 7.57 | Pass |
| line-control / white · Paper | 3.64 · 3.50 | Pass (control borders) |
| line / white | 1.27 | Decorative only |
| Mint / Paper | 2.18 | Decorative only |
| Coral / Paper | 2.70 | Decorative only (dots, large bars) |

**Dark mode**

| Pair | Ratio | Result |
|---|---:|---|
| main text / background · card | 16.61 · 14.82 | Pass |
| muted / background · card | 8.12 · 7.24 | Pass |
| Lime / background | 14.39 | Pass |
| link `#2EE0A6` / background | 10.83 | Pass |
| Coral / background · card | 6.58 · 5.87 | Pass |
| success · warning · critical / background | 11.17 · 11.93 · 8.18 | Pass |
| line-control / background · card | 4.08 · 3.64 | Pass |

**All five failing pairs from the current audit are fixed:**

| Failure in current version | Old ratio | v2 fix | New ratio |
|---|---:|---|---:|
| muted on surface-1 | 4.33 | new `muted` `#55625B` | 5.70 |
| critical on critical-bg | 4.41 | new `critical` `#A8102B` | 6.64 |
| critical on striped Missing flags | 3.57 | Missing flags move to the `gap` family, stripes removed | 4.68 |
| warning on warning-bg | 3.07 | new `warning` `#845300` | 6.05 |
| warning on white | 3.19 | same as above | 6.52 |

---

## 4. Typography — unchanged

| Role | Font | Weights |
|---|---|---|
| Headings, large numbers, wordmark | **Plus Jakarta Sans** | 500–800 |
| Body, UI, numbers in tables | **Inter** (`tabular-nums` on for numbers) | 400–600 |

- No monospace font: keep the current decision; data uses Inter `tabular-nums`.
- Fallback: `ui-sans-serif, system-ui, sans-serif`.
- Both fonts are SIL OFL licensed.
- **Vietnamese:** when the Vietnamese version ships, load the `vietnamese` subset of both fonts and check ữ, ặ, ỗ, ẫ, ợ in every weight in use.

**Type scale** (keep current tokens, fix the items flagged by the audit):

| Style | Size | Line-height | Weight | Change |
|---|---|---|---|---|
| Display | 40 → 60px fluid | 1.05 | 800 | Keep |
| Headline | 36 → 48px fluid | 1.1 | 800 | Keep |
| Title | 30 → 36px fluid | 1.2 | 700 | Keep |
| Lead | 18px | 1.6 | 400 | Keep |
| Body | **16px** | 1.6 | 400 | Up from 14px |
| Data | **14px** | 1.5 | 400–600 | Up from 13px |
| Caption | **12px** | 1.4 | 500 | Drop 10px and 11px |

For Vietnamese, keep Display line-height at 1.1 or above so diacritics are not clipped.

---

## 5. Visual identity

### 5.1 Core motifs

| Motif | Description | Use |
|---|---|---|
| **Citrus mosaic** | Grid of squares coloured along the Citrus band | Hero, social images, slide covers, Open Graph image |
| **Missing cell** | `gap-fill` background, 1.5px dashed `gap-strong` border, "Missing" text with icon | Data tables, demo, anywhere data is missing |
| **Filled cell** | A Missing cell turning into a Citrus-coloured cell | Animation, before/after visuals |

### 5.2 Data cell states

| State | Background | Border | Content |
|---|---|---|---|
| Missing | `gap-fill` | 1.5px dashed `gap-strong` | Icon + "Missing" in `gap-strong`, weight 500 |
| Extracted (pulled by Pulse) | `card` | 1px solid `primary` | Value + "Extracted" label in `muted` |
| Filled | `card` | `line` | Plain value |

### 5.3 Imagery and icons

- No stock photos of people. Visuals are built from tables, grids and real data.
- The hero product demo must carry a small "Example data" label (flagged by the audit).
- Industry statistics must show source name, year and link.
- Icons: Lucide, 2px stroke, unchanged.

### 5.4 Motion

| Animation | Description | Duration |
|---|---|---|
| Cell fills in | Missing cell's dashed border turns solid, background turns Citrus | 320ms, ease-out |
| Ranking bars | Bars grow one by one, 60ms stagger; bar #1 is Forest, later bars progressively lighter | 280ms per bar |
| Number counter | Values like "94 / 216" count up from 0, once only | 600ms |
| Hover | Colour change | 150ms |

- Shorten scroll reveal from 700ms to 400ms; bars from 1100ms to 280ms per bar.
- Remove looping effects: drifting stripes on Missing flags, shimmer, decorative spinners. The category marquee may stay but must have a pause control.
- Every animation (including the blinking caret in the method section) must stop when `prefers-reduced-motion` is on.

---

## 6. Website and product UI

### 6.1 Layout

Keep: mobile-first, breakpoints 640/768/1024/1280px, 4px spacing, 1368px max width, no horizontal scroll. Radii unchanged (buttons 8px, controls 10px, cards 12px, app window 16px).

Fix: demo tabs and footer links need a touch target of at least 44×44px (currently 26px and 16–20px).

### 6.2 Components

| Component | v2 spec |
|---|---|
| Primary button | `primary` background, white text, Plus Jakarta Sans 700, 44px tall. Dark mode: Lime background, `#0C1611` text |
| Secondary button | 1px `line-control` border, `ink` text |
| Focus | 2px `primary` outline, 2px offset (dark mode: Lime) |
| Badge | `primary-tint` + `primary`; status badges use the `*-bg` + `*` pairs in 3.3 |
| Data table | `card` background, `line` rules, `surface-1` header, right-aligned `tabular-nums` numbers |
| Ranking bars | Rank #1 Forest; following ranks Mint → Lime → Sun in order |
| Input (new) | 44px tall, `line-control` border, focus as above, errors use `critical` + icon |

### 6.3 Homepage order

Keep the current structure; replace the hero backdrop with the Citrus mosaic:
Navigation → headline + CTA → product demo (labelled "Example data") → category strip → method → independent research (with source links) → data privacy → CTA → footer.

### 6.4 Technical additions (from the audit)

- Meta description, 1200×630 Open Graph image (Citrus mosaic + headline in Ink), favicon from the compact symbol, canonical, sitemap.
- When the Vietnamese version ships: add `hreflang` for `en` and `vi`.

---

## 7. Social media

- Avatar: symbol on Forest, centred, with enough safe area for circular crops.
- Post template: Paper or Citrus mosaic background; headline in Plus Jakarta Sans 800, Ink; one key number; small logo in a corner.
- Sizes: 1080×1080, 1080×1350, 1080×1920 (check current platform specs at export).

**Example:**
> **Headline:** The emptiest field isn't the one to fix first.
> **Supporting:** Fixing Processor touched 162 laptops and helped 6. Fixing Screen size touched 80 and helped 94.
> **Visual:** Two comparison bars: Processor in light Coral, Screen size in Forest; Paper background with a Citrus mosaic strip along the bottom edge.

---

## 8. Email, slides, documents

- Email: header with symbol + wordmark; buttons match the primary button; font fallback `Arial, sans-serif`; about 600px wide.
- Slides: cover uses the Citrus mosaic; content slides on Paper; charts use Forest for the main series, the Citrus band for secondary groups, Coral only for gaps.
- Audit report (PDF): cover → one-page summary → ranking table → list of products with gaps → appendix on method and uncertainty.

---

## 9. Accessibility and localisation

- Target WCAG 2.2 AA; every colour pair in section 3.5 passes.
- Never communicate state through colour alone: Missing always has an icon + text.
- Vietnamese: finish the translation before enabling the language switcher (both options currently link to `#`).
- Number formats: English `1,234.5`; Vietnamese `1.234,5`; ratios like "94 / 216" stay the same in both.

---

## 10. Assets and governance

```text
brand/
  01-logos/        (source/, svg/, png/, favicon/)
  02-colors-and-tokens/
  03-typography/
  04-motifs/       (citrus-mosaic, missing-cell)
  05-social-templates/
  06-email-and-documents/
  07-presentations/
  09-legal-and-licenses/
```

File naming: `pulse_asset_variant_theme_size_version.ext`. Brand owner and approval workflow: TBD.

---

## 11. QA checklist

- [ ] v2 logo exported in every variant in 2.4, favicon included
- [ ] No old colour tokens remain (Indigo, Violet, old Coral `#f7423b`, wordmark blue `#4542ed`)
- [ ] No white text on the Citrus band
- [ ] Missing flags use the `gap` family, not `critical`
- [ ] Body 16px, captions at least 12px
- [ ] No decorative looping animation; every animation stops with reduced motion
- [ ] Hero demo labelled "Example data"; industry stats linked to sources
- [ ] Meta description, OG image and favicon in place
- [ ] Touch targets ≥ 44px for demo tabs and key controls
- [ ] `pnpm build` and `pnpm lint:tw` both pass

---

## 12. Token migration table (for `src/input.css`)

The old palette is defined in six `--brand-*` variables, and role tokens are derived with `color-mix`. The fastest migration is to replace the six base variables, then **override the text tokens listed below directly** with the checked hex values, because `color-mix` does not guarantee contrast.

| Old variable | Old value | New variable | New value |
|---|---|---|---|
| `--brand-indigo` | `#3a08c6` | `--brand-forest` | `#0B3D2E` |
| `--brand-coral` | `#f7423b` | `--brand-coral` | `#FF6B57` (Missing only) |
| `--brand-violet` | `#7343f8` | `--brand-lime` | `#C6F432` |
| `--brand-mint` | `#51dfb3` | `--brand-mint` | `#00C48C` |
| — | — | `--brand-sun` | `#FFC83D` |
| `--brand-ink` | `#060914` | `--brand-ink` | `#10201A` |
| `--brand-mist` | `#f9f9f9` | `--brand-paper` | `#FAFBF7` |

| Role token | Old value | New value (fixed hex) |
|---|---|---|
| `primary` / `primary-dark` | `#3a08c6` / `#280492` | `#0B3D2E` / `#072A20` |
| `primary-tint` | `#eef0fd` | `#E7ECEA` |
| `primary-light` (on dark) | `#8d97ea` | `#C6F432` |
| `signal` / `signal-dark` | `#f7423b` / `#a82a25` | Removed. The #1 highlight uses `primary`; gaps use the `gap` family |
| `muted` | `#64748b` | `#55625B` |
| `surface-0` / `surface-1` | `#f9f9f9` / `#f1f5f5` | `#FAFBF7` / `#F0F3EC` |
| `line` | `#e2e8f0` | `#E1E6DD` |
| `gap` / gap text / gap cell | `#f59e0b` / `#b45309` / `#fffdf5` | `#FF6B57` / `#B23A2A` / `#FBDED7` |
| `success` (+bg) | `#275f56` (+`#eefcf6`) | `#0B6B47` (+`#E5F7EE`) |
| `warning` (+bg) | `#d97706` (+`#fffbeb`) | `#845300` (+`#FFF6DB`) |
| `critical` (+bg) | `#dc2626` (+`#fef2f2`) | `#A8102B` (+`#FDECEE`) |
| `void` (dark band) | `#060914` | `#0C1611` |

After migrating, update the colour and motion sections of `DESIGN.md` to match this file.

---

## 13. Decisions to approve

| Decision | Proposed value | Owner / date |
|---|---|---|
| Citrus palette | Section 3 | TBD |
| Citrus grid logo | Section 2 | TBD |
| Fonts | Plus Jakarta Sans + Inter (unchanged) | Agreed |
| Citrus mosaic motif | Section 5.1 | TBD |
| Mission, vision, values | Section 1.2 | TBD |
| Looping animation policy | Remove, except the marquee with a pause control | TBD |
| Tagline | Know which product data to fix first. | TBD |
| Brand owner | — | TBD |

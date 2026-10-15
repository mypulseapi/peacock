# Pulse — Brand Identity Guidelines v2.0 "Aurora"

**Brand:** Pulse (thepulseapi.com) · **Product:** Decision Audit
**Version:** 2.0 · replaces the v1 colour palette (Indigo `#3a08c6` / Coral `#f7423b` / Violet `#7343f8`, audit dated 14 Oct 2026)
**Adopted:** Aurora palette, 14 Oct 2026. The "Citrus" proposal (green palette, Citrus grid logo, Citrus mosaic motif) was reviewed on the site and **not adopted**.
**Kept as is:** the existing logo, the "Honest Data Analyst" voice, Lucide icons, the 4px spacing system, breakpoints, layout and motion.
**New:** colour palette and gradient, dark mode, rules for the Missing state, and one type family — Inter (Inter Display for headings) replaces Plus Jakarta Sans.

> **For Claude Code:** This file is the source of truth for every colour token. All values are implemented in `src/input.css` (COLOURS block). Every contrast ratio below was calculated with the WCAG 2.x formula, not estimated.

Status labels: **Proposed — needs approval** = strategic content not yet confirmed by an owner. **TBD** = no information yet.

---

## 1. Brand foundation

### 1.1 Visual idea

Two colour signals carry the brand:

- **The Aurora gradient** (Violet → Cyan → Coral): reserved for big brand moments. Indigo carries actions and trust everywhere else.
- **The amber gap**: a dashed amber cell marks missing data, so the eye finds the gap immediately. Gap amber is never used for anything else.

### 1.2 Brand strategy

| Element          | Value                                                                                                                                                                           | Status                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| Core promise     | Know which product data to fix first.                                                                                                                                           | Live on site, keep        |
| Positioning      | Pulse measures your product data against what shoppers actually decide on. Send one category export, get a ranked repair list back within 48 hours.                             | Live on site, keep        |
| Mission          | Help e-commerce teams know exactly which product data to fix first so shoppers can decide.                                                                                      | Proposed — needs approval |
| Vision           | Every online catalogue has enough structured data for both people and AI shopping agents to choose the right product.                                                           | Proposed — needs approval |
| Values           | Precision · Honesty about limits · Impact first · Respect for customer data                                                                                                     | Proposed — needs approval |
| Personality      | The Honest Data Analyst: quietly confident, evidence-based, a peer to a merchandising lead. v2 adds one trait: **bright and optimistic** — fixing data is doable, not a burden. | Keep + extend             |
| Primary audience | 1. Merchandising leads · 2. E-commerce managers · 3. Budget approvers · 4. Engineering teams (Decision API only)                                                                | Proposed — needs approval |

### 1.3 Voice and tone

Keep the current voice: plain English, concrete numbers, state both confidence and limits, always prioritise. No hype, no jargon, no emoji, no exclamation marks.

Additions for screens that do not exist yet:

| Context      | Write                                                                        |
| ------------ | ---------------------------------------------------------------------------- |
| Upload error | We couldn't read row 42: the price column is empty. Fix it and upload again. |
| Empty state  | No audits yet. Upload one category as CSV or JSON to start.                  |
| Processing   | Reading 216 products. This takes about a minute.                             |
| Result ready | Your audit is ready. Screen size fixes the most: 94 of 216 products.         |
| Uncertainty  | Rank 1 held in 12 of 12 runs. Ranks 2–4 vary between runs.                   |

---

## 2. Logo system

### 2.1 Logo — unchanged

The existing logo stays: a gradient **P** (coral-red `#e14251` → purple `#9d4199` → blue) followed by "ulse" in blue `#4542ed`. Its violet/blue tones match Aurora. Files (official, from thepulseapi.com): `src/assets/brand/logo.webp` (600×200 raster), shown 28px tall in the header and footer, and the reversed `logo-white.webp`, used automatically when the OS is in dark mode. The symbol (the gradient P in a circle) is the favicon: `favicon.ico` (16/32/48), `favicon-32.png`, `apple-touch-icon.png` (180, on Mist).

Logo contrast (decorative logos are exempt from WCAG contrast, recorded for awareness):

| Logo colour             | on Mist `#F7F8FC` | on white | on dark page / band `#0A1230` |
| ----------------------- | ----------------: | -------: | ----------------------------: |
| Wordmark blue `#4542ed` |              6.08 |     6.45 |                      **2.85** |
| P top `#e14251`         |              3.88 |     4.12 |                          4.47 |
| P middle `#9d4199`      |              5.42 |     5.75 |                          3.20 |

→ The logo works on light surfaces; in dark mode and on the dark band the wordmark is weak. A reversed (light) variant is needed — see open items.

### 2.2 Open items

| Item                                                                                              | Status                                                                                        |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| SVG master (no raster master)                                                                     | TBD                                                                                           |
| Symbol only (favicon, avatar), stacked, reversed (for dark mode / dark band), one-colour variants | Symbol (favicon) and reversed: done, from the official raster files. Stacked, one-colour: TBD |
| Clear space and minimum size rules                                                                | TBD                                                                                           |

### 2.3 Don't

Stretch, rotate, recolour, add shadows or glows, place on low-contrast backgrounds, redraw from a screenshot.

---

## 3. Color standards — Aurora

### 3.1 Brand colours

| Name       | Hex       | Use                                        |
| ---------- | --------- | ------------------------------------------ |
| **Indigo** | `#4F3DF0` | Primary: buttons, links, active states     |
| **Violet** | `#6E5BFF` | Gradient start, decoration                 |
| **Cyan**   | `#00C2FF` | Gradient middle, decoration, charts        |
| **Coral**  | `#FF7A59` | Gradient end, accent (decorative on light) |
| **Ink**    | `#0B1B3A` | Text, dark band                            |
| **Mist**   | `#F7F8FC` | Page background                            |

**Suggested balance (not a rigid rule):** Mist and white dominate; Ink for text; Indigo for actions; the gradient appears only in big brand moments; amber appears only where data is missing.

### 3.2 The Aurora gradient

```css
--gradient-brand: linear-gradient(
  112deg in oklch,
  #6e5bff 0%,
  #00c2ff 50%,
  #ff7a59 100%
);
```

The 112° angle is kept from the v1 gradient for continuity. The gradient is blended **in OKLCH** (decided 14 Oct 2026): in the default sRGB blend, Cyan → Coral passes through a muddy grey; in OKLCH it passes through lilac and pink and stays vivid.

| Text on the gradient | Violet | Cyan | Coral | Rule                                          |
| -------------------- | -----: | ---: | ----: | --------------------------------------------- |
| White                |   4.56 | 2.07 |  2.57 | **Never** put white text on the gradient      |
| Ink                  |   3.74 | 8.25 |  6.64 | Large text only (lowest point 3.74 on violet) |

### 3.3 Semantic tokens — light mode

| Token                      | Hex                   | Use                                                            |
| -------------------------- | --------------------- | -------------------------------------------------------------- |
| `ink`                      | `#0B1B3A`             | Main text, headings                                            |
| `muted`                    | `#56607A`             | Secondary text                                                 |
| `surface-0`                | `#F7F8FC`             | Page background (Mist)                                         |
| `card`                     | `#FFFFFF`             | Cards, panels, header                                          |
| `surface-1`                | `#EEF0F7`             | Wells, progress tracks, table headers                          |
| `line`                     | `#E3E6EF`             | Decorative hairlines                                           |
| `line-control`             | `#868DA3`             | Input, checkbox, dropdown borders                              |
| `primary`                  | `#4F3DF0`             | Primary buttons, links, active states                          |
| `primary-hover`            | `#3A2BC4`             | Hover / pressed                                                |
| `primary-tint`             | `#EFEDFE`             | Badge and chip backgrounds                                     |
| `on-primary`               | `#FFFFFF`             | Text on primary fills                                          |
| `link`                     | `#4F3DF0`             | Links                                                          |
| `accent`                   | `#FF7A59`             | Coral highlight (fills, bars, rings) — **decorative on light** |
| `accent-text`              | `#B8431A`             | Coral-family text on light                                     |
| `gap`                      | `#FFB020`             | Missing: dots, bars — **decorative on light**                  |
| `gap-fill`                 | `#FFEFD2`             | Missing cell background                                        |
| `gap-strong`               | `#8F5B00`             | Missing text and dashed border                                 |
| `success` / `success-bg`   | `#0E7A55` / `#E6F7F0` | Complete, ready                                                |
| `warning` / `warning-bg`   | `#8A5300` / `#FFF6DB` | Low confidence, degraded                                       |
| `critical` / `critical-bg` | `#B4152B` / `#FDECEE` | Blocking errors                                                |
| `void` (dark band)         | `#0A1230`             | Dark band background, both themes                              |
| `void-muted`               | `#A9B3CC`             | Captions on the dark band                                      |
| `void-accent`              | `#A79CFF`             | Accent text on the dark band                                   |

### 3.4 Semantic tokens — dark mode

The site follows the visitor's OS setting (`prefers-color-scheme`); `<html data-theme="light|dark">` overrides it.

| Token                    | Hex       | Notes                                         |
| ------------------------ | --------- | --------------------------------------------- |
| `surface-0`              | `#0A1230` | Page background                               |
| `card`                   | `#121B3D` | Cards, panels                                 |
| `ink` (main text)        | `#EEF0F7` |                                               |
| `muted`                  | `#A9B3CC` |                                               |
| `primary`                | `#A79CFF` | Button background; button text uses `#0A1230` |
| `link`                   | `#A79CFF` |                                               |
| `accent` / `accent-text` | `#FF7A59` | Coral text is allowed in dark mode            |
| `cyan`                   | `#00C2FF` | Text allowed in dark mode                     |
| `gap` / `gap-strong`     | `#FFB020` | Text and border allowed in dark mode          |
| `success`                | `#4FD1A1` |                                               |
| `warning`                | `#FFC857` |                                               |
| `critical`               | `#FF8A94` |                                               |
| `line-control`           | `#626C91` |                                               |

**Derived dark tokens** (not in the original palette proposal; chosen and contrast-checked for the site):

| Token                                                                                          | Hex                                            | Check                                                                   |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------- |
| `surface-1`                                                                                    | `#172046`                                      | muted 7.52 · line-control 3.06                                          |
| `line`                                                                                         | `#252F57`                                      | decorative (1.30 on card)                                               |
| `primary-hover`                                                                                | `#BDB5FF`                                      | button text 9.82                                                        |
| `primary-tint`                                                                                 | `#211F55`                                      | primary 6.35 · text 13.25                                               |
| `gap-fill`                                                                                     | `#3A2A10`                                      | gap-strong 7.56 · text 12.14                                            |
| `success-bg`                                                                                   | `#0F3330`                                      | success 7.14                                                            |
| `warning-bg`                                                                                   | `#3A2E10`                                      | warning 8.65                                                            |
| `critical-bg`                                                                                  | `#3D1A2B`                                      | critical 6.74                                                           |
| `accent-tint`                                                                                  | light `#FFEFE9` · dark `#3A2219`               | accent badge background                                                 |
| `void-elevated` / `void-line` / `void-line-strong` / `void-text`                               | `#121B3D` / `#252F57` / `#626C91` / `#EEF0F7`  | cards, rules, text on the dark band (muted on elevated 8.01, rule 3.57) |
| Badge borders (`primary-line`, `accent-line`, `success-line`, `warning-line`, `critical-line`) | `color-mix()` of the status colour with `card` | decorative; follow the theme automatically                              |

### 3.5 Rules

- **Never place white text on the gradient.** Ink on the gradient only as large text.
- On light backgrounds, Cyan, Coral (`accent`) and gap amber are **decorative only**. For text use `accent-text` or `gap-strong`.
- On the dark band and in dark mode, Cyan, Coral, amber and `#A79CFF` are all fine as text.
- **Missing ≠ Critical:** Missing cells use the gap family; critical is only for blocking errors. Never communicate state with colour alone (icon + text).
  **Exception (decided 14 Oct 2026):** the hero demo's problem step keeps its red `critical` styling (Missing flags and the "357 fields are missing information" alert), as on the current site — and the "How it works" scenes use the same red Missing flag (`missing-flag`, with the warning icon) so Missing looks the same everywhere on the home page.
- **Primary vs Success:** buttons are always `primary`; success states always carry a check icon and text on `success-bg`. Never use the success colour for a button.
- Text tokens are fixed hex values — never `color-mix()` — so every ratio below stays true.

### 3.6 Contrast check (WCAG 2.2 AA)

Normal text needs ≥ 4.5:1; large text, control borders and meaningful graphics need ≥ 3:1.

**Light mode**

| Pair                                 |                 Ratio |
| ------------------------------------ | --------------------: |
| ink / surface-0 · card · surface-1   | 16.06 · 17.04 · 14.97 |
| muted / surface-0 · card · surface-1 |    5.91 · 6.27 · 5.51 |
| primary / surface-0 · card           |           6.07 · 6.45 |
| on-primary / primary · primary-hover |           6.45 · 9.04 |
| primary / primary-tint               |                  5.59 |
| accent-text / card · surface-0       |           5.45 · 5.13 |
| gap-strong / gap-fill · card         |           5.06 · 5.73 |
| ink / gap-fill                       |                 15.04 |
| success / success-bg · card          |           4.81 · 5.34 |
| warning / warning-bg · card          |           5.86 · 6.33 |
| critical / critical-bg · card        |           5.97 · 6.81 |
| line-control / card · surface-0      |           3.31 · 3.11 |
| white / dark band                    |                 18.39 |
| dark band muted / dark band          |                  8.76 |
| dark band accent / dark band         |                  7.74 |
| Cyan · Coral · amber / dark band     |   8.90 · 7.16 · 10.05 |

Decorative only (do not use as text on light): Coral / card 2.57 · Cyan / card 2.07 · amber / surface-0 1.72 · line / card 1.25.

**Dark mode** (background · card)

| Token                 |         Ratio |
| --------------------- | ------------: |
| ink                   | 16.15 · 14.76 |
| muted                 |   8.76 · 8.01 |
| primary               |   7.74 · 7.07 |
| on-primary on primary |          7.74 |
| accent                |   7.16 · 6.54 |
| cyan                  |   8.90 · 8.13 |
| gap                   |  10.05 · 9.19 |
| success               |   9.60 · 8.77 |
| warning               | 11.95 · 10.92 |
| critical              |   8.16 · 7.45 |
| line-control          |   3.57 · 3.26 |

**All five pairs that failed in the 14 Oct audit pass in Aurora:**

| Failure in v1                     | Old ratio |                                                                  Aurora |
| --------------------------------- | --------: | ----------------------------------------------------------------------: |
| muted on surface-1                |      4.33 |                                                                    5.51 |
| critical on critical-bg           |      4.41 |                                                                    5.97 |
| critical on striped Missing flags |      3.57 | `critical` `#B4152B` on the hatch — re-check when the hero demo changes |
| warning on warning-bg             |      3.07 |                                                                    5.86 |
| warning on white                  |      3.19 |                                                                    6.33 |

**Known remaining failures on the site (existing opacity reductions, not palette values):** faded step numbers on the hero demo tabs (2.62 light / 3.73 dark; 3.20 / 3.64 on the active red tab) and inactive scroll-spy links in the method section (2.55 / 3.85).

---

## 4. Typography — Inter (Inter Display for headings)

One family, two optical designs. Adopted 14 Oct 2026; replaces Plus Jakarta Sans. Retuned 15 Oct 2026 to match linear.app / attio.com.

| Role                        | Font                                                                              | Weights |
| --------------------------- | --------------------------------------------------------------------------------- | ------- |
| Headings, large numbers     | **Inter Display** — Inter's optical size 32, applied automatically at 32px and up | 550–600 |
| Body, UI, numbers in tables | **Inter** text design (`tabular-nums` on for numbers)                             | 400–600 |

- Self-hosted: Inter 4.1 variable (`src/assets/fonts/InterVariable.woff2`, wght 100–900, opsz 14–32), trimmed to Latin, Latin Extended and Vietnamese. Not Google Fonts: its copy has the stylistic sets stripped. With the default `font-optical-sizing: auto`, browsers use the Display design for large text and the text design for small text — no extra file.
- Stylistic set 03 on everywhere (round quotes and commas), as linear.app and attio.com.
- Letter-spacing: body −0.011em; headings −0.022em (display, hero) → −0.02em (headline, title, h1) → −0.015em (h2) → −0.01em (h3). Big numbers semibold, never bold/extrabold.
- No monospace font: data uses Inter `tabular-nums`.
- Fallback: `ui-sans-serif, system-ui, sans-serif`.
- SIL OFL licensed.
- **Vietnamese: supported.** The self-hosted file keeps the Vietnamese ranges (Ă, Đ, Ơ, Ư, all tone marks, ₫); checked 15 Oct 2026 that every Vietnamese letter is in the font.

**Type scale** (implemented):

| Style    | Size            | Line-height | Weight  |
| -------- | --------------- | ----------- | ------- |
| Display  | 40 → 60px fluid | 1           | 600     |
| Headline | 36 → 48px fluid | 1.05        | 600     |
| Title    | 30 → 36px fluid | 1.1         | 550     |
| Lead     | 18px            | 1.6         | 400     |
| Body     | 16px            | 1.6         | 400     |
| Data     | 14px            | 1.5         | 400–600 |
| Caption  | 12px            | 1.4         | 500     |

For Vietnamese, keep Display line-height at 1.1 or above so diacritics are not clipped.

---

## 5. Visual identity

### 5.1 Core motifs

| Motif               | Description                                                          | Use                                                                                                                                                                        |
| ------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Aurora gradient** | Violet → Cyan → Coral at 112°                                        | Big brand moments only (hero or closing CTA backgrounds, social, Open Graph image); never behind small text. Used blurred as the coloured shadow behind the home hero demo |
| **Missing cell**    | `gap-fill` background, dashed amber border, "Missing" text with icon | Data tables, anywhere data is missing                                                                                                                                      |

### 5.2 Data cell states

| State   | Background | Border             | Content                                               |
| ------- | ---------- | ------------------ | ----------------------------------------------------- |
| Missing | `gap-fill` | 1.5px dashed amber | "Missing" in `gap-strong` (+ icon where space allows) |
| Filled  | `card`     | `line`             | Plain value                                           |

### 5.3 Imagery and icons

- No stock photos of people. Visuals are built from tables, grids and real data.
- The hero product demo carries a small "Example data" label in its window title bar, and a pause button (WCAG 2.2.2). Industry stats show source name, year and a link.
- Industry statistics must show source name, year and link — TBD (separate task).
- Icons: Lucide, 2px stroke, unchanged.

### 5.4 Motion

Unchanged from the current site (reveal, bars, count-up, workflow demo; the hero scroll zoom was removed with the two-column hero, 15 Oct 2026). Every animation must respect `prefers-reduced-motion`. Open items from the audit: the typing caret does not stop with reduced motion; the looping demo effects (spinner, shimmer, drifting stripes) need a policy decision.

---

## 6. Website and product UI

### 6.1 Layout

Keep: mobile-first, breakpoints 640/768/1024/1280px, 4px spacing, 1368px max width, no horizontal scroll. Radii: buttons 8px, controls 10px, cards 12px, app window 16px.

Touch targets: buttons are at least 44px tall; demo tabs, header links, the logo and the language button get an invisible 44×44px tap area (`hit-area`). Open: footer links are 24px tall (they pass WCAG 2.2 AA 2.5.8, 24px with spacing, but not 44px).

### 6.2 Components

| Component        | Spec                                                                                                      |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| Primary button   | `primary` background, `on-primary` text. Dark mode: `#A79CFF` background, `#0A1230` text                  |
| Secondary button | 1px `line` border, `ink` text                                                                             |
| Focus            | 2px `primary` outline, 2px offset                                                                         |
| Badge            | `primary-tint` + `primary-hover` text; status badges use the `*-bg` + `*` pairs in 3.3                    |
| #1 highlight     | `accent` (Coral) ring/bar with `accent-text` labels; following ranks use the accent at decreasing opacity |
| Data table       | `card` background, `line` rules, `surface-1` header, `tabular-nums` numbers                               |
| Input (future)   | 44px tall, `line-control` border, focus as above, errors use `critical` + icon                            |

### 6.3 Homepage order

Unchanged: Navigation → headline + CTA → product demo → category strip → method → independent research (dark band) → data privacy → CTA → footer.

### 6.4 Technical additions (from the audit, open)

- Done 15 Oct 2026: favicon and apple-touch icon.
- Postponed (15 Oct 2026, to be handled later): meta description, Open Graph image and tags, Twitter card, canonical, `sitemap.xml`, `robots.txt`.
- When the Vietnamese version ships: add `hreflang` for `en` and `vi`.

---

## 7. Social media

- Avatar: the logo's **P**, centred, with enough safe area for circular crops (needs the symbol-only file, see 2.2).
- Post template: Mist background or the Aurora gradient; headline in Inter Display 800, Ink (large text only on the gradient); one key number; small logo in a corner.
- Sizes: 1080×1080, 1080×1350, 1080×1920 (check current platform specs at export).

**Example:**

> **Headline:** The emptiest field isn't the one to fix first.
> **Supporting:** Fixing Processor touched 162 laptops and helped 6. Fixing Screen size touched 80 and helped 94.
> **Visual:** Two comparison bars: Processor in gap amber, Screen size in Indigo; Mist background with an Aurora gradient strip along the bottom edge.

---

## 8. Email, slides, documents

- Email: header with the logo; buttons match the primary button; font fallback `Arial, sans-serif`; about 600px wide.
- Slides: cover uses the Aurora gradient; content slides on Mist; charts use Indigo for the main series, Violet/Cyan/Coral for secondary groups, amber only for gaps.
- Audit report (PDF): cover → one-page summary → ranking table → list of products with gaps → appendix on method and uncertainty.

---

## 9. Accessibility and localisation

- Target WCAG 2.2 AA; every colour pair in section 3.6 passes.
- Never communicate state through colour alone: Missing always has an icon or text.
- Vietnamese: finish the translation before enabling the option. Until then the switcher lists English only (Tiếng Việt is commented out in the header).
- Number formats: English `1,234.5`; Vietnamese `1.234,5`; ratios like "94 / 216" stay the same in both.

---

## 10. Assets and governance

```text
brand/
  01-logos/        (source/, svg/, png/, favicon/)
  02-colors-and-tokens/
  03-typography/
  04-motifs/       (aurora-gradient, missing-cell)
  05-social-templates/
  06-email-and-documents/
  07-presentations/
  09-legal-and-licenses/
```

File naming: `pulse_asset_variant_theme_size_version.ext`. Brand owner and approval workflow: TBD.

---

## 11. QA checklist

- [x] Aurora tokens implemented in light and dark (`src/input.css`), values match section 3
- [x] No v1 colour values remain (`#3a08c6`, `#7343f8`, `#f7423b`, `#51dfb3`, `#060914`, `#f9f9f9`) and no Citrus values
- [ ] No white text on the gradient; Ink only as large text
- [ ] Missing uses the gap family (exception: hero demo problem step, see 3.5)
- [x] Body 16px, captions at least 12px (tokens)
- [ ] Remaining contrast failures fixed (opacity reductions, see 3.6)
- [ ] Logo: SVG master (reversed variant for dark mode: done)
- [x] Hero demo labelled "Example data"; industry stats linked to sources
- [ ] Meta description, OG image and tags (postponed; favicon in place)
- [x] Touch targets ≥ 44px for demo tabs and key controls (footer links still 24px)
- [x] `pnpm build` and `pnpm lint:tw` both pass

---

## 12. Token migration (v1 → Aurora)

| Role token                                    | v1 value                          | Aurora (light / dark)                                          |
| --------------------------------------------- | --------------------------------- | -------------------------------------------------------------- |
| `primary` / hover                             | `#3a08c6` / `#280492`             | `#4F3DF0` / `#3A2BC4` · dark `#A79CFF` / `#BDB5FF`             |
| `primary-tint`                                | `#eef0fd`                         | `#EFEDFE` · dark `#211F55`                                     |
| `signal` / `signal-dark` (coral #1 highlight) | `#f7423b` / `#a82a25`             | `accent` `#FF7A59` / `accent-text` `#B8431A` (dark: `#FF7A59`) |
| `accent` (violet)                             | `#7343f8`                         | Removed; Violet is a gradient stop only                        |
| `ink`                                         | `#060914`                         | `#0B1B3A` · dark `#EEF0F7`                                     |
| `muted`                                       | `#64748b`                         | `#56607A` · dark `#A9B3CC`                                     |
| `surface-0` / `surface-1`                     | `#f9f9f9` / `#f1f5f5`             | `#F7F8FC` / `#EEF0F7` · dark `#0A1230` / `#172046`             |
| `line`                                        | `#e2e8f0`                         | `#E3E6EF` · dark `#252F57`                                     |
| `gap` / gap text / gap cell                   | `#f59e0b` / `#b45309` / `#fffdf5` | `#FFB020` / `gap-strong` `#8F5B00` / `gap-fill` `#FFEFD2`      |
| `success` (+bg)                               | `#275f56` (+`#eefcf6`)            | `#0E7A55` (+`#E6F7F0`)                                         |
| `warning` (+bg)                               | `#d97706` (+`#fffbeb`)            | `#8A5300` (+`#FFF6DB`)                                         |
| `critical` (+bg)                              | `#dc2626` (+`#fef2f2`)            | `#B4152B` (+`#FDECEE`)                                         |
| `void` (dark band)                            | `#060914`                         | `#0A1230`                                                      |
| Brand gradient                                | Coral → Indigo, 112.4°            | Violet → Cyan → Coral, 112°                                    |

The temporary aliases (`primary-dark`, `primary-light`, `signal*`, `gap-bg`, `gap-cell`, `gap-border`, `gap-text`, `gap-dark`, `gap-text-dark`, `window-*`, `text-micro`) were removed on 15 Oct 2026; `text-micro` became the real token `text-label`.

---

## 13. Decisions

| Decision                                        | Value                                                                              | Owner / date        |
| ----------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------- |
| Colour palette                                  | **Aurora** (section 3)                                                             | Adopted 14 Oct 2026 |
| Citrus palette, Citrus grid logo, Citrus mosaic | Not adopted                                                                        | 14 Oct 2026         |
| Logo                                            | Existing logo kept; SVG master and variants TBD                                    | TBD                 |
| Fonts                                           | Inter (Inter Display for headings); replaces Plus Jakarta Sans                     | 14 Oct 2026         |
| Dark mode                                       | Follows the OS setting; no visible toggle                                          | 14 Oct 2026         |
| Hero demo problem step + How it works           | Keep the red `missing-flag` / `critical` styling (exception to Missing ≠ Critical) | 14 Oct 2026         |
| Mission, vision, values                         | Section 1.2                                                                        | TBD                 |
| Looping animation policy                        | —                                                                                  | TBD                 |
| Tagline                                         | Know which product data to fix first.                                              | TBD                 |
| Brand owner                                     | —                                                                                  | TBD                 |

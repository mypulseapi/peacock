# Pulse — Brand Guidelines "Signal" (final)

Oct 16, 2026 · @Henry · Final, Oct 19, 2026: typography changed from Inter to Geist + Geist Mono (§8); dark surfaces changed from navy to cool black `#0B0D12`, new §5.1 dark mode reference and chart tokens; reversed logo in every dark context (§7). Oct 30, 2026: titles set in Mona Sans, the owner's Option C, made final (§8).

**This is the final, current guideline** and the single source of truth for brand colour and type. `DESIGN.md` applies it to the website, and every value here lives as a token in `src/input.css`. Earlier versions (v2 Aurora, the v4 dark-mode draft) were removed on 19 Oct 2026; they remain in git history.

## 1. What changes in v3, and why

v3 replaces the Aurora palette with **Signal**, built from your three favourites and tuned so each one does its job better: Pulse Blue `#2552FF`, Signal Red `#F84840` and Sky Blue `#3990E2`. Everything else in v2 that already works stays: the voice, Lucide icons, the 4px grid, layout and motion. (The final version later replaced Inter with Geist + Geist Mono and set titles in Mona Sans, §8.)

**How the final colours were chosen.** I searched every colour within a small distance of your originals (OKLCH, calculated in Python) and kept the one that fixed the most problems while still looking like your choice.

| Your colour | Final                    | Change                                                    | What it fixes                                                                                                                                                                                             |
| ----------- | ------------------------ | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `#0766FF`   | **Pulse Blue `#2552FF`** | A touch deeper, leaning slightly toward the logo's indigo | White text 4.82 → 5.63; now passes as text on every light surface (4.24 → 4.94 on `surface-1`), so links and buttons share one blue. Moves away from Facebook's `#0866FF` and closer to the logo wordmark |
| `#F84840`   | **Signal Red `#F84840`** | None                                                      | Already the best red here. The nearest reds that pass 4.5 with white (e.g. `#E42A29`) look noticeably duller and still fail on Mist (4.24). Red is used for graphics, so it stays vivid                   |
| `#377BE8`   | **Sky Blue `#3990E2`**   | Slightly lighter and more azure                           | Your original sat too close to the main blue to tell apart. The difference to Pulse Blue more than doubles (OKLab distance 0.070 → 0.162)                                                                 |

Three reasons this palette is the right final choice:

- **It matches the logo you already have.** The P runs coral-red → purple → blue. A Red → Blue gradient blended in OKLCH passes through exactly that pink and purple.
- **It brings back your brand equity.** Signal Red is almost identical to the v1 Coral `#F7423B`.
- **It gives each colour one job.** Pulse is about one idea: _know which product data to fix first_.

| Colour               | Job              | Says to the user                                                   |
| -------------------- | ---------------- | ------------------------------------------------------------------ |
| Pulse Blue `#2552FF` | Action and trust | "Do this." Buttons, links, the main data series                    |
| Signal Red `#F84840` | Priority         | "Fix this first." The #1 field, the key number, the heartbeat line |
| Gap Amber `#FFB020`  | Missing data     | "Nothing recorded here." Missing cells only                        |

Short version for the team: **Blue acts. Red points. Amber reveals.**

Even after the shift, Pulse Blue lives in the same family as Facebook's blue, so it never appears alone in large brand areas; it always pairs with Signal Red or the Signal gradient (rules in section 6).

## 2. Brand foundation

The strategy from v2 stays; the website already proves it. Items still marked _Proposed_ need one owner to sign them off.

| Element          | Value                                                                                                                                                                                   | Status             |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Core promise     | Know which product data to fix first.                                                                                                                                                   | Live on site, keep |
| Hero line        | Know when your catalogue cannot answer the question.                                                                                                                                    | Live on site, keep |
| Positioning      | Pulse measures your product data against what shoppers actually decide on. Send one category export, get a ranked repair list back within 48 hours. Not a PIM, and it replaces nothing. | Live on site, keep |
| Mission          | Help e-commerce teams know exactly which product data to fix first so shoppers can decide.                                                                                              | Proposed           |
| Vision           | Every online catalogue has enough structured data for both people and AI shopping agents to choose the right product.                                                                   | Proposed           |
| Values           | Precision · Honesty about limits · Impact first · Respect for customer data                                                                                                             | Proposed           |
| Primary audience | Merchandising leads · E-commerce managers · Budget approvers · Engineering teams (Decision API)                                                                                         | Proposed           |

**Brand name in text:** always "Pulse" (capital P only). The site still writes "Why PULSE" in one heading; change it to "Why Pulse".

**Brand idea — the pulse.** A pulse is a steady signal that tells you what needs attention. Pulse Blue is the calm, steady line; Signal Red is the beat that stands out. This replaces Aurora's "northern lights" idea, which had no link to the product or the name.

**Personality — the Honest Data Analyst.** Quietly confident, evidence-based, a peer to a merchandising lead, bright and optimistic about the fix. Red adds energy; the voice stays calm so the brand never sounds alarmist.

**Voice rules (unchanged).** Plain English, concrete numbers, state both confidence and limits, always prioritise. No hype, no jargon, no emoji, no exclamation marks. The site already does this well: "Screen size came top in all 12 runs; positions two to four moved, and we would rather say so."

| Context      | Write                                                                        |
| ------------ | ---------------------------------------------------------------------------- |
| Upload error | We couldn't read row 42: the price column is empty. Fix it and upload again. |
| Empty state  | No audits yet. Upload one category as CSV or JSON to start.                  |
| Processing   | Reading 216 products. This takes about a minute.                             |
| Result ready | Your audit is ready. Screen size fixes the most: 94 of 216 products.         |
| Uncertainty  | Rank 1 held in 12 of 12 runs. Ranks 2–4 vary between runs.                   |

## 3. Colour palette — Signal

Three brand colours, two derived shades for hover and red text, and the neutrals kept from v2.

**Brand colours**

| Name           | Hex       | OKLCH           | Role                                                                                   |
| -------------- | --------- | --------------- | -------------------------------------------------------------------------------------- |
| **Pulse Blue** | `#2552FF` | 0.534 0.258 266 | Primary: buttons, links, active states, main chart series, gradient end, logo wordmark |
| **Signal Red** | `#F84840` | 0.655 0.214 27  | Priority: the #1 highlight, key numbers, the pulse line, gradient start                |
| **Sky Blue**   | `#3990E2` | 0.640 0.148 250 | Supporting blue: illustrations, icon accents, info states, focus ring, calm gradient   |

**Derived shades**

| Name          | Hex       | Why it exists                                                                |
| ------------- | --------- | ---------------------------------------------------------------------------- |
| **Deep Blue** | `#1D43D9` | Button hover and pressed (white 7.35)                                        |
| **Red Text**  | `#C8261F` | Red text on light backgrounds. Signal Red on white is 3.50, Red Text is 5.60 |

**Neutrals and states** (kept from v2, already contrast-checked)

| Name      | Hex       | Role                                                                                 |
| --------- | --------- | ------------------------------------------------------------------------------------ |
| Ink       | `#0B1B3A` | Text, headings                                                                       |
| Muted     | `#56607A` | Secondary text                                                                       |
| Mist      | `#F7F8FC` | Page background                                                                      |
| White     | `#FFFFFF` | Cards, panels, header                                                                |
| Night     | `#0B0D12` | Dark band and dark-mode page: a cool black with a trace of blue (was navy `#0A1230`) |
| Gap Amber | `#FFB020` | Missing data only                                                                    |

**Balance (a guide, not a rule):** about 70% Mist and White, 15% Ink text, 10% Pulse Blue, 5% Signal Red. Red works because it is rare: one red thing per screen is the target, never more than two.

**Sky Blue vs Pulse Blue.** Sky is lighter and more azure, so the two read as different colours, but never use them as the only two series in a chart. Sky is the softer companion: illustrations, icons, the info badge and the focus ring.

## 4. The Signal gradient

Signal Red → Pulse Blue, 112°, blended in OKLCH. It follows the same path as the logo's P, so the gradient and the logo belong together.

```css
--gradient-signal: linear-gradient(112deg in oklch, #f84840 0%, #2552ff 100%);
--gradient-calm: linear-gradient(112deg in oklch, #3990e2 0%, #2552ff 100%);
/* fallback for browsers without OKLCH interpolation */
--gradient-signal-fallback: linear-gradient(
  112deg,
  #f84840 0%,
  #e7318a 25%,
  #c134c6 50%,
  #893ff2 75%,
  #2552ff 100%
);
```

In OKLCH the hue takes the short way round, through pink and violet. In plain sRGB the middle turns a dull purple-grey, so always write `in oklch`.

Colours along the Signal gradient and text on them (WCAG ratios, calculated):

| Position | Colour    | White text | Ink text |
| -------- | --------- | ---------: | -------: |
| 0%       | `#F84840` |       3.50 |     4.86 |
| 25%      | `#E7318A` |       4.04 |     4.22 |
| 50%      | `#C134C6` |       4.59 |     3.71 |
| 75%      | `#893FF2` |       5.18 |     3.29 |
| 100%     | `#2552FF` |       5.63 |     3.03 |

**Rule:** the lowest point for white is 3.50, so **white text on the gradient is allowed as large text only** (24px+, or 18.5px+ bold). Headlines, big numbers and the reversed logo work; body text and small labels never go on the gradient. The calm gradient follows the same rule (white 3.35 at the Sky end).

| Gradient            | Use                                                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Signal (Red → Blue) | Big brand moments: hero or closing CTA band, social posts, Open Graph image, slide covers, the blurred glow behind the hero demo |
| Calm (Sky → Blue)   | Product screens where red would look like an error: onboarding headers, empty-state illustrations, progress bars                 |

## 5. Semantic tokens

Light values: only the brand-colour tokens change; neutrals, Gap and status tokens keep their v2 values. Dark values: the final version moves every dark surface, line and neutral text from navy to cool black (§5.1). Dark mode follows the OS setting, and `<html data-theme>` overrides it.

| Token                                       | Light                             | Dark                              | Use                                                                                              |
| ------------------------------------------- | --------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------ |
| `primary`                                   | `#2552FF`                         | `#80A7FF`                         | Primary button fill, active tab, selected state                                                  |
| `primary-hover`                             | `#1D43D9`                         | `#93BBFF`                         | Hover and pressed                                                                                |
| `on-primary`                                | `#FFFFFF`                         | `#0B0D12`                         | Text on primary fills                                                                            |
| `link`                                      | `#2552FF`                         | `#80A7FF`                         | Text links (same as primary; passes on every surface)                                            |
| `primary-tint`                              | `#EAF2FF`                         | `#142140`                         | Badge and chip backgrounds; text on it uses `primary-hover` (light) or `primary` (dark)          |
| `primary-line`                              | `#CBDDFF`                         | `#293349`                         | Chip and badge border (decorative; derived: 22% `primary` in `card`, OKLab)                      |
| `signal`                                    | `#F84840`                         | `#F84840`                         | #1 highlight: ring, bar, dot, pulse line (graphic only on light)                                 |
| `signal-text`                               | `#C8261F`                         | `#FF6B63`                         | Red text, e.g. the "#1" label or a key number                                                    |
| `signal-tint`                               | `#FFECEB`                         | `#2E1517`                         | Background behind the #1 row or badge                                                            |
| `signal-line`                               | `#FFC5BC`                         | `#5D2D2E`                         | #1 badge border (decorative; derived: 35% `signal` in `card`, OKLab)                             |
| `sky`                                       | `#3990E2`                         | `#7DB8F2`                         | Illustrations, icon accents, info badge                                                          |
| `focus`                                     | `#3990E2`                         | `#93BBFF`                         | 2px focus outline, 2px offset                                                                    |
| `ink` / `muted`                             | `#0B1B3A` / `#56607A`             | `#EEF0F5` / `#A3A9B8`             | Text, secondary text                                                                             |
| `surface-0` / `card` / `surface-1`          | `#F7F8FC` / `#FFFFFF` / `#EEF0F7` | `#0B0D12` / `#14171F` / `#1B1F29` | Page, cards, raised wells                                                                        |
| `line` / `line-control`                     | `#E3E6EF` / `#868DA3`             | `#2A2F3B` / `#5F6676`             | Dividers, control borders                                                                        |
| `gap` / `gap-fill` / `gap-strong`           | `#FFB020` / `#FFEFD2` / `#8F5B00` | `#FFB020` / `#2E2410` / `#FFB020` | Missing only                                                                                     |
| `success` / `warning` / `critical` (+`-bg`) | see 5.1                           | see 5.1                           | Status states                                                                                    |
| `void` (dark band)                          | `#0B0D12`                         | `#0B0D12`                         | Dark band in both themes                                                                         |
| `void-accent`                               | `#80A7FF`                         | `#80A7FF`                         | Accent text on the dark band                                                                     |
| `chart-*`                                   | see 5.1                           | see 5.1                           | Chart series: `chart-main`, `chart-second`, `chart-baseline`, `chart-highlight`, `chart-missing` |

**Removed:** `accent` / `accent-text` (Coral `#FF7A59` / `#B8431A`) become `signal` / `signal-text`; `cyan` becomes `sky`. Violet `#6E5BFF` and Cyan `#00C2FF` are gone; violet survives only as the natural middle of the gradient.

### 5.1 Dark mode reference

Dark mode follows the visitor's OS setting (`prefers-color-scheme`), and `<html data-theme="light|dark">` overrides it. Dark surfaces are a cool black (`#0B0D12`), not navy: decided 16 Oct 2026, because navy read as "blue background" and competed with Pulse Blue. The dark band (`void`) uses the same black in both themes, so the band and dark mode look like one system. The brand colours themselves are unchanged. All ratios are calculated with the WCAG 2.x formula.

**Status colours**

| Token                      | Light                 | Dark                  | Dark ratio (page · card · own bg) |
| -------------------------- | --------------------- | --------------------- | --------------------------------: |
| `success` / `success-bg`   | `#0E7A55` / `#E6F7F0` | `#4FD1A1` / `#0F2A21` |               10.15 · 9.36 · 7.99 |
| `warning` / `warning-bg`   | `#8A5300` / `#FFF6DB` | `#FFC857` / `#2E2610` |              12.63 · 11.65 · 9.74 |
| `critical` / `critical-bg` | `#B4152B` / `#FDECEE` | `#FF8A94` / `#331519` |                8.62 · 7.95 · 7.38 |

**Dark band and dark surfaces**

| Token              | Value     | Use                                 |                               Ratio |
| ------------------ | --------- | ----------------------------------- | ----------------------------------: |
| `void`             | `#0B0D12` | Dark band, dark-mode page           |                                   — |
| `void-elevated`    | `#14171F` | Cards and panels on the band        |                                   — |
| `surface-1` (dark) | `#1B1F29` | Raised wells, table headers         |                                   — |
| `void-line`        | `#2A2F3B` | Dividers, table rules, card borders |                          decorative |
| `void-line-strong` | `#5F6676` | Control borders (buttons, inputs)   |   3.38 on `void` · 3.11 on elevated |
| `void-text`        | `#EEF0F5` | Text on the band                    | 17.05 on `void` · 15.71 on elevated |
| `void-muted`       | `#A3A9B8` | Secondary text on the band          |   8.26 on `void` · 7.61 on elevated |
| `void-accent`      | `#80A7FF` | Accent text, links, labels          |                      8.23 on `void` |

**Chart colours**

Pulse Blue `#2552FF` as a chart mark is 3.45 on the dark page but only 2.93 on a raised dark surface, below the 3:1 graphics need, so charts switch series colours in dark mode.

| Series                                   | Light     | Dark      | Dark ratio (page · card · surface-1) |
| ---------------------------------------- | --------- | --------- | -----------------------------------: |
| Main (`chart-main`)                      | `#2552FF` | `#80A7FF` |                   8.23 · 7.58 · 6.97 |
| Second (`chart-second`)                  | `#893FF2` | `#B18CFF` |                   7.46 · 6.88 · 6.33 |
| Comparison / baseline (`chart-baseline`) | `#868DA3` | `#868DA3` |                   5.88 · 5.42 · 4.98 |
| Highlight, #1 only (`chart-highlight`)   | `#F84840` | `#F84840` |                   5.55 · 5.11 · 4.70 |
| Missing (`chart-missing`)                | `#FFB020` | `#FFB020` |                  10.63 · 9.80 · 9.01 |

**Gradient and logo in dark mode**

- The Signal gradient keeps the same colours in both themes. White text on it stays large-text only (lowest point 3.50).
- The logo uses the reversed variant in dark mode and on the dark band: gradient P, white wordmark. On the website this follows both the OS setting and `data-theme` (header, hero demo and footer; see §7).

**Two reds, kept apart**

Red Text (`signal-text`, "fix this first") and `critical` (errors) are close in both themes: OKLab distance 0.052 in light (`#C8261F` vs `#B4152B`) and 0.073 in dark (`#FF6B63` vs `#FF8A94`); about 0.1 reads as clearly different. Colour alone cannot separate them, so:

- Errors always carry an error icon plus a word ("Error", "Couldn't upload").
- The #1 priority always carries the priority ring and a rank number.
- Never place the two side by side in the same component.

## 6. Colour rules and contrast

**Rules**

1. **One primary button colour: Pulse Blue.** Signal Red is never a button fill. White on `#F84840` is 3.50:1, and a red button reads as "delete".
2. **Red means priority, not error.** Red marks the one thing to fix first. Errors use `critical` `#B4152B` and always carry an icon plus a word ("Error", "Couldn't upload"), so the two are never confused.
3. **Amber means missing, everywhere.** v3 removes the v2 exception: the hero demo's Missing flags turn amber, and the field ranked #1 (Screen size) gets the red ring. That is the brand story playing out in the product demo.
4. **On light surfaces, Signal Red, Sky Blue and Gap Amber are graphics only.** For text use `signal-text`, `link` or `gap-strong`. In dark mode and on the dark band they are fine as text.
5. **Never blue alone in big brand areas.** Social posts, ads, the OG image and slide covers always include Signal Red or the Signal gradient, so Pulse is not mistaken for Facebook in a feed.
6. **White on the gradient: large text only.** Never body text.
7. **Never state through colour alone.** Missing, priority and errors always add an icon or a word.

**Contrast check** (WCAG 2.x formula, calculated in Python; normal text needs 4.5, large text and graphics 3.0)

| Pair                                             |              Ratio | Result                       |
| ------------------------------------------------ | -----------------: | ---------------------------- |
| White on Pulse Blue (button)                     |               5.63 | Pass, text                   |
| White on Deep Blue (hover)                       |               7.35 | Pass, text                   |
| Pulse Blue link on White · Mist · surface-1      | 5.63 · 5.31 · 4.94 | Pass, text                   |
| Pulse Blue · Deep Blue on primary-tint `#EAF2FF` |        5.00 · 6.53 | Pass, text                   |
| Red Text `#C8261F` on White · Mist               |        5.60 · 5.27 | Pass, text                   |
| Red Text on signal-tint `#FFECEB`                |               4.92 | Pass, text                   |
| Signal Red on White                              |               3.50 | Graphics and large text only |
| Sky Blue on White · Mist (focus ring, icons)     |        3.35 · 3.16 | Pass, graphics only          |
| Ink · Muted on White                             |       17.04 · 6.27 | Pass, text                   |
| Dark: `#80A7FF` on page · card                   |        8.23 · 7.58 | Pass, text                   |
| Dark: page text `#0B0D12` on `#80A7FF` button    |               8.23 | Pass, text                   |
| Dark: page text on hover `#93BBFF`               |               9.99 | Pass, text                   |
| Dark: `#80A7FF` on tint `#142140`                |               6.73 | Pass, text                   |
| Dark: `#FF6B63` on page · card                   |        6.97 · 6.43 | Pass, text                   |
| Dark: `#FF6B63` on tint `#2E1517`                |               6.10 | Pass, text                   |
| Dark: Signal Red on page                         |               5.55 | Pass, text                   |
| Dark: Sky `#7DB8F2` on page                      |               9.26 | Pass, text                   |
| Dark: focus `#93BBFF` on page                    |               9.99 | Pass                         |
| Dark: Pulse Blue on page                         |               3.45 | Graphics only                |
| White on dark band                               |              19.43 | Pass, text                   |

Light ratios for neutrals, Gap and status tokens are unchanged from v2 (section 3.6 of the v2 guide, in git history); every dark ratio is in §5.1 and this table. The v2 opacity failures (faded step numbers, inactive scroll-spy links) are fixed (QA, §11).

**Soft washes** (worst point, `muted` text, light · dark): hero background at rest 4.57 · 6.26; soft gradient 4.66 · 5.97; How it works card wash (6% Pulse Blue) 5.78 · 7.07. Dark band gradient at its brightest (Sky glow): white 13.88, `void-muted` 5.90. All pass AA.

## 7. Logo

Keep the logo's shape; retune its two colours to Signal. The change is small enough that visitors will not notice a "new logo", only a tidier one.

**Done 16 Oct 2026.** No vector original existed, so the SVG master was traced from the official 600×200 raster (`logo.webp`): the gradient disc, the white P and the wordmark were traced as separate silhouettes and match the raster within 0.35px. Only the colours changed. Masters in `src/assets/brand/`: `logo.svg`, `logo-white.svg`, `logo-mono-ink.svg`, `logo-mono-white.svg`, `symbol.svg`; the site's `logo.webp`, `logo-white.webp`, `favicon.ico` (16/32/48), `favicon-32.png` and `apple-touch-icon.png` (180, on Mist) are rendered from them. SVG blends gradients in sRGB, so the P's gradient lists the OKLCH stops from §4. Old and new side by side: `docs/brand/logo-compare.png`. If the designer's original vector turns up, recolour that instead and re-render the same files.

| Part                            | Before                                                      | v3 (done)                                                         | Why                                                       |
| ------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------- |
| P gradient                      | `#F3423E` → `#9E4197` → `#4841E9`, top to bottom (measured) | Signal gradient `#F84840` → `#2552FF`, top to bottom, OKLCH stops | Logo, gradient and palette become one system              |
| Wordmark "ulse" (light)         | `#4641EF` (indigo, measured)                                | Pulse Blue `#2552FF` (5.63 on white)                              | A small step: Pulse Blue already leans toward this indigo |
| Wordmark (dark mode, dark band) | Off-white `#F1F0FF` (`logo-white.webp`)                     | White `#FFFFFF` (19.43 on Night `#0B0D12`)                        | Pulse Blue on Night is only 3.45                          |
| Symbol (favicon, avatar)        | Gradient P in a circle                                      | Same, Signal gradient                                             | Matches social and OG image                               |

**"s" and "e" remade (27 Oct 2026, owner's request, option C1 of four the owner compared on the live header).** The trace was uneven: the "s" was condensed (65 wide, only 2.4 times its stem, against 3.6 for the "e") and light, its top terminal was cut level with its counter so the two read as one flat slab, the "e" crossbar was 20 thick against 25 for every other horizontal, and every edge carried trace wobble. Redrawing the "s" at its traced width was tried three ways and its counters always closed into slots, so the "s" is now 76 wide: built with an elliptical pen (stems 29, horizontals 25), superelliptic bowls, and level terminal faces 30 in from the top and bottom. The "e" is redrawn with the pen measured from the "u" (stems 30.5, horizontals 25), its bar at the original 21° and 26 thick, its terminal face level at 159.3. The P, "u" and "l" are untouched. To keep the 600×200 canvas, so that nothing that places the logo changes, the "e" moved right 11 and the whole drawing is scaled by 0.979 and centred, baked into the coordinates. All letters are filled outlines (no strokes, transforms or clip paths), so the files edit and recolour cleanly in Figma or Illustrator. `brand/logo.png` (600×200, the logo search engines and job listings read from `schema.ts` and the careers pages) was re-exported from the same master. Website only: the rainbow apps and the handbook keep their own logo files. The masters now live on the CDN under `assets/brand/` (the `src/assets/brand/` folder above is gone).

**On the website (19 Oct 2026):** the logo is two images, the full-colour one and the reversed one; whichever matches the theme shows (OS dark mode or `<html data-theme="dark">`, and the dark band), in the header, the hero demo and the footer. A `<picture>` with `prefers-color-scheme` alone is not enough, because it ignores `data-theme`.

**Variants to produce (from one SVG master):** full colour on light · reversed (white wordmark) on dark and on the gradient · symbol only · one-colour Ink · one-colour White.

**Clear space:** at least the height of the P's bowl on every side. **Minimum size:** 24px tall on screen, 8mm in print; the symbol alone from 16px.

**Don't:** stretch, rotate, recolour outside the variants above, add shadows or glows, place the full-colour logo on the gradient, or redraw it from a screenshot.

## 8. Typography — Mona Sans titles, Geist + Geist Mono (final)

**Titles are Mona Sans** (GitHub, SIL OFL), semi-expanded: the owner's Option C, set on the website on 26 Oct 2026 and made final on 30 Oct 2026. It gives the four title sizes a wider, more confident voice while everything else stays Geist. It is self-hosted in Latin, Latin Extended and Vietnamese, cut to the range the titles use (weight 500–700, width 100–115%).

Geist replaces Inter. It was chosen on 19 Oct 2026 from three pairings rendered with real Pulse components (the laptop audit table, the ranked list, the "94 → 31" stat) in English and Vietnamese. Geist stays neutral enough to let the colour carry the brand; Geist Mono gives the data its own clear voice. Both are open source (SIL OFL), self-hosted, cover every Vietnamese letter for the coming `vi` site, and have tabular figures.

| Role                                   | Font                                 | Weights |
| -------------------------------------- | ------------------------------------ | ------- |
| Titles: hero, display, headline, title | Mona Sans, 112% width (title 108%)   | 600–620 |
| Smaller headings, big numbers          | Geist                                | 500–600 |
| Body, UI, labels, numbers in sentences | Geist, `tabular-nums` on for numbers | 400–600 |
| Data: table values, numeric readouts   | Geist Mono (fixed-width digits)      | 400–600 |

Geist Mono is only for data: the values in tables and readouts such as bit values. Never for headings, prose or labels. Product names in tables and the Missing flag stay in Geist.

| Style    | Size            | Line-height | Weight  | Font       |
| -------- | --------------- | ----------- | ------- | ---------- |
| Hero     | 32 → 54px fluid | 1.1         | 620     | Mona Sans  |
| Display  | 40 → 60px fluid | 1.1         | 620     | Mona Sans  |
| Headline | 36 → 48px fluid | 1.12        | 620     | Mona Sans  |
| Title    | 28 → 36px fluid | 1.18        | 600     | Mona Sans  |
| Lead     | 18px            | 1.6         | 400     | Geist      |
| Body     | 16px            | 1.6         | 400     | Geist      |
| Data     | 14px            | 1.5         | 400–600 | Geist Mono |
| Caption  | 12px            | 1.4         | 500     | Geist      |

The Vietnamese home hero is capped at 50px so its phrases fit the column beside the demo. Big numbers set beside a title size stay Geist.

**Headlines and titles never end with a full stop** (decided 19 Oct 2026): "Know which product data to fix first", not "…first.". A full stop between two sentences in one heading stays.

One new rule for colour in type: **one red word or number per headline, at most.** The key number in a stat ("**94** of 216") may use `signal-text`; the rest of the headline stays Ink. Letter-spacing and the Vietnamese line-height rule (1.1 or above) are unchanged from v2. Fallbacks are metric-matched Arial (Geist) and Courier New (Geist Mono), so lines do not re-wrap when the fonts load; Mona Sans falls back to Geist, so a slow load swaps one grotesque for another. Inter's stylistic set 03 no longer applies.

## 9. Visual identity, UI and charts

**Motifs**

| Motif                   | What it looks like                                                                 | Where                                                                                       |
| ----------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **Signal gradient**     | Red → Blue, 112°                                                                   | Hero or closing CTA band, social, OG image, slide covers, blurred glow behind the hero demo |
| **Pulse line** (new)    | A thin Pulse Blue line with one Signal Red peak, like a heartbeat trace            | Section dividers, loading state, under the readiness number, email header. One peak only    |
| **Priority ring** (new) | 2px Signal Red ring + "#1" in `signal-text`                                        | The top-ranked field or row in any audit view                                               |
| **Missing cell**        | `gap-fill` background, 1.5px dashed amber border, "Missing" in `gap-strong` + icon | Every place data is missing, including the hero demo                                        |

**Components**

| Component          | Spec                                                                                                           |
| ------------------ | -------------------------------------------------------------------------------------------------------------- |
| Primary button     | `primary` fill, `on-primary` text, 8px radius, 44px tall; hover `primary-hover`                                |
| Secondary button   | 1px `line-control` border, `ink` text, card fill                                                               |
| Destructive button | `critical` fill, white text, always with a confirm step                                                        |
| Link               | `link` colour, underline on hover                                                                              |
| Focus              | 2px `focus` outline, 2px offset                                                                                |
| Badge              | `primary-tint` + `primary-hover` text; priority badge `signal-tint` + `signal-text`                            |
| Data table         | `card` fill, `line` rules, `surface-1` header, `tabular-nums`; #1 row gets `signal-tint` and the priority ring |
| Announcement bar   | Night `#0B0D12` with white text and a `#80A7FF` link (replaces any coloured bar)                               |

**Chart colours**

| Series                      | Token             | Light                                | Dark      |    Ratio on white |
| --------------------------- | ----------------- | ------------------------------------ | --------- | ----------------: |
| Main series                 | `chart-main`      | Pulse Blue `#2552FF`                 | `#80A7FF` |              5.63 |
| Second series               | `chart-second`    | Violet `#893FF2` (gradient 75% stop) | `#B18CFF` |              5.18 |
| Comparison / baseline       | `chart-baseline`  | Slate `#868DA3`                      | same      |              3.31 |
| Highlight (the #1 bar only) | `chart-highlight` | Signal Red `#F84840`                 | same      |              3.50 |
| Missing                     | `chart-missing`   | Gap Amber `#FFB020` with hatch       | same      | graphic, labelled |

Charts always use the `chart-*` tokens, never `primary`, `signal` or a hard-coded colour, so they switch correctly in dark mode (dark ratios in §5.1). Every series keeps a direct text label.

Example from the site: in "The emptiest field is usually the wrong one to fix", _Fix the emptiest field_ (162 touched, 6 helped) is Slate, and _Fix the deciding field_ (80 touched, 94 helped) is Signal Red with a direct label.

**Imagery and icons** stay as v2: no stock photos of people, visuals built from tables and real data, "Example data" label on demos, Lucide icons with 2px stroke. Icons take `ink` or `muted`; a single icon may take Sky Blue for emphasis.

## 10. Social, email, slides and documents

**Social (LinkedIn, Facebook, GitHub)**

- Avatar: the symbol (gradient P) centred, safe area for circular crops. On Facebook the gradient makes Pulse stand out from the blue interface around it.
- Post template A, "one number": Mist background, headline in Geist 600 Ink, the key number in Red Text, a Pulse line along the bottom, small logo in a corner.
- Post template B, "brand moment": Signal gradient background, white headline (large text only), reversed logo.
- Sizes: 1080×1080, 1080×1350, 1080×1920; LinkedIn and Facebook cover images as each platform currently specifies.

> **Headline:** The emptiest field isn't the one to fix first. **Supporting:** Fixing Processor touched 162 laptops and helped 6. Fixing Screen size touched 80 and helped 94. **Visual:** Two bars on Mist: Processor in Slate, Screen size in Signal Red with the priority ring.

**Open Graph image** (1200×630): Signal gradient on the left third, Mist on the rest, headline "Know which product data to fix first." in Ink.

**Email:** logo header, Pulse line divider, buttons match the primary button, about 600px wide, font fallback `Arial, sans-serif`.

**Slides:** cover on the Signal gradient; content slides on Mist; charts follow section 9. One red element per slide.

**Audit report (PDF):** cover with the Signal gradient band → one-page summary with the readiness number in Red Text → ranking table with the #1 row highlighted → products with gaps (amber cells) → appendix on method and uncertainty.

## 11. Migration, QA and decisions

**Token migration (Aurora → Signal)** — update the COLOURS block in `src/input.css`.

| Token                                                                                     | Aurora light / dark                           | Signal light / dark                            |
| ----------------------------------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------- |
| `primary`                                                                                 | `#4F3DF0` / `#A79CFF`                         | `#2552FF` / `#80A7FF`                          |
| `primary-hover`                                                                           | `#3A2BC4` / `#BDB5FF`                         | `#1D43D9` / `#93BBFF`                          |
| `primary-tint`                                                                            | `#EFEDFE` / `#211F55`                         | `#EAF2FF` / `#142140`                          |
| `link`                                                                                    | `#4F3DF0` / `#A79CFF`                         | `#2552FF` / `#80A7FF`                          |
| `on-primary`                                                                              | `#FFFFFF` / `#0A1230`                         | `#FFFFFF` / `#0B0D12`                          |
| `accent` → `signal`                                                                       | `#FF7A59`                                     | `#F84840`                                      |
| `accent-text` → `signal-text`                                                             | `#B8431A` / `#FF7A59`                         | `#C8261F` / `#FF6B63`                          |
| `accent-tint` → `signal-tint`                                                             | `#FFEFE9` / `#3A2219`                         | `#FFECEB` / `#2E1517`                          |
| `cyan` → `sky`                                                                            | `#00C2FF`                                     | `#3990E2` / `#7DB8F2`                          |
| `focus` (new)                                                                             | uses `primary`                                | `#3990E2` / `#93BBFF`                          |
| `void-accent`                                                                             | `#A79CFF`                                     | `#80A7FF`                                      |
| Dark surfaces: `surface-0` / `card` / `surface-1`, `void` / `void-elevated`               | `#0A1230` / `#121B3D` / `#172046` (navy)      | `#0B0D12` / `#14171F` / `#1B1F29` (cool black) |
| Dark lines and text: `line` / `line-control`, `ink` / `muted`                             | `#252F57` / `#626C91`, `#EEF0F7` / `#A9B3CC`  | `#2A2F3B` / `#5F6676`, `#EEF0F5` / `#A3A9B8`   |
| Dark status and gap backgrounds: `success-bg` / `warning-bg` / `critical-bg` / `gap-fill` | `#0F3330` / `#3A2E10` / `#3D1A2B` / `#3A2A10` | `#0F2A21` / `#2E2610` / `#331519` / `#2E2410`  |
| Brand gradient                                                                            | Violet → Cyan → Coral                         | Signal Red → Pulse Blue, 112°, OKLCH           |

**QA checklist**

- [x] Signal tokens in `src/input.css`, light and dark, match section 5 (contrast script: all 24 §6 pairs match, 16 Oct 2026)
- [x] No Aurora values left (`#4F3DF0`, `#3A2BC4`, `#6E5BFF`, `#00C2FF`, `#FF7A59`, `#B8431A`, `#A79CFF`, `#BDB5FF`)
- [x] Update the v2 check that banned `#f7423b`: v1 Coral returns as Signal Red `#F84840` (no automated check existed in the repo; nothing left to update)
- [ ] No red buttons; no blue-only social or OG images (no red buttons on the site — done; `src/assets/brand/og-image.png` uses the Signal gradient, but the `og:image` tags are not added yet)
- [x] Hero demo Missing flags switched to amber; #1 field has the priority ring
- [x] White text on the gradient only at large sizes (no text sits on the gradient today)
- [x] "Why PULSE" heading changed to "Why Pulse" (the heading reads "Why ecommerce brands should choose Pulse"; other "PULSE" mentions in body copy are unchanged)
- [x] SVG logo master with the Signal gradient and Pulse Blue wordmark (traced from the raster, see §7)
- [x] Fix the faded demo step numbers and inactive scroll-spy links (still below 4.5) — measured 16 Oct 2026: both are `muted` with no opacity (step numbers 5.91 light / 8.76 dark, step links 8.76; the scroll-spy method section no longer exists)
- [x] Final dark tokens match §5.1: contrast script, all 59 pairs in §5.1 and §6 match within ±0.01 (19 Oct 2026)
- [x] No navy left: no hard-coded `#0A1230` / `#121B3D` / `#172046` in the site or tokens (only in history: the migration table and Night's "was" note)
- [x] Chart series use `chart-*` tokens on every page (home, Decision Audit, `components.html`, the payoff grid in `src/main.js`)
- [x] Reversed logo in every dark context, OS or `data-theme`, footer included
- [x] Two reds: every error carries the error icon and a word; every #1 carries the ring and its rank number; no component shows both

**Decisions**

| Decision                             | Value                                                                        | Status                         |
| ------------------------------------ | ---------------------------------------------------------------------------- | ------------------------------ |
| Colour palette                       | Signal: `#2552FF`, `#F84840`, `#3990E2`                                      | Approved by owner, 16 Oct 2026 |
| Aurora palette                       | Replaced                                                                     | 16 Oct 2026                    |
| Missing in the hero demo             | Amber, no red exception                                                      | Proposed                       |
| Logo colours                         | Signal gradient P, Pulse Blue wordmark                                       | Applied, 16 Oct 2026           |
| Fonts                                | Geist + Geist Mono (replaces Inter); titles in Mona Sans                     | 19 Oct 2026; titles 30 Oct     |
| Dark mode                            | Follows the OS, no toggle; cool black surfaces `#0B0D12`, dark band included | Approved 16 Oct 2026           |
| Chart colours                        | `chart-*` tokens, own dark values                                            | Applied, 19 Oct 2026           |
| Mission, vision, values, brand owner | Section 2                                                                    | Open                           |

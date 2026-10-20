# About page redesign — proposal

Status: **approved with changes on 19 Oct 2026** (Phase 3 in progress, one step at a time).
Date: 19 Oct 2026. Rules followed: CLAUDE.md ("Design skills"), DESIGN.md, `docs/pulse_brand_guidelines_final.md`.

## 0. Answers and decisions (approved 19 Oct 2026)

| #   | Question                       | Answer                                                       | Effect on the page                                                                                                                                           |
| --- | ------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| A1  | Laptop shelf: real or example? | **Example data.** The 47 comes from the same shelf.          | About no longer says "real catalogue"; the figure carries the "Example data" label like the home demo. index.html is **not** changed (demos keep the label). |
| A2  | Repository                     | **Don't offer it.**                                          | No repository sentence, no link, no "on request".                                                                                                            |
| A3  | Measured categories            | **Unknown.**                                                 | The page keeps "the categories we have measured" without naming them. `[NEEDS FACT]` stays open.                                                             |
| A4  | Team                           | **Keep hidden.** All 8 are in Singapore or Ho Chi Minh City. | Cards stay hidden; the line "Eight people across Singapore and Ho Chi Minh City" is verified.                                                                |
| A5  | Owner copy exceptions          | **None.**                                                    | All 🟡 rows stay true.                                                                                                                                       |

Decisions:

- **DEAL:** remove from About. Update DESIGN.md §5/§6 so they no longer describe an About DEAL block. Keep the specimen
  in components.html.
- **Team:** text only. Delete `hero.webp`, `hero-900.webp` and `workspace.jpg` in the polish step, after a grep shows no
  page uses them, and update the `about/` entry in CLAUDE.md.
- **Proposed guideline items:** publish none.
- privacy.html is an allowed source. The stock photo goes (#28). #24 is rewritten as who Pulse is built for.

Changes to the proposal (approved):

1. Research-log run states use **neutral badges** (`badge border-line text-muted`). Status colours are for audit states
   only (DESIGN.md §2).
2. **No edit to index.html.** Demos keep "Example data" by rule (guideline §9, DESIGN.md).
3. Hero figure follows **Emptiest vs deciding**: Signal Red only on Screen size, the deciding field. Processor, the
   emptiest field, is baseline Slate in both lists.
4. Typeset target: **65–75 characters per line everywhere**, measured by words per line at 1440.
5. Principle 1 is reworded to match A1: the figures are example data.
6. The header "Request an audit" vs page "Request a Decision Audit" mismatch stays out of scope. The final report lists
   it as the expected remaining Consistency deduction.

## 1. Content inventory (corrected)

The Phase 1 summary counts were wrong. It listed 11 verified claims as 12 and 11 owner-copy rows as 12, and it left #24
out of "Need you". This table has one status per row. The call to action is now row #29, so it is counted rather than
mentioned in passing.

Key: ✅ verified (index.html, product pages, guideline, privacy.html or chat) · 🟡 owner copy (the original About
page only) · ⚠️ needs you · ⬜ placeholder.

| #   | Claim                                                                                          | Source                                                       | Status                                |
| --- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------- |
| 1   | h1 "We measure whether product data can answer the questions shoppers ask"                     | original About                                               | 🟡                                    |
| 2   | "a shopper cannot filter on a field your catalogue never recorded… learns from engagement"     | original About                                               | 🟡                                    |
| 3   | Processor 162 · Screen size 80 · Memory 60 · Storage 55, of 216                                | index.html (labelled Example data), product/\*, guideline    | ✅ (label depends on A1)              |
| 4   | Screen size 15 · Memory 13 · Storage 10 · Processor 2, of 32 requirements                      | index.html                                                   | ✅ (label depends on A1)              |
| 5   | "We took a **real** electronics catalogue"                                                     | original About                                               | ✅ reworded to example data (A1)      |
| 6   | "Forty-seven of the 216 recorded nothing anybody could filter on"                              | original About; confirmed real in chat                       | ✅                                    |
| 7   | Processor first by absence (162), last by demand (2 of 32)                                     | index.html                                                   | ✅ (label depends on A1)              |
| 8   | "That gap… is the whole company. Measurable, reproducible…"                                    | original About                                               | 🟡                                    |
| 9   | What is proven: the top stays the same across reruns                                           | original About ("seed, weighting and imputation scope")      | 🟡                                    |
| 10  | What is built: the audit engine and a live service that explains every score                   | original About ("runtime"); product/\* names a Decision API  | 🟡                                    |
| 11  | What is not proven: no effect on revenue or conversion, no live experiment                     | original About                                               | 🟡                                    |
| 12  | What we are unsure about: how far the method generalises                                       | original About                                               | 🟡 (the categories themselves: A3)    |
| 13  | Customers we can name: none yet                                                                | original About                                               | 🟡                                    |
| 14  | "each one can be reproduced from our repository"                                               | original About ("with one command")                          | removed: not offered (A2)             |
| 15  | "no conversion statistic anywhere on this site"                                                | original About; no such figure found on any page             | ✅                                    |
| 16  | Research log: a spike that failed, a run that passed for the wrong reason, a third that held   | original About                                               | 🟡 (no dates or public log)           |
| 17  | Screen size top in 12 of 12 runs; ranks 2–4 moved                                              | guideline §2 voice, quoting the live site                    | ✅                                    |
| 18  | No code, no tag, no access to your systems                                                     | original About, index.html, product/\*                       | ✅                                    |
| 19  | "you have lost a catalogue export and an afternoon"                                            | original About                                               | 🟡                                    |
| 20  | One CSV or JSON export · within 48 hours · nothing installed                                   | index.html, product/\*, guideline positioning (Live on site) | ✅                                    |
| 21  | "Eight people across Singapore and Ho Chi Minh City"                                           | 8 from chat; the cities from the original About              | ✅ (A4: all 8 in the two cities)      |
| 22  | 8 team cards, "A. Placeholder"…                                                                | placeholders                                                 | ⬜                                    |
| 23  | Founded March 2026 · HQ Singapore · Engineering Ho Chi Minh City (GMT+7)                       | original About                                               | 🟡                                    |
| 24  | "Who we work with: merchants in Vietnam and across Southeast Asia"                             | original About                                               | ✅ rewritten as "Built for" (decided) |
| 25  | You get: the Decision Audit (what to record first, the products missing it)                    | index.html, product/\*                                       | ✅                                    |
| 26  | Encrypted in transit and at rest · deleted after 90 days unless otherwise specified · no SOC 2 | privacy.html (now an allowed source)                         | ✅                                    |
| 27  | DEAL: Decision · Engagement · Auditing & Agentic · Layer (hidden)                              | original About; product/\*                                   | ✅ (show or remove: §5)               |
| 28  | Stock photo "Four people around a table"                                                       | live site, stock style                                       | ⬜ remove (decided)                   |
| 29  | Call to action "Request a Decision Audit" → contact.html                                       | index.html hero button, contact.html                         | ✅                                    |

Counts before your answers: ✅ 12 (#3, 4, 6, 7, 15, 17, 18, 20, 25, 26, 27, 29). 🟡 11 (#1, 2, 8, 9, 10, 11, 12,
13, 16, 19, 23). ⚠️ 4 (#5, 14, 21, 24). ⬜ 2 (#22, 28). Total 29.

After your answers: #5 reworded to example data, #14 removed, #21 verified, #24 rewritten, so ✅ 15, 🟡 11, ⬜ 2 and
one row removed. Nothing on the page is ⚠️ any more; the open fact is A3 (which categories), which the page does not
name.

#26 moved from ⚠️ to ✅ because privacy.html is now allowed. Before that it was ⚠️, so the ⚠️ rows were #5, 14, 21,
24 and 26.

## 2. Why the score fell from 25/32 to 21/32 (runs 2 → 3)

The 8 heuristics scored in both runs:

| Heuristic          | Run 2 | Run 3 | What caused the drop                                                                                                                                                                                                                               | Who caused it                             |
| ------------------ | ----- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| 2 Match real world | 4     | 2     | Researcher words: "spike", "clickstream", "learns from engagement", and "random starts, weightings and ways of filling in missing values". That last one was **my own rewrite** of "seed, weighting and imputation scope", and it is still jargon. | Partly my fix, partly a stricter reviewer |
| 4 Consistency      | 3     | 2     | (a) "real catalogue" vs "Example data", **in the page from the start**; runs 1–2 missed it. (b) The page button "Request a Decision Audit" vs the header "Request an audit": **introduced by my run-2 close**.                                     | (a) existing, newly found; (b) my fix     |
| 6 Recognition      | 3     | 2     | The ranking figure moved into the hero **with no line stating its point**, so the reader has to spot that Processor goes from 1st to 4th; the bold type is the only cue.                                                                           | My fix (hero figure)                      |
| 1, 3, 5, 8, 9      | same  | same  | —                                                                                                                                                                                                                                                  |                                           |

Run 3 also scored heuristic 10 (Help) at 2, because the evidence the page promises (repository, research log) is not
linked. My run-2 changes added more of those claims (the figure-source panel, the run log, "12 of 12 runs") without a
single link.

Bold on the negatives ("What is not proven", "None yet") was **my run-2 emphasis change**. Run 3 marked it down under
cognitive load, though not in the score.

**Lessons for this plan:**

1. Every new figure or artefact gets a stated takeaway and a source line.
2. One name for the ask, matching the home page hero.
3. No new evidence claim without a link, or the honest "available on request".
4. Read every rewrite as a merchandising lead would; plain words only.
5. Emphasis goes on the reassurance, not the negatives.
6. Check the whole page for contradictions with index.html before calling a step done (a grep for every figure and
   label).

## 3. Taste Design Read

**Design Read (redesign-existing-projects, "overhaul", VARIANCE 6 · MOTION 2 · DENSITY as now):**
Pulse About page, a trust page for merchandising leads judging whether to send one category export. Signal design
language: ruled frame, Geist, one Pulse Blue action, Signal Red once for the #1. Static HTML with Tailwind v4 tokens
and the components in DESIGN.md §5.

**Where Taste conflicts with DESIGN.md, and how each is resolved (DESIGN.md wins):**

| Taste rule (redesign-existing-projects)                                      | Conflict                                                      | Resolution                                                                                                                             |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Add background imagery, picsum placeholders, grain/noise, texture            | DESIGN.md §1 flat; CLAUDE.md bans stock or decorative imagery | Not applied. Depth comes from hairlines, `bg-surface-1/50` bands and real data figures.                                                |
| Replace Lucide icons with Phosphor/Heroicons                                 | DESIGN.md §5: Lucide sprite only                              | Not applied. This page needs fewer icons anyway; the principles keep none.                                                             |
| Hover scale or translate; press `scale(0.98)`                                | DESIGN.md §7: colour changes only, no scale or lift           | Not applied. Existing hover colours only.                                                                                              |
| Smooth inertial scroll, spring physics, parallax stacks, split-screen scroll | DESIGN.md §6 motion list; MOTION ≤ 3                          | Not applied. `reveal` only (already readable without JS and with reduced motion).                                                      |
| Tinted or coloured shadows, glassmorphism, spotlight borders                 | DESIGN.md §9                                                  | Not applied. `shadow-sm` on cards only.                                                                                                |
| Avoid accordions                                                             | Agrees                                                        | Already gone; the page uses flat lists.                                                                                                |
| "Use realistic-sounding names", "organic messy numbers"                      | CLAUDE.md: no invented content                                | **Overridden.** Team names come only from you; until then the cards stay hidden.                                                       |
| Break symmetry, broken grid, overlap                                         | DESIGN.md §4 ruled frame, 12-column grid                      | Kept within the frame: the hero puts text and figure on a 6/6 split, and principles alternate artefact positions. No overlap or bleed. |
| All-caps subheaders → sentence case                                          | DESIGN.md keeps the `eyebrow` uppercase label                 | Not applied; eyebrows are part of the system.                                                                                          |
| Indicate the current page in the navigation                                  | Agrees                                                        | Already done site-wide (`aria-current`).                                                                                               |
| Body text about 65 characters                                                | Agrees                                                        | Applied and measured in the typeset step (story 67–69 characters today; the status list still 108–130, to fix).                        |

## 4. New page structure

The page answers, in order: what Pulse is → why it exists → how we work → who we are → one next step.

| #   | Section (eyebrow · h2)                                      | Job                                                                                 | Components (DESIGN.md §5)                                                                                                                                                                 | Change from today                                                                                                                                                                                                     |
| --- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | About · h1                                                  | **What Pulse is.** The positioning in one sentence, and the argument as one figure. | `hero-bg`, `eyebrow`, `text-headline` h1 (as on other pages, §8), the ranking figure (`card` + `reveal-bar` + priority ring), new: a one-line takeaway and a source line under the figure | Intro rewritten to the positioning statement, which is Live on site. Takeaway and source line added. Stock photo removed from the source too.                                                                         |
| 2   | Where this came from · It started with one shelf of laptops | **Why it exists.** The one-shelf story.                                             | `frame` 5/7 split, `text-body` paragraphs at a readable width                                                                                                                             | Jargon out ("clickstream", "learns from engagement"); "real" settled by A1.                                                                                                                                           |
| 3   | How we work · Four things we hold to                        | **How we work.** Four principles, each with the artefact that proves it.            | 2×2 grid; artefact panels (`rounded-lg border bg-card p-4`), `badge-warning` / `badge-success` for the run states, chips `rounded` (fix from `rounded-md`)                                | "spike" → "first attempt". Evidence wording per A2. Ends with a text link "Request a Decision Audit", so phones reach the ask by screen 5 instead of 8 (a link, not a second `btn-primary`).                          |
| 4   | Who we are · Early, and specific about it                   | **Who we are**, honestly: what is proven and not, then the company.                 | One `dl` ledger (5 rows), all answers `text-body`, labels `font-semibold`, width capped; then a 4-item fact strip                                                                         | Company facts and the honesty ledger merged into one section (fixes the "valley" and the two same-looking lists). "Who we work with" becomes "Built for". "None yet" paired with the low-risk fact. Team line per A4. |
| 5   | (no eyebrow) · Send us a category and judge for yourself    | **One next step.**                                                                  | Send / get / when panel, data-handling line (privacy.html), one `btn-primary` → contact.html, email fallback                                                                              | Unchanged apart from copy tightening.                                                                                                                                                                                 |
| —   | DEAL acronym                                                | —                                                                                   | `deal` block (hidden today)                                                                                                                                                               | Decision §6.1: recommendation is to remove it from About.                                                                                                                                                             |

Per-view limits: one `btn-primary` (section 5; sections 3 and 1 use a text link or none). Signal Red only on the
figure's #1 row (section 1); nowhere else on the page. No `bg-signal-gradient`, no `bg-void` band.

## 5. Draft copy (approved version)

Tags: `[S#n]` = inventory row n · `[guide §2 LoS]` = guideline item marked Live on site · `[index]`, `[privacy]`,
`[chat]` = sources · `[NEEDS FACT: …]` = hidden or left unnamed on the page.

### Section 1 — About

- Eyebrow: About
- h1: We measure whether product data can answer the questions shoppers ask `[S#1]`
- Intro: Pulse measures your product data against what shoppers actually decide on. Send one category export and get a
  ranked repair list back within 48 hours. Not a PIM, and it replaces nothing. `[guide §2 LoS]`
- Figure (data `[S#3, S#4]`), caption: The same four gaps, ranked two ways. Screen size, the deciding field, carries the
  Signal ring and bar; Processor, the emptiest field, is baseline Slate in both lists; Memory and Storage stay neutral.
- Takeaway under the figure: Processor is missing most often and needed least: first by absence, last by demand.
  `[S#7]`
- Source line: Example data: one laptop shelf of 216 products, the same figures as the demo on the home page.
  `[index, A1]`

### Section 2 — Where this came from · It started with one shelf of laptops

- We looked at a laptop shelf of 216 products to answer a simple question: if a shopper had to choose, could this
  catalogue help them? It could not. Forty-seven of the 216 recorded nothing anybody could filter on: no screen size, no
  memory, no storage, no processor. `[S#5 reworded per A1, S#6]`
- The interesting part was not that the data was missing. It was that the usual way of deciding what to fix would have
  got the order wrong. Rank the gaps by how much data is absent and processor comes first, because 162 products lack
  it. Rank them by what shoppers said they needed and processor comes last: only 2 of 32 requirements mention one.
  `[S#7]`
- That gap between what is missing and what shoppers need is the whole company. It is measurable and it is
  reproducible, and measuring it means starting from the shopper's decision, not from clicks. `[S#8; jargon removed]`

### Section 3 — How we work · Four things we hold to

1. **Show the working, not just the answer.** The figures on this site are example data, and the page says so where
   they appear. If we cannot show how a figure was produced, we do not print it, which is why there is no conversion
   figure anywhere on this site. `[A1, S#15; repository sentence removed per A2]`
   - Artefact: Where two of the figures come from: 162, laptops on the example shelf with no processor recorded; 2 of
     32, shopper requirements that mention a processor. `[S#7, A1]`
2. **A negative result is still a result.** Our research log records a first attempt that failed its criteria, a second
   that passed for the wrong reason, and a third that held. We kept all three. `[S#16]`
   - Artefact: Run 1 Failed its criteria · Run 2 Passed for the wrong reason · Run 3 Held, as neutral badges
     (`badge border-line text-muted`). `[S#16; change 1]`
3. **Say what the measurement cannot do.** Our ranking is steady at the top and less steady below it, and we say so
   next to the ranking, not in a footnote. `[S#17]`
   - Artefact: Screen size: top in 12 of 12 runs · Ranks 2 to 4: the order changed between runs `[S#17]`
4. **Earn the integration, do not assume it.** The first thing we sell needs no code, no tag and no access to your
   systems. If the audit is not useful, you have lost a catalogue export and an afternoon. `[S#18, S#19]`
   - Artefact chips (`rounded`): One CSV or JSON export · Results within 48 hours · Nothing installed `[S#20]`

- Text link after the grid: Request a Decision Audit → contact.html `[S#29]`

### Section 4 — Who we are · Early, and specific about it

Ledger (labels `font-semibold ink`, answers `text-body`, one size, 65–75 characters per line):

- What is proven: The measurement. When we rerun the ranking with different settings, the top of the list stays the
  same. `[S#9]`
- What is built: The audit engine, and a live service that re-ranks a catalogue as it changes and explains every score.
  `[S#10]`
- What is not proven: Any effect on revenue or conversion. We have run no live experiment, so we have no number and
  will not offer one. `[S#11]`
- What we are unsure about: How far the method carries beyond the categories we have measured. We will know when more
  merchants have run it. `[S#12; categories unnamed, A3]`
- Customers we can name: None yet, so the first audit asks for one export and nothing installed. When that changes we
  will say so here, with their permission. `[S#13, S#20]`

Fact strip (4 items):

- Team: Eight people across Singapore and Ho Chi Minh City `[S#21, chat, A4]`
- Founded: March 2026 `[S#23]`
- Offices: Singapore (headquarters) · Ho Chi Minh City, Vietnam (engineering) `[S#23]`
- Built for: Merchants in Vietnam and Southeast Asia, one category at a time `[S#24 rewritten]`

Team cards: stay `hidden` `[S#22, A4]`.

### Section 5 — Send us a category and judge for yourself

- You send: One category export, CSV or JSON `[S#20]`
- You get: The Decision Audit: what to record first, and the products missing it `[S#25]`
- When: Within 48 hours `[S#20]`
- Data: Nothing installed, and no access to your systems. Your export is encrypted in transit and at rest, and deleted
  automatically after 90 days unless otherwise specified. Pulse is not yet SOC 2 audited. How we handle data →
  privacy.html `[S#18, S#26 privacy]`
- Button: Request a Decision Audit (`btn-primary`, contact.html) `[S#29]` · Or email getintouch@thepulseapi.com
  `[shell footer]`

## 6. Decisions (made)

1. DEAL block: removed from About; DESIGN.md §5/§6 updated; specimen stays in components.html.
2. Team: text only; unused images deleted in polish after a grep.
3. Proposed guideline items: none published.
4. Name of the ask: "Request a Decision Audit" on the page; the header mismatch stays out of scope (§8).

## 7. Implementation plan (one /impeccable command per step)

After each step: prettier on changed files, `pnpm build`, `pnpm lint:tw` (0 warnings), the definition of done in
CLAUDE.md, and a one-line note. Stop after each step.

1. **`/impeccable layout`**
   - Remove the DEAL block from about.html and update DESIGN.md §5/§6.
   - Merge "The team and the company" into "Early, and specific about it" (ledger, then the fact strip).
   - Add the text link "Request a Decision Audit" after the principles (a link, not a second `btn-primary`).
   - Make sure the stock photo is gone from the markup.
2. **`/impeccable clarify`**
   - All copy from §5: positioning intro, figure takeaway and the "Example data" source line, example-data wording in
     the story and principle 1, repository sentence removed, jargon out, "Built for".
   - Grep every figure and label on about.html against index.html. **No index.html edit.**
3. **`/impeccable harden`**
   - Neutral badges for the run states.
   - The team cards stay hidden; nothing on the page depends on A3.
   - Check: readable with JS off and with reduced motion.
4. **`/impeccable bolder`**
   - Figure: Signal Red only on Screen size; Processor baseline Slate in both lists.
   - Emphasis on the reassurance: "None yet" paired with the low-risk fact, ledger labels ink semibold.
   - The figure takeaway is the strongest line under the hero.
5. **`/impeccable typeset`**
   - One size in the ledger (`text-body`). Chips `rounded`.
   - 65–75 characters per line everywhere, measured by words per line at 1440.
6. **`/impeccable polish`**
   - Definition of done; screenshots at 375 and 1440, light and dark (`data-theme`), several scroll positions.
   - `pnpm dlx impeccable detect --fast --json .`.
   - Grep, then delete `hero.webp`, `hero-900.webp` and `workspace.jpg`; update the `about/` entry in CLAUDE.md.
   - Re-run `/impeccable critique` and report before/after on the same heuristic set. List the header/page CTA
     mismatch as the expected remaining Consistency deduction.

## 8. Out of scope (site-wide drift, report only)

- The page `h1` uses `text-headline` on About, Pricing, Contact and Product; DESIGN.md §3 gives page h1s
  `text-display`. Either document `text-headline` for company pages or change all of them in one site-wide pass.
- The call-to-action arrow nudges sideways on hover (`group-hover:translate-x-0.5`) on several pages; DESIGN.md §7
  says hover is colour only.
- Header "Request an audit" vs page "Request a Decision Audit" (shared shell).

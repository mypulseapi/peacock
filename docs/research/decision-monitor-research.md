# Decision Monitor: competitor and page research

Research date: 19 Oct 2026. Scope: how competitors and data-observability tools present catalogue monitoring, what a
merchandising lead needs to grasp at a glance, and what to change on `product/decision-monitor.html`.
Vendor claims are quoted from vendor pages and have not been verified independently.

## 0. Findings about the page as it stands

Read these first. They affect everything below.

| #   | Issue                                                                                                                                                                                                                                                                                                             | Severity |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 1   | **The sample alert names the wrong attribute.** Hero and alert card: "Laptops fell from 71 to 62. 340 new products arrived without processor data." On the home page, processor is the attribute Pulse ranks **last** (2 of 32 requirements). An alert about processor contradicts the main argument of the site. | High     |
| 2   | **The figures are not in the evidence list.** 71 → 62, −9 points, 340 new SKUs, and 26 / 105 / 340 / 680 do not appear in PRODUCT.md "Evidence on Hand". 340 new products in one quarter also outnumbers the whole 216-product laptop example.                                                                    | High     |
| 3   | **"Readiness 71" has no unit.** Elsewhere readiness is "products shoppers can tell apart": 122 / 216 (56.5%) before the fix and 185 / 216 (85.6%) after it (computed). A bare 71 out of an unknown scale reads like a vendor score.                                                                               | Medium   |
| 4   | **The FAQ contradicts "nothing to install".** One answer mentions "the data explicitly supplied through the integration, plus anonymous browser signals where the optional runtime is installed", while the deliverables say "No tag, no integration".                                                            | Medium   |
| 5   | **Effort is buried.** "It reads the same export the audit read" appears in step 1 and the FAQ, not in the hero. "Needs an audit first" is only in the FAQ.                                                                                                                                                        | Medium   |

The arrival maths are internally consistent: 340 per quarter is 26.2 per week (340 / 13), so about 105 in four weeks and
680 in six months. The problem is where the figures come from, not the arithmetic.

## 1. Competitors and adjacent products

| Product                                                         | What it monitors                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Hero visual                                                                                                    | 5-second takeaway                                          | Key claim                                                                                                                                                                                              | Ranks by                             |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| **Salsify** Digital Shelf Analytics                             | Brand-compliance reports on retailer PDPs that "flag outdated, old, or overwritten product content"; content impact via the Profitero integration ([salsify.com](https://www.salsify.com/digital-shelf-analytics))                                                                                                                                                                                                                                                                                           | Screenshot of an "Amazon Australia Product Page Report" (from the file name)                                   | "Is my syndicated content still live and correct?"         | "Closes the loop on product content syndication"; retailers aim for a "95% content score" ([Purina case](https://www.salsify.com/resources/case-study/nestlé-purina-petcare-increases-content-scores)) | Compliance vs source of truth        |
| **Syndigo** Product Content Analytics                           | Content Integrity (does PIM content match what is live), "Vendor Content Health Score … including alerts and recommendations", "real-time alerts" for discrepancies ([syndigo.com/analytics](https://syndigo.com/analytics/), [community](https://community.syndigo.com/t5/Analytics-Digital-Shelf/tkb-p/AnalyticsDigitalShelfScorecardTKB))                                                                                                                                                                 | Generic "Product-Content-Analytics" graphic and a Gartner banner                                               | "Content analytics suite for brands and retailers"         | Unsourced "23 times more likely to acquire customers"; customer raised a Target.com content score "by nearly 20 percentage points"                                                                     | Completeness / retailer rules        |
| **Akeneo** Data Quality Insights (PIM)                          | A–E grade per product from the share of attributes filled ("required or not") and at least one image; consistency (spelling, case) in Enterprise only; dashboard by catalogue, category or family, refreshed daily, trend up to 6 months ([help v7](https://akeneo.helpjuice.com/v7-understand-data-quality), [improve](https://akeneo.helpjuice.com/v7-improve-data-quality))                                                                                                                               | In-app grade badges and a grade-distribution dashboard (help-centre screenshots)                               | "A letter grade for how filled-in each product is"         | Grade bands A 90–100% … E 0–59%. **No weighting by customer importance:** the only control is to switch off attribute groups such as ERP data                                                          | Emptiness                            |
| **Akeneo** Agentic Ziggy (Summer 2026)                          | Agents that "enrich, govern, and orchestrate"; secondary sources describe continuous completeness checks and readiness scores ([Retail Times](https://retailtimes.co.uk/akeneo-introduces-first-truly-agentic-product-experience-platform/), [digitalapplied](https://www.digitalapplied.com/blog/agentic-pim-product-data-agents-feed-quality-2026))                                                                                                                                                        | Agent workspace                                                                                                | "AI agents look after the PIM"                             | First "truly agentic" product experience platform                                                                                                                                                      | Completeness (secondary sources)     |
| **Profitero+** Digital Shelf                                    | Placement, stock, price/MAP, reviews; "Identify and correct content inconsistencies at the SKU level"; "Score and benchmark content"; alerts for out-of-stock and negative reviews ([profitero.com](https://www.profitero.com/digital-shelf))                                                                                                                                                                                                                                                                | Header image (no alt); logos of 3M, General Mills, LEGO                                                        | "Everything about your products on 1,400+ retailers"       | "80M+ products tracked daily"; "1 out of 3 shoppers abandon their cart due to poor product content"                                                                                                    | Retailer compliance                  |
| **DataWeave** Content Audit                                     | Text accuracy, images, guideline compliance against retailers; "address any sudden quality dips" with historical data; 0–100 content health and "PDP readiness" scores in a case study ([dataweave.com](https://dataweave.com/us/dsa-content-audit), [case study](https://dataweave.com/downloads/1how-dataweaves-ai-powered-content-optimization-helped-a-leading-home-improvement-retailer-improve-content-quality.pdf))                                                                                   | Stock banner image                                                                                             | "An audit of my listings"                                  | "85% of shoppers rely on product info and images"; case: content health 51% → 76%                                                                                                                      | Rules / completeness                 |
| **Lily AI** (Lily Max)                                          | Enriches attributes in shopper language; table of "Product term / Monthly Searches / Impression Share / Products with term"; agents "enrich, evaluate and republish your catalog continuously" ([lily.ai](https://www.lily.ai/))                                                                                                                                                                                                                                                                             | Chat-style "Lily Max Agent" panel with a shopper query ("Wideleg but still flattering sweatpants, not frumpy") | "AI rewrites my catalogue for AI shopping"                 | "AI can't recommend what it can't understand"; A/B-tested lifts (+28% Google Shopping revenue); states it "does not guarantee placement"                                                               | **Search demand** (closest to Pulse) |
| **Feedonomics**                                                 | Feed transformation and "1.6M+ data governance rules monthly"; no monitoring or alert feature on the home page ([feedonomics.com](https://feedonomics.com/))                                                                                                                                                                                                                                                                                                                                                 | Product photo (running shoes)                                                                                  | "Get listed everywhere"                                    | "Go from invisible to everywhere"; Dell "4x faster error resolution"                                                                                                                                   | n/a (feeds)                          |
| **Productsup** / **Pimberly**                                   | Feed management / PIM; no content-quality monitoring described on the home pages ([productsup.com](https://www.productsup.com/), [pimberly.com](https://www.pimberly.com/))                                                                                                                                                                                                                                                                                                                                  | Abstract SVG / "platform graphic"                                                                              | "A platform for product data"                              | Scale (two trillion products a month; "golden record")                                                                                                                                                 | n/a                                  |
| **Marketplaces**: Lazada Content Score, Walmart Listing Quality | Lazada scores title, category, description, images and key attributes; "Improve Now" below 80; an AI Attribute Management page (Feb 2026) flags wrong values ([Ginee](https://ginee.com/my/insights/how-to-boost-product-in-lazada/), [BigSeller](https://www.bigseller.pro/blog/articleDetails/4396/lazada-product-listing.htm)). Walmart: content, discoverability, offer, reviews ([Walmart](https://marketplacelearn.walmart.com/ca/guides/Item%20setup/Variant%20management/listing-quality-dashboard)) | Seller-centre dashboards                                                                                       | Sellers in Vietnam / SEA already know "a score out of 100" | Score thresholds; third-party sources only for Lazada                                                                                                                                                  | Completeness                         |

**What the category has in common**

- Every monitoring product scores **completeness or compliance** (filled fields, retailer rules, PIM vs live page). None
  of the sources found ranks attributes by how many shopper requirements need them. Lily AI comes closest, ranking
  terms by search volume, but it enriches and does not alert on drift.
- Most are **brand-side digital-shelf tools** (Salsify, Syndigo, Profitero, DataWeave): they watch retailer pages for a
  brand. Pulse watches a **retailer's own catalogue** and why its shoppers cannot decide. Visitors from brands may expect
  retailer crawling. The page should say what it reads.
- Hero visuals are weak across the board: stock banners, file-named screenshots, logo walls, analyst badges. Nobody
  shows a single alert or a drift line in the hero. That leaves room for Pulse to show one.
- Proof is scale (products crawled, retailers covered) and logos. Pulse has neither and must not imitate it.

## 2. What a visitor must understand at a glance

### The five questions a merchandising lead brings

| Question                | What the page must answer without scrolling far                                                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| What goes wrong?        | Readiness slips silently: new range, supplier feed change, staff turnover. No single week looks like a problem.                                                                 |
| What triggers an alert? | A category's readiness drops because a **deciding** attribute (one many shopper requirements need) stops being recorded. An empty field nobody decides on does not trigger one. |
| What do I receive?      | One message: category, attribute, how many products, why, what it costs in "products shoppers can tell apart", and the first fix.                                               |
| What does it cost me?   | The export you already send; an audit first to set the baseline; a cadence you choose. Nothing installed.                                                                       |
| Can I trust it?         | Same method every run, so runs are comparable; states its limits (what it cannot detect, how it handles noise).                                                                 |

### How the closest analogues show "drift, then an alert"

Data observability (data quality drifts silently; get told when it breaks) is the closest analogue.

| Tool                                                                                                                                              | Pattern worth borrowing                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Metaplane** ([home](https://www.metaplane.dev/), [alerts blog](https://www.metaplane.dev/blog/how-to-manage-metaplane-monitor-alerts-in-slack)) | Headline is the outcome: "Be the first to know about data incidents". Effort stated as a number: "set up in 15 minutes … alerts in as soon as 3 days". Alert anatomy: monitor name, one-line summary, a trend chart of normal vs deviation, and buttons to mark it "real" or "expected". Models need "up to a week" before alerting: a limit stated openly. |
| **Anomalo** ([home](https://www.anomalo.com/))                                                                                                    | Separates alerts from explanations: "Alerts tell you a check failed"; insights add what happened, why, what is affected and what to do. This is the same split as Pulse's "naming the cause". Effort: "First insights in 24 hours". A before/after "The Shift" section.                                                                                     |
| **Monte Carlo / Bigeye** ([montecarlo.ai](https://montecarlo.ai/), [bigeye.com](https://www.bigeye.com/))                                         | Have moved to "AI trust" positioning and lean on logos and Forrester ROI. Bigeye's proof is time-to-detection ("3+ days to under 24 hours"). A reminder that the most useful proof for monitoring is **how early** you hear, not how much you crawl.                                                                                                        |
| **Stripe Radar** ([stripe.com/radar](https://stripe.com/radar))                                                                                   | Best "understand by looking" hero in the set: an animated check runs step by step ("Scanning…" → "Threat level: low" → "Fraud not detected"), then a score with the **reasons** beside it ("Linked to fraudulent accounts"). Every card shows a score plus its reason.                                                                                      |
| **Linear Insights** ([linear.app/insights](https://linear.app/insights))                                                                          | Sells the questions the chart answers ("Are we getting better at fixing bugs?") rather than the chart itself.                                                                                                                                                                                                                                               |

**Patterns that work by looking:** (1) a line that is flat, then drifts, with the moment of detection marked on it;
(2) the alert itself as the hero object, readable as text; (3) a score that always sits next to its reason;
(4) effort as a number ("one export", "48 hours"); (5) a stated limit, which builds trust.

## 3. Fit and positioning gaps

### Where Monitor is genuinely different

| Difference                   | Why it matters on this page                                                                                                                                                                                                                                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Weighted by shopper need** | Akeneo's grade counts attributes "required or not" and lets you only switch groups off. Lazada and Walmart scores count filled fields. Pulse alerts only when an attribute that shoppers decide on slips, so it should be **quieter** than a completeness score. That is the headline benefit for an alert product. |
| **Names the cause**          | Matches Anomalo's alert-vs-insight split; Syndigo and Salsify flag a discrepancy but do not explain why. Pulse can say "the new range arrived without screen size".                                                                                                                                                 |
| **Export only**              | Metaplane and Anomalo need warehouse access; Profitero and Salsify need a PIM or crawl. Pulse needs the export the store already makes.                                                                                                                                                                             |
| **Retailer's own catalogue** | Digital-shelf tools watch brand content on retailer sites. Pulse watches the store's own shelves.                                                                                                                                                                                                                   |

### Where visitors will be confused or sceptical

- **"How is this different from my PIM's completeness score / Lazada's content score?"** Answer it on the page with
  the laptop example: a completeness score drops when processor goes missing; Monitor does not alert, because only 2 of
  32 requirements need it. (The current sample alert does the opposite; see §0.)
- **"Readiness 71 out of what?"** Use the unit the site already uses: products shoppers can tell apart, out of N.
- **"Weekly on a feed, but no integration?"** Say plainly that the store schedules the export and Pulse reads it.
- **"Another dashboard?"** The page already says "Not a dashboard you have to remember to open". Keep it.
- **"Alert noise"**: say what does not trigger an alert, and that a quiet period produces no message.
- **"Needs an audit first"**: move it from the FAQ to the effort line; it is the main prerequisite.

### Audience terms

| Term                              | Who uses it                                                                                                                                                                  | Use on the page?                                                                                |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Completeness score                | PIM users (Akeneo grade, Salsify readiness report)                                                                                                                           | Yes, as the thing Pulse contrasts with ("A completeness score would have…")                     |
| Content score / listing quality   | Marketplace sellers (Lazada Content Score, Walmart Listing Quality)                                                                                                          | Yes, once, for SEA visitors who sell on marketplaces                                            |
| Content health                    | Syndigo, DataWeave, NielsenIQ ([NIQ](https://nielseniq.com/global/en/insights/commentary/2026/naughty-or-nice-is-your-christmas-product-content-ready-for-the-retail-rush/)) | Mention in an FAQ question, not as Pulse's own term                                             |
| Digital shelf                     | Brand-side analytics                                                                                                                                                         | Avoid as a product term (implies crawling retailer sites); "shelf" / "category" are fine        |
| PDP readiness / content readiness | DataWeave, Syndigo ("used interchangeably" with completeness, validation, health ([Syndigo](https://syndigo.com/blog/five-steps-to-content-readiness/)))                     | Pulse already says "decision readiness". Keep it and define it in numbers every time it appears |
| Drift, regression                 | Data teams                                                                                                                                                                   | "Drift" is clear to both audiences; avoid "data downtime", "observability"                      |

## 4. Recommendations for the Decision Monitor page

### 4.1 Section order

1. **Hero:** headline, one-line description, effort line, one `btn-primary` ("Request a Decision Audit"; Monitor
   needs an audit first). Visual: the alert on a drift line (4.2).
2. **The problem:** "Nobody decides to let a category decay" with the three causes (keep; it is good).
3. **What triggers an alert, and what does not** (new): two columns from the laptop example. A completeness score
   would flag processor (162 missing); Monitor stays quiet because 2 of 32 requirements need it. It alerts on screen
   size (15 of 32). This is the differentiator in one glance.
4. **Anatomy of an alert** (move up the current "What you get" card): category, attribute, products affected,
   cause, readiness before → after in products shoppers can tell apart, first fix.
5. **How it works:** the three steps (keep), with "after a Decision Audit" in step 1.
6. **The cost of waiting:** keep only if the arrival figures are confirmed (see 4.5); otherwise drop or reword
   without numbers.
7. **Limits:** what Monitor cannot see (anything not in the export, live prices, retailer pages), when it stays quiet.
8. **FAQ:** fix the integration answer; add "How is this different from my PIM's completeness score?"
9. Shared CTA band.

### 4.2 The one hero visual

A single **"Example data" panel** in the hero-demo frame (`rounded-2xl border border-line bg-surface-1 p-1.5`), no video:

- Top: a category readiness line in `primary` ("Products shoppers can tell apart, week by week"), flat, then a step down
  in the week a new range lands.
- On the drop: one marker in `signal` (the only red in view) and the alert card attached to it.
- Alert card text, readable without the chart: category · attribute · products arriving without it · cause · readiness
  before → after · "First fix: recover it from titles".

This copies Stripe Radar's "score next to its reason" and Metaplane's alert anatomy, using components the site already
has (`missing-flag`, `badge-signal`, the hero demo frame).

### 4.3 What the hero animation should show (once, then hold)

1. Line draws flat across weeks 1–N (`demo-draw`), readiness steady.
2. A new range lands: a short row of products enters with `missing-flag` in the screen-size column (amber = missing).
3. The line steps down; a muted "completeness score" ghost line drops too, then the label "Processor also missing: no
   alert, 2 of 32 requirements" appears beside it, so the visitor sees what is filtered out.
4. The signal marker appears on the drop, and the alert card slides in with its cause.
5. Hold on the final frame. Write the final state in HTML (`pre-N:` / `at-N:` pattern) so no-JS and reduced motion show
   the alert. If it loops, it needs a pause control (WCAG 2.2.2, as on the home demo).

### 4.4 Copy terms to adopt

- Headline keeps the outcome-first form ("Catch a category slipping before a buyer does" works; Metaplane's "Be the
  first to know" is the same shape).
- Effort line under it, in numbers: "One export you already make · an audit to set the baseline · alerts only when a
  deciding attribute slips."
- Always pair readiness with its unit: "185 of 216 products shoppers can tell apart".
- Say "completeness score" only as the contrast; use "decision readiness" for Pulse.
- "Names the cause" → spell out a cause: "The new range arrived from the supplier without screen size."

### 4.5 Proof Pulse can truthfully supply

| Proof                                                                                | Status                                                                              |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Laptop example: processor 162 missing / 2 of 32 vs screen size 80 missing / 15 of 32 | On hand. Use it for "what does not trigger an alert".                               |
| 122 → 185 of 216 can be told apart; screen size 136 → 216 / 216                      | On hand. Use it as the size of a drop in reverse (what a slip would undo).          |
| "Rank 1 held in 12 of 12 runs; ranks 2–4 vary"                                       | On hand (brand guide). Supports "same method every run, comparable over time".      |
| Same export, nothing installed, 48 hours for the baseline audit                      | On hand.                                                                            |
| 71 → 62, −9 points, 340 new SKUs, 26 / 105 / 340 / 680                               | **Needs new facts** or must be replaced by figures derived from the laptop example. |
| Alert latency ("you hear in week 2"), cadence options, alert channel (email, Slack?) | **Needs confirmation** from the team before it is stated.                           |
| Customers, logos, time-to-detect statistics                                          | **None exist.** Do not add.                                                         |

If the hero needs a drop, build it from the laptop example and label it example data, for example: the category is at
185 of 216 after the fix; a new range arrives without screen size; Monitor reports how many of the new products shoppers
cannot tell apart. The exact numbers need sign-off before they go on the page.

### 4.6 What to avoid

- Alerting on an attribute shoppers barely decide on (the current processor example).
- A score without a unit or denominator; letter grades (Akeneo) or "content health" as Pulse's own metric.
- Scale proof (products crawled, retailers covered), logo walls, analyst badges: Pulse has none, and imitating it
  undermines "the Honest Data Analyst".
- Dashboard collages, stock banners, illustration (the competitors' default, and against DESIGN.md §1).
- Red anywhere but the one drop marker; amber for anything but missing values; glow, glass or a gradient hero.
- More than one primary button in the hero view; "Read the method first" stays secondary.
- "Real-time" (Syndigo's claim): Monitor runs on the store's export cadence; say "weekly or on your schedule".
- Mentioning integrations or an "optional runtime" on a page that promises nothing to install.

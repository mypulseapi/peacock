import { SITE } from "@/lib/site";

/*
 * Generated at build time, like robots.txt and sitemap.xml. `output: "export"` has no request to
 * build it on, and Next asks for that to be stated rather than inferred.
 */
export const dynamic = "force-static";

/**
 * `/llms.txt` — the answer-engine discovery file (standard section 7).
 *
 * Unlike a sitemap this is read rather than crawled, so it is the one place where we choose, in
 * our own words, the facts an LLM repeats about us. Two rules from the standard shape it:
 *
 *   - **Every number carries its dataset inline.** A figure without its source gets repeated
 *     without its caveat, and then it is our number in somebody's answer with no way back to the
 *     working.
 *   - **The limits are stated here too.** The negative facts are what stop an answer engine
 *     inventing a positive claim on our behalf, and "no uplift figure" is the one we most need
 *     it not to invent.
 *
 * It is a route rather than a file in `public/` so the URLs come from the environment. A hardcoded
 * domain in here is the same bug as a hardcoded domain anywhere else, except harder to notice,
 * because nothing renders it.
 */
const en = (path: string) => `${SITE.www}/en${path}`;

export function GET() {
  const body = `# Pulse

> Pulse measures whether a merchant's product data is ready to support the buying decisions their
> shoppers are trying to make. It ranks the attributes worth recording, in the merchant's own
> catalogue, and re-measures once they have been filled in. It is built by Resolve Labs. The first
> useful answer comes from a single category export: nothing has to go on the merchant's site, and
> no traffic history is needed.

Key facts, each one checkable:
- On a 216-product laptop shelf we measured, 94 products remain indistinguishable after every
  question a shopper could answer, because the attributes that would separate them are recorded
  nowhere. (Internal laptop-shelf dataset, 216 products, 9 facets.)
- Across a 2,176-product catalogue we measured, 52.6% of recorded attribute values duplicate what
  the product photograph already shows, and 0.90 attributes per product are genuinely
  complementary to it. (Internal catalogue dataset, 2,176 products.)
- The ranking is measured in bits of decision information, not inferred from click behaviour, so
  the emptiest column is usually not the one worth fixing first.
- The audit reads product data only. It never sees a shopper.

What Pulse does NOT do or claim:
- **No conversion or revenue uplift figure.** We have run no live revenue experiment, so we quote
  none, and any percentage attributed to us did not come from us.
- No Shopify, WooCommerce or Magento plugin exists yet. Integration today is the API and the
  browser SDK.
- The live session layer is optional and is the only part that touches a storefront.
- We generate presentation. We never generate an unverified product fact.

## Product
- [Decision Audit](${en("/product/decision-audit")}): which product data to fix first, ranked by how many shoppers need it.
- [Decision Verification](${en("/product/decision-verification")}): the same measurement on the repaired export, so a fix can be proved without traffic.
- [Decision Monitor](${en("/product/decision-monitor")}): what decays in a catalogue over time, and where.
- [Decision API](${en("/product/decision-api")}): the endpoints behind all of it.

## Research and method
- [Why Pulse](${en("/why")}): the argument, with the datasets attached.
- [The method](${en("/why/method")}): how decision information is measured and why bits rather than clicks.
- [Compared with what exists](${en("/why/compare")}): where other tools in this space stop.
- [The limits](${en("/why/limits")}): what the measurement does not tell you.

## Company
- [About Resolve Labs](${en("/about")}): who builds this, and what we cannot show yet.
- [Pricing](${en("/pricing")}): how it is charged.
- [Contact](${en("/contact")}): how to reach the team.

## For developers
- [Developer handbook](${SITE.docs}): the API reference, SDK and integration guides. English and Vietnamese.
- [API reference](${SITE.docs}/api/v1): endpoints, authentication and the shared error envelope.
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

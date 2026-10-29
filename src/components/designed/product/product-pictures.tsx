/**
 * The product pages' pictures, the owner's generated sets (28 Oct 2026), in place of the drawings that
 * stood in for them: the five storefront pages, Return Verification, Promotion Audit, the gain
 * cards of Decision Monitor and Decision Verification, and the two solution pages. The hero is the
 * page's `heroImage`, in its content; a page whose situation or output section is a picture rather
 * than a panel has one here.
 *
 * Transparent PNGs served as WebP, 3 : 2 like the boxes `ChapterPage` sets them in, so the box's own
 * surface shows through and they follow the theme.
 */
import Image from "next/image";
import { img } from "@/lib/cdn";

const FILES: Record<
  string,
  { situation?: string; output?: string; steps: string[]; gains: string[] }
> = {
  "decision-verification": {
    steps: [],
    gains: [
      "product/decision-verification-gain-1-validate-catalogue-improvements.webp",
      "product/decision-verification-gain-2-see-which-repairs-were-not-worth-it.webp",
      "product/decision-verification-gain-3-evidence-for-whoever-signed-it-off.webp",
    ],
  },
  "decision-monitor": {
    steps: [],
    gains: [
      "product/decision-monitor-gain-1-catch-decay-before-a-buyer-does.webp",
      "product/decision-monitor-gain-2-know-the-cause-not-just-the-number.webp",
      "product/decision-monitor-gain-3-compare-quarters-not-snapshots.webp",
    ],
  },
  "promotion-audit": {
    situation: "product/promotion-audit-situation-judged-on-the-day.webp",
    steps: [
      "product/promotion-audit-step-1-export-your-promotion-history.webp",
      "product/promotion-audit-step-2-measure-each-offer-against-doing-nothing.webp",
      "product/promotion-audit-step-3-test-what-is-not-yet-proven.webp",
    ],
    gains: [
      "product/promotion-audit-gain-1-every-offer-net-of-returns.webp",
      "product/promotion-audit-gain-2-where-to-give-nothing.webp",
      "product/promotion-audit-gain-3-a-listing-repair-priced-against-a-discount.webp",
      "product/promotion-audit-gain-4-the-price-shoppers-actually-pay.webp",
      "product/promotion-audit-gain-5-tests-where-the-history-cannot-tell.webp",
    ],
  },
  "return-verification": {
    situation:
      "product/return-verification-situation-reasons-nobody-joins.webp",
    steps: [
      "product/return-verification-step-1-export-orders-and-returns.webp",
      "product/return-verification-step-2-join-returns-to-the-evidence.webp",
      "product/return-verification-step-3-repair-then-verify.webp",
    ],
    gains: [
      "product/return-verification-gain-1-returns-split-yours-and-not-yours.webp",
      "product/return-verification-gain-2-facts-that-go-with-returns-ranked.webp",
      "product/return-verification-gain-3-proof-a-repair-moved-the-right-returns.webp",
      "product/return-verification-gain-4-value-at-your-own-costs.webp",
      "product/return-verification-gain-5-ranking-for-purchases-that-stay-bought.webp",
    ],
  },
  "decision-api": {
    steps: [
      "product/decision-api-step-1-plugs-into-your-store.webp",
      "product/decision-api-step-2-ranks-against-the-session.webp",
      "product/decision-api-step-3-held-back-share.webp",
    ],
    gains: [
      "product/decision-api-gain-1-one-script-no-replatform.webp",
      "product/decision-api-gain-2-breakdown-on-every-product.webp",
      "product/decision-api-gain-3-control-group-by-default.webp",
      "product/decision-api-gain-4-fallback-not-error-page.webp",
    ],
  },
  search: {
    steps: [
      "product/search-step-1-relevance-as-now.webp",
      "product/search-step-2-weighted-by-the-visit.webp",
      "product/search-step-3-a-share-never-sees-it.webp",
    ],
    gains: [
      "product/search-gain-1-intent-parsed-from-the-query.webp",
      "product/search-gain-2-the-factors-named.webp",
      "product/search-gain-3-a-decision-record-per-request.webp",
      "product/search-gain-4-a-control-arm-by-default.webp",
    ],
  },
  recommendations: {
    steps: [
      "product/recommendations-step-1-the-visit-emits.webp",
      "product/recommendations-step-2-the-catalogue-is-ordered.webp",
      "product/recommendations-step-3-exposure-is-logged.webp",
    ],
    gains: [
      "product/recommendations-gain-1-useful-on-visit-one.webp",
      "product/recommendations-gain-2-any-slot-on-any-surface.webp",
      "product/recommendations-gain-3-one-ranker-not-two.webp",
      "product/recommendations-gain-4-falls-back-to-your-own-strip.webp",
    ],
  },
  pages: {
    output: "product/pages-output-one-page-two-arms.webp",
    steps: [
      "product/pages-step-1-the-visit-starts-with-context.webp",
      "product/pages-step-2-it-re-ranks-as-they-move.webp",
      "product/pages-step-3-a-share-sees-your-rule.webp",
    ],
    gains: [
      "product/pages-gain-1-any-grid-any-page.webp",
      "product/pages-gain-2-campaign-context-from-the-first-request.webp",
      "product/pages-gain-3-your-layout-untouched.webp",
      "product/pages-gain-4-a-control-arm-on-every-page.webp",
    ],
  },
  "merchandising-studio": {
    steps: [
      "product/merchandising-studio-step-1-manage-what-the-engine-reads.webp",
      "product/merchandising-studio-step-2-set-the-holdback.webp",
      "product/merchandising-studio-step-3-pull-a-decision-record.webp",
    ],
    gains: [
      "product/merchandising-studio-gain-1-catalogue-and-attributes.webp",
      "product/merchandising-studio-gain-2-persona-tagging.webp",
      "product/merchandising-studio-gain-3-holdback-control.webp",
      "product/merchandising-studio-gain-4-the-decision-record.webp",
    ],
  },
};

// The two solution pages (owner's pick B, 29 Oct 2026): each step and gain is the product page's own
// picture for the same thing, and the three that no product page had were made for them.
FILES["fixable-returns"] = {
  steps: [
    "product/fixable-returns-step-1-find-the-facts-the-catalogue-cannot-answer.webp",
    FILES["return-verification"].steps[1],
    "product/fixable-returns-step-3-repair-then-re-measure.webp",
    FILES["decision-api"].steps[2],
  ],
  gains: [0, 1, 2, 4].map((i) => FILES["return-verification"].gains[i]),
};
FILES["promotions-that-pay"] = {
  steps: [
    FILES["promotion-audit"].steps[1],
    "product/promotions-that-pay-step-2-decide-for-each-group.webp",
    FILES["return-verification"].steps[2],
  ],
  gains: [0, 1, 2, 4].map((i) => FILES["promotion-audit"].gains[i]),
};

const pic = (src: string, alt: string) => (
  <Image
    key={src}
    src={img(src)}
    alt={alt}
    width={1000}
    height={667}
    sizes="(min-width: 1024px) 36rem, 100vw"
    // Settles into its frame a beat after its words (`fig-pic`, owner's option A, 29 Oct 2026).
    className="fig-pic size-full object-contain"
  />
);

/**
 * A page's pictures for `ChapterPage`: `art.situation` where the page has one, `art.steps` and
 * `gainPictures`. A slug missing from `FILES` fails the build, which is where it should be caught.
 */
export function productPictures(
  slug: string,
  alt: {
    situation?: string;
    output?: string;
    steps: string[];
    gains: string[];
  },
) {
  const f = FILES[slug];
  return {
    situation: f.situation && pic(f.situation, alt.situation ?? ""),
    output: f.output && pic(f.output, alt.output ?? ""),
    steps: f.steps.map((src, i) => pic(src, alt.steps[i])),
    gains: f.gains.map((src, i) => pic(src, alt.gains[i])),
  };
}

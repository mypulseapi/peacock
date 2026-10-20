import { useLocale } from "next-intl";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Section } from "@/components/home/Section";
import { pricingHero, tiers } from "@/content/pricing";

/**
 * Three lines of business, in the order a merchant actually buys them.
 *
 * The cards are the whole page since the 2026-10 review. The "why there is no
 * rate card" note and the five-question FAQ below them both went: the FAQ was
 * the homepage list sliced, so a visitor who scrolled the homepage read it
 * twice, and the note argued a point the fixed fee on the first card already
 * makes.
 */
export default function PricingContent() {
  const locale = useLocale();
  const PRICING_HERO = pricingHero(locale);
  const TIERS = tiers(locale);
  return (
    <>
      {/* The hero went in the 2026-10 review: "only keep this table", and the
          part marked DELETE was this page's "Start with a fixed fee" block with
          its four-box illustration. The cards say the same thing and say it in
          the reader's terms.

          A heading stays, because a page with no h1 is a document with no title
          for a screen reader or a crawler, and the review was asking about the
          marketing block rather than about page structure. */}
      <header className="mx-auto max-w-shell px-5 pt-16 sm:px-6">
        <h1 className="ed-d1 text-[color:var(--ed-ink)]">{PRICING_HERO.eyebrow}</h1>
      </header>

      <Section>
        <div className="grid items-start gap-7 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <article
              key={tier.key}
              className={[
                "flex h-full flex-col rounded-2xl border p-7 lg:p-8",
                tier.featured
                  ? "border-[color:var(--brand-indigo)] bg-[color:var(--brand-lav-50)] shadow-[0_20px_44px_-24px_rgba(61,27,219,.35)]"
                  : "ed-raise border-[color:var(--ed-line)]",
              ].join(" ")}
            >
              {tier.featured && (
                <span className="mb-5 inline-flex w-fit rounded-full bg-[color:var(--brand-indigo)] px-3 py-1 text-[0.6875rem] font-semibold tracking-wider text-[color:var(--brand-on-indigo)] uppercase">
                  Start here
                </span>
              )}
              <h2 className="ed-d4 text-[color:var(--ed-ink)]">{tier.name}</h2>
              <p className="ed-body mt-3">{tier.pitch}</p>

              <p className="ed-rule mt-7 pt-6">
                <span className="ed-num ed-d3 block text-[color:var(--ed-ink)]">{tier.price}</span>
                <span className="mt-1.5 block text-[0.8125rem] text-[color:var(--ed-ink-3)]">{tier.unit}</span>
              </p>

              <ul className="mt-7 flex-1 space-y-4">
                {tier.includes.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[color:var(--brand-indigo)]" aria-hidden />
                    <span className="text-[0.9375rem] leading-[1.7] text-[color:var(--ed-ink-2)]">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={[
                  "group mt-9 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[0.9375rem] font-semibold transition focus-visible:ring-2 focus-visible:ring-[color:var(--brand-indigo)] focus-visible:ring-offset-2 focus-visible:outline-none",
                  tier.featured
                    ? "bg-[color:var(--brand-indigo)] text-[color:var(--brand-on-indigo)] hover:bg-[color:var(--brand-indigo-deep)]"
                    : "border border-[color:var(--ed-line)] text-[color:var(--ed-ink)] hover:border-[color:var(--brand-indigo)]",
                ].join(" ")}
              >
                {tier.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </article>
          ))}
        </div>
      </Section>

    </>
  );
}

/**
 * Converted from `index.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * 2026-10-26, the owner's Direction A section 6 ("Pulse site directions" mockup): the three figures
 * sit on a hairline grid instead of three cards, so the section no longer repeats the product
 * cards above it, and it sits on `card` as a tone step from its neighbours. Each column reads
 * number, finding, source. Figures, links and count-up are unchanged.
 */
import { designedText } from "../t";

const STATS = [
  {
    href: "https://baymard.com/research-articles/have-filters-for-list-item-info",
    source: "2",
    value: 38,
    finding: "3",
  },
  // 79%: Mirasvit audit of 5,470 Magento (Adobe Commerce) sites, Aug 2026
  {
    href: "https://mirasvit.com/blog/magento-structured-data-ai-readiness.html",
    source: "4",
    value: 79,
    finding: "5",
  },
  {
    href: "https://business.adobe.com/blog/ai-traffic-surge-retail-sites-not-machine-readable",
    source: "6",
    value: 393,
    finding: "7",
  },
];

export function ResearchSection() {
  const t = designedText("home.research");
  return (
    <section
      id="research"
      className="scroll-mt-16 border-b border-line bg-card"
    >
      <div className="frame py-20 lg:py-28">
        <h2 className="reveal mx-auto max-w-3xl text-center text-title text-balance text-ink">
          {t("1")}
        </h2>
        {/* Each column is a 3-row subgrid, so numbers, findings and sources line up across columns. */}
        <div className="mt-12 grid border-t border-line md:grid-cols-3 md:divide-x md:divide-line lg:mt-16">
          {STATS.map((s, i) => (
            <div
              key={s.href}
              className={`reveal row-span-3 grid grid-rows-subgrid gap-y-3 border-b border-line py-8 last:border-b-0 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0 lg:py-10 ${i === 1 ? "delay-100" : i === 2 ? "delay-200" : ""}`}
            >
              <p className="text-display text-ink tabular-nums">
                <span data-count={s.value} data-suffix="%">
                  {s.value}%
                </span>
              </p>
              <p className="max-w-xs text-body text-pretty text-ink">
                {t(s.finding)}
              </p>
              <p className="text-sm text-muted">
                <a
                  href={s.href}
                  rel="noopener"
                  className="hit-area inline-flex items-center gap-1.5 rounded-sm underline decoration-line-control underline-offset-2 transition-colors duration-150 ease-out-soft hover:text-ink hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  {t(s.source)}
                  <svg className="size-3.5" aria-hidden="true">
                    <use href="#i-arrow-right" />
                  </svg>
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

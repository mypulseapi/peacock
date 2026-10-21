/**
 * Converted from `index.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { useTranslations } from "next-intl";
export function ResearchSection() {
  const t = useTranslations("designed.home.research");
  return (
    <section id="research" className="scroll-mt-16 border-b border-line">
            <div className="frame">
              <div className="px-6 pt-24 pb-16 text-center lg:pt-32">
                <h2
                  className="reveal mx-auto max-w-5xl text-title text-balance text-ink"
                >
                  {t('1')}
                </h2>
              </div>
              {/* Stats (stats-2 layout): source on top, then number and finding. Each card is a 3-row subgrid, so numbers line up across cards */}
              <div
                className="grid gap-4 pt-6 pb-24 sm:px-6 md:grid-cols-3 lg:px-12 lg:pt-12 lg:pb-32"
              >
                <div
                  className="reveal row-span-3 grid grid-rows-subgrid gap-y-2 rounded-2xl border border-line bg-card shadow-sm p-6"
                >
                  <p className="pb-12 text-sm text-muted">
                    <a
                      href="https://baymard.com/research-articles/have-filters-for-list-item-info"
                      rel="noopener"
                      className="hit-area rounded-sm underline decoration-line-control underline-offset-2 transition-colors duration-150 ease-out-soft hover:text-ink hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                      >{t('2')}</a
                    >
                  </p>
                  <p className="text-display text-ink tabular-nums">
                    <span data-count="38" data-suffix="%">38%</span>
                  </p>
                  <p className="text-body text-ink">
                    {t('3')}
                  </p>
                </div>
                <div
                  className="reveal row-span-3 grid grid-rows-subgrid gap-y-2 rounded-2xl border border-line bg-card shadow-sm p-6 delay-100"
                >
                  {/* 79%: Mirasvit audit of 5,470 Magento (Adobe Commerce) sites, Aug 2026 */}
                  <p className="pb-12 text-sm text-muted">
                    <a
                      href="https://mirasvit.com/blog/magento-structured-data-ai-readiness.html"
                      rel="noopener"
                      className="hit-area rounded-sm underline decoration-line-control underline-offset-2 transition-colors duration-150 ease-out-soft hover:text-ink hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                      >{t('4')}</a
                    >
                  </p>
                  <p className="text-display text-ink tabular-nums">
                    <span data-count="79" data-suffix="%">79%</span>
                  </p>
                  <p className="text-body text-ink">
                    {t('5')}
                  </p>
                </div>
                <div
                  className="reveal row-span-3 grid grid-rows-subgrid gap-y-2 rounded-2xl border border-line bg-card shadow-sm p-6 delay-200"
                >
                  <p className="pb-12 text-sm text-muted">
                    <a
                      href="https://business.adobe.com/blog/ai-traffic-surge-retail-sites-not-machine-readable"
                      rel="noopener"
                      className="hit-area rounded-sm underline decoration-line-control underline-offset-2 transition-colors duration-150 ease-out-soft hover:text-ink hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                      >{t('6')}</a
                    >
                  </p>
                  <p className="text-display text-ink tabular-nums">
                    <span data-count="393" data-suffix="%">393%</span>
                  </p>
                  <p className="text-body text-ink">
                    {t('7')}
                  </p>
                </div>
              </div>
            </div>
          </section>
  );
}

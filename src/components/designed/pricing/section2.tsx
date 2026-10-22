/**
 * How the price grows: audit, repair, monitor, API.
 *
 * New in this pass. The page priced four things without ever saying how they relate, which is the
 * part of this business model a tiered pricing table cannot express: each step is entered only once
 * the previous one has found something worth the next. The row reads left to right on a desktop and
 * stacks in the same order on a phone, where the arrows go because a down arrow between stacked
 * cards says nothing the order has not already said.
 */
import { designedText } from "../t";

const STEPS = [
  { tier: "grows1Tier", name: "grows1Name", body: "grows1Body", out: "grows1Out" },
  { tier: "grows2Tier", name: "grows2Name", body: "grows2Body", out: "grows2Out" },
  { tier: "grows3Tier", name: "grows3Name", body: "grows3Body", out: "grows3Out" },
  { tier: "grows4Tier", name: "grows4Name", body: "grows4Body", out: "grows4Out" },
] as const;

export function Section2Section() {
  const t = designedText("pricing.section1");
  return (
    <section className="border-b border-line bg-surface-1/50">
            <div className="frame py-16 lg:py-20">
              <h2 className="reveal mx-auto max-w-2xl text-center text-title text-balance">
                {t('growsTitle')}
              </h2>
              <ol className="reveal mt-10 grid grid-cols-1 gap-4 delay-100 sm:grid-cols-2 lg:grid-cols-4">
                {STEPS.map((step, i) => (
                  <li key={step.name} className="relative min-w-0">
                    <div className="flex h-full flex-col rounded-2xl border border-line bg-card p-5">
                      <p className="eyebrow-primary">{t(step.tier)}</p>
                      <p className="mt-2 text-lg font-semibold text-balance text-ink">
                        {t(step.name)}
                      </p>
                      <p className="mt-1 text-data text-pretty text-muted">{t(step.body)}</p>
                      <p className="mt-4 border-t border-line pt-3 text-data font-medium text-ink">
                        {t(step.out)}
                      </p>
                    </div>
                    {/* The step onward, drawn only where the row is horizontal. */}
                    {i < STEPS.length - 1 ? (
                      <span
                        className="absolute top-1/2 -right-3 hidden -translate-y-1/2 text-primary lg:block"
                        aria-hidden="true"
                      >
                        <svg className="size-4"><use href="#i-arrow-right" /></svg>
                      </span>
                    ) : null}
                  </li>
                ))}
              </ol>
            </div>
          </section>
  );
}

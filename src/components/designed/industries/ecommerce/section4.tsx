/**
 * Converted from `ecommerce.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Rebuilt from the supplied three-panel design: the shelf as it is, the one repair that was ranked
 * first, and the shelf once that repair lands. Every sentence is the catalogue's own and unchanged;
 * what is new is that the panels now show the thing those sentences describe.
 */
import { designedText } from "../../t";

/**
 * The shelf, and how it divides once screen size is recorded.
 *
 * The bands sum to the shelf and the selected band equals the shortlist, checked in Python:
 * 14 + 26 + 38 + 12 = 90, and the 14 inch band holds the 26 products the after panel claims. The
 * supplied design had 12/26/34/8, which sums to 80 against a stated 90. A figure that does not add
 * up is worse than no figure, and this section's own footnote already says the shape is
 * illustrative, so the counts were adjusted to agree rather than reproduced.
 */
const SHELF_BANDS: { key: string; n: number; on?: boolean }[] = [
  { key: "band1", n: 14 },
  { key: "band2", n: 26, on: true },
  { key: "band3", n: 38 },
  { key: "band4", n: 12 },
];

/** Screen size is recorded on about 63% of the shelf, which is what key 4 says in words. */
const COVERAGE = 63;

/** Tiles that differ only in screen colour: the before panel's whole argument. */
const TINTS = ["a", "b", "c", "d", "c", "b", "d", "a"] as const;

/** A row of near-identical laptops, drawn by the same CSS the hero's catalogue window uses. */
function Tiles({ count, cols }: { count: number; cols: string }) {
  return (
    <div className={`mt-3 grid gap-2 ${cols}`} aria-hidden="true">
      {TINTS.slice(0, count).map((tint, i) => (
        <div key={i} className={`ec-shot ec-shot-${tint} !mb-0 !h-14`}>
          <div className="ec-laptop !h-10 !w-14">
            <div className="ec-laptop-lid !top-0 !left-1.5 !h-7 !w-11 !rounded-sm !border-2" />
            <div className="ec-laptop-base !bottom-0 !h-1.5 !w-14" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** The step between two panels. Decorative: the panel headings already carry the order. */
function Arrow() {
  return (
    <div className="hidden place-items-center lg:grid" aria-hidden="true">
      <svg className="size-5 text-primary">
        <use href="#i-arrow-right" />
      </svg>
    </div>
  );
}

export function Section4Section() {
  const t = designedText("industries.ecommerce.section4");

  return (
    <section className="border-b border-line">
            <div className="frame py-20 lg:py-28">
              <div className="max-w-2xl">
                <h2 className="reveal text-title text-balance">
                  {t('1')}
                </h2>
              </div>

              {/*
                Three panels and two arrows. The arrows are hidden from assistive technology and the
                panels carry the order in their own headings, so nothing is announced twice.

                At `lg` the row reads before, arrow, repair, arrow, after. Below it the arrows go and
                the panels stack, because a filter rail, a product grid and a chooser cannot sit side
                by side in a third of a phone and stay legible.
              */}
              <div className="reveal mt-12 grid grid-cols-1 items-stretch gap-6 delay-100 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.6fr)_auto_minmax(0,1.15fr)] lg:gap-4">

                {/* The shelf as it is */}
                <div className="rounded-2xl border border-line bg-card p-6 lg:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <p className="eyebrow">{t('2')}</p>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-signal-tint px-2.5 py-1 text-xs font-semibold text-signal">
                      <svg className="size-3.5" aria-hidden="true"><use href="#i-circle-alert" /></svg>
                      {t('chipGap')}
                    </span>
                  </div>
                  <p className="mt-3 text-lg font-semibold text-balance text-ink">{t('3')}</p>

                  <div className="mt-5 rounded-xl border border-line bg-surface-1 p-4">
                    <div className="flex items-baseline justify-between">
                      <strong className="text-sm text-ink">{t('shelfName')}</strong>
                      <span className="text-xs text-muted">{t('shelfCount')}</span>
                    </div>
                    {/* The filter that ought to narrow the shelf, and cannot. */}
                    <div className="mt-3 flex items-center gap-2 rounded-lg border border-line bg-card px-3 py-2">
                      <svg className="size-4 shrink-0 text-muted" aria-hidden="true"><use href="#i-compare" /></svg>
                      <span className="min-w-0 flex-1 truncate text-sm text-muted">{t('attributeName')}</span>
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-signal-tint px-2 py-0.5 text-[11px] font-semibold text-signal">
                        {t('notUsable')}
                      </span>
                    </div>
                    <Tiles count={8} cols="grid-cols-4" />
                  </div>

                  <div className="mt-5">
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="text-muted">{t('coverageLabel')}</span>
                      <strong className="text-signal tabular-nums">{COVERAGE}%</strong>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-signal-tint">
                      <div className="h-full rounded-full bg-signal" style={{ width: `${COVERAGE}%` }} />
                    </div>
                  </div>
                  <p className="mt-4 text-data text-pretty text-muted">{t('4')}</p>
                  <p className="mt-3 text-data text-pretty text-muted">{t('5')}</p>
                </div>

                <Arrow />

                {/* The one repair that came first */}
                <div className="mt-7 rounded-2xl border border-line bg-card p-6 text-center lg:mt-0 lg:p-5">
                  <span className="mx-auto -mt-11 mb-4 grid size-12 place-items-center rounded-full bg-primary text-base font-bold text-white shadow-md lg:-mt-10">
                    #1
                  </span>
                  <p className="eyebrow">{t('repairRank')}</p>
                  <p className="mt-2 text-xl font-semibold text-balance text-ink">{t('attributeName')}</p>
                  <p className="mt-2 text-data text-pretty text-muted">{t('repairNote')}</p>

                  <div className="mt-5 space-y-2.5 text-left">
                    {[
                      { label: t('actionRecord'), icon: "#i-file-text" },
                      { label: t('actionShow'), icon: "#i-user-search" },
                    ].map((a) => (
                      <div key={a.label} className="flex items-center gap-3 rounded-xl border border-line px-3 py-2.5">
                        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary">
                          <svg className="size-4" aria-hidden="true"><use href={a.icon} /></svg>
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{a.label}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-3 rounded-xl bg-primary-tint px-3 py-2.5">
                      <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-card text-primary">
                        <svg className="size-4" aria-hidden="true"><use href="#i-chart-pie" /></svg>
                      </span>
                      <span className="min-w-0 flex-1 leading-tight">
                        <span className="block truncate text-sm font-semibold text-ink">{t('auditName')}</span>
                        <span className="block truncate text-xs font-medium text-primary">{t('auditAction')}</span>
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-left text-data text-pretty text-muted">{t('8')}</p>
                </div>

                <Arrow />

                {/* The shelf once the repair lands */}
                <div className="mt-6 rounded-2xl border border-line bg-card p-6 lg:mt-0 lg:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <p className="eyebrow">{t('6')}</p>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary-tint px-2.5 py-1 text-xs font-semibold text-primary">
                      <svg className="size-3.5" aria-hidden="true"><use href="#i-circle-check" /></svg>
                      {t('chipUsable')}
                    </span>
                  </div>
                  <p className="mt-3 text-lg font-semibold text-balance text-ink">{t('7')}</p>

                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* The filter, now answerable, with what each band holds. */}
                    <div className="rounded-xl border border-line bg-surface-1 p-4">
                      <div className="flex items-baseline justify-between">
                        <strong className="min-w-0 truncate text-sm text-ink">{t('attributeName')}</strong>
                        <span className="shrink-0 text-xs text-muted">{t('chooseLabel')}</span>
                      </div>
                      <ul className="mt-3 space-y-1">
                        {SHELF_BANDS.map((band) => (
                          <li
                            key={band.key}
                            className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm ${
                              band.on ? "bg-card font-semibold text-primary" : "text-muted"
                            }`}
                          >
                            <span
                              className={`grid size-4 shrink-0 place-items-center rounded-full border-2 ${
                                band.on ? "border-primary" : "border-line-control"
                              }`}
                              aria-hidden="true"
                            >
                              {band.on ? <span className="size-1.5 rounded-full bg-primary" /> : null}
                            </span>
                            <span className="min-w-0 flex-1 truncate">{t(band.key)}</span>
                            <span className="shrink-0 tabular-nums">{band.n}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What the shopper is finally left to choose between. */}
                    <div className="rounded-xl border border-line bg-surface-1 p-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                        <strong className="text-sm text-ink">{t('shortlistCount')}</strong>
                        <span className="text-xs text-muted">{t('sortLabel')}</span>
                      </div>
                      <Tiles count={6} cols="grid-cols-3" />
                    </div>
                  </div>

                  <p className="mt-4 flex gap-3 rounded-xl bg-primary-tint p-3.5 text-data text-pretty text-ink">
                    <svg className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true"><use href="#i-circle-check" /></svg>
                    <span>{t('9')}</span>
                  </p>
                </div>
              </div>

              <p className="reveal mt-6 max-w-xl text-caption text-muted delay-200">{t('10')}</p>
            </div>
          </section>
  );
}

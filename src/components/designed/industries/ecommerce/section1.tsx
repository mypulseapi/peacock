/**
 * Converted from `ecommerce.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * The hero visual is the supplied layout, built rather than photographed: a catalogue window with
 * its filter rail and product grid, and three cards placed over it. Positioning lives in
 * `globals.css` under `.ec-*`, because four overlapping pieces share one coordinate system and
 * arbitrary-value classes would scatter it across four elements.
 */
import { designedHref, designedText } from "../../t";
import Link from "next/link";
import Image from "next/image";
import { img } from "@/lib/cdn";

/** The six prices on the shelf, in the order the grid reads. */
const PRICES = [
  "$899",
  "$1,099",
  "$1,299",
  "$749",
  "$1,199",
  "$1,049",
] as const;
/** Which tint each tile gets; the laptops differ only by screen colour, which is the point. */
const TINTS = ["a", "b", "c", "d", "c", "b"] as const;

/**
 * Coverage as measured, not as typed.
 *
 * `figureSource` states the counts this shelf was measured on: 216 products, screen size recorded
 * on 136, memory 156, storage 161, processor 54. The percentage is derived from those two numbers
 * rather than written beside them, so the bar, the label and the sentence under the section can
 * never drift apart. Storage is the reason this matters: 161/216 is 74.5%, which the hand-written
 * figure had rounded down to 74.
 */
const SHELF = 216;
const RECORDED = {
  screen: 136,
  memory: 156,
  storage: 161,
  processor: 54,
} as const;
const pct = (n: number) => Math.round((100 * n) / SHELF);

export function Section1Section() {
  const t = designedText("industries.ecommerce.section1");

  /* The filter rail. `Screen size` is the selected one, and the one the section is about. */
  const filters = [
    { label: t("filterBrand") },
    { label: t("filterPrice") },
    { label: t("9"), on: true },
    { label: t("10") },
    { label: t("11") },
    { label: t("12") },
    { label: t("filterGraphics") },
    { label: t("filterBattery") },
    { label: t("filterWeight") },
  ];

  /* The three attributes that are recorded, beside the one that is not. */
  const attrs = [
    { label: t("10"), value: pct(RECORDED.memory) },
    { label: t("11"), value: pct(RECORDED.storage) },
    { label: t("12"), value: pct(RECORDED.processor) },
  ];

  /* The marketplaces the same products are listed on. Brand names are proper nouns, so they are
     not in the catalogue and read the same in both locales; the marks are cropped from the
     designer's own artwork so they match the figures elsewhere on the site. */
  const channels = [
    { name: "Amazon", icon: "icons/channel-amazon.webp" },
    { name: "Google", icon: "icons/channel-google.webp" },
    { name: "Meta", icon: "icons/channel-meta.webp" },
    { name: "Shopify", icon: "icons/channel-shopify.webp" },
    { name: "TikTok", icon: "icons/channel-tiktok.webp" },
  ];

  return (
    <section className="hero-bg overflow-hidden border-b border-line">
      {/*
              A wider container than the page frame, and deliberately so. The visual is 620px of
              catalogue window with a 260px card rail beside it, which needs about 880px; the frame
              gives a 1.25fr column roughly 620px wide, and every card then lands on top of the
              window. `min(1440px, 100%)` is the width the design was drawn at.
            */}
      <div className="mx-auto grid w-[min(1440px,100%)] grid-cols-1 items-center gap-14 px-4 py-20 md:px-8 xl:grid-cols-[minmax(420px,0.85fr)_minmax(0,1.25fr)] xl:gap-x-[70px] xl:py-24">
        <div className="min-w-0">
          <p className="reveal inline-flex rounded-[10px] border border-primary/10 bg-primary/[0.07] px-3.5 py-2 text-xs font-bold tracking-wider text-primary uppercase">
            {t("eyebrow")}
          </p>
          {/* The closing line carries the accent, as the design has it. */}
          <h1 className="reveal mt-6 text-display">{t("1")}</h1>
          <p className="reveal mt-7 max-w-lg text-lg leading-relaxed text-pretty text-muted delay-100">
            {t("2")}
          </p>
          <div className="reveal mt-8 flex flex-wrap gap-3.5 delay-200">
            <Link href={designedHref("/en/contact")} className="btn-primary">
              {t("3")}
              <svg className="size-4" aria-hidden="true">
                <use href="#i-arrow-right" />
              </svg>
            </Link>
            <Link
              href={designedHref("/en/product/decision-audit")}
              className="btn-secondary"
            >
              {t("4")}
            </Link>
          </div>
          <p className="reveal mt-6 flex items-center gap-2.5 text-sm text-muted delay-300">
            <svg className="size-4 shrink-0 text-primary" aria-hidden="true">
              <use href="#i-sparkles" />
            </svg>
            <span>
              <span className="font-semibold text-ink">{t("5")}</span> {t("6")}
            </span>
          </p>
        </div>

        {/*
                The visual. One figure with a single caption rather than a labelled diagram: the
                cards in it repeat numbers the caption states in full, so a screen reader is given
                the sentence and the decoration is hidden from it.
              */}
        <figure className="reveal delay-200 min-w-0">
          <div
            className="ec-hero-visual"
            role="img"
            aria-label={t("figureAlt")}
          >
            <div className="ec-glow" aria-hidden="true" />
            <div className="ec-orbit ec-orbit-1" aria-hidden="true" />
            <div className="ec-orbit ec-orbit-2" aria-hidden="true" />

            <div className="ec-window" aria-hidden="true">
              <div className="ec-window-bar">
                <span style={{ background: "#ff6b6b" }} />
                <span style={{ background: "#ffd05b" }} />
                <span style={{ background: "#43d17d" }} />
              </div>
              <div className="ec-window-body">
                <aside className="ec-filters">
                  <h3>{t("shelfName")}</h3>
                  {filters.map((f) => (
                    <div
                      key={f.label}
                      className={`ec-filter${f.on ? " ec-filter-on" : ""}`}
                    >
                      <span>{f.label}</span>
                      {f.on ? (
                        <span className="ec-filter-dot" />
                      ) : (
                        <svg className="size-3.5 opacity-60">
                          <use href="#i-chevron-down" />
                        </svg>
                      )}
                    </div>
                  ))}
                  <div className="ec-more">
                    <svg className="size-3.5">
                      <use href="#i-plus" />
                    </svg>
                    {t("moreFilters")}
                  </div>
                </aside>
                <div className="ec-products">
                  {PRICES.map((price, i) => (
                    <div key={price + i} className="ec-product">
                      <div className={`ec-shot ec-shot-${TINTS[i]}`}>
                        <div className="ec-laptop">
                          <div className="ec-laptop-lid" />
                          <div className="ec-laptop-base" />
                        </div>
                      </div>
                      <div className="ec-skel ec-skel-long" />
                      <div className="ec-skel ec-skel-short" />
                      <strong className="ec-price">{price}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="ec-coverage" aria-hidden="true">
              <span className="ec-coverage-mark">
                <svg className="size-5">
                  <use href="#i-triangle-alert" />
                </svg>
              </span>
              <div className="flex-1">
                <strong className="block text-sm text-ink">{t("9")}</strong>
                <span className="mt-0.5 block text-xs text-muted">
                  {t("coverageState")}
                </span>
                <div className="mt-2.5 flex items-center gap-2.5">
                  <div className="ec-bar">
                    <div
                      className="ec-bar-fill"
                      style={{ width: `${pct(RECORDED.screen)}%` }}
                    />
                  </div>
                  <strong className="text-xs text-signal-text">
                    {pct(RECORDED.screen)}%
                  </strong>
                </div>
              </div>
            </div>

            <div className="ec-attrs" aria-hidden="true">
              {attrs.map((a) => (
                <div key={a.label} className="ec-attr">
                  <span className="ec-attr-mark">
                    <svg className="size-4">
                      <use href="#i-cpu" />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <strong className="mb-1.5 block text-xs text-ink">
                      {a.label}
                    </strong>
                    <div className="flex items-center gap-2">
                      <div className="ec-mini">
                        <span style={{ width: `${a.value}%` }} />
                      </div>
                      <b className="min-w-[30px] text-[11px] text-muted">
                        {a.value}%
                      </b>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="ec-channels" aria-hidden="true">
              <strong className="mb-4 block text-xs text-ink">
                {t("channelsTitle")}
              </strong>
              <div className="ec-channel-row">
                {channels.map((c) => (
                  <div key={c.name} className="text-center">
                    <Image
                      src={img(c.icon)}
                      alt=""
                      width={128}
                      height={107}
                      sizes="28px"
                      className="mx-auto mb-1 h-[26px] w-auto"
                    />
                    <small className="text-[8px] text-muted">{c.name}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <figcaption className="mt-4 max-w-xl text-caption text-muted">
            {t("figureSource")}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

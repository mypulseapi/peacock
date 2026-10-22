import { Layers, MemoryStick, HardDrive, Cpu, Plus, ChevronDown } from "lucide-react";
import { designedText } from "../../t";

/**
 * The ecommerce hero's figure: the shelf the headline describes.
 *
 * The copy says "your shelf has ninety products and no way to choose between them". This draws
 * that: a category of near-identical laptops, a filter rail where the field that would separate
 * them is the one nobody filled in, and the coverage behind each filter.
 *
 * **Every percentage here is measured**, from the 216-product laptop shelf on `/why/method`:
 * screen size on 136, memory on 156, storage on 161, processor on 54. They are the same four
 * attributes the coverage chart below this figure ranks, so the two cannot disagree, and
 * `ATTRIBUTES` is the only place they are written down.
 *
 * Built rather than drawn. A flat component keeps the text as text, which means it translates,
 * it renders Vietnamese diacritics correctly, it stays crisp at any density, and it costs no
 * image bytes on a page whose weight we have just spent effort reducing.
 *
 * The prices and the product tiles are furniture: they say "six things that look alike", which
 * is the point, and no claim rests on them.
 */

/**
 * The measured shelf: 216 products, with the command that reproduces it on `/why/method`.
 *
 * `pct` is the PUBLISHED percentage, not one recomputed from `recorded`. The coverage chart
 * directly below this figure already shows 63, 72, 74 and 25, and those are rounded
 * inconsistently: 136/216 is 62.96 shown as 63, while 161/216 is 74.54 shown as 74. Recomputing
 * here produced 62 against the chart's 63, and two figures on one page disagreeing about the same
 * shelf is worse than either rounding. The counts are kept beside them because they are the
 * actual measurement and the percentage is a presentation of it.
 */
const ATTRIBUTES = [
  { key: "screen", recorded: 136, pct: 63, Icon: Layers },
  { key: "memory", recorded: 156, pct: 72, Icon: MemoryStick },
  { key: "storage", recorded: 161, pct: 74, Icon: HardDrive },
  { key: "processor", recorded: 54, pct: 25, Icon: Cpu },
] as const;

/** Six tiles, two rows. Prices differ so they read as distinct products, nothing more. */
const TILES = ["$899", "$1,099", "$1,299", "$749", "$1,199", "$1,049"];

export function ShelfScene() {
  const t = designedText("industries.ecommerce.scene");

  const [screen, ...rail] = ATTRIBUTES;
  const filters = [
    t("filterBrand"),
    t("filterPrice"),
    t("filterScreen"),
    t("filterMemory"),
    t("filterStorage"),
    t("filterProcessor"),
    t("filterGraphics"),
    t("filterBattery"),
    t("filterWeight"),
  ];

  return (
    <div className="shelf-scene">
      {/* The worst of the four, called out above the shelf it breaks. */}
      <div className="shelf-alert">
        <span className="shelf-alert-mark">
          <screen.Icon className="size-4" aria-hidden="true" />
        </span>
        <span className="shelf-alert-body">
          <strong>{t("filterScreen")}</strong>
          <small>{t("missing")}</small>
          <span className="shelf-meter">
            <span className="shelf-meter-fill shelf-meter-warn" style={{ width: `${screen.pct}%` }} />
            <em>{screen.pct}%</em>
          </span>
        </span>
      </div>

      <div className="shelf-body">
        {/* The storefront. A category page, as a shopper meets it. */}
        <div className="shelf-window">
          <div className="shelf-chrome" aria-hidden="true">
            <i /><i /><i />
          </div>
          <div className="shelf-inner">
            <div className="shelf-filters">
              <p className="shelf-category">{t("category")}</p>
              <ul>
                {filters.map((label) => (
                  <li key={label} className={label === t("filterScreen") ? "is-current" : undefined}>
                    {label}
                    <ChevronDown className="size-3 shrink-0 opacity-50" aria-hidden="true" />
                  </li>
                ))}
              </ul>
              <p className="shelf-more">
                <Plus className="size-3" aria-hidden="true" />
                {t("moreFilters")}
              </p>
            </div>

            <ul className="shelf-grid">
              {TILES.map((price, i) => (
                <li key={price} className="shelf-tile">
                  {/* A laptop, flat: lid, screen, base. Six of them, alike on purpose. */}
                  <span className="shelf-laptop" data-tint={i % 3} aria-hidden="true">
                    <span className="shelf-laptop-lid" />
                    <span className="shelf-laptop-base" />
                  </span>
                  <span className="shelf-line" />
                  <span className="shelf-line shelf-line-short" />
                  <span className="shelf-price">{price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* What the other three filters are standing on. */}
        <div className="shelf-rail">
          {rail.map(({ key, pct, Icon }) => (
            <div key={key} className="shelf-stat">
              <span className="shelf-stat-mark">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="shelf-stat-body">
                <strong>{t(`filter${key[0].toUpperCase()}${key.slice(1)}`)}</strong>
                <span className="shelf-meter">
                  <span className="shelf-meter-fill" style={{ width: `${pct}%` }} />
                  <em>{pct}%</em>
                </span>
              </span>
            </div>
          ))}

          <div className="shelf-channels">
            <p>{t("channels")}</p>
            <ul>
              {["Amazon", "Google", "Meta", "Shopify", "TikTok"].map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="shelf-source">{t("source")}</p>
    </div>
  );
}

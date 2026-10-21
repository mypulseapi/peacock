import Image from "next/image";
import { img } from "@/lib/cdn";
import { renderLocale } from "@/i18n/render-locale";

/**
 * The product hero's figure: one shelf item, and the attribute a purchase turns on.
 *
 * What came before this said nothing. It was a field of faint squares with a few coloured ones
 * scattered through it, which is decoration: a visitor could not tell from it what the product
 * does, and the report was exactly that. Before that it was four MP4s per page, 9.5MB, playing a
 * sped-up screen tour nobody asked for.
 *
 * This draws the argument instead, in the smallest form that still carries it. A product, four
 * attributes, three of them recorded and one not, and the one that is missing is the one the
 * decision turns on, so it is ranked first and drawn in Signal. That is the whole Decision Audit
 * in one card, and the shelf figure further down the page then tells it at length.
 *
 * Why this is markup and not an SVG
 * ---------------------------------
 * Because of the words. An SVG carries its text as drawn glyphs, which is why the designer's
 * exported figures needed a build step to put the Vietnamese back. Here the four attribute names
 * come from the catalogue through `t`, so the figure is translated by the same mechanism as the
 * paragraph beside it, with nothing to re-export when a word changes. The values are numbers and
 * units, which read the same in both languages.
 *
 * Every colour is a `--color-*` token. The version this replaces reached for `--primary`, which
 * is a legacy token resolving to a harsh indigo, and for `--warn` and `--surface-2`, which do not
 * exist at all, so it shipped in colours nobody chose.
 */
type Variant = "audit" | "verification" | "monitor";

/**
 * The product, and the row nobody recorded, per page.
 *
 * A photograph rather than a drawn shape. A merchant recognises their own shelf in a product
 * shot and does not recognise it in a rounded rectangle, and recognising it is the entire job of
 * this figure: the argument only lands once you accept that the thing in the picture is the thing
 * you sell.
 *
 * All three are shot on white with no alpha, so each sits on a plate whose background does not
 * follow the theme. Dropped straight onto the card they would be a white block the moment the
 * theme flipped.
 */
const STORY: Record<Variant, { gap: number; after: string; photo: string; w: number; h: number }> = {
  // The audit finds the gap and ranks it. Nothing is filled in yet.
  audit: {
    gap: 0,
    after: "",
    photo: "product/gaming-laptop-missing-attributes.webp",
    w: 1536,
    h: 1024,
  },
  // Verification shows the same shelf once the top gap has been closed, so the value is there.
  verification: {
    gap: 0,
    after: '15.6"',
    photo: "product/office-laptop-missing-attributes.webp",
    w: 1536,
    h: 1024,
  },
  // Monitor watches a shelf that was complete and is not any more, so the gap is further down.
  monitor: {
    gap: 2,
    after: "",
    photo: "product/shopper-comparing-laptops-in-store.webp",
    w: 1697,
    h: 927,
  },
};

export function HeroScene({
  variant,
  labels,
}: {
  variant: Variant;
  /** The four attribute names, already translated by the caller. */
  labels: [string, string, string, string];
}) {
  const { gap, after, photo, w, h } = STORY[variant];
  const locale = renderLocale();
  // Values, not prose: a size, a capacity, a part number. They need no translation, which is why
  // the figure can carry data at all without a second catalogue.
  const values = ['15.6"', "16 GB", "512 GB", "i7"];

  /*
   * Ranked order, which means the decisive row is the first row.
   *
   * The first version kept the catalogue's order and only moved the rank number, so Monitor read
   * 2, 3, 1, 4 down the list with rank 1 sitting third. A ranked list whose numbers do not
   * descend is not a ranked list, it is a mistake the reader has to explain to themselves.
   */
  const order = [gap, ...labels.map((_, i) => i).filter((i) => i !== gap)];

  return (
    <figure className="hero-figure" aria-hidden="true">
      <div className="hero-figure-card">
        {/* The product itself, on its plate. */}
        <div className="hero-figure-product">
          <Image
            src={img(photo)}
            alt=""
            width={w}
            height={h}
            priority
            sizes="(min-width: 1024px) 28rem, 90vw"
            className="h-44 w-auto object-contain"
          />
        </div>

        <ul className="hero-figure-rows">
          {order.map((i, position) => {
            const label = labels[i];
            const missing = i === gap;
            return (
              <li
                key={label}
                /*
                 * Three states, not two. On the audit the decisive row is empty and reads as a
                 * problem; on verification that same row now carries its value, so it has to read
                 * as resolved. Leaving it in Signal with a value in it said "urgent" and "fixed"
                 * at once, which is the one thing the figure must not do.
                 */
                className={
                  missing
                    ? after
                      ? "hero-figure-row hero-figure-row-done"
                      : "hero-figure-row hero-figure-row-gap"
                    : "hero-figure-row"
                }
                style={{ "--i": position } as React.CSSProperties}
              >
                <span className="hero-figure-rank">{position + 1}</span>
                <span className="hero-figure-label" lang={locale}>
                  {label}
                </span>
                <span className="hero-figure-value">
                  {missing ? (after ? after : "—") : values[i]}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </figure>
  );
}

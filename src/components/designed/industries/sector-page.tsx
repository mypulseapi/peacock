/**
 * One sector page, for all six sectors (owner's version A, 27 Oct 2026): the product pages' order,
 * so an industry page reads like Return Verification. In place of 36 converted section files that
 * were three-quarters the same markup.
 *
 * Every word is the page's own, from `industries.<slug>.sectionN` in `messages/designed.*.json`,
 * and every picture is the one the page already had. What a sector does differently is data in
 * `sectors.tsx`: its figures, its pictures, and the two pieces only Ecommerce draws in code.
 *
 *   hero         the headline centred, the picture under it, the three beats under that
 *   right now    the figures, beside the sector's scene
 *   problem      the buyer's question and what goes wrong, beside the sector's picture
 *                (a drawn mockup, `drawings.tsx`, wherever a sector has no picture yet)
 *   coverage     the ranked list, drawn like the Decision Audit's, then where the fact lives
 *   the shelf    before and after: a slider where there are two pictures, else the two lists
 *   what we do   the three steps as a pipeline, then the four things it does not take
 *   closing      the call to action, as before
 */
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ProblemDrawing, SceneDrawing, ShelfDrawing } from "./drawings";
import { img } from "@/lib/cdn";
import { designedHref, designedText } from "../t";
import { CompareSlider } from "../product/compare-slider";

/** A picture on the CDN; `alt` is its message key, `"section1.figureAlt"`, so it follows the locale. */
export interface SectorPicture {
  src: string;
  width: number;
  height: number;
  alt: `section${number}.${string}`;
}

export interface Sector {
  slug: string;
  /** The figure on each row of "right now", in order (section2 rows 2–3, 4–5, 6–7). */
  stats: string[];
  /** Coverage of each ranked attribute, in percent, rank 1 first (section3 rows 17–20). */
  coverage: number[];
  /** The hero picture, or a figure the sector draws itself. */
  hero: SectorPicture | ReactNode;
  scene?: SectorPicture;
  problem?: SectorPicture;
  /** The sector's product, as a mark: what its drawn pictures show on the shelf. */
  product: LucideIcon;
  /** One mark per ranked attribute, in the coverage order: the icon beside it in the list and the row. */
  icons: LucideIcon[];
  /** One mark per place the fact already lives (`section3.source1`…), for the source map. */
  sourceIcons: LucideIcon[];
  /** A sector's own picture of where the fact lives, in place of the source map (Distribution's). */
  livesFigure?: ReactNode;
  /** Two pictures of the same shelf, for the slider. */
  shelf?: { before: SectorPicture; after: SectorPicture };
  /** A sector's own before-and-after figure, in place of the two lists (Ecommerce). */
  repair?: ReactNode;
  /**
   * FMCG writes its problem chapter as four labelled reasons with a line each (`item1`…`item4`
   * and their `Body`), under its own `heading`, and names the evidence `evidenceTitle`.
   */
  labelledReasons?: boolean;
}

const isPicture = (h: Sector["hero"]): h is SectorPicture =>
  typeof h === "object" && h !== null && "src" in h;

/** A picture's alt text, from the sector's own messages. */
function altOf(slug: string, p: SectorPicture) {
  const [section, key] = p.alt.split(".");
  return designedText(`industries.${slug}.${section}`)(key);
}

/** The picture frame the sector images were drawn for: opaque, so it reads in both themes. */
function Picture({
  slug,
  p,
  sizes,
  priority,
}: {
  slug: string;
  p: SectorPicture;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-[#fdfdfd]">
      <Image
        src={img(p.src)}
        alt={altOf(slug, p)}
        width={p.width}
        height={p.height}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full"
      />
    </div>
  );
}

const Check = ({ muted = false }: { muted?: boolean }) => (
  <svg
    className={`mt-1 size-4 shrink-0 ${muted ? "text-muted" : "text-primary"}`}
    aria-hidden="true"
  >
    <use href={muted ? "#i-x" : "#i-check"} />
  </svg>
);

const BEATS = ["step1", "step2", "step3"] as const;

export function SectorPage({ s }: { s: Sector }) {
  const ns = `industries.${s.slug}`;
  const t1 = designedText(`${ns}.section1`);
  const t2 = designedText(`${ns}.section2`);
  const t3 = designedText(`${ns}.section3`);
  const t4 = designedText(`${ns}.section4`);
  const t5 = designedText(`${ns}.section5`);
  const t6 = designedText(`${ns}.section6`);
  const tp = designedText("industries.sectorPage");
  // Ecommerce's lede is key 2 and it has no beats; the others use `lede` and three beats.
  const lede = t1("lede") === "lede" ? t1("2") : t1("lede");
  const hasBeats = t1("step1") !== "step1";
  const reasons = s.labelledReasons
    ? ["item1", "item2", "item3", "item4"].map((k) => ({
        title: t3(k),
        body: t3(`${k}Body`),
      }))
    : ["4", "5", "6", "7"].map((k) => ({ title: "", body: t3(k) }));
  const lives = s.labelledReasons
    ? { label: t3("evidenceTitle"), text: t3("evidenceSources") }
    : { label: t3("8"), text: t3("9") };
  const covLabels = ["17", "18", "19", "20"].map((k) => t3(k));

  return (
    <>
      {/* Hero: the words centred over a narrow column, the sector's picture under them. */}
      <section className="hero-bg overflow-hidden border-b border-line">
        <div className="frame pt-12 pb-16 lg:pt-16 lg:pb-20">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="reveal text-hero text-balance">{t1("1")}</h1>
            <p className="reveal mx-auto mt-4 max-w-2xl text-body leading-relaxed text-pretty text-muted delay-100">
              {lede}
            </p>
            <div className="reveal mt-7 flex flex-wrap justify-center gap-3 delay-200">
              <Link href={designedHref("/en/contact")} className="btn-primary">
                {t1("3")}
              </Link>
              <Link
                href={designedHref("/en/product/decision-audit")}
                className="btn-secondary"
              >
                {t1("4")}
              </Link>
            </div>
            <p className="reveal mt-5 flex items-center justify-center gap-2.5 text-sm text-muted delay-300">
              <svg className="size-4 shrink-0 text-primary" aria-hidden="true">
                <use href="#i-sparkles" />
              </svg>
              <span>
                <span className="font-semibold text-ink">{t1("5")}</span>{" "}
                {t1("6")}
              </span>
            </p>
          </div>
          <div className="reveal mx-auto mt-10 max-w-5xl delay-200 lg:mt-12">
            {isPicture(s.hero) ? (
              <Picture
                slug={s.slug}
                p={s.hero}
                sizes="(min-width: 1024px) 1024px, 94vw"
                priority
              />
            ) : (
              s.hero
            )}
            {hasBeats && (
              <ol className="mt-6 grid gap-3 sm:grid-cols-3">
                {BEATS.map((key, i) => (
                  <li
                    key={key}
                    className="flex gap-3 rounded-2xl border border-line bg-card p-4"
                  >
                    <span
                      className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-caption font-semibold tabular-nums text-on-primary"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-body font-semibold text-ink">
                        {t1(key)}
                      </p>
                      <p className="mt-1 text-data text-pretty text-muted">
                        {t1(`${key}Body`)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </section>

      {/* Right now: the figures, beside the sector's scene. */}
      <section className="border-b border-line bg-card">
        <div className="frame grid items-center gap-12 py-20 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16 lg:py-28">
          <div>
            <h2 className="reveal text-title text-balance">{t2("1")}</h2>
            <Stats s={s} t={t2} className="mt-10" />
          </div>
          <div className="reveal mx-auto w-full max-w-sm delay-100 lg:mr-0">
            {s.scene ? (
              <Picture
                slug={s.slug}
                p={s.scene}
                sizes="(min-width: 1024px) 24rem, 90vw"
              />
            ) : (
              <div className="aspect-[760/1230]">
                <SceneDrawing product={s.product} icons={s.icons} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* The problem, as a chapter: the sector's picture beside the buyer's question. */}
      <section className="border-b border-line">
        <div className="frame grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div className="reveal">
            {s.problem ? (
              <Picture
                slug={s.slug}
                p={s.problem}
                sizes="(min-width: 1024px) 48vw, 92vw"
              />
            ) : (
              <div className="aspect-[1100/755]">
                <ProblemDrawing product={s.product} icons={s.icons} />
              </div>
            )}
          </div>
          <div className="reveal delay-100">
            <h2 className="text-title text-balance">
              {s.labelledReasons ? t3("heading") : t3("1")}
            </h2>
            <p className="mt-8 text-sm text-muted">{t3("2")}</p>
            <p className="mt-2 font-title text-h2 text-balance text-ink">
              {t3("3")}
            </p>
            <Reasons items={reasons} className="mt-8" />
          </div>
        </div>
      </section>

      {/* Coverage: the ranked list, as the Decision Audit's "The list you actually receive" draws it,
          then where the rank-1 fact already lives, wired into the catalogue row that lacks it. */}
      <section className="border-b border-line bg-surface-1">
        <div className="frame py-20 lg:py-28">
          <div className="reveal mx-auto max-w-5xl rounded-2xl border border-line bg-card p-5 sm:p-7">
            <h2 className="text-body font-semibold text-balance text-ink">
              {t3("14")}
            </h2>
            <div className="mt-5 hidden grid-cols-[minmax(0,1.2fr)_minmax(0,1.6fr)_4.5rem] gap-6 px-3 text-caption text-muted sm:grid">
              <span>{t3("15")}</span>
              <span aria-hidden="true" />
              <span className="text-right">{t3("16")}</span>
            </div>
            <ol className="mt-2 grid gap-1">
              {s.coverage.map((pct, i) => {
                const Icon = s.icons[i];
                const top = i === 0;
                return (
                  <li
                    key={covLabels[i]}
                    className={`reveal grid grid-cols-[minmax(0,1fr)_4.5rem] items-center gap-x-6 gap-y-2 rounded-xl px-3 py-3 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1.6fr)_4.5rem] ${top ? "border border-signal bg-signal-tint" : "border border-transparent"} delay-${(i + 1) * 100}`}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span
                        className={`grid size-8 shrink-0 place-items-center rounded-lg ${top ? "bg-signal text-on-step" : "bg-baseline text-on-primary"}`}
                        aria-hidden="true"
                      >
                        <Icon className="size-4.5" strokeWidth={2} />
                      </span>
                      <span className="text-h3 text-ink">{covLabels[i]}</span>
                    </span>
                    <span
                      className="col-span-full block h-2 overflow-hidden rounded-full bg-surface-1 sm:col-span-1"
                      aria-hidden="true"
                    >
                      <span
                        className="reveal-bar block h-full rounded-full bg-chart-main"
                        style={{ width: `${pct}%` }}
                      />
                    </span>
                    <span className="row-start-1 text-right font-mono text-h3 tabular-nums text-primary sm:row-start-auto">
                      {pct}%
                    </span>
                  </li>
                );
              })}
            </ol>
            <p className="mt-4 px-3 text-caption text-pretty text-muted">
              {t3("21")}
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl lg:mt-20">
            <h2 className="reveal text-title text-balance">
              {lives.label.replace(/:\s*$/, "")}
            </h2>
            {s.livesFigure ? (
              <div className="reveal mt-10 delay-100">{s.livesFigure}</div>
            ) : (
              <SourceMap
                sources={s.sourceIcons.map((I, n) => ({
                  Icon: I,
                  name: t3(`source${n + 1}`),
                }))}
                fields={covLabels.map((label, i) => ({
                  label,
                  Icon: s.icons[i],
                }))}
                rowLabel={tp("catalogueRow")}
                missing={tp("notRecorded")}
              />
            )}
            {/* FMCG's sentence is the list of its sources, which the map already names. */}
            {!s.labelledReasons && (
              <p className="reveal mt-6 max-w-2xl text-body text-pretty text-muted delay-200">
                {lives.text}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* The same shelf, before and after the top gap is closed. */}
      <section className="border-b border-line">
        <div className="frame py-20 lg:py-28">
          <h2 className="reveal mx-auto max-w-2xl text-center text-title text-balance">
            {t4("1")}
          </h2>
          {s.repair ? (
            s.repair
          ) : (
            <>
              <div className="reveal mx-auto mt-12 max-w-xl delay-100 lg:mt-14">
                {s.shelf ? (
                  <CompareSlider
                    before={
                      <Image
                        src={img(s.shelf.before.src)}
                        alt={altOf(s.slug, s.shelf.before)}
                        width={s.shelf.before.width}
                        height={s.shelf.before.height}
                        sizes="(min-width: 768px) 36rem, 92vw"
                        className="size-full object-cover"
                      />
                    }
                    after={
                      <Image
                        src={img(s.shelf.after.src)}
                        alt={altOf(s.slug, s.shelf.after)}
                        width={s.shelf.after.width}
                        height={s.shelf.after.height}
                        sizes="(min-width: 768px) 36rem, 92vw"
                        className="size-full object-cover"
                      />
                    }
                    beforeLabel={t4("2")}
                    afterLabel={t4("6")}
                    aspect="aspect-[862/1000]"
                  />
                ) : (
                  <CompareSlider
                    before={
                      <ShelfDrawing product={s.product} icons={s.icons} />
                    }
                    after={
                      <ShelfDrawing product={s.product} icons={s.icons} after />
                    }
                    beforeLabel={t4("2")}
                    afterLabel={t4("6")}
                    aspect="aspect-[862/1000]"
                  />
                )}
              </div>
              <div className="mx-auto mt-12 grid max-w-5xl gap-10 md:grid-cols-2 md:gap-16">
                {(
                  [
                    [t4("2"), ["3", "4", "5"], true],
                    [t4("6"), ["7", "8", "9"], false],
                  ] as const
                ).map(([label, keys, before]) => (
                  <div key={label} className="reveal">
                    <h3 className="text-h3 text-ink">{label}</h3>
                    <ul className="mt-4">
                      {keys.map((k) => (
                        <li key={k} className="flex gap-3 py-2">
                          <Check muted={before} />
                          <span
                            className={`text-body text-pretty ${before ? "text-muted" : "text-ink"}`}
                          >
                            {t4(k)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
          <p className="reveal mx-auto mt-6 max-w-5xl text-center text-caption text-muted">
            {t4("10")}
          </p>
        </div>
      </section>

      {/* What we do: the three steps as one pipeline, then what it does not take. */}
      <section className="border-b border-line bg-primary-wash">
        <div className="frame py-20 lg:py-28">
          <div className="reveal mx-auto max-w-2xl text-center">
            <h2 className="text-title text-balance">{t5("1")}</h2>
            <p className="mt-4 text-lg text-pretty text-muted">{t5("2")}</p>
          </div>
          <ol className="mt-12 grid gap-4 lg:mt-14 lg:grid-cols-3 lg:gap-10">
            {[
              ["3", "4"],
              ["5", "6"],
              ["7", "8"],
            ].map(([title, body], i) => (
              <li
                key={title}
                className="reveal relative rounded-3xl border border-line bg-card p-6"
              >
                {i > 0 && (
                  <svg
                    viewBox="0 0 24 24"
                    className="absolute top-1/2 -left-8 hidden size-6 -translate-y-1/2 text-primary lg:block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                )}
                <span className="badge-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-h3 text-balance text-ink">
                  {t5(title)}
                </h3>
                <p className="mt-2 text-body text-pretty text-muted">
                  {t5(body)}
                </p>
              </li>
            ))}
          </ol>
          <ul
            className="reveal mt-8 flex flex-wrap justify-center gap-2"
            aria-label="What it takes"
          >
            {["9", "10", "11", "12"].map((k) => (
              <li
                key={k}
                className="flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-sm text-ink"
              >
                <svg className="size-3.5 text-primary" aria-hidden="true">
                  <use href="#i-check" />
                </svg>
                {t5(k)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cta-dots" data-cta>
        <div className="frame py-24 text-center lg:py-32">
          <h2 className="reveal mx-auto max-w-3xl text-headline text-balance">
            {t6("1")}
          </h2>
          <p className="reveal mx-auto mt-6 max-w-xl text-lg text-pretty text-muted delay-100">
            {t6("2")}
          </p>
          <div className="reveal mt-8 flex flex-wrap justify-center gap-3 delay-200">
            <Link href={designedHref("/en/contact")} className="btn-primary">
              {t6("3")}
            </Link>
            <Link href={designedHref("/en/pricing")} className="btn-secondary">
              {t6("4")}
            </Link>
          </div>
          <p className="reveal mx-auto mt-6 max-w-md text-sm text-pretty text-muted delay-300">
            {t6("5")}
          </p>
        </div>
      </section>
    </>
  );
}

/**
 * Where the rank-1 fact already lives: each source wired into one catalogue row, where that field is
 * the amber missing blank and the others are recorded. The sources and the wires fade in after the
 * row, so the eye goes source, wire, gap; with reduced motion all of it shows at once.
 */
function SourceMap({
  sources,
  fields,
  rowLabel,
  missing,
}: {
  sources: { Icon: LucideIcon; name: string }[];
  fields: { label: string; Icon: LucideIcon }[];
  rowLabel: string;
  missing: string;
}) {
  const n = sources.length;
  // Each wire leaves its source card's middle and meets the first field of the row.
  const ys = sources.map((_, i) => ((i + 0.5) / n) * 100);
  return (
    <div className="mt-10 grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_7rem_minmax(0,1.15fr)] lg:gap-0">
      <ul className="grid gap-3">
        {sources.map(({ Icon, name }, i) => (
          <li
            key={name}
            className={`reveal flex items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3.5 delay-${(i + 1) * 100}`}
          >
            <span
              className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary"
              aria-hidden="true"
            >
              <Icon className="size-4.5" strokeWidth={2} />
            </span>
            <span className="text-body font-medium text-ink">{name}</span>
          </li>
        ))}
      </ul>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="reveal hidden h-full w-full delay-300 lg:block"
        aria-hidden="true"
      >
        <g
          fill="none"
          className="stroke-primary"
          strokeWidth="1.6"
          strokeDasharray="4 3"
          vectorEffect="non-scaling-stroke"
        >
          {ys.map((y) => (
            <path
              key={y}
              d={`M0 ${y} C50 ${y} 50 30 100 30`}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
      </svg>
      <div className="reveal overflow-hidden rounded-2xl border border-line bg-card delay-100">
        <p className="border-b border-line bg-surface-1 px-4 py-2.5 text-caption text-muted">
          {rowLabel}
        </p>
        <ul>
          {fields.map(({ label, Icon }, i) => (
            <li
              key={label}
              className={`grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-3 border-t border-line px-4 py-3 first:border-t-0 ${i === 0 ? "bg-gap-fill/60" : ""}`}
            >
              <span className="flex min-w-0 items-center gap-2.5 text-body text-ink">
                <Icon
                  className="size-4 shrink-0 text-muted"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                {label}
              </span>
              {i === 0 ? (
                <span className="justify-self-start rounded-md border border-dashed border-gap bg-gap-fill px-2 py-0.5 text-caption font-semibold text-gap-strong">
                  {missing}
                </span>
              ) : (
                <span
                  className="block h-2 w-3/4 rounded-full bg-baseline/40"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** The figures of "right now": one row per figure, its claim and its source. */
function Stats({
  s,
  t,
  className = "",
}: {
  s: Sector;
  t: (k: string) => string;
  className?: string;
}) {
  return (
    <ul
      className={`reveal divide-y divide-line border-y border-line ${className}`}
    >
      {s.stats.map((figure, i) => (
        <li
          key={figure + i}
          className="flex items-baseline gap-5 py-5 sm:gap-8"
        >
          <p className="w-20 shrink-0 font-display text-h1 font-semibold tabular-nums text-ink sm:w-24">
            {figure}
          </p>
          <div>
            <p className="text-body text-pretty text-ink">
              {t(String(2 + i * 2))}
            </p>
            <p className="mt-1 text-caption text-muted">
              {t(String(3 + i * 2))}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** What usually goes wrong: a missing cell beside each reason, with its label where it has one. */
function Reasons({
  items,
  className = "",
}: {
  items: { title: string; body: string }[];
  className?: string;
}) {
  return (
    <ul className={`divide-y divide-line ${className}`}>
      {items.map((r) => (
        <li key={r.body} className="flex gap-3.5 py-4 first:pt-0 last:pb-0">
          <span
            className="mt-1.5 size-3.5 shrink-0 rounded-sm missing-cell"
            aria-hidden="true"
          />
          <div className="min-w-0">
            {r.title && (
              <p className="text-body font-semibold text-ink">{r.title}</p>
            )}
            <p
              className={`text-body text-pretty ${r.title ? "mt-1 text-muted" : "text-ink"}`}
            >
              {r.body}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

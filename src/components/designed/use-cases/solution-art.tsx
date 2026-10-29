/**
 * The two solution pages, Cut Fixable Returns and Decide Which Promotions Pay, on the product pages'
 * template (`ChapterPage`, owner's pick B, 29 Oct 2026): their hero figure and their pictures.
 *
 * A solution is products in order, so the hero shows the merchant's own data above the products as
 * a numbered row, and every product is a link to its page. The step and gain pictures are drawn
 * here as markup rather than generated, because their labels are words a reader needs and must
 * localise; the words come from each page's content module (`art`).
 *
 * Nothing here is measured (ODIN hires/07-WHAT-WE-DO-NOT-CLAIM.md rule 9). Anything that could read
 * as data carries the "Illustration" badge, bar lengths are shapes rather than values, and no number
 * appears. Motion is the product pages' own: `fig-item` rows and `fig-bar` fills, in `--i` order.
 */
import type { CSSProperties, ReactNode } from "react";
import { Check, CircleSlash, FlaskConical, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { renderLocale } from "@/i18n/render-locale";

export interface ReturnsSolutionArt {
  note: string;
  returns: string;
  /** Three return reasons, each with the fact it names. */
  reasons: [string, string][];
  /** Two reasons no listing could fix. */
  others: [string, string];
  setAside: string;
  yours: string;
  missing: string;
  recorded: string;
  repair: string;
  repaired: string;
  notRepaired: string;
  ranked: string;
  holdback: string;
  fixable: string;
}

export interface PromotionsSolutionArt {
  note: string;
  campaign: string;
  /** Voucher, price cut, free shipping. */
  offers: [string, string, string];
  repair: string;
  noOffer: string;
  kept: string;
  back: string;
  beats: string;
  /** Three groups of shoppers, and the three answers: an offer, no offer, a test. */
  groups: [string, string, string];
  answers: [string, string, string];
  repaired: string;
  notRepaired: string;
}

const at = (i: number): CSSProperties => ({ "--i": i }) as CSSProperties;

/** `GainsCards` frames a full-bleed picture; a drawing sits in the middle of that frame instead. */
const centred = (pictures: ReactNode[]) =>
  pictures.map((p, i) => (
    <div key={i} className="grid h-full place-items-center p-4 sm:p-6">
      {p}
    </div>
  ));

/** A drawn picture's card, sized for the product pages' 3:2 picture panel. */
function Card({
  title,
  badge,
  children,
}: {
  title?: string;
  badge?: string;
  children: ReactNode;
}) {
  return (
    <div className="w-[min(100%,24rem)] rounded-2xl border border-line bg-card p-4 text-left shadow-sm sm:p-5">
      {(title || badge) && (
        <div className="mb-3 flex items-center justify-between gap-3">
          {title && <p className="text-sm font-semibold text-ink">{title}</p>}
          {badge && (
            <span className="badge shrink-0 border-line bg-surface-1 text-muted">
              {badge}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

/** One label and what it comes to, a row each. */
function Rows({ rows }: { rows: [ReactNode, ReactNode][] }) {
  return (
    <ul className="grid">
      {rows.map(([label, value], i) => (
        <li
          key={i}
          className="fig-item flex items-center justify-between gap-3 border-t border-line py-2.5 text-sm text-ink first:border-t-0"
          style={at(i)}
        >
          <span className="min-w-0">{label}</span>
          <span className="shrink-0">{value}</span>
        </li>
      ))}
    </ul>
  );
}

/** A bar of shape, not value: `w` and an optional second, missing-coloured, segment `w2`. */
function Bar({ w, w2 = 0, i }: { w: number; w2?: number; i: number }) {
  return (
    <span className="flex h-2.5 w-full gap-0.5 overflow-hidden rounded-full bg-surface-1">
      <span
        className="fig-bar block h-full rounded-full bg-primary"
        style={{ width: `${w}%`, ...at(i) }}
      />
      {w2 > 0 && (
        <span
          className="fig-bar block h-full rounded-full bg-gap"
          style={{ width: `${w2}%`, ...at(i + 1) }}
        />
      )}
    </span>
  );
}

const Missing = ({ children }: { children: ReactNode }) => (
  <span className="missing-flag">{children}</span>
);
const Aside = ({ children }: { children: ReactNode }) => (
  <span className="badge border-line bg-surface-1 text-muted">{children}</span>
);
const Swatch = ({ className }: { className: string }) => (
  <span className={`size-2.5 rounded-sm ${className}`} aria-hidden="true" />
);

/** Two lines over the same weeks, split at the repair: the comparison, not a result. */
function Lines({
  l,
}: {
  l: { note: string; repair: string; repaired: string; notRepaired: string };
}) {
  return (
    <Card badge={l.note}>
      <svg viewBox="0 0 200 90" className="block w-full" aria-hidden="true">
        <path d="M4 82h192" className="stroke-line" fill="none" />
        <path
          d="M4 38 C40 36 70 40 100 38 S160 40 196 39"
          className="stroke-baseline"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M4 41 C40 39 70 43 100 41 S150 66 196 70"
          className="stroke-primary"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M100 10v72"
          className="stroke-primary"
          strokeDasharray="3 4"
          fill="none"
        />
      </svg>
      <p className="mt-1 text-center text-caption text-muted">{l.repair}</p>
      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-caption text-muted">
        <span className="flex items-center gap-2">
          <Swatch className="bg-baseline" />
          {l.notRepaired}
        </span>
        <span className="flex items-center gap-2">
          <Swatch className="bg-primary" />
          {l.repaired}
        </span>
      </p>
    </Card>
  );
}

/** The hero: the merchant's data, then the products in order, each a link to its page. */
export function SolutionHero({
  panel,
  products,
  note,
}: {
  panel: ReactNode;
  products: { label: string; note: string; href: string }[];
  note?: string;
}) {
  const locale = renderLocale();
  return (
    <div className="rounded-2xl border border-line bg-card text-left">
      <div className="p-5 sm:p-6">{panel}</div>
      <ol
        className={`grid gap-3 border-t border-line p-4 sm:p-5 ${products.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
      >
        {products.map((p, i) => (
          <li key={p.href} className="fig-item" style={at(i + 3)}>
            <Link
              locale={locale}
              href={p.href}
              className="group flex h-full gap-3 rounded-xl border border-line bg-surface-1 p-3 transition-colors duration-200 ease-out-soft hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold tabular-nums text-on-primary">
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-ink group-hover:text-primary">
                  {p.label}
                </span>
                <span className="mt-0.5 block text-caption text-pretty text-muted">
                  {p.note}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
      {note && (
        <p className="border-t border-line px-5 py-3 text-caption text-pretty text-muted sm:px-6">
          {note}
        </p>
      )}
    </div>
  );
}

/** Cut Fixable Returns: the hero panel, then one picture per step and per gain. */
export function returnsArt(l: ReturnsSolutionArt) {
  const facts = l.reasons.map(([, fact]) => fact);
  const panel = (
    <>
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink">{l.returns}</p>
        <span className="badge border-line bg-surface-1 text-muted">
          {l.note}
        </span>
      </div>
      <Rows
        rows={[
          ...l.reasons.map(
            ([reason, fact]) =>
              [reason, <Missing key={fact}>{fact}</Missing>] as [
                ReactNode,
                ReactNode,
              ],
          ),
          ...l.others.map(
            (o) =>
              [o, <Aside key={o}>{l.setAside}</Aside>] as [
                ReactNode,
                ReactNode,
              ],
          ),
        ]}
      />
    </>
  );
  const factsCard = (done: boolean) => (
    <Card>
      <div className="mb-3 flex gap-3">
        <span className="size-12 shrink-0 rounded-lg bg-surface-1" />
        <span className="grid flex-1 content-center gap-2">
          <span className="h-2 w-4/5 rounded-full bg-line" />
          <span className="h-2 w-1/2 rounded-full bg-line" />
        </span>
      </div>
      <Rows
        rows={facts.map((f) => [
          f,
          done ? (
            <span className="badge-primary">
              <Check className="size-3" strokeWidth={3} aria-hidden />
              {l.recorded}
            </span>
          ) : (
            <Missing>{l.missing}</Missing>
          ),
        ])}
      />
    </Card>
  );
  return {
    panel,
    steps: [
      factsCard(false),
      // Return rates compared: products that record each fact against products that do not.
      <Card key="cmp" badge={l.note}>
        <ul className="grid gap-3">
          {facts.map((f, i) => (
            <li key={f} className="fig-item grid gap-1.5" style={at(i * 2)}>
              <span className="text-sm text-ink">{f}</span>
              <Bar w={[30, 26, 22][i]} i={i * 2} />
              <span className="flex h-2.5 w-full overflow-hidden rounded-full bg-surface-1">
                <span
                  className="fig-bar block h-full rounded-full bg-gap"
                  style={{ width: `${[78, 62, 48][i]}%`, ...at(i * 2 + 1) }}
                />
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-caption text-muted">
          <span className="flex items-center gap-2">
            <Swatch className="bg-primary" />
            {l.recorded}
          </span>
          <span className="flex items-center gap-2">
            <Swatch className="bg-gap" />
            {l.missing}
          </span>
        </p>
      </Card>,
      factsCard(true),
      // A share of shoppers never sees the ranking, so its effect can be measured.
      <Card key="hold">
        <div className="grid grid-cols-10 gap-1.5" aria-hidden="true">
          {Array.from({ length: 30 }, (_, i) => (
            <span
              key={i}
              className={`fig-item aspect-square rounded-full ${i % 10 > 7 ? "bg-baseline/50" : "bg-primary"}`}
              style={at(Math.floor(i / 10))}
            />
          ))}
        </div>
        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-caption text-muted">
          <span className="flex items-center gap-2">
            <Swatch className="bg-primary" />
            {l.ranked}
          </span>
          <span className="flex items-center gap-2">
            <Swatch className="bg-baseline/50" />
            {l.holdback}
          </span>
        </p>
      </Card>,
    ],
    gains: centred([
      <div key="split" className="grid w-[min(100%,26rem)] grid-cols-2 gap-3">
        {[
          [l.yours, facts, true],
          [l.setAside, l.others, false],
        ].map(([title, items, ok], c) => (
          <Card key={String(title)}>
            <p
              className={`mb-3 text-sm font-semibold ${ok ? "text-primary" : "text-muted"}`}
            >
              {title as string}
            </p>
            <ul className="grid gap-2">
              {(items as string[]).map((t, i) => (
                <li
                  key={t}
                  className={`fig-item rounded-lg px-2.5 py-1.5 text-caption ${ok ? "bg-primary-tint text-ink" : "bg-surface-1 text-muted"}`}
                  style={at(c + i)}
                >
                  {t}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>,
      <Card key="list" badge={l.note}>
        <ol className="grid gap-3">
          {facts.map((f, i) => (
            <li
              key={f}
              className="fig-item grid grid-cols-[1rem_minmax(0,0.9fr)_minmax(0,1fr)] items-center gap-3 text-sm text-ink"
              style={at(i)}
            >
              <span className="font-semibold tabular-nums">{i + 1}</span>
              <span className="min-w-0">{f}</span>
              <Bar w={[92, 64, 38][i]} i={i} />
            </li>
          ))}
        </ol>
      </Card>,
      <Lines key="lines" l={l} />,
      // The product that keeps coming back for a fixable reason drops down the list.
      <Card key="rank">
        <ul className="grid gap-2">
          {[0, 1, 2, 3].map((i) => (
            <li
              key={i}
              className={`fig-item flex items-center gap-3 rounded-lg border px-3 py-2 ${i === 3 ? "border-dashed border-gap bg-gap-fill" : "border-line bg-surface-1"}`}
              style={at(i)}
            >
              <span className="size-5 shrink-0 rounded bg-line" />
              <span
                className="h-2 rounded-full bg-line"
                style={{ width: `${[60, 48, 70, 54][i]}%` }}
              />
            </li>
          ))}
        </ul>
        <p className="mt-3 text-caption text-gap-strong">{l.fixable}</p>
      </Card>,
    ]),
  };
}

/** Decide Which Promotions Pay: the hero panel, then one picture per step and per gain. */
export function promotionsArt(l: PromotionsSolutionArt) {
  const tone = [
    "badge-primary",
    "badge border-line bg-surface-1 text-muted",
    "missing-flag",
  ];
  const legend = (
    <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-caption text-muted">
      <span className="flex items-center gap-2">
        <Swatch className="bg-primary" />
        {l.kept}
      </span>
      <span className="flex items-center gap-2">
        <Swatch className="bg-gap" />
        {l.back}
      </span>
    </p>
  );
  const panel = (
    <>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink">{l.campaign}</p>
        <span className="badge border-line bg-surface-1 text-muted">
          {l.note}
        </span>
      </div>
      <ul className="grid gap-3">
        {l.offers.map((o, i) => (
          <li
            key={o}
            className="fig-item grid grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] items-center gap-3 text-sm text-ink"
            style={at(i)}
          >
            {o}
            <Bar w={[55, 74, 40][i]} w2={[44, 25, 59][i]} i={i} />
          </li>
        ))}
      </ul>
      {legend}
    </>
  );
  return {
    panel,
    steps: [
      <Card key="beats" title={l.beats} badge={l.note}>
        <Rows
          rows={l.offers.map((o, i) => [
            o,
            i === 1 ? (
              <X className="size-4 text-muted" strokeWidth={2.5} aria-hidden />
            ) : (
              <Check
                className="size-4 text-primary"
                strokeWidth={2.5}
                aria-hidden
              />
            ),
          ])}
        />
      </Card>,
      <Card key="groups" badge={l.note}>
        <Rows
          rows={l.groups.map((g, i) => [
            g,
            <span key={g} className={tone[i]}>
              {l.answers[i]}
            </span>,
          ])}
        />
      </Card>,
      <Lines key="lines" l={l} />,
    ],
    gains: centred([
      <Card key="measure" title={l.kept} badge={l.note}>
        <ul className="grid gap-2.5">
          {[...l.offers, l.repair, l.noOffer].map((o, i) => (
            <li
              key={o}
              className="fig-item grid grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] items-center gap-3 text-sm text-ink"
              style={at(i)}
            >
              {o}
              <Bar w={[48, 62, 36, 70, 52][i]} i={i} />
            </li>
          ))}
        </ul>
      </Card>,
      <Card key="none">
        <div className="flex items-center gap-4">
          <CircleSlash
            className="fig-flag size-14 shrink-0 text-baseline"
            strokeWidth={1.5}
            aria-hidden
          />
          <div>
            <p className="text-sm font-semibold text-ink">{l.answers[1]}</p>
            <p className="mt-1 text-caption text-muted">{l.groups[1]}</p>
          </div>
        </div>
      </Card>,
      <Card key="scale" badge={l.note}>
        <div className="grid grid-cols-2 items-end gap-3">
          <div className="fig-item grid gap-2 text-center" style={at(0)}>
            <span className="badge-primary justify-self-center">
              {l.repair}
            </span>
            <span className="h-16 rounded-lg bg-primary-tint" />
          </div>
          <div className="fig-item grid gap-2 text-center" style={at(1)}>
            <span className="missing-flag justify-self-center">
              {l.offers[0]}
            </span>
            <span className="h-10 rounded-lg bg-gap-fill" />
          </div>
        </div>
        <span className="mt-2 block h-0.5 rounded-full bg-line" />
      </Card>,
      <Card key="test" badge={l.note}>
        <div className="fig-item flex items-center gap-4 rounded-xl border border-dashed border-gap bg-gap-fill p-4">
          <FlaskConical
            className="size-8 shrink-0 text-gap-strong"
            strokeWidth={1.75}
            aria-hidden
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gap-strong">
              {l.answers[2]}
            </p>
            <p className="mt-0.5 text-caption text-ink">
              {l.offers[2]} · {l.groups[2]}
            </p>
          </div>
        </div>
      </Card>,
    ]),
  };
}

/**
 * The hero figure on Return Verification and Promotion Audit (owner, 26 Oct 2026), composed like the
 * other product heroes: the product's own screen on a laptop in the middle, the gains as cards
 * floating either side, and the three steps along the bottom.
 *
 * Those three heroes are raster composites. These are drawn in markup instead (owner's rule: no
 * generated images), which also lets them follow the theme and the locale. Every word is the page's
 * own copy: the screen is the hero panel, the cards are the gains titles, the strip is the steps.
 * And unlike those heroes, no number appears, because neither page may show one
 * (ODIN hires/07-WHAT-WE-DO-NOT-CLAIM.md rule 9); bars are shapes.
 *
 * Below `xl` only the screen and the steps show: the cards repeat the gains section further down,
 * and four of them do not fit a phone.
 */
import type { ReactNode } from "react";
import type { ChapterContent } from "./chapters";
import {
  ReturnsReport,
  PromotionsReport,
  type ReturnsArtText,
  type PromotionsArtText,
} from "./chapter-art";

type Gain = ChapterContent["gets"]["items"][number];

function Laptop({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="overflow-hidden rounded-2xl border-8 border-surface-1 bg-card shadow-window ring-1 ring-line">
        <div className="flex">
          {/* The app's rail, as in the other heroes: a mark and its menu, drawn as shapes. */}
          <div
            className="hidden w-12 shrink-0 flex-col items-center gap-3 border-r border-line bg-surface-0 py-5 sm:flex"
            aria-hidden="true"
          >
            <span className="size-5 rounded-md bg-primary" />
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-1.5 w-5 rounded-full bg-line" />
            ))}
          </div>
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
      <div
        className="-mx-6 h-3 rounded-b-2xl bg-surface-1 ring-1 ring-line"
        aria-hidden="true"
      />
    </div>
  );
}

function Card({ gain, children }: { gain: Gain; children: ReactNode }) {
  const GainIcon = gain.icon;
  return (
    <div className="rounded-2xl border border-line bg-card p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-on-primary">
          <GainIcon aria-hidden className="size-4" />
        </span>
        <p className="text-sm font-semibold text-balance text-ink">
          {gain.title}
        </p>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

const Bar = ({ w, className }: { w: number; className: string }) => (
  <svg
    viewBox="0 0 100 8"
    preserveAspectRatio="none"
    className="h-2 w-full"
    aria-hidden="true"
  >
    <rect
      x="0"
      y="0"
      width="100"
      height="8"
      rx="2"
      className="fill-surface-1"
    />
    <rect x="0" y="0" width={w} height="8" rx="2" className={className} />
  </svg>
);

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="grid grid-cols-5 items-center gap-2 text-xs text-muted">
    <span className="col-span-2 leading-tight">{label}</span>
    <span className="col-span-3">{children}</span>
  </div>
);

const Skeleton = () => (
  <div className="grid gap-2" aria-hidden="true">
    <span className="h-2 w-full rounded-full bg-surface-1" />
    <span className="h-2 w-2/3 rounded-full bg-surface-1" />
  </div>
);

function Figure({
  screen,
  left,
  right,
  steps,
}: {
  screen: ReactNode;
  left: ReactNode;
  right: ReactNode;
  steps: ChapterContent["steps"]["items"];
}) {
  return (
    <figure className="relative isolate">
      <div
        className="absolute inset-x-0 top-8 bottom-24 -z-10 rounded-3xl bg-primary-wash"
        aria-hidden="true"
      />
      {/* The screen keeps its own width and the cards float over its edges, as in the other heroes,
          so the table inside never narrows to its phone layout. The cards need the room either side
          that only `xl` gives; below it they would cover the screen. */}
      <div className="relative px-4 pt-6 lg:pt-10">
        <div className="mx-auto max-w-2xl text-left">
          <Laptop>{screen}</Laptop>
        </div>
        <div className="absolute top-1/2 left-0 z-10 hidden w-64 -translate-y-1/2 gap-5 text-left xl:grid">
          {left}
        </div>
        <div className="absolute top-1/2 right-0 z-10 hidden w-64 -translate-y-1/2 gap-5 text-left xl:grid">
          {right}
        </div>
      </div>
      <ol className="mt-10 grid gap-3 text-left sm:grid-cols-3 lg:mt-12">
        {steps.map((s, i) => (
          <li
            key={s.n}
            className="flex items-center gap-3 rounded-2xl border border-line bg-card p-4 shadow-sm"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-on-primary">
              {i + 1}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-balance text-ink">
                {s.title}
              </span>
              <span className="block text-xs text-muted">{s.meta}</span>
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function ReturnsHero({
  c,
}: {
  c: ChapterContent & { art: ReturnsArtText };
}) {
  const [split, ranked, proof, value] = c.gets.items;
  const l = c.art;
  return (
    <Figure
      screen={<ReturnsReport l={l} />}
      steps={c.steps.items}
      left={
        <>
          <Card gain={split}>
            <div className="grid gap-1.5 text-xs text-pretty text-muted">
              <span className="flex items-center gap-2">
                <span
                  className="size-2.5 rounded-sm bg-chart-missing"
                  aria-hidden="true"
                />
                {l.yours}
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="size-2.5 rounded-sm bg-chart-baseline"
                  aria-hidden="true"
                />
                {l.notYours}
              </span>
            </div>
          </Card>
          <Card gain={proof}>
            <svg
              viewBox="0 0 200 64"
              className="w-full"
              aria-hidden="true"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 58h192" className="stroke-line" strokeWidth="1.5" />
              <path
                d="M104 4v54"
                className="stroke-baseline"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <path
                d="M4 24l25-4 25 5 25-4 25 3 25-1 25 3 42 1"
                className="fill-none stroke-baseline"
                strokeWidth="2.5"
              />
              <path
                d="M4 28l25-4 25 5 25-4 25 3 25 12 25 6 42 4"
                className="fill-none stroke-primary"
                strokeWidth="2.5"
              />
              <circle cx="104" cy="28" r="4" className="fill-primary" />
            </svg>
          </Card>
        </>
      }
      right={
        <>
          <Card gain={ranked}>
            <div className="grid gap-2">
              {l.facts.map((f, i) => (
                <Row key={f} label={f}>
                  <Bar w={[88, 64, 42][i]} className="fill-chart-missing" />
                </Row>
              ))}
            </div>
          </Card>
          <Card gain={value}>
            <Skeleton />
          </Card>
        </>
      }
    />
  );
}

export function PromotionsHero({
  c,
}: {
  c: ChapterContent & { art: PromotionsArtText };
}) {
  const [net, nothing, repair, , tests] = c.gets.items;
  const l = c.art;
  return (
    <Figure
      screen={<PromotionsReport l={l} />}
      steps={c.steps.items}
      left={
        <>
          <Card gain={net}>
            <div className="grid gap-2">
              {(
                [
                  [l.orders, 100, "fill-chart-main/35"],
                  [l.returned, 80, "fill-chart-baseline"],
                  [l.kept, 62, "fill-chart-main"],
                ] as const
              ).map(([t, w, cl]) => (
                <Row key={t} label={t}>
                  <Bar w={w} className={cl} />
                </Row>
              ))}
            </div>
          </Card>
          <Card gain={nothing}>
            <svg
              viewBox="0 0 200 56"
              className="w-full"
              aria-hidden="true"
              strokeLinecap="round"
            >
              {[0, 1, 2].map((g) =>
                Array.from({ length: 6 }, (_, i) => (
                  <circle
                    key={`${g}-${i}`}
                    cx={30 + g * 70 + (i % 3) * 14}
                    cy={18 + Math.floor(i / 3) * 16}
                    r="4.5"
                    className={g === 1 ? "fill-baseline" : "fill-primary"}
                  />
                )),
              )}
              <circle
                cx="114"
                cy="26"
                r="24"
                className="fill-none stroke-baseline"
                strokeWidth="2.5"
              />
              <path
                d="M97 43l34-34"
                className="stroke-baseline"
                strokeWidth="2.5"
              />
            </svg>
          </Card>
        </>
      }
      right={
        <>
          <Card gain={repair}>
            <div className="grid gap-2">
              <Row label={l.offers[4]}>
                <Bar w={72} className="fill-chart-main" />
              </Row>
              <Row label={l.offers[2]}>
                <Bar w={40} className="fill-chart-baseline" />
              </Row>
            </div>
          </Card>
          <Card gain={tests}>
            <div className="flex items-center gap-3">
              <span className="badge-warning">
                <svg className="size-3.5 shrink-0" aria-hidden="true">
                  <use href="#i-flask" />
                </svg>
                {l.test}
              </span>
              <span
                className="h-2 flex-1 rounded-full bg-surface-1"
                aria-hidden="true"
              />
            </div>
          </Card>
        </>
      }
    />
  );
}

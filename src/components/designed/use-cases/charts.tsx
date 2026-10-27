/**
 * The use-case pages' figures, redrawn in the designed tokens (owner's version 1, 27 Oct 2026).
 *
 * The same data as before: each page's `scenes` in its content module and the two figures
 * `StoryVisual` drew. Only the drawing changed. Motion is the site's own, declared in markup for
 * `designed-motion.js`: `.reveal` fades a row in, `.reveal-bar` grows a bar, `[data-count]` counts a
 * figure up. Every number ships in the HTML, so a crawler, reduced motion or no script all read the
 * real figure.
 *
 * One meaning per colour: primary is the answer, sky the work in between, slate the baseline,
 * amber the fact that is missing.
 */
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, Check, CircleHelp } from "lucide-react";
import type {
  AsksSpec,
  BarsSpec,
  DeltaSpec,
  FactsSpec,
  GridSpec,
  SceneSpec,
  Tone,
} from "@/components/story/Scenes";

const BAR: Record<Tone, string> = {
  good: "bg-primary",
  work: "bg-sky",
  hold: "bg-baseline",
  warn: "bg-gap",
};
const delay = (ms: number): CSSProperties => ({ transitionDelay: `${ms}ms` });

/** A figure's own card: a title and an optional badge over its body. */
export function Panel({
  title,
  badge,
  children,
}: {
  title?: string;
  badge?: string;
  children: ReactNode;
}) {
  return (
    <figure className="reveal m-0 rounded-2xl border border-line bg-card p-5 sm:p-6">
      {(title || badge) && (
        <figcaption className="mb-4 flex items-center justify-between gap-3">
          {title && (
            <span className="text-sm font-semibold text-ink">{title}</span>
          )}
          {badge && <span className="badge-primary">{badge}</span>}
        </figcaption>
      )}
      {children}
    </figure>
  );
}

const Note = ({ children }: { children: ReactNode }) => (
  <p className="mt-4 text-caption leading-relaxed text-pretty text-muted">
    {children}
  </p>
);

/** "66%" counts to 66 and keeps its "%"; anything that is not a leading number renders as written. */
function Count({
  value,
  from,
  className,
}: {
  value: string | number;
  from?: number;
  className?: string;
}) {
  const m = /^(\d+)(.*)$/.exec(String(value));
  if (!m) return <span className={className}>{value}</span>;
  return (
    <span
      className={className}
      data-count={m[1]}
      data-suffix={m[2] || undefined}
      data-from={from}
    >
      {value}
    </span>
  );
}

/** Proportional bars on one scale; the lengths are the argument. */
function Bars({ s }: { s: BarsSpec }) {
  const max = Math.max(...s.rows.map((r) => r.value));
  return (
    <Panel>
      <div className="grid gap-4">
        {s.rows.map((r, i) => (
          <div
            key={r.label}
            className="grid grid-cols-[minmax(0,1fr)_3.5rem] items-end gap-4"
          >
            <div className="min-w-0">
              <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-x-3">
                <span className="text-sm font-medium text-ink">{r.label}</span>
                {r.note && (
                  <span className="text-caption text-muted">{r.note}</span>
                )}
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-surface-1">
                <span
                  className={`reveal-bar block h-full rounded-full ${BAR[r.tone]}`}
                  style={{
                    width: `${(r.value / max) * 100}%`,
                    ...delay(i * 150),
                  }}
                />
              </div>
            </div>
            <Count
              value={r.value}
              className="text-right font-display text-2xl font-semibold tabular-nums text-ink"
            />
          </div>
        ))}
      </div>
      {s.note && <Note>{s.note}</Note>}
    </Panel>
  );
}

/** Figures in unlike units, so each stands alone rather than on a shared axis. */
function Facts({ s }: { s: FactsSpec }) {
  return (
    <div>
      <ul className="grid gap-3">
        {s.facts.map((f, i) => (
          <li
            key={f.label}
            className={`reveal grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-4 rounded-2xl border p-4 ${
              f.tone === "warn" ? "missing-cell" : "border-line bg-card"
            }`}
            style={delay(i * 150)}
          >
            <Count
              value={f.value}
              className="font-display text-[2.125rem] leading-none font-semibold tabular-nums"
            />
            <span className="min-w-0">
              <span className="block font-semibold text-ink">{f.label}</span>
              {f.note && (
                <span className="block text-caption text-muted">{f.note}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
      {s.note && (
        <Note>
          {s.note}{" "}
          {s.source && (
            <a
              href={s.source.href}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-link underline underline-offset-4"
            >
              {s.source.label}
            </a>
          )}
        </Note>
      )}
    </div>
  );
}

/** What an answer engine was asked, and which of it the catalogue could answer. */
function Asks({ s }: { s: AsksSpec }) {
  const ok = s.rows.filter((r) => r.ok).length;
  return (
    <Panel title={s.eyebrow}>
      <ul>
        {s.rows.map((r, i) => (
          <li
            key={r.label}
            className="reveal grid grid-cols-[1.75rem_minmax(0,1fr)_auto] items-center gap-3 border-t border-line py-3 first:border-t-0"
            style={delay(150 + i * 250)}
          >
            {r.ok ? (
              <span
                className="grid size-6 place-items-center rounded-full bg-primary-tint text-primary"
                aria-hidden
              >
                <Check className="size-3.5" strokeWidth={3} />
              </span>
            ) : (
              <CircleHelp className="size-6 text-gap-strong" aria-hidden />
            )}
            <span className="min-w-0">
              <span className="block text-sm text-ink">{r.label}</span>
              {r.eg && (
                <span className="block text-caption text-muted">{r.eg}</span>
              )}
            </span>
            <span className={r.ok ? "badge-primary" : "badge missing-cell"}>
              {r.ok ? s.okLabel : s.noLabel}
            </span>
          </li>
        ))}
      </ul>
      {/* The note reads on from the count of answerable rows: "2 of the three are answerable".
          The old scene put the unanswerable count there, 1/3, which said the opposite. */}
      {s.note && (
        <Note>
          <strong className="font-semibold text-ink">{ok}</strong> {s.note}
        </Note>
      )}
    </Panel>
  );
}

/**
 * N cells, M of them lit, scattered by the same seeded shuffle the old scene used, so the server and
 * the client agree and exactly `lit` cells light.
 */
function CellGrid({ s }: { s: GridSpec }) {
  const idx = Array.from({ length: s.total }, (_, i) => i);
  let seed = 1013904223;
  for (let i = s.total - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    const j = seed % (i + 1);
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const lit = new Set(idx.slice(0, s.lit));
  return (
    <Panel title={s.label} badge={String(s.total)}>
      <div
        className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-[3px]"
        aria-hidden
      >
        {idx.map((_, i) => (
          <span
            key={i}
            className="relative aspect-square rounded-[2px] border border-line bg-surface-1"
          >
            {lit.has(i) && (
              <span
                className="reveal absolute -inset-px rounded-[2px] bg-primary"
                style={delay(300 + (i / s.total) * 900)}
              />
            )}
          </span>
        ))}
      </div>
      <dl className="mt-4 grid gap-2 text-sm">
        {[
          { k: s.litLabel, v: s.lit, c: "bg-primary" },
          {
            k: s.restLabel,
            v: s.total - s.lit,
            c: "border border-line bg-surface-1",
          },
        ].map((row) => (
          <div
            key={row.k}
            className="grid grid-cols-[0.75rem_minmax(0,1fr)_auto] items-center gap-2.5"
          >
            <span className={`size-3 rounded-[3px] ${row.c}`} aria-hidden />
            <dt className="text-muted">{row.k}</dt>
            <dd className="font-display font-semibold tabular-nums text-ink">
              {row.v}
            </dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}

/** Before, arrow, after: the after figure counts down from the before one. */
function Delta({ s }: { s: DeltaSpec }) {
  return (
    <Panel title={s.eyebrow}>
      {s.question && (
        <p className="mb-5 font-semibold text-pretty text-ink">{s.question}</p>
      )}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-center">
        <span>
          <span className="block font-display text-[3.5rem] leading-none font-semibold tabular-nums text-baseline">
            {s.before.v}
          </span>
          <span className="mt-1.5 block text-caption text-muted">
            {s.before.label}
          </span>
        </span>
        <ArrowRight className="size-7 text-primary" aria-hidden />
        <span>
          <Count
            value={s.after.v}
            from={s.before.v}
            className="block font-display text-[3.5rem] leading-none font-semibold tabular-nums text-primary"
          />
          <span className="mt-1.5 block text-caption text-muted">
            {s.after.label}
          </span>
        </span>
      </div>
      <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-surface-1">
        <span
          className="reveal-bar block h-full rounded-full bg-primary"
          style={{ width: `${(s.after.v / s.before.v) * 100}%`, ...delay(300) }}
        />
      </div>
      <Note>
        {s.label}. {s.note}
      </Note>
      {s.footer && (
        <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-ink">
          <Check
            className="size-4 shrink-0 text-primary"
            strokeWidth={3}
            aria-hidden
          />
          {s.footer}
        </p>
      )}
    </Panel>
  );
}

/** One of a page's scenes, redrawn. The kinds these two pages do not use render nothing. */
export function UseCaseScene({ spec }: { spec?: SceneSpec }) {
  switch (spec?.kind) {
    case "bars":
      return <Bars s={spec} />;
    case "facts":
      return <Facts s={spec} />;
    case "asks":
      return <Asks s={spec} />;
    case "grid":
      return <CellGrid s={spec} />;
    case "delta":
      return <Delta s={spec} />;
    default:
      return null;
  }
}

/**
 * Where schema coverage stops: three bands, because a fact you hold and have not expressed is a
 * markup task and a fact you never recorded is an acquisition one.
 */
export function SchemaBands({
  title,
  badge,
  note,
  bands,
}: {
  title: string;
  badge: string;
  note: string;
  bands: { label: string; pct: number }[];
}) {
  // The note names two of these by colour ("only the red band needs new data", "the blue band is a
  // markup task"), so red and blue are each used once and what is already done stays slate.
  const tone = ["bg-baseline", "bg-sky", "bg-signal"];
  return (
    <Panel title={title} badge={badge}>
      <div className="flex h-7 gap-0.5 overflow-hidden rounded-lg" aria-hidden>
        {bands.map((b, i) => (
          <span key={b.label} className="h-full" style={{ flexGrow: b.pct }}>
            <span
              className={`reveal-bar block h-full ${tone[i]}`}
              style={delay(i * 200)}
            />
          </span>
        ))}
      </div>
      <ul className="mt-4 grid gap-2 text-sm">
        {bands.map((b, i) => (
          <li
            key={b.label}
            className="grid grid-cols-[0.75rem_minmax(0,1fr)_auto] items-center gap-2.5"
          >
            <span className={`size-3 rounded-[3px] ${tone[i]}`} aria-hidden />
            <span className="text-muted">{b.label}</span>
            <Count
              value={`${b.pct}%`}
              className="font-display font-semibold tabular-nums text-ink"
            />
          </li>
        ))}
      </ul>
      <Note>{note}</Note>
    </Panel>
  );
}

/** Two plans on one scale, because the argument is the gap between them. */
export function TwoPlans({
  title,
  badge,
  note,
  plans,
}: {
  title: string;
  badge: string;
  note: string;
  plans: { label: string; fields: number; caption: string }[];
}) {
  const max = Math.max(...plans.map((p) => p.fields));
  return (
    <Panel title={title} badge={badge}>
      <div className="grid gap-4">
        {plans.map((p, i) => (
          <div key={p.label}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
              <span className="font-medium text-ink">{p.label}</span>
              <span className="font-mono text-caption text-muted">
                {p.caption}
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-surface-1">
              <span
                className={`reveal-bar block h-full rounded-full ${i === plans.length - 1 ? "bg-primary" : "bg-baseline"}`}
                style={{
                  width: `${(p.fields / max) * 100}%`,
                  ...delay(i * 250),
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <Note>{note}</Note>
    </Panel>
  );
}

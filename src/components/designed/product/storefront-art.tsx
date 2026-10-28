/**
 * The pictures on the five storefront product pages (Decision API, Search, Recommendations, Pages,
 * Merchandising Studio), owner's direction of 26 Oct 2026: the same building blocks as Return
 * Verification and Promotion Audit (`chapters.tsx`), with each page's own panels kept and restyled.
 *
 * Two kinds, as in `chapter-art.tsx`. The panels are markup, because their words must localise: the
 * scene data comes from each page's content module (`scenes`), the panel labels from `ui()`. The
 * first-visit strip below is inline SVG with no words; the step and gain pictures are the owner's
 * (`storefront-pictures.tsx`).
 *
 * These replace `ApiVisual`, `SearchVisual`, `RecommendationsVisual`, `PagesVisual` and
 * `StudioVisual`, which drew in hard-coded hex and red, and the story scenes' versions of the same
 * data, which waited for an animation before showing anything. Everything here reads at rest.
 */
import type { ReactNode } from "react";
import { renderLocale } from "@/i18n/render-locale";
import { ui } from "@/content/locale";
import type {
  AsksSpec,
  DeltaSpec,
  FactsSpec,
  FlowSpec,
  FunnelSpec,
  GridSpec,
  LanesSpec,
  SceneSpec,
  Tone,
} from "@/components/story/Scenes";

const Icon = ({
  id,
  className = "size-4",
}: {
  id: string;
  className?: string;
}) => (
  <svg className={`shrink-0 ${className}`} aria-hidden="true">
    <use href={`#i-${id}`} />
  </svg>
);

/** A product panel: a title bar when there is a title, the content, an optional footnote. */
function Panel({
  title,
  badge,
  foot,
  children,
}: {
  title?: string;
  badge?: ReactNode;
  foot?: string;
  children: ReactNode;
}) {
  return (
    <div className="@container overflow-hidden rounded-2xl border border-line bg-card text-left">
      {(title || badge) && (
        <div className="flex items-center gap-3 border-b border-line bg-surface-0 px-4 py-3 sm:px-5">
          <p className="text-h3 text-ink">{title}</p>
          <span className="ml-auto">{badge}</span>
        </div>
      )}
      <div className="p-4 sm:p-5">
        {children}
        {foot && <p className="mt-3 text-xs text-pretty text-muted">{foot}</p>}
      </div>
    </div>
  );
}

/** A horizontal bar, `value` of 100, drawn rather than sized with inline style. */
const Bar = ({
  value,
  className = "fill-chart-main",
}: {
  value: number;
  className?: string;
}) => (
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
    <rect
      x="0"
      y="0"
      width={Math.max(1, Math.min(100, value))}
      height="8"
      rx="2"
      className={className}
    />
  </svg>
);

function FactorRows({ rows }: { rows: [string, number][] }) {
  return (
    <ul className="grid gap-2.5">
      {rows.map(([k, v]) => (
        <li
          key={k}
          className="grid grid-cols-12 items-center gap-3 text-data text-ink"
        >
          <span className="col-span-6">{k}</span>
          <span className="col-span-4">
            <Bar value={v * 2} />
          </span>
          <span className="col-span-2 text-right font-mono text-xs text-muted tabular-nums">
            {v}%
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------------------------------------- outputs */

export function ApiOutput() {
  const t = ui(renderLocale());
  return (
    <Panel
      title={t.whyFirst}
      badge={<span className="badge-primary">{t.live}</span>}
      foot={t.explainRanked}
    >
      <div className="mb-3 flex items-center justify-between gap-3 border-b border-line pb-3">
        <div>
          <p className="text-data font-semibold text-ink">
            ThinkPad X1 Carbon Gen 9
          </p>
          <p className="font-mono text-xs text-muted">SKU I9J0K1L2</p>
        </div>
        <span className="badge-primary font-mono">0.87</span>
      </div>
      <FactorRows
        rows={[
          [t.baseRelevance, 42],
          [t.personaFit, 28],
          [t.priceBand, 18],
          [t.brandAffinity, 12],
        ]}
      />
    </Panel>
  );
}

export function SearchOutput() {
  const t = ui(renderLocale());
  const arms = [
    {
      h: t.engineArm,
      rows: ["ThinkPad X1 Carbon", "MacBook Pro 14", "Dell XPS 15"],
      engine: true,
    },
    {
      h: t.controlArm,
      rows: ["MSI GS66 Stealth", "ThinkPad X1 Carbon", "Razer Blade 15"],
      engine: false,
    },
  ];
  return (
    <Panel
      title={`${t.resultsFor} ${t.queryLaptop}`}
      badge={<span className="badge-primary">{t.live}</span>}
      foot={t.heldBackNote}
    >
      <div className="grid grid-cols-2 gap-3">
        {arms.map((a) => (
          <div key={a.h}>
            <p
              className={`mb-2 text-xs font-semibold ${a.engine ? "text-primary-hover" : "text-muted"}`}
            >
              {a.h}
            </p>
            <ol className="grid gap-1.5">
              {a.rows.map((r, i) => (
                <li
                  key={r}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-data ${
                    a.engine && i === 0
                      ? "bg-primary-tint font-semibold text-ink ring-1 ring-primary"
                      : "bg-surface-1 text-muted"
                  }`}
                >
                  <span className="font-mono text-xs tabular-nums">
                    {i + 1}
                  </span>
                  {r}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function RecommendationsOutput() {
  const t = ui(renderLocale());
  return (
    <Panel
      title={t.slotPdp}
      badge={<span className="badge-primary">{t.firstVisit}</span>}
      foot={t.noHistoryNote}
    >
      <FactorRows
        rows={[
          [t.baseRelevance, 34],
          [t.personaFit, 31],
          [t.brandAffinity, 21],
          [t.priceBand, 14],
        ]}
      />
    </Panel>
  );
}

export function PagesOutput() {
  const t = ui(renderLocale());
  return (
    <Panel
      title={t.gridFor}
      badge={<span className="badge-primary">{t.fromCampaign}</span>}
      foot={t.pageNote}
    >
      <div className="grid grid-cols-4 gap-2" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className={`aspect-3/4 rounded-md ${i < 4 ? "bg-primary-tint ring-1 ring-primary" : "bg-surface-1"}`}
          />
        ))}
      </div>
    </Panel>
  );
}

export function StudioOutput() {
  const t = ui(renderLocale());
  return (
    <Panel
      title={t.consoleTitle}
      badge={<span className="badge-primary">{t.verified}</span>}
      foot={t.consoleNote}
    >
      <div className="grid grid-cols-2 gap-3">
        <div>
          <span className="badge-primary">{t.built}</span>
          <ul className="mt-2 grid gap-1.5">
            {[t.cCatalogue, t.cPersonas, t.cHoldback, t.cRecord].map((r) => (
              <li
                key={r}
                className="flex items-center gap-2 rounded-lg bg-primary-tint px-2.5 py-1.5 text-data text-ink"
              >
                <Icon id="check" className="size-3.5 text-primary" />
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="badge border-line bg-surface-1 text-muted">
            {t.notBuilt}
          </span>
          <ul className="mt-2 grid gap-1.5">
            {[t.cPin, t.cSimulate].map((r) => (
              <li
                key={r}
                className="flex items-center gap-2 rounded-lg border border-dashed border-line-control px-2.5 py-1.5 text-data text-muted"
              >
                <Icon id="x" className="size-3.5" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  );
}

/* ---------------------------------------------------------------- scenes */

/** Tones keep their meaning: done in blue, in progress outlined, standing aside in slate, absent dashed. */
const DOT: Record<Tone, string> = {
  good: "bg-primary text-on-primary",
  work: "border-2 border-primary bg-card text-primary",
  hold: "border-2 border-baseline bg-card text-muted",
  warn: "border-2 border-dashed border-baseline bg-card text-muted",
};

function Flow({ s }: { s: FlowSpec }) {
  return (
    <Panel foot={s.note}>
      <ol className="grid gap-3">
        {s.steps.map((st, i) => (
          <li key={st.k} className="flex items-start gap-3">
            <span
              className={`grid size-7 shrink-0 place-items-center rounded-full font-mono text-xs ${DOT[st.tone ?? "work"]}`}
            >
              {i + 1}
            </span>
            <span>
              <span className="block text-data font-semibold text-ink">
                {st.k}
              </span>
              <span className="block text-xs text-muted">{st.v}</span>
            </span>
          </li>
        ))}
      </ol>
    </Panel>
  );
}

/**
 * A missing field is missing data, so it takes the amber Missing mark; a signal that is thrown away is
 * not missing, so it takes slate (`missing` picks which).
 */
function Asks({ s, missing }: { s: AsksSpec; missing: boolean }) {
  const no = s.rows.filter((r) => !r.ok).length;
  return (
    <Panel title={s.eyebrow}>
      <ul>
        {s.rows.map((r) => (
          <li
            key={r.label}
            className="flex items-center gap-3 border-t border-line py-2.5 text-data first:border-t-0 first:pt-0"
          >
            <Icon
              id={r.ok ? "check" : "x"}
              className={`size-4 ${r.ok ? "text-primary" : "text-muted"}`}
            />
            <span className="min-w-0 flex-1 text-ink">
              {r.label}
              {r.eg && <span className="text-xs text-muted"> · {r.eg}</span>}
            </span>
            {r.ok ? (
              <span className="badge-primary">{s.okLabel}</span>
            ) : missing ? (
              <span className="missing-flag">{s.noLabel}</span>
            ) : (
              <span className="badge border-line bg-surface-1 text-muted">
                {s.noLabel}
              </span>
            )}
          </li>
        ))}
      </ul>
      {s.note && (
        <p className="mt-3 flex items-start gap-2.5 border-t border-line pt-3 text-xs text-muted">
          <span className="badge border-line bg-surface-1 font-mono text-muted">
            {no}/{s.rows.length}
          </span>
          <span className="text-pretty">{s.note}</span>
        </p>
      )}
    </Panel>
  );
}

/** A seeded shuffle, so exactly `lit` squares light and they scatter rather than form a pattern. */
function litSet(n: number, k: number) {
  const a = Array.from({ length: n }, (_, i) => i < k);
  let seed = 7;
  for (let i = n - 1; i > 0; i--) {
    seed = (seed * 48271) % 2147483647;
    const j = seed % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Products that cannot be told apart are missing their deciding fact: amber, the Missing colour. */
function Grid({ s }: { s: GridSpec }) {
  return (
    <Panel
      title={s.label}
      badge={
        <span className="badge border-line bg-surface-1 font-mono text-muted">
          {s.total}
        </span>
      }
    >
      <div className="grid grid-cols-24 gap-0.5" aria-hidden="true">
        {litSet(s.total, s.lit).map((on, i) => (
          <span
            key={i}
            className={`aspect-square rounded-xs ${on ? "bg-chart-missing" : "bg-surface-1"}`}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted">
        <span className="inline-flex items-center gap-2">
          <span
            className="size-2.5 rounded-sm bg-chart-missing"
            aria-hidden="true"
          />
          {s.litLabel}
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className="size-2.5 rounded-sm border border-line bg-surface-1"
            aria-hidden="true"
          />
          {s.restLabel}
        </span>
      </div>
    </Panel>
  );
}

function Facts({ s }: { s: FactsSpec }) {
  return (
    <Panel foot={s.note}>
      <dl className="grid divide-line @md:grid-cols-3 @md:divide-x">
        {s.facts.map((f) => (
          <div
            key={f.label}
            className="border-t border-line py-3 first:border-t-0 @md:border-t-0 @md:px-4 @md:first:pl-0"
          >
            <dd
              className={`font-title text-display ${f.tone === "good" ? "text-primary" : f.tone === "warn" ? "text-muted" : "text-ink"}`}
            >
              {f.value}
            </dd>
            <dt className="mt-2 text-data font-semibold text-ink">{f.label}</dt>
            {f.note && <dd className="text-xs text-muted">{f.note}</dd>}
          </div>
        ))}
      </dl>
    </Panel>
  );
}

function Funnel({ s }: { s: FunnelSpec }) {
  const [returned, read, apart] = s.bands;
  return (
    <Panel title={`${returned.value} ${returned.label}`} foot={s.note}>
      <p className="text-data text-ink">
        {s.lead.before} <b className="text-primary">{read.value}</b>{" "}
        {s.lead.after}
      </p>
      <div className="mt-2.5 flex flex-wrap gap-1.5" aria-hidden="true">
        {Array.from({ length: read.value }, (_, i) => (
          <span
            key={i}
            className={`grid size-7 place-items-center rounded-lg ${i < apart.value ? "bg-primary-tint text-primary" : "bg-surface-1 text-muted"}`}
          >
            <Icon id={i < apart.value ? "check" : "x"} className="size-3.5" />
          </span>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted">
        <b className="text-primary">{apart.value}</b> {apart.label} ·{" "}
        <b className="text-ink">{read.value - apart.value}</b> {s.alike}
      </p>
      <ul className="mt-3 grid gap-2.5">
        {s.bands.map((b) => (
          <li
            key={b.label}
            className="grid grid-cols-12 items-center gap-x-3 gap-y-0.5"
          >
            <span className="col-span-2 text-right font-mono text-sm font-semibold text-ink tabular-nums">
              {b.value}
            </span>
            <span className="col-span-10">
              <Bar value={(b.value / s.total) * 100} />
            </span>
            <span className="col-span-10 col-start-3 text-xs text-muted">
              {b.label}
              {b.note && ` · ${b.note}`}
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function Delta({ s }: { s: DeltaSpec }) {
  return (
    <Panel title={s.label}>
      <div className="flex items-center justify-center gap-8 py-2">
        <div className="text-center">
          <p className="font-title text-display text-baseline">{s.before.v}</p>
          <p className="text-xs text-muted">{s.before.label}</p>
        </div>
        <Icon id="arrow-right" className="size-5 text-line-control" />
        <div className="text-center">
          <p className="font-title text-display text-primary">{s.after.v}</p>
          <p className="text-xs text-muted">{s.after.label}</p>
        </div>
      </div>
      {s.note && (
        <p className="mt-2 text-center text-xs text-pretty text-muted">
          {s.note}
        </p>
      )}
      {s.footer && (
        <p className="mt-3 flex items-center gap-2 border-t border-line pt-3 text-data font-semibold text-primary-hover">
          <Icon id="check" className="size-4" />
          {s.footer}
        </p>
      )}
    </Panel>
  );
}

/** Two approaches stacked: the old one on a well, the new one on a card with a blue edge. */
function Lanes({ s }: { s: LanesSpec }) {
  const h = (x: string) => x.replace(/\.\s*$/, "");
  return (
    <div className="grid gap-3 text-left">
      {s.lanes.map((l, i) => (
        <div
          key={l.title}
          className={`grid gap-2 rounded-2xl border p-5 ${i ? "border-primary-line bg-card" : "border-line bg-surface-1"}`}
        >
          <p className="text-h3 text-ink">{h(l.title)}</p>
          <p className="text-data text-pretty text-muted">{l.body}</p>
          <p
            className={`mt-1 flex items-start gap-2 border-t border-line pt-3 text-data font-semibold ${i ? "text-primary-hover" : "text-muted"}`}
          >
            <Icon id={i ? "check" : "x"} className="mt-0.5 size-4" />
            {l.verdict}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Renders the scene kinds the storefront pages use; any other kind renders nothing. */
export function StorefrontScene({
  spec,
  missing = false,
}: {
  spec?: SceneSpec;
  missing?: boolean;
}) {
  switch (spec?.kind) {
    case "flow":
      return <Flow s={spec} />;
    case "asks":
      return <Asks s={spec} missing={missing} />;
    case "grid":
      return <Grid s={spec} />;
    case "facts":
      return <Facts s={spec} />;
    case "funnel":
      return <Funnel s={spec} />;
    case "delta":
      return <Delta s={spec} />;
    case "lanes":
      return <Lanes s={spec} />;
    default:
      return null;
  }
}

/* ---------------------------------------------------------------- drawings */

const Drawing = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 240 160"
    aria-hidden="true"
    className="illo-lift w-5/6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

/** Recommendations' situation, redrawn from a stock illustration: one bestseller strip, three first-time visitors. */
export const SAME_STRIP = (
  <Drawing>
    {[0, 1, 2].map((r) => (
      <g key={r}>
        <circle
          cx="30"
          cy={36 + r * 44}
          r="11"
          className={["fill-primary", "fill-baseline", "fill-sky"][r]}
        />
        <rect
          x="52"
          y={20 + r * 44}
          width="172"
          height="32"
          rx="8"
          className="fill-card stroke-line"
          strokeWidth="1.5"
        />
        {[0, 1, 2, 3].map((k) => (
          <rect
            key={k}
            x={60 + k * 40}
            y={26 + r * 44}
            width="32"
            height="20"
            rx="5"
            className={k === 0 ? "fill-primary-tint" : "fill-surface-1"}
          />
        ))}
      </g>
    ))}
  </Drawing>
);

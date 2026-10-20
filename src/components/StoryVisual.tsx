/**
 * One visual per story page, showing that page's own output.
 *
 * An audit of every route found `img` count of 2 sitewide, which is the logo in
 * two themes: the whole site was type and icons. These are not decoration to fix
 * that, they are the artefact each page is describing, drawn the same way the
 * hero draws the catalogue. Stock photography would add pixels and say nothing;
 * a merchant can read their own deliverable out of these in a second.
 *
 * All of them render on the light product surface, which does not invert with
 * the theme, so one set of values is correct in both.
 */
import { useLocale } from "next-intl";
import { ui } from "@/content/locale";
import { Check, X } from "lucide-react";

const INK = "#16181d", MID = "#4c5563", MUTE = "#9aa1ad";
const GOOD = "var(--sig-deep)", GOOD_BG = "var(--sig-tint)";
const WARN = "#b91c1c", WARN_BG = "#fdeceb";
const WORK = "var(--sig-deep)";
const HOLD = "#A16207";

function Frame({ title, badge, badgeTone = "good", children }: {
  title: string; badge?: string; badgeTone?: "good" | "warn" | "work"; children: React.ReactNode;
}) {
  const tone = badgeTone === "warn" ? [WARN_BG, WARN] : badgeTone === "work" ? ["#eef3fe", WORK] : [GOOD_BG, GOOD];
  return (
    <figure className="screen overflow-hidden rounded-xl">
      <div className="screen-bar flex items-center gap-3 px-4 py-3">
        <span className="text-[0.875rem] font-bold" style={{ color: INK }}>{title}</span>
        {badge && (
          <span className="ml-auto rounded-md px-2.5 py-1 text-[0.75rem] font-bold"
                style={{ background: tone[0], color: tone[1] }}>
            {badge}
          </span>
        )}
      </div>
      <div className="px-4 py-4">{children}</div>
    </figure>
  );
}

const Row = ({ label, sub, right }: { label: string; sub?: string; right?: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-4 border-t py-2.5 first:border-t-0" style={{ borderColor: "#f0f2f5" }}>
    <span className="min-w-0">
      <span className="block truncate text-[0.8125rem] font-medium" style={{ color: INK }}>{label}</span>
      {sub && <span className="ed-num block text-[0.6875rem]" style={{ color: MUTE }}>{sub}</span>}
    </span>
    {right}
  </div>
);

const Bar = ({ pct, color = GOOD, w = "5rem" }: { pct: number; color?: string; w?: string }) => (
  <span className="inline-block h-2 overflow-hidden rounded-full" style={{ width: w, background: "#eef0f4" }}>
    <span className="block h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
  </span>
);

/** The ranked list an audit hands back. */
export function AuditVisual() {
  const t = ui(useLocale());
  // Sorted and measured from the gain itself. The rows used to carry a
  // hand-set bar width alongside the number, and the two had drifted: storage
  // sat at #3 on 0.688 while processor sat at #4 on 0.747, under a caption
  // promising the list was ranked by exactly that figure.
  const rows = [
    { a: t.screenSize, g: 1.067, m: 80 },
    { a: t.memory, g: 1.012, m: 60 },
    { a: t.storage, g: 0.688, m: 55 },
    { a: t.processor, g: 0.747, m: 162 },
  ].sort((x, y) => y.g - x.g);
  const top = rows[0].g;
  return (
    <Frame title={t.rankedList} badge={t.hours48}>
      {rows.map((r, i) => (
        <Row key={r.a} label={`${i + 1}. ${r.a}`} sub={t.productsMissing(r.m)}
             right={<span className="flex items-center gap-2.5">
               {/* Green is the one to do first; blue is queued behind it. Grey
                   was neither, and read as disabled. */}
               <Bar pct={(r.g / top) * 100} color={i === 0 ? GOOD : WORK} />
               <span className="ed-num w-12 text-right text-[0.8125rem] font-semibold"
                     style={{ color: i === 0 ? GOOD : WORK }}>{r.g.toFixed(3)}</span>
             </span>} />
      ))}
      <p className="mt-3 text-[0.75rem]" style={{ color: MUTE }}>{t.rankedByBits}</p>
    </Frame>
  );
}

/** Before and after, which is the whole of verification. */
export function VerificationVisual() {
  const t = ui(useLocale());
  const rows = [
    { a: t.screenSize, before: 63, after: 100 },
    { a: t.memory, before: 72, after: 72 },
    { a: t.storage, before: 74, after: 74 },
  ];
  return (
    <Frame title={t.coverageBeforeAfter} badge={t.verified}>
      {rows.map((r) => (
        <Row key={r.a} label={r.a} sub={r.before === r.after ? t.unchanged : t.pctTo(r.before, r.after)}
             right={<span className="flex flex-col gap-1">
               {/* Gold is the before state everywhere on this site. */}
               <Bar pct={r.before} color={HOLD} w="6rem" />
               <Bar pct={r.after} color={r.before === r.after ? HOLD : GOOD} w="6rem" />
             </span>} />
      ))}
      <div className="mt-3 flex items-center justify-between rounded-lg px-3 py-2" style={{ background: GOOD_BG }}>
        <span className="text-[0.8125rem] font-semibold" style={{ color: GOOD }}>{t.readiness}</span>
        <span className="ed-num text-[0.8125rem] font-bold" style={{ color: GOOD }}>94 &rarr; 31</span>
      </div>
    </Frame>
  );
}

/** The alert monitoring actually sends. */
export function MonitorVisual() {
  const t = ui(useLocale());
  return (
    <Frame title={t.shelfAlert} badge={t.laptops} badgeTone="warn">
      <div className="rounded-lg p-3" style={{ background: WARN_BG }}>
        <p className="text-[0.8125rem] font-bold" style={{ color: WARN }}>{t.readinessFell}</p>
        <p className="mt-1 text-[0.75rem]" style={{ color: MID }}>
          {t.newSkus}
        </p>
      </div>
      <div className="mt-3">
        <p className="text-[0.6875rem] font-semibold tracking-wider uppercase" style={{ color: MUTE }}>{t.readiness12w}</p>
        <svg viewBox="0 0 220 46" className="mt-2 w-full" role="img" aria-label={t.readinessAlt}>
          <polyline points="0,14 20,13 40,15 60,12 80,14 100,13 120,15 140,13 160,14 180,16 200,30 220,32"
                    fill="none" stroke={WARN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="220" cy="32" r="3.5" fill={WARN} />
        </svg>
      </div>
    </Frame>
  );
}

/** A ranked product with its breakdown, which is the runtime's promise. */
export function ApiVisual() {
  const t = ui(useLocale());
  const f = [
    { k: t.baseRelevance, v: 42 },
    { k: t.personaFit, v: 28 },
    { k: t.priceBand, v: 18 },
    { k: t.brandAffinity, v: 12 },
  ];
  return (
    <Frame title={t.whyFirst} badge={t.live} badgeTone="work">
      <Row label="ThinkPad X1 Carbon Gen 9" sub="SKU I9J0K1L2"
           right={<span className="ed-num rounded-md px-2 py-1 text-[0.75rem] font-bold" style={{ background: "#eef3fe", color: WORK }}>0.87</span>} />
      <div className="mt-3 space-y-2">
        {f.map((x) => (
          <div key={x.k} className="flex items-center justify-between gap-3">
            <span className="text-[0.75rem]" style={{ color: MID }}>{x.k}</span>
            <span className="flex items-center gap-2">
              <Bar pct={x.v * 2} color={WORK} w="5rem" />
              <span className="ed-num w-8 text-right text-[0.75rem] font-semibold" style={{ color: WORK }}>{x.v}%</span>
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[0.75rem]" style={{ color: MUTE }}>{t.explainRanked}</p>
    </Frame>
  );
}

/** What a bit is, drawn. */
export function MethodVisual() {
  const t = ui(useLocale());
  const steps = [216, 108, 54, 27];
  return (
    <Frame title={t.whatOneBit} badge={t.products216}>
      <div className="space-y-2.5">
        {steps.map((n, i) => (
          <div key={n} className="flex items-center gap-3">
            <span className="ed-num w-16 text-[0.75rem]" style={{ color: MUTE }}>{i} {t.bits}</span>
            <span className="h-5 rounded" style={{ width: `${(n / 216) * 100}%`, background: i === 0 ? HOLD : GOOD, opacity: 1 - i * 0.12 }} />
            <span className="ed-num text-[0.75rem] font-semibold" style={{ color: INK }}>{n} {t.left}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[0.75rem]" style={{ color: MUTE }}>
        {t.oneBitHalves}
      </p>
    </Frame>
  );
}

/** The disagreement, compact. */
export function CompareVisual() {
  const t = ui(useLocale());
  return (
    <Frame title={t.whereDiffer} badge={t.processor} badgeTone="warn">
      <div className="grid grid-cols-2 gap-3">
        {[
          { t: t.byEngagement, rows: [t.processor, t.screenSize, t.memory, t.storage], tone: HOLD },
          { t: t.byDecision, rows: [t.screenSize, t.memory, t.storage, t.processor], tone: GOOD },
        ].map((col) => (
          <div key={col.t}>
            <p className="mb-2 text-[0.6875rem] font-bold tracking-wider uppercase" style={{ color: col.tone }}>{col.t}</p>
            <ol className="space-y-1.5">
              {col.rows.map((r, i) => {
                const hot = r === t.processor;
                return (
                  <li key={r} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[0.75rem]"
                      style={{ background: hot ? WARN_BG : "#f7f8fa", color: hot ? WARN : MID, fontWeight: hot ? 700 : 500 }}>
                    <span className="ed-num opacity-60">{i + 1}</span>{r}
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[0.75rem]" style={{ color: MUTE }}>{t.explainInvert}</p>
    </Frame>
  );
}

/** Stability, honestly. */
export function LimitsVisual() {
  const t = ui(useLocale());
  return (
    <Frame title={t.stability} badge={t.topOnly} badgeTone="warn">
      <div className="space-y-2.5">
        {[
          { a: t.screenSize, pos: t.nthOf12(t.ord[0], 12), pct: 100, c: GOOD },
          { a: t.memory, pos: t.nthOf12(t.ord[1], 7), pct: 58, c: MUTE },
          { a: t.storage, pos: t.nthOf12(t.ord[2], 6), pct: 50, c: MUTE },
          { a: t.processor, pos: t.nthOf12(t.ord[3], 8), pct: 67, c: MUTE },
        ].map((r) => (
          <Row key={r.a} label={r.a} sub={r.pos} right={<Bar pct={r.pct} color={r.c} w="5.5rem" />} />
        ))}
      </div>
      <p className="mt-3 rounded-lg px-3 py-2 text-[0.75rem]" style={{ background: WARN_BG, color: WARN }}>
        {t.firstOnly}
      </p>
    </Frame>
  );
}

/* --------------------------------------------------------------------------
 * The four runtime surfaces.
 *
 * Each draws the thing its page claims, in the same frame language as the
 * seven above: light product surface, thin marks, one accent. Search,
 * recommendations and pages are one ranker pointed three ways, so the three
 * figures deliberately share a shape; the studio one is a two-list ledger,
 * because what that page is actually showing you is the gap between them.
 * -------------------------------------------------------------------------- */

/** Two arms of the same query, which is the only honest way to draw ranking. */
export function SearchVisual() {
  const t = ui(useLocale());
  const engine = ["ThinkPad X1 Carbon", "MacBook Pro 14", "Dell XPS 15"];
  const control = ["MSI GS66 Stealth", "ThinkPad X1 Carbon", "Razer Blade 15"];
  return (
    <Frame title={`${t.resultsFor} ${t.queryLaptop}`} badge={t.live} badgeTone="work">
      <div className="grid grid-cols-2 gap-3">
        {[
          { h: t.engineArm, rows: engine, tone: WORK, bg: "#eef3fe" },
          { h: t.controlArm, rows: control, tone: HOLD, bg: "#fdf1dd" },
        ].map((col) => (
          <div key={col.h}>
            <p className="mb-2 text-[0.6875rem] font-bold tracking-wider uppercase" style={{ color: col.tone }}>{col.h}</p>
            <ol className="space-y-1.5">
              {col.rows.map((r, i) => (
                <li
                  key={r}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[0.75rem]"
                  style={{ background: col.bg, color: i === 0 ? INK : MID, fontWeight: i === 0 ? 700 : 500 }}
                >
                  <span className="ed-num opacity-60">{i + 1}</span>
                  <span className="truncate">{r}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[0.75rem]" style={{ color: MUTE }}>{t.heldBackNote}</p>
    </Frame>
  );
}

/** The cold-start case, drawn as the signals available with no history at all. */
export function RecommendationsVisual() {
  const t = ui(useLocale());
  const f = [
    { k: t.baseRelevance, v: 34 },
    { k: t.personaFit, v: 31 },
    { k: t.brandAffinity, v: 21 },
    { k: t.priceBand, v: 14 },
  ];
  return (
    <Frame title={t.slotPdp} badge={t.firstVisit} badgeTone="work">
      <div className="space-y-2">
        {f.map((x) => (
          <div key={x.k} className="flex items-center justify-between gap-3">
            <span className="text-[0.75rem]" style={{ color: MID }}>{x.k}</span>
            <span className="flex items-center gap-2">
              <Bar pct={x.v * 2.4} color={WORK} w="5rem" />
              <span className="ed-num w-8 text-right text-[0.75rem] font-semibold" style={{ color: WORK }}>{x.v}%</span>
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[0.75rem]" style={{ color: MUTE }}>{t.noHistoryNote}</p>
    </Frame>
  );
}

/** A grid, with the arrival context that ordered it sitting above. */
export function PagesVisual() {
  const t = ui(useLocale());
  return (
    <Frame title={t.gridFor} badge={t.fromCampaign} badgeTone="work">
      <div className="grid grid-cols-4 gap-2" aria-hidden>
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className="aspect-[3/4] rounded-md"
            style={{
              background: i < 4 ? "#dde6fd" : "#f2f4f7",
              boxShadow: i < 4 ? `inset 0 0 0 1.5px ${WORK}` : "none",
            }}
          />
        ))}
      </div>
      <p className="mt-3 text-[0.75rem]" style={{ color: MUTE }}>{t.pageNote}</p>
    </Frame>
  );
}

/**
 * Two lists, and the second one is the point.
 *
 * Every competitor's studio page is a feature grid. Drawing ours as built
 * beside not-built is the only version of this figure that matches what the
 * page says, and it is the more persuasive of the two.
 */
export function StudioVisual() {
  const t = ui(useLocale());
  return (
    <Frame title={t.consoleTitle} badge={t.verified}>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="mb-2 text-[0.6875rem] font-bold tracking-wider uppercase" style={{ color: GOOD }}>{t.built}</p>
          <ul className="space-y-1.5">
            {[t.cCatalogue, t.cPersonas, t.cHoldback, t.cRecord].map((r) => (
              <li key={r} className="flex items-start gap-2 rounded-md px-2 py-1.5 text-[0.75rem]"
                  style={{ background: GOOD_BG, color: INK }}>
                <Check className="mt-0.5 h-3 w-3 shrink-0" style={{ color: GOOD }} aria-hidden />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-[0.6875rem] font-bold tracking-wider uppercase" style={{ color: WARN }}>{t.notBuilt}</p>
          <ul className="space-y-1.5">
            {[t.cPin, t.cSimulate].map((r) => (
              <li key={r} className="flex items-start gap-2 rounded-md px-2 py-1.5 text-[0.75rem]"
                  style={{ background: WARN_BG, color: MID }}>
                <X className="mt-0.5 h-3 w-3 shrink-0" style={{ color: WARN }} aria-hidden />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-3 text-[0.75rem]" style={{ color: MUTE }}>{t.consoleNote}</p>
    </Frame>
  );
}


/**
 * Where schema coverage stops.
 *
 * Three bands rather than two, because "not marked up" hides the distinction
 * that decides the cost: a fact you hold and have not expressed is a markup
 * task, and a fact you never recorded is an acquisition one. A two-state chart
 * would make them look like the same job.
 */
export function SeoAeoVisual() {
  const t = ui(useLocale());
  const bands = [
    { k: t.markedUp, v: 21, c: GOOD, bg: GOOD_BG },
    { k: t.heldNotExpressed, v: 42, c: WORK, bg: "#eef3fe" },
    { k: t.neverRecorded, v: 37, c: WARN, bg: WARN_BG },
  ];
  return (
    <Frame title={t.schemaCeiling} badge={t.products216}>
      <div className="flex h-7 w-full overflow-hidden rounded-lg" aria-hidden>
        {bands.map((b) => (
          <span key={b.k} style={{ width: `${b.v}%`, background: b.c }} />
        ))}
      </div>
      <ul className="mt-4 space-y-2.5">
        {bands.map((b) => (
          <li key={b.k} className="flex items-center gap-2.5 text-[0.8125rem]">
            <span className="h-3 w-3 shrink-0 rounded-[3px]" style={{ background: b.c }} aria-hidden />
            <span className="flex-1" style={{ color: MID }}>{b.k}</span>
            <span className="ed-num font-bold" style={{ color: b.c }}>{b.v}%</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[0.75rem]" style={{ color: MUTE }}>{t.schemaNote}</p>
    </Frame>
  );
}

/**
 * Everything, or the part that matters.
 *
 * Two plans on one scale, because the argument is entirely about the gap
 * between them. A stacked bar would imply the subset is a fraction of the same
 * job; two bars make it a choice.
 */
export function TimeToMarketVisual() {
  const t = ui(useLocale());
  const rows = [
    { k: t.fullEnrichment, fields: 86, weeks: 11, c: MUTE },
    { k: t.minimumSet, fields: 9, weeks: 1, c: GOOD },
  ];
  return (
    <Frame title={t.twoPlans} badge={t.beforeLaunch} badgeTone="work">
      <div className="space-y-4">
        {rows.map((r) => (
          <div key={r.k}>
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <span className="text-[0.8125rem] font-semibold" style={{ color: INK }}>{r.k}</span>
              <span className="ed-num text-[0.75rem]" style={{ color: r.c }}>
                {t.nFields(r.fields)}
              </span>
            </div>
            <span className="block h-3 overflow-hidden rounded-full" style={{ background: "#eef0f4" }}>
              <span className="block h-full rounded-full" style={{ width: `${(r.fields / 86) * 100}%`, background: r.c }} />
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[0.75rem]" style={{ color: MUTE }}>{t.twoPlansNote}</p>
    </Frame>
  );
}

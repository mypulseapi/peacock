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
import { renderLocale } from "@/i18n/render-locale";
import { ui } from "@/content/locale";

const INK = "#16181d", MID = "#4c5563", MUTE = "#5f6773";
const GOOD = "var(--sig-deep)", GOOD_BG = "var(--sig-tint)";
const WARN = "#b91c1c", WARN_BG = "#fdeceb";
const WORK = "var(--sig-deep)";
const HOLD = "#A16207";

function Frame({ title, badge, badgeTone = "good", children }: {
  title: string; badge?: string; badgeTone?: "good" | "warn" | "work"; children: React.ReactNode;
}) {
  const tone = badgeTone === "warn" ? [WARN_BG, WARN] : badgeTone === "work" ? ["#eef3fe", WORK] : [GOOD_BG, GOOD];
  return (
    <figure className="reveal screen overflow-hidden rounded-xl">
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
  const t = ui(renderLocale());
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
  const t = ui(renderLocale());
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
  const t = ui(renderLocale());
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

/** What a bit is, drawn. */
export function MethodVisual() {
  const t = ui(renderLocale());
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
  const t = ui(renderLocale());
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
  const t = ui(renderLocale());
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

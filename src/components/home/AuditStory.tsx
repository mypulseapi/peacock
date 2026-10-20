"use client";

import { useEffect, useState, useCallback, useSyncExternalStore } from "react";
import { Check, TrendingUp, AlertTriangle, Sparkles, FileText } from "lucide-react";
import { useLocale } from "next-intl";
import { PROOF, showProof } from "@/content/proof";
import { storyUi } from "@/content/locale";

type T = ReturnType<typeof storyUi>;

/**
 * The hero demonstration, as a story rather than a screenshot.
 *
 * A merchant arriving cold does not want to see "Audit complete". They want to
 * see their own problem, then what happens to it. So this walks the whole
 * journey: the catalogue they recognise, the scoring, the priority that comes
 * out, the repair they would actually do, and the number that moves as a result.
 *
 * Auto-advances, and the step rail is clickable so anyone who wants to read a
 * stage properly can stop the carousel and stay there. Reduced motion lands on
 * the final step and never advances, because an auto-playing loop is exactly the
 * thing that setting is asking us not to do.
 */

const ROWS = [
  { name: "LG 16Z90TS-G",             sku: "A1B2C3D4", screen: '16.0"', memory: null,   cpu: null, storage: "512GB" },
  { name: "Spectre x360",             sku: "E5F6G7H8", screen: null,    memory: "16GB", cpu: null, storage: null },
  { name: "ThinkPad X1 Carbon Gen 9", sku: "I9J0K1L2", screen: null,    memory: "32GB", cpu: null, storage: "1TB" },
  { name: "Razer Blade",              sku: "M3N4O5P6", screen: '15.6"', memory: null,   cpu: null, storage: null },
  { name: "MacBook Pro",              sku: "Q7R8S9T0", screen: null,    memory: "18GB", cpu: "M3", storage: "512GB" },
  { name: "MSI GS66",                 sku: "Y5Z6A7B8", screen: null,    memory: null,   cpu: null, storage: null },
];
/** What the repair supplies. Recovered from titles and specs, not invented. */
const REPAIRED: Record<string, string> = {
  E5F6G7H8: '13.5"', I9J0K1L2: '14.0"', Q7R8S9T0: '14.2"', Y5Z6A7B8: '15.6"',
};

const COLS = [
  { key: "screen",  labelKey: "screenSize", rank: 1, gap: 1.067, missing: 80,  tasks: 13 },
  { key: "memory",  labelKey: "memory",     rank: 2, gap: 1.012, missing: 60,  tasks: 15 },
  { key: "cpu",     labelKey: "processor",  rank: 4, gap: 0.747, missing: 162, tasks: 2 },
  { key: "storage", labelKey: "storage",    rank: 3, gap: 0.688, missing: 55,  tasks: 10 },
] as const;

/**
 * One hue per stage, so a viewer registers that something changed even if they
 * are not reading. Validated as a five-slot categorical palette on the screen's
 * white surface: lightness band, chroma, CVD separation (worst adjacent dE 29.3
 * protan), normal-vision floor and contrast all pass. Every stage also carries
 * its number and name, so the colour is never the only signal.
 */
const baseSteps = (t: T) => [
  // Red for the problem, then the accent deepening to its brightest at the
  // payoff. 02-04 and 05 were var(--sig-deep) against --sig-deep after the re-skin,
  // which measures 1.03:1 against each other: five steps, one indistinguishable
  // colour. Each pill also carries its number and name, so the hue reinforces
  // the sequence rather than carrying it.
  { n: "01", label: t.stepProblem,  hue: "#b91c1c", tint: "#fdeceb", note: t.noteProblem },
  { n: "02", label: t.stepAudit,    hue: "var(--sig-deep)", tint: "var(--sig-tint)", note: t.noteAudit },
  { n: "03", label: t.stepPriority, hue: "var(--sig-deep)", tint: "var(--sig-tint)", note: t.notePriority },
  { n: "04", label: t.stepRepair,   hue: "var(--sig-deep)", tint: "var(--sig-tint)", note: t.noteRepair },
  { n: "05", label: t.stepPayoff,   hue: "var(--sig)", tint: "var(--sig-tint-2)", note: t.notePayoff },
];

/** Only present when the placeholder gate is open. See src/content/proof.ts. */
const revenueStep = (t: T) =>
  ({ n: "06", label: t.stepRevenue, hue: "var(--sig-deep)", tint: "var(--sig-tint)", note: PROOF.outcome.caveat });

const DWELL = 3400;


export function AuditStory() {
  const withRevenue = showProof();
  const t = storyUi(useLocale());
  const STEPS = withRevenue ? [...baseSteps(t), revenueStep(t)] : baseSteps(t);

  // useSyncExternalStore rather than reading the media query in an effect and
  // calling setState from it, which cascades a render and the lint rightly
  // rejects. This also tracks the setting if it changes mid-session.
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [manual, setManual] = useState(false);
  const auto = !manual && !reduceMotion;

  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % STEPS.length), DWELL);
    return () => clearTimeout(t);
  }, [step, auto, STEPS.length]);

  const pick = useCallback((i: number) => { setManual(true); setStep(i); }, []);

  const shown = reduceMotion && !manual ? STEPS.length - 1 : step;
  const scoring  = shown === 1;
  const ranked   = shown >= 2;
  const repaired = shown >= 3;
  const resolved = shown >= 4;
  const revenue  = withRevenue && shown === 5;
  const stage = STEPS[shown];
  const alarm = shown === 0;

  return (
    <div>
      <StepRail steps={STEPS} shown={shown} onPick={pick} />
      {repaired && !resolved ? (
        <RepairPanel t={t} />
      ) : ranked && !repaired ? (
        <PriorityShuffle t={t} />
      ) : resolved ? (
        <PayoffPanel t={t} revenue={revenue} />
      ) : (
      <figure className="screen flex min-h-[30rem] flex-col overflow-hidden">
        {scoring && <span className="screen-scan-once" aria-hidden />}

        <div className="screen-bar flex items-center gap-3 px-5 py-3.5">
          <span className="screen-ink text-[0.9375rem] font-bold">{t.myCatalogue}</span>
          <span className="screen-muted text-[0.8125rem]">{t.laptops} <span className="ed-num">{t.productsCount}</span></span>
          <span className="ml-auto">
            {scoring ? (
              <span className="run-pill inline-flex flex-col gap-1 rounded-lg px-3 py-1.5">
                <span className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold">
                  <span className="run-spin inline-block h-3 w-3 rounded-full border-2 border-current border-t-transparent" aria-hidden />
                  {t.scoringAttributes}
                </span>
                <span className="scan-track block h-[3px] w-full overflow-hidden rounded-full bg-[#dfe4ea]">
                  <span className="scan-fill block h-full rounded-full bg-[var(--sig-deep)]" />
                </span>
              </span>
            ) : repaired ? (
              <span className="run-pill run-pill-done inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[0.8125rem] font-bold">
                <Check className="h-3.5 w-3.5" aria-hidden />
                {resolved ? t.readinessRecomputed : t.productsUpdated}
              </span>
            ) : ranked ? (
              <span className="run-pill run-pill-done inline-flex items-center rounded-lg px-3 py-1.5 text-[0.8125rem] font-bold">
                {t.rankedByValue}
              </span>
            ) : (
              <span className="inline-flex items-center rounded-lg border border-[#f0c7c2] bg-[#fdeeec] px-3 py-1.5 text-[0.8125rem] font-semibold text-[#a33227]">
                {t.gapsFound}
              </span>
            )}
          </span>
        </div>

        {scoring && (
          <div className="border-b border-[#eef0f4] bg-[#f9fbfd] px-5 py-3">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[0.8125rem] font-semibold text-[var(--sig-deep)]">
                {t.scoringAgainst}
              </span>
              <span className="ed-num text-[0.75rem] text-[#6b7480]">{t.fourAttributes}</span>
            </div>
            <span className="scan-track mt-2 block h-[6px] w-full overflow-hidden rounded-full bg-[#e2e6eb]">
              <span className="scan-fill block h-full rounded-full bg-[var(--sig-deep)]" />
            </span>
          </div>
        )}

        {alarm && (
          <div
            className="flex items-center gap-3 px-5 py-3"
            style={{ background: "#fdeceb", borderBottom: "1px solid #f6d3cf" }}
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#b91c1c]">
              <AlertTriangle className="h-4 w-4 text-[color:var(--on-sig)]" aria-hidden />
            </span>
            <p className="text-[0.875rem] leading-snug text-[#7f1d1d]">
              <span className="font-bold">{t.fieldsBlank}</span>{" "}
              {t.cannotFilter}
            </p>
          </div>
        )}

        <div className="flex-1 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th scope="col" className="screen-muted px-5 pt-4 pb-3 text-[0.75rem] font-semibold">{t.colName}</th>
                <th scope="col" className="screen-muted px-3 pt-4 pb-3 text-[0.75rem] font-semibold">{t.colSku}</th>
                {COLS.map((c, ci) => {
                  const lead = ranked && c.rank === 1;
                  return (
                    <th key={c.key} scope="col" style={lead ? { background: stage.tint } : undefined}
                      className="px-3 pt-4 pb-3 whitespace-nowrap transition-colors duration-500">
                      <span className="flex items-center gap-1.5">
                        <span
                          className={`rank-chip ed-num inline-flex h-[18px] min-w-[18px] items-center justify-center rounded text-[0.6875rem] transition-all duration-500 ${
                            ranked && c.rank === 1 ? "scale-100 opacity-100" : "scale-75 opacity-0"
                          }`}
                        >
                          {c.rank}
                        </span>
                        <span className="screen-ink text-[0.75rem] font-semibold">{t[c.labelKey]}</span>
                      </span>
                      <span className="mt-1 block text-[0.6875rem]">
                        {scoring ? (
                          <span className="block">
                            <span className="screen-muted">scoring…</span>
                            <span className="scan-track mt-1 block h-[4px] w-full overflow-hidden rounded-full bg-[#e9ebef]">
                              <span
                                className="scan-fill block h-full rounded-full"
                                style={{ background: stage.hue, animationDelay: `${ci * 180}ms` }}
                              />
                            </span>
                          </span>
                        ) : ranked ? (
                          <span className="ed-num text-[#6b7480]">
                            {c.rank === 1 ? "fix first · " : `#${c.rank} · `}{c.gap.toFixed(3)} bits
                          </span>
                        ) : (
                          <span className="ed-num inline-flex items-center gap-1 font-bold text-[#b91c1c]">
                            <AlertTriangle className="h-3 w-3" aria-hidden />
                            {t.nMissing(c.missing)}
                          </span>
                        )}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, ri) => (
                <tr key={r.sku} className="screen-row">
                  <td className="screen-ink px-5 py-3 text-[0.875rem] font-medium whitespace-nowrap">
                    <span className="flex items-center gap-3">
                      <span className="h-8 w-8 shrink-0 rounded bg-[#eef0f4]" aria-hidden />
                      {r.name}
                    </span>
                  </td>
                  <td className="ed-num screen-ink-2 px-3 py-3 text-[0.875rem] whitespace-nowrap">{r.sku}</td>
                  {COLS.map((c, ci) => {
                    const lead = ranked && c.rank === 1;
                    const base = r[c.key as keyof typeof r] as string | null;
                    const filled = repaired && c.key === "screen" && !base ? REPAIRED[r.sku] : null;
                    const v = base ?? filled;
                    return (
                      <td
                        key={c.key}
                        style={lead && !alarm ? { background: stage.tint } : undefined}
                        className="ed-num px-3 py-2.5 text-[0.875rem] whitespace-nowrap transition-colors duration-500"
                      >
                        {filled ? (
                          <FilledCell value={filled} />
                        ) : v ? (
                          <span className="screen-ink-2">{v}</span>
                        ) : alarm ? (
                          <MissingCell t={t} />
                        ) : scoring ? (
                          <ScanningCell t={t} delay={(ri * 4 + ci) * 90} />
                        ) : (
                          <span className="screen-muted italic">{t.noData}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="screen-row flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <p className="text-[0.8125rem] leading-relaxed text-[#4c5563]">
            {shown === 0 && <>{t.footProblem}</>}
            {shown === 1 && (
              <span className="flex flex-wrap items-center gap-3">
                <span>{t.footAudit}</span>
                <span className="scan-track inline-block h-[5px] w-32 overflow-hidden rounded-full bg-[#e2e6eb] align-middle">
                  <span className="scan-fill block h-full rounded-full bg-[var(--sig-deep)]" style={{ animationDelay: "240ms" }} />
                </span>
              </span>
            )}
            {shown === 2 && <>{t.footPriorityA} <span className="font-bold text-[#16181d]">{t.footPriorityB}</span> {t.footPriorityC}</>}
            {shown === 3 && <>{t.footRepair}</>}
            {shown === 4 && <>{t.footPayoff}</>}
          </p>
          <span
            className={`ed-num rounded-md px-2.5 py-1 text-[0.75rem] font-semibold transition-colors duration-500 ${
              resolved ? "bg-[color:var(--sig-tint-2)] text-[var(--sig-deep)]" : "bg-[#f1f3f6] text-[#4c5563]"
            }`}
          >
            {t.readinessLabel} {resolved ? "31" : "94"} / 216
          </span>
        </div>
      </figure>
      )}
    </div>
  );
}

/**
 * The payoff, as a picture rather than a table of numbers.
 *
 * Form first: the job is a before/after change of STATE across 216 products, so
 * the honest form is a unit chart. One square per product, and you watch the
 * separable block grow. A merchant reads that in a second; "122 to 185" makes
 * them do arithmetic.
 *
 * Colour: lime marks "a shopper can tell these apart", slate is the remainder.
 * One status hue plus a neutral, so there is no colourblind-hostile hue pair,
 * and both states carry a written label so identity is never colour alone.
 * Validated on the white screen surface, which does not invert with the theme:
 * var(--sig-deep) / var(--sig-deep) pass all six checks; the green/amber pair I tried first
 * failed CVD separation at protan dE 5.8, which is the classic red-green trap.
 */
function PayoffPanel({ t, revenue }: { t: T; revenue: boolean }) {
  const TOTAL = 216;
  const separable = revenue ? 185 : 185;
  return (
    <figure className="screen flex min-h-[30rem] flex-col overflow-hidden">
      <div className="screen-bar flex items-center gap-3 px-5 py-3.5">
        <span className="screen-ink text-[0.9375rem] font-bold">
          {revenue ? PROOF.outcome.headline : t.whatShoppersCan}
        </span>
        <span className="run-pill run-pill-done ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[0.8125rem] font-bold">
          <Check className="h-3.5 w-3.5" aria-hidden />
          {t.verifiedOnCatalogue}
        </span>
      </div>

      {revenue ? (
        <div className="flex flex-1 items-center"><RevenueBars /></div>
      ) : (
        <div className="flex flex-1 flex-col justify-center px-5 py-8 sm:px-7">
          <UnitChart t={t} total={TOTAL} after={separable} before={122} />
        </div>
      )}

      <div className="screen-row px-5 py-4">
        <p className="text-[0.8125rem] leading-relaxed text-[#4c5563]">
          {revenue ? (
            <span className="font-semibold text-[#a33227]">
              Design preview only. Pulse has run no live experiment, so these are invented. Hidden
              from every build unless the placeholder flag is set.
            </span>
          ) : (
            <>A property of the repaired catalogue, not a forecast. No traffic and no test: you can
            confirm it the week you finish the work.</>
          )}
        </p>
      </div>
    </figure>
  );
}

/**
 * 216 squares, one per product, animated from the before state to the after.
 *
 * Landing straight on the result asks the viewer to remember what it used to
 * look like. Playing the transition means they watched it: the block holds at
 * what the merchant has today, then 63 squares turn over in a wave and the
 * caption flips with them. That before-to-after moment is the selling point, so
 * it is the one thing on the page that is allowed to take its time.
 */
function UnitChart({ t, total, before, after }: { t: T; total: number; before: number; after: number }) {
  const [phase, setPhase] = useState<"before" | "after">("before");
  useEffect(() => {
    const t = setTimeout(() => setPhase("after"), 900);
    return () => clearTimeout(t);
  }, []);

  const shownCount = phase === "after" ? after : before;
  const cells = Array.from({ length: total }, (_, i) => i);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Key swatch="var(--sig)" label={t.canTellApart} />
          <Key swatch="var(--state-off)" label={t.stillIndistinguishable} />
        </div>
        {/* The caption flips with the block, so the state is never ambiguous. */}
        <span
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.8125rem] font-bold transition-colors duration-500"
          style={
            phase === "after"
              ? { background: "var(--sig-tint)", color: "var(--sig-deep)" }
              : { background: "#f1f3f6", color: "#6b7480" }
          }
        >
          {phase === "after" ? (
            <><Check className="h-3.5 w-3.5" aria-hidden /> {t.afterRepair}</>
          ) : (
            t.catalogueToday
          )}
        </span>
      </div>

      <div
        className="mt-6 grid gap-[4px] sm:gap-[5px]"
        style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}
        role="img"
        aria-label={t.unitAlt(after, total, before)}
      >
        {cells.map((i) => {
          const on = i < shownCount;
          // Only the newly-turned squares are delayed, so the change reads as a
          // wave crossing the block rather than a single global fade.
          const isNew = i >= before && i < after;
          return (
            <span
              key={i}
              className="aspect-square rounded-[3px]"
              style={{
                background: on ? "var(--sig)" : "var(--state-off)",
                transition: "background-color 380ms ease",
                transitionDelay: isNew ? `${(i - before) * 13}ms` : "0ms",
              }}
            />
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <p className="max-w-[26ch] text-[1.375rem] leading-[1.35] font-semibold text-[#16181d]">
          {t.oneAttributeA} <span className="text-[var(--sig-deep)]">{t.oneAttributeB}</span> {t.oneAttributeC}
        </p>
        <Coverage t={t} phase={phase} />
      </div>
    </div>
  );
}

function Key({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="flex items-center gap-2.5 text-[0.9375rem] font-medium text-[#4c5563]">
      <span className="h-4 w-4 rounded-[4px]" style={{ background: swatch }} aria-hidden />
      {label}
    </span>
  );
}

/** One supporting bar: the attribute that was repaired, before and after. */
function Coverage({ t, phase }: { t: T; phase: "before" | "after" }) {
  return (
    <div className="min-w-[13rem]">
      <p className="text-[0.75rem] font-semibold tracking-wider text-[#6b7480] uppercase">{t.screenRecorded}</p>
      <div className="mt-2.5 space-y-1.5">
        {[
          { l: t.before, v: 63, n: 136, c: "#A16207" },
          { l: t.after, v: phase === "after" ? 100 : 0, n: phase === "after" ? 216 : 136, c: "var(--sig-deep)" },
        ].map((b) => (
          <div key={b.l} className="flex items-center gap-2.5">
            <span className="w-11 text-[0.75rem] text-[#6b7480]">{b.l}</span>
            <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#eef0f4]">
              <span className="block h-full rounded-full transition-[width] duration-700" style={{ width: `${b.v}%`, background: b.c }} />
            </span>
            {/* A count rather than a percentage. The proportion here is 63%,
                and the payoff line beside it says "63 more products": two
                different quantities that happen to share a number, which reads
                as a mistake even though both are right. */}
            <span className="ed-num w-16 text-right text-[0.75rem]" style={{ color: b.c }}>
              {b.n} / 216
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Gated. See src/content/proof.ts for why this cannot ship. */
function RevenueBars() {
  const max = 100;
  return (
    <div className="grid gap-px bg-[#eef0f4] sm:grid-cols-3">
      {PROOF.outcome.stats.map((m, i) => (
        <div key={m.label} className="bg-white px-5 py-7">
          <p className="ed-num flex items-baseline gap-2">
            <span className="text-[2.25rem] leading-none font-bold text-[var(--sig-deep)]">{m.value}</span>
            <TrendingUp className="h-5 w-5 text-[var(--sig-deep)]" aria-hidden />
          </p>
          <span className="mt-4 block h-2.5 overflow-hidden rounded-full bg-[#eef0f4]">
            <span className="block h-full rounded-full bg-[var(--sig-deep)]" style={{ width: `${[72, 58, 90][i] ?? 60}%`, maxWidth: `${max}%` }} />
          </span>
          <p className="mt-3 text-[0.875rem] leading-snug text-[#4c5563]">
            {m.label}
            <span className="mt-1 block text-[0.75rem] text-[#9aa1ad]">{m.sub}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

/** Tracks prefers-reduced-motion without a state-setting effect. */
function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia("(prefers-reduced-motion: reduce)");
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false, // server: assume motion is fine, the client corrects on hydrate
  );
}

/**
 * A gap, drawn as a gap.
 *
 * "No data" in grey italic is how a PIM reports this, and it is exactly why
 * nobody acts on it: the absence is rendered as politely as the presence. While
 * the problem is the subject of the story it gets a hatched danger field and a
 * warning mark, so a merchant sees the holes before reading a word. It calms
 * down from stage three, once the story has moved on to what to do about them.
 */
function MissingCell({ t }: { t: T }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-[5px] px-2 py-1 text-[0.8125rem] font-bold text-[#b91c1c]"
      style={{
        backgroundColor: "#fdeceb",
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(185,28,28,.14) 0 5px, transparent 5px 10px)",
        boxShadow: "inset 0 0 0 1px rgba(185,28,28,.28)",
      }}
    >
      <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden />
      {t.missing}
    </span>
  );
}

/** A value the repair supplied. Reads as new, not as data that was always there. */
function FilledCell({ value }: { value: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-[5px] px-2 py-1 text-[0.8125rem] font-bold text-[var(--sig-deep)]"
      style={{ backgroundColor: "var(--sig-tint)", boxShadow: "inset 0 0 0 1px rgba(77,124,15,.3)" }}
    >
      <Check className="h-3.5 w-3.5 shrink-0" aria-hidden />
      {value}
    </span>
  );
}

/**
 * A gap being worked on.
 *
 * During the audit stage each blank field shows its own progress rather than a
 * single spinner in the corner: the work is happening per field, so the
 * indicator belongs per field. Staggered by row and column so it reads as a
 * sweep through the catalogue rather than everything finishing at once.
 */
function ScanningCell({ t, delay }: { t: T; delay: number }) {
  return (
    <span className="inline-flex w-[5.5rem] flex-col gap-1.5 rounded-[5px] bg-[#f4f6f8] px-2 py-1.5">
      <span className="text-[0.6875rem] font-semibold tracking-wide text-[#6b7480] uppercase">{t.scoring}</span>
      <span className="scan-track block h-[5px] w-full overflow-hidden rounded-full bg-[#e2e6eb]">
        <span className="scan-fill block h-full rounded-full bg-[var(--sig-deep)]" style={{ animationDelay: `${delay}ms` }} />
      </span>
    </span>
  );
}


/** One ranked list. Hoisted out of PriorityShuffle: defined inside the render it
 *  was a fresh component type each pass, which remounts the whole subtree. */
function RankPanel({
  t, byKey, order, title, sub, tone,
}: {
  t: T;
  byKey: Record<string, (typeof COLS)[number]>;
  order: string[];
  title: string;
  sub: string;
  tone: "muted" | "brand";
}) {
  const ROW = 62;
  return (
    <div className="min-w-0 flex-1">
      <p className={`text-[0.6875rem] font-bold tracking-wider uppercase ${tone === "brand" ? "text-[var(--sig-deep)]" : "text-[#9aa1ad]"}`}>
        {title}
      </p>
      <p className="mt-0.5 mb-3 text-[0.75rem] text-[#9aa1ad]">{sub}</p>
      <ul className="space-y-2">
        {order.map((k, i) => {
          const c = byKey[k];
          const isStar = tone === "brand" && i === 0;
          const isDud = tone === "brand" && i === order.length - 1;
          const wasTop = tone === "muted" && i === 0;
          return (
            <li
              key={k}
              className="flex items-center gap-3 rounded-xl border px-3 py-2.5"
              style={{
                height: ROW - 10,
                borderColor: isStar ? "var(--sig-deep)" : isDud || wasTop ? "#f3c9c5" : "#e9ebef",
                background: isStar ? "var(--sig-tint)" : isDud || wasTop ? "#fdf5f4" : "#fff",
              }}
            >
              <span
                className="ed-num grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[0.8125rem] font-bold"
                style={{
                  background: isStar ? "var(--sig-deep)" : isDud || wasTop ? "#b91c1c" : "#f1f3f6",
                  color: isStar || isDud || wasTop ? "#fff" : "#6b7480",
                }}
              >
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="screen-ink block truncate text-[0.875rem] font-semibold">{t[c.labelKey]}</span>
                <span className="ed-num block text-[0.6875rem] text-[#9aa1ad]">
                  {tone === "muted" ? t.productsMissingIt(c.missing) : t.requirementsNeedIt(c.tasks)}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * The priority stage: two ranked lists, and one line.
 *
 * Third attempt, and the two failures are worth recording. A list that reordered
 * itself showed only the end state. A full slopegraph drew a line per attribute
 * across the whole width, which ran the lines straight through the label text and
 * made an unreadable mess of four crossings nobody needed.
 *
 * The claim is not "four things moved". It is "the one a completeness report puts
 * first is the one shoppers care about least". So: two panels, each legible on its
 * own, and a single connector in the gutter between them for the attribute that
 * actually makes the point. One line crossing four rows says it; four lines
 * crossing each other say nothing.
 */
function PriorityShuffle({ t }: { t: T }) {
  const BY_ABSENCE = ["cpu", "screen", "memory", "storage"];
  const BY_VALUE   = ["screen", "memory", "storage", "cpu"];
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 260);
    return () => clearTimeout(t);
  }, []);

  const byKey = Object.fromEntries(COLS.map((c) => [c.key, c]));

  return (
    <figure className="screen flex min-h-[30rem] flex-col overflow-hidden">
      <div className="screen-bar flex items-center gap-3 px-5 py-3.5">
        <span className="screen-ink text-[0.9375rem] font-bold">{t.twoWays}</span>
        <span className="ml-auto inline-flex items-center rounded-lg bg-[#fdeceb] px-3 py-1.5 text-[0.8125rem] font-bold text-[#b91c1c]">
          {t.theyDisagree}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center px-5 py-6 sm:px-7">
        <div className="flex items-start gap-3 sm:gap-5">
          <RankPanel t={t} byKey={byKey} order={BY_ABSENCE} title={t.completenessReport} sub={t.ranksByAbsent} tone="muted" />

          {/* The gutter, and the only line on the screen. It belongs to Processor:
              first by absence, last by demand. Nothing else needs drawing. */}
          <div className="relative hidden w-16 shrink-0 self-stretch sm:block" aria-hidden>
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 64 260" preserveAspectRatio="none">
              <path
                d="M2 44 C 26 44, 38 216, 62 216"
                fill="none" stroke="#b91c1c" strokeWidth="2.5"
                vectorEffect="non-scaling-stroke" strokeLinecap="round"
                strokeDasharray="300" strokeDashoffset={drawn ? 0 : 300}
                style={{ transition: "stroke-dashoffset 900ms cubic-bezier(.4,.1,.3,1)" }}
              />
            </svg>
            <span
              className="absolute left-1/2 -translate-x-1/2 rounded-md bg-[#b91c1c] px-1.5 py-0.5 text-[0.625rem] font-bold whitespace-nowrap text-[color:var(--on-sig)] transition-opacity duration-500"
              style={{ top: "46%", opacity: drawn ? 1 : 0 }}
            >
              {t.firstToLast}
            </span>
          </div>

          <RankPanel t={t} byKey={byKey} order={BY_VALUE} title={t.pulse} sub={t.ranksByNeed} tone="brand" />
        </div>

        <p className="mt-5 text-[0.875rem] leading-relaxed text-[#4c5563]">
          <span className="font-bold text-[#b91c1c]">{t.processorA}</span> {t.processorB}{" "}
          <span className="font-bold text-[#16181d]">{t.processorC}</span>
        </p>
      </div>
    </figure>
  );
}

/**
 * The repair stage: how much of this you already own.
 *
 * The first version showed four rows of title-to-value and read as mechanics.
 * The convincing thing is not how extraction works, it is what it costs: 161 of
 * the 216 values are already sitting in text the merchant owns, so most of an
 * enrichment quote is for data they already have. So that number leads, it
 * counts up so you watch it accumulate, and the worked examples sit underneath
 * as evidence rather than as the point.
 *
 * The 55 that genuinely need acquiring are stated in the same breath. A merchant
 * who has been quoted for this work will check that number, and finding it
 * missing would undo the rest.
 */
function RepairPanel({ t }: { t: T }) {
  const TARGET = 161, TOTAL = 216;
  const [n, setN] = useState(0);

  useEffect(() => {
    const started = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - started) / 1400, 1);
      // ease-out, so it decelerates into the number rather than stopping dead
      setN(Math.round(TARGET * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const EXAMPLES = [
    { title: 'HP Spectre x360 13.5" OLED Touch, 16GB', frag: '13.5"', out: '13.5"' },
    { title: "Lenovo ThinkPad X1 Carbon G9 14 inch WUXGA", frag: "14 inch", out: '14.0"' },
    { title: "MSI GS66 Stealth 15.6 FHD 240Hz", frag: "15.6", out: '15.6"' },
  ];

  return (
    <figure className="screen flex min-h-[30rem] flex-col overflow-hidden">
      <div className="screen-bar flex items-center gap-3 px-5 py-3.5">
        <span className="screen-ink text-[0.9375rem] font-bold">{t.recoveringScreen}</span>
        <span className="run-pill run-pill-done ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[0.8125rem] font-bold">
          <Check className="h-3.5 w-3.5" aria-hidden />
          {t.noNewData}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center px-5 py-6 sm:px-7">
        {/* The number is the argument. */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="max-w-[24ch] text-[1.5rem] leading-[1.3] font-semibold text-[#16181d]">
            <span className="ed-num text-[2.75rem] leading-none font-bold text-[var(--sig-deep)]">{n}</span>
            <span className="ed-num text-[1.25rem] font-bold text-[#9aa1ad]"> / {TOTAL}</span>
            <span className="mt-1 block">{t.alreadyInText}</span>
          </p>
          <p className="max-w-[22ch] text-[0.875rem] leading-relaxed text-[#4c5563]">
            {t.otherNeedA} <span className="ed-num font-bold text-[#16181d]">55</span> {t.otherNeedB}
          </p>
        </div>

        <span className="scan-track mt-5 block h-3 w-full overflow-hidden rounded-full bg-[#eef0f4]">
          <span
            className="block h-full rounded-full bg-[var(--sig-deep)] transition-[width] duration-[1400ms] ease-out"
            style={{ width: `${(n / TOTAL) * 100}%` }}
          />
        </span>

        <p className="mt-6 mb-3 flex items-center gap-1.5 text-[0.6875rem] font-bold tracking-wider text-[var(--sig-deep)] uppercase">
          <FileText className="h-3 w-3" aria-hidden />
          Pulled straight out of your product titles
        </p>

        <ul className="space-y-2">
          {EXAMPLES.map((e, i) => {
            const [before, after] = e.title.split(e.frag);
            return (
              <li
                key={e.title}
                className="reveal grid items-center gap-3 rounded-lg border border-[#eef0f4] bg-[#fafbfc] px-3.5 py-2.5 sm:grid-cols-[minmax(0,1fr)_auto_auto]"
                style={{ animationDelay: `${300 + i * 200}ms` }}
              >
                <span className="min-w-0 truncate font-mono text-[0.8125rem] text-[#6b7480]">
                  {before}
                  <mark className="rounded bg-[#dbe6fd] px-1 font-bold text-[#1e40af]">{e.frag}</mark>
                  {after}
                </span>
                <Sparkles className="hidden h-3.5 w-3.5 text-[var(--sig-deep)] sm:block" aria-hidden />
                <span
                  className="pop inline-flex items-center gap-1.5 justify-self-start rounded-[5px] px-2 py-1 text-[0.8125rem] font-bold text-[var(--sig-deep)] sm:justify-self-end"
                  style={{ backgroundColor: "var(--sig-tint)", boxShadow: "inset 0 0 0 1px rgba(77,124,15,.3)", animationDelay: `${520 + i * 200}ms` }}
                >
                  <Check className="h-3.5 w-3.5" aria-hidden />
                  {e.out}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </figure>
  );
}

/**
 * The stepper, as part of the demo rather than as page furniture.
 *
 * It used to sit above the screen with its caption, which pushed the product
 * itself below the fold: a visitor landed on a headline, a paragraph, two
 * buttons, a reassurance line, a step rail and a caption before reaching the
 * thing being sold. Inside the chrome it costs one row and reads as the demo's
 * own control, which is what it is.
 */
function StepRail({
  steps, shown, onPick,
}: {
  steps: readonly { n: string; label: string; hue: string; note: string }[];
  shown: number;
  onPick: (i: number) => void;
}) {
  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <ol className="flex flex-wrap items-center gap-1.5">
        {steps.map((s, i) => (
          <li key={s.n}>
            <button
              type="button"
              onClick={() => onPick(i)}
              aria-current={i === shown ? "step" : undefined}
              style={i === shown ? { background: s.hue, borderColor: s.hue } : undefined}
              className={[
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.75rem] font-semibold transition",
                i === shown
                  // A filled chip, so this is ink ON the fill. It read
                  // --on-panel for a moment, which is black on a blue pill.
                  ? "text-[color:var(--on-sig)]"
                  : "border-[color:var(--panel-line)] text-[color:var(--on-panel-3)] hover:text-[color:var(--on-panel-2)]",
              ].join(" ")}
            >
              <span className="ed-num opacity-70">{s.n}</span>
              {s.label}
            </button>
          </li>
        ))}
      </ol>
      <p aria-live="polite" className="text-[0.8125rem] text-[color:var(--on-panel-2)]">
        {steps[shown].note}
      </p>
    </div>
  );
}

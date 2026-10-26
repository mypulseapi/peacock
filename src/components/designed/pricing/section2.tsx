/**
 * How the price grows: audit, repair, monitor, API.
 *
 * The designer's "How it works" flow (2026-10-26): four cards, each with its tier, a line of copy,
 * an illustration and the outcome, read left to right on a desktop, two by two on a tablet, and
 * stacked on a phone. Each step is entered only once the previous one has found something worth
 * the next, which is the part of the business model a tiered table cannot express.
 *
 * Colours come from the design, one accent per step, with a dark-theme pair for each so the cards
 * work in both themes. Text lives in `pricing.section1` like the rest of the page, in both languages.
 */
import { designedText } from "../t";
import { FlowFigure, type FlowFigureName } from "./flow-figure";

const STEPS: Array<{
  n: number;
  key: "1" | "2" | "3" | "4";
  figure: FlowFigureName;
  icon: string;
  /** step dot, tier label, action pill (bg + text), glow */
  tone: { dot: string; tier: string; pill: string; glow: string };
}> = [
  {
    n: 1,
    key: "1",
    figure: "audit",
    icon: "i-user-search",
    tone: {
      dot: "bg-[#6684ff]",
      tier: "text-[#3867ff] dark:text-[#8ea6ff]",
      pill: "bg-[#eef3ff] text-[#2460e9] dark:bg-[#1b2650] dark:text-[#a9bbff]",
      glow: "bg-[#dce7ff] dark:bg-[#2a3a7a]",
    },
  },
  {
    n: 2,
    key: "2",
    figure: "repair",
    icon: "i-pen",
    tone: {
      dot: "bg-[#29aa98]",
      tier: "text-[#078c7e] dark:text-[#5fd6c6]",
      pill: "bg-[#eaf9f6] text-[#078879] dark:bg-[#0f2e2a] dark:text-[#7fe3d4]",
      glow: "bg-[#d9f7f0] dark:bg-[#12453e]",
    },
  },
  {
    n: 3,
    key: "3",
    figure: "monitor",
    icon: "i-trending-up",
    tone: {
      dot: "bg-[#ffa72c]",
      tier: "text-[#f08a00] dark:text-[#ffbf66]",
      pill: "bg-[#fff6e8] text-[#e88200] dark:bg-[#33240c] dark:text-[#ffc777]",
      glow: "bg-[#fff0d8] dark:bg-[#4a3410]",
    },
  },
  {
    n: 4,
    key: "4",
    figure: "decision-api",
    icon: "i-sparkles",
    tone: {
      dot: "bg-[#835ef2]",
      tier: "text-[#704ce3] dark:text-[#b39dff]",
      pill: "bg-[#f1edff] text-[#6d49e6] dark:bg-[#251a4a] dark:text-[#c4b3ff]",
      glow: "bg-[#ebe2ff] dark:bg-[#3a2a72]",
    },
  },
];

export function Section2Section() {
  const t = designedText("pricing.section1");
  return (
    <section className="border-b border-line bg-[radial-gradient(circle_at_50%_0%,var(--color-primary-tint)_0,transparent_34%)] bg-surface-1/50">
      <div className="frame py-16 lg:py-20">
        <p className="reveal mx-auto w-max rounded-full bg-primary-tint px-4 py-1.5 text-xs font-extrabold tracking-wider text-primary uppercase">
          {t("growsEyebrow")}
        </p>
        <h2 className="reveal mx-auto mt-5 max-w-3xl text-center text-title text-balance">
          {t("growsTitle")}
        </h2>
        <p className="reveal mx-auto mt-4 max-w-2xl text-center text-lg text-pretty text-muted">
          {t("growsIntro")}
        </p>
        <ol className="reveal mt-10 grid grid-cols-1 gap-[18px] delay-100 sm:max-[1051px]:grid-cols-2 min-[1051px]:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.key} className="relative min-w-0">
              <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card px-[22px] pt-[26px] pb-[18px] shadow-[0_16px_45px_rgba(28,48,86,0.055)]">
                {/* The soft colour wash at the foot of each card. */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-1/3 -bottom-1/2 -left-1/3 h-3/5 opacity-40 blur-[20px] ${s.tone.glow}`}
                />
                <header className="relative z-10 flex items-start gap-3.5">
                  <span
                    aria-hidden="true"
                    className={`grid size-10 shrink-0 place-items-center rounded-full text-lg font-extrabold text-white shadow-[0_7px_18px_rgba(45,69,130,0.14)] ${s.tone.dot}`}
                  >
                    {s.n}
                  </span>
                  <div>
                    <p
                      className={`mt-px mb-1 text-xs font-extrabold tracking-wider uppercase ${s.tone.tier}`}
                    >
                      {t(`grows${s.key}Tier`)}
                    </p>
                    <h3 className="text-xl leading-tight font-bold tracking-tight text-ink">
                      {t(`grows${s.key}Name`)}
                    </h3>
                  </div>
                </header>
                <p className="relative z-10 mt-3 mb-4 min-h-12 text-[15px] leading-normal text-pretty text-muted">
                  {t(`grows${s.key}Copy`)}
                </p>
                <div className="relative z-10 flex h-[190px] items-center justify-center sm:max-[1051px]:h-[210px]">
                  <FlowFigure name={s.figure} label={t(`grows${s.key}Alt`)} />
                </div>
                <p
                  className={`relative z-10 mt-auto flex min-h-12 items-center gap-2.5 rounded-[14px] px-3.5 py-2.5 text-[15px] font-extrabold ${s.tone.pill}`}
                >
                  <span className="grid size-[26px] place-items-center rounded-full bg-card">
                    <svg className="size-3.5" aria-hidden="true">
                      <use href={`#${s.icon}`} />
                    </svg>
                  </span>
                  {t(`grows${s.key}Out`)}
                </p>
              </article>
              {/* The connector to the next card, only where the row is horizontal. */}
              {i < STEPS.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute top-[51%] -right-[19px] z-20 hidden h-px w-[19px] bg-gradient-to-r from-[#dbe3f2] to-[#cbd7ed] min-[1051px]:block dark:from-line dark:to-line"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

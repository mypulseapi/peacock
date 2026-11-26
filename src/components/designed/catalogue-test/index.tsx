/**
 * Test My Catalogue: the homepage since 2026-11-04 (owner: "just this design", Pingdom's speed
 * test, the face of thepulseapi.com), and still at `/test-my-catalogue` for links already sent.
 *
 * Written from the visitor's questions (2026-11-26): the heading asks theirs, a real past result
 * shows what they get, and four steps show what follows. Then the "why" as split screens
 * (`split-scroll.tsx`, owner, 5 Nov 2026) and the site's closing band (owner's pick B, 5 Nov 2026).
 * The client component draws the band, the live run and the result; the heading, that line and
 * every label come from here, and the calculator as a server-rendered child.
 *
 * `variant` lays the same parts out three more ways for review (`/home-variants/[v]`, noindex);
 * the one chosen becomes the default and the others are deleted.
 */
import en from "../../../../messages/designed.en.json";
import { designedHref, designedText } from "../t";
import { renderLocale } from "@/i18n/render-locale";
import { ArrowRight } from "lucide-react";
import { CalculatorBlock } from "../calculator";
import { CtaBoxes } from "../cta-boxes";
import { HeroSpark } from "./hero-spark";
import { CatalogueTest } from "./catalogue-test";
import { SplitScroll } from "./split-scroll";
import { StatsCounter } from "./stats-counter";

export const HOME_VARIANTS = ["a", "b", "c"] as const;
export type HomeVariant = "default" | (typeof HOME_VARIANTS)[number];

/** The 4 Nov 2026 laptop run (store-url-audit NLR changelog): 50 of 393 pages, 9 of 11 requirements. */
const SAMPLE = {
  read: 50,
  answered: 9,
  tested: 11,
  gaps: [
    ["sampleGapUsbc", "questionUsbc", 27],
    ["sampleGapMonitors", "questionMonitors", 50],
  ] as const,
};

type T = (key: string) => string;

const fill = (s: string, vars: Record<string, number>) =>
  s.replace(/\{(\w+)\}/g, (m, k: string) => String(vars[k] ?? m));

function SampleCard({ t, wide = false }: { t: T; wide?: boolean }) {
  return (
    <div className="card">
      <div
        className={
          wide ? "grid items-center gap-x-12 gap-y-5 md:grid-cols-2" : undefined
        }
      >
        <div>
          <p className="text-sm text-muted">
            {fill(t("sampleRead"), { n: SAMPLE.read })}
          </p>
          <p className="mt-1 text-lg font-semibold text-ink">
            {fill(t("sampleAnswered"), {
              n: SAMPLE.answered,
              total: SAMPLE.tested,
            })}
          </p>
        </div>
        <ul className={`space-y-4 ${wide ? "" : "mt-5"}`}>
          {SAMPLE.gaps.map(([k, , n]) => (
            <li key={k}>
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <span className="text-ink">{t(k)}</span>
                <span className="text-muted tabular-nums">
                  {fill(t("sampleMissing"), { n, total: SAMPLE.read })}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-surface-1">
                <div
                  className="h-full rounded-full bg-gap"
                  style={{ width: `${(n / SAMPLE.read) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-5 text-xs text-pretty text-muted">{t("sampleSource")}</p>
    </div>
  );
}

const STEPS = [1, 2, 3, 4] as const;

/** Test, Decision Audit, Repair, Verify: a list, or a row of four (variants A and C). */
function NextSteps({ t, row = false }: { t: T; row?: boolean }) {
  return (
    <ol
      className={
        row ? "grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4" : "space-y-5"
      }
    >
      {STEPS.map((i) => (
        <li key={i} className={row ? "flex flex-col gap-3" : "flex gap-4"}>
          <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line font-mono text-sm text-ink">
            {i}
          </span>
          <div>
            <p className="font-semibold text-ink">{t(`step${i}Title`)}</p>
            <p className="text-pretty text-muted">{t(`step${i}Body`)}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Variant C: the four steps as a rail under the bar, the free test marked as where the visitor is. */
function StepRail({ t }: { t: T }) {
  return (
    <ol className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-y-4 sm:grid-cols-4">
      {STEPS.map((i) => (
        <li key={i} className="relative flex flex-col items-center px-2">
          {i > 1 && (
            <span
              aria-hidden
              className="absolute top-3.5 right-1/2 left-[-50%] h-px bg-line max-sm:hidden"
            />
          )}
          <span
            className={`relative z-10 grid size-7 place-items-center rounded-full border font-mono text-sm ${i === 1 ? "border-primary bg-primary text-on-primary" : "border-line bg-card text-ink"}`}
          >
            {i}
          </span>
          <p className="mt-2 text-sm font-semibold text-ink">
            {t(`step${i}Title`)}
          </p>
        </li>
      ))}
    </ol>
  );
}

/** Variant B: two buyer questions from the same real run, each with how many pages leave it open. */
function BuyerQuestions({ t }: { t: T }) {
  return (
    <figure className="mx-auto mt-8 max-w-3xl">
      <ul className="grid gap-3 sm:grid-cols-2">
        {SAMPLE.gaps.map(([, q, n]) => (
          <li
            key={q}
            className="rounded-xl border border-line bg-card px-4 py-3 text-left"
          >
            <p className="font-medium text-ink">“{t(q)}”</p>
            <p className="mt-1 text-sm text-muted">
              <span className="font-mono font-semibold text-ink tabular-nums">
                {n}/{SAMPLE.read}
              </span>{" "}
              {t("pagesSilent")}
            </p>
          </li>
        ))}
      </ul>
      <figcaption className="mt-2 text-xs text-pretty text-muted">
        {t("questionsSource")}
      </figcaption>
    </figure>
  );
}

function OverviewLink({ t }: { t: T }) {
  return (
    <a
      href={designedHref("/en/overview")}
      className="group mt-6 inline-block font-medium text-primary underline-offset-4 hover:underline"
    >
      {t("overview")}
      <ArrowRight
        className="ml-1 inline size-4 align-[-3px] transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5"
        aria-hidden
      />
    </a>
  );
}

export function CatalogueTestPage({
  variant = "default",
}: {
  variant?: HomeVariant;
}) {
  const t = designedText("catalogueTest.page");
  const labels = Object.fromEntries(
    Object.keys(en.catalogueTest.page).map((k) => [k, t(k)]),
  );
  const start = variant === "a";
  const [before, after] = t("title").split(t("titleMark"));
  // The wand stays on the line with the first word, so a phone never leaves it alone at a line end.
  const firstWord = before.split(" ", 1)[0];
  const header = (
    <div
      key="header"
      className={start ? "w-full" : "mx-auto w-full max-w-3xl text-center"}
    >
      {/* No description under it (owner, 5 Nov 2026); the marked word in Signal Red, its one use here.
          28px in both languages (owner, 12 Nov 2026): the hero face, weight and tracking at a fixed size. */}
      <h1 className="text-hero text-balance [--text-hero:2.25rem]">
        <span className="whitespace-nowrap">
          <HeroSpark />
          {firstWord}
        </span>
        {before.slice(firstWord.length)}
        <span className="text-signal-text">{t("titleMark")}</span>
        {after}
      </h1>
      <StatsCounter
        labels={labels}
        locale={renderLocale()}
        align={start ? "start" : "center"}
      />
      {variant === "b" && <BuyerQuestions t={t} />}
    </div>
  );
  const ask = (
    <div key="ask">
      <p
        className={`mt-6 text-[0.9375rem] text-pretty text-muted ${start ? "" : "text-center"}`}
      >
        {t("askLead")}{" "}
        <a
          href={designedHref("/en/contact")}
          className="group font-medium text-primary underline-offset-4 hover:underline"
        >
          {t("ctaButton")}
          <ArrowRight
            className="ml-0.5 inline size-3.5 align-[-2px] transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5"
            aria-hidden
          />
        </a>
      </p>
      {variant === "c" && <StepRail t={t} />}
    </div>
  );

  const below =
    variant === "default" ? (
      <div className="frame grid gap-x-16 gap-y-12 pt-4 pb-20 md:grid-cols-2 lg:pb-28">
        <div>
          <h2 id="next-title" className="text-h2 text-balance">
            {t("sampleTitle")}
          </h2>
          <div className="mt-5">
            <SampleCard t={t} />
          </div>
        </div>
        <div>
          <h2 className="text-h2 text-balance">{t("nextTitle")}</h2>
          <div className="mt-5">
            <NextSteps t={t} />
          </div>
          <OverviewLink t={t} />
        </div>
      </div>
    ) : variant === "c" ? (
      <div className="frame pt-4 pb-20 lg:pb-28">
        <h2 id="next-title" className="text-h2 text-balance">
          {t("sampleTitle")}
        </h2>
        <div className="mt-5">
          <SampleCard t={t} wide />
        </div>
        <OverviewLink t={t} />
      </div>
    ) : (
      <div className="frame pt-4 pb-20 lg:pb-28">
        <h2 id="next-title" className="text-h2 text-balance">
          {t("nextTitle")}
        </h2>
        <div className="mt-6">
          <NextSteps t={t} row />
        </div>
        <OverviewLink t={t} />
      </div>
    );

  return (
    <>
      {/* The hero and the section under it fill the first screen under the header together (68px and its
          1px border), so the split screens never start above the fold (owner, 5 Nov 2026). The two are
          centred as one group, so a tall screen adds room above and below them, not between (2026-11-26).
          On a short screen they are taller than it and simply run on. */}
      <div className="flex min-h-[calc(100svh-4.25rem-1px)] flex-col justify-center bg-card xl:min-h-svh">
        <CatalogueTest
          labels={labels}
          locale={renderLocale()}
          calculator={<CalculatorBlock key="calculator" bare />}
          header={header}
          ask={ask}
          aside={start ? <SampleCard t={t} /> : undefined}
          align={start ? "start" : "center"}
        />
        <section aria-labelledby="next-title" className="bg-card">
          {below}
        </section>
      </div>

      <SplitScroll labels={labels} />

      <section
        id="request"
        className="cta-boxes scroll-mt-16 border-t border-line"
      >
        <CtaBoxes />
        <div className="frame py-24 text-center lg:py-32">
          <h2 className="reveal mx-auto max-w-3xl text-headline text-balance">
            {t("ctaStrong")}
          </h2>
          <p className="reveal mx-auto mt-4 max-w-xl text-lg text-pretty text-muted delay-100">
            {t("ctaText")}
          </p>
          <div className="reveal mt-8 flex justify-center delay-200">
            <a href={designedHref("/en/contact")} className="btn-primary">
              {t("ctaButton")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

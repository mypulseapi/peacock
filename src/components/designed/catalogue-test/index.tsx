/**
 * Test My Catalogue: the homepage since 2026-11-04 (owner: "just this design", Pingdom's speed
 * test, the face of thepulseapi.com), and still at `/test-my-catalogue` for links already sent.
 *
 * One task on the first screen, as Google's and ChatGPT's homes (owner's pick D and the chat composer,
 * 2026-11-26): a short question and the bar, the live counts as the screen's footer line. Below it a real
 * past result shows what a visitor gets and four steps show what follows; then the "why" as split screens
 * (`split-scroll.tsx`, owner, 5 Nov 2026) and the site's closing band (owner's pick B, 5 Nov 2026).
 */
import en from "../../../../messages/designed.en.json";
import { designedHref, designedText } from "../t";
import { renderLocale } from "@/i18n/render-locale";
import { ArrowRight } from "lucide-react";
import { CalculatorBlock } from "../calculator";
import { CtaBoxes } from "../cta-boxes";
import { CatalogueTest } from "./catalogue-test";
import { SplitScroll } from "./split-scroll";
import { StatsCounter } from "./stats-counter";

/** The 4 Nov 2026 laptop run (store-url-audit NLR changelog): 50 of 393 pages, 9 of 11 requirements. */
const SAMPLE = {
  read: 50,
  answered: 9,
  tested: 11,
  gaps: [
    ["sampleGapUsbc", 27],
    ["sampleGapMonitors", 50],
  ] as const,
};

const STEPS = [1, 2, 3, 4] as const;

const fill = (s: string, vars: Record<string, number>) =>
  s.replace(/\{(\w+)\}/g, (m, k: string) => String(vars[k] ?? m));

export function CatalogueTestPage() {
  const t = designedText("catalogueTest.page");
  const labels = Object.fromEntries(
    Object.keys(en.catalogueTest.page).map((k) => [k, t(k)]),
  );
  const header = (
    <div key="header" className="mx-auto w-full max-w-3xl text-center">
      {/* A chat home's greeting (owner, 26 Nov 2026): body face, regular weight, no icon, no marked word. */}
      <h1 className="text-[1.75rem] leading-tight font-normal tracking-tight text-balance text-ink sm:text-[2rem]">
        {t("title")}
      </h1>
    </div>
  );
  const ask = (
    <p
      key="ask"
      className="mt-6 text-center text-[0.9375rem] text-pretty text-muted"
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
  );

  return (
    <>
      {/* The test alone fills the first screen under the header (68px and its 1px border); the counts sit
          at its foot, hidden until they load so no empty strip shows. */}
      <div className="flex min-h-[calc(100svh-4.25rem-1px)] flex-col bg-card xl:min-h-svh">
        <div className="flex flex-1 flex-col justify-center">
          <CatalogueTest
            labels={labels}
            locale={renderLocale()}
            calculator={<CalculatorBlock key="calculator" bare />}
            header={header}
            ask={ask}
          />
        </div>
        <div className="hidden border-t border-line has-[dl]:block">
          <div className="frame py-4">
            <StatsCounter labels={labels} locale={renderLocale()} />
          </div>
        </div>
      </div>

      <section
        aria-labelledby="next-title"
        className="border-t border-line bg-card"
      >
        <div className="frame py-24 lg:py-32">
          <div className="mx-auto max-w-xl space-y-20">
            <div>
              <h2 id="next-title" className="text-h2 text-balance">
                {t("sampleTitle")}
              </h2>
              <p className="mt-6 text-sm text-muted">
                {fill(t("sampleRead"), { n: SAMPLE.read })}
              </p>
              <p className="mt-1 text-lg font-semibold text-ink">
                {fill(t("sampleAnswered"), {
                  n: SAMPLE.answered,
                  total: SAMPLE.tested,
                })}
              </p>
              <ul className="mt-5 space-y-4">
                {SAMPLE.gaps.map(([k, n]) => (
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
              <p className="mt-5 text-xs text-pretty text-muted">
                {t("sampleSource")}
              </p>
            </div>
            <div>
              <h2 className="text-h2 text-balance">{t("nextTitle")}</h2>
              <ol className="mt-6 space-y-5">
                {STEPS.map((i) => (
                  <li key={i} className="flex gap-4">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line font-mono text-sm text-ink">
                      {i}
                    </span>
                    <div>
                      <p className="font-semibold text-ink">
                        {t(`step${i}Title`)}
                      </p>
                      <p className="text-pretty text-muted">
                        {t(`step${i}Body`)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
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
            </div>
          </div>
        </div>
      </section>

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

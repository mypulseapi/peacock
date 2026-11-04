/**
 * Test My Catalogue: the homepage since 2026-11-04 (owner: "just this design", Pingdom's speed
 * test, the face of thepulseapi.com), and still at `/test-my-catalogue` for links already sent.
 *
 * Pingdom's structure in Pulse's brand: a band with the heading and one row (address, category,
 * the button), a CTA bar under it, the result on white below, and a short "why" with the legends
 * at the foot. The client component draws the band, the live run and the result; the heading, the
 * CTA bar and every label come from here, and the calculator as a server-rendered child.
 */
import en from "../../../../messages/designed.en.json";
import { designedHref, designedText } from "../t";
import { renderLocale } from "@/i18n/render-locale";
import { CalculatorBlock } from "../calculator";
import { CatalogueTest } from "./catalogue-test";
import { StatsCounter } from "./stats-counter";

const RESULTS = [
  ["supported", "border-success-line bg-success-bg text-success"],
  ["partial", "border-warning-line bg-warning-bg text-warning"],
  ["buried", "border-gap bg-gap-fill text-gap-strong"],
  ["insufficient", "border-critical-line bg-critical-bg text-critical"],
] as const;
const FACTS = ["visible", "buried", "missing", "conflicting"] as const;

export function CatalogueTestPage() {
  const t = designedText("catalogueTest.page");
  const labels = Object.fromEntries(
    Object.keys(en.catalogueTest.page).map((k) => [k, t(k)]),
  );
  const header = (
    <div key="header" className="mx-auto max-w-3xl text-center">
      <h1 className="text-hero text-balance">{t("title")}</h1>
      <p className="mt-4 text-lg text-pretty text-muted">{t("lede")}</p>
      <StatsCounter labels={labels} locale={renderLocale()} />
    </div>
  );
  const ctaBar = (
    <div
      key="cta"
      className="mx-auto mt-12 flex max-w-5xl flex-col items-center justify-between gap-4 rounded-xl border border-line bg-card px-6 py-5 text-center sm:flex-row sm:text-left"
    >
      <p className="text-pretty text-ink">
        <strong className="font-semibold">{t("ctaStrong")}</strong>{" "}
        {t("ctaText")}
      </p>
      <a href={designedHref("/en/contact")} className="btn-secondary shrink-0">
        {t("ctaButton")}
      </a>
    </div>
  );

  return (
    <>
      <CatalogueTest
        labels={labels}
        locale={renderLocale()}
        calculator={<CalculatorBlock key="calculator" bare />}
        header={header}
        ctaBar={ctaBar}
      />

      <section className="border-t border-line">
        <div className="frame grid grid-cols-1 gap-10 py-16 lg:grid-cols-2 lg:py-20">
          <div className="max-w-xl">
            <h2 className="text-title text-balance">{t("infoTitle")}</h2>
            <p className="mt-4 text-pretty text-muted">{t("infoP1")}</p>
            <p className="mt-3 text-pretty text-muted">{t("infoP2")}</p>
            <p className="mt-3 text-pretty text-muted">{t("infoP3")}</p>
            <h3 className="mt-10 text-lg font-semibold text-ink">
              {t("aboutTitle")}
            </h3>
            <p className="mt-2 text-pretty text-muted">{t("aboutP1")}</p>
            <a
              href={designedHref("/en/overview")}
              className="mt-4 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {t("overview")}
            </a>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-line bg-card p-6">
              <h3 className="font-semibold text-ink">
                {t("legendResultsTitle")}
              </h3>
              <dl className="mt-3 space-y-2.5 text-sm">
                {RESULTS.map(([key, tone]) => (
                  <div
                    key={key}
                    className="grid grid-cols-[7.5rem_1fr] items-start gap-3"
                  >
                    <dt>
                      <span className={`badge ${tone}`}>
                        {t(`result_${key}`)}
                      </span>
                    </dt>
                    <dd className="text-pretty text-muted">
                      {t(`legend_${key}`)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-xl border border-line bg-card p-6">
              <h3 className="font-semibold text-ink">
                {t("legendFactsTitle")}
              </h3>
              <dl className="mt-3 space-y-2.5 text-sm">
                {FACTS.map((key) => (
                  <div
                    key={key}
                    className="grid grid-cols-[7.5rem_1fr] items-start gap-3"
                  >
                    <dt className="font-medium text-ink">
                      {t(`fact_state_${key}`)}
                    </dt>
                    <dd className="text-pretty text-muted">
                      {t(`legend_fact_${key}`)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

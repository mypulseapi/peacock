/**
 * The calculator section, on /pricing and /contact (owner, 2026-11-04: in the pages a merchant is
 * already deciding on, not a page of its own). What a visit, an order and a point of conversion are
 * worth to the merchant, in their own numbers, then the buying questions their shoppers need answered.
 *
 * rainbow `ODIN/business/CONVERSION-MODEL.md`: one formula for every industry (§ 1), an industry
 * layer (§ 3, technology first), and categories whose questions come from the requirement library
 * (`apps/api/road-runner/config/vision-requirements.json`, laptop and monitor). A category is listed
 * here only once it is in that library, so nothing in this section is a guess about the shopper.
 */
import Link from "next/link";
import { designedHref, designedText } from "../t";
import { renderLocale } from "@/i18n/render-locale";
import { Calculator, type CalculatorLabels } from "./calculator";

const LABELS: (keyof CalculatorLabels)[] = [
  "inputsTitle",
  "spend",
  "visits",
  "orders",
  "aov",
  "margin",
  "currency",
  "lift",
  "liftNote",
  "resultsTitle",
  "spendPerVisit",
  "conversion",
  "costPerOrder",
  "revenuePerVisit",
  "perTenthPoint",
  "liftTitle",
  "liftedConversion",
  "extraOrders",
  "extraRevenue",
  "extraGrossProfit",
  "liftedCostPerOrder",
  "empty",
];

// The requirement library's ids, in its order. Labels are translated in the message files.
const CATEGORIES = {
  laptop: [
    "portable",
    "two-monitors",
    "all-day-battery",
    "memory",
    "screen",
    "operating-system",
    "look",
  ],
  monitor: [
    "size",
    "sharpness",
    "smooth-motion",
    "connects",
    "desk-fit",
    "look",
  ],
} as const;

export function CalculatorSection() {
  const t = designedText("calculator.page");
  const labels = Object.fromEntries(
    LABELS.map((k) => [k, t(k)]),
  ) as unknown as CalculatorLabels;
  return (
    <section id="calculator" className="scroll-mt-24 border-b border-line">
      <div className="frame py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="reveal text-title text-balance">{t("title")}</h2>
          <p className="reveal mt-3 text-body text-pretty text-muted delay-100">
            {t("lede")}
          </p>
          <p className="mt-3 text-sm text-muted">
            {t("industry")}{" "}
            <Link
              href={designedHref("/en/industries/technology")}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {t("industryName")}
            </Link>
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-[1100px]">
          <Calculator labels={labels} locale={renderLocale()} />
        </div>

        <div className="mx-auto mt-14 max-w-2xl text-center">
          <h3 className="reveal text-h2 text-balance text-ink">
            {t("questionsTitle")}
          </h3>
          <p className="reveal mt-3 text-body text-pretty text-muted delay-100">
            {t("questionsLede")}
          </p>
        </div>
        <div className="reveal mx-auto mt-8 grid max-w-[1000px] grid-cols-1 gap-5 delay-100 md:grid-cols-2">
          {(Object.keys(CATEGORIES) as (keyof typeof CATEGORIES)[]).map(
            (cat) => (
              <div
                key={cat}
                className="rounded-2xl border border-line bg-card p-6"
              >
                <h4 className="text-lg font-semibold text-ink">
                  {t(`${cat}Name`)}
                </h4>
                <ul className="mt-3">
                  {CATEGORIES[cat].map((id) => (
                    <li
                      key={id}
                      className="flex items-start gap-3 border-t border-line py-3 first:border-t-0"
                    >
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      >
                        <use href="#i-check" />
                      </svg>
                      <span className="text-data text-pretty text-ink">
                        {t(`${cat}-${id}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          )}
        </div>
        <p className="reveal mx-auto mt-6 max-w-2xl text-center text-sm text-pretty text-muted">
          {t("questionsNote")} {t("measureBody")}
        </p>
      </div>
    </section>
  );
}

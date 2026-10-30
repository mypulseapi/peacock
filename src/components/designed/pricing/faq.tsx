/** Pricing questions, answered in a sentence each, so an answer engine can lift one on its own. */
import { designedText } from "../t";

const QUESTIONS = ["faq1", "faq2", "faq3", "faq4"] as const;

/** The same questions as a FAQPage graph node, so the schema cannot drift from the page. */
export function pricingFaqSchema() {
  const t = designedText("pricing.section1");
  return {
    "@type": "FAQPage",
    mainEntity: QUESTIONS.map((k) => ({
      "@type": "Question",
      name: t(`${k}Q`),
      acceptedAnswer: { "@type": "Answer", text: t(`${k}A`) },
    })),
  };
}

export function PricingFaq() {
  const t = designedText("pricing.section1");
  return (
    <section className="border-b border-line">
      <div className="frame py-16 lg:py-20">
        <h2 className="reveal text-center text-title text-balance">
          {t("faqTitle")}
        </h2>
        <div className="reveal mx-auto mt-10 max-w-3xl divide-y divide-line delay-100">
          {QUESTIONS.map((k) => (
            <details key={k} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-body font-semibold text-ink">
                {t(`${k}Q`)}
                <svg
                  className="size-4 shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                >
                  <use href="#i-chevron-down" />
                </svg>
              </summary>
              <p className="mt-3 text-data text-pretty text-muted">
                {t(`${k}A`)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

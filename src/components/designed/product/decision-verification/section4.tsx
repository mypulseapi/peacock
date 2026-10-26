/**
 * Converted from `decision-verification.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../../t";
import { GainsCards } from "../gains";
export function Section4Section() {
  const t = designedText("product.decision-verification.section4");
  return (
    <section className="bg-soft-gradient scroll-mt-16 border-b border-line">
            <div className="frame py-20 lg:py-28">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="reveal text-title text-balance">
                  {t('1')}
                </h2>
              </div>
              {/* One card per benefit, each with a drawn picture (owner's layout A, 26 Oct 2026). It replaces
                  the exported figure, whose three cards had only an icon each; titles and bodies unchanged. */}
              <GainsCards
                items={[
                  { art: "validate", title: t("2"), body: t("3") },
                  { art: "notWorthIt", title: t("4"), body: t("5") },
                  { art: "evidence", title: t("6"), body: t("7") },
                ]}
              />
            </div>
          </section>
  );
}

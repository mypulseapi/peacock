/**
 * Converted from `contact.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../t";
export function Section3Section() {
  const t = designedText("contact.section3");
  return (
    <section className="border-b border-line">
            <div className="frame py-20 lg:py-24">
              <div
                className="reveal bg-soft-gradient rounded-3xl border border-line px-8 py-14 lg:px-16 lg:py-20"
              >
                <h2 className="max-w-2xl text-title text-balance">
                  {t('1')}
                </h2>
                <p className="mt-5 max-w-xl text-lg text-pretty text-muted">
                  {t('2')}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="mailto:sales@thepulseapi.com" className="btn-primary"
                    >{t('3')}</a
                  >
                </div>
              </div>
            </div>
          </section>
  );
}

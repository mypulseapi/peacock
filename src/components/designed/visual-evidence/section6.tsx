/**
 * Converted from `visual-evidence.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 *
 * Every colour here is a `*-void` token, and that is not interchangeable with the page's own.
 * `bg-void` is dark in BOTH themes, while `text-ink` and `text-muted` follow the theme: in light
 * they resolve to navy and grey, which measured 1.14:1 and 3.10:1 against this band, so the whole
 * section was invisible in light mode. `--color-on-void`, `--color-void-muted` and
 * `--color-void-line` exist for this band; reach for those, never the page tokens.
 */
import { designedText } from "../t";
export function Section6Section() {
  const t = designedText("visual-evidence.section6");
  return (
    <section className="bg-void border-b border-void-line">
            <div
              className="frame grid gap-10 py-20 lg:grid-cols-12 lg:gap-x-0 lg:py-28"
            >
              {/* Sticky for the same reason as the two data sections: about 220px of framing
                  beside a list three times taller. */}
              <div className="lg:col-span-5 lg:self-start lg:sticky lg:top-24 lg:pr-16">
                <h2 className="text-title text-balance text-on-void">
                  {t('1')}
                </h2>
                <p className="mt-4 text-body leading-relaxed text-pretty text-void-muted">
                  {t('2')}
                </p>
              </div>
              <div className="lg:col-span-7">
                <ol className="divide-y divide-void-line">
                  <li className="py-5 first:pt-0">
                    <h3 className="text-h3 text-on-void">{t('3')}</h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-void-muted"
                    >
                      {t('4')}
                    </p>
                  </li>
                  <li className="py-5">
                    <h3 className="text-h3 text-on-void">
                      {t('5')}
                    </h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-void-muted"
                    >
                      {t('6')}
                    </p>
                  </li>
                  <li className="py-5">
                    <h3 className="text-h3 text-on-void">
                      {t('7')}
                    </h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-void-muted"
                    >
                      {t('8')}
                    </p>
                  </li>
                  <li className="py-5">
                    <h3 className="text-h3 text-on-void">{t('9')}</h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-void-muted"
                    >
                      {t('10')}
                    </p>
                  </li>
                  <li className="py-5 last:pb-0">
                    <h3 className="text-h3 text-on-void">
                      {t('11')}
                    </h3>
                    <p
                      className="mt-2 text-body leading-relaxed text-pretty text-void-muted"
                    >
                      {t('12')}
                    </p>
                  </li>
                </ol>
                <p
                  className="mt-10 border-t border-void-line pt-6 text-h3 text-balance text-on-void"
                >
                  {t('13')}
                </p>
              </div>
            </div>
          </section>
  );
}

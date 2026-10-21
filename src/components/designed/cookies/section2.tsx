/**
 * Converted from `cookies.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../t";
import Link from "next/link";

export function Section2Section() {
  const t = designedText("cookies.section2");
  return (
    <section className="border-b border-line">
            <div className="frame py-16 lg:py-20">
              <div className="mx-auto max-w-3xl space-y-10">
                <section
                  className="reveal border-t border-line pt-10 first:border-t-0 first:pt-0"
                >
                  <h2 className="text-h2 text-ink">{t('1')}</h2>
                  <p className="mt-4 text-body leading-relaxed text-muted">
                    {t('2')}
                  </p>
                  <p className="mt-4 text-body leading-relaxed text-muted">
                    We do not use cookies to track or store your data, as described
                    in our{" "}
                    <Link                   href="/en/privacy"
                      className="font-semibold text-primary underline decoration-primary-line underline-offset-4"
                      >{t('3')}</Link>.
                  </p>
                </section>
                <section
                  className="reveal border-t border-line pt-10 first:border-t-0 first:pt-0"
                >
                  <h2 className="text-h2 text-ink">{t('4')}</h2>
                  <ul className="mt-4 space-y-2.5 text-body text-muted">
                    <li className="flex gap-3">
                      <svg
                        className="mt-1 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>{t('5')}</span>
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="mt-1 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span
                        >{t('6')}</span
                      >
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="mt-1 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>{t('7')}</span>
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="mt-1 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span
                        >{t('8')}</span
                      >
                    </li>
                  </ul>
                </section>
                <section
                  className="reveal border-t border-line pt-10 first:border-t-0 first:pt-0"
                >
                  <h2 className="text-h2 text-ink">{t('9')}</h2>
                  <p className="mt-4 text-body leading-relaxed text-muted">
                    {t('10')}
                  </p>
                </section>
                <section
                  className="reveal border-t border-line pt-10 first:border-t-0 first:pt-0"
                >
                  <h2 className="text-h2 text-ink">{t('11')}</h2>
                  <p className="mt-4 text-body text-muted">
                    {t('12')}
                  </p>
                  <a
                    href="mailto:privacy@thepulseapi.com"
                    className="mt-4 inline-flex items-center gap-2 font-semibold text-primary underline decoration-primary-line underline-offset-4 hover:decoration-current"
                    >{t('13')}</a
                  >
                </section>
              </div>
            </div>
          </section>
  );
}

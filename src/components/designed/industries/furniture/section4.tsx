/**
 * Converted from `furniture.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../../t";
import Image from "next/image";
import { img } from "@/lib/cdn";
export function Section4Section() {
  const t = designedText("industries.furniture.section4");
  return (
    <section className="border-b border-line">
            <div className="frame py-20 lg:py-28">
              <div className="max-w-2xl">
                <h2 className="reveal text-title text-balance">
                  {t('1')}
                </h2>
              </div>
              <div
                className="reveal mt-12 grid grid-cols-1 overflow-hidden rounded-xl border border-line bg-card shadow-sm md:grid-cols-2 md:divide-x md:divide-line"
              >
                <div className="p-6 lg:p-8">
                  <h3 className="text-h3 text-muted">{t('2')}</h3>
                  {/* Opaque, with no alpha, so each box keeps a light fill pinned in both themes. */}
                  <div className="mt-5 overflow-hidden rounded-xl border border-line bg-[#fdfdfd]">
                    <Image
                      src={img("sectors/furniture-shelf-before-unanswered.webp")}
                      alt={t('beforeAlt')}
                      width={760}
                      height={882}
                      sizes="(min-width: 768px) 44vw, 90vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <ul className="mt-5 space-y-4">
                    <li className="flex gap-3 text-body text-pretty text-muted">
                      <span
                        className="mt-0.5 w-4 shrink-0 text-center text-muted"
                        aria-hidden="true"
                        >–</span
                      >{t('3')}
                    </li>
                    <li className="flex gap-3 text-body text-pretty text-muted">
                      <span
                        className="mt-0.5 w-4 shrink-0 text-center text-muted"
                        aria-hidden="true"
                        >–</span
                      >{t('4')}
                    </li>
                    <li className="flex gap-3 text-body text-pretty text-muted">
                      <span
                        className="mt-0.5 w-4 shrink-0 text-center text-muted"
                        aria-hidden="true"
                        >–</span
                      >{t('5')}
                    </li>
                  </ul>
                </div>
                <div
                  className="border-t border-line bg-primary-wash p-6 md:border-t-0 lg:p-8"
                >
                  <h3 className="text-h3">{t('6')}</h3>
                  <div className="mt-5 overflow-hidden rounded-xl border border-line bg-[#fdfdfd]">
                    <Image
                      src={img("sectors/furniture-shelf-after-filters-usable.webp")}
                      alt={t('afterAlt')}
                      width={960}
                      height={872}
                      sizes="(min-width: 768px) 44vw, 90vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <ul className="mt-5 space-y-4">
                    <li className="flex gap-3 text-body text-pretty text-ink">
                      <svg
                        className="mt-1 size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      >{t('7')}
                    </li>
                    <li className="flex gap-3 text-body text-pretty text-ink">
                      <svg
                        className="mt-1 size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      >{t('8')}
                    </li>
                    <li className="flex gap-3 text-body text-pretty text-ink">
                      <svg
                        className="mt-1 size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      >{t('9')}
                    </li>
                  </ul>
                </div>
              </div>
              <p className="reveal mt-4 max-w-xl text-caption text-muted">
                {t('10')}
              </p>
            </div>
          </section>
  );
}

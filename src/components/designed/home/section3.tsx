/**
 * Converted from `index.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import Image from "next/image";
import { img } from "@/lib/cdn";
import { designedText } from "../t";
export function Section3Section() {
  const t = designedText("home.section3");
  return (
    <section className="border-b border-line">
            <div className="frame py-20 lg:py-28">
              <h2 className="reveal text-title text-balance text-ink">
                {t('1')}
              </h2>
              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16">
                <article
                  className="reveal flex flex-col rounded-2xl border border-line bg-card p-6 shadow-sm lg:p-10"
                >
                  {/*
                    The product the shopper is actually holding.
                    
                    On a plate of its own, with a light background pinned in both themes: these
                    shots are photographed on white with no alpha, so dropped straight onto the
                    card they would be a white rectangle on a dark surface once the theme flips.
                    A plate is also how a storefront shows a pack shot, which is the thing being
                    described here.
                    
                    `width` and `height` are the file's own, which keeps the box reserved before
                    it loads: the SEO gate in check-seo.mjs refuses an image without them.
                  */}
                  <div className="mb-6 grid place-items-center rounded-xl bg-[#fdfdfd] p-4">
                    <Image
                      src={img("home/baby-laundry-powder-pack-shot.webp")}
                      alt={`${t('3')} ${t('4')}`}
                      width={1536}
                      height={1024}
                      sizes="(min-width: 768px) 20rem, 90vw"
                      className="h-32 w-auto object-contain"
                    />
                  </div>
                  <p className="eyebrow">{t('2')}</p>
                  <h3 className="mt-4 text-h2 text-balance text-ink">
                    <span className="xl:block">{t('3')}</span>
                    <span className="xl:block"
                      >{t('4')}</span
                    >
                  </h3>
                  <dl className="mt-6 space-y-5 border-t border-line pt-6">
                    <div>
                      <dt className="text-sm font-semibold text-muted">
                        {t('5')}
                      </dt>
                      <dd className="mt-1.5 text-pretty text-ink">
                        {t('packagingLead')}{" "}
                        <strong
                          className="font-semibold whitespace-nowrap text-gap-strong"
                          >{t('6')}</strong
                        >{" "}
                        {t('7')}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-muted">
                        {t('8')}
                      </dt>
                      <dd className="mt-1.5 text-pretty text-ink">
                        {t('fragranceLead')}{" "}
                        <strong className="font-semibold tabular-nums">40</strong>{" "}
                        {t('fragranceTail')}
                      </dd>
                    </div>
                  </dl>
                </article>
                <article
                  className="reveal flex flex-col rounded-2xl border border-line bg-card p-6 shadow-sm delay-100 lg:p-10"
                >
                  {/*
                    The product the shopper is actually holding.
                    
                    On a plate of its own, with a light background pinned in both themes: these
                    shots are photographed on white with no alpha, so dropped straight onto the
                    card they would be a white rectangle on a dark surface once the theme flips.
                    A plate is also how a storefront shows a pack shot, which is the thing being
                    described here.
                    
                    `width` and `height` are the file's own, which keeps the box reserved before
                    it loads: the SEO gate in check-seo.mjs refuses an image without them.
                  */}
                  <div className="mb-6 grid place-items-center rounded-xl bg-[#fdfdfd] p-4">
                    <Image
                      src={img("product/office-laptop-missing-attributes.webp")}
                      alt={`${t('10')} ${t('11')}`}
                      width={1536}
                      height={1024}
                      sizes="(min-width: 768px) 20rem, 90vw"
                      className="h-32 w-auto object-contain"
                    />
                  </div>
                  <p className="eyebrow">{t('9')}</p>
                  <h3 className="mt-4 text-h2 text-balance text-ink">
                    <span className="xl:block">{t('10')}</span>
                    <span className="xl:block"
                      >{t('11')}</span
                    >
                  </h3>
                  <dl className="mt-6 space-y-5 border-t border-line pt-6">
                    <div>
                      <dt className="text-sm font-semibold text-muted">
                        {t('12')}
                      </dt>
                      <dd className="mt-1.5 text-pretty text-ink">
                        {t('screenLead')}{" "}
                        <strong className="font-semibold tabular-nums"
                          >{t('13')}</strong
                        >{" "}
                        {t('screenMid')}{" "}
                        <strong
                          className="font-semibold whitespace-nowrap text-gap-strong"
                          >{t('14')}</strong
                        >{" "}
                        {t('15')}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-muted">
                        {t('16')}
                      </dt>
                      <dd className="mt-1.5 text-pretty text-ink">
                        {t('noAttributesLead')}{" "}
                        <strong className="font-semibold tabular-nums"
                          >{t('17')}</strong
                        >{" "}
                        {t('18')}
                      </dd>
                    </div>
                  </dl>
                </article>
              </div>
            </div>
          </section>
  );
}

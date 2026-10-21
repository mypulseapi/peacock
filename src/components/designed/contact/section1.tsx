/**
 * Converted from `contact.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 *
 * The three dropdowns are the one deliberate departure from the designer's markup: they were
 * native `<select>` elements and are now `FormSelect`, which is shadcn's Select on Radix. The
 * trigger wears the same `field` utility the inputs do, so the row still lines up.
 */
import { designedText } from "../t";
import { FormSelect } from "./form-select";

export function Section1Section() {
  const t = designedText("contact.section1");
  return (
    <section className="hero-bg border-b border-line">
            <div
              className="frame grid gap-10 py-16 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-12 lg:py-24"
            >
              <div className="lg:col-span-6">
                <h1 className="reveal text-headline text-balance">
                  {t('1')}
                </h1>
                <p
                  className="reveal mt-6 text-lg leading-relaxed text-pretty text-muted delay-100"
                >
                  {t('2')}
                </p>
                <ul className="reveal mt-8 space-y-4 text-body text-ink delay-150">
                  <li className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    >
                      <use href="#i-circle-check" />
                    </svg>
                    {t('3')}
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    >
                      <use href="#i-circle-check" />
                    </svg>
                    {t('4')}
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    >
                      <use href="#i-circle-check" />
                    </svg>
                    {t('5')}
                  </li>
                </ul>
              </div>
              <form
                className="reveal rounded-3xl border border-line bg-card p-6 shadow-sm delay-200 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:p-8"

                aria-describedby="form-note"
              >
                <h2 className="text-h2 text-ink">{t('6')}</h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="f-name"
                      className="mb-1.5 block text-sm font-medium text-ink"
                      >{t('7')} <span className="text-critical">*</span></label
                    ><input
                      id="f-name"
                      name="name"
                      type="text"
                      required
                      placeholder="John Smith"
                      autoComplete="name"
                      className="field"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="f-email"
                      className="mb-1.5 block text-sm font-medium text-ink"
                      >{t('8')} <span className="text-critical">*</span></label
                    ><input
                      id="f-email"
                      name="email"
                      type="email"
                      required
                      placeholder="john@company.com"
                      autoComplete="email"
                      className="field"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="f-company"
                      className="mb-1.5 block text-sm font-medium text-ink"
                      >{t('9')} <span className="text-critical">*</span></label
                    ><input
                      id="f-company"
                      name="company"
                      type="text"
                      required
                      placeholder="Acme Inc."
                      autoComplete="organization"
                      className="field"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="f-size"
                      className="mb-1.5 block text-sm font-medium text-ink"
                      >{t('10')}</label
                    ><FormSelect
                      id="f-size"
                      name="companySize"
                      placeholder="Select size"
                      options={[
                        "1-10 employees",
                        "11-50 employees",
                        "51-200 employees",
                        "201-500 employees",
                        "500+ employees",
                      ]}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="f-sector"
                      className="mb-1.5 block text-sm font-medium text-ink"
                      >{t('11')}</label
                    ><FormSelect
                      id="f-sector"
                      name="sector"
                      placeholder="Select sector"
                      options={[
                        "Ecommerce and retail",
                        "FMCG and consumer goods",
                        "Technology and electronics",
                        "Furniture and homewares",
                        "Cosmetics and personal care",
                        "B2B and industrial",
                        "Something else",
                      ]}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="f-type"
                      className="mb-1.5 block text-sm font-medium text-ink"
                      >What can we help you with?{" "}
                      <span className="text-critical">*</span></label
                    ><FormSelect
                      id="f-type"
                      name="inquiryType"
                      required
                      defaultValue="Sales enquiry"
                      options={[
                        "Sales enquiry",
                        "Technical support",
                        "Partnerships",
                        "Press and media",
                        "General enquiry",
                      ]}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="f-file"
                      className="mb-1.5 block text-sm font-medium text-ink"
                      >{t('12')}</label
                    ><input
                      id="f-file"
                      name="catalogue"
                      type="file"
                      accept=".csv,.json,.xlsx,.xls"
                      className="field file:mr-3 file:rounded-md file:border-0 file:bg-primary-tint file:px-3 file:py-1 file:text-sm file:font-semibold file:text-primary"
                      aria-describedby="f-file-hint"
                    />
                    <p id="f-file-hint" className="mt-1.5 text-sm text-muted">
                      {t('13')}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="f-message"
                      className="mb-1.5 block text-sm font-medium text-ink"
                      >{t('14')} <span className="text-critical">*</span></label
                    ><textarea
                      id="f-message"
                      name="message"
                      required
                      rows={5}
                      maxLength={5000}
                      placeholder="Which category should we look at, and what do you suspect shoppers are struggling to find?"
                      className="field"
                    ></textarea>
                    <p className="mt-1.5 text-right text-xs text-muted tabular-nums">
                      {t('15')}
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <button type="submit" className="btn-primary w-full" disabled>
                    {t('16')}
                  </button>
                  <p id="form-note" className="mt-4 text-sm text-pretty text-muted">
                    The form is not connected yet. For now, email{" "}
                    <a
                      href="mailto:getintouch@thepulseapi.com"
                      className="font-semibold text-primary underline decoration-primary-line underline-offset-4"
                      >{t('17')}</a
                    >.
                  </p>
                </div>
              </form>
              <div className="reveal grid content-end gap-5 delay-300 lg:col-span-6">
                <div className="rounded-2xl border border-line bg-card p-6 shadow-sm">
                  <h2 className="text-h3 text-ink">{t('18')}</h2>
                  <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    <li>
                      <p className="text-sm text-muted">{t('19')}</p>
                      <a
                        href="mailto:sales@thepulseapi.com"
                        className="text-data font-semibold break-all text-primary underline decoration-primary-line underline-offset-4 hover:decoration-current"
                        >{t('20')}</a
                      >
                    </li>
                    <li>
                      <p className="text-sm text-muted">{t('21')}</p>
                      <a
                        href="mailto:support@thepulseapi.com"
                        className="text-data font-semibold break-all text-primary underline decoration-primary-line underline-offset-4 hover:decoration-current"
                        >{t('22')}</a
                      >
                    </li>
                    <li>
                      <p className="text-sm text-muted">{t('23')}</p>
                      <a
                        href="mailto:partners@thepulseapi.com"
                        className="text-data font-semibold break-all text-primary underline decoration-primary-line underline-offset-4 hover:decoration-current"
                        >{t('24')}</a
                      >
                    </li>
                    <li>
                      <p className="text-sm text-muted">{t('25')}</p>
                      <a
                        href="mailto:press@thepulseapi.com"
                        className="text-data font-semibold break-all text-primary underline decoration-primary-line underline-offset-4 hover:decoration-current"
                        >{t('26')}</a
                      >
                    </li>
                    <li>
                      <p className="text-sm text-muted">{t('27')}</p>
                      <a
                        href="mailto:getintouch@thepulseapi.com"
                        className="text-data font-semibold break-all text-primary underline decoration-primary-line underline-offset-4 hover:decoration-current"
                        >{t('28')}</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
  );
}

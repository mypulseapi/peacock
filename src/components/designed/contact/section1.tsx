/**
 * Converted from `contact.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
export function Section1Section() {
  return (
    <section className="hero-bg border-b border-line">
            <div
              className="frame grid gap-10 py-16 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-12 lg:py-24"
            >
              <div className="lg:col-span-6">
                <h1 className="reveal text-headline text-balance">
                  Send one catalogue. Get the findings in 48 hours
                </h1>
                <p
                  className="reveal mt-6 text-lg leading-relaxed text-pretty text-muted delay-100"
                >
                  Pick the category where you most suspect shoppers struggle. We
                  need a product export, no code, no tag on your site, no customer
                  data, and we come back with what your catalogue cannot currently
                  tell anyone.
                </p>
                <ul className="reveal mt-8 space-y-4 text-body text-ink delay-150">
                  <li className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    >
                      <use href="#i-circle-check" />
                    </svg>
                    One category, one export, no account and no card
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    >
                      <use href="#i-circle-check" />
                    </svg>
                    Findings within 48 hours of your export landing
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    >
                      <use href="#i-circle-check" />
                    </svg>
                    No code, no tag on your site, no customer data
                  </li>
                </ul>
              </div>
              <form
                className="reveal rounded-3xl border border-line bg-card p-6 shadow-sm delay-200 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:p-8"

                aria-describedby="form-note"
              >
                <h2 className="text-h2 text-ink">Send us a message</h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="f-name"
                      className="mb-1.5 block text-sm font-medium text-ink"
                      >Your Name <span className="text-critical">*</span></label
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
                      >Work Email <span className="text-critical">*</span></label
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
                      >Company Name <span className="text-critical">*</span></label
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
                      >Company Size</label
                    ><select id="f-size" name="companySize" className="field">
                      <option value="">Select size</option>
                      <option>1-10 employees</option>
                      <option>11-50 employees</option>
                      <option>51-200 employees</option>
                      <option>201-500 employees</option>
                      <option>500+ employees</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="f-sector"
                      className="mb-1.5 block text-sm font-medium text-ink"
                      >What do you sell?</label
                    ><select id="f-sector" name="sector" className="field">
                      <option value="">Select sector</option>
                      <option>Ecommerce and retail</option>
                      <option>FMCG and consumer goods</option>
                      <option>Technology and electronics</option>
                      <option>Furniture and homewares</option>
                      <option>Cosmetics and personal care</option>
                      <option>B2B and industrial</option>
                      <option>Something else</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="f-type"
                      className="mb-1.5 block text-sm font-medium text-ink"
                      >What can we help you with?{" "}
                      <span className="text-critical">*</span></label
                    ><select id="f-type" name="inquiryType" required className="field">
                      <option>Sales enquiry</option>
                      <option>Technical support</option>
                      <option>Partnerships</option>
                      <option>Press and media</option>
                      <option>General enquiry</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="f-file"
                      className="mb-1.5 block text-sm font-medium text-ink"
                      >Catalogue export (optional)</label
                    ><input
                      id="f-file"
                      name="catalogue"
                      type="file"
                      accept=".csv,.json,.xlsx,.xls"
                      className="field file:mr-3 file:rounded-md file:border-0 file:bg-primary-tint file:px-3 file:py-1 file:text-sm file:font-semibold file:text-primary"
                      aria-describedby="f-file-hint"
                    />
                    <p id="f-file-hint" className="mt-1.5 text-sm text-muted">
                      CSV, JSON or a spreadsheet, up to 15MB. One category is
                      enough. Send it now and we can start without a second email.
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="f-message"
                      className="mb-1.5 block text-sm font-medium text-ink"
                      >Your Message <span className="text-critical">*</span></label
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
                      0/5000 characters
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <button type="submit" className="btn-primary w-full" disabled>
                    Send Message
                  </button>
                  <p id="form-note" className="mt-4 text-sm text-pretty text-muted">
                    The form is not connected yet. For now, email{" "}
                    <a
                      href="mailto:getintouch@thepulseapi.com"
                      className="font-semibold text-primary underline decoration-primary-line underline-offset-4"
                      >getintouch@thepulseapi.com</a
                    >.
                  </p>
                </div>
              </form>
              <div className="reveal grid content-end gap-5 delay-300 lg:col-span-6">
                <div className="rounded-2xl border border-line bg-card p-6 shadow-sm">
                  <h2 className="text-h3 text-ink">Or contact us directly</h2>
                  <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    <li>
                      <p className="text-sm text-muted">Sales enquiry</p>
                      <a
                        href="mailto:sales@thepulseapi.com"
                        className="text-data font-semibold break-all text-primary underline decoration-primary-line underline-offset-4 hover:decoration-current"
                        >sales@thepulseapi.com</a
                      >
                    </li>
                    <li>
                      <p className="text-sm text-muted">Technical support</p>
                      <a
                        href="mailto:support@thepulseapi.com"
                        className="text-data font-semibold break-all text-primary underline decoration-primary-line underline-offset-4 hover:decoration-current"
                        >support@thepulseapi.com</a
                      >
                    </li>
                    <li>
                      <p className="text-sm text-muted">Partnerships</p>
                      <a
                        href="mailto:partners@thepulseapi.com"
                        className="text-data font-semibold break-all text-primary underline decoration-primary-line underline-offset-4 hover:decoration-current"
                        >partners@thepulseapi.com</a
                      >
                    </li>
                    <li>
                      <p className="text-sm text-muted">Press and media</p>
                      <a
                        href="mailto:press@thepulseapi.com"
                        className="text-data font-semibold break-all text-primary underline decoration-primary-line underline-offset-4 hover:decoration-current"
                        >press@thepulseapi.com</a
                      >
                    </li>
                    <li>
                      <p className="text-sm text-muted">General enquiry</p>
                      <a
                        href="mailto:getintouch@thepulseapi.com"
                        className="text-data font-semibold break-all text-primary underline decoration-primary-line underline-offset-4 hover:decoration-current"
                        >getintouch@thepulseapi.com</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
  );
}

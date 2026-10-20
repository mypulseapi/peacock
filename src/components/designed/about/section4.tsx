/**
 * Converted from `about.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import Link from "next/link";

export function Section4Section() {
  return (
    <section className="border-b border-line">
            <div
              className="frame grid gap-10 py-20 lg:grid-cols-12 lg:gap-x-0 lg:py-28"
            >
              <div className="lg:col-span-5 lg:pr-16">
                <h2 className="text-title text-balance">
                  Early, and specific about it
                </h2>
                <p
                  className="mt-4 max-w-sm text-body leading-relaxed text-pretty text-muted"
                >
                  What we can show today, and what we cannot yet.
                </p>
              </div>
              <div className="lg:col-span-7">
                <div
                  className="grid gap-10 rounded-3xl border border-primary-line bg-primary-wash p-6 md:grid-cols-2 md:gap-0 md:divide-x md:divide-line lg:p-8"
                >
                  <div className="md:pr-8">
                    <h3
                      className="flex items-center gap-2 border-b-2 border-success pb-3 text-h3 text-ink"
                    >
                      <svg className="size-5 shrink-0 text-success" aria-hidden="true">
                        <use href="#i-circle-check" /></svg
                      >What we can show
                    </h3>
                    <dl className="mt-4 divide-y divide-line">
                      <div className="py-4 first:pt-0 last:pb-0">
                        <dt className="text-sm font-semibold text-ink">
                          What is proven
                        </dt>
                        <dd className="mt-1 text-body text-pretty text-muted">
                          The measurement. When we rerun the ranking with different
                          settings, the top of the list stays the same.
                        </dd>
                      </div>
                      <div className="py-4 first:pt-0 last:pb-0">
                        <dt className="text-sm font-semibold text-ink">
                          What is built
                        </dt>
                        <dd className="mt-1 text-body text-pretty text-muted">
                          The audit engine, and a live service that re-ranks a
                          catalogue as it changes and explains every score.
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div className="md:pl-8">
                    <h3
                      className="flex items-center gap-2 border-b-2 border-warning pb-3 text-h3 text-ink"
                    >
                      <svg className="size-5 shrink-0 text-warning" aria-hidden="true">
                        <use href="#i-circle-alert" /></svg
                      >What we cannot show yet
                    </h3>
                    <dl className="mt-4 divide-y divide-line">
                      <div className="py-4 first:pt-0 last:pb-0">
                        <dt className="text-sm font-semibold text-ink">
                          What is not proven
                        </dt>
                        <dd className="mt-1 text-body text-pretty text-muted">
                          Any effect on revenue or conversion. We have run no live
                          experiment, so we have no number and will not offer one.
                        </dd>
                      </div>
                      <div className="py-4 first:pt-0 last:pb-0">
                        <dt className="text-sm font-semibold text-ink">
                          What we are unsure about
                        </dt>
                        <dd className="mt-1 text-body text-pretty text-muted">
                          How far the method carries beyond the categories we have
                          measured. We will know when more merchants have run it.
                        </dd>
                      </div>
                      <div className="py-4 first:pt-0 last:pb-0">
                        <dt className="text-sm font-semibold text-ink">
                          Customers we can name
                        </dt>
                        <dd className="mt-1 text-body text-pretty text-muted">
                          None yet. The first audit asks for one export and nothing
                          installed, and we will name customers here only with their
                          permission.
                        </dd>
                      </div>
                      <div className="py-4 first:pt-0 last:pb-0">
                        <dt className="text-sm font-semibold text-ink">
                          The channel we do not measure
                        </dt>
                        <dd className="mt-1 text-body text-pretty text-muted">
                          A shopper can be told a fact three ways: a field they can
                          filter on, a photograph they can look at, or a sentence
                          they will actually read. We measure the first one. On the
                          laptop shelf we use for our own research the first two do
                          not overlap at all, so a catalogue can score well here and
                          still leave a buyer unable to see what they came for.{" "}
                          <Link                         href="/en/visual-evidence"
                            className="text-link underline underline-offset-4 hover:text-primary-hover"
                            >We published the measurement</Link>.
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
                <p className="mt-10 border-t border-line pt-6 text-body text-ink">
                  One export, nothing installed.{" "}
                  <Link                 href="/en/contact"
                    className="hit-area font-medium text-link underline underline-offset-4 hover:text-primary-hover"
                    >Request a Decision Audit</Link>
                </p>
              </div>
            </div>
          </section>
  );
}

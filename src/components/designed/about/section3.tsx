/**
 * Converted from `about.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
export function Section3Section() {
  return (
    <section className="border-b border-line">
            <div
              className="frame grid gap-10 py-20 lg:grid-cols-12 lg:gap-x-0 lg:py-28"
            >
              <div className="lg:col-span-5 lg:pr-16">
                <h2 className="text-title text-balance">Four things we hold to</h2>
                <p
                  className="mt-4 max-w-sm text-body leading-relaxed text-pretty text-muted"
                >
                  How we work, and why there is no conversion figure anywhere on
                  this site.
                </p>
              </div>
              <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-7">
                <li className="border-t-2 border-primary pt-6">
                  <h3 className="text-h3 text-ink">Show the working</h3>
                  <p className="mt-2 text-body leading-relaxed text-pretty text-muted">
                    The figures on this site are example data, and we say so where
                    they appear. If we cannot show how a figure was produced, we do
                    not print it.
                  </p>
                </li>
                <li className="border-t-2 border-primary pt-6">
                  <h3 className="text-h3 text-ink">Keep the negative results</h3>
                  <p className="mt-2 text-body leading-relaxed text-pretty text-muted">
                    We keep the attempt that failed its criteria, the one that
                    passed for the wrong reason, and the one that held.
                  </p>
                </li>
                <li className="border-t-2 border-primary pt-6">
                  <h3 className="text-h3 text-ink">Say what we cannot measure</h3>
                  <p className="mt-2 text-body leading-relaxed text-pretty text-muted">
                    Our ranking is steady at the top and less steady below it, and
                    we say so{" "}
                    <a
                      href="#ranking"
                      className="text-link underline underline-offset-4 hover:text-primary-hover"
                      >next to the ranking</a
                    >, not in a footnote.
                  </p>
                </li>
                <li className="border-t-2 border-primary pt-6">
                  <h3 className="text-h3 text-ink">Earn the integration</h3>
                  <p className="mt-2 text-body leading-relaxed text-pretty text-muted">
                    The first audit needs no code, no tag and no access to your
                    systems. If it is not useful, you have lost an export and an
                    afternoon.
                  </p>
                </li>
              </ul>
            </div>
          </section>
  );
}

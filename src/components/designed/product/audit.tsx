/**
 * Converted from `index.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
export function AuditSection() {
  return (
    <section id="audit" className="scroll-mt-16 border-b border-line">
            <div className="frame py-20 lg:py-28">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-6">
                  <h2 className="reveal text-title text-balance">
                    Decision Audit.
                    <span className="text-muted">What should we record first?</span>
                  </h2>
                  <p className="reveal mt-5 text-body leading-relaxed text-muted">
                    You send one category export. We work out which missing
                    attributes would do the most to help your shoppers tell your
                    products apart, rank them, and hand you the list with the
                    affected products attached. The ranking is measured in bits of
                    decision information, not guessed from click data.
                  </p>
                  <p
                    className="reveal mt-6 border-t border-line pt-5 text-sm text-muted"
                  >
                    <strong className="font-semibold text-ink"
                      >What it needs from you:</strong
                    >
                    One CSV or JSON export. No code, no tag, no system access.
                  </p>
                  <a
                    href="decision-audit.html"
                    className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                    >Read about Decision Audit<svg
                      className="size-3.5 transition-transform duration-150 ease-out-soft group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      <use href="#i-arrow-right" /></svg
                  ></a>
                </div>
                <div className="reveal delay-200 lg:col-span-6">
                  <ul
                    className="space-y-3 rounded-2xl border border-line bg-card p-6 text-data text-ink shadow-sm"
                  >
                    <li className="flex gap-3">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span
                        >Attributes ranked by what recording them everywhere would
                        be worth</span
                      >
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>The exact products missing each one</span>
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span
                        >Where each fact lives: in your text already, in a supplier
                        feed, or nowhere</span
                      >
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span
                        >How much we recovered from your titles and descriptions
                        before you lift a finger</span
                      >
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span
                        >A decision-readiness number you can re-measure later</span
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
  );
}

/**
 * Converted from `index.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
export function MonitorSection() {
  return (
    <section id="monitor" className="scroll-mt-16 border-b border-line">
            <div className="frame py-20 lg:py-28">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-6">
                  <h2 className="reveal text-title text-balance">
                    Decision Monitor.
                    <span className="text-muted">When did this shelf get worse?</span>
                  </h2>
                  <p className="reveal mt-5 text-body leading-relaxed text-muted">
                    Catalogues decay. New products arrive unrecorded, supplier feeds
                    change shape, and a category that was ready last quarter quietly
                    stops being ready. Monitor re-runs the measurement as your
                    catalogue changes and tells you when a shelf slips, naming the
                    cause rather than just the number.
                  </p>
                  <p
                    className="reveal mt-6 border-t border-line pt-5 text-sm text-muted"
                  >
                    <strong className="font-semibold text-ink"
                      >What it needs from you:</strong
                    >
                    A recurring export, or a feed.
                  </p>
                  <a
                    href="decision-monitor.html"
                    className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                    >Read about Decision Monitor<svg
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
                      ><span>Re-measured on a schedule you set</span>
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span
                        >An alert that names the shelf, the attribute and the
                        cause</span
                      >
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span
                        >Trend per category, so you can see decay before a buyer
                        does</span
                      >
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>Nothing to install: it reads the same export</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
  );
}

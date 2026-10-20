/**
 * Converted from `index.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import Link from "next/link";

export function VerificationSection() {
  return (
    <section
            id="verification"
            className="scroll-mt-16 border-b border-line bg-surface-1/50"
          >
            <div className="frame py-20 lg:py-28">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-6">
                  <h2 className="reveal text-title text-balance">
                    Decision Verification.{" "}
                    <span className="text-muted">Did the repair actually work?</span>
                  </h2>
                  <p className="reveal mt-5 text-body leading-relaxed text-muted">
                    Once your team has populated the top attribute, we run the same
                    measurement again and show you what moved: coverage per
                    attribute, how much of the gap closed, and where your readiness
                    number landed. This needs no traffic and no waiting, because it
                    is a property of your catalogue rather than of your visitors.
                  </p>
                  <p
                    className="reveal mt-6 border-t border-line pt-5 text-sm text-muted"
                  >
                    <strong className="font-semibold text-ink"
                      >What it needs from you:</strong
                    >
                    The repaired catalogue, re-exported.
                  </p>
                  <Link                 href="/en/product/decision-verification"
                    className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                    >Read about Decision Verification<svg
                      className="size-3.5 transition-transform duration-150 ease-out-soft group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      <use href="#i-arrow-right" /></svg
                  ></Link>
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
                      ><span>The same measurement, on the repaired catalogue</span>
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>Before and after, attribute by attribute</span>
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span
                        >Confirmation the week you finish, not the quarter
                        after</span
                      >
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="mt-0.5 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>Evidence for whoever signed off the work</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
  );
}

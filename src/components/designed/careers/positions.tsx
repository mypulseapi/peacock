/**
 * Converted from `index.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
export function PositionsSection() {
  return (
    <section id="positions" className="scroll-mt-20 border-b border-line">
            <div className="frame py-20 lg:py-28">
              <h2 className="reveal text-title text-balance">Open positions</h2>
              <div
                className="reveal card mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center lg:p-8"
              >
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-full bg-surface-1 text-muted"
                >
                  <svg className="size-5" aria-hidden="true">
                    <use href="#i-user-round" />
                  </svg>
                </span>
                <div className="flex-1">
                  <p className="text-h3 text-ink">No open positions right now</p>
                  <p className="mt-1 text-body text-pretty text-muted">
                    New roles will be listed here when they open.
                  </p>
                </div>
              </div>
            </div>
          </section>
  );
}

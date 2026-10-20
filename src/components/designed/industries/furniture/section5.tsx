/**
 * Converted from `furniture.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
export function Section5Section() {
  return (
    <section className="border-b border-line">
            <div className="frame py-20 lg:py-28">
              <div className="max-w-2xl">
                <h2 className="reveal text-title text-balance">What we do about it</h2>
                <p
                  className="reveal mt-6 text-body leading-relaxed text-pretty text-muted"
                >
                  Three things, and only the first one needs anything from you.
                </p>
              </div>
              <ol
                className="reveal mt-12 grid grid-cols-1 gap-8 rounded-3xl border border-primary-line bg-primary-wash p-6 md:grid-cols-3 lg:p-10"
              >
                <li>
                  <span
                    className="grid size-9 place-items-center rounded-full bg-primary text-sm font-semibold tabular-nums text-on-primary"
                    >1</span
                  >
                  <h3 className="mt-5 text-h3">Send one category</h3>
                  <p className="mt-2 text-body text-pretty text-muted">
                    A CSV or JSON export of a single category. Product name,
                    description, category, price, and whatever attributes you
                    already record.
                  </p>
                </li>
                <li>
                  <span
                    className="grid size-9 place-items-center rounded-full bg-primary text-sm font-semibold tabular-nums text-on-primary"
                    >2</span
                  >
                  <h3 className="mt-5 text-h3">We rank what to record first</h3>
                  <p className="mt-2 text-body text-pretty text-muted">
                    Every missing attribute scored by how much recording it would
                    change what a buyer in your sector can decide, with the affected
                    products attached.
                  </p>
                </li>
                <li>
                  <span
                    className="grid size-9 place-items-center rounded-full bg-primary text-sm font-semibold tabular-nums text-on-primary"
                    >3</span
                  >
                  <h3 className="mt-5 text-h3">You fix it, then we verify</h3>
                  <p className="mt-2 text-body text-pretty text-muted">
                    Most of the repair is work your own team can do. When it is done
                    we recompute on the repaired catalogue and show you exactly what
                    moved.
                  </p>
                </li>
              </ol>
              <ul
                className="reveal mt-6 flex flex-wrap gap-2"
                aria-label="What it takes"
              >
                <li
                  className="flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-sm text-ink"
                >
                  <svg className="size-3.5 text-primary" aria-hidden="true">
                    <use href="#i-check" /></svg
                  >One category export
                </li>
                <li
                  className="flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-sm text-ink"
                >
                  <svg className="size-3.5 text-primary" aria-hidden="true">
                    <use href="#i-check" /></svg
                  >No code
                </li>
                <li
                  className="flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-sm text-ink"
                >
                  <svg className="size-3.5 text-primary" aria-hidden="true">
                    <use href="#i-check" /></svg
                  >No tag on your site
                </li>
                <li
                  className="flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-sm text-ink"
                >
                  <svg className="size-3.5 text-primary" aria-hidden="true">
                    <use href="#i-check" /></svg
                  >No customer data
                </li>
              </ul>
            </div>
          </section>
  );
}

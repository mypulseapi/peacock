/**
 * Converted from `about.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import Link from "next/link";

export function Section2Section() {
  return (
    <section className="border-b border-line">
            <div className="frame py-20 lg:py-28">
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-0">
                <h2 className="text-title text-balance lg:col-span-5 lg:pr-16">
                  It started with one shelf of laptops
                </h2>
                <div
                  className="space-y-5 text-body leading-relaxed text-pretty text-muted lg:col-span-7"
                >
                  <p>
                    We looked at a laptop shelf of 216 products to answer a simple
                    question: if a shopper had to choose, could this catalogue help
                    them? It could not.
                  </p>
                  <p>
                    The surprise was not the missing data. It was that the usual way
                    of choosing what to fix, emptiest field first, would have spent
                    the effort where it helped shoppers least. That gap between what
                    is missing and what shoppers need is the whole company.
                  </p>
                </div>
              </div>
              <div
                className="mt-16 grid gap-8 border-t border-line pt-10 lg:mt-20 lg:grid-cols-12 lg:gap-x-0"
              >
                <div className="lg:col-span-5 lg:pr-16">
                  <p
                    className="font-display text-title font-semibold tabular-nums text-primary"
                  >
                    47 of 216
                  </p>
                  <p className="mt-2 max-w-xs text-sm text-pretty text-muted">
                    products on the example shelf recorded nothing a shopper could
                    filter on, and 94 could not be told apart on what shoppers need.
                  </p>
                  <p className="mt-6">
                    <Link                   href="/en/product/decision-audit"
                      className="hit-area font-medium text-link underline underline-offset-4 hover:text-primary-hover"
                      >See how the Decision Audit ranks a catalogue</Link>
                  </p>
                </div>
                <div className="w-full max-w-lg lg:col-span-7 lg:justify-self-center">
                  <div className="card min-w-0">
                    <p className="text-sm font-semibold text-ink">
                      357 fields are missing across the shelf
                    </p>
                    <table className="mt-3 w-full table-fixed text-sm">
                      <thead className="font-sans text-caption text-muted">
                        <tr>
                          <th scope="col" className="w-1/2 py-1 text-left font-medium">
                            Product
                          </th>
                          <th scope="col" className="py-1 text-left font-medium">
                            Screen size
                          </th>
                          <th scope="col" className="py-1 text-left font-medium">
                            Memory
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line">
                        <tr>
                          <th
                            scope="row"
                            className="py-2 pr-2 text-left font-sans font-normal text-ink"
                          >
                            LG 16Z90TS-G
                          </th>
                          <td className="py-2 pr-2 text-ink">16.0&quot;</td>
                          <td className="py-2 pr-2">
                            <span
                              className="inline-block rounded px-1.5 py-0.5 font-sans text-caption missing-cell"
                              >Missing</span
                            >
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            className="py-2 pr-2 text-left font-sans font-normal text-ink"
                          >
                            Spectre x360
                          </th>
                          <td className="py-2 pr-2">
                            <span
                              className="inline-block rounded px-1.5 py-0.5 font-sans text-caption missing-cell"
                              >Missing</span
                            >
                          </td>
                          <td className="py-2 pr-2 text-ink">16GB</td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            className="py-2 pr-2 text-left font-sans font-normal text-ink"
                          >
                            ThinkPad X1 Carbon Gen 9
                          </th>
                          <td className="py-2 pr-2">
                            <span
                              className="inline-block rounded px-1.5 py-0.5 font-sans text-caption missing-cell"
                              >Missing</span
                            >
                          </td>
                          <td className="py-2 pr-2 text-ink">32GB</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
  );
}

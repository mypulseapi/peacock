/**
 * "How it works" on every product page (owner, 26 Oct 2026): the zig-zag first built for Return
 * Verification and Promotion Audit, now shared with Decision Audit, Monitor and Verification.
 *
 * Each step is a row, picture beside words, the picture switching sides from one row to the next.
 * The words lead with the step's number, large, and its You / Us / Both badge. The picture is
 * whatever the page already had for that step: the older pages pass their exported illustrations in
 * the panels they were already framed in, the newer ones their drawings.
 *
 * On a phone every row opens with its picture; only the desktop row mirrors.
 */
import type { ReactNode } from "react";
import { Link } from "@/i18n/routing";
import { renderLocale } from "@/i18n/render-locale";

export interface ZigzagStep {
  label: string;
  title: string;
  body: string;
  picture: ReactNode;
  /** The label is a product on a solution page: link it to that product's page. */
  href?: string;
}

export function StepsZigzag({
  heading,
  intro,
  steps,
}: {
  heading: string;
  intro?: string;
  steps: ZigzagStep[];
}) {
  const locale = renderLocale();
  return (
    <section className="scroll-mt-16 border-b border-line bg-primary-wash">
      <div className="frame py-20 lg:py-28">
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2 className="text-title text-balance">{heading}</h2>
          {intro && (
            <p className="mt-4 text-lg text-pretty text-muted">{intro}</p>
          )}
        </div>
        <ol className="mt-14 grid gap-14 lg:mt-20 lg:gap-20">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              {/* Each part fades up on its own, the picture a little after the words (owner, 29 Oct 2026). */}
              <div
                className={`reveal delay-300 ${i % 2 ? "" : "lg:order-last"}`}
              >
                {s.picture}
              </div>
              <div>
                <p className="reveal flex items-baseline gap-4">
                  <span className="font-title text-display text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.label && s.href ? (
                    <Link
                      locale={locale}
                      href={s.href}
                      className="badge-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                    >
                      {s.label}
                    </Link>
                  ) : (
                    s.label && <span className="badge-primary">{s.label}</span>
                  )}
                </p>
                <h3 className="reveal mt-4 text-h2 text-balance text-ink delay-100">
                  {s.title}
                </h3>
                <p className="reveal mt-3 text-body text-pretty text-muted delay-200">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

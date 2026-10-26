import type { ReactNode } from "react";

/**
 * One hero for every non-home page, so the site stops drifting a heading style
 * per route. Left aligned rather than centred: centred headings force the eye
 * back to a new left edge on each line, and these pages carry real prose.
 */
export function PageHero({
  eyebrow, title, lede, children, aside, titleClassName = "ed-d1",
}: {
  eyebrow?: string; title: ReactNode; lede?: ReactNode; children?: ReactNode;
  /**
   * The headline's type style. `ed-d1` (Geist 700) by default; the product pages pass `text-hero`, the
   * home hero's size and title face (owner's Version A, 26 Oct 2026). The why and use-case pages keep
   * `ed-d1` until the owner asks for them too.
   */
  titleClassName?: string;
  /**
   * A scene beside the words rather than under them. Without it the hero is a
   * column of text down the left and an empty right third, which is what every
   * story page looked like; `children` stays below for calls to action.
   */
  aside?: ReactNode;
}) {
  return (
    <section className="ed-canvas relative overflow-hidden border-b border-[color:var(--ed-line)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 -right-40 h-[34rem] w-[34rem] rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--brand-indigo) 0%, transparent 70%)" }}
      />
      {/* A hero carrying a scene is taller than one carrying only text, and the
          scene starts at the container's top edge rather than being pushed down
          by the heading, so it cleared the fixed 114px header by 46px while the
          h1 cleared it by 177px. More top padding when there is an aside. */}
      <div className={`relative mx-auto max-w-shell px-5 pb-20 sm:px-6 lg:pb-24 ${
        aside ? "pt-36 lg:pt-56" : "pt-32 lg:pt-40"
      }`}>
        <div className={aside ? "grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16" : ""}>
          <div>
            {eyebrow && <p className="ed-eyebrow">{eyebrow}</p>}
            <h1 className={`${titleClassName} ${eyebrow ? "mt-6 " : ""}max-w-[20ch] text-[color:var(--ed-ink)]`}>{title}</h1>
            {lede && <p className="ed-lede mt-8 max-w-[62ch]">{lede}</p>}
            {children && <div className="mt-11">{children}</div>}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}

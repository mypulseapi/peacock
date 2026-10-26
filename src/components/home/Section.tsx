import type { ReactNode } from "react";

/**
 * One section shell for the whole page, so vertical rhythm is set in a single
 * place instead of drifting per section, which is what happened to the old page.
 */
export function Section({
  children, tone = "canvas", className = "", id,
}: { children: ReactNode; tone?: "canvas" | "raise" | "tint" | "ink"; className?: string; id?: string }) {
  const bg =
    tone === "ink" ? "ed-ink-panel"
    : tone === "tint" ? "ed-tint"
    : tone === "raise" ? "ed-raise"
    : "ed-canvas";
  return (
    <section id={id} className={`${bg} ${className}`}>
      <div className="mx-auto max-w-shell px-5 py-20 sm:px-6 lg:py-28">{children}</div>
    </section>
  );
}

/**
 * A section heading, and its lede beside it rather than under it.
 *
 * Stacked in a `max-w-3xl` column, a display heading of any length ran to three
 * lines, the lede ran to three more, and the whole block used half the width
 * and a screen of height before the section had shown anything. On a 1440
 * viewport the right half was empty.
 *
 * Side by side, the same words take roughly half the height and fill the
 * measure. Below `lg` they stack, which is correct at that width. A head with
 * no body keeps the single column: there is nothing to put beside it.
 */
export function SectionHead({
  eyebrow, title, body, invert = false, align = "left",
}: { eyebrow?: string; title: string; body?: string; invert?: boolean; align?: "left" | "center" }) {
  const ink = invert ? "text-[color:var(--on-panel)]" : "text-[color:var(--ed-ink)]";
  const sub = invert ? "text-[color:var(--on-panel-2)]" : "";
  // Optional since 26 Oct 2026: the product pages pass none (the owner's rule, no label over a heading).
  const label = eyebrow ? (
    <p className={`ed-eyebrow ${invert ? "text-[color:var(--on-panel-2)]" : ""}`}>{eyebrow}</p>
  ) : null;
  const gap = eyebrow ? "mt-5 " : "";

  if (align === "center") {
    return (
      <header className="mx-auto max-w-2xl text-center">
        {label}
        <h2 className={`ed-d2 ${gap}${ink}`}>{title}</h2>
        {body && <p className={`ed-lede mt-7 ${sub}`}>{body}</p>}
      </header>
    );
  }

  if (!body) {
    return (
      <header className="max-w-3xl">
        {label}
        <h2 className={`ed-d2 ${gap}${ink}`}>{title}</h2>
      </header>
    );
  }

  return (
    <header className="grid gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-end">
      <div>
        {label}
        <h2 className={`ed-d2 ${gap}text-balance ${ink}`}>{title}</h2>
      </div>
      <p className={`ed-lede max-w-[54ch] lg:pb-1 ${sub}`}>{body}</p>
    </header>
  );
}

/**
 * "What your business gains" on Decision Verification and Decision Monitor, and "What you get" on
 * every page on `ChapterPage` (owner, 26 Oct 2026): one wide card per benefit, picture on one side
 * and the claim on the other, alternating (the owner's layout A, 26 Oct 2026), in the shape of the
 * Decision Audit's own section, which keeps its exported figure.
 *
 * The pictures are the owner's generated ones (`product-pictures.tsx`, 28 Oct 2026), transparent
 * WebP on the card's wash. They replaced the inline SVG drawings that stood in for them here.
 */
import type { ReactNode } from "react";

export function GainsCards({
  items,
}: {
  /** `picture` is the owner's generated picture for the card (`product-pictures.tsx`). */
  items: { picture?: ReactNode; title: string; body: string }[];
}) {
  return (
    <div className="mt-14 grid gap-4">
      {items.map((item, i) => (
        <article
          key={item.title}
          className="reveal grid items-center gap-6 rounded-2xl border border-line bg-card p-4 lg:grid-cols-2 lg:gap-14 lg:p-5"
        >
          <div
            className={`aspect-3/2 overflow-hidden rounded-xl border border-line bg-primary-wash ${i % 2 ? "lg:order-last" : ""}`}
          >
            {item.picture}
          </div>
          <div
            className={`px-2 pb-4 lg:px-0 lg:pb-0 ${i % 2 ? "lg:pl-6" : "lg:pr-6"}`}
          >
            <h3 className="text-h3 text-balance text-ink">{item.title}</h3>
            <p className="mt-2 max-w-prose text-body text-pretty text-muted">
              {item.body}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

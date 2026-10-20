"use client";

import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { midCta } from "@/content/home";
import { useInView } from "@/components/charts/useInView";
import { EASE } from "@/components/charts/tokens";

/**
 * One question, one line, one button, on a tinted band.
 *
 * The page had a call to action in the hero and another in the footer, with
 * nine sections between them and nothing to click. Somebody persuaded by the
 * budget argument two thirds of the way down had to keep scrolling to act, and
 * most people do not.
 *
 * Centred rather than left aligned: it is a break in the argument, not another
 * step of it, and the band should read as a different kind of thing from the
 * sections either side.
 */
export function MidCtaSection() {
  const c = midCta(useLocale());
  const { ref, shown } = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden border-y border-[color:var(--ed-line)]">
      {/* One soft wash, so the band reads as a pause without a hard colour
          change that would compete with the ink section above it. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 140% at 50% 0%, color-mix(in srgb, var(--sig) 20%, transparent) 0%, transparent 70%)",
        }}
      />
      <div
        ref={ref}
        className="relative mx-auto max-w-shell px-5 py-24 text-center sm:px-6 lg:py-28"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(12px)",
          transition: `opacity 560ms ${EASE}, transform 560ms ${EASE}`,
        }}
      >
        <h2 className="ed-d2 mx-auto max-w-[20ch] text-balance text-[color:var(--ed-ink)]">
          {c.question}
        </h2>
        <p className="ed-lede mx-auto mt-6 max-w-[46ch]">{c.body}</p>

        <Link
          href={c.href}
          className="group mt-10 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[color:var(--brand-indigo)] px-6 py-3.5 text-[1rem] font-semibold text-[color:var(--brand-on-indigo)] transition hover:bg-[color:var(--brand-indigo-deep)]"
        >
          {c.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>

        <p className="mt-6 text-[0.875rem] text-[color:var(--ed-ink-3)]">{c.note}</p>
      </div>
    </section>
  );
}

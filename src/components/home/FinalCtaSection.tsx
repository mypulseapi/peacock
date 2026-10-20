import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { finalCta } from "@/content/home";

export function FinalCtaSection() {
  const locale = useLocale();
  const FINAL_CTA = finalCta(locale);
  return (
    <section className="ed-canvas">
      <div className="mx-auto max-w-shell px-5 py-24 sm:px-6 lg:py-36">
        <div className="ed-ink-panel relative overflow-hidden rounded-3xl px-8 py-16 sm:px-14 lg:px-20 lg:py-20">
          <div className="max-w-2xl">
            <h2 className="ed-d2 text-[color:var(--on-panel)]">{FINAL_CTA.title}</h2>
            <p className="ed-lede mt-7 text-[color:var(--on-panel-2)]">{FINAL_CTA.body}</p>
            <div className="mt-11 flex flex-wrap items-center gap-3">
              <Link
                href={FINAL_CTA.primary.href}
                // A white pill with --brand-indigo-deep text, which on this theme resolves to
                // the signal's dim step: lime on white at 1.66:1. The same lime-as-ink
                // mistake as the industry hero. .sig-cta is the treatment the navbar
                // already uses, and it is the right way round: lime fill, dark text.
                className="sig-cta group inline-flex min-h-[48px] items-center gap-2 rounded-xl px-6 py-3.5 text-[0.9375rem] focus-visible:ring-2 focus-visible:ring-[color:var(--sig)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--panel-0)] focus-visible:outline-none"
              >
                {FINAL_CTA.primary.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
              <Link
                href={FINAL_CTA.secondary.href}
                className="inline-flex items-center rounded-xl border border-[color:var(--panel-line)] px-6 py-3.5 text-[0.9375rem] font-semibold text-[color:var(--on-panel)] transition hover:bg-[color:var(--panel-2)] focus-visible:ring-2 focus-visible:ring-[color:var(--sig)] focus-visible:outline-none"
              >
                {FINAL_CTA.secondary.label}
              </Link>
            </div>
            <p className="mt-7 text-sm text-[color:var(--on-panel-2)]">{FINAL_CTA.reassure}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

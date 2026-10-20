import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { hero } from "@/content/home";
import { AuditStory } from "./AuditStory";

/**
 * Centred stage, aurora, and a light product screen cropped by the bottom edge.
 *
 * The architecture is borrowed deliberately from the strongest hero in this
 * category, because it works and it is worth being precise about why: a centred
 * column concentrates attention, display type at this size carries the claim
 * alone, an aurora gives the composition a focal point, and a LIGHT interface on
 * a dark stage has enormous contrast and reads as a real screen. The previous
 * version put a dark table on a dark stage and went flat.
 *
 * What is ours: lime rather than violet, and the ranking sitting on the column
 * headers. A competitor can show you a catalogue full of holes. Ranking those
 * holes needs the measurement.
 */
/*
 * The locale arrives as a prop rather than from `useLocale()`.
 *
 * `useLocale()` and `getLocale()` both resolve to English inside a Server Component during
 * `output: "export"`, so `pick()` fell through to its English fallback and the Vietnamese home
 * page served English copy under `<html lang="vi">`. Nothing failed: `pick` is designed to fall
 * back rather than throw, which is correct for an untranslated module and exactly what hides this.
 *
 * The page has the locale from its params and is the only place that reliably does, so it hands
 * it down. A prop cannot silently resolve to the wrong value.
 */
export function HeroSection({ locale }: { locale: string }) {
  const HERO = hero(locale);
  return (
    <section className="hero-stage relative overflow-hidden">
      <div className="sig-grid absolute inset-0 opacity-70" aria-hidden />
      <div className="hero-aurora pointer-events-none absolute inset-x-0 bottom-[-6rem] h-[42rem]" aria-hidden />

      <div className="relative mx-auto max-w-shell px-5 pt-20 sm:px-6 lg:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="sig-eyebrow">{HERO.eyebrow}</p>
          <h1 className="mt-6 text-[clamp(2rem,1.4rem+2.4vw,3rem)] leading-[1.06] font-bold tracking-[-0.038em] text-[color:var(--on-panel)]">
            {HERO.title}
          </h1>
          <p className="mx-auto mt-4 max-w-[58ch] text-[0.9375rem] leading-[1.6] text-[color:var(--on-panel-2)] sm:text-[1.0625rem]">
            {HERO.lede}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={HERO.primary.href}
              className="sig-cta group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[0.9375rem] focus-visible:ring-2 focus-visible:ring-[color:var(--sig)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--panel-0)] focus-visible:outline-none"
            >
              {HERO.primary.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link
              href={HERO.secondary.href}
              className="inline-flex items-center rounded-full border border-[color:var(--panel-line)] bg-[color:var(--panel-1)] px-6 py-3.5 text-[0.9375rem] font-semibold text-[color:var(--on-panel)] transition hover:bg-[color:var(--panel-2)] focus-visible:ring-2 focus-visible:ring-[color:var(--sig)] focus-visible:outline-none"
            >
              {HERO.secondary.label}
            </Link>
          </div>
        </div>

        {/* Cropped by the stage's bottom edge, so the screen reads as continuing
            past the fold rather than as a floating card. */}
        <div className="mx-auto mt-8 max-w-5xl lg:mt-9">
          <AuditStory />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight, AlertTriangle, Check, MapPin } from "lucide-react";
import Image from "next/image";
import { img } from "@/lib/cdn";
import { PageHero } from "@/components/PageHero";
import { StepArt } from "@/components/story/StepArt";
import { Section, SectionHead } from "@/components/home/Section";
import { BarChart, Figure } from "@/components/charts/Charts";
import { sector } from "@/content/industries";
import { ui } from "@/content/locale";

/**
 * One sector page.
 *
 * The previous version rendered ten sectors off one template with the noun
 * swapped, on the old "personalization stack" copy: vouchers, lookalike
 * audiences, native Shopify and Magento SDKs. Search treats six near-identical
 * pages as one, and a reader in that sector learns nothing from a page that
 * could have been about any other.
 *
 * So each sector now carries its own situation, its own four attributes, and
 * its own question set, and the page renders them in the same order the story
 * pages use: what happens here, what we do about it, what you get, the
 * questions people in this sector actually ask. The FAQ becomes FAQPage schema
 * per route, which is the part answer engines can lift.
 */
export function IndustryPageContent({ slug }: { slug: string }) {
  const locale = useLocale();
  const c = ui(locale);
  const t = useTranslations("industryShell");
  const s = sector(locale, slug)!;
  const Icon = s.icon;
  /* The attribute a buyer decides on that the catalogue records least. That is
     what the audit puts first, so it is the one the comparison turns on. */
  const topGap = [...s.attributes]
    .filter((a) => a.decisive)
    .sort((a, b) => a.coverage - b.coverage)[0];

  return (
    <>
      <PageHero
        aside={
          s.image ? (
            // Fixed ratio box so the hero reserves its space before the file
            // loads. `sizes` is the rendered width at each breakpoint, not the
            // file's, which is what stops a phone pulling the desktop asset.
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl">
              <Image
                src={img(s.image.src)}
                alt={s.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40rem, 100vw"
                className="object-cover"
              />
            </div>
          ) : undefined
        }
        eyebrow={s.name}
        title={
          <>
            {s.heroTitle}{" "}
            {/* --accent-primary, not --sig. The signal lime measures 1.11:1 as
                text on the light canvas, which is unreadable; it is a fill
                colour with dark text on it, not a text colour. */}
            <span className="text-[color:var(--accent-primary)]">{s.heroHighlight}</span>
          </>
        }
        lede={s.heroLede}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[color:var(--brand-indigo)] px-5 py-3.5 text-[0.9375rem] font-semibold text-[color:var(--brand-on-indigo)] transition hover:bg-[color:var(--brand-indigo-deep)]"
          >
            {t("requestAudit")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <Link
            href="/product/decision-audit"
            className="inline-flex min-h-[44px] items-center rounded-xl border border-[color:var(--ed-line)] px-5 py-3.5 text-[0.9375rem] font-semibold text-[color:var(--ed-ink)] transition hover:border-[color:var(--brand-indigo)]"
          >
            {t("seeWhatYouGet")}
          </Link>
        </div>

        <p className="ed-rule mt-9 flex flex-wrap items-center gap-3 pt-7 text-[0.875rem] text-[color:var(--ed-ink-2)]">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[color:var(--brand-lav-100)]">
            <Icon className="h-4.5 w-4.5" style={{ color: "var(--accent-primary)" }} aria-hidden />
          </span>
          <span className="ed-num font-semibold text-[color:var(--ed-ink)]">{s.metric}</span>
          <span className="text-[color:var(--ed-ink-3)]">{t("metricLabel")}</span>
        </p>
      </PageHero>

      {/* Market context, third-party and cited. Counts up on scroll so the
          figure registers as a number rather than as page furniture. */}
      {/* Only when there is something to show. Three of the six categories ship
          `facts: []` because nobody has sourced published figures for them yet,
          and a heading over an empty grid reads as a broken page rather than an
          honest absence. */}
      {s.facts.length > 0 && (
      <Section tone="raise" className="border-b border-[color:var(--ed-line)]">
        <SectionHead eyebrow={t("contextEyebrow")} title={t("contextTitle", { sector: s.name })} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {s.facts.map((f) => (
            <Figure
              key={f.label}
              value={f.value}
              unit={f.unit}
              label={f.label}
              source={f.source}
              tone={f.value >= 60 && f.unit === "%" ? "warn" : "work"}
            />
          ))}
        </div>
      </Section>
      )}

      {/* The sector's own scenario. This is the part that differs most between
          pages, and the reason each one is worth indexing separately. */}
      <Section tone="raise" className="border-t border-[color:var(--ed-line)]">
        <SectionHead
          eyebrow={t("problemsEyebrow")}
          title={t("problemsTitle", { sector: s.name })}
          body={t("decisionIntro", { decision: s.decision })}
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {s.problems.map((problem) => (
            <li key={problem} className="ed-raise flex items-start gap-3.5 rounded-2xl border border-[color:var(--ed-line)] p-6 sm:p-7">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                style={{ background: "var(--brand-blush-100)" }}
              >
                <AlertTriangle className="h-3 w-3" style={{ color: "var(--brand-coral-ink)" }} aria-hidden />
              </span>
              <p className="ed-body flex-1">{problem}</p>
            </li>
          ))}
        </ul>

        <BarChart
          title={t("chartTitle", { sector: s.name })}
          source={t("chartSource")}
          note={t("chartNote")}
          max={100}
          data={s.attributes.map((a) => ({
            label: a.label,
            value: a.coverage,
            // The urgent row is the one a decision turns on and the catalogue
            // mostly does not record. Everything else is recessive.
            tone: a.decisive && a.coverage < 60 ? "warn" : a.decisive ? "good" : "base",
          }))}
        />

        <div className="mt-10 flex items-start gap-3.5 rounded-2xl border border-[color:var(--ed-line)] p-6 sm:p-7">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-lav-100)]">
            <MapPin className="h-3 w-3" style={{ color: "var(--accent-primary)" }} aria-hidden />
          </span>
          <p className="ed-body flex-1">
            <span className="font-semibold text-[color:var(--ed-ink)]">{t("provenanceLabel")}</span>{" "}
            {s.provenance}
          </p>
        </div>
      </Section>

      {/* Before and after, above "What we do about it", where the review drew it.
          Built from this sector's own decision and its top decisive attribute
          rather than from a stock photograph, so every category gets a true
          version of the comparison without six new pieces of copy. */}
      {topGap && (
        <Section tone="tint" className="border-t border-[color:var(--ed-line)]">
          <SectionHead eyebrow={t("transformEyebrow")} title={t("transformTitle")} />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {([
              {
                label: t("beforeLabel"),
                tone: "before" as const,
                items: [
                  t("beforeDecision", { decision: s.decision }),
                  t("beforeAttribute", { attribute: topGap.label, coverage: topGap.coverage }),
                  t("beforeWork"),
                ],
              },
              {
                label: t("afterLabel"),
                tone: "after" as const,
                items: [
                  t("afterDecision", { attribute: topGap.label }),
                  t("afterAttribute", { attribute: topGap.label }),
                  t("afterWork"),
                ],
              },
            ]).map((col) => (
              <div
                key={col.label}
                className={`rounded-2xl border p-8 ${
                  col.tone === "before"
                    ? "border-[color:var(--ed-line)] bg-[color:var(--brand-band-blush)]"
                    : "border-[color:var(--sig-line)] bg-[color:var(--brand-card)]"
                }`}
              >
                <p className="ed-eyebrow">{col.label}</p>
                <ul className="mt-6 space-y-4">
                  {col.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="mt-1 shrink-0 font-semibold text-[color:var(--ed-ink-3)]">
                        {col.tone === "before" ? "\u2013" : "\u2713"}
                      </span>
                      <span className="ed-body">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-[70ch] text-[0.8125rem] text-[color:var(--ed-ink-3)]">{t("transformNote")}</p>
        </Section>
      )}

      <Section className="border-t border-[color:var(--ed-line)]">
        <SectionHead eyebrow={c.whatHappens} title={t("stepsTitle")} body={t("stepsBody")} />
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {(["1", "2", "3"] as const).map((n) => (
            <li key={n}>
              <StepArt step={Number(n) as 1 | 2 | 3} />
              <span className="ed-num text-[0.8125rem] font-bold text-[color:var(--accent-primary)]">{`0${n}`}</span>
              <h3 className="ed-d4 mt-4 text-[color:var(--ed-ink)]">{t(`step${n}Title`)}</h3>
              <p className="ed-body mt-3">{t(`step${n}Body`)}</p>
            </li>
          ))}
        </ol>
        <ul className="mt-12 flex flex-wrap gap-2.5">
          {["needCsv", "needNoCode", "needNoTag", "needNoCustomerData"].map((k) => (
            <li
              key={k}
              className="inline-flex min-h-[32px] items-center gap-2 rounded-full border border-[color:var(--ed-line)] px-3.5 py-1.5 text-[0.8125rem] text-[color:var(--ed-ink-2)]"
            >
              <Check className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--accent-primary)" }} aria-hidden />
              {t(k)}
            </li>
          ))}
        </ul>
      </Section>

      {/* Sector-specific questions. These are the page's FAQPage schema too. */}
      <Section tone="ink" className="border-t border-[color:var(--panel-line)]">
        <div className="max-w-2xl">
          <h2 className="ed-d2 text-[color:var(--on-panel)]">{t("ctaTitle", { sector: s.name })}</h2>
          <p className="ed-lede mt-7 text-[color:var(--on-panel-2)]">{t("ctaBody")}</p>
          <div className="mt-11 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[color:var(--sig)] px-5 py-3.5 text-[0.9375rem] font-semibold text-[color:var(--on-sig)] transition hover:brightness-110"
            >
              {t("requestAudit")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex min-h-[44px] items-center rounded-xl border border-[rgb(var(--veil-rgb)/0.25)] px-5 py-3.5 text-[0.9375rem] font-semibold text-[color:var(--on-panel)] transition hover:border-[rgb(var(--raise-rgb)/0.5)]"
            >
              {t("viewPricing")}
            </Link>
          </div>
          <p className="mt-7 text-[0.875rem] text-[color:var(--on-panel-3)]">{t("ctaNote")}</p>
        </div>
      </Section>
    </>
  );
}

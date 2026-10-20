
import { examples } from "@/content/home";
import { Section, SectionHead } from "./Section";

/**
 * Two problems a merchant recognises, in place of four statistics about us.
 *
 * The band here was 216 / 32 / 12-12 / 0, our own measurement, which reads as a
 * laboratory result rather than as their Tuesday. The 2026-10 review asked for
 * two examples from consumer goods and e-commerce instead, those being the
 * markets we sell into.
 *
 * Each example is the same three beats in the same order: who is shopping, what
 * was never recorded, and what it costs. Repeating the structure is what lets a
 * reader see that these are one problem wearing two coats.
 */
/*
 * The locale arrives as a prop. `useLocale()` resolves to English inside a Server Component under
 * `output: "export"`, so `pick()` fell through to its English fallback and this rendered English
 * under `<html lang="vi">`. Nothing threw: falling back is what `pick` is for, which is exactly
 * what hid it. The page has the locale from its params and hands it down.
 */
export function ExamplesBand({ locale }: { locale: string }) {
  const EX = examples(locale);
  return (
    <Section tone="raise" className="border-y border-[color:var(--ed-line)]">
      <SectionHead eyebrow={EX.eyebrow} title={EX.title} />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {EX.items.map((item) => (
          <article key={item.sector} className="rounded-2xl border border-[color:var(--ed-line)] bg-[color:var(--brand-card)] p-8">
            <p className="ed-eyebrow">{item.sector}</p>
            <p className="ed-d4 mt-5 text-[color:var(--ed-ink)]">{item.shopper}</p>
            <dl className="ed-rule mt-7 space-y-5 pt-6">
              <div>
                <dt className="text-[0.8125rem] font-semibold text-[color:var(--ed-ink-3)]">Never recorded</dt>
                <dd className="ed-body mt-1.5">{item.missing}</dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] font-semibold text-[color:var(--ed-ink-3)]">What it costs</dt>
                <dd className="ed-body mt-1.5">{item.cost}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
      <p className="mt-8 max-w-[70ch] text-[0.8125rem] text-[color:var(--ed-ink-3)]">{EX.note}</p>
    </Section>
  );
}

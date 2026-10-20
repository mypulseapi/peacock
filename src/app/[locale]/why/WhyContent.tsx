
import { PageHero } from "@/components/PageHero";
import { Scene } from "@/components/story/Scenes";
import { Section, SectionHead } from "@/components/home/Section";
import { whyCompare, whyHero, whyLimits, whyMethod, whyArt } from "@/content/why";

/*
 * The locale arrives as a prop. `useLocale()` resolves to English inside a Server Component under
 * `output: "export"`, so `pick()` fell through to its English fallback and this rendered English
 * under `<html lang="vi">`. Nothing threw: falling back is what `pick` is for, which is exactly
 * what hid it. The page has the locale from its params and hands it down.
 */
export default function WhyContent({ locale }: { locale: string }) {
  const WHY_HERO = whyHero(locale);
  const METHOD = whyMethod(locale);
  const COMPARE = whyCompare(locale);
  const LIMITS = whyLimits(locale);
  return (
    <>
      <PageHero eyebrow={WHY_HERO.eyebrow} title={WHY_HERO.title} lede={WHY_HERO.lede}
        aside={<Scene spec={whyArt(locale)} slot="hero" />}
      >
        <nav aria-label="On this page" className="flex flex-wrap gap-2">
          {[METHOD, COMPARE, LIMITS].map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-[color:var(--ed-line)] bg-[color:var(--ed-raise)] px-4 py-2 text-[0.875rem] font-medium text-[color:var(--ed-ink-2)] transition hover:border-[color:var(--brand-indigo)] hover:text-[color:var(--ed-ink)]"
            >
              {s.eyebrow}
            </a>
          ))}
        </nav>
      </PageHero>

      <Section id={METHOD.id}>
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <SectionHead eyebrow={METHOD.eyebrow} title={METHOD.title} />
          {/*
              `min-w-0` is load-bearing. A grid item defaults to `min-width: auto`, which means it
              refuses to shrink below its content, and the content here is a <pre> holding an
              unbreakable 90-character pnpm command. Without this the column sized itself to that
              command and pushed the whole page to 822px in a 375px viewport: /why was the only
              page on the site that actually scrolled sideways, and the <pre>'s own
              `overflow-x-auto` could not help because the overflow was happening one level up.
          */}
          <div className="min-w-0">
            <div className="ed-stack max-w-[64ch]">
              {METHOD.paragraphs.map((p) => <p key={p.slice(0, 30)} className="ed-body">{p}</p>)}
            </div>
            <aside className="mt-10 rounded-2xl border border-[color:var(--ed-line)] bg-[color:var(--brand-lav-50)] p-6">
              <p className="ed-d5 text-[color:var(--ed-ink)]">{METHOD.callout.title}</p>
              <p className="ed-body mt-2">{METHOD.callout.body}</p>
              <pre className="mt-5 overflow-x-auto rounded-xl border border-[color:var(--ed-line)] bg-[color:var(--ed-raise)] p-4">
                <code className="font-mono text-[0.8125rem] leading-relaxed text-[color:var(--ed-ink-2)]">
                  {METHOD.callout.code}
                </code>
              </pre>
            </aside>
          </div>
        </div>
      </Section>

      <Section id={COMPARE.id} tone="raise" className="border-y border-[color:var(--ed-line)]">
        <SectionHead eyebrow={COMPARE.eyebrow} title={COMPARE.title} body={COMPARE.intro} />
        <div className="mt-16 overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <thead>
              <tr className="ed-eyebrow">
                <th scope="col" className="w-[26%] pb-4 font-semibold">&nbsp;</th>
                <th scope="col" className="w-[37%] pb-4 font-semibold">Engagement-ranked tooling</th>
                <th scope="col" className="w-[37%] pb-4 pl-6 font-semibold text-[color:var(--brand-indigo)]">Pulse</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.rows.map((r) => (
                <tr key={r.q} className="border-t border-[color:var(--ed-line)] align-top">
                  <th scope="row" className="py-5 pr-6 text-[0.9375rem] font-semibold text-[color:var(--ed-ink)]">{r.q}</th>
                  <td className="py-5 pr-6 text-[0.9375rem] leading-[1.7] text-[color:var(--ed-ink-3)]">{r.them}</td>
                  <td className="border-l border-[color:var(--ed-line)] py-5 pl-6 text-[0.9375rem] leading-[1.7] text-[color:var(--ed-ink)]">{r.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="ed-body mt-10 max-w-[66ch] border-l-2 border-[color:var(--brand-lav-300)] pl-5">{COMPARE.note}</p>
      </Section>

      <Section id={LIMITS.id}>
        <SectionHead eyebrow={LIMITS.eyebrow} title={LIMITS.title} />
        <div className="mt-16 grid gap-7 lg:grid-cols-2">
          {LIMITS.items.map((l) => (
            <article key={l.title} className="ed-raise rounded-2xl border border-[color:var(--ed-line)] p-7">
              <h3 className="ed-d4 text-[color:var(--ed-ink)]">{l.title}</h3>
              <p className="ed-body mt-4">{l.body}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

/**
 * The use-case pages, SEO and AEO and Time to market (owner's version 1, 27 Oct 2026): an essay with
 * its figures in the margin. Their own look rather than the product pages' chapters, because these
 * two pages argue one plan against another and read best as an argument.
 *
 * Every word is the page's own, from its content module (`content/pages/*.ts`, both locales), and
 * every figure keeps its data; `charts.tsx` redraws them and `drawings.tsx` adds a picture to each
 * section. Headings drop their trailing full stop and carry no label over them, as on the product
 * pages.
 *
 *   hero         the headline and the page's first figure, then its picture
 *   situation    the argument, its pull quote and picture; the evidence pinned beside it
 *   the ceiling  where the usual plan stops, beside the figure that shows it
 *   the figure   the page's own figure (`SchemaBands`, `TwoPlans`), beside its heading
 *   steps        the three steps, each with its picture
 *   what changes the cards, each with its picture
 *   limits, questions, the call to action
 */
import type { ReactNode } from "react";
import { Check, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { renderLocale } from "@/i18n/render-locale";
import { ui } from "@/content/locale";
import { StoryCta, type StoryContent } from "@/components/StoryPage";
import { UseCaseScene } from "./charts";
import { HeroAurora } from "@/components/designed/hero-aurora";

export interface UseCaseArt {
  hero: ReactNode;
  situation: ReactNode;
  steps: ReactNode[];
  gets: ReactNode[];
}

const h = (s: string) => s.replace(/\.\s*$/, "");

/** Text on the left, its figure pinned beside it on a wide screen. */
function Essay({
  children,
  figure,
}: {
  children: ReactNode;
  figure: ReactNode;
}) {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-16">
      <div className="min-w-0">{children}</div>
      <div className="grid min-w-0 gap-5 lg:sticky lg:top-24">{figure}</div>
    </div>
  );
}

export function UseCasePage({
  c,
  figure,
  art,
}: {
  c: StoryContent;
  figure: ReactNode;
  art: UseCaseArt;
}) {
  const locale = renderLocale();
  const t = ui(locale);
  return (
    <>
      <section className="relative isolate hero-bg overflow-hidden border-b border-line">
        <HeroAurora />
        <div className="frame pt-12 pb-20 lg:pt-16 lg:pb-28">
          <Essay figure={<UseCaseScene spec={c.scenes?.hero} />}>
            <h1 className="reveal text-hero text-balance">{h(c.title)}</h1>
            <p className="reveal mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted delay-100">
              {c.lede}
            </p>
            <div className="reveal mt-8 delay-200">
              <Link locale={locale} href={c.cta.href} className="btn-primary">
                {c.cta.label}
              </Link>
            </div>
          </Essay>
          <div className="reveal mt-12 delay-200 lg:mt-16">{art.hero}</div>
        </div>
      </section>

      {c.situation && (
        <section className="border-b border-line bg-card">
          <div className="frame py-20 lg:py-28">
            <Essay figure={<UseCaseScene spec={c.scenes?.situation} />}>
              <h2 className="reveal text-title text-balance">
                {h(c.situation.heading)}
              </h2>
              <div className="reveal mt-6 grid gap-4 delay-100">
                {c.situation.body.map((p) => (
                  <p
                    key={p.slice(0, 28)}
                    className="max-w-[64ch] text-body leading-relaxed text-pretty text-muted"
                  >
                    {p}
                  </p>
                ))}
              </div>
              {c.situation.pull && (
                <p className="reveal mt-8 border-l-2 border-primary pl-5 text-lg leading-snug font-semibold text-balance text-ink">
                  {c.situation.pull}
                </p>
              )}
              <div className="reveal mt-10">{art.situation}</div>
            </Essay>
          </div>
        </section>
      )}

      {c.chainBlock && (
        <section className="border-b border-line">
          <div className="frame py-20 lg:py-28">
            <Essay figure={<UseCaseScene spec={c.scenes?.chain} />}>
              <h2 className="reveal text-title text-balance">
                {h(c.chainBlock.heading)}
              </h2>
              {c.chainBlock.body && (
                <p className="reveal mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted delay-100">
                  {c.chainBlock.body}
                </p>
              )}
            </Essay>
          </div>
        </section>
      )}

      {/* Its own section, not a sub-heading under the ceiling: it is the page's own figure and
          answers a different question (owner, 27 Oct 2026). */}
      <section className="border-b border-line bg-card">
        <div className="frame py-20 lg:py-28">
          <Essay figure={figure}>
            {c.visualHeading && (
              <h2 className="reveal text-title text-balance">
                {h(c.visualHeading)}
              </h2>
            )}
            {c.visualBody && (
              <p className="reveal mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted delay-100">
                {c.visualBody}
              </p>
            )}
          </Essay>
        </div>
      </section>

      <section className="border-b border-line bg-primary-wash">
        <div className="frame grid gap-12 py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16 lg:py-28">
          <div className="lg:sticky lg:top-24">
            <h2 className="reveal text-title text-balance">
              {h(c.steps.heading)}
            </h2>
            {c.steps.intro && (
              <p className="reveal mt-4 text-lg text-pretty text-muted delay-100">
                {c.steps.intro}
              </p>
            )}
          </div>
          <ol className="grid gap-4">
            {c.steps.items.map((s, i) => (
              <li
                key={s.n}
                className="reveal grid grid-cols-[3.5rem_minmax(0,1fr)] items-start gap-x-4 gap-y-5 xl:grid-cols-[3.5rem_minmax(0,1fr)_13rem] rounded-3xl border border-line bg-card p-5 sm:p-6"
              >
                <span>
                  <span className="block font-display text-3xl leading-none font-semibold tabular-nums text-primary">
                    {s.n}
                  </span>
                  <span className="mt-2 block text-caption text-muted">
                    {s.meta}
                  </span>
                </span>
                <span className="min-w-0">
                  <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-body text-pretty text-muted">
                    {s.body}
                  </p>
                </span>
                {art.steps[i] && (
                  <div className="col-span-2 xl:col-span-1">{art.steps[i]}</div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {c.gets && (
        <section className="border-b border-line">
          <div className="frame py-20 lg:py-28">
            <h2 className="reveal max-w-3xl text-title text-balance">
              {h(c.gets.heading)}
            </h2>
            {c.gets.intro && (
              <p className="reveal mt-4 max-w-2xl text-lg text-pretty text-muted delay-100">
                {c.gets.intro}
              </p>
            )}
            <ul className="reveal mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
              {c.gets.items.map((g, i) => (
                <li key={g.title} className="bg-card p-6 sm:p-7">
                  {art.gets[i]}
                  <h3 className="mt-6 text-lg font-semibold text-ink">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-body text-pretty text-muted">
                    {g.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {c.limits && (
        <section className="border-b border-line bg-surface-1">
          <div className="frame py-20 lg:py-28">
            <h2 className="reveal max-w-3xl text-title text-balance">
              {h(c.limits.heading)}
            </h2>
            <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-14">
              {[
                {
                  label: t.whatThisDoes,
                  items: c.limits.will,
                  Icon: Check,
                  tone: "text-primary",
                },
                {
                  label: t.whatItDoesNot,
                  items: c.limits.wont,
                  Icon: X,
                  tone: "text-muted",
                },
              ].map(({ label, items, Icon, tone }) => (
                <div key={label} className="reveal">
                  <h3 className="text-lg font-semibold text-ink">{label}</h3>
                  <ul className="mt-4 grid gap-3">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-3 text-body text-pretty text-muted"
                      >
                        <Icon
                          className={`mt-1 size-4.5 ${tone}`}
                          strokeWidth={2.5}
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-line">
        <div className="frame grid gap-12 py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-28">
          <h2 className="reveal text-title text-balance">
            {h(t.theOnesThatDecide)}
          </h2>
          <dl className="reveal border-t border-line">
            {c.faq.map((f) => (
              <div key={f.q} className="border-b border-line">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
                    <dt className="text-lg font-semibold text-ink">{f.q}</dt>
                    <span
                      aria-hidden
                      className="relative size-4 shrink-0 text-primary before:absolute before:top-1/2 before:left-0 before:h-0.5 before:w-4 before:-translate-y-1/2 before:bg-current after:absolute after:top-0 after:left-1/2 after:h-4 after:w-0.5 after:-translate-x-1/2 after:bg-current after:transition-transform group-open:after:scale-y-0"
                    />
                  </summary>
                  <dd className="max-w-[68ch] pb-6 text-body text-pretty text-muted">
                    {f.a}
                  </dd>
                </details>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <StoryCta c={c} title={h(c.cta.title)} />
    </>
  );
}

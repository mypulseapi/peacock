import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { ArrowRight, Eye, Lock, Tag } from "lucide-react";
import { Link } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import { PageSchema } from "@/components/PageSchema";
import {
  ResearchIndex,
  Status,
} from "@/components/designed/research/research-index";
import { research } from "@/content/pages/research";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = research(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: buildAlternates(locale, "/research"),
  };
}

/**
 * Research (owner's version 3, 27 Oct 2026): one finding led large with its figure, the rest as an
 * index that opens row by row, then how the research is run, the questions and the call to action.
 * The method follows the findings because its own words point back at "the nine listings above".
 *
 * Every word is the content module's (`content/pages/research.ts`, both locales); the only figure is
 * the featured finding's own numbers. Headings carry no label and no trailing full stop.
 */
const h = (s: string) => s.replace(/\.\s*$/, "");
const METHOD_ICONS = [Lock, Eye, Tag];
const BAR = ["bg-baseline", "bg-sky", "bg-primary"];

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  const c = research(locale);
  const lead = c.findings.find((f) => f.featured) ?? c.findings[0];
  const steps = lead.featured?.steps ?? [];
  const bits = lead.featured?.bits ?? [];
  return (
    <>
      <PageSchema
        locale={locale}
        path="/research"
        nodes={[
          {
            "@type": "FAQPage",
            mainEntity: c.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />
      <PageHero title={h(c.title)} lede={c.lede} titleClassName="text-hero" />

      <section className="border-b border-line">
        <div className="frame py-16 lg:py-24">
          <article className="reveal grid items-center gap-10 rounded-3xl border border-primary-line bg-card p-6 sm:p-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
            <div className="grid gap-4">
              <h2 className="text-title text-balance">{h(lead.title)}</h2>
              <p className="text-lg leading-relaxed text-pretty text-muted">
                {lead.body}
              </p>
              <dl className="grid gap-3 text-sm">
                <div>
                  <dt className="font-semibold text-ink">{c.labels.data}</dt>
                  <dd className="mt-0.5 text-muted">{lead.data}</dd>
                </div>
                <div className="missing-cell rounded-xl p-3.5">
                  <dt className="font-semibold">{c.labels.limit}</dt>
                  <dd className="mt-0.5 text-ink">{lead.limit}</dd>
                </div>
              </dl>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="text-sm font-semibold text-muted">
                  {lead.product}
                </span>
                <Status status={lead.status} label={c.labels[lead.status]} />
                <Link
                  locale={locale}
                  href={lead.href}
                  className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary hover:underline sm:ml-auto"
                >
                  {lead.link}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
            {steps.length > 0 && (
              <figure className="reveal m-0 rounded-2xl bg-primary-wash p-6 sm:p-8">
                {/* The shelf at each step, on one scale: what the shopper's needs leave, then what
                    the products' facts leave. The bars rise and the counts run when it comes in. */}
                <div
                  className="grid h-44 grid-cols-3 items-end gap-3"
                  aria-hidden
                >
                  {steps.map((n, i) => (
                    <div
                      key={n}
                      className="flex h-full flex-col items-center justify-end gap-2"
                    >
                      <span
                        data-count={n}
                        className="font-display text-xl font-semibold tabular-nums text-ink"
                      >
                        {n}
                      </span>
                      <span
                        className={`block w-full origin-bottom rounded-lg transition-[scale] duration-1000 ease-(--ease-emphasized) pre-shown:scale-y-0 ${BAR[i]}`}
                        style={{
                          height: `${Math.max(6, Math.round((n / steps[0]) * 128))}px`,
                          transitionDelay: `${i * 250}ms`,
                        }}
                      />
                    </div>
                  ))}
                </div>
                <figcaption className="mt-4 flex flex-wrap justify-between gap-2 text-sm">
                  {bits.map((b, i) => (
                    <span
                      key={b}
                      className={
                        i === bits.length - 1
                          ? "font-semibold text-ink"
                          : "text-muted"
                      }
                    >
                      {steps[i]} → {steps[i + 1]} · {b}
                    </span>
                  ))}
                </figcaption>
              </figure>
            )}
          </article>
        </div>
      </section>

      <section className="border-b border-line bg-card">
        <div className="frame py-16 lg:py-24">
          <ResearchIndex
            findings={c.findings.filter((f) => f !== lead)}
            labels={c.labels}
            heading={c.findingsHeading}
            locale={locale}
          />
        </div>
      </section>

      <section className="border-b border-line bg-surface-1">
        <div className="frame py-16 lg:py-24">
          <h2 className="reveal text-title text-balance">{c.method.heading}</h2>
          <ol className="reveal mt-10 grid overflow-hidden rounded-3xl border border-line bg-card md:grid-cols-3">
            {c.method.items.map((m, i) => {
              const Icon = METHOD_ICONS[i] ?? Lock;
              return (
                <li
                  key={m.title}
                  className="grid content-start gap-3 border-line p-6 not-first:border-t md:not-first:border-t-0 md:not-first:border-l"
                >
                  <span
                    className="grid size-11 place-items-center rounded-xl bg-primary-tint text-primary"
                    aria-hidden
                  >
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-ink">{m.title}</h3>
                  <p className="text-body text-pretty text-muted">{m.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="frame grid gap-10 py-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-24">
          <h2 className="reveal text-title text-balance">{c.faqHeading}</h2>
          <div className="reveal border-t border-line">
            {c.faq.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden
                    className="relative size-4 shrink-0 text-primary before:absolute before:top-1/2 before:left-0 before:h-0.5 before:w-4 before:-translate-y-1/2 before:bg-current after:absolute after:top-0 after:left-1/2 after:h-4 after:w-0.5 after:-translate-x-1/2 after:bg-current after:transition-transform group-open:after:scale-y-0"
                  />
                </summary>
                <p className="max-w-[68ch] pb-6 text-body text-pretty text-muted">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-dots" data-cta>
        <div className="frame py-24 text-center lg:py-32">
          <h2 className="reveal mx-auto max-w-3xl text-headline text-balance">
            {h(c.cta.title)}
          </h2>
          <p className="reveal mx-auto mt-6 max-w-xl text-lg text-pretty text-muted delay-100">
            {c.cta.body}
          </p>
          <div className="reveal mt-8 delay-200">
            <Link locale={locale} href={c.cta.href} className="btn-primary">
              {c.cta.label}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

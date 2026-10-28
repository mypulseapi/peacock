import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { Eye, Lock, Tag } from "lucide-react";
import { Link } from "@/i18n/routing";
import { PageSchema } from "@/components/PageSchema";
import { ResearchIndex } from "@/components/designed/research/research-index";
import { research } from "@/content/pages/research";
import { CtaBoxes } from "@/components/designed/cta-boxes";

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
 * Research: every finding as a card of one journal grid with its drawing (owner's pick of five
 * mockups, 28 Oct 2026; it replaced version 3's index of rows), then how the research is run, the
 * questions and the call to action. No finding is led large: the owner had the featured one put
 * back with the others (27 Oct 2026), and the grid's rows of two and three keep it so. The method
 * follows the findings because its own words point back at "the nine listings above".
 *
 * Every word is the content module's (`content/pages/research.ts`, both locales). Headings carry no
 * label and no trailing full stop.
 */
const h = (s: string) => s.replace(/\.\s*$/, "");
const METHOD_ICONS = [Lock, Eye, Tag];

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  const c = research(locale);
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
      {/* The designed hero, as on the use-case and sector pages: `PageHero` paints its own older
          canvas, which did not match them in the dark theme (owner, 27 Oct 2026). */}
      <section className="hero-bg overflow-hidden border-b border-line">
        <div className="frame pt-12 pb-20 lg:pt-16 lg:pb-28">
          <h1 className="reveal max-w-[20ch] text-hero text-balance">
            {h(c.title)}
          </h1>
          <p className="reveal mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted delay-100">
            {c.lede}
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-card">
        <div className="frame py-16 lg:py-24">
          <ResearchIndex
            findings={c.findings}
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

      <section className="cta-boxes">
        <CtaBoxes />
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

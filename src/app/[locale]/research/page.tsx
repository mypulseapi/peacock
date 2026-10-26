import type { Metadata } from "next";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import { PageSchema } from "@/components/PageSchema";
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
 * Research, product by product: each finding with its data and its limit, and a plain marker where
 * a product has not yet run on a real merchant. Its own layout because every card links on, which
 * the story template's items cannot. Content and sources: `content/pages/research.ts`.
 */
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
      <PageHero
        eyebrow={c.eyebrow}
        title={c.title}
        lede={c.lede}
        titleClassName="text-hero"
      />

      <section className="border-b border-line">
        <div className="frame py-16 lg:py-20">
          <h2 className="text-title text-balance">{c.findingsHeading}</h2>
          <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {c.findings.map((f) => (
              <li
                key={f.title}
                className="flex flex-col rounded-2xl border border-line bg-card p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="eyebrow-primary">{f.product}</p>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      f.status === "measured"
                        ? "bg-primary-tint text-primary"
                        : "border border-line text-muted"
                    }`}
                  >
                    {c.labels[f.status]}
                  </span>
                </div>
                <h3 className="mt-3 text-xl leading-snug font-bold text-balance text-ink">
                  {f.title}
                </h3>
                <p className="mt-3 text-body text-pretty text-muted">
                  {f.body}
                </p>
                <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
                  <div>
                    <dt className="inline font-semibold text-ink">
                      {c.labels.data}:{" "}
                    </dt>
                    <dd className="inline text-muted">{f.data}</dd>
                  </div>
                  <div>
                    <dt className="inline font-semibold text-ink">
                      {c.labels.limit}:{" "}
                    </dt>
                    <dd className="inline text-muted">{f.limit}</dd>
                  </div>
                </dl>
                <Link
                  locale={locale}
                  href={f.href}
                  className="mt-auto inline-flex min-h-11 items-center pt-4 text-sm font-semibold text-primary hover:underline"
                >
                  {f.link} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-line bg-surface-1/50">
        <div className="frame py-16 lg:py-20">
          <h2 className="text-title text-balance">{c.method.heading}</h2>
          <ol className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {c.method.items.map((m, i) => (
              <li
                key={m.title}
                className="rounded-2xl border border-line bg-card p-6"
              >
                <span className="font-mono text-sm text-primary">
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-lg font-bold text-ink">{m.title}</h3>
                <p className="mt-2 text-body text-pretty text-muted">
                  {m.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="frame max-w-3xl py-16 lg:py-20">
          <h2 className="text-title text-balance">{c.faqHeading}</h2>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {c.faq.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none font-semibold text-ink">
                  {f.q}
                </summary>
                <p className="mt-3 text-body text-pretty text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="frame py-16 text-center lg:py-20">
          <h2 className="mx-auto max-w-2xl text-title text-balance">
            {c.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-body text-pretty text-muted">
            {c.cta.body}
          </p>
          <Link
            locale={locale}
            href={c.cta.href}
            className="btn-primary mt-8 inline-flex"
          >
            {c.cta.label}
          </Link>
        </div>
      </section>
    </>
  );
}

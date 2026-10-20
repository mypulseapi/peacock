import type { Metadata } from "next";
import { PageSchema } from "@/components/PageSchema";
import { notFound, redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import { url } from "@/lib/site";
import { Link } from "@/i18n/routing";
import { ArrowLeft, ArrowRight, Clock, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/home/Section";
import { articleBySlug, articleSlugs, ARTICLES, type Block } from "@/content/blog";
import { BarChart, Dumbbell, Waffle, Trend, Figure } from "@/components/charts/Charts";
import { ArticleArt } from "@/components/ArticleArt";
import { sector } from "@/content/industries";
import { RETIRED_BLOG_SLUGS } from "@/data/blog-slugs";
import { forEachLocale } from "@/i18n/locales";

interface PageProps { params: Promise<{ slug: string; locale: string }> }

export function generateStaticParams() {
  return forEachLocale(articleSlugs.map((slug) => ({ slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const a = articleBySlug(slug);
  if (!a) return {};
  /*
   * The SERP forms, falling back to the headline and the excerpt. See the Article interface: a
   * headline and a title tag are different jobs, and shortening the headline to fit a SERP would
   * cost the reader to please the list.
   */
  const title = a.metaTitle ?? a.title;
  const description = a.metaDescription ?? a.excerpt;

  return {
    title,
    description,
    alternates: buildAlternates(locale, `/blog/${slug}`),
    // Article type and publish date are worth keeping. Safe to declare here
    // because this segment owns its own opengraph-image, so the override does
    // not drop an inherited one the way it did on every other route.
    openGraph: { type: "article", publishedTime: a.iso },
    // The generated card lives at ./opengraph-image; Next wires it into the
    // tags automatically, and naming it here would override it with a string.
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Renders one block. Kept dumb: the article file decides structure, not this. */
function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.t === "h") {
          return <h2 key={i} className="ed-d3 mt-16 text-[color:var(--ed-ink)]">{b.text}</h2>;
        }
        if (b.t === "ul") {
          return (
            <ul key={i} className="mt-7 space-y-3.5">
              {b.items.map((it) => (
                <li key={it} className="flex gap-3.5">
                  <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent-primary)]" aria-hidden />
                  <span className="ed-body flex-1">{it}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (b.t === "quote") {
          return (
            <blockquote key={i} className="mt-10 border-l-2 border-[color:var(--sig)] pl-6 text-[1.125rem] leading-relaxed font-medium text-[color:var(--ed-ink)]">
              {b.text}
            </blockquote>
          );
        }
        if (b.t === "stat") {
          // A figure gets its source next to it, never underneath the fold.
          return (
            <figure key={i} className="ed-raise mt-10 rounded-2xl border border-[color:var(--ed-line)] p-7">
              <span className="ed-num block text-[2.5rem] leading-none font-bold text-[color:var(--accent-primary)]">{b.value}</span>
              <figcaption className="mt-4">
                <span className="block text-[0.9375rem] leading-snug font-medium text-[color:var(--ed-ink)]">{b.label}</span>
                <cite className="mt-2 block text-[0.8125rem] not-italic text-[color:var(--ed-ink-3)]">{b.source}</cite>
              </figcaption>
            </figure>
          );
        }
        if (b.t === "bar") {
          return <BarChart key={i} title={b.title} source={b.source} note={b.note} data={b.data} max={b.max} suffix={b.suffix} />;
        }
        if (b.t === "dumbbell") {
          return <Dumbbell key={i} title={b.title} source={b.source} note={b.note} rows={b.rows} suffix={b.suffix} beforeLabel={b.beforeLabel} afterLabel={b.afterLabel} />;
        }
        if (b.t === "waffle") {
          return <Waffle key={i} title={b.title} source={b.source} note={b.note} percent={b.percent} label={b.label} rest={b.rest} tone={b.tone} />;
        }
        if (b.t === "trend") {
          return <Trend key={i} title={b.title} source={b.source} note={b.note} points={b.points} suffix={b.suffix} valueLabel={b.valueLabel} />;
        }
        if (b.t === "figure") {
          return <Figure key={i} value={b.value} unit={b.unit} label={b.label} source={b.source} tone={b.tone} />;
        }
        return <p key={i} className="ed-body mt-7">{b.text}</p>;
      })}
    </>
  );
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  // The five posts that published invented conversion figures. They were in the
  // sitemap, so they go to the index rather than 404.
  if (RETIRED_BLOG_SLUGS.includes(slug)) redirect(`/${locale}/blog`);

  const a = articleBySlug(slug);
  if (!a) notFound();

  const t = await getTranslations("blog");
  const s = a.sector ? sector(locale, a.sector) : undefined;
  const more = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);

  const jsonLd = {
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    datePublished: a.iso,
    image: [url(`/${locale}/blog/${slug}/opengraph-image`)],
    author: { "@type": "Organization", name: "Pulse" },
    publisher: { "@type": "Organization", name: "Pulse" },
    // Citations are part of the record: the claim is only as good as its source.
    citation: a.sources.map((src) => src.label),
  };

  return (
    <>
      <PageSchema locale={locale} path={`/blog/${slug}`} leaf={a.title} nodes={[jsonLd]} />

      <PageHero eyebrow={a.category} title={a.title} lede={a.excerpt}>
        <p className="flex flex-wrap items-center gap-4 text-[0.875rem] text-[color:var(--ed-ink-3)]">
          <time dateTime={a.iso} className="ed-num">{a.date}</time>
          <span className="ed-num inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {a.readTime}
          </span>
        </p>
      </PageHero>

      <Section>
        <div className="mx-auto max-w-[46rem]">
          <ArticleArt kind={a.art} />
        </div>
        <article className="mx-auto mt-14 max-w-[46rem]">
          <Blocks blocks={a.blocks} />

          <section className="ed-rule mt-16 pt-10">
            <h2 className="ed-eyebrow">{t("sources")}</h2>
            <ul className="mt-5 space-y-3">
              {a.sources.map((src) => (
                <li key={src.href}>
                  {src.href.startsWith("/") ? (
                    <Link href={src.href} className="inline-flex min-h-[24px] items-start gap-2 text-[0.9375rem] text-[color:var(--accent-primary)] underline underline-offset-4">
                      {src.label}
                    </Link>
                  ) : (
                    <a
                      href={src.href}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex min-h-[24px] items-start gap-2 text-[0.9375rem] text-[color:var(--accent-primary)] underline underline-offset-4"
                    >
                      {src.label}
                      <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {s && (
            <Link
              href={`/industries/${s.slug}`}
              className="group ed-raise mt-12 flex items-center gap-4 rounded-2xl border border-[color:var(--ed-line)] p-6 transition hover:border-[color:var(--brand-indigo)]"
            >
              <span className="min-w-0 flex-1">
                <span className="ed-eyebrow">{t("related")}</span>
                <span className="ed-d4 mt-2 block text-[color:var(--ed-ink)]">{s.name}</span>
                <span className="ed-body mt-1 block text-[0.875rem]">{s.summary}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-[color:var(--accent-primary)] transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          )}

          <Link href="/blog" className="mt-12 inline-flex min-h-[44px] items-center gap-2 text-[0.9375rem] font-semibold text-[color:var(--ed-ink-2)] transition hover:text-[color:var(--ed-ink)]">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {t("backToNotes")}
          </Link>
        </article>
      </Section>

      <Section tone="raise" className="border-t border-[color:var(--ed-line)]">
        <ul className="grid gap-6 md:grid-cols-3">
          {more.map((x) => {
            const Icon = x.icon;
            return (
              <li key={x.slug}>
                <Link href={`/blog/${x.slug}`} className="group ed-raise flex h-full flex-col rounded-2xl border border-[color:var(--ed-line)] p-6 transition hover:border-[color:var(--brand-indigo)]">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-[color:var(--brand-lav-100)]">
                    <Icon className="h-3.5 w-3.5" style={{ color: "var(--accent-primary)" }} aria-hidden />
                  </span>
                  <span className="ed-d4 mt-5 text-[color:var(--ed-ink)]">{x.title}</span>
                  <span className="ed-body mt-2 flex-1 text-[0.875rem]">{x.excerpt}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>
    </>
  );
}

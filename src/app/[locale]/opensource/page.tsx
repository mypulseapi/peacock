import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { img } from "@/lib/cdn";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import { PageSchema } from "@/components/PageSchema";
import {
  opensource,
  GITHUB,
  GITHUB_ISSUE,
  DOCS,
  opensourcePictureAlt,
  type Status,
} from "@/content/pages/opensource";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = opensource(locale);
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: buildAlternates(locale, "/opensource"),
  };
}

/**
 * One of the owner's generated pictures (28 Oct 2026): transparent 3 : 2 WebP on the Decision Audit's
 * picture panel (`how-glow` on `surface-1`), like the product pages', so it follows the theme.
 */
function Picture({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="how-glow aspect-3/2 overflow-hidden rounded-2xl border border-line bg-surface-1">
      <Image
        src={img(`opensource/${src}.webp`)}
        alt={alt}
        width={1000}
        height={667}
        sizes="(min-width: 1024px) 36rem, 100vw"
        className="size-full object-contain"
      />
    </div>
  );
}

/**
 * One band of the page: a heading, optional intro, and its body. Alternating tint is the caller's.
 * With a `picture`, the heading and intro sit beside it from `lg` and the body runs full width below.
 */
function Band({
  heading,
  intro,
  tint,
  picture,
  children,
}: {
  heading: string;
  intro?: string;
  tint?: boolean;
  picture?: ReactNode;
  children: ReactNode;
}) {
  const words = (
    <>
      <h2 className="max-w-3xl text-title text-balance">{heading}</h2>
      {intro ? (
        <p className="mt-4 max-w-2xl text-body text-pretty text-muted">
          {intro}
        </p>
      ) : null}
    </>
  );
  return (
    <section
      className={`border-b border-line ${tint ? "bg-surface-1/50" : ""}`}
    >
      <div className="frame py-16 lg:py-20">
        {picture ? (
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div>{words}</div>
            {picture}
          </div>
        ) : (
          words
        )}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

const card = "rounded-2xl border border-line bg-card p-6";

/**
 * Open Pulse. Its own layout rather than the story template: the brief has sixteen sections, a
 * status on every open item, a code sample and a chat exchange, none of which the template carries.
 * Content, sources and what is checked: `content/pages/opensource.ts`.
 */
export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  prepareLocale(locale);
  const c = opensource(locale);
  const alt = opensourcePictureAlt(locale);
  const badge = (s: Status) => (
    <span
      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        s === "available"
          ? "bg-primary-tint text-primary"
          : "border border-line text-muted"
      }`}
    >
      {c.status[s]}
    </span>
  );
  return (
    <>
      <PageSchema
        locale={locale}
        path="/opensource"
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
        title={c.hero.title}
        lede={c.hero.lede}
        titleClassName="text-hero"
        aside={<Picture src="hero-evidence-for-agents" alt={alt.hero} />}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={GITHUB}
            className="btn-primary inline-flex items-center gap-2"
          >
            <svg className="size-4" aria-hidden="true">
              <use href="#i-github" />
            </svg>
            {c.hero.primary}
          </a>
          <a href={DOCS} className="btn-secondary inline-flex">
            {c.hero.secondary}
          </a>
        </div>
        <p className="mt-5 max-w-2xl text-sm text-pretty text-muted">
          {c.hero.supporting}
        </p>
      </PageHero>

      <Band
        heading={c.why.heading}
        picture={
          <Picture src="why-product-data-vs-decision-data" alt={alt.why} />
        }
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className={card}>
            <p className="text-sm font-semibold text-muted">
              {c.why.knowsLabel}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {c.why.knows.map((k) => (
                <li
                  key={k}
                  className="rounded-lg border border-line px-3 py-1.5 text-sm text-muted"
                >
                  {k}
                </li>
              ))}
            </ul>
          </div>
          <div className={card}>
            <p className="text-sm font-semibold text-primary">
              {c.why.asksLabel}
            </p>
            <ul className="mt-4 space-y-2 text-body text-ink">
              {c.why.asks.map((a) => (
                <li key={a}>“{a}”</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 max-w-3xl text-body text-pretty text-muted">
          {c.why.close}
        </p>
      </Band>

      <Band
        heading={c.model.heading}
        tint
        picture={<Picture src="model-requirement-to-outcome" alt={alt.model} />}
      >
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {c.model.steps.map((s, i) => (
            <li key={s.name} className={card}>
              <span className="font-mono text-sm text-primary">0{i + 1}</span>
              <h3 className="mt-2 font-bold text-ink">{s.name}</h3>
              <p className="mt-1 text-sm text-pretty text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-3xl text-body text-pretty text-muted">
          {c.model.note}
        </p>
        <p className="mt-4 max-w-3xl text-body text-pretty text-ink">
          {c.model.research}{" "}
          <Link
            locale={locale}
            href="/research"
            className="font-semibold text-primary hover:underline"
          >
            {c.model.researchLink} →
          </Link>
        </p>
      </Band>

      <Band
        heading={c.agent.heading}
        intro={c.agent.intro}
        picture={<Picture src="agent-evidence-does-not-say" alt={alt.agent} />}
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className={`${card} space-y-4`}>
            <div>
              <p className="text-sm font-semibold text-muted">
                {c.agent.userLabel}
              </p>
              <p className="mt-1 text-body text-ink">{c.agent.user}</p>
            </div>
            <div className="rounded-xl bg-primary-tint p-4">
              <p className="text-sm font-semibold text-primary">
                {c.agent.agentLabel}
              </p>
              <p className="mt-1 text-body text-pretty text-ink">
                {c.agent.reply}
              </p>
            </div>
          </div>
          <div className={card}>
            <div className="flex items-center justify-between gap-2">
              <code className="font-mono text-sm text-ink">POST /decide</code>
              {badge("available")}
            </div>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-surface-1 p-4 font-mono text-xs leading-relaxed text-ink sm:text-sm">
              {c.agent.output}
            </pre>
            <p className="mt-4 text-sm text-pretty text-muted">
              {c.agent.caption}
            </p>
          </div>
        </div>
      </Band>

      <section className="border-b border-line bg-surface-1/50">
        <div className="frame grid grid-cols-1 gap-10 py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <h2 className="text-title text-balance">
              {c.honesty.abstainHeading}
            </h2>
            {c.honesty.abstainBody.map((p) => (
              <p key={p} className="mt-4 text-body text-pretty text-muted">
                {p}
              </p>
            ))}
            <div className="mt-8">
              <Picture src="honesty-present-never-invent" alt={alt.honesty} />
            </div>
          </div>
          <div>
            <h2 className="text-title text-balance">
              {c.honesty.factsHeading}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className={card}>
                <p className="text-sm font-semibold text-primary">
                  {c.honesty.canLabel}
                </p>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {c.honesty.can.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div className={card}>
                <p className="text-sm font-semibold text-muted">
                  {c.honesty.neverLabel}
                </p>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {c.honesty.never.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-6 font-semibold text-pretty text-ink">
              {c.honesty.rule}
            </p>
          </div>
        </div>
      </section>

      <Band
        heading={c.states.heading}
        intro={c.states.intro}
        picture={
          <Picture src="states-six-evidence-problems" alt={alt.states} />
        }
      >
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.states.items.map((s) => (
            <li key={s.name} className={card}>
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-ink">{s.name}</h3>
                {badge("planned")}
              </div>
              <p className="mt-2 text-sm text-pretty text-muted">{s.body}</p>
            </li>
          ))}
        </ul>
      </Band>

      <Band heading={c.repairs.heading} intro={c.repairs.intro} tint>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {c.repairs.items.map((r) => (
            <li
              key={r.name}
              className="rounded-xl border border-line bg-card p-4"
            >
              <p className="font-mono text-sm font-semibold tracking-wide text-primary uppercase">
                {r.name}
              </p>
              <p className="mt-1 text-sm text-pretty text-muted">{r.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-3xl text-body text-pretty text-muted">
          {c.repairs.close}
        </p>
      </Band>

      <Band
        heading={c.boundary.heading}
        picture={<Picture src="boundary-open-and-paid" alt={alt.boundary} />}
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className={card}>
            <p className="text-sm font-semibold text-primary">
              {c.boundary.openLabel}
            </p>
            <ul className="mt-3">
              {c.boundary.open.map((o) => (
                <li
                  key={o.name}
                  className="flex items-start justify-between gap-3 border-t border-line py-3 text-sm text-ink first:border-t-0"
                >
                  <span>{o.name}</span>
                  {badge(o.status)}
                </li>
              ))}
            </ul>
          </div>
          <div className={card}>
            <p className="text-sm font-semibold text-muted">
              {c.boundary.paidLabel}
            </p>
            <ul className="mt-3">
              {c.boundary.paid.map((p) => (
                <li
                  key={p}
                  className="border-t border-line py-3 text-sm text-ink first:border-t-0"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 text-lg font-semibold text-pretty text-ink">
          {c.boundary.pull}
        </p>
      </Band>

      <Band heading={c.packs.heading} intro={c.packs.intro} tint>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className={card}>
            <div className="flex items-center justify-between gap-2">
              <code className="font-mono text-sm text-ink">
                category-pack.yaml
              </code>
              {badge("illustrative")}
            </div>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-surface-1 p-4 font-mono text-xs leading-relaxed text-ink sm:text-sm">
              {c.packs.example}
            </pre>
          </div>
          <div className={card}>
            <p className="text-sm font-semibold text-muted">
              {c.packs.questionsLabel}
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-body text-pretty text-muted">
              {c.packs.questions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>
          </div>
        </div>
      </Band>

      <Band
        heading={c.contribute.heading}
        intro={c.contribute.intro}
        picture={
          <Picture
            src="contribute-agent-proposes-people-review"
            alt={alt.contribute}
          />
        }
      >
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.contribute.ways.map((w) => (
            <li key={w.name} className={card}>
              <h3 className="font-bold text-ink">{w.name}</h3>
              <p className="mt-1 text-sm text-pretty text-muted">{w.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold text-ink">
              {c.contribute.expertsHeading}
            </h3>
            <p className="mt-3 text-body text-pretty text-muted">
              {c.contribute.expertsBody}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-ink">
              {c.contribute.agentsHeading}
            </h3>
            <p className="mt-3 text-body text-pretty text-muted">
              {c.contribute.agentsBody}
            </p>
            <ol className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              {c.contribute.loop.map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="rounded-lg border border-line bg-card px-3 py-1.5 text-ink">
                    {s}
                  </span>
                  {i < c.contribute.loop.length - 1 ? (
                    <span aria-hidden="true" className="text-muted">
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <p className="mt-8 max-w-3xl text-sm text-pretty text-muted">
          {c.contribute.terms}
        </p>
      </Band>

      <Band heading={c.audiences.heading} tint>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.audiences.items.map((a) => (
            <li key={a.name} className={card}>
              <h3 className="font-bold text-ink">{a.name}</h3>
              <p className="mt-1 text-sm text-pretty text-muted">{a.body}</p>
            </li>
          ))}
        </ul>
      </Band>

      <section className="border-b border-line">
        <div className="frame grid grid-cols-1 gap-10 py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <h2 className="text-title text-balance">{c.not.heading}</h2>
            <ul className="mt-6 space-y-3 text-body text-muted">
              {c.not.items.map((n) => (
                <li key={n} className="flex gap-3">
                  <span aria-hidden="true" className="text-muted">
                    ✕
                  </span>
                  {n}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-semibold text-pretty text-ink">
              {c.not.close}
            </p>
          </div>
          <div>
            <h2 className="text-title text-balance">{c.principles.heading}</h2>
            <ol className="mt-6 space-y-4">
              {c.principles.items.map((p, i) => (
                <li key={p.name} className="flex gap-4">
                  <span className="font-mono text-sm text-primary">
                    0{i + 1}
                  </span>
                  <span>
                    <span className="font-semibold text-ink">{p.name}. </span>
                    <span className="text-muted">{p.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface-1/50">
        <div className="frame max-w-3xl py-16 lg:py-20">
          <h2 className="text-title text-balance">{c.faqHeading}</h2>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {c.faq.map((f) => (
              <details key={f.q} className="py-4">
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
          <p className="mx-auto mt-4 max-w-2xl text-body text-pretty text-muted">
            {c.cta.body}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={GITHUB}
              className="btn-primary inline-flex items-center gap-2"
            >
              <svg className="size-4" aria-hidden="true">
                <use href="#i-github" />
              </svg>
              {c.cta.github}
            </a>
            <a href={GITHUB_ISSUE} className="btn-secondary inline-flex">
              {c.cta.contribute}
            </a>
            <Link
              locale={locale}
              href="/contact"
              className="btn-secondary inline-flex"
            >
              {c.cta.audit}
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted">{c.cta.supporting}</p>
        </div>
      </section>
    </>
  );
}

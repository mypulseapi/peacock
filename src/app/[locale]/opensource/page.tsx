import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { img } from "@/lib/cdn";
import { prepareLocale } from "@/i18n/render-locale";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/routing";
import { PageSchema } from "@/components/PageSchema";
import { HeroAurora } from "@/components/designed/hero-aurora";
import { CtaBoxes } from "@/components/designed/cta-boxes";
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
    <div className="reveal how-glow aspect-3/2 overflow-hidden rounded-2xl border border-line bg-surface-1 delay-200">
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
 * With a `picture`, the heading and intro sit beside it from `lg` and the body runs full width below:
 * the owner's zigzag (option A of five, 28 Oct 2026), `flip` putting the picture on the left so the
 * sides alternate down the page. On a phone the picture always follows the heading.
 */
function Band({
  heading,
  intro,
  tint,
  picture,
  flip,
  children,
}: {
  heading: string;
  intro?: string;
  tint?: boolean;
  picture?: ReactNode;
  flip?: boolean;
  children: ReactNode;
}) {
  const words = (
    <>
      <h2 className="reveal max-w-3xl text-title text-balance">{heading}</h2>
      {intro ? (
        <p
          className="reveal mt-4 max-w-2xl text-body text-pretty text-muted"
          style={stagger(1)}
        >
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
            <div className={flip ? "lg:order-first" : ""}>{picture}</div>
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
 * Each heading, paragraph, card and list item fades up on its own (owner, 29 Oct 2026, as on the
 * product pages), the n-th a little after the one before. Capped, so a long list does not keep a
 * visitor waiting: the rest of it reveals as it scrolls in.
 */
const stagger = (i: number): CSSProperties => ({
  transitionDelay: `${Math.min(i, 5) * 90}ms`,
});

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
      {/* The designed pages' hero (`hero-bg`, one screen tall like home's and the product pages'), not `PageHero`,
          whose older canvas did not match them in the dark theme. Words left, picture right. */}
      <section className="relative isolate hero-bg hero-screen flex items-center overflow-hidden border-b border-line">
        <HeroAurora />
        <div className="frame grid flex-1 items-center gap-12 pt-12 pb-20 lg:grid-cols-2 lg:gap-16 lg:pt-16 lg:pb-24">
          <div>
            <h1 className="reveal max-w-[20ch] text-hero text-balance">
              {c.hero.title}
            </h1>
            <p className="reveal mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted delay-100">
              {c.hero.lede}
            </p>
            <div className="reveal mt-8 flex flex-wrap gap-3 delay-200">
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
            <p className="reveal mt-5 max-w-2xl text-sm text-pretty text-muted delay-300">
              {c.hero.supporting}
            </p>
          </div>
          <Picture src="hero-evidence-for-agents" alt={alt.hero} />
        </div>
      </section>

      <Band
        heading={c.why.heading}
        picture={
          <Picture src="why-product-data-vs-decision-data" alt={alt.why} />
        }
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className={`reveal ${card}`}>
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
          <div className={`reveal ${card}`} style={stagger(1)}>
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
        <p className="reveal mt-8 max-w-3xl text-body text-pretty text-muted">
          {c.why.close}
        </p>
      </Band>

      <Band
        heading={c.model.heading}
        tint
        flip
        picture={<Picture src="model-requirement-to-outcome" alt={alt.model} />}
      >
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {c.model.steps.map((s, i) => (
            <li key={s.name} className={`reveal ${card}`} style={stagger(i)}>
              <span className="font-mono text-sm text-primary">0{i + 1}</span>
              <h3 className="mt-2 font-bold text-ink">{s.name}</h3>
              <p className="mt-1 text-sm text-pretty text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="reveal mt-8 max-w-3xl text-body text-pretty text-muted">
          {c.model.note}
        </p>
        <p className="reveal mt-4 max-w-3xl text-body text-pretty text-ink">
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
          <div className={`reveal ${card} space-y-4`}>
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
          <div className={`reveal ${card}`} style={stagger(1)}>
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

      <Band heading={c.honesty.abstainHeading} tint>
        <div className="max-w-3xl space-y-4">
          {c.honesty.abstainBody.map((p, i) => (
            <p
              key={p}
              className="reveal text-body text-pretty text-muted"
              style={stagger(i)}
            >
              {p}
            </p>
          ))}
        </div>
      </Band>

      <Band
        heading={c.honesty.factsHeading}
        flip
        picture={
          <Picture src="honesty-present-never-invent" alt={alt.honesty} />
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className={`reveal ${card}`}>
            <p className="text-sm font-semibold text-primary">
              {c.honesty.canLabel}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {c.honesty.can.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className={`reveal ${card}`} style={stagger(1)}>
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
        <p className="reveal mt-6 font-semibold text-pretty text-ink">
          {c.honesty.rule}
        </p>
      </Band>

      <Band
        heading={c.states.heading}
        tint
        intro={c.states.intro}
        picture={
          <Picture src="states-six-evidence-problems" alt={alt.states} />
        }
      >
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.states.items.map((s, i) => (
            <li key={s.name} className={`reveal ${card}`} style={stagger(i)}>
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-ink">{s.name}</h3>
                {badge("planned")}
              </div>
              <p className="mt-2 text-sm text-pretty text-muted">{s.body}</p>
            </li>
          ))}
        </ul>
      </Band>

      <Band heading={c.repairs.heading} intro={c.repairs.intro}>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {c.repairs.items.map((r, i) => (
            <li
              key={r.name}
              className="reveal rounded-xl border border-line bg-card p-4"
              style={stagger(i)}
            >
              <p className="font-mono text-sm font-semibold tracking-wide text-primary uppercase">
                {r.name}
              </p>
              <p className="mt-1 text-sm text-pretty text-muted">{r.body}</p>
            </li>
          ))}
        </ul>
        <p className="reveal mt-8 max-w-3xl text-body text-pretty text-muted">
          {c.repairs.close}
        </p>
      </Band>

      <Band
        heading={c.boundary.heading}
        tint
        flip
        picture={<Picture src="boundary-open-and-paid" alt={alt.boundary} />}
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className={`reveal ${card}`}>
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
          <div className={`reveal ${card}`} style={stagger(1)}>
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
        <p className="reveal mt-8 text-lg font-semibold text-pretty text-ink">
          {c.boundary.pull}
        </p>
      </Band>

      <Band heading={c.packs.heading} intro={c.packs.intro}>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className={`reveal ${card}`}>
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
          <div className={`reveal ${card}`} style={stagger(1)}>
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
        tint
        intro={c.contribute.intro}
        picture={
          <Picture
            src="contribute-agent-proposes-people-review"
            alt={alt.contribute}
          />
        }
      >
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.contribute.ways.map((w, i) => (
            <li key={w.name} className={`reveal ${card}`} style={stagger(i)}>
              <h3 className="font-bold text-ink">{w.name}</h3>
              <p className="mt-1 text-sm text-pretty text-muted">{w.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="reveal">
            <h3 className="text-xl font-bold text-ink">
              {c.contribute.expertsHeading}
            </h3>
            <p className="mt-3 text-body text-pretty text-muted">
              {c.contribute.expertsBody}
            </p>
          </div>
          <div className="reveal" style={stagger(1)}>
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
        <p className="reveal mt-8 max-w-3xl text-sm text-pretty text-muted">
          {c.contribute.terms}
        </p>
      </Band>

      <Band heading={c.audiences.heading}>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.audiences.items.map((a, i) => (
            <li key={a.name} className={`reveal ${card}`} style={stagger(i)}>
              <h3 className="font-bold text-ink">{a.name}</h3>
              <p className="mt-1 text-sm text-pretty text-muted">{a.body}</p>
            </li>
          ))}
        </ul>
      </Band>

      <Band heading={c.not.heading} tint>
        <ul className="max-w-3xl space-y-3 text-body text-muted">
          {c.not.items.map((n, i) => (
            <li key={n} className="reveal flex gap-3" style={stagger(i)}>
              <span aria-hidden="true" className="text-muted">
                ✕
              </span>
              {n}
            </li>
          ))}
        </ul>
        <p className="reveal mt-6 font-semibold text-pretty text-ink">
          {c.not.close}
        </p>
      </Band>

      <Band heading={c.principles.heading}>
        <ol className="max-w-3xl space-y-4">
          {c.principles.items.map((p, i) => (
            <li key={p.name} className="reveal flex gap-4" style={stagger(i)}>
              <span className="font-mono text-sm text-primary">0{i + 1}</span>
              <span>
                <span className="font-semibold text-ink">{p.name}. </span>
                <span className="text-muted">{p.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </Band>

      <section className="border-b border-line bg-surface-1/50">
        <div className="frame max-w-3xl py-16 lg:py-20">
          <h2 className="reveal text-title text-balance">{c.faqHeading}</h2>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {c.faq.map((f, i) => (
              <details key={f.q} className="reveal py-4" style={stagger(i)}>
                <summary className="cursor-pointer list-none font-semibold text-ink">
                  {f.q}
                </summary>
                <p className="mt-3 text-body text-pretty text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-boxes">
        <CtaBoxes />
        <div className="frame py-16 text-center lg:py-20">
          <h2 className="reveal mx-auto max-w-2xl text-title text-balance">
            {c.cta.title}
          </h2>
          <p className="reveal mx-auto mt-4 max-w-2xl text-body text-pretty text-muted delay-100">
            {c.cta.body}
          </p>
          <div className="reveal mt-8 flex flex-wrap justify-center gap-3 delay-200">
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
          <p className="reveal mt-6 text-sm text-muted delay-300">
            {c.cta.supporting}
          </p>
        </div>
      </section>
    </>
  );
}

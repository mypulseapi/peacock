import { Section, SectionHead } from "./Section";
import { PROOF, showProof } from "@/content/proof";

/**
 * The proof shelf: customer band, stats, case studies, quotations.
 *
 * Designed against placeholder content so the layout can be judged with realistic
 * copy in it. Every component below returns null unless the placeholder gate is
 * explicitly opened, so nothing here can reach a build by being forgotten about.
 * See src/content/proof.ts for the gate and why it exists.
 */
export function ProofSection() {
  if (!showProof()) return null;

  return (
    <>
      <PlaceholderRibbon />
      <CustomerBand />
      <CaseStudies />
      <Quotes />
    </>
  );
}

/** Impossible to mistake this for shipped content while reviewing. */
function PlaceholderRibbon() {
  return (
    <div className="border-y border-[color:var(--brand-coral-solid)]/30 bg-[color:var(--brand-blush-50)]">
      <p className="mx-auto max-w-shell px-5 py-3 text-center text-[0.8125rem] font-semibold text-[color:var(--brand-coral-ink)] sm:px-6">
        Design preview. Every company, quotation and figure below is invented, and Pulse has no
        customers yet. Hidden from all builds unless NEXT_PUBLIC_SHOW_PLACEHOLDER_PROOF=1.
      </p>
    </div>
  );
}

function CustomerBand() {
  return (
    <section className="ed-raise border-b border-[color:var(--ed-line)]">
      <div className="mx-auto max-w-shell px-5 py-14 sm:px-6">
        <p className="text-center text-[0.9375rem] text-[color:var(--ed-ink-3)]">{PROOF.band.line}</p>
        {/* Set as type rather than imitation logos: a wordmark grid reads as a
            customer list without pretending to be anyone's actual identity. */}
        <ul className="mt-9 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
          {PROOF.customers.map((c) => (
            <li
              key={c}
              className="text-center text-[0.9375rem] font-semibold tracking-tight text-[color:var(--ed-ink-2)]"
            >
              {c}
            </li>
          ))}
        </ul>
        <dl className="ed-rule mt-14 grid gap-8 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {PROOF.stats.map((s) => (
            <div key={s.label}>
              <dt className="ed-num ed-d3 text-[color:var(--brand-indigo)]">{s.value}</dt>
              <dd className="mt-1.5 text-[0.9375rem] leading-snug font-medium text-[color:var(--ed-ink)]">
                {s.label}
                <span className="mt-1 block text-[0.8125rem] font-normal text-[color:var(--ed-ink-3)]">{s.sub}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function CaseStudies() {
  return (
    <Section>
      <SectionHead
        eyebrow="Customer stories"
        title="What the audit found, and what they did about it."
      />
      <div className="mt-16 grid gap-7 lg:grid-cols-3">
        {PROOF.cases.map((c) => (
          <article
            key={c.company}
            className="ed-raise flex h-full flex-col rounded-2xl border border-[color:var(--ed-line)] p-7"
          >
            <p className="ed-eyebrow">{c.sector}</p>
            <h3 className="ed-d4 mt-4 text-[color:var(--ed-ink)]">{c.headline}</h3>
            <p className="ed-body mt-4 flex-1">{c.body}</p>
            <p className="ed-rule mt-7 pt-6">
              <span className="ed-num ed-d3 block text-[color:var(--brand-indigo)]">{c.metric.value}</span>
              <span className="mt-2 block text-[0.8125rem] leading-relaxed text-[color:var(--ed-ink-3)]">
                {c.metric.label}
              </span>
            </p>
            <p className="mt-6 text-[0.875rem] font-semibold text-[color:var(--ed-ink-2)]">{c.company}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Quotes() {
  return (
    <Section tone="raise" className="border-y border-[color:var(--ed-line)]">
      <ul className="grid gap-7 lg:grid-cols-3">
        {PROOF.quotes.map((q) => (
          <li key={q.company}>
            <figure className="ed-canvas flex h-full flex-col rounded-2xl border border-[color:var(--ed-line)] p-7">
              <blockquote className="flex-1 text-[1.0625rem] leading-[1.7] text-[color:var(--ed-ink)]">
                {q.quote}
              </blockquote>
              <figcaption className="ed-rule mt-7 pt-5 text-[0.875rem]">
                <span className="block font-semibold text-[color:var(--ed-ink)]">{q.name}</span>
                <span className="mt-0.5 block text-[color:var(--ed-ink-3)]">{q.company}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}

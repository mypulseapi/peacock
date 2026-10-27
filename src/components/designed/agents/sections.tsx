import { Fragment } from "react";
import type { AgentContent } from "@/content/pages/agents";
import { AgentDemo, VerdictRows } from "./demo";

/**
 * The two sections that set the agent pages apart from the product pages (owner, 27 Oct 2026: H1 and
 * G5 of the section mockup). Both show the call itself rather than pictures of it, from the page's
 * own example, so neither waits for an image.
 */
const h = (s: string) => s.replace(/\.\s*$/, "");

const Arrow = () => (
  <svg
    viewBox="0 0 24 24"
    className="size-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14m-6-6 6 6-6 6" />
  </svg>
);

/**
 * How it works as one call's pipeline: three stations, left to right, each with a preview of what
 * passes through it. The words become requirements, the options go in, the verdicts come out.
 */
export function AgentPipeline({ c }: { c: AgentContent }) {
  const { sample, labels } = c;
  const previews = [
    <div key="ask" className="rounded-xl border border-line bg-card px-4 py-3">
      <p className="text-sm text-muted">{labels.plainWords}</p>
      <p className="mt-1 font-medium text-pretty text-ink">“{sample.ask}”</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {sample.requirements.map((r) => (
          <span
            key={r}
            className="rounded-lg border border-primary-line bg-primary-tint px-2.5 py-1 font-mono text-sm text-primary-hover"
          >
            {r}
          </span>
        ))}
      </div>
    </div>,
    <div key="send">
      <ul className="grid gap-2">
        {sample.options.map((o) => (
          <li
            key={o.name}
            className="rounded-xl border border-line bg-card px-4 py-3 font-medium text-ink"
          >
            {o.name}
          </li>
        ))}
      </ul>
      <p className="mt-2 px-1 text-sm text-muted">{labels.upTo}</p>
    </div>,
    <VerdictRows
      key="answer"
      options={sample.options}
      verdicts={labels.verdicts}
      boxed
    />,
  ];
  return (
    <section className="scroll-mt-16 border-b border-line bg-primary-wash">
      <div className="frame py-20 lg:py-28">
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2 className="text-title text-balance">{h(c.steps.heading)}</h2>
          {c.steps.intro && (
            <p className="mt-4 text-lg text-pretty text-muted">
              {c.steps.intro}
            </p>
          )}
        </div>
        <ol className="mt-14 grid gap-4 lg:mt-16 lg:grid-cols-3 lg:gap-10">
          {c.steps.items.map((s, i) => (
            <Fragment key={s.title}>
              <li className="reveal relative flex flex-col gap-5 rounded-3xl border border-line bg-card p-6">
                {i > 0 && (
                  <span className="absolute top-1/2 -left-8 hidden -translate-y-1/2 text-primary lg:block">
                    <Arrow />
                  </span>
                )}
                <span className="badge-primary self-start">
                  {s.n} · {s.meta}
                </span>
                <div className="rounded-2xl bg-primary-wash p-4">
                  {previews[i]}
                </div>
                <h3 className="text-h3 text-balance text-ink">{s.title}</h3>
                <p className="text-body text-pretty text-muted">{s.body}</p>
              </li>
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * What the agent gets: the worked example large on one side, as the thing to look at, and the other
 * gains as a quiet list with their icons on the other.
 */
export function AgentGets({ c }: { c: AgentContent }) {
  const items = c.gets.items;
  const example = items[items.length - 1];
  const d = c.demo;
  return (
    <section className="scroll-mt-16 border-b border-line">
      <div className="frame py-20 lg:py-28">
        <h2 className="reveal text-title text-balance">{h(c.gets.heading)}</h2>
        <div className="mt-12 grid items-start gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-16">
          <div className="reveal rounded-3xl border border-primary-line bg-primary-wash p-6 sm:p-8">
            <p className="text-sm text-muted">{example.title}</p>
            {"ask" in d ? (
              <>
                <p className="mt-2 text-h3 text-pretty text-ink">“{d.ask}”</p>
                <div className="mt-6">
                  <VerdictRows
                    options={d.options}
                    verdicts={c.labels.verdicts}
                    boxed
                  />
                </div>
              </>
            ) : (
              <div className="mt-4">
                <AgentDemo c={c} />
              </div>
            )}
          </div>
          <ul className="reveal delay-100">
            {items.slice(0, -1).map((g) => {
              const Icon = g.icon;
              return (
                <li
                  key={g.title}
                  className="flex gap-4 border-t border-line py-5 first:border-t-0 first:pt-0"
                >
                  {Icon && (
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-tint text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                  )}
                  <span>
                    <span className="block text-h3 text-ink">{g.title}</span>
                    <span className="mt-1 block text-body text-pretty text-muted">
                      {g.body}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

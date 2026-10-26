/**
 * Return Verification and Promotion Audit (owner's mockup, 26 Oct 2026): the hero of version A and
 * the sections of version C.
 *
 * The hero is the one the designed product pages use: the headline centred at the home hero's size,
 * and under it a figure composed like theirs (`chapter-hero.tsx`). Below it the page reads as chapters,
 * picture beside text, alternating; the steps on a zig-zag with their numbers large; the gains on the
 * home research section's hairline grid; the limits on a well. Each section is a plain tone step from
 * its neighbours (owner, 20 Oct 2026: no dark band, no pattern).
 *
 * The copy is the story template's, unchanged, from the page's content module, so the FAQ schema
 * still reads the same source. Headings carry no label and no trailing full stop (owner, 19 and 26 Oct
 * 2026). The `chainBlock`, written for both pages but never shown by the template because neither
 * had a scene for it, is a chapter here.
 */
import type { ReactNode } from "react";
import { renderLocale } from "@/i18n/render-locale";
import { ui } from "@/content/locale";
import { StoryCta, type StoryContent } from "@/components/StoryPage";

export type ChapterContent = StoryContent &
  Required<Pick<StoryContent, "situation" | "gets" | "limits" | "chainBlock">>;

const h = (s: string) => s.replace(/\.\s*$/, "");

/** The wash box every drawing sits in, so the pictures share one shape. */
const Picture = ({
  children,
  className = "bg-primary-wash",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`grid aspect-3/2 place-items-center overflow-hidden rounded-2xl ${className}`}
  >
    {children}
  </div>
);

const Mark = ({ ok }: { ok: boolean }) => (
  <svg
    className={`mt-1 size-4.5 shrink-0 ${ok ? "text-primary" : "text-muted"}`}
    aria-hidden="true"
  >
    <use href={ok ? "#i-check" : "#i-x"} />
  </svg>
);

export function ChapterPage({
  c,
  figure,
  chain,
  art,
}: {
  c: ChapterContent;
  /** The hero figure (`chapter-hero.tsx`): the product's screen, its gains and its steps. */
  figure: ReactNode;
  /** The chart beside the chain chapter. */
  chain: ReactNode;
  art: { situation: ReactNode; steps: ReactNode[] };
}) {
  const t = ui(renderLocale());
  const divide = ["", "lg:border-l", "", "lg:border-l", "lg:border-l"];
  return (
    <>
      <section className="border-b border-line">
        <div className="frame pt-12 pb-20 lg:pt-16 lg:pb-28">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="reveal text-hero text-balance">{h(c.title)}</h1>
            <p className="reveal mx-auto mt-6 max-w-2xl text-lg text-pretty text-muted delay-100">
              {c.lede}
            </p>
          </div>
          <div className="reveal mt-10 delay-200 lg:mt-14">{figure}</div>
        </div>
      </section>

      <section className="border-b border-line bg-card">
        <div className="frame grid items-center gap-10 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div className="reveal">
            <Picture>{art.situation}</Picture>
          </div>
          <div className="reveal delay-100">
            <h2 className="text-title text-balance">
              {h(c.situation.heading)}
            </h2>
            <div className="mt-6 grid gap-4">
              {c.situation.body.map((p) => (
                <p
                  key={p.slice(0, 28)}
                  className="text-body text-pretty text-muted"
                >
                  {p}
                </p>
              ))}
            </div>
            {c.situation.pull && (
              <p className="mt-8 font-title text-xl font-semibold text-balance text-ink">
                {c.situation.pull}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="frame grid items-center gap-10 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div className="reveal">
            <h2 className="text-title text-balance">
              {h(c.chainBlock.heading)}
            </h2>
            {c.chainBlock.body && (
              <p className="mt-6 text-lg text-pretty text-muted">
                {c.chainBlock.body}
              </p>
            )}
          </div>
          <div className="reveal rounded-2xl border border-line bg-card shadow-sm delay-100">
            {chain}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-primary-wash">
        <div className="frame py-20 lg:py-28">
          <div className="reveal mx-auto max-w-3xl text-center">
            <h2 className="text-title text-balance">{h(c.steps.heading)}</h2>
            {c.steps.intro && (
              <p className="mt-4 text-lg text-pretty text-muted">
                {c.steps.intro}
              </p>
            )}
          </div>
          <ol className="mt-14 grid gap-14 lg:mt-20 lg:gap-20">
            {c.steps.items.map((s, i) => (
              <li
                key={s.n}
                className="reveal grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                {/* The picture leads on a phone; only the desktop row mirrors. */}
                <Picture
                  className={`border border-line bg-card ${i % 2 ? "" : "lg:order-last"}`}
                >
                  {art.steps[i]}
                </Picture>
                <div>
                  <p className="flex items-baseline gap-4">
                    <span className="font-title text-display text-primary">
                      {s.n}
                    </span>
                    {s.meta && <span className="badge-primary">{s.meta}</span>}
                  </p>
                  <h3 className="mt-4 text-h2 text-balance text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-body text-pretty text-muted">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-line bg-card">
        <div className="frame py-20 lg:py-28">
          <h2 className="reveal text-title text-balance">
            {h(c.gets.heading)}
          </h2>
          {/* Two across, then three, so five items fill their rows with no orphan. */}
          <div className="mt-12 grid border-t border-line lg:mt-16 lg:grid-cols-6">
            {c.gets.items.map(({ icon: GetIcon, title, body }, i) => (
              <div
                key={title}
                className={`reveal grid content-start gap-3 border-b border-line py-8 lg:px-8 lg:py-10 ${i < 2 ? "lg:col-span-3" : "lg:col-span-2"} ${i === 0 || i === 2 ? "lg:pl-0" : ""} ${divide[i]}`}
              >
                <span className="grid size-10 place-items-center rounded-xl bg-primary-tint text-primary">
                  <GetIcon aria-hidden className="size-5" />
                </span>
                <h3 className="mt-1 text-h3 text-balance text-ink">{title}</h3>
                <p className="text-body text-pretty text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface-1">
        <div className="frame py-20 lg:py-28">
          <h2 className="reveal text-title text-balance">
            {h(c.limits.heading)}
          </h2>
          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-16">
            {(
              [
                [t.whatThisDoes, c.limits.will, true],
                [t.whatItDoesNot, c.limits.wont, false],
              ] as const
            ).map(([label, items, ok]) => (
              <div key={label} className="reveal">
                <h3 className="text-h3 text-ink">{label}</h3>
                <ul className="mt-4">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 border-b border-line py-4 last:border-b-0"
                    >
                      <Mark ok={ok} />
                      <span
                        className={`text-body text-pretty ${ok ? "text-ink" : "text-muted"}`}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="frame grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
          <h2 className="reveal text-title text-balance lg:col-span-4">
            {h(t.theOnesThatDecide)}
          </h2>
          <div className="reveal border-t border-line lg:col-span-8">
            {c.faq.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-h3 text-ink transition-colors duration-200 ease-out-soft group-open:text-primary hover:text-primary">
                  {f.q}
                  <svg
                    className="size-5 shrink-0 text-primary transition-transform duration-200 ease-out-soft group-open:rotate-180"
                    aria-hidden="true"
                  >
                    <use href="#i-chevron-down" />
                  </svg>
                </summary>
                <p className="pb-6 text-body text-pretty text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <StoryCta c={c} title={h(c.cta.title)} />
    </>
  );
}

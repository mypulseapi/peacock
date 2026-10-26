/**
 * Return Verification and Promotion Audit (owner's mockup, 26 Oct 2026): the hero of version A and
 * the sections of version C.
 *
 * The hero is the one the designed product pages use: the headline centred at the home hero's size,
 * a call to action, and the owner's figure under it from the CDN. Below it the page reads as chapters,
 * picture beside text, alternating; the steps on the shared zig-zag (`steps-zigzag.tsx`); the gains as the
 * older product pages' picture cards; the limits on a well. Each section is a plain tone step from
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
import Image from "next/image";
import { img } from "@/lib/cdn";
import { Link } from "@/i18n/routing";
import { StoryCta, type StoryContent } from "@/components/StoryPage";
import { GainsCards, type GainsArt } from "./gains";
import { StepsZigzag } from "./steps-zigzag";

export type ChapterContent = StoryContent &
  Required<
    Pick<StoryContent, "situation" | "gets" | "limits" | "chainBlock">
  > & {
    /**
     * The hero figure, on the CDN like the other product heroes; the alt text localises. A page whose
     * image is not made yet passes `figure` to `ChapterPage` instead.
     */
    heroImage?: { src: string; alt: string; width: number; height: number };
  };

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
  chain,
  art,
  gains,
  gainPictures,
  figure,
  output,
}: {
  c: ChapterContent;
  /** The chart beside the chain chapter. */
  chain: ReactNode;
  /** `situationIsPanel`: the situation picture is a data panel, so it sizes to its content instead of a 3:2 frame. */
  art: { situation: ReactNode; steps: ReactNode[]; situationIsPanel?: boolean };
  /** One drawing per gain, in order (`gains.tsx`); or `gainPictures`, any picture per gain. */
  gains?: GainsArt[];
  gainPictures?: ReactNode[];
  /** The hero figure while `c.heroImage` does not exist yet. */
  figure?: ReactNode;
  /**
   * The product's own output, under `c.visualHeading` and `c.visualBody` (the storefront pages).
   * Three layouts, for the owner to choose (26 Oct 2026): words beside the panel, words over it, or
   * both inside a wash panel as on Decision Verification's comparison.
   */
  output?: { panel: ReactNode; layout?: "split" | "centre" | "band" };
}) {
  const locale = renderLocale();
  const t = ui(locale);
  return (
    <>
      {/* The hero of the designed product pages (decision-audit/section1.tsx), class for class:
          the words centred over a narrow column, then the figure across the whole screen. */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="frame">
          <div className="pt-12 pb-0 lg:pt-16">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="reveal text-hero text-balance">{h(c.title)}</h1>
              <p className="reveal mx-auto mt-4 max-w-xl text-body leading-relaxed text-pretty text-muted delay-100">
                {c.lede}
              </p>
              <div className="reveal mt-7 flex flex-wrap justify-center gap-3 delay-200">
                <Link locale={locale} href={c.cta.href} className="btn-primary">
                  {c.cta.label}
                </Link>
              </div>
            </div>
            {/* The owner's image as supplied. `bleed-x` gives back the page margins and the section
                clips; the `svh` cap keeps the whole figure above the fold, as on the other heroes. */}
            {c.heroImage ? (
              <div className="reveal mt-8 delay-200 lg:mt-10 lg:bleed-x">
                <Image
                  src={img(c.heroImage.src)}
                  alt={c.heroImage.alt}
                  width={c.heroImage.width}
                  height={c.heroImage.height}
                  sizes="100vw"
                  priority
                  className="mx-auto h-auto w-full object-contain lg:max-h-[calc(100svh-28rem)]"
                />
              </div>
            ) : (
              <div className="reveal mx-auto mt-8 max-w-3xl pb-16 delay-200 lg:mt-10 lg:pb-20">
                <div className="rounded-3xl border border-line bg-primary-wash p-4 sm:p-8">
                  <div className="shadow-window rounded-2xl">{figure}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-card">
        <div className="frame grid items-center gap-10 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div className="reveal">
            {art.situationIsPanel ? (
              <div className="rounded-3xl border border-line bg-primary-wash p-4 sm:p-6">
                {art.situation}
              </div>
            ) : (
              <Picture>{art.situation}</Picture>
            )}
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

      {output && c.visualHeading && (
        <Output heading={h(c.visualHeading)} body={c.visualBody} {...output} />
      )}

      <StepsZigzag
        heading={h(c.steps.heading)}
        intro={c.steps.intro}
        steps={c.steps.items.map((s, i) => ({
          label: s.meta ?? "",
          title: s.title,
          body: s.body,
          picture: (
            <Picture className="border border-line bg-card">
              {art.steps[i]}
            </Picture>
          ),
        }))}
      />

      {/* The gains as the older product pages show theirs (`gains.tsx`): one card per benefit, a
          drawn picture on one side, alternating (owner, 26 Oct 2026). */}
      <section className="bg-soft-gradient scroll-mt-16 border-b border-line">
        <div className="frame py-20 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="reveal text-title text-balance">
              {h(c.gets.heading)}
            </h2>
          </div>
          <GainsCards
            items={c.gets.items.map((g, i) => ({
              art: gains?.[i],
              picture: gainPictures?.[i],
              title: g.title,
              body: g.body,
            }))}
          />
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

/** The output section's three layouts; see `output` on `ChapterPage`. */
function Output({
  heading,
  body,
  panel,
  layout = "split",
}: {
  heading: string;
  body?: string;
  panel: ReactNode;
  layout?: "split" | "centre" | "band";
}) {
  const words = (
    <>
      <h2 className="text-title text-balance">{heading}</h2>
      {body && <p className="mt-4 text-lg text-pretty text-muted">{body}</p>}
    </>
  );
  const figure = (
    <div className="reveal rounded-2xl shadow-window delay-100">{panel}</div>
  );
  if (layout === "centre")
    return (
      <section className="border-b border-line">
        <div className="frame py-20 lg:py-28">
          <div className="reveal mx-auto max-w-2xl text-center">{words}</div>
          <div className="mx-auto mt-12 max-w-3xl lg:mt-14">{figure}</div>
        </div>
      </section>
    );
  if (layout === "band")
    return (
      <section className="border-b border-line">
        <div className="frame py-20 lg:py-28">
          <div className="grid items-center gap-10 rounded-3xl border border-line bg-primary-wash p-6 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
            <div className="reveal">{words}</div>
            {figure}
          </div>
        </div>
      </section>
    );
  return (
    <section className="border-b border-line">
      <div className="frame grid items-center gap-10 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className="reveal lg:col-span-5">{words}</div>
        <div className="lg:col-span-7">{figure}</div>
      </div>
    </section>
  );
}

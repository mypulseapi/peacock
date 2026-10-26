import { renderLocale } from "@/i18n/render-locale";
import { ui } from "@/content/locale";
import {
  StepsBlock, GetsBlock, LimitsBlock,
  type StepsShape, type GetsShape, type LimitsShape,
  type StoryStep, type StoryItem,
} from "@/components/story/Blocks";
import { Link } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import { EvidenceBand, type Glyph } from "@/components/EvidenceBand";
import Image from "next/image";
import { img } from "@/lib/cdn";
import { Scene, type SceneSpec } from "@/components/story/Scenes";
import { Section, SectionHead } from "@/components/home/Section";

/**
 * One template for every page reached from the menu.
 *
 * Each of those pages used to be an anchor into a shared page, so four menu
 * items landed in four places on one document and a visitor could not tell them
 * apart, could not link to one, and search could not index them separately.
 * They are separate documents now, and they all tell the same shape of story
 * because a merchant evaluating four things needs to compare them:
 *
 *   the situation they are in  ->  what happens  ->  what they get
 *   ->  what it will not do    ->  questions     ->  how to start
 *
 * The "what it will not do" section is not padding. It is the section a buyer
 * forwards to the person who has to approve the spend.
 */

export type { StoryStep, StoryItem } from "@/components/story/Blocks";
export interface StoryQA { q: string; a: string }

export interface StoryContent {
  /**
   * Page metadata, alongside the copy it describes.
   *
   * Every story route hardcoded an English title and description in its own
   * generateMetadata, so /vi served English metadata on all thirteen of them:
   * a Vietnamese page indexed under an English title. Keeping it in the content
   * module means it localises with everything else and cannot be forgotten.
   * Descriptions stay under 160 characters, where search truncates.
   */
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  lede: string;
  /**
   * The merchant's situation, in their words, before we say anything about us.
   *
   * Optional since 2026-10-06. The second review struck this section out on
   * Decision Audit and cut parts of it on Monitor: by the time a reader is on a
   * product page they have met the problem on the homepage, and meeting it
   * again reads as padding. Same reasoning for `gets` and `limits`, which were
   * struck through on more than one page. A page that omits one renders the
   * next section instead of an empty band.
   */
  situation?: { heading: string; body: string[]; pull?: string };
  steps: { heading: string; intro?: string; items: StoryStep[] };
  gets?: { heading: string; intro?: string; items: StoryItem[] };
  /**
   * Two columns, the shelf before this product and the shelf after it.
   *
   * The 2026-10 review redrew Verification's "what you get" list as a before and
   * after pair, because a flat list of four benefits does not show a change and
   * the whole product is the change. A page uses this or `gets`, not both.
   */
  beforeAfter?: {
    heading: string;
    intro?: string;
    before: { label: string; items: string[] };
    after: { label: string; items: string[] };
  };
  limits?: { heading: string; will: string[]; wont: string[] };
  faq: StoryQA[];
  cta: { title: string; body: string; label: string; href: string; note?: string };
  /**
   * The section that says why nobody else can produce this. Optional, because
   * not every page has a defensibility argument to make, but a product page
   * that only describes its own output has not given a reason to buy.
   */
  chainBlock?: { eyebrow: string; heading: string; body?: string };
  /**
   * Scenes, as data rather than components.
   *
   * Ten of the thirteen pages had no picture anywhere. Declaring them here
   * means they localise with the copy, which is the thing that went wrong the
   * first time: a scene with hardcoded English inside a component ships
   * English on /vi. A page may still pass a bespoke component instead where
   * the shape genuinely is one of a kind.
   */
  scenes?: { hero?: SceneSpec; situation?: SceneSpec; chain?: SceneSpec };
  /**
   * A photograph or illustration for the hero, where one exists that is better
   * than a drawing. Alt text sits beside it so it localises with the copy.
   * Takes the aside slot, so a page using this puts its scene in `situation`.
   */
  heroImage?: { src: string; alt: string };
  /**
   * An image for the situation slot, framed and captioned.
   *
   * Separate from `heroImage` because it is used for a different job: showing
   * the thing the section is arguing against. It renders at 24rem, which is
   * the ceiling a 768px source can be sharp at on a 2x display, so a small
   * asset is placed honestly rather than stretched across a hero.
   */
  situationImage?: { src: string; alt: string; caption: string };
  /** Optional heading and lede for the visual band. */
  visualHeading?: string;
  visualBody?: string;
  /**
   * Cited third-party evidence. Optional, because not every story page has a
   * claim that needs outside support, but a page arguing what audits find
   * plainly does: this one had zero citations and three external links, all of
   * them social icons in the footer.
   */
  evidence?: {
    eyebrow: string;
    heading: string;
    items: { value: number; unit: string; label: string; source: string; href: string; glyph?: Glyph }[];
  };
}

/** The one pull quote a situation section is allowed, in either arrangement. */
function SituationPull({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p className={`border-l-2 border-[color:var(--accent-primary)] pl-5 text-[1.125rem] leading-[1.6] font-semibold text-[color:var(--ed-ink)] ${className}`}>
      {text}
    </p>
  );
}

export function StoryPage({ c, visual, situationVisual, heroVisual, chainVisual, layout }: {
  c: StoryContent;
  /**
   * Which shape each repeated block takes. Thirteen pages share this template
   * and rendered identically from "how it works" down; each route picks a
   * combination so no two read alike. Structural rather than copy, so it lives
   * on the route and is not duplicated once per locale. Defaults reproduce the
   * original layout.
   */
  layout?: { steps?: StepsShape; gets?: GetsShape; limits?: LimitsShape };
  /** Scene for the `chainBlock` section. */
  chainVisual?: React.ReactNode;
  visual?: React.ReactNode;
  /** A scene for the situation section, which was three paragraphs and nothing else. */
  situationVisual?: React.ReactNode;
  /**
   * A scene in the hero. The hero was an eyebrow, a heading and a lede on a
   * blank field: the first screen of the page carried no picture of the problem
   * at all, and a visitor had to read three paragraphs before anything showed
   * them who this is for.
   */
  heroVisual?: React.ReactNode;
}) {
  // Not `useLocale()`: this renders into a static export, where next-intl has no request to
  // resolve the locale from and returns the fallback. That left every `/vi` page built on this
  // component with a call to action pointing at `/en/contact`.
  const locale = renderLocale();
  const t = ui(locale);
  const hasSituationVisual = Boolean(situationVisual ?? c.scenes?.situation ?? c.situationImage);
  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lede={c.lede}
                aside={
                  heroVisual ??
                  (c.heroImage ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl">
                      <Image
                        src={img(c.heroImage.src)}
                        alt={c.heroImage.alt}
                        fill
                        priority
                        sizes="(min-width: 1024px) 40rem, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    c.scenes?.hero && <Scene spec={c.scenes.hero} slot="hero" />
                  ))
                } />

      {c.situation && (
      <Section>
        <SectionHead eyebrow={t.whereYouAre} title={c.situation.heading} />
        {/* Two shapes. With a scene the prose and its pull quote share the
            right track, because putting the pull on its own grid row left it
            stranded below the scene. Without a scene the grid used to render
            an empty div in the left track, so the pull moves there instead and
            the prose keeps its measure. */}
        <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          {hasSituationVisual ? (
            <>
              {situationVisual ??
                (c.situationImage ? (
                  <figure className="m-0">
                    <div className="relative aspect-[768/404] w-full max-w-[24rem] overflow-hidden rounded-2xl border border-[color:var(--ed-line)]">
                      <Image
                        src={img(c.situationImage.src)}
                        alt={c.situationImage.alt}
                        fill
                        sizes="24rem"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-3 max-w-[24rem] text-[0.8125rem] leading-relaxed text-[color:var(--ed-ink-2)]">
                      {c.situationImage.caption}
                    </figcaption>
                  </figure>
                ) : (
                  <Scene spec={c.scenes!.situation!} slot="situation" />
                ))}
              <div>
                <div className="ed-stack">
                  {c.situation.body.map((para) => (
                    <p key={para.slice(0, 28)} className="ed-body">{para}</p>
                  ))}
                </div>
                {c.situation.pull && <SituationPull text={c.situation.pull} className="mt-9" />}
              </div>
            </>
          ) : (
            <>
              <div className="ed-stack">
                {c.situation.body.map((para) => (
                  <p key={para.slice(0, 28)} className="ed-body">{para}</p>
                ))}
              </div>
              {c.situation.pull && <SituationPull text={c.situation.pull} />}
            </>
          )}
        </div>
      </Section>
      )}

      {c.chainBlock && (chainVisual || c.scenes?.chain) && (
        <Section>
          <SectionHead eyebrow={c.chainBlock.eyebrow} title={c.chainBlock.heading} body={c.chainBlock.body} />
          <div className="mt-12">
            {chainVisual ?? (c.scenes?.chain && <Scene spec={c.scenes.chain} slot="chain" />)}
          </div>
        </Section>
      )}

      {visual && (
        <Section tone="raise" className="border-y border-[color:var(--ed-line)]">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <SectionHead eyebrow={t.whatItLooksLike} title={c.visualHeading ?? t.theOutput} body={c.visualBody} />
            <div>{visual}</div>
          </div>
        </Section>
      )}

      {c.evidence && <EvidenceBand e={c.evidence} />}

      <Section>
        <SectionHead eyebrow={t.whatHappens} title={c.steps.heading} body={c.steps.intro} />
        <StepsBlock shape={layout?.steps} items={c.steps.items} />
      </Section>

      {c.gets && (
      <Section tone="raise" className="border-y border-[color:var(--ed-line)]">
        <SectionHead eyebrow={t.whatYouGet} title={c.gets.heading} body={c.gets.intro} />
        {/* The icon is rendered here, on the server, because a component is a
            function and cannot be handed to a client block as a prop. */}
        <GetsBlock
          shape={layout?.gets}
          items={c.gets.items.map(({ icon: Icon, title, body }) => ({
            icon: <Icon aria-hidden />, title, body,
          }))}
        />
      </Section>
      )}

      {c.beforeAfter && (
        <Section tone="raise" className="border-y border-[color:var(--ed-line)]">
          <SectionHead eyebrow={t.whatYouGet} title={c.beforeAfter.heading} body={c.beforeAfter.intro} />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {([c.beforeAfter.before, c.beforeAfter.after] as const).map((col, i) => (
              <div
                key={col.label}
                className={`rounded-2xl border p-8 ${
                  i === 0
                    ? "border-[color:var(--ed-line)] bg-[color:var(--brand-band-blush)]"
                    : "border-[color:var(--sig-line)] bg-[color:var(--sig-tint)]"
                }`}
              >
                <p className="ed-eyebrow">{col.label}</p>
                <ul className="mt-6 space-y-4">
                  {col.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      {/* A mark rather than a colour alone, so the two columns
                          are still distinguishable without hue. */}
                      <span aria-hidden className="mt-1 shrink-0 font-semibold text-[color:var(--ed-ink-3)]">
                        {i === 0 ? "\u2013" : "\u2713"}
                      </span>
                      <span className="ed-body">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {c.limits && (
      <Section>
        <SectionHead eyebrow={t.beforeYouCommit} title={c.limits.heading} />
        <LimitsBlock
          shape={layout?.limits}
          will={c.limits.will}
          wont={c.limits.wont}
          willLabel={t.whatThisDoes}
          wontLabel={t.whatItDoesNot}
        />
      </Section>
      )}

      <Section>
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <SectionHead eyebrow={t.questions} title={t.theOnesThatDecide} />
          <dl className="ed-rule">
            {c.faq.map((i) => (
              <div key={i.q} className="border-b border-[color:var(--ed-line)]">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)] focus-visible:outline-none">
                    <dt className="ed-d4 text-[color:var(--ed-ink)]">{i.q}</dt>
                    <span
                      aria-hidden
                      className="relative h-4 w-4 shrink-0 text-[color:var(--accent-primary)] before:absolute before:top-1/2 before:left-0 before:h-0.5 before:w-4 before:-translate-y-1/2 before:bg-current after:absolute after:top-0 after:left-1/2 after:h-4 after:w-0.5 after:-translate-x-1/2 after:bg-current after:transition-transform group-open:after:scale-y-0"
                    />
                  </summary>
                  <dd className="ed-body max-w-[68ch] pb-7">{i.a}</dd>
                </details>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* The closing band every designed page ends on (home, about, careers): same classes, so a
          story page closes the way the rest of the site does. The copy stays this page's own. */}
      <section id="request" className="cta-dots scroll-mt-16 border-t border-line" data-cta>
        <div className="frame py-24 text-center lg:py-32">
          <h2 className="reveal mx-auto max-w-3xl text-headline text-balance">{c.cta.title}</h2>
          <p className="reveal mx-auto mt-6 max-w-xl text-lg text-pretty text-muted delay-100">{c.cta.body}</p>
          <div className="reveal mt-8 flex flex-col items-center delay-200">
            <Link locale={locale} href={c.cta.href} className="btn-primary">
              {c.cta.label}
            </Link>
            {c.cta.note && <p className="mt-4 text-sm text-muted">{c.cta.note}</p>}
          </div>
        </div>
      </section>
    </>
  );
}

/** FAQPage schema from the same source the page renders, so they cannot drift. */
/**
 * The page's FAQ as a graph NODE, not a document.
 *
 * It used to carry its own `@context` and be emitted as a second ld+json block, which is the
 * failure the standard's one-graph-per-page rule describes: a FAQPage in its own block cannot be
 * referenced by the WebPage node, so nothing connects the questions to the page that answers them.
 * `buildGraph` gives it an `@id` and wires that reference.
 */
export function storyFaqSchema(c: StoryContent) {
  return {
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

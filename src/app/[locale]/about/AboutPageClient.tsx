import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { img } from "@/lib/cdn";
import { Terminal, FlaskConical, ShieldAlert, KeyRound } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHead } from "@/components/home/Section";
import { AboutSections } from "@/components/AboutSections";
import { aboutHero, beliefs, honestState, story, aboutArt } from "@/content/about";

/** One per belief, in the order they are written. */
const BELIEF_ICONS = [Terminal, FlaskConical, ShieldAlert, KeyRound];

export default function AboutPage() {
  const locale = useLocale();
  const ABOUT_HERO = aboutHero(locale);
  const ART = aboutArt(locale);
  const BELIEFS = beliefs(locale);
  const STORY = story(locale);
  const HONEST_STATE = honestState(locale);
  return (
    <>
      <PageHero
        eyebrow={ABOUT_HERO.eyebrow}
        title={ABOUT_HERO.title}
        lede={ABOUT_HERO.lede}
        aside={
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl">
            <Image src={img("about/hero.webp")} alt={ART.heroAlt} fill priority
                   sizes="(min-width: 1024px) 40rem, 100vw" className="object-cover" />
          </div>
        }
      />

      <AboutSections />

      <Section>
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <SectionHead eyebrow={STORY.eyebrow} title={STORY.title} />
            {/* Under the heading rather than trailing the prose: the left
                column was empty for the height of three paragraphs. */}
            <figure className="m-0 mt-10">
              <div className="relative aspect-[16/9] w-full max-w-[26rem] overflow-hidden rounded-2xl">
                <Image src={img("about/product-data-workspace-dashboard.jpg")} alt={ART.shelfAlt}
                       fill sizes="26rem" className="object-cover" />
              </div>
            </figure>
          </div>
          <div className="ed-stack max-w-[64ch]">
            {STORY.paragraphs.map((p) => (
              <p key={p.slice(0, 32)} className="ed-body">{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="raise" className="border-y border-[color:var(--ed-line)]">
        <SectionHead eyebrow="How we work" title="Four things we hold to." />
        <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2">
          {BELIEFS.map((b, i) => {
            const Icon = BELIEF_ICONS[i] ?? Terminal;
            return (
              <article key={b.title}>
                <span className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[color:var(--brand-lav-100)]">
                    <Icon className="h-4.5 w-4.5" style={{ color: "var(--accent-primary)" }} aria-hidden />
                  </span>
                  <span className="ed-num text-[0.8125rem] font-semibold tracking-wider text-[color:var(--brand-indigo)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <h3 className="ed-d4 mt-4 text-[color:var(--ed-ink)]">{b.title}</h3>
                <p className="ed-body mt-4 max-w-[52ch]">{b.body}</p>
              </article>
            );
          })}
        </div>
      </Section>

      {/* A status table instead of a leadership grid. It is the thing a careful
          buyer actually wants from an early company, and the one page format a
          well-staffed competitor would never publish. */}
      <Section>
        <SectionHead eyebrow={HONEST_STATE.eyebrow} title={HONEST_STATE.title} />
        <dl className="ed-rule mt-16">
          {HONEST_STATE.rows.map((r) => (
            <div
              key={r.label}
              className="grid gap-3 border-b border-[color:var(--ed-line)] py-7 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-10"
            >
              <dt className="text-[0.9375rem] font-semibold text-[color:var(--ed-ink)]">{r.label}</dt>
              <dd className="ed-body max-w-[62ch]">{r.value}</dd>
            </div>
          ))}
        </dl>
        <Link
          href="/contact"
          className="group mt-14 inline-flex items-center gap-2 rounded-xl bg-[color:var(--brand-indigo)] px-5 py-3.5 text-[0.9375rem] font-semibold text-[color:var(--brand-on-indigo)] transition hover:bg-[color:var(--brand-indigo-deep)]"
        >
          Send us a category and judge for yourself
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </Section>
    </>
  );
}

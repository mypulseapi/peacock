import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/home/Section";
import { pillars, productClose, productHero } from "@/content/product";

export default function ProductContent() {
  const locale = useLocale();
  const PRODUCT_HERO = productHero(locale);
  const PILLARS = pillars(locale);
  const PRODUCT_CLOSE = productClose(locale);
  return (
    <>
      {/* No hero aside here on purpose: the four jump-links below the lede are
          the visual and they navigate. A scene naming the same four products
          would be the same list twice. */}
      <PageHero eyebrow={PRODUCT_HERO.eyebrow} title={PRODUCT_HERO.title} lede={PRODUCT_HERO.lede}>
        <ol className="flex flex-wrap gap-2">
          {PILLARS.map((p) => (
            <li key={p.step}>
              <a
                href={`#${p.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ed-line)] bg-[color:var(--ed-raise)] px-4 py-2 text-[0.875rem] font-medium text-[color:var(--ed-ink-2)] transition hover:border-[color:var(--brand-indigo)] hover:text-[color:var(--ed-ink)]"
              >
                <span className="ed-num text-[color:var(--brand-indigo)]">{p.step}</span>
                {p.name}
              </a>
            </li>
          ))}
        </ol>
      </PageHero>

      {PILLARS.map((p, i) => (
        <Section
          key={p.step}
          id={p.name.toLowerCase().replace(/\s+/g, "-")}
          tone={i % 2 === 1 ? "raise" : "canvas"}
          className={i % 2 === 1 ? "border-y border-[color:var(--ed-line)]" : ""}
        >
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-20">
            <div>
              <div className="flex items-center gap-3">
                <span className="ed-num text-[0.8125rem] font-semibold tracking-wider text-[color:var(--brand-indigo)]">
                  {p.step}
                </span>
                <span className="ed-eyebrow">{p.name}</span>
                {p.optional && (
                  <span className="rounded-md bg-[color:var(--brand-lav-200)] px-2 py-0.5 text-[0.625rem] font-semibold tracking-wider text-[color:var(--brand-indigo-deep)] uppercase">
                    Optional
                  </span>
                )}
              </div>
              {/* Question-shaped H2: this is the phrasing a merchant searches and
                  an answer engine lifts. */}
              <h2 className="ed-d2 mt-5 max-w-[18ch] text-[color:var(--ed-ink)]">{p.headline}</h2>
              <p className="ed-lede mt-7 max-w-[58ch]">{p.body}</p>
              <p className="ed-rule mt-9 pt-6 text-[0.875rem] text-[color:var(--ed-ink-3)]">
                <span className="font-semibold text-[color:var(--ed-ink-2)]">What it needs from you: </span>
                {p.needs}
              </p>
            </div>

            <ul className="ed-raise h-fit space-y-5 rounded-2xl border border-[color:var(--ed-line)] p-7">
              {p.bullets.map((b) => (
                <li key={b} className="flex gap-3.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--brand-indigo)]" aria-hidden />
                  <span className="ed-body flex-1">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ))}

      <Section>
        <div className="max-w-3xl">
          <h2 className="ed-d2 text-[color:var(--ed-ink)]">{PRODUCT_CLOSE.title}</h2>
          <p className="ed-body mt-7 max-w-[66ch]">{PRODUCT_CLOSE.body}</p>
          <Link
            href="/contact"
            className="group mt-11 inline-flex items-center gap-2 rounded-xl bg-[color:var(--brand-indigo)] px-5 py-3.5 text-[0.9375rem] font-semibold text-[color:var(--brand-on-indigo)] transition hover:bg-[color:var(--brand-indigo-deep)]"
          >
            Request a Decision Audit
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </Section>
    </>
  );
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageSchema } from "@/components/PageSchema";
import { buildAlternates } from "@/lib/seo";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/home/Section";
import { sectors } from "@/content/industries";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("industriesPage.meta");

  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/industries"),
  };
}

/*
 * The locale comes from the route, not from `useLocale()`.
 *
 * This page is server rendered into a static export, and next-intl resolves a Server
 * Component's locale from a request there is none of, so `useLocale()` returned the fallback:
 * `/vi/industries` rendered entirely in English and every sector link pointed at `/en`.
 * `params` is the one source that is right by construction.
 */
export default async function IndustriesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "industriesPage" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const list = sectors(locale);

  return (
    <>
      <PageSchema locale={locale} path="/industries" />
      <PageHero
        eyebrow="Solutions"
        title={`${t("title")} ${t("titleHighlight")}`}
        lede={t("description")}
      />

      <Section>
        {/* One card shape for all twelve. The previous grid coloured cards by an
            accentColor field, which made a data attribute look like a category
            and gave twelve sectors three arbitrary colour groups. */}
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.slug}>
                <Link locale={locale}
                  href={`/industries/${s.slug}`}
                  className="group ed-raise flex h-full flex-col rounded-2xl border border-[color:var(--ed-line)] p-7 transition hover:border-[color:var(--brand-indigo)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--brand-lav-100)]">
                    <Icon className="h-5 w-5" style={{ color: "var(--accent-primary)" }} aria-hidden />
                  </span>
                  <h2 className="ed-d4 mt-6 text-[color:var(--ed-ink)]">{s.name}</h2>
                  <p className="mt-2 text-[0.8125rem] text-[color:var(--ed-ink-3)]">{s.tagline}</p>
                  <p className="ed-body mt-5 flex-1">{s.summary}</p>
                  <span className="ed-rule mt-7 flex items-center justify-between gap-4 pt-5">
                    <span className="ed-num text-[0.8125rem] font-medium text-[color:var(--ed-ink-2)]">{s.metric}</span>
                    <span className="inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-[color:var(--accent-primary)]">
                      {tc("learnMore")}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="raise" className="border-t border-[color:var(--ed-line)]">
        <div className="max-w-3xl">
          <h2 className="ed-d2 text-[color:var(--ed-ink)]">{t("anyTitle")}</h2>
          <p className="ed-body mt-7 max-w-[62ch]">{t("anyBody")}</p>
          <Link locale={locale}
            href="/contact"
            className="group mt-11 inline-flex items-center gap-2 rounded-xl bg-[color:var(--brand-indigo)] px-5 py-3.5 text-[0.9375rem] font-semibold text-[color:var(--brand-on-indigo)] transition hover:bg-[color:var(--brand-indigo-deep)]"
          >
            {t("anyCta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </Section>
    </>
  );
}

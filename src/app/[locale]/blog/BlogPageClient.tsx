"use client";

import { useTranslations } from "next-intl";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/home/Section";
import { Link } from "@/i18n/routing";
import { ArrowRight, Clock } from "lucide-react";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ARTICLES } from "@/content/blog";
import { ArticleArt } from "@/components/ArticleArt";

/**
 * The notes index.
 *
 * What was here was five posts of invented statistics sitting on the same site
 * as /why/limits, which says we have no uplift figure. Every piece is now
 * third-party research, attributed inline and linked at the foot of the
 * article, or our own laptop-shelf measurement labelled as ours.
 */
export default function BlogPageClient() {
  const t = useTranslations("blog");
  const [lead, ...rest] = ARTICLES;
  const LeadIcon = lead.icon;

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} lede={t("lede")} />

      <Section>
        <Link
          href={`/blog/${lead.slug}`}
          className="group ed-raise block rounded-2xl border border-[color:var(--ed-line)] p-8 transition hover:border-[color:var(--brand-indigo)] sm:p-10"
        >
          <span className="flex flex-wrap items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[color:var(--brand-lav-100)]">
              <LeadIcon className="h-4 w-4" style={{ color: "var(--accent-primary)" }} aria-hidden />
            </span>
            <span className="ed-eyebrow">{lead.category}</span>
            <span className="ed-num inline-flex items-center gap-1.5 text-[0.8125rem] text-[color:var(--ed-ink-3)]">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {lead.readTime}
            </span>
          </span>
          <span className="mt-7 block"><ArticleArt kind={lead.art} /></span>
          <h2 className="ed-d2 mt-9 max-w-[24ch] text-[color:var(--ed-ink)]">{lead.title}</h2>
          <p className="ed-lede mt-6 max-w-[62ch]">{lead.excerpt}</p>
          <span className="mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-[color:var(--accent-primary)]">
            {t("read")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </Link>
      </Section>

      <Section tone="raise" className="border-t border-[color:var(--ed-line)]">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => {
            const Icon = a.icon;
            return (
              <li key={a.slug}>
                <Link
                  href={`/blog/${a.slug}`}
                  className="group ed-raise flex h-full flex-col rounded-2xl border border-[color:var(--ed-line)] p-7 transition hover:border-[color:var(--brand-indigo)]"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-[color:var(--brand-lav-100)]">
                      <Icon className="h-3.5 w-3.5" style={{ color: "var(--accent-primary)" }} aria-hidden />
                    </span>
                    <span className="ed-eyebrow">{a.category}</span>
                  </span>
                  <span className="mt-5 block"><ArticleArt kind={a.art} /></span>
                  <h3 className="ed-d4 mt-5 text-[color:var(--ed-ink)]">{a.title}</h3>
                  <p className="ed-body mt-3 flex-1 text-[0.875rem]">{a.excerpt}</p>
                  <span className="ed-rule mt-6 flex items-center justify-between gap-4 pt-5">
                    <time dateTime={a.iso} className="ed-num text-[0.8125rem] text-[color:var(--ed-ink-3)]">{a.date}</time>
                    <span className="ed-num inline-flex items-center gap-1.5 text-[0.8125rem] text-[color:var(--ed-ink-3)]">
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      {a.readTime}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section className="border-t border-[color:var(--ed-line)]">
        <div className="max-w-xl">
          <h2 className="ed-d3 text-[color:var(--ed-ink)]">{t("subscribeTitle")}</h2>
          <p className="ed-body mt-5">{t("subscribeBody")}</p>
          <div className="mt-8"><NewsletterForm /></div>
        </div>
      </Section>
    </>
  );
}

"use client";

import { useLocale } from "next-intl";
import { Package, CookieIcon, Lock, Trash2, type LucideIcon } from "lucide-react";
import { Section, SectionHead } from "./Section";
import { PrivacyScene } from "./Scenes";
import { privacy } from "@/content/home";

/**
 * Four commitments, each with a mark.
 *
 * This was the only section on the page with no icon, no rule and no figure:
 * four headings and four paragraphs in a grid. Privacy is the section a careful
 * buyer reads most closely and it looked like the section we cared least about.
 *
 * The icons are literal on purpose. A padlock for isolation and a bin for
 * deletion are not clever, and this is not the place to be.
 */
const ICONS: LucideIcon[] = [Package, CookieIcon, Lock, Trash2];

export function PrivacySection() {
  const locale = useLocale();
  const PRIVACY = privacy(locale);

  return (
    <Section tone="raise" className="border-y border-[color:var(--ed-line)]">
      <SectionHead eyebrow={PRIVACY.eyebrow} title={PRIVACY.title} />
      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-stretch lg:gap-12">
      <ul className="grid gap-7 sm:grid-cols-1">
        {PRIVACY.points.map((p, i) => {
          const Icon = ICONS[i] ?? Lock;
          return (
            <li key={p.title} className="ed-canvas flex gap-5 rounded-2xl border border-[color:var(--ed-line)] p-7">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color:var(--brand-lav-100)]">
                <Icon className="h-5 w-5" style={{ color: "var(--accent-primary)" }} aria-hidden />
              </span>
              <span className="min-w-0">
                <h3 className="ed-d4 text-[color:var(--ed-ink)]">{p.title}</h3>
                <p className="ed-body mt-3">{p.body}</p>
              </span>
            </li>
          );
        })}
      </ul>
      <PrivacyScene />
      </div>
    </Section>
  );
}

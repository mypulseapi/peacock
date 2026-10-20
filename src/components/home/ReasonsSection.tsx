import { useLocale } from "next-intl";
import { reasons } from "@/content/home";
import { Section, SectionHead } from "./Section";

/**
 * Why a business buys this, which the page never answered.
 *
 * The homepage argued the problem thoroughly and then asked for an export
 * without saying what makes us the ones to send it to. The 2026-10 review asked
 * for five reasons in a box plus the USP, and this is that, kept to one screen.
 *
 * The three USP chips lead because they are the part a reader repeats to
 * somebody else; the five reasons are the detail they forward.
 */
export function ReasonsSection() {
  const locale = useLocale();
  const R = reasons(locale);
  return (
    <Section tone="tint">
      <SectionHead eyebrow={R.eyebrow} title={R.title} />
      <div className="mt-11 grid gap-4 sm:grid-cols-3">
        {R.usp.map((u) => (
          <div key={u.label} className="rounded-xl border border-[color:var(--sig-line)] bg-[color:var(--sig-tint)] p-6">
            <p className="ed-d4 text-[color:var(--ed-ink)]">{u.label}</p>
            <p className="ed-body mt-2">{u.body}</p>
          </div>
        ))}
      </div>
      <ol className="ed-rule mt-12 pt-2">
        {R.items.map((item, i) => (
          <li key={item} className="flex gap-5 border-b border-[color:var(--ed-line)] py-5">
            <span className="ed-num shrink-0 text-[0.875rem] font-semibold text-[color:var(--brand-indigo)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="ed-body max-w-[72ch]">{item}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}

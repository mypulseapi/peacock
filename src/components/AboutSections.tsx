import { useLocale } from "next-intl";
import { aboutSections } from "@/content/about";
import { Section, SectionHead } from "@/components/home/Section";
import { Linkedin } from "lucide-react";

/**
 * Management team, company and location, collapsed.
 *
 * The 2026-10 review asked for three titles under "About us" that expand on
 * click, rather than a page that opens with every biography at once.
 *
 * Native <details> rather than a JS accordion, for the same reason the FAQ uses
 * it: keyboard accessible and findable by in-page search for free, with the
 * content in the DOM whether or not it is open, so a crawler reads all three.
 */
export function AboutSections() {
  const locale = useLocale();
  const S = aboutSections(locale);

  /*
   * The team section renders only when there is a roster. It is empty until
   * somebody supplies real names, roles and LinkedIn URLs; none exist in this
   * repository, and a placeholder person on a public page is a fabricated
   * person. Two sections now, three the moment the roster lands.
   */
  const panels = [
    S.team.members.length > 0
      ? {
          label: S.team.label,
          blurb: S.team.blurb,
          body: (
            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {S.team.members.map((m) => (
                <li key={m.name} className="flex items-center justify-between gap-4 rounded-xl border border-[color:var(--ed-line)] p-5">
                  <span>
                    <span className="ed-d4 block text-[color:var(--ed-ink)]">{m.name}</span>
                    <span className="ed-body">{m.role}</span>
                  </span>
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} on LinkedIn`}
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-[color:var(--ed-line)] text-[color:var(--ed-ink-2)] transition hover:border-[color:var(--sig)] hover:text-[color:var(--sig)]"
                    >
                      <Linkedin className="h-5 w-5" strokeWidth={1.8} />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ),
        }
      : null,
    { label: S.company.label, blurb: S.company.blurb, body: <Rows rows={S.company.rows} /> },
    { label: S.location.label, blurb: S.location.blurb, body: <Rows rows={S.location.rows} /> },
  ].filter(Boolean) as { label: string; blurb: string; body: React.ReactNode }[];

  return (
    <Section tone="raise" className="border-y border-[color:var(--ed-line)]">
      <SectionHead eyebrow={S.eyebrow} title={S.title} />
      <div className="ed-rule mt-10">
        {panels.map((panel) => (
          <details key={panel.label} className="group border-b border-[color:var(--ed-line)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 focus-visible:ring-2 focus-visible:ring-[color:var(--brand-indigo)] focus-visible:outline-none">
              <span>
                <span className="ed-d4 block text-[color:var(--ed-ink)]">{panel.label}</span>
                <span className="ed-body">{panel.blurb}</span>
              </span>
              {/* A plus that becomes a minus. Rotation alone would not read as
                  a state change for anyone who cannot see the animation. */}
              <span
                aria-hidden
                className="relative h-4 w-4 shrink-0 text-[color:var(--brand-indigo)] before:absolute before:top-1/2 before:left-0 before:h-0.5 before:w-4 before:-translate-y-1/2 before:bg-current after:absolute after:top-0 after:left-1/2 after:h-4 after:w-0.5 after:-translate-x-1/2 after:bg-current after:transition-transform group-open:after:scale-y-0"
              />
            </summary>
            <div className="pb-8">{panel.body}</div>
          </details>
        ))}
      </div>
    </Section>
  );
}

function Rows({ rows }: { rows: ReadonlyArray<{ label: string; value: string }> }) {
  return (
    <dl className="mt-2 grid gap-5">
      {rows.map((r) => (
        <div key={r.label} className="grid gap-1.5 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-8">
          <dt className="text-[0.875rem] font-semibold text-[color:var(--ed-ink-3)]">{r.label}</dt>
          <dd className="ed-body max-w-[68ch]">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

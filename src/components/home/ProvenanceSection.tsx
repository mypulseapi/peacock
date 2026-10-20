import { useLocale } from "next-intl";
import { Section, SectionHead } from "./Section";
import { FileText, Link2, Search, type LucideIcon } from "lucide-react";
import { ExtractScene } from "./Scenes";

/**
 * Extractable, mappable, absent. The three have very different costs and the
 * section marked that with a 10px coloured dash, which nobody reads as a cost
 * signal. An icon each says it: text you own, a link to a feed, a search for
 * something you do not have yet.
 */
const ICONS: LucideIcon[] = [FileText, Link2, Search];
import { provenance } from "@/content/home";

/** Extractable / mappable / needs acquisition. The cost question, answered. */
export function ProvenanceSection() {
  const locale = useLocale();
  const PROVENANCE = provenance(locale);
  // These were --brand-indigo and --brand-indigo-soft, which on the light
  // theme resolve to the signal lime and its dim step: 1.05:1 and 1.50:1
  // against the chip they sit on, so two of the three marks were invisible.
  // Cheap, middling and expensive now read as three separable hues, all above
  // 3:1 on that chip (7.30, 6.05 and 4.26).
  const tone: Record<string, string> = {
    good: "var(--accent-primary)",
    mid: "var(--sig-deep)",
    hard: "var(--brand-coral-solid)",
  };
  return (
    <Section tone="raise" className="border-y border-[color:var(--ed-line)]">
      <SectionHead eyebrow={PROVENANCE.eyebrow} title={PROVENANCE.title} body={PROVENANCE.body} />
      {/* The scene says in one picture what the three cards below cost a
          paragraph each to say: the value is in the sentence, not the column. */}
      {/* The scene carries the section, so it runs full width above the cards
          rather than sitting in a side column at a quarter of the size. */}
      <div className="mt-12"><ExtractScene /></div>

      <div className="mt-10">
        <div className="grid gap-7 md:grid-cols-3">
        {PROVENANCE.items.map((it, i) => (
          <article key={it.label} className="ed-canvas rounded-2xl border border-[color:var(--ed-line)] p-6">
            <span
              className="grid h-11 w-11 place-items-center rounded-xl"
              style={{ background: "var(--brand-lav-100)" }}
              aria-hidden
            >
              {(() => { const Icon = ICONS[i] ?? FileText; return <Icon className="h-5 w-5" style={{ color: tone[it.tone] }} />; })()}
            </span>
            <h3 className="ed-d4 mt-6 text-[color:var(--ed-ink)]">{it.label}</h3>
            <p className="mt-4 ed-body text-[color:var(--ed-ink-2)]">{it.body}</p>
            <p className="ed-num ed-rule mt-5 pt-4 text-[0.8125rem] font-medium text-[color:var(--ed-ink-3)]">{it.stat}</p>
          </article>
        ))}
        </div>
      </div>
    </Section>
  );
}

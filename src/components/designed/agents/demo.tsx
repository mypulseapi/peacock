import type { AgentContent, Verdict } from "@/content/pages/agents";

/**
 * The hero figure of an agent page (owner's layout A, 27 Oct 2026): the page's own worked example,
 * the request and each option's verdict, in place of a picture until the owner's image exists. A
 * verdict is a word and a token, never a colour alone: blue for fits, slate for fails, the amber
 * missing style for cannot tell, the only one that is about missing data. The coding agents page
 * shows its install line and its four tools instead.
 */
const TAG: Record<Verdict, string> = {
  fits: "badge-primary",
  fails: "badge border-line bg-surface-1 text-muted",
  cannot_tell: "badge border-dashed border-gap bg-gap-fill text-gap-strong",
};

/** The options with their verdicts: the hero, the pipeline's last step and the worked example. */
export function VerdictRows({
  options,
  verdicts,
  boxed = false,
}: {
  options: Extract<AgentContent["demo"], { ask: string }>["options"];
  verdicts: AgentContent["labels"]["verdicts"];
  /** Each option its own small card, for a wash background; otherwise rows ruled by hairlines. */
  boxed?: boolean;
}) {
  return (
    <ul className={boxed ? "grid gap-2" : ""}>
      {options.map((o) => (
        <li
          key={o.name}
          className={`flex items-center justify-between gap-4 ${boxed ? "rounded-xl border border-line bg-card px-4 py-3" : "border-b border-line px-5 py-4 last:border-b-0"}`}
        >
          <span className="min-w-0">
            <span className="block font-medium text-ink">{o.name}</span>
            <span className="block text-sm text-muted">{o.note}</span>
          </span>
          <span className={`shrink-0 ${TAG[o.verdict]}`}>
            {verdicts[o.verdict]}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function AgentDemo({ c }: { c: AgentContent }) {
  const d = c.demo;
  if ("install" in d)
    return (
      <div className="overflow-hidden rounded-2xl border border-line bg-card text-left">
        <p className="border-b border-line bg-surface-1 px-5 py-4 font-mono text-sm break-words text-ink">
          <span className="text-muted select-none">$ </span>
          {d.install}
        </p>
        <ul className="grid gap-2 p-5 sm:grid-cols-2">
          {d.tools.map((tool) => (
            <li
              key={tool}
              className="rounded-lg border border-primary-line bg-primary-tint px-3 py-2 font-mono text-sm text-primary-hover"
            >
              {tool}
            </li>
          ))}
        </ul>
      </div>
    );
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card text-left">
      <div className="border-b border-line bg-surface-1 px-5 py-4">
        <p className="text-sm text-muted">{c.labels.request}</p>
        <p className="mt-1 text-h3 text-ink">{d.ask}</p>
      </div>
      <VerdictRows options={d.options} verdicts={c.labels.verdicts} />
    </div>
  );
}

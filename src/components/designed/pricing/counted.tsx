/**
 * What counts toward usage, and what never does.
 *
 * The list is the gateway's own: `counted` in apps/api/gateway/src/config/route-registry.ts in
 * rainbow. Change it there first, then here, or the page and the invoice disagree. Measurement is
 * never counted (business/COMMERCIAL.md §3.1): charging for it makes switching it off rational.
 */
import { designedText } from "../t";

const COUNTED = [
  "counted1",
  "counted2",
  "counted3",
  "counted4",
  "counted5",
  "counted6",
] as const;
const FREE = ["free1", "free2", "free3", "free4"] as const;

export function CountedSection() {
  const t = designedText("pricing.section1");
  const row = (k: string, mark: string, tone: string) => {
    const [call, what] = t(k).split(" | ");
    return (
      <li
        key={k}
        className="flex items-start gap-3 border-t border-line py-3 first:border-t-0"
      >
        <svg className={`mt-0.5 size-4 shrink-0 ${tone}`} aria-hidden="true">
          <use href={`#${mark}`} />
        </svg>
        <span>
          <code className="font-mono text-sm text-ink">{call}</code>
          <span className="block text-data text-pretty text-muted">{what}</span>
        </span>
      </li>
    );
  };
  return (
    <section id="what-counts" className="scroll-mt-24 border-b border-line">
      <div className="frame py-16 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="reveal text-title text-balance">
            {t("countedTitle")}
          </h2>
          <p className="reveal mt-3 text-body text-pretty text-muted delay-100">
            {t("countedLede")}
          </p>
        </div>
        <div className="reveal mx-auto mt-10 grid max-w-[1000px] grid-cols-1 gap-5 delay-100 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-card p-6">
            <p className="eyebrow-primary">{t("countedHead")}</p>
            <ul className="mt-3">
              {COUNTED.map((k) => row(k, "i-check", "text-primary"))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-card p-6">
            <p className="eyebrow">{t("freeHead")}</p>
            <ul className="mt-3">
              {FREE.map((k) => row(k, "i-circle-check", "text-success"))}
            </ul>
          </div>
        </div>
        <p className="reveal mx-auto mt-6 max-w-2xl text-center text-sm text-pretty text-muted">
          {t("countedNote")}
        </p>
      </div>
    </section>
  );
}

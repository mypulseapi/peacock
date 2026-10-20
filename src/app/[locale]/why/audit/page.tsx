import type { Metadata } from "next";
import { PageSchema } from "@/components/PageSchema";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import { PAGE_CATALOGUE } from "@/lib/page-catalogue";
import { ALL_REQUIREMENTS, REQUIREMENT_VALUE } from "@/lib/visitor-requirements";

/**
 * B7: our own Decision Audit, published.
 *
 * The whole point is that the numbers are derived at build time from the page catalogue rather
 * than written into the copy. A hand-written version of this page would drift the moment a page
 * was added, and an audit that drifts is the thing we tell merchants not to trust.
 *
 * It is also deliberately unflattering. `what-it-costs` is resolved by one page of 37 and that is
 * the headline finding, not a footnote: publishing the ceiling is the argument in
 * ODIN/research/TWO-IGNORANCES.md, applied to ourselves first.
 */

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ourAudit" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: buildAlternates(locale, "/why/audit"),
  };
}

/** Sorted scarcest first, because the scarcest is the finding. */
function auditRows() {
  return ALL_REQUIREMENTS.map((requirement) => ({
    requirement,
    pages: PAGE_CATALOGUE.filter((p) => p.decides.includes(requirement)).length,
    bits: REQUIREMENT_VALUE[requirement],
  })).sort((a, b) => a.pages - b.pages || a.requirement.localeCompare(b.requirement));
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ourAudit" });
  const tReq = await getTranslations({ locale, namespace: "nextBest.requirements" });

  const rows = auditRows();
  const worst = rows[0];
  const total = PAGE_CATALOGUE.length;

  return (
    <>
      <PageSchema locale={locale} path="/why/audit" />
      <div className="mx-auto max-w-shell px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-[var(--sig)]">
        {t("eyebrow")}
      </p>
      <h1 className="display mt-3 text-4xl font-bold text-[var(--on-panel)] sm:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-5 max-w-3xl text-lg text-[var(--on-panel-2)]">{t("lede")}</p>

      <h2 className="mt-14 text-xl font-semibold text-[var(--on-panel)]">{t("tableHeading")}</h2>

      {/* Tables are the one thing allowed to scroll sideways on a phone. */}
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--chrome-line)] text-[var(--on-panel-3)]">
              <th scope="col" className="py-3 pr-4 font-medium">{t("colRequirement")}</th>
              <th scope="col" className="py-3 pr-4 text-right font-medium">{t("colPages")}</th>
              <th scope="col" className="py-3 text-right font-medium">{t("colValue")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ requirement, pages, bits }) => {
              // The scarcest row is the finding, so it is the one that gets emphasis.
              const isWorst = requirement === worst.requirement;
              return (
                <tr
                  key={requirement}
                  className={`border-b border-[var(--chrome-line)] ${isWorst ? "bg-[var(--sig-tint)]" : ""}`}
                >
                  <td className={`py-3 pr-4 ${isWorst ? "font-semibold" : ""} text-[var(--on-panel)]`}>
                    {tReq(requirement)}
                  </td>
                  <td className="py-3 pr-4 text-right tabular-nums text-[var(--on-panel-2)]">
                    {pages} / {total}
                  </td>
                  <td className="py-3 text-right tabular-nums text-[var(--on-panel-2)]">
                    {bits.toFixed(2)} {t("bits")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 className="mt-14 text-xl font-semibold text-[var(--on-panel)]">{t("findingHeading")}</h2>
      <p className="mt-3 max-w-3xl text-[var(--on-panel-2)]">{t("finding")}</p>

      <h2 className="mt-10 text-xl font-semibold text-[var(--on-panel)]">{t("methodHeading")}</h2>
      <p className="mt-3 max-w-3xl text-[var(--on-panel-2)]">{t("method")}</p>

      <h2 className="mt-10 text-xl font-semibold text-[var(--on-panel)]">{t("caveatHeading")}</h2>
      <ul className="mt-3 max-w-3xl list-disc space-y-2 pl-5 text-[var(--on-panel-2)]">
        {t.raw("caveats").map((caveat: string) => (
          <li key={caveat}>{caveat}</li>
        ))}
      </ul>
      </div>
    </>
  );
}

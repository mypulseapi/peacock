import { Check, FileText, Minus, Table2, ArrowRight } from "lucide-react";
import { designedText } from "../../t";

/**
 * The distribution hero's figure: where the missing specification already lives.
 *
 * The page's own conclusion is "usually a mapping job. The specification is in a supplier
 * datasheet or a feed you already receive". This draws that: the datasheet on the left holds
 * every fact the buyer's requirement needs, the catalogue row on the right holds a part code and
 * three blanks, and the gap between them is the whole product.
 *
 * It replaces an AI-generated photograph that was proposed for this slot. That image misspelled
 * `ĐIỀU HÒA` as `DIỀU HÒA` on a Vietnam-first site, carried invented figures (78% complete, 12/5/3)
 * on a page whose own chart is labelled "illustrative", and told a channel-readiness story rather
 * than this page's spec-matching one.
 *
 * Nothing here is a measurement. The requirement, the datasheet and the blanks are structural
 * claims about how B2B catalogues are built, which is what the surrounding copy argues. The
 * ranking is ordinal and the caption beneath the figure already explains what ranks it, so no
 * number needs a source it does not have.
 */
export function SpecMap() {
  const t = designedText("industries.distribution.figure");

  /* The three facts the requirement turns on. Present in the datasheet, absent from the row. */
  const specs = [
    { label: t("specThread"), value: t("valThread") },
    { label: t("specPressure"), value: t("valPressure") },
    { label: t("specMaterial"), value: t("valMaterial") },
  ];

  return (
    <div className="spec-map">
      {/* What the buyer has to hit. Not a product, a constraint. */}
      <p className="spec-req">
        <span className="spec-req-label">{t("requirement")}</span>
        <span className="spec-req-value">{t("requirementValue")}</span>
      </p>

      <div className="spec-pair">
        {/* The supplier datasheet: everything is here already. */}
        <div className="spec-card spec-card-source">
          <p className="spec-card-head">
            <FileText className="size-3.5 shrink-0" aria-hidden="true" />
            {t("datasheet")}
          </p>
          <dl className="spec-rows">
            {specs.map((s) => (
              <div key={s.label} className="spec-row">
                <dt>{s.label}</dt>
                <dd>
                  <Check className="size-3 shrink-0 text-success" aria-hidden="true" />
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="spec-card-foot">{t("datasheetNote")}</p>
        </div>

        {/* The arrow is the point: nothing crosses it. */}
        <p className="spec-gap" aria-hidden="true">
          <ArrowRight className="size-4" />
          <span>{t("gap")}</span>
        </p>

        {/* The catalogue row: a code, and three blanks where the decision lives. */}
        <div className="spec-card spec-card-target">
          <p className="spec-card-head">
            <Table2 className="size-3.5 shrink-0" aria-hidden="true" />
            {t("catalogue")}
          </p>
          <dl className="spec-rows">
            <div className="spec-row">
              <dt>{t("partCode")}</dt>
              <dd className="spec-code">{t("partCodeValue")}</dd>
            </div>
            {specs.map((s) => (
              <div key={s.label} className="spec-row">
                <dt>{s.label}</dt>
                <dd className="spec-blank">
                  <Minus className="size-3 shrink-0" aria-hidden="true" />
                  {t("blank")}
                </dd>
              </div>
            ))}
          </dl>
          <p className="spec-card-foot spec-card-foot-gap">{t("catalogueNote")}</p>
        </div>
      </div>

      {/* The order to fix them in, which is what the page is selling. */}
      <ol className="spec-fixes">
        {specs.map((s, i) => (
          <li key={s.label}>
            <span className="spec-rank">{i + 1}</span>
            {t("mapVerb")} {s.label.toLowerCase()}
          </li>
        ))}
      </ol>
    </div>
  );
}

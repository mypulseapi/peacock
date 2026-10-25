/**
 * The 404 body, in the designed shell. Replaced the legacy NotFoundContent on 2026-10-25: that
 * one drew the old dark navbar around itself, so a mistyped link looked like a different site.
 */
import Link from "next/link";
import { designedHref, designedText } from "./t";

export function DesignedNotFound() {
  const t = designedText("shell.notFound");
  return (
    <section className="border-b border-line">
      <div className="frame py-24 text-center lg:py-32">
        <p className="text-display text-ink tabular-nums">404</p>
        <h1 className="mt-4 text-title text-balance text-ink">{t("title")}</h1>
        <p className="mx-auto mt-4 max-w-xl text-body text-pretty text-muted">
          {t("body")}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href={designedHref("/en")} className="btn-primary">
            {t("home")}
          </Link>
          <Link
            href={designedHref("/en/product/decision-audit")}
            className="btn-secondary"
          >
            {t("audit")}
          </Link>
        </div>
      </div>
    </section>
  );
}

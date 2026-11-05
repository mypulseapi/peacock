/**
 * Test My Catalogue's page body (`/test-my-catalogue`, the homepage hero links here). The client
 * component gets every label as a prop, and the calculator as a server-rendered child, so the
 * result reads findings, then what a point of conversion is worth on the merchant's own numbers,
 * then the ask (owner, 2026-11-04).
 */
import en from "../../../../messages/designed.en.json";
import { designedText } from "../t";
import { renderLocale } from "@/i18n/render-locale";
import { CalculatorBlock } from "../calculator";
import { HeroAurora } from "../hero-aurora";
import { CatalogueTest } from "./catalogue-test";
import { StatsCounter } from "./stats-counter";

export function CatalogueTestPage() {
  const t = designedText("catalogueTest.page");
  const labels = Object.fromEntries(
    Object.keys(en.catalogueTest.page).map((k) => [k, t(k)]),
  );
  return (
    <>
      <section className="relative isolate overflow-x-clip border-b border-line bg-surface-0">
        <HeroAurora />
        <div className="frame py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-hero text-balance">{t("title")}</h1>
            <p className="mt-4 text-lg text-pretty text-muted">{t("lede")}</p>
            <StatsCounter labels={labels} locale={renderLocale()} />
          </div>
          <div className="mt-10">
            <CatalogueTest
              labels={labels}
              locale={renderLocale()}
              calculator={<CalculatorBlock bare />}
            />
          </div>
        </div>
      </section>
    </>
  );
}

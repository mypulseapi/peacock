import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { LOCALE_CODES } from "@/i18n/locales";

/**
 * The homepage share card.
 *
 * The version before this took no params, so /vi shared an English card, and
 * it was built on the retired violet ink gradient (#0f0a1a to #1a0a1e) with the
 * old "Decide what to show, and when to ask" line. Three things wrong on the
 * single image that represents the site everywhere it is linked.
 *
 * Localised now, and on the current identity: ink ground, one signal wash.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Pulse";

/*
 * Generated at build time, like every other route in a static export. Next asks for this to be
 * stated rather than inferred: a route that wants to be dynamic in a build that cannot be would
 * otherwise become a 404 on the deployed site, and a missing share card fails silently.
 */
export const dynamic = "force-static";

/** Both locales, because there is no request to read the locale from. */
export function generateStaticParams() {
  return LOCALE_CODES.map((locale) => ({ locale }));
}


export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.meta" });

  // Trim on a word boundary. A hard slice cut Vietnamese mid-syllable
  // ("người mu"), which is worse than a shorter line.
  const full = t("description");
  const lede = full.length <= 118 ? full : full.slice(0, full.lastIndexOf(" ", 118)) + "\u2026";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e1014",
          padding: 76,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -160,
            width: 680,
            height: 680,
            borderRadius: 999,
            background: "#1977F2",
            opacity: 0.14,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: "#1977F2", display: "flex" }} />
          <div style={{ color: "#1977F2", fontSize: 22, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
            Pulse
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 960 }}>
          <div style={{ color: "#ffffff", fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
            {t("title")}
          </div>
          <div style={{ color: "#9aa1ad", fontSize: 28, lineHeight: 1.4, marginTop: 28 }}>
            {lede}
          </div>
        </div>

        <div style={{ display: "flex", color: "#6b7480", fontSize: 24 }}>thepulseapi.com</div>
      </div>
    ),
    size,
  );
}

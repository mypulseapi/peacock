import { ImageResponse } from "next/og";
import { articleBySlug, articleSlugs } from "@/content/blog";
import { forEachLocale } from "@/i18n/locales";

/**
 * A real, fetchable thumbnail per article.
 *
 * SEO and AEO both want an image URL they can crawl, and an inline SVG in the
 * page is not one. Next renders this to a PNG at build time, so every article
 * has a card image on social, in search previews and wherever an answer engine
 * decides to show one, without anybody making ten images by hand or a stock
 * photo of somebody pointing at a laptop.
 *
 * Drawn from the article's own title and category so the card is recognisable
 * as that piece rather than as generic brand furniture.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Pulse";

/* Build time only: see the note in [locale]/opengraph-image.tsx. */
export const dynamic = "force-static";

export function generateStaticParams() {
  return forEachLocale(articleSlugs.map((slug) => ({ slug })));
}

const HUE: Record<string, string> = {
  grid: "#ff9d7a", rise: "#7aa2ff", split: "#ff9d7a",
  scan: "#7aa2ff", stack: "#1977F2", seal: "#1977F2",
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  const hue = a ? HUE[a.art] : "#1977F2";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "space-between", background: "#0e1014", padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* One wash in the article's own hue, so ten cards are distinguishable
            in a feed without ten different layouts. */}
        <div
          style={{
            position: "absolute", top: -180, right: -140, width: 620, height: 620,
            borderRadius: 999, background: hue, opacity: 0.16, display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: hue, display: "flex" }} />
          <div style={{ color: hue, fontSize: 22, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
            {a?.category ?? "Notes"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 940 }}>
          <div style={{ color: "#ffffff", fontSize: 58, fontWeight: 700, lineHeight: 1.12 }}>
            {a?.title ?? "Pulse"}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ color: "#9aa1ad", fontSize: 24 }}>{a?.readTime ?? ""}</div>
          <div style={{ color: "#ffffff", fontSize: 28, fontWeight: 700 }}>Pulse</div>
        </div>
      </div>
    ),
    size,
  );
}

import Image from "next/image";
import {
  Check,
  HelpCircle,
  Users,
  Image as ImageIcon,
  Scan,
  Ruler,
  Tag,
  FlaskConical,
} from "lucide-react";
import { img } from "@/lib/cdn";
import { sector } from "@/content/industries";
import { heroEvidence } from "@/content/hero-evidence";
import { renderLocale } from "@/i18n/render-locale";

/**
 * The product hero's evidence panel, built to the reference composition supplied on 2026-10-21.
 *
 * The product in the middle with its measurements called out, and three cards overlapping it: the
 * buying decision with its evidence ticked off, what to fix ranked by impact, and what the
 * business gets. It explains rather than decorates, which is the point of replacing what was here.
 *
 * What it replaced, in order: four MP4s per page at 9.5MB; a field of faint squares that told a
 * visitor nothing; and two attempts of mine at this composition that cropped the product in half
 * and ranked rows against numbers that disagreed with the ranking.
 *
 * Read it as the merchant. That is my product. That is the question my customer is asking of it.
 * Those are the facts I have, that one I never wrote down, and here is what to do about it.
 *
 * Copy comes from `content/hero-evidence.ts`, in the active locale.
 */
type Variant = "audit" | "verification" | "monitor";

const ROW_ICON = {
  image: ImageIcon,
  scan: Scan,
  ruler: Ruler,
  tag: Tag,
  flask: FlaskConical,
} as const;


export function HeroScene({ variant }: { variant: Variant }) {
  const locale = renderLocale();
  const e = heroEvidence(locale, variant);
  const s = sector(locale, e.slug);

  return (
    <div className="decision-visual">
      {/* The question, as a quiet chip above the product rather than a card beside it. */}
      <p className="decision-question">
        <span className="icon-circle">
          <Users className="size-3" aria-hidden="true" />
        </span>
        {e.question}
      </p>

      {/* The product, large, with the answers annotated onto it. */}
      <div className="product-stage">
        <Image
          className="product-image"
          src={img(e.photo)}
          alt={s?.name ?? ""}
          width={e.width}
          height={e.height}
          priority
          sizes="(min-width: 1024px) 26rem, 70vw"
        />
      </div>

      {/*
        Annotations, not a table.
        
        Each one is small, points at the product, and answers one thing: either the catalogue
        records this, or it does not. Big cards beside the product competed with it and buried it;
        a callout with an arrow reads as a note about the thing it is attached to.
      */}
      {e.evidence.map((row, i) => (
        <span
          key={row.label}
          className={`callout callout-${row.at} ${row.known ? "is-known" : "is-unknown"}`}
          style={{ "--i": i } as React.CSSProperties}
        >
          <span className="callout-mark">
            {row.known ? (
              <Check className="size-2.5" aria-hidden="true" />
            ) : (
              <HelpCircle className="size-2.5" aria-hidden="true" />
            )}
          </span>
          <span className="callout-text">
            <strong>{row.label}</strong>
            <small>{row.detail}</small>
          </span>
        </span>
      ))}

      {/* What to do about it, as one compact strip rather than a panel. */}
      <ol className="fix-strip">
        {e.recommendations.slice(0, 3).map((r, i) => {
          const Icon = ROW_ICON[r.icon];
          return (
            <li key={r.text} style={{ "--i": i } as React.CSSProperties}>
              <span className="fix-rank">{i + 1}</span>
              <Icon className="size-3 shrink-0" aria-hidden="true" />
              <span className="fix-text">{r.text}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

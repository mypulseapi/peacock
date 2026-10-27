/**
 * The agent pages' pictures (the owner's generated set, 27 Oct 2026), in place of the drawings that
 * stood in for them: a situation picture and a before and after pair for each page, the agent drawn
 * as the same friendly robot throughout.
 *
 * They are transparent, so the page's own surfaces show through and they follow the theme. Each half
 * of the pair sits on its own opaque backing, the before on `surface-1` and the after on the wash, as
 * the drawings did: the slider lays the after over the before, and without a backing the before would
 * show through the after's empty space.
 */
import Image from "next/image";
import type { ReactNode } from "react";
import { img } from "@/lib/cdn";
import type { AgentContent, AgentSlug } from "@/content/pages/agents";

/** Each page's three pictures on the CDN, named for what they show. */
const FILES: Record<
  AgentSlug,
  { situation: string; before: string; after: string }
> = {
  "shopping-assistants": {
    situation: "agents/shopping-assistant-situation-confident-guess.webp",
    before: "agents/shopping-assistant-before-guessing.webp",
    after: "agents/shopping-assistant-after-verdicts.webp",
  },
  procurement: {
    situation: "agents/procurement-agent-situation-blank-rating.webp",
    before: "agents/procurement-agent-before-brochures.webp",
    after: "agents/procurement-agent-after-spec-check.webp",
  },
  travel: {
    situation: "agents/travel-agent-situation-breakfast-not-stated.webp",
    before: "agents/travel-agent-before-assumed-amenities.webp",
    after: "agents/travel-agent-after-checked-listings.webp",
  },
  "coding-agents": {
    situation: "agents/coding-agent-situation-remembered-api.webp",
    before: "agents/coding-agent-before-from-memory.webp",
    after: "agents/coding-agent-after-reads-the-docs.webp",
  },
};

const Backing = ({
  children,
  after = false,
}: {
  children: ReactNode;
  after?: boolean;
}) => (
  <div className={`size-full ${after ? "bg-primary-wash" : "bg-surface-1"}`}>
    {children}
  </div>
);

/** Everything the agent page passes to `ChapterPage`, for one slug. */
export function agentPictures(
  slug: AgentSlug,
  alt: AgentContent["pictureAlt"],
) {
  const f = FILES[slug];
  const pair = (src: string, text: string) => (
    <Image
      src={img(src)}
      alt={text}
      width={1600}
      height={1000}
      sizes="(min-width: 1024px) 56rem, 100vw"
      className="size-full object-contain"
    />
  );
  return {
    situation: (
      <Image
        src={img(f.situation)}
        alt={alt.situation}
        width={1500}
        height={1000}
        sizes="(min-width: 1024px) 36rem, 100vw"
        className="size-full object-contain"
      />
    ),
    before: <Backing>{pair(f.before, alt.before)}</Backing>,
    after: <Backing after>{pair(f.after, alt.after)}</Backing>,
  };
}

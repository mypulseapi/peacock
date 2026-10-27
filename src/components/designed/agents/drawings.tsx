/**
 * The pictures of the four "For AI agents" pages (owner's layout A, 27 Oct 2026), drawn so the pages say
 * something before the owner's images exist, as the storefront pages do (`storefront-drawings.tsx`).
 * The image briefs for the real pictures are in the owner's mockup; each drawing is that brief's idea.
 *
 * One idea runs through all of them: options as cards, a stated fact as a line, a missing fact as an
 * amber dashed blank, and a verdict as a token: blue tick (fits), slate cross (fails), amber question
 * (cannot tell). The before and after pair share one composition so the slider wipes cleanly between
 * them. No words or figures inside, so one drawing serves both locales; all decorative
 * (`aria-hidden`), since the heading and lists beside each carry the meaning.
 */
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BedDouble,
  Braces,
  Check,
  CircleHelp,
  Cog,
  Laptop,
  X,
} from "lucide-react";
import type { AgentSlug } from "@/content/pages/agents";

const ICON: Record<AgentSlug, LucideIcon> = {
  "shopping-assistants": Laptop,
  procurement: Cog,
  travel: BedDouble,
  "coding-agents": Braces,
};

/** A situation drawing, sized like the storefront ones. */
const D = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 240 160"
    aria-hidden="true"
    className="illo-lift w-5/6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);
type Verdict = "fits" | "fails" | "unknown";
const TOKEN: Record<Verdict, { I: LucideIcon; ring: string; ink: string }> = {
  fits: { I: Check, ring: "fill-card stroke-primary", ink: "text-primary" },
  fails: { I: X, ring: "fill-card stroke-baseline", ink: "text-baseline" },
  unknown: {
    I: CircleHelp,
    ring: "fill-gap-fill stroke-gap",
    ink: "text-gap-strong",
  },
};
const Tok = ({
  x,
  y,
  v,
  r = 11,
}: {
  x: number;
  y: number;
  v: Verdict;
  r?: number;
}) => {
  const { I, ring, ink } = TOKEN[v];
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={r}
        className={ring}
        strokeWidth="1.5"
        strokeDasharray={v === "unknown" ? "3 2" : undefined}
      />
      <I
        x={x - r * 0.6}
        y={y - r * 0.6}
        width={r * 1.2}
        height={r * 1.2}
        className={ink}
        strokeWidth={2.4}
      />
    </g>
  );
};

/** An option: a card with its kind's icon, two stated lines and a third that may be blank. */
const Option = ({
  x,
  y,
  I,
  blank = false,
  dim = false,
}: {
  x: number;
  y: number;
  I: LucideIcon;
  blank?: boolean;
  dim?: boolean;
}) => (
  <g opacity={dim ? 0.45 : 1}>
    <rect
      x={x}
      y={y}
      width="56"
      height="72"
      rx="9"
      className="fill-card stroke-line"
      strokeWidth="1.5"
    />
    <I
      x={x + 17}
      y={y + 10}
      width={22}
      height={22}
      className="text-baseline"
      strokeWidth={1.8}
    />
    <rect
      x={x + 10}
      y={y + 40}
      width="36"
      height="5"
      rx="2.5"
      className="fill-baseline/40"
    />
    <rect
      x={x + 10}
      y={y + 50}
      width="28"
      height="5"
      rx="2.5"
      className="fill-baseline/40"
    />
    {blank ? (
      <rect
        x={x + 9}
        y={y + 58.5}
        width="38"
        height="8"
        rx="3"
        className="fill-gap-fill stroke-gap"
        strokeWidth="1.2"
        strokeDasharray="3 2"
      />
    ) : (
      <rect
        x={x + 10}
        y={y + 60}
        width="32"
        height="5"
        rx="2.5"
        className="fill-baseline/40"
      />
    )}
  </g>
);

/** The agent's speech bubble, pointing down at the middle option. */
const Bubble = ({ children }: { children?: ReactNode }) => (
  <g>
    <path
      d="M98 14h44a10 10 0 0 1 10 10v14a10 10 0 0 1-10 10h-14l-8 8-8-8H98a10 10 0 0 1-10-10V24a10 10 0 0 1 10-10Z"
      className="fill-card stroke-line"
      strokeWidth="1.5"
    />
    {children}
  </g>
);

/* ---------------------------------------------------------------- the pair */

/** Before: the agent says yes to the option whose deciding fact is blank; the others drop away. */
const Before = ({ I }: { I: LucideIcon }) => (
  <D>
    <Bubble>
      <Check
        x={111}
        y={20}
        width={18}
        height={18}
        className="text-baseline"
        strokeWidth={2.6}
      />
    </Bubble>
    <Option x={34} y={72} I={I} dim />
    <Option x={92} y={72} I={I} blank />
    <Option x={150} y={72} I={I} dim />
  </D>
);
/** After: the same three options, each with its verdict, and the blank named rather than filled. */
const After = ({ I }: { I: LucideIcon }) => (
  <D>
    <Bubble>
      <CircleHelp
        x={111}
        y={20}
        width={18}
        height={18}
        className="text-gap-strong"
        strokeWidth={2.4}
      />
    </Bubble>
    <Option x={34} y={72} I={I} />
    <Option x={92} y={72} I={I} blank />
    <Option x={150} y={72} I={I} />
    <Tok x={62} y={150} v="fits" r={9} />
    <Tok x={120} y={150} v="unknown" r={9} />
    <Tok x={178} y={150} v="fails" r={9} />
  </D>
);
/** The pair fills the slider's frame: before on the slate ground, after on the blue wash. */
const Frame = ({
  children,
  after = false,
}: {
  children: ReactNode;
  after?: boolean;
}) => (
  <div
    className={`grid size-full place-items-center ${after ? "bg-primary-wash" : "bg-surface-1"}`}
  >
    {children}
  </div>
);

/* ------------------------------------------------------------ situation */

/** One listing with a blank where the deciding fact should be, and a confident yes pointed at it. */
const Situation = ({ I }: { I: LucideIcon }) => (
  <D>
    <rect
      x="92"
      y="34"
      width="104"
      height="100"
      rx="12"
      className="fill-card stroke-line"
      strokeWidth="1.5"
    />
    <I
      x={128}
      y={46}
      width={32}
      height={32}
      className="text-baseline"
      strokeWidth={1.6}
    />
    <rect
      x="108"
      y="90"
      width="72"
      height="6"
      rx="3"
      className="fill-baseline/40"
    />
    <rect
      x="108"
      y="102"
      width="56"
      height="6"
      rx="3"
      className="fill-baseline/40"
    />
    <rect
      x="106"
      y="113"
      width="76"
      height="12"
      rx="4"
      className="fill-gap-fill stroke-gap"
      strokeWidth="1.4"
      strokeDasharray="4 3"
    />
    <path
      d="M24 40h44a10 10 0 0 1 10 10v12a10 10 0 0 1-10 10H58l18 46-30-46H24a10 10 0 0 1-10-10V50a10 10 0 0 1 10-10Z"
      className="fill-card stroke-line"
      strokeWidth="1.5"
    />
    <Check
      x={37}
      y={46}
      width={20}
      height={20}
      className="text-baseline"
      strokeWidth={2.6}
    />
  </D>
);

/** Everything the agent page passes to `ChapterPage`, for one slug. */
export function agentDrawings(slug: AgentSlug) {
  const I = ICON[slug];
  return {
    situation: <Situation I={I} />,
    before: (
      <Frame>
        <Before I={I} />
      </Frame>
    ),
    after: (
      <Frame after>
        <After I={I} />
      </Frame>
    ),
  };
}

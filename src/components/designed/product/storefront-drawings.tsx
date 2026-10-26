/**
 * One drawing per step and per gain on the five storefront product pages (owner, 26 Oct 2026: "show,
 * don't tell", DESIGN.md principle 5). Each says its own idea through objects rather than a screen: a
 * fork in the path for the held-back share, a safety net for the fallback, a magnifying glass for search.
 * They are the concepts of the image briefs (scratch `storefront-image-prompts`), drawn here so the pages
 * say something before the owner's images exist, and so they follow the theme and read in both locales.
 *
 * Token colours with one meaning each: blue for what Pulse does, slate for the shop's own or held-back
 * state, amber only for something missing. No words or figures inside; all decorative (`aria-hidden`),
 * since the title and sentence beside each carry the meaning.
 */
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Eye,
  Search,
  Funnel,
  ShoppingCart,
  ShoppingBag,
  Plug,
  BookOpen,
  Camera,
  Star,
} from "lucide-react";

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
/** Gains sit in `GainsCards`' 3:2 box, which expects its picture to fill it. */
const G = ({ children }: { children: ReactNode }) => (
  <div className="grid size-full place-items-center">
    <D>{children}</D>
  </div>
);

type Tone = "on" | "hold" | "plain";
const TILE: Record<Tone, string> = {
  on: "fill-primary-tint stroke-primary",
  hold: "fill-surface-1 stroke-baseline",
  plain: "fill-surface-1 stroke-line",
};
const Tile = ({
  x,
  y,
  s = 18,
  t = "plain",
}: {
  x: number;
  y: number;
  s?: number;
  t?: Tone;
}) => (
  <rect
    x={x}
    y={y}
    width={s}
    height={s}
    rx="4"
    className={TILE[t]}
    strokeWidth="1.5"
    strokeDasharray={t === "hold" ? "3 3" : undefined}
  />
);
const Card = ({
  x,
  y,
  w,
  h,
  r = 10,
  c = "fill-card",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  c?: string;
}) => (
  <rect
    x={x}
    y={y}
    width={w}
    height={h}
    rx={r}
    className={`${c} stroke-line`}
    strokeWidth="1.5"
  />
);
/** A round token carrying one icon: a signal, a bag, a plug. */
const Tok = ({
  x,
  y,
  I,
  r = 12,
  t = "on",
}: {
  x: number;
  y: number;
  I: LucideIcon;
  r?: number;
  t?: "on" | "hold";
}) => (
  <g>
    <circle
      cx={x}
      cy={y}
      r={r}
      className={
        t === "on" ? "fill-card stroke-primary" : "fill-card stroke-baseline"
      }
      strokeWidth="1.5"
    />
    <I
      x={x - r * 0.55}
      y={y - r * 0.55}
      width={r * 1.1}
      height={r * 1.1}
      className={t === "on" ? "text-primary" : "text-baseline"}
      strokeWidth={2}
    />
  </g>
);
/** A row of product tiles on a shelf board. */
const Shelf = ({
  x,
  y,
  n = 4,
  tones = [] as Tone[],
  s = 18,
  gap = 6,
}: {
  x: number;
  y: number;
  n?: number;
  tones?: Tone[];
  s?: number;
  gap?: number;
}) => (
  <g>
    {Array.from({ length: n }, (_, i) => (
      <Tile key={i} x={x + i * (s + gap)} y={y} s={s} t={tones[i] ?? "plain"} />
    ))}
    <path
      d={`M${x - 4} ${y + s + 4}h${n * (s + gap) + 4}`}
      className="stroke-baseline/50"
      strokeWidth="3"
    />
  </g>
);
/** A small shop: walls, roof, door, window. */
const Shop = ({ x, y, w = 96 }: { x: number; y: number; w?: number }) => (
  <g>
    <path
      d={`M${x - 6} ${y}l${w / 2 + 6} -26l${w / 2 + 6} 26z`}
      className="fill-surface-1 stroke-line"
      strokeWidth="1.5"
    />
    <rect
      x={x}
      y={y}
      width={w}
      height="64"
      rx="4"
      className="fill-card stroke-line"
      strokeWidth="1.5"
    />
    <rect
      x={x + 10}
      y={y + 12}
      width={w * 0.45}
      height="26"
      rx="3"
      className="fill-surface-1"
    />
    <rect
      x={x + w * 0.62}
      y={y + 26}
      width={w * 0.26}
      height="38"
      rx="3"
      className="fill-surface-1 stroke-line"
      strokeWidth="1.5"
    />
  </g>
);
const Bars = ({
  x,
  y,
  w = 60,
  rows = [1, 0.7, 0.5, 0.3],
}: {
  x: number;
  y: number;
  w?: number;
  rows?: number[];
}) => (
  <g>
    {rows.map((v, i) => (
      <g key={i}>
        <rect
          x={x}
          y={y + i * 10}
          width={w}
          height="5"
          rx="2.5"
          className="fill-surface-1"
        />
        <rect
          x={x}
          y={y + i * 10}
          width={w * v}
          height="5"
          rx="2.5"
          className="fill-primary"
        />
      </g>
    ))}
  </g>
);
const Line = ({
  d,
  c = "stroke-primary",
  w = 2.5,
}: {
  d: string;
  c?: string;
  w?: number;
}) => <path d={d} className={`fill-none ${c}`} strokeWidth={w} />;

/* ------------------------------------------------------------ shared ideas */

/** Footprints of one visit, signals dropped along the way, ending at a shelf that reorders. */
const Trail = () => (
  <D>
    {[20, 40, 60, 80, 100].map((x, i) => (
      <ellipse
        key={x}
        cx={x}
        cy={i % 2 ? 128 : 136}
        rx="5"
        ry="3"
        className="fill-baseline/40"
      />
    ))}
    <Tok x={34} y={102} I={Eye} />
    <Tok x={66} y={96} I={Search} />
    <Tok x={98} y={102} I={Funnel} />
    <Line d="M110 120 C140 120 140 76 150 76" />
    <Card x={148} y={40} w={80} h={70} />
    <Shelf x={158} y={52} n={3} tones={["on"]} />
    <Shelf x={158} y={80} n={3} />
    <path
      d="M167 50v-12m-5 5l5-5 5 5"
      className="fill-none stroke-primary"
      strokeWidth="2"
    />
  </D>
);
/** A path that forks: most go the blue way to a reordered shelf, a few the grey way to the shelf as it was. */
const Fork = () => (
  <D>
    <path d="M20 80h50" className="stroke-line" strokeWidth="10" />
    <path
      d="M70 80C100 80 104 44 136 44h28"
      className="fill-none stroke-primary/30"
      strokeWidth="10"
    />
    <path
      d="M70 80C100 80 104 116 136 116h28"
      className="fill-none stroke-baseline/30"
      strokeWidth="6"
    />
    <Tok x={34} y={80} I={ShoppingBag} r={10} />
    <Tok x={112} y={52} I={ShoppingBag} r={10} />
    <Tok x={112} y={112} I={ShoppingBag} r={10} t="hold" />
    <Card x={166} y={22} w={64} h={42} />
    <Shelf x={174} y={32} n={2} tones={["on", "on"]} s={16} gap={8} />
    <Card x={166} y={96} w={64} h={42} />
    <Shelf x={174} y={106} n={2} tones={["hold", "hold"]} s={16} gap={8} />
  </D>
);
/** Two identical shelves under two domes: one tended, one left as it was. */
const Domes = () => (
  <>
    {[0, 1].map((k) => (
      <g key={k}>
        <path
          d={`M${30 + k * 100} 120 v-44 a40 40 0 0 1 80 0 v44`}
          className="fill-card/60 stroke-line"
          strokeWidth="1.5"
        />
        <Shelf
          x={44 + k * 100}
          y={92}
          n={3}
          s={14}
          gap={5}
          tones={k ? ["hold", "hold", "hold"] : ["on", "on", "on"]}
        />
        <rect
          x={24 + k * 100}
          y={120}
          width="92"
          height="8"
          rx="3"
          className="fill-surface-1 stroke-line"
          strokeWidth="1.5"
        />
      </g>
    ))}
  </>
);
/** A safety net: a tile slips off the blue wire and lands, still on display, in the shop's own order. */
const Net = () => (
  <>
    <path d="M20 46h200" className="stroke-primary" strokeWidth="2.5" />
    <Tile x={150} y={26} t="on" />
    <path
      d="M150 64c-6 10-4 22 4 34"
      className="fill-none stroke-baseline"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />
    <path
      d="M40 110c40 26 120 26 160 0"
      className="fill-none stroke-baseline"
      strokeWidth="2"
    />
    {[60, 90, 120, 150, 180].map((x) => (
      <path
        key={x}
        d={`M${x} 112 l${x < 120 ? 6 : -6} 14`}
        className="stroke-baseline/50"
        strokeWidth="1.5"
      />
    ))}
    <Tile x={140} y={104} t="hold" />
    <Tile x={92} y={104} t="hold" />
  </>
);
/** A spotlight dims, and the shop's own display stays in place. */
const Spotlight = () => (
  <>
    <path d="M120 18l-46 104h92z" className="fill-primary/10" />
    <circle cx="120" cy="18" r="9" className="fill-baseline" />
    <Card x={54} y={104} w={132} h={36} />
    <Shelf
      x={66}
      y={112}
      n={4}
      s={16}
      gap={14}
      tones={["hold", "hold", "hold", "hold"]}
    />
  </>
);

/* ------------------------------------------------------------ pages */

export const STOREFRONT_DRAWINGS: Record<
  string,
  { steps: ReactNode[]; gains: ReactNode[] }
> = {
  "decision-api": {
    steps: [
      <D key="s1">
        <Shop x={46} y={70} />
        <rect
          x={144}
          y={92}
          width="34"
          height="30"
          rx="7"
          className="fill-primary"
        />
        <Plug
          x={151}
          y={99}
          width={20}
          height={16}
          className="text-on-primary"
          strokeWidth={2}
        />
        <path d="M144 107h-4" className="stroke-primary" strokeWidth="3" />
        <path
          d="M188 104l10-6m-10 14l10 6"
          className="stroke-primary/50"
          strokeWidth="2"
        />
      </D>,
      <Trail key="s2" />,
      <Fork key="s3" />,
    ],
    gains: [
      <G key="g1">
        <Shop x={40} y={74} w={90} />
        <rect
          x={150}
          y={96}
          width="24"
          height="22"
          rx="6"
          className="fill-primary"
        />
        <Plug
          x={155}
          y={100}
          width={14}
          height={14}
          className="text-on-primary"
          strokeWidth={2}
        />
        <rect
          x={186}
          y={92}
          width="36"
          height="20"
          rx="10"
          className="fill-surface-1 stroke-line"
          strokeWidth="1.5"
        />
        <circle cx="212" cy="102" r="7" className="fill-primary" />
      </G>,
      <G key="g2">
        <rect
          x={40}
          y={56}
          width="70"
          height="72"
          rx="8"
          className="fill-primary-tint stroke-primary"
          strokeWidth="1.5"
        />
        <path
          d="M60 56v-10h30v10"
          className="fill-none stroke-primary"
          strokeWidth="1.5"
        />
        <path
          d="M110 70c14 0 20 6 26 12"
          className="fill-none stroke-baseline"
          strokeWidth="1.5"
        />
        <Card x={132} y={58} w={80} h={66} />
        <Bars x={142} y={72} w={60} />
      </G>,
      <G key="g3">
        <Domes />
      </G>,
      <G key="g4">
        <Net />
      </G>,
    ],
  },
  search: {
    steps: [
      <D key="s1">
        {[0, 1, 2, 3].map((k) => (
          <path
            key={k}
            d={`M10 ${118 + k * 9} q15 -6 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0`}
            className="fill-none stroke-sky/40"
            strokeWidth="1.5"
          />
        ))}
        <path
          d="M70 30 L120 110 L170 30"
          className="fill-none stroke-baseline"
          strokeWidth="1.5"
        />
        <path
          d="M84 52h72M96 72h48M108 92h24"
          className="stroke-baseline/40"
          strokeWidth="1.5"
        />
        <Tile x={92} y={60} s={16} />
        <Tile x={112} y={50} s={16} />
        <Tile x={128} y={66} s={16} />
        <Tile x={108} y={80} s={16} />
        <path d="M120 30v-18" className="stroke-baseline" strokeWidth="2" />
      </D>,
      <D key="s2">
        <path
          d="M120 40v86M84 132h72"
          className="stroke-baseline/60"
          strokeWidth="4"
        />
        <path d="M44 66 L196 46" className="stroke-baseline" strokeWidth="4" />
        <path
          d="M44 66l-14 30h28zM196 46l-14 30h28z"
          className="fill-none stroke-line"
          strokeWidth="1.5"
        />
        <Tile x={34} y={70} s={14} />
        <Tile x={180} y={46} s={14} t="on" />
        <Tile x={198} y={50} s={14} t="on" />
        <Tok x={164} y={20} I={Eye} r={9} />
        <Tok x={188} y={14} I={Search} r={9} />
        <Tok x={212} y={22} I={Funnel} r={9} />
      </D>,
      <D key="s3">
        {[0, 1].map((k) =>
          [0, 1, 2, 3].map((i) => (
            <rect
              key={`${k}${i}`}
              x={40 + k * 92 + i * 3}
              y={40 + i * 18}
              width="70"
              height="24"
              rx="5"
              className={
                k === 0 && i === 0
                  ? "fill-primary-tint stroke-primary"
                  : k === 0
                    ? "fill-card stroke-line"
                    : "fill-surface-1 stroke-baseline"
              }
              strokeWidth="1.5"
            />
          )),
        )}
        <path
          d="M122 30v100"
          className="stroke-line"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      </D>,
    ],
    gains: [
      <G key="g1">
        <path
          d="M20 60c20-20 40 20 60 0s30-14 40 0"
          className="fill-none stroke-primary"
          strokeWidth="6"
        />
        <rect
          x={118}
          y={54}
          width="18"
          height="18"
          rx="3"
          className="fill-primary"
        />
        <circle cx={152} cy={62} r={9} className="fill-sky" />
        <path d="M168 54l10 16h-20z" className="fill-primary/60" />
        <Card x={124} y={92} w={88} h={44} />
        <rect
          x={134}
          y={104}
          width="18"
          height="18"
          rx="3"
          className="fill-none stroke-primary"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <circle
          cx={168}
          cy={113}
          r={9}
          className="fill-none stroke-sky"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <path
          d="M194 104l10 16h-20z"
          className="fill-none stroke-primary/60"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
      </G>,
      <G key="g2">
        <path
          d="M120 44v86M84 134h72"
          className="stroke-baseline/60"
          strokeWidth="4"
        />
        <path d="M50 58h140" className="stroke-baseline" strokeWidth="4" />
        <rect
          x={34}
          y={70}
          width="32"
          height="30"
          rx="6"
          className="fill-primary-tint stroke-primary"
          strokeWidth="1.5"
        />
        {[
          [150, 82, 12],
          [164, 78, 16],
          [182, 74, 20],
          [150, 96, 10],
          [162, 94, 14],
          [178, 90, 18],
        ].map(([x, y, s], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width={s}
            height={s}
            rx="3"
            className={i % 2 ? "fill-sky" : "fill-primary"}
          />
        ))}
      </G>,
      <G key="g3">
        <rect
          x={56}
          y={70}
          width="128"
          height="62"
          rx="8"
          className="fill-surface-1 stroke-line"
          strokeWidth="1.5"
        />
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={70 + i * 6}
            y={50 + i * 4}
            width="88"
            height="40"
            rx="5"
            className="fill-card stroke-line"
            strokeWidth="1.5"
          />
        ))}
        <rect
          x={88}
          y={34}
          width="88"
          height="40"
          rx="5"
          className="fill-card stroke-primary"
          strokeWidth="1.5"
        />
        <Bars x={98} y={44} w={40} rows={[1, 0.6]} />
        <circle cx={160} cy={58} r={9} className="fill-primary" />
        <path
          d="M156 58l3 3 5-6"
          className="fill-none stroke-on-primary"
          strokeWidth="2"
        />
      </G>,
      <G key="g4">
        <path
          d="M20 66h200M20 112h200"
          className="stroke-line"
          strokeWidth="1.5"
        />
        <path
          d="M20 89h200"
          className="stroke-line"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        <path d="M52 56v66" className="stroke-ink/40" strokeWidth="3" />
        <Tok x={70} y={77} I={Star} r={9} />
        <Tok x={70} y={101} I={Star} r={9} t="hold" />
        <path
          d="M200 56v66"
          className="stroke-ink/20"
          strokeWidth="3"
          strokeDasharray="4 4"
        />
      </G>,
    ],
  },
  recommendations: {
    steps: [
      <D key="s1">
        {[40, 60, 80, 100, 120].map((x, i) => (
          <ellipse
            key={x}
            cx={x}
            cy={i % 2 ? 132 : 140}
            rx="5"
            ry="3"
            className="fill-baseline/40"
          />
        ))}
        <Tok x={150} y={104} I={Eye} r={11} />
        <Tok x={168} y={70} I={Search} r={11} />
        <Tok x={190} y={42} I={Funnel} r={11} />
        <Tok x={204} y={100} I={ShoppingCart} r={11} />
        <path
          d="M128 132c20-6 30-20 34-30"
          className="fill-none stroke-primary/40"
          strokeWidth="2"
          strokeDasharray="3 4"
        />
      </D>,
      <D key="s2">
        <rect
          x={20}
          y={100}
          width="200"
          height="16"
          rx="8"
          className="fill-surface-1 stroke-line"
          strokeWidth="1.5"
        />
        {[34, 70, 106, 142, 178].map((x) => (
          <circle
            key={x}
            cx={x + 8}
            cy={108}
            r="4"
            className="fill-baseline/50"
          />
        ))}
        <Tile x={34} y={78} />
        <Tile x={62} y={78} />
        <Tile x={150} y={78} t="on" />
        <Tile x={178} y={78} t="on" />
        <path
          d="M120 24v30l-14 20"
          className="fill-none stroke-primary"
          strokeWidth="4"
        />
        <circle cx={120} cy={24} r={8} className="fill-primary" />
      </D>,
      <D key="s3">
        <rect
          x={30}
          y={36}
          width="110"
          height="70"
          rx="8"
          className="fill-card stroke-primary"
          strokeWidth="2"
        />
        <Shelf
          x={44}
          y={60}
          n={4}
          s={16}
          gap={8}
          tones={["on", "on", "on", "on"]}
        />
        <Tok x={150} y={34} I={Camera} r={12} />
        <path
          d="M150 60c10 30 20 40 34 46"
          className="fill-none stroke-baseline"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <rect
          x={168}
          y={98}
          width="52"
          height="40"
          rx="5"
          className="fill-surface-1 stroke-line"
          strokeWidth="1.5"
        />
        <rect
          x={176}
          y={92}
          width="52"
          height="40"
          rx="5"
          className="fill-card stroke-line"
          strokeWidth="1.5"
        />
      </D>,
    ],
    gains: [
      <G key="g1">
        <path
          d="M30 120l44-10 44 10V60l-44-10-44 10z"
          className="fill-card stroke-line"
          strokeWidth="1.5"
        />
        <path d="M74 50v60" className="stroke-line" strokeWidth="1.5" />
        <BookOpen
          x={54}
          y={70}
          width={40}
          height={30}
          className="text-baseline/40"
          strokeWidth={1.5}
        />
        <Card x={132} y={60} w={88} h={56} />
        <Shelf x={142} y={74} n={3} s={18} gap={8} tones={["on", "on", "on"]} />
      </G>,
      <G key="g2">
        {[0, 1, 2, 3].map((k) => (
          <g key={k}>
            <rect
              x={18 + k * 56}
              y={70}
              width="48"
              height="58"
              rx="6"
              className="fill-card stroke-line"
              strokeWidth="1.5"
            />
            <rect
              x={24 + k * 56}
              y={100}
              width="36"
              height="12"
              rx="3"
              className="fill-primary-tint stroke-primary"
              strokeWidth="1.5"
            />
          </g>
        ))}
        <rect
          x={96}
          y={26}
          width="48"
          height="16"
          rx="4"
          className="fill-primary"
        />
        <path
          d="M120 44v20"
          className="stroke-primary"
          strokeWidth="2"
          strokeDasharray="3 3"
        />
      </G>,
      <G key="g3">
        <circle cx={120} cy={80} r={22} className="fill-primary" />
        <circle cx={120} cy={80} r={8} className="fill-card" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <rect
            key={a}
            x={116}
            y={52}
            width="8"
            height="10"
            rx="2"
            className="fill-primary"
            transform={`rotate(${a} 120 80)`}
          />
        ))}
        <Line d="M98 80H48" c="stroke-primary/40" w={8} />
        <Line d="M142 80h50" c="stroke-primary/40" w={8} />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={18}
            y={48 + i * 22}
            width="28"
            height="16"
            rx="3"
            className="fill-card stroke-primary"
            strokeWidth="1.5"
          />
        ))}
        <Shelf x={196} y={72} n={1} s={18} tones={["on"]} />
        <Tile x={196} y={46} t="on" />
        <Tile x={196} y={98} t="on" />
      </G>,
      <G key="g4">
        <Spotlight />
      </G>,
    ],
  },
  pages: {
    steps: [
      <D key="s1">
        <rect
          x={40}
          y={60}
          width="74"
          height="58"
          rx="6"
          className="fill-surface-1 stroke-line"
          strokeWidth="1.5"
        />
        <path
          d="M40 76h74M77 60v16"
          className="stroke-line"
          strokeWidth="1.5"
        />
        <path d="M114 72l26-8" className="stroke-baseline" strokeWidth="1.5" />
        <rect
          x={138}
          y={50}
          width="54"
          height="34"
          rx="6"
          className="fill-card stroke-primary"
          strokeWidth="1.5"
        />
        <circle cx={150} cy={58} r="3" className="fill-primary" />
        <rect
          x={146}
          y={66}
          width="16"
          height="10"
          rx="2"
          className="fill-primary"
        />
        <circle cx={176} cy={71} r="6" className="fill-sky" />
        <rect
          x={200}
          y={44}
          width="24"
          height="90"
          rx="4"
          className="fill-card stroke-line"
          strokeWidth="1.5"
        />
        <circle cx={204} cy={92} r="2.5" className="fill-baseline" />
      </D>,
      <D key="s2">
        <rect
          x={40}
          y={20}
          width="160"
          height="120"
          rx="10"
          className="fill-surface-1 stroke-line"
          strokeWidth="1.5"
        />
        {Array.from({ length: 12 }, (_, i) => {
          const c = i % 4,
            r = Math.floor(i / 4);
          const ahead = c >= 2;
          return (
            <Tile
              key={i}
              x={52 + c * 37}
              y={30 + r * 36}
              s={30}
              t={ahead && r === 0 ? "on" : "plain"}
            />
          );
        })}
        <Tok x={110} y={84} I={Eye} r={11} />
        <path
          d="M124 84h18m-6-6l6 6-6 6"
          className="fill-none stroke-primary"
          strokeWidth="2"
        />
      </D>,
      <D key="s3">
        {[0, 1].map((k) => (
          <g key={k}>
            <path
              d={`M${30 + k * 100} 130 l20 -90 h40 l20 90z`}
              className={
                k
                  ? "fill-surface-1 stroke-baseline"
                  : "fill-primary-tint stroke-primary"
              }
              strokeWidth="1.5"
            />
            <Shelf
              x={52 + k * 100}
              y={60}
              n={2}
              s={14}
              gap={10}
              tones={k ? ["hold", "hold"] : ["on", "on"]}
            />
          </g>
        ))}
        <rect
          x={168}
          y={120}
          width="24"
          height="18"
          rx="2"
          className="fill-card stroke-baseline"
          strokeWidth="1.5"
        />
        <path d="M180 120v18" className="stroke-baseline" strokeWidth="1.5" />
      </D>,
    ],
    gains: [
      <G key="g1">
        {[
          [20, 40, 92, 44],
          [124, 40, 96, 44],
          [20, 96, 60, 44],
          [92, 96, 128, 44],
        ].map(([x, y, w, h], k) => (
          <g key={k}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              rx="8"
              className="fill-card stroke-line"
              strokeWidth="1.5"
            />
            <Shelf
              x={x + 8}
              y={y + 10}
              n={Math.max(2, Math.floor((w - 8) / 22))}
              s={14}
              gap={8}
              tones={["on", "on", "on", "on", "on"]}
            />
          </g>
        ))}
      </G>,
      <G key="g2">
        <rect
          x={22}
          y={34}
          width="62"
          height="80"
          rx="4"
          className="fill-card stroke-line"
          strokeWidth="1.5"
        />
        <rect
          x={30}
          y={44}
          width="46"
          height="34"
          rx="3"
          className="fill-sky/40"
        />
        <circle cx={53} cy={30} r="5" className="fill-primary" />
        <path
          d="M53 30 C110 10 130 60 148 64"
          className="fill-none stroke-primary"
          strokeWidth="2"
        />
        <Card x={140} y={58} w={84} h={74} />
        <Shelf x={150} y={66} n={3} s={16} gap={8} tones={["on", "on", "on"]} />
        <Shelf x={150} y={100} n={3} s={16} gap={8} />
      </G>,
      <G key="g3">
        {[0, 1].map((k) => (
          <g key={k}>
            <rect
              x={20 + k * 110}
              y={36}
              width="90"
              height="92"
              rx="8"
              className="fill-card stroke-line"
              strokeWidth="1.5"
            />
            <rect
              x={30 + k * 110}
              y={46}
              width="70"
              height="10"
              rx="3"
              className="fill-surface-1"
            />
            {[0, 1, 2, 3].map((i) => (
              <Tile
                key={i}
                x={30 + k * 110 + (i % 2) * 38}
                y={64 + Math.floor(i / 2) * 32}
                s={28}
                t={(k ? [3, 0, 1, 2] : [0, 1, 2, 3])[i] === 0 ? "on" : "plain"}
              />
            ))}
          </g>
        ))}
      </G>,
      <G key="g4">
        {[0, 1, 2].map((k) => (
          <g key={k}>
            <rect
              x={36 + k * 62}
              y={44}
              width="44"
              height="64"
              rx="5"
              className="fill-surface-1 stroke-baseline/50"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              transform={`translate(8 10)`}
            />
            <rect
              x={36 + k * 62}
              y={44}
              width="44"
              height="64"
              rx="5"
              className="fill-card stroke-line"
              strokeWidth="1.5"
            />
            <rect
              x={42 + k * 62}
              y={52}
              width="32"
              height="12"
              rx="3"
              className="fill-primary-tint stroke-primary"
              strokeWidth="1.5"
            />
          </g>
        ))}
      </G>,
    ],
  },
  "merchandising-studio": {
    steps: [
      <D key="s1">
        <rect
          x={34}
          y={24}
          width="172"
          height="80"
          rx="6"
          className="fill-card stroke-line"
          strokeWidth="1.5"
        />
        {[0, 1].map((r) => (
          <g key={r}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect
                key={i}
                x={44 + i * 26}
                y={32 + r * 36}
                width="20"
                height="28"
                rx="3"
                className={
                  i === 2 && r === 0
                    ? "fill-primary-tint stroke-primary"
                    : "fill-surface-1 stroke-line"
                }
                strokeWidth="1.5"
              />
            ))}
            <path
              d={`M38 ${62 + r * 36}h164`}
              className="stroke-baseline/50"
              strokeWidth="3"
            />
          </g>
        ))}
        <rect
          x={74}
          y={110}
          width="92"
          height="28"
          rx="4"
          className="fill-surface-1 stroke-line"
          strokeWidth="1.5"
        />
        <rect
          x={84}
          y={104}
          width="72"
          height="14"
          rx="2"
          className="fill-card stroke-line"
          strokeWidth="1.5"
        />
      </D>,
      <D key="s2">
        <path d="M20 64h200" className="stroke-primary/40" strokeWidth="16" />
        <path
          d="M120 70v30c0 20 20 30 60 30h40"
          className="fill-none stroke-baseline/40"
          strokeWidth="7"
        />
        <circle
          cx={120}
          cy={64}
          r={16}
          className="fill-card stroke-primary"
          strokeWidth="2"
        />
        <path
          d="M110 64h20M120 54v20"
          className="stroke-primary"
          strokeWidth="3"
        />
      </D>,
      <D key="s3">
        <rect
          x={60}
          y={20}
          width="96"
          height="124"
          rx="6"
          className="fill-card stroke-line"
          strokeWidth="1.5"
        />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={68}
            y={30 + i * 38}
            width="80"
            height="30"
            rx="4"
            className="fill-surface-1 stroke-line"
            strokeWidth="1.5"
          />
        ))}
        <rect
          x={68}
          y={68}
          width="104"
          height="30"
          rx="4"
          className="fill-card stroke-primary"
          strokeWidth="1.5"
        />
        <rect
          x={150}
          y={36}
          width="70"
          height="56"
          rx="5"
          className="fill-card stroke-primary"
          strokeWidth="1.5"
        />
        <Bars x={160} y={46} w={50} rows={[0.9, 0.6, 0.4]} />
      </D>,
    ],
    gains: [
      <G key="g1">
        {[0, 1, 2].map((r) => (
          <g key={r}>
            <rect
              x={24}
              y={34 + r * 34}
              width="40"
              height="26"
              rx="4"
              className="fill-surface-1 stroke-line"
              strokeWidth="1.5"
            />
            {[0, 1, 2, 3].map((c) => (
              <rect
                key={c}
                x={80 + c * 36}
                y={40 + r * 34}
                width="28"
                height="14"
                rx="3"
                className={
                  c === 1
                    ? "fill-primary-tint stroke-primary"
                    : "fill-card stroke-line"
                }
                strokeWidth="1.5"
              />
            ))}
          </g>
        ))}
      </G>,
      <G key="g2">
        {[0, 1, 2].map((r) => (
          <g key={r}>
            <rect
              x={28}
              y={34 + r * 36}
              width="34"
              height="26"
              rx="4"
              className="fill-primary-tint stroke-primary"
              strokeWidth="1.5"
            />
            <path
              d={`M62 ${47 + r * 36} C110 ${47 + r * 36} 120 ${50 + ((r + 1) % 3) * 30} 160 ${50 + ((r + 1) % 3) * 30}`}
              className={`fill-none ${["stroke-primary", "stroke-sky", "stroke-baseline"][r]}`}
              strokeWidth="1.5"
            />
          </g>
        ))}
        {[0, 1, 2].map((g) => (
          <g key={g}>
            {[0, 1, 2].map((p) => (
              <circle
                key={p}
                cx={168 + p * 16}
                cy={50 + g * 30}
                r="6"
                className={
                  ["fill-primary", "fill-sky", "fill-baseline"][(g + 2) % 3]
                }
              />
            ))}
          </g>
        ))}
      </G>,
      <G key="g3">
        <path d="M20 70h200" className="stroke-primary/40" strokeWidth="14" />
        <path
          d="M110 76c10 26 30 40 60 40h50"
          className="fill-none stroke-baseline/40"
          strokeWidth="8"
        />
        <path d="M110 46v48" className="stroke-ink/40" strokeWidth="3" />
        <path d="M110 70l26 30" className="stroke-baseline" strokeWidth="4" />
        <rect
          x={60}
          y={128}
          width="120"
          height="8"
          rx="4"
          className="fill-surface-1 stroke-line"
          strokeWidth="1.5"
        />
        <circle cx={92} cy={132} r="8" className="fill-primary" />
      </G>,
      <G key="g4">
        <path
          d="M30 120l90-14 90 14V44l-90-14-90 14z"
          className="fill-card stroke-line"
          strokeWidth="1.5"
        />
        <path d="M120 30v76" className="stroke-line" strokeWidth="1.5" />
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={40}
            y={50 + i * 14}
            width="66"
            height="6"
            rx="3"
            className={i === 2 ? "fill-primary" : "fill-surface-1"}
          />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={134}
            y={50 + i * 14}
            width="66"
            height="6"
            rx="3"
            className="fill-surface-1"
          />
        ))}
        <circle
          cx={92}
          cy={88}
          r={16}
          className="fill-card/40 stroke-primary"
          strokeWidth="2.5"
        />
        <path d="M104 100l14 14" className="stroke-primary" strokeWidth="4" />
      </G>,
    ],
  },
};

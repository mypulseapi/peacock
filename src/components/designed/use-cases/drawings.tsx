/**
 * The use-case pages' pictures (owner, 27 Oct 2026): a hero, a scene for the situation, one per step
 * and one per card under what changes, on each of the two pages.
 *
 * Drawn rather than photographed, in token colours with one meaning each, as the sector drawings
 * are: primary is the answer, sky a fact held as prose, slate the baseline, amber the fact that is
 * missing. No words or figures, so they follow the locale and the theme; all decorative, because the
 * words beside each carry the meaning. A dashed line that moves (`dash-flow`) is a fact travelling,
 * and stands still under reduced motion.
 */
import type { ReactNode } from "react";

const K = {
  card: "fill-card stroke-line stroke-[1.5]",
  cardPri: "fill-card stroke-primary stroke-[1.5]",
  s1: "fill-surface-1",
  bar: "fill-baseline/35",
  ink: "fill-ink/75",
  pri: "fill-primary",
  priS: "fill-none stroke-primary stroke-2",
  priS3: "fill-none stroke-primary stroke-3",
  priArc: "fill-none stroke-primary stroke-[10]",
  priFlow: "fill-none stroke-primary stroke-2 dash-flow",
  priDash: "fill-none stroke-primary stroke-[1.5] [stroke-dasharray:6_5]",
  tint: "fill-primary-tint stroke-primary stroke-[1.5]",
  sky: "fill-sky",
  skySoft: "fill-sky/60",
  skyS: "fill-none stroke-sky stroke-[2.2]",
  sig: "fill-signal/70",
  gap: "fill-gap-fill stroke-gap stroke-[1.5] [stroke-dasharray:5_4]",
  gapS: "fill-none stroke-gap stroke-2",
  gapFlow: "fill-none stroke-gap stroke-2 dash-flow",
  gapCut: "fill-none stroke-gap stroke-2 [stroke-dasharray:6_5]",
  gapInk: "fill-none stroke-gap-strong stroke-2",
  gapDot: "fill-gap-strong",
  ghost: "fill-none stroke-baseline/50 stroke-[1.5] [stroke-dasharray:4_3]",
  ok: "fill-none stroke-success stroke-[2.4]",
  ok3: "fill-none stroke-success stroke-3",
  okBg: "fill-success-bg",
  onPri: "fill-none stroke-on-primary stroke-2",
  slateS: "fill-none stroke-baseline stroke-2",
  slateS3: "fill-none stroke-baseline stroke-3",
  slateFlow: "fill-none stroke-baseline/60 stroke-2 dash-flow",
  slateFill: "fill-baseline/55",
  inkS: "fill-none stroke-ink stroke-2",
  inkS3: "fill-none stroke-ink stroke-3",
  line: "fill-none stroke-line stroke-[1.5]",
  lineArc: "fill-none stroke-line stroke-[10]",
  grid: "fill-none stroke-line [stroke-dasharray:3_4]",
} as const;

/* ------------------------------------------------------------------ primitives */

function Art({
  w,
  h,
  children,
}: {
  w: number;
  h: number;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-primary-wash">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="block h-auto w-full"
        aria-hidden
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </div>
  );
}

const R = (
  x: number,
  y: number,
  w: number,
  h: number,
  rx: number,
  c: string,
) => <rect x={x} y={y} width={w} height={h} rx={rx} className={c} />;
/** A rounded line of text, unwritten. */
const L = (x: number, y: number, w: number, h = 8, c: string = K.bar) =>
  R(x, y, w, h, h / 2, c);
const P = (d: string, c: string) => <path d={d} className={c} />;
const Ci = (x: number, y: number, r: number, c: string) => (
  <circle cx={x} cy={y} r={r} className={c} />
);

/** `</>`: a fact marked up. */
const Brackets = ({ x, y, s = 9 }: { x: number; y: number; s?: number }) =>
  P(
    `M${x + s * 0.5} ${y - s * 0.55}L${x} ${y}L${x + s * 0.5} ${y + s * 0.55}M${x + s * 1.3} ${y - s * 0.55}L${x + s * 1.8} ${y}L${x + s * 1.3} ${y + s * 0.55}`,
    K.priS,
  );
const Tick = ({
  x,
  y,
  s = 6,
  c = K.ok,
}: {
  x: number;
  y: number;
  s?: number;
  c?: string;
}) => P(`M${x - s} ${y}l${s * 0.7} ${s * 0.7}l${s * 1.4} -${s * 1.4}`, c);
/** The amber question: a fact nobody recorded. */
const Question = ({ x, y, r = 9 }: { x: number; y: number; r?: number }) => (
  <g>
    {Ci(x, y, r, K.gap)}
    {P(
      `M${x - r * 0.32} ${y - r * 0.22}a${r * 0.32} ${r * 0.32} 0 1 1 ${r * 0.32} ${r * 0.32}v${r * 0.14}`,
      K.gapInk,
    )}
    {Ci(x, y + r * 0.52, 1.4, K.gapDot)}
  </g>
);
/** A search engine. */
const Lens = ({ x, y, r }: { x: number; y: number; r: number }) => (
  <g>
    {Ci(x, y, r, K.priS)}
    {P(
      `M${x + r * 0.72} ${y + r * 0.72}L${x + r * 1.4} ${y + r * 1.4}`,
      K.priS3,
    )}
  </g>
);
/** An answer engine, or a shopping agent. */
const Agent = ({ x, y, s }: { x: number; y: number; s: number }) => (
  <g>
    {R(x - s / 2, y - s / 2, s, s, s * 0.28, K.cardPri)}
    {Ci(x - s * 0.18, y, s * 0.07, K.pri)}
    {Ci(x + s * 0.18, y, s * 0.07, K.pri)}
    {P(`M${x} ${y - s / 2}v-${s * 0.18}`, K.priS)}
    {Ci(x, y - s * 0.72, s * 0.06, K.pri)}
  </g>
);
/** A filter. */
const Funnel = ({
  x,
  y,
  w,
  h,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
}) =>
  P(
    `M${x} ${y}h${w}l-${w * 0.36} ${h * 0.55}v${h * 0.45}l-${w * 0.28} -${h * 0.16}v-${h * 0.29}z`,
    K.priS,
  );
const Bubble = ({
  x,
  y,
  w,
  h,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
}) =>
  P(
    `M${x + 14} ${y}h${w - 28}a14 14 0 0 1 14 14v${h - 28}a14 14 0 0 1 -14 14h-${w - 60}l-14 14v-14h-18a14 14 0 0 1 -14 -14v-${h - 28}a14 14 0 0 1 14 -14z`,
    K.card,
  );
/** A feed: the broadcast mark. */
const FeedMark = ({ x, y, s }: { x: number; y: number; s: number }) => (
  <g>
    {Ci(x, y, s * 0.12, K.sky)}
    {P(
      `M${x} ${y - s * 0.5}a${s * 0.5} ${s * 0.5} 0 0 1 ${s * 0.5} ${s * 0.5}M${x} ${y - s}a${s} ${s} 0 0 1 ${s} ${s}`,
      K.skyS,
    )}
  </g>
);
/** Supplier files: a spreadsheet, a PDF, a feed. */
const Sheet = ({
  x,
  y,
  w,
  h,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
}) => (
  <g>
    {R(x, y, w, h, 5, K.card)}
    {R(x, y, w, h * 0.22, 5, K.okBg)}
    {[1, 2, 3].map((i) => (
      <path
        key={i}
        d={`M${x} ${y + h * 0.22 + i * h * 0.19}h${w}`}
        className={K.line}
      />
    ))}
    {P(`M${x + w * 0.4} ${y}v${h}`, K.line)}
  </g>
);
const Pdf = ({
  x,
  y,
  w,
  h,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
}) => (
  <g>
    {P(
      `M${x + 5} ${y}h${w * 0.66}l${w * 0.34 - 5} ${w * 0.34}v${h - w * 0.34 - 5}a5 5 0 0 1 -5 5h-${w - 10}a5 5 0 0 1 -5 -5v-${h - 10}a5 5 0 0 1 5 -5z`,
      K.card,
    )}
    {P(`M${x + w * 0.66 + 5} ${y}v${w * 0.34}h${w * 0.34 - 5}`, K.line)}
    {L(x + w * 0.18, y + h * 0.45, w * 0.6, 3.5, K.sig)}
    {L(x + w * 0.18, y + h * 0.62, w * 0.5, 3.5)}
    {L(x + w * 0.18, y + h * 0.78, w * 0.6, 3.5)}
  </g>
);
const Feed = ({
  x,
  y,
  w,
  h,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
}) => (
  <g>
    {R(x, y, w, h, 5, K.card)}
    <FeedMark x={x + w * 0.3} y={y + h * 0.72} s={w * 0.44} />
  </g>
);
/** A launch date: the calendar, one day lit. */
const Calendar = ({
  x,
  y,
  w,
  h,
  day,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  day: number;
}) => (
  <g>
    {R(x, y, w, h, 8, K.card)}
    {R(x, y, w, h * 0.22, 8, K.pri)}
    {R(x, y + h * 0.14, w, h * 0.08, 0, K.pri)}
    {Array.from({ length: 12 }, (_, i) => (
      <rect
        key={i}
        x={x + 8 + (i % 4) * ((w - 16) / 4) + 2}
        y={y + h * 0.32 + Math.floor(i / 4) * ((h * 0.62) / 3)}
        width={(w - 16) / 4 - 4}
        height={(h * 0.62) / 3 - 5}
        rx={3}
        className={i === day ? K.pri : K.s1}
      />
    ))}
  </g>
);
const Flag = ({ x, y, h }: { x: number; y: number; h: number }) => (
  <g>
    {P(`M${x} ${y}v${h}`, K.inkS)}
    {P(
      `M${x} ${y}h${h * 0.5}l-${h * 0.12} ${h * 0.16}l${h * 0.12} ${h * 0.16}h-${h * 0.5}z`,
      K.pri,
    )}
  </g>
);
const Arrow = ({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const s = 7;
  return (
    <g>
      {P(`M${x1} ${y1}L${x2} ${y2}`, K.priS)}
      {P(
        `M${x2 - s * Math.cos(a - 0.5)} ${y2 - s * Math.sin(a - 0.5)}L${x2} ${y2}L${x2 - s * Math.cos(a + 0.5)} ${y2 - s * Math.sin(a + 0.5)}`,
        K.priS,
      )}
    </g>
  );
};
/** A product on the shelf, lit when it is the one chosen. */
const Tile = ({
  x,
  y,
  s,
  on = false,
}: {
  x: number;
  y: number;
  s: number;
  on?: boolean;
}) => (
  <g>
    {R(x, y, s, s, s * 0.18, on ? K.tint : K.card)}
    {R(
      x + s * 0.25,
      y + s * 0.18,
      s * 0.5,
      s * 0.4,
      s * 0.08,
      on ? K.pri : K.s1,
    )}
    {L(x + s * 0.18, y + s * 0.68, s * 0.64, s * 0.08, on ? K.pri : K.bar)}
  </g>
);
/** One field in a catalogue row: marked up, held as prose, or never recorded. */
const Field = ({
  y,
  kind,
}: {
  y: number;
  kind: "marked" | "prose" | "missing";
}) => (
  <g>
    {R(50, y - 8, 16, 16, 4, K.s1)}
    {kind === "marked" && (
      <>
        {L(76, y - 4, 120)}
        <Brackets x={206} y={y} s={8} />
      </>
    )}
    {kind === "prose" && (
      <>
        {L(76, y - 6, 180, 4, K.skySoft)}
        {L(76, y + 2, 130, 4, K.skySoft)}
      </>
    )}
    {kind === "missing" && (
      <>
        {R(76, y - 10, 196, 20, 7, K.gap)}
        <Question x={300} y={y} r={8} />
      </>
    )}
  </g>
);
/** A dial reading a number, and how far it has come. */
const Gauge = ({
  cx,
  cy,
  r,
  tip,
}: {
  cx: number;
  cy: number;
  r: number;
  tip: [number, number];
}) => (
  <g>
    {P(`M${cx - r} ${cy}A${r} ${r} 0 0 1 ${cx + r} ${cy}`, K.lineArc)}
    {P(`M${cx - r} ${cy}A${r} ${r} 0 0 1 ${tip[0]} ${tip[1]}`, K.priArc)}
    {Ci(cx, cy, 6, K.ink)}
    {P(
      `M${cx} ${cy}L${cx + (tip[0] - cx) * 0.82} ${cy + (tip[1] - cy) * 0.82}`,
      K.inkS3,
    )}
  </g>
);

/* ------------------------------------------------------------------ SEO and AEO */

/** A product page read by a search engine and an answer engine; the answer engine stops at the blank. */
export function SeoHero() {
  return (
    <Art w={640} h={340}>
      {R(30, 30, 300, 280, 20, K.card)}
      {R(50, 50, 92, 92, 14, K.s1)}
      {R(70, 78, 52, 34, 5, K.tint)}
      {P("M62 118h68", K.priS3)}
      {L(158, 60, 140, 11, K.ink)}
      {L(158, 82, 96)}
      {L(158, 108, 62, 13, K.pri)}
      <Field y={168} kind="marked" />
      <Field y={196} kind="marked" />
      <Field y={224} kind="prose" />
      <Field y={252} kind="prose" />
      <Field y={280} kind="missing" />
      {P("M232 168C320 168 360 110 422 112", K.priFlow)}
      {P("M232 196C330 196 370 120 422 124", K.priFlow)}
      <Lens x={470} y={116} r={40} />
      {L(448, 104, 44, 6, K.pri)}
      {L(448, 118, 30, 6)}
      <Bubble x={390} y={196} w={220} h={100} />
      <Agent x={432} y={240} s={38} />
      {L(466, 226, 110, 8, K.ink)}
      {L(466, 244, 80)}
      {R(466, 258, 90, 16, 6, K.gap)}
      {P("M318 280C350 280 360 268 388 262", K.gapFlow)}
    </Art>
  );
}

/** The validation report comes back green, and discovery does not move. */
export function SeoSituation() {
  return (
    <Art w={640} h={300}>
      {R(30, 30, 290, 240, 18, K.card)}
      {Ci(76, 78, 24, K.okBg)}
      <Tick x={76} y={78} s={9} c={K.ok3} />
      {L(112, 66, 150, 11, K.ink)}
      {L(112, 86, 96)}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <Tick x={64} y={138 + i * 30} s={5} />
          {L(82, 134 + i * 30, 150 + (i % 2) * 40)}
        </g>
      ))}
      {R(350, 30, 260, 240, 18, K.card)}
      {P("M380 60V230H585", K.line)}
      {[90, 130, 170].map((y) => (
        <path key={y} d={`M380 ${y}H585`} className={K.grid} />
      ))}
      {P(
        "M380 196C410 194 430 199 460 196S520 193 545 197 575 195 585 196",
        K.slateS3,
      )}
      {P("M470 60V230", K.priFlow)}
      {Ci(470, 196, 6, K.pri)}
    </Art>
  );
}

export const SEO_STEPS = [
  /* Measure: the constraints buyers apply, ranked. */
  <Art key="measure" w={320} h={180}>
    {[200, 160, 120, 86, 54].map((w, i) => (
      <g key={w}>
        {Ci(34, 34 + i * 28, 5, i ? K.bar : K.pri)}
        {L(50, 29 + i * 28, w, 11, i ? K.bar : K.pri)}
      </g>
    ))}
    <Lens x={278} y={48} r={18} />
  </Art>,
  /* Recover: a fact pulled out of the product's own text into a field. */
  <Art key="recover" w={320} h={180}>
    {R(20, 24, 170, 132, 14, K.card)}
    {[0, 1, 2, 3, 4].map((i) => (
      <rect
        key={i}
        x={36}
        y={44 + i * 22}
        width={i === 2 ? 60 : 136}
        height={7}
        rx={3.5}
        className={K.bar}
      />
    ))}
    {L(100, 88, 64, 7, K.sky)}
    {P("M100 98h64", K.skyS)}
    <Arrow x1={200} y1={90} x2={236} y2={90} />
    {R(244, 68, 60, 44, 10, K.tint)}
    {L(256, 86, 36, 9, K.pri)}
  </Art>,
  /* Express: one value, three consumers: markup, a filter, an agent. */
  <Art key="express" w={320} h={180}>
    {R(18, 68, 92, 44, 12, K.tint)}
    {L(32, 86, 64, 9, K.pri)}
    {[34, 90, 146].map((y) => (
      <path
        key={y}
        d={`M110 90C150 90 160 ${y} 200 ${y}`}
        className={K.priFlow}
      />
    ))}
    {R(200, 14, 96, 40, 10, K.card)}
    <Brackets x={232} y={34} s={10} />
    {R(200, 70, 96, 40, 10, K.card)}
    <Funnel x={232} y={78} w={32} h={24} />
    {R(200, 126, 96, 40, 10, K.card)}
    <Agent x={248} y={148} s={24} />
  </Art>,
];

export const SEO_GETS = [
  /* Search ranks the product with the blank anyway; the agent's filter drops it. */
  <Art key="ambiguity" w={320} h={180}>
    <Tile x={24} y={22} s={46} />
    <Arrow x1={80} y1={45} x2={150} y2={45} />
    <Lens x={186} y={42} r={20} />
    <Tile x={24} y={108} s={46} />
    {R(34, 140, 26, 8, 4, K.gap)}
    <Arrow x1={80} y1={131} x2={140} y2={131} />
    <Funnel x={150} y={112} w={40} h={40} />
    {P("M200 131h40", K.gapFlow)}
    {P("M250 124l14 14M264 124l-14 14", K.slateS)}
  </Art>,
  /* The traffic has already moved to answer engines. */
  <Art key="traffic" w={320} h={180}>
    {P("M30 150H300M30 150V24", K.line)}
    {P(
      "M30 140C90 138 140 134 180 118S250 60 290 34V150H30Z",
      "fill-primary-tint",
    )}
    {P("M30 140C90 138 140 134 180 118S250 60 290 34", K.priS3)}
    {Ci(290, 34, 6, K.pri)}
    <Bubble x={206} y={22} w={64} h={40} />
    {L(220, 36, 36, 6, K.pri)}
  </Art>,
  /* Which fields, not how many: a few of the empty slots are the ones that decide. */
  <Art key="which" w={320} h={180}>
    {Array.from({ length: 30 }, (_, i) => (
      <rect
        key={i}
        x={26 + (i % 10) * 28}
        y={26 + Math.floor(i / 10) * 46}
        width={20}
        height={32}
        rx={5}
        className={[3, 14, 21].includes(i) ? K.tint : K.ghost}
      />
    ))}
  </Art>,
  /* One measurement, three surfaces: a filter, a shopping feed, an agent. */
  <Art key="surfaces" w={320} h={180}>
    {Ci(70, 90, 22, K.pri)}
    {[34, 90, 146].map((y) => (
      <path
        key={y}
        d={`M92 90C140 90 150 ${y} 196 ${y}`}
        className={K.priFlow}
      />
    ))}
    {R(196, 16, 104, 38, 10, K.card)}
    <Funnel x={232} y={23} w={30} h={22} />
    {R(196, 72, 104, 38, 10, K.card)}
    <FeedMark x={240} y={100} s={22} />
    {R(196, 128, 104, 38, 10, K.card)}
    <Agent x={248} y={148} s={22} />
  </Art>,
];

/* ------------------------------------------------------------------ Time to market */

/** Eleven supplier formats through one funnel into the catalogue, then the launch date. */
export function TtmHero() {
  const files = [Sheet, Pdf, Feed];
  const tilt = [-6, 4, -3, 5, -4, 3];
  return (
    <Art w={640} h={340}>
      {Array.from({ length: 11 }, (_, i) => {
        const x = 28 + (i % 3) * 54 + (Math.floor(i / 3) % 2) * 14;
        const y = 30 + Math.floor(i / 3) * 72;
        const File = files[i % 3];
        return (
          <g key={i} transform={`rotate(${tilt[i % 6]} ${x + 20} ${y + 26})`}>
            <File x={x} y={y} w={40} h={52} />
          </g>
        );
      })}
      {[60, 120, 180, 240, 290].map((y) => (
        <path
          key={y}
          d={`M200 ${y}C240 ${y} 250 170 280 170`}
          className={K.slateFlow}
        />
      ))}
      <Funnel x={278} y={130} w={56} h={80} />
      <Arrow x1={326} y1={170} x2={366} y2={170} />
      {R(372, 86, 150, 168, 18, K.card)}
      {Array.from({ length: 9 }, (_, i) => (
        <Tile
          key={i}
          x={386 + (i % 3) * 44}
          y={100 + Math.floor(i / 3) * 50}
          s={38}
          on={i === 0 || i === 4}
        />
      ))}
      <Arrow x1={530} y1={170} x2={556} y2={170} />
      <Calendar x={560} y={132} w={64} h={76} day={6} />
      <Flag x={592} y={72} h={52} />
    </Art>
  );
}

/** One date. Enriching everything runs past it; the decidable set launches before it and backfills after. */
export function TtmSituation() {
  return (
    <Art w={640} h={300}>
      {P("M40 250H600", K.line)}
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} d={`M${60 + i * 46} 246v8`} className={K.line} />
      ))}
      {P("M420 40V258", K.priS3)}
      <Flag x={420} y={24} h={40} />
      {L(60, 84, 360, 22, K.slateFill)}
      {R(420, 84, 150, 22, 11, K.gap)}
      {L(60, 150, 150, 22, K.pri)}
      {R(210, 150, 330, 22, 11, K.priDash)}
      {Ci(210, 161, 6, K.cardPri)}
    </Art>
  );
}

export const TTM_STEPS = [
  /* Measure a sample: a partial supplier file, examined for what is missing. */
  <Art key="sample" w={320} h={180}>
    {R(30, 18, 150, 144, 14, K.card)}
    {[0, 1, 2, 3, 4].map((i) =>
      i === 1 || i === 3 ? (
        <rect
          key={i}
          x={46}
          y={34 + i * 25}
          width={118}
          height={14}
          rx={6}
          className={K.gap}
        />
      ) : (
        <rect
          key={i}
          x={46}
          y={37 + i * 25}
          width={i % 2 ? 80 : 118}
          height={8}
          rx={4}
          className={K.bar}
        />
      ),
    )}
    <Lens x={220} y={96} r={34} />
  </Art>,
  /* The minimum decidable set: a handful picked out of many, ranked. */
  <Art key="minimum" w={320} h={180}>
    {Array.from({ length: 24 }, (_, i) => (
      <rect
        key={i}
        x={22 + (i % 6) * 24}
        y={22 + Math.floor(i / 6) * 36}
        width={18}
        height={28}
        rx={4}
        className={[1, 8, 15, 20].includes(i) ? K.pri : K.ghost}
      />
    ))}
    <Arrow x1={178} y1={90} x2={204} y2={90} />
    {[96, 74, 54, 38].map((w, i) => (
      <rect
        key={w}
        x={212}
        y={40 + i * 28}
        width={w}
        height={12}
        rx={6}
        className={K.pri}
      />
    ))}
  </Art>,
  /* Backfill against a number: the dial, re-measured as the rest lands. */
  <Art key="backfill" w={320} h={180}>
    <Gauge cx={120} cy={140} r={70} tip={[159, 81]} />
    {P("M288 90a28 28 0 1 1 -8 -20", K.priFlow)}
    {P("M276 61l4 9l-9 3", K.priS)}
  </Art>,
];

export const TTM_GETS = [
  /* A launch checklist, not a schema. */
  <Art key="checklist" w={320} h={180}>
    {R(20, 20, 130, 140, 14, K.card)}
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        {R(36, 38 + i * 28, 16, 16, 4, K.pri)}
        <Tick x={44} y={46 + i * 28} s={4} c={K.onPri} />
        {L(62, 42 + i * 28, i % 2 ? 50 : 70)}
      </g>
    ))}
    {Array.from({ length: 24 }, (_, i) => (
      <rect
        key={i}
        x={176 + (i % 4) * 32}
        y={22 + Math.floor(i / 4) * 24}
        width={24}
        height={16}
        rx={4}
        className={K.ghost}
      />
    ))}
  </Art>,
  /* Where each fact already lives: the supplier's text, a feed, or nowhere. */
  <Art key="lives" w={320} h={180}>
    {R(18, 16, 64, 42, 8, K.card)}
    {L(28, 28, 44, 5)}
    {L(28, 40, 30, 5, K.sky)}
    <Feed x={28} y={70} w={44} h={40} />
    {R(28, 124, 44, 40, 8, K.gap)}
    <Question x={50} y={144} r={8} />
    <Arrow x1={90} y1={37} x2={186} y2={90} />
    <Arrow x1={90} y1={90} x2={186} y2={90} />
    {P("M90 144C130 144 150 112 182 98", K.gapFlow)}
    {R(196, 62, 108, 56, 12, K.tint)}
    {L(212, 80, 72, 9, K.pri)}
    {L(212, 96, 44, 7)}
  </Art>,
  /* A number before you have traffic: the dial reads, and nobody has visited yet. */
  <Art key="before-traffic" w={320} h={180}>
    <Gauge cx={100} cy={120} r={60} tip={[140, 78]} />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        {Ci(208 + i * 34, 74, 10, K.ghost)}
        {P(`M${192 + i * 34} 118a16 16 0 0 1 32 0`, K.ghost)}
      </g>
    ))}
  </Art>,
  /* A defensible cut line: these fields launch, the rest follow. */
  <Art key="cut-line" w={320} h={180}>
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <rect
        key={i}
        x={40}
        y={22 + i * 20}
        width={i < 3 ? 220 : 200 - i * 12}
        height={10}
        rx={5}
        className={i < 3 ? K.pri : K.bar}
      />
    ))}
    {P("M24 88H296", K.gapCut)}
    {Ci(262, 82, 6, K.gapS)}
    {Ci(262, 96, 6, K.gapS)}
    {P("M267 85l20 9M267 93l20 -9", K.gapS)}
  </Art>,
];

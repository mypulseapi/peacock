/**
 * Mockup pictures for the sector pages that have no photograph yet (owner, 27 Oct 2026), drawn so the
 * layout reads as it will, the way the storefront and agent pages stand in for their images.
 *
 * Four kinds, each from the sector's own marks: its product (`product`) and the four attributes it
 * ranks (`icons`, rank 1 first). A shelf of near-identical products; one product with its four
 * facts called out, the rank-1 fact an amber dashed blank; and the before and after of the same
 * shelf, sharing one composition so the slider wipes cleanly between them. Token colours with one
 * meaning each, no words or figures, all decorative: the words beside each carry the meaning.
 */
import type { LucideIcon } from "lucide-react";
import { CircleHelp, SlidersHorizontal, Star } from "lucide-react";

type Marks = { product: LucideIcon; icons: LucideIcon[] };

const Frame = ({
  children,
  viewBox,
  tone = "bg-primary-wash",
}: {
  children: React.ReactNode;
  viewBox: string;
  tone?: string;
}) => (
  <div className={`size-full overflow-hidden rounded-2xl ${tone}`}>
    <svg
      viewBox={viewBox}
      className="size-full"
      aria-hidden="true"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  </div>
);

/** A product on a card: the sector's mark, two stated lines. */
const Item = ({
  x,
  y,
  w,
  h,
  P,
  on = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  P: LucideIcon;
  on?: boolean;
}) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={w * 0.14}
      className={on ? "fill-card stroke-primary" : "fill-card stroke-line"}
      strokeWidth="1.5"
    />
    <P
      x={x + w * 0.25}
      y={y + h * 0.14}
      width={w * 0.5}
      height={w * 0.5}
      className={on ? "text-primary" : "text-baseline"}
      strokeWidth={1.6}
    />
    <rect
      x={x + w * 0.16}
      y={y + h * 0.7}
      width={w * 0.68}
      height={h * 0.06}
      rx={h * 0.03}
      className="fill-baseline/35"
    />
    <rect
      x={x + w * 0.16}
      y={y + h * 0.81}
      width={w * 0.44}
      height={h * 0.06}
      rx={h * 0.03}
      className="fill-baseline/35"
    />
  </g>
);

/** Scene, portrait: a tall shelf of near-identical products, nothing to tell them apart. */
export function SceneDrawing({ product }: Marks) {
  const cols = 3;
  const rows = 6;
  return (
    <Frame viewBox="0 0 380 615" tone="bg-surface-1">
      {Array.from({ length: rows }, (_, r) => (
        <g key={r}>
          {Array.from({ length: cols }, (_, c) => (
            <Item
              key={c}
              x={34 + c * 108}
              y={36 + r * 96}
              w={88}
              h={76}
              P={product}
            />
          ))}
          <path
            d={`M24 ${118 + r * 96}h332`}
            className="stroke-baseline/50"
            strokeWidth="4"
          />
        </g>
      ))}
    </Frame>
  );
}

/** A fact called out from the product: a mark in a chip, filled, or the amber blank. */
const Callout = ({
  x,
  y,
  I,
  missing,
}: {
  x: number;
  y: number;
  I: LucideIcon;
  missing?: boolean;
}) => (
  <g>
    <rect
      x={x}
      y={y}
      width="150"
      height="46"
      rx="12"
      className={missing ? "fill-gap-fill stroke-gap" : "fill-card stroke-line"}
      strokeWidth="1.5"
      strokeDasharray={missing ? "5 4" : undefined}
    />
    <I
      x={x + 14}
      y={y + 11}
      width="24"
      height="24"
      className={missing ? "text-gap-strong" : "text-primary"}
      strokeWidth={2}
    />
    {missing ? (
      <CircleHelp
        x={x + 108}
        y={y + 11}
        width="24"
        height="24"
        className="text-gap-strong"
        strokeWidth={2}
      />
    ) : (
      <rect
        x={x + 50}
        y={y + 19}
        width="78"
        height="8"
        rx="4"
        className="fill-baseline/40"
      />
    )}
  </g>
);

/** Problem: one product with its four facts drawn out; the rank-1 fact is the one left blank. */
export function ProblemDrawing({ product, icons }: Marks) {
  const spots: [number, number][] = [
    [40, 70],
    [40, 330],
    [690, 110],
    [690, 360],
  ];
  return (
    <Frame viewBox="0 0 880 520">
      <Item x={330} y={110} w={220} h={290} P={product} on />
      {spots.map(([x, y], i) => (
        <g key={i}>
          <path
            d={
              x < 400
                ? `M${x + 150} ${y + 23} C ${x + 220} ${y + 23}, 290 ${y + 23}, 330 ${180 + i * 30}`
                : `M${x} ${y + 23} C ${x - 70} ${y + 23}, 590 ${y + 23}, 550 ${180 + (i - 2) * 60}`
            }
            fill="none"
            className={i === 0 ? "stroke-gap" : "stroke-primary/50"}
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          <Callout x={x} y={y} I={icons[i]} missing={i === 0} />
        </g>
      ))}
    </Frame>
  );
}

/**
 * The shelf, before and after: the same three products in the same place. Before, each of three
 * facts is a question and the listing card holds only a picture and stars; after, the facts are
 * recorded and a filter panel can set each one, the first product picked.
 */
export function ShelfDrawing({
  product,
  icons,
  after = false,
}: Marks & { after?: boolean }) {
  const P = product;
  return (
    <Frame
      viewBox="0 0 760 882"
      tone={after ? "bg-primary-wash" : "bg-surface-1"}
    >
      {/* the shelf */}
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <Item
            x={70}
            y={120 + r * 220}
            w={170}
            h={170}
            P={product}
            on={after && r === 0}
          />
          <path
            d={`M50 ${300 + r * 220}h220`}
            className="stroke-baseline/50"
            strokeWidth="5"
          />
        </g>
      ))}
      {after ? (
        <g>
          {/* the facts, recorded */}
          {icons.slice(0, 3).map((I, i) => (
            <Callout key={i} x={300} y={150 + i * 90} I={I} />
          ))}
          {/* the filter a shopper can now set */}
          <rect
            x="490"
            y="120"
            width="230"
            height="440"
            rx="20"
            className="fill-card stroke-line"
            strokeWidth="1.5"
          />
          <SlidersHorizontal
            x="512"
            y="142"
            width="26"
            height="26"
            className="text-primary"
            strokeWidth={2}
          />
          {icons.map((I, i) => (
            <g key={i}>
              <I
                x="512"
                y={196 + i * 86}
                width="22"
                height="22"
                className="text-muted"
                strokeWidth={2}
              />
              <rect
                x="512"
                y={228 + i * 86}
                width="186"
                height="30"
                rx="8"
                className={
                  i === 0
                    ? "fill-primary-tint stroke-primary"
                    : "fill-surface-1 stroke-line"
                }
                strokeWidth="1.5"
              />
            </g>
          ))}
        </g>
      ) : (
        <g>
          {/* the facts, unanswered */}
          {icons.slice(0, 3).map((I, i) => (
            <g key={i}>
              <rect
                x="300"
                y={150 + i * 90}
                width="150"
                height="46"
                rx="23"
                className="fill-card stroke-line"
                strokeWidth="1.5"
              />
              <CircleHelp
                x="314"
                y={161 + i * 90}
                width="24"
                height="24"
                className="text-baseline"
                strokeWidth={2}
              />
              <I
                x="350"
                y={161 + i * 90}
                width="24"
                height="24"
                className="text-baseline"
                strokeWidth={2}
              />
            </g>
          ))}
          {/* the listing card: a picture and stars, nothing to filter on */}
          <rect
            x="490"
            y="240"
            width="230"
            height="300"
            rx="20"
            className="fill-card stroke-line"
            strokeWidth="1.5"
          />
          <rect
            x="512"
            y="262"
            width="186"
            height="150"
            rx="12"
            className="fill-surface-1"
          />
          <P
            x="575"
            y="297"
            width="60"
            height="60"
            className="text-baseline"
            strokeWidth={1.6}
          />
          {[0, 1, 2, 3, 4].map((i) => (
            <Star
              key={i}
              x={512 + i * 30}
              y="436"
              width="22"
              height="22"
              className="text-baseline"
              strokeWidth={2}
            />
          ))}
          <rect
            x="512"
            y="480"
            width="140"
            height="10"
            rx="5"
            className="fill-baseline/35"
          />
        </g>
      )}
    </Frame>
  );
}

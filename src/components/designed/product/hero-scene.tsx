/**
 * The product hero's visual, as one inline SVG instead of a video.
 *
 * It replaced a screen recording: four MP4s per page, light and dark in AV1 and H.264, 9.5MB
 * across the three product pages, plus a 2560px WebP poster to cover the gap before a frame
 * arrived. It played a sped-up tour of the product, which is a lot of motion to put beside a
 * headline someone is still reading, and the report was that it was confusing rather than
 * explanatory.
 *
 * This says one thing instead. The shelf is the metaphor the whole site already uses: a grid of
 * products, some of which cannot be told apart. The amber cells are the gap; they fill, in
 * order, once. Then it stops. An enterprise hero should settle, not keep performing.
 *
 * Why it is cheap:
 *   - About 9KB of markup, against 9.5MB of video. Nothing to download, nothing to decode.
 *   - Only `opacity` animates, on a group the compositor can handle on its own. No `fill`
 *     transitions, which cannot be composited and would repaint 112 rectangles a frame.
 *   - One pass, 2.4s, then idle. No loop means no work at all for the rest of the visit.
 *   - It is theme-agnostic: the colours are the same role tokens the page uses, so dark mode
 *     needs no second copy of anything. The video needed two.
 */
const COLS = 14;
const ROWS = 8;
const CELL = 16;
const GAP = 4;

/*
 * Which cells read as the gap, per product.
 *
 * Generated with a constraint rather than typed by hand: no column holding more than two, no
 * row more than three, and no two adjacent in a row. The first hand-picked set put every gap
 * in columns 3 and 10, because a stride of 7 against 14 columns lands on the same two every
 * time, and it read as a deliberate stripe instead of a shelf with holes in it.
 */
const GAPS: Record<string, number[]> = {
  audit: [1, 18, 21, 25, 32, 38, 43, 47, 56, 62, 66, 78, 84, 86, 96],
  verification: [21, 25, 28, 42, 53, 55, 57, 69, 77, 93, 107],
  monitor: [4, 25, 30, 43, 45, 47, 56, 65, 71, 73, 76, 88, 91, 97, 100, 107],
};

export function HeroScene({ variant }: { variant: keyof typeof GAPS }) {
  const gaps = new Set(GAPS[variant] ?? GAPS.audit);
  const width = COLS * (CELL + GAP) - GAP;
  const height = ROWS * (CELL + GAP) - GAP;
  const cells = Array.from({ length: COLS * ROWS }, (_, i) => i);
  const at = (i: number) => ({
    x: (i % COLS) * (CELL + GAP),
    y: Math.floor(i / COLS) * (CELL + GAP),
  });

  return (
    <svg
      className="hero-scene"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label="A shelf of products. The highlighted cells are the ones a shopper cannot tell apart, filling in as the missing attribute is recorded."
    >
      {/* The shelf. Flat, quiet, and never animated: it is the background, not the point. */}
      <g className="hero-scene-shelf">
        {cells.map((i) => {
          const { x, y } = at(i);
          return <rect key={i} x={x} y={y} width={CELL} height={CELL} rx={4} />;
        })}
      </g>

      {/* The gap, and the same cells resolved. Only the second group's opacity moves, and the
          stagger is a custom property so one keyframe serves all of them. */}
      <g className="hero-scene-gap">
        {[...gaps].map((i) => {
          const { x, y } = at(i);
          return <rect key={i} x={x} y={y} width={CELL} height={CELL} rx={4} />;
        })}
      </g>
      <g className="hero-scene-fill">
        {[...gaps].map((i, n) => {
          const { x, y } = at(i);
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={CELL}
              height={CELL}
              rx={4}
              style={{ "--i": n } as React.CSSProperties}
            />
          );
        })}
      </g>
    </svg>
  );
}

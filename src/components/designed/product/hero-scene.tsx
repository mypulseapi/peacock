/**
 * The product hero's background texture, in place of the background video.
 *
 * This sits in `absolute inset-0 -z-10`, behind the headline. It is wallpaper, not a figure: the
 * shelf story the pages actually tell is the designer's exported figure in section 2, one screen
 * below, and competing with it from behind the title helped nobody.
 *
 * It replaced four MP4s per page (light and dark, AV1 and H.264, 9.5MB across the three pages)
 * plus a 2560px WebP poster.
 *
 * Why a `<pattern>` and no `viewBox`
 * ----------------------------------
 * The first version drew a fixed 14 by 8 grid in a 276 by 156 viewBox and let CSS size it. A
 * viewBox scales its contents, so stretching that across a 1536px hero blew 16px cells up to
 * about 55px: a chunky checkerboard of a dozen huge squares, nothing like a shelf of products.
 * Worse, the cell size changed with the viewport, so it was never once the size it was designed
 * at.
 *
 * With no viewBox, one user unit is one CSS pixel. A tiled pattern then holds its cell size at
 * every width, which is what a texture needs: the hero gets wider, you get more cells, not bigger
 * ones. It is also less markup than the grid it replaces, because the tile is drawn once and
 * repeated by the renderer rather than by React.
 *
 * Colour
 * ------
 * Every fill is a `--color-*` token, the designed palette the rest of these pages use. The first
 * version reached for `--primary`, `--warn` and `--surface-2`: `--primary` is a legacy token that
 * resolves to a harsh saturated indigo rather than Pulse Blue, and the other two are not defined
 * at all, so they silently fell back to a hardcoded amber and a `currentColor` mix. That is why it
 * shipped looking like scattered navy blobs.
 */
const PITCH = 20;
const CELL = 14;
const RADIUS = 4;

/*
 * Where the accents sit inside one accent tile, as [column, row] of a 19 by 11 block.
 *
 * Four per tile, which is under 2% of its cells. The first attempt used a 9 by 5 tile with five
 * accents: that is 11% density repeating about nine times across a desktop hero, and the eye
 * found the seams immediately. It read as patterned wallpaper rather than a scattering. A tile
 * this size repeats roughly four times across and twice down, which is few enough that the
 * repetition stops announcing itself.
 *
 * Within a tile no two share a row or a column and none is adjacent, so nothing lines up.
 *
 * One set per page, because the three heroes sit at the same place in the same layout and a
 * visitor moving between them should not feel they never left.
 */
const ACCENTS: Record<string, { gap: [number, number][]; filled: [number, number][] }> = {
  audit: {
    gap: [[3, 1], [14, 7]],
    filled: [[8, 4], [17, 9]],
  },
  verification: {
    gap: [[5, 2], [16, 8]],
    filled: [[1, 6], [11, 0]],
  },
  monitor: {
    gap: [[2, 9], [12, 3]],
    filled: [[7, 1], [18, 6]],
  },
};

const TILE_COLS = 19;
const TILE_ROWS = 11;

export function HeroScene({ variant }: { variant: keyof typeof ACCENTS }) {
  const accents = ACCENTS[variant] ?? ACCENTS.audit;
  // Prefixed per variant: three of these never share a page, but an id collision is the kind of
  // bug that only shows up once someone puts two on one.
  const id = `hs-${variant}`;
  const at = ([c, r]: [number, number]) => ({ x: c * PITCH + (PITCH - CELL) / 2, y: r * PITCH + (PITCH - CELL) / 2 });

  return (
    <svg className="hero-scene" aria-hidden="true" focusable="false">
      <defs>
        {/* The field. One cell, repeated by the renderer. */}
        <pattern
          id={`${id}-field`}
          width={PITCH}
          height={PITCH}
          patternUnits="userSpaceOnUse"
        >
          <rect
            x={(PITCH - CELL) / 2}
            y={(PITCH - CELL) / 2}
            width={CELL}
            height={CELL}
            rx={RADIUS}
            className="hero-scene-cell"
          />
        </pattern>

        {/* The accents, on a tile nine cells wide so they do not land in an obvious lattice. */}
        <pattern
          id={`${id}-accents`}
          width={TILE_COLS * PITCH}
          height={TILE_ROWS * PITCH}
          patternUnits="userSpaceOnUse"
        >
          {accents.gap.map((cell) => (
            <rect
              key={`g${cell[0]}-${cell[1]}`}
              {...at(cell)}
              width={CELL}
              height={CELL}
              rx={RADIUS}
              className="hero-scene-gap"
            />
          ))}
          {accents.filled.map((cell) => (
            <rect
              key={`f${cell[0]}-${cell[1]}`}
              {...at(cell)}
              width={CELL}
              height={CELL}
              rx={RADIUS}
              className="hero-scene-filled"
            />
          ))}
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${id}-field)`} />
      {/* One group, one opacity, one fade. The compositor handles it without touching layout, and
          it settles rather than looping: an enterprise hero should stop performing. */}
      <g className="hero-scene-accents">
        <rect width="100%" height="100%" fill={`url(#${id}-accents)`} />
      </g>
    </svg>
  );
}

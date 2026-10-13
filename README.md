# rainbow

Plain HTML + Tailwind CSS v4 (via the Tailwind CLI), themed with the Pulse design system
from Google Stitch (first demo palette: "Electric Coral").

## Usage

This project uses [pnpm](https://pnpm.io) (`brew install pnpm`). Don't use npm here —
it would create a second lockfile.

```bash
pnpm install
pnpm dev        # watch HTML + src/input.css → dist/output.css
pnpm build      # one-off minified build
```

Then open `index.html` (home) or `components.html` (component spec) in your browser.

## Theme (`src/input.css`)

All colours, fonts and sizes are tokens in `@theme`. **To change the colour scheme, edit only the
`COLOURS` block** — tokens are named by role (`primary`, `gap`, `void`, `ink`, `muted`, `card`, `line`,
`success`/`warning`/`critical` …), and Tailwind's default palette is switched off.

Fonts: `font-display` (Plus Jakarta Sans), `font-sans` (Inter); numbers use `tabular-nums`.
Type: `text-display` / `text-headline` / `text-title` (fluid), `text-h1`, `text-h2`, `text-h3`, `text-body`, `text-data`.

Component classes: `btn-primary`, `btn-secondary`, `btn-ghost`, `btn-sm`, `card`, `card-dark`,
`eyebrow`, `section-tag`, `badge-primary|success|warning|critical`, `missing-cell`, `missing-cell-dark`,
`blueprint-grid`, `frame`, `reveal`, `reveal-bar`. See `DESIGN.md` for the full rules.

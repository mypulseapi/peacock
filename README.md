# rainbow

Plain HTML + Tailwind CSS v4 (via the Tailwind CLI), themed with the Pulse design system
(brand colours from Figma "Pulse Design Work" › Branding › Pulse Color).

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

All colours, fonts and sizes are tokens in `@theme`. Colours use the **Aurora** palette from
`docs/pulse_brand_guidelines_v2.md` §3 (Indigo, Violet, Cyan, Coral, Ink, Mist + the Violet → Cyan → Coral gradient).
Role tokens (`primary`, `accent`, `gap`, `void`, `ink`, `muted`, `card`, `line`, `success`/`warning`/`critical` …)
are exact hex values in `light-dark()`, so the site follows the visitor's light/dark setting. Tailwind's default
palette is switched off.

Fonts: Inter only — `font-display` (Inter Display for large text, via the optical-size axis), `font-sans` (Inter); numbers use `tabular-nums`.
Type: `text-display` / `text-headline` / `text-title` (fluid), `text-h1`, `text-h2`, `text-h3`, `text-body`, `text-data`.

Component classes: `btn-primary`, `btn-secondary`, `btn-ghost`, `btn-sm`, `card`, `card-dark`,
`eyebrow`, `section-tag`, `badge-primary|signal|success|warning|critical`, `bg-brand-gradient`, `missing-cell`, `missing-cell-dark`,
`blueprint-grid`, `frame`, `reveal`, `reveal-bar`. See `DESIGN.md` for the full rules.

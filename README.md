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

All colours, fonts and sizes are tokens in `@theme`. Colours use the **Signal** palette from
`docs/pulse_brand_guidelines_final.md` §3–§6 (Pulse Blue, Signal Red, Sky Blue, Ink, Mist + the Signal Red → Pulse Blue gradient;
cool black `#0B0D12` dark surfaces). Role tokens (`primary`, `signal`, `gap`, `void`, `ink`, `muted`, `card`, `line`,
`success`/`warning`/`critical`, `chart-*` …)
are exact hex values in `light-dark()`, so the site follows the visitor's light/dark setting. Tailwind's default
palette is switched off.

Fonts: Geist (headings and body) and Geist Mono (data only: table values, numeric readouts), self-hosted in `src/assets/fonts/geist/` — `font-display` / `font-sans` (Geist), `font-mono` (Geist Mono); numbers use `tabular-nums`.
Type: `text-display` / `text-headline` / `text-title` (fluid), `text-h1`, `text-h2`, `text-h3`, `text-body`, `text-data`.

Component classes: `btn-primary`, `btn-secondary`, `btn-ghost`, `btn-sm`, `card`, `card-dark`,
`eyebrow`, `section-tag`, `badge-primary|signal|success|warning|critical`, `bg-brand-gradient`, `missing-cell`, `missing-cell-dark`,
`blueprint-grid`, `frame`, `reveal`, `reveal-bar`. See `DESIGN.md` for the full rules.

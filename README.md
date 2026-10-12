# rainbow

Plain HTML + Tailwind CSS v4 (via the Tailwind CLI), themed with the Pulse
**Electric Coral** design system from Google Stitch.

## Usage

```bash
npm install
npm run dev     # watch HTML + src/input.css → dist/output.css
npm run build   # one-off minified build
```

Then open `index.html` (home) or `components.html` (component spec) in your browser.

## Theme (`src/input.css`)

| Token            | Value     | Use                                         |
| ---------------- | --------- | ------------------------------------------- |
| `coral`          | `#E11D48` | Primary CTAs, active filters, #1 ranked fix |
| `gap`            | `#F59E0B` | Missing attributes only                     |
| `void`           | `#140B0E` | Headlines, dark surfaces                    |
| `ink` / `muted`  | `#1E293B` / `#64748B` | Body / secondary text           |
| `surface-0/1`, `line` | `#FAFCFC` / `#F1F5F5` / `#E2E8F0` | Backgrounds, borders |
| `success` / `warning` / `critical` | `#059669` / `#D97706` / `#DC2626` | Audit status |

Fonts: `font-display` (Plus Jakarta Sans), `font-sans` (Inter), `font-mono` (JetBrains Mono).
Type scale: `text-h1`, `text-h2`, `text-h3`, `text-body`, `text-data`.

Component classes: `btn-primary`, `btn-secondary`, `btn-ghost`, `btn-sm`, `card`, `card-dark`,
`eyebrow`, `section-tag`, `badge-coral|success|warning|critical`, `missing-cell`, `missing-cell-dark`,
`blueprint-grid`, `blueprint-grid-dark`.

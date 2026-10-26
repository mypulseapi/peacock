/**
 * "What your business gains" on Decision Verification and Decision Monitor, and "What you get" on
 * Return Verification and Promotion Audit (owner, 26 Oct 2026): one wide card per benefit,
 * picture on one side and the claim on the other, alternating (the owner's layout A, 26 Oct 2026), in
 * the shape of the Decision Audit's own section, which keeps its exported figure.
 *
 * The pictures are drawn here rather than exported or generated: inline SVG painted from the theme
 * tokens, so they follow light and dark, with no text and no figures inside, so one drawing serves
 * both locales and nothing in it can claim a number (ODIN design/IMAGE-PLAN.md, "data gets drawn").
 * They are decorative (`aria-hidden`): the title and sentence beside each carry the meaning.
 */
import type { ReactNode } from "react";

const ART = {
  validate: (
    <svg viewBox="0 0 480 320" aria-hidden="true" className="size-full">
      <circle
        cx="400"
        cy="70"
        r="70"
        className="fill-primary-line"
        opacity=".35"
      />
      <circle cx="70" cy="270" r="54" className="fill-sky" opacity=".12" />
      <g className="illo-lift">
        <rect
          x="96"
          y="70"
          width="288"
          height="180"
          rx="18"
          className="fill-card"
        />
      </g>
      <rect
        x="124"
        y="98"
        width="96"
        height="10"
        rx="5"
        className="fill-baseline/40"
      />
      <rect
        x="124"
        y="140"
        width="232"
        height="16"
        rx="8"
        className="fill-surface-1"
      />
      <rect
        x="124"
        y="140"
        width="131"
        height="16"
        rx="8"
        className="fill-baseline/70"
      />
      <rect
        x="124"
        y="180"
        width="232"
        height="16"
        rx="8"
        className="fill-surface-1"
      />
      <rect
        x="124"
        y="180"
        width="199"
        height="16"
        rx="8"
        className="fill-primary"
      />
      <rect
        x="124"
        y="214"
        width="60"
        height="8"
        rx="4"
        className="fill-baseline/40"
        opacity=".6"
      />
      <g className="illo-lift">
        <circle cx="372" cy="94" r="26" className="fill-success" />
      </g>
      <path
        d="M360 94 l8 8 l16 -17"
        fill="none"
        className="stroke-card"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M338 160 l20 0 m-7 -7 l7 7 l-7 7"
        fill="none"
        className="stroke-primary"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity=".7"
      />
    </svg>
  ),
  notWorthIt: (
    <svg viewBox="0 0 480 320" aria-hidden="true" className="size-full">
      <circle
        cx="90"
        cy="70"
        r="64"
        className="fill-primary-line"
        opacity=".3"
      />
      <g className="illo-lift">
        <rect
          x="74"
          y="64"
          width="250"
          height="96"
          rx="16"
          className="fill-card"
        />
      </g>
      <circle cx="112" cy="112" r="18" className="fill-success-bg" />
      <path
        d="M104 112 l6 6 l11 -12"
        fill="none"
        className="stroke-success"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="144"
        y="96"
        width="110"
        height="10"
        rx="5"
        className="fill-baseline/40"
      />
      <rect
        x="144"
        y="118"
        width="150"
        height="12"
        rx="6"
        className="fill-surface-1"
      />
      <rect
        x="144"
        y="118"
        width="128"
        height="12"
        rx="6"
        className="fill-success"
      />
      <g opacity=".72">
        <rect
          className="fill-card stroke-baseline/60"
          x="156"
          y="182"
          width="250"
          height="96"
          rx="16"
          strokeDasharray="7 7"
          strokeWidth="2"
        />
        <circle cx="194" cy="230" r="18" className="fill-signal-tint" />
        <path
          d="M188 240 v-22 m0 0 h14 l-4 6 l4 6 h-14"
          fill="none"
          className="stroke-signal"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="226"
          y="214"
          width="110"
          height="10"
          rx="5"
          className="fill-baseline/40"
        />
        <rect
          x="226"
          y="236"
          width="150"
          height="12"
          rx="6"
          className="fill-surface-1"
        />
        <rect
          x="226"
          y="236"
          width="12"
          height="12"
          rx="6"
          className="fill-signal"
        />
      </g>
    </svg>
  ),
  evidence: (
    <svg viewBox="0 0 480 320" aria-hidden="true" className="size-full">
      <circle
        cx="400"
        cy="250"
        r="66"
        className="fill-chart-second"
        opacity=".12"
      />
      <g className="illo-lift">
        <rect
          x="140"
          y="40"
          width="200"
          height="250"
          rx="16"
          className="fill-card"
        />
      </g>
      <rect
        x="166"
        y="68"
        width="90"
        height="12"
        rx="6"
        className="fill-ink"
        opacity=".85"
      />
      <rect
        x="166"
        y="90"
        width="130"
        height="8"
        rx="4"
        className="fill-baseline/40"
      />
      <rect
        x="166"
        y="128"
        width="40"
        height="8"
        rx="4"
        className="fill-baseline/40"
      />
      <rect
        x="166"
        y="144"
        width="148"
        height="14"
        rx="7"
        className="fill-surface-1"
      />
      <rect
        x="166"
        y="144"
        width="105"
        height="14"
        rx="7"
        className="fill-baseline/70"
      />
      <rect
        x="166"
        y="176"
        width="40"
        height="8"
        rx="4"
        className="fill-baseline/40"
      />
      <rect
        x="166"
        y="192"
        width="148"
        height="14"
        rx="7"
        className="fill-surface-1"
      />
      <rect
        x="166"
        y="192"
        width="138"
        height="14"
        rx="7"
        className="fill-success"
      />
      <path
        d="M166 250 q20 -16 34 0 t34 0"
        fill="none"
        className="stroke-baseline"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g className="illo-lift" transform="rotate(-12 316 250)">
        <circle cx="316" cy="250" r="34" className="fill-primary" />
        <circle
          cx="316"
          cy="250"
          r="26"
          fill="none"
          className="stroke-card"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <path
          d="M304 250 l8 8 l16 -17"
          fill="none"
          className="stroke-card"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  ),
  decay: (
    <svg viewBox="0 0 480 320" aria-hidden="true" className="size-full">
      <circle cx="80" cy="80" r="60" className="fill-gap" opacity=".12" />
      <g className="illo-lift">
        <rect
          x="60"
          y="150"
          width="360"
          height="22"
          rx="8"
          className="fill-card"
        />
      </g>
      <g className="illo-lift">
        <rect
          x="84"
          y="88"
          width="56"
          height="62"
          rx="10"
          className="fill-primary-line"
        />
        <rect
          x="152"
          y="76"
          width="56"
          height="74"
          rx="10"
          className="fill-primary"
        />
        <rect
          x="220"
          y="96"
          width="56"
          height="54"
          rx="10"
          className="fill-sky"
        />
      </g>
      <rect
        x="288"
        y="104"
        width="56"
        height="46"
        rx="10"
        fill="none"
        className="stroke-gap"
        strokeWidth="2.5"
        strokeDasharray="6 6"
      />
      <rect
        x="300"
        y="128"
        width="32"
        height="22"
        rx="6"
        className="fill-gap-fill"
      />
      <rect
        x="84"
        y="196"
        width="320"
        height="10"
        rx="5"
        className="fill-surface-1"
      />
      <rect x="84" y="196" width="72" height="10" rx="5" className="fill-gap" />
      <g className="illo-lift">
        <circle cx="350" cy="64" r="28" className="fill-card" />
      </g>
      <path
        d="M340 70 h20 m-17 0 v-9 a7 7 0 0 1 14 0 v9 m-10 5 a3 3 0 0 0 6 0"
        fill="none"
        className="stroke-gap"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="366" cy="48" r="6" className="fill-signal" />
    </svg>
  ),
  cause: (
    <svg viewBox="0 0 480 320" aria-hidden="true" className="size-full">
      <circle
        cx="410"
        cy="260"
        r="64"
        className="fill-primary-line"
        opacity=".3"
      />
      <g className="illo-lift">
        <rect
          x="60"
          y="64"
          width="220"
          height="196"
          rx="16"
          className="fill-card"
        />
      </g>
      <g className="fill-surface-1">
        <rect x="80" y="84" width="54" height="44" rx="8" />
        <rect x="143" y="84" width="54" height="44" rx="8" />
        <rect x="206" y="84" width="54" height="44" rx="8" />
        <rect x="80" y="140" width="54" height="44" rx="8" />
        <rect x="206" y="140" width="54" height="44" rx="8" />
        <rect x="80" y="196" width="54" height="44" rx="8" />
        <rect x="143" y="196" width="54" height="44" rx="8" />
        <rect x="206" y="196" width="54" height="44" rx="8" />
      </g>
      <rect
        x="143"
        y="140"
        width="54"
        height="44"
        rx="8"
        className="fill-gap-fill"
      />
      <rect
        x="143"
        y="140"
        width="54"
        height="44"
        rx="8"
        fill="none"
        className="stroke-gap"
        strokeWidth="2.5"
        strokeDasharray="5 5"
      />
      <path
        d="M197 162 C 250 162, 270 150, 300 132"
        fill="none"
        className="stroke-gap"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="2 8"
      />
      <g className="illo-lift">
        <rect
          x="292"
          y="78"
          width="140"
          height="92"
          rx="14"
          className="fill-card"
        />
      </g>
      <rect x="292" y="78" width="6" height="92" rx="3" className="fill-gap" />
      <circle cx="322" cy="108" r="12" className="fill-gap-fill" />
      <path
        d="M322 102 v7 m0 5 v.5"
        fill="none"
        className="stroke-gap"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect
        x="342"
        y="102"
        width="70"
        height="9"
        rx="4.5"
        className="fill-baseline/40"
      />
      <rect
        x="312"
        y="132"
        width="100"
        height="8"
        rx="4"
        className="fill-surface-1"
      />
      <rect
        x="312"
        y="148"
        width="66"
        height="8"
        rx="4"
        className="fill-surface-1"
      />
    </svg>
  ),
  quarters: (
    <svg viewBox="0 0 480 320" aria-hidden="true" className="size-full">
      <circle cx="80" cy="260" r="60" className="fill-sky" opacity=".12" />
      <path
        d="M56 236 H424"
        className="stroke-baseline"
        strokeWidth="2"
        strokeDasharray="3 7"
      />
      <g className="illo-lift">
        <rect
          x="60"
          y="92"
          width="76"
          height="132"
          rx="12"
          className="fill-card"
        />
        <rect
          x="152"
          y="92"
          width="76"
          height="132"
          rx="12"
          className="fill-card"
        />
        <rect
          x="244"
          y="92"
          width="76"
          height="132"
          rx="12"
          className="fill-card"
        />
        <rect
          x="336"
          y="92"
          width="76"
          height="132"
          rx="12"
          className="fill-card"
        />
      </g>
      <g className="fill-baseline/40">
        <rect x="74" y="106" width="30" height="7" rx="3.5" />
        <rect x="166" y="106" width="30" height="7" rx="3.5" />
        <rect x="258" y="106" width="30" height="7" rx="3.5" />
        <rect x="350" y="106" width="30" height="7" rx="3.5" />
      </g>
      <rect
        x="84"
        y="150"
        width="28"
        height="60"
        rx="6"
        className="fill-primary"
      />
      <rect
        x="176"
        y="138"
        width="28"
        height="72"
        rx="6"
        className="fill-primary"
      />
      <rect
        x="268"
        y="128"
        width="28"
        height="82"
        rx="6"
        className="fill-primary"
      />
      <rect
        x="360"
        y="164"
        width="28"
        height="46"
        rx="6"
        className="fill-signal"
      />
      <path
        d="M98 150 L190 138 L282 128 L374 164"
        fill="none"
        className="stroke-primary"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity=".55"
      />
      <g className="illo-lift">
        <circle cx="400" cy="84" r="18" className="fill-signal" />
      </g>
      <path
        d="M400 76 v10 m0 6 v.5"
        fill="none"
        className="stroke-card"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  returnsSplit: (
    <svg viewBox="0 0 480 320" aria-hidden="true" className="size-full">
      <circle
        cx="400"
        cy="70"
        r="70"
        className="fill-primary-line"
        opacity=".35"
      />
      <circle cx="70" cy="270" r="54" className="fill-sky" opacity=".12" />
      <rect
        x="204"
        y="40"
        width="28"
        height="22"
        rx="5"
        className="fill-primary"
      />
      <rect
        x="232"
        y="30"
        width="28"
        height="22"
        rx="5"
        className="fill-baseline"
      />
      <rect
        x="260"
        y="44"
        width="28"
        height="22"
        rx="5"
        className="fill-primary"
      />
      <rect
        x="218"
        y="66"
        width="28"
        height="22"
        rx="5"
        className="fill-baseline"
      />
      <rect
        x="246"
        y="62"
        width="28"
        height="22"
        rx="5"
        className="fill-primary"
      />
      <path
        d="M240 96v18M240 114L155 150M240 114l85 36"
        fill="none"
        className="stroke-baseline/50"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g className="illo-lift">
        <rect
          x="80"
          y="150"
          width="150"
          height="110"
          rx="18"
          className="fill-card"
        />
      </g>
      <g className="illo-lift">
        <rect
          x="250"
          y="150"
          width="150"
          height="110"
          rx="18"
          className="fill-card"
        />
      </g>
      <rect
        x="100"
        y="176"
        width="28"
        height="22"
        rx="5"
        className="fill-primary"
      />
      <rect
        x="136"
        y="176"
        width="28"
        height="22"
        rx="5"
        className="fill-primary"
      />
      <rect
        x="172"
        y="176"
        width="28"
        height="22"
        rx="5"
        className="fill-primary"
      />
      <rect
        x="272"
        y="176"
        width="28"
        height="22"
        rx="5"
        className="fill-baseline"
      />
      <rect
        x="308"
        y="176"
        width="28"
        height="22"
        rx="5"
        className="fill-baseline"
      />
      <rect
        x="100"
        y="222"
        width="100"
        height="10"
        rx="5"
        className="fill-primary-tint"
      />
      <rect
        x="272"
        y="222"
        width="90"
        height="10"
        rx="5"
        className="fill-surface-1"
      />
      <g className="illo-lift">
        <circle cx="222" cy="156" r="22" className="fill-success" />
      </g>
      <path
        d="M212 156 l7 7 l14 -15"
        fill="none"
        className="stroke-card"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  factsRanked: (
    <svg viewBox="0 0 480 320" aria-hidden="true" className="size-full">
      <circle
        cx="400"
        cy="70"
        r="70"
        className="fill-primary-line"
        opacity=".35"
      />
      <circle cx="70" cy="270" r="54" className="fill-sky" opacity=".12" />
      <g className="illo-lift">
        <rect
          x="90"
          y="56"
          width="300"
          height="208"
          rx="18"
          className="fill-card"
        />
      </g>
      <rect
        x="118"
        y="82"
        width="110"
        height="10"
        rx="5"
        className="fill-baseline/40"
      />
      <rect
        x="118"
        y="122"
        width="60"
        height="12"
        rx="6"
        className="fill-surface-1"
      />
      <rect
        x="196"
        y="121"
        width="166"
        height="14"
        rx="7"
        className="fill-surface-1"
      />
      <rect
        x="196"
        y="121"
        width="150"
        height="14"
        rx="7"
        className="fill-gap"
      />
      <rect
        x="118"
        y="166"
        width="60"
        height="12"
        rx="6"
        className="fill-surface-1"
      />
      <rect
        x="196"
        y="165"
        width="166"
        height="14"
        rx="7"
        className="fill-surface-1"
      />
      <rect
        x="196"
        y="165"
        width="108"
        height="14"
        rx="7"
        className="fill-gap"
      />
      <rect
        x="118"
        y="210"
        width="60"
        height="12"
        rx="6"
        className="fill-surface-1"
      />
      <rect
        x="196"
        y="209"
        width="166"
        height="14"
        rx="7"
        className="fill-surface-1"
      />
      <rect
        x="196"
        y="209"
        width="70"
        height="14"
        rx="7"
        className="fill-gap"
      />
    </svg>
  ),
  repairProof: (
    <svg viewBox="0 0 480 320" aria-hidden="true" className="size-full">
      <circle
        cx="400"
        cy="70"
        r="70"
        className="fill-primary-line"
        opacity=".35"
      />
      <circle cx="70" cy="270" r="54" className="fill-sky" opacity=".12" />
      <g className="illo-lift">
        <rect
          x="70"
          y="60"
          width="340"
          height="200"
          rx="18"
          className="fill-card"
        />
      </g>
      <path d="M98 232H382" className="stroke-surface-1" strokeWidth="3" />
      <path
        d="M240 84V232"
        className="stroke-baseline"
        strokeWidth="2"
        strokeDasharray="6 6"
      />
      <path
        d="M98 140 L134 132 L169 142 L204 134 L240 140 L276 138 L311 144 L346 146 L382 148"
        fill="none"
        className="stroke-baseline"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M98 150 L134 142 L169 152 L204 144 L240 150 L276 176 L311 196 L346 206 L382 214"
        fill="none"
        className="stroke-primary"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="240" cy="150" r="9" className="fill-primary" />
      <g className="illo-lift">
        <circle cx="382" cy="84" r="22" className="fill-success" />
      </g>
      <path
        d="M372 84 l7 7 l14 -15"
        fill="none"
        className="stroke-card"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  ownCosts: (
    <svg viewBox="0 0 480 320" aria-hidden="true" className="size-full">
      <circle
        cx="400"
        cy="70"
        r="70"
        className="fill-primary-line"
        opacity=".35"
      />
      <circle cx="70" cy="270" r="54" className="fill-sky" opacity=".12" />
      <ellipse
        cx="170"
        cy="232"
        rx="64"
        ry="18"
        className="fill-primary-tint stroke-primary"
        strokeWidth="3"
      />
      <ellipse
        cx="170"
        cy="212"
        rx="64"
        ry="18"
        className="fill-primary-tint stroke-primary"
        strokeWidth="3"
      />
      <ellipse
        cx="170"
        cy="192"
        rx="64"
        ry="18"
        className="fill-primary-tint stroke-primary"
        strokeWidth="3"
      />
      <ellipse
        cx="170"
        cy="172"
        rx="64"
        ry="18"
        className="fill-primary-tint stroke-primary"
        strokeWidth="3"
      />
      <ellipse
        cx="170"
        cy="152"
        rx="64"
        ry="18"
        className="fill-primary stroke-primary"
        strokeWidth="3"
      />
      <g className="illo-lift">
        <rect
          x="262"
          y="104"
          width="150"
          height="112"
          rx="18"
          className="fill-card"
        />
      </g>
      <rect
        x="284"
        y="132"
        width="106"
        height="14"
        rx="7"
        className="fill-primary"
      />
      <rect
        x="284"
        y="162"
        width="40"
        height="14"
        rx="7"
        className="fill-baseline/70"
      />
      <rect
        x="284"
        y="192"
        width="60"
        height="8"
        rx="4"
        className="fill-baseline/40"
      />
    </svg>
  ),
  staysBought: (
    <svg viewBox="0 0 480 320" aria-hidden="true" className="size-full">
      <circle
        cx="400"
        cy="70"
        r="70"
        className="fill-primary-line"
        opacity=".35"
      />
      <circle cx="70" cy="270" r="54" className="fill-sky" opacity=".12" />
      <g className="illo-lift">
        <rect
          x="110"
          y="36"
          width="240"
          height="248"
          rx="18"
          className="fill-card"
        />
      </g>
      <rect
        x="132"
        y="60"
        width="40"
        height="40"
        rx="10"
        className="fill-primary"
      />
      <rect
        x="186"
        y="68"
        width="130"
        height="10"
        rx="5"
        className="fill-surface-1"
      />
      <rect
        x="186"
        y="86"
        width="60"
        height="8"
        rx="4"
        className="fill-primary-tint"
      />
      <rect
        x="132"
        y="112"
        width="40"
        height="40"
        rx="10"
        className="fill-surface-1"
      />
      <rect
        x="186"
        y="120"
        width="110"
        height="10"
        rx="5"
        className="fill-surface-1"
      />
      <rect
        x="186"
        y="138"
        width="60"
        height="8"
        rx="4"
        className="fill-primary-tint"
      />
      <rect
        x="132"
        y="164"
        width="40"
        height="40"
        rx="10"
        className="fill-surface-1"
      />
      <rect
        x="186"
        y="172"
        width="120"
        height="10"
        rx="5"
        className="fill-surface-1"
      />
      <rect
        x="186"
        y="190"
        width="60"
        height="8"
        rx="4"
        className="fill-primary-tint"
      />
      <rect
        x="132"
        y="216"
        width="40"
        height="40"
        rx="10"
        className="fill-surface-1"
      />
      <rect
        x="186"
        y="224"
        width="96"
        height="10"
        rx="5"
        className="fill-surface-1"
      />
      <rect
        x="186"
        y="242"
        width="60"
        height="8"
        rx="4"
        className="fill-primary-tint"
      />
      <path
        d="M370 120c34 30 34 76 0 104"
        fill="none"
        className="stroke-baseline"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M360 214l10 11 13-9"
        fill="none"
        className="stroke-baseline"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  offerNet: (
    <svg viewBox="0 0 480 320" aria-hidden="true" className="size-full">
      <circle
        cx="400"
        cy="70"
        r="70"
        className="fill-primary-line"
        opacity=".35"
      />
      <circle cx="70" cy="270" r="54" className="fill-sky" opacity=".12" />
      <g className="illo-lift">
        <rect
          x="70"
          y="80"
          width="340"
          height="160"
          rx="18"
          className="fill-card"
        />
      </g>
      <rect
        x="100"
        y="112"
        width="280"
        height="26"
        rx="8"
        className="fill-primary/35"
      />
      <rect
        x="100"
        y="170"
        width="180"
        height="26"
        rx="8"
        className="fill-primary"
      />
      <rect
        x="288"
        y="170"
        width="44"
        height="26"
        rx="8"
        className="fill-baseline"
      />
      <rect
        x="340"
        y="170"
        width="40"
        height="26"
        rx="8"
        className="fill-none stroke-baseline"
        strokeWidth="2"
        strokeDasharray="6 5"
      />
    </svg>
  ),
  giveNothing: (
    <svg viewBox="0 0 480 320" aria-hidden="true" className="size-full">
      <circle
        cx="400"
        cy="70"
        r="70"
        className="fill-primary-line"
        opacity=".35"
      />
      <circle cx="70" cy="270" r="54" className="fill-sky" opacity=".12" />
      <g className="illo-lift">
        <rect
          x="62"
          y="112"
          width="96"
          height="96"
          rx="18"
          className="fill-card"
        />
      </g>
      <circle cx="86" cy="136" r="8" className="fill-primary" />
      <circle cx="110" cy="136" r="8" className="fill-primary" />
      <circle cx="134" cy="136" r="8" className="fill-primary" />
      <circle cx="86" cy="160" r="8" className="fill-primary" />
      <circle cx="110" cy="160" r="8" className="fill-primary" />
      <circle cx="134" cy="160" r="8" className="fill-primary" />
      <circle cx="86" cy="184" r="8" className="fill-primary" />
      <circle cx="110" cy="184" r="8" className="fill-primary" />
      <circle cx="134" cy="184" r="8" className="fill-primary" />
      <g className="illo-lift">
        <rect
          x="192"
          y="112"
          width="96"
          height="96"
          rx="18"
          className="fill-card"
        />
      </g>
      <circle cx="216" cy="136" r="8" className="fill-baseline" />
      <circle cx="240" cy="136" r="8" className="fill-baseline" />
      <circle cx="264" cy="136" r="8" className="fill-baseline" />
      <circle cx="216" cy="160" r="8" className="fill-baseline" />
      <circle cx="240" cy="160" r="8" className="fill-baseline" />
      <circle cx="264" cy="160" r="8" className="fill-baseline" />
      <circle cx="216" cy="184" r="8" className="fill-baseline" />
      <circle cx="240" cy="184" r="8" className="fill-baseline" />
      <circle cx="264" cy="184" r="8" className="fill-baseline" />
      <g className="illo-lift">
        <rect
          x="322"
          y="112"
          width="96"
          height="96"
          rx="18"
          className="fill-card"
        />
      </g>
      <circle cx="346" cy="136" r="8" className="fill-primary" />
      <circle cx="370" cy="136" r="8" className="fill-primary" />
      <circle cx="394" cy="136" r="8" className="fill-primary" />
      <circle cx="346" cy="160" r="8" className="fill-primary" />
      <circle cx="370" cy="160" r="8" className="fill-primary" />
      <circle cx="394" cy="160" r="8" className="fill-primary" />
      <circle cx="346" cy="184" r="8" className="fill-primary" />
      <circle cx="370" cy="184" r="8" className="fill-primary" />
      <circle cx="394" cy="184" r="8" className="fill-primary" />
      <circle
        cx="240"
        cy="160"
        r="60"
        fill="none"
        className="stroke-baseline"
        strokeWidth="6"
      />
      <path
        d="M198 202L282 118"
        className="stroke-baseline"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  ),
  repairVsDiscount: (
    <svg viewBox="0 0 480 320" aria-hidden="true" className="size-full">
      <circle
        cx="400"
        cy="70"
        r="70"
        className="fill-primary-line"
        opacity=".35"
      />
      <circle cx="70" cy="270" r="54" className="fill-sky" opacity=".12" />
      <path
        d="M240 96V250M180 256H300"
        className="stroke-baseline/50"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M120 104L360 88"
        className="stroke-baseline"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M120 104L96 172M120 104L144 172M360 88L336 156M360 88L384 156"
        fill="none"
        className="stroke-baseline/50"
        strokeWidth="2"
      />
      <path d="M84 172h72q-8 22-36 22t-36-22z" className="fill-surface-1" />
      <path d="M324 156h72q-8 22-36 22t-36-22z" className="fill-surface-1" />
      <g className="illo-lift">
        <rect
          x="98"
          y="136"
          width="44"
          height="36"
          rx="8"
          className="fill-primary"
        />
        <path d="M342 124h30l14 15-14 15h-30z" className="fill-sky" />
      </g>
      <circle cx="352" cy="139" r="4" className="fill-card" />
      <circle
        cx="240"
        cy="96"
        r="10"
        className="fill-card stroke-baseline"
        strokeWidth="3"
      />
    </svg>
  ),
  landedPrice: (
    <svg viewBox="0 0 480 320" aria-hidden="true" className="size-full">
      <circle
        cx="400"
        cy="70"
        r="70"
        className="fill-primary-line"
        opacity=".35"
      />
      <circle cx="70" cy="270" r="54" className="fill-sky" opacity=".12" />
      <g className="illo-lift">
        <rect
          x="70"
          y="70"
          width="340"
          height="180"
          rx="18"
          className="fill-card"
        />
      </g>
      <rect
        x="98"
        y="100"
        width="70"
        height="10"
        rx="5"
        className="fill-baseline/40"
      />
      <rect
        x="98"
        y="120"
        width="280"
        height="22"
        rx="7"
        className="fill-primary/35"
      />
      <rect
        x="98"
        y="172"
        width="70"
        height="10"
        rx="5"
        className="fill-baseline/40"
      />
      <rect
        x="98"
        y="192"
        width="180"
        height="22"
        rx="7"
        className="fill-primary"
      />
      <rect
        x="284"
        y="192"
        width="40"
        height="22"
        rx="7"
        className="fill-sky"
      />
      <rect
        x="330"
        y="192"
        width="34"
        height="22"
        rx="7"
        className="fill-baseline"
      />
    </svg>
  ),
  testUnknown: (
    <svg viewBox="0 0 480 320" aria-hidden="true" className="size-full">
      <circle
        cx="400"
        cy="70"
        r="70"
        className="fill-primary-line"
        opacity=".35"
      />
      <circle cx="70" cy="270" r="54" className="fill-sky" opacity=".12" />
      <g className="illo-lift">
        <path
          d="M226 50v70l-58 104a14 14 0 0 0 12 20h120a14 14 0 0 0 12-20l-58-104V50z"
          className="fill-card"
        />
      </g>
      <path
        d="M214 50h52"
        className="stroke-baseline"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M190 180h100l26 46a8 8 0 0 1-7 12H171a8 8 0 0 1-7-12z"
        className="fill-primary-tint"
      />
      <circle cx="214" cy="206" r="10" className="fill-primary" />
      <circle cx="252" cy="220" r="7" className="fill-sky" />
      <circle cx="246" cy="190" r="5" className="fill-primary" />
      <g className="illo-lift">
        <rect
          x="330"
          y="96"
          width="110"
          height="84"
          rx="18"
          className="fill-card"
        />
      </g>
      <path
        d="M385 108v60"
        className="stroke-baseline/50"
        strokeWidth="2"
        strokeDasharray="5 5"
      />
      <circle cx="350" cy="122" r="5" className="fill-baseline" />
      <circle cx="404" cy="122" r="5" className="fill-primary" />
      <circle cx="366" cy="122" r="5" className="fill-baseline" />
      <circle cx="420" cy="122" r="5" className="fill-primary" />
      <circle cx="350" cy="140" r="5" className="fill-baseline" />
      <circle cx="404" cy="140" r="5" className="fill-primary" />
      <circle cx="366" cy="140" r="5" className="fill-baseline" />
      <circle cx="420" cy="140" r="5" className="fill-primary" />
      <circle cx="350" cy="158" r="5" className="fill-baseline" />
      <circle cx="404" cy="158" r="5" className="fill-primary" />
      <circle cx="366" cy="158" r="5" className="fill-baseline" />
      <circle cx="420" cy="158" r="5" className="fill-primary" />
    </svg>
  ),
} satisfies Record<string, ReactNode>;

export type GainsArt = keyof typeof ART;

export function GainsCards({
  items,
}: {
  /** `art` is one of the drawings above; `picture` is any other picture, such as an owner's image. */
  items: { art?: GainsArt; picture?: ReactNode; title: string; body: string }[];
}) {
  return (
    <div className="mt-14 grid gap-4">
      {items.map((item, i) => (
        <article
          key={item.title}
          className="reveal grid items-center gap-6 rounded-2xl border border-line bg-card p-4 lg:grid-cols-2 lg:gap-14 lg:p-5"
        >
          <div
            className={`aspect-3/2 overflow-hidden rounded-xl border border-line bg-primary-wash ${i % 2 ? "lg:order-last" : ""}`}
          >
            {item.picture ?? (item.art && ART[item.art])}
          </div>
          <div
            className={`px-2 pb-4 lg:px-0 lg:pb-0 ${i % 2 ? "lg:pl-6" : "lg:pr-6"}`}
          >
            <h3 className="text-h3 text-balance text-ink">{item.title}</h3>
            <p className="mt-2 max-w-prose text-body text-pretty text-muted">
              {item.body}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

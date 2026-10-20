/**
 * The chart palette.
 *
 * Three categorical hues plus a baseline neutral, checked as a set on the light
 * product surface: lightness band, chroma floor, CVD separation (worst adjacent
 * ΔE 29.3 protan), normal-vision floor (33.2) and contrast all pass. The
 * neutral is #6b7480 rather than a lighter grey because anything lighter fell
 * under 3:1 against the surface and would have needed a relief.
 *
 * These are the same three hues the story figures already use, so a reader
 * moving between an article and a product page sees one visual system.
 */
export const C = {
  /** Good, resolved, "after". */
  good: "var(--sig-deep)",
  goodBg: "var(--sig-tint)",
  /** In progress, the engine, "ours". */
  work: "var(--sig-deep)",
  workBg: "#eef3fe",
  /** The problem, the gap, "before" when before is bad. */
  warn: "#b91c1c",
  warnBg: "#fdeceb",
  /**
   * The held-back arm, the baseline, the "before".
   *
   * This was #6b7480 grey, which read as switched off rather than as the half
   * of the comparison that makes the other half mean anything. Gold reads as a
   * second real series. 4.92:1 on white and 3.87:1 on ink, so one value works
   * on both surfaces.
   */
  hold: "#A16207",
  holdBg: "#fdf1dd",

  /**
   * Not yet resolved. Deliberately not the gold: against the green it sits
   * beside in the unit chart, gold measures ΔE 14.3 for normal vision and 3.1
   * for deuteranopia, which is no separation. Blue measures 30.9.
   */
  pending: "var(--sig-deep)",
  pendingBg: "#e4e8fb",

  /** Neutral, for axis labels and rules. Never a data mark. */
  base: "#6b7480",
  baseBg: "#eef0f4",

  ink: "#16181d",
  mid: "#4c5563",
  mute: "#9aa1ad",
  grid: "#eef0f4",
} as const;

export type Tone = "good" | "work" | "warn" | "base";

/** One easing, so every chart on the site accelerates the same way. */
export const EASE = "cubic-bezier(.22,.61,.36,1)";

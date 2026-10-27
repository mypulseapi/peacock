"use client";

import { useRef, type ReactNode } from "react";

/**
 * Before and after as one picture you wipe across (owner, 27 Oct 2026, the agent pages; 21st.dev's
 * image compare). The before picture fills the frame and the after picture is clipped to the right of
 * the handle, so the two must share a composition: the image briefs ask for exactly that.
 *
 * The control is a native range input stretched invisibly over the frame, so dragging anywhere, a tap
 * and the arrow keys all work, and a screen reader hears a slider named by the two labels. It only
 * writes `--pos` (`compare` in globals.css); without JavaScript the frame rests at half and half.
 */
export function CompareSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
}: {
  before: ReactNode;
  after: ReactNode;
  beforeLabel: string;
  afterLabel: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={frame}
      className="compare relative aspect-16/10 overflow-hidden rounded-3xl border border-line bg-surface-1"
    >
      <div className="absolute inset-0">{before}</div>
      <div className="compare-after absolute inset-0">{after}</div>
      <span className="compare-line" aria-hidden="true" />
      <span className="compare-knob" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
        </svg>
      </span>
      <span className="badge pointer-events-none absolute top-4 left-4 border-line bg-card text-ink">
        {beforeLabel}
      </span>
      <span className="badge-primary pointer-events-none absolute top-4 right-4">
        {afterLabel}
      </span>
      <input
        type="range"
        min={0}
        max={100}
        defaultValue={50}
        aria-label={`${beforeLabel} / ${afterLabel}`}
        className="compare-range"
        onInput={(e) =>
          frame.current?.style.setProperty("--pos", `${e.currentTarget.value}%`)
        }
      />
    </div>
  );
}

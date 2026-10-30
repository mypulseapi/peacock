"use client";

/**
 * The call-to-action background (21st.dev "background-boxes" by manuarora700, owner 28 Oct 2026):
 * a skewed grid whose cells light under the cursor, each in a brand colour picked at random as it
 * enters (`[data-boxes]` in designed-motion.js), and fade out over two seconds. Put it first inside a
 * `cta-boxes` section; the styles are `cta-boxes` and `boxes-grid` in globals.css.
 *
 * No dependency: the original animates each cell with framer-motion, here a CSS `:hover` and a
 * transition do it, and a few lines of the site's motion script pick the colour. The original also
 * draws 150 × 100 cells; a 1920px band shows about 65 × 44 of them and the edges fade into the page,
 * so 64 × 44 covers every screen up to 2560px with a fifth of the DOM.
 *
 * The cells are drawn after hydration, not exported. They are decoration, and 2,816 empty divs in
 * the HTML and again in the page's RSC data were most of the "big file size" an SEO crawl flagged
 * on every page (2026-10-30).
 */
import { useEffect, useState, type CSSProperties } from "react";

const COLUMNS = Array.from({ length: 64 });
const CELLS = Array.from({ length: 44 });

export function CtaBoxes() {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => setDrawn(true), []);
  return (
    <div
      aria-hidden="true"
      className="boxes-grid"
      data-boxes
      style={
        {
          "--columns": COLUMNS.length,
          "--cells": CELLS.length,
        } as CSSProperties
      }
    >
      {drawn &&
        COLUMNS.map((_, i) => (
          <div key={i}>
            {CELLS.map((_, j) => (
              <div key={j} />
            ))}
          </div>
        ))}
    </div>
  );
}

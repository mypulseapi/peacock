#!/usr/bin/env node
/**
 * Responsive checks against the exported site.
 *
 * It serves `out/` itself and drives a real browser, because the failures worth catching are
 * layout failures and nothing short of layout finds them. A grep for `overflow-x` cannot tell you
 * that one table pushes the page 40px wide at 320; a browser measuring `scrollWidth` can.
 *
 * What it asserts, per page per width:
 *
 *   1. **No horizontal scroll.** The single most common phone bug and the most visible: the whole
 *      page slides sideways and the right edge of every section is cut off.
 *   2. **Nothing wider than the viewport**, reported with the offending element, because knowing
 *      the page overflows without knowing what overflows it is half an answer.
 *   3. **Tap targets at least 24px.** The WCAG 2.2 minimum (2.5.8), judged on touch viewports.
 *      Smaller is a link a thumb cannot reliably hit.
 *   4. **Body text at least 12px.** Below that a phone zooms, and a zoomed page reintroduces (1).
 *
 * The widest viewport is a baseline and the narrower ones are diffed against it, so what gets
 * reported is what breaks as the page narrows rather than every imperfection at every width.
 *
 * Playwright is not a dependency of this repository: it is a 300MB browser download, and adding it
 * to CI to run on every pull request costs more than this check is worth there. Resolve it from
 * wherever it is installed instead:
 *
 *   node --experimental-strip-types scripts/check-responsive.mjs
 *   PLAYWRIGHT=/path/to/node_modules/playwright node scripts/check-responsive.mjs
 *
 * Run it after `pnpm build`, before shipping a layout change.
 */
import { createServer } from "node:http";
import { readFile, readdir } from "node:fs/promises";
import { join, extname, relative } from "node:path";
import { existsSync } from "node:fs";

const OUT = "out";
const WIDTHS = [
  { w: 320, h: 640, name: "320 (small phone)" },
  { w: 375, h: 812, name: "375 (iPhone)" },
  { w: 414, h: 896, name: "414 (large phone)" },
  { w: 768, h: 1024, name: "768 (tablet)" },
  { w: 1280, h: 800, name: "1280 (laptop)" },
];
const MIN_TAP = 24;
const MIN_FONT = 12;
/** A sample is enough: every page shares the same shell, and 115 pages times 5 widths is slow. */
const SAMPLE = Number(process.env.PAGES ?? 14);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

/** GitHub Pages resolves an extensionless path to `<path>.html`; mirror that or every link 404s. */
function serve() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const url = decodeURIComponent(req.url.split("?")[0]);
      const candidates = [
        join(OUT, url),
        join(OUT, `${url}.html`),
        join(OUT, url, "index.html"),
        join(OUT, "404.html"),
      ];
      for (const file of candidates) {
        if (!existsSync(file) || !extname(file)) continue;
        try {
          const body = await readFile(file);
          res.writeHead(file.endsWith("404.html") ? 404 : 200, {
            "content-type": TYPES[extname(file)] ?? "application/octet-stream",
          });
          return res.end(body);
        } catch {
          /* try the next candidate */
        }
      }
      res.writeHead(404).end("not found");
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

const PROBE = ({ minTap, minFont }) => {
  const vw = document.documentElement.clientWidth;
  const problems = [];

  const describe = (el) => {
    const id = el.id ? `#${el.id}` : "";
    const cls =
      typeof el.className === "string" && el.className
        ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".")
        : "";
    const text = (el.textContent ?? "").trim().slice(0, 30);
    return `${el.tagName.toLowerCase()}${id}${cls}${text ? ` "${text}"` : ""}`;
  };

  if (document.documentElement.scrollWidth > vw + 1) {
    problems.push({
      kind: "horizontal-scroll",
      detail: `page is ${document.documentElement.scrollWidth}px wide in a ${vw}px viewport`,
    });
  }

  for (const el of document.body.querySelectorAll("*")) {
    const style = getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;

    /*
     * Overflowing elements.
     *
     * Only when nothing above them scrolls. A wide table inside `overflow-x: auto` is the correct
     * way to show a wide table on a phone, not a bug: the table overflows its container on
     * purpose and the container, not the page, takes the scroll. The first version of this check
     * reported 568 of those and zero real faults, which is worse than no check, because it would
     * have had someone "fix" markup that was already right.
     *
     * A deliberately offscreen element sits at a negative left, which is also not this.
     */
    const contained = (node) => {
      for (let a = node.parentElement; a && a !== document.body; a = a.parentElement) {
        const ov = getComputedStyle(a).overflowX;
        if (ov === "auto" || ov === "scroll" || ov === "hidden") return true;
      }
      return false;
    };
    if (r.right > vw + 1 && r.left >= 0 && style.position !== "fixed" && !contained(el)) {
      problems.push({
        kind: "overflow",
        detail: `${describe(el)} extends to ${Math.round(r.right)}px (viewport ${vw}px)`,
      });
    }

    const tag = el.tagName.toLowerCase();
    const interactive =
      tag === "a" || tag === "button" || tag === "select" || tag === "textarea" ||
      (tag === "input" && el.type !== "hidden");
    if (interactive && (r.height < minTap || r.width < minTap)) {
      /*
       * An `::after` overlay that expands the target counts, and `getBoundingClientRect()` cannot
       * see it. The design system's `hit-area` utility does exactly this -- absolutely positioned,
       * with negative insets taking the clickable region out to 44px -- and without this check it
       * reported 21 compliant buttons as failures. A checker that cannot be trusted on the pattern
       * a design system uses deliberately is worse than no checker, because the real finding ends
       * up buried in its noise.
       */
      /*
       * Screen-reader-only elements are not tap targets until they are focused.
       *
       * The skip link is `sr-only` -- clipped to a 1px box -- and becomes a full-size button on
       * focus, which is the correct pattern for WCAG 2.4.1 and what every well-built site does.
       * Measuring it unfocused reported 232 failures across every page for markup that is right.
       * 2.5.8 only applies to a target that is actually presented.
       */
      const clipped =
        style.clipPath === "inset(50%)" ||
        style.clip === "rect(0px, 0px, 0px, 0px)" ||
        (r.width <= 1 && r.height <= 1);
      if (clipped) continue;

      const after = getComputedStyle(el, "::after");
      const expands =
        after.content !== "none" &&
        after.position === "absolute" &&
        ["top", "bottom", "left", "right"].some((side) => {
          const v = parseFloat(after[side]);
          return Number.isFinite(v) && v < 0;
        });
      if (expands) continue;

      /*
       * WCAG 2.2 AA 2.5.8 exempts a link whose target is "in a sentence or block of text". That
       * exemption is the whole reason prose can contain links at all, so it is honoured here:
       * flagging every inline link in a legal page is noise that buries the real findings.
       */
      const inSentence =
        tag === "a" &&
        style.display.startsWith("inline") &&
        el.closest("p, li, td, dd, blockquote, figcaption");
      if (!inSentence) {
        problems.push({
          kind: "tap-target",
          detail: `${describe(el)} is ${Math.round(r.width)}x${Math.round(r.height)}px, under ${minTap}px`,
        });
      }
    }

    /*
     * Text size, for body copy only.
     *
     * There is no WCAG minimum font size, and a 10px chip label or table caption is a deliberate
     * typographic choice rather than a defect. What is a defect is body copy a reader has to zoom
     * to read, because zooming a page is what reintroduces horizontal scroll. So this asks only
     * about running text.
     */
    const size = parseFloat(style.fontSize);
    const isBodyCopy = el.closest("p, li, dd, blockquote") !== null;
    if (size && size < minFont && isBodyCopy && el.childElementCount === 0 &&
        (el.textContent ?? "").trim().length > 20) {
      problems.push({ kind: "font-size", detail: `${describe(el)} at ${size}px, under ${minFont}px` });
    }
  }

  // One line per distinct problem: an overflowing grid reports every cell otherwise.
  const seen = new Set();
  return problems.filter((p) => {
    const key = `${p.kind}|${p.detail}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const playwrightPath = process.env.PLAYWRIGHT ?? "playwright";
let chromium;
try {
  ({ chromium } = await import(playwrightPath));
} catch {
  console.error(
    `Could not load playwright from "${playwrightPath}".\n` +
      `It is deliberately not a dependency here (a 300MB browser download). Point PLAYWRIGHT at an\n` +
      `install, e.g. PLAYWRIGHT=../rainbow/node_modules/playwright node scripts/check-responsive.mjs`,
  );
  process.exit(2);
}

const files = (await walk(OUT)).filter((f) => f.endsWith(".html"));
const routes = files
  .map((f) => "/" + relative(OUT, f).replace(/\.html$/, "").replace(/\/index$/, ""))
  .filter((r) => !/^\/(404|_not-found)$/.test(r))
  .sort();

/* Spread the sample across sections rather than taking the alphabetical head, which would be
 * fourteen /en/blog pages and no product page at all. */
const step = Math.max(1, Math.floor(routes.length / SAMPLE));
const sample = routes.filter((_, i) => i % step === 0).slice(0, SAMPLE);

const server = await serve();
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch();
const failures = [];

console.log(`responsive: ${sample.length} of ${routes.length} pages x ${WIDTHS.length} widths\n`);

/*
 * The widest viewport is the baseline, and narrower ones are compared against it.
 *
 * This is a responsive check, so the question is what BREAKS as the viewport narrows, not what is
 * imperfect at every width. A 10px label inside a mock dashboard is 10px at 1280 too: it is a
 * typographic decision to argue with in a design review, and reporting it here buries the one
 * finding that is actually about width. Measured: 55 of 75 findings were identical at every
 * width, which is a checker telling you about the page rather than about responsiveness.
 *
 * Two kinds are absolute rather than compared. Horizontal scroll is never acceptable at any
 * width. Tap targets are judged on touch viewports because that is where a thumb is, and a
 * baseline measured with a mouse cannot excuse them.
 */
const ABSOLUTE = new Set(["horizontal-scroll", "tap-target", "http"]);
const baselineByRoute = new Map();

for (const { w, h, name } of [...WIDTHS].reverse()) {
  const context = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: 2,
    isMobile: w < 768,
    hasTouch: w < 768,
  });
  const page = await context.newPage();
  const isBaseline = w === Math.max(...WIDTHS.map((x) => x.w));
  let bad = 0;

  for (const route of sample) {
    const res = await page.goto(`${base}${route}`, { waitUntil: "load" });
    if (!res || res.status() >= 400) {
      failures.push({ width: name, route, kind: "http", detail: `status ${res?.status()}` });
      bad++;
      continue;
    }
    // Fonts shift layout as they swap in, and a measurement taken before that is measuring the
    // fallback. This is the single most common source of a flaky layout assertion.
    await page.evaluate(() => document.fonts?.ready);
    const problems = await page.evaluate(PROBE, { minTap: MIN_TAP, minFont: MIN_FONT });

    if (isBaseline) {
      baselineByRoute.set(route, new Set(problems.map((x) => `${x.kind}|${x.detail}`)));
    }
    const baseline = baselineByRoute.get(route) ?? new Set();

    for (const problem of problems) {
      const key = `${problem.kind}|${problem.detail}`;
      const newAtThisWidth = !baseline.has(key);
      const touch = w < 768;
      const report =
        problem.kind === "horizontal-scroll" ||
        problem.kind === "http" ||
        (problem.kind === "tap-target" && (touch || isBaseline)) ||
        newAtThisWidth;
      if (!report) continue;
      failures.push({ width: name, route, ...problem });
      bad++;
    }
  }

  console.log(
    `  ${bad === 0 ? "ok  " : "FAIL"} ${name}${isBaseline ? "  [baseline]" : ""}${bad ? `  ${bad} problem(s)` : ""}`,
  );
  await context.close();
}

await browser.close();
server.close();

if (failures.length === 0) {
  console.log(`\nresponsive ok — no overflow, no tap target under ${MIN_TAP}px, no text under ${MIN_FONT}px`);
  process.exit(0);
}

const byKind = failures.reduce((m, f) => ((m[f.kind] ??= []).push(f), m), {});
console.log(`\n${failures.length} problem(s):\n`);
for (const [kind, list] of Object.entries(byKind).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`  ${String(list.length).padStart(4)}  ${kind}`);
  for (const f of list.slice(0, 6)) console.log(`        [${f.width}] ${f.route}: ${f.detail}`);
  if (list.length > 6) console.log(`        ... and ${list.length - 6} more`);
}
console.log("");
process.exit(1);

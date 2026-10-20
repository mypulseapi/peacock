#!/usr/bin/env node
/**
 * Convert one of the designer's HTML pages into JSX, mechanically.
 *
 *   node scripts/html-to-jsx.mjs index.html --out src/components/designed/home
 *   node scripts/html-to-jsx.mjs index.html --ref afedfc1 --out src/components/designed/home
 *
 * The design and the content at commit `afedfc1` are the approved ones, written by a designer and
 * a content writer. Retyping 183 KB of markup by hand would introduce differences that are
 * indistinguishable from decisions, so this does the mechanical part and **reports anything it is
 * not sure about** rather than guessing. If it prints a warning, the answer is to teach it the
 * case, not to hand-fix the output: the next page will hit the same thing.
 *
 * What it does NOT do, on purpose:
 *
 *   - Extract text for i18n. That is a second pass with a human reading it, because deciding what
 *     is a translatable string and what is a product name is a judgement call.
 *   - Touch the icon sprite. Those 41 `<symbol>`s belong in the layout once, not in every page.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, basename } from "node:path";

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--"));
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const OUT = flag("out", "src/components/designed");
const REF = flag("ref", "afedfc1");

if (!file) {
  console.error("usage: node scripts/html-to-jsx.mjs <page.html> [--ref <git-ref>] [--out <dir>]");
  process.exit(2);
}

const warnings = [];
const warn = (what, sample) => warnings.push({ what, sample });

/** Read from git by default: the working tree no longer has these files. */
function source(path) {
  if (existsSync(path)) return readFileSync(path, "utf8");
  return execFileSync("git", ["show", `${REF}:${path}`], { encoding: "utf8", maxBuffer: 64e6 });
}

/* ------------------------------------------------------------------ *
 * Attribute translation.
 *
 * Only the attributes these pages actually use. A table of every HTML attribute would be mostly
 * dead rows, and a missing one is caught by the unknown-kebab check below rather than shipped.
 * ------------------------------------------------------------------ */
const ATTRS = {
  class: "className",
  for: "htmlFor",
  tabindex: "tabIndex",
  readonly: "readOnly",
  maxlength: "maxLength",
  minlength: "minLength",
  autocomplete: "autoComplete",
  autofocus: "autoFocus",
  spellcheck: "spellCheck",
  contenteditable: "contentEditable",
  crossorigin: "crossOrigin",
  srcset: "srcSet",
  enterkeyhint: "enterKeyHint",
  inputmode: "inputMode",
  novalidate: "noValidate",
  formaction: "formAction",
  colspan: "colSpan",
  rowspan: "rowSpan",
  usemap: "useMap",
  playsinline: "playsInline",
  // SVG presentation attributes. React accepts the kebab forms on SVG elements but warns, and a
  // console full of warnings is how a real one gets missed.
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-dasharray": "strokeDasharray",
  "stroke-dashoffset": "strokeDashoffset",
  "stroke-opacity": "strokeOpacity",
  "stroke-miterlimit": "strokeMiterlimit",
  "fill-rule": "fillRule",
  "fill-opacity": "fillOpacity",
  "clip-rule": "clipRule",
  "clip-path": "clipPath",
  "stop-color": "stopColor",
  "stop-opacity": "stopOpacity",
  "text-anchor": "textAnchor",
  "dominant-baseline": "dominantBaseline",
  "font-family": "fontFamily",
  "font-size": "fontSize",
  "font-weight": "fontWeight",
  "letter-spacing": "letterSpacing",
  "marker-end": "markerEnd",
  "marker-start": "markerStart",
  "vector-effect": "vectorEffect",
  "shape-rendering": "shapeRendering",
  "color-interpolation-filters": "colorInterpolationFilters",
  "flood-color": "floodColor",
  "flood-opacity": "floodOpacity",
  "xlink:href": "href",
  "xmlns:xlink": undefined, // dropped: React does not need it and rejects the colon
};

/**
 * `stroke-width="2"` becomes `strokeWidth="2"`, on attribute NAMES only.
 *
 * The first version scanned the whole attribute string with one regex, which matched every token
 * inside a quoted value too: `class="flex items-center"` reported `items-center` as an unknown
 * kebab-case attribute, 2,858 times. Attributes are tokenised properly here, so a value is never
 * mistaken for a name and the warnings mean something.
 */
function renameAttributes(html) {
  // name, then optionally = and a quoted / bare value. Quotes are consumed whole.
  const ATTR = /([a-zA-Z_:][\w:.-]*)(\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?/g;

  return html.replace(/<([a-zA-Z][\w:-]*)((?:\s[^<>]*?)?)(\/?)>/g, (whole, tag, attrs, slash) => {
    if (!attrs || !attrs.trim()) return whole;

    const rebuilt = attrs.replace(ATTR, (m, name, value = "") => {
      const lower = name.toLowerCase();
      if (Object.prototype.hasOwnProperty.call(ATTRS, lower)) {
        const mapped = ATTRS[lower];
        return mapped === undefined ? "" : mapped + value;
      }
      if (/^(data|aria)-/.test(lower)) return m;
      if (lower.includes("-")) warn(`unknown kebab-case attribute: ${name}`, whole.slice(0, 90));
      if (lower.includes(":")) warn(`namespaced attribute: ${name}`, whole.slice(0, 90));
      return m;
    });
    return `<${tag}${rebuilt}${slash}>`;
  });
}

/**
 * Escape what JSX reads differently from HTML, in text nodes only.
 *
 *   - `{` and `}` are an expression in JSX, so a literal brace has to say so.
 *   - A bare `"` is legal JSX but `react/no-unescaped-entities` rejects it, and the designer's
 *     copy uses real quotation marks. Fifteen of them on the home page.
 *
 * Only between `>` and `<`, so attribute values are never touched: rewriting a quote inside
 * `class="..."` would destroy the attribute.
 */
function escapeText(html) {
  return html.replace(/>([^<]*)</g, (m, text) => {
    if (!/[{}"]/.test(text)) return m;
    const escaped = text
      .replace(/\{/g, "{'{'}")
      .replace(/\}/g, "{'}'}")
      .replace(/"/g, "&quot;");
    return ">" + escaped + "<";
  });
}

// `<!-- note -->` becomes a JSX comment, keeping the designer notes rather than deleting them.
function convertComments(html) {
  return html.replace(/<!--([\s\S]*?)-->/g, (_m, body) => {
    // A comment containing `*/` would close the JSX comment early.
    const safe = body.replace(/\*\//g, "*​/");
    return `{/*${safe}*/}`;
  });
}

/** The designer's pages load assets from `./src/assets`; here they are served from `/assets`. */
function rewriteAssetPaths(html) {
  return html
    .replace(/(["'(])\.\/src\/assets\//g, "$1/assets/")
    .replace(/(["'(])\.\.\/src\/assets\//g, "$1/assets/")
    .replace(/(["'(])src\/assets\//g, "$1/assets/");
}

/** Void elements React needs closed. The designer's HTML already closes them; this is the guard. */
const VOID = ["br", "hr", "img", "input", "meta", "link", "source", "track", "area", "col", "embed", "param", "wbr"];
function closeVoids(html) {
  let out = html;
  for (const tag of VOID) {
    const open = new RegExp(`<${tag}\\b([^>]*?)(?<!/)>`, "gi");
    out = out.replace(open, (m, attrs) => {
      warn(`unclosed void element <${tag}>`, m.slice(0, 70));
      return `<${tag}${attrs} />`;
    });
  }
  return out;
}

/** Inline `style="a: b"` -> `style={{ a: "b" }}`. */
function convertStyles(html) {
  return html.replace(/\sstyle="([^"]*)"/g, (_m, css) => {
    const props = css
      .split(";")
      .map((d) => d.trim())
      .filter(Boolean)
      .map((d) => {
        const at = d.indexOf(":");
        if (at === -1) return null;
        const prop = d.slice(0, at).trim();
        const value = d.slice(at + 1).trim();
        // Custom properties keep their name and need quoting as a key.
        const key = prop.startsWith("--")
          ? `"${prop}"`
          : prop.replace(/-([a-z])/g, (_x, c) => c.toUpperCase());
        return `${key}: ${JSON.stringify(value)}`;
      })
      .filter(Boolean);
    return ` style={{ ${props.join(", ")} }}`;
  });
}

function toJsx(html) {
  let out = html;
  /*
   * Order matters, and got this wrong once.
   *
   * `escapeText` has to run while comments are still `<!-- -->`, because a comment body sits
   * between `<` and `>` and its regex only looks at text between `>` and `<`. Run it after
   * `convertComments` instead and it escapes the braces of every JSX comment that function just
   * produced, turning `{/* note *\/}` into `{'{'{'}'}/* note *\/{'}'}` and breaking the file.
   * Twenty-four of those across five components, all reported as TS1005.
   */
  out = escapeText(out);
  out = convertComments(out);
  out = rewriteAssetPaths(out);
  out = renameAttributes(out);
  out = convertStyles(out);
  out = closeVoids(out);
  return out;
}

/* ------------------------------------------------------------------ */

const raw = source(file);
const mainMatch = /<main\b[^>]*>([\s\S]*)<\/main>/i.exec(raw);
if (!mainMatch) {
  console.error(`No <main> in ${file}. Refusing to guess which part of the page is the content.`);
  process.exit(1);
}
const main = mainMatch[1];

/**
 * Split on top-level `<section>` so each becomes its own component.
 *
 * One 183 KB file is not reviewable and not editable. Depth tracking rather than a regex, because
 * these sections nest and a non-greedy match would close at the first inner `</section>`.
 */
function topLevelSections(html) {
  const out = [];
  const re = /<\/?section\b[^>]*>/gi;
  let depth = 0;
  let start = -1;
  let before = 0;
  let pendingBanner = null;
  for (let m = re.exec(html); m !== null; m = re.exec(html)) {
    const closing = m[0].startsWith("</");
    if (!closing) {
      if (depth === 0) {
        if (m.index > before) {
          const gap = html.slice(before, m.index);
          if (gap.trim()) out.push({ kind: "loose", html: gap });
        }
        pendingBanner = bannerIn(html.slice(before, m.index));
        start = m.index;
      }
      depth += 1;
    } else {
      depth -= 1;
      if (depth === 0 && start !== -1) {
        out.push({
          kind: "section",
          html: html.slice(start, m.index + m[0].length),
          banner: pendingBanner,
        });
        pendingBanner = null;
        before = m.index + m[0].length;
        start = -1;
      }
    }
  }
  if (before < html.length && html.slice(before).trim()) {
    out.push({ kind: "loose", html: html.slice(before) });
  }
  return out;
}

const parts = topLevelSections(main);
const sections = parts.filter((p) => p.kind === "section");
const loose = parts.filter((p) => p.kind === "loose");

/**
 * The designer writes a banner comment above each section: `<!-- ===== HOW IT WORKS ===== -->`.
 * It is the best name available for a section with no id, and far better than `Section3`.
 */
function bannerIn(fragment) {
  const comments = [...fragment.matchAll(/<!--([\s\S]*?)-->/g)].map((m) => m[1]);
  for (const c of comments.reverse()) {
    const cleaned = c.replace(/=+/g, " ").replace(/\s+/g, " ").trim();
    // A banner is short and shouty; a prose note explaining the section is not a name.
    if (cleaned && cleaned.length <= 40 && !cleaned.includes(".") && !/^\//.test(cleaned)) {
      return cleaned;
    }
  }
  return null;
}

/** A stable, readable component name from the section's id, then its banner, else its position. */
function nameFor(section, i) {
  const openTag = /^<section\b[^>]*>/i.exec(section.html)?.[0] ?? "";
  const id = /\bid="([^"]+)"/.exec(openTag)?.[1];
  const base = id ?? (section.banner ? section.banner.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : `section-${i + 1}`);
  const pascal = base.replace(/(^|[-_])([a-z0-9])/g, (_m, _s, c) => c.toUpperCase());
  return `${pascal}Section`;
}

mkdirSync(OUT, { recursive: true });
const written = [];

sections.forEach((section, i) => {
  const name = nameFor(section, i);
  const jsx = toJsx(section.html);
  const fileName = `${name.replace(/Section$/, "").replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()}.tsx`;
  const body = `/**
 * Converted from \`${basename(file)}\` at ${REF} by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
export function ${name}() {
  return (
${jsx
  .split("\n")
  .map((l) => (l.trim() ? `    ${l}` : ""))
  .join("\n")}
  );
}
`;
  writeFileSync(join(OUT, fileName), body);
  written.push({ name, fileName, bytes: Buffer.byteLength(body) });
});

console.log(`${file} -> ${OUT}`);
console.log(`  ${sections.length} section(s), ${loose.length} loose fragment(s)\n`);
for (const w of written) {
  console.log(`  ${w.fileName.padEnd(34)} ${w.name.padEnd(28)} ${(w.bytes / 1024).toFixed(0)} KB`);
}

if (loose.length > 0) {
  console.log(`\n  ${loose.length} fragment(s) outside any <section>, NOT written:`);
  for (const l of loose) console.log(`    ${l.html.trim().slice(0, 100).replace(/\s+/g, " ")}`);
}

if (warnings.length > 0) {
  const seen = new Map();
  for (const w of warnings) if (!seen.has(w.what)) seen.set(w.what, w.sample);
  console.log(`\n  ${warnings.length} warning(s), ${seen.size} distinct:`);
  for (const [what, sample] of seen) console.log(`    ${what}\n      ${sample.replace(/\s+/g, " ")}`);
  process.exitCode = 1;
}

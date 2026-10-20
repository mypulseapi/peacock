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
import { join, basename, posix } from "node:path";

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--"));
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const OUT = flag("out", "src/components/designed");
const REF = flag("ref", "afedfc1");
/** Internal links become routes under this locale. */
const LOCALE = flag("locale", "en");
/**
 * Convert the whole of `<main>` as one component instead of splitting on `<section>`.
 *
 * Page bodies split naturally into sections and are far easier to review that way. The shell
 * pieces -- the header, the footer, the skip link, the chat launcher -- are single elements that
 * are not sections at all, so splitting writes nothing and reports them as loose fragments.
 */
const WHOLE = args.includes("--whole");
/**
 * Skip the generated `index.tsx`.
 *
 * The shell pieces share a directory with a hand-written barrel that exports all four of them,
 * and the generated composition would overwrite it every run. It has done so twice.
 */
const NO_INDEX = args.includes("--no-index");
const NAME = flag("name", null);

if (!file) {
  console.error("usage: node scripts/html-to-jsx.mjs <page.html> [--ref <git-ref>] [--out <dir>]");
  process.exit(2);
}

/** The source page's directory, so `../x.html` resolves the way the browser would. */
const PAGE_DIR = posix.dirname(file);

const warnings = [];
/** Set when any component ends up needing next/link, so only those files import it. */
let usesLink = false;
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
 * Attributes React types as numbers. `rows="5"` is a type error; `rows={5}` is not.
 *
 * Only converted when the value really is a number, so `size="auto"` or a templated value is left
 * alone and surfaces as a type error rather than being silently mangled.
 */
const NUMERIC = new Set([
  "rows", "cols", "size", "span", "start", "maxLength", "minLength", "colSpan", "rowSpan",
  "tabIndex", "width", "height",
]);

function numericAttributes(html) {
  return html.replace(/<([a-zA-Z][\w:-]*)((?:\s[^<>]*?)?)(\/?)>/g, (whole, tag, attrs, slash) => {
    if (!attrs) return whole;
    // SVG width/height take units ("100%"), so leave the SVG tree alone entirely.
    if (/^(svg|rect|image|use|symbol|pattern|mask|filter|foreignObject)$/i.test(tag)) return whole;
    const out = attrs.replace(/(\s)([a-zA-Z][\w]*)="(-?\d+)"/g, (m, sp, name, value) =>
      NUMERIC.has(name) ? `${sp}${name}={${value}}` : m,
    );
    return `<${tag}${out}${slash}>`;
  });
}

/**
 * Inline event handlers cannot survive the move.
 *
 * `onsubmit="return false;"` is a string of JavaScript; React wants a function. There is no honest
 * automatic translation, so these are removed and reported, and the behaviour is reattached as a
 * real handler when the page gets its interactivity back. Leaving them in would compile to a React
 * prop that silently never fires, which is worse than the attribute being gone.
 */
function stripInlineHandlers(html) {
  return html.replace(/\son[a-z]+="[^"]*"/gi, (m) => {
    warn(`inline event handler removed: ${m.trim().split("=")[0]}`, m.trim().slice(0, 70));
    return "";
  });
}

/**
 * Escape what JSX reads differently from HTML, in text nodes only.
 *
 *   - `{` and `}` are an expression in JSX, so a literal brace has to say so.
 *   - A bare `"` or `'` is legal JSX but `react/no-unescaped-entities` rejects it, and the copy
 *     uses real quotation marks and apostrophes. Both render identically once escaped; most of
 *     the designer's text already uses the typographic forms, which the rule does not flag.
 *
 * Only between `>` and `<`, so attribute values are never touched: rewriting a quote inside
 * `class="..."` would destroy the attribute.
 */
function escapeText(html) {
  return html.replace(/>([^<]*)</g, (m, text) => {
    if (!/[{}"']/.test(text)) return m;
    const escaped = text
      .replace(/\{/g, "{'{'}")
      .replace(/\}/g, "{'}'}")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
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

/**
 * `about.html` becomes `/en/about`.
 *
 * The designer's pages link to each other as files, which is right for a folder of HTML and wrong
 * for a routed app: `href="about.html"` resolves against whatever path the browser is on, so from
 * `/en/product` it asks for `/en/product/about.html`. Every internal link has to become a route.
 *
 * Anchors, mailto, tel and absolute URLs are left exactly as they are.
 */
function rewriteLinks(html, locale) {
  /*
   * Resolve against the page's own directory, and keep any #fragment.
   *
   * Two bugs lived here. Only a leading `./` was stripped, so `../contact.html` on a page under
   * `product/` became `/en/../contact` -- which a browser normalises to `/contact`, a route that
   * does not exist. That was 31 links. And the `.html` test ran against the whole href, so
   * `../index.html#method` failed it and shipped as a raw relative link; that was 4 more.
   *
   * `posix.resolve` from the page's directory does what the browser would do, before the locale
   * prefix goes on.
   */
  return html.replace(/href="([^"]+)"/g, (whole, href) => {
    if (/^(#|https?:|mailto:|tel:|\/)/.test(href)) return whole;
    const [path, hash = ""] = splitHash(href);
    if (!path.endsWith(".html")) return whole;
    const abs = posix.resolve("/", PAGE_DIR, path).slice(1);
    // index.html is the locale root; careers/index.html is /careers.
    const route = abs.replace(/(^|\/)index\.html$/, "").replace(/\.html$/, "");
    return `href="/${locale}${route ? "/" + route : ""}${hash}"`;
  });
}

/** `a.html#b` -> `["a.html", "#b"]`. A query string counts as part of the tail. */
function splitHash(href) {
  const i = href.search(/[#?]/);
  return i === -1 ? [href, ""] : [href.slice(0, i), href.slice(i)];
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

/**
 * An internal `<a>` becomes a `<Link>`.
 *
 * Next's `no-html-link-for-pages` rule is right to insist: a plain anchor to an internal route is
 * a full page reload, which throws away the app and reloads every asset to move between two
 * pages that share a layout. 180 of them came out of the shell and the converted pages.
 *
 * Anchors cannot nest, so the first `</a>` after an opening tag is always its own. That makes the
 * pairing unambiguous without parsing, which is the only reason this is safe to do with a scan.
 */
function anchorsToLinks(html) {
  let out = "";
  let i = 0;
  let converted = 0;

  while (i < html.length) {
    /*
     * `<a` followed by any whitespace, not the literal `<a `.
     *
     * Prettier breaks a long opening tag after the element name, so half the anchors in this
     * markup begin `<a\n  href=...`. Matching on the space missed every one of them and left 208
     * of 208 unconverted on the second pass.
     */
    const found = /<a[\s>]/.exec(html.slice(i));
    const open = found ? i + found.index : -1;
    if (open === -1) {
      out += html.slice(i);
      break;
    }
    const openEnd = html.indexOf(">", open);
    if (openEnd === -1) {
      out += html.slice(i);
      break;
    }
    const tag = html.slice(open, openEnd + 1);
    /*
     * `</a\n>`, not just `</a>`.
     *
     * The source is Prettier-formatted HTML, which breaks a long tag so the closing bracket lands
     * on its own line. Searching for the literal `</a>` skips straight past those and pairs an
     * opening tag with the NEXT anchor's close, which swallowed everything between them and
     * produced `</a` inside a `<Link>`. It compiled to nothing and broke the page.
     */
    const closeMatch = /<\/a\s*>/.exec(html.slice(openEnd));
    const close = closeMatch ? openEnd + closeMatch.index : -1;
    const closeLen = closeMatch ? closeMatch[0].length : 4;
    const internal = /href="\/[^"]*"/.test(tag) && !/\bdownload\b|target="_blank"/.test(tag);

    if (!internal || close === -1) {
      out += html.slice(i, openEnd + 1);
      i = openEnd + 1;
      continue;
    }

    out += html.slice(i, open) + "<Link " + tag.slice(3, -1) + ">" + html.slice(openEnd + 1, close) + "</Link>";
    i = close + closeLen;
    converted += 1;
  }

  return { html: out, converted };
}

/**
 * `<template>` content has to be opaque to React.
 *
 * A template's children are inert markup, cloned later by script. React renders them as real
 * children and then cannot match them on hydration, which fails the whole tree: "Hydration
 * failed because the server rendered HTML didn't match the client", and everything below the
 * boundary is thrown away and re-rendered. On a page whose content is revealed by that same
 * script, the result is a blank page.
 *
 * Passing the content as `dangerouslySetInnerHTML` tells React to leave it alone, which is what
 * the designer's plain HTML does anyway.
 */
function templatesToInnerHtml(html) {
  return html.replace(/<template\b([^>]*)>([\s\S]*?)<\/template>/g, (_m, attrs, inner) => {
    const content = JSON.stringify(inner);
    return `<template${attrs} dangerouslySetInnerHTML={{ __html: ${content} }} />`;
  });
}

/**
 * `value` on a field React would call controlled becomes `defaultValue`.
 *
 * In HTML `value` is the initial value. In React it makes a controlled input, and without an
 * `onChange` the field is read-only and React warns on every one. The designer's sliders and
 * number inputs are plain HTML with their initial value in the markup, so `defaultValue` is the
 * faithful translation.
 *
 * `<option value>` is left alone: there it means what React means by it.
 */
function valueToDefaultValue(html) {
  return html.replace(/<(input|textarea|select)\b([^>]*)>/gi, (whole, tag, attrs) => {
    if (/\bonChange=/.test(attrs) || !/\bvalue=/.test(attrs)) return whole;
    return `<${tag}${attrs.replace(/\bvalue=/, "defaultValue=")}>`;
  });
}

function toJsx(html, locale = LOCALE) {
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
  out = rewriteLinks(out, locale);
  /*
   * Before the JSX transforms, not after.
   *
   * A template's content is raw HTML handed to `dangerouslySetInnerHTML`, so it must keep
   * `class=` and its original attribute names. Extracting it after `renameAttributes` baked
   * `className=` into a string the browser parses as HTML, where className means nothing and the
   * element would render unstyled. Link and asset rewriting still has to happen first, because
   * those apply to the template's content too.
   */
  out = templatesToInnerHtml(out);
  out = renameAttributes(out);
  out = convertStyles(out);
  out = numericAttributes(out);
  out = valueToDefaultValue(out);
  out = stripInlineHandlers(out);
  out = closeVoids(out);
  const linked = anchorsToLinks(out);
  usesLink ||= linked.converted > 0;
  return preserveInlineSpace(linked.html);
}

/**
 * Put back the space JSX throws away either side of an inline tag.
 *
 * HTML collapses a newline to one space, so `for sale.\n<a ...>What we can...` renders with a gap
 * before the link. JSX does not: whitespace that touches a tag boundary and contains a newline is
 * removed outright, so the same markup rendered `for sale.What we can...`. The browser then has
 * one unbreakable token to place, which pushed a 224px link onto its own line at 605px wide and
 * moved everything after it.
 *
 * The source is Prettier-formatted HTML, and Prettier is whitespace-aware in exactly this spot:
 * where it must not introduce a space it writes `</a\n>` instead of breaking before the tag. So a
 * newline between text and an inline tag in the source really does mean a space belongs there.
 */
function preserveInlineSpace(jsx) {
  const INLINE = "(?:Link|a|em|strong|code|span|b|i|abbr|sup|sub)";
  return jsx
    // text, newline, opening inline tag
    .replace(new RegExp(`([^\\s>}])(\\n\\s*)(<${INLINE}[\\s/>])`, "g"), '$1{" "}$2$3')
    // closing inline tag, newline, text
    .replace(new RegExp(`(</${INLINE}>)(\\n\\s*)([^\\s<{])`, "g"), '$1{" "}$2$3');
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

const parts = WHOLE
  ? [{ kind: "section", html: main, banner: NAME }]
  : topLevelSections(main);
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
  if (WHOLE && NAME) {
    return NAME.replace(/(^|[-_])([a-z0-9])/g, (_m, _s, c) => c.toUpperCase());
  }
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
  // Reset before converting, not after: `toJsx` is what sets the flag.
  usesLink = false;
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
${usesLink ? 'import Link from "next/link";\n\n' : ""}export function ${name}() {
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

/*
 * The composing component, generated too.
 *
 * Writing it by hand for twenty pages is twenty chances to leave a section out, and a missing
 * section is invisible: the page just renders shorter. Generated from the same list that wrote
 * the files, so the two cannot disagree.
 */
const pageName = basename(file, ".html").replace(/(^|[-_])([a-z0-9])/g, (_m, _s, c) => c.toUpperCase());
const componentName = `Designed${pageName === "Index" ? basename(OUT).replace(/(^|[-_])([a-z0-9])/g, (_m, _s, c) => c.toUpperCase()) : pageName}`;

if (!NO_INDEX)
  writeFileSync(
  join(OUT, "index.tsx"),
  `/**
 * \`${basename(file)}\` as the designer built it at ${REF}, one component per section.
 *
 * Generated by scripts/html-to-jsx.mjs along with the sections themselves, so a section cannot be
 * left out of the composition by accident. Re-run the converter rather than editing this.
 *
 * Text is still inline English; extracting it for Vietnamese is a separate pass.
 */
${written.map((w) => `import { ${w.name} } from "./${w.fileName.replace(/\.tsx$/, "")}";`).join("\n")}

export function ${componentName}() {
  return (
    <>
${written.map((w) => `      <${w.name} />`).join("\n")}
    </>
  );
}
`,
);

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

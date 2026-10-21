#!/usr/bin/env node
/**
 * Bring a designer's SVG figure export into the site, minus the font it does not need.
 *
 * Each exported figure embeds its own subset of Geist as base64, which is the right call for a
 * file that has to stand alone. On this site it is dead weight twice over: the page already
 * self-hosts Geist as a variable font with Latin, Latin-ext and Vietnamese subsets
 * (`globals.css`), and the figures sit *inside* that page. Measured across the three product
 * pages, the embedded faces were over 90% of the transferred bytes:
 *
 *   decision-audit         85.0 KB gzip -> 11.6 KB
 *   decision-verification  81.3 KB gzip ->  4.1 KB
 *   decision-monitor      108.6 KB gzip ->  5.1 KB
 *
 * Base64 is why the ratio is so lopsided: it barely compresses, so it dominated the gzip figure
 * even where it was half the raw bytes.
 *
 * Dropping the subset also fixes a correctness problem rather than only a size one. The export
 * subsets to the glyphs its text uses today, and the README invites editing that text in place.
 * A subset would render a tofu box for the first character nobody anticipated, and on a site
 * that ships Vietnamese that is not hypothetical. The site's own face covers both languages.
 *
 * What is deliberately left alone: the per-file id, class and keyframe prefixes (`das-`, `dar-`,
 * ...). They are what lets four figures share one page without colliding, so only the
 * font-family token is rewritten, never the prefix scheme.
 *
 *   node scripts/import-figures.mjs                 # report what would change
 *   node scripts/import-figures.mjs --write         # write them
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { join, basename, dirname, relative } from "node:path";
import { gzipSync } from "node:zlib";

const ROOT = join(import.meta.dirname, "..");
const SOURCE = join(ROOT, "..", "rainbow", "reference", "exports");
const DEST = join(ROOT, "src", "components", "designed", "product", "figures");

/*
 * The families the page already serves, with the fallbacks `globals.css` pairs them with.
 *
 * Single quotes, not double. Five of the eleven figures set the font through the XML attribute
 * `font-family="dar-Geist"` rather than the CSS property, and a double-quoted family name
 * substituted into a double-quoted attribute closes it early: `font-family=""Geist", ...`. The
 * file stops being well-formed and the browser drops the rest of the attribute list. Single
 * quotes are valid in both syntaxes, so one spelling serves both.
 */
const SANS = "'Geist', 'Geist Fallback', system-ui, sans-serif";
const MONO = "'Geist Mono', 'Geist Mono Fallback', ui-monospace, monospace";

const write = process.argv.includes("--write");

if (!existsSync(SOURCE)) {
  console.error(`No export directory at ${SOURCE}`);
  process.exit(1);
}

/** Every .svg under the export, one directory per product. */
function sources() {
  const out = [];
  for (const dir of readdirSync(SOURCE, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    for (const f of readdirSync(join(SOURCE, dir.name))) {
      if (f.endsWith(".svg")) out.push(join(SOURCE, dir.name, f));
    }
  }
  return out.sort();
}

/**
 * Strip the embedded faces and point the family at the page's font.
 *
 * `@font-face` bodies hold no nested braces, so a non-greedy match to the first `}` is enough and
 * does not need a brace counter. Mono is replaced before sans because `GeistMono` contains
 * `Geist`: the other order would rewrite the prefix and leave `Mono` dangling.
 */
function convert(svg) {
  let out = svg.replace(/@font-face\s*\{[^}]*\}/g, "");

  /*
   * Replace the whole declared value, not just the family token.
   *
   * The CSS form arrives as `font-family:dah-Geist,system-ui,sans-serif`. Swapping only the
   * token leaves the export's own fallbacks tacked onto ours, so the value ends
   * `...sans-serif,system-ui,sans-serif`. Harmless to a browser, but it is the kind of residue
   * that makes the next reader wonder which half is deliberate. Consuming the tail up to the
   * delimiter replaces the declaration outright.
   *
   * Mono before sans in each pair, because `GeistMono` contains `Geist` and the looser pattern
   * would otherwise rewrite the prefix and strand `Mono`.
   */
  const family = (mono) => (mono ? MONO : SANS);
  for (const mono of [true, false]) {
    const name = mono ? "GeistMono" : "Geist";
    // The XML attribute: font-family="dar-GeistMono"
    out = out.replace(
      new RegExp(`font-family="[A-Za-z0-9]+-${name}"`, "g"),
      `font-family="${family(mono)}"`,
    );
    // The CSS property, with however many fallbacks the export appended.
    out = out.replace(
      new RegExp(`font-family:\\s*[A-Za-z0-9]+-${name}[^;}"']*`, "g"),
      `font-family:${family(mono)}`,
    );
  }

  // An emptied <style> is noise in a file meant to be read inline.
  out = out.replace(/<style[^>]*>\s*<\/style>/g, "");
  return out;
}

/* ------------------------------------------------------------------ */
/* Translations                                                        */
/* ------------------------------------------------------------------ */

/**
 * Work out what each editable line says in every locale we ship.
 *
 * The figures are exported with their copy in English, and these sections were translated in
 * B13, so dropping them in as exported would put English back on `/vi` and undo that. The
 * `data-edit` attributes exist precisely so the words can be replaced, which is the way out.
 *
 * The mapping is derived rather than hand-written. Each editable line is, character for
 * character, the English already in the catalogue, so matching on the string itself recovers
 * which key it came from. Eleven hand-maintained key maps would be eleven things to forget to
 * update the next time the designer moves a line.
 *
 * Only leaf nodes are considered: `data-edit="step-1"` wraps the three `data-edit="step-1-*"`
 * lines, and treating the wrapper as text would capture its children's markup. A leaf is a
 * `data-edit` whose content holds no further tags.
 */
const LOCALES = ["en", "vi"];

/**
 * The editable lines, and only those.
 *
 * Two shapes carry text. Most hold it directly (`<p data-edit="step-1-title">Re-export...`), and
 * some wrap it in one presentational element (`<div data-edit="card-1-caption"><p class="dag-cap">
 * missing fields...`). A third shape is a container whose children are themselves editable
 * (`card-1-text` holds `card-1-title` and `card-1-body`), and that one must be skipped: its text
 * is its children's, and rewriting it would replace their markup with a single string.
 *
 * The optional middle group is what separates them. It matches one opening tag only if that tag
 * does not itself carry `data-edit`, so a container fails to match and is passed over, while a
 * presentational wrapper is seen through. Getting this wrong is not loud: the first version only
 * matched direct text, which silently left nine of the Decision Audit gains lines in English on
 * the Vietnamese page.
 */
const LEAF = /data-edit="([^"]+)"[^>]*>(?:<(?!\/)(?:(?!data-edit)[^>])*>)?([^<]+)/g;

const unescape = (s) =>
  s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");

function flatten(obj, prefix = "", out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) flatten(v, path, out);
    else if (typeof v === "string") out[path] = v;
  }
  return out;
}

function catalogues() {
  const out = {};
  for (const loc of LOCALES) {
    out[loc] = flatten(JSON.parse(readFileSync(join(ROOT, "messages", `designed.${loc}.json`), "utf8")));
  }
  return out;
}

function translations(figures) {
  const cat = catalogues();
  const byEnglish = new Map();
  for (const [key, value] of Object.entries(cat.en)) {
    const k = value.trim();
    if (!byEnglish.has(k)) byEnglish.set(k, []);
    byEnglish.get(k).push(key);
  }

  const out = {};
  let lines = 0;
  const unmatched = [];

  for (const { id, product, svg } of figures) {
    const entry = {};
    for (const [, key, raw] of svg.matchAll(LEAF)) {
      const english = unescape(raw).trim();
      if (!english) continue;
      lines++;

      // Scope to the product, so `Fields filled` on one page cannot pick up a key from another.
      const keys = (byEnglish.get(english) || []).filter((k) => k.includes(product));
      const values = new Set(keys.map((k) => cat.vi[k]).filter(Boolean));

      /*
       * More than one key can hold the same English, and that is not a problem as long as they
       * all translate the same way: `before-caption` and `after-caption` are both "Fields
       * filled", from two keys that are identical in both languages. Only disagreement is
       * ambiguous, and that would be a real question for a human rather than a guess.
       */
      if (keys.length === 0) {
        unmatched.push(`${id} ${key}: ${english.slice(0, 48)}`);
        continue;
      }
      if (values.size > 1) {
        throw new Error(
          `${id} ${key}: ${keys.length} keys disagree on the translation: ${[...values].join(" | ")}`,
        );
      }
      if (values.size === 0) {
        unmatched.push(`${id} ${key}: untranslated (${keys[0]})`);
        continue;
      }
      entry[key] = { en: english, vi: [...values][0] };
    }
    if (Object.keys(entry).length) out[id] = entry;
  }

  return { map: out, lines, unmatched };
}

mkdirSync(DEST, { recursive: true });

let rawBefore = 0;
let rawAfter = 0;
let gzBefore = 0;
let gzAfter = 0;
const rows = [];
const figures = [];

for (const src of sources()) {
  const before = readFileSync(src, "utf8");
  const after = convert(before);

  /*
   * Check the result rather than trusting the regexes. Each of these has already failed once:
   * the first conversion left a prefixed family behind, and substituting a double-quoted family
   * into an XML attribute silently truncated it.
   */
  const faces = (after.match(/@font-face/g) || []).length;
  const stale = after.match(/[A-Za-z0-9]+-Geist(?:Mono)?/);
  const before_uses = (before.match(/font-family/g) || []).length;
  const after_uses = (after.match(/font-family/g) || []).length;
  // Two per @font-face block is the family declaration plus nothing else; every other use is a
  // real one that must survive.
  const expected = before_uses - (before.match(/@font-face/g) || []).length;

  if (faces > 0) throw new Error(`${basename(src)}: ${faces} @font-face survived`);
  if (stale) throw new Error(`${basename(src)}: prefixed family survived: ${stale[0]}`);
  if (after_uses !== expected) {
    throw new Error(`${basename(src)}: ${after_uses} font-family uses, expected ${expected}`);
  }
  if (after_uses > 0 && !after.includes("'Geist'") && !after.includes("'Geist Mono'")) {
    throw new Error(`${basename(src)}: no Geist family after conversion`);
  }
  /*
   * The shape a double-quoted substitution would leave: the attribute closes on the family's own
   * opening quote, so the value parses as empty. Checking for the empty value is exact, where a
   * pattern trying to spot the stray quote matches the next attribute instead and cries wolf.
   * Well-formedness proper is checked by parsing every written file as XML.
   */
  if (/font-family=""/.test(after)) {
    throw new Error(`${basename(src)}: a font-family attribute was truncated`);
  }

  rawBefore += Buffer.byteLength(before);
  rawAfter += Buffer.byteLength(after);
  gzBefore += gzipSync(before, { level: 9 }).length;
  gzAfter += gzipSync(after, { level: 9 }).length;

  const product = basename(dirname(src));
  const target = join(DEST, product, basename(src));
  const id = `${product}/${basename(src, ".svg")}`;
  rows.push([
    `${product}/${basename(src)}`,
    Buffer.byteLength(before) / 1024,
    Buffer.byteLength(after) / 1024,
  ]);
  figures.push({ id, product, svg: after });

  if (write) {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, after);
  }
}

const { map, lines, unmatched } = translations(figures);
const translated = Object.values(map).reduce((n, e) => n + Object.keys(e).length, 0);
if (write) writeFileSync(join(DEST, "text.json"), `${JSON.stringify(map, null, 2)}\n`);

for (const [name, b, a] of rows) {
  console.log(`  ${name.padEnd(56)} ${b.toFixed(1).padStart(6)} -> ${a.toFixed(1).padStart(6)} KB`);
}
console.log(
  `\n${rows.length} figures  raw ${(rawBefore / 1024).toFixed(1)} -> ${(rawAfter / 1024).toFixed(1)} KB` +
    `  gzip ${(gzBefore / 1024).toFixed(1)} -> ${(gzAfter / 1024).toFixed(1)} KB`,
);
console.log(`editable lines ${lines}, translated ${translated}, unmatched ${unmatched.length}`);
for (const u of unmatched) console.log(`  unmatched: ${u}`);
console.log(write ? `written to ${relative(ROOT, DEST)}` : "dry run. Pass --write to apply.");

/**
 * Embed every page of the exported site, once, at authoring time.
 *
 *   pnpm build && pnpm build:search-index
 *
 * **Why it reads `out/` and not the components.** The handbook indexes its MDX, because MDX is
 * the content. Here the content is spread across 120 converted components, inline JSX text, and
 * two locales resolved at render time. The exported HTML is the only place the finished page
 * exists, so indexing it is both simpler and honest: the assistant quotes what the visitor can
 * actually read, and a page that failed to render cannot be answered from.
 *
 * **Why it is committed.** The browser embeds one sentence per question and runs cosine against
 * vectors that shipped with the page. The alternative is embedding every chunk in the browser on
 * first open, which is the same arithmetic done once per visitor instead of once per change.
 */
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = join(here, '..');
const OUT = join(ROOT, 'out');
const OUT_DIR = join(ROOT, 'src', 'lib', 'assistant');
const NOTES_OUT = join(OUT_DIR, 'page-notes.json');

/**
 * One index per language, because vectors from different models are not comparable.
 *
 * Unlike the handbook, both locales here have real content: the Vietnamese index embeds the
 * Vietnamese pages, not an English fallback. e5 is still the Vietnamese model, because it is the
 * one that handles the language at all, and it is trained with these prefixes.
 */
const MODELS = [
  { id: 'Xenova/all-MiniLM-L6-v2', file: 'search-index.json', lang: 'en', query: '', passage: '' },
  {
    id: 'Xenova/multilingual-e5-small',
    file: 'search-index.vi.json',
    lang: 'vi',
    query: 'query: ',
    passage: 'passage: ',
  },
];

/** Pages that are redirects, duplicates or machine endpoints: nothing to answer from. */
const SKIP = /^\/(404|_not-found|llms\.txt|robots\.txt|sitemap\.xml)?$|preview-home/;

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“',
  hellip: '…', ndash: '–', mdash: '—', times: '×',
};

function decode(s) {
  return s
    .replace(/&#(\d+);/g, (_m, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_m, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name] ?? m);
}

/**
 * Tags out, entities in, whitespace collapsed.
 *
 * Every tag becomes a space, not nothing. The designer breaks headlines with `<span class="block">`,
 * and dropping those tags outright fused the words either side: "shoppers' intentand catalogue
 * gaps", "isn't recordedin the catalogue". A fused word is a token the embedder has never seen,
 * which is a worse trade than the occasional extra space inside a bolded fragment.
 */
function text(html) {
  return decode(html.replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

export function slugify(heading) {
  return heading
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-|-$/g, '');
}

/** The finished page, split at its own headings. */
function chunkPage(file) {
  const raw = readFileSync(file, 'utf8');
  let url = '/' + relative(OUT, file).replace(/\.html$/, '').replace(/\/?index$/, '');
  if (url !== '/' && url.endsWith('/')) url = url.slice(0, -1);
  if (SKIP.test(url)) return [];

  const lang = /^\/vi(\/|$)/.test(url) ? 'vi' : 'en';

  /*
   * The whole body, not `<main>`.
   *
   * These pages stream through Suspense, so the exported HTML has only the skeleton inside
   * `<main>` and the finished markup in a `<div hidden id="S:0">` after it, which a script swaps
   * in on load. Reading `<main>` found 1 KB of placeholder on every page and produced an empty
   * index. The hidden block is ordinary HTML, so taking the body and dropping the chrome gets
   * the text the visitor actually reads, wherever React chose to park it.
   */
  const bodyTag = /<body\b[^>]*>([\s\S]*)<\/body>/i.exec(raw);
  if (!bodyTag) return [];
  const body = bodyTag[1]
    .replace(/<(script|style|template|noscript|svg|header|footer|nav|aside)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    /*
     * Page chrome that is not content.
     *
     * The assistant's own panel is on every page, and indexing it taught the assistant to
     * answer questions with its own greeting, which it did. The skip link, the `sr-only`
     * status text and the launcher are the same kind of thing: every answer began "Skip to
     * content Loading Ask Pulse" before these came out.
     */
    .replace(/<(div|section)\b[^>]*\brole="dialog"[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<a\b[^>]*href="#main"[^>]*>[\s\S]*?<\/a>/gi, ' ')
    .replace(/<span\b[^>]*class="[^"]*\bsr-only\b[^"]*"[^>]*>[\s\S]*?<\/span>/gi, ' ')
    .replace(/<button\b[^>]*aria-label="(?:Ask Pulse|H\u1ecfi Pulse)"[\s\S]*?<\/button>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');

  const titleTag = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(raw);
  const h1 = /<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(body);
  const pageTitle = text(h1?.[1] ?? titleTag?.[1] ?? url).replace(/\s*[|–]\s*Pulse.*$/, '');

  // Split at every h2/h3; the text before the first one belongs to the page itself.
  const parts = body.split(/(?=<h[23]\b)/i);
  const chunks = [];
  for (const part of parts) {
    const head = /<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/i.exec(part);
    const heading = head ? text(head[3]) : pageTitle;
    const idAttr = head ? /\bid="([^"]+)"/.exec(head[2]) : null;
    const anchor = head ? (idAttr?.[1] ?? slugify(heading)) : '';
    const rest = head ? part.slice(head.index + head[0].length) : part;
    const t = text(rest);
    // A heading with two words under it is a label, not an answer.
    if (t.length < 80) continue;
    chunks.push({ url, anchor, pageTitle, heading, text: t.slice(0, 1600), lang });
  }
  return chunks;
}

function quantise(vectors) {
  const flat = new Int8Array(vectors.length * (vectors[0]?.length ?? 0));
  let i = 0;
  for (const v of vectors) {
    for (const x of v) flat[i++] = Math.max(-127, Math.min(127, Math.round(x * 127)));
  }
  return Buffer.from(flat.buffer).toString('base64');
}

function contentHash(chunks) {
  const h = createHash('sha256');
  for (const c of chunks) h.update(c.url).update('\u0000').update(c.text).update('\u0000');
  return h.digest('hex').slice(0, 16);
}

const embedText = (c) => `${c.pageTitle} — ${c.heading}\n${c.text}`;

async function main() {
  const { pipeline } = await import('@huggingface/transformers');

  const found = walk(OUT).flatMap(chunkPage);
  if (found.length === 0) throw new Error('No chunks. Run `pnpm build` first; refusing to write an empty index.');

  /*
   * One copy of each passage.
   *
   * The call to action above the footer is the same six words on six pages, and several
   * sections are shared the same way. Embedded once per page they crowd the top of every
   * result: 83 of 443 chunks were a passage already present. Keeping the first occurrence means
   * a shared section still answers, and cites the page it was first written for.
   */
  const seen = new Set();
  const all = found.filter((c) => {
    const key = `${c.lang}\u0000${c.text}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  console.log(`${found.length} chunks, ${found.length - all.length} duplicates dropped`);

  for (const model of MODELS) {
    const source = all.filter((c) => c.lang === model.lang);
    if (source.length === 0) throw new Error(`No ${model.lang} pages in out/.`);

    const embed = await pipeline('feature-extraction', model.id, { dtype: 'q8' });
    const vectors = [];
    for (let i = 0; i < source.length; i += 1) {
      const out = await embed(model.passage + embedText(source[i]), {
        pooling: 'mean',
        normalize: true,
      });
      vectors.push(Array.from(out.data));
      if ((i + 1) % 50 === 0) console.log(`  ${model.id}: ${i + 1}/${source.length}`);
    }

    const dims = vectors[0].length;
    if (!vectors.every((v) => v.length === dims)) throw new Error('Ragged vectors.');

    const json = JSON.stringify({
      // Recorded so the runtime can refuse a query embedded by a different model. A cosine
      // between vectors of different provenance does not throw, it returns a plausible number.
      model: model.id,
      queryPrefix: model.query,
      dimensions: dims,
      builtAt: new Date().toISOString().slice(0, 10),
      contentHash: contentHash(source),
      chunks: source.map((c) => ({
        u: c.url, a: c.anchor, p: c.pageTitle, h: c.heading, t: c.text, l: c.lang,
      })),
      vectors: quantise(vectors),
    });

    mkdirSync(OUT_DIR, { recursive: true });
    writeFileSync(join(OUT_DIR, model.file), json);
    console.log(
      `wrote ${model.file} — ${source.length} chunks, ${dims} dims, ` +
        `${(Buffer.byteLength(json) / 1024).toFixed(0)} KB`,
    );
  }

  // One entry per page: what it is, and the first few things it answers. The panel notes a
  // navigation the moment it happens, and must not need the worker running to do it.
  const notes = {};
  for (const c of all) {
    const existing = notes[c.url];
    if (!existing) {
      notes[c.url] = { title: c.pageTitle, lang: c.lang, summary: c.text.slice(0, 190), topics: [] };
      continue;
    }
    if (c.anchor && c.heading !== c.pageTitle && existing.topics.length < 3) {
      existing.topics.push({ heading: c.heading, anchor: c.anchor });
    }
  }
  writeFileSync(NOTES_OUT, JSON.stringify(notes));
  console.log(`wrote ${relative(ROOT, NOTES_OUT)} — ${Object.keys(notes).length} pages`);
}

if (process.argv[1] && process.argv[1].endsWith('build-search-index.mjs')) {
  main().catch((err) => { console.error(err); process.exit(1); });
}

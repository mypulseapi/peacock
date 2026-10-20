import { chromium } from "playwright";
import { readFileSync, mkdirSync, existsSync } from "fs";

const DATA = JSON.parse(readFileSync(new URL("./content.json", import.meta.url)));
const OUT = process.argv[2];
mkdirSync(OUT, { recursive: true });

// Brand palette, matching globals.css
const INDIGO = "#3d1bdb";
const INK = "#10101a";
const FAINT = "#9a9aae";
const LAV = "#f1effe";

// Real photography from the project's own Figma file (the same library the
// designed slides draw on), inlined so rendering needs no network.
const photoCache = new Map();
function photo(slug, i) {
  const key = `${slug}-${(i % 6) + 1}`;
  if (!photoCache.has(key)) {
    const f = new URL(`./photos/${key}.jpg`, import.meta.url);
    photoCache.set(key, existsSync(f)
      ? `data:image/jpeg;base64,${readFileSync(f).toString("base64")}` : null);
  }
  return photoCache.get(key);
}
const thumb = (slug, hue, i) => {
  const p = photo(slug, i);
  if (p) return `background-image:url(${p});background-size:cover;background-position:center`;
  const h1 = (hue + i * 26) % 360;
  return `background:linear-gradient(145deg,hsl(${h1} 72% 72%),hsl(${(h1+38)%360} 68% 58%))`;
};

const chrome = (url) => `
  <div class="chrome">
    <span class="dot"></span><span class="dot"></span><span class="dot"></span>
    <div class="url"><i></i>${url}</div>
  </div>`;

const bar = (w) => `<div class="bar" style="width:${w}%"></div>`;

function body(slide, hue, slug) {
  const { kind, items, meta, badge } = slide;
  if (kind === "grid") {
    return `<div class="grid">${items
      .map(
        (t, i) => `<div class="cell ${i === 0 ? "hl" : ""}">
        <div class="thumb" style="${thumb(slug, hue, i)}">${i === 0 ? `<span class="badge">${badge}</span>` : ""}</div>
        <p class="t">${t}</p><p class="m">${meta[i]}</p></div>`
      )
      .join("")}</div>`;
  }
  if (kind === "feature") {
    return `<div class="feature">
      <div class="big"><div class="thumb tall" style="${thumb(slug, hue, 0)}"><span class="badge">${badge}</span></div>
        <p class="t">${items[0]}</p><p class="m">${meta[0]}</p></div>
      <div class="side">${items
        .slice(1)
        .map(
          (t, i) => `<div class="cell"><div class="thumb" style="${thumb(slug, hue, i + 3)}"></div>
          <p class="t">${t}</p><p class="m">${meta[i + 1]}</p></div>`
        )
        .join("")}</div></div>`;
  }
  if (kind === "cards") {
    return `<div class="cards">${items
      .map(
        (t, i) => `<div class="cell ${i === 0 ? "hl" : ""}">
        <div class="thumb wide" style="${thumb(slug, hue, i + 1)}">${i === 0 ? `<span class="badge">${badge}</span>` : ""}</div>
        <p class="t">${t}</p><p class="m">${meta[i]}</p></div>`
      )
      .join("")}</div>`;
  }
  // list
  return `<div class="list">${items
    .map(
      (t, i) => `<div class="row ${i === 0 ? "hl" : ""}">
      <div class="chip" style="${thumb(slug, hue, i)}"></div>
      <div class="rt"><p class="t">${t}</p>${bar(38 + ((i * 13) % 34))}</div>
      <p class="m">${meta[i]}</p>${i === 0 ? `<span class="badge solid">${badge}</span>` : ""}</div>`
    )
    .join("")}</div>`;
}

const page = (ind, slide, slug) => `<!doctype html><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{width:356px;height:297px;font-family:"Plus Jakarta Sans",system-ui,sans-serif;background:#fff;color:${INK};overflow:hidden}
.card{width:356px;height:297px;background:#fff;border:1px solid #ecebf6;border-radius:10px;overflow:hidden;display:flex;flex-direction:column}
.chrome{display:flex;align-items:center;gap:5px;padding:9px 11px;background:#f7f6fd;border-bottom:1px solid #efeefa;flex:0 0 auto}
.dot{width:6px;height:6px;border-radius:50%;background:#dcdaee}
.url{margin-left:6px;display:flex;align-items:center;gap:5px;background:#fff;border:1px solid #eceafa;border-radius:20px;
     padding:3px 9px;font-size:7.5px;color:${FAINT};letter-spacing:.01em}
.url i{width:4px;height:4px;border-radius:50%;background:${INDIGO};display:block}
.pad{padding:11px 12px 12px;flex:1;display:flex;flex-direction:column;min-height:0;overflow:hidden}
h1{font-size:11.5px;font-weight:700;letter-spacing:-.015em;margin-bottom:9px;flex:0 0 auto}
.t{font-size:7.6px;font-weight:600;line-height:1.25;margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.m{font-size:6.6px;color:${FAINT};margin-top:2px;white-space:nowrap}
.badge{position:absolute;top:5px;right:5px;background:#f5453c;color:#fff;font-size:5.6px;font-weight:700;
       letter-spacing:.06em;padding:2px 4px;border-radius:3px}
.badge.solid{position:static;background:${INDIGO}}
.thumb{position:relative;width:100%;aspect-ratio:16/10;border-radius:5px}
.thumb.tall{aspect-ratio:1/1}
.thumb.wide{aspect-ratio:2/1}
.grid{display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:1fr;gap:8px 7px;flex:1;min-height:0}
.cards{display:grid;grid-template-columns:repeat(2,1fr);grid-auto-rows:1fr;gap:7px 8px;flex:1;min-height:0}
.cell{min-width:0}
.cell.hl .thumb{outline:1.4px solid ${INDIGO};outline-offset:1.4px}
.feature{display:grid;grid-template-columns:1.15fr 1fr;gap:8px;flex:1;min-height:0}
.side{display:flex;flex-direction:column;gap:8px;min-height:0}
.side .thumb{aspect-ratio:2/1}
.list{display:flex;flex-direction:column;gap:6px;flex:1;min-height:0}
.row{display:flex;align-items:center;gap:7px;background:#fafaff;border:1px solid #f0effa;border-radius:6px;padding:6px 8px}
.row.hl{background:${LAV};border-color:#d9d3fb}
.chip{width:15px;height:15px;border-radius:4px;flex:0 0 auto}
.rt{flex:1;min-width:0}
.bar{height:2.5px;border-radius:2px;background:#e6e4f4;margin-top:3px}
</style>
<div class="card">${chrome(ind.url)}<div class="pad"><h1>${slide.title}</h1>${body(slide, ind.hue, slug)}</div></div>`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 356, height: 297 }, deviceScaleFactor: 2 });
let n = 0;
for (const [slug, ind] of Object.entries(DATA)) {
  for (let i = 0; i < ind.slides.length; i++) {
    await p.setContent(page(ind, ind.slides[i], slug), { waitUntil: "networkidle" });
    await p.waitForTimeout(250);
    await p.screenshot({ path: `${OUT}/${slug}-${i + 1}.png` });
    n++;
  }
}
await b.close();
console.log(`rendered ${n} slides`);

// Page motion for Pulse. Plain JS, no dependencies.
// Every effect is driven by data attributes in the HTML so pages stay declarative:
//   .reveal / .reveal-bar  → fade/slide or grow when scrolled into view (sets [data-shown])
//   [data-count="94"]      → counts up from 0 when shown (optional data-suffix="%")
//   [data-type="text"]     → types the text, then sets [data-typed] on the closest [data-type-root]
//   [data-shelf]           → draws a grid of product squares (data-total, data-ready)
//   [data-spy] links       → highlight the section currently in view (sets [data-active])

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function countUp(el) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  if (reduceMotion) {
    el.textContent = target + suffix;
    return;
  }
  const duration = 1400;
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function typeText(el) {
  const text = el.dataset.type;
  const root = el.closest("[data-type-root]");
  if (reduceMotion) {
    el.textContent = text;
    root?.setAttribute("data-typed", "");
    return;
  }
  let i = 0;
  el.textContent = "";
  const step = () => {
    el.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(step, 70);
    else setTimeout(() => root?.setAttribute("data-typed", ""), 350);
  };
  setTimeout(step, 400);
}

function buildShelf(el) {
  const total = Number(el.dataset.total);
  const ready = Number(el.dataset.ready);
  const cells = [];
  for (let i = 0; i < total; i++) {
    const cell = document.createElement("span");
    cell.className =
      i < ready
        ? "reveal aspect-square rounded-sm bg-ink duration-300"
        : "reveal aspect-square rounded-sm missing-cell duration-300";
    cell.style.transitionDelay = reduceMotion ? "0ms" : `${Math.round(i * 6)}ms`;
    cells.push(cell);
  }
  el.replaceChildren(...cells);
  return cells;
}

function show(el) {
  el.setAttribute("data-shown", "");
  if (el.dataset.count !== undefined) countUp(el);
  if (el.dataset.type !== undefined) typeText(el);
  if (el.dataset.shelf !== undefined) {
    const cells = buildShelf(el);
    requestAnimationFrame(() => requestAnimationFrame(() => cells.forEach((c) => c.setAttribute("data-shown", ""))));
  }
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      show(entry.target);
      revealObserver.unobserve(entry.target);
    }
  },
  { rootMargin: "0px 0px -10% 0px" },
);
document
  .querySelectorAll(".reveal, .reveal-bar, [data-count], [data-type], [data-shelf]")
  .forEach((el) => revealObserver.observe(el));

// Scroll-spy for the sticky step navigation
const spyLinks = [...document.querySelectorAll("[data-spy]")];
const spyObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      spyLinks.forEach((link) => link.toggleAttribute("data-active", link.dataset.spy === entry.target.id));
    }
  },
  { rootMargin: "-45% 0px -50% 0px" },
);
spyLinks.forEach((link) => {
  const section = document.getElementById(link.dataset.spy);
  if (section) spyObserver.observe(section);
});

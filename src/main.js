// Page motion for Pulse. Plain JS, no dependencies.
// Every effect is driven by data attributes in the HTML so pages stay declarative:
//   .reveal / .reveal-bar  → fade/slide or grow when scrolled into view (sets [data-shown])
//   [data-count="94"]      → counts up from 0 when shown (optional data-suffix="%")
//   [data-type="text"]     → types the text, then sets [data-typed] on the closest [data-type-root]
//   [data-shelf]           → draws a grid of product squares (data-total, data-ready)
//   [data-demo]            → plays the hero workflow demo (tabs, steps, captions — see DESIGN.md §6)
//   [data-spy] links       → highlight the section currently in view (sets [data-active])

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Counts from data-from (default 0) to the target, after data-delay ms (default 0)
function countUp(el) {
  const target = Number(el.dataset.count ?? el.dataset.demoCount);
  const from = Number(el.dataset.from ?? 0);
  const suffix = el.dataset.suffix || "";
  if (reduceMotion) {
    el.textContent = target + suffix;
    return;
  }
  const duration = 1400;
  const start = performance.now() + Number(el.dataset.delay ?? 0);
  const tick = (now) => {
    const t = Math.min(Math.max((now - start) / duration, 0), 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(from + (target - from) * eased) + suffix;
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

// Header dropdowns are native <details> (they work without JS). Enhancements:
// - Mega menus ([data-mega]) share one Attio-style viewport that resizes between menus while the
//   contents slide/blur in the direction of travel.
// - Other dropdowns (language): hover-open, one open at a time, outside click / Escape to close.
// - Page scroll is locked while the mobile menu is open.
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const mobileMenu = document.querySelector("[data-mobile-menu]");
const megaNav = document.querySelector("[data-mega-nav]");
const mega = megaNav ? createMegaMenu(megaNav) : null;
const dropdowns = [...document.querySelectorAll("[data-dropdown]:not([data-mega])")];

function createMegaMenu(nav) {
  const viewport = nav.querySelector("[data-nav-viewport]");
  const stack = nav.querySelector("[data-nav-stack]");
  const items = [...nav.querySelectorAll("details[data-mega]")].map((details, index) => {
    const content = details.querySelector("[data-nav-content]");
    details.querySelector("[data-panel]").hidden = true; // the no-JS panel is replaced by the viewport
    content.dataset.state = "inactive";
    stack.append(content);
    return { details, content, index };
  });
  let active = null;
  let closeTimer;

  function settle(content) {
    if (content !== active?.content) {
      content.dataset.state = "inactive";
      delete content.dataset.dir;
    }
  }

  function open(item) {
    clearTimeout(closeTimer);
    if (active === item) return;
    closeAll(); // close the language dropdown
    const switching = active !== null;
    if (switching) {
      const dir = item.index > active.index ? "right" : "left";
      const previous = active.content;
      previous.dataset.state = "exiting";
      previous.dataset.dir = dir;
      setTimeout(() => previous.dataset.state === "exiting" && settle(previous), 200);
      item.content.dataset.dir = dir;
    } else {
      delete item.content.dataset.dir; // first open: the viewport fades in, no slide
    }
    item.content.dataset.state = "active";
    active = item;

    viewport.toggleAttribute("data-instant", !switching);
    const width = item.content.offsetWidth;
    // Anchored to the menu's left edge (like attio.com), but shifted left if it would overflow the window
    const overflow = nav.getBoundingClientRect().left + width - (document.documentElement.clientWidth - 16);
    viewport.style.setProperty("--nav-viewport-x", `${-Math.max(0, Math.ceil(overflow))}px`);
    viewport.style.setProperty("--nav-viewport-width", `${width}px`);
    viewport.style.setProperty("--nav-viewport-height", `${item.content.offsetHeight}px`);
    if (!switching) {
      void viewport.offsetWidth; // apply the size before the open transition starts
      viewport.setAttribute("data-open", "");
      requestAnimationFrame(() => viewport.removeAttribute("data-instant"));
    }
    items.forEach((other) => (other.details.open = other === item));
  }

  function close() {
    clearTimeout(closeTimer);
    if (!active) return;
    const content = active.content;
    active = null;
    viewport.removeAttribute("data-open");
    items.forEach((other) => (other.details.open = false));
    setTimeout(() => settle(content), 150);
  }

  items.forEach((item) => {
    item.details.querySelector("summary").addEventListener("click", (e) => {
      e.preventDefault(); // keep <details> in sync with the viewport ourselves
      // A mouse click right after hover-open must not close it again; keyboard (detail 0) toggles
      const hoverClick = canHover && e.detail > 0;
      active === item && !hoverClick ? close() : open(item);
    });
    if (canHover) item.details.parentElement.addEventListener("mouseenter", () => open(item));
  });
  if (canHover) {
    // Hovering a plain link (About us, Pricing) closes the menu; leaving the nav closes it after a beat
    nav.querySelectorAll(":scope > ul > li:not(:has([data-mega]))").forEach((li) => li.addEventListener("mouseenter", close));
    nav.addEventListener("mouseleave", () => (closeTimer = setTimeout(close, 150)));
    nav.addEventListener("mouseenter", () => clearTimeout(closeTimer));
  }
  viewport.addEventListener("click", (e) => e.target.closest("a") && close());

  return { close, isOpen: () => active !== null, focusTrigger: () => active?.details.querySelector("summary").focus(), contains: (el) => nav.contains(el) };
}

function closeAll(except) {
  dropdowns.forEach((d) => d !== except && d.removeAttribute("open"));
}

// Keep an open panel inside the viewport (shift it left when it would overflow the right edge)
function keepInView(d) {
  const panel = d.querySelector("[data-panel]");
  if (!panel) return;
  panel.style.marginLeft = "";
  const overflow = panel.getBoundingClientRect().right - (document.documentElement.clientWidth - 16);
  if (overflow > 0) panel.style.marginLeft = `-${Math.ceil(overflow)}px`;
}

dropdowns.forEach((d) => {
  d.addEventListener("toggle", () => {
    if (!d.open) return;
    closeAll(d);
    mega?.close();
    keepInView(d);
  });
  if (!canHover) return;
  let timer;
  const host = d.parentElement;
  host.addEventListener("mouseenter", () => {
    clearTimeout(timer);
    d.open = true;
  });
  host.addEventListener("mouseleave", () => {
    timer = setTimeout(() => (d.open = false), 150);
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest("[data-dropdown]")) closeAll();
  if (mega && !mega.contains(e.target)) mega.close();
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (mega?.isOpen()) {
    mega.focusTrigger();
    mega.close();
    return;
  }
  const open = dropdowns.find((d) => d.open) || (mobileMenu?.open && mobileMenu);
  if (!open) return;
  open.open = false;
  open.querySelector("summary")?.focus();
});

mobileMenu?.addEventListener("toggle", () => {
  document.documentElement.classList.toggle("overflow-hidden", mobileMenu.open);
  mobileMenu.querySelector("summary").setAttribute("aria-label", mobileMenu.open ? "Close menu" : "Open menu");
});
// Close the mobile menu when one of its links is followed (e.g. #request)
mobileMenu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => (mobileMenu.open = false)));

// Hero scroll effect: --hero-p goes 0 → 1 as the product window scrolls up until it is centred in the
// screen below the sticky header. CSS turns it into the headline fade (hero-fade) and the window zoom
// (hero-window). The stage reaches just to the bottom of the screen at that point (hero-stage), so
// nothing below it shows and no extra backdrop is left over.
const hero = document.querySelector("[data-hero]");
const heroWindow = hero?.querySelector(".hero-window");
const header = document.querySelector("[data-nav]");
if (hero && heroWindow && !reduceMotion) {
  let distance = 1;
  let ticking = false;
  const update = () => {
    ticking = false;
    const p = Math.min(1, Math.max(0, scrollY / distance));
    hero.style.setProperty("--hero-p", p.toFixed(4));
  };
  const measure = () => {
    // Layout position (offsetTop), so the window's zoom and its fade-in slide don't skew the measurement
    let top = 0;
    for (let el = heroWindow; el; el = el.offsetParent) top += el.offsetTop;
    const headerHeight = header?.offsetHeight ?? 0;
    const windowHeight = heroWindow.offsetHeight;
    const windowCentre = top + windowHeight / 2;
    const screenCentre = headerHeight + (innerHeight - headerHeight) / 2;
    const gap = 16; // space kept between the header and the window (tabs included), and at the bottom
    // Centre the window; if it is taller than the screen below the header, stop with its top just under the header
    distance = Math.max(240, Math.min(windowCentre - screenCentre, top - headerHeight - gap)); // always leave some scroll for the effect
    // hero-window grows only as far as the whole window still fits below the header
    const room = innerHeight - headerHeight - 2 * gap;
    hero.style.setProperty("--hero-zoom-fit", Math.max(0, room / windowHeight - 1).toFixed(4));
    // hero-stage uses this to end exactly at the bottom of the screen once the window is centred
    hero.style.setProperty("--hero-window-h", `${windowHeight}px`);
    update();
  };
  addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  addEventListener("resize", measure);
  new ResizeObserver(measure).observe(heroWindow); // web fonts and the demo can change its height
  measure();
}

// Hero workflow demo: steps play in order. The pace comes from CSS — when the active tab's timer bar
// (animate-demo-timer) finishes, the next step starts. Hovering the demo or scrolling it out of view
// pauses the timer; clicking a tab jumps to that step. With reduced motion the timer is hidden, so
// nothing advances by itself.
const demo = document.querySelector("[data-demo]");
if (demo) {
  const tabs = [...demo.querySelectorAll("[data-demo-tab]")];
  const groups = [tabs, [...demo.querySelectorAll("[data-demo-step]")], [...demo.querySelectorAll("[data-demo-caption]")]];

  const grid = demo.querySelector("[data-demo-grid]");
  if (grid) {
    // Payoff grid: products a shopper could already tell apart, ones the repair separates, the rest
    const total = Number(grid.dataset.total);
    const before = Number(grid.dataset.before);
    const after = Number(grid.dataset.after);
    const cells = [];
    for (let i = 0; i < total; i++) {
      const cell = document.createElement("span");
      if (i < before) cell.className = "aspect-square rounded-xs bg-primary sm:rounded-sm";
      else if (i < after) {
        cell.className = "demo-fill aspect-square rounded-xs sm:rounded-sm";
        cell.style.transitionDelay = `${1000 + (i - before) * 13}ms`; // one after another, as on thepulseapi.com
      } else cell.className = "aspect-square rounded-xs bg-line sm:rounded-sm";
      cells.push(cell);
    }
    grid.replaceChildren(...cells);
  }

  const go = (index) => {
    groups.forEach((list) => list.forEach((el) => el.removeAttribute("data-active")));
    void demo.offsetWidth; // restart the timer and the step's entrance even when the same step is picked again
    groups.forEach((list) => list[index]?.setAttribute("data-active", ""));
    tabs.forEach((tab, i) => tab.setAttribute("aria-selected", String(i === index)));
    groups[1][index].querySelectorAll("[data-demo-count]").forEach(countUp);
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => go(i));
    tab.querySelector(".demo-timer")?.addEventListener("animationend", () => go((i + 1) % tabs.length));
  });
  new IntersectionObserver(([entry]) => demo.toggleAttribute("data-paused", !entry.isIntersecting)).observe(demo);
  go(0);
}

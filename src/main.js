// Page motion for Pulse. Plain JS, no dependencies.
// Every effect is driven by data attributes in the HTML so pages stay declarative:
//   .reveal / .reveal-bar  → fade/slide or grow when scrolled into view (sets [data-shown])
//   [data-count="94"]      → counts up from 0 when shown (optional data-suffix="%")
//   [data-type="text"]     → types the text, then sets [data-typed] on the closest [data-type-root]
//   [data-shelf]           → draws a grid of product squares (data-total, data-ready)
//   [data-demo]            → plays the hero workflow demo (tabs, steps, captions — see DESIGN.md §6)
//   [data-spy] links       → highlight the section currently in view (sets [data-active])
//   [data-hero]            → hero background light (and its tail) follows the cursor (--hero-x / --hero-y …)
//   [data-cta]             → call-to-action band: dots light up around the cursor (--cta-x / --cta-y)
//   [data-why]             → Why PULSE orbit: turning ring; a circle turns to the top and opens its reason
//   [data-pause] buttons   → pause the hero demo (sets [data-held] on [data-pausable])
//   [data-bg-video]        → product hero background video: theme-matched source, plays only while on screen
//   [data-deal]            → About page DEAL acronym: big row → column → words (data-state hold/stack/expand/done)

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

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
    cell.style.transitionDelay = reduceMotion
      ? "0ms"
      : `${Math.round(i * 6)}ms`;
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
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        cells.forEach((c) => c.setAttribute("data-shown", "")),
      ),
    );
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
  .querySelectorAll(
    ".reveal, .reveal-bar, [data-count], [data-type], [data-shelf]",
  )
  .forEach((el) => revealObserver.observe(el));

// Scroll-spy for the sticky step navigation
const spyLinks = [...document.querySelectorAll("[data-spy]")];
const spyObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      spyLinks.forEach((link) =>
        link.toggleAttribute(
          "data-active",
          link.dataset.spy === entry.target.id,
        ),
      );
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
const canHover = window.matchMedia(
  "(hover: hover) and (pointer: fine)",
).matches;
const mobileMenu = document.querySelector("[data-mobile-menu]");
const megaNav = document.querySelector("[data-mega-nav]");
const mega = megaNav ? createMegaMenu(megaNav) : null;
const dropdowns = [
  ...document.querySelectorAll("[data-dropdown]:not([data-mega])"),
];

function createMegaMenu(nav) {
  const viewport = nav.querySelector("[data-nav-viewport]");
  const stack = nav.querySelector("[data-nav-stack]");
  const items = [...nav.querySelectorAll("details[data-mega]")].map(
    (details, index) => {
      const content = details.querySelector("[data-nav-content]");
      details.querySelector("[data-panel]").hidden = true; // the no-JS panel is replaced by the viewport
      content.dataset.state = "inactive";
      stack.append(content);
      return { details, content, index };
    },
  );
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
      setTimeout(
        () => previous.dataset.state === "exiting" && settle(previous),
        200,
      );
      item.content.dataset.dir = dir;
    } else {
      delete item.content.dataset.dir; // first open: the viewport fades in, no slide
    }
    item.content.dataset.state = "active";
    active = item;

    viewport.toggleAttribute("data-instant", !switching);
    const width = item.content.offsetWidth;
    // Anchored to the menu's left edge (like attio.com), but shifted left if it would overflow the window
    const overflow =
      nav.getBoundingClientRect().left +
      width -
      (document.documentElement.clientWidth - 16);
    viewport.style.setProperty(
      "--nav-viewport-x",
      `${-Math.max(0, Math.ceil(overflow))}px`,
    );
    viewport.style.setProperty("--nav-viewport-width", `${width}px`);
    viewport.style.setProperty(
      "--nav-viewport-height",
      `${item.content.offsetHeight}px`,
    );
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
    if (canHover)
      item.details.parentElement.addEventListener("mouseenter", () =>
        open(item),
      );
  });
  if (canHover) {
    // Hovering a plain link (About us, Pricing) closes the menu; leaving the nav closes it after a beat
    nav
      .querySelectorAll(":scope > ul > li:not(:has([data-mega]))")
      .forEach((li) => li.addEventListener("mouseenter", close));
    nav.addEventListener(
      "mouseleave",
      () => (closeTimer = setTimeout(close, 150)),
    );
    nav.addEventListener("mouseenter", () => clearTimeout(closeTimer));
  }
  viewport.addEventListener("click", (e) => e.target.closest("a") && close());

  // Keyboard order (WCAG 2.4.3): the contents live in the shared viewport after the nav list, so Tab is routed by
  // hand — from an open menu's trigger into its links, from its last link on to the next top-level item, and
  // Shift+Tab from its first link back to the trigger. Focus leaving the nav closes the menu.
  const focusables = (root) =>
    [...root.querySelectorAll("a[href], button:not([disabled])")].filter(
      (el) => el.offsetParent !== null,
    );
  const topLevel = () =>
    [...nav.querySelectorAll(":scope > ul > li")]
      .map((li) => li.querySelector("summary, a[href]"))
      .filter(Boolean);
  items.forEach((item) => {
    const summary = item.details.querySelector("summary");
    summary.addEventListener("keydown", (e) => {
      if (e.key !== "Tab" || e.shiftKey || active !== item) return;
      const first = focusables(item.content)[0];
      if (!first) return;
      e.preventDefault();
      first.focus();
    });
    item.content.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const links = focusables(item.content);
      if (e.shiftKey && document.activeElement === links[0]) {
        e.preventDefault();
        summary.focus();
      } else if (!e.shiftKey && document.activeElement === links.at(-1)) {
        const order = topLevel();
        const next = order[order.indexOf(summary) + 1];
        if (!next) return;
        e.preventDefault();
        close();
        next.focus();
      }
    });
  });
  nav.addEventListener("focusout", (e) => {
    if (active && !nav.contains(e.relatedTarget)) close();
  });

  return {
    close,
    isOpen: () => active !== null,
    focusTrigger: () => active?.details.querySelector("summary").focus(),
    contains: (el) => nav.contains(el),
  };
}

function closeAll(except) {
  dropdowns.forEach((d) => d !== except && d.removeAttribute("open"));
}

// Keep an open panel inside the viewport (shift it left when it would overflow the right edge)
function keepInView(d) {
  const panel = d.querySelector("[data-panel]");
  if (!panel) return;
  panel.style.marginLeft = "";
  const overflow =
    panel.getBoundingClientRect().right -
    (document.documentElement.clientWidth - 16);
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
  const open =
    dropdowns.find((d) => d.open) || (mobileMenu?.open && mobileMenu);
  if (!open) return;
  open.open = false;
  open.querySelector("summary")?.focus();
});

mobileMenu?.addEventListener("toggle", () => {
  document.documentElement.classList.toggle("overflow-hidden", mobileMenu.open);
  mobileMenu
    .querySelector("summary")
    .setAttribute("aria-label", mobileMenu.open ? "Close menu" : "Open menu");
});
// Close the mobile menu when one of its links is followed (e.g. #request)
mobileMenu
  ?.querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", () => (mobileMenu.open = false)));

// Hero background: the soft spotlight follows the cursor with a fading tail (CSS hero-bg transitions them).
// Mouse and pen only, not with reduced motion; without it the light stays at its resting place.
const hero = document.querySelector("[data-hero]");
if (hero && !reduceMotion) {
  let frame = 0;
  let still = 0;
  hero.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    // The tail shows while the cursor moves and fades out 150ms after it stops
    hero.style.setProperty("--hero-tail", "1");
    clearTimeout(still);
    still = setTimeout(() => hero.style.setProperty("--hero-tail", "0"), 150);
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const box = hero.getBoundingClientRect();
      const x = ((event.clientX - box.left) / box.width) * 100;
      const y = ((event.clientY - box.top) / box.height) * 100;
      // The light and both tail copies get the same position; CSS moves the tail more slowly
      for (const [px, py] of [
        ["--hero-x", "--hero-y"],
        ["--hero-tx1", "--hero-ty1"],
        ["--hero-tx2", "--hero-ty2"],
      ]) {
        hero.style.setProperty(px, `${x.toFixed(1)}%`);
        hero.style.setProperty(py, `${y.toFixed(1)}%`);
      }
    });
  });
}

// Call-to-action band (every page): the dots around the cursor light up. Mouse and pen only, not with reduced
// motion; the light fades out when the pointer leaves the band (CSS cta-dots).
document.querySelectorAll("[data-cta]").forEach((cta) => {
  if (reduceMotion) return;
  let frame = 0;
  let point = null;
  cta.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    cta.setAttribute("data-lit", "");
    point = event;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const box = cta.getBoundingClientRect();
      cta.style.setProperty("--cta-x", `${point.clientX - box.left}px`);
      cta.style.setProperty("--cta-y", `${point.clientY - box.top}px`);
    });
  });
  cta.addEventListener("pointerleave", () => cta.removeAttribute("data-lit"));
});

// Hero workflow demo: steps play in order. The pace comes from CSS — when the active tab's timer bar
// (animate-demo-timer) finishes, the next step starts. Hovering the app window (not the timeline) or scrolling it out of view
// pauses the timer; clicking a tab jumps to that step. With reduced motion the timer is hidden, so
// nothing advances by itself.
const demo = document.querySelector("[data-demo]");
if (demo) {
  const tabs = [...demo.querySelectorAll("[data-demo-tab]")];
  const groups = [
    tabs,
    [...demo.querySelectorAll("[data-demo-step]")],
    [...demo.querySelectorAll("[data-demo-caption]")],
  ];

  const grid = demo.querySelector("[data-demo-grid]");
  if (grid) {
    // Payoff grid: products a shopper could already tell apart, ones the repair separates, the rest
    const total = Number(grid.dataset.total);
    const before = Number(grid.dataset.before);
    const after = Number(grid.dataset.after);
    const cells = [];
    for (let i = 0; i < total; i++) {
      const cell = document.createElement("span");
      if (i < before)
        cell.className = "aspect-square rounded-xs bg-chart-main sm:rounded-sm";
      else if (i < after) {
        cell.className = "demo-fill aspect-square rounded-xs sm:rounded-sm";
        cell.style.transitionDelay = `${1000 + (i - before) * 13}ms`; // one after another, as on thepulseapi.com
      } else cell.className = "aspect-square rounded-xs bg-line sm:rounded-sm";
      cells.push(cell);
    }
    grid.replaceChildren(...cells);
  }

  const go = (index) => {
    groups.forEach((list) =>
      list.forEach((el) => el.removeAttribute("data-active")),
    );
    void demo.offsetWidth; // restart the timer and the step's entrance even when the same step is picked again
    groups.forEach((list) => list[index]?.setAttribute("data-active", ""));
    tabs.forEach((tab, i) => {
      tab.setAttribute("aria-selected", String(i === index));
      tab.tabIndex = i === index ? 0 : -1; // one Tab stop for the tab list (roving tabindex)
      tab.toggleAttribute("data-done", i < index); // earlier steps stay full on the timeline
    });
    groups[1][index].querySelectorAll("[data-demo-count]").forEach(countUp);
  };
  // ARIA tab pattern: Left / Right move between the steps (wrapping), Home / End jump to the first / last
  tabs.forEach((tab, i) => {
    tab.tabIndex = tab.hasAttribute("data-active") ? 0 : -1;
    tab.addEventListener("keydown", (e) => {
      const to = {
        ArrowRight: (i + 1) % tabs.length,
        ArrowLeft: (i - 1 + tabs.length) % tabs.length,
        Home: 0,
        End: tabs.length - 1,
      }[e.key];
      if (to === undefined) return;
      e.preventDefault();
      go(to);
      tabs[to].focus();
    });
  });
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => go(i));
    tab
      .querySelector(".demo-timer")
      ?.addEventListener("animationend", () => go((i + 1) % tabs.length));
  });
  new IntersectionObserver(([entry]) =>
    demo.toggleAttribute("data-paused", !entry.isIntersecting),
  ).observe(demo);
  go(0);
}

// Pause buttons for content that moves by itself (WCAG 2.2.2): [data-pause] toggles data-held on its
// [data-pausable] wrapper (CSS stops the hero demo timer); aria-pressed and the icon follow.
document.querySelectorAll("[data-pause]").forEach((button) => {
  const target = button.closest("[data-pausable]");
  button.addEventListener("click", () => {
    const held = target.toggleAttribute("data-held");
    button.setAttribute("aria-pressed", String(held));
    button
      .querySelector("use")
      .setAttribute("href", held ? "#i-play" : "#i-pause");
  });
});

// Why PULSE orbit: the ring of five circles turns slowly (--why-angle, one turn every 2 minutes; not with
// reduced motion, and only while on screen). Clicking a circle turns it to 3 o'clock and opens the card beside it
// with its reason; clicking it again, the card's × or Esc closes the card and the ring turns on. "Next" moves on.
// The ring also holds still while the pointer or keyboard focus is on the orbit.
const why = document.querySelector("[data-why]");
if (why) {
  const spin = why.querySelector("[data-why-spin]");
  const tabs = [...why.querySelectorAll("[data-why-tab]")];
  const panels = [...why.querySelectorAll("[data-why-panel]")];
  const step = 360 / tabs.length;
  const speed = 360 / 120000; // degrees per millisecond
  let angle = 0;
  let open = -1;
  let onScreen = false;
  let last = performance.now();
  const setAngle = () => spin.style.setProperty("--why-angle", `${angle}deg`);

  // the ring stops while the pointer or keyboard focus is on the orbit (so the circles hold still to be picked),
  // while a card is open, and off screen; the animation loop only runs while it turns
  let hovered = false;
  let frame = 0;
  // touch screens have no hover to hold it still, so there the ring does not turn by itself (WCAG 2.2.2)
  const noHover = window.matchMedia("(hover: none)").matches;
  const turning = () =>
    open < 0 && onScreen && !hovered && !reduceMotion && !noHover;
  const tick = (now) => {
    angle = (angle + (now - last) * speed) % 360;
    setAngle();
    last = now;
    frame = turning() ? requestAnimationFrame(tick) : 0;
  };
  const wake = () => {
    if (frame || !turning()) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  };
  // watch the orbit itself, not the section: hidden on phones (no box) or scrolled away, it does not turn
  const orbit = why.querySelector("[data-why-orbit]");
  new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    wake();
  }).observe(orbit ?? why);
  const setHover = (on) => {
    hovered = on;
    wake();
  };
  orbit?.addEventListener(
    "pointerenter",
    (e) => e.pointerType !== "touch" && setHover(true),
  );
  orbit?.addEventListener(
    "pointerleave",
    (e) => e.pointerType !== "touch" && setHover(false),
  );
  orbit?.addEventListener("focusin", () => setHover(true));
  orbit?.addEventListener(
    "focusout",
    (e) => !orbit.contains(e.relatedTarget) && setHover(false),
  );

  // Switching reasons: the card fades out (250ms), the ring turns, then the card fades back in with the new
  // reason (CSS why-card waits 600ms after data-show, so it appears as the 900ms turn ends).
  let swap = 0;
  const showPanel = (index) => {
    panels.forEach((panel, i) =>
      panel.toggleAttribute("data-active", i === index),
    );
    why.setAttribute("data-open", "");
    why.setAttribute("data-show", "");
  };
  const select = (index) => {
    const switching = open >= 0 && open !== index;
    open = index;
    // Shortest turn that brings circle `index` (at index × step degrees on the ring) to 3 o'clock (90°)
    const delta = ((((90 - index * step - angle) % 360) + 540) % 360) - 180;
    angle += delta;
    if (!reduceMotion) spin.setAttribute("data-turning", "");
    setAngle();
    setTimeout(() => spin.removeAttribute("data-turning"), 900);
    tabs.forEach((tab, i) => {
      tab.toggleAttribute("data-active", i === index);
      tab.setAttribute("aria-expanded", String(i === index));
    });
    clearTimeout(swap);
    if (switching && !reduceMotion) {
      why.removeAttribute("data-show"); // the slot stays open; only the card fades out and back in
      swap = setTimeout(() => showPanel(index), 300);
    } else showPanel(index);
  };
  const close = () => {
    const was = open;
    open = -1;
    wake(); // the ring turns on again
    clearTimeout(swap);
    why.removeAttribute("data-open");
    why.removeAttribute("data-show");
    tabs.forEach((tab) => {
      tab.removeAttribute("data-active");
      tab.setAttribute("aria-expanded", "false");
    });
    if (was >= 0) tabs[was].focus();
  };

  tabs.forEach((tab, i) =>
    tab.addEventListener("click", () => (open === i ? close() : select(i))),
  );
  why.querySelector("[data-why-close]").addEventListener("click", close);
  why.querySelectorAll("[data-why-next]").forEach((button) =>
    button.addEventListener("click", () => {
      select((open + 1) % tabs.length);
      // the card is hidden while it swaps, so keep focus on the new reason's circle
      tabs[open].focus();
    }),
  );
  // Esc closes the card wherever focus is
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && open >= 0) close();
  });
}

// How it works (lovable.dev style): the step whose card has crossed the middle of the screen is active.
// Its description opens (CSS: how-desc) and --how-p (0 → 1) fills the line under it as the card scrolls
// past (CSS: how-progress). The active card — once it is on screen — plays its story on a loop: a "beat"
// timeline on its [data-scene] (CSS: how-scene, pre-N / at-N variants). data-play starts it, data-b2 …
// arrive at the times in data-beats; the last frame holds, the scene fades out, resets instantly and plays
// again. A scene that loses focus (another card becomes active, or it leaves the screen) pauses on its current
// beat and carries on from there when it comes back. Hovering the active card (mouse or pen) pauses its story the
// same way, and a "Paused" sign fades in at the card's corner (CSS: how-pause; a signal only, not a control).
// A scene that has never played shows its final frame. Without JS, or with reduced motion (never data-play),
// every scene simply shows its final frame.
const how = document.querySelector("[data-how]");
if (how) {
  const steps = [...how.querySelectorAll("[data-how-step]")];
  const cards = [...how.querySelectorAll("[data-how-card]")];
  const scenes = cards.map((card) => card.querySelector("[data-scene]"));
  const HOLD = 2600; // ms the final frame stays before the loop restarts
  const FADE = 400; // ms, matches how-scene's opacity transition
  const elapsed = new Map(); // scene → ms into its loop when it was last paused
  let timers = [];
  let playing = null; // the scene that should be playing (the active, on-screen one)
  let running = null; // the scene whose timers are running
  let startedAt = 0; // performance.now() minus the elapsed time of the running scene
  let held = null; // the card under the pointer: its story pauses while it is there

  const clearTimers = () => {
    timers.forEach(clearTimeout);
    timers = [];
  };
  // jump a scene back to its first beat without transitions
  const reset = (scene) => {
    scene.setAttribute("data-instant", "");
    for (let b = 2; b <= 9; b++) scene.removeAttribute(`data-b${b}`);
    scene.removeAttribute("data-fade");
    scene.setAttribute("data-play", "");
    void scene.offsetWidth; // apply the jump before transitions come back
    scene.removeAttribute("data-instant");
  };
  // play `scene` from `from` ms into its loop; beats already reached stay as they are
  const resume = (scene, from = 0) => {
    clearTimers();
    if (from === 0) reset(scene);
    startedAt = performance.now() - from;
    const beats = scene.dataset.beats.split(" ").map(Number);
    const end = beats[beats.length - 1] + HOLD;
    beats.forEach((t, i) => {
      if (i > 0 && t > from)
        timers.push(
          setTimeout(() => scene.setAttribute(`data-b${i + 1}`, ""), t - from),
        );
    });
    timers.push(
      setTimeout(
        () => {
          scene.setAttribute("data-fade", "");
          timers.push(
            setTimeout(() => {
              elapsed.delete(scene);
              resume(scene, 0);
            }, FADE),
          );
        },
        Math.max(0, end - from),
      ),
    );
  };
  // freeze `scene` on its current beat and remember how far it got
  const hold = (scene) => {
    clearTimers();
    const beats = scene.dataset.beats.split(" ").map(Number);
    const end = beats[beats.length - 1] + HOLD;
    const at = performance.now() - startedAt;
    if (at >= end) {
      // paused while fading out: the loop is over, so the next play starts at the first beat
      scene.removeAttribute("data-fade");
      elapsed.delete(scene);
    } else elapsed.set(scene, at);
  };
  // run the scene that should play (the active one, unless its card is hovered); hold any other
  const sync = () => {
    const card = cards[scenes.indexOf(playing)];
    const want = playing && !reduceMotion && card !== held ? playing : null;
    cards.forEach((c, i) => {
      const on = scenes[i] === playing && !reduceMotion && c === held;
      c.toggleAttribute("data-held", on);
      const status = c.querySelector("[data-how-status]");
      if (status && status.textContent !== (on ? "Paused" : ""))
        status.textContent = on ? "Paused" : ""; // role=status: announced when it changes
    });
    if (running === want) return;
    if (running) hold(running);
    running = want;
    if (want) resume(want, elapsed.get(want) ?? 0);
  };
  const play = (scene) => {
    if (playing === scene) return;
    playing = scene;
    sync();
  };

  // Hovering a card (mouse and pen) pauses its story while the pointer is on it; the "Paused" sign shows meanwhile.
  cards.forEach((card) => {
    card.addEventListener("pointerenter", (e) => {
      if (e.pointerType === "touch") return;
      held = card;
      sync();
    });
    card.addEventListener("pointerleave", (e) => {
      if (e.pointerType === "touch" || held !== card) return;
      held = null;
      sync();
    });
  });

  // Clicking a step scrolls smoothly to its card (centred) instead of jumping; reduced motion jumps
  how.querySelectorAll("[data-how-link]").forEach((link) =>
    link.addEventListener("click", (event) => {
      const card = document.querySelector(link.getAttribute("href"));
      if (!card) return;
      event.preventDefault();
      card.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "center",
      });
      history.replaceState(null, "", link.getAttribute("href"));
    }),
  );

  let ticking = false;
  const update = () => {
    ticking = false;
    const middle = innerHeight / 2;
    // read every card's position first, then write: no layout is forced between the two
    const rects = cards.map((card) => card.getBoundingClientRect());
    let index = 0;
    rects.forEach((r, i) => {
      if (r.top <= middle) index = i;
    });
    const box = rects[index];
    const p = Math.min(1, Math.max(0, (middle - box.top) / box.height));
    const live =
      box.top < innerHeight * 0.8 && box.bottom > 0 ? scenes[index] : null;
    steps.forEach((step, i) => {
      step.toggleAttribute("data-active", i === index);
      step.style.setProperty("--how-p", i === index ? p.toFixed(3) : "0");
    });
    // the active, on-screen card plays its story; its Missing stripes run only then (CSS missing-flag)
    cards.forEach((card, i) =>
      card.toggleAttribute("data-active", live === scenes[i]),
    );
    play(live);
  };
  addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  addEventListener("resize", update);
  update();
}

// DEAL acronym (About page). The HTML is the final, expanded column. Measure it once, pin its width, start each
// initial from its place in a big centred "DEAL" row (FLIP: translate + scale back to the column), then loop:
//   hold 1.1s → stack (letters drop into the column, Ink → Blue) → 2.3s expand (words open) → 2s on the words →
//   collapse (words close, bottom first) → return (letters fly back into the row, Blue → Ink) → hold …
// It runs while 40% of the block is on screen; the Pause button stops it on the final words (WCAG 2.2.2). A
// resize shows the final state with fresh measurements, then the loop goes on. Reduced motion: nothing runs.
if (!reduceMotion)
  document
    .querySelectorAll("[data-deal]")
    .forEach((deal) => deal.closest("[hidden]") || initDeal(deal)); // a hidden block (About page, for now) stays idle

function initDeal(deal) {
  const SCALE = 2.7; // the big row is 2.7× the column size
  // one cycle, in ms from the hold state
  const STACK_AT = 1100;
  const EXPAND_AT = 2300;
  const COLLAPSE_AT = 5600; // ≈ 2.2s on the finished words (they are open by 3350)
  const RETURN_AT = 6350; // words closed: 3 × 100ms stagger + 450ms
  const CYCLE = 7300; // letters back in the row: 3 × 60ms + 700ms, then the next hold starts
  const initials = [...deal.querySelectorAll(".deal-initial")];
  const words = [...deal.querySelectorAll(".deal-word")];
  const pause = deal.parentElement.querySelector("[data-deal-pause]");
  let timers = [];
  let measured = false;
  let visible = false;
  let paused = false;

  const clear = () => {
    timers.forEach(clearTimeout);
    timers = [];
  };
  const at = (ms, fn) => timers.push(setTimeout(fn, ms));
  const state = (name) => deal.setAttribute("data-state", name);
  // still, final words (paused, off screen, resized)
  const finish = () => {
    clear();
    state("done");
  };
  // Measure the final layout once (and after a resize), then put every initial back into the big row
  const measure = () => {
    state("done");
    deal.style.removeProperty("--deal-w");
    const box = deal.getBoundingClientRect();
    const rects = initials.map((el) => el.getBoundingClientRect());
    const widths = words.map((el) => el.scrollWidth);
    const rowWidth = rects.reduce((sum, r) => sum + r.width * SCALE, 0);
    const rowHeight = rects[0].height * SCALE;
    let x = box.left + (box.width - rowWidth) / 2;
    const y = box.top + (box.height - rowHeight) / 2;
    initials.forEach((el, i) => {
      const r = rects[i];
      el.style.setProperty("--i", i);
      el.style.setProperty("--ri", initials.length - 1 - i);
      el.style.setProperty(
        "--deal-from",
        `translate(${(x - r.left).toFixed(1)}px, ${(y - r.top).toFixed(1)}px) scale(${SCALE})`,
      );
      x += r.width * SCALE;
    });
    words.forEach((el, i) => {
      el.style.setProperty("--i", i);
      el.style.setProperty("--ri", words.length - 1 - i);
      el.style.setProperty("--w", `${widths[i]}px`);
    });
    deal.style.setProperty("--deal-w", `${box.width}px`);
    measured = true;
  };
  const cycle = () => {
    clear();
    state("hold"); // the end of "return" looks exactly like "hold", so the jump is invisible
    at(STACK_AT, () => state("stack"));
    at(EXPAND_AT, () => state("expand"));
    at(COLLAPSE_AT, () => state("collapse"));
    at(RETURN_AT, () => state("return"));
    at(CYCLE, cycle);
  };
  const start = () => {
    if (paused || !visible) return;
    if (!measured) measure();
    cycle();
  };

  document.fonts.ready.then(() => {
    measure();
    state(paused ? "done" : "hold");
    new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else finish();
      },
      { threshold: 0.4 },
    ).observe(deal);
  });

  pause?.addEventListener("click", () => {
    paused = !paused;
    pause.setAttribute("aria-pressed", String(paused));
    pause.querySelector("[data-deal-pause-label]").textContent = paused
      ? "Play animation"
      : "Pause animation";
    pause
      .querySelector("[data-deal-pause-icon]")
      .setAttribute("href", paused ? "#i-play" : "#i-pause");
    if (paused) finish();
    else start();
  });

  let resizeTimer;
  let lastWidth = innerWidth;
  addEventListener("resize", () => {
    if (innerWidth === lastWidth) return; // mobile address bar: height-only resizes are not layout changes
    lastWidth = innerWidth;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      finish();
      measure();
      state("done");
      at(2000, start); // show the final words, then carry on looping
    }, 150);
  });
}

// Background video (product heroes). data-bg-video is the file stem: "<stem>-light|dark.av1.mp4" (AV1, smaller) and
// ".h264.mp4" (fallback) plus "<stem>-light|dark.webp" (poster, the <picture> behind it). The theme follows the OS
// or <html data-theme>. It plays only while on screen and fades in once a frame is playing. The poster is only a
// fallback: reduced motion and no JS (CSS), autoplay blocked, or no frame after 3s. There is no
// pause button (decided 16 Oct 2026): reduced motion is the opt-out.
document.querySelectorAll("[data-bg-video]").forEach((video) => {
  if (reduceMotion) return; // the CSS shows the poster instead
  const stem = video.dataset.bgVideo;
  const section = video.closest("section");
  const poster = section.querySelector("[data-bg-poster]");
  const osDark = matchMedia("(prefers-color-scheme: dark)");
  const STALL = 3000; // ms without a playing frame before the poster stands in
  let visible = false;
  let theme = null;
  let stall;

  const currentTheme = () =>
    document.documentElement.dataset.theme ??
    (osDark.matches ? "dark" : "light");
  // the poster is only a fallback: shown when the video cannot play (blocked autoplay, very slow connection)
  const fallback = () => poster.setAttribute("data-fallback", "");
  const load = () => {
    const next = currentTheme();
    if (next === theme) return;
    theme = next;
    video.removeAttribute("data-playing"); // the old theme's video fades out, the new one fades in
    video.replaceChildren(
      Object.assign(document.createElement("source"), {
        src: `${stem}-${theme}.av1.mp4`,
        type: 'video/mp4; codecs="av01.0.08M.08"',
      }),
      Object.assign(document.createElement("source"), {
        src: `${stem}-${theme}.h264.mp4`,
        type: "video/mp4",
      }),
    );
    // the poster <picture> only knows the OS theme; follow a data-theme override too
    if (document.documentElement.dataset.theme) {
      poster.querySelectorAll("source").forEach((s) => s.remove());
      poster.querySelector("img").src = `${stem}-${theme}.webp`;
    }
    video.load();
    clearTimeout(stall);
    stall = setTimeout(
      () => video.hasAttribute("data-playing") || fallback(),
      STALL,
    );
    update();
  };
  video.addEventListener("playing", () => {
    clearTimeout(stall);
    video.setAttribute("data-playing", ""); // fades the video in (hero-video-media)
    // a poster that stood in goes once the video has faded in over it
    setTimeout(() => poster.removeAttribute("data-fallback"), 700);
  });
  const update = () => {
    if (visible)
      video.play().catch((e) => e.name === "NotAllowedError" && fallback()); // autoplay blocked
    else video.pause();
  };

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) load(); // first time on screen: fetch the video
    update();
  }).observe(section);
  osDark.addEventListener("change", () => theme && load());
});

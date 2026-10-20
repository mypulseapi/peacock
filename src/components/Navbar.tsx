"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SIGNIN_URL } from "@/lib/constants";
import { img } from "@/lib/cdn";
import { navGroups, navFlat, navCta, type NavGroup, type NavItem, type NavTone } from "@/content/nav";
import { ui } from "@/content/locale";

/**
 * Mega-menu navigation.
 *
 * The old bar was four flat links, which gave a buyer no way to locate themselves:
 * "Product" and "Industries" told them nothing about whether this was for them. Each
 * group now opens a panel whose left rail says what the group is for and whose items
 * each carry one sentence.
 *
 * Opens on hover for pointer users and on click/Enter for everyone else, because a
 * hover-only menu is unusable by keyboard and on touch. Escape closes and returns
 * focus to the trigger.
 */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = useTranslations("nav");
  const locale = useLocale();
  const chrome = ui(locale);
  const NAV_GROUPS = navGroups(locale);
  const NAV_FLAT = navFlat(locale);
  // `lead` items sit in front of the group buttons; the rest follow them.
  const navLead = NAV_FLAT.filter((l) => "lead" in l && l.lead);
  const navTrail = NAV_FLAT.filter((l) => !("lead" in l && l.lead));
  const NAV_CTA = navCta(locale);
  // The bar sits on the ink hero in both themes, so the wordmark is always the
  // reversed one. Reading the theme here produced an indigo logo on black.
  // Two files: the white mark for the ink chrome, the colour one for the light
  // chrome. CSS picks, so the right one is in the first paint. See globals.
  const logoLight = img("brand/logo-white.webp");
  const logoDark = img("brand/logo.webp");

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);
  // Small grace period so the pointer can cross the gap from trigger to panel.
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenGroup(null), 140);
  }, [cancelClose]);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) {
        setMobileOpen(false);
        setOpenGroup(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpenGroup(null); setMobileOpen(false); }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
      cancelClose();
    };
  }, [cancelClose]);

  return (
    <nav
      ref={navRef}
      className="sig-nav fixed top-0 right-0 left-0 z-50 border-b border-[color:var(--chrome-line)] bg-[color:var(--chrome)]/85 px-5 backdrop-blur-xl sm:px-6"
    >
      <div className="hero-rail -mx-5 px-5 sm:-mx-6 sm:px-6">
        <p className="mx-auto flex max-w-shell items-center justify-center gap-2 py-2.5 text-center text-[0.8125rem] text-[color:var(--on-chrome-2)]">
          {chrome.announce}
          <Link href="/contact" className="inline-flex min-h-[24px] items-center gap-1 font-semibold text-[color:var(--sig)] underline underline-offset-4 hover:no-underline">
            {chrome.announceCta}
            <ArrowRight className="h-3 w-3" aria-hidden />
          </Link>
        </p>
      </div>

      <div className="mx-auto max-w-shell">
        <div className="flex h-[68px] items-center justify-between gap-4">
          <Link href="/" className="group flex shrink-0 items-center" aria-label="Pulse home">
            {/* 600x200 is the asset's real size. It was declared 104x28, a 3.71 ratio
                against the file's 3.00, so the browser reserved 104px of header and
                reflowed to 84px once the image loaded. */}
            <Image src={logoDark} alt="Pulse" width={600} height={200} priority sizes="104px" className="logo-light h-7 w-auto" />
            <Image src={logoLight} alt="" aria-hidden width={600} height={200} priority sizes="104px" className="logo-dark h-7 w-auto" />
          </Link>

          {/* Desktop */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navLead.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex rounded-lg px-3 py-2 text-[0.9375rem] font-medium text-[color:var(--on-chrome-2)] transition hover:bg-[color:var(--chrome-2)] hover:text-[color:var(--on-chrome)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {NAV_GROUPS.map((g) => (
              <li
                key={g.label}
                className="relative"
                // A wide panel is left-aligned to this trigger, so how wide it
                // may be is the space from here to the right gutter. Measured on
                // enter rather than guessed, because the trigger's offset moves
                // with the locale: "Sản phẩm" is wider than "Product".
                onPointerEnter={(e) => {
                  cancelClose();
                  const el = e.currentTarget;
                  const left = el.getBoundingClientRect().left;
                  const gutter = 24;
                  // What the panel wants, and what the viewport allows.
                  const want = Math.min(70 * 16, window.innerWidth - gutter * 2);
                  const room = window.innerWidth - left - gutter;
                  // Left-aligned to the trigger whenever it fits. When it does
                  // not, shift left rather than squeeze: three columns crammed
                  // into the space right of "Solutions" wrapped every blurb to
                  // three lines, which is the opposite of readable.
                  const shift = Math.min(0, room - want);
                  el.style.setProperty("--panel-w", `${want}px`);
                  el.style.setProperty("--panel-shift", `${shift}px`);
                  setOpenGroup(g.label);
                }}
                onPointerLeave={scheduleClose}
              >
                <button
                  type="button"
                  aria-expanded={openGroup === g.label}
                  aria-haspopup="true"
                  onClick={() => setOpenGroup(openGroup === g.label ? null : g.label)}
                  className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[0.9375rem] font-medium text-[color:var(--on-chrome-2)] transition hover:bg-[color:var(--chrome-2)] hover:text-[color:var(--on-chrome)] focus-visible:ring-2 focus-visible:ring-[color:var(--sig)] focus-visible:outline-none"
                >
                  {g.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${openGroup === g.label ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                {openGroup === g.label && <MegaPanel group={g} onNavigate={() => setOpenGroup(null)} />}
              </li>
            ))}
            {navTrail.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex rounded-lg px-3 py-2 text-[0.9375rem] font-medium text-[color:var(--on-chrome-2)] transition hover:bg-[color:var(--chrome-2)] hover:text-[color:var(--on-chrome)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher />
            <ThemeToggle />
            <a
              href={SIGNIN_URL}
              className="rounded-lg px-3 py-2 text-[0.9375rem] font-medium text-[color:var(--on-chrome-2)] transition hover:text-[color:var(--on-chrome)]"
            >
              {t("signIn")}
            </a>
            <Link
              href={NAV_CTA.href}
              className="sig-cta group inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-[0.9375rem] focus-visible:ring-2 focus-visible:ring-[color:var(--sig)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--chrome)] focus-visible:outline-none"
            >
              {NAV_CTA.label}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="rounded-lg p-2 text-[color:var(--on-chrome)] lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>


        {mobileOpen && (
          <div className="max-h-[calc(100vh-68px)] overflow-y-auto border-t border-[color:var(--chrome-line)] py-4 lg:hidden">
            {navLead.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="mb-5 flex min-h-[44px] items-center rounded-lg px-2 text-[0.9375rem] font-medium text-[color:var(--on-chrome)] hover:bg-[color:var(--chrome-2)]"
              >
                {l.label}
              </Link>
            ))}
            {NAV_GROUPS.map((g) => (
              <div key={g.label} className="mb-5">
                <p className="ed-eyebrow mb-2">{g.label}</p>
                {/* A split group keeps its two headings here. Flattened, Product
                    is eight rows and the reader loses which half they are in. */}
                {(g.columns ?? [{ eyebrow: "", headline: "", tone: "sig" as const, items: g.items }]).map((col) => (
                  <div key={col.eyebrow} className="mb-3 last:mb-0">
                    {col.eyebrow && (
                      <p className="mb-1.5 px-2 text-[0.6875rem] font-semibold tracking-wider text-[color:var(--on-chrome-3)] uppercase">
                        {col.eyebrow}
                      </p>
                    )}
                    <ul className="space-y-1">
                      {col.items.map((it) => {
                        const Icon = it.icon;
                        const hue = TONE[col.tone ?? "sig"];
                        return (
                          <li key={it.href}>
                            <Link
                              href={it.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex min-h-[44px] items-center gap-3 rounded-lg px-2 py-2 text-[0.9375rem] font-medium text-[color:var(--on-chrome)] hover:bg-[color:var(--chrome-2)]"
                            >
                              <span
                                className="grid h-7 w-7 shrink-0 place-items-center rounded-md"
                                style={{ background: `color-mix(in srgb, ${hue} 14%, transparent)` }}
                                aria-hidden
                              >
                                <Icon className="h-3.5 w-3.5" style={{ color: hue }} />
                              </span>
                              {it.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
            <div className="ed-rule flex flex-col gap-2 pt-4">
              {navTrail.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="px-2 py-2 text-[0.9375rem] font-medium text-[color:var(--on-chrome)]">
                  {l.label}
                </Link>
              ))}
              <a href={SIGNIN_URL} className="px-2 py-2 text-[0.9375rem] font-medium text-[color:var(--on-chrome)]">{t("signIn")}</a>
              <Link
                href={NAV_CTA.href}
                onClick={() => setMobileOpen(false)}
                className="sig-cta mt-1 rounded-lg px-4 py-3 text-center text-[0.9375rem]"
              >
                {NAV_CTA.label}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

/**
 * One item row. Shared by both panel shapes so a link looks the same wherever
 * it is, which is the thing that goes wrong first when a nav grows a second
 * layout.
 */
/**
 * The icon colour, and a 14% wash of it behind. Five slots, resolved from the
 * theme variant rather than named here: these used to be five literal hexes,
 * which meant a re-skin left lime and teal icons sitting on the new palette.
 * Whether the five differ at all is the variant's call (section 0 of globals).
 */
const TONE: Record<NavTone, string> = {
  sig: "var(--tone-1)",
  blue: "var(--tone-2)",
  amber: "var(--tone-3)",
  teal: "var(--tone-4)",
  coral: "var(--tone-5)",
};

function NavRow({ item, tone, onNavigate }: { item: NavItem; tone: NavTone; onNavigate: () => void }) {
  const hue = TONE[tone];
  const Icon = item.icon;
  return (
    <li>
      <Link
        href={item.href}
        onClick={onNavigate}
        className="group/i flex gap-3.5 rounded-xl px-3 py-3.5 transition hover:bg-[color:var(--panel-2)] focus-visible:ring-2 focus-visible:ring-[color:var(--sig)] focus-visible:outline-none"
      >
        <span
          className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-transform group-hover/i:scale-105"
          style={{ background: `color-mix(in srgb, ${hue} 14%, transparent)` }}
          aria-hidden
        >
          <Icon className="h-4 w-4" style={{ color: hue }} />
        </span>
        <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 text-[0.9375rem] font-semibold text-[color:var(--on-chrome)]">
          {item.label}
          {item.tag && (
            <span className="rounded-md bg-[color:var(--sig)]/15 px-1.5 py-0.5 text-[0.625rem] font-semibold tracking-wide text-[color:var(--sig)] uppercase">
              {item.tag}
            </span>
          )}
          <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover/i:translate-x-0 group-hover/i:opacity-100" aria-hidden />
        </span>
        {item.blurb && (
          <span className="mt-1.5 block text-[0.8125rem] leading-[1.65] text-[color:var(--on-chrome-3)]">{item.blurb}</span>
        )}
        </span>
      </Link>
    </li>
  );
}

/**
 * Two panel shapes.
 *
 * A group with `columns` splits into products beside how-it-works, because two
 * different people hover the same menu: whoever is deciding what to buy, and
 * whoever they forward it to. Keeping the method one hover away from the
 * product is the whole reason for the split, and it is the shelf a competitor
 * with twelve case studies cannot fill.
 *
 * Everything else keeps the rail: a group whose items share one purpose reads
 * better with that purpose stated once than with it split in half.
 */
function MegaPanel({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  if (group.columns) {
    return (
      // Left edge flush with the trigger, and shifted left only when it would
      // otherwise run past the gutter. Both values are written by the trigger
      // on enter, from its own offset. The earlier version clamped the width
      // instead, which kept three columns on screen by squeezing each one to
      // about 300px and wrapping every blurb to three lines.
      <div
        className="absolute top-full z-50 pt-2"
        style={{
          width: "var(--panel-w, min(70rem, calc(100vw - 3rem)))",
          left: "var(--panel-shift, 0px)",
        }}
      >
        <div
          className="sig-panel-2 ed-rise grid gap-7 rounded-2xl border border-[color:var(--chrome-line)] p-7 shadow-[0_28px_60px_-18px_rgb(var(--veil-rgb)/.28)]"
          style={{
            // Follows the column count, so a fourth column later does not
            // silently squash the other three.
            // Weighted by how much each column holds, so a one-item column
            // does not claim the same width as a five-item one.
            gridTemplateColumns: group.columns
              .map((c) => `minmax(0, ${Math.max(1, c.items.length / 2).toFixed(2)}fr)`)
              .join(" "),
          }}
        >
          {group.columns.map((col, i) => (
            <div key={col.eyebrow} className={i > 0 ? "border-l border-[color:var(--chrome-line)] pl-5" : undefined}>
              <div className="px-3">
                <p className="sig-eyebrow">{col.eyebrow}</p>
                <p className="mt-3 text-[0.9375rem] leading-[1.5] font-semibold text-balance text-[color:var(--on-chrome)]">
                  {col.headline}
                </p>
              </div>
              <ul className="mt-6 space-y-2">
                {col.items.map((it) => (
                  <NavRow key={it.href} item={it} tone={col.tone} onNavigate={onNavigate} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 pt-2">
      <div className="sig-panel-2 ed-rise grid w-[44rem] grid-cols-[13rem_minmax(0,1fr)] gap-7 rounded-2xl border border-[color:var(--chrome-line)] p-7 shadow-[0_28px_60px_-18px_rgb(var(--veil-rgb)/.28)]">
        <div className="rounded-xl bg-[color:var(--panel-2)] p-4">
          <p className="sig-eyebrow">{group.label}</p>
          <p className="mt-2 text-[0.8125rem] leading-relaxed text-[color:var(--on-chrome-2)]">{group.summary}</p>
        </div>
        <ul className="space-y-2">
          {group.items.map((it) => (
            <NavRow key={it.href} item={it} tone="sig" onNavigate={onNavigate} />
          ))}
        </ul>
      </div>
    </div>
  );
}

"use client";

import { useLocale } from "next-intl";
import { C, EASE } from "@/components/charts/tokens";
import { useInView, useCountUp } from "@/components/charts/useInView";
import { Package, ReceiptText, CookieIcon, Users, ShieldCheck, Check, X } from "lucide-react";
import { scenes } from "@/content/home";

/**
 * Drawn scenes, one per section that was carrying its idea in prose.
 *
 * Every one is SVG and CSS. No raster assets, which matters here for a reason
 * beyond taste: new images have to be pushed to R2 or they 404 wherever
 * NEXT_PUBLIC_CDN_URL is set, and a stock photograph of somebody at a laptop
 * would say nothing about attribute extraction anyway.
 *
 * Each animates once on scroll and renders at its final state under reduced
 * motion, through the same hook the charts use.
 */

/**
 * The frame every scene sits in.
 *
 * It was a white card that sized to its contents, so beside a four-card column
 * it ended up half the height with a gap under it. It stretches now, and it
 * carries a tinted ground and a bloom in its own hue: a plain white panel next
 * to four tinted cards read as the unfinished part of the section.
 */
function Stage({ label, tone, children }: {
  label: string; tone: "mint" | "sky"; children: React.ReactNode;
}) {
  const ground = tone === "mint"
    ? "linear-gradient(150deg, var(--sig-tint) 0%, var(--sig-tint) 60%, #eef3fe 100%)"
    : "linear-gradient(150deg, #eef3fe 0%, #f1f4fb 55%, #f7f3ec 100%)";
  // Both arms were blue after the re-skin (1.03:1), so the tone said nothing.
const bloom = tone === "mint" ? "var(--sig)" : "var(--state-off)";

  return (
    <figure className="relative flex h-full flex-col overflow-hidden rounded-2xl" style={{ background: ground }}>
      <span aria-hidden className="pointer-events-none absolute -top-20 -right-16 h-60 w-60 rounded-full"
            style={{ background: bloom, opacity: 0.1, filter: "blur(64px)" }} />
      <div className="relative border-b px-6 py-4" style={{ borderColor: "rgb(22 24 29 / 0.07)" }}>
        <span className="text-[0.8125rem] font-bold" style={{ color: C.ink }}>{label}</span>
      </div>
      <div className="relative flex flex-1 flex-col justify-center px-6 py-7">{children}</div>
    </figure>
  );
}

/**
 * The fact is in the title, not in a field.
 *
 * The single clearest picture of what this product does, so it gets the room:
 * a saturated ground, type at display size and a value that physically travels
 * out of the sentence it was written in and into the column a filter reads.
 *
 * It was previously a small white card in a 26rem side column with muted
 * greens, which made the most important figure on the page the quietest thing
 * in its section.
 */
export function ExtractScene() {
  const s = scenes(useLocale());
  const { ref, shown } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl px-6 py-12 sm:px-12 sm:py-16"
      style={{ background: "linear-gradient(140deg, var(--sig-tint) 0%, #eef3fe 55%, #fdf3e8 100%)" }}
    >
      {/* Two soft blooms, the way the reference grounds its illustrations. */}
      <span aria-hidden className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full"
            style={{ background: "var(--sig-deep)", opacity: 0.1, filter: "blur(70px)" }} />
      <span aria-hidden className="pointer-events-none absolute -right-24 -bottom-28 h-80 w-80 rounded-full"
            style={{ background: "var(--sig-deep)", opacity: 0.1, filter: "blur(80px)" }} />

      <div className="relative mx-auto max-w-[44rem]">
        <p className="text-[0.75rem] font-bold tracking-[0.14em] uppercase" style={{ color: C.mute }}>
          {s.inTheTitle}
        </p>

        <p className="mt-5 text-[clamp(1.25rem,3vw,1.875rem)] leading-snug font-semibold" style={{ color: C.ink }}>
          HP Spectre x360{" "}
          <span
            className="relative inline-block rounded-xl px-3 py-1"
            style={{
              background: shown ? "var(--sig-deep)" : "transparent",
              color: shown ? "#ffffff" : C.ink,
              boxShadow: shown ? "0 8px 24px -8px rgb(77 124 15 / 0.7)" : "none",
              transition: `background-color 460ms ${EASE} 200ms, color 460ms ${EASE} 200ms, box-shadow 460ms ${EASE} 200ms`,
            }}
          >
            13.5&quot; OLED
          </span>{" "}
          Touch, 16GB
        </p>

        {/* The travel. Thick, dashed, and it draws itself. */}
        <svg viewBox="0 0 600 90" className="mt-2 h-24 w-full" aria-hidden preserveAspectRatio="none">
          <path
            d="M190 6 C 190 56, 300 40, 300 84"
            fill="none" stroke="var(--sig-deep)" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 12"
            style={{
              strokeDashoffset: shown ? 0 : 180,
              opacity: shown ? 1 : 0,
              transition: `stroke-dashoffset 900ms ${EASE} 700ms, opacity 240ms ease 700ms`,
            }}
          />
          <circle cx="300" cy="84" r="7" fill="var(--sig-deep)"
                  style={{ opacity: shown ? 1 : 0, transition: `opacity 260ms ease 1500ms` }} />
        </svg>

        <p className="text-[0.75rem] font-bold tracking-[0.14em] uppercase" style={{ color: C.mute }}>
          {s.asAField}
        </p>

        <div
          className="mt-5 flex items-center justify-between gap-6 rounded-2xl px-7 py-6"
          style={{
            background: shown ? "#ffffff" : "rgb(255 255 255 / 0.55)",
            boxShadow: shown ? "0 18px 40px -20px rgb(22 24 29 / 0.28)" : "none",
            transition: `background-color 420ms ${EASE} 1400ms, box-shadow 420ms ${EASE} 1400ms`,
          }}
        >
          <span className="text-[clamp(1rem,2.2vw,1.375rem)] font-semibold" style={{ color: C.ink }}>
            {s.screenSizeField}
          </span>
          <span
            className="ed-num rounded-xl px-4 py-2 text-[clamp(1.125rem,2.6vw,1.75rem)] font-bold"
            style={{
              background: shown ? "var(--sig-tint)" : "#fdeceb",
              color: shown ? "var(--sig-deep)" : "#b91c1c",
              transition: `background-color 340ms ${EASE} 1500ms, color 340ms ${EASE} 1500ms`,
            }}
          >
            {shown ? '13.5"' : s.empty}
          </span>
        </div>

        <p className="mt-7 max-w-[54ch] text-[0.9375rem] leading-relaxed" style={{ color: C.mid }}>
          {s.extractNote}
        </p>
      </div>
    </div>
  );
}

/**
 * The held-back arm, drawn.
 *
 * The honesty section argues that a claim without a control group is not a
 * claim. That is an abstract point in prose and an obvious one in a picture:
 * traffic splits, one side never sees the engine, the two get compared.
 */
export function ControlScene() {
  const s = scenes(useLocale());
  const { ref, shown, reduced } = useInView<HTMLDivElement>();
  const engineNum = useCountUp(90, shown, reduced, 1100);
  const heldNum = useCountUp(10, shown, reduced, 1100);
  // The held-back arm was grey, which read as "disabled" rather than as the
  // half of the traffic that makes the other half measurable.
  //
  // #F5EEBE is the requested colour and it is the track, not the fill: at
  // 1.08:1 against this panel it cannot carry a bar segment, so it is the
  // groove the blue sweeps out of and stays visible while it does. The held
  // arm itself is the deep point of the same gold, 4.52:1 on the panel and
  // ΔE 30.2 protan against the blue.
  const TRACK = "#F5EEBE";
  const arms = [
    { k: s.engineOn, pct: 90, c: C.work, bg: C.workBg },
    { k: s.heldBack, pct: 10, c: "#A16207", bg: "#fdf6e3" },
  ];

  return (
    <Stage label={s.controlTitle} tone="sky">
      <div ref={ref}>
        <div className="flex h-9 w-full overflow-hidden rounded-lg" style={{ background: TRACK }} aria-hidden>
          {arms.map((a, i) => (
            <span
              key={a.k}
              // The engine arm keeps moving. The held-back arm does not: it is
              // the one where nothing is being done to the traffic, and making
              // both flow would say the opposite.
              className={i === 0 ? "lane-flow" : undefined}
              style={{
                // Both arms sweep out from zero rather than easing apart from a
                // half-and-half split, which read as a bar correcting itself
                // rather than as traffic being divided.
                width: shown ? `${a.pct}%` : "0%",
                background: a.c,
                transition: `width 1100ms ${EASE}`,
                transitionDelay: `${i * 220 + 120}ms`,
                borderRight: i === 0 ? "2px solid #fff" : undefined,
              }}
            />
          ))}
        </div>

        <ul className="mt-5 space-y-3">
          {arms.map((a) => (
            <li key={a.k} className="flex items-center gap-3">
              <span className="h-3 w-3 shrink-0 rounded-[3px]" style={{ background: a.c }} aria-hidden />
              <span className="flex-1 text-[0.875rem]" style={{ color: C.mid }}>{a.k}</span>
              <span className="ed-num text-[0.875rem] font-bold" style={{ color: a.c }}>
                <span ref={a.pct === 90 ? engineNum : heldNum}>{a.pct}</span>%
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-lg px-4 py-3" style={{ background: C.baseBg }}>
          <p className="text-[0.8125rem] leading-relaxed" style={{ color: C.mid }}>{s.controlNote}</p>
        </div>
      </div>
    </Stage>
  );
}

/**
 * What goes in, and what is turned away.
 *
 * A shield, then four lanes, each in its own hue with its own icon. The scene
 * had three identical grey refusals and a lot of empty ground above and below
 * them, which made a section about privacy look like an afterthought.
 *
 * On the colours: as a categorical set these measure ΔE 5.8 protan at the
 * worst adjacent pair, which is inside the floor band and legal only with a
 * secondary encoding. Each lane carries a tick or a cross, a distinct label, a
 * strikethrough when refused and a gap from its neighbours, so the hue is the
 * fourth signal rather than the only one. Red and green are deliberately not
 * adjacent: in that order they measure ΔE 1.5 for deuteranopia, which is no
 * separation at all.
 */
export function PrivacyScene() {
  const s = scenes(useLocale());
  const { ref, shown } = useInView<HTMLUListElement>();

  const lanes = [
    { k: s.productData, ok: true, hue: "var(--sig-deep)", Icon: Package },
    { k: s.orderHistory, ok: false, hue: "#d97706", Icon: ReceiptText },
    { k: s.cookies, ok: false, hue: "var(--sig-deep)", Icon: CookieIcon },
    { k: s.customerRecords, ok: false, hue: "#b91c1c", Icon: Users },
  ];

  return (
    <Stage label={s.privacyTitle} tone="mint">
      {/* The shield names the subject. The ring sweeps closed once. */}
      <div className="mb-7 flex justify-center">
        <span className="relative grid h-20 w-20 place-items-center">
          <svg viewBox="0 0 80 80" className="absolute inset-0 h-full w-full" aria-hidden>
            <circle cx="40" cy="40" r="36" fill="none" stroke="rgb(22 24 29 / 0.08)" strokeWidth="4" />
            <circle
              cx="40" cy="40" r="36" fill="none" stroke="var(--sig-deep)" strokeWidth="4" strokeLinecap="round"
              transform="rotate(-90 40 40)"
              style={{
                strokeDasharray: 226,
                strokeDashoffset: shown ? 0 : 226,
                transition: `stroke-dashoffset 1200ms ${EASE} 120ms`,
              }}
            />
          </svg>
          <ShieldCheck
            className="h-9 w-9"
            style={{
              color: "var(--sig-deep)",
              opacity: shown ? 1 : 0,
              transform: `scale(${shown ? 1 : 0.7})`,
              transition: `opacity 420ms ${EASE} 500ms, transform 420ms ${EASE} 500ms`,
            }}
            aria-hidden
          />
        </span>
      </div>

      <ul ref={ref} className="space-y-2.5">
        {lanes.map((l, i) => (
          <li
            key={l.k}
            className="flex items-center gap-3.5 rounded-xl px-4 py-3.5"
            style={{
              background: l.ok ? "var(--sig-tint-2)" : `color-mix(in srgb, ${l.hue} 9%, #ffffff)`,
              boxShadow: l.ok ? `inset 0 0 0 1.5px ${l.hue}` : "none",
              opacity: shown ? 1 : 0,
              transform: shown ? "translateX(0)" : "translateX(-10px)",
              transition: `opacity 420ms ${EASE}, transform 420ms ${EASE}`,
              transitionDelay: `${700 + i * 130}ms`,
            }}
          >
            <span
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg"
              style={{ background: l.ok ? l.hue : `color-mix(in srgb, ${l.hue} 16%, #ffffff)` }}
              aria-hidden
            >
              <l.Icon className="h-4 w-4" style={{ color: l.ok ? "#ffffff" : l.hue }} />
            </span>

            <span className="relative min-w-0 flex-1 text-[0.875rem] leading-snug"
                  style={{ color: l.ok ? C.ink : C.mid, fontWeight: l.ok ? 600 : 500 }}>
              {l.k}
              {!l.ok && (
                <span
                  aria-hidden
                  className="absolute top-1/2 left-0 h-[1.5px] origin-left rounded-full"
                  style={{
                    width: "100%",
                    background: l.hue,
                    transform: shown ? "scaleX(1)" : "scaleX(0)",
                    transition: `transform 420ms ${EASE}`,
                    transitionDelay: `${900 + i * 130}ms`,
                  }}
                />
              )}
            </span>

            <span className="shrink-0" aria-hidden>
              {l.ok
                ? <Check className="h-4 w-4" style={{ color: l.hue }} />
                : <X className="h-4 w-4" style={{ color: l.hue }} />}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-[0.75rem] leading-relaxed" style={{ color: C.mid }}>{s.privacyNote}</p>
    </Stage>
  );
}

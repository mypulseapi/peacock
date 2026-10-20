/**
 * Converted from `decision-monitor.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import Link from "next/link";

export function Section1Section() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
            <div className="absolute inset-0 -z-10" aria-hidden="true">
              <picture className="hero-video-poster" data-bg-poster>
                <source
                  srcSet="/assets/product/decision-monitor-dark.webp"
                  media="(prefers-color-scheme: dark)"
                />
                <img
                  src="/assets/product/decision-monitor-light.webp"
                  alt=""
                  width={2560}
                  height={1440}
                  className="hero-video-media"
                />
              </picture>
              <video
                className="hero-video-media hero-video-fade"
                width={2560}
                height={1440}
                muted
                loop
                playsInline
                preload="none"
                data-bg-video="/assets/product/decision-monitor"
              ></video>
              <div className="absolute inset-0 hero-video-scrim"></div>
            </div>
            {/* the frame keeps the page margins; the box inside it is the hero's height (540 / 800px) with the title and
                 the description under it at the top left */}
            <div className="frame">
              <div className="min-h-135 py-14 lg:min-h-200 lg:py-20">
                <h1 className="reveal max-w-2xl text-headline text-balance">
                  <span className="sm:block">Know the week a shelf</span>
                  <span className="sm:block">stopped being decidable</span>
                </h1>
                <p
                  className="reveal mt-6 max-w-lg text-lg leading-relaxed text-balance text-muted delay-100"
                >
                  Catalogues decay quietly. New products arrive unrecorded and a
                  shelf that was ready last quarter stops being ready. Monitor
                  re-measures as yours changes and names the shelf, the attribute
                  and the cause.
                </p>
                {/* "Ask AI" is a placeholder, hidden until the AI assistant exists: remove "hidden" and wire it up then */}
                <div className="reveal mt-8 flex flex-wrap gap-3 delay-200">
                  <Link href="/en/../contact" className="btn-primary"
                    >Request a Decision Audit</Link>
                  <button type="button" className="btn-secondary hidden" data-ask-ai>
                    <svg className="size-4 text-primary" aria-hidden="true">
                      <use href="#i-sparkles" /></svg
                    >Ask AI
                  </button>
                </div>
              </div>
            </div>
          </section>
  );
}

/**
 * Converted from `furniture.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { designedText } from "../../t";
import Image from "next/image";
import { img } from "@/lib/cdn";
export function Section2Section() {
  const t = designedText("industries.furniture.section2");
  return (
    <section className="border-b border-line">
            <div
              className="frame grid grid-cols-1 gap-12 py-20 lg:grid-cols-12 lg:gap-x-0 lg:py-28"
            >
              <div className="lg:col-span-3 lg:pr-8">
                <h2 className="reveal text-title text-balance">
                  {t('1')}
                </h2>
              </div>
              <ul
                className="reveal divide-y divide-line border-y border-line lg:col-span-6 lg:self-start lg:pr-10"
              >
                <li className="flex items-baseline gap-5 py-5 sm:gap-8">
                  <p
                    className="w-20 shrink-0 font-display text-h1 font-semibold tabular-nums text-ink sm:w-24"
                  >
                    38%
                  </p>
                  <div>
                    <p className="text-body text-pretty text-ink">
                      {t('2')}
                    </p>
                    <p className="mt-1 text-caption text-muted">{t('3')}</p>
                  </div>
                </li>
                <li className="flex items-baseline gap-5 py-5 sm:gap-8">
                  <p
                    className="w-20 shrink-0 font-display text-h1 font-semibold tabular-nums text-ink sm:w-24"
                  >
                    34%
                  </p>
                  <div>
                    <p className="text-body text-pretty text-ink">
                      {t('4')}
                    </p>
                    <p className="mt-1 text-caption text-muted">{t('5')}</p>
                  </div>
                </li>
              </ul>
              {/*
                The room the figures describe. The percentages themselves stay as text rather than
                being taken from the supplied artwork: baked into a picture they would not
                translate on `/vi`, could not be selected, and would not be read out.

                Opaque, with no alpha, so the box keeps a light fill pinned in both themes.
              */}
              <figure className="reveal hidden self-center delay-100 lg:col-span-3 lg:block">
                <div className="overflow-hidden rounded-2xl border border-line bg-[#fdfdfd]">
                  <Image
                    src={img("sectors/furniture-living-room-armchair-scene.webp")}
                    alt={t('sceneAlt')}
                    width={760}
                    height={1230}
                    sizes="(min-width: 1024px) 24vw, 0px"
                    className="h-auto w-full"
                  />
                </div>
              </figure>
            </div>
          </section>
  );
}

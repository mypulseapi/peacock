/**
 * Converted from `about.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import { asset } from "@/lib/cdn";
import { designedText } from "../t";
import Image from "next/image";

export function Section5Section() {
  const t = designedText("about.section5");
  return (
    <section className="border-b border-line">
            <div className="frame py-20 lg:py-28">
              <div className="grid gap-4 lg:grid-cols-12 lg:gap-x-0">
                <h2 className="text-title text-balance lg:col-span-5 lg:pr-16">
                  {t('1')}
                </h2>
                <p
                  className="text-body leading-relaxed text-pretty text-muted lg:col-span-7"
                >
                  {t('2')}
                </p>
              </div>
              {/* Team (names, roles and LinkedIn from team.md, 19 Oct 2026; photos in src/assets/team as 384px transparent PNGs,
                   backgrounds removed). Card after the owner's reference: round portrait, name and role, LinkedIn; on hover or
                   keyboard focus a half-circle dome (rounded-t-full: primary-tint → primary-line, the reference's shape in Pulse Blue) rises behind the text
                   and the portrait gets an ink ring; the LinkedIn link shows only then (always on touch screens), and the portrait zooms 20% from its base so the head steps out over the ring (team-pop: a second copy of the photo, clipped to its top half only). Order (owner's): Tracy, Rosie, Elena, Iris on the first row; Albert, Stephen, Eric, Stan on the second. */}
              <ul
                className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:mt-16 lg:grid-cols-4"
                aria-label="Team"
              >
                <li
                  className="group relative isolate flex flex-col items-center overflow-hidden rounded-2xl bg-card px-4 pt-7 pb-4 text-center shadow-sm transition duration-300 ease-out-soft hover:shadow-xl focus-within:shadow-xl motion-reduce:transition-none sm:px-6 sm:pt-8"
                >
                  <div
                    className="absolute inset-x-0 bottom-0 -z-10 h-3/5 rounded-t-full translate-y-1/4 bg-linear-to-b from-primary-tint to-primary-line theme-dark:from-card opacity-0 transition duration-500 ease-out-soft group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-opacity"
                    aria-hidden="true"
                  ></div>
                  <div
                    className="relative aspect-square w-24 max-w-full sm:w-32 lg:w-36"
                  >
                    <div
                      className="size-full overflow-hidden rounded-full bg-surface-1 ring-3 ring-card transition-shadow duration-500 ease-out-soft group-focus-within:ring-ink group-hover:ring-ink"
                    >
                      <div className="team-base size-full">
                        <Image
                          src={asset("team/tracy-bui.png")}
                          alt=""
                          width={384}
                          height={384}
                          loading="lazy"
                          className="size-full object-cover origin-bottom transition-transform duration-500 ease-out-soft group-focus-within:scale-120 group-hover:scale-120 motion-reduce:transition-none motion-reduce:group-focus-within:scale-100 motion-reduce:group-hover:scale-100" />
                      </div>
                    </div>
                    <div
                      className="team-pop pointer-events-none absolute inset-0"
                      aria-hidden="true"
                    >
                      <Image
                        src={asset("team/tracy-bui.png")}
                        alt=""
                        width={384}
                        height={384}
                        loading="lazy"
                        className="size-full object-cover origin-bottom transition-transform duration-500 ease-out-soft group-focus-within:scale-120 group-hover:scale-120 motion-reduce:transition-none motion-reduce:group-focus-within:scale-100 motion-reduce:group-hover:scale-100" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-h3 text-balance">{t('3')}</h3>
                  <p className="mt-1 mb-1 text-sm text-pretty text-muted">
                    {t('4')}
                  </p>
                  <a
                    href="https://www.linkedin.com/in/van-bui-work"
                    target="_blank"
                    rel="noopener"
                    className="hit-area mt-auto inline-flex size-9 items-center justify-center rounded-full text-muted opacity-0 transition duration-200 ease-out-soft group-focus-within:opacity-100 group-hover:opacity-100 hover:text-primary focus-visible:outline-ink pointer-coarse:opacity-100"
                    aria-label="Tracy Bui on LinkedIn (opens in a new tab)"
                    ><svg className="size-5" aria-hidden="true">
                      <use href="#i-linkedin" /></svg
                  ></a>
                </li>
                <li
                  className="group relative isolate flex flex-col items-center overflow-hidden rounded-2xl bg-card px-4 pt-7 pb-4 text-center shadow-sm transition duration-300 ease-out-soft hover:shadow-xl focus-within:shadow-xl motion-reduce:transition-none sm:px-6 sm:pt-8"
                >
                  <div
                    className="absolute inset-x-0 bottom-0 -z-10 h-3/5 rounded-t-full translate-y-1/4 bg-linear-to-b from-primary-tint to-primary-line theme-dark:from-card opacity-0 transition duration-500 ease-out-soft group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-opacity"
                    aria-hidden="true"
                  ></div>
                  <div
                    className="relative aspect-square w-24 max-w-full sm:w-32 lg:w-36"
                  >
                    <div
                      className="size-full overflow-hidden rounded-full bg-surface-1 ring-3 ring-card transition-shadow duration-500 ease-out-soft group-focus-within:ring-ink group-hover:ring-ink"
                    >
                      <div className="team-base size-full">
                        <Image
                          src={asset("team/rosie-tran.png")}
                          alt=""
                          width={384}
                          height={384}
                          loading="lazy"
                          className="size-full object-cover origin-bottom transition-transform duration-500 ease-out-soft group-focus-within:scale-120 group-hover:scale-120 motion-reduce:transition-none motion-reduce:group-focus-within:scale-100 motion-reduce:group-hover:scale-100" />
                      </div>
                    </div>
                    <div
                      className="team-pop pointer-events-none absolute inset-0"
                      aria-hidden="true"
                    >
                      <Image
                        src={asset("team/rosie-tran.png")}
                        alt=""
                        width={384}
                        height={384}
                        loading="lazy"
                        className="size-full object-cover origin-bottom transition-transform duration-500 ease-out-soft group-focus-within:scale-120 group-hover:scale-120 motion-reduce:transition-none motion-reduce:group-focus-within:scale-100 motion-reduce:group-hover:scale-100" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-h3 text-balance">{t('5')}</h3>
                  <p className="mt-1 mb-1 text-sm text-pretty text-muted">
                    {t('6')}
                  </p>
                  <a
                    href="https://www.linkedin.com/in/ynhii2309"
                    target="_blank"
                    rel="noopener"
                    className="hit-area mt-auto inline-flex size-9 items-center justify-center rounded-full text-muted opacity-0 transition duration-200 ease-out-soft group-focus-within:opacity-100 group-hover:opacity-100 hover:text-primary focus-visible:outline-ink pointer-coarse:opacity-100"
                    aria-label="Rosie Tran on LinkedIn (opens in a new tab)"
                    ><svg className="size-5" aria-hidden="true">
                      <use href="#i-linkedin" /></svg
                  ></a>
                </li>
                <li
                  className="group relative isolate flex flex-col items-center overflow-hidden rounded-2xl bg-card px-4 pt-7 pb-4 text-center shadow-sm transition duration-300 ease-out-soft hover:shadow-xl focus-within:shadow-xl motion-reduce:transition-none sm:px-6 sm:pt-8"
                >
                  <div
                    className="absolute inset-x-0 bottom-0 -z-10 h-3/5 rounded-t-full translate-y-1/4 bg-linear-to-b from-primary-tint to-primary-line theme-dark:from-card opacity-0 transition duration-500 ease-out-soft group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-opacity"
                    aria-hidden="true"
                  ></div>
                  <div
                    className="relative aspect-square w-24 max-w-full sm:w-32 lg:w-36"
                  >
                    <div
                      className="size-full overflow-hidden rounded-full bg-surface-1 ring-3 ring-card transition-shadow duration-500 ease-out-soft group-focus-within:ring-ink group-hover:ring-ink"
                    >
                      <div className="team-base size-full">
                        <Image
                          src={asset("team/elena-nguyen.png")}
                          alt=""
                          width={384}
                          height={384}
                          loading="lazy"
                          className="size-full object-cover origin-bottom transition-transform duration-500 ease-out-soft group-focus-within:scale-120 group-hover:scale-120 motion-reduce:transition-none motion-reduce:group-focus-within:scale-100 motion-reduce:group-hover:scale-100" />
                      </div>
                    </div>
                    <div
                      className="team-pop pointer-events-none absolute inset-0"
                      aria-hidden="true"
                    >
                      <Image
                        src={asset("team/elena-nguyen.png")}
                        alt=""
                        width={384}
                        height={384}
                        loading="lazy"
                        className="size-full object-cover origin-bottom transition-transform duration-500 ease-out-soft group-focus-within:scale-120 group-hover:scale-120 motion-reduce:transition-none motion-reduce:group-focus-within:scale-100 motion-reduce:group-hover:scale-100" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-h3 text-balance">{t('7')}</h3>
                  <p className="mt-1 mb-1 text-sm text-pretty text-muted">
                    {t('8')}
                  </p>
                  <a
                    href="https://www.linkedin.com/in/b%E1%BA%A3o-nguy%C3%AAn-nguy%E1%BB%85n"
                    target="_blank"
                    rel="noopener"
                    className="hit-area mt-auto inline-flex size-9 items-center justify-center rounded-full text-muted opacity-0 transition duration-200 ease-out-soft group-focus-within:opacity-100 group-hover:opacity-100 hover:text-primary focus-visible:outline-ink pointer-coarse:opacity-100"
                    aria-label="Elena Nguyen on LinkedIn (opens in a new tab)"
                    ><svg className="size-5" aria-hidden="true">
                      <use href="#i-linkedin" /></svg
                  ></a>
                </li>
                <li
                  className="group relative isolate flex flex-col items-center overflow-hidden rounded-2xl bg-card px-4 pt-7 pb-4 text-center shadow-sm transition duration-300 ease-out-soft hover:shadow-xl focus-within:shadow-xl motion-reduce:transition-none sm:px-6 sm:pt-8"
                >
                  <div
                    className="absolute inset-x-0 bottom-0 -z-10 h-3/5 rounded-t-full translate-y-1/4 bg-linear-to-b from-primary-tint to-primary-line theme-dark:from-card opacity-0 transition duration-500 ease-out-soft group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-opacity"
                    aria-hidden="true"
                  ></div>
                  <div
                    className="relative aspect-square w-24 max-w-full sm:w-32 lg:w-36"
                  >
                    <div
                      className="size-full overflow-hidden rounded-full bg-surface-1 ring-3 ring-card transition-shadow duration-500 ease-out-soft group-focus-within:ring-ink group-hover:ring-ink"
                    >
                      <div className="team-base size-full">
                        <Image
                          src={asset("team/iris-le.png")}
                          alt=""
                          width={384}
                          height={384}
                          loading="lazy"
                          className="size-full object-cover origin-bottom transition-transform duration-500 ease-out-soft group-focus-within:scale-120 group-hover:scale-120 motion-reduce:transition-none motion-reduce:group-focus-within:scale-100 motion-reduce:group-hover:scale-100" />
                      </div>
                    </div>
                    <div
                      className="team-pop pointer-events-none absolute inset-0"
                      aria-hidden="true"
                    >
                      <Image
                        src={asset("team/iris-le.png")}
                        alt=""
                        width={384}
                        height={384}
                        loading="lazy"
                        className="size-full object-cover origin-bottom transition-transform duration-500 ease-out-soft group-focus-within:scale-120 group-hover:scale-120 motion-reduce:transition-none motion-reduce:group-focus-within:scale-100 motion-reduce:group-hover:scale-100" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-h3 text-balance">{t('9')}</h3>
                  <p className="mt-1 mb-1 text-sm text-pretty text-muted">
                    {t('10')}
                  </p>
                  <a
                    href="https://www.linkedin.com/in/ngocle123/"
                    target="_blank"
                    rel="noopener"
                    className="hit-area mt-auto inline-flex size-9 items-center justify-center rounded-full text-muted opacity-0 transition duration-200 ease-out-soft group-focus-within:opacity-100 group-hover:opacity-100 hover:text-primary focus-visible:outline-ink pointer-coarse:opacity-100"
                    aria-label="Iris Le on LinkedIn (opens in a new tab)"
                    ><svg className="size-5" aria-hidden="true">
                      <use href="#i-linkedin" /></svg
                  ></a>
                </li>
                <li
                  className="group relative isolate flex flex-col items-center overflow-hidden rounded-2xl bg-card px-4 pt-7 pb-4 text-center shadow-sm transition duration-300 ease-out-soft hover:shadow-xl focus-within:shadow-xl motion-reduce:transition-none sm:px-6 sm:pt-8"
                >
                  <div
                    className="absolute inset-x-0 bottom-0 -z-10 h-3/5 rounded-t-full translate-y-1/4 bg-linear-to-b from-primary-tint to-primary-line theme-dark:from-card opacity-0 transition duration-500 ease-out-soft group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-opacity"
                    aria-hidden="true"
                  ></div>
                  <div
                    className="relative aspect-square w-24 max-w-full sm:w-32 lg:w-36"
                  >
                    <div
                      className="size-full overflow-hidden rounded-full bg-surface-1 ring-3 ring-card transition-shadow duration-500 ease-out-soft group-focus-within:ring-ink group-hover:ring-ink"
                    >
                      <div className="team-base size-full">
                        <Image
                          src={asset("team/albert-bui.png")}
                          alt=""
                          width={384}
                          height={384}
                          loading="lazy"
                          className="size-full object-cover origin-bottom transition-transform duration-500 ease-out-soft group-focus-within:scale-120 group-hover:scale-120 motion-reduce:transition-none motion-reduce:group-focus-within:scale-100 motion-reduce:group-hover:scale-100" />
                      </div>
                    </div>
                    <div
                      className="team-pop pointer-events-none absolute inset-0"
                      aria-hidden="true"
                    >
                      <Image
                        src={asset("team/albert-bui.png")}
                        alt=""
                        width={384}
                        height={384}
                        loading="lazy"
                        className="size-full object-cover origin-bottom transition-transform duration-500 ease-out-soft group-focus-within:scale-120 group-hover:scale-120 motion-reduce:transition-none motion-reduce:group-focus-within:scale-100 motion-reduce:group-hover:scale-100" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-h3 text-balance">{t('11')}</h3>
                  <p className="mt-1 mb-1 text-sm text-pretty text-muted">
                    {t('12')}
                  </p>
                  <a
                    href="https://www.linkedin.com/in/quy-bui-quang"
                    target="_blank"
                    rel="noopener"
                    className="hit-area mt-auto inline-flex size-9 items-center justify-center rounded-full text-muted opacity-0 transition duration-200 ease-out-soft group-focus-within:opacity-100 group-hover:opacity-100 hover:text-primary focus-visible:outline-ink pointer-coarse:opacity-100"
                    aria-label="Albert Bui on LinkedIn (opens in a new tab)"
                    ><svg className="size-5" aria-hidden="true">
                      <use href="#i-linkedin" /></svg
                  ></a>
                </li>
                <li
                  className="group relative isolate flex flex-col items-center overflow-hidden rounded-2xl bg-card px-4 pt-7 pb-4 text-center shadow-sm transition duration-300 ease-out-soft hover:shadow-xl focus-within:shadow-xl motion-reduce:transition-none sm:px-6 sm:pt-8"
                >
                  <div
                    className="absolute inset-x-0 bottom-0 -z-10 h-3/5 rounded-t-full translate-y-1/4 bg-linear-to-b from-primary-tint to-primary-line theme-dark:from-card opacity-0 transition duration-500 ease-out-soft group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-opacity"
                    aria-hidden="true"
                  ></div>
                  <div
                    className="relative aspect-square w-24 max-w-full sm:w-32 lg:w-36"
                  >
                    <div
                      className="size-full overflow-hidden rounded-full bg-surface-1 ring-3 ring-card transition-shadow duration-500 ease-out-soft group-focus-within:ring-ink group-hover:ring-ink"
                    >
                      <div className="team-base size-full">
                        <Image
                          src={asset("team/stephen-le.png")}
                          alt=""
                          width={384}
                          height={384}
                          loading="lazy"
                          className="size-full object-cover origin-bottom transition-transform duration-500 ease-out-soft group-focus-within:scale-120 group-hover:scale-120 motion-reduce:transition-none motion-reduce:group-focus-within:scale-100 motion-reduce:group-hover:scale-100" />
                      </div>
                    </div>
                    <div
                      className="team-pop pointer-events-none absolute inset-0"
                      aria-hidden="true"
                    >
                      <Image
                        src={asset("team/stephen-le.png")}
                        alt=""
                        width={384}
                        height={384}
                        loading="lazy"
                        className="size-full object-cover origin-bottom transition-transform duration-500 ease-out-soft group-focus-within:scale-120 group-hover:scale-120 motion-reduce:transition-none motion-reduce:group-focus-within:scale-100 motion-reduce:group-hover:scale-100" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-h3 text-balance">{t('13')}</h3>
                  <p className="mt-1 mb-1 text-sm text-pretty text-muted">
                    {t('14')}
                  </p>
                  <a
                    href="https://www.linkedin.com/in/truongthole"
                    target="_blank"
                    rel="noopener"
                    className="hit-area mt-auto inline-flex size-9 items-center justify-center rounded-full text-muted opacity-0 transition duration-200 ease-out-soft group-focus-within:opacity-100 group-hover:opacity-100 hover:text-primary focus-visible:outline-ink pointer-coarse:opacity-100"
                    aria-label="Stephen Le on LinkedIn (opens in a new tab)"
                    ><svg className="size-5" aria-hidden="true">
                      <use href="#i-linkedin" /></svg
                  ></a>
                </li>
                <li
                  className="group relative isolate flex flex-col items-center overflow-hidden rounded-2xl bg-card px-4 pt-7 pb-4 text-center shadow-sm transition duration-300 ease-out-soft hover:shadow-xl focus-within:shadow-xl motion-reduce:transition-none sm:px-6 sm:pt-8"
                >
                  <div
                    className="absolute inset-x-0 bottom-0 -z-10 h-3/5 rounded-t-full translate-y-1/4 bg-linear-to-b from-primary-tint to-primary-line theme-dark:from-card opacity-0 transition duration-500 ease-out-soft group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-opacity"
                    aria-hidden="true"
                  ></div>
                  <div
                    className="relative aspect-square w-24 max-w-full sm:w-32 lg:w-36"
                  >
                    <div
                      className="size-full overflow-hidden rounded-full bg-surface-1 ring-3 ring-card transition-shadow duration-500 ease-out-soft group-focus-within:ring-ink group-hover:ring-ink"
                    >
                      <div className="team-base size-full">
                        <Image
                          src={asset("team/eric-pham.png")}
                          alt=""
                          width={384}
                          height={384}
                          loading="lazy"
                          className="size-full object-cover origin-bottom transition-transform duration-500 ease-out-soft group-focus-within:scale-120 group-hover:scale-120 motion-reduce:transition-none motion-reduce:group-focus-within:scale-100 motion-reduce:group-hover:scale-100" />
                      </div>
                    </div>
                    <div
                      className="team-pop pointer-events-none absolute inset-0"
                      aria-hidden="true"
                    >
                      <Image
                        src={asset("team/eric-pham.png")}
                        alt=""
                        width={384}
                        height={384}
                        loading="lazy"
                        className="size-full object-cover origin-bottom transition-transform duration-500 ease-out-soft group-focus-within:scale-120 group-hover:scale-120 motion-reduce:transition-none motion-reduce:group-focus-within:scale-100 motion-reduce:group-hover:scale-100" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-h3 text-balance">{t('15')}</h3>
                  <p className="mt-1 mb-1 text-sm text-pretty text-muted">
                    {t('16')}
                  </p>
                  <a
                    href="https://www.linkedin.com/in/phamtradev/"
                    target="_blank"
                    rel="noopener"
                    className="hit-area mt-auto inline-flex size-9 items-center justify-center rounded-full text-muted opacity-0 transition duration-200 ease-out-soft group-focus-within:opacity-100 group-hover:opacity-100 hover:text-primary focus-visible:outline-ink pointer-coarse:opacity-100"
                    aria-label="Eric Pham on LinkedIn (opens in a new tab)"
                    ><svg className="size-5" aria-hidden="true">
                      <use href="#i-linkedin" /></svg
                  ></a>
                </li>
                <li
                  className="group relative isolate flex flex-col items-center overflow-hidden rounded-2xl bg-card px-4 pt-7 pb-4 text-center shadow-sm transition duration-300 ease-out-soft hover:shadow-xl focus-within:shadow-xl motion-reduce:transition-none sm:px-6 sm:pt-8"
                >
                  <div
                    className="absolute inset-x-0 bottom-0 -z-10 h-3/5 rounded-t-full translate-y-1/4 bg-linear-to-b from-primary-tint to-primary-line theme-dark:from-card opacity-0 transition duration-500 ease-out-soft group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-opacity"
                    aria-hidden="true"
                  ></div>
                  <div
                    className="relative aspect-square w-24 max-w-full sm:w-32 lg:w-36"
                  >
                    <div
                      className="size-full overflow-hidden rounded-full bg-surface-1 ring-3 ring-card transition-shadow duration-500 ease-out-soft group-focus-within:ring-ink group-hover:ring-ink"
                    >
                      <div className="team-base size-full">
                        <Image
                          src={asset("team/stan-nguyen.png")}
                          alt=""
                          width={384}
                          height={384}
                          loading="lazy"
                          className="size-full object-cover origin-bottom transition-transform duration-500 ease-out-soft group-focus-within:scale-120 group-hover:scale-120 motion-reduce:transition-none motion-reduce:group-focus-within:scale-100 motion-reduce:group-hover:scale-100" />
                      </div>
                    </div>
                    <div
                      className="team-pop pointer-events-none absolute inset-0"
                      aria-hidden="true"
                    >
                      <Image
                        src={asset("team/stan-nguyen.png")}
                        alt=""
                        width={384}
                        height={384}
                        loading="lazy"
                        className="size-full object-cover origin-bottom transition-transform duration-500 ease-out-soft group-focus-within:scale-120 group-hover:scale-120 motion-reduce:transition-none motion-reduce:group-focus-within:scale-100 motion-reduce:group-hover:scale-100" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-h3 text-balance">{t('17')}</h3>
                  <p className="mt-1 mb-1 text-sm text-pretty text-muted">
                    {t('18')}
                  </p>
                  <a
                    href="https://www.linkedin.com/in/ptannguyen"
                    target="_blank"
                    rel="noopener"
                    className="hit-area mt-auto inline-flex size-9 items-center justify-center rounded-full text-muted opacity-0 transition duration-200 ease-out-soft group-focus-within:opacity-100 group-hover:opacity-100 hover:text-primary focus-visible:outline-ink pointer-coarse:opacity-100"
                    aria-label="Stan Nguyen on LinkedIn (opens in a new tab)"
                    ><svg className="size-5" aria-hidden="true">
                      <use href="#i-linkedin" /></svg
                  ></a>
                </li>
              </ul>
              <dl
                className="mt-16 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 lg:grid-cols-4"
              >
                <div>
                  <dt className="text-sm text-muted">{t('19')}</dt>
                  <dd className="mt-1 text-data text-ink">{t('20')}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">{t('21')}</dt>
                  <dd className="mt-1 text-data text-ink">{t('22')}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">{t('23')}</dt>
                  <dd className="mt-1 text-data text-ink">{t('24')}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">{t('25')}</dt>
                  <dd className="mt-1 text-data text-pretty text-ink">
                    {t('26')}
                  </dd>
                </div>
              </dl>
            </div>
          </section>
  );
}

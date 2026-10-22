import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { img } from "@/lib/cdn";
import { designedText } from "../t";
import { contactEmail } from "@/lib/contact-emails";

/**
 * Converted from `contact.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * Two departures from the source. The band was a single column with the right two thirds empty,
 * which at desktop width read as a mistake rather than as space: it now carries the audit it is
 * offering to walk you through, so the claim and the thing being claimed are in the same frame.
 * And the address behind "Book a demo" came from the environment rather than being written here.
 *
 * The image is decorative in the strict sense, because the heading and the paragraph beside it
 * already say what it shows, so its `alt` is empty rather than a description a screen reader
 * would hear twice.
 */
export function Section3Section() {
  const t = designedText("contact.section3");
  return (
    <section className="border-b border-line">
            <div className="frame py-20 lg:py-24">
              <div
                className="reveal bg-soft-gradient grid items-center gap-10 overflow-hidden rounded-3xl border border-line px-8 py-14 lg:grid-cols-12 lg:gap-8 lg:px-16 lg:py-20"
              >
                <div className="lg:col-span-5">
                  <h2 className="text-title text-balance">
                    {t('1')}
                  </h2>
                  <p className="mt-5 text-lg text-pretty text-muted">
                    {t('2')}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href={`mailto:${contactEmail("sales")}`} className="btn-primary group">
                      {t('3')}
                      <ArrowRight
                        className="size-4 transition-transform duration-150 ease-out-soft group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>

                {/*
                  `-mb-14 lg:-mb-20` cancels the band's own bottom padding so the laptop sits on
                  the edge rather than floating in it, which is how the reference composes it.
                  Hidden below `lg`: at phone width it would be a 1600px wide illustration scaled
                  until its labels are unreadable, which costs the bandwidth and buys nothing.
                */}
                <div className="-mb-14 hidden lg:col-span-7 lg:-mb-20 lg:block">
                  <Image
                    src={img("contact/product-audit-dashboard-decision-coverage.webp")}
                    alt=""
                    width={1600}
                    height={683}
                    sizes="(min-width: 1024px) 58vw, 0px"
                    className="h-auto w-full select-none"
                  />
                </div>
              </div>
            </div>
          </section>
  );
}

/**
 * Converted from `index.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * 2026-10-26, the owner's Direction C section 3 ("Pulse site directions" mockup): the two shoppers
 * are two chapters rather than two equal cards. Each is an image beside its text, the second one
 * mirrored, so the section reads in order instead of as a pair to compare. The category moves
 * onto the image as a badge, which also takes the eyebrow label off the heading (owner's rule,
 * 19 Oct 2026). Copy, figures and images are unchanged.
 */
import Image from "next/image";
import type { ReactNode } from "react";
import { img } from "@/lib/cdn";
import { designedText } from "../t";

export function Section3Section() {
  const t = designedText("home.section3");
  return (
    <section className="border-b border-line">
      <div className="frame py-20 lg:py-28">
        <h2 className="reveal mx-auto max-w-2xl text-center text-title text-balance text-ink">
          {t("1")}
        </h2>
        <div className="mt-12 grid gap-16 lg:mt-20 lg:gap-24">
          <Chapter
            src="home/baby-laundry-powder-fragrance-free-evidence-gap.webp"
            category={t("2")}
            title={[t("3"), t("4")]}
          >
            <div>
              <dt className="text-sm font-semibold text-muted">{t("5")}</dt>
              <dd className="mt-1.5 text-pretty text-ink">
                {t("packagingLead")}{" "}
                <strong className="font-semibold whitespace-nowrap text-gap-strong">
                  {t("6")}
                </strong>{" "}
                {t("7")}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">{t("8")}</dt>
              <dd className="mt-1.5 text-pretty text-ink">
                {t("fragranceLead")}{" "}
                <strong className="font-semibold tabular-nums">40</strong>{" "}
                {t("fragranceTail")}
              </dd>
            </div>
          </Chapter>
          <Chapter
            src="home/office-laptop-screen-size-evidence-gap.webp"
            category={t("9")}
            title={[t("10"), t("11")]}
            mirrored
          >
            <div>
              <dt className="text-sm font-semibold text-muted">{t("12")}</dt>
              <dd className="mt-1.5 text-pretty text-ink">
                {t("screenLead")}{" "}
                <strong className="font-semibold tabular-nums">
                  {t("13")}
                </strong>{" "}
                {t("screenMid")}{" "}
                <strong className="font-semibold whitespace-nowrap text-gap-strong">
                  {t("14")}
                </strong>{" "}
                {t("15")}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">{t("16")}</dt>
              <dd className="mt-1.5 text-pretty text-ink">
                {t("noAttributesLead")}{" "}
                <strong className="font-semibold tabular-nums">
                  {t("17")}
                </strong>{" "}
                {t("18")}
              </dd>
            </div>
          </Chapter>
        </div>
      </div>
    </section>
  );
}

function Chapter({
  src,
  category,
  title,
  mirrored = false,
  children,
}: {
  src: string;
  category: string;
  title: [string, string];
  mirrored?: boolean;
  children: ReactNode;
}) {
  return (
    <article className="reveal grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      {/*
        The product the shopper is actually holding, in the scene that shows both halves of the
        problem: the evidence on the pack, and the attribute the catalogue never recorded.

        The scene carries its own light background and has no alpha, so the box keeps a light fill
        pinned in both themes; without it the image would read as a white rectangle on a dark
        surface once the theme flips.

        `width` and `height` are the file's own, which keeps the box reserved before it loads: the
        SEO gate in check-seo.mjs refuses an image without them. The image comes first in the
        markup, so on a phone every chapter opens with its picture; only the desktop row mirrors.
        */}
      <div
        className={`relative overflow-hidden rounded-2xl border border-line bg-[#fdfdfd] shadow-sm ${mirrored ? "lg:order-last" : ""}`}
      >
        <Image
          src={img(src)}
          alt={`${title[0]} ${title[1]}`}
          width={1200}
          height={800}
          sizes="(min-width: 1024px) 34rem, 90vw"
          className="h-auto w-full"
        />
        <span className="badge absolute top-4 left-4 border-line bg-card text-muted">
          {category}
        </span>
      </div>
      <div>
        <h3 className="text-h2 text-balance text-ink">
          <span className="xl:block">{title[0]}</span>{" "}
          <span className="xl:block">{title[1]}</span>
        </h3>
        <dl className="mt-6 space-y-5 border-t border-line pt-6">{children}</dl>
      </div>
    </article>
  );
}

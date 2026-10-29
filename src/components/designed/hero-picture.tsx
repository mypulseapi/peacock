/**
 * A hero picture that is its page's Largest Contentful Paint (29 Oct 2026).
 *
 * Every hero picture has a phone-size copy on the CDN beside it, `<name>-sm.webp`, 828px wide and
 * 20-64 KB where the originals are 56-261 KB. The browser picks one by width (`srcSet` + `sizes`), and
 * the one it picks is preloaded at high priority. `next/image`'s own `priority` cannot do this here:
 * with `unoptimized` it writes no `srcSet`, and its preload always names the original, so a phone
 * would fetch both. A preload or an image without `fetchPriority="high"` is fetched behind the fonts.
 *
 * `lazy` is for a second picture that only one theme shows (About's dark drawing): no preload, so
 * the default theme does not fetch it.
 */
import { preload } from "react-dom";
import { img } from "@/lib/cdn";

export const PHONE_WIDTH = 828;

export function HeroPicture({
  src,
  width,
  height,
  alt,
  sizes,
  className,
  lazy = false,
}: {
  /** The original, as `img()` takes it; its phone copy is the same path ending `-sm.webp`. */
  src: string;
  width: number;
  height: number;
  alt: string;
  sizes: string;
  className?: string;
  lazy?: boolean;
}) {
  const srcSet = `${img(src.replace(/\.webp$/, "-sm.webp"))} ${PHONE_WIDTH}w, ${img(src)} ${width}w`;
  if (!lazy)
    preload(img(src), {
      as: "image",
      imageSrcSet: srcSet,
      imageSizes: sizes,
      fetchPriority: "high",
    });
  return (
    // eslint-disable-next-line @next/next/no-img-element -- next/image writes no srcSet when unoptimized (see above)
    <img
      src={img(src)}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      className={className}
      decoding="async"
      loading={lazy ? "lazy" : "eager"}
      fetchPriority={lazy ? undefined : "high"}
    />
  );
}

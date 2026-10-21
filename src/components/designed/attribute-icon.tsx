import { img } from "@/lib/cdn";

/**
 * The mark beside an attribute name, drawn in the text's own colour.
 *
 * A mask rather than an `<img>`. The source files are black line art on a transparent ground, so
 * as images they would stay black whatever the theme and all but vanish against the dark one.
 * Masked and filled with `currentColor`, each mark is exactly as dark as the word next to it, in
 * either theme, from one file.
 *
 * `-webkit-` is still required: Safari did not unprefix `mask-image` until 15.4, and this site
 * supports further back than that. The pair costs four lines and nothing at runtime.
 *
 * Decorative by design: the attribute name is right beside it, so announcing the mark as well
 * would have a screen reader read every row twice.
 */
export function AttributeIcon({ src, className = "size-4" }: { src: string; className?: string }) {
  const url = `url(${img(src)})`;
  return (
    <span
      aria-hidden="true"
      className={`shrink-0 ${className}`}
      style={{
        backgroundColor: "currentColor",
        maskImage: url,
        WebkitMaskImage: url,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

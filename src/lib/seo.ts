// Locale-aware canonical + hreflang alternates.
// Canonical self-references the current locale URL; languages advertise both
// locales (+ x-default) so search/answer engines treat /en and /vi as
// translations, not duplicate content. Resolved against metadataBase.
export function buildAlternates(locale: string, path = "") {
  const clean = path === "/" ? "" : path;
  return {
    canonical: `/${locale}${clean}`,
    languages: {
      en: `/en${clean}`,
      vi: `/vi${clean}`,
      "x-default": `/en${clean}`,
    },
  };
}

/**
 * Fit a description into the 140 to 160 characters the standard requires.
 *
 * Used where the source text is generated rather than written for the SERP: a job description runs
 * to three hundred characters, and pasting it into a meta description produces something Google
 * truncates mid-word. `lead` is the part that must survive (the facts that identify the page);
 * `body` is trimmed at a word boundary to fill whatever room is left.
 *
 * It does not pad. If the result comes out short, the fix is more source text rather than filler,
 * and `check-seo.mjs` will say so.
 */
export function fitDescription(lead: string, body: string, max = 158): string {
  const prefix = lead.trim().replace(/\s+/g, " ");
  const rest = body.trim().replace(/\s+/g, " ");
  if (prefix.length >= max) return prefix.slice(0, max);

  const room = max - prefix.length - 1; // the joining space
  if (rest.length <= room) return `${prefix} ${rest}`;

  // Trim at the last word boundary that leaves space for the ellipsis.
  const cut = rest.slice(0, room - 1);
  const atWord = cut.slice(0, cut.lastIndexOf(" "));
  return `${prefix} ${atWord}…`;
}

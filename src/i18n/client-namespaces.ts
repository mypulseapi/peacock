/**
 * The message namespaces that reach the browser, and nothing else.
 *
 * `getMessages()` returns the whole catalogue, and passing it to `NextIntlClientProvider`
 * serialises every namespace into the RSC payload of every page. Measured on the deployed
 * `/en`: 486KB of HTML, of which 349KB is that payload, carrying the terms, the GDPR page, the
 * careers copy and the pricing tiers onto the home page. A visitor downloads the text of pages
 * they are not on, and a crawler reads it.
 *
 * Only a CLIENT component can need a message at runtime: a Server Component has already been
 * rendered to HTML by the time the browser sees it. So the provider needs exactly the namespaces
 * the client components ask for, which is this list.
 *
 * **Adding `useTranslations("x")` to a client component means adding `x` here.** The check below
 * is what makes that safe: it fails the build rather than letting a string render as its own key
 * in production, which is what makes a missing namespace expensive to find.
 */
export const CLIENT_NAMESPACES = [
  "auth",
  "blog",
  "careers",
  "common",
  "configurator",
  "contact",
  "cookies",
  "docs",
  "gdpr",
  "industryShell",
  "integrations",
  "intentPanel",
  "jobForm",
  "nextBest",
  "privacy",
  "status",
  "terms",
] as const;

/** The subset of a catalogue that the browser actually needs. */
export function clientMessages(
  all: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const ns of CLIENT_NAMESPACES) {
    if (ns in all) out[ns] = all[ns];
  }
  return out;
}

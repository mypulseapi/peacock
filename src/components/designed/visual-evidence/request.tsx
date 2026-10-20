/**
 * The `shell:cta` band from `visual-evidence.html` at afedfc1.
 *
 * Hand-written rather than generated: the converter walks `<main>`, and this section sits between
 * `</main>` and the footer, so all six pages carrying the `shell:cta` markers lost it. The other
 * five already had a `request.tsx`; this page did not, which is why it was the one page whose
 * `[data-cta]` and two `.reveal` hooks came up short against the designer's DOM.
 */
import Link from "next/link";

export function RequestSection() {
  return (
    <section id="request" className="cta-dots scroll-mt-16 border-t border-line" data-cta>
      <div className="frame py-24 text-center lg:py-32">
        <h2 className="reveal mx-auto max-w-3xl text-headline text-balance">
          Discover your shoppers&rsquo; intent with Pulse
        </h2>

        <div className="reveal mt-8 flex flex-wrap justify-center gap-3 delay-200">
          <Link href="/en/contact" className="btn-primary">
            Request a Decision Audit
          </Link>
          <Link href="/en#method" className="btn-secondary">
            Read the method first
          </Link>
        </div>
      </div>
    </section>
  );
}

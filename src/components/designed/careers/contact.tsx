/**
 * Converted from `index.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
export function ContactSection() {
  return (
    <section id="contact" className="cta-dots scroll-mt-20" data-cta>
            <div className="frame py-24 text-center lg:py-32">
              <h2 className="reveal mx-auto max-w-3xl text-headline text-balance">
                Tell us how you&apos;d contribute
              </h2>
              <p
                className="reveal mx-auto mt-6 max-w-xl text-lg text-pretty text-muted delay-100"
              >
                We&apos;re always interested in meeting exceptional people. Send us your
                resume and tell us how you&apos;d contribute to Pulse.
              </p>
              <div className="reveal mt-8 flex flex-col items-center delay-200">
                <a href="mailto:careers@thepulseapi.com" className="btn-secondary"
                  >Get in touch</a
                >
                <p className="mt-4 text-sm text-muted">
                  or write to
                  <a
                    href="mailto:careers@thepulseapi.com"
                    className="font-medium text-link underline-offset-2 hover:underline"
                    >careers@thepulseapi.com</a
                  >
                </p>
              </div>
            </div>
          </section>
  );
}

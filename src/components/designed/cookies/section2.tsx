/**
 * Converted from `cookies.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Text is still inline. Extracting it into the content modules for Vietnamese is the next pass.
 */
import Link from "next/link";

export function Section2Section() {
  return (
    <section className="border-b border-line">
            <div className="frame py-16 lg:py-20">
              <div className="mx-auto max-w-3xl space-y-10">
                <section
                  className="reveal border-t border-line pt-10 first:border-t-0 first:pt-0"
                >
                  <h2 className="text-h2 text-ink">Our Cookie-Free Approach</h2>
                  <p className="mt-4 text-body leading-relaxed text-muted">
                    At Pulse, privacy is at the core of everything we do. Unlike
                    traditional analytics and personalization platforms, we&rsquo;ve
                    built our technology to work without relying on cookies.
                  </p>
                  <p className="mt-4 text-body leading-relaxed text-muted">
                    We do not use cookies to track or store your data, as described
                    in our
                    <Link                   href="/en/privacy"
                      className="font-semibold text-primary underline decoration-primary-line underline-offset-4"
                      >Privacy Policy</Link>.
                  </p>
                </section>
                <section
                  className="reveal border-t border-line pt-10 first:border-t-0 first:pt-0"
                >
                  <h2 className="text-h2 text-ink">What We Don&rsquo;t Do</h2>
                  <ul className="mt-4 space-y-2.5 text-body text-muted">
                    <li className="flex gap-3">
                      <svg
                        className="mt-1 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>We don&rsquo;t use tracking cookies</span>
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="mt-1 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span
                        >We don&rsquo;t use third-party advertising cookies</span
                      >
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="mt-1 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span>We don&rsquo;t sell or share your personal data</span>
                    </li>
                    <li className="flex gap-3">
                      <svg
                        className="mt-1 size-4 shrink-0 text-success"
                        aria-hidden="true"
                      >
                        <use href="#i-check" /></svg
                      ><span
                        >We don&rsquo;t create persistent user profiles across
                        sites</span
                      >
                    </li>
                  </ul>
                </section>
                <section
                  className="reveal border-t border-line pt-10 first:border-t-0 first:pt-0"
                >
                  <h2 className="text-h2 text-ink">Local Storage Usage</h2>
                  <p className="mt-4 text-body leading-relaxed text-muted">
                    We use browser local storage only for essential functionality
                    like remembering your theme preference (light/dark mode). This
                    data never leaves your device and is not used for tracking
                    purposes.
                  </p>
                </section>
                <section
                  className="reveal border-t border-line pt-10 first:border-t-0 first:pt-0"
                >
                  <h2 className="text-h2 text-ink">Questions?</h2>
                  <p className="mt-4 text-body text-muted">
                    If you have any questions about our cookie policy, please
                    contact us.
                  </p>
                  <a
                    href="mailto:privacy@thepulseapi.com"
                    className="mt-4 inline-flex items-center gap-2 font-semibold text-primary underline decoration-primary-line underline-offset-4 hover:decoration-current"
                    >privacy@thepulseapi.com</a
                  >
                </section>
              </div>
            </div>
          </section>
  );
}

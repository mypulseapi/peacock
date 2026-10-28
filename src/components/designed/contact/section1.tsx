/**
 * Converted from `contact.html` at afedfc1 by scripts/html-to-jsx.mjs.
 *
 * The markup is the designer's. Change it here only for things the converter cannot do; anything
 * structural should go back to the source page so the two do not drift.
 *
 * Two departures from the source now, both deliberate. The eight-field form that submitted nowhere
 * is a two-field one that does (BUG-28), which also retired the three dropdowns. And the five role
 * addresses are read from the environment rather than written into the markup and the message
 * catalogue twice over.
 */
import { designedText } from "../t";
import { ContactForm } from "./contact-form";
import { BookCall } from "./book-call";
import { contactEmail, type ContactRole } from "@/lib/contact-emails";
import { HeroAurora } from "@/components/designed/hero-aurora";

export function Section1Section() {
  const t = designedText("contact.section1");

  /*
    Label and address, paired. The label is copy and stays translated; the address is deployment
    configuration and comes from the environment, so an unconfigured one drops its row instead of
    printing `mailto:undefined`.
  */
  const desks: { label: string; role: ContactRole }[] = [
    { label: t('19'), role: "sales" },
    { label: t('21'), role: "support" },
    { label: t('23'), role: "partners" },
    { label: t('25'), role: "press" },
    { label: t('27'), role: "general" },
  ];

  return (
    <section className="relative isolate hero-bg border-b border-line">
      <HeroAurora />
            <div
              className="frame grid gap-10 py-16 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-12 lg:py-24"
            >
              <div className="lg:col-span-6">
                <h1 className="reveal text-headline text-balance">
                  {t('1')}
                </h1>
                <p
                  className="reveal mt-6 text-lg leading-relaxed text-pretty text-muted delay-100"
                >
                  {t('2')}
                </p>
                <ul className="reveal mt-8 space-y-4 text-body text-ink delay-150">
                  <li className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    >
                      <use href="#i-circle-check" />
                    </svg>
                    {t('3')}
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    >
                      <use href="#i-circle-check" />
                    </svg>
                    {t('4')}
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    >
                      <use href="#i-circle-check" />
                    </svg>
                    {t('5')}
                  </li>
                </ul>
              </div>
              <ContactForm
                labels={{
                  heading: t('6'),
                  company: t('9'),
                  email: t('8'),
                  submit: t('16'),
                }}
              />
              <BookCall />
              <div className="reveal grid content-end gap-5 delay-300 lg:col-span-6">
                <div className="rounded-2xl border border-line bg-card p-6 shadow-sm">
                  <h2 className="text-h3 text-ink">{t('18')}</h2>
                  <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {desks.map(({ label, role }) => {
                      const address = contactEmail(role);
                      if (!address) return null;
                      return (
                        <li key={role}>
                          <p className="text-sm text-muted">{label}</p>
                          <a
                            href={`mailto:${address}`}
                            className="text-data font-semibold break-all text-primary underline decoration-primary-line underline-offset-4 hover:decoration-current"
                          >
                            {address}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </section>
  );
}

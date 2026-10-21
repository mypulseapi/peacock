import { CalendarClock, ArrowRight } from "lucide-react";
import { contactForm } from "@/content/contact-form";
import { renderLocale } from "@/i18n/render-locale";

/**
 * The other way in: book a call instead of writing a message.
 *
 * A link, not an embedded widget. Calendly's embed is ~90KB of third-party JavaScript that sets
 * its own cookies and watches the page, which on a static marketing site buys a scheduling grid
 * most visitors will not open. A link costs nothing until it is clicked, keeps the CSP as narrow
 * as it is, and lands on the same scheduler.
 *
 * The URL comes from `NEXT_PUBLIC_CALENDLY_URL`. With the variable unset the card does not render
 * at all, which is the right failure: a scheduling card that leads nowhere is worse than no card.
 */
const CALENDLY = (process.env.NEXT_PUBLIC_CALENDLY_URL || "").trim();

export function BookCall() {
  if (!CALENDLY) return null;
  const C = contactForm(renderLocale());

  return (
    <div className="reveal rounded-3xl border border-primary-line bg-primary-wash p-6 delay-300 lg:col-span-6 lg:p-8">
      <p className="grid size-10 place-items-center rounded-full bg-primary text-on-primary">
        <CalendarClock className="size-5" aria-hidden="true" />
      </p>
      <h2 className="mt-4 text-h3 text-ink">{C.callTitle}</h2>
      <p className="mt-2 text-body leading-relaxed text-pretty text-muted">{C.callBody}</p>
      <a
        href={CALENDLY}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary group mt-5"
      >
        {C.callCta}
        <ArrowRight
          className="size-4 transition-transform duration-150 ease-out-soft group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </a>
    </div>
  );
}

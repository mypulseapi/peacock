import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/cdn";
import { TEAM, roleOf } from "@/lib/team";
import { contactForm } from "@/content/contact-form";
import { renderLocale } from "@/i18n/render-locale";

/**
 * The other way in: book a call instead of writing a message.
 *
 * Links, not an embedded widget. Calendly's embed is ~90KB of third-party JavaScript that sets its
 * own cookies and watches the page, which on a static marketing site buys a scheduling grid most
 * visitors will not open. A link costs nothing until it is clicked, keeps the CSP as narrow as it
 * is, and lands on the same scheduler.
 *
 * The portrait is the icon. A calendar glyph beside "book a call" says nothing a visitor cannot
 * read from the words; a face answers the question they actually have, which is who they would be
 * talking to. Both are already published on the About page with these portraits, so nothing new
 * about either person is disclosed here.
 *
 * Everyone with a `calendly` link in their profile (`NEXT_PUBLIC_TEAM`, src/lib/team.ts) is listed,
 * with the same name, role and photo as the About page, because both read the one profile. With no
 * bookable profile the card does not render at all, which is the right failure because a booking
 * card that leads nowhere is worse than no card.
 */
export function BookCall() {
  const bookable = TEAM.filter((p) => p.calendly);
  if (bookable.length === 0) return null;

  const locale = renderLocale();
  const C = contactForm(locale);

  return (
    <div className="reveal self-start rounded-3xl border border-primary-line bg-primary-wash p-6 delay-300 lg:col-span-6 lg:p-8">
      <h2 className="text-h3 text-ink">{C.callTitle}</h2>
      <p className="mt-2 text-body leading-relaxed text-pretty text-muted">
        {C.callBody}
      </p>

      <ul className="mt-6 grid gap-3">
        {bookable.map((person) => (
          <li key={person.id}>
            <a
              href={person.calendly}
              // Scheduling happens on Calendly, so leaving the site mid-enquiry would lose the
              // form beside this card. `noopener` because `target="_blank"` otherwise hands the
              // opened page a reference back to this one.
              target="_blank"
              rel="noopener noreferrer"
              className="book-row group"
            >
              <Image
                className="size-11 shrink-0 rounded-full object-cover"
                src={asset(person.photo)}
                alt={person.name}
                width={88}
                height={88}
              />
              <span className="min-w-0 flex-1">
                <span className="block font-display font-semibold text-ink">
                  {person.name}
                </span>
                <span className="block text-sm text-muted">
                  {roleOf(person, locale)} · {C.callCta}
                </span>
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-primary transition-transform duration-150 ease-out-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

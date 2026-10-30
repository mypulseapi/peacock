import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { img } from "@/lib/cdn";
import { contactForm } from "@/content/contact-form";
import { renderLocale } from "@/i18n/render-locale";
import { designedText } from "../t";

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
 * The URLs come from the environment, the names are data, and the roles are read from the About
 * page's catalogue so the two pages cannot disagree about someone's title. A person whose URL is
 * unset drops out; with neither set the card does not render at all, which is the right failure
 * because a booking card that leads nowhere is worse than no card.
 */
const PEOPLE = [
  {
    name: "Elena Nguyen",
    /** The About page's key for this person's role, so one edit changes both pages. */
    roleKey: "8",
    photo: "assets/team/elena-nguyen.png",
    url: (process.env.NEXT_PUBLIC_CALENDLY_ELENA_URL || "").trim(),
  },
  {
    name: "Rosie Tran",
    roleKey: "6",
    photo: "assets/team/rosie-tran.png",
    url: (process.env.NEXT_PUBLIC_CALENDLY_ROSIE_URL || "").trim(),
  },
];

export function BookCall() {
  const bookable = PEOPLE.filter((p) => p.url);
  if (bookable.length === 0) return null;

  const C = contactForm(renderLocale());
  const role = designedText("about.section5");

  return (
    <div className="reveal self-start rounded-3xl border border-primary-line bg-primary-wash p-6 delay-300 lg:col-span-6 lg:p-8">
      <h2 className="text-h3 text-ink">{C.callTitle}</h2>
      <p className="mt-2 text-body leading-relaxed text-pretty text-muted">{C.callBody}</p>

      <ul className="mt-6 grid gap-3">
        {bookable.map((person) => (
          <li key={person.name}>
            <a
              href={person.url}
              // Scheduling happens on Calendly, so leaving the site mid-enquiry would lose the
              // form beside this card. `noopener` because `target="_blank"` otherwise hands the
              // opened page a reference back to this one.
              target="_blank"
              rel="noopener noreferrer"
              className="book-row group"
            >
              <Image
                className="size-11 shrink-0 rounded-full object-cover"
                src={img(person.photo)}
                alt={person.name}
                width={88}
                height={88}
              />
              <span className="min-w-0 flex-1">
                <span className="block font-display font-semibold text-ink">{person.name}</span>
                <span className="block text-sm text-muted">
                  {role(person.roleKey)} · {C.callCta}
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

/**
 * The addresses the contact page offers, from the environment.
 *
 * They were hardcoded twice over: once in each `mailto:` href and again as the visible text in the
 * message catalogue, so changing one meant finding both in two languages. A role address is
 * deployment configuration, not copy, and it does not belong in a translation file.
 *
 * `NEXT_PUBLIC_` because these render in the browser. They are published addresses on a public
 * contact page, so there is nothing here a visitor cannot already read.
 *
 * An unset address drops its row rather than rendering `mailto:undefined`, which is why the type
 * allows a miss: a contact page that lists a dead address is worse than one that lists fewer.
 */
export type ContactRole = "general" | "sales" | "support" | "partners" | "press" | "careers";

const EMAILS: Record<ContactRole, string> = {
  general: (process.env.NEXT_PUBLIC_CONTACT_EMAIL || "").trim(),
  sales: (process.env.NEXT_PUBLIC_SALES_EMAIL || "").trim(),
  support: (process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "").trim(),
  partners: (process.env.NEXT_PUBLIC_PARTNERS_EMAIL || "").trim(),
  press: (process.env.NEXT_PUBLIC_PRESS_EMAIL || "").trim(),
  careers: (process.env.NEXT_PUBLIC_CAREERS_EMAIL || "").trim(),
};

export const contactEmail = (role: ContactRole): string => EMAILS[role];

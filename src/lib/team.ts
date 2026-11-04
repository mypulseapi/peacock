/**
 * The team, as one list of profiles from `NEXT_PUBLIC_TEAM` (owner, 2026-11-04: names, roles,
 * photos and profile links live in the environment, never in code). The About page's cards and the
 * contact page's booking panel both render from it, so a new photo, title or link is one edit to
 * the variable, in `.env` locally and in the repository variables for the deploy.
 *
 * The value is a JSON array, on one line:
 *   [{"id":"rosie-tran","name":"Rosie Tran","role":{"en":"Founder Associate","vi":"Trợ lý sáng lập"},
 *     "photo":"team/rosie-tran.png","linkedin":"https://…","calendly":"https://…"}]
 * `photo` is a path under the CDN's `assets/` (`asset()` adds the content hash); `linkedin` and
 * `calendly` are optional, and a profile without one simply has no such link.
 *
 * No fallback in a build, as `COMPANY_NAME`: an About page with nobody on it, or with last month's
 * people, is worse than a failed build. A malformed value fails the build too, naming the field.
 */
export interface Profile {
  id: string;
  name: string;
  role: { en: string; vi?: string };
  photo: string;
  linkedin?: string;
  calendly?: string;
}

function parse(raw: string | undefined): Profile[] {
  const text = (raw ?? "").trim();
  if (!text) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "NEXT_PUBLIC_TEAM is not set. It is the team's profiles, as JSON.",
      );
    }
    return [];
  }
  let list: unknown;
  try {
    list = JSON.parse(text);
  } catch (e) {
    throw new Error(
      `NEXT_PUBLIC_TEAM is not valid JSON: ${(e as Error).message}`,
    );
  }
  if (!Array.isArray(list))
    throw new Error("NEXT_PUBLIC_TEAM must be a JSON array of profiles.");
  return list.map((p, i) => {
    const where = `NEXT_PUBLIC_TEAM[${i}]`;
    for (const k of ["id", "name", "photo"] as const) {
      if (typeof p?.[k] !== "string" || !p[k].trim())
        throw new Error(`${where}.${k} is missing.`);
    }
    if (typeof p.role?.en !== "string" || !p.role.en.trim()) {
      throw new Error(`${where}.role.en is missing.`);
    }
    const link = (v: unknown) =>
      typeof v === "string" && v.trim() ? v.trim() : undefined;
    return {
      id: p.id,
      name: p.name,
      role: { en: p.role.en, vi: link(p.role.vi) },
      photo: p.photo,
      linkedin: link(p.linkedin),
      calendly: link(p.calendly),
    };
  });
}

// Written out literally: the static export inlines a variable only where its full name appears.
export const TEAM: readonly Profile[] = parse(process.env.NEXT_PUBLIC_TEAM);

/** The role in the page's language, English where no translation is set. */
export const roleOf = (p: Profile, locale: string) =>
  (locale === "vi" && p.role.vi) || p.role.en;

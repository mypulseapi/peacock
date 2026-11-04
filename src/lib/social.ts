/**
 * Where the company and its people are, off this site. **Every URL comes from the environment**
 * (owner, 2026-11-04: no LinkedIn or other profile link is hard-coded in peacock; the team's
 * profiles are `team.ts`). An unset variable
 * drops its link from the page rather than falling back to a URL in code, so a profile changes in
 * `.env` (and the deploy's repository variables), never in a pull request.
 *
 * Each `process.env.NEXT_PUBLIC_*` is written out literally on purpose: the static export inlines a
 * variable only where its full name appears in the source, so a computed name would read undefined.
 *
 * `sameAs` in the structured data has to match the link in the page, because that is the whole
 * point of `sameAs`: it is the claim that these profiles are the same organisation as this site.
 * One source makes them agree by construction.
 */
const url = (v: string | undefined) => (v ?? "").trim() || undefined;

export const SOCIAL = {
  github: url(process.env.NEXT_PUBLIC_GITHUB_URL),
  linkedin: url(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  facebook: url(process.env.NEXT_PUBLIC_FACEBOOK_URL),
  /** The open-source repository (Opensource page). */
  repo: url(process.env.NEXT_PUBLIC_OPENSOURCE_REPO_URL),
} as const;

/** Every off-site profile, for `sameAs`. */
export const SAME_AS = [SOCIAL.linkedin, SOCIAL.facebook, SOCIAL.github].filter(
  (u): u is string => Boolean(u),
);

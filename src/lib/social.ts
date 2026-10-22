/**
 * Where the company is, off this site.
 *
 * Three places disagreed before this existed. The footer a visitor actually clicks pointed at
 * `linkedin.com/company/108237732/`, the numeric id rather than the vanity URL; the legacy footer
 * pointed at `company/thepulseapi` without the trailing slash; and `schema.ts` told search engines
 * `company/thepulseapi/`. The GitHub link in both footers pointed at `github.com/thepulseapi`,
 * which is not our organisation: ours is `mypulseapi`.
 *
 * `sameAs` in the structured data has to match the link in the page, because that is the whole
 * point of `sameAs`: it is the claim that these profiles are the same organisation as this site.
 * One source makes them agree by construction.
 */
export const SOCIAL = {
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/mypulseapi",
  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/company/thepulseapi/",
} as const;

/** Every off-site profile, for `sameAs`. */
export const SAME_AS = [SOCIAL.linkedin, SOCIAL.github];

/**
 * Re-export so the sitemap has one place to read from. The articles themselves
 * live in `src/content/blog.ts`.
 *
 * The five slugs that were here are retired. They were the posts that published
 * invented conversion figures, and they redirect rather than 404 because they
 * were in the sitemap.
 */
export { articleSlugs as blogSlugs } from "@/content/blog";

export const RETIRED_BLOG_SLUGS = [
  "cold-start-problem-solved",
  "privacy-first-personalization",
  "ai-inference-ecommerce",
  "conversion-optimization-strategies",
  "product-digital-twins",
];

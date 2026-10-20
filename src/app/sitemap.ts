import { MetadataRoute } from "next";
import { sectorSlugs } from "@/content/industries";
import { blogSlugs } from "@/data/blog-slugs";
import { careerIds } from "@/data/career-ids";
import { SITE } from "@/lib/site";

/*
 * `output: "export"` has no request to generate this on, so it must be generated at build time.
 * Next requires that to be stated rather than inferred, because the alternative -- a route that
 * wants to be dynamic in a build that cannot be -- is a silent 404 on the deployed site.
 *
 * `lastModified` therefore means "when the site was last built", which for a static deploy is the
 * same thing as when it last changed.
 */
export const dynamic = "force-static";

const baseUrl = SITE.www;

// All static pages in the application
const staticPages = [
  "",
  "/product",
  // The four product stories and the three "why" ones. They were built as
  // their own routes and then never added here, so the pages carrying the
  // method and the whole product detail were the only ones search could not
  // find. Each is a separate story with its own FAQPage schema.
  "/product/decision-audit",
  "/product/decision-verification",
  "/product/decision-monitor",
  "/product/decision-api",
  // The four storefront surfaces the Decision API serves.
  "/product/search",
  "/product/recommendations",
  "/product/pages",
  "/product/merchandising-studio",
  "/use-cases/seo-aeo",
  "/use-cases/time-to-market",
  "/why",
  "/why/method",
  "/why/compare",
  "/why/limits",
  "/pricing",
  "/about",
  "/blog",
  "/careers",
  "/contact",
  "/docs",
  "/integrations",
  "/industries",
  "/status",
  "/privacy",
  "/terms",
  "/cookies",
  "/gdpr",
];

// Supported locales
const locales = ["en", "vi"];

// Page priorities based on importance
const pagePriorities: Record<string, number> = {
  "": 1.0,
  "/product": 0.9,
  "/product/decision-audit": 0.9,
  "/product/decision-verification": 0.8,
  "/product/decision-monitor": 0.8,
  "/product/decision-api": 0.7,
  "/product/search": 0.9,
  "/product/recommendations": 0.9,
  "/product/pages": 0.8,
  "/product/merchandising-studio": 0.7,
  "/use-cases/seo-aeo": 0.9,
  "/use-cases/time-to-market": 0.9,
  "/why": 0.8,
  "/why/method": 0.8,
  "/why/compare": 0.8,
  "/why/limits": 0.7,
  "/pricing": 0.9,
  "/industries": 0.9,
  "/about": 0.8,
  "/blog": 0.8,
  "/docs": 0.8,
  "/integrations": 0.8,
  "/careers": 0.7,
  "/contact": 0.7,
  "/status": 0.6,
  "/privacy": 0.5,
  "/terms": 0.5,
  "/cookies": 0.5,
  "/gdpr": 0.5,
};

// Change frequencies based on content type
const changeFrequencies: Record<string, MetadataRoute.Sitemap[number]["changeFrequency"]> = {
  "": "weekly",
  "/product": "monthly",
  "/product/decision-audit": "monthly",
  "/product/decision-verification": "monthly",
  "/product/decision-monitor": "monthly",
  "/product/decision-api": "monthly",
  "/product/search": "monthly",
  "/product/recommendations": "monthly",
  "/product/pages": "monthly",
  "/product/merchandising-studio": "monthly",
  "/use-cases/seo-aeo": "monthly",
  "/use-cases/time-to-market": "monthly",
  "/why": "monthly",
  "/why/method": "monthly",
  "/why/compare": "monthly",
  "/why/limits": "monthly",
  "/pricing": "weekly",
  "/industries": "monthly",
  "/about": "monthly",
  "/blog": "weekly",
  "/docs": "weekly",
  "/integrations": "monthly",
  "/careers": "weekly",
  "/contact": "monthly",
  "/status": "daily",
  "/privacy": "yearly",
  "/terms": "yearly",
  "/cookies": "yearly",
  "/gdpr": "yearly",
};

function makeAlternates(path: string) {
  return {
    languages: {
      en: `${baseUrl}/en${path}`,
      vi: `${baseUrl}/vi${path}`,
      "x-default": `${baseUrl}/en${path}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const locale of locales) {
    for (const page of staticPages) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: currentDate,
        changeFrequency: changeFrequencies[page] || "monthly",
        priority: pagePriorities[page] || 0.5,
        alternates: makeAlternates(page),
      });
    }
  }

  // Dynamic industry pages
  for (const locale of locales) {
    for (const slug of sectorSlugs) {
      const path = `/industries/${slug}`;
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: makeAlternates(path),
      });
    }
  }

  // Dynamic blog posts
  for (const locale of locales) {
    for (const slug of blogSlugs) {
      const path = `/blog/${slug}`;
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: makeAlternates(path),
      });
    }
  }

  // Dynamic career pages
  for (const locale of locales) {
    for (const id of careerIds) {
      const path = `/careers/${id}`;
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: makeAlternates(path),
      });
    }
  }

  return sitemapEntries;
}

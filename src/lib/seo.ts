// SEO helpers shared by the layouts and astro.config.mjs. Keep runtime imports
// relative (no "@/" alias): the Astro config loads this file too.
import type { Language } from "../content.config";

export const SITE_URL = "https://www.elyor.dev";

// Google cuts titles at about 60 characters and descriptions at about 160
export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 160;
const BLOG_SUFFIX = " | Elyor's Blog";

/** <title> for a post: the site name is added only while the whole title still fits. */
export function documentTitle(title: string): string {
  const withSuffix = `${title}${BLOG_SUFFIX}`;
  return withSuffix.length <= TITLE_MAX ? withSuffix : title;
}

/**
 * RSS readers use <guid> as a post's ID. Until Nov 2026 the feed's links ended
 * in "/", so the IDs keep that slash: changing them would show old posts as new.
 */
export function feedGuid(link: string): string {
  return link.endsWith("/") ? link : `${link}/`;
}

export interface SeoFrontmatter {
  title: string;
  seoTitle?: string;
  description: string;
  heroImage?: string;
  heroAlt?: string;
}

/** Frontmatter problems that hurt search results; the blog schema fails the build on any. */
export function seoFrontmatterIssues(post: SeoFrontmatter): string[] {
  const issues: string[] = [];
  const searchTitle = post.seoTitle ?? post.title;
  if (post.seoTitle !== undefined && !post.seoTitle.trim()) {
    issues.push("seoTitle is empty; remove it or give the post a short search title.");
  }
  if (searchTitle.length > TITLE_MAX) {
    issues.push(
      `${post.seoTitle ? "seoTitle" : "title"} is ${searchTitle.length} characters; Google shows about ${TITLE_MAX}. ` +
        `Add a shorter seoTitle (the page heading keeps the full title).`,
    );
  }
  if (post.description.length > DESCRIPTION_MAX) {
    issues.push(
      `description is ${post.description.length} characters; keep it to ${DESCRIPTION_MAX} or Google cuts it off.`,
    );
  }
  if (post.heroImage && !post.heroAlt?.trim()) {
    issues.push("heroImage needs heroAlt: a short description of the picture.");
  }
  return issues;
}

/** Absolute URL in the site's one canonical form: no trailing slash, except "/". */
export function canonicalHref(path: string, site: string = SITE_URL): string {
  const url = new URL(path, site);
  if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/+$/, "");
  return url.href;
}

const NOT_IN_SITEMAP = [
  // /uz/blog/<post> and /ru/blog/<post> show the English post when there is no
  // translation, and their canonical points at /blog/<post>. A sitemap lists
  // canonical URLs only. If a post ever gets a real uz/ru translation, its
  // page will need an exception here.
  /^\/(uz|ru)\/blog\/(?!tag\/)[^/]+\/?$/,
  // Tag listings only repeat post cards (34 tags x 3 languages). Crawlers
  // still reach them through links; the sitemap points at the posts.
  /^\/((uz|ru)\/)?blog\/tag\//,
];

export function isSitemapPage(url: string): boolean {
  const { pathname } = new URL(url);
  return !NOT_IN_SITEMAP.some((pattern) => pattern.test(pathname));
}

export interface BlogPostingInput {
  url: string;
  title: string;
  description: string;
  image: string;
  published: Date;
  modified?: Date;
  author: string;
  lang: Language;
  tags: string[];
}

/** schema.org BlogPosting, for Google's article results. */
export function blogPostingSchema(post: BlogPostingInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: [post.image],
    datePublished: post.published.toISOString(),
    dateModified: (post.modified ?? post.published).toISOString(),
    author: { "@type": "Person", name: post.author, url: `${SITE_URL}/` },
    mainEntityOfPage: { "@type": "WebPage", "@id": post.url },
    url: post.url,
    inLanguage: post.lang,
    keywords: post.tags.join(", "),
  };
}

/** JSON for a <script type="application/ld+json"> tag; "<" is escaped so no value can end the tag. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

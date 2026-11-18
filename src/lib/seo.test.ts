import { describe, expect, it } from "vitest";
import { buildLangUrl } from "@/i18n";
import {
  blogPostingSchema,
  canonicalHref,
  documentTitle,
  feedGuid,
  isSitemapPage,
  jsonLd,
  seoFrontmatterIssues,
} from "./seo";

describe("documentTitle", () => {
  it("adds the site name when the result still fits in search results", () => {
    expect(documentTitle("React Server Components")).toBe("React Server Components | Elyor's Blog");
  });

  it("drops the site name when it would push the title past 60 characters", () => {
    const title = "Agent-Browser: Rethinking Web Automation for AI"; // 47 chars
    expect(documentTitle(title)).toBe(title);
  });
});

describe("feedGuid", () => {
  it("keeps the trailing slash the feed used before, so readers don't see old posts as new", () => {
    expect(feedGuid("https://www.elyor.dev/blog/post")).toBe("https://www.elyor.dev/blog/post/");
    expect(feedGuid("https://www.elyor.dev/ru/blog/post")).toBe("https://www.elyor.dev/ru/blog/post/");
  });
});

describe("seoFrontmatterIssues", () => {
  const ok = { title: "Short title", description: "Short description", heroImage: "/a.webp", heroAlt: "A" };

  it("accepts frontmatter that fits search results", () => {
    expect(seoFrontmatterIssues(ok)).toEqual([]);
  });

  it("asks for a shorter search title when the title is over 60 characters", () => {
    const long = "x".repeat(61);
    expect(seoFrontmatterIssues({ ...ok, title: long })).toHaveLength(1);
    expect(seoFrontmatterIssues({ ...ok, title: long, seoTitle: "Short" })).toEqual([]);
    expect(seoFrontmatterIssues({ ...ok, seoTitle: long })).toHaveLength(1);
  });

  it("rejects a blank seoTitle, which would leave only the site name in the tab", () => {
    expect(seoFrontmatterIssues({ ...ok, seoTitle: "  " })).toHaveLength(1);
  });

  it("flags descriptions over 160 characters", () => {
    expect(seoFrontmatterIssues({ ...ok, description: "x".repeat(161) })).toHaveLength(1);
    expect(seoFrontmatterIssues({ ...ok, description: "x".repeat(160) })).toEqual([]);
  });

  it("needs alt text when there is a hero image", () => {
    expect(seoFrontmatterIssues({ ...ok, heroAlt: undefined })).toHaveLength(1);
    expect(seoFrontmatterIssues({ ...ok, heroImage: undefined, heroAlt: undefined })).toEqual([]);
  });
});

describe("canonicalHref", () => {
  it("drops the trailing slash, except on the home page", () => {
    expect(canonicalHref("/blog/")).toBe("https://www.elyor.dev/blog");
    expect(canonicalHref("/blog/tag/ai/")).toBe("https://www.elyor.dev/blog/tag/ai");
    expect(canonicalHref("/blog/post")).toBe("https://www.elyor.dev/blog/post");
    expect(canonicalHref("/")).toBe("https://www.elyor.dev/");
  });

  it("keeps absolute URLs on their own host", () => {
    expect(canonicalHref("https://example.com/a/")).toBe("https://example.com/a");
  });
});

describe("buildLangUrl", () => {
  it("builds home links without a trailing slash", () => {
    expect(buildLangUrl("/", "en")).toBe("/");
    expect(buildLangUrl("/", "uz")).toBe("/uz");
    expect(buildLangUrl("/blog", "ru")).toBe("/ru/blog");
  });
});

describe("isSitemapPage", () => {
  it("leaves out the /uz and /ru copies of English posts", () => {
    expect(isSitemapPage("https://www.elyor.dev/ru/blog/some-post")).toBe(false);
    expect(isSitemapPage("https://www.elyor.dev/uz/blog/some-post/")).toBe(false);
  });

  it("leaves out tag listings", () => {
    expect(isSitemapPage("https://www.elyor.dev/blog/tag/ai")).toBe(false);
    expect(isSitemapPage("https://www.elyor.dev/ru/blog/tag/agent%20skills")).toBe(false);
  });

  it("keeps posts, blog indexes and home pages", () => {
    expect(isSitemapPage("https://www.elyor.dev/blog/some-post")).toBe(true);
    expect(isSitemapPage("https://www.elyor.dev/blog/tag-free-post")).toBe(true);
    expect(isSitemapPage("https://www.elyor.dev/ru/blog")).toBe(true);
    expect(isSitemapPage("https://www.elyor.dev/uz")).toBe(true);
    expect(isSitemapPage("https://www.elyor.dev/")).toBe(true);
  });
});

describe("blogPostingSchema", () => {
  const base = {
    url: "https://www.elyor.dev/blog/post",
    title: "Title",
    description: "Description",
    image: "https://www.elyor.dev/images/blog/post.webp",
    published: new Date("2026-11-18T00:00:00.000Z"),
    author: "Elyor Djalalov",
    lang: "en" as const,
    tags: ["AI", "Astro"],
  };

  it("describes the post for search engines", () => {
    expect(blogPostingSchema(base)).toEqual({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Title",
      description: "Description",
      image: ["https://www.elyor.dev/images/blog/post.webp"],
      datePublished: "2026-11-18T00:00:00.000Z",
      dateModified: "2026-11-18T00:00:00.000Z",
      author: { "@type": "Person", name: "Elyor Djalalov", url: "https://www.elyor.dev/" },
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.elyor.dev/blog/post" },
      url: "https://www.elyor.dev/blog/post",
      inLanguage: "en",
      keywords: "AI, Astro",
    });
  });

  it("uses the updated date when there is one", () => {
    const updated = new Date("2026-12-01T00:00:00.000Z");
    expect(blogPostingSchema({ ...base, modified: updated }).dateModified).toBe(
      "2026-12-01T00:00:00.000Z",
    );
  });
});

describe("jsonLd", () => {
  it("cannot close the script tag it sits in", () => {
    const out = jsonLd({ headline: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("<");
    expect(JSON.parse(out)).toEqual({ headline: "</script><script>alert(1)</script>" });
  });
});

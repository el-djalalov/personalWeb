import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { buildLangUrl } from "@/i18n";
import { SITE_URL, feedGuid } from "@/lib/seo";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");

  const publishedPosts = posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: "Elyor's Blog",
    description:
      "Articles about web development, software architecture, React, TypeScript, and engineering best practices by Elyor Djalalov.",
    site: context.site ?? SITE_URL,
    // Match the site's canonical URLs (no trailing slash)
    trailingSlash: false,
    items: publishedPosts.map((post) => {
      // Posts are served at their translationKey (falling back to the file id),
      // under the post's language prefix
      const link = buildLangUrl(
        `/blog/${post.data.translationKey || post.id.replace(/\.(md|mdx)$/, "")}`,
        post.data.lang,
      );
      // Escaped: customData is parsed as XML, and an "&" in a slug would break it
      const guid = feedGuid(new URL(link, SITE_URL).href).replace(/&/g, "&amp;").replace(/</g, "&lt;");
      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link,
        // Replaces the default <guid> (the link) so post IDs stay as they were
        customData: `<guid isPermaLink="true">${guid}</guid>`,
        categories: post.data.tags,
        author: post.data.author,
      };
    }),
    customData: `<language>en-us</language>
<copyright>Copyright ${new Date().getFullYear()}, Elyor Djalalov</copyright>
<managingEditor>info@elyor.dev (Elyor Djalalov)</managingEditor>
<webMaster>info@elyor.dev (Elyor Djalalov)</webMaster>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
<image>
  <url>https://www.elyor.dev/og-image.png</url>
  <title>Elyor's Blog</title>
  <link>https://www.elyor.dev/blog</link>
</image>`,
    stylesheet: "/rss/styles.xsl",
  });
}

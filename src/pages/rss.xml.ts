import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");

  const publishedPosts = posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: "Elyor's Blog",
    description:
      "Articles about web development, software architecture, React, TypeScript, and engineering best practices by Elyor Djalalov.",
    site: context.site ?? "https://www.elyor.dev",
    items: publishedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
      author: post.data.author,
    })),
    customData: `<language>en-us</language>
<copyright>Copyright ${new Date().getFullYear()}, Elyor Djalalov</copyright>
<managingEditor>hello@elyor.dev (Elyor Djalalov)</managingEditor>
<webMaster>hello@elyor.dev (Elyor Djalalov)</webMaster>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
<image>
  <url>https://www.elyor.dev/og-image.png</url>
  <title>Elyor's Blog</title>
  <link>https://www.elyor.dev/blog</link>
</image>`,
    stylesheet: "/rss/styles.xsl",
  });
}

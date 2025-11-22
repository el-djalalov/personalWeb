import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@/config";
import getSortedPosts from "@/utils/getSortedPosts";

export async function GET(context: any) {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);

  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: context.site,
    items: sortedPosts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDatetime,
      link: `/blog/${post.id}`,
      author: post.data.author || SITE.author,
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language>`,
    stylesheet: false,
  });
}

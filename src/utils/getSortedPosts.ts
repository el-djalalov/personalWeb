import type { CollectionEntry } from "astro:content";
import { SITE } from "@/config";

const getSortedPosts = (posts: CollectionEntry<"blog">[]) => {
  return posts
    .filter(({ data }) => {
      const publishedInThePast = Date.now() - data.pubDatetime.getTime() > 0;
      const isPublished =
        import.meta.env.MODE === "development" ||
        (!data.draft &&
          (publishedInThePast ||
            Date.now() - data.pubDatetime.getTime() >
              -SITE.scheduledPostMargin));
      return isPublished;
    })
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
    );
};

export default getSortedPosts;

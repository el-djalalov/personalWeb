import type { CollectionEntry } from "astro:content";
import getSortedPosts from "./getSortedPosts";

interface Tag {
  tag: string;
  tagName: string;
}

const getUniqueTags = (posts: CollectionEntry<"blog">[]) => {
  const tags: Tag[] = getSortedPosts(posts)
    .flatMap(post => post.data.tags)
    .map(tag => ({ tag: tag.toLowerCase(), tagName: tag }))
    .filter((value, index, self) => self.findIndex(tag => tag.tag === value.tag) === index)
    .sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));

  return tags;
};

export default getUniqueTags;

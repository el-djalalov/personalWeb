import type { CollectionEntry } from "astro:content";
import getSortedPosts from "./getSortedPosts";

const getPostsByTag = (posts: CollectionEntry<"blog">[], tag: string) =>
  getSortedPosts(
    posts.filter(post => post.data.tags.some(t => t.toLowerCase() === tag.toLowerCase()))
  );

export default getPostsByTag;

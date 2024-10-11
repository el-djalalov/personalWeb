import { defineCollection, reference, z } from "astro:content";

const postCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date:  z.string().transform((str) => new Date(str)),
    relatedPosts: z.array(reference("newsCollection"))
  }),
});

const newsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().transform((str) => new Date(str)),
    relatedPosts: z.array(reference("postCollection" ))
  }),
});

export const collections = {
  post: postCollection,
  news: newsCollection
};


import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default("Elyor Djalalov"),
      heroImage: image().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      // Social sharing
      ogImage: z.string().optional(),
      canonicalUrl: z.string().optional(),
      // Reading time will be calculated at build time
    }),
});

export const collections = { blog };

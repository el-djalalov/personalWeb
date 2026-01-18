import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

// Supported languages for blog posts
export const SUPPORTED_LANGUAGES = ["en", "uz", "ru"] as const;
export const DEFAULT_LANGUAGE = "en";
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

// Language display names
export const LANGUAGE_NAMES: Record<Language, string> = {
  en: "English",
  uz: "O'zbekcha",
  ru: "Русский",
};

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default("Elyor Djalalov"),
      heroImage: z.string().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      // Social sharing
      ogImage: z.string().optional(),
      canonicalUrl: z.string().optional(),
      // Multi-language support
      // Language of this post (en, uz, ru)
      lang: z.enum(SUPPORTED_LANGUAGES).default("en"),
      // Slug to group translations together (e.g., "engineering-behind-simple")
      translationKey: z.string().optional(),
    }),
});

export const collections = { blog };

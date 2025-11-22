import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    mdx(),
    sitemap(),
  ],
  site: "https://www.elyor.dev",
  output: "static",
  base: "/",

  // Internationalization configuration
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ru", "uz"],
    routing: {
      prefixDefaultLocale: false, // /blog instead of /en/blog
      redirectToDefaultLocale: false,
    },
  },

  // Markdown configuration
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

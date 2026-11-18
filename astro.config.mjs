import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";
import { SITE_URL, isSitemapPage } from "./src/lib/seo.ts";

export default defineConfig({
  // Dev toolbar floats over the mobile bottom nav (covers the Projects tab) — keep it off
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "github-dark",
        wrap: true,
      },
    }),
    sitemap({ filter: isSitemapPage }),
  ],
  site: SITE_URL,
  // One URL per page: /blog/x/ redirects to /blog/x, which canonicals already use
  trailingSlash: "never",
  output: "static",
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  base: "/",
  // Inline the CSS (~14 KB gzipped) so it doesn't block first paint as a separate request
  build: { inlineStylesheets: "always" },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "uz", "ru"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});

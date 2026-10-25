import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";

export default defineConfig({
  // Dev toolbar floats over the mobile bottom nav (covers the Projects tab) — keep it off
  devToolbar: { enabled: false },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "github-dark",
        wrap: true,
      },
    }),
  ],
  site: "https://www.elyor.dev",
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

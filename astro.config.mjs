import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";

export default defineConfig({
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
  output: "server",
  adapter: vercel( {
    webAnalytics: { enabled: true }
  }),
  base: "/",
  assets: true,
});

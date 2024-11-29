import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  site: "https://elyor.dev",
  output: "static",

  /* base: '/',
  build: {
    format: 'directory'
  },
  server: {
    host: true
  } */
});

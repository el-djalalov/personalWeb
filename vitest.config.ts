/// <reference types="vitest/config" />
// Astro's Vite config, so "@/..." imports resolve the same way as in the site
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
});

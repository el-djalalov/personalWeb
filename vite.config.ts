// Vite+ toolchain config: lint (Oxlint) and format (Oxfmt).
// Astro does not read this file (it builds its own Vite config), so dev and
// build still run through `astro dev` / `astro build`. Tests keep their own
// vitest.config.ts because they need Astro's Vite setup (getViteConfig).
import { defineConfig } from "vite-plus";

export default defineConfig({
  lint: {
    plugins: ["eslint", "typescript", "unicorn", "oxc", "react", "jsx-a11y"],
    ignorePatterns: ["dist/**", ".astro/**", ".vercel/**", "lib/**", "utils.ts"],
    rules: {
      "prefer-const": "error",
      "no-unused-vars": "warn",
      "array-callback-return": "warn",
    },
    overrides: [
      {
        // Oxlint reports imports used only in the template as unused
        // (oxc-project/oxc#18878), so skip that rule for .astro files.
        files: ["**/*.astro"],
        rules: { "no-unused-vars": "off" },
      },
    ],
  },
  fmt: {
    printWidth: 100,
    ignorePatterns: ["dist/**", ".astro/**", ".vercel/**", "src/content/**"],
  },
});

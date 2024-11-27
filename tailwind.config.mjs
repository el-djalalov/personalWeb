import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
//import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {},

  // eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
  plugins: [require("@tailwindcss/typography"), addVariablesForColors],
};


function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
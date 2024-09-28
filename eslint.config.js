import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    rules: {
      semi: "error",
      "prefer-const": "error",
      "no-unused-vars": "warn",
      "array-callback-return": "warn",
      "no-trailing-spaces": ["error", { skipBlankLines: true }],
    },
  },
  { ignores: [".astro/*", "!node_modules/"] },
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];

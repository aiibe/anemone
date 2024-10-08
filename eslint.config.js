// @ts-nocheck

import eslint from "@eslint/js";
import react from "eslint-plugin-react/configs/recommended.js";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";
import { fixupPluginRules } from "@eslint/compat";

export default tseslint.config(
  {
    ignores: [
      "dist/*",
      // Temporary compiled files
      "**/*.ts.build-*.mjs",

      // JS files at the root of the project
      "*.js",
      "*.cjs",
      "*.mjs",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "react-hooks": fixupPluginRules(reactHooks),
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    languageOptions: {
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        1,
        {
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-namespace": 0,
    },
  },

  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ...react,
    languageOptions: {
      ...react.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  }
);

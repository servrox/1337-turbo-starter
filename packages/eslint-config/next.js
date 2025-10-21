import globals from "globals";
import pluginNext from "@next/eslint-plugin-next";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import tanstackQuery from "@tanstack/eslint-plugin-query";
import { baseConfig } from "./base.js";

const tanstackRecommended =
  tanstackQuery.configs?.["flat/recommended"] ??
  [tanstackQuery.configs?.recommended ?? {}];

export const nextJsConfig = [
  ...baseConfig,
  ...tanstackRecommended,
  {
    name: "starter/next-globals",
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    }
  },
  {
    ...pluginReact.configs.flat.recommended,
    name: "starter/react-recommended",
    settings: {
      ...(pluginReact.configs.flat.recommended.settings ?? {}),
      react: { version: "detect" }
    }
  },
  {
    name: "starter/react-hooks",
    plugins: {
      "react-hooks": pluginReactHooks
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules
    }
  },
  {
    name: "starter/jsx-a11y",
    plugins: {
      "jsx-a11y": pluginJsxA11y
    },
    rules: {
      ...pluginJsxA11y.configs.recommended.rules
    }
  },
  {
    name: "starter/next-rules",
    plugins: {
      "@next/next": pluginNext
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off"
    }
  }
];

export default nextJsConfig;

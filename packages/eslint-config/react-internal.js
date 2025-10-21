import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import { baseConfig } from "./base.js";

export const reactLibraryConfig = [
  ...baseConfig,
  pluginReact.configs.flat.recommended,
  {
    name: "starter/react-language-options",
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser
      }
    },
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
    name: "starter/react-tweaks",
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off"
    }
  }
];

export const config = reactLibraryConfig;

export default reactLibraryConfig;

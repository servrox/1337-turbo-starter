import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

const IGNORE_PATTERNS = [
  "**/node_modules/**",
  "**/.turbo/**",
  "**/.next/**",
  "**/dist/**",
  "**/build/**",
  "**/out/**",
  "**/.cache/**"
];

const TYPESCRIPT_GLOBS = ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"];

const typescriptTypeCheckedConfigs = tseslint.configs.recommendedTypeChecked.map((config, index) => {
  if (index === 0) {
    return {
      ...config,
      files: TYPESCRIPT_GLOBS,
      languageOptions: {
        ...(config.languageOptions ?? {}),
        parserOptions: {
          ...(config.languageOptions?.parserOptions ?? {}),
          projectService: true
        }
      }
    };
  }

  if (!config.files) {
    return {
      ...config,
      files: TYPESCRIPT_GLOBS
    };
  }

  return config;
});

export const baseConfig = tseslint.config(
  {
    name: "starter/ignores",
    ignores: IGNORE_PATTERNS
  },
  {
    name: "starter/language-options",
    files: ["**/*.{js,cjs,mjs,ts,cts,mts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    }
  },
  js.configs.recommended,
  ...typescriptTypeCheckedConfigs,
  eslintConfigPrettier,
  {
    name: "starter/turbo",
    plugins: {
      turbo: turboPlugin
    },
    rules: {
      "turbo/no-undeclared-env-vars": "error"
    }
  }
);

export default baseConfig;

import globals from "globals";
import pluginN from "eslint-plugin-n";
import { baseConfig } from "./base.js";

const nodeRecommended = pluginN.configs?.["flat/recommended-module"]
  ? [pluginN.configs["flat/recommended-module"]]
  : [];

export const nodeConfig = [
  ...baseConfig,
  ...nodeRecommended,
  {
    name: "starter/node-globals",
    files: ["**/*.{js,cjs,mjs,ts,cts,mts}"],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }
];

export default nodeConfig;

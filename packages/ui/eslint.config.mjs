import { reactLibraryConfig } from "@repo/eslint-config/react-internal";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...reactLibraryConfig
];

export default config;

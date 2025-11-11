import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    passWithNoTests: true,
    setupFiles: ["./test/setup-tests.ts"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
      include: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "hooks/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}"],
      exclude: ["**/*.d.ts", "app/**/(layout|loading|page|template|error).tsx", "app/**/route.ts", "app/api/**"],
    },
  },
});

# `@repo/eslint-config`

Flat ESLint presets shared across the starter monorepo. All configs target ESLint v9+ and TypeScript using the `typescript-eslint` flat helpers.

## Available presets

| Export | Description |
| --- | --- |
| `@repo/eslint-config/base` | Base ruleset with JavaScript defaults, type-aware TypeScript checks, Turbo env guard, and repo-wide ignore patterns. |
| `@repo/eslint-config/next-js` | Adds React (`react`, `react-hooks`, `jsx-a11y`) and Next.js (`@next/eslint-plugin-next`) rules suited for App Router projects. |
| `@repo/eslint-config/react-internal` | React component/library rules for shared packages such as `@repo/ui`. |
| `@repo/eslint-config/node` | Node-oriented rules (powered by `eslint-plugin-n`) for build scripts and tooling. |

Each preset exports a flat-config array, so in a workspace-level `eslint.config.js` you can simply:

```js
import nextJsConfig from "@repo/eslint-config/next-js";

export default nextJsConfig;
```

## Requirements & tips

- Use Node.js ≥ 18.18 (ESLint v9 requirement) in editors and CI.
- Type-aware rules rely on `typescript-eslint`'s project service. Ensure each workspace has a valid `tsconfig.json`; create `tsconfig.eslint.json` if additional files need to be included.
- Prettier integration is handled via `eslint-config-prettier/flat` within the presets—run `bun run format` to keep formatting consistent.
- For VS Code/Cursor, enable the ESLint extension and allow flat config discovery so the workspace config is picked up automatically.

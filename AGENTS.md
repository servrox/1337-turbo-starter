# Repository Guidelines

## Project Structure & Module Organization
- `apps/aptos-boilerplate` is the primary Next.js dApp experience. Keep customer flows, wallet plumbing, and feature work inside its `app/`, `components/`, `hooks/`, and `lib/` trees.
- `apps/landing-page` owns marketing content. Treat it like any other Next.js app—shared UI or logic belongs in packages, not copied into the app.
- `packages/ui`, `packages/eslint-config`, and `packages/typescript-config` centralize UI primitives, lint rules, and TS baselines. `packages/contract` hosts Move code plus scripts; keep chain logic there instead of under `apps/`.

## Build, Test, and Development Commands
- Install once with `bun install` (Bun 1.3+). Turbo reads scripts from the monorepo root—run everything through `bun run …`.
- Local dev entry points:
  - `bun run dev:aptos-boilerplate` / `bun run dev --filter=aptos-boilerplate`
  - `bun run dev:landing-page`
- Build & CI:
  - `bun run build` fan-outs to every workspace; use `bun run build:aptos-boilerplate` or `bun run build:landing-page` for scoped builds.
  - `bun run lint`, `bun run lint -- --fix`, and `bun run check-types` must be clean before sending PRs.
  - `bun run test` executes the Vitest pipeline across apps; prefer scoped runs such as `bun run test --filter=aptos-boilerplate` during iteration.
  - Format staged files via `bun run format`.
- On-chain workflows live in `packages/contract`. From that directory run `bun run move:test`, `bun run move:compile`, or `bun run move:publish` as needed.

## Coding Style & Naming Conventions
- Prettier + `prettier-plugin-tailwindcss` controls formatting (2-space indentation, trailing commas, sorted class lists). Do not hand-format conflicting changes.
- ESLint derives from `@repo/eslint-config`. Fix violations instead of disabling them; include `lint:fix` scripts when bulk-resolving warnings.
- Use PascalCase for React components, camelCase for utilities, and kebab-case for route segments under `app/`.
- Co-locate hooks under `hooks/`, data utilities under `lib/`, and prefer package-level exports (`@repo/ui`, shared Move helpers) over duplicating module logic in apps.

## Testing Guidelines
- Vitest is available in every app. Place UI tests under `test/` or alongside components as `*.spec.tsx`, import helpers from `test/test-utils`, and run them with `bun run test` (or the scoped `test:*` scripts).
- `test/setup-tests.ts` wires up React Testing Library + jest-dom; extend that file when global mocks are required.
- Move packages should keep `tests/*.move` cases up to date. Run `bun run move:test` in each package before a review and note coverage deltas if you add scenarios.
- Lint, type-check, and test (including Move suites) before requesting review; list all commands + manual QA steps inside the PR template.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (e.g., `feat(wallet): add account selector`). Keep commits focused and include related scripts/migrations in the same change.
- PR descriptions must link issues, outline validation (`bun run lint`, `bun run check-types`, `bun run test`, `bun run move:test`), and attach screenshots or recordings for UI output.
- Document known risks, follow-ups, or toggles in the PR body so reviewers know what to verify.

## Environment & Configuration Tips
- Secrets (Aptos keys, Supabase tokens, analytics IDs) belong in `.env.local` files. Each app has an `.env.example` enumerating required values—keep it current when adding new variables.
- Re-export shared configuration (UI tokens, ESLint, TS configs, Move helpers) through the packages. If an app diverges from the shared setup, capture the reason in that package’s README and reflect it here when needed.

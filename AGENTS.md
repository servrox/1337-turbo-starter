# Repository Guidelines

## Project Structure & Module Organization
- `apps/aptos-boilerplate` hosts the sample Aptos dApp built with Next.js; place onboarding flows, wallet integrations, and contract interactions here.
- `apps/landing-page` contains the marketing site. Keep feature code inside each app’s `app/` or `components/` directories and share utilities via `packages`.
- `packages/ui`, `packages/eslint-config`, `packages/typescript-config`, and `packages/contract` provide shared UI primitives, lint rules, TypeScript bases, and Move contracts. Update shared code here before duplicating inside apps.

## Build, Test, and Development Commands
- Run `bun install` once to sync dependencies across the monorepo; Turbo relies on Bun 1.3+.
- `bun run dev:aptos-boilerplate` or `bun run dev --filter=aptos-boilerplate` starts the main dApp locally. Use `bun run dev:landing-page` for the marketing site.
- `bun run build` runs `turbo run build` for every workspace; scope builds via `bun run build:aptos-boilerplate` or `bun run build:landing-page` when iterating.
- `bun run lint`, `bun run lint -- --fix`, and `bun run check-types` must pass before opening a PR. Format staged files with `bun run format`.
- Move contracts live under `packages/contract`; run `bun run move:test` (or `move:compile`, `move:publish`) from that directory when working on on-chain logic.

## Coding Style & Naming Conventions
- Prettier (with the Tailwind plugin) handles formatting—use two-space indentation, trailing commas, and sorted Tailwind classes. Never manually reformat conflicting changes.
- ESLint configs in `packages/eslint-config` extend TypeScript, React, Next.js, TanStack Query, and a11y defaults. Resolve lint errors rather than disabling rules.
- Use PascalCase for React components (`MyComponent.tsx`), camelCase for utilities, and kebab-case for route segments under `app/`.
- Co-locate feature-specific hooks or queries under `hooks/` or `lib/`; surface shared types via `packages/typescript-config` when needed.

## Testing Guidelines
- The starter doesn’t ship with automated tests yet. When adding Jest/Playwright or Move integration tests, keep them beside the code (e.g., `*.spec.tsx`, `tests/` folders) and document the commands in the README.
- Run `bun run lint` and any relevant `move:*` scripts before requesting review; attach coverage notes if you add tests.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (e.g., `feat(wallet): add account selector`) as seen in the history. Keep commits focused and include contract migrations or scripts alongside the change.
- PRs should describe the change, link issues, list validation steps (`bun run lint`, `bun run check-types`, dApp manual checks), and include screenshots or recordings for UI updates.
- Surface risks or follow-up todos in the PR body so reviewers know what to verify.

## Environment & Configuration Tips
- Store secrets (Aptos API keys, wallet keys) in `.env.local` files; never commit them. Each app includes `.env.example` with required values.
- Re-export shared configuration from `packages/contract`, `packages/ui`, and `packages/typescript-config` so apps stay synchronized. If you need to diverge, document the reason in the relevant README.


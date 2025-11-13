# IOTA Wallet Dashboard

# Set Up

**Requirements**: Node 20.0.0 or later.

Dependencies are managed using [Bun](https://bun.sh). You can start by installing dependencies in the root of the repository:

```
$ bun install
```

> All `bun` commands below are intended to be run in the root of the repo.

## Developing the IOTA Wallet Dashboard

To start the IOTA wallet dashboard dev server, you can run the following command:

```
bun run dev:iota-wallet-dashboard
```

This will start the dev server on port 3000, which should be accessible on http://localhost:3000/

## To run end-to-end localnet test

Prepare builds before running tests

```bash
bun run prepare:e2e
```

In a separate terminal, you can now run the end-to-end tests:

```bash
bun run playwright test
```

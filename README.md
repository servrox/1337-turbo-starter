# 1337 Turbo Starter – Modern Web3 Development Stack

<div align="center">
  <img src="https://img.shields.io/npm/v/bun?color=000000&style=for-the-badge&label=Bun&logo=bun" alt="Bun" />
  <img src="https://img.shields.io/npm/v/turbo?color=000000&style=for-the-badge&label=Turbo&logo=vercel" alt="Turbo" />
  <img src="https://img.shields.io/npm/v/next?color=000000&style=for-the-badge&label=Next.js&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/npm/v/tailwindcss?color=000000&style=for-the-badge&label=Tailwind&logo=tailwindcss" alt="Tailwind" />
  <br />
  <img src="https://img.shields.io/badge/Aptos-000000?style=for-the-badge&logo=aptos" alt="Aptos" />
  <img src="https://img.shields.io/badge/Move-000000?style=for-the-badge&logo=move" alt="Move" />
</div>

---

## 🚀 Overview

**1337 Turbo Starter** is a modern full-stack Web3 monorepo powered by [Turborepo](https://turbo.build/), integrating the official [Aptos DApp boilerplate](https://learn.aptoslabs.com/en/dapp-templates/boilerplate-template).

It includes:

- ⚡️ Bun for ultra-fast performance  
- 🎨 Tailwind CSS + shadcn/ui for polished UIs  
- 🔗 Aptos & Move for Web3  
- 🧱 Shared configs & UI across apps  
- 🦪 Developer-first tooling and monorepo structure  

---

## 🧰 Tech Stack

- **Bun** – Ultra-fast JS runtime & package manager  
- **Turborepo** – High-performance monorepo build system  
- **Next.js** – React framework for production apps  
- **Tailwind CSS** – Utility-first CSS framework  
- **Aptos** – Layer 1 blockchain platform  
- **Move** – Safe, resource-oriented smart contract language  

---

## 📁 Project Structure

```txt
.
├── apps/
│   ├── docs/             # Documentation site (uses shared Tailwind + UI)
│   ├── web/              # Main web app (uses shared Tailwind + UI)
│   └── my-aptos-dapp/    # Aptos DApp boilerplate
├── packages/
│   ├── contract/         # Move smart contracts
│   ├── ui/               # Shared UI components (used in docs & web)
│   ├── tailwind-config/  # Shared Tailwind config
│   ├── typescript-config/ # Shared TypeScript settings
│   └── eslint-config/    # Shared ESLint rules
└── .vscode/              # VS Code configuration
```

📦 **Shared packages** like `ui` and `tailwind-config` ensure consistent styling and components across `apps/docs` and `apps/web`.

---

## ⚙️ Getting Started

### Prerequisites

- [Bun](https://bun.sh) ≥ 1.2.5  
- [VS Code](https://code.visualstudio.com) (recommended)  

### 🧪 Installation

```bash
git clone git@github.com:servrox/1337-turbo-starter.git
cd 1337-turbo-starter
bun install
```

### 🔐 Environment Setup

**For the Aptos DApp (`apps/my-aptos-dapp/.env`):**

```env
# Get your API key from https://build.aptoslabs.com
NEXT_PUBLIC_APTOS_API_KEY=your_api_key_here
```

**For the Move contract (`packages/contract/.env`):**

```env
NEXT_MODULE_PUBLISHER_ACCOUNT_PRIVATE_KEY=your_private_key_here
NEXT_PUBLIC_MODULE_ADDRESS=your_module_address_here
```

📜 `NEXT_MODULE_PUBLISHER_ACCOUNT_ADDRESS` will be set automatically when you run:

```bash
bun run move:publish
```

### ▶️ Start Dev Server

```bash
bun run dev
```

---

## 📜 Scripts

| Script                   | Description                                 |
|--------------------------|---------------------------------------------|
| `bun run build`          | Build all apps and packages                 |
| `bun run dev`            | Start development servers (via Turborepo)  |
| `bun run lint`           | Run ESLint across the repo                 |
| `bun run check-types`    | Type-check all packages and apps           |
| `bun run format`         | Format codebase with Prettier              |
| `bun run move:publish`   | Deploy Move module and set publisher address |

---

## ✨ Features

- ⚡️ **Fast Dev Workflow** with Bun and Turborepo  
- 🎨 **Modern UI** with Tailwind CSS and Next.js  
- 🔒 **Web3-Ready** via Aptos + Move  
- 📦 **Shared UI Components** via `@repo/ui`  
- 🧠 **Developer Experience**: Prettier, ESLint, TypeScript, and VS Code settings out-of-the-box  
- 🔀 **Reusable Configs**: Tailwind, TS, and ESLint configs shared across packages  
- 📱 **Responsive Design** with Tailwind utilities  
- 🌐 **Docs + Web Consistency** via shared `ui` and `tailwind-config`  

---

## 🗭 Development Guidelines

### Required Environment Variables

| Location                    | Variable                                       | Description                                               |
|----------------------------|------------------------------------------------|-----------------------------------------------------------|
| `apps/my-aptos-dapp/.env`  | `NEXT_PUBLIC_APTOS_API_KEY`                   | Your Aptos API key from [Aptos Labs](https://build.aptoslabs.com) |
| `packages/contract/.env`   | `NEXT_MODULE_PUBLISHER_ACCOUNT_PRIVATE_KEY`   | Private key used for module publishing                   |
| `packages/contract/.env`   | `NEXT_PUBLIC_MODULE_ADDRESS`                  | Address where the module is published                    |
| `packages/contract/.env`   | `NEXT_MODULE_PUBLISHER_ACCOUNT_ADDRESS`       | **Auto-filled** by `move:publish` script                 |

💡 See the `.env.example` files in each package for more details.


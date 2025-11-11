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

It runs:

- ⚡️ Bun for ultra-fast performance  
- 🎨 Tailwind CSS + shadcn/ui for polished UIs  
- 🔗 Aptos & Move for next level Web3  
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
│   ├── aptos-boilerplate/  # Aptos DApp implementation
│   └── landing-page/       # Landing page application
├── packages/
│   ├── contract/          # Move smart contracts
│   ├── ui/                # Shared UI components
│   ├── typescript-config/ # Shared TypeScript settings
│   └── eslint-config/     # Shared ESLint rules
└── .vscode/               # VS Code configuration
```

📦 **Shared packages** ensure consistent styling, types, and components across all applications.

---

## ⚙️ Getting Started

### Prerequisites

- [Bun](https://bun.sh) ≥ 1.3.0  
- [VS Code](https://code.visualstudio.com) (recommended)  

### 🧪 Installation

```bash
git clone git@github.com:servrox/1337-turbo-starter.git
cd 1337-turbo-starter
bun install
```

### 🔐 Environment Setup

**For the Aptos DApp (`apps/aptos-boilerplate/.env`):**

```env
# Get your API key from https://build.aptoslabs.com
NEXT_PUBLIC_APTOS_API_KEY=your_api_key_here
```

**For the Move contract (`packages/aptos-contract/.env`):**

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

| Script                          | Description                                    |
|--------------------------------|------------------------------------------------|
| `bun run build`                | Build all apps and packages                    |
| `bun run build:aptos-boilerplate` | Build only the Aptos boilerplate app       |
| `bun run build:landing-page`   | Build only the landing page                    |
| `bun run dev`                  | Start all development servers                  |
| `bun run dev:aptos-boilerplate`| Start Aptos boilerplate development server    |
| `bun run dev:landing-page`     | Start landing page development server         |
| `bun run lint`                 | Run ESLint (flat config) across the repo      |
| `bun run lint -- --fix`        | Auto-fix lint issues where possible           |
| `bun run check-types`          | Type-check all packages and apps              |
| `bun run format`               | Format codebase with Prettier                 |

---

## ✨ Bonus

- ⚡️ **Fast Dev Workflow** with Bun and Turborepo  
- 🎨 **4-way theme switcher** select between banana, dark, light and system
- 📦 **Shared UI Components** via `@repo/ui`  
- 🧠 **Developer Experience**: Prettier, ESLint (flat config), TypeScript, and VS Code settings out-of-the-box  
- 💄 **Tailwind v4**: native Tailwind CSS v4 pipeline with PostCSS  
- 📱 **shadcn/ui monorepo** using shadcn/ui components and CLI in a [monorepo](https://ui.shadcn.com/docs/monorepo#requirements)  
- 🌐 **create-aptos-dapp** matched Aptos Move integration with the official AptosLabs boilerplate

---

## 🗭 Development Guidelines

### Required Environment Variables

| Location                    | Variable                                       | Description                                               |
|----------------------------|------------------------------------------------|-----------------------------------------------------------|
| `apps/aptos-boilerplate/.env`  | `NEXT_PUBLIC_APP_NETWORK`                   | The network your module is deployed to |
| `apps/aptos-boilerplate/.env`   | `NEXT_PUBLIC_MODULE_ADDRESS`                  | **Auto-filled** by `move:publish` script                 |
| `apps/aptos-boilerplate/.env`  | `NEXT_PUBLIC_APTOS_API_KEY`                   | Your Aptos API key from [Aptos Labs](https://build.aptoslabs.com) |
| `packages/aptos-contract/.env`  | `NEXT_PUBLIC_APP_NETWORK`                   | The network you want to deploy your module |
| `packages/aptos-contract/.env`   | `NEXT_MODULE_PUBLISHER_ACCOUNT_ADDRESS`       | Account address used for module publishing                 |
| `packages/aptos-contract/.env`   | `NEXT_PUBLIC_MODULE_ADDRESS`                  | **Auto-filled** by `move:publish` script                 |
| `packages/aptos-contract/.env`   | `NEXT_MODULE_PUBLISHER_ACCOUNT_PRIVATE_KEY`   | Private key used for module publishing                   |

💡 See the `.env.example` files in each package for more details.

💡 If you are using the Testnet network, you will need to fund a module publisher account manually through the faucet web view on https://aptos.dev/en/network/faucet and then fill out the `NEXT_MODULE_PUBLISHER_ACCOUNT_PRIVATE_KEY` and `NEXT_MODULE_PUBLISHER_ACCOUNT_ADDRESS` in your project .env file.

### Linting & Formatting

Always run `bun run lint` (optionally `bun run lint -- --fix`) and `bun run check-types` before opening a pull request. The repository relies on the shared flat config in `packages/eslint-config`; resolve errors instead of disabling rules so that future projects based on this starter inherit the best practices.

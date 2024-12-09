<p align="center">
  <a href="https://wagmi.sh">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/duv0g402y/image/upload/v1713381289/monobera_color_alt_fgny7b.svg">
      <img alt="Wagmi Logo" src="https://res.cloudinary.com/duv0g402y/image/upload/v1713381289/monobera_color_alt2_ppo8o6.svg" height="200">
    </picture>
  </a>
</p>

<h2 align="center">Monorepo for Managing Berachain Applications & Libraries</h2>

<p align="center">
  A comprehensive and structured codebase for Berachain's applications and libraries.
</p>

<div align="center">
  <a href="https://github.com/berachain/monobera/actions/workflows/quality.yml">
    <img src="https://github.com/berachain/monobera/actions/workflows/quality.yml/badge.svg?branch=v2" alt="CI Status">
  </a>
</div>

---

## 🚀 Installation

### Prerequisites
Ensure the following are installed:
- **Node.js**: v18.18.2 or higher.
- **pnpm**: Latest version. Install via `npm install -g pnpm`.

### Steps
1. Clone the repository and initialize submodules:
   ```bash
   git submodule init
   git submodule update
   pnpm i
   pnpm setenv bartio

cp .env.local.example .env.local
Create your own NEXT_PUBLIC_DYNAMIC_API_KEY (without CORS restrictions) and add it to .env.local.

📂 Environment Variables
Berachain applications are single-chain applications. Use the following environment configuration for the Bartio testnet:

Environment Variables	Description
.env.bartio	Configuration for Berachain Bartio testnet

🛠️ Commands
Script	Description
pnpm i	Installs packages for all apps and libraries.
pnpm build	Builds all packages and apps (memory-intensive).
pnpm setenv <env>	Copies .env.<environment> into .env. Avoid manual edits.
pnpm dev:<app>	Runs the specified app in development mode (e.g., pnpm dev:hub).
pnpm clean	Cleans the project with turbo clean and removes node_modules.
pnpm check-types	Runs type-checking across all apps and libraries.
pnpm lint	Lints all apps and libraries.
pnpm format	Formats the codebase and writes changes.
pnpm check	Performs a full check, including linting and type-checking.
pnpm prepare	Installs Husky for Git hooks.
pnpm upsertenv	Updates environment variables in Vercel. Requires login.

🧩 Applications
App	Description
app/hub	Code for the Hub application.
app/honey	Code for the Honey application.
app/lend	Code for the Bend application.
app/perp	Code for the Berps application.

📦 Packages
Package	Description
packages/berajs	A TypeScript library for interacting with Berachain. Docs
packages/wagmi	Shared configuration for wagmi/dynamic web3 applications.
packages/config	Centralized storage for shared configuration variables.
packages/graphql	GraphQL clients and subgraph queries for Apollo.
packages/proto	Protobuf and e2e typing for Cosmos-SDK integration.
packages/shared-ui	Reusable UI components built on top of the packages/ui.
packages/ui	UI components based on ShadCN.

🛠️ Tooling & Libraries
This monorepo leverages cutting-edge tools for development efficiency:

Biome.js
Knip
Turborepo
Next.js
Wagmi
Viem
SWR
Vocs
ShadCN
Tailwind CSS
📊 CI/CD
The CI pipeline uses caching for turbo builds via rharkor/caching-for-turbo@v1.5. This significantly reduces build times for incremental updates.

📢 Banner Management for Dapps
Banners are crucial for displaying urgent or event-related messages to users.

Global Notifications: Centralized in packages/shared-ui under BannerConfig.
Targeted Pages: Specify hrefs to target pages (e.g., ["/pools", "/swap", "/"] for BEX).
To enable/disable banners, submit a PR modifying the enabled field in BannerConfig.

🎯 Example Usage
To run a specific app (e.g., Hub), use the following command:
bash
pnpm i && pnpm dev:hub

💡 Tips for Contribution
Follow the contribution guidelines.
Ensure all PRs pass linting and CI checks.
Use meaningful commit messages.

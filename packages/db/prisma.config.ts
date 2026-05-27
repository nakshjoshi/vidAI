// prisma.config.ts — Prisma v7 CLI configuration
//
// Uses dotenv with __dirname to load .env with an absolute path.
// This is necessary when running via `pnpm dlx` which resolves
// env files relative to its temp cache dir, not the project root.

import path from "path";
import { defineConfig } from "prisma/config";
import { config as loadEnv } from "dotenv";

// Load .env from the same directory as this config file (packages/db/.env)
loadEnv({ path: path.join(__dirname, ".env") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});

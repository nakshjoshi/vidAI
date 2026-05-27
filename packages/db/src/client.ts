// Prisma v7 client — uses PrismaPg driver adapter with connectionString directly
// Generated client lives at packages/db/generated/prisma (run pnpm db:generate to create it)

import { PrismaClient } from "../generated/prisma"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({
  adapter,
})

export default prisma
export { prisma }

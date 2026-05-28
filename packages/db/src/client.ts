// Prisma v7 client — uses PrismaPg driver adapter
// Generated client lives at packages/db/generated/prisma (run pnpm db:generate to create it)

import { PrismaClient } from "../generated/prisma"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const connectionString = process.env.DATABASE_URL!

// Limit connection pool to avoid exhausting Supabase's 15 connection limit
const pool = new Pool({
  connectionString,
  max: 5,
})
const adapter = new PrismaPg(pool)

// Use a global variable to prevent connection leaks during hot-reloading
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
export { prisma }

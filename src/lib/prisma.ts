import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@/generated/prisma/client"
import { env } from "./env"

// Cached on globalThis so dev hot-reloads don't open a new pool each time
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export function getPrisma(): PrismaClient {
    globalForPrisma.prisma ??= new PrismaClient({
        adapter: new PrismaPg({ connectionString: env.databaseUrl }),
    })
    return globalForPrisma.prisma
}

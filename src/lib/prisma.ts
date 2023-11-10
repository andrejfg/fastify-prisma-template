import { PrismaClient } from '@prisma/client'

// If you want to see the SQL you can uncomment below
export const prisma = new PrismaClient({
  // log: ['query'],
})

import type { Vendor } from '@wedding/db/generated/prisma'
import { prisma } from '@wedding/db'

/**
 * Find all vendors in a given city matching any of the provided category slugs.
 * Results are ordered by rating DESC so the best vendors come first.
 */
export async function findVendorsByCityAndCategories(
  city: string,
  categories: string[]
): Promise<Vendor[]> {
  return prisma.vendor.findMany({
    where: {
      city: { equals: city, mode: 'insensitive' },
      category: { in: categories },
    },
    orderBy: { rating: 'desc' },
  })
}

/**
 * Find vendors in a city for a single category.
 */
export async function findVendorsByCityAndCategory(
  city: string,
  category: string
): Promise<Vendor[]> {
  return prisma.vendor.findMany({
    where: {
      city: { equals: city, mode: 'insensitive' },
      category,
    },
    orderBy: { rating: 'desc' },
  })
}

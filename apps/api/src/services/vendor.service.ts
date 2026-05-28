// VendorService — Priority-aware vendor matching
//
// After the AI returns budget allocations per vendor category, this service
// queries the DB for matching vendors and applies priority-based selection:
//
// Priority categories (couple's top 2):
//   → Show up to 5 vendors
//   → Allow 20% budget flex (vendors slightly above allocated budget)
//   → Sort by rating DESC → best vendors first
//   → Tag as "Top Pick" or "Premium"
//
// Non-priority categories:
//   → Show up to 4 vendors
//   → Strict budget (priceMin <= allocated budget)
//   → Sort by rating DESC
//   → Tag as "Good Value" or "Budget Friendly"

import type { Vendor, Recommendation } from '@wedding/db/generated/prisma'
import type { VendorMatch, VendorMatchTag } from '@wedding/types'
import { PRIORITY_TO_CATEGORIES } from '@wedding/types'
import { findVendorsByCityAndCategory } from '../repositories/vendor.repository'
import { logger } from '../lib/logger'

const PRIORITY_LIMIT = 5
const NON_PRIORITY_LIMIT = 4
const BUDGET_FLEX_FACTOR = 1.2 // 20% over budget allowed for priority categories

/**
 * Determine which vendor category slugs are "priority" based on the couple's
 * selected priorities (e.g. "Photography" → ["photography", "videography"]).
 */
function getPriorityCategorySlugs(priorities: string[]): Set<string> {
  const slugs = new Set<string>()
  for (const priority of priorities) {
    const mapped = PRIORITY_TO_CATEGORIES[priority]
    if (mapped) {
      for (const slug of mapped) slugs.add(slug)
    }
  }
  return slugs
}

/**
 * Assign a user-facing match tag based on vendor tier and priority status.
 */
function assignMatchTag(vendor: Vendor, isPriority: boolean): VendorMatchTag {
  if (isPriority) {
    return vendor.tier === 'premium' ? 'Top Pick' : 'Premium'
  }
  return vendor.tier === 'budget' ? 'Budget Friendly' : 'Good Value'
}

/**
 * Convert a Vendor DB record into a VendorMatch response object.
 */
function toVendorMatch(vendor: Vendor, isPriority: boolean): VendorMatch {
  return {
    id: vendor.id,
    name: vendor.name,
    category: vendor.category,
    description: vendor.description,
    priceMin: vendor.priceMin,
    priceMax: vendor.priceMax,
    rating: vendor.rating,
    tier: vendor.tier as VendorMatch['tier'],
    phone: vendor.phone,
    email: vendor.email,
    website: vendor.website,
    tags: vendor.tags,
    matchTag: assignMatchTag(vendor, isPriority),
  }
}

export class VendorService {
  /**
   * Match vendors to AI recommendations using priority-aware logic.
   *
   * @param recommendations - The AI-generated budget allocations per category
   * @param priorities - The couple's top 2 priority labels (e.g. ["Photography", "Food"])
   * @param city - The wedding city (e.g. "Rishikesh")
   * @returns A map from vendor category slug → matched VendorMatch[]
   */
  public async matchVendorsToRecommendations(
    recommendations: Recommendation[],
    priorities: string[],
    city: string
  ): Promise<Map<string, VendorMatch[]>> {
    const prioritySlugs = getPriorityCategorySlugs(priorities)
    const result = new Map<string, VendorMatch[]>()

    // Process all categories in parallel
    const matchPromises = recommendations.map(async (rec) => {
      const isPriority = prioritySlugs.has(rec.vendorCategory)
      const budgetCeiling = isPriority
        ? Math.round(rec.allocatedBudget * BUDGET_FLEX_FACTOR)
        : rec.allocatedBudget
      const limit = isPriority ? PRIORITY_LIMIT : NON_PRIORITY_LIMIT

      // Fetch all vendors in this city+category, already sorted by rating DESC
      const vendors = await findVendorsByCityAndCategory(city, rec.vendorCategory)

      // Filter by budget: vendor's minimum price must be within the budget ceiling
      const affordable = vendors.filter((v) => v.priceMin <= budgetCeiling)

      // Take top N
      const selected = affordable.slice(0, limit)

      logger.debug(
        {
          category: rec.vendorCategory,
          isPriority,
          budgetCeiling,
          totalVendors: vendors.length,
          affordableCount: affordable.length,
          selectedCount: selected.length,
        },
        'Vendor matching results'
      )

      return {
        category: rec.vendorCategory,
        vendors: selected.map((v) => toVendorMatch(v, isPriority)),
      }
    })

    const results = await Promise.all(matchPromises)
    for (const { category, vendors } of results) {
      result.set(category, vendors)
    }

    return result
  }
}

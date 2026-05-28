import type { Recommendation } from '@wedding/db/generated/prisma'
import type { VendorMatch } from '@wedding/types'
import { RecommendationResponseSchema, PRIORITY_TO_CATEGORIES } from '@wedding/types'
import {
  buildRecommendationPrompt,
  RecommendationPromptInput,
} from '../prompts/recommendation.prompt'
import {
  createManyRecommendations,
  findRecommendationsByIntakeId,
} from '../repositories/recommendation.repository'
import { findPaymentsByIntakeId } from '../repositories/payment.repository'
import { BudgetService, PaymentSummaryRow } from './budget.service'
import { VendorService } from './vendor.service'
import { aiProvider } from './ai'
import { logger } from '../lib/logger'
import { ApiError } from '../utils'

// Module-level singletons — shared across all requests
const budgetService = new BudgetService()
const vendorService = new VendorService()

function monthsUntil(dateStr: string): number {
  const target = new Date(dateStr)
  const now = new Date()
  return Math.max(
    0,
    (target.getFullYear() - now.getFullYear()) * 12 +
      (target.getMonth() - now.getMonth())
  )
}

/**
 * Determine which vendor category slugs are priorities based on the couple's
 * selected priority labels.
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

export interface RecommendationWithVendors {
  vendorCategory: string
  priorityRank: number
  allocatedBudget: number
  rationale: string
  isPriority: boolean
  vendors: VendorMatch[]
}

export class RecommendationService {
  /**
   * Calls Gemini with a structured responseSchema — the model is guaranteed
   * to return valid JSON matching our schema, so no retry loop is needed.
   * We still parse + validate with Zod as a safety net.
   */
  private async callAI(
    input: RecommendationPromptInput
  ): Promise<ReturnType<typeof RecommendationResponseSchema.parse>> {
    const { systemPrompt, userPrompt } = buildRecommendationPrompt(input)

    let rawResponse: string
    try {
      rawResponse = await aiProvider.recommend(systemPrompt, userPrompt)
    } catch (err) {
      logger.error({ err }, 'Gemini AI call failed')
      throw new ApiError(504, 'AI provider failed to generate recommendations. Please try again.')
    }

    let parsed: ReturnType<typeof RecommendationResponseSchema.safeParse>
    try {
      parsed = RecommendationResponseSchema.safeParse(JSON.parse(rawResponse))
    } catch {
      logger.error({ rawResponse }, 'Gemini returned invalid JSON')
      throw new ApiError(422, 'AI returned unexpected output. Please try again.')
    }

    if (!parsed.success) {
      logger.error({ issues: parsed.error.issues }, 'Gemini output failed Zod validation')
      throw new ApiError(422, 'AI recommendations did not pass validation. Please try again.')
    }

    return parsed.data
  }

  public async generateAndSave(
    intakeId: string,
    weddingDate: string,
    guestCount: number,
    city: string,
    venueType: string,
    budgetMidpoint: number,
    priorities: string[]
  ): Promise<Recommendation[]> {
    const promptInput: RecommendationPromptInput = {
      weddingDate,
      monthsAway: monthsUntil(weddingDate),
      guestCount,
      city,
      venueType,
      budgetMidpoint,
      priority1: priorities[0] ?? '',
      priority2: priorities[1] ?? '',
    }

    const aiResult = await this.callAI(promptInput)

    logger.info(
      { intakeId, count: aiResult.recommendations.length },
      'Saving Gemini recommendations to DB'
    )

    return createManyRecommendations(
      aiResult.recommendations.map((r) => ({
        intakeId,
        vendorCategory: r.vendor_category,
        priorityRank: r.priority_rank,
        allocatedBudget: r.allocated_budget,
        rationale: r.rationale,
      }))
    )
  }

  /**
   * Get recommendations with payment summary and matched vendors.
   * This powers the GET /api/recommendations/:id response.
   */
  public async getWithSummary(
    intakeId: string,
    city: string,
    priorities: string[]
  ): Promise<{
    recommendations: RecommendationWithVendors[]
    paymentSummary: PaymentSummaryRow[]
  }> {
    const [recommendations, payments] = await Promise.all([
      findRecommendationsByIntakeId(intakeId),
      findPaymentsByIntakeId(intakeId),
    ])

    // Compute payment summary (allocated vs spent vs remaining)
    const paymentSummary = budgetService.computePaymentSummary(
      recommendations,
      payments
    )

    // Match vendors to each recommendation category
    const vendorMap = await vendorService.matchVendorsToRecommendations(
      recommendations,
      priorities,
      city
    )

    // Determine which categories are priorities
    const prioritySlugs = getPriorityCategorySlugs(priorities)

    // Merge everything into the response shape
    const recsWithVendors: RecommendationWithVendors[] = recommendations.map((rec) => ({
      vendorCategory: rec.vendorCategory,
      priorityRank: rec.priorityRank,
      allocatedBudget: rec.allocatedBudget,
      rationale: rec.rationale,
      isPriority: prioritySlugs.has(rec.vendorCategory),
      vendors: vendorMap.get(rec.vendorCategory) ?? [],
    }))

    return { recommendations: recsWithVendors, paymentSummary }
  }
}

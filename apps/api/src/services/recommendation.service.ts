import type { Recommendation } from '@wedding/db/generated/prisma'
import { RecommendationResponseSchema } from '@wedding/types'
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
import { aiProvider } from './ai'
import { logger } from '../lib/logger'
import { ApiError } from '../utils'

// Module-level singleton — shared across all requests
const budgetService = new BudgetService()

function monthsUntil(dateStr: string): number {
  const target = new Date(dateStr)
  const now = new Date()
  return Math.max(
    0,
    (target.getFullYear() - now.getFullYear()) * 12 +
      (target.getMonth() - now.getMonth())
  )
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

  public async getWithSummary(intakeId: string): Promise<{
    recommendations: Recommendation[]
    paymentSummary: PaymentSummaryRow[]
  }> {
    const [recommendations, payments] = await Promise.all([
      findRecommendationsByIntakeId(intakeId),
      findPaymentsByIntakeId(intakeId),
    ])

    const paymentSummary = budgetService.computePaymentSummary(
      recommendations,
      payments
    )

    return { recommendations, paymentSummary }
  }
}

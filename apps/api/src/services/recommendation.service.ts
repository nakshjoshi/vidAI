import type { Recommendation } from '@wedding/db/generated/prisma'
import { RecommendationResponseSchema } from '@wedding/types/recommendation'
import {
  buildRecommendationPrompt,
  buildStrictRetryPrompt,
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
  private async callAIWithRetry(
    input: RecommendationPromptInput
  ): Promise<ReturnType<typeof RecommendationResponseSchema.parse>> {
    const { systemPrompt, userPrompt } = buildRecommendationPrompt(input)
    let rawResponse: string

    try {
      rawResponse = await aiProvider.recommend(systemPrompt, userPrompt)
    } catch {
      throw new ApiError(504, 'AI provider timed out or failed')
    }

    let parsed: ReturnType<typeof RecommendationResponseSchema.safeParse>

    try {
      parsed = RecommendationResponseSchema.safeParse(JSON.parse(rawResponse))
    } catch {
      throw new ApiError(422, 'AI returned invalid JSON on first attempt')
    }

    if (parsed.success) return parsed.data

    logger.warn('First AI response failed validation — retrying with strict prompt')

    const { systemPrompt: retrySystem, userPrompt: retryUser } =
      buildStrictRetryPrompt(input)

    try {
      rawResponse = await aiProvider.recommend(retrySystem, retryUser)
    } catch {
      throw new ApiError(504, 'AI provider timed out on retry')
    }

    let retryParsed: ReturnType<typeof RecommendationResponseSchema.safeParse>
    try {
      retryParsed = RecommendationResponseSchema.safeParse(JSON.parse(rawResponse))
    } catch {
      throw new ApiError(422, 'AI returned invalid JSON after retry')
    }

    if (!retryParsed.success) {
      logger.error({ issues: retryParsed.error.issues }, 'AI response invalid after retry — returning 422')
      throw new ApiError(422, 'AI failed to return valid recommendations. Please try again.')
    }

    return retryParsed.data
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

    const aiResult = await this.callAIWithRetry(promptInput)

    logger.info(
      { intakeId, count: aiResult.recommendations.length },
      'Saving AI recommendations to DB'
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

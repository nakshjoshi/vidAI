import { Request, Response } from 'express'
import { IntakeService } from '../services/intake.service'
import { RecommendationService } from '../services/recommendation.service'
import { asyncHandler, ApiResponse, ApiError } from '../utils'

const intakeService = new IntakeService()
const recommendationService = new RecommendationService()

export const getRecommendations = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const intake = await intakeService.getIntake(id)
  const { recommendations, paymentSummary } = await recommendationService.getWithSummary(id)

  if (recommendations.length === 0) {
    throw new ApiError(404, 'No recommendations found for this intake')
  }

  res.json(
    new ApiResponse(200, {
      intake: {
        weddingDate: intake.weddingDate.toISOString().split('T')[0],
        guestCount: intake.guestCount,
        city: intake.city,
        venueType: intake.venueType,
        budgetBracket: intake.budgetBracket,
        budgetMidpoint: intake.budgetMidpoint,
        priorities: intake.priorities,
      },
      recommendations: recommendations.map((r) => ({
        vendorCategory: r.vendorCategory,
        priorityRank: r.priorityRank,
        allocatedBudget: r.allocatedBudget,
        rationale: r.rationale,
      })),
      paymentSummary,
    })
  )
})

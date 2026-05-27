import { Request, Response } from 'express'
import { Intake } from '@wedding/types/intake'
import { IntakeService } from '../services/intake.service'
import { RecommendationService } from '../services/recommendation.service'
import { asyncHandler, ApiResponse } from '../utils'
import { logger } from '../lib/logger'

const intakeService = new IntakeService()
const recommendationService = new RecommendationService()

export const submitIntake = asyncHandler(async (req: Request<object, object, Intake>, res: Response) => {
  const intake = await intakeService.saveIntake(req.body)

  logger.info({ intakeId: intake.id }, 'Intake saved — calling AI')

  const recommendations = await recommendationService.generateAndSave(
    intake.id,
    intake.weddingDate.toISOString().split('T')[0]!,
    intake.guestCount,
    intake.city,
    intake.venueType,
    intake.budgetMidpoint,
    intake.priorities
  )

  res.status(201).json(
    new ApiResponse(
      201,
      {
        intakeId: intake.id,
        recommendations: recommendations.map((r) => ({
          vendorCategory: r.vendorCategory,
          priorityRank: r.priorityRank,
          allocatedBudget: r.allocatedBudget,
          rationale: r.rationale,
        })),
      },
      'Wedding plan created successfully'
    )
  )
})

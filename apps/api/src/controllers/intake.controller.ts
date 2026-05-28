import { Request, Response } from 'express'
import { Intake } from '@wedding/types'
import { IntakeService } from '../services/intake.service'
import { asyncHandler, ApiResponse } from '../utils'
import { logger } from '../lib/logger'

const intakeService = new IntakeService()

export const submitIntake = asyncHandler(async (req: Request<object, object, Intake>, res: Response) => {
  const intake = await intakeService.saveIntake(req.body)

  logger.info({ intakeId: intake.id }, 'Intake saved — ready for streaming')

  res.status(201).json(
    new ApiResponse(
      201,
      { intakeId: intake.id },
      'Wedding plan initiated'
    )
  )
})

export const getIntakesHistory = asyncHandler(async (req: Request, res: Response) => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1)
  const limit = Math.max(1, Math.min(50, parseInt(req.query.limit as string) || 10))
  
  const history = await intakeService.getHistory(page, limit)
  
  res.json(new ApiResponse(200, history, 'History retrieved'))
})


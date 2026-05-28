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


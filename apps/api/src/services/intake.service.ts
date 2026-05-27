import type { WeddingIntake } from '@wedding/db/generated/prisma'
import { Intake, BUDGET_MIDPOINTS } from '@wedding/types/intake'
import { createIntake, findIntakeById } from '../repositories/intake.repository'
import { logger } from '../lib/logger'
import { ApiError } from '../utils'

export class IntakeService {
  public async saveIntake(data: Intake): Promise<WeddingIntake> {
    const budgetMidpoint = BUDGET_MIDPOINTS[data.budgetBracket]
    if (budgetMidpoint === undefined) {
      throw new Error(`Unknown budget bracket: ${data.budgetBracket}`)
    }

    logger.info({ city: data.city, budgetBracket: data.budgetBracket }, 'Saving new intake')

    return createIntake({
      weddingDate: new Date(data.weddingDate),
      guestCount: data.guestCount,
      city: data.city,
      venueType: data.venueType,
      budgetBracket: data.budgetBracket,
      budgetMidpoint,
      priorities: data.priorities,
    })
  }

  public async getIntake(id: string): Promise<WeddingIntake> {
    const intake = await findIntakeById(id)
    if (!intake) {
      throw new ApiError(404, `Intake not found: ${id}`)
    }
    return intake
  }
}

import { Request, Response } from 'express'
import { IntakeService } from '../services/intake.service'
import { RecommendationService } from '../services/recommendation.service'
import { asyncHandler, ApiResponse, ApiError } from '../utils'
import { WEDDING_EVENTS, EVENT_VENDOR_MAP } from '@wedding/types'

const intakeService = new IntakeService()
const recommendationService = new RecommendationService()

export const getRecommendations = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const intake = await intakeService.getIntake(id)
  const { recommendations, paymentSummary } = await recommendationService.getWithSummary(
    id,
    intake.city,
    intake.priorities
  )

  if (recommendations.length === 0) {
    throw new ApiError(404, 'No recommendations found for this intake')
  }

  // Build event list with their required vendor categories
  const events = WEDDING_EVENTS.map((event) => ({
    slug: event.slug,
    name: event.name,
    type: event.type,
    description: event.description,
    displayOrder: event.displayOrder,
    vendorCategories: EVENT_VENDOR_MAP[event.slug] ?? [],
  }))

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
      recommendations,
      paymentSummary,
      events,
    })
  )
})

export const streamRecommendations = asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const intake = await intakeService.getIntake(id)

  // Set up Server-Sent Events headers
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  try {
    const stream = recommendationService.streamAndSave(
      intake.id,
      intake.weddingDate.toISOString().split('T')[0]!,
      intake.guestCount,
      intake.city,
      intake.venueType,
      intake.budgetMidpoint,
      intake.priorities
    )

    for await (const chunk of stream) {
      if (typeof chunk === 'string') {
        // Send raw JSON chunks for typing effect
        res.write(`event: chunk\ndata: ${JSON.stringify(chunk)}\n\n`)
      } else if (chunk.type === 'done') {
        // Build event list with their required vendor categories
        const events = WEDDING_EVENTS.map((event) => ({
          slug: event.slug,
          name: event.name,
          type: event.type,
          description: event.description,
          displayOrder: event.displayOrder,
          vendorCategories: EVENT_VENDOR_MAP[event.slug] ?? [],
        }))

        const finalPayload = {
          intake: {
            weddingDate: intake.weddingDate.toISOString().split('T')[0],
            guestCount: intake.guestCount,
            city: intake.city,
            venueType: intake.venueType,
            budgetBracket: intake.budgetBracket,
            budgetMidpoint: intake.budgetMidpoint,
            priorities: intake.priorities,
          },
          recommendations: chunk.data.recommendations,
          paymentSummary: chunk.data.paymentSummary,
          events,
        }

        // Send final enriched data and close stream
        res.write(`event: done\ndata: ${JSON.stringify(finalPayload)}\n\n`)
        res.end()
      }
    }
  } catch (error) {
    // If an error occurs during streaming, send an error event
    const message = error instanceof Error ? error.message : 'Unknown error during streaming'
    res.write(`event: error\ndata: ${JSON.stringify({ message })}\n\n`)
    res.end()
  }
})

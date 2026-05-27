import { z } from 'zod'

export const RecommendationItemSchema = z.object({
  vendor_category: z.string().min(1),
  priority_rank: z.number().int().min(1).max(8),
  allocated_budget: z.number().int().positive(),
  rationale: z.string().min(1),
})

export const RecommendationResponseSchema = z.object({
  recommendations: z
    .array(RecommendationItemSchema)
    .length(8, 'Must have exactly 8 recommendations'),
})

export type RecommendationItem = z.infer<typeof RecommendationItemSchema>
export type RecommendationResponse = z.infer<typeof RecommendationResponseSchema>

// Shape returned by GET /api/recommendations/:id
export const RecommendationsGetResponseSchema = z.object({
  intake: z.object({
    weddingDate: z.string(),
    guestCount: z.number(),
    city: z.string(),
    venueType: z.string(),
    budgetBracket: z.string(),
    budgetMidpoint: z.number(),
    priorities: z.array(z.string()),
  }),
  recommendations: z.array(
    z.object({
      vendorCategory: z.string(),
      priorityRank: z.number(),
      allocatedBudget: z.number(),
      rationale: z.string(),
    })
  ),
  paymentSummary: z.array(
    z.object({
      vendorCategory: z.string(),
      allocated: z.number(),
      spent: z.number(),
      remaining: z.number(),
    })
  ),
})

export type RecommendationsGetResponse = z.infer<
  typeof RecommendationsGetResponseSchema
>

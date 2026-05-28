import { z } from 'zod'

export const RecommendationItemSchema = z.object({
  vendor_category: z.string().min(1),
  priority_rank: z.number().int().min(1).max(16),
  allocated_budget: z.number().int().positive(),
  rationale: z.string().min(1),
})

export const RecommendationResponseSchema = z.object({
  recommendations: z
    .array(RecommendationItemSchema)
    .length(16, 'Must have exactly 16 recommendations'),
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
      isPriority: z.boolean(),
      vendors: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          category: z.string(),
          description: z.string(),
          priceMin: z.number(),
          priceMax: z.number(),
          rating: z.number(),
          tier: z.enum(['budget', 'mid', 'premium']),
          phone: z.string().nullable(),
          email: z.string().nullable(),
          website: z.string().nullable(),
          tags: z.array(z.string()),
          matchTag: z.enum(['Top Pick', 'Premium', 'Good Value', 'Budget Friendly']),
        })
      ),
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
  events: z.array(
    z.object({
      slug: z.string(),
      name: z.string(),
      type: z.enum(['main', 'side']),
      description: z.string(),
      displayOrder: z.number(),
      vendorCategories: z.array(z.string()),
    })
  ),
})

export type RecommendationsGetResponse = z.infer<
  typeof RecommendationsGetResponseSchema
>

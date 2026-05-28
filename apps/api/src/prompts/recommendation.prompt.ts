// Prompt builder for the Gemini recommendation call.
// NOTE: We no longer need to describe the JSON schema in the prompt text —
// Gemini's responseSchema config enforces the exact structure at the model
// level. The prompt only needs to convey the wedding context and business rules.

export interface RecommendationPromptInput {
  weddingDate: string
  monthsAway: number
  guestCount: number
  city: string
  venueType: string
  budgetMidpoint: number
  priority1: string
  priority2: string
}

export function buildRecommendationPrompt(input: RecommendationPromptInput): {
  systemPrompt: string
  userPrompt: string
} {
  const systemPrompt = `You are a senior Indian wedding planner with 15 years of experience across all major Indian cities.
Your task is to create a realistic vendor budget allocation plan for an Indian wedding.

Rules you MUST follow:
- Return EXACTLY 8 vendor recommendations.
- Priority rank 1 MUST be "${input.priority1}" and rank 2 MUST be "${input.priority2}".
- All 8 vendor categories must be distinct.
- The sum of all allocated_budget values MUST be ≤ ₹${input.budgetMidpoint.toLocaleString('en-IN')}.
- Cover these categories: photography, catering, décor, music, mehendi, invitations, bridal wear, and one city-specific vendor relevant to ${input.city}.
- Each rationale must be ≤ 25 words and be specific to ${input.city} and the couple's priorities.`

  const userPrompt = `Wedding details:
- Date: ${input.weddingDate} (${input.monthsAway} months away)
- Guests: ${input.guestCount}
- City: ${input.city}
- Venue type: ${input.venueType}
- Total budget: ₹${input.budgetMidpoint.toLocaleString('en-IN')}
- Top priorities: ${input.priority1} (rank 1), ${input.priority2} (rank 2)

Allocate the budget intelligently across 8 vendor categories based on the couple's priorities, city, guest count, and venue type.`

  return { systemPrompt, userPrompt }
}

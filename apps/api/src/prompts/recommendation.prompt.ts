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
  const systemPrompt = `You are a senior Indian wedding planner with 15 years of experience.
Return ONLY valid JSON. No markdown. No explanation. No extra text.
Budget allocations must sum to ≤ total budget.`

  const userPrompt = `Wedding details:
- Date: ${input.weddingDate} (${input.monthsAway} months away)
- Guests: ${input.guestCount}
- City: ${input.city}
- Venue: ${input.venueType}
- Total budget: ₹${input.budgetMidpoint.toLocaleString('en-IN')}
- Top priorities: ${input.priority1}, ${input.priority2}

Return exactly 8 vendor recommendations as JSON:
{
  "recommendations": [{
    "vendor_category": string,
    "priority_rank": number (1-8),
    "allocated_budget": number (₹ integer),
    "rationale": string (max 25 words, city and priority specific)
  }]
}

Rules:
- Rank 1 and 2 MUST be the couple's stated priorities (${input.priority1} and ${input.priority2})
- All 8 vendor categories must be distinct
- Allocations must sum ≤ ₹${input.budgetMidpoint.toLocaleString('en-IN')}
- Cover: photography, catering, décor, music, mehendi, invitations, bridal wear, and one city-specific vendor
- No markdown, no extra text, return only the JSON object`

  return { systemPrompt, userPrompt }
}

export function buildStrictRetryPrompt(input: RecommendationPromptInput): {
  systemPrompt: string
  userPrompt: string
} {
  const base = buildRecommendationPrompt(input)
  return {
    systemPrompt:
      base.systemPrompt +
      '\nCRITICAL: Your previous response was invalid JSON. This time you MUST return ONLY the raw JSON object, starting with { and ending with }. Absolutely no other text.',
    userPrompt: base.userPrompt,
  }
}

// Prompt builder for the Gemini recommendation call.
// Gemini's responseSchema enforces the exact JSON structure at the model level.
// The prompt conveys the wedding context, business rules, and all 16 vendor categories.

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

// All 16 vendor categories the AI must allocate budget for.
const VENDOR_CATEGORIES = [
  'venue',
  'photography',
  'videography',
  'catering',
  'decor',
  'music_dj',
  'mehendi_artist',
  'choreographer',
  'pandit',
  'makeup_beauty',
  'bridal_wear',
  'groom_wear',
  'florist',
  'lighting',
  'bartender',
  'invitations',
]

// Maps user-facing priority labels to the vendor category slugs the AI should rank highest.
const PRIORITY_CATEGORY_MAP: Record<string, string[]> = {
  Photography:   ['photography', 'videography'],
  Food:          ['catering'],
  'Décor':       ['decor', 'florist', 'lighting'],
  Music:         ['music_dj', 'choreographer'],
  Makeup:        ['makeup_beauty'],
  Venue:         ['venue'],
  Entertainment: ['music_dj', 'choreographer', 'bartender'],
  Mehendi:       ['mehendi_artist'],
}

function getPriorityCategories(priority: string): string[] {
  return PRIORITY_CATEGORY_MAP[priority] ?? [priority.toLowerCase()]
}

export function buildRecommendationPrompt(input: RecommendationPromptInput): {
  systemPrompt: string
  userPrompt: string
} {
  const p1Categories = getPriorityCategories(input.priority1)
  const p2Categories = getPriorityCategories(input.priority2)
  const allPrioritySlugs = [...new Set([...p1Categories, ...p2Categories])]

  const systemPrompt = `You are a senior Indian wedding planner with 15 years of experience across all major Indian cities.
Your task is to create a realistic vendor budget allocation plan for an Indian wedding.

Rules you MUST follow:
- Return EXACTLY 16 vendor recommendations — one for each of these categories: ${VENDOR_CATEGORIES.join(', ')}.
- Use these exact category slugs as vendor_category values. Do not rename or merge them.
- The couple's top priorities are "${input.priority1}" and "${input.priority2}".
  - Priority categories (${allPrioritySlugs.join(', ')}) should get the HIGHEST priority_rank values (1, 2, 3...) and proportionally MORE budget.
  - Non-priority categories should get lower ranks and proportionally less budget.
  - BUT be realistic: even if "Makeup" is a priority, a makeup artist in ${input.city} costs at most ₹1-2.5L. Don't over-allocate to low-cost categories.
- All 16 vendor categories must be distinct.
- priority_rank must be unique integers from 1 to 16.
- The sum of all allocated_budget values MUST be ≤ ₹${input.budgetMidpoint.toLocaleString('en-IN')}.
- Each rationale must be ≤ 25 words and be specific to ${input.city} and the couple's priorities.
- Allocate budgets that reflect realistic ${input.city} market rates for ${input.guestCount} guests.`

  const userPrompt = `Wedding details:
- Date: ${input.weddingDate} (${input.monthsAway} months away)
- Guests: ${input.guestCount}
- City: ${input.city}
- Venue type: ${input.venueType}
- Total budget: ₹${input.budgetMidpoint.toLocaleString('en-IN')}
- Top priorities: ${input.priority1} (covers: ${p1Categories.join(', ')}), ${input.priority2} (covers: ${p2Categories.join(', ')})

Allocate the budget intelligently across all 16 vendor categories. Give more to the couple's priorities but stay realistic with ${input.city} market pricing for ${input.guestCount} guests.`

  return { systemPrompt, userPrompt }
}

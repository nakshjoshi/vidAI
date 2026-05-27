import { z } from 'zod'

export const IntakeSchema = z.object({
  weddingDate: z.string().min(1, 'Wedding date is required'),
  guestCount: z
    .number({ invalid_type_error: 'Guest count must be a number' })
    .int()
    .min(10, 'Minimum 10 guests')
    .max(5000, 'Maximum 5000 guests'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  venueType: z.enum(
    ['banquet_hall', 'farmhouse', 'destination', 'hotel', 'outdoor', 'temple'],
    { errorMap: () => ({ message: 'Select a valid venue type' }) }
  ),
  budgetBracket: z.enum(
    ['under_10L', '10L-20L', '20L-40L', '40L-60L', 'above_60L'],
    { errorMap: () => ({ message: 'Select a valid budget bracket' }) }
  ),
  priorities: z
    .array(z.string())
    .min(2, 'Select exactly 2 priorities')
    .max(2, 'Select exactly 2 priorities'),
})

export type Intake = z.infer<typeof IntakeSchema>

// Budget bracket to midpoint mapping (in rupees)
export const BUDGET_MIDPOINTS: Record<string, number> = {
  under_10L: 700000,
  '10L-20L': 1500000,
  '20L-40L': 3000000,
  '40L-60L': 5000000,
  above_60L: 8000000,
}

export const VENUE_TYPE_LABELS: Record<string, string> = {
  banquet_hall: 'Banquet Hall',
  farmhouse: 'Farmhouse',
  destination: 'Destination',
  hotel: 'Hotel',
  outdoor: 'Outdoor',
  temple: 'Temple',
}

export const BUDGET_BRACKET_LABELS: Record<string, string> = {
  under_10L: 'Under ₹10L',
  '10L-20L': '₹10L – ₹20L',
  '20L-40L': '₹20L – ₹40L',
  '40L-60L': '₹40L – ₹60L',
  above_60L: 'Above ₹60L',
}

export const PRIORITY_OPTIONS = [
  'Photography',
  'Food',
  'Décor',
  'Music',
  'Makeup',
  'Venue',
  'Entertainment',
  'Mehendi',
] as const

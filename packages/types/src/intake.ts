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
    ['under_10L', '10L-15L', '15L-20L', '20L-30L', '30L-40L', '40L-50L', '50L-75L', 'above_75L'],
    { errorMap: () => ({ message: 'Select a valid budget bracket' }) }
  ),
  priorities: z
    .array(z.string())
    .min(2, 'Select exactly 2 priorities')
    .max(2, 'Select exactly 2 priorities'),
})

export type Intake = z.infer<typeof IntakeSchema>

// Budget bracket to midpoint mapping (in rupees)
// Each bracket is ≤ ₹15L wide so the midpoint is never more than ₹7.5L off.
export const BUDGET_MIDPOINTS: Record<string, number> = {
  under_10L:  700000,   // ₹7L midpoint
  '10L-15L':  1250000,  // ₹12.5L midpoint
  '15L-20L':  1750000,  // ₹17.5L midpoint
  '20L-30L':  2500000,  // ₹25L midpoint
  '30L-40L':  3500000,  // ₹35L midpoint
  '40L-50L':  4500000,  // ₹45L midpoint
  '50L-75L':  6250000,  // ₹62.5L midpoint
  above_75L:  10000000, // ₹1Cr midpoint
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
  under_10L:  'Under ₹10L',
  '10L-15L':  '₹10L – ₹15L',
  '15L-20L':  '₹15L – ₹20L',
  '20L-30L':  '₹20L – ₹30L',
  '30L-40L':  '₹30L – ₹40L',
  '40L-50L':  '₹40L – ₹50L',
  '50L-75L':  '₹50L – ₹75L',
  above_75L:  'Above ₹75L',
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

// Vendor types — used in the API response when returning matched vendors
// alongside AI recommendations.

export type VendorTier = 'budget' | 'mid' | 'premium'
export type VendorMatchTag = 'Top Pick' | 'Premium' | 'Good Value' | 'Budget Friendly'

/**
 * A vendor record as stored in the DB.
 */
export interface VendorRecord {
  id: string
  name: string
  category: string
  city: string
  description: string
  priceMin: number
  priceMax: number
  rating: number
  tier: VendorTier
  phone: string | null
  email: string | null
  website: string | null
  coverImageUrl: string | null
  tags: string[]
}

/**
 * A vendor match returned in the recommendation response.
 * Extends VendorRecord with a matchTag indicating why this vendor was selected.
 */
export interface VendorMatch extends Omit<VendorRecord, 'city' | 'coverImageUrl'> {
  matchTag: VendorMatchTag
}

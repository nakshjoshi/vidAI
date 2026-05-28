// ─── Wedding Events ─────────────────────────────────────────────
// Static definitions — not DB tables. These never change at runtime.

export type EventType = 'main' | 'side'

export interface WeddingEvent {
  slug: string
  name: string
  type: EventType
  description: string
  displayOrder: number
}

export const WEDDING_EVENTS: WeddingEvent[] = [
  // Main events (always present)
  { slug: 'engagement',        name: 'Engagement / Ring Ceremony', type: 'main', description: 'The couple exchanges rings and formally announces their upcoming wedding.',          displayOrder: 4 },
  { slug: 'mehendi',           name: 'Mehendi',                    type: 'main', description: 'Intricate henna designs are applied to the bride and guests in a festive gathering.',  displayOrder: 6 },
  { slug: 'haldi',             name: 'Haldi',                      type: 'main', description: 'Turmeric paste is applied to the couple for blessings and radiant skin.',               displayOrder: 8 },
  { slug: 'sangeet',           name: 'Sangeet',                    type: 'main', description: 'A lively evening of music, dance performances, and celebration.',                       displayOrder: 7 },
  { slug: 'wedding_ceremony',  name: 'Wedding Ceremony',           type: 'main', description: 'The sacred ceremony — pheras, vows, and the main wedding rituals.',                    displayOrder: 9 },
  { slug: 'reception',         name: 'Reception',                  type: 'main', description: 'A grand celebration to welcome the newlyweds with dinner, music, and festivities.',     displayOrder: 11 },

  // Side events (common but optional)
  { slug: 'cocktail_party',    name: 'Cocktail Party',             type: 'side', description: 'An elegant evening of cocktails, conversations, and light entertainment.',              displayOrder: 5 },
  { slug: 'pre_wedding_shoot', name: 'Pre-Wedding Photoshoot',     type: 'side', description: 'A styled photo session capturing the couple before the wedding day.',                  displayOrder: 1 },
  { slug: 'welcome_dinner',    name: 'Welcome Dinner',             type: 'side', description: 'A warm dinner to welcome out-of-town guests, especially at destination weddings.',      displayOrder: 3 },
  { slug: 'vidaai',            name: 'Vidaai',                     type: 'side', description: 'The emotional farewell ceremony as the bride leaves her parental home.',                displayOrder: 10 },
  { slug: 'pooja',             name: 'Pooja / Religious Ceremony', type: 'side', description: 'Prayers and rituals performed at a temple or home before the wedding.',                displayOrder: 2 },
  { slug: 'after_party',       name: 'After Party',                type: 'side', description: 'A late-night celebration after the reception with music and dancing.',                  displayOrder: 12 },
]

// ─── Vendor Categories ──────────────────────────────────────────

export interface VendorCategory {
  slug: string
  name: string
}

export const VENDOR_CATEGORIES: VendorCategory[] = [
  { slug: 'venue',          name: 'Venue' },
  { slug: 'photography',    name: 'Photography' },
  { slug: 'videography',    name: 'Videography' },
  { slug: 'catering',       name: 'Catering' },
  { slug: 'decor',          name: 'Décor' },
  { slug: 'music_dj',       name: 'Music / DJ' },
  { slug: 'mehendi_artist',  name: 'Mehendi Artist' },
  { slug: 'choreographer',  name: 'Choreographer' },
  { slug: 'pandit',         name: 'Pandit / Officiant' },
  { slug: 'makeup_beauty',  name: 'Makeup & Beauty' },
  { slug: 'bridal_wear',    name: 'Bridal Wear' },
  { slug: 'groom_wear',     name: 'Groom Wear' },
  { slug: 'florist',        name: 'Florist' },
  { slug: 'lighting',       name: 'Lighting' },
  { slug: 'bartender',      name: 'Bartender / Mixologist' },
  { slug: 'invitations',    name: 'Invitations & Stationery' },
]

// All valid vendor category slugs
export const VENDOR_CATEGORY_SLUGS = VENDOR_CATEGORIES.map((c) => c.slug)

// ─── Event → Vendor Category Mapping ────────────────────────────
// Which vendor categories are needed for each event.

export const EVENT_VENDOR_MAP: Record<string, string[]> = {
  engagement:        ['venue', 'photography', 'catering', 'decor', 'music_dj'],
  mehendi:           ['mehendi_artist', 'photography', 'decor', 'catering'],
  haldi:             ['photography', 'decor', 'catering'],
  sangeet:           ['venue', 'music_dj', 'choreographer', 'photography', 'catering', 'decor'],
  wedding_ceremony:  ['venue', 'photography', 'videography', 'decor', 'pandit', 'catering', 'makeup_beauty', 'bridal_wear', 'groom_wear', 'florist'],
  reception:         ['venue', 'catering', 'photography', 'music_dj', 'decor', 'lighting'],
  cocktail_party:    ['venue', 'bartender', 'music_dj', 'catering'],
  pre_wedding_shoot: ['photography', 'makeup_beauty'],
  welcome_dinner:    ['venue', 'catering', 'decor'],
  vidaai:            ['photography', 'decor'],
  pooja:             ['pandit', 'decor', 'florist'],
  after_party:       ['venue', 'music_dj', 'lighting'],
}

// ─── Priority → Vendor Category Mapping ─────────────────────────
// Maps user-facing priority labels to the vendor category slugs they influence.
// When a couple picks "Photography" as a priority, both photography and videography
// vendors get the premium matching treatment.

export const PRIORITY_TO_CATEGORIES: Record<string, string[]> = {
  Photography:   ['photography', 'videography'],
  Food:          ['catering'],
  'Décor':       ['decor', 'florist', 'lighting'],
  Music:         ['music_dj', 'choreographer'],
  Makeup:        ['makeup_beauty'],
  Venue:         ['venue'],
  Entertainment: ['music_dj', 'choreographer', 'bartender'],
  Mehendi:       ['mehendi_artist'],
}

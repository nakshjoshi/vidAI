// Seed script — Inserts ~70 realistic Rishikesh vendors into the vendors table.
// Run from monorepo root: pnpm --filter @wedding/api exec tsx src/scripts/seed-vendors.ts

import { config } from 'dotenv'
import { resolve } from 'path'

// Load DATABASE_URL from packages/db/.env BEFORE importing prisma
config({ path: resolve(__dirname, '../../../../packages/db/.env') })

interface VendorSeed {
  name: string; category: string; city: string; description: string;
  priceMin: number; priceMax: number; rating: number; tier: string;
  phone: string | null; email: string | null; website: string | null;
  tags: string[];
}

const CITY = 'Rishikesh'

function v(name: string, category: string, desc: string, priceMin: number, priceMax: number, rating: number, tier: string, phone: string, email: string, tags: string[]): VendorSeed {
  return { name, category, city: CITY, description: desc, priceMin, priceMax, rating, tier, phone, email, website: null, tags }
}

const vendors: VendorSeed[] = [
  // ── Venue (5) ──
  v('Aloha on the Ganges',       'venue', 'Luxury riverside resort with stunning Ganga views, manicured gardens, and banquet halls for 500+ guests.', 800000, 2500000, 4.8, 'premium', '+91-135-243-1000', 'events@alohaganga.com', ['riverside', 'luxury', 'destination']),
  v('Taj Rishikesh Resort & Spa','venue', 'Five-star wilderness retreat with panoramic Himalayan views and world-class event spaces.',                1200000, 3500000, 4.9, 'premium', '+91-135-266-1000', 'rishikesh@tajhotels.com', ['luxury', '5-star', 'spa']),
  v('The Glasshouse on the Ganges','venue','Heritage boutique property on the riverbank with colonial charm and intimate garden settings.',            500000, 1500000, 4.6, 'premium', '+91-135-243-5100', 'stay@glasshouse.in', ['heritage', 'boutique', 'riverside']),
  v('Ganga Kinare Hotel',         'venue', 'Affordable riverside hotel with event lawns and Ganga-facing terraces for mid-size weddings.',              200000,  800000, 4.2, 'mid',     '+91-135-244-3243', 'info@gangakinare.com', ['riverside', 'mid-range', 'terrace']),
  v('Divine Resort Rishikesh',    'venue', 'Budget-friendly resort near Ram Jhula with functional banquet halls and outdoor spaces.',                   100000,  400000, 3.5, 'budget',  '+91-135-244-0099', 'book@divineresort.in', ['budget', 'ram-jhula', 'outdoor']),

  // ── Photography (5) ──
  v('Shutter Stories Rishikesh',   'photography', 'Award-winning wedding photography with cinematic storytelling and drone shots over the Ganges.',     200000, 500000, 4.9, 'premium', '+91-98765-10001', 'hello@shutterstories.in', ['cinematic', 'drone', 'destination']),
  v('Mountain Light Photography',  'photography', 'Natural-light specialist capturing candid moments against Himalayan backdrops.',                     150000, 350000, 4.6, 'premium', '+91-98765-10002', 'info@mountainlight.in', ['candid', 'natural-light', 'mountains']),
  v('Valley Clicks Studio',       'photography', 'Versatile wedding photographer covering traditional and modern styles at competitive rates.',        80000, 200000, 4.2, 'mid',     '+91-98765-10003', 'book@valleyclicks.in', ['traditional', 'modern', 'affordable']),
  v('Sacred Lens Photography',    'photography', 'Spiritual-themed wedding photography blending rituals with artistic composition.',                    60000, 150000, 3.9, 'mid',     '+91-98765-10004', 'sacredlens@gmail.com', ['spiritual', 'rituals', 'artistic']),
  v('Ganga Frame Studios',        'photography', 'Budget photography packages with basic coverage of ceremonies and group photos.',                     30000,  80000, 3.3, 'budget',  '+91-98765-10005', 'gangaframe@gmail.com', ['budget', 'basic', 'group-photos']),

  // ── Videography (4) ──
  v('CineMagic Films',            'videography', 'Cinematic wedding films with aerial drone footage, same-day edits, and multi-camera coverage.',      200000, 450000, 4.8, 'premium', '+91-98765-20001', 'hello@cinemagic.in', ['cinematic', 'drone', 'same-day-edit']),
  v('Rishikesh Wedding Films',    'videography', 'Professional videography with highlight reels and full ceremony documentation.',                     100000, 250000, 4.3, 'mid',     '+91-98765-20002', 'info@rkshwedfilms.in', ['highlight-reel', 'professional']),
  v('Sacred Stories Productions', 'videography', 'Story-driven wedding documentaries with spiritual and emotional narratives.',                         80000, 180000, 4.0, 'mid',     '+91-98765-20003', 'sacred.stories@gmail.com', ['documentary', 'narrative']),
  v('Valley Vision Media',       'videography', 'Affordable video coverage with basic editing and ceremony highlights.',                                40000, 100000, 3.4, 'budget',  '+91-98765-20004', 'valleyvision@gmail.com', ['budget', 'basic']),

  // ── Catering (5) ──
  v('Rishikesh Rasoi Caterers',  'catering', 'Premium vegetarian and Sattvic catering with live counters, regional specialties, and custom menus.',   400000, 1200000, 4.8, 'premium', '+91-98765-30001', 'orders@rishikeshrasoi.in', ['veg', 'sattvic', 'live-counters']),
  v('Holy Feast Caterers',       'catering', 'Multi-cuisine catering specializing in North Indian, Rajasthani, and Pahadi cuisine for large weddings.',300000,  900000, 4.5, 'premium', '+91-98765-30002', 'holyfeast@gmail.com', ['multi-cuisine', 'north-indian', 'large-events']),
  v('Ganga View Kitchen',        'catering', 'Mid-range catering with diverse menu options and professional service for 100-400 guests.',              150000,  500000, 4.1, 'mid',     '+91-98765-30003', 'gangaviewkitchen@gmail.com', ['mid-range', 'diverse', 'professional']),
  v('Mountain Spice Catering',   'catering', 'Pahadi cuisine specialist offering authentic Uttarakhandi flavors with modern presentation.',            100000,  350000, 3.8, 'mid',     '+91-98765-30004', 'mountainspice@gmail.com', ['pahadi', 'authentic', 'local']),
  v('Annapurna Budget Caterers', 'catering', 'Affordable vegetarian catering with simple thali-style service for smaller gatherings.',                  50000,  150000, 3.3, 'budget',  '+91-98765-30005', 'annapurna.catering@gmail.com', ['budget', 'veg', 'thali']),

  // ── Décor (5) ──
  v('Ganga Décor Studio',        'decor', 'Luxury floral and fabric décor with riverside mandap setups, fairy lights, and bespoke installations.',    300000,  800000, 4.7, 'premium', '+91-98765-40001', 'hello@gangadecor.in', ['luxury', 'floral', 'mandap']),
  v('Valley Bloom Decorators',   'decor', 'Nature-inspired décor using local flowers, sustainable materials, and Himalayan aesthetics.',               150000,  450000, 4.4, 'mid',     '+91-98765-40002', 'valleybloom@gmail.com', ['eco-friendly', 'local-flowers', 'sustainable']),
  v('Shubh Aarambh Events',      'decor', 'Traditional Indian wedding décor with marigold themes, torans, and classic mandap designs.',                100000,  300000, 4.1, 'mid',     '+91-98765-40003', 'shubhaarambh@gmail.com', ['traditional', 'marigold', 'classic']),
  v('Rishikesh Event Décor',     'decor', 'Full-service event decoration covering stages, entrances, table settings, and photo backdrops.',             80000,  200000, 3.7, 'mid',     '+91-98765-40004', 'rkeventdecor@gmail.com', ['full-service', 'stages', 'backdrops']),
  v('Simple Celebrations',       'decor', 'Budget-friendly décor with basic flower arrangements and fabric draping.',                                   30000,  100000, 3.2, 'budget',  '+91-98765-40005', 'simplecelebrations@gmail.com', ['budget', 'basic', 'simple']),

  // ── Music / DJ (4) ──
  v('DJ Himalaya',               'music_dj', 'High-energy DJ with professional sound and lighting rig, Bollywood + EDM mashups, and live MC.',        150000,  350000, 4.7, 'premium', '+91-98765-50001', 'djhimalaya@gmail.com', ['bollywood', 'edm', 'live-mc']),
  v('Ganga Beats Entertainment', 'music_dj', 'Live band + DJ combo specializing in Sangeet nights with dhol players and folk musicians.',              80000,  200000, 4.3, 'mid',     '+91-98765-50002', 'gangabeats@gmail.com', ['live-band', 'dhol', 'folk']),
  v('Sacred Sounds Music',       'music_dj', 'Acoustic and semi-acoustic performances perfect for intimate Mehendi and Haldi ceremonies.',              50000,  120000, 3.9, 'mid',     '+91-98765-50003', 'sacredsounds@gmail.com', ['acoustic', 'intimate', 'mehendi']),
  v('Valley Groove DJ',          'music_dj', 'Budget DJ services with basic sound setup for receptions and after parties.',                              25000,   70000, 3.3, 'budget',  '+91-98765-50004', 'valleygroove@gmail.com', ['budget', 'basic-setup']),

  // ── Mehendi Artist (4) ──
  v('Henna by Priya',            'mehendi_artist', 'Celebrity mehendi artist known for intricate bridal designs and Rajasthani patterns.',               50000,  120000, 4.8, 'premium', '+91-98765-60001', 'hennabypriya@gmail.com', ['bridal', 'rajasthani', 'celebrity']),
  v('Rishikesh Mehendi Arts',    'mehendi_artist', 'Experienced team offering Arabic, Indian, and fusion mehendi for bridal parties up to 50 guests.',   25000,   60000, 4.3, 'mid',     '+91-98765-60002', 'rkmehendi@gmail.com', ['arabic', 'fusion', 'team']),
  v('Sacred Henna Studio',       'mehendi_artist', 'Organic henna specialist using natural dyes with spiritual and mandala designs.',                    15000,   40000, 3.8, 'mid',     '+91-98765-60003', 'sacredhenna@gmail.com', ['organic', 'mandala', 'natural']),
  v('Ganga Mehendi',             'mehendi_artist', 'Affordable mehendi services for small to mid-size bridal parties.',                                  8000,   25000, 3.2, 'budget',  '+91-98765-60004', 'gangamehendi@gmail.com', ['budget', 'small-party']),

  // ── Choreographer (4) ──
  v('Bollywood Steps Academy',   'choreographer', 'Professional Sangeet choreography with group routines, couple dances, and flash mob planning.',      80000,  200000, 4.7, 'premium', '+91-98765-70001', 'bollywoodsteps@gmail.com', ['sangeet', 'group', 'flash-mob']),
  v('Dance Valley Rishikesh',    'choreographer', 'Fun and energetic choreography for Sangeet with mix of Bollywood, folk, and contemporary styles.',    40000,  100000, 4.2, 'mid',     '+91-98765-70002', 'dancevalley@gmail.com', ['bollywood', 'folk', 'contemporary']),
  v('Rhythm & Grace Choreography','choreographer','Elegant couple choreography and family group dances with patient teaching style.',                    25000,   60000, 3.8, 'mid',     '+91-98765-70003', 'rhythmgrace@gmail.com', ['couple-dance', 'family', 'patient']),
  v('Step Up Dance Studio',      'choreographer', 'Budget-friendly basic Sangeet choreography for small family groups.',                                 10000,   30000, 3.3, 'budget',  '+91-98765-70004', 'stepup.rksh@gmail.com', ['budget', 'basic', 'small-group']),

  // ── Pandit / Officiant (4) ──
  v('Pandit Shri Devendra Shastri','pandit', 'Highly respected Vedic pandit performing traditional Hindu ceremonies with detailed rituals explanation.',  30000,   80000, 4.9, 'premium', '+91-98765-80001', 'devendra.shastri@gmail.com', ['vedic', 'traditional', 'experienced']),
  v('Ganga Puja Services',         'pandit', 'Team of pandits offering comprehensive wedding puja packages including Ganga aarti and havan.',             20000,   50000, 4.4, 'mid',     '+91-98765-80002', 'gangapuja@gmail.com', ['ganga-aarti', 'havan', 'team']),
  v('Rishikesh Sacred Rituals',    'pandit', 'Modern pandits who conduct ceremonies in Hindi and English with concise explanations for guests.',          15000,   35000, 4.0, 'mid',     '+91-98765-80003', 'sacredrituals@gmail.com', ['bilingual', 'modern', 'concise']),
  v('Parmarth Niketan Priests',    'pandit', 'Temple-affiliated pandits performing traditional ceremonies at the famous Parmarth Niketan ashram.',        8000,   20000, 3.6, 'budget',  '+91-98765-80004', 'parmarth.priests@gmail.com', ['ashram', 'temple', 'traditional']),

  // ── Makeup & Beauty (5) ──
  v('Glamour Studio Rishikesh',   'makeup_beauty', 'Celebrity-endorsed bridal makeup with HD airbrush techniques and luxury product range.',             100000, 250000, 4.8, 'premium', '+91-98765-90001', 'glamourstudio@gmail.com', ['airbrush', 'hd', 'celebrity']),
  v('Bridal Glow by Neha',        'makeup_beauty', 'Specialist bridal makeup artist with natural-glow finishes and draping expertise.',                   60000, 150000, 4.5, 'premium', '+91-98765-90002', 'bridalglow.neha@gmail.com', ['natural-glow', 'draping', 'bridal']),
  v('Aura Makeup Academy',        'makeup_beauty', 'Professional makeup for bride and bridal party with pre-wedding skincare consultations.',             35000,  90000, 4.1, 'mid',     '+91-98765-90003', 'auramakeup@gmail.com', ['bridal-party', 'skincare', 'professional']),
  v('Divine Beauty Parlour',       'makeup_beauty', 'All-in-one beauty services including makeup, hair styling, and mehendi touch-ups.',                   20000,  50000, 3.6, 'mid',     '+91-98765-90004', 'divinebeauty@gmail.com', ['all-in-one', 'hair', 'touch-ups']),
  v('Sita Beauty Studio',         'makeup_beauty', 'Budget bridal makeup with basic products and simple elegant looks.',                                   10000,  30000, 3.2, 'budget',  '+91-98765-90005', 'sitabeauty@gmail.com', ['budget', 'simple', 'elegant']),

  // ── Bridal Wear (4) ──
  v('Rishikesh Bridal Couture',    'bridal_wear', 'Designer lehengas and bridal sarees with custom embroidery and fittings.',                            200000, 500000, 4.7, 'premium', '+91-98765-11001', 'bridalcouture@gmail.com', ['designer', 'custom', 'lehenga']),
  v('Ganga Silk House',            'bridal_wear', 'Wide range of Banarasi, Kanjeevaram, and Paithani sarees alongside bridal lehengas.',                  80000, 250000, 4.3, 'mid',     '+91-98765-11002', 'gangasilk@gmail.com', ['banarasi', 'sarees', 'variety']),
  v('Valley Fashion Boutique',    'bridal_wear', 'Trendy Indo-Western bridal outfits and fusion wear at moderate prices.',                                40000, 120000, 3.8, 'mid',     '+91-98765-11003', 'valleyfashion@gmail.com', ['indo-western', 'fusion', 'trendy']),
  v('Shubh Vastra',               'bridal_wear', 'Affordable bridal lehengas with rental options for budget-conscious brides.',                           15000,  60000, 3.3, 'budget',  '+91-98765-11004', 'shubhvastra@gmail.com', ['budget', 'rental', 'affordable']),

  // ── Groom Wear (4) ──
  v('Royal Sherwani House',       'groom_wear', 'Premium sherwanis, Indo-Western suits, and custom-tailored groom outfits.',                             80000, 200000, 4.6, 'premium', '+91-98765-12001', 'royalsherwani@gmail.com', ['sherwani', 'custom', 'premium']),
  v('Dapper Groom Rishikesh',     'groom_wear', 'Modern groom styling with designer kurtas, Nehru jackets, and accessories.',                            40000, 100000, 4.2, 'mid',     '+91-98765-12002', 'dappergroom@gmail.com', ['modern', 'kurta', 'nehru-jacket']),
  v('Valley Menswear',            'groom_wear', 'Ready-to-wear and semi-custom groom outfits for all wedding events.',                                    20000,  60000, 3.7, 'mid',     '+91-98765-12003', 'valleymenswear@gmail.com', ['ready-to-wear', 'semi-custom']),
  v('Budget Groom Collection',    'groom_wear', 'Affordable groom outfits with rental sherwanis and basic kurta sets.',                                   8000,  25000, 3.1, 'budget',  '+91-98765-12004', 'budgetgroom@gmail.com', ['budget', 'rental', 'basic']),

  // ── Florist (4) ──
  v('Pushp Vatika Florists',      'florist', 'Premium floral arrangements with exotic and seasonal flowers, mandap decoration, and bouquets.',          100000, 300000, 4.7, 'premium', '+91-98765-13001', 'pushpvatika@gmail.com', ['exotic', 'mandap', 'bouquets']),
  v('Ganga Phool Decorators',     'florist', 'Fresh flower specialists using local Uttarakhandi flowers with eco-friendly arrangements.',                 50000, 150000, 4.2, 'mid',     '+91-98765-13002', 'gangaphool@gmail.com', ['local-flowers', 'eco-friendly']),
  v('Valley Petals',              'florist', 'Standard floral services for ceremonies including garlands, centrepieces, and car decoration.',              25000,  80000, 3.7, 'mid',     '+91-98765-13003', 'valleypetals@gmail.com', ['garlands', 'centrepieces', 'car-decor']),
  v('Simple Blooms',              'florist', 'Budget-friendly marigold and jasmine arrangements for traditional ceremonies.',                              10000,  35000, 3.2, 'budget',  '+91-98765-13004', 'simpleblooms@gmail.com', ['budget', 'marigold', 'jasmine']),

  // ── Lighting (4) ──
  v('Luminaire Events',           'lighting', 'Premium LED and fairy light installations with programmable color themes and dance floor lighting.',       100000, 300000, 4.6, 'premium', '+91-98765-14001', 'luminaire@gmail.com', ['led', 'programmable', 'dance-floor']),
  v('Ganga Lights & Sound',       'lighting', 'Professional lighting rigs with stage spotlights, ambient up-lighting, and sound systems.',                50000, 150000, 4.1, 'mid',     '+91-98765-14002', 'gangalights@gmail.com', ['stage', 'ambient', 'sound']),
  v('Bright Valley Solutions',    'lighting', 'Standard wedding lighting packages including fairy lights, gate illumination, and path lights.',           25000,  80000, 3.6, 'mid',     '+91-98765-14003', 'brightvalley@gmail.com', ['fairy-lights', 'gate', 'path']),
  v('Quick Lights Rishikesh',     'lighting', 'Basic lighting setup for small venues and intimate ceremonies.',                                            10000,  30000, 3.1, 'budget',  '+91-98765-14004', 'quicklights@gmail.com', ['budget', 'basic', 'small-venue']),

  // ── Bartender / Mixologist (3) ──
  v('Himalayan Mixology Co.',     'bartender', 'Premium craft cocktail service with custom wedding menus, molecular mixology, and flair bartending.',     80000, 200000, 4.7, 'premium', '+91-98765-15001', 'himalayanmix@gmail.com', ['craft', 'molecular', 'flair']),
  v('Cheers Bartending Services', 'bartender', 'Professional bar setup with classic cocktails, mocktails, and trained bartenders.',                       40000, 100000, 4.1, 'mid',     '+91-98765-15002', 'cheersbar@gmail.com', ['classic', 'mocktails', 'professional']),
  v('Party Pour Rishikesh',       'bartender', 'Budget bar services with standard drink menu and basic bar setup.',                                       15000,  40000, 3.4, 'budget',  '+91-98765-15003', 'partypour@gmail.com', ['budget', 'standard', 'basic']),

  // ── Invitations & Stationery (3) ──
  v('Paper Trail Invitations',    'invitations', 'Luxury handcrafted wedding cards with custom calligraphy, wax seals, and box invitations.',              50000, 150000, 4.6, 'premium', '+91-98765-16001', 'papertrail@gmail.com', ['handcrafted', 'calligraphy', 'box']),
  v('Digital Shaadi Invites',     'invitations', 'Modern digital and printed invitation designs with WhatsApp-ready e-invites and RSVP tracking.',         15000,  50000, 4.1, 'mid',     '+91-98765-16002', 'digitalshaadi@gmail.com', ['digital', 'e-invite', 'rsvp']),
  v('Simple Cards Rishikesh',     'invitations', 'Affordable printed wedding cards with standard designs and bulk pricing.',                                5000,  20000, 3.3, 'budget',  '+91-98765-16003', 'simplecards@gmail.com', ['budget', 'printed', 'bulk']),
]

async function main() {
  // Dynamic import so prisma reads DATABASE_URL after dotenv has loaded it
  const { prisma } = await import('@wedding/db')

  console.log('🌱 Seeding vendors...')
  console.log(`   City: ${CITY}`)
  console.log(`   Total vendors: ${vendors.length}`)

  // Clear existing vendors for idempotent re-runs
  const deleted = await prisma.vendor.deleteMany({ where: { city: CITY } })
  console.log(`   Cleared ${deleted.count} existing vendors`)

  // Insert all vendors
  const created = await prisma.vendor.createMany({ data: vendors })
  console.log(`   ✅ Inserted ${created.count} vendors`)

  // Summary by category
  const byCat = vendors.reduce<Record<string, number>>((acc, v) => {
    acc[v.category] = (acc[v.category] ?? 0) + 1
    return acc
  }, {})
  console.log('\n   Category breakdown:')
  for (const [cat, count] of Object.entries(byCat).sort()) {
    console.log(`     ${cat}: ${count} vendors`)
  }

  await prisma.$disconnect()
  console.log('\n🎉 Done!')
}

main().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})


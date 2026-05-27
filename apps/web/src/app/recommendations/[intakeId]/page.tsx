'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Camera,
  Utensils,
  Sparkles,
  Music,
  Heart,
  Mail,
  Shirt,
  MapPin,
  Users,
  Calendar,
  IndianRupee,
  ChevronRight,
  AlertTriangle,
  Loader2,
  Star,
  Trophy,
  Palette,
} from 'lucide-react'
import { RecommendationsGetResponse } from '@wedding/types/recommendation'
import { VENUE_TYPE_LABELS, BUDGET_BRACKET_LABELS } from '@wedding/types/intake'

const VENDOR_ICONS: Record<string, React.ElementType> = {
  photography: Camera,
  catering: Utensils,
  'food & catering': Utensils,
  décor: Palette,
  decor: Palette,
  music: Music,
  mehendi: Heart,
  invitations: Mail,
  'bridal wear': Shirt,
  venue: MapPin,
}

function getVendorIcon(category: string): React.ElementType {
  const lower = category.toLowerCase()
  for (const [key, Icon] of Object.entries(VENDOR_ICONS)) {
    if (lower.includes(key)) return Icon
  }
  return Sparkles
}

function getRankBadgeClass(rank: number): string {
  if (rank === 1) return 'bg-gold-100 text-gold-700 border border-gold-200'
  if (rank === 2) return 'bg-brand-100 text-brand-700 border border-brand-200'
  return 'bg-gray-100 text-gray-600 border border-gray-200'
}

function formatINR(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`
  return `₹${amount.toLocaleString('en-IN')}`
}

async function fetchRecommendations(intakeId: string): Promise<RecommendationsGetResponse> {
  const res = await fetch(`/api/recommendations/${intakeId}`)
  if (!res.ok) {
    if (res.status === 404) throw new Error('No recommendations found for this wedding plan.')
    throw new Error('Failed to load recommendations. Please try again.')
  }
  return res.json() as Promise<RecommendationsGetResponse>
}

export default function RecommendationsPage() {
  const params = useParams<{ intakeId: string }>()
  const router = useRouter()
  const intakeId = params.intakeId

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['recommendations', intakeId],
    queryFn: () => fetchRecommendations(intakeId),
    enabled: !!intakeId,
    retry: 1,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <Loader2 className="w-12 h-12 text-brand-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading your wedding plan…</p>
        </div>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
        <div className="card max-w-md w-full text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-500 mb-6">
            {error instanceof Error ? error.message : 'Unable to load recommendations.'}
          </p>
          <button onClick={() => router.push('/intake')} className="btn-primary">
            Start Over
          </button>
        </div>
      </div>
    )
  }

  const { intake, recommendations, paymentSummary } = data
  const formattedDate = new Date(intake.weddingDate).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <nav className="sticky top-0 z-50 glass border-b border-white/40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-brand-500 fill-brand-500" />
            <span className="font-display font-bold text-brand-700">VidAI</span>
          </div>
          <Link
            href={`/budget/${intakeId}`}
            id="btn-view-budget"
            className="btn-primary py-2 px-4 text-xs"
          >
            Budget Tracker <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Summary Card */}
        <div className="mb-8 animate-slide-up">
          <div className="rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-8 text-white shadow-2xl shadow-brand-500/25">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <p className="text-brand-200 text-sm font-medium mb-1">Your Wedding Plan</p>
                <h1 className="font-display text-2xl sm:text-3xl font-bold mb-1">
                  {intake.city} Wedding
                </h1>
                <p className="text-brand-100 text-sm">
                  {VENUE_TYPE_LABELS[intake.venueType] ?? intake.venueType}
                </p>
              </div>
              <div className="text-right">
                <p className="text-brand-200 text-xs font-medium">Total Budget</p>
                <p className="text-2xl font-bold">{formatINR(intake.budgetMidpoint)}</p>
                <p className="text-brand-200 text-xs">
                  {BUDGET_BRACKET_LABELS[intake.budgetBracket] ?? intake.budgetBracket}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-brand-400/50">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-300" />
                <div>
                  <p className="text-brand-200 text-xs">Date</p>
                  <p className="text-white text-sm font-semibold">{formattedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-300" />
                <div>
                  <p className="text-brand-200 text-xs">Guests</p>
                  <p className="text-white text-sm font-semibold">
                    {intake.guestCount.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-brand-300" />
                <div>
                  <p className="text-brand-200 text-xs">Priorities</p>
                  <p className="text-white text-sm font-semibold">
                    {intake.priorities.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
            Your 8 Vendor Recommendations
          </h2>
          <p className="text-gray-500 text-sm">
            AI-curated for {intake.city} · Ranked by your priorities
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {recommendations
            .sort((a, b) => a.priorityRank - b.priorityRank)
            .map((rec, idx) => {
              const Icon = getVendorIcon(rec.vendorCategory)
              const summary = paymentSummary.find(
                (s) => s.vendorCategory === rec.vendorCategory
              )
              const spent = summary?.spent ?? 0
              const spentPct = Math.min(100, (spent / rec.allocatedBudget) * 100)

              return (
                <div
                  key={idx}
                  className="card hover:shadow-lg hover:-translate-y-1 transition-all duration-200 animate-fade-in"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-brand-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {rec.vendorCategory}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          {rec.priorityRank <= 2 && (
                            <Trophy className="w-3 h-3 text-gold-500" />
                          )}
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getRankBadgeClass(rec.priorityRank)}`}>
                            #{rec.priorityRank}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {formatINR(rec.allocatedBudget)}
                      </p>
                      <p className="text-xs text-gray-400">allocated</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed mb-3">
                    {rec.rationale}
                  </p>

                  {/* Spend progress */}
                  {spent > 0 && (
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Spent: {formatINR(spent)}</span>
                        <span>{Math.round(spentPct)}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            spentPct > 90 ? 'bg-red-400' : 'bg-brand-400'
                          }`}
                          style={{ width: `${spentPct}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/budget/${intakeId}`} className="btn-primary">
            <IndianRupee className="w-4 h-4" />
            View Budget Tracker
          </Link>
          <Link href="/intake" className="btn-secondary">
            Plan Another Wedding
          </Link>
        </div>
      </main>
    </div>
  )
}

'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ChatBox } from '../../../components/ChatBox'
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
  CheckCircle,
  Lock,
  X,
  ChevronLeft,
  History,
} from 'lucide-react'
import { RecommendationsGetResponse } from '@wedding/types/recommendation'
import { VENUE_TYPE_LABELS, BUDGET_BRACKET_LABELS } from '@wedding/types/intake'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

const VENDOR_ICONS: Record<string, React.ElementType> = {
  photography: Camera,
  videography: Camera,
  catering: Utensils,
  decor: Palette,
  florist: Palette,
  lighting: Sparkles,
  music_dj: Music,
  choreographer: Music,
  mehendi_artist: Heart,
  makeup_beauty: Sparkles,
  invitations: Mail,
  bridal_wear: Shirt,
  groom_wear: Shirt,
  venue: MapPin,
  pandit: Star,
  bartender: Utensils,
}

function getVendorIcon(category: string): React.ElementType {
  const lower = category.toLowerCase()
  for (const [key, Icon] of Object.entries(VENDOR_ICONS)) {
    if (lower.includes(key)) return Icon
  }
  return Sparkles
}

function getRankBadgeClass(rank: number): string {
  if (rank <= 3) return 'bg-gold-100 text-gold-700 border border-gold-200'
  if (rank <= 8) return 'bg-brand-100 text-brand-700 border border-brand-200'
  return 'bg-gray-100 text-gray-600 border border-gray-200'
}

function formatINR(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`
  return `₹${amount.toLocaleString('en-IN')}`
}

export default function RecommendationsPage() {
  const params = useParams<{ intakeId: string }>()
  const router = useRouter()
  const intakeId = params.intakeId

  const [data, setData] = useState<RecommendationsGetResponse | null>(null)
  const [streamText, setStreamText] = useState<string>('')
  const [isStreaming, setIsStreaming] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'vendors' | 'events' | 'finalize'>('vendors')
  const [latestBudgetId, setLatestBudgetId] = useState<string | null>(null)

  // Per-category selection: 'vendor' | 'ai_default' | 'drop'
  type SelectionType = 'vendor' | 'ai_default' | 'drop'
  interface Selection {
    selectionType: SelectionType
    vendorId?: string
    vendorName?: string
    finalBudget: number
  }
  const [selections, setSelections] = useState<Record<string, Selection>>({})
  const [isLocking, setIsLocking] = useState(false)
  const [lockError, setLockError] = useState<string | null>(null)

  // Pagination for past budgets in finalize tab
  const [historyPage, setHistoryPage] = useState(1)
  const [historyData, setHistoryData] = useState<{ data: {id:string;totalBudget:number;createdAt:string}[]; total: number } | null>(null)

  useEffect(() => {
    if (!intakeId) return

    // 1. Try to fetch existing recommendations first
    fetch(`/api/recommendations/${intakeId}`)
      .then(async (res) => {
        if (res.ok) {
          const json = await res.json()
          setData(json.data)
          setIsStreaming(false)
        } else if (res.status === 404) {
          startStream()
        } else {
          throw new Error('Failed to load recommendations.')
        }
      })
      .catch((err) => {
        setError(err.message)
        setIsStreaming(false)
      })

    // 2. Fetch latest finalized budget id for nav
    fetch(`${API_URL}/api/budget/latest/${intakeId}`)
      .then((r) => r.json())
      .then((j) => setLatestBudgetId(j.data?.budgetId ?? null))
      .catch(() => {})

    function startStream() {
      const eventSource = new EventSource(`/api/recommendations/${intakeId}/stream`)
      eventSource.addEventListener('chunk', (e) => {
        const text = JSON.parse(e.data)
        setStreamText((prev) => prev + text)
      })
      eventSource.addEventListener('done', (e) => {
        const finalData = JSON.parse(e.data)
        setData(finalData)
        setIsStreaming(false)
        eventSource.close()
      })
      eventSource.addEventListener('error', (e: any) => {
        const message = e.data ? JSON.parse(e.data).message : 'Streaming failed.'
        setError(message)
        setIsStreaming(false)
        eventSource.close()
      })
    }
  }, [intakeId])

  // Fetch budget history when finalize tab is opened
  const fetchHistory = useCallback((page: number) => {
    fetch(`${API_URL}/api/budget/history/${intakeId}?page=${page}&limit=3`)
      .then((r) => r.json())
      .then((j) => setHistoryData(j.data ?? null))
      .catch(() => {})
  }, [intakeId])

  useEffect(() => {
    if (activeTab === 'finalize' && intakeId) fetchHistory(historyPage)
  }, [activeTab, historyPage, intakeId, fetchHistory])

  // Initialize selections when data loads
  useEffect(() => {
    if (!data) return
    const initial: Record<string, Selection> = {}
    for (const rec of data.recommendations) {
      initial[rec.vendorCategory] = {
        selectionType: 'ai_default',
        finalBudget: rec.allocatedBudget,
      }
    }
    setSelections(initial)
  }, [data])

  const handleLockBudget = async () => {
    if (!data) return
    setIsLocking(true)
    setLockError(null)
    try {
      const selectionPayload = data.recommendations.map((rec) => {
        const sel = selections[rec.vendorCategory] ?? { selectionType: 'ai_default', finalBudget: rec.allocatedBudget }
        return {
          vendorCategory: rec.vendorCategory,
          selectionType: sel.selectionType,
          vendorId: sel.vendorId,
          vendorName: sel.vendorName,
          finalBudget: sel.finalBudget,
        }
      })
      const res = await fetch(`${API_URL}/api/budget`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intakeId, selections: selectionPayload }),
      })
      if (!res.ok) throw new Error('Failed to finalize budget')
      const json = await res.json()
      const newBudgetId = json.data?.id
      setLatestBudgetId(newBudgetId)
      router.push(`/track-budget/${newBudgetId}`)
    } catch (err: any) {
      setLockError(err.message)
    } finally {
      setIsLocking(false)
    }
  }

  if (error) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
        <div className="card max-w-md w-full text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button onClick={() => router.push('/intake')} className="btn-primary">
            Start Over
          </button>
        </div>
      </div>
    )
  }

  // ─── Streaming UI (The Matrix Effect) ───
  if (isStreaming) {
    return (
      <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-4 sm:p-8 flex flex-col items-center justify-center overflow-hidden relative">
        {/* Loading Header */}
        <div className="absolute top-8 left-0 right-0 text-center animate-pulse">
          <Loader2 className="w-8 h-8 text-brand-500 animate-spin mx-auto mb-4" />
          <p className="text-white font-sans text-lg">AI is crafting your perfect wedding plan...</p>
        </div>

        {/* Matrix Text Container */}
        <div className="w-full max-w-4xl h-[60vh] bg-black/50 border border-green-500/30 rounded-lg p-6 overflow-y-auto scrollbar-hide shadow-[0_0_30px_rgba(34,197,94,0.1)] relative">
          <pre className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed opacity-80 break-all">
            {streamText}
            <span className="inline-block w-2 h-4 ml-1 bg-green-400 animate-pulse" />
          </pre>
        </div>
      </div>
    )
  }

  if (!data) return null

  const { intake, recommendations, events, paymentSummary } = data
  const formattedDate = new Date(intake.weddingDate).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <nav className="sticky top-0 z-50 glass border-b border-white/40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Heart className="w-5 h-5 text-brand-500 fill-brand-500" />
            <span className="font-display font-bold text-brand-700">VidAI</span>
          </Link>
          {latestBudgetId ? (
            <Link href={`/track-budget/${latestBudgetId}`} className="btn-primary py-2 px-4 text-xs">
              Budget Tracker <ChevronRight className="w-3 h-3" />
            </Link>
          ) : (
            <button onClick={() => setActiveTab('finalize')} className="btn-primary py-2 px-4 text-xs">
              Finalize Budget <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Summary Card */}
        <div className="mb-8 animate-slide-up">
          <div className="rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-8 text-white shadow-2xl shadow-brand-500/25">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <p className="text-brand-200 text-sm font-medium mb-1">Your Master Plan</p>
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
                  <p className="text-brand-200 text-xs">Top Priorities</p>
                  <p className="text-white text-sm font-semibold">
                    {intake.priorities.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white/50 p-1.5 rounded-2xl border border-white/60 w-fit mx-auto backdrop-blur-md">
          <button
            onClick={() => setActiveTab('vendors')}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === 'vendors' ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-white/30'
            }`}
          >
            Vendors & Budgets
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === 'events' ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-white/30'
            }`}
          >
            Event Timeline
          </button>
          <button
            onClick={() => setActiveTab('finalize')}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 ${
              activeTab === 'finalize' ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-white/30'
            }`}
          >
            <Lock className="w-3.5 h-3.5" /> Finalize
          </button>
        </div>

        {/* Tab 1: Vendors */}
        {activeTab === 'vendors' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold text-gray-900">
                  16 Category Breakdown
                </h2>
                <p className="text-gray-500 text-sm">
                  Budget strategically distributed across all services.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recommendations
                .sort((a, b) => a.priorityRank - b.priorityRank)
                .map((rec, idx) => {
                  const Icon = getVendorIcon(rec.vendorCategory)
                  return (
                    <div
                      key={idx}
                      className={`card p-0 overflow-hidden flex flex-col transition-all duration-300 ${
                        rec.isPriority ? 'ring-2 ring-brand-400 ring-offset-2' : ''
                      }`}
                    >
                      {/* Top Header - Category Info */}
                      <div className={`p-5 ${rec.isPriority ? 'bg-brand-50/50' : 'bg-white'}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              rec.isPriority ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30' : 'bg-gray-100 text-gray-500'
                            }`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="font-display font-bold text-gray-900 text-lg capitalize">
                                {rec.vendorCategory.replace('_', ' ')}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                {rec.isPriority && (
                                  <span className="text-[10px] uppercase tracking-wider font-bold text-brand-600 bg-brand-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <Trophy className="w-3 h-3" /> Priority
                                  </span>
                                )}
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getRankBadgeClass(rec.priorityRank)}`}>
                                  Rank #{rec.priorityRank}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                            <p className="text-xl font-bold text-brand-700">
                              {formatINR(rec.allocatedBudget)}
                            </p>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Allocated</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed italic">
                          "{rec.rationale}"
                        </p>
                      </div>

                      {/* Bottom Section - Vendors */}
                      <div className="bg-gray-50 p-5 border-t border-gray-100 flex-1">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                          Matched Vendors ({rec.vendors.length})
                        </p>
                        
                        {rec.vendors.length === 0 ? (
                          <div className="text-sm text-gray-500 text-center py-4">No matched vendors found in this category.</div>
                        ) : (
                          <div className="flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
                            {rec.vendors.map((v) => (
                              <div key={v.id} className="snap-start flex-none w-64 bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-brand-300 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-bold text-gray-900 text-sm truncate pr-2 group-hover:text-brand-600 transition-colors">{v.name}</h4>
                                  <span className="flex items-center gap-1 text-xs font-bold text-yellow-500 bg-yellow-50 px-1.5 py-0.5 rounded">
                                    <Star className="w-3 h-3 fill-yellow-500" /> {v.rating}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 line-clamp-2 mb-3 h-8">{v.description}</p>
                                <div className="flex items-center justify-between mt-auto">
                                  <div className="text-xs">
                                    <span className="font-bold text-gray-900">{formatINR(v.priceMin)}</span>
                                    <span className="text-gray-400"> onwards</span>
                                  </div>
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                    v.matchTag.includes('Top Pick') || v.matchTag.includes('Premium') 
                                      ? 'bg-purple-100 text-purple-700' 
                                      : 'bg-green-100 text-green-700'
                                  }`}>
                                    {v.matchTag}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        )}

        {/* Tab 2: Events Timeline */}
        {activeTab === 'events' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold text-gray-900">
                  Event Timeline
                </h2>
                <p className="text-gray-500 text-sm">
                  Chronological flow of your wedding events.
                </p>
              </div>
            </div>

            <div className="relative pl-6 sm:pl-8 py-4 before:absolute before:inset-0 before:left-[19px] sm:before:left-[27px] before:w-0.5 before:bg-brand-200">
              {events
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((event, idx) => (
                  <div key={idx} className="relative mb-10 last:mb-0">
                    <div className="absolute -left-[30px] sm:-left-[38px] top-1 w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center border-[3px] border-white shadow-sm z-10">
                      <span className="text-[10px] font-bold text-white">{idx + 1}</span>
                    </div>

                    <div className="card p-5 bg-white transition-shadow hover:shadow-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-display font-bold text-lg text-gray-900">
                          {event.name}
                        </h3>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          event.type === 'main' ? 'bg-brand-100 text-brand-600' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {event.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{event.description}</p>

                      {event.vendorCategories.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            Required Services
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {event.vendorCategories.map((cat) => {
                              const isPriority = intake.priorities.some(p => 
                                p.toLowerCase() === cat.toLowerCase()
                              )
                              return (
                                <span
                                  key={cat}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                                    isPriority
                                      ? 'border-brand-200 bg-brand-50 text-brand-700'
                                      : 'border-gray-200 bg-gray-50 text-gray-600'
                                  }`}
                                >
                                  {cat.replace('_', ' ')}
                                </span>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Tab 3: Finalize Budget */}
        {activeTab === 'finalize' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900">Finalize Your Budget</h2>
              <p className="text-gray-500 text-sm mt-1">Select one vendor per category — or use the AI allocation, or drop the category.</p>
            </div>

            {/* Past Budgets */}
            {historyData && historyData.data.length > 0 && (
              <div className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-brand-500" />
                    <h3 className="font-semibold text-gray-900">Past Finalized Budgets</h3>
                  </div>
                  {historyData.total > 3 && (
                    <div className="flex items-center gap-2">
                      <button onClick={() => setHistoryPage(p => Math.max(1, p - 1))} disabled={historyPage === 1} className="p-1 rounded-full border disabled:opacity-40">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-xs text-gray-500">{historyPage} / {Math.ceil(historyData.total / 3)}</span>
                      <button onClick={() => setHistoryPage(p => Math.min(Math.ceil(historyData.total / 3), p + 1))} disabled={historyPage >= Math.ceil(historyData.total / 3)} className="p-1 rounded-full border disabled:opacity-40">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {historyData.data.map((b) => (
                    <Link key={b.id} href={`/track-budget/${b.id}`}
                      className="p-4 rounded-xl border border-brand-100 bg-brand-50/30 hover:bg-brand-50 transition-colors block">
                      <p className="font-bold text-brand-700">{formatINR(b.totalBudget)}</p>
                      <p className="text-xs text-gray-400 mt-1">{new Date(b.createdAt).toLocaleDateString()}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Category Selections */}
            <div className="space-y-4">
              {recommendations.sort((a, b) => a.priorityRank - b.priorityRank).map((rec) => {
                const sel = selections[rec.vendorCategory] ?? { selectionType: 'ai_default', finalBudget: rec.allocatedBudget }
                const Icon = getVendorIcon(rec.vendorCategory)
                return (
                  <div key={rec.vendorCategory} className={`card p-0 overflow-hidden ${
                    sel.selectionType === 'drop' ? 'opacity-60' : ''
                  }`}>
                    {/* Category header */}
                    <div className="p-5 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          rec.isPriority ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-500'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 capitalize">{rec.vendorCategory.replace(/_/g, ' ')}</p>
                          <p className="text-xs text-gray-400">AI Allocation: {formatINR(rec.allocatedBudget)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {/* AI Default button */}
                        <button
                          onClick={() => setSelections(prev => ({ ...prev, [rec.vendorCategory]: { selectionType: 'ai_default', finalBudget: rec.allocatedBudget } }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            sel.selectionType === 'ai_default' ? 'bg-brand-500 text-white border-brand-500' : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300'
                          }`}>
                          AI Default
                        </button>
                        {/* Drop button */}
                        <button
                          onClick={() => setSelections(prev => ({ ...prev, [rec.vendorCategory]: { selectionType: 'drop', finalBudget: 0 } }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            sel.selectionType === 'drop' ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-600 border-gray-200 hover:border-red-300'
                          }`}>
                          <X className="w-3 h-3 inline mr-1" />Drop
                        </button>
                      </div>
                    </div>

                    {/* Vendor Cards */}
                    {rec.vendors.length > 0 && sel.selectionType !== 'drop' && (
                      <div className="px-5 pb-5 border-t border-gray-50 pt-4">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Pick a vendor</p>
                        <div className="flex gap-3 overflow-x-auto pb-1 snap-x">
                          {rec.vendors.map((v) => {
                            const isSelected = sel.selectionType === 'vendor' && sel.vendorId === v.id
                            return (
                              <button
                                key={v.id}
                                onClick={() => setSelections(prev => ({
                                  ...prev,
                                  [rec.vendorCategory]: { selectionType: 'vendor', vendorId: v.id, vendorName: v.name, finalBudget: v.priceMin }
                                }))}
                                className={`snap-start flex-none w-60 text-left rounded-xl border-2 p-4 transition-all duration-200 ${
                                  isSelected ? 'border-brand-500 bg-brand-50 shadow-md shadow-brand-500/10' : 'border-gray-200 bg-white hover:border-brand-300'
                                }`}>
                                <div className="flex items-start justify-between mb-1">
                                  <p className="font-bold text-sm text-gray-900 truncate pr-2">{v.name}</p>
                                  {isSelected && <CheckCircle className="w-4 h-4 text-brand-500 flex-shrink-0" />}
                                </div>
                                <p className="text-xs text-gray-500 line-clamp-2 mb-2">{v.description}</p>
                                <p className="text-sm font-bold text-brand-700">{formatINR(v.priceMin)} <span className="text-xs font-normal text-gray-400">onwards</span></p>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Selected summary */}
                    <div className={`px-5 py-3 border-t text-sm flex items-center justify-between ${
                      sel.selectionType === 'drop' ? 'bg-red-50 border-red-100' : sel.selectionType === 'vendor' ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'
                    }`}>
                      <span className="text-gray-600">
                        {sel.selectionType === 'drop' ? '🚫 Category dropped'
                          : sel.selectionType === 'vendor' ? `✅ ${sel.vendorName}`
                          : '📊 Using AI allocation'}
                      </span>
                      <span className="font-bold text-gray-900">{formatINR(sel.finalBudget)}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Sticky Lock Button */}
            <div className="sticky bottom-6 flex justify-center">
              <div className="card p-4 flex items-center gap-6 shadow-2xl shadow-brand-500/20 border-brand-200">
                <div>
                  <p className="text-xs text-gray-400">Total Final Budget</p>
                  <p className="font-display text-xl font-bold text-brand-700">
                    {formatINR(Object.values(selections).reduce((s, sel) => s + sel.finalBudget, 0))}
                  </p>
                </div>
                {lockError && <p className="text-red-500 text-xs">{lockError}</p>}
                <button
                  onClick={handleLockBudget}
                  disabled={isLocking}
                  className="btn-primary px-6 py-3 flex items-center gap-2"
                >
                  {isLocking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                  Lock In Budget
                </button>
              </div>
            </div>
          </div>
        )}

        {/* AI ChatBox */}
        <ChatBox data={data} />
      </main>
    </div>
  )
}

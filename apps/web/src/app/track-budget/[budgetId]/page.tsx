'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Heart,
  ChevronLeft,
  Loader2,
  AlertTriangle,
  IndianRupee,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Minus,
  Save,
} from 'lucide-react'
import type { FinalizedBudgetGetResponse, ExpenseItem } from '@wedding/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

function formatINR(amount: number): string {
  if (Math.abs(amount) >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`
  if (Math.abs(amount) >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
  if (Math.abs(amount) >= 1000) return `₹${(amount / 1000).toFixed(0)}K`
  return `₹${Math.abs(amount).toLocaleString('en-IN')}`
}

export default function TrackBudgetPage() {
  const params = useParams<{ budgetId: string }>()
  const router = useRouter()
  const budgetId = params.budgetId

  const [budget, setBudget] = useState<FinalizedBudgetGetResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Actual expense state: { vendorCategory → actualAmount }
  const [actuals, setActuals] = useState<Record<string, string>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    if (!budgetId) return
    fetch(`${API_URL}/api/budget/${budgetId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Budget not found')
        const json = await res.json()
        const data = json.data as FinalizedBudgetGetResponse
        setBudget(data)
        // Pre-fill actuals from saved expense data
        const saved: Record<string, string> = {}
        if (data.actualExpense?.items) {
          for (const item of data.actualExpense.items as ExpenseItem[]) {
            saved[item.vendorCategory] = String(item.actualAmount)
          }
        }
        // Fill any missing categories with empty string
        for (const item of data.items) {
          if (!(item.vendorCategory in saved)) {
            saved[item.vendorCategory] = ''
          }
        }
        setActuals(saved)
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [budgetId])

  const handleSave = async () => {
    setIsSaving(true)
    setSaveSuccess(false)
    try {
      const items: ExpenseItem[] = Object.entries(actuals)
        .filter(([, v]) => v !== '')
        .map(([vendorCategory, v]) => ({
          vendorCategory,
          actualAmount: parseInt(v) || 0,
        }))

      const res = await fetch(`${API_URL}/api/budget/${budgetId}/expenses`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      if (!res.ok) throw new Error('Failed to save expenses')
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-500 animate-spin" />
      </div>
    )
  }

  if (error || !budget) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
        <div className="card max-w-md w-full text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-500 mb-6">{error ?? 'Budget not found'}</p>
          <button onClick={() => router.push('/')} className="btn-primary">Go Home</button>
        </div>
      </div>
    )
  }

  // Compute totals
  const totalAllocated = budget.items.reduce((s, i) => s + i.finalBudget, 0)
  const totalActual = budget.items.reduce((s, i) => {
    const v = parseInt(actuals[i.vendorCategory] || '0') || 0
    return s + v
  }, 0)
  const totalSlack = totalAllocated - totalActual

  return (
    <div className="min-h-screen gradient-bg">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-white/40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/recommendations/${budget.intakeId}`} className="btn-ghost p-2">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-brand-500 fill-brand-500" />
              <span className="font-display font-bold text-brand-700">Budget Tracker</span>
            </div>
          </div>
          <span className="text-xs text-gray-400">
            Finalized {new Date(budget.createdAt).toLocaleDateString()}
          </span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {/* Summary tiles */}
        <div className="grid grid-cols-3 gap-4 animate-slide-up">
          <div className="card text-center">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Allocated</p>
            <p className="font-display text-2xl font-bold text-gray-900">{formatINR(totalAllocated)}</p>
          </div>
          <div className="card text-center">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Actual Spent</p>
            <p className={`font-display text-2xl font-bold ${totalActual > totalAllocated ? 'text-red-500' : 'text-brand-600'}`}>
              {formatINR(totalActual)}
            </p>
          </div>
          <div className="card text-center">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">
              {totalSlack >= 0 ? 'Remaining' : 'Over Budget'}
            </p>
            <p className={`font-display text-2xl font-bold ${totalSlack < 0 ? 'text-red-500' : 'text-green-600'}`}>
              {totalSlack < 0 ? '-' : ''}{formatINR(Math.abs(totalSlack))}
            </p>
          </div>
        </div>

        {/* Category rows */}
        <div className="card p-0 overflow-hidden animate-fade-in">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-gray-900">Category Breakdown</h2>
            <p className="text-xs text-gray-400">Enter actual expenses below</p>
          </div>

          <div className="divide-y divide-gray-50">
            {budget.items.map((item) => {
              if (item.finalBudget === 0) return null // Skip dropped categories
              const actualVal = parseInt(actuals[item.vendorCategory] || '0') || 0
              const slack = item.finalBudget - actualVal
              const isOver = slack < 0
              const spentPct = item.finalBudget > 0 ? Math.min(100, (actualVal / item.finalBudget) * 100) : 0
              const Icon = isOver ? TrendingUp : actualVal > 0 ? Minus : TrendingDown

              return (
                <div key={item.id} className="px-6 py-5">
                  <div className="flex items-start gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isOver ? 'text-red-400' : 'text-green-500'}`} />
                        <p className="font-semibold text-gray-900 capitalize">
                          {item.vendorCategory.replace(/_/g, ' ')}
                        </p>
                      </div>
                      {item.vendorName && (
                        <p className="text-xs text-gray-400 ml-6">{item.vendorName}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm flex-shrink-0 flex-wrap">
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Allocated</p>
                        <p className="font-semibold text-gray-700">{formatINR(item.finalBudget)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Actual (₹)</p>
                        <input
                          type="number"
                          value={actuals[item.vendorCategory] ?? ''}
                          onChange={(e) => setActuals(prev => ({ ...prev, [item.vendorCategory]: e.target.value }))}
                          placeholder="0"
                          min={0}
                          className="w-28 text-right font-semibold border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-brand-400 transition-colors"
                        />
                      </div>
                      <div className="text-right w-20">
                        <p className="text-xs text-gray-400">{isOver ? 'Over' : 'Slack'}</p>
                        <p className={`font-bold ${isOver ? 'text-red-500' : 'text-green-600'}`}>
                          {isOver ? '-' : ''}{actualVal > 0 ? formatINR(Math.abs(slack)) : '—'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  {actualVal > 0 && (
                    <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${
                          isOver ? 'bg-red-400' : spentPct > 75 ? 'bg-yellow-400' : 'bg-green-400'
                        }`}
                        style={{ width: `${spentPct}%` }}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary px-8 py-3 flex items-center gap-2"
          >
            {isSaving ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
            ) : saveSuccess ? (
              <><CheckCircle className="w-4 h-4" /> Saved!</>
            ) : (
              <><Save className="w-4 h-4" /> Save Expenses</>
            )}
          </button>
        </div>
      </main>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar, MapPin, IndianRupee, Loader2, ChevronLeft, ChevronRight } from 'lucide-react'

interface WeddingIntake {
  id: string
  weddingDate: string
  city: string
  venueType: string
  budgetBracket: string
  createdAt: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

export function HistorySection() {
  const [history, setHistory] = useState<WeddingIntake[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const limit = 3

  useEffect(() => {
    setIsLoading(true)
    fetch(`${API_URL}/api/intake?page=${page}&limit=${limit}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch history')
        return res.json()
      })
      .then(json => {
        setHistory(json.data?.data || [])
        setTotal(json.data?.total || 0)
        setIsLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setIsLoading(false)
      })
  }, [page])

  if (isLoading && history.length === 0) {
    return (
      <div className="py-12 flex justify-center">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    )
  }

  if (error || (history.length === 0 && !isLoading)) {
    return null // Hide section if no history or error
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <section className="py-12 px-4 bg-white/50 border-t border-b border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Your Recent Plans
            </h2>
            <p className="text-gray-600">Pick up right where you left off</p>
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <span className="text-sm font-medium text-gray-600">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 transition-all"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {history.map((plan) => (
            <Link
              href={`/recommendations/${plan.id}`}
              key={plan.id}
              className="card p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 block border border-brand-100/50 bg-white"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-brand-50 p-3 rounded-2xl">
                  <MapPin className="w-6 h-6 text-brand-600" />
                </div>
                <span className="text-xs font-semibold text-gray-400">
                  {new Date(plan.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <h3 className="font-display font-bold text-lg text-gray-900 mb-1">
                {plan.city} Wedding
              </h3>
              
              <div className="space-y-2 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-brand-400" />
                  <span>{new Date(plan.weddingDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <IndianRupee className="w-4 h-4 text-brand-400" />
                  <span>{plan.budgetBracket}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

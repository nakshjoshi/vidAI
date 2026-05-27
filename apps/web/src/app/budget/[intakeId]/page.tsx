'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  IndianRupee,
  Plus,
  X,
  AlertTriangle,
  Loader2,
  TrendingUp,
  TrendingDown,
  Minus,
  Heart,
  ChevronLeft,
  CheckCircle,
  Receipt,
} from 'lucide-react'
import { RecommendationsGetResponse } from '@wedding/types/recommendation'
import { PaymentSchema, Payment } from '@wedding/types/payment'

function formatINR(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`
  return `₹${Math.abs(amount).toLocaleString('en-IN')}`
}

interface PaymentHistoryItem {
  id: string
  intakeId: string
  vendorCategory: string
  vendorName: string
  amountPaid: number
  paymentDate: string
  createdAt: string
}

async function fetchRecommendations(intakeId: string): Promise<RecommendationsGetResponse> {
  const res = await fetch(`/api/recommendations/${intakeId}`)
  if (!res.ok) throw new Error('Failed to load budget data')
  return res.json() as Promise<RecommendationsGetResponse>
}

async function fetchPayments(intakeId: string): Promise<PaymentHistoryItem[]> {
  const res = await fetch(`/api/payments/${intakeId}`)
  if (!res.ok) throw new Error('Failed to load payments')
  return res.json() as Promise<PaymentHistoryItem[]>
}

async function postPayment(payment: Payment): Promise<PaymentHistoryItem> {
  const res = await fetch('/api/payments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payment),
  })
  if (!res.ok) {
    const body = await res.json() as { error?: string }
    throw new Error(body.error ?? 'Failed to log payment')
  }
  return res.json() as Promise<PaymentHistoryItem>
}

interface PaymentModalProps {
  intakeId: string
  vendorCategory: string
  allocatedBudget: number
  onClose: () => void
}

const PaymentFormSchema = PaymentSchema.omit({ intakeId: true, vendorCategory: true })
type PaymentFormData = z.infer<typeof PaymentFormSchema>

function PaymentModal({ intakeId, vendorCategory, allocatedBudget, onClose }: PaymentModalProps) {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: {
      paymentDate: new Date().toISOString().split('T')[0],
    },
  })

  const mutation = useMutation({
    mutationFn: (data: PaymentFormData) =>
      postPayment({
        intakeId,
        vendorCategory,
        vendorName: data.vendorName,
        amountPaid: data.amountPaid,
        paymentDate: data.paymentDate,
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['recommendations', intakeId] })
      void queryClient.invalidateQueries({ queryKey: ['payments', intakeId] })
      onClose()
    },
  })

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h3 className="font-display font-bold text-lg text-gray-900">
              Log Payment
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              {vendorCategory} · Budget: {formatINR(allocatedBudget)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="p-6 space-y-4"
        >
          <div>
            <label htmlFor="vendorName" className="label block mb-2">
              Vendor Name
            </label>
            <input
              id="vendorName"
              type="text"
              className="input"
              placeholder="e.g. Sharma Photography Studio"
              {...register('vendorName')}
            />
            {errors.vendorName && (
              <p className="error-msg">{errors.vendorName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="amountPaid" className="label block mb-2">
              Amount Paid (₹)
            </label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="amountPaid"
                type="number"
                className="input pl-10"
                placeholder="50000"
                min={1}
                {...register('amountPaid', { valueAsNumber: true })}
              />
            </div>
            {errors.amountPaid && (
              <p className="error-msg">{errors.amountPaid.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="paymentDate" className="label block mb-2">
              Payment Date
            </label>
            <input
              id="paymentDate"
              type="date"
              className="input"
              {...register('paymentDate')}
            />
            {errors.paymentDate && (
              <p className="error-msg">{errors.paymentDate.message}</p>
            )}
          </div>

          {mutation.error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {mutation.error instanceof Error
                ? mutation.error.message
                : 'Failed to log payment'}
            </div>
          )}

          <button
            type="submit"
            id="submit-payment"
            disabled={mutation.isPending}
            className="btn-primary w-full"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving…
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" /> Log Payment
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function BudgetPage() {
  const params = useParams<{ intakeId: string }>()
  const router = useRouter()
  const intakeId = params.intakeId

  const [paymentModal, setPaymentModal] = useState<{
    vendorCategory: string
    allocatedBudget: number
  } | null>(null)

  const { data: recData, isLoading: recLoading, isError: recError } = useQuery({
    queryKey: ['recommendations', intakeId],
    queryFn: () => fetchRecommendations(intakeId),
    enabled: !!intakeId,
  })

  const { data: payments = [] } = useQuery({
    queryKey: ['payments', intakeId],
    queryFn: () => fetchPayments(intakeId),
    enabled: !!intakeId,
  })

  if (recLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-500 animate-spin" />
      </div>
    )
  }

  if (recError || !recData) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
        <div className="card max-w-md w-full text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Plan not found</h2>
          <p className="text-gray-500 mb-6">We couldn&apos;t find this wedding plan.</p>
          <button onClick={() => router.push('/intake')} className="btn-primary">
            Start Planning
          </button>
        </div>
      </div>
    )
  }

  const { intake, paymentSummary } = recData
  const totalAllocated = paymentSummary.reduce((sum, r) => sum + r.allocated, 0)
  const totalSpent = paymentSummary.reduce((sum, r) => sum + r.spent, 0)
  const totalRemaining = totalAllocated - totalSpent

  return (
    <div className="min-h-screen gradient-bg">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-white/40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/recommendations/${intakeId}`} className="btn-ghost p-2">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-brand-500 fill-brand-500" />
              <span className="font-display font-bold text-brand-700">Budget Tracker</span>
            </div>
          </div>
          <span className="text-sm text-gray-500">{intake.city}</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Budget Summary Tiles */}
        <div className="grid grid-cols-3 gap-4 mb-8 animate-slide-up">
          <div className="card text-center">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Total Budget</p>
            <p className="font-display text-2xl font-bold text-gray-900">
              {formatINR(totalAllocated)}
            </p>
          </div>
          <div className="card text-center">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Spent</p>
            <p className={`font-display text-2xl font-bold ${totalSpent > totalAllocated ? 'text-red-500' : 'text-brand-600'}`}>
              {formatINR(totalSpent)}
            </p>
          </div>
          <div className="card text-center">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Remaining</p>
            <p className={`font-display text-2xl font-bold ${totalRemaining < 0 ? 'text-red-500' : 'text-green-600'}`}>
              {totalRemaining < 0 ? '-' : ''}{formatINR(Math.abs(totalRemaining))}
            </p>
          </div>
        </div>

        {/* Per-Category Table */}
        <div className="card mb-8 animate-fade-in p-0 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="font-display text-lg font-bold text-gray-900">
              Category Breakdown
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {paymentSummary.map((row, idx) => {
              const spentPct = row.allocated > 0 ? Math.min(100, (row.spent / row.allocated) * 100) : 0
              const isOver = row.remaining < 0
              const TrendIcon = isOver ? TrendingUp : row.spent > 0 ? Minus : TrendingDown

              return (
                <div key={idx} className="px-6 py-4">
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <TrendIcon
                        className={`w-4 h-4 flex-shrink-0 ${isOver ? 'text-red-400' : 'text-green-500'}`}
                      />
                      <span className="font-medium text-gray-900 text-sm truncate">
                        {row.vendorCategory}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm flex-shrink-0">
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Allocated</p>
                        <p className="font-semibold text-gray-700">{formatINR(row.allocated)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Spent</p>
                        <p className={`font-semibold ${row.spent > 0 ? 'text-gray-900' : 'text-gray-300'}`}>
                          {row.spent > 0 ? formatINR(row.spent) : '—'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Remaining</p>
                        <p className={`font-bold ${isOver ? 'text-red-500' : 'text-green-600'}`}>
                          {isOver ? '-' : ''}{formatINR(Math.abs(row.remaining))}
                        </p>
                      </div>
                      <button
                        id={`log-payment-${row.vendorCategory.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() =>
                          setPaymentModal({
                            vendorCategory: row.vendorCategory,
                            allocatedBudget: row.allocated,
                          })
                        }
                        className="btn-ghost py-1.5 px-3 text-xs text-brand-600 border border-brand-200 rounded-lg hover:bg-brand-50"
                      >
                        <Plus className="w-3 h-3" /> Log
                      </button>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${
                        isOver ? 'bg-red-400' : spentPct > 75 ? 'bg-gold-400' : 'bg-green-400'
                      }`}
                      style={{ width: `${spentPct}%` }}
                    />
                  </div>

                  {isOver && (
                    <div className="flex items-center gap-1 mt-1">
                      <AlertTriangle className="w-3 h-3 text-red-400" />
                      <span className="text-xs text-red-500 font-medium">
                        Over budget by {formatINR(Math.abs(row.remaining))}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Payment History */}
        <div className="card animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="w-5 h-5 text-brand-500" />
            <h2 className="font-display text-lg font-bold text-gray-900">
              Payment History
            </h2>
          </div>

          {payments.length === 0 ? (
            <div className="text-center py-10">
              <IndianRupee className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No payments logged yet.</p>
              <p className="text-gray-400 text-xs mt-1">
                Click &quot;Log&quot; on any category to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {payments.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{p.vendorName}</p>
                    <p className="text-xs text-gray-400">
                      {p.vendorCategory} ·{' '}
                      {new Date(p.paymentDate).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                    </p>
                  </div>
                  <span className="font-bold text-brand-700 text-sm">
                    {formatINR(p.amountPaid)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Payment Modal */}
      {paymentModal && (
        <PaymentModal
          intakeId={intakeId}
          vendorCategory={paymentModal.vendorCategory}
          allocatedBudget={paymentModal.allocatedBudget}
          onClose={() => setPaymentModal(null)}
        />
      )}
    </div>
  )
}

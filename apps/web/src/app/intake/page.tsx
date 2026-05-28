'use client'

import { useState, useEffect, useCallback } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import {
  IntakeSchema,
  Intake,
  VENUE_TYPE_LABELS,
  BUDGET_BRACKET_LABELS,
  BUDGET_MIDPOINTS,
  PRIORITY_OPTIONS,
} from '@wedding/types'
import {
  ChevronRight,
  ChevronLeft,
  Heart,
  Calendar,
  Users,
  MapPin,
  IndianRupee,
  Star,
  CheckCircle,
  Loader2,
  Sparkles,
  Building2,
  Trees,
  Plane,
  Hotel,
  Sun,
  Landmark,
} from 'lucide-react'

const STEPS = [
  { id: 1, label: 'Basics', description: 'Date & Guests' },
  { id: 2, label: 'Venue', description: 'City & Type' },
  { id: 3, label: 'Budget', description: 'Your Range' },
  { id: 4, label: 'Priorities', description: 'What Matters Most' },
  { id: 5, label: 'Review', description: 'Confirm & Submit' },
]

const LOADING_MESSAGES = [
  'Analyzing your preferences…',
  'Planning your wedding budget…',
  'Finding the best vendors…',
  'Consulting 15 years of expertise…',
  'Almost ready…',
]

const VENUE_ICONS: Record<string, React.ElementType> = {
  banquet_hall: Building2,
  farmhouse: Trees,
  destination: Plane,
  hotel: Hotel,
  outdoor: Sun,
  temple: Landmark,
}

const STORAGE_KEY = 'vidai_intake_form'

export default function IntakePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadingMsg, setLoadingMsg] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const methods = useForm<Intake>({
    resolver: zodResolver(IntakeSchema),
    defaultValues: {
      weddingDate: '',
      guestCount: 150,
      city: '',
      venueType: undefined,
      budgetBracket: undefined,
      priorities: [],
    },
    mode: 'onChange',
  })

  const { watch, setValue, getValues, trigger, formState: { errors } } = methods

  // Restore from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const data = JSON.parse(saved) as Partial<Intake>
        Object.entries(data).forEach(([key, value]) => {
          setValue(key as keyof Intake, value as never)
        })
      } catch {
        // ignore corrupt storage
      }
    }
  }, [setValue])

  // Persist to localStorage on change
  const formValues = watch()
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues))
  }, [formValues])

  // Rotate loading messages
  useEffect(() => {
    if (!isSubmitting) return
    const interval = setInterval(() => {
      setLoadingMsg((prev) => (prev + 1) % LOADING_MESSAGES.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [isSubmitting])

  const validateStep = useCallback(async (): Promise<boolean> => {
    const fieldsByStep: Record<number, (keyof Intake)[]> = {
      1: ['weddingDate', 'guestCount'],
      2: ['city', 'venueType'],
      3: ['budgetBracket'],
      4: ['priorities'],
      5: [],
    }
    return trigger(fieldsByStep[step] ?? [])
  }, [step, trigger])

  const nextStep = useCallback(async () => {
    const valid = await validateStep()
    if (valid && step < 5) setStep((s) => s + 1)
  }, [validateStep, step])

  const prevStep = () => setStep((s) => Math.max(1, s - 1))

  const onSubmit = async (data: Intake) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json() as { error?: string }
        throw new Error(body.error ?? 'Something went wrong')
      }

      const result = await res.json() as { data: { intakeId: string } }
      localStorage.removeItem(STORAGE_KEY)
      // Redirect immediately, streaming happens on the next page
      router.push(`/recommendations/${result.data.intakeId}`)
    } catch (err) {
      setIsSubmitting(false)
      setError(err instanceof Error ? err.message : 'Unknown error. Please try again.')
    }
  }

  const values = getValues()

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/40">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-brand-500 fill-brand-500" />
            <span className="font-display font-bold text-brand-700">VidAI</span>
          </div>
          <span className="text-sm text-gray-500">Step {step} of 5</span>
        </div>
      </nav>

      {/* Progress bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-white/60 backdrop-blur-sm">
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-500 ease-out"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
        <div className="max-w-3xl mx-auto px-4 py-2">
          <div className="flex justify-between">
            {STEPS.map((s) => (
              <button
                key={s.id}
                onClick={() => step > s.id && setStep(s.id)}
                className={`flex flex-col items-center gap-0.5 transition-all duration-200 ${
                  step >= s.id ? 'cursor-pointer' : 'cursor-not-allowed'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    step > s.id
                      ? 'bg-brand-500 text-white'
                      : step === s.id
                      ? 'bg-brand-500 text-white scale-110 shadow-md shadow-brand-500/30'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {step > s.id ? <CheckCircle className="w-3 h-3" /> : s.id}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block ${
                    step === s.id ? 'text-brand-600' : 'text-gray-400'
                  }`}
                >
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="pt-36 pb-24 px-4">
          <div className="max-w-2xl mx-auto">
            {/* Step 1: Wedding Basics */}
            {step === 1 && (
              <div className="animate-slide-up">
                <div className="text-center mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-7 h-7 text-brand-600" />
                  </div>
                  <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
                    When is your big day?
                  </h1>
                  <p className="text-gray-500">
                    Tell us the basics so we can plan around your timeline.
                  </p>
                </div>

                <div className="card space-y-6">
                  <div>
                    <label htmlFor="weddingDate" className="label block mb-2">
                      Wedding Date
                    </label>
                    <input
                      id="weddingDate"
                      type="date"
                      className="input"
                      min={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split('T')[0]}
                      {...methods.register('weddingDate')}
                    />
                    {errors.weddingDate && (
                      <p className="error-msg">{errors.weddingDate.message}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      Must be at least 3 months from today
                    </p>
                  </div>

                  <div>
                    <label htmlFor="guestCount" className="label block mb-2">
                      Expected Guest Count
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="guestCount"
                        type="number"
                        className="input pl-10"
                        placeholder="e.g. 250"
                        min={10}
                        max={5000}
                        {...methods.register('guestCount', { valueAsNumber: true })}
                      />
                    </div>
                    {errors.guestCount && (
                      <p className="error-msg">{errors.guestCount.message}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">Between 10 and 5,000 guests</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Venue Preferences */}
            {step === 2 && (
              <div className="animate-slide-up">
                <div className="text-center mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-7 h-7 text-brand-600" />
                  </div>
                  <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
                    Where will you celebrate?
                  </h1>
                  <p className="text-gray-500">
                    Your city helps us find local vendors you&apos;ll love.
                  </p>
                </div>

                <div className="card space-y-6">
                  <div>
                    <label htmlFor="city" className="label block mb-2">City</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        id="city"
                        type="text"
                        className="input pl-10"
                        placeholder="e.g. Mumbai, Delhi, Jaipur"
                        {...methods.register('city')}
                      />
                    </div>
                    {errors.city && (
                      <p className="error-msg">{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <p className="label block mb-3">Venue Type</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {Object.entries(VENUE_TYPE_LABELS).map(([value, label]) => {
                        const Icon = VENUE_ICONS[value] ?? Building2
                        const selected = watch('venueType') === value
                        return (
                          <button
                            key={value}
                            type="button"
                            id={`venue-${value}`}
                            onClick={() => setValue('venueType', value as Intake['venueType'], { shouldValidate: true })}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                              selected
                                ? 'border-brand-500 bg-brand-50 shadow-md shadow-brand-500/10'
                                : 'border-gray-200 bg-white hover:border-brand-200 hover:bg-brand-50/50'
                            }`}
                          >
                            <Icon className={`w-6 h-6 ${selected ? 'text-brand-600' : 'text-gray-400'}`} />
                            <span className={`text-xs font-medium text-center ${selected ? 'text-brand-700' : 'text-gray-600'}`}>
                              {label}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                    {errors.venueType && (
                      <p className="error-msg">{errors.venueType.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Budget */}
            {step === 3 && (
              <div className="animate-slide-up">
                <div className="text-center mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-4">
                    <IndianRupee className="w-7 h-7 text-brand-600" />
                  </div>
                  <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
                    What&apos;s your budget?
                  </h1>
                  <p className="text-gray-500">
                    We&apos;ll allocate intelligently across all 8 vendor categories.
                  </p>
                </div>

                <div className="space-y-4">
                  {Object.entries(BUDGET_BRACKET_LABELS).map(([value, label]) => {
                    const selected = watch('budgetBracket') === value
                    const midpoint = BUDGET_MIDPOINTS[value] ?? 0
                    return (
                      <button
                        key={value}
                        type="button"
                        id={`budget-${value}`}
                        onClick={() => setValue('budgetBracket', value as Intake['budgetBracket'], { shouldValidate: true })}
                        className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-200 text-left ${
                          selected
                            ? 'border-brand-500 bg-brand-50 shadow-lg shadow-brand-500/15'
                            : 'border-gray-200 bg-white hover:border-brand-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                              selected ? 'border-brand-500 bg-brand-500' : 'border-gray-300'
                            }`}
                          >
                            {selected && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          <span className={`font-semibold ${selected ? 'text-brand-700' : 'text-gray-800'}`}>
                            {label}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          ≈ ₹{(midpoint / 100000).toFixed(0)}L midpoint
                        </span>
                      </button>
                    )
                  })}
                </div>
                {errors.budgetBracket && (
                  <p className="error-msg mt-2">{errors.budgetBracket.message}</p>
                )}
              </div>
            )}

            {/* Step 4: Priorities */}
            {step === 4 && (
              <div className="animate-slide-up">
                <div className="text-center mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-4">
                    <Star className="w-7 h-7 text-brand-600" />
                  </div>
                  <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
                    What matters most?
                  </h1>
                  <p className="text-gray-500">
                    Choose exactly <strong>2 priorities</strong>. These get the highest budget.
                  </p>
                </div>

                <div className="card">
                  <div className="flex flex-wrap gap-3">
                    {PRIORITY_OPTIONS.map((option) => {
                      const currentPriorities = watch('priorities') ?? []
                      const selected = currentPriorities.includes(option)
                      const disabled = !selected && currentPriorities.length >= 2
                      return (
                        <button
                          key={option}
                          type="button"
                          id={`priority-${option.toLowerCase()}`}
                          disabled={disabled}
                          onClick={() => {
                            if (selected) {
                              setValue('priorities', currentPriorities.filter((p) => p !== option), { shouldValidate: true })
                            } else if (currentPriorities.length < 2) {
                              setValue('priorities', [...currentPriorities, option], { shouldValidate: true })
                            }
                          }}
                          className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 ${
                            selected
                              ? 'border-brand-500 bg-brand-500 text-white shadow-md shadow-brand-500/20'
                              : disabled
                              ? 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-brand-300 hover:bg-brand-50'
                          }`}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>
                  {errors.priorities && (
                    <p className="error-msg mt-4">{errors.priorities.message}</p>
                  )}
                  <div className="mt-4 text-sm text-gray-400">
                    {(watch('priorities') ?? []).length}/2 selected
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review & Submit */}
            {step === 5 && (
              <div className="animate-slide-up">
                <div className="text-center mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                  <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">
                    Review your details
                  </h1>
                  <p className="text-gray-500">
                    Everything look good? We&apos;ll generate your personalized plan.
                  </p>
                </div>

                <div className="card space-y-4">
                  {[
                    {
                      label: 'Wedding Date',
                      value: values.weddingDate
                        ? new Date(values.weddingDate).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'long', year: 'numeric',
                          })
                        : '—',
                      step: 1,
                    },
                    {
                      label: 'Guest Count',
                      value: `${values.guestCount?.toLocaleString('en-IN') ?? 0} guests`,
                      step: 1,
                    },
                    { label: 'City', value: values.city || '—', step: 2 },
                    {
                      label: 'Venue Type',
                      value: VENUE_TYPE_LABELS[values.venueType ?? ''] ?? '—',
                      step: 2,
                    },
                    {
                      label: 'Budget',
                      value: BUDGET_BRACKET_LABELS[values.budgetBracket ?? ''] ?? '—',
                      step: 3,
                    },
                    {
                      label: 'Top Priorities',
                      value: (values.priorities ?? []).join(' & ') || '—',
                      step: 4,
                    },
                  ].map(({ label, value, step: goToStep }) => (
                    <div key={label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                        <p className="text-gray-900 font-semibold mt-0.5">{value}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(goToStep)}
                        className="text-xs text-brand-500 font-semibold hover:text-brand-700 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-secondary flex-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              )}
              {step < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary flex-1"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  id="submit-get-recommendations"
                  disabled={isSubmitting}
                  className="btn-primary flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Planning…
                    </>
                  ) : (
                    <>
                      Get Recommendations <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}



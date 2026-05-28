import Link from 'next/link'
import {
  Heart,
  Sparkles,
  MapPin,
  IndianRupee,
  Camera,
  Utensils,
  Music,
  ChevronRight,
} from 'lucide-react'
import { HistorySection } from '../components/HistorySection'

const features = [
  {
    icon: MapPin,
    title: 'City-Specific Vendors',
    description:
      'Recommendations tailored to your exact city — from Mumbai farmhouses to Udaipur palaces.',
  },
  {
    icon: IndianRupee,
    title: 'Smart Budget Allocation',
    description:
      'AI splits your total budget across 8 vendor categories based on your priorities.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered by Llama 3.3',
    description:
      'Groq-accelerated LLM gives you a complete vendor plan in under 10 seconds.',
  },
]

const vendorIcons = [
  { icon: Camera, label: 'Photography' },
  { icon: Utensils, label: 'Catering' },
  { icon: Sparkles, label: 'Décor' },
  { icon: Music, label: 'Music' },
  { icon: Heart, label: 'Mehendi' },
]

export default function LandingPage() {
  return (
    <main className="min-h-screen gradient-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-display font-bold text-xl text-brand-700">
                VidAI
              </span>
            </div>
            <Link href="/intake" className="btn-primary py-2 px-4 text-xs">
              Start Planning
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Decorative badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 border border-brand-200 px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span className="text-sm font-semibold text-brand-700">
              AI-Powered Wedding Planning
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Plan your{' '}
            <span className="text-brand-500 relative">
              perfect
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-brand-200 rounded-full" />
            </span>{' '}
            <br />
            <span className="text-gold-600">Indian wedding</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get AI-powered vendor recommendations tailored to your{' '}
            <strong className="text-gray-800">city</strong>,{' '}
            <strong className="text-gray-800">budget</strong>, and{' '}
            <strong className="text-gray-800">priorities</strong> — in under 10
            seconds.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/intake" id="cta-start-planning" className="btn-primary text-base px-8 py-4">
              Start Planning <ChevronRight className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="flex -space-x-1">
                {['🌸', '💍', '✨'].map((emoji, i) => (
                  <span
                    key={i}
                    className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-sm"
                  >
                    {emoji}
                  </span>
                ))}
              </span>
              <span>1,000+ couples planned</span>
            </div>
          </div>

          {/* Vendor category pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-14">
            {vendorIcons.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100 text-sm text-gray-600 font-medium"
              >
                <Icon className="w-4 h-4 text-brand-500" />
                {label}
              </div>
            ))}
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100 text-sm text-gray-500">
              +3 more
            </div>
          </div>
        </div>
      </section>

      <HistorySection />

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need, in one place
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              From AI budget allocation to payment tracking — manage your entire
              wedding in one dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="card hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-12 text-center text-white shadow-2xl shadow-brand-500/30">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Your dream wedding starts here
            </h2>
            <p className="text-brand-100 text-lg mb-8 max-w-lg mx-auto">
              Answer 5 simple questions and get a complete, personalized vendor
              plan in seconds.
            </p>
            <Link
              href="/intake"
              id="cta-bottom-start"
              className="inline-flex items-center gap-2 bg-white text-brand-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              Start Planning → 
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-brand-500 fill-brand-500" />
            <span className="text-sm text-gray-500">
              VidAI — Made with love for Indian couples
            </span>
          </div>
          <p className="text-xs text-gray-400">
            AI-powered recommendations. Always consult vendors directly for quotes.
          </p>
        </div>
      </footer>
    </main>
  )
}

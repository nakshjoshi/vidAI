import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'VidAI — AI-Powered Indian Wedding Planner',
  description:
    'Plan your perfect Indian wedding with AI-powered vendor recommendations tailored to your city, budget, and priorities.',
  keywords:
    'Indian wedding planner, wedding budget, vendor recommendations, AI wedding, shaadi planner',
  openGraph: {
    title: 'VidAI — AI-Powered Indian Wedding Planner',
    description:
      'Get personalized vendor recommendations for your Indian wedding in seconds.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

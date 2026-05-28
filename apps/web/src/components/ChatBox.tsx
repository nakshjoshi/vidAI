'use client'

import React, { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Send, Bot, User, Loader2, Sparkles, MessageSquare } from 'lucide-react'
import { RecommendationsGetResponse } from '@wedding/types'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface ChatBoxProps {
  data: RecommendationsGetResponse
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

export function ChatBox({ data }: ChatBoxProps) {
  const { intake, recommendations } = data
  const [selectedContext, setSelectedContext] = useState<string>('')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Build the wedding plan context from the live data on screen, including matched vendors
  const contextData = `Wedding: ${intake.city}, ${intake.venueType}, ${intake.guestCount} guests.
Budget: ${intake.budgetBracket}.
Priorities: ${intake.priorities.join(', ')}.
Vendor Allocations and Matched Vendors:
${recommendations.map(r => {
  const vendorsStr = r.vendors && r.vendors.length > 0 
    ? r.vendors.map(v => `    * ${v.name} (Price: ₹${v.priceMin}-₹${v.priceMax}, Rating: ${v.rating}) - ${v.description}`).join('\n')
    : '    * No specific vendors matched.'
  return `- ${r.vendorCategory.replace('_', ' ').toUpperCase()}: ₹${r.allocatedBudget}
  Rationale: ${r.rationale}
  Matched Vendors:
${vendorsStr}`
}).join('\n')}`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
    }

    // Append the user message and clear input
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    // Create a placeholder assistant message that we'll stream into
    const assistantId = crypto.randomUUID()
    setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }])

    try {
      // Build conversation history in the format the backend expects
      const history = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }))

      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ messages: history, contextData, selectedContext }),
      })

      if (!response.ok || !response.body) {
        throw new Error(`Request failed: ${response.status}`)
      }

      // Read the SSE stream and append chunks to the assistant message
      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const raw = decoder.decode(value, { stream: true })
        // Each line is: "data: <json>\n\n"
        const lines = raw.split('\n').filter((l) => l.startsWith('data: '))
        for (const line of lines) {
          const jsonStr = line.slice(6).trim()
          if (jsonStr === '[DONE]') break
          try {
            const chunk = JSON.parse(jsonStr) as string
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, content: m.content + chunk } : m
              )
            )
          } catch {
            // Silently skip unparseable chunks
          }
        }
      }
    } catch (err) {
      setError('An error occurred while generating the response.')
      // Remove the empty assistant placeholder
      setMessages((prev) => prev.filter((m) => m.id !== assistantId))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-12 animate-slide-up">
      <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl overflow-hidden shadow-2xl shadow-brand-500/10 flex flex-col h-[500px]">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-50 to-brand-100/50 p-4 border-b border-brand-200/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-gray-900">VidAI Assistant</h3>
              <p className="text-xs text-gray-500">Ask questions about your wedding plan</p>
            </div>
          </div>

          {/* Context Selector — desktop */}
          <div className="hidden sm:block">
            <select
              value={selectedContext}
              onChange={(e) => setSelectedContext(e.target.value)}
              className="text-xs border-brand-200 bg-white/60 rounded-lg px-3 py-1.5 text-gray-700 outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
            >
              <option value="">General Plan</option>
              {recommendations.map((rec) => (
                <option key={rec.vendorCategory} value={rec.vendorCategory.replace('_', ' ')}>
                  Discuss: {rec.vendorCategory.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Context Selector — mobile */}
        <div className="sm:hidden p-2 border-b border-brand-100 bg-brand-50/30">
          <select
            value={selectedContext}
            onChange={(e) => setSelectedContext(e.target.value)}
            className="w-full text-xs border-brand-200 bg-white rounded-lg px-3 py-1.5 text-gray-700 outline-none focus:ring-2 focus:ring-brand-400 transition-all"
          >
            <option value="">General Plan</option>
            {recommendations.map((rec) => (
              <option key={rec.vendorCategory} value={rec.vendorCategory.replace('_', ' ')}>
                Discuss: {rec.vendorCategory.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
              <MessageSquare className="w-12 h-12 text-brand-300 mb-3" />
              <p className="text-sm text-gray-600 max-w-[250px]">
                Ask me anything about your budget, vendor choices, or how to negotiate prices!
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                  message.role === 'user' ? 'bg-gray-800 text-white' : 'bg-brand-100 text-brand-600'
                }`}
              >
                {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm ${
                  message.role === 'user'
                    ? 'bg-gray-800 text-white rounded-tr-sm whitespace-pre-wrap'
                    : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm'
                }`}
              >
                {message.role === 'user' ? (
                  message.content
                ) : (
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-2 space-y-1" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-2 space-y-1" {...props} />,
                      li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                      strong: ({ node, ...props }) => <strong className="font-semibold text-gray-900" {...props} />,
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
                
                {/* Show blinking cursor while this message is being streamed */}
                {isLoading && message.role === 'assistant' && message.content === '' && (
                  <span className="inline-block w-2 h-4 bg-brand-400 animate-pulse ml-0.5" />
                )}
              </div>
            </div>
          ))}

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 text-center">
              {error}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/50 border-t border-brand-100 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 p-1 pl-4 pr-1 shadow-sm focus-within:ring-2 focus-within:ring-brand-400 focus-within:border-transparent transition-all"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none py-2"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 rounded-lg bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

'use client'

import React, { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { Send, Bot, User, Loader2, Sparkles, MessageSquare } from 'lucide-react'
import { RecommendationsGetResponse } from '@wedding/types'

interface ChatBoxProps {
  data: RecommendationsGetResponse
}

export function ChatBox({ data }: ChatBoxProps) {
  const { intake, recommendations } = data
  const [selectedContext, setSelectedContext] = useState<string>('')
  const [input, setInput] = useState('')

  // Build a concise context string for the AI
  const contextData = `
Wedding: ${intake.city}, ${intake.venueType}, ${intake.guestCount} guests.
Budget: ${intake.budgetBracket}.
Priorities: ${intake.priorities.join(', ')}.
Vendor Allocations:
${recommendations.map(r => `- ${r.vendorCategory}: ${r.allocatedBudget} (${r.rationale})`).join('\n')}
`

  const { messages, sendMessage, status, error } = useChat({
    // @ts-ignore - The alpha typings of ai sdk omit api but the runtime requires it
    api: '/api/chat',
    body: {
      contextData,
      selectedContext,
    },
  })

  const isLoading = status === 'submitted' || status === 'streaming'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ role: 'user', parts: [{ type: 'text', text: input }] })
    setInput('')
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
          
          {/* Context Selector */}
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

        {/* Mobile Context Selector */}
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

          {messages.map((message) => {
            const contentText = message.parts
              .filter((p: any) => p.type === 'text')
              .map((p: any) => p.text)
              .join('')
            
            return (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                  message.role === 'user'
                    ? 'bg-gray-800 text-white'
                    : 'bg-brand-100 text-brand-600'
                }`}
              >
                {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm whitespace-pre-wrap ${
                  message.role === 'user'
                    ? 'bg-gray-800 text-white rounded-tr-sm'
                    : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm'
                }`}
              >
                {contentText}
              </div>
            </div>
          )})}
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 text-center">
              An error occurred while generating the response.
            </div>
          )}
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
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

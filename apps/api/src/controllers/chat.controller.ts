import type { Request, Response } from 'express'
import { asyncHandler } from '../utils'
import { ApiError } from '../utils'
import { aiProvider } from '../services/ai'

export const streamChat = asyncHandler(async (req: Request, res: Response) => {
  const { messages, contextData, selectedContext } = req.body as {
    messages: { role: string; content: string }[]
    contextData: string
    selectedContext: string
  }

  if (!messages || !Array.isArray(messages)) {
    throw new ApiError(400, 'messages array is required')
  }

  // Build the system prompt from the wedding plan context sent by the frontend
  const systemPrompt = `You are a professional Indian wedding planner.
You are helping a couple who has already received a detailed wedding plan from you.
The couple's current wedding plan context is as follows:
${contextData ?? ''}
${selectedContext ? `\nThe user is specifically asking about: ${selectedContext}` : ''}

Rules:
- Be concise, helpful, and polite.
- Base your answers strictly on the provided context where applicable.
- If the user asks about changing the budget for a specific vendor, advise them on the feasibility based on standard Indian wedding market rates for their city.
- Do not repeat the entire plan, just answer their specific question.`

  // Convert { role: 'user'|'assistant', content: string }[] to Google GenAI format
  // Google uses 'model' instead of 'assistant'
  const history: { role: 'user' | 'model'; parts: { text: string }[] }[] = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Accel-Buffering', 'no')
  res.flushHeaders()

  try {
    for await (const chunk of aiProvider.chatStream(systemPrompt, history)) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`)
    }
    // Signal end of stream
    res.write('data: [DONE]\n\n')
    res.end()
  } catch (err) {
    res.write(`data: ${JSON.stringify({ error: 'AI generation failed' })}\n\n`)
    res.end()
  }
})

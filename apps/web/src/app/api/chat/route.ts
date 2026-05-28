import { google } from '@ai-sdk/google'
import { streamText } from 'ai'

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages, contextData, selectedContext } = await req.json()

    // Add system context to the message history implicitly
    const systemPrompt = `You are a professional Indian wedding planner.
You are helping a couple who has already received a detailed wedding plan from you.
The couple's current wedding plan context is as follows:
${contextData}

${selectedContext ? `The user is specifically asking about: ${selectedContext}` : ''}

Rules:
- Be concise, helpful, and polite.
- Base your answers strictly on the provided context where applicable.
- If the user asks about changing the budget for a specific vendor, advise them on the feasibility based on standard Indian wedding market rates for their city.
- Do not repeat the entire plan, just answer their specific question.`

    const result = await streamText({
      model: google('gemini-2.5-flash-lite'),
      system: systemPrompt,
      messages,
      temperature: 0.7,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('Chat API Error:', error)
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

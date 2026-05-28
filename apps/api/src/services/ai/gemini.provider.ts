import { GoogleGenAI, Type } from '@google/genai'
import { AIProvider } from './provider'
import { logger } from '../../lib/logger'

// Gemini schema that mirrors RecommendationResponseSchema from @wedding/types
// Using responseMimeType + responseSchema guarantees structured JSON output
// without needing prompt-level JSON instructions or retry logic.
const recommendationSchema = {
  type: Type.OBJECT,
  properties: {
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          vendor_category:  { type: Type.STRING },
          priority_rank:    { type: Type.INTEGER },
          allocated_budget: { type: Type.INTEGER },
          rationale:        { type: Type.STRING },
        },
        required: ['vendor_category', 'priority_rank', 'allocated_budget', 'rationale'],
      },
      minItems: 16,
      maxItems: 16,
    },
  },
  required: ['recommendations'],
}

const MODEL = 'gemini-2.5-flash'

export class GeminiProvider implements AIProvider {
  private readonly ai: GoogleGenAI

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) throw new Error('GEMINI_API_KEY is not set')
    this.ai = new GoogleGenAI({ apiKey })
  }

  async recommend(systemPrompt: string, userPrompt: string): Promise<string> {
    logger.debug({ model: MODEL }, 'Calling Gemini for recommendation')

    const response = await this.ai.models.generateContent({
      model: MODEL,
      contents: `${systemPrompt}\n\n${userPrompt}`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: recommendationSchema,
        temperature: 0,
      },
    })

    const text = response.text ?? ''
    if (!text) throw new Error('Gemini returned an empty response')

    logger.debug('Gemini response received')
    return text
  }

  // Stream version — yields raw text chunks from the Gemini stream
  async *recommendStream(
    systemPrompt: string,
    userPrompt: string
  ): AsyncIterable<string> {
    const stream = await this.ai.models.generateContentStream({
      model: MODEL,
      contents: `${systemPrompt}\n\n${userPrompt}`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: recommendationSchema,
        temperature: 0,
      },
    })

    for await (const chunk of stream) {
      const text = chunk.text
      if (text) yield text
    }
  }
  // Chat stream — streams conversational reply tokens for the follow-up chat feature
  async *chatStream(
    systemPrompt: string,
    history: { role: 'user' | 'model'; parts: { text: string }[] }[]
  ): AsyncIterable<string> {
    const stream = await this.ai.models.generateContentStream({
      model: MODEL,
      contents: history,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    })

    for await (const chunk of stream) {
      const text = chunk.text
      if (text) yield text
    }
  }
}

export const geminiProvider = new GeminiProvider()

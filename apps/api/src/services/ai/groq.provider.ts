import Groq from 'groq-sdk'
import { AIProvider } from './provider'
import { logger } from '../../lib/logger'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export class GroqProvider implements AIProvider {
  async recommend(systemPrompt: string, userPrompt: string): Promise<string> {
    logger.debug('Calling Groq Llama 3.3 for recommendation')

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
      max_tokens: 2048,
      response_format: { type: 'json_object' },
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('Groq returned an empty response')
    }

    logger.debug({ tokens: completion.usage }, 'Groq response received')
    return content
  }

  async *recommendStream(
    systemPrompt: string,
    userPrompt: string
  ): AsyncIterable<string> {
    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
      max_tokens: 2048,
      stream: true,
    })

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content
      if (delta) yield delta
    }
  }
}

export const groqProvider = new GroqProvider()

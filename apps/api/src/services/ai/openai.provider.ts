import OpenAI from 'openai'
import { AIProvider } from './provider'
import { logger } from '../../lib/logger'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export class OpenAIProvider implements AIProvider {
  async recommend(systemPrompt: string, userPrompt: string): Promise<string> {
    logger.debug('Calling OpenAI GPT-4.1-mini (fallback) for recommendation')

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
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
      throw new Error('OpenAI returned an empty response')
    }

    logger.debug({ tokens: completion.usage }, 'OpenAI response received')
    return content
  }

  async *recommendStream(
    systemPrompt: string,
    userPrompt: string
  ): AsyncIterable<string> {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
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

export const openAIProvider = new OpenAIProvider()

// Default AI provider: Groq primary, OpenAI fallback
// Wraps both providers so callers never need to handle provider selection

import { AIProvider } from './provider'
import { groqProvider } from './groq.provider'
import { openAIProvider } from './openai.provider'
import { logger } from '../../lib/logger'

class FallbackAIProvider implements AIProvider {
  async recommend(systemPrompt: string, userPrompt: string): Promise<string> {
    try {
      return await groqProvider.recommend(systemPrompt, userPrompt)
    } catch (groqError) {
      logger.warn(
        { err: groqError },
        'Groq provider failed — falling back to OpenAI'
      )
      return await openAIProvider.recommend(systemPrompt, userPrompt)
    }
  }

  async *recommendStream(
    systemPrompt: string,
    userPrompt: string
  ): AsyncIterable<string> {
    try {
      yield* groqProvider.recommendStream(systemPrompt, userPrompt)
    } catch (groqError) {
      logger.warn(
        { err: groqError },
        'Groq stream failed — falling back to OpenAI stream'
      )
      yield* openAIProvider.recommendStream(systemPrompt, userPrompt)
    }
  }
}

export const aiProvider: AIProvider = new FallbackAIProvider()

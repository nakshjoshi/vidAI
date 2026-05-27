export interface AIProvider {
  recommend(systemPrompt: string, userPrompt: string): Promise<string>
  recommendStream(systemPrompt: string, userPrompt: string): AsyncIterable<string>
}

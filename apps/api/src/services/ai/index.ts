// AI provider — Google Gemini 2.5 Flash Lite
// Structured JSON output is enforced via responseMimeType + responseSchema,
// so no retry logic is required.

export { geminiProvider as aiProvider } from './gemini.provider'

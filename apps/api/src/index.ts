import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { requestLogger } from './middleware/requestLogger'
import { errorHandler } from './middleware/errorHandler'
import intakeRoutes from './routes/intake.routes'
import recommendationRoutes from './routes/recommendation.routes'
import paymentRoutes from './routes/payment.routes'
import chatRoutes from './routes/chat.routes'
import { logger } from './lib/logger'

const app: express.Express = express()
const PORT = process.env.PORT ?? 4000

// Core middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
    credentials: true,
  })
)
app.use(express.json())
app.use(requestLogger)

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API routes
app.use('/api/intake', intakeRoutes)
app.use('/api/recommendations', recommendationRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/chat', chatRoutes)

// Error handler — must be last
app.use(errorHandler)

app.listen(PORT, () => {
  logger.info(`Wedding Planner API running on http://localhost:${PORT}`)
})

export default app

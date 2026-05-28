import { Router } from 'express'
import { getRecommendations, streamRecommendations } from '../controllers/recommendation.controller'

const router: Router = Router()

// GET /api/recommendations/:id/stream — stream SSE AI JSON chunks + final data
router.get('/:id/stream', streamRecommendations)

// GET /api/recommendations/:id — return intake + recommendations + paymentSummary + events
router.get('/:id', getRecommendations)

export default router

import { Router } from 'express'
import { getRecommendations } from '../controllers/recommendation.controller'

const router: Router = Router()

// GET /api/recommendations/:id — return intake + recommendations + paymentSummary
router.get('/:id', getRecommendations)

export default router

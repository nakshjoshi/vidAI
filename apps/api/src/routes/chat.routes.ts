import { Router } from 'express'
import { streamChat } from '../controllers/chat.controller'

const router: Router = Router()

// POST /api/chat — stream SSE conversational AI response
router.post('/', streamChat)

export default router

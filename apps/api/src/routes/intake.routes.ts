import { Router } from 'express'
import { validate } from '../middleware/validate'
import { IntakeSchema } from '../validators'
import { submitIntake } from '../controllers/intake.controller'

const router = Router()

// POST /api/intake — validate → save intake → call AI → save recommendations → respond
router.post('/', validate(IntakeSchema), submitIntake)

export default router

import { Router } from 'express'
import { validate } from '../middleware/validate'
import { IntakeSchema } from '../validators'
import { submitIntake, getIntakesHistory } from '../controllers/intake.controller'

const router: Router = Router()

// GET /api/intake — return paginated history of intakes
router.get('/', getIntakesHistory)

// POST /api/intake — validate → save intake → call AI → save recommendations → respond
router.post('/', validate(IntakeSchema), submitIntake)

export default router

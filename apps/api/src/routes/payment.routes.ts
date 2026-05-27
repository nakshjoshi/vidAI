import { Router } from 'express'
import { validate } from '../middleware/validate'
import { PaymentSchema } from '../validators'
import { logPayment, getPayments } from '../controllers/payment.controller'

const router: Router = Router()

// POST /api/payments — validate → save payment
router.post('/', validate(PaymentSchema), logPayment)

// GET /api/payments/:intakeId — fetch all payments for an intake
router.get('/:intakeId', getPayments)

export default router

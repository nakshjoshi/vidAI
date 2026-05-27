import { Request, Response } from 'express'
import { Payment } from '@wedding/types/payment'
import { createPayment, findPaymentsByIntakeId } from '../repositories/payment.repository'
import { asyncHandler, ApiResponse } from '../utils'

export const logPayment = asyncHandler(async (req: Request<object, object, Payment>, res: Response) => {
  const payment = await createPayment({
    intakeId: req.body.intakeId,
    vendorCategory: req.body.vendorCategory,
    vendorName: req.body.vendorName,
    amountPaid: req.body.amountPaid,
    paymentDate: new Date(req.body.paymentDate),
  })

  res.status(201).json(new ApiResponse(201, payment, 'Payment logged successfully'))
})

export const getPayments = asyncHandler(async (req: Request<{ intakeId: string }>, res: Response) => {
  const payments = await findPaymentsByIntakeId(req.params.intakeId)
  res.json(new ApiResponse(200, payments))
})

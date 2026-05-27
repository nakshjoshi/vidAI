import { z } from 'zod'

export const PaymentSchema = z.object({
  intakeId: z.string().uuid('Must be a valid intake ID'),
  vendorCategory: z.string().min(1, 'Vendor category is required'),
  vendorName: z.string().min(1, 'Vendor name is required'),
  amountPaid: z
    .number({ invalid_type_error: 'Amount must be a number' })
    .int()
    .positive('Amount must be positive'),
  paymentDate: z.string().min(1, 'Payment date is required'),
})

export type Payment = z.infer<typeof PaymentSchema>

export const PaymentResponseSchema = z.object({
  id: z.string().uuid(),
  intakeId: z.string().uuid(),
  vendorCategory: z.string(),
  vendorName: z.string(),
  amountPaid: z.number(),
  paymentDate: z.string(),
  createdAt: z.string(),
})

export type PaymentResponse = z.infer<typeof PaymentResponseSchema>

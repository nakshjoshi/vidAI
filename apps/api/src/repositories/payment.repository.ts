import type { Payment } from '@wedding/db/generated/prisma'
import { prisma } from '@wedding/db'

export interface CreatePaymentInput {
  intakeId: string
  vendorCategory: string
  vendorName: string
  amountPaid: number
  paymentDate: Date
}

export async function createPayment(
  input: CreatePaymentInput
): Promise<Payment> {
  return prisma.payment.create({
    data: {
      intakeId: input.intakeId,
      vendorCategory: input.vendorCategory,
      vendorName: input.vendorName,
      amountPaid: input.amountPaid,
      paymentDate: input.paymentDate,
    },
  })
}

export async function findPaymentsByIntakeId(
  intakeId: string
): Promise<Payment[]> {
  return prisma.payment.findMany({
    where: { intakeId },
    orderBy: { createdAt: 'desc' },
  })
}

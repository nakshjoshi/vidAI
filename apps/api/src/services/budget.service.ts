// BudgetService — computes payment summary: allocated vs spent vs remaining per vendor category

import type { Recommendation, Payment } from '@wedding/db/generated/prisma'

export interface PaymentSummaryRow {
  vendorCategory: string
  allocated: number
  spent: number
  remaining: number
}

export class BudgetService {
  public computePaymentSummary(
    recommendations: Recommendation[],
    payments: Payment[]
  ): PaymentSummaryRow[] {
    const spentByCategory = payments.reduce<Record<string, number>>(
      (acc, payment) => {
        acc[payment.vendorCategory] =
          (acc[payment.vendorCategory] ?? 0) + payment.amountPaid
        return acc
      },
      {}
    )

    return recommendations
      .sort((a, b) => a.priorityRank - b.priorityRank)
      .map((rec) => {
        const spent = spentByCategory[rec.vendorCategory] ?? 0
        return {
          vendorCategory: rec.vendorCategory,
          allocated: rec.allocatedBudget,
          spent,
          remaining: rec.allocatedBudget - spent,
        }
      })
  }
}

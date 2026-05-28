import { prisma } from '@wedding/db'
import type { FinalizedBudget, FinalizedBudgetItem, ActualExpense } from '@wedding/db/generated/prisma'
import type { FinalizeSelectionItem, ExpenseItem } from '@wedding/types'

// ─── Finalized Budget ────────────────────────────────────────────────────────

export async function createFinalizedBudget(
  intakeId: string,
  totalBudget: number,
  selections: FinalizeSelectionItem[]
): Promise<FinalizedBudget & { items: FinalizedBudgetItem[] }> {
  return prisma.finalizedBudget.create({
    data: {
      intakeId,
      totalBudget,
      items: {
        create: selections.map((s) => ({
          vendorCategory: s.vendorCategory,
          vendorId: s.vendorId ?? null,
          vendorName: s.vendorName ?? null,
          finalBudget: s.finalBudget,
        })),
      },
    },
    include: { items: true },
  })
}

export async function findFinalizedBudgetById(
  budgetId: string
): Promise<(FinalizedBudget & { items: FinalizedBudgetItem[]; actualExpense: ActualExpense | null }) | null> {
  return prisma.finalizedBudget.findUnique({
    where: { id: budgetId },
    include: {
      items: true,
      actualExpense: true,
    },
  })
}

export async function findLatestFinalizedBudgetId(
  intakeId: string
): Promise<string | null> {
  const budget = await prisma.finalizedBudget.findFirst({
    where: { intakeId },
    orderBy: { createdAt: 'desc' },
    select: { id: true },
  })
  return budget?.id ?? null
}

export async function findFinalizedBudgetsPaginated(
  intakeId: string,
  page: number,
  limit: number
): Promise<{ data: FinalizedBudget[]; total: number }> {
  const skip = (page - 1) * limit
  const [data, total] = await Promise.all([
    prisma.finalizedBudget.findMany({
      where: { intakeId },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.finalizedBudget.count({ where: { intakeId } }),
  ])
  return { data, total }
}

// ─── Actual Expenses ─────────────────────────────────────────────────────────

export async function upsertActualExpense(
  budgetId: string,
  items: ExpenseItem[]
): Promise<ActualExpense> {
  return prisma.actualExpense.upsert({
    where: { budgetId },
    create: {
      budgetId,
      items: items as any,
    },
    update: {
      items: items as any,
    },
  })
}

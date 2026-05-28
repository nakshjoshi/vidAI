import { Request, Response } from 'express'
import { asyncHandler, ApiResponse, ApiError } from '../utils'
import { FinalizeSelectionSchema, ExpenseUpdateSchema } from '@wedding/types'
import {
  createFinalizedBudget,
  findFinalizedBudgetById,
  findLatestFinalizedBudgetId,
  findFinalizedBudgetsPaginated,
  upsertActualExpense,
} from '../repositories/budget.repository'

// POST /api/budget — Finalize a budget
export const finalizeBudget = asyncHandler(async (req: Request, res: Response) => {
  const parsed = FinalizeSelectionSchema.safeParse(req.body)
  if (!parsed.success) {
    throw new ApiError(400, 'Invalid request body', parsed.error.errors)
  }

  const { intakeId, selections } = parsed.data
  const totalBudget = selections.reduce((sum, s) => sum + s.finalBudget, 0)

  const budget = await createFinalizedBudget(intakeId, totalBudget, selections)

  res.status(201).json(new ApiResponse(201, budget, 'Budget finalized successfully'))
})

// GET /api/budget/latest/:intakeId — Get latest budget ID for an intake
export const getLatestBudget = asyncHandler(async (req: Request<{ intakeId: string }>, res: Response) => {
  const { intakeId } = req.params
  const budgetId = await findLatestFinalizedBudgetId(intakeId)
  res.json(new ApiResponse(200, { budgetId }))
})

// GET /api/budget/history/:intakeId — Paginated list of budgets for an intake
export const getBudgetHistory = asyncHandler(async (req: Request<{ intakeId: string }>, res: Response) => {
  const { intakeId } = req.params
  const page = Math.max(1, parseInt(req.query.page as string) || 1)
  const limit = Math.max(1, Math.min(10, parseInt(req.query.limit as string) || 3))

  const history = await findFinalizedBudgetsPaginated(intakeId, page, limit)
  res.json(new ApiResponse(200, history))
})

// GET /api/budget/:budgetId — Get full budget with items and actual expenses
export const getBudget = asyncHandler(async (req: Request<{ budgetId: string }>, res: Response) => {
  const { budgetId } = req.params
  const budget = await findFinalizedBudgetById(budgetId)

  if (!budget) {
    throw new ApiError(404, 'Finalized budget not found')
  }

  res.json(new ApiResponse(200, {
    id: budget.id,
    intakeId: budget.intakeId,
    totalBudget: budget.totalBudget,
    createdAt: budget.createdAt.toISOString(),
    items: budget.items.map((item) => ({
      id: item.id,
      vendorCategory: item.vendorCategory,
      vendorId: item.vendorId,
      vendorName: item.vendorName,
      finalBudget: item.finalBudget,
    })),
    actualExpense: budget.actualExpense
      ? { items: budget.actualExpense.items }
      : null,
  }))
})

// PUT /api/budget/:budgetId/expenses — Upsert actual expenses
export const updateExpenses = asyncHandler(async (req: Request<{ budgetId: string }>, res: Response) => {
  const { budgetId } = req.params
  const parsed = ExpenseUpdateSchema.safeParse(req.body)

  if (!parsed.success) {
    throw new ApiError(400, 'Invalid expense data', parsed.error.errors)
  }

  const expense = await upsertActualExpense(budgetId, parsed.data.items)
  res.json(new ApiResponse(200, expense, 'Expenses updated successfully'))
})

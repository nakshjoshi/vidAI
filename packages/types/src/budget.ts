import { z } from 'zod'

// ─── POST /api/budget — Finalize a budget ───────────────────────────────────

export const FinalizeSelectionItemSchema = z.object({
  vendorCategory: z.string().min(1),
  // 'vendor' = picked a vendor, 'ai_default' = use AI allocated budget, 'drop' = exclude category
  selectionType: z.enum(['vendor', 'ai_default', 'drop']),
  vendorId: z.string().optional(),      // required when selectionType = 'vendor'
  vendorName: z.string().optional(),    // required when selectionType = 'vendor'
  finalBudget: z.number().int().min(0), // 0 if dropped
})

export const FinalizeSelectionSchema = z.object({
  intakeId: z.string().uuid(),
  selections: z.array(FinalizeSelectionItemSchema).min(1),
})

export type FinalizeSelection = z.infer<typeof FinalizeSelectionSchema>
export type FinalizeSelectionItem = z.infer<typeof FinalizeSelectionItemSchema>

// ─── PUT /api/budget/:budgetId/expenses — Update actual expenses ─────────────

export const ExpenseItemSchema = z.object({
  vendorCategory: z.string().min(1),
  actualAmount: z.number().int().min(0),
})

export const ExpenseUpdateSchema = z.object({
  items: z.array(ExpenseItemSchema),
})

export type ExpenseUpdate = z.infer<typeof ExpenseUpdateSchema>
export type ExpenseItem = z.infer<typeof ExpenseItemSchema>

// ─── GET /api/budget/:budgetId — Response shape ─────────────────────────────

export interface FinalizedBudgetGetResponse {
  id: string
  intakeId: string
  totalBudget: number
  createdAt: string
  items: {
    id: string
    vendorCategory: string
    vendorId: string | null
    vendorName: string | null
    finalBudget: number
  }[]
  actualExpense: {
    items: ExpenseItem[]
  } | null
}

// ─── GET /api/budget/latest/:intakeId — Response shape ───────────────────────

export interface LatestBudgetResponse {
  budgetId: string | null
}

// ─── GET /api/budget/history/:intakeId — Paginated list ─────────────────────

export interface BudgetHistoryItem {
  id: string
  totalBudget: number
  createdAt: string
}

export interface BudgetHistoryResponse {
  data: BudgetHistoryItem[]
  total: number
}

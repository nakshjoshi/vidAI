import { Router } from 'express'
import {
  finalizeBudget,
  getLatestBudget,
  getBudgetHistory,
  getBudget,
  updateExpenses,
} from '../controllers/budget.controller'

const router: Router = Router()

// POST /api/budget — Create a finalized budget
router.post('/', finalizeBudget)

// GET /api/budget/latest/:intakeId — Get the latest budget ID for an intake
router.get('/latest/:intakeId', getLatestBudget)

// GET /api/budget/history/:intakeId — Get paginated budget history for an intake
router.get('/history/:intakeId', getBudgetHistory)

// GET /api/budget/:budgetId — Get a specific budget with items and actual expenses
router.get('/:budgetId', getBudget)

// PUT /api/budget/:budgetId/expenses — Upsert actual expenses for a budget
router.put('/:budgetId/expenses', updateExpenses)

export default router

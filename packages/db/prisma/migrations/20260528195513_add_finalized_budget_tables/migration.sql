-- CreateTable
CREATE TABLE "finalized_budgets" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "intake_id" UUID NOT NULL,
    "total_budget" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "finalized_budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "finalized_budget_items" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "budget_id" UUID NOT NULL,
    "vendor_category" TEXT NOT NULL,
    "vendor_id" TEXT,
    "vendor_name" TEXT,
    "final_budget" INTEGER NOT NULL,

    CONSTRAINT "finalized_budget_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actual_expenses" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "budget_id" UUID NOT NULL,
    "items" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "actual_expenses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_finalized_budgets_intake_id" ON "finalized_budgets"("intake_id");

-- CreateIndex
CREATE INDEX "idx_budget_items_budget_id" ON "finalized_budget_items"("budget_id");

-- CreateIndex
CREATE UNIQUE INDEX "actual_expenses_budget_id_key" ON "actual_expenses"("budget_id");

-- AddForeignKey
ALTER TABLE "finalized_budgets" ADD CONSTRAINT "finalized_budgets_intake_id_fkey" FOREIGN KEY ("intake_id") REFERENCES "wedding_intakes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finalized_budget_items" ADD CONSTRAINT "finalized_budget_items_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "finalized_budgets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actual_expenses" ADD CONSTRAINT "actual_expenses_budget_id_fkey" FOREIGN KEY ("budget_id") REFERENCES "finalized_budgets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

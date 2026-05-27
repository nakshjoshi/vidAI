-- CreateTable
CREATE TABLE "wedding_intakes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "wedding_date" DATE NOT NULL,
    "guest_count" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "venue_type" TEXT NOT NULL,
    "budget_bracket" TEXT NOT NULL,
    "budget_midpoint" INTEGER NOT NULL,
    "priorities" TEXT[],
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wedding_intakes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recommendations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "intake_id" UUID NOT NULL,
    "vendor_category" TEXT NOT NULL,
    "priority_rank" INTEGER NOT NULL,
    "allocated_budget" INTEGER NOT NULL,
    "rationale" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "intake_id" UUID NOT NULL,
    "vendor_category" TEXT NOT NULL,
    "vendor_name" TEXT NOT NULL,
    "amount_paid" INTEGER NOT NULL,
    "payment_date" DATE NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_recommendations_intake_id" ON "recommendations"("intake_id");

-- CreateIndex
CREATE INDEX "idx_payments_intake_id" ON "payments"("intake_id");

-- AddForeignKey
ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_intake_id_fkey" FOREIGN KEY ("intake_id") REFERENCES "wedding_intakes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_intake_id_fkey" FOREIGN KEY ("intake_id") REFERENCES "wedding_intakes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

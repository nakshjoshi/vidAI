-- Migration 001: Initial schema
-- Wedding Planner — 3 flat tables

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE wedding_intakes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_date DATE NOT NULL,
  guest_count INT NOT NULL,
  city TEXT NOT NULL,
  venue_type TEXT NOT NULL,
  budget_bracket TEXT NOT NULL,
  budget_midpoint INT NOT NULL,
  priorities TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  intake_id UUID REFERENCES wedding_intakes(id) ON DELETE CASCADE,
  vendor_category TEXT NOT NULL,
  priority_rank INT NOT NULL,
  allocated_budget INT NOT NULL,
  rationale TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  intake_id UUID REFERENCES wedding_intakes(id) ON DELETE CASCADE,
  vendor_category TEXT NOT NULL,
  vendor_name TEXT NOT NULL,
  amount_paid INT NOT NULL,
  payment_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_recommendations_intake_id ON recommendations(intake_id);
CREATE INDEX idx_payments_intake_id ON payments(intake_id);

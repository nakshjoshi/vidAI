# VidAI — AI-Powered Indian Wedding Planner

> A full-stack, production-ready wedding planning platform that uses a Large Language Model to intelligently allocate budgets, match local vendors, and guide Indian couples through their entire wedding journey — from first idea to the final paisa.

| | |
|---|---|
| **Live App** | [vidai-web-5vsto.ondigitalocean.app](https://vidai-web-5vsto.ondigitalocean.app/) |
| **Demo Walkthrough (Loom)** | [Watch the walkthrough](https://www.loom.com/share/459cd349d0124ecb9fe99c8abb9f9f7a) |
| **Demo Walkthrough (Google Drive fallback)** | [Open in Drive](https://drive.google.com/drive/folders/1FT-qFPpaXa1RMcUp5A7tw68F1r7SEsfn?usp=sharing) |

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Monorepo Structure](#monorepo-structure)
- [System Design](#system-design)
- [Database Design](#database-design)
- [API Reference](#api-reference)
- [Prompt Engineering](#prompt-engineering)
- [User Workflow](#user-workflow)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)

---

## Overview

VidAI solves a real problem: Indian weddings are extraordinarily complex events involving 10–16 different vendor categories (Venue, Catering, Photography, Mehendi, Pandit, Décor, etc.), months of planning, and budgets that can range from ₹5L to ₹5Cr. Couples are overwhelmed.

VidAI acts as a senior wedding planner in your pocket. It takes your specific wedding details — budget, city, guest count, and what matters most to you — and uses a Gemini LLM to produce a deeply personalized, city-aware, priority-weighted budget allocation plan across all 16 vendor categories. It then matches you with real local vendors, lets you finalize your budget, and tracks your actual spending over time.

---

## Live Demo

- **Live App:** [https://vidai-web-5vsto.ondigitalocean.app](https://vidai-web-5vsto.ondigitalocean.app/)
- **Demo Walkthrough (Loom):** [https://www.loom.com/share/459cd349d0124ecb9fe99c8abb9f9f7a](https://www.loom.com/share/459cd349d0124ecb9fe99c8abb9f9f7a)
- **Demo Walkthrough (Google Drive fallback):** [https://drive.google.com/drive/folders/1FT-qFPpaXa1RMcUp5A7tw68F1r7SEsfn](https://drive.google.com/drive/folders/1FT-qFPpaXa1RMcUp5A7tw68F1r7SEsfn?usp=sharing)

---

## Features

### Intelligent Multi-Step Intake Form
A polished 5-screen form (built with `react-hook-form` + `zod`) that captures:
- Wedding date with a minimum lead-time validation (at least 3 months out)
- Expected guest count (10–5,000)
- City selection and venue type (Banquet Hall, Farmhouse, Destination, Hotel, Outdoor, Temple)
- Budget bracket selection (₹5L–₹10L up to ₹1Cr+), displayed with per-bracket midpoints
- Exactly 2 top priorities from: Photography, Food, Décor, Music, Makeup, Venue, Entertainment, Mehendi

Form progress is auto-saved to `localStorage` so users never lose their data mid-flow.

### AI Recommendation Engine with SSE Streaming
The heart of the product. When a user submits the intake form:
1. The backend calls **Google Gemini** with a highly engineered prompt containing all 16 vendor category slugs and the couple's priorities.
2. Gemini returns structured JSON via a `responseSchema` — the model is constrained at the API level to produce valid, parseable output.
3. The raw JSON is streamed chunk-by-chunk over **Server-Sent Events (SSE)** to the frontend.
4. The UI renders a live "Matrix-style" typing animation as the JSON arrives.
5. On stream completion, the full payload is Zod-validated, saved to PostgreSQL, and the UI transitions to the rich recommendations dashboard.

On revisit, the frontend calls `GET /api/recommendations/:id` first. If recommendations already exist in the database, the LLM is **never called again** — the saved data is served directly.

### Recommendations Dashboard (3 Tabs)

**Tab 1 — Vendors & Budgets**
Displays all 16 vendor categories sorted by priority rank. Each card shows:
- The AI's allocated budget for that category
- The rationale (a 1–2 sentence justification from the LLM, specific to the couple's city and priorities)
- A list of matched local vendors from the database, horizontally scrollable, with pricing and match tags

Priority categories are visually highlighted with a golden "Priority" badge and a colored ring.

**Tab 2 — Event Timeline**
A vertical timeline of all Indian wedding events (Haldi, Mehendi, Sangeet, Baraat, Wedding Ceremony, Reception) in chronological order. Each event card shows which vendor categories are required for it. If a required vendor matches the couple's chosen priorities, it is highlighted.

**Tab 3 — Finalize Budget**
For each vendor category, the user can:
- **Pick a matched vendor** from the horizontally scrollable list (locks in that vendor's `priceMin`)
- **Use AI Default** (uses the AI's allocated budget figure)
- **Drop the category** (sets allocation to ₹0, removes it from the tracker)

A sticky bottom bar shows the running total of the finalized budget in real-time. Clicking "Lock In Budget" saves a `FinalizedBudget` record to Postgres and redirects to the Budget Tracker. Past finalized budgets are shown with pagination so couples can compare multiple budgeting scenarios.

### Real-Time Budget Tracker
Accessible at `/track-budget/[budgetId]`. Shows:
- A 3-tile summary: Total Allocated, Actual Spent, and Remaining Balance (with over-budget coloring in red)
- A category-by-category breakdown table with the locked-in vendor name, allocated amount, an editable "Actual Spent" input, and a colored "Slack/Over" indicator
- A dynamic progress bar per category that turns yellow above 75% spend and red if over budget

### Contextual AI Chat Assistant
A floating `<ChatBox />` component at the bottom of the Recommendations page. It maintains the full conversation history client-side and passes the user's specific intake details and recommendations as system context to the LLM on every message. This allows the couple to ask questions like *"Is ₹1.5L for photography realistic in Rishikesh?"* and receive a contextually accurate, personalized answer.

---

## Tech Stack

### Frontend — `apps/web`

| Technology | Purpose |
|---|---|
| **Next.js 14** (App Router) | React framework, client-side routing, SSE consumption via `EventSource` |
| **Tailwind CSS** | Utility-first styling; custom design tokens for glassmorphism, gradients, animations |
| **React Hook Form** | Performant form state management; uncontrolled inputs with validation |
| **Zod** | Client-side schema validation; shares schemas with the backend via `@wedding/types` |
| **Lucide React** | Icon library |

### Backend — `apps/api`

| Technology | Purpose |
|---|---|
| **Node.js + Express.js** | HTTP server; clean layered architecture (routes → controllers → services → repositories) |
| **Google Gemini API** | LLM powering recommendations and chat; uses `responseSchema` for structured JSON output |
| **Zod** | Server-side request body validation and LLM output validation |
| **Pino** (`logger`) | Structured JSON logging |
| **CORS + Dotenv** | Cross-origin configuration and environment management |

### Database — `packages/db`

| Technology | Purpose |
|---|---|
| **Prisma ORM v7** | Schema definition, migrations, type-safe query builder |
| **PostgreSQL** (Supabase) | Relational database; all data persisted with proper FK relationships and indexes |

### Shared Packages

| Package | Purpose |
|---|---|
| **`@wedding/types`** | Shared Zod schemas (IntakeSchema, RecommendationResponseSchema) and TypeScript interfaces used by both `apps/web` and `apps/api` |
| **`@wedding/db`** | Exports the Prisma Client singleton for use in the API |
| **`@wedding/config`** | Shared ESLint and TypeScript configs |

### Monorepo Tooling

| Tool | Purpose |
|---|---|
| **Turborepo** | Orchestrates concurrent `dev`, `build`, `lint` tasks with intelligent caching |
| **pnpm** | Fast, disk-efficient package manager with workspace support |
| **TypeScript 5.9** | Strict end-to-end type safety across all packages |

---

## Monorepo Structure

```text
VidAI/
├── apps/
│   ├── api/                        # Express.js REST API
│   │   └── src/
│   │       ├── controllers/        # Route handlers — thin layer, delegates to services
│   │       │   ├── intake.controller.ts
│   │       │   ├── recommendation.controller.ts
│   │       │   ├── budget.controller.ts
│   │       │   ├── payment.controller.ts
│   │       │   └── chat.controller.ts
│   │       ├── services/           # Business logic — orchestrates DB and AI calls
│   │       │   ├── recommendation.service.ts
│   │       │   ├── budget.service.ts
│   │       │   ├── vendor.service.ts
│   │       │   └── ai/             # LLM provider abstraction
│   │       ├── repositories/       # Data access layer — raw Prisma queries
│   │       ├── prompts/            # Prompt builder functions
│   │       │   └── recommendation.prompt.ts
│   │       ├── middleware/         # errorHandler, requestLogger
│   │       ├── validators/         # Zod-based request validators
│   │       ├── utils/              # asyncHandler, ApiError, ApiResponse
│   │       └── index.ts            # Server bootstrap, route mounting
│   │
│   └── web/                        # Next.js 14 App Router frontend
│       └── src/
│           ├── app/
│           │   ├── page.tsx            # Landing page
│           │   ├── intake/page.tsx     # 5-step intake form
│           │   ├── recommendations/
│           │   │   └── [intakeId]/page.tsx  # Recommendations dashboard
│           │   └── track-budget/
│           │       └── [budgetId]/page.tsx  # Budget tracker
│           └── components/
│               ├── ChatBox.tsx          # AI chat assistant
│               └── HistorySection.tsx   # Past budget history
│
└── packages/
    ├── db/
    │   ├── prisma/
    │   │   ├── schema.prisma       # Canonical data model
    │   │   └── migrations/         # SQL migration history
    │   └── src/index.ts            # Prisma Client export
    ├── types/
    │   └── src/                    # Zod schemas shared between web and api
    └── typescript-config/          # Shared tsconfig.json bases
```

---

## System Design

```
Browser (Next.js Client)
        │
        │  POST /api/intake
        ├─────────────────────────────► Express API
        │                                    │
        │                               Zod Validate
        │                                    │
        │                               Prisma INSERT
        │                               WeddingIntake
        │                                    │
        │◄──────────────── { intakeId } ─────┘
        │
        │  Redirect → /recommendations/[intakeId]
        │
        │  GET /api/recommendations/:id
        ├─────────────────────────────► Express API
        │                                    │
        │                          Recommendations exist?
        │                           /               \
        │                         YES               NO
        │                          │                 │
        │                    Return saved       Open SSE stream
        │                    DB records         to Gemini API
        │                          │                 │
        │                          │         Stream chunks back
        │◄─── SSE: event:chunk ───────────────┘ (typing effect)
        │
        │◄─── SSE: event:done ────── Full JSON + Zod validate
        │                            + Prisma INSERT Recommendations
        │                            + Vendor matching query
        │
        │  POST /api/budget  (on "Lock In")
        ├─────────────────────────────► Zod Validate → Prisma INSERT
        │                               FinalizedBudget + Items
        │◄──────────────── { budgetId }
        │
        │  Redirect → /track-budget/[budgetId]
        │
        │  GET /api/budget/:budgetId
        ├─────────────────────────────► Prisma SELECT → Return JSON
        │
        │  PUT /api/budget/:budgetId/expenses
        ├─────────────────────────────► Zod Validate → Prisma UPSERT
```

---

## Database Design

The schema is purpose-built for a multi-step, long-running planning workflow where a single couple (`WeddingIntake`) generates recommendations, finalizes multiple budget scenarios, and tracks expenses over months.

### Entity Relationship Overview

```
WeddingIntake
    │
    ├──[has many]──► Recommendation       (AI-generated, one per vendor category)
    │
    └──[has many]──► FinalizedBudget      (one per "Lock In" action)
                          │
                          └──[has many]──► FinalizedBudgetItem   (one per category)
                                               │
                                               └──[references]──► Vendor
                                          
                          └──[has one]───► ActualExpense         (running spend log)

Vendor  (pre-seeded, queryable by city + category)
```

### Table Definitions

**`wedding_intakes`** — Root record created on form submission.
```sql
id             UUID PRIMARY KEY DEFAULT gen_random_uuid()
wedding_date   DATE NOT NULL
guest_count    INTEGER NOT NULL
city           TEXT NOT NULL
venue_type     TEXT NOT NULL
budget_bracket TEXT NOT NULL      -- e.g. '10l_20l', '20l_35l'
budget_midpoint INTEGER NOT NULL  -- computed midpoint used by AI prompt
priorities     TEXT[] NOT NULL     -- exactly 2 elements, e.g. ['Photography','Food']
chat_history   JSONB DEFAULT '[]' -- conversation history for the AI chat assistant
created_at     TIMESTAMPTZ DEFAULT now()
```

**`recommendations`** — AI-generated budget allocations. One row per vendor category per intake.
```sql
id               UUID PRIMARY KEY DEFAULT gen_random_uuid()
intake_id        UUID REFERENCES wedding_intakes(id) ON DELETE CASCADE
vendor_category  TEXT NOT NULL    -- e.g. 'photography', 'catering', 'venue'
priority_rank    INTEGER NOT NULL -- 1 = highest priority; unique per intake
allocated_budget INTEGER NOT NULL -- in INR (rupees, not paise)
rationale        TEXT NOT NULL    -- 1–2 sentence LLM justification
created_at       TIMESTAMPTZ DEFAULT now()

INDEX: idx_recommendations_intake_id (intake_id)
```

**`vendors`** — Pre-seeded vendor directory, queryable by city and category.
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
name            TEXT NOT NULL
category        TEXT NOT NULL      -- matches recommendation.vendor_category slugs
city            TEXT NOT NULL
description     TEXT NOT NULL
price_min       INTEGER NOT NULL   -- starting price in INR
price_max       INTEGER NOT NULL
rating          FLOAT DEFAULT 4.0  -- 1.0 to 5.0
tier            TEXT NOT NULL      -- 'budget' | 'mid' | 'premium'
tags            TEXT[]
cover_image_url TEXT
phone           TEXT
email           TEXT
website         TEXT
created_at      TIMESTAMPTZ DEFAULT now()

INDEX: idx_vendors_city_category (city, category)
```

**`finalized_budgets`** — A snapshot created each time the user clicks "Lock In Budget".
```sql
id           UUID PRIMARY KEY DEFAULT gen_random_uuid()
intake_id    UUID REFERENCES wedding_intakes(id) ON DELETE CASCADE
total_budget INTEGER NOT NULL  -- sum of all item final_budgets
created_at   TIMESTAMPTZ DEFAULT now()

INDEX: idx_finalized_budgets_intake_id (intake_id)
```

**`finalized_budget_items`** — The per-category breakdown of a finalized budget.
```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
budget_id       UUID REFERENCES finalized_budgets(id) ON DELETE CASCADE
vendor_category TEXT NOT NULL
vendor_id       UUID NULLABLE   -- null if 'ai_default' or 'drop' selection
vendor_name     TEXT NULLABLE
final_budget    INTEGER NOT NULL -- 0 if category was dropped

INDEX: idx_budget_items_budget_id (budget_id)
```

**`actual_expenses`** — Tracks real-world spend against each finalized budget.
```sql
id        UUID PRIMARY KEY DEFAULT gen_random_uuid()
budget_id UUID UNIQUE REFERENCES finalized_budgets(id) ON DELETE CASCADE
items     JSONB DEFAULT '[]'
-- items structure: [{ vendorCategory: string, actualAmount: number }]
```

---

## API Reference

All responses follow a consistent JSON envelope:
```json
{
  "statusCode": 200,
  "data": { ... },
  "message": "Success"
}
```

Errors follow:
```json
{
  "statusCode": 400,
  "message": "Invalid request body",
  "errors": [ ... ]
}
```

### Intake

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/intake` | Creates a new `WeddingIntake`. Validates body against `IntakeSchema` (Zod). Returns `{ intakeId }`. |

### Recommendations

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/recommendations/:id` | Fetches saved recommendations for an intake. Returns 404 if not yet generated (triggers SSE stream on frontend). |
| `GET` | `/api/recommendations/:id/stream` | Opens an SSE connection. Streams raw LLM JSON chunks as `event: chunk`, then sends the full enriched payload as `event: done`. On error, sends `event: error`. |

### Budget

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/budget` | Creates a `FinalizedBudget` from user selections. Body: `{ intakeId, selections: [{ vendorCategory, selectionType, vendorId?, vendorName?, finalBudget }] }`. |
| `GET` | `/api/budget/:budgetId` | Returns a full `FinalizedBudget` with its items and current `ActualExpense`. |
| `PUT` | `/api/budget/:budgetId/expenses` | Upserts the `ActualExpense` record for a budget. Body: `{ items: [{ vendorCategory, actualAmount }] }`. |
| `GET` | `/api/budget/latest/:intakeId` | Returns the most recently created `budgetId` for a given intake (used for the nav "Budget Tracker" link). |
| `GET` | `/api/budget/history/:intakeId` | Returns paginated list of all finalized budgets for an intake. Query params: `page`, `limit`. |

### Chat

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/chat` | Sends a message to the LLM with full recommendation context injected as system prompt. Returns a text response. Conversation history is managed client-side. |

### Health

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Returns `{ status: 'ok', timestamp }`. Used for deployment health checks. |

---

## Prompt Engineering

The recommendation prompt is built in `apps/api/src/prompts/recommendation.prompt.ts` and is split into a `systemPrompt` and a `userPrompt`.

**System Prompt responsibilities:**
- Defines the AI's persona: *"a senior Indian wedding planner with 15 years of experience"*
- Enforces the exact list of 16 vendor category slugs (`venue`, `photography`, `catering`, `decor`, `music_dj`, `mehendi_artist`, `choreographer`, `pandit`, `makeup_beauty`, `bridal_wear`, `groom_wear`, `florist`, `lighting`, `bartender`, `invitations`)
- Maps the couple's high-level priority labels (e.g., "Photography") to the specific category slugs that should receive higher rank and budget (e.g., `['photography', 'videography']`)
- Enforces budget constraints: the sum of all `allocated_budget` values must be ≤ the couple's `budgetMidpoint`
- Enforces uniqueness: `priority_rank` values must be unique integers from 1 to 16
- Constrains rationale length: each rationale ≤ 25 words and must be city-specific
- Enforces realism: *"Don't over-allocate to low-cost categories"* — a makeup artist in Rishikesh costs ₹1–2.5L regardless of priority

**User Prompt:**
Injects the concrete, instance-specific values: `weddingDate`, `monthsAway`, `guestCount`, `city`, `venueType`, `budgetMidpoint`, and the two priorities with their resolved category slugs.

**Structured Output:**
VidAI uses Gemini's `responseSchema` feature to constrain the model to return JSON that exactly matches the `RecommendationResponseSchema` Zod schema. After streaming, the accumulated text is still validated with `RecommendationResponseSchema.safeParse()` as a safety net — if validation fails, a `422` error is returned to the client.

---

## User Workflow

### Step 1 — Intake Form (`/intake`)
User fills in the 5-step form. Per-step validation runs on "Continue" click. All field data is cached in `localStorage` under the key `vidai_intake_form` in case the user refreshes. On final submit, a `POST /api/intake` call is made and the user is redirected to `/recommendations/[intakeId]` immediately.

### Step 2 — AI Streaming (`/recommendations/[intakeId]`)
On mount, the page calls `GET /api/recommendations/:id`:
- **If 200 OK:** Recommendations already exist. Render immediately. No LLM call.
- **If 404:** Open an `EventSource` to `/api/recommendations/:id/stream`. Display the Matrix-style typing screen. Handle `event:chunk`, `event:done`, and `event:error`.

### Step 3 — Review & Explore
User browses the 3-tab dashboard (Vendors & Budgets, Event Timeline, Finalize). The "Vendors & Budgets" tab shows the full AI recommendation set. Each card includes matched local vendors fetched from the `vendors` table and filtered by city and budget proximity.

### Step 4 — Finalize Budget
User selects vendors (or AI defaults, or drops categories). The sticky "Lock In Budget" bar shows the running total. On click, `POST /api/budget` is called, a `FinalizedBudget` is created, and the user is redirected to the tracker.

### Step 5 — Track Spending (`/track-budget/[budgetId]`)
User returns to this page over the following weeks and months. They enter actual amounts paid in the inline inputs. On "Save Expenses", `PUT /api/budget/:budgetId/expenses` updates the `ActualExpense` record. The summary tiles and progress bars refresh to reflect the current reality.

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **pnpm** v9 — `npm install -g pnpm`
- **PostgreSQL** — local or hosted (Supabase recommended)
- **Google Gemini API Key** — [Get one here](https://aistudio.google.com/apikey)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/vidAI.git
cd vidAI

# 2. Install all dependencies across the monorepo
pnpm install
```

### Environment Variables

**`packages/db/.env`**
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME?schema=public"
```

**`apps/api/.env`**
```env
PORT=4000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME?schema=public"
CORS_ORIGIN="http://localhost:3000"
GEMINI_API_KEY="your_google_gemini_api_key"
```

**`apps/web/.env.local`**
```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

### Database Setup

```bash
# Push the schema and run migrations
cd packages/db
pnpm dlx prisma migrate dev --name init

# Generate the Prisma client
pnpm dlx prisma generate

# (Optional) Seed the vendors table
cd ../../apps/api
pnpm ts-node src/scripts/seed-vendors.ts
```

### Run the Development Servers

```bash
# From the repository root — starts both Next.js (port 3000) and Express (port 4000) concurrently
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

All scripts run from the repository root via Turborepo:

| Script | Description |
|--------|-------------|
| `pnpm dev` | Starts all apps in development mode concurrently |
| `pnpm build` | Builds all apps and packages for production |
| `pnpm lint` | Runs ESLint across the entire monorepo |
| `pnpm check-types` | Runs `tsc --noEmit` across all packages |
| `pnpm format` | Runs Prettier on all `.ts`, `.tsx`, and `.md` files |
| `pnpm db:generate` | Re-generates the Prisma Client |
| `pnpm db:push` | Pushes schema changes to the database without creating a migration file |

---

*Built for Indian couples. Designed to feel like a real product.*

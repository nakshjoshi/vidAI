-- AlterTable
ALTER TABLE "wedding_intakes" ADD COLUMN     "chat_history" JSONB NOT NULL DEFAULT '[]';

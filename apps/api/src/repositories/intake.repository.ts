import type { WeddingIntake } from '@wedding/db/generated/prisma'
import { prisma } from '@wedding/db'

export interface CreateIntakeInput {
  weddingDate: Date
  guestCount: number
  city: string
  venueType: string
  budgetBracket: string
  budgetMidpoint: number
  priorities: string[]
}

export async function createIntake(
  input: CreateIntakeInput
): Promise<WeddingIntake> {
  return prisma.weddingIntake.create({
    data: {
      weddingDate: input.weddingDate,
      guestCount: input.guestCount,
      city: input.city,
      venueType: input.venueType,
      budgetBracket: input.budgetBracket,
      budgetMidpoint: input.budgetMidpoint,
      priorities: input.priorities,
    },
  })
}

export async function findIntakeById(
  id: string
): Promise<WeddingIntake | null> {
  return prisma.weddingIntake.findUnique({ where: { id } })
}

export async function updateIntakeChatHistory(
  id: string,
  chatHistory: any
): Promise<WeddingIntake> {
  return prisma.weddingIntake.update({
    where: { id },
    data: { chatHistory },
  })
}


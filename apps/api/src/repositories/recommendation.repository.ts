import type { Recommendation } from '@wedding/db/generated/prisma'
import { prisma } from '@wedding/db'

export interface CreateRecommendationInput {
  intakeId: string
  vendorCategory: string
  priorityRank: number
  allocatedBudget: number
  rationale: string
}

export async function createManyRecommendations(
  items: CreateRecommendationInput[]
): Promise<Recommendation[]> {
  await prisma.recommendation.createMany({ data: items })
  // createMany doesn't return rows on all providers — fetch them back
  return prisma.recommendation.findMany({
    where: { intakeId: items[0]?.intakeId },
    orderBy: { priorityRank: 'asc' },
  })
}

export async function findRecommendationsByIntakeId(
  intakeId: string
): Promise<Recommendation[]> {
  return prisma.recommendation.findMany({
    where: { intakeId },
    orderBy: { priorityRank: 'asc' },
  })
}

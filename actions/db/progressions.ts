"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/db/db"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"
import { InsertProgression, SelectProgression, progressionsTable } from "@/db/schema"

export async function createProgressionAction(
  progression: Omit<InsertProgression, "id" | "userId" | "createdAt" | "updatedAt">
): Promise<ActionState<SelectProgression>> {
  try {
    const { userId } = await auth()
    if (!userId) return { isSuccess: false, message: "Unauthorized" }

    const [newProgression] = await db.insert(progressionsTable).values({
      ...progression,
      userId
    }).returning()

    return {
      isSuccess: true,
      message: "Progression created successfully",
      data: newProgression
    }
  } catch (error) {
    console.error("Error creating progression:", error)
    return { isSuccess: false, message: "Failed to create progression" }
  }
}

export async function getProgressionAction(
  id: string
): Promise<ActionState<SelectProgression>> {
  try {
    const { userId } = await auth()
    if (!userId) return { isSuccess: false, message: "Unauthorized" }

    const progression = await db.query.progressions.findFirst({
      where: eq(progressionsTable.id, id)
    })

    if (!progression) {
      return { isSuccess: false, message: "Progression not found" }
    }

    if (progression.userId !== userId) {
      return { isSuccess: false, message: "Unauthorized" }
    }

    return {
      isSuccess: true,
      message: "Progression retrieved successfully",
      data: progression
    }
  } catch (error) {
    console.error("Error getting progression:", error)
    return { isSuccess: false, message: "Failed to get progression" }
  }
}

export async function getProgressionsAction(): Promise<ActionState<SelectProgression[]>> {
  try {
    const { userId } = await auth()
    if (!userId) return { isSuccess: false, message: "Unauthorized" }

    const progressions = await db.query.progressions.findMany({
      where: eq(progressionsTable.userId, userId),
      orderBy: (progressions, { desc }) => [desc(progressions.updatedAt)]
    })

    return {
      isSuccess: true,
      message: "Progressions retrieved successfully",
      data: progressions
    }
  } catch (error) {
    console.error("Error getting progressions:", error)
    return { isSuccess: false, message: "Failed to get progressions" }
  }
}

export async function updateProgressionAction(
  id: string,
  data: Partial<Omit<InsertProgression, "id" | "userId" | "createdAt" | "updatedAt">>
): Promise<ActionState<SelectProgression>> {
  try {
    const { userId } = await auth()
    if (!userId) return { isSuccess: false, message: "Unauthorized" }

    const existingProgression = await db.query.progressions.findFirst({
      where: eq(progressionsTable.id, id)
    })

    if (!existingProgression) {
      return { isSuccess: false, message: "Progression not found" }
    }

    if (existingProgression.userId !== userId) {
      return { isSuccess: false, message: "Unauthorized" }
    }

    const [updatedProgression] = await db
      .update(progressionsTable)
      .set(data)
      .where(eq(progressionsTable.id, id))
      .returning()

    return {
      isSuccess: true,
      message: "Progression updated successfully",
      data: updatedProgression
    }
  } catch (error) {
    console.error("Error updating progression:", error)
    return { isSuccess: false, message: "Failed to update progression" }
  }
}

export async function deleteProgressionAction(
  id: string
): Promise<ActionState<void>> {
  try {
    const { userId } = await auth()
    if (!userId) return { isSuccess: false, message: "Unauthorized" }

    const existingProgression = await db.query.progressions.findFirst({
      where: eq(progressionsTable.id, id)
    })

    if (!existingProgression) {
      return { isSuccess: false, message: "Progression not found" }
    }

    if (existingProgression.userId !== userId) {
      return { isSuccess: false, message: "Unauthorized" }
    }

    await db.delete(progressionsTable).where(eq(progressionsTable.id, id))

    return {
      isSuccess: true,
      message: "Progression deleted successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error deleting progression:", error)
    return { isSuccess: false, message: "Failed to delete progression" }
  }
}
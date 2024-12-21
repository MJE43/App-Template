"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/db/db"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"
import { InsertContext, SelectContext, contextsTable } from "@/db/schema"

export async function createContextAction(
  context: Omit<InsertContext, "id" | "userId" | "createdAt" | "updatedAt">
): Promise<ActionState<SelectContext>> {
  try {
    const { userId } = await auth()
    if (!userId) return { isSuccess: false, message: "Unauthorized" }

    const [newContext] = await db.insert(contextsTable).values({
      ...context,
      userId
    }).returning()

    return {
      isSuccess: true,
      message: "Context created successfully",
      data: newContext
    }
  } catch (error) {
    console.error("Error creating context:", error)
    return { isSuccess: false, message: "Failed to create context" }
  }
}

export async function getContextsForProgressionAction(
  progressionId: string
): Promise<ActionState<SelectContext[]>> {
  try {
    const { userId } = await auth()
    if (!userId) return { isSuccess: false, message: "Unauthorized" }

    const contexts = await db.query.contexts.findMany({
      where: eq(contextsTable.progressionId, progressionId),
      orderBy: (contexts, { desc }) => [desc(contexts.createdAt)]
    })

    if (contexts.length > 0 && contexts[0].userId !== userId) {
      return { isSuccess: false, message: "Unauthorized" }
    }

    return {
      isSuccess: true,
      message: "Contexts retrieved successfully",
      data: contexts
    }
  } catch (error) {
    console.error("Error getting contexts:", error)
    return { isSuccess: false, message: "Failed to get contexts" }
  }
}

export async function updateContextAction(
  id: string,
  data: Partial<Omit<InsertContext, "id" | "userId" | "progressionId" | "createdAt" | "updatedAt">>
): Promise<ActionState<SelectContext>> {
  try {
    const { userId } = await auth()
    if (!userId) return { isSuccess: false, message: "Unauthorized" }

    const existingContext = await db.query.contexts.findFirst({
      where: eq(contextsTable.id, id)
    })

    if (!existingContext) {
      return { isSuccess: false, message: "Context not found" }
    }

    if (existingContext.userId !== userId) {
      return { isSuccess: false, message: "Unauthorized" }
    }

    const [updatedContext] = await db
      .update(contextsTable)
      .set(data)
      .where(eq(contextsTable.id, id))
      .returning()

    return {
      isSuccess: true,
      message: "Context updated successfully",
      data: updatedContext
    }
  } catch (error) {
    console.error("Error updating context:", error)
    return { isSuccess: false, message: "Failed to update context" }
  }
}

export async function deleteContextAction(
  id: string
): Promise<ActionState<void>> {
  try {
    const { userId } = await auth()
    if (!userId) return { isSuccess: false, message: "Unauthorized" }

    const existingContext = await db.query.contexts.findFirst({
      where: eq(contextsTable.id, id)
    })

    if (!existingContext) {
      return { isSuccess: false, message: "Context not found" }
    }

    if (existingContext.userId !== userId) {
      return { isSuccess: false, message: "Unauthorized" }
    }

    await db.delete(contextsTable).where(eq(contextsTable.id, id))

    return {
      isSuccess: true,
      message: "Context deleted successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error deleting context:", error)
    return { isSuccess: false, message: "Failed to delete context" }
  }
}
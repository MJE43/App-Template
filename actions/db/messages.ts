"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/db/db"
import { ActionState } from "@/types"
import { eq, and } from "drizzle-orm"
import { InsertMessage, SelectMessage, messagesTable } from "@/db/schema"

export async function createMessageAction(
  message: Omit<InsertMessage, "id" | "userId" | "createdAt" | "updatedAt">
): Promise<ActionState<SelectMessage>> {
  try {
    const { userId } = await auth()
    if (!userId) return { isSuccess: false, message: "Unauthorized" }

    const [newMessage] = await db.insert(messagesTable).values({
      ...message,
      userId
    }).returning()

    return {
      isSuccess: true,
      message: "Message created successfully",
      data: newMessage
    }
  } catch (error) {
    console.error("Error creating message:", error)
    return { isSuccess: false, message: "Failed to create message" }
  }
}

export async function getMessagesForProgressionAction(
  progressionId: string
): Promise<ActionState<SelectMessage[]>> {
  try {
    const { userId } = await auth()
    if (!userId) return { isSuccess: false, message: "Unauthorized" }

    const messages = await db.query.messages.findMany({
      where: and(
        eq(messagesTable.progressionId, progressionId),
        eq(messagesTable.userId, userId)
      ),
      orderBy: (messages, { asc }) => [asc(messages.createdAt)]
    })

    return {
      isSuccess: true,
      message: "Messages retrieved successfully",
      data: messages
    }
  } catch (error) {
    console.error("Error getting messages:", error)
    return { isSuccess: false, message: "Failed to get messages" }
  }
}

export async function deleteMessagesForProgressionAction(
  progressionId: string
): Promise<ActionState<void>> {
  try {
    const { userId } = await auth()
    if (!userId) return { isSuccess: false, message: "Unauthorized" }

    await db.delete(messagesTable).where(
      and(
        eq(messagesTable.progressionId, progressionId),
        eq(messagesTable.userId, userId)
      )
    )

    return {
      isSuccess: true,
      message: "Messages deleted successfully",
      data: undefined
    }
  } catch (error) {
    console.error("Error deleting messages:", error)
    return { isSuccess: false, message: "Failed to delete messages" }
  }
}
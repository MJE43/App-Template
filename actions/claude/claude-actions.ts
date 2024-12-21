"use server"

import { auth } from "@clerk/nextjs/server"
import { ActionState } from "@/types"
import { SelectProgression, SelectMessage } from "@/db/schema"
import { createMessageAction } from "@/actions/db/messages"

// Types for Claude API integration
interface ClaudeMessage {
  role: "assistant" | "user"
  content: string
}

interface ClaudeResponse {
  completion: string
  stop_reason: string
  model: string
}

export async function generateSuggestionAction(
  progression: SelectProgression,
  messageHistory: SelectMessage[]
): Promise<ActionState<SelectMessage>> {
  try {
    const { userId } = await auth()
    if (!userId) return { isSuccess: false, message: "Unauthorized" }

    // Format messages for Claude
    const messages: ClaudeMessage[] = messageHistory.map(msg => ({
      role: msg.role,
      content: msg.content.text
    }))

    // Add progression context
    messages.push({
      role: "user",
      content: `Current progression: ${JSON.stringify(progression.data)}\nGenre: ${progression.genre}\nEra: ${progression.era}`
    })

    // Call Claude API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_API_KEY || "",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        messages,
        model: "claude-3-sonnet-20240229",
        max_tokens: 1000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error("Claude API request failed")
    }

    const data: ClaudeResponse = await response.json()

    // Create new message with suggestion
    return await createMessageAction({
      progressionId: progression.id,
      content: {
        text: data.completion,
        suggestion: {
          chords: [], // Parse chords from completion
          explanation: data.completion,
          context: `Based on ${progression.genre} style from ${progression.era}`
        }
      },
      type: "suggestion",
      role: "assistant"
    })

  } catch (error) {
    console.error("Error generating suggestion:", error)
    return { isSuccess: false, message: "Failed to generate suggestion" }
  }
}

export async function analyzeMusicTheoryAction(
  progression: SelectProgression
): Promise<ActionState<SelectMessage>> {
  try {
    const { userId } = await auth()
    if (!userId) return { isSuccess: false, message: "Unauthorized" }

    // Call Claude API for music theory analysis
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.CLAUDE_API_KEY || "",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        messages: [{
          role: "user",
          content: `Analyze this progression in ${progression.genre} style from ${progression.era}: ${JSON.stringify(progression.data)}`
        }],
        model: "claude-3-sonnet-20240229",
        max_tokens: 1000,
        temperature: 0.3
      })
    })

    if (!response.ok) {
      throw new Error("Claude API request failed")
    }

    const data: ClaudeResponse = await response.json()

    // Create new message with analysis
    return await createMessageAction({
      progressionId: progression.id,
      content: {
        text: data.completion,
        suggestion: {
          chords: [], // No chords for analysis
          explanation: data.completion,
          context: "Music Theory Analysis"
        }
      },
      type: "text",
      role: "assistant"
    })

  } catch (error) {
    console.error("Error analyzing progression:", error)
    return { isSuccess: false, message: "Failed to analyze progression" }
  }
}
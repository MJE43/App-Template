// types/chat-types.ts
export interface Message {
  id: string
  progressionId: string
  content: string
  role: "assistant" | "user"
  createdAt: Date
}

export interface ChatContext {
  progression: Progression
  genre: Genre
  era: Era
  mood?: string
}

export interface SuggestionCard {
  id: string
  chords: string[]
  explanation: string
  context: string
}

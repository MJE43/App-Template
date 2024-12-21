import { create } from "zustand"
import { ChatContext, Message, SuggestionCard } from "@/types"

interface ChatState {
  messages: Message[]
  context: ChatContext | null
  suggestions: SuggestionCard[]
  isLoading: boolean
  addMessage: (message: Message) => void
  setContext: (context: ChatContext) => void
  addSuggestion: (suggestion: SuggestionCard) => void
  clearSuggestions: () => void
  setIsLoading: (isLoading: boolean) => void
  clearMessages: () => void
  clearAll: () => void
}

export const useChatStore = create<ChatState>(set => ({
  messages: [],
  context: null,
  suggestions: [],
  isLoading: false,

  addMessage: message =>
    set(state => ({ messages: [...state.messages, message] })),

  setContext: context => set({ context }),

  addSuggestion: suggestion =>
    set(state => ({ suggestions: [...state.suggestions, suggestion] })),

  clearSuggestions: () => set({ suggestions: [] }),

  setIsLoading: isLoading => set({ isLoading }),

  clearMessages: () => set({ messages: [] }),

  clearAll: () =>
    set({
      messages: [],
      context: null,
      suggestions: [],
      isLoading: false
    })
}))

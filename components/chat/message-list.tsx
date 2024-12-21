"use client"

import { useChatStore } from "@/lib/stores/chat-store"
import { cn } from "@/lib/utils"
import SuggestionCard from "./suggestion-card"

export default function MessageList() {
  const { messages, suggestions } = useChatStore()

  return (
    <div className="flex flex-col gap-4 p-4">
      {messages.map(message => (
        <div
          key={message.id}
          className={cn("flex", {
            "justify-end": message.role === "user"
          })}
        >
          <div
            className={cn(
              "max-w-[80%] rounded-lg p-3",
              message.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            )}
          >
            {message.content}
          </div>
        </div>
      ))}

      {suggestions.map(suggestion => (
        <SuggestionCard key={suggestion.id} {...suggestion} />
      ))}
    </div>
  )
}

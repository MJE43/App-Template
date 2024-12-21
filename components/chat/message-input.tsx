"use client"

import { useState } from "react"
import { SendHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useChatStore } from "@/lib/stores/chat-store"

export default function MessageInput() {
  const [message, setMessage] = useState("")
  const { addMessage, setIsLoading } = useChatStore()

  const handleSubmit = async () => {
    if (!message.trim()) return

    const newMessage = {
      id: crypto.randomUUID(),
      content: message,
      role: "user" as const,
      progressionId: "", // Would be set from context
      createdAt: new Date()
    }

    addMessage(newMessage)
    setMessage("")
    setIsLoading(true)

    // Here you would integrate with the Claude API
    // and handle the response
    setIsLoading(false)
  }

  return (
    <div className="flex gap-2">
      <Textarea
        placeholder="Ask about your progression..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        className="min-h-[60px] resize-none"
        onKeyDown={e => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
          }
        }}
      />
      <Button size="icon" onClick={handleSubmit} className="size-[60px]">
        <SendHorizontal className="size-5" />
      </Button>
    </div>
  )
}

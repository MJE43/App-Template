"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import MessageList from "@/components/chat/message-list"
import MessageInput from "@/components/chat/message-input"

export default function ChatInterface() {
  return (
    <div className="flex h-full flex-col border-l">
      {/* Context Bar - 60px */}
      <div className="flex h-[60px] items-center border-b px-4">
        <h2 className="text-lg font-semibold">Chat</h2>
      </div>

      {/* Chat History - Flexible Height */}
      <ScrollArea className="flex-1">
        <MessageList />
      </ScrollArea>

      {/* Input Area - 100px */}
      <div className="h-[100px] border-t p-4">
        <MessageInput />
      </div>
    </div>
  )
}

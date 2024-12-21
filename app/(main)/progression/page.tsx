"use server"

import { Suspense } from "react"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable"
import CompositionSpace from "./_components/composition-space"
import ChatInterface from "./_components/chat-interface"
import LoadingSpinner from "@/components/utilities/loading-spinner"

export default async function ProgressionPage() {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen w-full">
      {/* Composition Space - 70% */}
      <ResizablePanel defaultSize={70} minSize={50}>
        <Suspense fallback={<LoadingSpinner />}>
          <CompositionSpace />
        </Suspense>
      </ResizablePanel>

      <ResizableHandle />

      {/* Chat Interface - 30% */}
      <ResizablePanel defaultSize={30} minSize={25}>
        <Suspense fallback={<LoadingSpinner />}>
          <ChatInterface />
        </Suspense>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

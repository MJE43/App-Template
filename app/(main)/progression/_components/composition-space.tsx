"use client"

import TopBar from "./top-bar"
import Timeline from "@/components/progression/timeline/timeline"
import ChordBank from "@/components/progression/chord-bank/chord-bank"

export default function CompositionSpace() {
  return (
    <div className="flex h-full flex-col">
      {/* Top Bar - 60px */}
      <div className="h-[60px] border-b">
        <TopBar />
      </div>

      {/* Timeline - 200px */}
      <div className="h-[200px] border-b">
        <Timeline />
      </div>

      {/* Chord Bank - Remaining Height */}
      <div className="flex-1 overflow-y-auto">
        <ChordBank />
      </div>
    </div>
  )
}

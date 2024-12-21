"use client"

import { useState } from "react"
import { useProgressionStore } from "@/lib/stores/progression-store"
import { useAudioStore } from "@/lib/stores/audio-store"
import { cn } from "@/lib/utils"
import { Chord } from "@/types"

interface ChordBlockProps {
  chord: Chord
  measureIndex: number
}

export default function ChordBlock({ chord, measureIndex }: ChordBlockProps) {
  const [isDragging, setIsDragging] = useState(false)
  const { selectedChord, setSelectedChord, updateChord } = useProgressionStore()
  const { setCurrentChordPlayback } = useAudioStore()

  const handleClick = () => {
    setSelectedChord(chord)
    setCurrentChordPlayback({
      chord,
      duration: 2,
      velocity: 0.75
    })
  }

  const isSelected = selectedChord?.id === chord.id

  return (
    <div
      className={cn(
        "absolute flex h-20 w-[120px] cursor-pointer select-none items-center justify-center rounded-lg border p-2 text-2xl transition-all",
        "from-primary/50 to-primary hover:from-primary/60 hover:to-primary/90 bg-gradient-to-br",
        {
          "ring-2 ring-primary ring-offset-2": isSelected,
          "opacity-90": isDragging
        }
      )}
      style={{
        left: measureIndex * 160 + chord.position * 40,
        top: "60px"
      }}
      onClick={handleClick}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
    >
      {chord.name}
    </div>
  )
}

"use client"

import { useProgressionStore } from "@/lib/stores/progression-store"
import { useAudioStore } from "@/lib/stores/audio-store"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import ChordVariants from "./chord-variants"
import { cn } from "@/lib/utils"

interface ChordButtonProps {
  name: string
  category: string
}

export default function ChordButton({ name, category }: ChordButtonProps) {
  const { setSelectedChord } = useProgressionStore()
  const { setCurrentChordPlayback } = useAudioStore()

  const handleClick = () => {
    const chord = {
      id: crypto.randomUUID(),
      name,
      position: 0,
      measureIndex: 0,
      variants: []
    }
    setSelectedChord(chord)
    setCurrentChordPlayback({
      chord,
      duration: 2,
      velocity: 0.75
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "bg-card hover:bg-accent h-[60px] w-[120px] rounded-lg border p-2 text-lg transition-colors",
            "focus:ring-ring focus:outline-none focus:ring-2 focus:ring-offset-2"
          )}
          onClick={handleClick}
        >
          {name}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <ChordVariants chordName={name} />
      </PopoverContent>
    </Popover>
  )
}

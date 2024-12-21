"use client"

import { useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useProgressionStore } from "@/lib/stores/progression-store"
import { useAudioStore } from "@/lib/stores/audio-store"
import MeasureGrid from "./measure-grid"
import ChordBlock from "./chord-block"

export default function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { measures, timeSignature } = useProgressionStore()
  const { playbackState } = useAudioStore()

  return (
    <div className="relative size-full">
      {/* Playback Position Indicator */}
      {playbackState.isPlaying && (
        <div
          className="bg-primary/50 absolute inset-y-0 w-1"
          style={{
            left: `${
              playbackState.currentMeasure * 160 +
              (playbackState.currentBeat / timeSignature.numerator) * 160
            }px`
          }}
        />
      )}

      <ScrollArea className="h-full">
        <div
          ref={timelineRef}
          className="relative h-[200px] min-w-full"
          style={{ width: `${Math.max(measures.length, 4) * 160}px` }}
        >
          {/* Measure Grid */}
          <MeasureGrid measures={measures} />

          {/* Chord Blocks */}
          {measures.map(measure =>
            measure.chords.map(chord => (
              <ChordBlock
                key={chord.id}
                chord={chord}
                measureIndex={measure.index}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

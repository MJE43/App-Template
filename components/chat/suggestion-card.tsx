"use client"

import { SuggestionCard as SuggestionCardType } from "@/types"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Music, Play } from "lucide-react"
import { useAudioStore } from "@/lib/stores/audio-store"

interface SuggestionCardProps extends SuggestionCardType {}

export default function SuggestionCard({
  chords,
  explanation,
  context
}: SuggestionCardProps) {
  const { setCurrentChordPlayback } = useAudioStore()

  const playChord = (chordName: string) => {
    const chord = {
      id: crypto.randomUUID(),
      name: chordName,
      position: 0,
      measureIndex: 0,
      variants: []
    }

    setCurrentChordPlayback({
      chord,
      duration: 2,
      velocity: 0.75
    })
  }

  return (
    <Card className="bg-secondary/50 w-full">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
        <Music className="size-4" />
        <span className="text-sm font-medium">Suggestion</span>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {chords.map(chord => (
            <Button
              key={chord}
              variant="secondary"
              size="sm"
              className="group"
              onClick={() => playChord(chord)}
            >
              {chord}
              <Play className="ml-1 size-3 opacity-0 transition-opacity group-hover:opacity-100" />
            </Button>
          ))}
        </div>

        <p className="text-muted-foreground text-sm">{explanation}</p>

        {context && (
          <p className="text-muted-foreground/75 text-xs italic">{context}</p>
        )}
      </CardContent>
    </Card>
  )
}

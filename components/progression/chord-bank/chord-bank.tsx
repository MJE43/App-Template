"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"
import ChordButton from "./chord-button"

const chordCategories = {
  major: ["C", "F", "G", "D", "A", "E", "B"],
  minor: ["Am", "Dm", "Em", "Bm", "F#m", "C#m", "G#m"],
  seventh: ["Cmaj7", "Dm7", "Em7", "Fmaj7", "G7", "Am7", "Bm7b5"],
  extended: ["C9", "D11", "E13", "Fmaj9", "G13", "Am9", "Bm11"]
}

export default function ChordBank() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = Object.entries(chordCategories).reduce(
    (acc, [category, chords]) => {
      const filtered = chords.filter(chord =>
        chord.toLowerCase().includes(searchQuery.toLowerCase())
      )
      if (filtered.length > 0) {
        acc[category] = filtered
      }
      return acc
    },
    {} as Record<string, string[]>
  )

  return (
    <div className="flex h-full flex-col p-4">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
        <Input
          className="h-10 pl-9"
          placeholder="Search chords..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Chord Grid */}
      <ScrollArea className="flex-1">
        <div className="space-y-6">
          {Object.entries(filteredCategories).map(([category, chords]) => (
            <div key={category}>
              <h3 className="text-muted-foreground mb-3 text-sm font-medium">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {chords.map(chord => (
                  <ChordButton key={chord} name={chord} category={category} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

"use client"

import { useProgressionStore } from "@/lib/stores/progression-store"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"

const variantMap = {
  major: ["", "maj7", "maj9", "6", "6/9"],
  minor: ["m", "m7", "m9", "m11", "m13"],
  dominant: ["7", "9", "11", "13", "7b9"]
}

interface ChordVariantsProps {
  chordName: string
}

export default function ChordVariants({ chordName }: ChordVariantsProps) {
  const { selectedChord, setSelectedChord } = useProgressionStore()

  const handleSelect = (variant: string) => {
    if (!selectedChord) return

    const newChord = {
      ...selectedChord,
      name: `${chordName}${variant}`,
      variants: [
        ...selectedChord.variants,
        {
          id: crypto.randomUUID(),
          name: variant,
          voicing: [], // Would be populated with actual MIDI note numbers
          symbol: variant
        }
      ]
    }
    setSelectedChord(newChord)
  }

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandGroup heading="Variants">
        {Object.entries(variantMap).map(([category, variants]) => (
          <div key={category} className="px-1 py-2">
            <div className="text-muted-foreground px-2 text-xs">{category}</div>
            {variants.map(variant => (
              <CommandItem
                key={variant}
                onSelect={() => handleSelect(variant)}
                className="cursor-pointer"
              >
                {chordName}
                {variant}
              </CommandItem>
            ))}
          </div>
        ))}
      </CommandGroup>
    </Command>
  )
}

// types/progression-types.ts
export interface Chord {
  id: string
  name: string // e.g., "C", "Dm7"
  position: number // Position in the measure
  measureIndex: number
  variants: ChordVariant[]
}

export interface ChordVariant {
  id: string
  name: string
  voicing: number[] // MIDI note numbers
  symbol: string // e.g., "maj7", "min7"
}

export interface Measure {
  id: string
  index: number
  timeSignature: TimeSignature
  chords: Chord[]
}

export interface TimeSignature {
  numerator: number
  denominator: number
}

export interface Progression {
  id: string
  userId: string
  name: string
  measures: Measure[]
  genre: Genre
  era: Era
  createdAt: Date
  updatedAt: Date
}

export type Genre =
  | "pop"
  | "rock"
  | "jazz"
  | "classical"
  | "electronic"
  | "other"
export type Era = "50s" | "60s" | "70s" | "80s" | "90s" | "00s" | "10s" | "20s"

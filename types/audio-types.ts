import { Chord } from "./progression-types"

// types/audio-types.ts
export interface AudioSettings {
  volume: number
  muted: boolean
  instrument: string
}

export interface ChordPlayback {
  chord: Chord
  duration: number
  velocity: number
}

export interface PlaybackState {
  isPlaying: boolean
  currentMeasure: number
  currentBeat: number
  tempo: number
}

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Era, Genre } from "@/types"

interface PreferencesState {
  genre: Genre
  era: Era
  mood: string | null
  defaultTimeSignature: {
    numerator: number
    denominator: number
  }
  audioSettings: {
    defaultVolume: number
    defaultInstrument: string
    defaultTempo: number
  }
  setGenre: (genre: Genre) => void
  setEra: (era: Era) => void
  setMood: (mood: string | null) => void
  setDefaultTimeSignature: (numerator: number, denominator: number) => void
  updateAudioSettings: (
    settings: Partial<PreferencesState["audioSettings"]>
  ) => void
  reset: () => void
}

const defaultState = {
  genre: "pop" as Genre,
  era: "20s" as Era,
  mood: null,
  defaultTimeSignature: {
    numerator: 4,
    denominator: 4
  },
  audioSettings: {
    defaultVolume: 0.75,
    defaultInstrument: "piano",
    defaultTempo: 120
  }
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    set => ({
      ...defaultState,

      setGenre: genre => set({ genre }),
      setEra: era => set({ era }),
      setMood: mood => set({ mood }),

      setDefaultTimeSignature: (numerator, denominator) =>
        set({
          defaultTimeSignature: { numerator, denominator }
        }),

      updateAudioSettings: settings =>
        set(state => ({
          audioSettings: { ...state.audioSettings, ...settings }
        })),

      reset: () => set(defaultState)
    }),
    {
      name: "progressio-preferences"
    }
  )
)

import { create } from "zustand"
import { Chord, Measure, Progression, TimeSignature } from "@/types"

interface ProgressionState {
  currentProgression: Progression | null
  measures: Measure[]
  selectedChord: Chord | null
  isEditing: boolean
  timeSignature: TimeSignature
  setProgression: (progression: Progression) => void
  addMeasure: (measure: Measure) => void
  removeMeasure: (measureId: string) => void
  addChord: (chord: Chord, measureId: string) => void
  removeChord: (chordId: string, measureId: string) => void
  updateChord: (
    chord: Partial<Chord>,
    chordId: string,
    measureId: string
  ) => void
  setSelectedChord: (chord: Chord | null) => void
  setTimeSignature: (timeSignature: TimeSignature) => void
  setIsEditing: (isEditing: boolean) => void
  clear: () => void
}

const defaultTimeSignature: TimeSignature = {
  numerator: 4,
  denominator: 4
}

export const useProgressionStore = create<ProgressionState>(set => ({
  currentProgression: null,
  measures: [],
  selectedChord: null,
  isEditing: false,
  timeSignature: defaultTimeSignature,

  setProgression: progression =>
    set({ currentProgression: progression, measures: progression.measures }),

  addMeasure: measure =>
    set(state => ({ measures: [...state.measures, measure] })),

  removeMeasure: measureId =>
    set(state => ({
      measures: state.measures.filter(m => m.id !== measureId)
    })),

  addChord: (chord, measureId) =>
    set(state => ({
      measures: state.measures.map(measure =>
        measure.id === measureId
          ? { ...measure, chords: [...measure.chords, chord] }
          : measure
      )
    })),

  removeChord: (chordId, measureId) =>
    set(state => ({
      measures: state.measures.map(measure =>
        measure.id === measureId
          ? {
              ...measure,
              chords: measure.chords.filter(chord => chord.id !== chordId)
            }
          : measure
      )
    })),

  updateChord: (chord, chordId, measureId) =>
    set(state => ({
      measures: state.measures.map(measure =>
        measure.id === measureId
          ? {
              ...measure,
              chords: measure.chords.map(c =>
                c.id === chordId ? { ...c, ...chord } : c
              )
            }
          : measure
      )
    })),

  setSelectedChord: chord => set({ selectedChord: chord }),
  setTimeSignature: timeSignature => set({ timeSignature }),
  setIsEditing: isEditing => set({ isEditing }),
  clear: () =>
    set({
      currentProgression: null,
      measures: [],
      selectedChord: null,
      isEditing: false,
      timeSignature: defaultTimeSignature
    })
}))

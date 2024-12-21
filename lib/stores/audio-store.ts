import { create } from "zustand"
import { AudioSettings, ChordPlayback, PlaybackState } from "@/types"

interface AudioState {
  settings: AudioSettings
  playbackState: PlaybackState
  currentChordPlayback: ChordPlayback | null
  updateSettings: (settings: Partial<AudioSettings>) => void
  setPlaybackState: (state: Partial<PlaybackState>) => void
  setCurrentChordPlayback: (playback: ChordPlayback | null) => void
  toggleMute: () => void
  togglePlayback: () => void
  setTempo: (tempo: number) => void
  reset: () => void
}

const defaultSettings: AudioSettings = {
  volume: 0.75,
  muted: false,
  instrument: "piano"
}

const defaultPlaybackState: PlaybackState = {
  isPlaying: false,
  currentMeasure: 0,
  currentBeat: 0,
  tempo: 120
}

export const useAudioStore = create<AudioState>(set => ({
  settings: defaultSettings,
  playbackState: defaultPlaybackState,
  currentChordPlayback: null,

  updateSettings: settings =>
    set(state => ({
      settings: { ...state.settings, ...settings }
    })),

  setPlaybackState: state =>
    set(current => ({
      playbackState: { ...current.playbackState, ...state }
    })),

  setCurrentChordPlayback: playback => set({ currentChordPlayback: playback }),

  toggleMute: () =>
    set(state => ({
      settings: { ...state.settings, muted: !state.settings.muted }
    })),

  togglePlayback: () =>
    set(state => ({
      playbackState: {
        ...state.playbackState,
        isPlaying: !state.playbackState.isPlaying
      }
    })),

  setTempo: tempo =>
    set(state => ({
      playbackState: { ...state.playbackState, tempo }
    })),

  reset: () =>
    set({
      settings: defaultSettings,
      playbackState: defaultPlaybackState,
      currentChordPlayback: null
    })
}))

import { create } from 'zustand'

export type ThemeMode = 'light' | 'dark' | 'system'
export type FontSize = 'small' | 'medium' | 'large'

export type DisplayPrefs = {
  theme: ThemeMode
  font: FontSize
  highContrast: boolean
  reduceMotion: boolean
  largeTouchTargets: boolean
}

const STORAGE_KEY = 'meditrack-display'

const defaults: DisplayPrefs = {
  theme: 'system',
  font: 'medium',
  highContrast: false,
  reduceMotion: false,
  largeTouchTargets: false,
}

function loadPrefs(): DisplayPrefs {
  if (typeof window === 'undefined') return defaults
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaults
    return { ...defaults, ...(JSON.parse(raw) as Partial<DisplayPrefs>) }
  } catch {
    return defaults
  }
}

type DisplayState = DisplayPrefs & {
  setTheme: (theme: ThemeMode) => void
  setFont: (font: FontSize) => void
  setHighContrast: (value: boolean) => void
  setReduceMotion: (value: boolean) => void
  setLargeTouchTargets: (value: boolean) => void
}

function persist(patch: Partial<DisplayPrefs>) {
  try {
    const next = { ...loadPrefs(), ...patch }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    /* storage unavailable */
  }
}

export const useDisplay = create<DisplayState>()((set) => ({
  ...loadPrefs(),
  setTheme: (theme) => {
    persist({ theme })
    set({ theme })
  },
  setFont: (font) => {
    persist({ font })
    set({ font })
  },
  setHighContrast: (highContrast) => {
    persist({ highContrast })
    set({ highContrast })
  },
  setReduceMotion: (reduceMotion) => {
    persist({ reduceMotion })
    set({ reduceMotion })
  },
  setLargeTouchTargets: (largeTouchTargets) => {
    persist({ largeTouchTargets })
    set({ largeTouchTargets })
  },
}))
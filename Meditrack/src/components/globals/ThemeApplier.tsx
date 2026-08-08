'use client'

import { useEffect } from 'react'
import { useDisplay } from '@/store/useDisplay'

export default function ThemeApplier() {
  const { theme, font, highContrast, reduceMotion, largeTouchTargets } = useDisplay()

  useEffect(() => {
    const root = document.documentElement
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const applyTheme = () => {
      const dark = theme === 'dark' || (theme === 'system' && media.matches)
      root.classList.toggle('dark', dark)
    }

    applyTheme()
    media.addEventListener('change', applyTheme)
    return () => media.removeEventListener('change', applyTheme)
  }, [theme])

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-font', font)
    root.setAttribute('data-contrast', highContrast ? 'high' : 'normal')
    root.setAttribute('data-motion', reduceMotion ? 'reduced' : 'full')
    root.setAttribute('data-targets', largeTouchTargets ? 'large' : 'default')
  }, [font, highContrast, reduceMotion, largeTouchTargets])

  return null
}
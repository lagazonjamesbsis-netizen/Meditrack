'use client'

import { useDarkMode } from '../DarkModeContext'
import { useRouter } from 'next/navigation'
import Settings from './settings'

export default function SettingsPage() {
  const { darkMode, setDarkMode } = useDarkMode()
  const router = useRouter()

  return <Settings darkMode={darkMode} setDarkMode={setDarkMode} onLogout={() => router.push('/login')} />
}

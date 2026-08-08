'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Database, Eye, Lock, Mail, Share2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type PrivacyItemConfig = {
  key: string
  label: string
  icon: LucideIcon
  defaultOn?: boolean
}

const privacyItems: PrivacyItemConfig[] = [
  { key: 'consent', label: 'Consent Data Sharing', icon: Share2, defaultOn: true },
  { key: 'visibility', label: 'Profile Visibility', icon: Eye, defaultOn: true },
  { key: 'access', label: 'Access Controls', icon: Lock, defaultOn: true },
  { key: 'communication', label: 'Communication Preferences', icon: Mail, defaultOn: true },
  { key: 'data', label: 'Data Management', icon: Database },
]

function getInitialToggles(): Record<string, boolean> {
  const toggles: Record<string, boolean> = {}
  for (const item of privacyItems) {
    toggles[item.key] = item.defaultOn ?? false
  }
  return toggles
}

export default function PrivacySecuritySettings() {
  const router = useRouter()
  const [toggles, setToggles] = useState<Record<string, boolean>>(getInitialToggles)

  const goBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/settings')
    }
  }

  const onToggle = (key: string) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-line px-4 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={goBack}
          aria-label="Go back"
          className="p-2 -ml-2 rounded-full text-brand hover:bg-brand-tint transition-colors"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
        </button>

        <h1 className="flex-1 text-center text-lg font-bold text-brand px-1 truncate">
          Privacy and Security Settings
        </h1>

        <span className="w-9" aria-hidden="true" />
      </header>

      <main className="px-4 pt-4 flex flex-col gap-5 pb-32">
        <div className="bg-card rounded-3xl shadow-card overflow-hidden">
          <div className="p-5 pb-3">
            <h2 className="text-lg font-bold text-brand inline-flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-brand-tint text-brand flex items-center justify-center">
                <Lock className="w-5 h-5" aria-hidden="true" />
              </span>
              Privacy Settings
            </h2>
          </div>

          <div className="divide-y divide-line">
            {privacyItems.map((item) => (
              <PrivacyItem
                key={item.key}
                item={item}
                value={toggles[item.key]}
                onToggle={() => onToggle(item.key)}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

function PrivacyItem({
  item,
  value,
  onToggle,
}: {
  item: PrivacyItemConfig
  value: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={onToggle}
      className="w-full flex items-center gap-3.5 px-4 h-14 text-left transition-colors hover:bg-surface"
    >
      <span className="w-9 h-9 shrink-0 rounded-xl bg-brand-tint text-brand flex items-center justify-center">
        <item.icon className="w-4 h-4" aria-hidden="true" />
      </span>

      <span className="flex-1 text-sm font-semibold truncate text-body">{item.label}</span>

      <span
        aria-hidden="true"
        className={`relative w-11 h-6 shrink-0 rounded-full transition-colors ${
          value ? 'bg-brand' : 'bg-track'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            value ? 'translate-x-5' : ''
          }`}
        />
      </span>
    </button>
  )
}
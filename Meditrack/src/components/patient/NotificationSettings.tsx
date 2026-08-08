'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  ArrowLeft,
  CalendarClock,
  ChevronRight,
  FlaskConical,
  HeartPulse,
  Pill,
  SlidersHorizontal,
  Smartphone,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type NotificationItemConfig = {
  key: string
  label: string
  icon: LucideIcon
  toggle?: boolean
  defaultOn?: boolean
}

const notificationItems: NotificationItemConfig[] = [
  { key: 'appointment-reminder', label: 'Appointment Reminder', icon: CalendarClock, toggle: true, defaultOn: true },
  { key: 'health-program', label: 'Health Program Updates', icon: HeartPulse, toggle: true, defaultOn: true },
  { key: 'lab-results', label: 'Lab and Results Updates', icon: FlaskConical, toggle: true, defaultOn: true },
  { key: 'medication', label: 'Medication Reminders', icon: Pill, toggle: true, defaultOn: true },
  { key: 'community', label: 'Community Alerts', icon: Users, toggle: true },
  { key: 'outside-app', label: 'Outside App Notifications', icon: Smartphone, toggle: true },
  { key: 'customization', label: 'Customization', icon: SlidersHorizontal },
]

function getInitialToggles(): Record<string, boolean> {
  const toggles: Record<string, boolean> = {}
  for (const item of notificationItems) {
    if (item.toggle) toggles[item.key] = item.defaultOn ?? false
  }
  return toggles
}

export default function NotificationSettings() {
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

  const onItemPress = (item: NotificationItemConfig) => {
    if (!item.toggle) {
      toast.info(`${item.label} coming soon`)
    }
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

        <h1 className="text-xl font-bold text-brand">Notification Settings</h1>

        <span className="w-9" aria-hidden="true" />
      </header>

      <main className="px-4 pt-4 flex flex-col gap-5 pb-32">
        <div className="bg-card rounded-3xl shadow-card overflow-hidden">
          <div className="divide-y divide-line">
            {notificationItems.map((item) => (
              <SettingsItem
                key={item.key}
                item={item}
                onPress={() => onItemPress(item)}
                toggleValue={toggles[item.key]}
                onToggle={() => onToggle(item.key)}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

function SettingsItem({
  item,
  onPress,
  onToggle,
  toggleValue,
}: {
  item: NotificationItemConfig
  onPress: () => void
  onToggle?: () => void
  toggleValue?: boolean
}) {
  return (
    <button
      type="button"
      role={item.toggle ? 'switch' : undefined}
      aria-checked={item.toggle ? toggleValue : undefined}
      onClick={() => (item.toggle ? onToggle?.() : onPress())}
      className="w-full flex items-center gap-3.5 px-4 h-14 text-left transition-colors hover:bg-surface"
    >
      <span className="w-9 h-9 shrink-0 rounded-xl bg-brand-tint text-brand flex items-center justify-center">
        <item.icon className="w-4 h-4" aria-hidden="true" />
      </span>

      <span className="flex-1 text-sm font-semibold truncate text-body">
        {item.label}
      </span>

      {item.toggle ? (
        <span
          aria-hidden="true"
          className={`relative w-11 h-6 shrink-0 rounded-full transition-colors ${
            toggleValue ? 'bg-brand' : 'bg-track'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
              toggleValue ? 'translate-x-5' : ''
            }`}
          />
        </span>
      ) : (
        <ChevronRight className="w-4 h-4 shrink-0 text-faint" aria-hidden="true" />
      )}
    </button>
  )
}

'use client'

import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Bell,
  Contrast,
  Hand,
  MonitorSmartphone,
  Palette,
  Wind,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useDisplay } from '@/store/useDisplay'
import type { FontSize, ThemeMode } from '@/store/useDisplay'

type AccessItemConfig = {
  key: string
  title: string
  description: string
  icon: LucideIcon
}

const accessItems: AccessItemConfig[] = [
  {
    key: 'highContrast',
    title: 'High Contrast Mode',
    description: 'Strengthen borders and text contrast',
    icon: Contrast,
  },
  {
    key: 'reduceMotion',
    title: 'Reduce Motion',
    description: 'Minimize animations and transitions',
    icon: Wind,
  },
  {
    key: 'largeTouchTargets',
    title: 'Larger Touch Targets',
    description: 'Enlarge buttons and tap areas',
    icon: Hand,
  },
]

const themeOptions: { value: ThemeMode; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
]

const fontOptions: { value: FontSize; label: string }[] = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
]

export default function DisplaySettings() {
  const router = useRouter()
  const {
    theme,
    font,
    highContrast,
    reduceMotion,
    largeTouchTargets,
    setTheme,
    setFont,
    setHighContrast,
    setReduceMotion,
    setLargeTouchTargets,
  } = useDisplay()

  const goBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/settings')
    }
  }

  const accessValues: Record<string, boolean> = {
    highContrast,
    reduceMotion,
    largeTouchTargets,
  }

  const accessSetters: Record<string, (value: boolean) => void> = {
    highContrast: setHighContrast,
    reduceMotion: setReduceMotion,
    largeTouchTargets: setLargeTouchTargets,
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

        <h1 className="text-xl font-bold text-brand">Display Settings</h1>

        <span className="w-9" aria-hidden="true" />
      </header>

      <main className="px-4 pt-4 flex flex-col gap-5 pb-32">
        <section aria-label="Appearance" className="bg-card rounded-3xl shadow-card p-5">
          <h2 className="text-lg font-bold text-brand mb-4 inline-flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-brand-tint text-brand flex items-center justify-center">
              <Palette className="w-5 h-5" aria-hidden="true" />
            </span>
            Appearance
          </h2>

          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-muted">
                Theme Mode
              </span>
              <Segmented
                className="mt-2"
                options={themeOptions}
                value={theme}
                onChange={setTheme}
              />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-muted">
                Font Size
              </span>
              <Segmented
                className="mt-2"
                options={fontOptions}
                value={font}
                onChange={setFont}
              />
            </div>
          </div>
        </section>

        <section aria-label="Accessibility" className="bg-card rounded-3xl shadow-card overflow-hidden">
          <div className="p-5 pb-3">
            <h2 className="text-lg font-bold text-brand inline-flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-brand-tint text-brand flex items-center justify-center">
                <Contrast className="w-5 h-5" aria-hidden="true" />
              </span>
              Accessibility
            </h2>
          </div>
          <div className="divide-y divide-line">
            {accessItems.map((item) => (
              <AccessRow
                key={item.key}
                item={item}
                value={accessValues[item.key]}
                onToggle={() => accessSetters[item.key](!accessValues[item.key])}
              />
            ))}
          </div>
        </section>

        <section aria-label="Preview" className="bg-card rounded-3xl shadow-card p-5">
          <h2 className="text-lg font-bold text-brand mb-4 inline-flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-brand-tint text-brand flex items-center justify-center">
              <MonitorSmartphone className="w-5 h-5" aria-hidden="true" />
            </span>
            Preview
          </h2>

          <div aria-hidden="true" className="bg-surface rounded-2xl p-4 flex items-start gap-3">
            <span className="w-10 h-10 shrink-0 rounded-xl bg-brand-tint text-brand flex items-center justify-center">
              <Bell className="w-5 h-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-body">Appointment Reminder</p>
              <p className="text-xs text-muted mt-0.5 leading-relaxed">
                Your check-up with Dr. Cruz is scheduled for tomorrow at 9:00 AM.
              </p>
              <p className="text-[10px] font-semibold text-muted mt-1">Just now</p>
            </div>
          </div>

          <div className="flex gap-2.5 mt-3" aria-hidden="true">
            <button
              type="button"
              className="flex-1 bg-brand hover:bg-brand-dark text-white py-2.5 rounded-xl font-medium text-sm transition-colors"
            >
              Confirm
            </button>
            <button
              type="button"
              className="flex-1 bg-card border border-line text-brand hover:bg-brand-tint py-2.5 rounded-xl font-medium text-sm transition-colors"
            >
              Later
            </button>
          </div>
        </section>
      </main>
    </>
  )
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
  className = '',
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  className?: string
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Select an option"
      className={`flex bg-surface rounded-xl p-1 gap-1 ${className}`}
    >
      {options.map((option) => {
        const isSelected = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${
              isSelected
                ? 'bg-card shadow text-brand'
                : 'text-muted hover:text-body'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

function AccessRow({
  item,
  value,
  onToggle,
}: {
  item: AccessItemConfig
  value: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={onToggle}
      className="w-full flex items-center gap-3.5 px-4 py-3.5 text-left transition-colors hover:bg-surface"
    >
      <span className="w-9 h-9 shrink-0 rounded-xl bg-brand-tint text-brand flex items-center justify-center">
        <item.icon className="w-4 h-4" aria-hidden="true" />
      </span>

      <span className="flex-1 min-w-0">
        <span className="block text-sm font-semibold text-body truncate">{item.title}</span>
        <span className="block text-xs text-muted truncate">{item.description}</span>
      </span>

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

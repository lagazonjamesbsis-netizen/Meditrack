'use client'

import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { toast } from 'sonner'
import { useDisplay } from '@/store/useDisplay'
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  CircleUserRound,
  FileText,
  Info,
  LifeBuoy,
  Lock,
  LogOut,
  MessageCircle,
  Moon,
  MonitorSmartphone,
  PhoneCall,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type SettingsItemConfig = {
  key: string
  label: string
  icon: LucideIcon
  toggle?: boolean
  danger?: boolean
}

const generalItems: SettingsItemConfig[] = [
  { key: 'account', label: 'Account Management', icon: CircleUserRound },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'dark-mode', label: 'Dark Mode', icon: Moon, toggle: true },
  { key: 'privacy', label: 'Privacy & Security', icon: Lock },
  { key: 'display', label: 'Display Settings', icon: MonitorSmartphone },
]

const supportItems: SettingsItemConfig[] = [
  { key: 'contact', label: 'Contact', icon: PhoneCall },
  { key: 'feedback', label: 'Feedback', icon: MessageCircle },
  { key: 'terms', label: 'Terms & Conditions', icon: FileText },
  { key: 'help', label: 'Help & Support', icon: LifeBuoy },
  { key: 'about', label: 'About Us', icon: Info },
]

export default function SettingsPage() {
  const router = useRouter()
  const { theme, setTheme } = useDisplay()
  const darkMode =
    theme === 'dark' ||
    (theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)

  const goBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/dashboard')
    }
  }

  const onItemPress = (label: string) => {
    if (label === 'Account Management') {
      router.push('/settings/account')
      return
    }
    if (label === 'Notifications') {
      router.push('/settings/notifications')
      return
    }
    if (label === 'Privacy & Security') {
      router.push('/settings/privacy-security')
      return
    }
    if (label === 'Display Settings') {
      router.push('/settings/display')
      return
    }
    if (label === 'Contact') {
      router.push('/settings/contact')
      return
    }
    if (label === 'Feedback') {
      router.push('/settings/feedback')
      return
    }
    if (label === 'Help & Support') {
      router.push('/settings/help-support')
      return
    }
    if (label === 'Terms & Conditions' || label === 'Terms') {
      router.push('/settings/terms')
      return
    }
    if (label === 'About Us' || label === 'About') {
      router.push('/settings/about')
      return
    }
    toast.info(`${label} coming soon`)
  }

  const onLogout = () => {
    signOut({ callbackUrl: '/login' })
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-line px-4 py-3 flex items-center justify-between md:justify-center">
        <button
          type="button"
          onClick={goBack}
          aria-label="Go back"
          className="p-2 -ml-2 rounded-full text-brand hover:bg-brand-tint transition-colors md:hidden"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
        </button>

        <h1 className="text-xl font-bold text-brand">Settings</h1>

        <span className="w-9 md:hidden" aria-hidden="true" />
      </header>

      <main className="px-4 pt-4 flex flex-col gap-5 pb-32 md:grid md:grid-cols-2 md:items-start">
        <div className="bg-card rounded-3xl shadow-card overflow-hidden md:col-span-2 md:grid md:grid-cols-2 md:gap-5">
          <div className="divide-y divide-line">
            {generalItems.map((item) => (
              <SettingsItem
                key={item.key}
                item={item}
                onPress={() => onItemPress(item.label)}
                toggleValue={item.key === 'dark-mode' ? darkMode : false}
                onToggle={() => setTheme(darkMode ? 'light' : 'dark')}
              />
            ))}
          </div>

          <div className="h-2.5 bg-surface md:hidden" aria-hidden="true" />

          <div className="divide-y divide-line md:border-l md:border-line">
            {supportItems.map((item) => (
              <SettingsItem
                key={item.key}
                item={item}
                onPress={() => onItemPress(item.label)}
              />
            ))}
          </div>
        </div>

        <div className="bg-card rounded-3xl shadow-card overflow-hidden md:col-span-2 md:w-72 md:mx-auto">
          <SettingsItem
            item={{ key: 'logout', label: 'Logout', icon: LogOut, danger: true }}
            onPress={onLogout}
            hideChevron
          />
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
  hideChevron = false,
}: {
  item: SettingsItemConfig
  onPress: () => void
  onToggle?: () => void
  toggleValue?: boolean
  hideChevron?: boolean
}) {
  return (
    <button
      type="button"
      role={item.toggle ? 'switch' : undefined}
      aria-checked={item.toggle ? toggleValue : undefined}
      onClick={() => (item.toggle ? onToggle?.() : onPress())}
      className="w-full flex items-center gap-3.5 px-4 h-14 text-left transition-colors hover:bg-surface"
    >
      <span
        className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center ${
          item.danger ? 'bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400' : 'bg-brand-tint text-brand'
        }`}
      >
        <item.icon className="w-4 h-4" aria-hidden="true" />
      </span>

      <span
        className={`flex-1 text-sm font-semibold truncate ${
          item.danger ? 'text-red-600' : 'text-body'
        }`}
      >
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
      ) : hideChevron ? null : (
        <ChevronRight className="w-4 h-4 shrink-0 text-faint" aria-hidden="true" />
      )}
    </button>
  )
}

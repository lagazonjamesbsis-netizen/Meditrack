import Link from 'next/link'
import { Bell, Settings } from 'lucide-react'
import MediTrackBrand from '@/components/globals/MediTrackBrand'

export default function PatientHeader() {
  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-line px-4 py-3 flex items-center justify-between">
      <MediTrackBrand compact />

      <div className="flex items-center gap-1">
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="relative p-2 rounded-full text-brand hover:bg-brand-tint transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </Link>
        <Link
          href="/settings"
          aria-label="Settings"
          className="p-2 rounded-full text-brand hover:bg-brand-tint transition-colors"
        >
          <Settings className="w-5 h-5" />
        </Link>
      </div>
    </header>
  )
}

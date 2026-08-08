'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarDays, ClipboardList, Home, UserRound } from 'lucide-react'

// All navigation items are always visible — pending-approval users still get
// full navigation; gated pages (Appointment, Records) render an approval
// notice for them instead of hiding the tabs.
const items = [
  { key: 'home', label: 'Home', href: '/dashboard', icon: Home },
  {
    key: 'appointment',
    label: 'Appointment',
    href: '/dashboard/appointment',
    icon: CalendarDays,
  },
  { key: 'records', label: 'Records', href: '/dashboard/records', icon: ClipboardList },
  { key: 'you', label: 'You', href: '/dashboard/profile', icon: UserRound },
]

export default function PatientBottomNavigation() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur border-t border-line shadow-[0_-4px_20px_rgb(15_88_139/0.06)] dark:shadow-[0_-4px_20px_rgb(0_0_0/0.45)]"
    >
      <div className={`max-w-md mx-auto grid grid-cols-4 py-2`}>
        {items.map((item) => {
          const isActive =
            item.href === '/dashboard'
              ? pathname === item.href
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center gap-1 py-1.5 rounded-xl transition-colors ${
                isActive ? 'text-brand' : 'text-muted hover:text-body'
              }`}
            >
              <item.icon className="w-6 h-6" aria-hidden="true" />
              <span className={`text-[11px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
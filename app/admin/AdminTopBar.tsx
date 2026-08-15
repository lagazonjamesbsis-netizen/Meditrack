// File location: app/admin/AdminTopBar.tsx
'use client'

import { LogOut, Moon, Settings, UserRound, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDarkMode } from '@/app/staff/DarkModeContext'
import { useCurrentUser } from '@/app/admin/CurrentUserContext'

interface Notification {
  id: number
  category: 'Appointment' | 'Record Management' | 'Events'
  title: string
  description: string
  time: string
  unread: boolean
}

// TODO: replace with real notifications from your API/websocket feed.
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    category: 'Appointment',
    title: 'New Appointment Booked',
    description:
      'Juan Dela Cruz booked an appointment for July 20, 2026 at 10:00 AM.',
    time: '2 min ago',
    unread: true,
  },
  {
    id: 2,
    category: 'Appointment',
    title: 'Appointment Rescheduled',
    description: 'Maria Santos rescheduled her appointment to July 22, 2026.',
    time: '15 min ago',
    unread: true,
  },
  {
    id: 3,
    category: 'Record Management',
    title: 'Patient Record Updated',
    description: "Pedro Gonzales' medical record has been updated.",
    time: '1 hr ago',
    unread: true,
  },
  {
    id: 4,
    category: 'Events',
    title: 'New Event Created',
    description: 'Health & Wellness Seminar has been scheduled for August 5.',
    time: '2 hr ago',
    unread: false,
  },
  {
    id: 5,
    category: 'Record Management',
    title: 'Lab Results Uploaded',
    description: 'New lab results for Ana Lopez are now available.',
    time: '3 hr ago',
    unread: false,
  },
  {
    id: 6,
    category: 'Events',
    title: 'Event Reminder',
    description: 'Team Meeting starts in 30 minutes.',
    time: '5 hr ago',
    unread: false,
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  All: '#4E69D3',
  Appointment: '#4CAF50',
  'Record Management': '#FF9800',
  Events: '#9C27B0',
}

function NotificationDropdown({
  darkMode,
  onClose,
}: {
  darkMode: boolean
  onClose: () => void
}) {
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = ['All', 'Appointment', 'Record Management', 'Events']
  const filtered =
    activeCategory === 'All'
      ? MOCK_NOTIFICATIONS
      : MOCK_NOTIFICATIONS.filter((n) => n.category === activeCategory)

  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <div
        className={`absolute right-0 top-full mt-2 z-20 w-[380px] max-h-[480px] rounded-xl shadow-lg overflow-hidden flex flex-col ${darkMode ? 'bg-[#2d1b4e] border border-[rgba(255,255,255,0.10)]' : 'bg-white border border-slate-200'}`}
      >
        <div
          className={`shrink-0 flex items-center justify-between px-5 py-4 border-b ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-slate-200'}`}
        >
          <h3
            className={`font-poppins text-lg font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}
          >
            Notifications
          </h3>
          <div className="flex items-center gap-2">
            <button className="text-xs font-semibold text-[#4E69D3] hover:underline">
              Mark all as read
            </button>
            <button
              onClick={onClose}
              className={darkMode ? 'text-gray-300' : 'text-slate-400'}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div
          className={`shrink-0 flex flex-nowrap gap-1.5 px-4 py-3 border-b overflow-x-auto ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-slate-200'}`}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 flex items-center justify-center min-w-[76px] px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors ${
                activeCategory === cat
                  ? 'text-white border-transparent'
                  : darkMode
                    ? 'text-[#F9FAFB] border-[rgba(255,255,255,0.20)]'
                    : 'text-slate-500 border-slate-200'
              }`}
              style={
                activeCategory === cat
                  ? { background: CATEGORY_COLORS[cat] }
                  : undefined
              }
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto py-2">
          {filtered.length > 0 ? (
            filtered.map((n) => (
              <div
                key={n.id}
                className={`px-5 py-3.5 border-l-4 ${n.unread ? (darkMode ? 'bg-[#0f1438]' : 'bg-blue-50') : ''}`}
                style={{ borderLeftColor: CATEGORY_COLORS[n.category] }}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
                    style={{ background: CATEGORY_COLORS[n.category] }}
                  >
                    {n.category}
                  </span>
                  {n.unread && (
                    <span className="h-2 w-2 rounded-full bg-[#4E69D3]" />
                  )}
                </div>
                <p
                  className={`text-sm font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}
                >
                  {n.title}
                </p>
                <p
                  className={`mt-0.5 text-xs leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}
                >
                  {n.description}
                </p>
                <span className="text-[11px] text-gray-400">{n.time}</span>
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-sm text-gray-400">
              No notifications
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default function AdminTopBar() {
  const { darkMode, setDarkMode } = useDarkMode()
  const { user } = useCurrentUser()
  const [open, setOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const router = useRouter()

  function handleLogout() {
    // TODO: call your sign-out flow here, e.g. next-auth `signOut()`
    // or POST /api/auth/logout, then redirect to the login page.
    setOpen(false)
    router.push('/login')
  }

  return (
    <div
      className={`flex items-center justify-end gap-3 pl-7 pr-6 py-4 ${
        darkMode ? 'bg-[rgba(45,27,78,0.65)]' : 'bg-white/65'
      }`}
    >
      <div className="relative">
        <button
          onClick={() => {
            setNotifOpen((v) => !v)
            setOpen(false)
          }}
          className={`relative flex h-8 w-8 items-center justify-center ${darkMode ? 'text-gray-300' : 'text-[#5a6b76]'}`}
          title="Notifications"
        >
          <img
            src="/icon-notification.png"
            alt="Notifications"
            className="h-7 w-7 object-contain"
          />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        {notifOpen && (
          <NotificationDropdown
            darkMode={darkMode}
            onClose={() => setNotifOpen(false)}
          />
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => {
            setOpen((v) => !v)
            setNotifOpen(false)
          }}
          className="w-8 h-8 rounded-full bg-[#2ea3e6] text-white flex items-center justify-center font-bold text-[13px] overflow-hidden"
        >
          {user.initials || <UserRound size={16} />}
        </button>

        {open && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpen(false)}
            />
            <div
              className={`absolute right-0 top-full mt-2 z-20 w-72 rounded-xl border shadow-lg overflow-hidden ${
                darkMode
                  ? 'bg-[#2d1b4e] border-[rgba(255,255,255,0.10)]'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3 px-4 py-4 border-b border-inherit">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${darkMode ? 'bg-[#050617] text-gray-300' : 'bg-slate-100 text-slate-500'}`}
                >
                  <UserRound size={20} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-sky-500">
                    {user.id}
                  </div>
                  <div
                    className={`truncate text-sm font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-slate-800'}`}
                  >
                    {user.fullName}
                  </div>
                  <div
                    className={`truncate text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}
                  >
                    {user.email}
                  </div>
                </div>
              </div>

              <nav className="py-1">
                <Link
                  href="/admin/profile"
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold ${
                    darkMode
                      ? 'text-[#F9FAFB] hover:bg-[#3a2464]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <UserRound size={18} /> Profile
                </Link>
                <Link
                  href="/admin/settings"
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold ${
                    darkMode
                      ? 'text-[#F9FAFB] hover:bg-[#3a2464]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Settings size={18} /> Account Settings
                </Link>

                <div className="flex items-center justify-between px-4 py-3">
                  <span
                    className={`flex items-center gap-3 text-sm font-semibold ${darkMode ? 'text-[#F9FAFB]' : 'text-slate-700'}`}
                  >
                    <Moon size={18} /> Dark Mode
                  </span>
                  <label className="relative inline-block w-[38px] h-5 cursor-pointer">
                    <input
                      type="checkbox"
                      className="opacity-0 w-0 h-0 peer"
                      checked={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                    />
                    <span className="absolute inset-0 bg-gray-300 rounded-full transition-colors peer-checked:bg-[#4E69D3] after:content-[''] after:absolute after:h-4 after:w-4 after:left-[2px] after:bottom-[2px] after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-[18px]" />
                  </label>
                </div>
              </nav>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 border-t border-inherit px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50"
              >
                <LogOut size={18} /> Log Out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

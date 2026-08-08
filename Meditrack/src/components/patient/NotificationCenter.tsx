'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ArrowLeft, BellOff, Check, MoreHorizontal, Settings, Trash2 } from 'lucide-react'
import {
  categoryStyles,
  formatNotificationTime,
  isSameDay,
  mockNotifications,
} from '@/data/notifications'
import type { AppNotification } from '@/data/notifications'

type Group = {
  label: string
  items: AppNotification[]
}

function buildGroups(notifications: AppNotification[]): Group[] {
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)

  const groups: Group[] = [
    { label: 'Today', items: [] },
    { label: 'Yesterday', items: [] },
    { label: 'Earlier', items: [] },
  ]

  for (const notification of notifications) {
    if (isSameDay(notification.createdAt, now)) groups[0].items.push(notification)
    else if (isSameDay(notification.createdAt, yesterday)) groups[1].items.push(notification)
    else groups[2].items.push(notification)
  }

  return groups.filter((group) => group.items.length > 0)
}

export default function NotificationCenter() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  const groups = useMemo(() => buildGroups(notifications), [notifications])
  const unreadCount = notifications.filter((n) => !n.read).length

  const goBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/dashboard')
    }
  }

  const markAsRead = (id: string) => {
    const target = notifications.find((n) => n.id === id)
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
    setOpenMenuId(null)
    if (target && !target.read) toast.success('Notification marked as read')
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    setOpenMenuId(null)
    toast.success('Notification deleted')
  }

  const deleteAll = () => {
    setNotifications([])
    setOpenMenuId(null)
    toast.success('All notifications cleared')
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

        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-brand">Notifications</h1>
          {unreadCount > 0 && (
            <span className="min-w-5 h-5 px-1.5 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>

        <Link
          href="/settings"
          aria-label="Notification settings"
          className="p-2 -mr-2 rounded-full text-brand hover:bg-brand-tint transition-colors"
        >
          <Settings className="w-5 h-5" aria-hidden="true" />
        </Link>
      </header>

      <main className="px-4 pt-4 flex flex-col gap-5 pb-32">
        <div className="bg-card rounded-3xl shadow-card p-5">
          {notifications.length > 0 ? (
            <>
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={deleteAll}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-brand hover:bg-brand-dark px-3.5 py-2 rounded-full shadow-sm transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  Delete All
                </button>
              </div>

              <div className="mt-2 space-y-6">
                {groups.map((group) => (
                  <section key={group.label} aria-label={group.label}>
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-xs font-bold uppercase tracking-widest text-muted">
                        {group.label}
                      </h2>
                      <span className="text-[10px] font-semibold text-faint">
                        {group.items.length}{' '}
                        {group.items.length === 1 ? 'notification' : 'notifications'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {group.items.map((notification) => {
                        const style = categoryStyles[notification.category]
                        return (
                          <NotificationCard
                            key={notification.id}
                            notification={notification}
                            style={style}
                            menuOpen={openMenuId === notification.id}
                            onToggleMenu={() =>
                              setOpenMenuId((current) =>
                                current === notification.id ? null : notification.id
                              )
                            }
                            onCloseMenu={() => setOpenMenuId(null)}
                            onOpen={() => {
                              if (!notification.read) markAsRead(notification.id)
                            }}
                            onMarkAsRead={() => markAsRead(notification.id)}
                            onDelete={() => deleteNotification(notification.id)}
                          />
                        )
                      })}
                    </div>
                  </section>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center text-center gap-3 py-12">
              <div className="w-16 h-16 rounded-full bg-brand-tint text-brand flex items-center justify-center">
                <BellOff className="w-8 h-8" aria-hidden="true" />
              </div>
              <h2 className="font-bold text-body">You&apos;re all caught up</h2>
              <p className="text-sm text-muted max-w-[240px]">
                New updates about your appointments, records, and health programs will appear
                here.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

function NotificationCard({
  notification,
  style,
  menuOpen,
  onToggleMenu,
  onCloseMenu,
  onOpen,
  onMarkAsRead,
  onDelete,
}: {
  notification: AppNotification
  style: { bar: string; text: string; tint: string }
  menuOpen: boolean
  onToggleMenu: () => void
  onCloseMenu: () => void
  onOpen: () => void
  onMarkAsRead: () => void
  onDelete: () => void
}) {
  const isUnread = !notification.read

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen()
        }
      }}
      className="relative overflow-hidden rounded-xl border border-line bg-soft hover:bg-gray-100 dark:hover:bg-card shadow-sm transition-colors cursor-pointer"
    >
      <span
        aria-hidden="true"
        className={`absolute left-0 top-0 bottom-0 w-1.5 ${style.bar}`}
      />

      <div className="pl-4 pr-3 py-2">
        <div className="flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider ${style.text}`}
          >
            <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full ${style.bar}`} />
            {notification.category}
          </span>
          <span className="flex-1" />
          {isUnread && (
            <span aria-label="Unread" className="w-1.5 h-1.5 rounded-full bg-brand" />
          )}
          <span className="text-[10px] font-medium text-muted shrink-0">
            {formatNotificationTime(notification.createdAt)}
          </span>
          <div className="relative shrink-0">
            <button
              type="button"
              aria-label="More options"
              aria-expanded={menuOpen}
              onClick={(e) => {
                e.stopPropagation()
                onToggleMenu()
              }}
              className="p-1 -mr-1 rounded-full text-muted hover:bg-soft hover:text-muted transition-colors"
            >
              <MoreHorizontal className="w-4 h-4" aria-hidden="true" />
            </button>

            {menuOpen && (
              <>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="fixed inset-0 z-10 cursor-default"
                  onClick={(e) => {
                    e.stopPropagation()
                    onCloseMenu()
                  }}
                />
                <div className="absolute right-0 top-full z-20 mt-1 w-44 bg-card rounded-xl shadow-xl border border-line py-1.5">
                  {isUnread && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onMarkAsRead()
                      }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm font-medium text-body text-left hover:bg-surface transition-colors"
                    >
                      <Check className="w-4 h-4 text-brand" aria-hidden="true" />
                      Mark as Read
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete()
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm font-medium text-red-600 text-left hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <h3
          className={`text-[13px] leading-snug mt-1 ${
            isUnread ? 'font-bold text-body' : 'font-semibold text-body'
          }`}
        >
          {notification.title}
        </h3>
        <p className="text-xs text-muted mt-0.5 leading-relaxed line-clamp-2">
          {notification.description}
        </p>
      </div>
    </div>
  )
}

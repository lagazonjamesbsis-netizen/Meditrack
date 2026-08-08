'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  LifeBuoy,
  MessageCircleHeart,
  Phone,
  UserRound,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type FaqItemConfig = {
  key: string
  question: string
  answer: string
  icon: LucideIcon
}

const faqItems: FaqItemConfig[] = [
  {
    key: 'booking',
    question: 'How do I book an appointment?',
    answer:
      'Go to the Appointment section from the home screen, choose a healthcare service, pick an available date and time, then confirm your booking. A confirmation notification will appear once your appointment is scheduled.',
    icon: CalendarDays,
  },
  {
    key: 'records',
    question: 'How do I view my medical records?',
    answer:
      'Open the Records tab to view your health timeline and medical history. Use the family member tabs at the top to switch between records.',
    icon: ClipboardList,
  },
  {
    key: 'family',
    question: 'How do I manage family members?',
    answer:
      'In the Records section, tap Add Family Member, enter their details, and save. You can then switch between members at any time to view their health timeline.',
    icon: Users,
  },
  {
    key: 'account',
    question: 'How do I update my account information?',
    answer:
      'Go to Settings, then Account Management, to update your display name, contact details, emergency contacts, and password.',
    icon: UserRound,
  },
  {
    key: 'notifications',
    question: 'How do notification settings work?',
    answer:
      'Open Settings, then Notifications, to turn preferences on or off — including appointment reminders, lab and results updates, and medication reminders.',
    icon: Bell,
  },
]

const supportActions = [
  { key: 'contact', title: 'Contact Us', description: 'Reach the health center and support team.', icon: Phone, href: '/settings/contact' },
  { key: 'feedback', title: 'Send Feedback', description: 'Share your thoughts with our healthcare team.', icon: MessageCircleHeart, href: '/settings/feedback' },
]

export default function HelpSupportPage() {
  const router = useRouter()
  const [openKey, setOpenKey] = useState<string | null>('booking')

  const goBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/settings')
    }
  }

  const toggle = (key: string) => {
    setOpenKey((current) => (current === key ? null : key))
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

        <h1 className="text-xl font-bold text-brand">Help & Support</h1>

        <span className="w-9" aria-hidden="true" />
      </header>

      <main className="px-4 pt-4 flex flex-col gap-5 pb-32">
        <section aria-label="Help welcome" className="bg-card rounded-3xl shadow-card p-5">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 shrink-0 rounded-2xl bg-brand-tint text-brand flex items-center justify-center">
              <LifeBuoy className="w-6 h-6" aria-hidden="true" />
            </span>
            <h2 className="text-2xl font-bold text-brand leading-tight">Need Assistance?</h2>
          </div>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            Find answers to common questions and learn how to use MediTrack effectively.
          </p>
        </section>

        <section aria-label="Frequently asked questions" className="bg-card rounded-3xl shadow-card overflow-hidden">
          <div className="p-5 pb-2">
            <h2 className="text-lg font-bold text-brand inline-flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-brand-tint text-brand flex items-center justify-center">
                <MessageCircleHeart className="w-5 h-5" aria-hidden="true" />
              </span>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="divide-y divide-line">
            {faqItems.map((item) => {
              const isOpen = openKey === item.key
              return (
                <div key={item.key}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggle(item.key)}
                    className="w-full flex items-center gap-3.5 px-4 py-4 text-left transition-colors hover:bg-surface"
                  >
                    <span className="w-9 h-9 shrink-0 rounded-xl bg-brand-tint text-brand flex items-center justify-center">
                      <item.icon className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className="flex-1 min-w-0 text-sm font-semibold text-body leading-snug">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-muted transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 pb-4 pl-[52px] text-sm text-muted leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section
          aria-label="Support actions"
          className="bg-card rounded-3xl shadow-card overflow-hidden"
        >
          <div className="p-5 pb-3">
            <h2 className="text-lg font-bold text-brand inline-flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-brand-tint text-brand flex items-center justify-center">
                <Phone className="w-5 h-5" aria-hidden="true" />
              </span>
              Support Actions
            </h2>
          </div>
          <div className="divide-y divide-line">
            {supportActions.map((action) => (
              <Link
                key={action.key}
                href={action.href}
                className="w-full flex items-center gap-3.5 px-4 py-3.5 transition-colors hover:bg-surface"
              >
                <span className="w-9 h-9 shrink-0 rounded-xl bg-brand-tint text-brand flex items-center justify-center">
                  <action.icon className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-semibold text-body">{action.title}</span>
                  <span className="block text-xs text-muted">{action.description}</span>
                </span>
                <ChevronRight className="w-4 h-4 shrink-0 text-faint" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
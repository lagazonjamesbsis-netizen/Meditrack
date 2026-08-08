'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ChevronDown,
  Lock,
  Scale,
  ScrollText,
  ShieldCheck,
  Stethoscope,
  UserCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type TermsConfig = {
  key: string
  title: string
  body: string[]
  icon: LucideIcon
}

const termsItems: TermsConfig[] = [
  {
    key: 'acceptable-use',
    title: 'Acceptable Use',
    icon: ShieldCheck,
    body: [
      'Use MediTrack for its intended purpose: managing your healthcare timeline and appointments with the health center.',
      'Provide accurate and up-to-date information about yourself and your family members.',
      'Do not share your account credentials, or allow others to use your account.',
    ],
  },
  {
    key: 'privacy-data',
    title: 'Privacy & Data',
    icon: Lock,
    body: [
      'Your health records are stored securely to protect your personal and medical information.',
      'Your information is only accessible to you, and to authorized healthcare staff when needed.',
      'You can manage account and notification preferences directly from Settings.',
    ],
  },
  {
    key: 'healthcare-information',
    title: 'Healthcare Information',
    icon: Stethoscope,
    body: [
      'MediTrack helps you organize and review your health timeline and medical records.',
      'It does not replace professional medical judgment, diagnosis, or treatment.',
      'Always consult the health center for any medical decision.',
    ],
  },
  {
    key: 'user-responsibilities',
    title: 'User Responsibilities',
    icon: UserCheck,
    body: [
      'Keep your account credentials secure and confidential at all times.',
      'Update your contact and emergency details whenever they change.',
      'Inform the health center if you notice any issue with your medical records.',
    ],
  },
  {
    key: 'limitations-liability',
    title: 'Limitations & Liability',
    icon: Scale,
    body: [
      'MediTrack is a patient engagement tool, not an emergency service.',
      'In an emergency, call 911 or go to the nearest health center immediately.',
      'MediTrack is not liable for reliance on the platform beyond its intended use.',
    ],
  },
]

export default function TermsPage() {
  const router = useRouter()
  const [openKey, setOpenKey] = useState<string | null>('acceptable-use')

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

        <h1 className="text-xl font-bold text-brand">Terms &amp; Conditions</h1>

        <span className="w-9" aria-hidden="true" />
      </header>

      <main className="px-4 pt-4 flex flex-col gap-5 pb-32">
        <section
          aria-label="Terms introduction"
          className="bg-card rounded-3xl shadow-card p-5"
        >
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 shrink-0 rounded-2xl bg-brand-tint text-brand flex items-center justify-center">
              <ScrollText className="w-6 h-6" aria-hidden="true" />
            </span>
            <h2 className="text-2xl font-bold text-brand leading-tight">Welcome to MediTrack</h2>
          </div>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            By using this application, you agree to follow the platform guidelines and terms
            outlined below.
          </p>
        </section>

        <section
          aria-label="Terms sections"
          className="bg-card rounded-3xl shadow-card overflow-hidden"
        >
          <div className="p-5 pb-2">
            <h2 className="text-lg font-bold text-brand inline-flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-brand-tint text-brand flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </span>
              Terms &amp; Conditions
            </h2>
          </div>
          <div className="divide-y divide-line">
            {termsItems.map((item) => {
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
                      {item.title}
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
                      <ul className="px-4 pb-4 pl-[52px] flex flex-col gap-2">
                        {item.body.map((paragraph, idx) => (
                          <li key={idx} className="text-sm text-muted leading-relaxed">
                            {paragraph}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section aria-label="Last updated" className="bg-card rounded-3xl shadow-card p-5">
          <p className="text-center text-sm text-muted">
            Last Updated: <span className="font-semibold text-body">August 2026</span>
          </p>
        </section>
      </main>
    </>
  )
}
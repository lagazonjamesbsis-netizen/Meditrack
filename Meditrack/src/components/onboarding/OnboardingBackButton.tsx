'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

// Top-left back arrow for the onboarding steps — same style as the
// Settings / Account Management / Notification Settings headers.
// Navigation is a deterministic push to the previous registration step
// (never history.back(): the browser's history.length is the whole tab's
// history and router.back() silently no-ops outside the app).
export default function OnboardingBackButton({ href }: { href: string }) {
  const { push } = useRouter()

  return (
    <button
      type="button"
      onClick={() => push(href)}
      aria-label="Go back"
      className="p-2 -ml-2 rounded-full text-brand hover:bg-brand-tint transition-colors cursor-pointer"
    >
      <ArrowLeft className="w-5 h-5" aria-hidden="true" />
    </button>
  )
}
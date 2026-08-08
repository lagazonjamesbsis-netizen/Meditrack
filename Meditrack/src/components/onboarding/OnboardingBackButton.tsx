'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

// Top-left back arrow for the onboarding steps — same style as the
// Settings / Account Management / Notification Settings headers.
// Navigates to the previous registration step without losing the draft.
export default function OnboardingBackButton({ fallback }: { fallback: string }) {
  const router = useRouter()

  function goBack() {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push(fallback)
    }
  }

  return (
    <button
      type="button"
      onClick={goBack}
      aria-label="Go back"
      className="p-2 -ml-2 rounded-full text-brand hover:bg-brand-tint transition-colors"
    >
      <ArrowLeft className="w-5 h-5" aria-hidden="true" />
    </button>
  )
}
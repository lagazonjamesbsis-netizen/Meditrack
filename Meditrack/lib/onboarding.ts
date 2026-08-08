// Client-side draft storage for the PRAMIS onboarding flow
// (Sign Up → Residence Details → Verification → Done).
// NO account exists until the final Verification step submits. Until then
// all collected data (credentials + residence) lives in sessionStorage, so
// the review step can persist them without a session.
// The password is held here only for the duration of the single-session
// onboarding; it is sent to the server once, at the final submit.

export type OnboardingDraft = {
  name?: string
  email?: string
  password?: string
  residence?: {
    houseNo: string
    street: string
    barangay: string
    city: string
    province: string
    zipCode: string
  }
}

const KEY = 'meditrackOnboarding'

export function readOnboardingDraft(): OnboardingDraft {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as OnboardingDraft) : {}
  } catch {
    return {}
  }
}

export function writeOnboardingDraft(draft: OnboardingDraft) {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(draft))
  } catch {
    // storage unavailable — the flow can still continue
  }
}

export function clearOnboardingDraft() {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}

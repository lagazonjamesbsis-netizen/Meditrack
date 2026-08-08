'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { completeRegistration } from '@/lib/actions/user'
import {
  clearOnboardingDraft,
  readOnboardingDraft,
} from '@/lib/onboarding'
import OnboardingBrand from '@/components/onboarding/OnboardingBrand'
import OnboardingStepper from '@/components/onboarding/OnboardingStepper'
import OnboardingBackButton from '@/components/onboarding/OnboardingBackButton'

const primaryButton =
  'w-full bg-[#0F588B] hover:bg-[#0A4976] disabled:opacity-50 disabled:animate-pulse text-white text-center py-3 rounded-xl font-semibold transition-colors'

const Verification = () => {
  const { push } = useRouter()
  const draft = readOnboardingDraft()

  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const residence = draft.residence

  // No draft in this browser tab — the user skipped the earlier steps.
  if (!draft.name || !draft.email || !draft.password || !residence) {
    return (
      <div
        className="min-h-screen flex flex-col lg:flex-row bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/purplebackground.png')" }}
      >
        <OnboardingBrand />

        <div className="flex-1 flex flex-col items-center justify-center lg:justify-center px-4 pb-10">
          <div className="w-[92%] max-w-md mb-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Verification</h2>
            <p className="text-sm text-gray-500">Review your information before submitting.</p>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-6 w-[92%] max-w-md text-center">
            <p className="text-sm text-gray-500 mb-6">
              Please complete the signup form first so we can verify your details.
            </p>
            <Link
              href="/signup"
              className="block w-full bg-[#0F588B] hover:bg-[#0A4976] text-white text-center py-3 rounded-xl font-semibold transition-colors"
            >
              Go to Sign Up
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const address = [residence.houseNo, residence.street]
    .filter(Boolean)
    .join(', ')

  const rows: { label: string; value: string }[] = [
    { label: 'Name', value: draft.name },
    { label: 'Email', value: draft.email ?? '' },
    { label: 'Address', value: address },
    { label: 'Barangay', value: residence.barangay },
    { label: 'City / Municipality', value: residence.city },
    { label: 'Province', value: residence.province },
    { label: 'ZIP / Postal Code', value: residence.zipCode || '—' },
  ]

  async function handleConfirm() {
    setPending(true)
    setError(null)

    // The full onboarding draft — the account is created HERE, at the final
    // submit, never at earlier steps.
    const formData = new FormData()
    formData.set('name', draft.name ?? '')
    formData.set('email', draft.email ?? '')
    formData.set('password', draft.password ?? '')
    formData.set('address', address)
    formData.set('barangay', residence.barangay)
    formData.set('city', residence.city)
    formData.set('province', residence.province)
    formData.set('zipCode', residence.zipCode)

    const res = await completeRegistration(null, formData)

    if (res.success) {
      // Mark the registration as done so the success page only renders
      // after a genuine submission.
      try {
        sessionStorage.setItem('meditrackRegistered', '1')
      } catch {
        // storage unavailable — proceed anyway
      }

      clearOnboardingDraft()
      push('/done')
    } else {
      setError(res.message || 'Failed to complete registration.')
      setPending(false)
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/purplebackground.png')" }}
    >
      <OnboardingBrand />

      {/* Form Area */}
      <div className="flex-1 flex flex-col items-center justify-start lg:justify-center px-4 pb-10">
        {/* Back to Residence Details — review finds mistakes are corrected here */}
        <div className="w-[92%] max-w-md mb-3 flex items-center justify-between">
          <OnboardingBackButton fallback="/residence-details" />
          <span className="w-9" aria-hidden="true" />
        </div>

        <OnboardingStepper active={1} />

        {/* Title + Description */}
        <div className="w-[92%] max-w-md mb-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Verification</h2>
          <p className="text-sm text-gray-500">
            Please review the information below before submitting your registration.
          </p>
        </div>

        {/* Review Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 w-[92%] max-w-md">
          <dl className="divide-y divide-gray-100 border-t border-b border-gray-100 mb-6">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-start justify-between gap-4 py-3"
              >
                <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide shrink-0">
                  {row.label}
                </dt>
                <dd className="text-sm font-medium text-right break-words">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          {error && (
            <p className="text-sm text-red-600 mb-4 text-center">{error}</p>
          )}

          <button
            type="button"
            onClick={handleConfirm}
            disabled={pending}
            className={primaryButton}
          >
            {pending ? 'Submitting...' : 'Confirm & Submit'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Verification
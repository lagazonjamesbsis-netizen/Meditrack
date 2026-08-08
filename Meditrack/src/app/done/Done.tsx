'use client'

import { useEffect, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import OnboardingBrand from '@/components/onboarding/OnboardingBrand'
import OnboardingStepper from '@/components/onboarding/OnboardingStepper'

const noopSubscribe = () => () => {}

// Success page — renders only after the Verification step actually created
// the account. Direct visits without the completion marker bounce to login.
const Done = () => {
  const { replace } = useRouter()

  const isRegistered = useSyncExternalStore(
    noopSubscribe,
    () => {
      try {
        return sessionStorage.getItem('meditrackRegistered') === '1'
      } catch {
        return false
      }
    },
    () => false
  )

  // Bounce direct visits away without touching state during render.
  useEffect(() => {
    if (!isRegistered) replace('/login')
  }, [isRegistered, replace])

  if (!isRegistered) return null

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/purplebackground.png')" }}
    >
      <OnboardingBrand />

      {/* Form Area */}
      <div className="flex-1 flex flex-col items-center justify-start lg:justify-center px-4 pb-10">
        <OnboardingStepper active={2} />

        {/* Success Message */}
        <div className="w-[92%] max-w-md mb-4 text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl font-bold">
            ✓
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
            Account Registered
          </h2>

          <p className="text-sm text-gray-600 mt-4">
            Your account has been successfully created.
          </p>

          <p className="text-sm text-gray-600 mt-4">
            Your account is currently awaiting approval from Barangay Sumapang
            Matanda Health Center.
          </p>

          <p className="text-sm text-gray-600 mt-4">
            You may now sign in and access limited features while your account
            is being reviewed.
          </p>
        </div>

        {/* Action */}
        <div className="bg-white shadow-xl rounded-2xl p-6 w-[92%] max-w-md">
          <Link
            href="/login"
            className="block w-full bg-[#0F588B] hover:bg-[#0A4976] text-white text-center py-3 rounded-xl font-semibold transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Done
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { readOnboardingDraft, writeOnboardingDraft } from '@/lib/onboarding'
import OnboardingBrand from '@/components/onboarding/OnboardingBrand'
import OnboardingStepper from '@/components/onboarding/OnboardingStepper'
import OnboardingBackButton from '@/components/onboarding/OnboardingBackButton'

const primaryButton =
  'w-full bg-[#0F588B] hover:bg-[#0A4976] text-white text-center py-3 rounded-xl font-semibold transition-colors'

const ResidenceDetails = () => {
  const { push, replace } = useRouter()

  const draft = readOnboardingDraft()
  const initial = draft.residence

  // Must arrive from the Sign Up step — the draft carries the credentials.
  useEffect(() => {
    if (!draft.name || !draft.email || !draft.password) {
      replace('/signup')
    }
  }, [draft, replace])

  // State
  const [houseNo, setHouseNo] = useState(initial?.houseNo ?? '')
  const [street, setStreet] = useState(initial?.street ?? '')
  const [barangay, setBarangay] = useState(initial?.barangay ?? '')
  const [city, setCity] = useState(initial?.city ?? '')
  const [province, setProvince] = useState(initial?.province ?? '')
  const [zipCode, setZipCode] = useState(initial?.zipCode ?? '')
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleNext(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const errs: Record<string, string> = {}
    if (!street.trim()) errs.street = 'Address is required.'
    if (!barangay.trim()) errs.barangay = 'Barangay is required.'
    if (!city.trim()) errs.city = 'City / Municipality is required.'
    if (!province.trim()) errs.province = 'Province is required.'
    setErrors(errs)

    if (Object.keys(errs).length > 0) return

    writeOnboardingDraft({
      ...draft,
      residence: {
        houseNo: houseNo.trim(),
        street: street.trim(),
        barangay: barangay.trim(),
        city: city.trim(),
        province: province.trim(),
        zipCode: zipCode.trim(),
      },
    })

    push('/verification')
  }

  const inputClass = (hasError: boolean) =>
    `w-full py-3 border-b mb-1 text-sm outline-none ${
      hasError ? 'border-red-400' : 'border-gray-300'
    }`

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/purplebackground.png')" }}
    >
      <OnboardingBrand />

      {/* Form Area */}
      <div className="flex-1 flex flex-col items-center justify-start lg:justify-center px-4 pb-10">
        {/* Back to Sign Up — draft data is preserved */}
        <div className="w-[92%] max-w-md mb-3 flex items-center justify-between">
          <OnboardingBackButton href="/signup" />
          <span className="w-9" aria-hidden="true" />
        </div>

        <OnboardingStepper active={0} />

        {/* Title + Description */}
        <div className="w-[92%] max-w-md mb-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">
            Residence Details
          </h2>
          <p className="text-sm text-gray-500">
            Please provide your complete residence address.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleNext}
          noValidate
          className="bg-white shadow-xl rounded-2xl p-6 w-[92%] max-w-md"
        >
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Province
          </label>
          <input
            type="text"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            placeholder="Province"
            className={inputClass(!!errors.province)}
          />
          {errors.province && (
            <p className="text-xs text-red-600 mb-2">{errors.province}</p>
          )}

          <div className="mb-3" />

          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            City / Municipality
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City / Municipality"
            className={inputClass(!!errors.city)}
          />
          {errors.city && (
            <p className="text-xs text-red-600 mb-2">{errors.city}</p>
          )}

          <div className="mb-3" />

          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Barangay
          </label>
          <input
            type="text"
            value={barangay}
            onChange={(e) => setBarangay(e.target.value)}
            placeholder="Barangay"
            className={inputClass(!!errors.barangay)}
          />
          {errors.barangay && (
            <p className="text-xs text-red-600 mb-2">{errors.barangay}</p>
          )}

          <div className="mb-3" />

          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Street / Address
          </label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Street"
            className={inputClass(!!errors.street)}
          />
          {errors.street && (
            <p className="text-xs text-red-600 mb-2">{errors.street}</p>
          )}

          <div className="mb-3" />

          <input
            type="text"
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
            placeholder="House No., Building, Floor and Others"
            className="w-full py-3 border-b border-gray-300 mb-3 text-sm outline-none"
          />

          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="ZIP / Postal Code"
            className="w-full py-3 border-b border-gray-300 mb-6 text-sm outline-none"
          />

          <button type="submit" className={primaryButton}>
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResidenceDetails
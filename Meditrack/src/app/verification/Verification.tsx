'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { completeRegistration } from '@/lib/actions/user'
import {
  clearOnboardingDraft,
  readOnboardingDraft,
  writeOnboardingDraft,
} from '@/lib/onboarding'
import OnboardingBrand from '@/components/onboarding/OnboardingBrand'
import OnboardingStepper from '@/components/onboarding/OnboardingStepper'
import OnboardingBackButton from '@/components/onboarding/OnboardingBackButton'
import { Camera, Check, ChevronDown, CreditCard, Upload } from 'lucide-react'

// Government ID options shown in the dropdown. Add new ID types by extending
// this list — the UI and the submitted data never change.
const ID_TYPES = [
  'Philippine National ID',
  'Driver\u2019s License',
  'Passport',
  'UMID',
  'PRC ID',
  'Postal ID',
]

const VERIFICATION_GUIDELINES = [
  'Valid and not expired',
  'Not damaged and clear',
  'The actual physical ID.',
  'Scanned, xerox, or photocopied IDs are NOT allowed except for the National ID.',
]

const primaryButton =
  'w-full bg-[#0F588B] hover:bg-[#0A4976] text-white text-center py-3 rounded-xl font-semibold transition-colors'

const actionButton =
  'flex-1 flex items-center justify-center gap-2 bg-[#0F588B] hover:bg-[#0A4976] text-white rounded-xl py-2.5 text-sm font-semibold cursor-pointer transition-colors'

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('read failed'))
    reader.readAsDataURL(file)
  })
}

// Downscale large camera photos so the previews stay light in sessionStorage.
async function compressImage(file: File, maxSize = 1000): Promise<string> {
  const original = await readFileAsDataUrl(file)

  try {
    const img = new Image()
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = () => reject(new Error('decode failed'))
      img.src = original
    })

    const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(img.width * scale))
    canvas.height = Math.max(1, Math.round(img.height * scale))

    const ctx = canvas.getContext('2d')
    if (!ctx) return original
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/jpeg', 0.85)
  } catch {
    // Fallback: keep the original file data — preview still works.
    return original
  }
}

const Verification = () => {
  const { push } = useRouter()
  const draft = readOnboardingDraft()
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const [idType, setIdType] = useState(
    draft.verification?.idType ?? ID_TYPES[0]
  )
  const [frontId, setFrontId] = useState(draft.verification?.frontId ?? '')
  const [backId, setBackId] = useState(draft.verification?.backId ?? '')

  // Persist the ID selection + photos so stepping back to Residence Details
  // and forward again keeps what was already provided.
  useEffect(() => {
    writeOnboardingDraft({
      ...readOnboardingDraft(),
      verification: { idType, frontId, backId },
    })
  }, [idType, frontId, backId])

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
            <p className="text-sm text-gray-500">Verify your identity before submitting.</p>
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

  async function handlePhoto(
    files: FileList | null,
    target?: 'front' | 'back'
  ) {
    const file = files?.[0]
    if (!file) return

    try {
      const dataUrl = await compressImage(file)
      const side = target ?? (backId ? 'front' : 'back')
      if (side === 'front') setFrontId(dataUrl)
      else setBackId(dataUrl)
      setError(null)
    } catch {
      setError('Could not read that image. Please try another file.')
    }
  }

  function clearPhoto(side: 'front' | 'back') {
    if (side === 'front') setFrontId('')
    else setBackId('')
  }

  // Ask for camera permission first, then open the native camera capture.
  // If camera access is unavailable, fall back to a friendly message — the
  // page never crashes and Upload still works.
  async function handleTakePhoto() {
    setError(null)

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setError('Unable to access camera. Please use Upload instead.')
        return
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })
      stream.getTracks().forEach((track) => track.stop())

      cameraInputRef.current?.click()
    } catch {
      setError('Unable to access camera. Please use Upload instead.')
    }
  }

  async function handleSubmit() {
    if (!frontId || !backId) {
      setError('Please upload clear photos of both the front and back of your ID.')
      return
    }

    setPending(true)
    setError(null)

    const address = [residence.houseNo, residence.street]
      .filter(Boolean)
      .join(', ')

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
    formData.set('idType', idType)

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

  const verificationRow = (side: 'front' | 'back') => {
    const src = side === 'front' ? frontId : backId

    return (
      <div
        key={side}
        className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 p-3"
      >
        {src ? (
          <img
            src={src}
            alt={`Uploaded photo of the ${side} side of your ID`}
            className="w-16 h-12 rounded-md object-cover shrink-0"
          />
        ) : (
          <div className="w-16 h-12 rounded-md bg-gray-100 flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800">
            {side === 'front' ? 'Front ID' : 'Back ID'}
          </p>
          <p
            className={`text-xs flex items-center gap-1 ${
              src ? 'text-green-600 font-medium' : 'text-gray-400'
            }`}
          >
            <Check className="w-3.5 h-3.5" aria-hidden="true" />
            {src
              ? side === 'front'
                ? 'Front ID Uploaded'
                : 'Back ID Uploaded'
              : 'Not uploaded yet'}
          </p>
        </div>

        {src && (
          <button
            type="button"
            onClick={() => clearPhoto(side)}
            aria-label={`Remove the ${side} ID photo`}
            className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-sm leading-none flex items-center justify-center hover:bg-slate-200 cursor-pointer"
          >
            ×
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/purplebackground.png')" }}
    >
      <OnboardingBrand />

      {/* Form Area */}
      <div className="flex-1 flex flex-col items-center justify-start lg:justify-center px-4 pb-10">
        {/* Back to Residence Details — corrections happen on the previous step */}
        <div className="w-[92%] max-w-md mb-3 flex items-center justify-between">
          <OnboardingBackButton href="/residence-details" />
          <span className="w-9" aria-hidden="true" />
        </div>

        <OnboardingStepper active={1} />

        {/* Title + Description */}
        <div className="w-[92%] max-w-md mb-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Verification</h2>
          <p className="text-sm text-gray-500">
            Verify your identity by uploading a valid government ID.
          </p>
        </div>

        {/* Verification Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 w-[92%] max-w-md">
          {/* ID Type Dropdown */}
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            ID Type
          </label>
          <div className="relative mb-6">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0F588B] cursor-pointer"
            >
              <span className="font-medium text-slate-800">{idType}</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {isOpen && (
              <ul
                role="listbox"
                className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-56 overflow-auto z-20"
              >
                {ID_TYPES.map((type) => (
                  <li key={type} role="option" aria-selected={type === idType}>
                    <button
                      type="button"
                      onClick={() => {
                        setIdType(type)
                        setIsOpen(false)
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm text-left text-slate-800 hover:bg-gray-100 cursor-pointer"
                    >
                      {type}
                      {type === idType && (
                        <Check className="w-4 h-4 text-green-500" aria-hidden="true" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ID Examples */}
          <div className="flex justify-center gap-3 mb-6">
            <img
              src="/id-front.png"
              alt="Example of the front side of a government ID"
              className="w-[47%] h-28 rounded-xl object-cover border border-gray-200"
            />
            <img
              src="/id-back.png"
              alt="Example of the back side of a government ID"
              className="w-[47%] h-28 rounded-xl object-cover border border-gray-200"
            />
          </div>

          {/* Unified Verification Container */}
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 mb-6">
            {frontId || backId ? (
              <div className="space-y-3">
                {verificationRow('front')}
                {verificationRow('back')}
              </div>
            ) : (
              <div className="py-8 flex flex-col items-center gap-1.5 text-center">
                <CreditCard className="w-10 h-10 text-gray-300 mb-1" aria-hidden="true" />
                <p className="text-sm font-semibold text-slate-700">Front &amp; Back ID</p>
                <p className="text-xs text-gray-400">Tap Upload or Take Photo</p>
              </div>
            )}
          </div>

          {/* Verification Guidelines */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Verification Guidelines
            </h3>
            <ul className="space-y-2.5">
              {VERIFICATION_GUIDELINES.map((guideline) => (
                <li
                  key={guideline}
                  className="flex items-start gap-2.5 text-sm text-gray-600"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"
                    aria-hidden="true"
                  />
                  {guideline}
                </li>
              ))}
            </ul>
          </div>

          {/* Upload Actions */}
          <div className="flex gap-3 mb-6">
            <label className={actionButton}>
              <Upload className="w-4 h-4" aria-hidden="true" />
              Upload
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handlePhoto(e.target.files)}
              />
            </label>
            <button type="button" onClick={handleTakePhoto} className={actionButton}>
              <Camera className="w-4 h-4" aria-hidden="true" />
              Take Photo
            </button>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => handlePhoto(e.target.files)}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 mb-6 text-center">{error}</p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={pending || !frontId || !backId}
            className={`${primaryButton} ${
              pending ? 'animate-pulse' : !frontId || !backId ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {pending ? 'Submitting...' : 'Next'}
          </button>

          {(!frontId || !backId) && (
            <p className="text-xs text-gray-400 mt-2 text-center">
              Upload both sides of your ID to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Verification
'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  ArrowLeft,
  Camera,
  Check,
  CircleUserRound,
  Eye,
  EyeOff,
  LockKeyhole,
  X,
} from 'lucide-react'
import { initialAccount } from '@/data/accountInfo'
import type { AccountInfo } from '@/data/accountInfo'

const inputBase =
  'mt-1.5 w-full bg-surface rounded-xl px-3 py-2.5 text-sm font-semibold text-body border outline-none transition-colors focus:bg-card focus:ring-2'

const inputClass = (invalid: boolean) =>
  `${inputBase} ${
    invalid
      ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
      : 'border-transparent focus:border-brand focus:ring-brand-tint'
  }`

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FieldErrors = Partial<Record<keyof AccountInfo, string>>

function Field({
  label,
  children,
  error,
}: {
  label: string
  children: React.ReactNode
  error?: string
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-muted">{label}</span>
      {children}
      {error ? (
        <span className="mt-1 block text-xs font-semibold text-red-500">{error}</span>
      ) : null}
    </label>
  )
}

function getInitials(name: string): string {
  return (
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('') || 'CM'
  )
}

function validateField(key: keyof AccountInfo, value: string): string | undefined {
  switch (key) {
    case 'displayName':
    case 'fullName':
    case 'emergencyContactName':
      return value.trim() ? undefined : 'This field is required.'
    case 'email':
      if (!value.trim()) return 'Email is required.'
      return EMAIL_RE.test(value.trim()) ? undefined : 'Enter a valid email address.'
    case 'contactNumber':
    case 'emergencyContactNumber':
      return value.replace(/\D/g, '').length >= 10
        ? undefined
        : 'Enter a valid contact number.'
    case 'password':
      return value ? undefined : 'Password is required.'
    default:
      return undefined
  }
}

export default function AccountManagement() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState<AccountInfo>(initialAccount)
  const [saved, setSaved] = useState<AccountInfo>(initialAccount)
  const [photo, setPhoto] = useState<string | null>(null)
  const [savedPhoto, setSavedPhoto] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})

  const set = (key: keyof AccountInfo, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const blur = (key: keyof AccountInfo) => () => {
    setErrors((prev) => ({ ...prev, [key]: validateField(key, form[key]) }))
  }

  const goBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/settings')
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    const nextErrors: FieldErrors = {}
    for (const key of Object.keys(form) as (keyof AccountInfo)[]) {
      const message = validateField(key, form[key])
      if (message) nextErrors[key] = message
    }
    setErrors(nextErrors)

    if (Object.values(nextErrors).some(Boolean)) {
      toast.error('Please fix the highlighted fields.')
      return
    }

    setSaved(form)
    setSavedPhoto(photo)
    toast.success('Account information updated successfully.')
  }

  const handleCancel = () => {
    setForm(saved)
    setPhoto(savedPhoto)
    setShowPassword(false)
    setErrors({})
    toast('Changes discarded')
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

        <h1 className="text-xl font-bold text-brand">Account Settings</h1>

        <span className="w-9" aria-hidden="true" />
      </header>

      <main className="px-4 pt-4 flex flex-col gap-5 pb-32">
        <form onSubmit={handleSave} className="flex flex-col gap-5">
          <section
            aria-label="Profile summary"
            className="bg-card rounded-3xl shadow-card p-6 flex flex-col items-center text-center"
          >
            <div className="relative">
              {photo ? (
                <img
                  src={photo}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover ring-2 ring-brand-tint"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-brand-tint text-brand flex items-center justify-center text-2xl font-bold">
                  {getInitials(form.fullName)}
                </div>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Change profile picture"
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-brand text-white border-2 border-white flex items-center justify-center shadow hover:bg-brand-dark transition-colors"
              >
                <Camera className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <p className="mt-3 text-xs font-bold text-muted tracking-widest">
              {form.patientNo}
            </p>
            <span className="mt-1.5 inline-flex bg-brand-tint text-brand text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Patient
            </span>
            <h2 className="mt-2 text-2xl font-bold text-brand leading-tight">{form.fullName}</h2>
          </section>

          <section aria-label="Account information" className="bg-card rounded-3xl shadow-card p-5">
            <h2 className="text-2xl font-bold text-brand mb-4 inline-flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-brand-tint text-brand flex items-center justify-center">
                <CircleUserRound className="w-5 h-5" aria-hidden="true" />
              </span>
              Account Information
            </h2>

            <div className="space-y-4">
              <Field label="Patient Number">
                <div className="relative">
                  <input
                    readOnly
                    value={form.patientNo}
                    aria-readonly="true"
                    className="mt-1.5 w-full bg-soft text-muted rounded-xl px-3 py-2.5 pr-9 text-sm font-semibold outline-none cursor-not-allowed"
                  />
                  <LockKeyhole
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
                    aria-hidden="true"
                  />
                </div>
              </Field>
              <Field label="Display Name" error={errors.displayName}>
                <input
                  className={inputClass(!!errors.displayName)}
                  value={form.displayName}
                  onChange={(e) => set('displayName', e.target.value)}
                  onBlur={blur('displayName')}
                />
              </Field>
              <Field label="Full Name" error={errors.fullName}>
                <input
                  className={inputClass(!!errors.fullName)}
                  value={form.fullName}
                  onChange={(e) => set('fullName', e.target.value)}
                  onBlur={blur('fullName')}
                />
              </Field>
              <Field label="Email Address" error={errors.email}>
                <input
                  type="email"
                  inputMode="email"
                  className={inputClass(!!errors.email)}
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  onBlur={blur('email')}
                />
              </Field>
              <Field label="Contact Number" error={errors.contactNumber}>
                <input
                  type="tel"
                  inputMode="tel"
                  className={inputClass(!!errors.contactNumber)}
                  value={form.contactNumber}
                  onChange={(e) => set('contactNumber', e.target.value)}
                  onBlur={blur('contactNumber')}
                />
              </Field>
              <Field label="Emergency Contact Name" error={errors.emergencyContactName}>
                <input
                  className={inputClass(!!errors.emergencyContactName)}
                  value={form.emergencyContactName}
                  onChange={(e) => set('emergencyContactName', e.target.value)}
                  onBlur={blur('emergencyContactName')}
                />
              </Field>
              <Field label="Emergency Contact Number" error={errors.emergencyContactNumber}>
                <input
                  type="tel"
                  inputMode="tel"
                  className={inputClass(!!errors.emergencyContactNumber)}
                  value={form.emergencyContactNumber}
                  onChange={(e) => set('emergencyContactNumber', e.target.value)}
                  onBlur={blur('emergencyContactNumber')}
                />
              </Field>
              <Field label="Password" error={errors.password}>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`${inputClass(!!errors.password)} pr-10`}
                    value={form.password}
                    onChange={(e) => set('password', e.target.value)}
                    onBlur={blur('password')}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-muted hover:text-brand transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Eye className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </Field>
            </div>
          </section>

          <div className="bg-card rounded-3xl shadow-card p-5">
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium text-sm transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <X className="w-4 h-4" aria-hidden="true" />
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold text-sm transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" aria-hidden="true" />
                Save
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  )
}

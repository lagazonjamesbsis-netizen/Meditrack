'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { signupUser } from '@/lib/actions/user'
import { readOnboardingDraft, writeOnboardingDraft } from '@/lib/onboarding'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

export default function FormSignup({ className }: { className?: string }) {
  // Hooks
  const { push: redirect } = useRouter()

  //
  const formRef = useRef<HTMLFormElement>(null)

  // States
  const [state, handleSubmit, pending] = useActionState(signupUser, {})

  // Restore previously saved values when the user steps back from the
  // Residence Details step — mistakes get corrected, context is kept.
  const draft = readOnboardingDraft()
  const [name, setName] = useState(draft.name ?? '')
  const [email, setEmail] = useState(draft.email ?? '')
  const [password, setPassword] = useState(draft.password ?? '')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (state?.success && formRef.current) {
      // Use the controlled state — accurate even if the browser filled the DOM.
      const nextName = name.trim()
      const nextEmail = email.trim()
      const nextPassword = password.trim()

      // Stash the onboarding draft ONLY — the account itself is not created
      // here. It is persisted after the final Verification step.
      writeOnboardingDraft({ name: nextName, email: nextEmail, password: nextPassword })

      // Use delay 1000 to show the form message before stepping to the
      // Residence Details step of the onboarding flow.
      setTimeout(() => {
        redirect('/residence-details')
      }, 1000)
    }
  }, [state])

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      noValidate
      className={`flex flex-col gap-5 ${className}`}
    >
      <div className="form-control">
        <label>Full name</label>
        <input
          required
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Thomas"
          className={`input w-full`}
        />
        {state?.errors?.name && <p className="error">{state?.errors?.name}</p>}
      </div>

      <div className="form-control">
        <label>Email address</label>
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="johnthomas@email.com"
          className={`input w-full`}
        />
        {state?.errors?.email && (
          <p className="error">{state?.errors?.email}</p>
        )}
      </div>
      <div className="form-control">
        <label>Password</label>
        <div className="relative">
          <input
            required
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className={`input w-full pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {state?.errors?.password && (
          <p className="error">{state?.errors?.password}</p>
        )}
      </div>
      <div>
        {state?.message && (
          <div
            className={`alert ${
              state.success ? `alert--success` : `alert--danger`
            }`}
          >
            {state?.message}
          </div>
        )}
        <button type="submit" className="button button--accent w-full justify-center my-3" disabled={pending}>
          {pending ? 'Please wait...' : 'Signup'}
        </button>
      </div>
    </form>
  )
}
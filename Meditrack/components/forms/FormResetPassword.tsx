'use client'

import { useRef, useActionState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { resetPassword } from '@/lib/actions/util'

function FormResetPasswordInner({ className }: { className: string }) {
  // Params
  const searchParams = useSearchParams()

  // Refs
  const formRef = useRef<HTMLFormElement>(null)

  // State — read the URL query once (params never change).
  const email = searchParams.get('email') ?? ''
  const token = searchParams.get('token') ?? ''

  const [state, handleSubmit, isPending] = useActionState(resetPassword, {
    success: false,
    message: null,
  })

  //if no token and email return:
  if (!email && !token) {
    return (
      <div className="boreder-black m-auto w-full max-w-lg space-y-14">
        <div className="space-y-6">
          <h1 className="text-left text-3xl font-bold">
            Reset password invalid link!
          </h1>
          <p className="text-muted-foreground text-left">
            Please check your email for the reset password link.
          </p>
        </div>
        <Link href="/login" className="button button--secondary">
          Go back to Homepage
        </Link>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      noValidate
      data-loading={isPending}
      className={`flex flex-col gap-5 ${className}`}
    >
      <div className="w-full form-control">
        <label className="auth-label" htmlFor="email">
          Email*
        </label>
        <input
          required
          className="auth-input w-full border-gray-400 text-gray-400"
          type="email"
          name="email"
          value={email}
          readOnly
        />
      </div>

      <div className="w-full form-control">
        <span className="flex flex-row justify-between">
          <label className="auth-label" htmlFor="password">
            Password*{' '}
          </label>
        </span>
        <input
          required
          className="auth-input w-full border-black"
          name="password"
          type="password"
          placeholder="********"
        />
      </div>

      <div className="w-full form-control">
        <span className="flex flex-row justify-between">
          <label className="auth-label" htmlFor="confirmpassword">
            Confirm Password*{' '}
          </label>
        </span>
        <input
          required
          className="auth-input w-full border-black"
          name="confirmPassword"
          type="password"
          placeholder="********"
        />
      </div>

      {/* Alert */}
      {state?.message && (
        <div
          className={`alert ${
            state.success ? 'alert--success' : 'alert--danger'
          }`}
        >
          {state.message}
        </div>
      )}

      {/** Hiddens */}
      <input type="hidden" name="token" value={token} />

      <div>
        <button
          type="submit"
          className="button button--accent w-full justify-center disabled:animate-pulse disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? 'Please wait...' : 'Reset Password'}
        </button>
      </div>
    </form>
  )
}

export default function FormResetPassword({ className }: { className: string }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormResetPasswordInner className={className} />
    </Suspense>
  )
}

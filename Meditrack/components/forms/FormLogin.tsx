'use client'

import { useState, useRef } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

export default function FormLogin({ className }: { className?: string }) {
  // Refs
  const formRef = useRef<HTMLFormElement>(null)

  // Hooks
  const router = useRouter()
  const { push: redirect } = router

  // State
  const [state, setState] = useState({
    message: '',
    success: false,
    errors: {
      email: '',
      password: '',
    },
  })
  const [pending, setPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setPending(true)

    const formData = new FormData(formRef.current)
    const email = formData.get('email')?.toString().trim()
    const password = formData.get('password')?.toString().trim()

    if (!email || !password) {
      setState({
        message: null,
        success: false,
        errors: {
          email: !email ? 'Email is required.' : '',
          password: !password ? 'Password is required.' : '',
        },
      })
      setPending(false)
      return
    }

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      // console.log('res: ', res)

      if (res?.ok === true) {
        setState({
          message: 'Logged in successfully',
          success: true,
          errors: {
            email: '',
            password: '',
          },
        })

        // Wait 1 second before redirecting
        setTimeout(() => {
          redirect('/dashboard')
        }, 1000)

        //
      } else {
        setState({
          message: 'Failed to login',
          success: false,
          errors: {
            email: '',
            password: '',
          },
        })
      }

      setPending(false)
    } catch (error) {
      console.log('error: ', error)

      setState({
        message: 'Failed to login',
        success: false,
        errors: {
          email: '',
          password: '',
        },
      })
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className={`${className} flex flex-col gap-5`}
    >
      {state?.message && (
        <p
          className={`alert ${
            state.success ? `alert--success` : `alert--danger`
          }`}
        >
          {state?.message}
        </p>
      )}

      <div className="form-control">
        <label>Email address</label>
        <input
          required
          type="email"
          name="email"
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
        <button
          type="submit"
          className="button button--accent w-full justify-center disabled:animate-pulse disabled:opacity-50"
          disabled={pending}
        >
          {pending ? 'Please wait...' : 'Login'}
        </button>
      </div>
    </form>
  )
}

'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import AuthShell from '@/components/auth/AuthShell'
import { useSignup } from '@/store/useSignup'

const OTP_LENGTH = 6

const Verification = () => {
  const countryCode = useSignup((state) => state.countryCode)
  const mobile = useSignup((state) => state.mobile)

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [resent, setResent] = useState(false)
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  const maskedMobile =
    mobile.length > 3
      ? `${mobile.slice(0, 1)}••• ${mobile.slice(-3)}`
      : '9••• ••• ••••'

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const next = [...otp]
    next[index] = digit
    setOtp(next)

    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  return (
    <AuthShell
      step={5}
      animate={false}
      title="Verify your phone"
      cardClassName="lg:max-w-2xl"
      subtitle={`We sent a 6-digit code to ${countryCode} ${maskedMobile}.`}
      backHref="/identification"
      footer={
        resent ? (
          <>New code sent. Check your phone.</>
        ) : (
          <>
            Didn&apos;t receive the code?{' '}
            <button
              type="button"
              className="auth-link bg-transparent p-0 cursor-pointer"
              onClick={() => setResent(true)}
            >
              Resend
            </button>
          </>
        )
      }
    >
      <div className="flex justify-between gap-1.5 sm:gap-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            aria-label={`Digit ${index + 1}`}
            className="w-full max-w-[56px] min-w-0 h-[50px] sm:h-[56px] bg-white border border-line rounded-lg text-center font-bebas text-[24px] sm:text-[28px] text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-colors duration-200"
          />
        ))}
      </div>

      <Link href="/done" className="btn btn--primary mt-8">
        Verify code
      </Link>
    </AuthShell>
  )
}

export default Verification

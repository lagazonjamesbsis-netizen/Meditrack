import Link from 'next/link'
import AuthShell from '@/components/auth/AuthShell'

const Done = () => {
  return (
    <AuthShell
      title="All set"
      subtitle="Your account is ready. Log in to start tracking your health."
    >
      <div className="flex flex-col items-center gap-5 border-t border-line pt-8">
        <div className="relative w-16 h-16 rounded-full bg-mist flex items-center justify-center">
          <span className="absolute inset-0 rounded-full border-2 border-brand/30 border-t-brand animate-spin" />
          <svg
            className="relative"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>

        <div className="w-full flex flex-col items-center gap-2.5 rounded-2xl border border-line bg-mist/40 px-5 py-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-[11px] font-bold uppercase tracking-[0.1em]">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 6v6l4 2" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            Pending approval
          </span>
          <p className="text-[13.5px] leading-relaxed text-ink m-0">
            Your account is waiting for approval. We&apos;ll send you a
            notification once it&apos;s approved — please wait and check your
            notifications regularly.
          </p>
        </div>

        <Link href="/login" className="btn btn--primary">
          Back to log in
        </Link>
      </div>
    </AuthShell>
  )
}

export default Done

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  ArrowLeft,
  ChevronDown,
  HeartHandshake,
  MessageCircleHeart,
  Send,
  Star,
  X,
} from 'lucide-react'

const feedbackTypes = ['Suggestion', 'Complaint', 'Compliment', 'Technical Issue', 'Other']

const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent']

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-muted">{label}</span>
      {children}
    </label>
  )
}

const inputClass =
  'mt-1.5 w-full bg-surface rounded-xl px-3 py-2.5 text-sm font-semibold text-body border border-transparent outline-none transition-colors placeholder:font-medium placeholder:text-muted/70 focus:bg-card focus:border-brand focus:ring-2 focus:ring-brand-tint'

export default function FeedbackPage() {
  const router = useRouter()
  const [type, setType] = useState(feedbackTypes[0])
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const goBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/settings')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject.trim() || !message.trim()) {
      toast.error('Please provide a subject and message.')
      return
    }
    setSubmitted(true)
  }

  const handleCancel = () => {
    setType(feedbackTypes[0])
    setSubject('')
    setMessage('')
    setRating(0)
    setHovered(0)
    toast('Feedback discarded')
  }

  const resetForm = () => {
    setSubmitted(false)
    setType(feedbackTypes[0])
    setSubject('')
    setMessage('')
    setRating(0)
    setHovered(0)
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

        <h1 className="text-xl font-bold text-brand">Feedback</h1>

        <span className="w-9" aria-hidden="true" />
      </header>

      <main className="px-4 pt-4 flex flex-col gap-5 pb-32">
        <section aria-label="Feedback welcome" className="bg-card rounded-3xl shadow-card p-5">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 shrink-0 rounded-2xl bg-brand-tint text-brand flex items-center justify-center">
              <MessageCircleHeart className="w-6 h-6" aria-hidden="true" />
            </span>
            <h2 className="text-2xl font-bold text-brand leading-tight">
              We Value Your Feedback
            </h2>
          </div>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            Help us improve MediTrack and healthcare services by sharing your thoughts and
            suggestions.
          </p>
        </section>

        {submitted ? (
          <section
            aria-label="Feedback received"
            className="bg-card rounded-3xl shadow-card p-6 flex flex-col items-center text-center"
          >
            <span className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <HeartHandshake className="w-8 h-8" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-2xl font-bold text-brand leading-tight">
              Thank you for your feedback.
            </h2>
            <p className="mt-2 text-sm text-muted leading-relaxed max-w-[260px]">
              Your input helps us improve MediTrack and healthcare services.
            </p>
            <button
              type="button"
              onClick={resetForm}
              className="mt-5 text-sm font-semibold text-brand hover:bg-brand-tint px-4 py-2 rounded-full transition-colors"
            >
              Submit Another Feedback
            </button>
          </section>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <section
              aria-label="Feedback form"
              className="bg-card rounded-3xl shadow-card p-5"
            >
              <div className="space-y-4">
                <Field label="Feedback Type">
                  <div className="relative">
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className={`${inputClass} appearance-none pr-9 cursor-pointer`}
                    >
                      {feedbackTypes.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
                      aria-hidden="true"
                    />
                  </div>
                </Field>

                <Field label="Subject">
                  <input
                    className={inputClass}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Short summary of your feedback"
                  />
                </Field>

                <Field label="Message">
                  <textarea
                    className={`${inputClass} min-h-36 leading-relaxed resize-none`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your experience..."
                  />
                </Field>
              </div>

              <div className="mt-5 flex flex-col items-center text-center bg-transparent">
                <span className="text-xs font-bold uppercase tracking-widest text-muted">
                  Rate Your Experience
                </span>
                <div
                  className="mt-2.5 flex items-center gap-2"
                  role="radiogroup"
                  aria-label="Rate your experience"
                >
                  {[1, 2, 3, 4, 5].map((value) => {
                    const activeCount = hovered > 0 ? hovered : rating
                    const isActive = value <= activeCount
                    return (
                      <button
                        key={value}
                        type="button"
                        role="radio"
                        aria-checked={rating >= value}
                        aria-label={`${value} star${value > 1 ? 's' : ''}`}
                        onClick={() => setRating(value)}
                        onMouseEnter={() => setHovered(value)}
                        onMouseLeave={() => setHovered(0)}
                        onFocus={() => setHovered(value)}
                        onBlur={() => setHovered(0)}
                        className="bg-transparent p-1 -m-1 transition-transform duration-200 hover:scale-110 active:scale-90"
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            isActive
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-muted hover:text-amber-400'
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    )
                  })}
                </div>
                <span className="mt-2.5 block text-xs font-semibold text-muted">
                  {hovered > 0 ? (
                    <span className="text-brand">{ratingLabels[hovered]}</span>
                  ) : rating > 0 ? (
                    <span className="text-brand">{ratingLabels[rating]}</span>
                  ) : (
                    'Tap a star to rate'
                  )}
                </span>
              </div>

              <div className="mt-5 flex flex-col gap-2.5">
                <button
                  type="submit"
                  className="w-full bg-brand hover:bg-brand-dark text-white py-3.5 rounded-xl font-semibold text-sm transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  Submit Feedback
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 py-3 rounded-xl font-medium text-sm transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                  Cancel
                </button>
              </div>
            </section>
          </form>
        )}
      </main>
    </>
  )
}
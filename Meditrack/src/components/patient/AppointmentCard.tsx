import { CalendarDays, Check, Clock, X } from 'lucide-react'

export default function AppointmentCard() {
  return (
    <div className="border border-line rounded-2xl p-4 bg-card">
      <div className="flex gap-3 items-center">
        <div
          aria-hidden="true"
          className="w-12 h-12 rounded-full bg-brand-tint text-brand font-bold flex items-center justify-center"
        >
          MR
        </div>
        <div>
          <h3 className="font-bold text-body">Ms. Marian Rivera</h3>
          <p className="text-sm text-muted">Nurse</p>
        </div>
      </div>

      <div className="flex justify-between mt-4 text-sm text-muted">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="w-4 h-4 text-brand" />
          March 30, 2026
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-brand" />
          2:00 PM - 3:00 PM
        </span>
      </div>

      <div className="flex gap-2.5 mt-5">
        <button
          type="button"
          className="flex-1 bg-brand hover:bg-brand-dark text-white py-2.5 rounded-xl font-medium text-sm transition-colors inline-flex items-center justify-center gap-1.5"
        >
          <Check className="w-4 h-4" />
          Confirm Visit
        </button>
        <button
          type="button"
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-medium text-sm transition-colors inline-flex items-center justify-center gap-1.5"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </div>
  )
}

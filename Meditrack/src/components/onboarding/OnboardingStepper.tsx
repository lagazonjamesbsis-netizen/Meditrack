import { Fragment } from 'react'

const steps = [
  { key: 'residence', label: 'Residence' },
  { key: 'verification', label: 'Verification' },
  { key: 'done', label: 'Done' },
]

// Unified 3-step indicator for the registration journey (1-indexed active step).
export default function OnboardingStepper({ active }: { active: number }) {
  return (
    <div className="w-[92%] max-w-md mb-6">
      <div className="flex bg-white rounded-2xl p-3 shadow-md items-center justify-between">
        {steps.map((step, i) => {
          const isDone = i < active
          const isActive = i === active

          const circleClass = isDone
            ? 'bg-green-500 text-white'
            : isActive
              ? 'bg-[#0F588B] text-white'
              : 'bg-gray-200 text-gray-500'

          return (
            <Fragment key={step.key}>
              {i > 0 && (
                <span
                  className={`flex-1 h-px mx-2 ${i <= active ? 'bg-green-500' : 'bg-gray-300'}`}
                  aria-hidden="true"
                />
              )}

              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${circleClass}`}
                >
                  {isDone ? '✓' : String(i + 1)}
                </div>
                <span
                  className={`text-xs mt-1 ${
                    isActive ? 'font-semibold text-slate-800' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
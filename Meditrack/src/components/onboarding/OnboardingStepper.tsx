const steps = [
  { key: 'residence-details', label: 'Residence Details' },
  { key: 'verification', label: 'Verification' },
  { key: 'done', label: 'Done' },
]

// Unified 3-step indicator for the registration journey (1-indexed active step).
// Connector segments are absolutely positioned at the vertical center of the
// circles (top-8 = circle center), so the whole strip reads as one flow.
export default function OnboardingStepper({ active }: { active: number }) {
  return (
    <div className="w-[92%] max-w-md mb-6">
      <div className="relative flex bg-white rounded-2xl px-6 py-4 shadow-md">
        {/* Connector segments — inset from every circle edge (4px clearance)
            using content-box math: circle 1 center = 16.6667% + 16px, circle
            2 center = 50%, circle 3 center = 83.3333% - 16px */}
        <span
          className={`absolute top-8 left-[calc(16.6667%_+_36px)] w-[calc(33.3333%_-_56px)] h-0.5 rounded-full ${
            active >= 1 ? 'bg-green-500' : 'bg-gray-300'
          }`}
          aria-hidden="true"
        />
        <span
          className={`absolute top-8 left-[calc(50%_+_20px)] w-[calc(33.3333%_-_56px)] h-0.5 rounded-full ${
            active >= 2 ? 'bg-green-500' : 'bg-gray-300'
          }`}
          aria-hidden="true"
        />

        {steps.map((step, i) => {
          const isDone = i < active
          const isActive = i === active

          const circleClass = isDone
            ? 'bg-green-500 text-white'
            : isActive
              ? 'bg-[#0F588B] text-white'
              : 'bg-gray-200 text-gray-500'

          return (
            <div
              key={step.key}
              className="relative z-10 flex-1 flex flex-col items-center gap-1.5 text-center"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${circleClass}`}
              >
                {isDone ? '✓' : String(i + 1)}
              </div>
              <span
                className={`text-xs ${
                  isActive
                    ? 'font-semibold text-slate-900'
                    : 'font-medium text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

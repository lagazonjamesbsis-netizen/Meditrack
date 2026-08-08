// MediTrack brand header — identical to the one used on the Login and Signup
// screens, so every onboarding step feels like the same journey.
export default function OnboardingBrand() {
  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center pt-4 pb-1 mb-6 md:pt-5 md:pb-1.5 lg:py-0 lg:mb-0">
      <div className="flex items-center justify-center">
        <img src="/logo.png" alt="MediTrack Logo" className="w-19 md:w-38 lg:w-38 -mr-1" />

        <div className="flex flex-col items-start text-left mr-2 md:mr-6 lg:mr-10">
          <h1
            className="text-[3.75rem] font-bold text-[#0F588B] leading-none"
            style={{ fontFamily: 'Bebas Neue' }}
          >
            MEDITRACK
          </h1>

          <p
            className="text-[1.125rem] text-[#0F588B] tracking-[0.18em] mt-0 leading-none whitespace-nowrap"
            style={{ fontFamily: 'Asap Condensed' }}
          >
            Stay On Track With Us
          </p>
        </div>
      </div>
    </div>
  )
}
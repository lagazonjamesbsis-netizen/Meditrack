import MediTrackBrand from '@/components/globals/MediTrackBrand'

// MediTrack brand for onboarding steps — identical to the one on the Login
// and Signup screens, so every step of the journey feels the same.
export default function OnboardingBrand() {
  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center pt-4 pb-1 mb-6 md:pt-5 md:pb-1 lg:py-0 lg:mb-0">
      <MediTrackBrand />
    </div>
  )
}
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import PatientBottomNavigation from '@/components/patient/PatientBottomNavigation'
import FeedbackPage from '@/components/patient/FeedbackPage'

export const metadata: Metadata = {
  title: 'Feedback',
  description: 'Share your thoughts and suggestions with MediTrack',
}

export default async function FeedbackRoute() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/login')

  return (
    <>
      <section
        className="min-h-dvh bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/purplebackground.png')" }}
      >
        <div className="max-w-md mx-auto">
          <FeedbackPage />
        </div>
      </section>

      <PatientBottomNavigation />
    </>
  )
}
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import PatientBottomNavigation from '@/components/patient/PatientBottomNavigation'
import TermsPage from '@/components/patient/TermsPage'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'MediTrack platform guidelines, user responsibilities, and healthcare information',
}

export default async function TermsRoute() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/login')

  return (
    <>
      <section
        className="min-h-dvh bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/purplebackground.png')" }}
      >
        <div className="max-w-md mx-auto">
          <TermsPage />
        </div>
      </section>

      <PatientBottomNavigation />
    </>
  )
}
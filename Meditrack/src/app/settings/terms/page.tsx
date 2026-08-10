import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import PatientBottomNavigation from '@/components/patient/PatientBottomNavigation'
import PatientSidebar from '@/components/patient/PatientSidebar'
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
        className="min-h-dvh bg-cover bg-center bg-no-repeat lg:ml-64"
        style={{ backgroundImage: "url('/purplebackground.png')" }}
      >
        <div className="max-w-md mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
          <TermsPage />
        </div>
      </section>

      <PatientSidebar />
      <PatientBottomNavigation />
    </>
  )
}
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import PatientBottomNavigation from '@/components/patient/PatientBottomNavigation'
import PatientSidebar from '@/components/patient/PatientSidebar'
import DisplaySettings from '@/components/patient/DisplaySettings'

export const metadata: Metadata = {
  title: 'Display Settings',
  description: 'MediTrack appearance and accessibility preferences',
}

export default async function DisplaySettingsRoute() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/login')

  return (
    <>
      <section
        className="min-h-dvh bg-cover bg-center bg-no-repeat lg:ml-64"
        style={{ backgroundImage: "url('/purplebackground.png')" }}
      >
        <div className="max-w-md mx-auto md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
          <DisplaySettings />
        </div>
      </section>

      <PatientSidebar />
      <PatientBottomNavigation />
    </>
  )
}
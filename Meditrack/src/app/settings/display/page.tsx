import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import PatientBottomNavigation from '@/components/patient/PatientBottomNavigation'
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
        className="min-h-dvh bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/purplebackground.png')" }}
      >
        <div className="max-w-md mx-auto">
          <DisplaySettings />
        </div>
      </section>

      <PatientBottomNavigation />
    </>
  )
}
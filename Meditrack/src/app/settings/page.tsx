import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import PatientBottomNavigation from '@/components/patient/PatientBottomNavigation'
import SettingsPage from '@/components/patient/SettingsPage'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'MediTrack account and app settings',
}

export default async function SettingsRoute() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/login')

  return (
    <>
      <section
        className="min-h-dvh bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/purplebackground.png')" }}
      >
        <div className="max-w-md mx-auto">
          <SettingsPage />
        </div>
      </section>

      <PatientBottomNavigation />
    </>
  )
}

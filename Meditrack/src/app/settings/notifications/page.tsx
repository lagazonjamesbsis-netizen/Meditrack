import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import PatientBottomNavigation from '@/components/patient/PatientBottomNavigation'
import NotificationSettings from '@/components/patient/NotificationSettings'

export const metadata: Metadata = {
  title: 'Notification Settings',
  description: 'MediTrack notification preferences',
}

export default async function NotificationSettingsRoute() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/login')

  return (
    <>
      <section
        className="min-h-dvh bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/purplebackground.png')" }}
      >
        <div className="max-w-md mx-auto">
          <NotificationSettings />
        </div>
      </section>

      <PatientBottomNavigation />
    </>
  )
}

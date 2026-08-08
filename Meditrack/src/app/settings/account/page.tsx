import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import PatientBottomNavigation from '@/components/patient/PatientBottomNavigation'
import AccountManagement from '@/components/patient/AccountManagement'

export const metadata: Metadata = {
  title: 'Account Settings',
  description: 'MediTrack account management',
}

export default async function AccountSettingsRoute() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/login')

  return (
    <>
      <section
        className="min-h-dvh bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/purplebackground.png')" }}
      >
        <div className="max-w-md mx-auto">
          <AccountManagement />
        </div>
      </section>

      <PatientBottomNavigation />
    </>
  )
}

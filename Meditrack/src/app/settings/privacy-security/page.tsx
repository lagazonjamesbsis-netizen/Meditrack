import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import PatientBottomNavigation from '@/components/patient/PatientBottomNavigation'
import PrivacySecuritySettings from '@/components/patient/PrivacySecuritySettings'

export const metadata: Metadata = {
  title: 'Privacy and Security Settings',
  description: 'MediTrack privacy preferences and security controls',
}

export default async function PrivacySecurityRoute() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/login')

  return (
    <>
      <section
        className="min-h-dvh bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/purplebackground.png')" }}
      >
        <div className="max-w-md mx-auto">
          <PrivacySecuritySettings />
        </div>
      </section>

      <PatientBottomNavigation />
    </>
  )
}
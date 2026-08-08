import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import PatientBottomNavigation from '@/components/patient/PatientBottomNavigation'
import HelpSupportPage from '@/components/patient/HelpSupportPage'

export const metadata: Metadata = {
  title: 'Help & Support',
  description: 'MediTrack self-service help center and frequently asked questions',
}

export default async function HelpSupportRoute() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/login')

  return (
    <>
      <section
        className="min-h-dvh bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/purplebackground.png')" }}
      >
        <div className="max-w-md mx-auto">
          <HelpSupportPage />
        </div>
      </section>

      <PatientBottomNavigation />
    </>
  )
}
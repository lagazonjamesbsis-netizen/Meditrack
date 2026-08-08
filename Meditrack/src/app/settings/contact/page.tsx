import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import PatientBottomNavigation from '@/components/patient/PatientBottomNavigation'
import ContactPage from '@/components/patient/ContactPage'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'MediTrack support and health center contact information',
}

export default async function ContactRoute() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/login')

  return (
    <>
      <section
        className="min-h-dvh bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/purplebackground.png')" }}
      >
        <div className="max-w-md mx-auto">
          <ContactPage />
        </div>
      </section>

      <PatientBottomNavigation />
    </>
  )
}
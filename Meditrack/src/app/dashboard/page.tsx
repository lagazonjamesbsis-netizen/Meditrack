import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import { getAccountAccess } from '@/lib/actions/guard'
import PatientHeader from '@/components/patient/Header'
import WelcomeCard from '@/components/patient/WelcomeCard'
import AppointmentCard from '@/components/patient/AppointmentCard'
import EventCard from '@/components/patient/EventCard'
import ServicesSection from '@/components/patient/ServicesSection'
import StaffList from '@/components/patient/StaffList'
import ApprovalBanner from '@/components/patient/ApprovalBanner'
import AccountStatusScreen from '@/components/patient/AccountStatusScreen'
import PatientBottomNavigation from '@/components/patient/PatientBottomNavigation'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'MediTrack patient dashboard',
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/login')

  // Account approval gate: PENDING users see their status + allowed features;
  // REJECTED users see the verification-failed screen.
  const access = await getAccountAccess()
  if (!access) redirect('/login')

  const isRejected = access.status === 'REJECTED'

  return (
    <>
      <section
        className="min-h-dvh bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/purplebackground.png')" }}
      >
        <div className="max-w-md mx-auto pb-32">
          <PatientHeader />

          <main className="px-4 pt-4 flex flex-col gap-5">
            {isRejected ? (
              <AccountStatusScreen status={access.status} showSignOut />
            ) : (
              <>
                {!access.approved && <ApprovalBanner />}
                <WelcomeCard name={session.user.name ?? 'there'} />
                {access.approved && <AppointmentCard />}
                <EventCard />
                {access.approved && <ServicesSection />}
                <StaffList />
              </>
            )}
          </main>
        </div>
      </section>

      {!isRejected && <PatientBottomNavigation />}
    </>
  )
}

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { authOptions } from '@/lib/authOptions'
import MediTrackShell from '@/components/globals/MediTrackShell'
import Homepage from '@/components/dashboard/Homepage'

export const metadata: Metadata = {
  title: 'Homepage | Meditrack',
}

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect('/login')

  return (
    <MediTrackShell>
      <Homepage />
    </MediTrackShell>
  )
}

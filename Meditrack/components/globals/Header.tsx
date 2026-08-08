import Link from 'next/link'
import { connection } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import DrawerProfile from '@/components/globals/DrawerProfile'
import ButtonDrawer from '@/components/ui/ButtonDrawer'

export default async function Header() {
  // Marks this component as dynamic BEFORE next-auth touches node:crypto.
  // Required by the Next.js 16 prerender runtime check (next-prerender-runtime-random)
  // when this server component is rendered inside a statically-prefetched shell
  // (root loading.tsx fallback on /login, /signup, etc.).
  await connection()

  const session = await getServerSession(authOptions)

  return (
    <header className="bg-secondary sticky top-0 z-10">
      <div className="px-5 py-2 h-16 flex items-center justify-between">
        <div className="flex justify-between items-center gap-5 w-full">
          <div className="flex items-center gap-3">
            <ButtonDrawer />

            <h1 className="">
              <Link href="/">
                <img src="/logo.png" alt="MediTrack Logo" className="h-8" />
              </Link>
            </h1>
          </div>

          <div className="flex items-center gap-5">
{session ? (
               <DrawerProfile />
             ) : (
              <div className="flex items-center gap-3">
                <Link href="/signup" className="button button--accent">
                  Sign Up
                </Link>
                <Link href="/login" className="button button--secondary">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

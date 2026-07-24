'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { useAside } from '@/store/useAside'

export default function LogoAside() {
  // Store
  const toggleMinimize = useAside((state) => state.toggleMinimize)
  const minimize = useAside((state) => state.minimize)

  return (
    <div className={`font-bold py-2 h-16 flex items-center border-b border-secondary ${minimize ? 'justify-center px-2' : 'justify-between px-5 gap-1'}`}>
      {!minimize && (
        <Link href="/" className="truncate">
          <img src="/logo.png" alt="MediTrack Logo" className="h-8" />
        </Link>
      )}
      <button onClick={toggleMinimize} className="button button--circle">
        <Menu size={24} />
      </button>
    </div>
  )
}

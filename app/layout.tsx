import type { Metadata } from 'next'
import HydrationZustand from '@/templates/hydrationZustand'
import { Providers } from './providers'
import { Toaster } from 'sonner'
import './globals.css'

// Fonts are loaded via global CSS (Google Fonts) to avoid dev-time turbopack internal imports

export const metadata: Metadata = {
  title: 'Meditrack',
  description: 'MediTrack — Stay On Track With Us',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <Providers>
          <HydrationZustand>{children}</HydrationZustand>
          <Toaster richColors position="top-right" toastOptions={{ style: { fontSize: '16px', gap: '14px' } }} />
        </Providers>
      </body>
    </html>
  )
}

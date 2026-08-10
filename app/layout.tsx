import type { Metadata } from 'next'
import {
  Asap_Condensed,
  Bebas_Neue,
  Geist,
  Geist_Mono,
  Inter,
  Poppins,
  Roboto,
} from 'next/font/google'
import HydrationZustand from '@/templates/hydrationZustand'
import { Providers } from './providers'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '700'],
})

const bebas = Bebas_Neue({
  variable: '--font-bebas-neue',
  subsets: ['latin'],
  weight: '400',
})

const asap = Asap_Condensed({
  variable: '--font-asap-condensed',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '700'],
})

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

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
      <body
        className={`${inter.variable} ${bebas.variable} ${asap.variable} ${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${roboto.variable} antialiased`}
      >
        <Providers>
          <HydrationZustand>{children}</HydrationZustand>
          <Toaster richColors position="top-right" toastOptions={{ style: { fontSize: '16px', gap: '14px' } }} />
        </Providers>
      </body>
    </html>
  )
}

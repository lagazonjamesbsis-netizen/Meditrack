import type { Metadata } from 'next'
import { Bebas_Neue, Asap_Condensed, Geist, Geist_Mono } from 'next/font/google'
import HydrationZustand from '@/templates/hydrationZustand'
import { Providers } from './providers'
import { Toaster } from 'sonner'
import './globals.css'

const bebas = Bebas_Neue({
  variable: '--font-bebas-neue',
  subsets: ['latin'],
  weight: '400'
})

const asap = Asap_Condensed({
  variable: '--font-asap-condensed',
  subsets: ['latin'],
  weight: '400'
})


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'NEXT.js CRUD template with Zustand and NextAuth',
  description:
    'A template for building a CRUD application using NEXT.js, Zustand for state management, and NextAuth for authentication.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body  className={`${bebas.variable} ${asap.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <HydrationZustand>{children}</HydrationZustand>
          <Toaster richColors position="bottom-right" toastOptions={{ style: { fontSize: '16px' } }} />
        </Providers>
      </body>
    </html>
  )
}

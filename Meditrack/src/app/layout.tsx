import type { Metadata } from 'next'
import { Bebas_Neue, Asap_Condensed, Geist, Geist_Mono } from 'next/font/google'
import HydrationZustand from '@/templates/hydrationZustand'
import { Providers } from './providers'
import { Toaster } from 'sonner'
import ThemeApplier from '@/components/globals/ThemeApplier'
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
  title: 'MediTrack — Stay On Track With Us',
  description:
    'MediTrack — patient health services platform of Barangay Sumapang Matanda Health Center.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var p=JSON.parse(localStorage.getItem('meditrack-display')||'{}');var t=p.theme||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-font',p.font||'medium');}catch(e){}`,
          }}
        />
      </head>
      <body  className={`${bebas.variable} ${asap.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <HydrationZustand>{children}</HydrationZustand>
          <ThemeApplier />
          <Toaster richColors position="bottom-right" toastOptions={{ style: { fontSize: '16px' } }} />
        </Providers>
      </body>
    </html>
  )
}

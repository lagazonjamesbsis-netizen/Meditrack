'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  Ambulance,
  ArrowLeft,
  ChevronRight,
  Clock,
  Hospital,
  LifeBuoy,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { contactInfo } from '@/data/contact'

type MethodConfig = {
  key: string
  title: string
  description: string
  icon: LucideIcon
  href?: string
}

const methods: MethodConfig[] = [
  {
    key: 'call',
    title: 'Call Health Center',
    description: 'Speak directly with our healthcare staff.',
    icon: Phone,
    href: contactInfo.contactNumberHref,
  },
  {
    key: 'email',
    title: 'Email Support',
    description: 'Send us your concerns and questions.',
    icon: Mail,
    href: contactInfo.emailHref,
  },
  {
    key: 'location',
    title: 'View Health Center Location',
    description: 'Find our health center address and directions.',
    icon: MapPin,
  },
]

const healthCenterInfo = [
  { key: 'name', label: 'Health Center Name', value: contactInfo.healthCenterName },
  { key: 'address', label: 'Address', value: contactInfo.address },
  { key: 'hotline', label: 'Contact Number', value: contactInfo.contactNumber },
  { key: 'email', label: 'Email Address', value: contactInfo.email },
  { key: 'hours', label: 'Operating Hours', value: contactInfo.operatingHours },
]

export default function ContactPage() {
  const router = useRouter()

  const goBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/settings')
    }
  }

  const onMethodPress = (method: MethodConfig) => {
    if (method.key === 'location') {
      toast.info('Location details coming soon')
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-line px-4 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={goBack}
          aria-label="Go back"
          className="p-2 -ml-2 rounded-full text-brand hover:bg-brand-tint transition-colors"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
        </button>

        <h1 className="text-xl font-bold text-brand">Contact Us</h1>

        <span className="w-9" aria-hidden="true" />
      </header>

      <main className="px-4 pt-4 flex flex-col gap-5 pb-32">
        <section aria-label="Support" className="bg-card rounded-3xl shadow-card p-5">
          <div className="w-12 h-12 rounded-2xl bg-brand-tint text-brand flex items-center justify-center">
            <LifeBuoy className="w-6 h-6" aria-hidden="true" />
          </div>
          <h2 className="mt-3 text-2xl font-bold text-brand leading-tight">Need Help?</h2>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            Our healthcare team is ready to assist you with appointments, records, account
            concerns, and general healthcare inquiries.
          </p>
        </section>

        <section
          aria-label="Health center information"
          className="bg-card rounded-3xl shadow-card overflow-hidden"
        >
          <div className="p-5 pb-3">
            <h2 className="text-lg font-bold text-brand inline-flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-brand-tint text-brand flex items-center justify-center">
                <Hospital className="w-5 h-5" aria-hidden="true" />
              </span>
              Health Center Information
            </h2>
          </div>
          <div className="divide-y divide-line">
            {healthCenterInfo.map((item) => (
              <div key={item.key} className="flex items-start gap-3.5 px-4 py-3.5">
                <span className="w-9 h-9 shrink-0 rounded-xl bg-brand-tint text-brand flex items-center justify-center">
                  <InfoIcon type={item.key} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-wide text-muted">
                    {item.label}
                  </span>
                  <span className="block mt-0.5 text-sm font-semibold text-body leading-snug">
                    {item.value}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section aria-label="Contact methods" className="flex flex-col gap-3">
          {methods.map((method) =>
            method.href ? (
              <Link
                key={method.key}
                href={method.href}
                className="flex items-center gap-3.5 bg-card border border-line rounded-2xl p-4 transition-colors hover:bg-surface"
              >
                <span className="w-11 h-11 shrink-0 rounded-xl bg-brand-tint text-brand flex items-center justify-center">
                  <method.icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="flex-1 min-w-0 text-left">
                  <span className="block text-sm font-bold text-body">{method.title}</span>
                  <span className="block mt-0.5 text-xs text-muted leading-snug">
                    {method.description}
                  </span>
                </span>
                <ChevronRight className="w-4 h-4 shrink-0 text-faint" aria-hidden="true" />
              </Link>
            ) : (
              <button
                key={method.key}
                type="button"
                onClick={() => onMethodPress(method)}
                className="flex items-center gap-3.5 bg-card border border-line rounded-2xl p-4 text-left transition-colors hover:bg-surface"
              >
                <span className="w-11 h-11 shrink-0 rounded-xl bg-brand-tint text-brand flex items-center justify-center">
                  <method.icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-bold text-body">{method.title}</span>
                  <span className="block mt-0.5 text-xs text-muted leading-snug">
                    {method.description}
                  </span>
                </span>
                <ChevronRight className="w-4 h-4 shrink-0 text-faint" aria-hidden="true" />
              </button>
            )
          )}
        </section>

        <section
          aria-label="Emergency information"
          className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-3xl p-5 shadow-card"
        >
          <div className="flex items-start gap-3.5">
            <span className="w-11 h-11 shrink-0 rounded-2xl bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300 flex items-center justify-center">
              <Ambulance className="w-5 h-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-bold text-amber-800 dark:text-amber-300">Emergency Notice</h3>
              <p className="mt-1 text-sm text-amber-700/90 dark:text-amber-200/80 leading-relaxed">
                For urgent medical emergencies, immediately contact your local emergency
                services or nearest hospital.
              </p>
              <Link
                href={contactInfo.emergencyHotlineHref}
                className="mt-3 inline-flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                {contactInfo.emergencyHotline}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

function InfoIcon({ type }: { type: string }) {
  const icons: Record<string, LucideIcon> = {
    name: Hospital,
    address: MapPin,
    hotline: Phone,
    email: Mail,
    hours: Clock,
  }
  const Icon = icons[type] ?? MapPin
  return <Icon className="w-4 h-4" aria-hidden="true" />
}
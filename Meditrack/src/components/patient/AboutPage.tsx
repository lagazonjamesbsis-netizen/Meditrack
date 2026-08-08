'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

const developers = [
  'Catanghal, Mark Angelo',
  'Crisostomo, Mark Archie',
  'Lagazon, James R.',
  'Pagudpod, Wacky Angelo',
  'Roxas, Arghie Mark',
]

export default function AboutPage() {
  const router = useRouter()

  const goBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/settings')
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

        <h1 className="text-xl font-bold text-brand">About Us</h1>

        <span className="w-9" aria-hidden="true" />
      </header>

      <main className="px-4 pt-4 pb-40">
        <section aria-label="About PRAMIS" className="bg-card rounded-3xl shadow-card p-6">
          <p className="text-sm text-body leading-6">
            The Patient Records and Appointment Management Information System (PRAMIS) is
            designed to support and complement the existing national health information system.
            At Barangay Sumapang Matanda Health Center, the system focuses on managing daily
            appointments, organizing patient visits, and improving patient flow. By strengthening
            appointment management at the health unit level, patient information becomes more
            reliable, organized, and accessible.
          </p>

          <p className="mt-4 text-sm text-body leading-6">
            This system was developed to enhance how appointments are scheduled, managed, and
            monitored using digital tools. It aims to reduce patient waiting time, improve
            coordination, support healthcare staff in managing daily operations, and increase the
            overall efficiency of service delivery. By providing a dependable and structured
            appointment management solution, the system demonstrates how information technology
            can be applied to strengthen healthcare services while aligning with the Department
            of Health&apos;s existing information systems.
          </p>

          <p className="mt-4 text-sm text-body leading-6">
            This project is a capstone output developed by Bachelor of Science in Information
            Systems students:
          </p>

          <ul className="mt-4 flex flex-col gap-2">
            {developers.map((name) => (
              <li key={name} className="flex items-start gap-2 text-sm text-body leading-6">
                <span className="text-brand shrink-0" aria-hidden="true">
                  •
                </span>
                {name}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
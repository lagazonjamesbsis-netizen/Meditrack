'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { useDarkMode } from './DarkModeContext'

const todayPatients = [
  { name: 'RICHARDS, Alden P.', ptn: 'PTN-2610204', service: 'Basic Consultation', date: 'March 27, 2026 | Friday', time: '7:00am to 8:00am' },
  { name: 'CRUZ, Dodong C.', ptn: 'PTN-2610215', service: 'Basic Consultation', date: 'March 27, 2026 | Friday', time: '7:00am to 8:00am' },
  { name: 'SANTOS, Judith A.', ptn: 'PTN-2610205', service: 'Vaccination', date: 'March 27, 2026 | Friday', time: '7:00am to 8:00am' },
]

const upcomingPatients = [
  { name: 'Patient 1', ptn: 'PTN-0001001', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
  { name: 'Patient 2', ptn: 'PTN-0001002', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
  { name: 'Patient 3', ptn: 'PTN-0001003', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
  { name: 'Patient 4', ptn: 'PTN-0001004', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
  { name: 'Patient 5', ptn: 'PTN-0001005', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
  { name: 'Patient 6', ptn: 'PTN-0001006', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
]

const events = [
  { title: 'Anti-Rabies Vaccination', subtitle: 'March 29, 2026 | Sunday', time: '7:00am to 9:00am', icon: '💉' },
  { title: 'Blood Donation Program', subtitle: 'March 30, 2026 | Monday', time: '3:00pm to 5:00pm', icon: '🩸' },
  { title: 'Mental Health Screening', subtitle: 'March 31, 2026 | Tuesday', time: '3:00pm to 5:00pm', icon: '🧠' },
]

const services = [
  { title: 'Basic Consultation', subtitle: 'Monday to Friday', time: '8:00am - 5:00pm', icon: '👩‍⚕️' },
  { title: 'Disease Control & Prevention', subtitle: 'Wednesday to Friday', time: '8:00am - 5:00pm', icon: '🦠' },
  { title: 'Family Planning & Reproductive Health', subtitle: 'Thursday', time: '8:00am - 5:00pm', icon: '🧬' },
  { title: 'Immunization and Vaccination', subtitle: 'Wednesday to Friday', time: '8:00am - 5:00pm', icon: '💊' },
  { title: 'Maternal and Child Care', subtitle: 'Tuesday', time: '8:00am - 5:00pm', icon: '🤰' },
  { title: 'Dental Care', subtitle: 'Friday', time: '8:00am - 5:00pm', icon: '🦷' },
]

function PatientCard({ patient, notified, setNotified, darkMode }: {
  patient: typeof todayPatients[0]
  notified: Set<string>
  setNotified: React.Dispatch<React.SetStateAction<Set<string>>>
  darkMode: boolean
}) {
  return (
    <div className={`flex flex-col gap-[18px] ${darkMode ? 'bg-[#2d1b4e] border-[rgba(255,255,255,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' : 'bg-white border-[rgba(15,60,95,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'} p-[22px] rounded-[18px] border`}>
      <div className="flex gap-[18px] items-center">
        <div className="w-[72px] h-[72px] rounded-full bg-[#dedede] flex-shrink-0 flex items-center justify-center text-[28px]" />
        <div className="flex-1 min-w-0">
          <h3 className={`text-[24px] font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'} leading-[1] m-0 truncate`}>{patient.name}</h3>
          <p className={`mt-[6px] text-base font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'}`}>{patient.ptn}</p>
          <p className={`mt-[6px] text-[15px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#555]'}`}>{patient.service}</p>
        </div>
      </div>
      <div className={`flex flex-col gap-1.5 ${darkMode ? 'bg-[#0f1438]' : 'bg-[#f8fbff]'} px-4 py-[14px] rounded-xl border ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.08)]'} shadow-[0_2px_4px_rgba(0,0,0,0.04)] mt-[10px]`}>
        <span className={`flex items-center gap-2 text-[16px] font-semibold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[16px] h-[16px] flex-shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          {patient.date}
        </span>
        <span className={`flex items-center gap-2 text-[16px] font-semibold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[16px] h-[16px] flex-shrink-0"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
          {patient.time}
        </span>
      </div>
      <div className="flex justify-between gap-[18px]">
        <button className={`bg-transparent ${darkMode ? 'text-[#F9FAFB] border-white/30 hover:bg-white/10' : 'text-[#4E69D3] border-[#4E69D3] hover:bg-[#EEF0FB]'} px-4 py-2 rounded-md text-xs font-semibold cursor-pointer transition-colors`}>View Record</button>
        <button
          className={`px-5 py-2.5 rounded-md text-sm font-semibold border-none cursor-pointer transition-colors ${notified.has(patient.ptn) ? 'bg-green-600 text-white' : 'bg-[#4E69D3] text-white hover:bg-[#3D56B8]'}`}
          onClick={() => {
            setNotified(prev => new Set(prev).add(patient.ptn))
            toast.success('Patient notified successfully')
            setTimeout(() => setNotified(prev => { const next = new Set(prev); next.delete(patient.ptn); return next }), 3000)
          }}
        >
          {notified.has(patient.ptn) ? 'Sent!' : 'Notify'}
        </button>
      </div>
    </div>
  )
}

export default function Homepage() {
  const [notified, setNotified] = useState(new Set<string>())
  const { darkMode } = useDarkMode()

  return (
    <div>
      <h1 className={`text-[45px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'} my-[14px] text-left`}>Hello! Midwife Vivianne</h1>

      <div className="grid grid-cols-3 gap-[22px] mb-7 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
        <div className={`flex items-center gap-4 ${darkMode ? 'bg-[#2d1b4e] border-[rgba(255,255,255,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' : 'bg-white border-[rgba(15,60,95,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'} p-[22px] rounded-[18px] border`}>
          <div className={`w-14 h-14 rounded-xl ${darkMode ? 'bg-[#141a45]' : 'bg-[#E8EAF6]'} flex items-center justify-center flex-shrink-0`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#4E69D3" strokeWidth="2" className="w-7 h-7"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          </div>
          <div className="flex flex-col">
            <span className={`text-2xl font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{todayPatients.length}</span>
            <span className={`text-sm ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>Today's Schedule</span>
          </div>
        </div>
        <div className={`flex items-center gap-4 ${darkMode ? 'bg-[#2d1b4e] border-[rgba(255,255,255,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' : 'bg-white border-[rgba(15,60,95,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'} p-[22px] rounded-[18px] border`}>
          <div className={`w-14 h-14 rounded-xl ${darkMode ? 'bg-[#141a45]' : 'bg-[#E8EAF6]'} flex items-center justify-center flex-shrink-0`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#4E69D3" strokeWidth="2" className="w-7 h-7"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
          </div>
          <div className="flex flex-col">
            <span className={`text-2xl font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{upcomingPatients.length}</span>
            <span className={`text-sm ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>Upcoming Appointments</span>
          </div>
        </div>
        <div className={`flex items-center gap-4 ${darkMode ? 'bg-[#2d1b4e] border-[rgba(255,255,255,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' : 'bg-white border-[rgba(15,60,95,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'} p-[22px] rounded-[18px] border`}>
          <div className="w-14 h-14 rounded-xl bg-[#FEF3C7] flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1" className="w-7 h-7"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          </div>
          <div className="flex flex-col">
            <span className={`text-2xl font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>4.6 <span className="text-[#F59E0B] text-sm tracking-[1px]">★★★★★</span></span>
            <span className={`text-sm ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>Patient Feedback</span>
          </div>
        </div>
      </div>

      <Section title="Today's Schedule" darkMode={darkMode}>
        <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
          {todayPatients.map(p => <PatientCard key={p.ptn} patient={p} notified={notified} setNotified={setNotified} darkMode={darkMode} />)}
        </div>
      </Section>

      <Section title="Upcoming Appointments" darkMode={darkMode}>
        <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
          {upcomingPatients.map(p => <PatientCard key={p.ptn} patient={p} notified={notified} setNotified={setNotified} darkMode={darkMode} />)}
        </div>
        <div className="flex justify-center mt-3">
          <button className="bg-[#4E69D3] text-white px-5 py-2.5 rounded-full border-none cursor-pointer">View List of Appointees</button>
        </div>
      </Section>

      <Section title="Events" darkMode={darkMode}>
        <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
          {events.map((ev, i) => (
            <div key={i} className={`flex flex-col ${darkMode ? 'bg-[#2d1b4e] border-[rgba(255,255,255,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' : 'bg-white border-[rgba(15,60,95,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'} p-[22px] rounded-[18px] border`}>
              <div className="flex gap-4 items-start">
                <div className="text-2xl mt-1">{ev.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-[20px] font-bold leading-tight m-0 line-clamp-2 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'}`}>{ev.title}</h3>
                </div>
              </div>
              <div className={`flex flex-col gap-1 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'} mt-[16px] pt-[14px] border-t ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.08)]'}`}>
                <div className="flex items-center gap-2 text-[16px] font-semibold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[16px] h-[16px] flex-shrink-0"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  {ev.subtitle}
                </div>
                <div className="flex items-center gap-2 text-[16px] font-semibold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[16px] h-[16px] flex-shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  {ev.time}
                </div>
              </div>
              <button className={`ml-auto mt-[14px] bg-transparent ${darkMode ? 'text-[#F9FAFB] border-white/30 hover:bg-white/10' : 'text-[#4E69D3] border-[#4E69D3] hover:bg-[#EEF0FB]'} px-4 py-2 rounded-md text-xs font-semibold cursor-pointer transition-colors`}>Check Details</button>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Services" darkMode={darkMode}>
        <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
          {services.map((s, i) => (
            <div key={i} className={`flex flex-col ${darkMode ? 'bg-[#2d1b4e] border-[rgba(255,255,255,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' : 'bg-white border-[rgba(15,60,95,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'} p-[22px] rounded-[18px] border`}>
              <div className="flex gap-4 items-start">
                <div className="text-2xl mt-1">{s.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-[20px] font-bold leading-tight m-0 line-clamp-2 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'}`}>{s.title}</h3>
                </div>
              </div>
              <div className={`flex flex-col gap-1 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'} mt-[16px] pt-[14px] border-t ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.08)]'}`}>
                <div className="flex items-center gap-2 text-[16px] font-semibold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[16px] h-[16px] flex-shrink-0"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  {s.subtitle}
                </div>
                <div className="flex items-center gap-2 text-[16px] font-semibold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[16px] h-[16px] flex-shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  {s.time}
                </div>
              </div>
              <button className={`ml-auto mt-[14px] bg-transparent ${darkMode ? 'text-[#F9FAFB] border-white/30 hover:bg-white/10' : 'text-[#4E69D3] border-[#4E69D3] hover:bg-[#EEF0FB]'} px-4 py-2 rounded-md text-xs font-semibold cursor-pointer transition-colors`}>Check Details</button>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

function Section({ title, children, darkMode }: { title: string; children: React.ReactNode; darkMode: boolean }) {
  return (
    <div className={`${darkMode ? 'bg-[rgba(45,27,78,0.65)] border-[rgba(255,255,255,0.10)]' : 'bg-white/65 border-[rgba(15,60,95,0.08)]'} border p-4 rounded-[24px] mb-7 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)] last:mb-0`}>
      <h2 className={`text-[40px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'} m-0 mb-[18px] text-center`}>{title}</h2>
      {children}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { useDarkMode } from '../DarkModeContext'

const today = [
  { name: 'RICHARDS, Alden P.', ptn: 'PTN-2610204', service: 'Basic Consultation', date: 'March 27, 2026 | Friday', time: '7:00am to 8:00am' },
  { name: 'CRUZ, Dodong C.', ptn: 'PTN-2610215', service: 'Basic Consultation', date: 'March 27, 2026 | Friday', time: '7:00am to 8:00am' },
  { name: 'SANTOS, Judith A.', ptn: 'PTN-2610205', service: 'Vaccination', date: 'March 27, 2026 | Friday', time: '7:00am to 8:00am' },
]

const upcoming = [
  { name: 'Patient 1', ptn: 'PTN-0001001', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
  { name: 'Patient 2', ptn: 'PTN-0001002', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
  { name: 'Patient 3', ptn: 'PTN-0001003', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
  { name: 'Patient 4', ptn: 'PTN-0001004', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
  { name: 'Patient 5', ptn: 'PTN-0001005', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
  { name: 'Patient 6', ptn: 'PTN-0001006', service: 'Vaccination', date: 'April 1, 2026 | Wednesday', time: '7:00am to 8:00am' },
]

function Card({ patient, notified, setNotified, darkMode }: {
  patient: typeof today[0]
  notified: Set<string>
  setNotified: React.Dispatch<React.SetStateAction<Set<string>>>
  darkMode: boolean
}) {
  return (
    <div className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} p-[22px] rounded-[18px] border ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.10)]'} ${darkMode ? 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' : 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'} flex flex-col gap-[18px]`}>
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

export default function AppointmentPage() {
  const [notified, setNotified] = useState(new Set<string>())
  const { darkMode } = useDarkMode()

  return (
    <div>
      <h1 className={`text-[32px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'} my-[14px] text-left`}>Appointment Schedule</h1>

      <div className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} border ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.08)]'} p-4 rounded-[24px] mb-7 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]`}>
        <h2 className={`text-[40px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'} m-0 mb-[18px] text-center`}>Today's Schedule</h2>
        <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
          {today.map(p => <Card key={p.ptn} patient={p} notified={notified} setNotified={setNotified} darkMode={darkMode} />)}
        </div>
      </div>

      <div className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} border ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.08)]'} p-4 rounded-[24px] mb-7 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]`}>
        <h2 className={`text-[40px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'} m-0 mb-[18px] text-center`}>Upcoming Appointments</h2>
        <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
          {upcoming.map(p => <Card key={p.ptn} patient={p} notified={notified} setNotified={setNotified} darkMode={darkMode} />)}
        </div>
        <div className="flex justify-center mt-3">
          <button className="bg-[#4E69D3] text-white px-5 py-2.5 rounded-full border-none cursor-pointer">View List of Appointees</button>
        </div>
      </div>
    </div>
  )
}
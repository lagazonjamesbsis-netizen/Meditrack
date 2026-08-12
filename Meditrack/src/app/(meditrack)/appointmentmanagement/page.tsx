'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useDarkMode } from '../DarkModeContext'
import { now, addDays, toISO, fmtLong } from '@/src/lib/dateUtils'
import { initialRecords, type PatientRecord } from '@/src/data/patientRecords'

interface Appointment {
  name: string
  ptn: string
  ref: string
  service: string
  date: string
  time: string
  relativeOf?: string
}

interface ListAppointment extends Appointment {
  iso: string
}

const today: Appointment[] = [
  { name: 'RICHARDS, Alden P.', ptn: 'PTN-2610204', ref: '1020410', service: 'Basic Consultation', date: fmtLong(now), time: '7:00am to 8:00am' },
  { name: 'CRUZ, Dodong C.', ptn: 'PTN-2610215', ref: '1021503', service: 'Basic Consultation', date: fmtLong(now), time: '7:00am to 8:00am' },
  { name: 'SANTOS, Judith A.', ptn: 'PTN-2610205', ref: '1020502', service: 'Vaccination', date: fmtLong(now), time: '7:00am to 8:00am' },
  { name: 'REYES, Ana Marie S.', ptn: 'PTN-2610220', ref: '1022011', service: 'Vaccination', date: fmtLong(now), time: '7:00am to 8:00am', relativeOf: 'SANTOS, Judith A.' },
  { name: 'TAN, Miguel R.', ptn: 'PTN-2610221', ref: '1022112', service: 'Basic Consultation', date: fmtLong(now), time: '9:00am to 10:00am', relativeOf: 'MENDOZA, Carlos B.' },
  { name: 'SALVADOR, Jose P.', ptn: 'PTN-2610222', ref: '1022213', service: 'Check-up', date: fmtLong(now), time: '10:00am to 11:00am', relativeOf: 'DELA CRUZ, Elena M.' },
]

const allArchive = [
  { name: 'REYES, Maria C.', ptn: 'PTN-2610301', ref: '1030101', service: 'Basic Consultation', date: fmtLong(addDays(now, -2)), time: '9:00am to 10:00am', iso: toISO(addDays(now, -2)), status: 'Done' as const },
  { name: 'GONZALES, Pedro J.', ptn: 'PTN-2610302', ref: '1030202', service: 'Vaccination', date: fmtLong(addDays(now, -2)), time: '10:00am to 11:00am', iso: toISO(addDays(now, -2)), status: 'Done' as const },
  { name: 'VILLANUEVA, Ana R.', ptn: 'PTN-2610303', ref: '1030303', service: 'Check-up', date: fmtLong(addDays(now, -1)), time: '8:00am to 9:00am', iso: toISO(addDays(now, -1)), status: 'Done' as const },
  { name: 'LOPEZ, Jose M.', ptn: 'PTN-2610304', ref: '1030404', service: 'Basic Consultation', date: fmtLong(addDays(now, -1)), time: '1:00pm to 2:00pm', iso: toISO(addDays(now, -1)), status: 'Cancelled' as const },
  { name: 'SANTOS, Rosa T.', ptn: 'PTN-2610305', ref: '1030505', service: 'Vaccination', date: fmtLong(now), time: '9:00am to 10:00am', iso: toISO(now), status: 'Cancelled' as const },
  { name: 'CRUZ, Juan B.', ptn: 'PTN-2610306', ref: '1030606', service: 'Check-up', date: fmtLong(addDays(now, -3)), time: '11:00am to 12:00pm', iso: toISO(addDays(now, -3)), status: 'No Show' as const },
  { name: 'DELA CRUZ, Maria L.', ptn: 'PTN-2610307', ref: '1030707', service: 'Basic Consultation', date: fmtLong(addDays(now, -2)), time: '2:00pm to 3:00pm', iso: toISO(addDays(now, -2)), status: 'No Show' as const },
  { name: 'RAMOS, Carla T.', ptn: 'PTN-2610308', ref: '1030808', service: 'Vaccination', date: fmtLong(addDays(now, -4)), time: '8:00am to 9:00am', iso: toISO(addDays(now, -4)), status: 'Done' as const },
  { name: 'MENDEZ, Luis F.', ptn: 'PTN-2610309', ref: '1030909', service: 'Basic Consultation', date: fmtLong(addDays(now, -4)), time: '10:00am to 11:00am', iso: toISO(addDays(now, -4)), status: 'Done' as const },
  { name: 'TORRES, Gina P.', ptn: 'PTN-2610310', ref: '1031010', service: 'Check-up', date: fmtLong(addDays(now, -5)), time: '9:00am to 10:00am', iso: toISO(addDays(now, -5)), status: 'No Show' as const },
  { name: 'SORIANO, Mark D.', ptn: 'PTN-2610311', ref: '1031111', service: 'Basic Consultation', date: fmtLong(addDays(now, -5)), time: '1:00pm to 2:00pm', iso: toISO(addDays(now, -5)), status: 'Cancelled' as const },
  { name: 'ALVAREZ, Nena B.', ptn: 'PTN-2610312', ref: '1031212', service: 'Vaccination', date: fmtLong(addDays(now, -6)), time: '7:00am to 8:00am', iso: toISO(addDays(now, -6)), status: 'Done' as const },
]

const upcoming: Appointment[] = [
  { name: 'Patient 1', ptn: 'PTN-0001001', ref: '1000101', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' },
  { name: 'Patient 2', ptn: 'PTN-0001002', ref: '1000102', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' },
  { name: 'Patient 3', ptn: 'PTN-0001003', ref: '1000103', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' },
  { name: 'Patient 4', ptn: 'PTN-0001004', ref: '1000104', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' },
  { name: 'Patient 5', ptn: 'PTN-0001005', ref: '1000105', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' },
  { name: 'Patient 6', ptn: 'PTN-0001006', ref: '1000106', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' },
]

const futureSamples: ListAppointment[] = [
  { name: 'REYES, Maria L.', ptn: 'PTN-2610206', ref: '1020607', service: 'Basic Consultation', date: fmtLong(addDays(now, 1)), iso: toISO(addDays(now, 1)), time: '7:00am to 8:00am' },
  { name: 'GONZALES, Pedro M.', ptn: 'PTN-2610207', ref: '1020708', service: 'Check-up', date: fmtLong(addDays(now, 1)), iso: toISO(addDays(now, 1)), time: '9:00am to 10:00am' },
  { name: 'FLORES, Ana B.', ptn: 'PTN-2610208', ref: '1020809', service: 'Vaccination', date: fmtLong(addDays(now, 1)), iso: toISO(addDays(now, 1)), time: '10:00am to 11:00am', relativeOf: 'DELA CRUZ, Juan T.' },
  { name: 'DELA CRUZ, Juan T.', ptn: 'PTN-2610209', ref: '1020910', service: 'Vaccination', date: fmtLong(addDays(now, 1)), iso: toISO(addDays(now, 1)), time: '10:00am to 11:00am' },
  { name: 'VILLANUEVA, Sofia D.', ptn: 'PTN-2610210', ref: '1021011', service: 'Basic Consultation', date: fmtLong(addDays(now, 2)), iso: toISO(addDays(now, 2)), time: '8:00am to 9:00am' },
  { name: 'RAMOS, Carlos S.', ptn: 'PTN-2610211', ref: '1021112', service: 'Check-up', date: fmtLong(addDays(now, 2)), iso: toISO(addDays(now, 2)), time: '1:00pm to 2:00pm' },
  { name: 'MENDOZA, Lisa G.', ptn: 'PTN-2610212', ref: '1021213', service: 'Vaccination', date: fmtLong(addDays(now, 3)), iso: toISO(addDays(now, 3)), time: '7:00am to 8:00am' },
  { name: 'DELA CRUZ, Juan T.', ptn: 'PTN-2610209', ref: '1021314', service: 'Check-up', date: fmtLong(addDays(now, 3)), iso: toISO(addDays(now, 3)), time: '11:00am to 12:00pm' },
  { name: 'REYES, Maria L.', ptn: 'PTN-2610206', ref: '1021415', service: 'Vaccination', date: fmtLong(addDays(now, 4)), iso: toISO(addDays(now, 4)), time: '9:00am to 10:00am' },
  { name: 'GONZALES, Pedro M.', ptn: 'PTN-2610207', ref: '1021516', service: 'Basic Consultation', date: fmtLong(addDays(now, 4)), iso: toISO(addDays(now, 4)), time: '2:00pm to 3:00pm' },
  { name: 'RAMOS, Carlos S.', ptn: 'PTN-2610211', ref: '1021617', service: 'Vaccination', date: fmtLong(addDays(now, 6)), iso: toISO(addDays(now, 6)), time: '7:00am to 8:00am' },
  { name: 'FLORES, Ana B.', ptn: 'PTN-2610208', ref: '1021718', service: 'Check-up', date: fmtLong(addDays(now, 6)), iso: toISO(addDays(now, 6)), time: '10:00am to 11:00am' },
  { name: 'MENDOZA, Lisa G.', ptn: 'PTN-2610212', ref: '1021819', service: 'Basic Consultation', date: fmtLong(addDays(now, 7)), iso: toISO(addDays(now, 7)), time: '8:00am to 9:00am' },
  { name: 'VILLANUEVA, Sofia D.', ptn: 'PTN-2610210', ref: '1021920', service: 'Vaccination', date: fmtLong(addDays(now, 7)), iso: toISO(addDays(now, 7)), time: '1:00pm to 2:00pm', relativeOf: 'SANTOS, Judith A.' },
]

const listAppointments: ListAppointment[] = [
  ...today.map(p => ({ ...p, iso: toISO(now) })),
  ...futureSamples,
  ...upcoming.map(p => ({ ...p, iso: toISO(addDays(now, 5)) })),
]

const serviceColors: Record<string, { bg: string; color: string; label: string }> = {
  'Basic Consultation': { bg: '#E0F2FE', color: '#0369A1', label: 'Consultation' },
  'Vaccination': { bg: '#E8EAF6', color: '#4E69D3', label: 'Vaccination' },
  'Check-up': { bg: '#FEFCBF', color: '#975A16', label: 'Check-up' },
}

const statusColors: Record<string, { bg: string; color: string }> = {
  Done: { bg: '#DCFCE7', color: '#16A34A' },
  Cancelled: { bg: '#FEE2E2', color: '#DC2626' },
  'No Show': { bg: '#FEF9C3', color: '#CA8A04' },
}

function ListCard({ patient, darkMode, onViewRecord }: { patient: ListAppointment; darkMode: boolean; onViewRecord: (record: PatientRecord) => void }) {
  const sc = (service: string) => serviceColors[service] || { bg: '#F7FAFC', color: '#718096', label: service }
  return (
    <div className={`${darkMode ? 'bg-[#0f1438]' : 'bg-[#f8fbff]'} border ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.08)]'} rounded-xl p-4 flex flex-col gap-2.5`}>
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-[15px] ${patient.relativeOf ? 'bg-[#E8EAF6] text-[#4E69D3]' : 'bg-[#dedede] text-gray-600'}`}>{patient.name.charAt(0)}</div>
        <div className="flex-1 min-w-0">
          <h4 className={`text-[16px] font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'} m-0 truncate`}>{patient.name}</h4>
          {patient.relativeOf && (
            <p className={`m-0 text-[12px] font-semibold italic truncate ${darkMode ? 'text-[#C4B5FD]' : 'text-[#7C3AED]'}`}>Relative of {patient.relativeOf}</p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className={`text-[13px] font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'}`}>{patient.ptn}</span>
        <span className={`text-[12px] font-semibold ${darkMode ? 'text-[#C4B5FD]' : 'text-[#4E69D3]'}`}>Ref No: {patient.ref}</span>
      </div>
      <span style={{ background: sc(patient.service).bg, color: sc(patient.service).color }} className="self-start inline-block px-3 py-1 rounded-full text-[12px] font-bold">{sc(patient.service).label}</span>
      <div className={`flex flex-col gap-1 ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} px-3 py-2 rounded-lg border ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-100'}`}>
        <span className={`flex items-center gap-2 text-[14px] font-semibold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[14px] h-[14px] flex-shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          {patient.date}
        </span>
        <span className={`flex items-center gap-2 text-[14px] font-semibold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[14px] h-[14px] flex-shrink-0"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
          {patient.time}
        </span>
      </div>
      <button
        className={`self-end bg-transparent ${darkMode ? 'text-[#F9FAFB] border-white/30 hover:bg-white/10' : 'text-[#4E69D3] border-[#4E69D3] hover:bg-[#EEF0FB]'} px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-colors`}
        onClick={() => {
          const record = initialRecords.find(r => r.id === patient.ptn)
          if (record) {
            onViewRecord(record)
          } else {
            toast.error('No record found for this patient')
          }
        }}
      >View Record</button>
    </div>
  )
}

function Card({ patient, notified, setNotified, darkMode, onViewRecord }: {
  patient: Appointment
  notified: Set<string>
  setNotified: React.Dispatch<React.SetStateAction<Set<string>>>
  darkMode: boolean
  onViewRecord: (record: PatientRecord) => void
}) {
  const isRelative = !!patient.relativeOf
  return (
    <div className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} p-[22px] rounded-[18px] border ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.10)]'} ${darkMode ? 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' : 'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'} flex flex-col gap-[18px]`}>
      <div className="flex gap-[18px] items-center">
        <div className={`w-[72px] h-[72px] rounded-full flex-shrink-0 flex items-center justify-center text-[28px] ${isRelative ? 'bg-[#E8EAF6] text-[#4E69D3]' : 'bg-[#dedede] text-gray-600'}`}>
          {patient.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-[24px] font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'} leading-[1] m-0 truncate`}>{patient.name}</h3>
          {patient.relativeOf && (
            <p className={`mt-[2px] text-[13px] font-semibold italic ${darkMode ? 'text-[#C4B5FD]' : 'text-[#7C3AED]'}`}>Relative of {patient.relativeOf}</p>
          )}
          <p className={`mt-[6px] text-base font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'}`}>{patient.ptn}</p>
          <p className={`mt-[2px] text-[13px] font-semibold ${darkMode ? 'text-[#C4B5FD]' : 'text-[#4E69D3]'}`}>Ref No: {patient.ref}</p>
          <p className={`mt-[4px] text-[15px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#555]'}`}>{patient.service}</p>
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
        <button
          className={`bg-transparent ${darkMode ? 'text-[#F9FAFB] border-white/30 hover:bg-white/10' : 'text-[#4E69D3] border-[#4E69D3] hover:bg-[#EEF0FB]'} px-4 py-2 rounded-md text-xs font-semibold cursor-pointer transition-colors`}
          onClick={() => {
            const record = initialRecords.find(r => r.id === patient.ptn)
            if (record) {
              onViewRecord(record)
            } else {
              toast.error('No record found for this patient')
            }
          }}
        >View Record</button>
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
  const [showArchive, setShowArchive] = useState(false)
  const [showList, setShowList] = useState(false)
  const [selectedDate, setSelectedDate] = useState(toISO(addDays(now, -2)))
  const [listDate, setListDate] = useState(toISO(now))
  const { darkMode } = useDarkMode()
  const [viewingPatient, setViewingPatient] = useState<PatientRecord | null>(null)

  useEffect(() => {
    document.body.style.overflow = showArchive || viewingPatient !== null || showList ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showArchive, viewingPatient, showList])

  return (
    <div>
      <div className="flex items-center justify-between mb-[14px]">
        <h1 className={`text-[30px] sm:text-[38px] lg:text-[45px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'} my-0 text-left`}>Appointment Schedule</h1>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowArchive(!showArchive)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold border-none cursor-pointer transition-colors bg-[#4E69D3] text-white hover:bg-[#3D56B8]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M21 8v13H3V8" /><path d="M1 3h22v5H1z" /><line x1="10" y1="12" x2="14" y2="12" />
            </svg>
            Appointments Archive
          </button>
        </div>
      </div>

      {showArchive && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start z-[1000] p-3 sm:p-4 lg:p-10 overflow-y-auto">
          <div className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-2xl w-full max-w-[960px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] flex flex-col max-h-[90vh]`} onClick={e => e.stopPropagation()}>
            <div className={`flex justify-between items-center px-7 py-5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} border-b sticky top-0 ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-t-2xl z-10`}>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0`}>Archive Appointments</h2>
              <button className={`w-9 h-9 border-none ${darkMode ? 'bg-[#0f1438]' : 'bg-gray-100'} rounded-full text-xl ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-500'} cursor-pointer flex items-center justify-center hover:bg-red-500 hover:text-white transition-all`} onClick={() => setShowArchive(false)}>&times;</button>
            </div>

            <div className={`flex items-center justify-center gap-3 px-7 pt-5 pb-3 ${darkMode ? 'border-b border-[rgba(255,255,255,0.10)]' : 'border-b border-gray-200'}`}>
              <button onClick={() => {
                const d = new Date(selectedDate + 'T12:00:00')
                d.setDate(d.getDate() - 1)
                setSelectedDate(d.toISOString().split('T')[0])
              }} className={`bg-transparent border-none cursor-pointer p-1 rounded-lg transition-colors ${darkMode ? 'hover:bg-[#3d2768] text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button onClick={() => (document.getElementById('archive-date-picker') as HTMLInputElement)?.showPicker()} className="flex flex-col items-center min-w-[180px] bg-transparent border-none cursor-pointer">
                <span className={`text-base font-bold leading-tight ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} hover:opacity-70 transition-opacity`}>
                  {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span className={`text-[11px] font-medium text-gray-400`}>
                  {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long' })}
                </span>
              </button>
              <input id="archive-date-picker" type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-0 h-0 p-0 border-none opacity-0" />
              <button onClick={() => {
                const d = new Date(selectedDate + 'T12:00:00')
                d.setDate(d.getDate() + 1)
                setSelectedDate(d.toISOString().split('T')[0])
              }} className={`bg-transparent border-none cursor-pointer p-1 rounded-lg transition-colors ${darkMode ? 'hover:bg-[#3d2768] text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>

            <div className="px-7 py-6 overflow-y-auto flex-1 max-h-[70vh]">
              {(() => {
                const filtered = allArchive.filter(p => p.iso === selectedDate)
                if (filtered.length === 0) {
                  return <p className={`text-center py-10 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No archived appointments found for this date.</p>
                }
                const sc = (service: string) => serviceColors[service] || { bg: '#F7FAFC', color: '#718096', label: service }
                const st = (status: string) => statusColors[status] || { bg: '#F7FAFC', color: '#718096' }
                return (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-[640px]" style={{ tableLayout: 'fixed' }}>
                    <thead>
                      <tr className={`${darkMode ? 'bg-[#0f1438]' : 'bg-[#ddd6fe]'}`}>
                        <th className={`px-6 py-4 text-left font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} text-[15px] uppercase tracking-[0.5px] font-poppins ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(255,255,255,0.20)]'} border-b w-[38%]`}>Patient Name</th>
                        <th className={`px-6 py-4 text-left font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} text-[15px] uppercase tracking-[0.5px] font-poppins ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(255,255,255,0.20)]'} border-b w-[16%]`}>ID</th>
                        <th className={`px-6 py-4 text-left font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} text-[15px] uppercase tracking-[0.5px] font-poppins ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(255,255,255,0.20)]'} border-b w-[16%]`}>Service</th>
                        <th className={`px-6 py-4 text-left font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} text-[15px] uppercase tracking-[0.5px] font-poppins ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(255,255,255,0.20)]'} border-b w-[16%]`}>Time</th>
                        <th className={`px-6 py-4 text-left font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} text-[15px] uppercase tracking-[0.5px] font-poppins ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(255,255,255,0.20)]'} border-b w-[14%]`}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(p => (
                        <tr key={p.ptn} className={`${darkMode ? 'hover:bg-[#0f1438]' : 'hover:bg-[#E8EAF6]'} cursor-pointer`}>
                          <td className={`px-6 py-4 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[#E2E8F0]'} border-b ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>
                            <div className="flex items-center gap-3 overflow-hidden">
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${darkMode ? 'bg-[#0f1438] text-blue-300' : 'bg-[#E8EAF6] text-[#4E69D3]'}`}>{p.name.charAt(0)}</div>
                              <span className="text-[15px] truncate" title={p.name}>{p.name}</span>
                            </div>
                          </td>
                          <td className={`px-6 py-4 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[#E2E8F0]'} border-b text-[15px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{p.ptn}</td>
                          <td className={`px-6 py-4 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[#E2E8F0]'} border-b text-[15px] whitespace-nowrap ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{p.service}</td>
                          <td className={`px-6 py-4 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[#E2E8F0]'} border-b text-[15px] whitespace-nowrap ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{p.time}</td>
                          <td className={`px-6 py-4 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[#E2E8F0]'} border-b`}>
                            <span style={{background: st(p.status).bg, color: st(p.status).color}} className="inline-block px-3 py-1.5 rounded-full text-[12px] font-bold whitespace-nowrap">{p.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                )
              })()}
            </div>

            <div className={`flex justify-end gap-3 px-7 py-4 border-t ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} sticky bottom-0 ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-b-2xl`}>
              <button className={`px-6 py-2.5 rounded-lg border-none text-sm font-semibold cursor-pointer transition-colors ${darkMode ? 'bg-[#0f1438] text-[#F9FAFB] hover:bg-[#1a2050]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => setShowArchive(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showList && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start z-[1000] p-3 sm:p-4 lg:p-10 overflow-y-auto">
          <div className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-2xl w-full max-w-[1000px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] flex flex-col max-h-[90vh]`} onClick={e => e.stopPropagation()}>
            <div className={`flex justify-between items-center px-7 py-5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} border-b sticky top-0 ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-t-2xl z-10`}>
              <div>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0`}>List of Appointees</h2>
                <p className={`text-[12px] m-0 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{listAppointments.length} scheduled appointment(s)</p>
              </div>
              <button className={`w-9 h-9 border-none ${darkMode ? 'bg-[#0f1438]' : 'bg-gray-100'} rounded-full text-xl ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-500'} cursor-pointer flex items-center justify-center hover:bg-red-500 hover:text-white transition-all`} onClick={() => setShowList(false)}>&times;</button>
            </div>

            <div className={`flex items-center justify-center gap-3 px-7 pt-5 pb-3 ${darkMode ? 'border-b border-[rgba(255,255,255,0.10)]' : 'border-b border-gray-200'}`}>
              <button onClick={() => {
                const d = new Date(listDate + 'T12:00:00')
                d.setDate(d.getDate() - 1)
                setListDate(d.toISOString().split('T')[0])
              }} className={`bg-transparent border-none cursor-pointer p-1 rounded-lg transition-colors ${darkMode ? 'hover:bg-[#3d2768] text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button onClick={() => (document.getElementById('list-date-picker') as HTMLInputElement)?.showPicker()} className="flex flex-col items-center min-w-[180px] bg-transparent border-none cursor-pointer">
                <span className={`text-base font-bold leading-tight ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} hover:opacity-70 transition-opacity`}>
                  {new Date(listDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span className={`text-[11px] font-medium text-gray-400`}>
                  {new Date(listDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long' })}
                </span>
              </button>
              <input id="list-date-picker" type="date" value={listDate} onChange={e => setListDate(e.target.value)} className="w-0 h-0 p-0 border-none opacity-0" />
              <button onClick={() => {
                const d = new Date(listDate + 'T12:00:00')
                d.setDate(d.getDate() + 1)
                setListDate(d.toISOString().split('T')[0])
              }} className={`bg-transparent border-none cursor-pointer p-1 rounded-lg transition-colors ${darkMode ? 'hover:bg-[#3d2768] text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>

            <div className="px-7 py-6 overflow-y-auto flex-1 max-h-[70vh]">
              {(() => {
                const filtered = listAppointments.filter(p => p.iso === listDate)
                if (filtered.length === 0) {
                  return <p className={`text-center py-10 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No appointments scheduled for this date.</p>
                }
                return (
                  <div className="grid grid-cols-2 gap-4 max-[768px]:grid-cols-1">
                    {filtered.map(p => (
                      <ListCard key={p.ptn} patient={p} darkMode={darkMode} onViewRecord={setViewingPatient} />
                    ))}
                  </div>
                )
              })()}
            </div>

            <div className={`flex justify-end gap-3 px-7 py-4 border-t ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} sticky bottom-0 ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-b-2xl`}>
              <button className={`px-6 py-2.5 rounded-lg border-none text-sm font-semibold cursor-pointer transition-colors ${darkMode ? 'bg-[#0f1438] text-[#F9FAFB] hover:bg-[#1a2050]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => setShowList(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      <div className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} border ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.08)]'} p-4 rounded-[24px] mb-7 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]`}>
        <h2 className={`text-[26px] sm:text-[32px] lg:text-[40px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'} m-0 mb-[18px] text-center`}>Today&apos;s Schedule</h2>
        <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[768px]:grid-cols-1">
          {today.map(p => <Card key={p.ptn} patient={p} notified={notified} setNotified={setNotified} darkMode={darkMode} onViewRecord={setViewingPatient} />)}
        </div>
      </div>

      <div className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} border ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.08)]'} p-4 rounded-[24px] mb-7 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]`}>
        <h2 className={`text-[26px] sm:text-[32px] lg:text-[40px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'} m-0 mb-[18px] text-center`}>Upcoming Appointments</h2>
        <p className={`text-center text-[15px] m-0 -mt-3 mb-[18px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{fmtLong(addDays(now, 1))}</p>
        <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[768px]:grid-cols-1">
          {futureSamples.filter(p => p.iso === toISO(addDays(now, 1))).map(p => <Card key={p.ptn} patient={p} notified={notified} setNotified={setNotified} darkMode={darkMode} onViewRecord={setViewingPatient} />)}
        </div>
        <div className="flex justify-center mt-3">
          <button onClick={() => { setListDate(toISO(now)); setShowList(true) }} className="bg-[#4E69D3] text-white px-5 py-2.5 rounded-full border-none cursor-pointer hover:bg-[#3D56B8] transition-colors">View List of Appointees</button>
        </div>
      </div>

      {viewingPatient && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start z-[1000] p-3 sm:p-4 lg:p-10 overflow-y-auto">
          <div className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-2xl w-full max-w-[960px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] flex flex-col max-h-[90vh]`} onClick={e => e.stopPropagation()}>
            <div className={`flex justify-between items-center px-4 sm:px-7 py-4 sm:py-5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} border-b sticky top-0 ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-t-2xl z-10`}>
              <h2 className={`font-poppins text-2xl font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0`}>Patient Record &mdash; {viewingPatient.id}</h2>
              <button className={`w-9 h-9 border-none ${darkMode ? 'bg-[#0f1438]' : 'bg-gray-100'} rounded-full text-xl ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-500'} cursor-pointer flex items-center justify-center hover:bg-red-500 hover:text-white transition-all`} onClick={() => setViewingPatient(null)}>&times;</button>
            </div>
            <div className="px-4 sm:px-7 py-6 overflow-y-auto flex-1 max-h-[72vh]">
              <ViewSection darkMode={darkMode} title="Personal Information" fields={[['Name', (viewingPatient.form.lastName || '') + ', ' + (viewingPatient.form.givenName || '') + ' ' + (viewingPatient.form.middleName || '')], ['Suffix', viewingPatient.form.suffix || 'N/A'], ['Maiden Name', viewingPatient.form.maidenName || 'N/A'], ['Sex', viewingPatient.form.sex || ''], ['Blood Type', viewingPatient.form.bloodType || ''], ['Birthdate', viewingPatient.form.birthdate || ''], ['Age', viewingPatient.form.age || ''], ['Place of Birth', viewingPatient.form.placeOfBirth || 'N/A'], ['Civil Status', viewingPatient.form.civilStatus || 'N/A'], ['Religion', viewingPatient.form.religion || 'N/A'], ['Contact', viewingPatient.form.contactNumber || 'N/A']]} />
              <ViewSection darkMode={darkMode} title="Father's Name" fields={[['Name', (viewingPatient.form.fatherLastName || 'N/A') + ', ' + (viewingPatient.form.fatherGivenName || '') + ' ' + (viewingPatient.form.fatherMiddleName || '')]]} />
              <ViewSection darkMode={darkMode} title="Mother's Maiden Name" fields={[['Name', (viewingPatient.form.motherLastName || 'N/A') + ', ' + (viewingPatient.form.motherGivenName || '') + ' ' + (viewingPatient.form.motherMiddleName || '')]]} />
              <ViewSection darkMode={darkMode} title="Address" fields={[['Region', viewingPatient.form.region || 'N/A'], ['Province', viewingPatient.form.province || 'N/A'], ['City / Municipality', viewingPatient.form.city || 'N/A'], ['Barangay', viewingPatient.form.barangay || 'N/A'], ['Street / Purok', viewingPatient.form.street || 'N/A'], ['Postal Code', viewingPatient.form.postalCode || 'N/A']]} />
              <ViewSection darkMode={darkMode} title="PhilHealth Information" fields={[['PhilHealth No.', viewingPatient.form.philHealthNo || 'N/A'], ['Member Name', viewingPatient.form.memberName || 'N/A'], ['Spouse', viewingPatient.form.spouseName || 'N/A'], ['Member Birthdate', viewingPatient.form.memberBirthdate || 'N/A'], ['Residential Address', viewingPatient.form.completeAddress || 'N/A'], ['Member Dependent', viewingPatient.form.memberDependent || 'N/A'], ['Family Role', viewingPatient.form.familyMemberRole || 'N/A'], ['Education', viewingPatient.form.educationalAttainment || 'N/A']]} />
              <ViewSubRecords darkMode={darkMode} title="Immunization Records" records={viewingPatient.immunizationRecords} fields={[['BCG', 'bcg'], ['HEPA B (24h)', 'hepaB24'], ['HEPA B (<24h)', 'hepaBLess24'], ['PENTAVALENT 1', 'pentavalent1'], ['MCV 1 (AMV)', 'mcv1'], ['OPV 1', 'opv1'], ['ROTA 1', 'rota1'], ['PCV 1', 'pcv1'], ['HEPA B2', 'hepaB2'], ['PNEUMONIA', 'pneumonia'], ['INFLUENZA', 'influenza']]} />
              <ViewSubRecords darkMode={darkMode} title="Medical Records" records={viewingPatient.medicalRecords} fields={[['Date', 'date'], ['BP', 'bp'], ['HR', 'hr'], ['RR', 'rr'], ['Weight', 'weight'], ['Height', 'height'], ['Temperature', 'temperature']]} />
              <ViewTextSection darkMode={darkMode} title="Chief Complaints" content={viewingPatient.form.chiefComplaints} />
              <ViewTextSection darkMode={darkMode} title="Diagnosis" content={viewingPatient.form.diagnosis} />
              <ViewTextSection darkMode={darkMode} title="Medications / Treatment" content={viewingPatient.form.medications} />
            </div>
            <div className={`flex justify-end px-4 sm:px-7 py-4 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} border-t sticky bottom-0 ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-b-2xl`}>
              <button className={`px-6 py-3 rounded-lg border-none text-sm font-semibold cursor-pointer transition-colors ${darkMode ? 'bg-[#0f1438] text-[#F9FAFB] hover:bg-[#1a2050]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} onClick={() => setViewingPatient(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

function ViewSection({ darkMode, title, fields }: { darkMode: boolean; title: string; fields: [string, string][] }) {
  return (
    <div className={`mb-6 pb-5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-100'} border-b last:border-none last:mb-0 last:pb-0`}>
      <h3 className={`font-poppins text-lg font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0 pb-1.5 mb-3 border-b-2 border-[#4E69D3] inline-block`}>{title}</h3>
      <div className="grid grid-cols-3 gap-[10px_20px] max-[768px]:grid-cols-1">
        {fields.map(([label, value]) => (
          <div key={label} className={`text-[16px] ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-600'} leading-relaxed`}><span className={`font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{label}:</span> {value || '\u2014'}</div>
        ))}
      </div>
    </div>
  )
}

function ViewTextSection({ darkMode, title, content }: { darkMode: boolean; title: string; content?: string }) {
  return (
    <div className={`mb-6 pb-5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-100'} border-b last:border-none last:mb-0 last:pb-0`}>
      <h3 className={`font-poppins text-lg font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0 pb-1.5 mb-3 border-b-2 border-[#4E69D3] inline-block`}>{title}</h3>
      <p className={`text-[16px] ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-600'} leading-relaxed whitespace-pre-wrap`}>{content || 'None'}</p>
    </div>
  )
}

function ViewSubRecords({ darkMode, title, records, fields }: { darkMode: boolean; title: string; records: Record<string, string>[]; fields: [string, string][] }) {
  return (
    <div className={`mb-6 pb-5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-100'} border-b last:border-none last:mb-0 last:pb-0`}>
      <h3 className={`font-poppins text-lg font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0 pb-1.5 mb-3 border-b-2 border-[#4E69D3] inline-block`}>{title}</h3>
      {(!records || records.length === 0) ? (
        <p className={`text-[15px] ${darkMode ? 'text-gray-400' : 'text-gray-400'} italic`}>No {title.toLowerCase()}.</p>
      ) : records.map((rec, i) => (
        <div key={i} className="mb-4">
          <div className={`text-[16px] font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} mb-2.5`}>Record #{i + 1}</div>
          <div className="grid grid-cols-3 gap-[10px_20px] max-[768px]:grid-cols-1">
            {fields.map(([label, field]) => (
              <div key={label} className={`text-[13px] ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-600'} leading-relaxed`}><span className={`font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{label}:</span> {rec[field] || '\u2014'}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

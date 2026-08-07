'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { useDarkMode } from '../DarkModeContext'
import { initialRecords, type PatientRecord } from '@/src/data/patientRecords'
import { now, addDays, toISO, fmtLong } from '@/src/lib/dateUtils'

type PatientCardData = {
  name: string
  ptn: string
  ref: string
  service: string
  date: string
  time: string
  relativeOf?: string
}

const todayPatients: PatientCardData[] = [
  { name: 'RICHARDS, Alden P.', ptn: 'PTN-2610204', ref: '1020410', service: 'Basic Consultation', date: fmtLong(now), time: '7:00am to 8:00am' },
  { name: 'CRUZ, Dodong C.', ptn: 'PTN-2610215', ref: '1021503', service: 'Basic Consultation', date: fmtLong(now), time: '7:00am to 8:00am' },
  { name: 'SANTOS, Judith A.', ptn: 'PTN-2610205', ref: '1020502', service: 'Vaccination', date: fmtLong(now), time: '7:00am to 8:00am' },
]

const upcomingPatients: PatientCardData[] = [
  { name: 'Patient 1', ptn: 'PTN-0001001', ref: '1000101', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' },
  { name: 'Patient 2', ptn: 'PTN-0001002', ref: '1000102', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' },
  { name: 'Patient 3', ptn: 'PTN-0001003', ref: '1000103', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' },
  { name: 'Patient 4', ptn: 'PTN-0001004', ref: '1000104', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' },
  { name: 'Patient 5', ptn: 'PTN-0001005', ref: '1000105', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' },
  { name: 'Patient 6', ptn: 'PTN-0001006', ref: '1000106', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' },
]

const events = [
  {
    title: 'Anti-Rabies Vaccination',
    subtitle: fmtLong(addDays(now, 2)),
    time: '7:00am to 9:00am',
    icon: '💉',
    location: 'Barangay Health Center - Main Hall',
    organizer: 'City Veterinary Office & RHU Malolos',
    fee: 'Free',
    contact: '0917 123 4567',
    note: 'Open for walk-in registration',
    description: 'Free anti-rabies vaccination for registered dogs and cats in the barangay. Please bring your pet with updated registration, leashed or in a carrier, and arrive early to avoid long lines.',
  },
  {
    title: 'Blood Donation Program',
    subtitle: fmtLong(addDays(now, 3)),
    time: '3:00pm to 5:00pm',
    icon: '🩸',
    location: 'Barangay Covered Court',
    organizer: 'Philippine Red Cross - Malolos Chapter',
    fee: 'Free',
    contact: '0918 765 4321',
    note: 'First come, first served',
    description: 'Community bloodletting drive in partnership with the Philippine Red Cross. Donors must be 18 to 60 years old, weigh at least 50 kg, and be in good general health. Bring a valid ID.',
  },
  {
    title: 'Mental Health Screening',
    subtitle: fmtLong(addDays(now, 4)),
    time: '3:00pm to 5:00pm',
    icon: '🧠',
    location: 'Barangay Hall - Conference Room',
    organizer: 'Department of Health',
    fee: 'Free',
    contact: '0917 123 4567',
    note: 'Appointment recommended',
    description: 'Free mental health assessment and counseling with licensed psychologists. Covers stress, anxiety, and depression screening. All results are kept strictly confidential.',
  },
]

const services = [
  { title: 'Basic Consultation', subtitle: 'Monday to Friday', time: '8:00am - 5:00pm', icon: '👩‍⚕️', location: 'RHU Main Clinic', fee: 'Free', contact: '0917 123 4567', description: 'General health consultation with our midwife and nurse team. Covers check-ups, diagnosis of common illnesses, and referral to physicians when needed.' },
  { title: 'Pre-natal Care', subtitle: 'Tuesday', time: '8:00am - 5:00pm', icon: '🤰', location: 'RHU Main Clinic - Maternity Room', fee: 'Free', contact: '0917 123 4567', description: 'Complete pregnancy care including monthly check-ups, abdominal examination, iron and folic acid supplements, tetanus toxoid immunization, and health education for expecting mothers.' },
  { title: 'National Immunization Program (NIP)', subtitle: 'Wednesday to Friday', time: '8:00am - 5:00pm', icon: '💉', location: 'RHU Main Clinic - Immunization Room', fee: 'Free', contact: '0917 123 4567', description: 'Childhood immunization against vaccine-preventable diseases such as BCG, Hepatitis B, Pentavalent, OPV, PCV, Rota, MMR, and others as scheduled by the DOH.' },
  { title: 'Hypertension Detection and Management (HDM)', subtitle: 'Monday to Friday', time: '8:00am - 5:00pm', icon: '🩸', location: 'RHU Main Clinic - NCD Room', fee: 'Free', contact: '0917 123 4567', description: 'Blood pressure screening, monitoring, and maintenance medication for patients with hypertension. Includes lifestyle counseling and regular follow-up visits.' },
  { title: 'Visual Inspection with Acetic Acid (VIA)', subtitle: 'Thursday', time: '8:00am - 5:00pm', icon: '🔬', location: 'RHU Main Clinic - Women\u2019s Health Room', fee: 'Free', contact: '0917 123 4567', description: 'Cervical cancer screening for women aged 25 to 65. Early detection and referral for treatment when abnormalities are found.' },
  { title: 'Family Planning', subtitle: 'Thursday', time: '8:00am - 5:00pm', icon: '🧬', location: 'RHU Main Clinic - Counseling Room', fee: 'Free', contact: '0917 123 4567', description: 'Free family planning services including counseling, pills, injectables, implants, IUD insertion, and natural family planning methods.' },
  { title: 'Pills and Condoms', subtitle: 'Monday to Friday', time: '8:00am - 5:00pm', icon: '💊', location: 'RHU Main Clinic - Pharmacy Window', fee: 'Free', contact: '0917 123 4567', description: 'Free distribution of birth control pills and condoms. Short counseling on proper use is provided with every supply.' },
  { title: 'Adolescent Health and Development Program', subtitle: 'Saturday', time: '8:00am - 12:00pm', icon: '🧑', location: 'Barangay Hall - Youth Room', fee: 'Free', contact: '0917 123 4567', description: 'Health services for teenagers including check-ups, reproductive health education, mental health support, and peer counseling sessions.' },
]

const majorServices = [
  { title: 'Diabetes Management', icon: '🩺', desc: 'Blood sugar screening, monitoring, medication, and lifestyle counseling.' },
  { title: 'Hypertension Control', icon: '❤️', desc: 'Regular blood pressure monitoring, maintenance medication, and dietary guidance.' },
  { title: 'TB Control Program', icon: '🔬', desc: 'Tuberculosis screening, diagnosis, directly observed therapy (DOTS), and patient support.' },
  { title: 'Cancer Screening', icon: '🎗️', desc: 'Early detection services including breast examination and cervical cancer screening.' },
  { title: 'Nutrition Program', icon: '🥗', desc: 'Nutritional assessment, supplementation, and counseling for all ages.' },
  { title: 'Mental Health Services', icon: '🧠', desc: 'Counseling, psychological support, and referral for mental health concerns.' },
  { title: 'Dental Care', icon: '🦷', desc: 'Basic dental services including check-ups, extractions, cleaning, and oral health education.' },
  { title: 'Wound Care & Minor Surgery', icon: '🏥', desc: 'Treatment of minor wounds, suturing, abscess drainage, and basic surgical procedures.' },
]

function PatientCard({ patient, notified, setNotified, darkMode, onViewRecord }: {
  patient: PatientCardData
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

export default function Homepage() {
  const [notified, setNotified] = useState(new Set<string>())
  const [showAppointmentList, setShowAppointmentList] = useState(false)
  const [selectedDateTab, setSelectedDateTab] = useState(0)
  const [viewingPatient, setViewingPatient] = useState<PatientRecord | null>(null)
  const [details, setDetails] = useState<{ kind: 'event' | 'service'; title: string; icon: string; subtitle: string; time: string; location: string; organizer?: string; fee: string; contact: string; note: string; description: string } | null>(null)
  const { darkMode } = useDarkMode()

  const serviceColors: Record<string, { bg: string; color: string; label: string }> = {
    'Basic Consultation': { bg: '#E0F2FE', color: '#0369A1', label: 'Consultation' },
    'Vaccination': { bg: '#E8EAF6', color: '#4E69D3', label: 'Vaccination' },
    'Check-up': { bg: '#FEFCBF', color: '#975A16', label: 'Check-up' },
    'Pre-natal Care': { bg: '#F3E8FF', color: '#7C3AED', label: 'Pre-natal' },
    'Family Planning': { bg: '#DBEAFE', color: '#1D4ED8', label: 'Family Planning' },
  }

  const allAppointments = [...todayPatients, ...upcomingPatients]
  const dateToIso: Record<string, string> = {
    [fmtLong(now)]: toISO(now),
    [fmtLong(addDays(now, 5))]: toISO(addDays(now, 5)),
  }
  const dateGroups = allAppointments.reduce((acc: Record<string, typeof allAppointments>, p) => {
    if (!acc[p.date]) acc[p.date] = []
    acc[p.date].push(p)
    return acc
  }, {})
  const dateTabs = Object.keys(dateGroups)
  const [pickerDate, setPickerDate] = useState(dateToIso[dateTabs[0]] || toISO(now))

  return (
    <div>
      <h1 className={`text-[34px] sm:text-[44px] lg:text-[60px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'} my-[14px] text-left`}>Hello! Midwife Vivianne</h1>

      <div className="grid grid-cols-3 gap-[22px] mb-7 max-[1100px]:grid-cols-2 max-[768px]:grid-cols-1">
        <div className={`flex items-center gap-4 max-sm:gap-3 ${darkMode ? 'bg-[#2d1b4e] border-[rgba(255,255,255,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' : 'bg-white border-[rgba(15,60,95,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'} p-[22px] max-sm:p-4 rounded-[18px] border`}>
          <div className={`w-14 h-14 max-sm:w-11 max-sm:h-11 rounded-xl ${darkMode ? 'bg-[#141a45]' : 'bg-[#E8EAF6]'} flex items-center justify-center flex-shrink-0`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#4E69D3" strokeWidth="2" className="w-7 h-7"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          </div>
          <div className="flex flex-col">
            <span className={`text-2xl max-sm:text-xl font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{todayPatients.length}</span>
            <span className={`text-sm ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>Today's Schedule</span>
          </div>
        </div>
        <div className={`flex items-center gap-4 max-sm:gap-3 ${darkMode ? 'bg-[#2d1b4e] border-[rgba(255,255,255,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' : 'bg-white border-[rgba(15,60,95,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'} p-[22px] max-sm:p-4 rounded-[18px] border`}>
          <div className={`w-14 h-14 max-sm:w-11 max-sm:h-11 rounded-xl ${darkMode ? 'bg-[#141a45]' : 'bg-[#E8EAF6]'} flex items-center justify-center flex-shrink-0`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#4E69D3" strokeWidth="2" className="w-7 h-7"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
          </div>
          <div className="flex flex-col">
            <span className={`text-2xl max-sm:text-xl font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{upcomingPatients.length}</span>
            <span className={`text-sm ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>Upcoming Appointments</span>
          </div>
        </div>
        <div className={`flex items-center gap-4 max-sm:gap-3 ${darkMode ? 'bg-[#2d1b4e] border-[rgba(255,255,255,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' : 'bg-white border-[rgba(15,60,95,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'} p-[22px] max-sm:p-4 rounded-[18px] border`}>
          <div className="w-14 h-14 max-sm:w-11 max-sm:h-11 rounded-xl bg-[#FEF3C7] flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1" className="w-7 h-7"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          </div>
          <div className="flex flex-col">
            <span className={`text-2xl max-sm:text-xl font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>4.6 <span className="text-[#F59E0B] text-sm tracking-[1px]">★★★★★</span></span>
            <span className={`text-sm ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>Patient Feedback</span>
          </div>
        </div>
      </div>

      <Section title="Today's Schedule" darkMode={darkMode}>
        <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[768px]:grid-cols-1">
          {todayPatients.map(p => <PatientCard key={p.ptn} patient={p} notified={notified} setNotified={setNotified} darkMode={darkMode} onViewRecord={setViewingPatient} />)}
        </div>
      </Section>

      <Section title="Upcoming Appointments" darkMode={darkMode}>
        <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[768px]:grid-cols-1">
          {upcomingPatients.map(p => <PatientCard key={p.ptn} patient={p} notified={notified} setNotified={setNotified} darkMode={darkMode} onViewRecord={setViewingPatient} />)}
        </div>
        <div className="flex justify-center mt-3">
          <button className="bg-[#4E69D3] text-white px-5 py-2.5 rounded-full border-none cursor-pointer" onClick={() => setShowAppointmentList(true)}>View List of Appointees</button>
        </div>
      </Section>

      <Section title="Events" darkMode={darkMode}>
        <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[768px]:grid-cols-1">
          {events.map((ev, i) => (
            <div key={i} className={`flex flex-col ${darkMode ? 'bg-[#2d1b4e] border-[rgba(255,255,255,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' : 'bg-white border-[rgba(15,60,95,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'} p-[22px] max-sm:p-4 rounded-[18px] border`}>
              <div className="flex gap-4 items-start max-sm:gap-3">
                <div className="text-2xl max-sm:text-xl mt-1">{ev.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-[20px] max-sm:text-[17px] font-bold leading-tight m-0 line-clamp-2 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'}`}>{ev.title}</h3>
                </div>
              </div>
              <div className={`flex flex-col gap-1 max-sm:gap-0.5 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'} mt-[16px] max-sm:mt-3 pt-[14px] max-sm:pt-3 border-t ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.08)]'}`}>
                <div className="flex items-center gap-2 text-[16px] max-sm:text-[14px] font-semibold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[16px] h-[16px] flex-shrink-0"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  {ev.subtitle}
                </div>
                <div className="flex items-center gap-2 text-[16px] max-sm:text-[14px] font-semibold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[16px] h-[16px] flex-shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  {ev.time}
                </div>
              </div>
              <button
                className={`ml-auto mt-[14px] max-sm:mt-3 bg-transparent ${darkMode ? 'text-[#F9FAFB] border-white/30 hover:bg-white/10' : 'text-[#4E69D3] border-[#4E69D3] hover:bg-[#EEF0FB]'} px-4 py-2 rounded-md text-xs font-semibold cursor-pointer transition-colors`}
                onClick={() => setDetails({ kind: 'event', title: ev.title, icon: ev.icon, subtitle: ev.subtitle, time: ev.time, location: ev.location, organizer: ev.organizer, fee: ev.fee, contact: ev.contact, note: ev.note, description: ev.description })}
              >Check Details</button>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Services" darkMode={darkMode}>
        <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[768px]:grid-cols-1">
          {services.map((s, i) => (
            <div key={i} className={`flex flex-col ${darkMode ? 'bg-[#2d1b4e] border-[rgba(255,255,255,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' : 'bg-white border-[rgba(15,60,95,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'} p-[22px] max-sm:p-4 rounded-[18px] border`}>
              <div className="flex gap-4 items-start max-sm:gap-3">
                <div className="text-2xl max-sm:text-xl mt-1">{s.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-[20px] max-sm:text-[17px] font-bold leading-tight m-0 line-clamp-2 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'}`}>{s.title}</h3>
                </div>
              </div>
              <div className={`flex flex-col gap-1 max-sm:gap-0.5 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'} mt-[16px] max-sm:mt-3 pt-[14px] max-sm:pt-3 border-t ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(15,60,95,0.08)]'}`}>
                <div className="flex items-center gap-2 text-[16px] max-sm:text-[14px] font-semibold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[16px] h-[16px] flex-shrink-0"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  {s.subtitle}
                </div>
                <div className="flex items-center gap-2 text-[16px] max-sm:text-[14px] font-semibold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[16px] h-[16px] flex-shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  {s.time}
                </div>
              </div>
              <button
                className={`ml-auto mt-[14px] max-sm:mt-3 bg-transparent ${darkMode ? 'text-[#F9FAFB] border-white/30 hover:bg-white/10' : 'text-[#4E69D3] border-[#4E69D3] hover:bg-[#EEF0FB]'} px-4 py-2 rounded-md text-xs font-semibold cursor-pointer transition-colors`}
                onClick={() => setDetails({ kind: 'service', title: s.title, icon: s.icon, subtitle: s.subtitle, time: s.time, location: s.location, organizer: '', fee: s.fee, contact: s.contact, note: '', description: s.description })}
              >Check Details</button>
            </div>
          ))}
        </div>
      </Section>

      {showAppointmentList && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start z-[1000] p-3 sm:p-4 lg:p-10 overflow-y-auto" onClick={() => setShowAppointmentList(false)}>
          <div className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-2xl w-full max-w-[960px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] flex flex-col max-h-[90vh]`} onClick={e => e.stopPropagation()}>
            <div className={`flex justify-between items-center px-7 py-5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} border-b sticky top-0 ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-t-2xl z-10`}>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0`}>List of Appointees</h2>
              <button className={`w-9 h-9 border-none ${darkMode ? 'bg-[#0f1438]' : 'bg-gray-100'} rounded-full text-xl ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-500'} cursor-pointer flex items-center justify-center hover:bg-red-500 hover:text-white transition-all`} onClick={() => setShowAppointmentList(false)}>&times;</button>
            </div>

            <div className={`flex items-center justify-center gap-3 px-7 pt-5 pb-3 ${darkMode ? 'border-b border-[rgba(255,255,255,0.10)]' : 'border-b border-gray-200'}`}>
              <button onClick={() => {
                const d = new Date(pickerDate + 'T12:00:00')
                d.setDate(d.getDate() - 1)
                const iso = d.toISOString().split('T')[0]
                setPickerDate(iso)
              }} className={`bg-transparent border-none cursor-pointer p-1 rounded-lg transition-colors ${darkMode ? 'hover:bg-[#3d2768] text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button onClick={() => (document.getElementById('appointment-date-picker') as HTMLInputElement)?.showPicker()} className="flex flex-col items-center min-w-[180px] bg-transparent border-none cursor-pointer">
                <span className={`text-base font-bold leading-tight ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} hover:opacity-70 transition-opacity`}>
                  {new Date(pickerDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span className={`text-[11px] font-medium ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                  {new Date(pickerDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long' })}
                </span>
              </button>
              <input id="appointment-date-picker" type="date" value={pickerDate} onChange={e => setPickerDate(e.target.value)} className="w-0 h-0 p-0 border-none opacity-0" />
              <button onClick={() => {
                const d = new Date(pickerDate + 'T12:00:00')
                d.setDate(d.getDate() + 1)
                const iso = d.toISOString().split('T')[0]
                setPickerDate(iso)
              }} className={`bg-transparent border-none cursor-pointer p-1 rounded-lg transition-colors ${darkMode ? 'hover:bg-[#3d2768] text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>

            <div className="px-7 py-6 overflow-y-auto flex-1 max-h-[70vh]">
              <div className="flex flex-col gap-3">
                {(() => {
                  const matchDate = Object.entries(dateToIso).find(([, iso]) => iso === pickerDate)?.[0]
                  const patients = matchDate ? dateGroups[matchDate] : []
                  if (!patients || patients.length === 0) {
                    return <p className={`text-center py-10 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No appointments found for this date.</p>
                  }
                  return patients.map(p => {
                    const sc = serviceColors[p.service] || { bg: '#F7FAFC', color: '#718096', label: p.service }
                    return (
                      <div key={p.ptn} className={`flex items-center gap-4 p-4 rounded-xl ${darkMode ? 'bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.06)]' : 'bg-gray-50 hover:bg-gray-100 border border-gray-100'} transition-colors`}>
                        <div className="w-12 h-12 rounded-full bg-[#dedede] flex-shrink-0 flex items-center justify-center text-lg font-bold text-gray-500">
                          {p.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-base font-semibold m-0 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'}`}>{p.name}</p>
                          <p className={`text-sm m-0 mt-0.5 ${darkMode ? 'text-[#cbd5e1]' : 'text-gray-500'}`}>{p.ptn}</p>
                        </div>
                        <span style={{background: sc.bg, color: sc.color}} className="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">{sc.label}</span>
                        <div className={`text-right flex-shrink-0`}>
                          <p className={`text-sm font-semibold m-0 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'}`}>{p.time}</p>
                        </div>
                      </div>
                    )
                  })
                })()}
              </div>
            </div>

            <div className={`flex justify-end gap-3 px-7 py-4 border-t ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} sticky bottom-0 ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-b-2xl`}>
              <button className={`px-6 py-2.5 rounded-lg border-none text-sm font-semibold cursor-pointer transition-colors ${darkMode ? 'bg-[#0f1438] text-[#F9FAFB] hover:bg-[#1a2050]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => setShowAppointmentList(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {viewingPatient && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start z-[1000] p-3 sm:p-4 lg:p-10 overflow-y-auto" onClick={() => setViewingPatient(null)}>
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

      {details && (
        <DetailsModal
          darkMode={darkMode}
          kind={details.kind}
          title={details.title}
          icon={details.icon}
          subtitle={details.subtitle}
          time={details.time}
          location={details.location}
          organizer={details.organizer}
          fee={details.fee}
          contact={details.contact}
          note={details.note}
          description={details.description}
          onClose={() => setDetails(null)}
        />
      )}
    </div>
  )
}

function Section({ title, children, darkMode }: { title: string; children: React.ReactNode; darkMode: boolean }) {
  return (
    <div className={`${darkMode ? 'bg-[rgba(45,27,78,0.65)] border-[rgba(255,255,255,0.10)]' : 'bg-white/65 border-[rgba(15,60,95,0.08)]'} border p-4 rounded-[24px] mb-7 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)] last:mb-0`}>
      <h2 className={`text-[26px] sm:text-[32px] lg:text-[40px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'} m-0 mb-[18px] text-center`}>{title}</h2>
      {children}
    </div>
  )
}

function DetailsModal({ darkMode, kind, title, icon, subtitle, time, location, organizer, fee, contact, note, description, onClose }: {
  darkMode: boolean
  kind: 'event' | 'service'
  title: string
  icon: string
  subtitle: string
  time: string
  location: string
  organizer?: string
  fee: string
  contact: string
  note: string
  description: string
  onClose: () => void
}) {
  const rows: [string, string][] = kind === 'event'
    ? [
        ['Date', subtitle],
        ['Time', time],
        ['Location', location],
        ...(organizer ? [['Organizer', organizer] as [string, string]] : []),
        ...(note ? [['Registration', note] as [string, string]] : []),
        ['Fee', fee],
        ['Contact', contact],
      ]
    : [
        ['Schedule', subtitle],
        ['Hours', time],
        ['Location', location],
        ['Fee', fee],
        ['Contact', contact],
      ]

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start z-[1000] p-3 sm:p-4 lg:p-10 overflow-y-auto" onClick={onClose}>
      <div className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-2xl w-full max-w-[640px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] flex flex-col max-h-[90vh]`} onClick={e => e.stopPropagation()}>
        <div className={`flex justify-between items-center px-4 sm:px-7 py-4 sm:py-5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} border-b sticky top-0 ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-t-2xl z-10`}>
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${darkMode ? 'bg-[#0f1438]' : 'bg-[#E8EAF6]'}`}>{icon}</div>
            <div>
              <h2 className={`font-poppins text-xl font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0`}>{title}</h2>
              <span className={`text-[12px] font-semibold uppercase tracking-[0.5px] ${darkMode ? 'text-[#C4B5FD]' : 'text-[#4E69D3]'}`}>{kind === 'event' ? 'Event Details' : 'Service Details'}</span>
            </div>
          </div>
          <button className={`w-9 h-9 border-none ${darkMode ? 'bg-[#0f1438]' : 'bg-gray-100'} rounded-full text-xl ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-500'} cursor-pointer flex items-center justify-center hover:bg-red-500 hover:text-white transition-all`} onClick={onClose}>&times;</button>
        </div>
        <div className="px-4 sm:px-7 py-6 overflow-y-auto flex-1">
          <p className={`text-sm ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-600'} leading-relaxed mb-5`}>{description}</p>
          <div className="flex flex-col gap-3">
            {rows.map(([label, value]) => (
              <div key={label} className={`flex items-start justify-between gap-4 ${darkMode ? 'bg-[rgba(255,255,255,0.03)]' : 'bg-gray-50'} px-4 py-3 rounded-lg`}>
                <span className={`text-[13px] font-bold flex-shrink-0 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{label}</span>
                <span className={`text-[13px] text-right ${darkMode ? 'text-[#cbd5e1]' : 'text-gray-500'}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`flex justify-end px-4 sm:px-7 py-4 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} border-t sticky bottom-0 ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-b-2xl`}>
          <button className={`px-6 py-3 rounded-lg border-none text-sm font-semibold cursor-pointer transition-colors ${darkMode ? 'bg-[#0f1438] text-[#F9FAFB] hover:bg-[#1a2050]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

function ViewSection({ darkMode, title, fields }: { darkMode: boolean; title: string; fields: [string, string][] }) {
  return (
    <div className={`mb-6 pb-5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-100'} border-b last:border-none last:mb-0 last:pb-0`}>
      <h3 className={`font-poppins text-base font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0 pb-1.5 mb-3 border-b-2 border-[#4E69D3] inline-block`}>{title}</h3>
      <div className="grid grid-cols-3 gap-[10px_20px] max-[768px]:grid-cols-1">
        {fields.map(([label, value]) => (
          <div key={label} className={`text-[13px] ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-600'} leading-relaxed`}><span className={`font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{label}:</span> {value || '\u2014'}</div>
        ))}
      </div>
    </div>
  )
}

function ViewTextSection({ darkMode, title, content }: { darkMode: boolean; title: string; content?: string }) {
  return (
    <div className={`mb-6 pb-5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-100'} border-b last:border-none last:mb-0 last:pb-0`}>
      <h3 className={`font-poppins text-base font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0 pb-1.5 mb-3 border-b-2 border-[#4E69D3] inline-block`}>{title}</h3>
      <p className={`text-sm ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-600'} leading-relaxed whitespace-pre-wrap`}>{content || 'None'}</p>
    </div>
  )
}

function ViewSubRecords({ darkMode, title, records, fields }: { darkMode: boolean; title: string; records: Record<string, string>[]; fields: [string, string][] }) {
  return (
    <div className={`mb-6 pb-5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-100'} border-b last:border-none last:mb-0 last:pb-0`}>
      <h3 className={`font-poppins text-base font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0 pb-1.5 mb-3 border-b-2 border-[#4E69D3] inline-block`}>{title}</h3>
      {(!records || records.length === 0) ? (
        <p className={`text-[13px] ${darkMode ? 'text-gray-400' : 'text-gray-400'} italic`}>No {title.toLowerCase()}.</p>
      ) : records.map((rec, i) => (
        <div key={i} className="mb-4">
          <div className={`text-sm font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} mb-2.5`}>Record #{i + 1}</div>
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

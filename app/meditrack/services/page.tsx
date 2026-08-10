'use client'
import { useDarkMode } from '../DarkModeContext'

const services = [
  { title: 'Basic Consultation', subtitle: 'Monday to Friday', time: '8:00am - 5:00pm', icon: '👩‍⚕️', desc: 'General medical consultation for patients of all ages. Includes check-ups, diagnosis, and treatment recommendations.' },
  { title: 'Disease Control & Prevention', subtitle: 'Wednesday to Friday', time: '8:00am - 5:00pm', icon: '🦠', desc: 'Monitoring, prevention, and control of communicable and non-communicable diseases within the community.' },
  { title: 'Family Planning & Reproductive Health', subtitle: 'Thursday', time: '8:00am - 5:00pm', icon: '🧬', desc: 'Counseling and services for family planning methods, reproductive health education, and maternal well-being.' },
  { title: 'Immunization and Vaccination', subtitle: 'Wednesday to Friday', time: '8:00am - 5:00pm', icon: '💊', desc: 'Routine immunization programs for infants, children, and adults including catch-up vaccinations.' },
  { title: 'Maternal and Child Care', subtitle: 'Tuesday', time: '8:00am - 5:00pm', icon: '🤰', desc: 'Prenatal, postnatal, and child health care services ensuring the well-being of mothers and children.' },
  { title: 'Dental Care', subtitle: 'Friday', time: '8:00am - 5:00pm', icon: '🦷', desc: 'Basic dental services including check-ups, extractions, cleaning, and oral health education.' },
]

export default function ServicesPage() {
  const { darkMode } = useDarkMode()
  return (
    <div>
      <h1 className={`text-[32px] my-[14px] text-left ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'}`}>Services</h1>

      <div className={`p-4 rounded-[24px] ${darkMode ? 'bg-[#2d1b4e] border-[rgba(255,255,255,0.10)]' : 'bg-white border-[rgba(15,60,95,0.08)]'} shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]`}>
        <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
          {services.map((s, i) => (
            <div key={i} className={`flex flex-col p-[22px] rounded-[18px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] ${darkMode ? 'bg-[#2d1b4e] border border-[rgba(255,255,255,0.10)]' : 'bg-white border border-[rgba(15,60,95,0.10)]'}`}>
              <div className="flex gap-4 items-start">
                <div className="text-2xl mt-1">{s.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-[20px] font-bold leading-tight m-0 line-clamp-2 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#111]'}`}>{s.title}</h3>
                </div>
              </div>
              <p className={`text-[13px] leading-relaxed m-0 mt-[16px] line-clamp-2 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#555]'}`}>{s.desc}</p>
              <div className={`flex flex-col gap-1 text-[16px] font-semibold mt-[16px] pt-[14px] border-t ${darkMode ? 'text-[#F9FAFB] border-[rgba(255,255,255,0.10)]' : 'text-[#111] border-[rgba(15,60,95,0.08)]'}`}>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[16px] h-[16px] flex-shrink-0"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  {s.subtitle}
                </div>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[16px] h-[16px] flex-shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  {s.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

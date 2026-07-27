"use client";

import { useState } from "react";
import { toast } from "sonner";

interface Appointment {
  id: string;
  name: string;
  ptn: string;
  service: string;
  date: string;
  time: string;
}

const todaySchedule: Appointment[] = [
  { id: "t1", name: "RICHARDS, Alden P.", ptn: "PTN-2610204", service: "Dental Care", date: "March 27, 2026 | Friday", time: "7:00am to 8:00am" },
  { id: "t2", name: "CRUZ, Dodong C.", ptn: "PTN-2610205", service: "Dental Care", date: "March 27, 2026 | Friday", time: "7:00am to 8:00am" },
  { id: "t3", name: "Santos, Judith A.", ptn: "PTN-2610205", service: "Vaccination", date: "March 27, 2026 | Friday", time: "7:00am to 8:00am" },
];

const initialUpcoming: Appointment[] = [
  { id: "u1", name: "RICHARDS, Mark P.", ptn: "PTN-2610214", service: "Basic Consultation", date: "March 30, 2026 | Tuesday", time: "7:00am to 8:00am" },
  { id: "u2", name: "DELA CRUZ, Danny P.", ptn: "PTN-2610216", service: "Basic Consultation", date: "March 30, 2026 | Friday", time: "7:00am to 8:00am" },
  { id: "u3", name: "DOMINGO, Marites P.", ptn: "PTN-2610217", service: "Prenatal Care", date: "March 31, 2026 | Tuesday", time: "7:00am to 8:00am" },
  { id: "u4", name: "Manalo, Jenny D.", ptn: "PTN-2610215", service: "Prenatal Care", date: "March 31, 2026 | Tuesday", time: "7:00am to 8:00am" },
  { id: "u5", name: "SANTOS, Alice P.", ptn: "PTN-2610216", service: "Vaccination", date: "April 1, 2026 | Wednesday", time: "7:00am to 8:00am" },
  { id: "u6", name: "REYES, Maria J.", ptn: "PTN-2610216", service: "Vaccination", date: "April 1, 2026 | Wednesday", time: "7:00am to 8:00am" },
  { id: "u7", name: "REYES, Aljous C.", ptn: "PTN-2610216", service: "Vaccination", date: "April 1, 2026 | Wednesday", time: "7:00am to 8:00am" },
  { id: "u8", name: "Domingo, Jobert B.", ptn: "PTN-2610216", service: "Vaccination", date: "April 1, 2026 | Wednesday", time: "7:00am to 8:00am" },
  { id: "u9", name: "Clemente, Odette A.", ptn: "PTN-2610216", service: "Vaccination", date: "April 1, 2026 | Wednesday", time: "7:00am to 8:00am" },
];

const initialHistory: Appointment[] = Array.from({ length: 9 }).map((_, i) => ({
  id: `h${i + 1}`,
  name: "REYES, Maria J.",
  ptn: "PTN-2610216",
  service: "Vaccination",
  date: "January 13, 2026 | Friday",
  time: "7:00am to 8:00am",
}));

const PAGE_SIZE = 6;

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[16px] h-[16px] flex-shrink-0">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[16px] h-[16px] flex-shrink-0">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function Avatar() {
  return <div className="w-[72px] h-[72px] rounded-full bg-[#dedede] flex-shrink-0" />;
}

function InfoBox({ appt }: { appt: Appointment }) {
  return (
    <div className="flex flex-col gap-1.5 bg-[#f8fbff] px-4 py-[14px] rounded-xl border border-[rgba(15,60,95,0.08)] shadow-[0_2px_4px_rgba(0,0,0,0.04)] mt-[10px]">
      <span className="flex items-center gap-2 text-[16px] font-semibold text-[#111]">
        <CalendarIcon />
        {appt.date}
      </span>
      <span className="flex items-center gap-2 text-[16px] font-semibold text-[#111]">
        <ClockIcon />
        {appt.time}
      </span>
    </div>
  );
}

function PatientHeader({ appt }: { appt: Appointment }) {
  return (
    <div className="flex gap-[18px] items-center">
      <Avatar />
      <div className="flex-1 min-w-0">
        <h3 className="text-[24px] font-bold text-[#111] leading-[1] m-0 truncate">{appt.name}</h3>
        <p className="mt-[6px] text-base font-bold text-[#111]">{appt.ptn}</p>
        <p className="mt-[6px] text-[15px] text-[#555]">{appt.service}</p>
      </div>
    </div>
  );
}

export default function AdminAppointments() {
  const [upcoming, setUpcoming] = useState<Appointment[]>(initialUpcoming);
  const [history] = useState<Appointment[]>(initialHistory);
  const [notified, setNotified] = useState<Set<string>>(new Set());
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [detailsFor, setDetailsFor] = useState<Appointment | null>(null);

  function notify(appt: Appointment) {
    // TODO: call your notification API here, e.g. POST /api/admin/appointments/:id/notify
    setNotified((prev) => new Set(prev).add(appt.ptn));
    toast.success("Patient notified successfully");
    setTimeout(() => {
      setNotified((prev) => {
        const next = new Set(prev);
        next.delete(appt.ptn);
        return next;
      });
    }, 3000);
  }

  function cancelAppointment(id: string) {
    if (!confirm("Cancel this appointment?")) return;
    // TODO: call your cancel API here, e.g. PATCH /api/admin/appointments/:id { status: "cancelled" }
    setUpcoming((prev) => prev.filter((a) => a.id !== id));
  }

  const visibleUpcoming = showAllUpcoming ? upcoming : upcoming.slice(0, PAGE_SIZE);
  const visibleHistory = showAllHistory ? history : history.slice(0, PAGE_SIZE);

  return (
    <div>
      <h1 className="text-[32px] text-[#1d4662] my-[14px] text-left font-bold">Appointment Schedule</h1>

      {/* Today's Schedule */}
      <div className="bg-white border border-[rgba(15,60,95,0.08)] p-4 rounded-[24px] mb-7 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]">
        <h2 className="text-[40px] text-[#1d4662] m-0 mb-[18px] text-center font-bold">Today&rsquo;s Schedule</h2>
        <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
          {todaySchedule.map((appt) => (
            <div key={appt.id} className="bg-white p-[22px] rounded-[18px] border border-[rgba(15,60,95,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] flex flex-col gap-[18px]">
              <PatientHeader appt={appt} />
              <InfoBox appt={appt} />
              <div className="flex justify-end">
                <button
                  onClick={() => notify(appt)}
                  className={`px-5 py-2.5 rounded-md text-sm font-semibold border-none cursor-pointer transition-colors ${
                    notified.has(appt.ptn) ? "bg-green-600 text-white" : "bg-[#4E69D3] text-white hover:bg-[#3D56B8]"
                  }`}
                >
                  {notified.has(appt.ptn) ? "Sent!" : "Notify"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Appointment */}
      <div className="bg-white border border-[rgba(15,60,95,0.08)] p-4 rounded-[24px] mb-7 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]">
        <h2 className="text-[40px] text-[#1d4662] m-0 mb-[18px] text-center font-bold">Upcoming Appointment</h2>
        <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
          {visibleUpcoming.map((appt) => (
            <div key={appt.id} className="bg-white p-[22px] rounded-[18px] border border-[rgba(15,60,95,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] flex flex-col gap-[18px]">
              <PatientHeader appt={appt} />
              <InfoBox appt={appt} />
              <div className="flex justify-between gap-[18px]">
                <button
                  onClick={() => notify(appt)}
                  className={`px-5 py-2.5 rounded-md text-sm font-semibold border-none cursor-pointer transition-colors flex-1 ${
                    notified.has(appt.ptn) ? "bg-green-600 text-white" : "bg-[#4E69D3] text-white hover:bg-[#3D56B8]"
                  }`}
                >
                  {notified.has(appt.ptn) ? "Sent!" : "Notify"}
                </button>
                <button
                  onClick={() => cancelAppointment(appt.id)}
                  className="flex-1 bg-transparent text-red-600 border border-red-600 hover:bg-red-50 px-4 py-2.5 rounded-md text-sm font-semibold cursor-pointer transition-colors"
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))}
          {visibleUpcoming.length === 0 && (
            <p className="col-span-3 py-6 text-center text-[15px] text-slate-400">No upcoming appointments.</p>
          )}
        </div>
        {upcoming.length > PAGE_SIZE && (
          <div className="flex justify-center mt-3">
            <button
              onClick={() => setShowAllUpcoming((v) => !v)}
              className="bg-[#4E69D3] text-white px-5 py-2.5 rounded-full border-none cursor-pointer hover:bg-[#3D56B8] transition-colors"
            >
              {showAllUpcoming ? "Show Less" : "Show All"}
            </button>
          </div>
        )}
      </div>

      {/* Appointment History */}
      <div className="bg-white border border-[rgba(15,60,95,0.08)] p-4 rounded-[24px] mb-7 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]">
        <h2 className="text-[40px] text-[#1d4662] m-0 mb-[18px] text-center font-bold">Appointment History</h2>
        <div className="grid grid-cols-3 gap-[22px] max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1">
          {visibleHistory.map((appt) => (
            <div key={appt.id} className="bg-white p-[22px] rounded-[18px] border border-[rgba(15,60,95,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] flex flex-col gap-[18px]">
              <PatientHeader appt={appt} />
              <InfoBox appt={appt} />
              <div className="flex justify-between gap-[18px]">
                <span className="flex-1 bg-green-600 text-white px-4 py-2.5 rounded-md text-sm font-semibold text-center">
                  Completed
                </span>
                <button
                  onClick={() => setDetailsFor(appt)}
                  className="flex-1 bg-transparent text-[#4E69D3] border border-[#4E69D3] hover:bg-[#EEF0FB] px-4 py-2.5 rounded-md text-sm font-semibold cursor-pointer transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        {history.length > PAGE_SIZE && (
          <div className="flex justify-center mt-3">
            <button
              onClick={() => setShowAllHistory((v) => !v)}
              className="bg-[#4E69D3] text-white px-5 py-2.5 rounded-full border-none cursor-pointer hover:bg-[#3D56B8] transition-colors"
            >
              {showAllHistory ? "Show Less" : "Show All"}
            </button>
          </div>
        )}
      </div>

      {detailsFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Appointment Details</h3>
              <button onClick={() => setDetailsFor(null)} className="text-slate-400">
                ✕
              </button>
            </div>
            <div className="mb-4 flex items-center gap-3">
              <div className="w-[48px] h-[48px] rounded-full bg-[#dedede]" />
              <div>
                <div className="text-sm font-bold text-slate-800">{detailsFor.name}</div>
                <div className="text-xs text-slate-500">{detailsFor.ptn}</div>
              </div>
            </div>
            <dl className="space-y-2 text-sm text-slate-600">
              <div className="flex justify-between"><dt className="font-semibold">Service</dt><dd>{detailsFor.service}</dd></div>
              <div className="flex justify-between"><dt className="font-semibold">Date</dt><dd>{detailsFor.date}</dd></div>
              <div className="flex justify-between"><dt className="font-semibold">Time</dt><dd>{detailsFor.time}</dd></div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
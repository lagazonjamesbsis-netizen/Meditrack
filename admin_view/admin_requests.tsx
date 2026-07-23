"use client";

import { Bell, CalendarCheck, UserRound, Check, X } from "lucide-react";
import { useDarkMode } from "@/app/meditrack/DarkModeContext";
import { useState } from "react";

const requestsData = [
  { patient: "Alan P. Edwards", doctor: "Dr. Nina Kelly", date: "Jul 22, 2024", time: "09:00 AM", type: "General Checkup" },
  { patient: "Doreen C. Ryan", doctor: "Dr. Amir Sayed", date: "Jul 22, 2024", time: "10:30 AM", type: "Prenatal Care" },
  { patient: "Jessa A. Santos", doctor: "Dr. Nina Kelly", date: "Jul 23, 2024", time: "11:00 AM", type: "Immunization" },
  { patient: "Alvin C. Reyes", doctor: "Dr. Hannah James", date: "Jul 23, 2024", time: "02:00 PM", type: "Follow-up" },
  { patient: "Gidget A. Domingo", doctor: "Dr. Arthur Gates", date: "Jul 24, 2024", time: "09:30 AM", type: "General Checkup" },
];

export default function AdminRequests() {
  const { darkMode } = useDarkMode();
  const [pending, setPending] = useState(new Set<string>());

  const togglePending = (key: string) => {
    setPending((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <>
      <div className={`flex items-center justify-between pl-7 pr-0 py-4 ${darkMode ? "bg-[rgba(45,27,78,0.65)]" : "bg-white/65"}`}>
        <div className="flex-1" />
        <div className="flex items-center gap-3 text-[18px] text-[#5a6b76] pr-4">
          <button className="relative">
            <Bell size={20} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#2ea3e6] text-white flex items-center justify-center font-bold text-[15px] overflow-hidden">
            <UserRound size={16} />
          </div>
        </div>
      </div>

      <div className={`flex-1 ${darkMode ? "bg-[#050617]/40" : ""}`}>
        <div className="px-12 pt-5 pb-12">
          <h1 className={`text-[45px] ${darkMode ? "text-[#F9FAFB]" : "text-[#1d4662]"} my-[14px] text-left font-poppins font-bold`}>
            Appointment Requests
          </h1>

          <div className="space-y-4">
            {requestsData.map((req) => {
              const key = `${req.patient}-${req.date}-${req.time}`;
              const isPending = pending.has(key);
              return (
                <div key={key} className={`rounded-2xl border p-5 ${darkMode ? "bg-[rgba(45,27,78,0.65)] border-[rgba(255,255,255,0.10)]" : "bg-white/65 border-[rgba(15,60,95,0.08)]"}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${darkMode ? "bg-[#2d1b4e]" : "bg-slate-100"}`}>
                        <CalendarCheck size={22} className={darkMode ? "text-[#F9FAFB]" : "text-[#4E69D3]"} />
                      </div>
                      <div>
                        <h3 className={`text-lg font-bold ${darkMode ? "text-[#F9FAFB]" : "text-[#2A2E43]"}`}>{req.patient}</h3>
                        <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-slate-500"}`}>{req.doctor}</p>
                        <div className={`flex items-center gap-3 mt-2 text-sm ${darkMode ? "text-gray-400" : "text-slate-500"}`}>
                          <span>{req.date}</span>
                          <span>{req.time}</span>
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${darkMode ? "bg-[#2d1b4e] text-cyan-400" : "bg-sky-100 text-sky-700"}`}>{req.type}</span>
                        </div>
                      </div>
                    </div>
                    {isPending ? (
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-600">
                          <Check size={16} /> Confirm
                        </button>
                        <button onClick={() => togglePending(key)} className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100">
                          <X size={16} /> Cancel
                        </button>
                      </div>
                    ) : (
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">Confirmed</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

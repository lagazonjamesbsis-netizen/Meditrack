"use client";

import { Bell, CalendarCheck, Clock3, UserRound } from "lucide-react";
import { useDarkMode } from "@/app/meditrack/DarkModeContext";
import { useState } from "react";

const appointments = [
  { patient: "Alan P. Edwards", doctor: "Dr. Nina Kelly", date: "Jul 22, 2024", time: "09:00 - 09:30", status: "Confirmed" },
  { patient: "Doreen C. Ryan", doctor: "Dr. Amir Sayed", date: "Jul 22, 2024", time: "10:00 - 10:30", status: "Confirmed" },
  { patient: "Jessa A. Santos", doctor: "Dr. Nina Kelly", date: "Jul 22, 2024", time: "11:00 - 11:30", status: "Confirmed" },
  { patient: "Alvin C. Reyes", doctor: "Dr. Hannah James", date: "Jun 18, 2024", time: "09:00 - 09:30", status: "Completed" },
  { patient: "Gidget A. Domingo", doctor: "Dr. Arthur Gates", date: "Jun 18, 2024", time: "13:00 - 13:30", status: "Completed" },
  { patient: "Marga L. Reyes", doctor: "Dr. Nina Kelly", date: "Jun 19, 2024", time: "09:30 - 10:00", status: "Completed" },
];

export default function AdminAppointments() {
  const { darkMode } = useDarkMode();
  const [filter, setFilter] = useState<"All" | "Confirmed" | "Completed">("All");

  const filtered = filter === "All" ? appointments : appointments.filter((a) => a.status === filter);

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
            Appointment Schedule
          </h1>

          <div className="flex items-center gap-3 mb-6">
            {(["All", "Confirmed", "Completed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
                  filter === f
                    ? "bg-[#4E69D3] text-white"
                    : darkMode
                      ? "bg-[#2d1b4e] text-gray-300 hover:bg-[#3d2b5e]"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className={`rounded-2xl border overflow-hidden ${darkMode ? "bg-[rgba(45,27,78,0.65)] border-[rgba(255,255,255,0.10)]" : "bg-white/65 border-[rgba(15,60,95,0.08)]"}`}>
            <table className="w-full">
              <thead>
                <tr className={`text-left text-sm font-bold ${darkMode ? "text-gray-400 border-b border-[rgba(255,255,255,0.10)]" : "text-slate-500 border-b border-slate-200"}`}>
                  <th className="px-5 py-4">Patient</th>
                  <th className="px-5 py-4">Doctor</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Time</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((apt) => (
                  <tr key={`${apt.patient}-${apt.date}-${apt.time}`} className={`${darkMode ? "border-b border-[rgba(255,255,255,0.05)] hover:bg-[#2d1b4e]/50" : "border-b border-slate-100 hover:bg-slate-50"}`}>
                    <td className={`px-5 py-4 text-sm font-semibold ${darkMode ? "text-[#F9FAFB]" : "text-[#2A2E43]"}`}>{apt.patient}</td>
                    <td className={`px-5 py-4 text-sm ${darkMode ? "text-gray-300" : "text-slate-600"}`}>{apt.doctor}</td>
                    <td className={`px-5 py-4 text-sm ${darkMode ? "text-gray-400" : "text-slate-500"}`}>{apt.date}</td>
                    <td className={`px-5 py-4 text-sm ${darkMode ? "text-gray-400" : "text-slate-500"}`}>
                      <span className="inline-flex items-center gap-1">
                        <Clock3 size={12} /> {apt.time}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                        apt.status === "Confirmed" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                      }`}>{apt.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

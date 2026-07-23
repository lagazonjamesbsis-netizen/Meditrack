"use client";

import { Bell, HeartPulse, Syringe, Stethoscope, ShieldPlus, Users, Pill, Ambulance, UserRound } from "lucide-react";
import { useDarkMode } from "@/app/meditrack/DarkModeContext";

const events = [
  { title: "Anti-Rabies Vaccination", date: "July 20, 2024", time: "09:00 AM", icon: Syringe, color: "bg-amber-50 text-amber-600" },
  { title: "Blood Donation Program", date: "July 28, 2024", time: "10:00 AM", icon: HeartPulse, color: "bg-rose-50 text-rose-600" },
  { title: "Mental Health Screening", date: "August 8, 2024", time: "09:00 AM", icon: HeartPulse, color: "bg-cyan-50 text-cyan-600" },
  { title: "Dental Health Camp", date: "August 15, 2024", time: "08:00 AM", icon: Stethoscope, color: "bg-sky-50 text-sky-600" },
  { title: "Diabetes Awareness", date: "August 22, 2024", time: "09:00 AM", icon: HeartPulse, color: "bg-orange-50 text-orange-600" },
];

const services = [
  { title: "Basic Consultation", icon: Stethoscope, color: "bg-sky-50 text-sky-600" },
  { title: "Disease Control & Prevention", icon: ShieldPlus, color: "bg-rose-50 text-rose-600" },
  { title: "Family Planning & Reproductive Health", icon: Users, color: "bg-violet-50 text-violet-600" },
  { title: "Immunization & Vaccination", icon: Pill, color: "bg-cyan-50 text-cyan-600" },
  { title: "Maternal & Child Care", icon: HeartPulse, color: "bg-orange-50 text-orange-600" },
  { title: "Dental Care", icon: Ambulance, color: "bg-sky-50 text-sky-600" },
];

export default function AdminEvents() {
  const { darkMode } = useDarkMode();

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
            Events & Services
          </h1>

          <h2 className={`mb-4 font-poppins text-xl font-bold ${darkMode ? "text-[#F9FAFB]" : "text-slate-700"}`}>Upcoming Events</h2>
          <div className="grid gap-4 xl:grid-cols-3 mb-10">
            {events.map((event) => {
              const Icon = event.icon;
              return (
                <article
                  key={event.title}
                  className={`rounded-2xl border p-5 ${darkMode ? "bg-[rgba(45,27,78,0.65)] border-[rgba(255,255,255,0.10)]" : "bg-white/65 border-[rgba(15,60,95,0.08)]"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${event.color}`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className={`font-bold text-base ${darkMode ? "text-[#F9FAFB]" : "text-slate-700"}`}>{event.title}</h3>
                      <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-slate-500"}`}>{event.date} &middot; {event.time}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <h2 className={`mb-4 font-poppins text-xl font-bold ${darkMode ? "text-[#F9FAFB]" : "text-slate-700"}`}>Services Offered</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className={`rounded-2xl border p-5 ${darkMode ? "bg-[rgba(45,27,78,0.65)] border-[rgba(255,255,255,0.10)]" : "bg-white/65 border-[rgba(15,60,95,0.08)]"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${service.color}`}>
                      <Icon size={22} />
                    </div>
                    <h3 className={`font-bold text-base ${darkMode ? "text-[#F9FAFB]" : "text-slate-700"}`}>{service.title}</h3>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

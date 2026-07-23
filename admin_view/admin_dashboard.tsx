"use client";

import {
  Ambulance,
  Bell,
  CalendarCheck,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileText,
  HeartPulse,
  Pill,
  ShieldPlus,
  Stethoscope,
  Syringe,
  Users,
  UserRound,
} from "lucide-react";
import { useDarkMode } from "@/app/meditrack/DarkModeContext";
import { useState } from "react";

const metrics = [
  {
    label: "Total Users",
    value: "1430",
    trend: "+10%",
    icon: Users,
    color: "text-sky-500",
    bg: "bg-sky-50",
  },
  {
    label: "Healthcare Staff",
    value: "20",
    trend: "+5%",
    icon: Users,
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    label: "Appointments Today",
    value: "30",
    trend: "",
    icon: CalendarCheck,
    color: "text-cyan-500",
    bg: "bg-cyan-50",
  },
  {
    label: "Pending Requests",
    value: "50",
    trend: "",
    icon: FileText,
    color: "text-slate-500",
    bg: "bg-slate-100",
  },
];

const todaySeed = [
  ["EDWARDS, Alan P", "Dr. Nina Kelly", "09:00 - 09:30", "Confirmed"],
  ["RYAN, Doreen C", "Dr. Amir Sayed", "10:00 - 10:30", "Confirmed"],
  ["Santos, Jessa A", "Dr. Nina Kelly", "11:00 - 11:30", "Confirmed"],
];

const upcomingSeed = [
  ["REYES, Alvin C.", "Dr. Hannah James", "Jun 18, 09:00", "Confirmed"],
  ["Santiago, Jessa S.", "Dr. Arthur Gates", "Jun 18, 10:30", "Confirmed"],
  ["Domingo, Gidget A.", "Dr. Arthur Gates", "Jun 18, 13:00", "Confirmed"],
  ["REYES, Marga L.", "Dr. Nina Kelly", "Jun 19, 09:30", "Confirmed"],
  ["REYES, Mabel J.", "Dr. Nina Kelly", "Jun 19, 11:00", "Confirmed"],
  ["REYES, Matthew", "Dr. Hannah James", "Jun 19, 14:00", "Confirmed"],
];

const eventCards = [
  {
    title: "Anti-Rabies\nVaccination",
    subtitle: "July 20, 2024 . 09:00 AM",
    icon: Syringe,
    tone: "bg-amber-50 text-amber-600",
  },
  {
    title: "Blood\nDonation\nProgram",
    subtitle: "July 28, 2024 . 10:00 AM",
    icon: HeartPulse,
    tone: "bg-rose-50 text-rose-600",
  },
  {
    title: "Mental\nHealth\nScreening",
    subtitle: "August 8, 2024 . 09:00 AM",
    icon: HeartPulse,
    tone: "bg-cyan-50 text-cyan-600",
  },
];

const serviceCards = [
  { title: "Basic\nConsultation", icon: Stethoscope, tone: "bg-sky-50 text-sky-600" },
  { title: "Disease\nControl &\nPrevention", icon: ShieldPlus, tone: "bg-rose-50 text-rose-600" },
  { title: "Family Planning\n& Reproductive\nHealth", icon: Users, tone: "bg-violet-50 text-violet-600" },
  { title: "Immunization\n& Vaccination", icon: Pill, tone: "bg-cyan-50 text-cyan-600" },
  { title: "Maternal &\nChild Care", icon: HeartPulse, tone: "bg-orange-50 text-orange-600" },
  { title: "Dental Care", icon: Ambulance, tone: "bg-sky-50 text-sky-600" },
];

function AppointmentCard({
  appointment,
  onConfirm,
  confirmed,
}: {
  appointment: string[];
  onConfirm: () => void;
  confirmed: boolean;
}) {
  const { darkMode } = useDarkMode();

  return (
    <article className={`rounded-lg border ${darkMode ? "bg-[#2d1b4e] border-[rgba(255,255,255,0.10)]" : "bg-white border-slate-200"} px-3 py-2.5 shadow-sm`}>
      <div className="flex items-start gap-2">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[15px] font-bold ${darkMode ? "bg-[#0f1438] text-gray-400" : "bg-slate-100 text-slate-500"}`}>
          {appointment[0].slice(0, 1)}
        </div>
        <div className="min-w-0 flex-1">
          <div className={`truncate text-[15px] font-extrabold uppercase tracking-tight ${darkMode ? "text-[#F9FAFB]" : "text-slate-700"}`}>
            {appointment[0]}
          </div>
          <div className="mt-0.5 truncate text-[14px] text-slate-400">
            {appointment[1]}
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 border-t border-slate-100 pt-2">
        <span className="inline-flex items-center gap-1 text-[14px] font-semibold text-slate-500">
          <Clock3 size={12} />
          {appointment[2]}
        </span>
        {confirmed ? (
          <span className="rounded bg-green-500 px-2 py-0.5 text-[15px] font-bold text-white">
            Confirmed
          </span>
        ) : (
          <button
            onClick={onConfirm}
            className="rounded bg-[#4E69D3] px-2 py-0.5 text-[15px] font-bold text-white hover:bg-[#3D56B8]"
          >
            Confirm
          </button>
        )}
      </div>
    </article>
  );
}

function ScheduleSection({
  title,
  appointments,
  compact = false,
  confirmed,
  onConfirm,
}: {
  title: string;
  appointments: string[][];
  compact?: boolean;
  confirmed: Set<string>;
  onConfirm: (key: string) => void;
}) {
  const { darkMode } = useDarkMode();
  return (
    <section>
      <h2 className={`mb-3 text-center font-poppins text-xl font-bold ${darkMode ? "text-[#F9FAFB]" : "text-slate-600"}`}>
        {title}
      </h2>
      <div
        className={
          compact
            ? "grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
            : "grid gap-3 xl:grid-cols-3"
        }
      >
        {appointments.map((appointment) => {
          const key = `${title}-${appointment[0]}`;
          return (
            <AppointmentCard
              key={key}
              appointment={appointment}
              onConfirm={() => onConfirm(key)}
              confirmed={confirmed.has(key)}
            />
          );
        })}
      </div>
    </section>
  );
}

export default function AdminDashboard() {
  const { darkMode } = useDarkMode();
  const [confirmed, setConfirmed] = useState(new Set<string>());

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
            Hello, Admin!
          </h1>

          <section className="grid grid-cols-4 gap-5 mb-6">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <article
                  key={metric.label}
                  className={`flex items-center gap-4 ${darkMode ? "bg-[#2d1b4e] border-[rgba(255,255,255,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]" : "bg-white border-[rgba(15,60,95,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"} p-5 rounded-[18px] border`}
                >
                  <div className={`w-12 h-12 rounded-xl ${darkMode ? "bg-[#141a45]" : metric.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={24} className={metric.color} />
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-xl font-bold ${darkMode ? "text-[#F9FAFB]" : "text-[#2A2E43]"}`}>
                      {metric.value}
                      {metric.trend && <span className="ml-1 text-[14px] font-bold text-emerald-500">{metric.trend}</span>}
                    </span>
                    <span className={`text-sm ${darkMode ? "text-[#F9FAFB]" : "text-[#2A2E43]"}`}>{metric.label}</span>
                  </div>
                </article>
              );
            })}
          </section>

          <div className={`${darkMode ? "bg-[rgba(45,27,78,0.65)] border-[rgba(255,255,255,0.10)]" : "bg-white/65 border-[rgba(15,60,95,0.08)]"} border p-4 rounded-[24px] mb-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]`}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className={`font-poppins text-xl font-bold leading-5 ${darkMode ? "text-[#F9FAFB]" : "text-slate-600"}`}>
                Top Health Concern
              </h2>
              <button className="flex items-center gap-2 rounded border border-slate-300 px-2 py-1 text-[15px] font-semibold text-slate-600">
                Weekly
                <ChevronDown size={12} />
              </button>
            </div>
            <div className="flex gap-4">
              <div className="space-y-1.5 pt-2 text-[14px] font-medium text-slate-500">
                {[
                  ["Prenatal Checkup", "bg-red-500"],
                  ["Flu", "bg-teal-500"],
                  ["Hypertension", "bg-amber-400"],
                  ["Diabetes", "bg-orange-400"],
                  ["Arthritis", "bg-violet-500"],
                ].map(([label, color]) => (
                  <div key={label as string}>
                    <i className={`mr-1 inline-block h-2 w-2 rounded-sm ${color}`} />
                    {label}
                  </div>
                ))}
              </div>
              <div className="flex flex-1 items-end gap-3 border-b border-l border-slate-300 px-3 pt-5">
                <div className="h-9 flex-1 rounded-t bg-[#fc8a66]" />
                <div className="h-16 flex-1 rounded-t bg-amber-400" />
                <div className="h-24 flex-1 rounded-t bg-[#6f60d6]" />
                <div className="h-20 flex-1 rounded-t bg-green-600" />
                <div className="h-32 flex-1 rounded-t bg-red-600" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`${darkMode ? "bg-[rgba(45,27,78,0.65)] border-[rgba(255,255,255,0.10)]" : "bg-white/65 border-[rgba(15,60,95,0.08)]"} border p-4 rounded-[24px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]`}>
              <ScheduleSection title="Today's Schedule" appointments={todaySeed} confirmed={confirmed} onConfirm={(key) => setConfirmed(prev => new Set(prev).add(key))} />
            </div>
            <div className={`${darkMode ? "bg-[rgba(45,27,78,0.65)] border-[rgba(255,255,255,0.10)]" : "bg-white/65 border-[rgba(15,60,95,0.08)]"} border p-4 rounded-[24px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]`}>
              <ScheduleSection title="Upcoming Schedule" appointments={upcomingSeed} compact confirmed={confirmed} onConfirm={(key) => setConfirmed(prev => new Set(prev).add(key))} />
            </div>
          </div>

          <div className={`mt-8 ${darkMode ? "bg-[rgba(45,27,78,0.65)] border-[rgba(255,255,255,0.10)]" : "bg-white/65 border-[rgba(15,60,95,0.08)]"} border p-4 rounded-[24px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]`}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className={`font-poppins text-xl font-extrabold ${darkMode ? "text-[#F9FAFB]" : "text-slate-800"}`}>
                Healthcare Event & Services
              </h2>
              <button className="flex items-center gap-1 text-[15px] font-semibold text-slate-500">
                See more
                <ChevronRight size={14} />
              </button>
            </div>
            <h3 className="mb-3 text-center font-poppins text-base font-bold text-slate-600">Event</h3>
            <div className="grid gap-4 xl:grid-cols-3">
              {eventCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article
                    key={card.title}
                    className={`flex min-h-24 items-center justify-center gap-3 rounded-lg border ${darkMode ? "bg-[#2d1b4e] border-[rgba(255,255,255,0.10)]" : "bg-white border-slate-300"} px-4 shadow-sm`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${card.tone}`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className={`whitespace-pre-line text-[15px] font-bold leading-4 ${darkMode ? "text-[#F9FAFB]" : "text-slate-600"}`}>
                        {card.title}
                      </div>
                      <div className={`mt-1 text-[15px] ${darkMode ? "text-gray-400" : "text-slate-400"}`}>
                        {card.subtitle}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <h3 className="mb-3 mt-6 text-center font-poppins text-lg font-bold text-slate-600">Services</h3>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {serviceCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article
                    key={card.title}
                    className={`flex min-h-24 items-center justify-center gap-3 rounded-lg border ${darkMode ? "bg-[#2d1b4e] border-[rgba(255,255,255,0.10)]" : "bg-white border-slate-300"} px-4 shadow-sm`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${card.tone}`}>
                      <Icon size={20} />
                    </div>
                    <div className={`whitespace-pre-line text-[15px] font-bold leading-4 ${darkMode ? "text-[#F9FAFB]" : "text-slate-600"}`}>
                      {card.title}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
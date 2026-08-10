// File location: admin_view/admin_dashboard.tsx
"use client";

import {
  CalendarCheck,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileText,
  HeartPulse,
  Users,
  Ambulance,
  Pill,
  ShieldPlus,
  Stethoscope,
  Syringe,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const metrics = [
  { label: "Total Users", value: "1430", trend: "+10%", icon: Users, color: "text-sky-500", bg: "bg-sky-50", href: "/admin/users" },
  { label: "Healthcare Staff", value: "20", trend: "+5%", icon: Users, color: "text-violet-500", bg: "bg-violet-50", href: "/admin/users" },
  { label: "Appointments Today", value: "30", trend: "", icon: CalendarCheck, color: "text-cyan-500", bg: "bg-cyan-50", href: "/admin/appointments" },
  { label: "Pending Requests", value: "50", trend: "", icon: FileText, color: "text-slate-500", bg: "bg-slate-100", href: "/admin/requests" },
];

type Period = "Weekly" | "Monthly" | "Quarterly" | "Yearly";
const periods: Period[] = ["Weekly", "Monthly", "Quarterly", "Yearly"];

const concernsByPeriod: Record<Period, { label: string; height: number; color: string }[]> = {
  Weekly: [
    { label: "Prenatal Checkup", height: 36, color: "bg-[#fc8a66]" },
    { label: "Flu", height: 64, color: "bg-amber-400" },
    { label: "Hypertension", height: 96, color: "bg-[#6f60d6]" },
    { label: "Diabetes", height: 80, color: "bg-green-600" },
    { label: "Arthritis", height: 128, color: "bg-red-600" },
  ],
  Monthly: [
    { label: "Prenatal Checkup", height: 60, color: "bg-[#fc8a66]" },
    { label: "Flu", height: 40, color: "bg-amber-400" },
    { label: "Hypertension", height: 110, color: "bg-[#6f60d6]" },
    { label: "Diabetes", height: 90, color: "bg-green-600" },
    { label: "Arthritis", height: 100, color: "bg-red-600" },
  ],
  Quarterly: [
    { label: "Prenatal Checkup", height: 80, color: "bg-[#fc8a66]" },
    { label: "Flu", height: 55, color: "bg-amber-400" },
    { label: "Hypertension", height: 130, color: "bg-[#6f60d6]" },
    { label: "Diabetes", height: 70, color: "bg-green-600" },
    { label: "Arthritis", height: 90, color: "bg-red-600" },
  ],
  Yearly: [
    { label: "Prenatal Checkup", height: 100, color: "bg-[#fc8a66]" },
    { label: "Flu", height: 75, color: "bg-amber-400" },
    { label: "Hypertension", height: 140, color: "bg-[#6f60d6]" },
    { label: "Diabetes", height: 120, color: "bg-green-600" },
    { label: "Arthritis", height: 60, color: "bg-red-600" },
  ],
};

const todayAppointments = [
  ["EDWARDS, Alan P", "Dr. Nina Kelly", "09:00 – 09:30", "Confirmed"],
  ["RYAN, Doreen C", "Dr. Amir Sayed", "10:00 – 10:30", "Confirmed"],
  ["Santos, Jessa A", "Dr. Nina Kelly", "11:00 – 11:30", "Confirmed"],
];

const upcomingAppointments = [
  ["REYES, Alvin C.", "Dr. Hannah James", "Jun 18, 09:00", "Confirmed"],
  ["Santiago, Jessa S.", "Dr. Arthur Gates", "Jun 18, 10:30", "Confirmed"],
  ["Domingo, Gidget A.", "Dr. Arthur Gates", "Jun 18, 13:00", "Confirmed"],
  ["REYES, Marga L.", "Dr. Nina Kelly", "Jun 19, 09:30", "Confirmed"],
  ["REYES, Mabel J.", "Dr. Nina Kelly", "Jun 19, 11:00", "Confirmed"],
  ["REYES, Matthew", "Dr. Hannah James", "Jun 19, 14:00", "Confirmed"],
];

const eventCards = [
  { title: "Anti-Rabies\nVaccination", subtitle: "July 20, 2024 · 09:00 AM", icon: Syringe, tone: "bg-amber-50 text-amber-600" },
  { title: "Blood\nDonation\nProgram", subtitle: "July 28, 2024 · 10:00 AM", icon: HeartPulse, tone: "bg-rose-50 text-rose-600" },
  { title: "Mental\nHealth\nScreening", subtitle: "August 8, 2024 · 09:00 AM", icon: HeartPulse, tone: "bg-cyan-50 text-cyan-600" },
];

const serviceCards = [
  { title: "Basic\nConsultation", icon: Stethoscope, tone: "bg-sky-50 text-sky-600" },
  { title: "Disease\nControl &\nPrevention", icon: ShieldPlus, tone: "bg-rose-50 text-rose-600" },
  { title: "Family Planning\n& Reproductive\nHealth", icon: Users, tone: "bg-violet-50 text-violet-600" },
  { title: "Immunization\n& Vaccination", icon: Pill, tone: "bg-cyan-50 text-cyan-600" },
  { title: "Maternal &\nChild Care", icon: HeartPulse, tone: "bg-orange-50 text-orange-600" },
  { title: "Dental Care", icon: Ambulance, tone: "bg-sky-50 text-sky-600" },
];

function AppointmentCard({ appointment }: { appointment: string[] }) {
  return (
    <Link
      href="/admin/appointments"
      className="block rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm hover:border-sky-300 hover:shadow-md transition"
    >
      <div className="flex items-start gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500">
          {appointment[0].slice(0, 1)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-bold text-slate-700">{appointment[0]}</div>
          <div className="mt-0.5 truncate text-xs text-slate-400">{appointment[1]}</div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 border-t border-slate-100 pt-2">
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500"><Clock3 size={12} /> {appointment[2]}</span>
        <span className="rounded bg-[#4E69D3] px-2 py-0.5 text-[10px] font-bold text-white">{appointment[3]}</span>
      </div>
    </Link>
  );
}

function ScheduleSection({ title, appointments, compact = false }: { title: string; appointments: string[][]; compact?: boolean }) {
  return (
    <section>
      <h2 className="mb-3 text-center text-[28px] font-bold text-[#1d4662]">{title}</h2>
      <div className={compact ? "grid gap-3 sm:grid-cols-2 xl:grid-cols-3" : "grid gap-3 md:grid-cols-3"}>
        {appointments.map((appointment) => <AppointmentCard key={`${title}-${appointment[0]}`} appointment={appointment} />)}
      </div>
    </section>
  );
}

export default function AdminDashboard() {
  const [period, setPeriod] = useState<Period>("Weekly");
  const [periodOpen, setPeriodOpen] = useState(false);
  const concerns = concernsByPeriod[period];

  return (
    <div className="flex-1">
      <div className="px-12 pt-5 pb-12">
        <h1 className="mb-7 text-[32px] font-extrabold tracking-tight text-[#286486]">Hello, Admin!</h1>

        <section className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Link
                key={metric.label}
                href={metric.href}
                className="relative min-h-32 rounded-[24px] border border-[rgba(15,60,95,0.08)] bg-white/65 p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)] hover:border-sky-300 hover:shadow-md transition"
              >
                {metric.trend && <span className="absolute right-3 top-3 text-[9px] font-bold text-emerald-500">{metric.trend}</span>}
                <div className={`mb-4 flex h-9 w-9 items-center justify-center rounded-lg ${metric.bg} ${metric.color}`}>
                  <Icon size={23} />
                </div>
                <div className="text-sm font-medium text-slate-500">{metric.label}</div>
                <div className="mt-1 text-2xl font-extrabold text-slate-800">{metric.value}</div>
              </Link>
            );
          })}
        </section>

        <section className="mt-5 w-full rounded-[24px] border border-[rgba(15,60,95,0.08)] bg-white/65 p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]">
          <div className="mb-4 flex items-start justify-between">
            <h2 className="max-w-36 text-lg font-bold leading-5 text-slate-700">Top Health<br />Concern</h2>
            <div className="relative">
              <button
                onClick={() => setPeriodOpen((v) => !v)}
                className="flex items-center gap-2 rounded border border-slate-300 px-2 py-1 text-[10px] font-semibold text-slate-600"
              >
                {period} <ChevronDown size={12} />
              </button>
              {periodOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setPeriodOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 z-20 rounded-lg border border-slate-300 bg-white shadow-lg overflow-hidden">
                    {periods.map((p) => (
                      <button
                        key={p}
                        onClick={() => { setPeriod(p); setPeriodOpen(false); }}
                        className={`block w-full px-4 py-2.5 text-[11px] font-semibold text-left whitespace-nowrap ${
                          period === p ? "bg-[#4E69D3] text-white" : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-6">
            <div className="space-y-1.5 pt-2 text-[11px] font-medium text-slate-500 w-40 shrink-0">
              {concerns.map((c) => (
                <div key={c.label}><i className={`mr-1 inline-block h-2 w-2 rounded-sm ${c.color}`} />{c.label}</div>
              ))}
            </div>
            <div className="flex flex-1 items-end gap-6 border-b border-l border-slate-300 px-6 pt-5">
              {concerns.map((c) => (
                <div key={c.label} className={`flex-1 rounded-t ${c.color}`} style={{ height: `${c.height}px` }} />
              ))}
            </div>
          </div>
        </section>

        <div className="mt-5 w-full space-y-5 rounded-[24px] border border-[rgba(15,60,95,0.08)] bg-white/65 p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]">
          <ScheduleSection title="Today’s Schedule" appointments={todayAppointments} />
          <ScheduleSection title="Upcoming Schedule" appointments={upcomingAppointments} compact />
        </div>

        <section className="mt-5 w-full rounded-[24px] border border-[rgba(15,60,95,0.08)] bg-white/65 p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-slate-800">Healthcare Event & Services</h2>
            <Link href="/admin/events" className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-sky-600">
              See more <ChevronRight size={14} />
            </Link>
          </div>

          <h3 className="mb-3 text-center text-lg font-bold text-slate-600">Event</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {eventCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  href="/admin/events"
                  className="flex min-h-28 items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-4 shadow-sm hover:border-sky-300 hover:shadow-md transition"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${card.tone}`}><Icon size={23} /></div>
                  <div>
                    <div className="whitespace-pre-line text-xs font-bold leading-4 text-slate-600">{card.title}</div>
                    <div className="mt-1 text-[8px] text-slate-400">{card.subtitle}</div>
                  </div>
                </Link>
              );
            })}
          </div>

          <h3 className="mb-3 mt-8 text-center text-lg font-bold text-slate-600">Services</h3>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
            {serviceCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  href="/admin/events"
                  className="flex min-h-28 items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-4 shadow-sm hover:border-sky-300 hover:shadow-md transition"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${card.tone}`}><Icon size={23} /></div>
                  <div className="whitespace-pre-line text-xs font-bold leading-4 text-slate-600">{card.title}</div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
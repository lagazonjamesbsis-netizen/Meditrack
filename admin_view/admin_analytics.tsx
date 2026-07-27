"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const concerns = [
  ["Prenatal Checkup", 62, "bg-[#f47d5d]"],
  ["Flu", 42, "bg-[#ffb21b]"],
  ["Hypertension", 86, "bg-[#5c52d9]"],
  ["Diabetes", 71, "bg-[#16a34a]"],
  ["Arthritis", 100, "bg-[#ef2020]"],
];

const consultationTypes = [
  ["General Checkup", 100, "bg-[#0d91e5]"],
  ["Prenatal Care", 78, "bg-[#12cb8d]"],
  ["Immunization", 70, "bg-[#fbbd27]"],
  ["Hypertension", 57, "bg-[#f05768]"],
  ["Diabetes", 50, "bg-[#7b4ec9]"],
  ["Follow-up", 42, "bg-[#168edb]"],
  ["Infectious Disease", 20, "bg-[#19c98d]"],
];

function Donut({ segments }: { segments: string }) {
  return (
    <div className="h-40 w-40 rounded-full" style={{ background: `conic-gradient(${segments})` }}>
      <div className="m-auto mt-8 h-24 w-24 rounded-full bg-white" />
    </div>
  );
}

export default function AdminAnalytics() {
  const [period, setPeriod] = useState("Weekly");
  const [periodOpen, setPeriodOpen] = useState(false);
  const periods = ["Weekly", "Monthly", "Quarterly", "Yearly"];

  return (
    <div className="flex-1">
      <div className="px-12 pt-5 pb-12">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-1 font-poppins text-sm font-bold uppercase tracking-[0.18em] text-cyan-600">
              Admin insights
            </p>
            <h1 className="font-poppins text-[45px] font-extrabold tracking-tight text-[#286486] leading-none">
              Analytics
            </h1>
          </div>
          <div className="relative">
            <button
              onClick={() => setPeriodOpen(!periodOpen)}
              className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm"
            >
              {period} <ChevronDown size={13} />
            </button>
            {periodOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setPeriodOpen(false)} />
                <div className="absolute right-0 top-full mt-1 z-20 rounded-lg border border-slate-300 bg-white shadow-lg overflow-hidden">
                  {periods.map((p) => (
                    <button
                      key={p}
                      onClick={() => { setPeriod(p); setPeriodOpen(false); }}
                      className={`block w-full px-4 py-2.5 text-sm font-semibold text-left whitespace-nowrap ${
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

        <section className="grid gap-5 xl:grid-cols-2">
          <div className="border border-[rgba(15,60,95,0.08)] dark:border-[rgba(255,255,255,0.10)] bg-white/65 dark:bg-[rgba(45,27,78,0.65)] p-5 rounded-[24px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]">
            <h2 className="mb-5 font-poppins text-lg font-extrabold text-slate-700">Top Health Concerns</h2>
            <div className="flex gap-5">
              <div className="space-y-2 pt-1 font-poppins text-[13px] text-slate-500 dark:text-gray-400">
                {concerns.map(([label], index) => (
                  <div key={label as string} className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-sm ${["bg-[#f47d5d]", "bg-[#19b69a]", "bg-[#ffb21b]", "bg-[#f47d5d]", "bg-[#5c52d9]"][index]}`} />
                    {label}
                  </div>
                ))}
              </div>
              <div className="flex h-44 flex-1 items-end gap-2 border-b border-l border-slate-200 px-3">
                {concerns.map(([label, height, color]) => (
                  <div key={label as string} className={`flex-1 rounded-t ${color}`} style={{ height: `${Number(height)}%` }} />
                ))}
              </div>
            </div>
          </div>

          <div className="border border-[rgba(15,60,95,0.08)] dark:border-[rgba(255,255,255,0.10)] bg-white/65 dark:bg-[rgba(45,27,78,0.65)] p-5 rounded-[24px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]">
            <h2 className="mb-5 font-poppins text-lg font-extrabold text-slate-700">Appointment Statistics</h2>
            <div className="flex items-center justify-around gap-5">
              <div className="space-y-3 font-poppins text-[13px] text-slate-500 dark:text-gray-400">
                <div><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[#0d91e5]" />Completed</div>
                <div><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[#12cb8d]" />Scheduled</div>
                <div><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[#fbbd27]" />Cancelled</div>
                <div><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[#f05768]" />Rescheduled</div>
              </div>
              <Donut segments="#0d91e5 0 76%, #12cb8d 76% 88%, #fbbd27 88% 94%, #f05768 94% 100%" />
            </div>
          </div>

          <div className="border border-[rgba(15,60,95,0.08)] dark:border-[rgba(255,255,255,0.10)] bg-white/65 dark:bg-[rgba(45,27,78,0.65)] p-5 rounded-[24px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]">
            <h2 className="mb-5 font-poppins text-lg font-extrabold text-slate-700">Consultation Types</h2>
            <div className="space-y-2.5">
              {consultationTypes.map(([label, width, color]) => (
                <div key={label as string} className="flex items-center gap-3 font-poppins text-[13px] text-slate-600 dark:text-gray-300">
                  <span className="w-24 shrink-0">{label}</span>
                  <div className="h-2.5 flex-1 rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${color}`} style={{ width: `${Number(width)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-[rgba(15,60,95,0.08)] dark:border-[rgba(255,255,255,0.10)] bg-white/65 dark:bg-[rgba(45,27,78,0.65)] p-5 rounded-[24px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]">
            <h2 className="mb-5 font-poppins text-lg font-extrabold text-slate-700">Patients Demographics</h2>
            <div className="flex items-center justify-around gap-5">
              <div className="space-y-3 font-poppins text-[13px] text-slate-500 dark:text-gray-400">
                <div><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[#0d91e5]" />0-18</div>
                <div><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[#12cb8d]" />19-30</div>
                <div><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[#fbbd27]" />31-45</div>
                <div><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[#f05768]" />46-60</div>
                <div><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[#7b4ec9]" />60+</div>
              </div>
              <Donut segments="#0d91e5 0 6%, #12cb8d 6% 28%, #fbbd27 28% 52%, #f05768 52% 70%, #7b4ec9 70% 100%" />
            </div>
          </div>
        </section>

        <div className="mt-5 border border-[rgba(15,60,95,0.08)] bg-white/65 p-5 rounded-[24px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]">
          <h2 className="mb-4 font-poppins text-lg font-extrabold text-slate-700">Insights & Alerts</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-red-100 bg-red-50 p-3">
              <div className="font-poppins text-[13px] font-bold text-red-600">High Prenatal Cases</div>
              <p className="mt-1 font-poppins text-[12px] text-slate-500 dark:text-gray-400">Prenatal cases increased by 15%.</p>
            </div>
            <div className="rounded-lg border border-amber-100 bg-amber-50 p-3">
              <div className="font-poppins text-[13px] font-bold text-amber-600">Flu Cases</div>
              <p className="mt-1 font-poppins text-[12px] text-slate-500 dark:text-gray-400">Flu cases increased by 10%.</p>
            </div>
            <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-3">
              <div className="font-poppins text-[13px] font-bold text-emerald-600">Healthcare Staff Efficiency</div>
              <p className="mt-1 font-poppins text-[12px] text-slate-500 dark:text-gray-400">Most appointments resolved in 10-12pm.</p>
            </div>
            <div className="rounded-lg border border-orange-100 bg-orange-50 p-3">
              <div className="font-poppins text-[13px] font-bold text-orange-600">Appointment Gap</div>
              <p className="mt-1 font-poppins text-[12px] text-slate-500 dark:text-gray-400">12% appointment cancellation rate.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// File location: admin_view/admin_analytics.tsx
"use client";

import { Calendar, ChevronDown } from "lucide-react";
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

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function daysAgoISO(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

function formatDisplay(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function AdminAnalytics() {
  const [mode, setMode] = useState<"single" | "range">("range");
  const [startDate, setStartDate] = useState(daysAgoISO(7));
  const [endDate, setEndDate] = useState(todayISO());
  const [singleDate, setSingleDate] = useState(todayISO());
  const [pickerOpen, setPickerOpen] = useState(false);

  // TODO: once you have a real analytics API, refetch all the chart data
  // whenever startDate/endDate (or singleDate) changes, e.g.
  // useEffect(() => { fetchAnalytics({ start: startDate, end: endDate }) }, [startDate, endDate]);

  const rangeLabel =
    mode === "single"
      ? formatDisplay(singleDate)
      : `${formatDisplay(startDate)} – ${formatDisplay(endDate)}`;

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
              onClick={() => setPickerOpen((v) => !v)}
              className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm"
            >
              <Calendar size={14} />
              {rangeLabel} <ChevronDown size={13} />
            </button>

            {pickerOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setPickerOpen(false)} />
                <div className="absolute right-0 top-full mt-2 z-20 w-80 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
                  <div className="mb-3 flex gap-2">
                    <button
                      onClick={() => setMode("single")}
                      className={`flex-1 rounded-lg border px-3 py-2 text-xs font-bold ${
                        mode === "single" ? "border-sky-400 bg-sky-50 text-sky-600" : "border-slate-200 text-slate-500"
                      }`}
                    >
                      Specific Date
                    </button>
                    <button
                      onClick={() => setMode("range")}
                      className={`flex-1 rounded-lg border px-3 py-2 text-xs font-bold ${
                        mode === "range" ? "border-sky-400 bg-sky-50 text-sky-600" : "border-slate-200 text-slate-500"
                      }`}
                    >
                      Date Range
                    </button>
                  </div>

                  {mode === "single" ? (
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-slate-500">Date</label>
                      <input
                        type="date"
                        value={singleDate}
                        max={todayISO()}
                        onChange={(e) => setSingleDate(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-sky-400"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-slate-500">From</label>
                        <input
                          type="date"
                          value={startDate}
                          max={endDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-sky-400"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-slate-500">To</label>
                        <input
                          type="date"
                          value={endDate}
                          min={startDate}
                          max={todayISO()}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-sky-400"
                        />
                      </div>
                    </div>
                  )}

                  {/* Quick presets */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {[
                      { label: "Today", start: todayISO(), end: todayISO() },
                      { label: "Last 7 days", start: daysAgoISO(7), end: todayISO() },
                      { label: "Last 30 days", start: daysAgoISO(30), end: todayISO() },
                      { label: "This year", start: `${new Date().getFullYear()}-01-01`, end: todayISO() },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => {
                          setMode("range");
                          setStartDate(preset.start);
                          setEndDate(preset.end);
                        }}
                        className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-500 hover:border-sky-300 hover:text-sky-600"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setPickerOpen(false)}
                    className="mt-4 w-full rounded-lg bg-sky-500 py-2 text-sm font-bold text-white hover:bg-sky-600"
                  >
                    Apply
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <section className="grid gap-5 xl:grid-cols-2">
          <div className="border border-[rgba(15,60,95,0.08)] bg-white/65 p-5 rounded-[24px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]">
            <h2 className="mb-5 font-poppins text-lg font-extrabold text-slate-700">Top Health Concerns</h2>
            <div className="flex gap-5">
              <div className="space-y-2 pt-1 text-[13px] text-slate-500">
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

          <div className="border border-[rgba(15,60,95,0.08)] bg-white/65 p-5 rounded-[24px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]">
            <h2 className="mb-5 font-poppins text-lg font-extrabold text-slate-700">Appointment Statistics</h2>
            <div className="flex items-center justify-around gap-5">
              <div className="space-y-3 text-[13px] text-slate-500">
                <div><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[#0d91e5]" />Completed</div>
                <div><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[#12cb8d]" />Scheduled</div>
                <div><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[#fbbd27]" />Cancelled</div>
                <div><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[#f05768]" />Rescheduled</div>
              </div>
              <Donut segments="#0d91e5 0 76%, #12cb8d 76% 88%, #fbbd27 88% 94%, #f05768 94% 100%" />
            </div>
          </div>

          <div className="border border-[rgba(15,60,95,0.08)] bg-white/65 p-5 rounded-[24px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]">
            <h2 className="mb-5 font-poppins text-lg font-extrabold text-slate-700">Consultation Types</h2>
            <div className="space-y-2.5">
              {consultationTypes.map(([label, width, color]) => (
                <div key={label as string} className="flex items-center gap-3 text-[13px] text-slate-600">
                  <span className="w-24 shrink-0">{label}</span>
                  <div className="h-2.5 flex-1 rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${color}`} style={{ width: `${Number(width)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-[rgba(15,60,95,0.08)] bg-white/65 p-5 rounded-[24px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)]">
            <h2 className="mb-5 font-poppins text-lg font-extrabold text-slate-700">Patients Demographics</h2>
            <div className="flex items-center justify-around gap-5">
              <div className="space-y-3 text-[13px] text-slate-500">
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
              <div className="text-[13px] font-bold text-red-600">High Prenatal Cases</div>
              <p className="mt-1 text-[12px] text-slate-500">Prenatal cases increased by 15%.</p>
            </div>
            <div className="rounded-lg border border-amber-100 bg-amber-50 p-3">
              <div className="text-[13px] font-bold text-amber-600">Flu Cases</div>
              <p className="mt-1 text-[12px] text-slate-500">Flu cases increased by 10%.</p>
            </div>
            <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-3">
              <div className="text-[13px] font-bold text-emerald-600">Healthcare Staff Efficiency</div>
              <p className="mt-1 text-[12px] text-slate-500">Most appointments resolved in 10-12pm.</p>
            </div>
            <div className="rounded-lg border border-orange-100 bg-orange-50 p-3">
              <div className="text-[13px] font-bold text-orange-600">Appointment Gap</div>
              <p className="mt-1 text-[12px] text-slate-500">12% appointment cancellation rate.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
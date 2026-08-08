// File location: app/admin/queuing/page.tsx
"use client";

import { User } from "lucide-react";
import { useMemo, useState } from "react";

type QueueCategory = "Regular" | "Priority" | "Walk-in";
type PriorityReason = "PWD" | "Pregnant" | "Senior Citizen";

interface QueueEntry {
  id: string;
  queueNo: string;
  name: string;
  ptn: string;
  service: string;
  timeIn: string; // HH:MM, 24h, used for sorting within a column
  category: QueueCategory;
  priorityReason?: PriorityReason;
}

// TODO: Regular and Priority columns should be populated automatically from
// today's confirmed appointments (see admin_view/admin_appointments.tsx),
// filtered to today's date and sorted by scheduled time. Walk-ins should be
// populated from whatever front-desk/patient-facing flow registers a walk-in
// — this page is now view-only and no longer creates entries itself.
const seedQueue: QueueEntry[] = [
  { id: "q1", queueNo: "R-001", name: "RICHARDS, Alden P.", ptn: "PTN-2610204", service: "Dental Care", timeIn: "07:00", category: "Regular" },
  { id: "q2", queueNo: "R-002", name: "Manalo, Jenny D.", ptn: "PTN-2610215", service: "Prenatal Care", timeIn: "07:15", category: "Regular" },
  { id: "q3", queueNo: "P-001", name: "CRUZ, Dodong C.", ptn: "PTN-2610205", service: "Dental Care", timeIn: "07:05", category: "Priority", priorityReason: "Senior Citizen" },
  { id: "q4", queueNo: "P-002", name: "Santos, Judith A.", ptn: "PTN-2610206", service: "Vaccination", timeIn: "07:10", category: "Priority", priorityReason: "Pregnant" },
  { id: "q5", queueNo: "W-001", name: "Dela Rosa, Ben T.", ptn: "—", service: "Basic Consultation", timeIn: "07:20", category: "Walk-in" },
];

const COLUMN_STYLE: Record<QueueCategory, { header: string; badge: string }> = {
  Regular: { header: "bg-slate-100 text-slate-700", badge: "bg-slate-200 text-slate-700" },
  Priority: { header: "bg-amber-100 text-amber-800", badge: "bg-amber-200 text-amber-800" },
  "Walk-in": { header: "bg-violet-100 text-violet-800", badge: "bg-violet-200 text-violet-800" },
};

/** Converts a stored "HH:MM" (24h) value into a display string like "7:15 AM". */
function formatTime12h(hhmm: string) {
  const [hourStr, minute] = hhmm.split(":");
  let hour = parseInt(hourStr, 10);
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minute} ${period}`;
}

function todayDisplay() {
  return new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function QueueColumn({
  title,
  category,
  entries,
}: {
  title: string;
  category: QueueCategory;
  entries: QueueEntry[];
}) {
  const style = COLUMN_STYLE[category];
  const sorted = useMemo(() => [...entries].sort((a, b) => a.timeIn.localeCompare(b.timeIn)), [entries]);

  return (
    <div className="flex min-w-[300px] flex-1 flex-col rounded-[24px] border border-[rgba(15,60,95,0.08)] bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)] overflow-hidden">
      <div className={`flex items-center justify-between px-5 py-4 ${style.header}`}>
        <div>
          <h2 className="font-poppins text-lg font-extrabold">{title}</h2>
          <p className="text-xs font-semibold opacity-70">{sorted.length} in queue</p>
        </div>
      </div>

      <div className="flex-1 space-y-3 p-4">
        {sorted.length === 0 && (
          <p className="py-10 text-center text-sm text-slate-400">No one in this queue.</p>
        )}
        {sorted.map((entry, index) => (
          <div key={entry.id} className="rounded-xl border border-slate-200 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${style.badge}`}>{entry.queueNo}</span>
              <span className="text-xs font-semibold text-slate-400">#{index + 1} in line</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <User size={16} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-800">{entry.name}</p>
                <p className="truncate text-xs text-slate-500">{entry.ptn}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-xs text-slate-500">
              <span>{entry.service}</span>
              <span className="font-semibold">{formatTime12h(entry.timeIn)}</span>
            </div>
            {entry.category === "Priority" && entry.priorityReason && (
              <span className="mt-2 inline-block rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                {entry.priorityReason}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function QueuingPage() {
  const [entries] = useState<QueueEntry[]>(seedQueue);

  const regular = entries.filter((e) => e.category === "Regular");
  const priority = entries.filter((e) => e.category === "Priority");
  const walkIn = entries.filter((e) => e.category === "Walk-in");

  return (
    <div className="flex-1">
      <div className="px-12 pt-5 pb-12">
        <div className="mb-1 flex flex-wrap items-start justify-between gap-3">
          <h1 className="font-poppins text-[32px] font-bold text-[#1d1d1d]">Queuing</h1>
          <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
            {todayDisplay()}
          </span>
        </div>
        <p className="mb-6 text-sm text-slate-500">
          Regular and Priority fill in automatically from today&rsquo;s appointments, ordered by scheduled time. Walk-in is view-only here, ordered by time-in.
        </p>

        <div className="flex flex-col gap-5 lg:flex-row">
          <QueueColumn title="Regular" category="Regular" entries={regular} />
          <QueueColumn title="Priority" category="Priority" entries={priority} />
          <QueueColumn title="Walk-in" category="Walk-in" entries={walkIn} />
        </div>
      </div>
    </div>
  );
}
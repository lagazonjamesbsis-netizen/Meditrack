// File location: admin_view/admin_appointments.tsx
"use client";

import { useMemo, useState } from "react";
import { Archive, Search, X } from "lucide-react";
import { toast } from "sonner";

type Category = "Regular" | "Priority" | "Walk-in";
type PriorityReason = "PWD" | "Pregnant" | "Senior Citizen";

interface Appointment {
  id: string;
  name: string;
  ptn: string;
  referenceNumber: string;
  service: string;
  date: string;
  time: string;
  category: Category;
  priorityReason?: PriorityReason;
}

const todaySchedule: Appointment[] = [
  { id: "t1", name: "RICHARDS, Alden P.", ptn: "PTN-2610204", referenceNumber: "REF-000451", service: "Dental Care", date: "March 27, 2026", time: "7:00am – 8:00am", category: "Regular" },
  { id: "t2", name: "CRUZ, Dodong C.", ptn: "PTN-2610205", referenceNumber: "REF-000452", service: "Dental Care", date: "March 27, 2026", time: "7:00am – 8:00am", category: "Priority", priorityReason: "Senior Citizen" },
  { id: "t3", name: "Santos, Judith A.", ptn: "PTN-2610206", referenceNumber: "REF-000453", service: "Vaccination", date: "March 27, 2026", time: "7:00am – 8:00am", category: "Priority", priorityReason: "Pregnant" },
  { id: "t4", name: "Dela Rosa, Ben T.", ptn: "—", referenceNumber: "REF-000463", service: "Basic Consultation", date: "March 27, 2026", time: "7:20am – 7:40am", category: "Walk-in" },
];

const initialUpcoming: Appointment[] = [
  { id: "u1", name: "RICHARDS, Mark P.", ptn: "PTN-2610214", referenceNumber: "REF-000454", service: "Basic Consultation", date: "March 30, 2026", time: "7:00am – 8:00am", category: "Regular" },
  { id: "u2", name: "DELA CRUZ, Danny P.", ptn: "PTN-2610216", referenceNumber: "REF-000455", service: "Basic Consultation", date: "March 30, 2026", time: "7:00am – 8:00am", category: "Regular" },
  { id: "u3", name: "DOMINGO, Marites P.", ptn: "PTN-2610217", referenceNumber: "REF-000456", service: "Prenatal Care", date: "March 31, 2026", time: "7:00am – 8:00am", category: "Priority", priorityReason: "Pregnant" },
  { id: "u4", name: "Manalo, Jenny D.", ptn: "PTN-2610215", referenceNumber: "REF-000457", service: "Prenatal Care", date: "March 31, 2026", time: "7:00am – 8:00am", category: "Regular" },
  { id: "u5", name: "SANTOS, Alice P.", ptn: "PTN-2610216", referenceNumber: "REF-000458", service: "Vaccination", date: "April 1, 2026", time: "7:00am – 8:00am", category: "Priority", priorityReason: "PWD" },
  { id: "u6", name: "REYES, Maria J.", ptn: "PTN-2610216", referenceNumber: "REF-000459", service: "Vaccination", date: "April 1, 2026", time: "7:00am – 8:00am", category: "Regular" },
  { id: "u7", name: "REYES, Aljous C.", ptn: "PTN-2610216", referenceNumber: "REF-000460", service: "Vaccination", date: "April 1, 2026", time: "7:00am – 8:00am", category: "Regular" },
  { id: "u8", name: "Domingo, Jobert B.", ptn: "PTN-2610216", referenceNumber: "REF-000461", service: "Vaccination", date: "April 1, 2026", time: "7:00am – 8:00am", category: "Regular" },
  { id: "u9", name: "Clemente, Odette A.", ptn: "PTN-2610216", referenceNumber: "REF-000462", service: "Vaccination", date: "April 1, 2026", time: "7:00am – 8:00am", category: "Priority", priorityReason: "Senior Citizen" },
];

const archiveEntries: Appointment[] = Array.from({ length: 9 }).map((_, i) => ({
  id: `h${i + 1}`,
  name: "REYES, Maria J.",
  ptn: "PTN-2610216",
  referenceNumber: `REF-0004${70 + i}`,
  service: "Vaccination",
  date: "January 13, 2026",
  time: "7:00am – 8:00am",
  category: (["Regular", "Priority", "Walk-in"] as Category[])[i % 3],
  priorityReason: i % 3 === 1 ? "Senior Citizen" : undefined,
}));

const PAGE_SIZE = 8;

const CATEGORY_TAG: Record<Category, string> = {
  Regular: "bg-slate-100 text-slate-600",
  Priority: "bg-amber-100 text-amber-700",
  "Walk-in": "bg-violet-100 text-violet-700",
};

function CategoryTag({ appt }: { appt: Appointment }) {
  const label = appt.category === "Priority" && appt.priorityReason ? appt.priorityReason : appt.category;
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-bold ${CATEGORY_TAG[appt.category]}`}>
      {label}
    </span>
  );
}

function CategoryFilter({
  value,
  onChange,
  options,
}: {
  value: Category | "All";
  onChange: (v: Category | "All") => void;
  options: (Category | "All")[];
}) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {options.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors ${
            value === c ? "border-[#4E69D3] bg-[#4E69D3] text-white" : "border-slate-200 text-slate-500 hover:border-slate-300"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

function matchesSearch(appt: Appointment, query: string) {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    appt.name.toLowerCase().includes(q) ||
    appt.ptn.toLowerCase().includes(q) ||
    appt.referenceNumber.toLowerCase().includes(q)
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[rgba(15,60,95,0.08)] rounded-[24px] mb-7 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)] overflow-hidden">
      <div className="px-6 pt-6">
        <h2 className="text-[24px] text-[#1d4662] m-0 mb-4 font-bold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function TableHead({ columns }: { columns: string[] }) {
  return (
    <thead>
      <tr className="border-y border-slate-100 bg-slate-50 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
        {columns.map((c) => (
          <th key={c} className="px-6 py-3 whitespace-nowrap">{c}</th>
        ))}
      </tr>
    </thead>
  );
}

export default function AdminAppointments() {
  const [upcoming, setUpcoming] = useState<Appointment[]>(initialUpcoming);
  const [notified, setNotified] = useState<Set<string>>(new Set());
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [showAllArchive, setShowAllArchive] = useState(false);
  const [detailsFor, setDetailsFor] = useState<Appointment | null>(null);
  const [archiveOpen, setArchiveOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [todayCategory, setTodayCategory] = useState<Category | "All">("All");
  const [upcomingCategory, setUpcomingCategory] = useState<Category | "All">("All");
  const [archiveCategory, setArchiveCategory] = useState<Category | "All">("All");

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

  const filteredToday = useMemo(
    () => todaySchedule.filter((a) => (todayCategory === "All" || a.category === todayCategory) && matchesSearch(a, search)),
    [todayCategory, search]
  );
  const filteredUpcoming = useMemo(
    () => upcoming.filter((a) => (upcomingCategory === "All" || a.category === upcomingCategory) && matchesSearch(a, search)),
    [upcoming, upcomingCategory, search]
  );
  const filteredArchive = useMemo(
    () => archiveEntries.filter((a) => (archiveCategory === "All" || a.category === archiveCategory) && matchesSearch(a, search)),
    [archiveCategory, search]
  );

  const visibleUpcoming = showAllUpcoming ? filteredUpcoming : filteredUpcoming.slice(0, PAGE_SIZE);
  const visibleArchive = showAllArchive ? filteredArchive : filteredArchive.slice(0, PAGE_SIZE);

  return (
    <div className="flex-1">
      <div className="px-12 pt-5 pb-12">
        <h1 className="text-[32px] text-[#1d4662] my-[14px] text-left font-bold">Appointment Schedule</h1>

        {/* Search (left) + Appointment Archive button (right), same row */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div className="relative max-w-xl flex-1 rounded-lg border border-gray-200 bg-white shadow-sm">
            <input
              type="text"
              placeholder="Search by name, patient number, or reference number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-none outline-none py-3 pl-4 pr-11 text-sm text-[#2A2E43] placeholder:text-slate-400"
            />
            <Search size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <button
            onClick={() => setArchiveOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-[#4E69D3] bg-white px-5 py-3 text-sm font-bold text-[#4E69D3] shadow-sm hover:bg-[#EEF0FB]"
          >
            <Archive size={16} />
            Appointment Archive
          </button>
        </div>

        {/* Today's Schedule */}
        <SectionCard title="Today's Schedule">
          <div className="px-6">
            <CategoryFilter value={todayCategory} onChange={setTodayCategory} options={["All", "Regular", "Priority", "Walk-in"]} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <TableHead columns={["Patient", "Patient No.", "Reference No.", "Service", "Time", "Category", "Actions"]} />
              <tbody>
                {filteredToday.map((appt) => (
                  <tr key={appt.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-semibold text-[#111] whitespace-nowrap">{appt.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{appt.ptn}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{appt.referenceNumber}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{appt.service}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{appt.time}</td>
                    <td className="px-6 py-4"><CategoryTag appt={appt} /></td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => notify(appt)}
                        className={`rounded-md px-4 py-2 text-xs font-bold whitespace-nowrap transition-colors ${
                          notified.has(appt.ptn) ? "bg-green-600 text-white" : "bg-[#4E69D3] text-white hover:bg-[#3D56B8]"
                        }`}
                      >
                        {notified.has(appt.ptn) ? "Sent!" : "Notify"}
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredToday.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-sm text-slate-400">No appointments match your filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Upcoming Appointment — Regular/Priority only, no Walk-in (nothing "upcoming" for same-day walk-ins) */}
        <SectionCard title="Upcoming Appointment">
          <div className="px-6">
            <CategoryFilter value={upcomingCategory} onChange={setUpcomingCategory} options={["All", "Regular", "Priority"]} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <TableHead columns={["Patient", "Patient No.", "Reference No.", "Service", "Date", "Time", "Category", "Actions"]} />
              <tbody>
                {visibleUpcoming.map((appt) => (
                  <tr key={appt.id} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-semibold text-[#111] whitespace-nowrap">{appt.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{appt.ptn}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{appt.referenceNumber}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{appt.service}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{appt.date}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{appt.time}</td>
                    <td className="px-6 py-4"><CategoryTag appt={appt} /></td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => notify(appt)}
                          className={`rounded-md px-3 py-2 text-xs font-bold whitespace-nowrap transition-colors ${
                            notified.has(appt.ptn) ? "bg-green-600 text-white" : "bg-[#4E69D3] text-white hover:bg-[#3D56B8]"
                          }`}
                        >
                          {notified.has(appt.ptn) ? "Sent!" : "Notify"}
                        </button>
                        <button
                          onClick={() => cancelAppointment(appt.id)}
                          className="rounded-md border border-red-600 px-3 py-2 text-xs font-bold whitespace-nowrap text-red-600 hover:bg-red-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUpcoming.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-10 text-center text-sm text-slate-400">No upcoming appointments match your filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {filteredUpcoming.length > PAGE_SIZE && (
            <div className="flex justify-center py-5">
              <button
                onClick={() => setShowAllUpcoming((v) => !v)}
                className="rounded-full bg-[#4E69D3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3D56B8] transition-colors"
              >
                {showAllUpcoming ? "Show Less" : "Show All"}
              </button>
            </div>
          )}
        </SectionCard>
      </div>

      {/* Appointment Archive — modal, opened from the button on the search row */}
      {archiveOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
          <div className="max-h-[85vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-poppins text-2xl font-extrabold text-[#1d4662]">Appointment Archive</h2>
              <button onClick={() => setArchiveOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={22} />
              </button>
            </div>

            <CategoryFilter value={archiveCategory} onChange={setArchiveCategory} options={["All", "Regular", "Priority", "Walk-in"]} />

            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full border-collapse">
                <TableHead columns={["Patient", "Patient No.", "Reference No.", "Service", "Date", "Time", "Category", "Status", "Actions"]} />
                <tbody>
                  {visibleArchive.map((appt) => (
                    <tr key={appt.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-semibold text-[#111] whitespace-nowrap">{appt.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{appt.ptn}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{appt.referenceNumber}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{appt.service}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{appt.date}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{appt.time}</td>
                      <td className="px-6 py-4"><CategoryTag appt={appt} /></td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700 whitespace-nowrap">Completed</span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setDetailsFor(appt)}
                          className="rounded-md border border-[#4E69D3] px-3 py-2 text-xs font-bold whitespace-nowrap text-[#4E69D3] hover:bg-[#EEF0FB]"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredArchive.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-6 py-10 text-center text-sm text-slate-400">No archived appointments match your filters.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {filteredArchive.length > PAGE_SIZE && (
              <div className="flex justify-center pt-5">
                <button
                  onClick={() => setShowAllArchive((v) => !v)}
                  className="rounded-full bg-[#4E69D3] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3D56B8] transition-colors"
                >
                  {showAllArchive ? "Show Less" : "Show All"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {detailsFor && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
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
              <div className="flex justify-between"><dt className="font-semibold">Reference No.</dt><dd>{detailsFor.referenceNumber}</dd></div>
              <div className="flex justify-between"><dt className="font-semibold">Category</dt><dd>{detailsFor.priorityReason ?? detailsFor.category}</dd></div>
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
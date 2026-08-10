// File location: app/admin/patients/page.tsx
"use client";

import { Search, FileText } from "lucide-react";
import { useMemo, useState } from "react";
import { useAdminData, type MedUser } from "@/app/admin/AdminDataContext";
import PatientRecordView, { type PatientRecord } from "@/app/admin/PatientRecordView";

// TODO: once you have a real patient-record API, fetch full clinical details
// by id instead of deriving a placeholder record from the users list.
function toPatientRecord(user: MedUser): PatientRecord {
  const [lastName, rest] = user.name.split(",").map((s) => s.trim());
  const [givenName, ...middleParts] = (rest ?? user.name).split(" ");
  return {
    ptn: `USR-${user.email.length}${user.joined.replace(/-/g, "")}`,
    lastName: lastName ?? user.name,
    givenName: givenName ?? "",
    middleName: middleParts.join(" "),
    role: user.role,
  };
}

export default function PatientListPage() {
  const { users } = useAdminData();
  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState<MedUser | null>(null);

  const patients = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter((u) => {
      if (u.tab !== "patient") return false;
      if (q && !u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [users, search]);

  return (
    <div className="flex-1">
      <div className="px-12 pt-5 pb-12">
        <h1 className="mb-1 font-poppins text-[32px] font-bold text-[#1d1d1d]">Patient List</h1>
        <p className="mb-6 text-sm text-slate-500">All registered patient accounts.</p>

        {/*
          TODO: this page is a placeholder — waiting on the detailed spec
          for exactly what admins should see/do here beyond a basic list.
        */}

        <div className="relative mb-5 max-w-md rounded-lg border border-gray-200 bg-gray-50">
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-none outline-none py-3 pl-4 pr-11 text-sm text-[#2A2E43] placeholder:text-slate-400"
          />
          <Search size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="rounded-2xl border border-[rgba(15,60,95,0.08)] bg-white overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-slate-500 border-b border-slate-100">
                <th className="px-5 py-4 font-semibold">Name</th>
                <th className="px-5 py-4 font-semibold">Email</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Joined</th>
                <th className="px-5 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.email} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="px-5 py-4 text-sm font-semibold text-[#111]">{p.name}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{p.email}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-emerald-500">{p.status}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{p.joined}</td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => setViewing(p)}
                      className="flex items-center gap-1.5 rounded-lg border border-sky-300 px-3 py-1.5 text-xs font-bold text-sky-600 hover:bg-sky-50"
                    >
                      <FileText size={14} />
                      View Record
                    </button>
                  </td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-400">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {viewing && <PatientRecordView patient={toPatientRecord(viewing)} onClose={() => setViewing(null)} />}
    </div>
  );
}
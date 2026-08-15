// File location: admin_view/admin_requests.tsx
"use client";

import { Eye, Check, X, CheckCheck } from "lucide-react";
import { useDarkMode } from "@/app/staff/DarkModeContext";
import { useMemo, useState } from "react";
import PatientRecordView, { type PatientRecord } from "@/app/admin/PatientRecordView";
import { useAdminData, type ApprovalRequest } from "@/app/admin/AdminDataContext";

const STATUS_TEXT: Record<string, string> = {
  Pending: "text-amber-500",
  Accepted: "text-emerald-500",
  Rejected: "text-red-500",
};

// TODO: once you have a real patient record API, fetch by request.id instead
// of deriving a placeholder record from the name/email in the request row.
function toPatientRecord(request: ApprovalRequest): PatientRecord {
  const [lastName, rest] = request.name.split(",").map((s) => s.trim());
  const [givenName, ...middleParts] = (rest ?? "").split(" ");
  return {
    ptn: `PTN-${request.id.padStart(7, "0")}`,
    lastName: lastName ?? request.name,
    givenName: givenName ?? "",
    middleName: middleParts.join(" "),
    role: "Patient",
  };
}

export default function AdminApprovalRequest() {
  const { darkMode } = useDarkMode();
  const { requests, acceptRequest, rejectRequest, acceptRequests, rejectRequests } = useAdminData();
  const [viewing, setViewing] = useState<ApprovalRequest | null>(null);

  // Strict FIFO: oldest submission first, regardless of status, so the
  // queue order never shuffles as items get accepted/rejected.
  const ordered = useMemo(() => [...requests].sort((a, b) => a.createdAt - b.createdAt), [requests]);

  const pendingIds = ordered.filter((r) => r.status === "Pending").map((r) => r.id);

  return (
    <div className={`flex-1 ${darkMode ? "bg-[#050617]/40" : ""}`}>
      <div className="px-12 pt-5 pb-12">
        <h1 className={`text-[32px] ${darkMode ? "text-[#F9FAFB]" : "text-[#1d1d1d]"} my-[14px] text-left font-poppins font-bold`}>
          Approval Request
        </h1>
        <p className={`mb-4 text-sm ${darkMode ? "text-gray-400" : "text-slate-500"}`}>
          Patient sign-up requests, processed first-in first-out.
        </p>

        <div className={`rounded-2xl border p-6 ${darkMode ? "bg-[rgba(45,27,78,0.65)] border-[rgba(255,255,255,0.10)]" : "bg-white border-[rgba(15,60,95,0.08)]"}`}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h2 className={`text-lg font-bold ${darkMode ? "text-[#F9FAFB]" : "text-[#1d1d1d]"}`}>Patient Approval Request</h2>

            <div className="flex items-center gap-3">
              <button
                onClick={() => acceptRequests(pendingIds)}
                disabled={pendingIds.length === 0}
                className="flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <CheckCheck size={16} />
                Accept All
              </button>
              <button
                onClick={() => rejectRequests(pendingIds)}
                disabled={pendingIds.length === 0}
                className="flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <X size={16} />
                Reject All
              </button>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className={`text-left text-sm ${darkMode ? "text-gray-400 border-b border-[rgba(255,255,255,0.10)]" : "text-slate-500 border-b border-slate-100"}`}>
                <th className="py-3 pr-4 font-semibold">#</th>
                <th className="py-3 pr-4 font-semibold">Name</th>
                <th className="py-3 pr-4 font-semibold">Email</th>
                <th className="py-3 pr-4 font-semibold">Status</th>
                <th className="py-3 pr-4 font-semibold">Submitted</th>
                <th className="py-3 pr-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ordered.map((req, index) => (
                <tr key={req.id} className={`${darkMode ? "border-b border-[rgba(255,255,255,0.05)] hover:bg-[#2d1b4e]/50" : "border-b border-slate-50 hover:bg-slate-50"}`}>
                  <td className={`py-4 pr-4 text-sm font-semibold ${darkMode ? "text-gray-500" : "text-slate-400"}`}>{index + 1}</td>
                  <td className={`py-4 pr-4 text-sm font-semibold ${darkMode ? "text-[#F9FAFB]" : "text-[#111]"}`}>{req.name}</td>
                  <td className={`py-4 pr-4 text-sm ${darkMode ? "text-gray-400" : "text-slate-600"}`}>{req.email}</td>
                  <td className={`py-4 pr-4 text-sm font-semibold ${STATUS_TEXT[req.status]}`}>{req.status}</td>
                  <td className={`py-4 pr-4 text-sm ${darkMode ? "text-gray-400" : "text-slate-600"}`}>{req.joined}</td>
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2">
                      <button
                        title="View patient record"
                        onClick={() => setViewing(req)}
                        className={darkMode ? "text-gray-300 hover:text-[#2ea3e6]" : "text-slate-600 hover:text-[#2ea3e6]"}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        title="Accept"
                        onClick={() => acceptRequest(req.id)}
                        disabled={req.status !== "Pending"}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        title="Reject"
                        onClick={() => rejectRequest(req.id)}
                        disabled={req.status !== "Pending"}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {ordered.length === 0 && (
                <tr>
                  <td colSpan={6} className={`py-10 text-center text-sm ${darkMode ? "text-gray-500" : "text-slate-400"}`}>
                    No pending requests.
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
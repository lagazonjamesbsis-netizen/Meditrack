// File location: admin_view/admin_users.tsx
"use client";

import { Search, Plus, ChevronDown, Eye, ShieldCheck, MoreVertical, X } from "lucide-react";
import { useDarkMode } from "@/app/meditrack/DarkModeContext";
import { useMemo, useState } from "react";
import PatientRecordView, { type PatientRecord } from "@/app/admin/PatientRecordView";
import { useAdminData, type MedUser, type UserTab } from "@/app/admin/AdminDataContext";

const STAFF_ROLES = ["Nurse", "Midwife", "BHW", "Doctor", "Admin"];
const PATIENT_ROLES = ["Patient"];

const STATUS_TEXT: Record<string, string> = {
  Active: "text-emerald-500",
  Inactive: "text-slate-400",
  Pending: "text-amber-500",
};

// TODO: once you have a real user-record API, fetch full details by email/id
// instead of deriving a placeholder record from the row's name and role.
function toPatientRecord(user: MedUser): PatientRecord {
  const [lastName, rest] = user.name.split(",").map((s) => s.trim());
  const [givenName, ...middleParts] = (rest ?? user.name).split(" ");
  return {
    ptn: `USR-${user.email.length}${user.joined.replace(/-/g, "")}`,
    lastName: lastName ?? user.name,
    givenName: givenName ?? "",
    middleName: middleParts.join(" "),
    role: user.role,
    contactNo: "",
  };
}

export default function AdminUsers() {
  const { darkMode } = useDarkMode();
  const { users, addPendingUser } = useAdminData();
  const [activeTab, setActiveTab] = useState<UserTab>("patient");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "", tab: "patient" as UserTab });
  const [formError, setFormError] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("");
  const [viewing, setViewing] = useState<MedUser | null>(null);

  const roleOptions = ["All Roles", ...(activeTab === "staff" ? STAFF_ROLES : PATIENT_ROLES)];

  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (u.tab !== activeTab) return false;
      if (roleFilter !== "All Roles" && u.role !== roleFilter) return false;
      const q = search.toLowerCase();
      if (q && !u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [users, activeTab, roleFilter, search]);

  function openAddModal() {
    setForm({ name: "", email: "", role: activeTab === "staff" ? STAFF_ROLES[0] : PATIENT_ROLES[0], tab: activeTab });
    setFormError("");
    setAddOpen(true);
  }

  function submitAdd() {
    const result = addPendingUser(form);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    setAddOpen(false);
    setConfirmMsg(`Request sent for ${form.name} — awaiting approval.`);
    setTimeout(() => setConfirmMsg(""), 3000);
  }

  return (
    <div className={`flex-1 ${darkMode ? "bg-[#050617]/40" : ""}`}>
      <div className="px-12 pt-5 pb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 my-[14px]">
          <div className="flex items-center gap-6">
            <h1 className={`text-[32px] ${darkMode ? "text-[#F9FAFB]" : "text-[#1d1d1d]"} font-poppins font-bold`}>
              User Management
            </h1>

            <div className="flex items-center gap-2">
              <TabButton
                label="Staff"
                active={activeTab === "staff"}
                darkMode={darkMode}
                onClick={() => {
                  setActiveTab("staff");
                  setRoleFilter("All Roles");
                }}
              />
              <TabButton
                label="Patient"
                active={activeTab === "patient"}
                darkMode={darkMode}
                onClick={() => {
                  setActiveTab("patient");
                  setRoleFilter("All Roles");
                }}
              />
            </div>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 rounded-lg bg-[#2ea3e6] px-5 py-3 text-sm font-semibold text-white hover:bg-[#238fc9]"
          >
            <Plus size={16} />
            Add Users
          </button>
        </div>

        {confirmMsg && (
          <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            {confirmMsg} Check <span className="underline">Approval Requests</span> to accept or reject it.
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className={`relative flex-1 min-w-[240px] rounded-lg border ${darkMode ? "bg-[#2d1b4e] border-[rgba(255,255,255,0.10)]" : "bg-gray-50 border-gray-200"}`}>
            <input
              type="text"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full bg-transparent border-none outline-none py-3 pl-4 pr-11 text-sm ${darkMode ? "text-[#F9FAFB] placeholder:text-gray-500" : "text-[#2A2E43] placeholder:text-slate-400"}`}
            />
            <Search size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className={`appearance-none rounded-lg border py-3 pl-4 pr-9 text-sm font-medium outline-none ${
                darkMode
                  ? "bg-[#2d1b4e] border-[rgba(255,255,255,0.10)] text-[#F9FAFB]"
                  : "bg-white border-gray-200 text-[#2A2E43]"
              }`}
            >
              {roleOptions.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className={`rounded-2xl border overflow-hidden ${darkMode ? "bg-[rgba(45,27,78,0.65)] border-[rgba(255,255,255,0.10)]" : "bg-white border-[rgba(15,60,95,0.08)]"}`}>
          <table className="w-full">
            <thead>
              <tr className={`text-left text-sm ${darkMode ? "text-gray-400 border-b border-[rgba(255,255,255,0.10)]" : "text-slate-500 border-b border-slate-100"}`}>
                <th className="px-5 py-4 font-semibold">Name</th>
                <th className="px-5 py-4 font-semibold">Email</th>
                <th className="px-5 py-4 font-semibold">Role</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Joined</th>
                <th className="px-5 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.email} className={`${darkMode ? "border-b border-[rgba(255,255,255,0.05)] hover:bg-[#2d1b4e]/50" : "border-b border-slate-50 hover:bg-slate-50"}`}>
                  <td className={`px-5 py-4 text-sm font-semibold ${darkMode ? "text-[#F9FAFB]" : "text-[#111]"}`}>{user.name}</td>
                  <td className={`px-5 py-4 text-sm ${darkMode ? "text-gray-400" : "text-slate-600"}`}>{user.email}</td>
                  <td className={`px-5 py-4 text-sm ${darkMode ? "text-gray-300" : "text-slate-700"}`}>{user.role}</td>
                  <td className={`px-5 py-4 text-sm font-semibold ${STATUS_TEXT[user.status]}`}>{user.status}</td>
                  <td className={`px-5 py-4 text-sm ${darkMode ? "text-gray-400" : "text-slate-600"}`}>{user.joined}</td>
                  <td className="px-5 py-4">
                    <div className={`flex items-center gap-3 ${darkMode ? "text-gray-300" : "text-slate-700"}`}>
                      <button title="View" onClick={() => setViewing(user)} className="hover:text-[#2ea3e6]"><Eye size={18} /></button>
                      <button title="Permissions" className="hover:text-[#2ea3e6]"><ShieldCheck size={18} /></button>
                      <div className="relative">
                        <button
                          title="More"
                          onClick={() => setOpenMenu(openMenu === user.email ? null : user.email)}
                          className="hover:text-[#2ea3e6]"
                        >
                          <MoreVertical size={18} />
                        </button>
                        {openMenu === user.email && (
                          <div className={`absolute right-0 top-6 z-10 w-36 rounded-lg border py-1 shadow-lg ${darkMode ? "bg-[#2d1b4e] border-[rgba(255,255,255,0.10)]" : "bg-white border-slate-100"}`}>
                            <MenuItem label="Edit user" darkMode={darkMode} />
                            <MenuItem label="Deactivate" darkMode={darkMode} />
                            <MenuItem label="Remove" darkMode={darkMode} danger />
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className={`px-5 py-10 text-center text-sm ${darkMode ? "text-gray-500" : "text-slate-400"}`}>
                    No {activeTab === "staff" ? "staff" : "patients"} match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Add User</h3>
              <button onClick={() => setAddOpen(false)} className="text-slate-400">
                <X size={20} />
              </button>
            </div>

            <p className="mb-4 text-xs text-slate-500">
              This creates a pending request in <span className="font-semibold">Approval Requests</span> — the account is only activated once accepted there.
            </p>

            <div className="mb-3 flex gap-2">
              {(["staff", "patient"] as UserTab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setForm((f) => ({ ...f, tab: t, role: t === "staff" ? STAFF_ROLES[0] : PATIENT_ROLES[0] }))}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold capitalize ${
                    form.tab === t ? "border-sky-400 bg-sky-50 text-sky-600" : "border-slate-200 text-slate-500"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <label className="mb-1 block text-xs font-semibold text-slate-500">Full Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Dela Cruz, Juan"
              className="mb-3 w-full rounded-lg border border-slate-200 bg-gray-50 px-3 py-2 text-sm text-slate-800 outline-none"
            />

            <label className="mb-1 block text-xs font-semibold text-slate-500">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="name@example.com"
              className="mb-3 w-full rounded-lg border border-slate-200 bg-gray-50 px-3 py-2 text-sm text-slate-800 outline-none"
            />

            <label className="mb-1 block text-xs font-semibold text-slate-500">Role</label>
            <div className="relative mb-4">
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full appearance-none rounded-lg border border-slate-200 bg-gray-50 px-3 py-2 text-sm text-slate-800 outline-none"
              >
                {(form.tab === "staff" ? STAFF_ROLES : PATIENT_ROLES).map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            {formError && <p className="mb-3 text-xs font-semibold text-red-500">{formError}</p>}

            <button onClick={submitAdd} className="w-full rounded-lg bg-sky-500 py-2.5 text-sm font-bold text-white hover:bg-sky-600">
              Submit for Approval
            </button>
          </div>
        </div>
      )}

      {viewing && <PatientRecordView patient={toPatientRecord(viewing)} onClose={() => setViewing(null)} />}
    </div>
  );
}

function TabButton({
  label,
  active,
  darkMode,
  onClick,
}: {
  label: string;
  active: boolean;
  darkMode: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-lg px-5 py-1.5 text-lg font-bold transition border",
        active
          ? darkMode
            ? "border-[rgba(255,255,255,0.3)] text-[#F9FAFB]"
            : "border-gray-300 text-[#1d1d1d]"
          : "border-transparent text-gray-400 hover:text-gray-500",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function MenuItem({ label, danger = false, darkMode }: { label: string; danger?: boolean; darkMode: boolean }) {
  return (
    <button
      type="button"
      className={`block w-full px-4 py-2 text-left text-sm ${
        darkMode ? "hover:bg-[#3a2464]" : "hover:bg-slate-50"
      } ${danger ? "text-red-500" : darkMode ? "text-[#F9FAFB]" : "text-slate-700"}`}
    >
      {label}
    </button>
  );
}
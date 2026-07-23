"use client";

import { Bell, Search, UserRound, Users, ChevronDown } from "lucide-react";
import { useDarkMode } from "@/app/meditrack/DarkModeContext";
import { useState } from "react";

const usersData = [
  { name: "Alan P. Edwards", email: "alan.edwards@email.com", role: "Patient", status: "Active" },
  { name: "Doreen C. Ryan", email: "doreen.ryan@email.com", role: "Patient", status: "Active" },
  { name: "Jessa A. Santos", email: "jessa.santos@email.com", role: "Patient", status: "Active" },
  { name: "Dr. Nina Kelly", email: "nina.kelly@email.com", role: "Doctor", status: "Active" },
  { name: "Dr. Amir Sayed", email: "amir.sayed@email.com", role: "Doctor", status: "Active" },
  { name: "Dr. Hannah James", email: "hannah.james@email.com", role: "Doctor", status: "Active" },
  { name: "Dr. Arthur Gates", email: "arthur.gates@email.com", role: "Doctor", status: "Active" },
  { name: "Admin User", email: "admin@domain.com", role: "Admin", status: "Active" },
];

export default function AdminUsers() {
  const { darkMode } = useDarkMode();
  const [search, setSearch] = useState("");

  const filtered = usersData.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

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
            User Management
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <div className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border ${darkMode ? "bg-[#2d1b4e] border-[rgba(255,255,255,0.10)]" : "bg-white border-slate-200"} flex-1 max-w-md`}>
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`bg-transparent border-none outline-none flex-1 text-sm ${darkMode ? "text-[#F9FAFB] placeholder:text-gray-500" : "text-[#2A2E43] placeholder:text-slate-400"}`}
              />
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-[#4E69D3] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3D56B8]">
              <Users size={16} />
              Add User
            </button>
          </div>

          <div className={`rounded-2xl border overflow-hidden ${darkMode ? "bg-[rgba(45,27,78,0.65)] border-[rgba(255,255,255,0.10)]" : "bg-white/65 border-[rgba(15,60,95,0.08)]"}`}>
            <table className="w-full">
              <thead>
                <tr className={`text-left text-sm font-bold ${darkMode ? "text-gray-400 border-b border-[rgba(255,255,255,0.10)]" : "text-slate-500 border-b border-slate-200"}`}>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Role</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.email} className={`${darkMode ? "border-b border-[rgba(255,255,255,0.05)] hover:bg-[#2d1b4e]/50" : "border-b border-slate-100 hover:bg-slate-50"}`}>
                    <td className={`px-5 py-4 text-sm font-semibold ${darkMode ? "text-[#F9FAFB]" : "text-[#2A2E43]"}`}>{user.name}</td>
                    <td className={`px-5 py-4 text-sm ${darkMode ? "text-gray-400" : "text-slate-500"}`}>{user.email}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                        user.role === "Doctor" ? "bg-cyan-100 text-cyan-700" :
                        user.role === "Admin" ? "bg-violet-100 text-violet-700" :
                        "bg-sky-100 text-sky-700"
                      }`}>{user.role}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">{user.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

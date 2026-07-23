"use client";

import {
  Activity,
  Bell,
  CalendarCheck,
  ClipboardList,
  HeartPulse,
  LayoutDashboard,
  Plus,
  UserRound,
  Users,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDarkMode } from "@/app/meditrack/DarkModeContext";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Analytics", icon: Activity, href: "/admin/analytics" },
  { label: "User management", icon: Users, href: "/admin/users" },
  { label: "Appointment requests", icon: CalendarCheck, href: "/admin/requests" },
  { label: "Events & services", icon: HeartPulse, href: "/admin/events" },
  { label: "Appointment schedule", icon: ClipboardList, href: "/admin/appointments" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <div className={`flex min-h-screen ${darkMode ? "bg-gradient-to-b from-[#050617] to-[#050617]" : "bg-gradient-to-b from-violet-300 to-white"}`}>
      <style>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #e0e0e0; border-radius: 3px; }
        ::-webkit-scrollbar-thumb { background: #aaa; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #888; }
        * { scrollbar-width: thin; scrollbar-color: #aaa #e0e0e0; }
      `}</style>

      <aside className={`w-[400px] ${darkMode ? "bg-[#050617] border-[rgba(255,255,255,0.08)]" : "bg-[#F9F9F9] border-[rgba(15,60,95,0.12)]"} border-r fixed top-0 left-0 h-screen flex flex-col gap-5 pt-8 pb-6 px-5 shadow-[0_24px_60px_rgba(15,60,95,0.12)] overflow-hidden`}>
        <div className="flex items-center gap-3 pl-4">
          <div className="relative flex w-[68px] h-[68px] items-center justify-center flex-shrink-0">
            <Plus className="absolute h-14 w-14 text-cyan-500" strokeWidth={4} />
            <HeartPulse className="z-10 h-6 w-6 text-white" fill="currentColor" />
          </div>
          <div>
            <h1 className={`font-bebas text-[50px] leading-none m-0 ${darkMode ? "text-[#F9FAFB]" : "text-[#0F588B]"}`}>MEDITRACK</h1>
            <p className={`font-asap text-[17px] tracking-[2px] leading-none -mt-1.5 ${darkMode ? "text-[#F9FAFB]" : "text-[#0F588B]"}`}>Stay On Track With Us</p>
          </div>
        </div>

        <nav className="flex-1 mt-2">
          <p className="font-poppins text-[13px] font-bold text-gray-400 uppercase tracking-[1px] mb-2 pl-3">Menu</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3.5 px-4 py-3.5 no-underline font-poppins text-[17px] text-left rounded-[10px] transition-colors duration-300 ${
                  active
                    ? darkMode
                      ? "bg-[#2d1b4e] text-white font-bold"
                      : "bg-[#ddd6fe] text-[#4E69D3] font-bold"
                    : darkMode
                      ? "text-[#F9FAFB] hover:bg-[#050617]/50"
                      : "text-[#2A2E43] hover:bg-[#E8E8E8]/50"
                }`}
              >
                <span className="inline-flex items-center justify-center w-[44px] h-[44px] flex-shrink-0">
                  <Icon size={28} />
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={`border-t pt-3 mt-auto ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className={`flex items-center justify-between px-4 py-3 rounded-[10px] transition-colors cursor-pointer ${darkMode ? "hover:bg-[#050617]/50" : "hover:bg-[#E8E8E8]/50"}`}>
            <div className="flex items-center gap-3.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-5 h-5 ${darkMode ? "text-[#F9FAFB]" : "text-gray-500"}`}>
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
              <span className={`font-poppins text-sm font-semibold ${darkMode ? "text-gray-200" : "text-[#2A2E43]"}`}>Dark Mode</span>
            </div>
            <label className="relative inline-block w-[38px] h-5 cursor-pointer">
              <input type="checkbox" className="opacity-0 w-0 h-0 peer" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
              <span className="absolute inset-0 bg-gray-300 rounded-full transition-colors peer-checked:bg-[#4E69D3] after:content-[''] after:absolute after:h-4 after:w-4 after:left-[2px] after:bottom-[2px] after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-[18px]" />
            </label>
          </div>
        </div>
      </aside>

      <main className="flex-1 ml-[400px] flex flex-col">
        {children}
      </main>
    </div>
  );
}

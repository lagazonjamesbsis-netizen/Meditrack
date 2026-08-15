// File location: admin_view/admin_layout.tsx
"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDarkMode } from "@/app/staff/DarkModeContext";
import AdminTopBar from "@/app/admin/AdminTopBar";
import { CurrentUserProvider } from "@/app/admin/CurrentUserContext";
import { AdminDataProvider } from "@/app/admin/AdminDataContext";

const navItems = [
  { label: "Dashboard", icon: "/dashboard.png", href: "/admin" },
  { label: "Analytics", icon: "/analytics.png", href: "/admin/analytics" },
  { label: "User management", icon: "/user-management.png", href: "/admin/users" },
  { label: "Patient list", icon: "/icon-patients.png", href: "/admin/patients" },
  { label: "Approval requests", icon: "/approval-request.png", href: "/admin/requests" },
  { label: "Events & services", icon: "/events-services.png", href: "/admin/events" },
  { label: "Appointment schedule", icon: "/appointment-schedule.png", href: "/admin/appointments" },
  { label: "Queuing", icon: "/icon-calendar.png", href: "/admin/queuing" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { darkMode } = useDarkMode();

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
            <img src="/meditrack-logo.png" alt="MediTrack" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className={`font-bebas text-[50px] leading-none m-0 ${darkMode ? "text-[#F9FAFB]" : "text-[#0F588B]"}`}>MEDITRACK</h1>
            <p className={`font-asap text-[17px] tracking-[2px] leading-none -mt-1.5 ${darkMode ? "text-[#F9FAFB]" : "text-[#0F588B]"}`}>Stay On Track With Us</p>
          </div>
        </div>

        <nav className="flex-1 mt-2 overflow-y-auto">
          <p className="font-poppins text-[13px] font-bold text-gray-400 uppercase tracking-[1px] mb-2 pl-3">Menu</p>
          {navItems.map((item) => {
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
                  <img src={item.icon} alt="" className="h-7 w-7 object-contain" />
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/*
          The Dark Mode toggle that used to live here has moved into the
          account dropdown (AdminTopBar) so there's a single source of truth
          instead of two toggles that could get out of sync.
        */}
      </aside>

      <CurrentUserProvider>
        <AdminDataProvider>
          <main className="flex-1 ml-[400px] flex flex-col">
            <AdminTopBar />
            {children}
          </main>
        </AdminDataProvider>
      </CurrentUserProvider>
    </div>
  );
}
// File location: app/admin/settings/page.tsx
"use client";

import { Bell, Eye, HelpCircle, Info, Lock, LogOut, MessageSquare, Monitor, Moon, Pencil, ScrollText, Shield, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDarkMode } from "@/app/meditrack/DarkModeContext";
import { useCurrentUser } from "@/app/admin/CurrentUserContext";

type SettingsTab =
  | "account"
  | "notifications"
  | "darkmode"
  | "privacy"
  | "display"
  | "contact"
  | "feedback"
  | "terms"
  | "help"
  | "about";

const NAV_ITEMS: { key: SettingsTab; label: string; icon: typeof User }[] = [
  { key: "account", label: "Account Management", icon: User },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "darkmode", label: "Dark Mode", icon: Moon },
  { key: "privacy", label: "Privacy and Security", icon: Shield },
  { key: "display", label: "Display Settings", icon: Monitor },
  { key: "contact", label: "Contact", icon: MessageSquare },
  { key: "feedback", label: "Feedback", icon: MessageSquare },
  { key: "terms", label: "Terms and Conditions", icon: ScrollText },
  { key: "help", label: "Help and Support", icon: HelpCircle },
  { key: "about", label: "About Us", icon: Info },
];

function Placeholder({ title }: { title: string }) {
  return (
    <div className="py-16 text-center">
      <p className="text-lg font-bold text-slate-700">{title}</p>
      <p className="mt-1 text-sm text-slate-400">This section is coming soon.</p>
    </div>
  );
}

export default function AccountSettingsPage() {
  const { darkMode, setDarkMode } = useDarkMode();
  const { user } = useCurrentUser();
  const router = useRouter();
  const [tab, setTab] = useState<SettingsTab>("account");
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);

  function handleLogout() {
    // TODO: wire this to your real sign-out flow
    router.push("/login");
  }

  function saveAccount() {
    // TODO: call your update-account API here, e.g.
    // await fetch("/api/admin/account", { method: "PATCH", body: JSON.stringify({ name, email }) });
    setEditing(false);
  }

  return (
    <div className="flex-1">
      <div className="px-12 pt-5 pb-12">
        <h1 className="mb-6 font-poppins text-[32px] font-bold text-[#1d1d1d] dark:text-[#F9FAFB]">Account Settings</h1>

        <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
          <nav className="h-fit rounded-2xl border border-slate-200 dark:border-[rgba(255,255,255,0.10)] bg-white dark:bg-[#2d1b4e] p-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = tab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setTab(item.key)}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold font-poppins ${
                    active ? "border border-slate-800 text-slate-800 dark:text-[#F9FAFB] dark:border-[rgba(255,255,255,0.30)]" : "text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-[#3a2464]"
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
            <div className="my-2 border-t border-slate-100" />
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-bold text-red-500 hover:bg-red-50"
            >
              <LogOut size={16} />
              Log Out
            </button>
          </nav>

          <div className="rounded-2xl border border-slate-200 dark:border-[rgba(255,255,255,0.10)] bg-white dark:bg-[#2d1b4e] p-6">
            {tab === "account" && (
              <>
                <div className="mb-1 flex items-center justify-between">
                  <h2 className="font-poppins text-xl font-extrabold text-slate-800 dark:text-[#F9FAFB]">Account Management</h2>
                  {!editing && (
                    <button
                      onClick={() => setEditing(true)}
                      className="flex items-center gap-2 rounded-lg bg-[#4E69D3] px-4 py-2.5 text-[13px] font-semibold font-poppins text-white hover:bg-[#3D56B8]"
                    >
                      <Pencil size={14} /> Edit
                    </button>
                  )}
                </div>
                <p className="mb-6 text-sm text-slate-500">Manage your account details including your name, email, and role.</p>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.5px] font-poppins text-slate-400 dark:text-gray-400">Name</div>
                    {editing ? (
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-200 dark:border-[rgba(255,255,255,0.10)] px-3 py-2.5 text-[13px] font-poppins font-bold text-slate-800 dark:text-[#F9FAFB] outline-none focus:border-[#4E69D3]"
                      />
                    ) : (
                      <div className="mt-1 font-poppins text-sm font-bold text-slate-800 dark:text-[#F9FAFB]">{name}</div>
                    )}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.5px] font-poppins text-slate-400 dark:text-gray-400">Email</div>
                    {editing ? (
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-slate-200 dark:border-[rgba(255,255,255,0.10)] px-3 py-2.5 text-[13px] font-poppins font-bold text-slate-800 dark:text-[#F9FAFB] outline-none focus:border-[#4E69D3]"
                      />
                    ) : (
                      <div className="mt-1 font-poppins text-sm font-bold text-slate-800 dark:text-[#F9FAFB]">{email}</div>
                    )}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.5px] font-poppins text-slate-400 dark:text-gray-400">Role</div>
                    <div className="mt-1 font-poppins text-sm font-bold text-slate-800 dark:text-[#F9FAFB]">{user.role}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.5px] font-poppins text-slate-400 dark:text-gray-400">Employee ID</div>
                    <div className="mt-1 font-poppins text-sm font-bold text-slate-800 dark:text-[#F9FAFB]">{user.id}</div>
                  </div>
                </div>

                {editing && (
                  <div className="mt-6 flex gap-3 border-t border-slate-100 pt-5">
                    <button onClick={saveAccount} className="rounded-lg bg-[#4E69D3] px-5 py-2.5 text-[13px] font-semibold font-poppins text-white hover:bg-[#3D56B8]">
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setName(user.fullName);
                        setEmail(user.email);
                        setEditing(false);
                      }}
                      className="rounded-lg border border-slate-200 dark:border-[rgba(255,255,255,0.10)] px-5 py-2.5 text-[13px] font-semibold font-poppins text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-[#3a2464]"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                  <span className="font-poppins text-sm font-bold text-slate-700 dark:text-gray-300">Change Password</span>
                  <button className="flex items-center gap-2 rounded-lg border border-[#4E69D3] px-4 py-2.5 text-[13px] font-semibold font-poppins text-[#4E69D3] hover:bg-[#EEF0FB]">
                    <Lock size={14} /> Change Password
                  </button>
                </div>
              </>
            )}

            {tab === "notifications" && <Placeholder title="Notifications" />}

            {tab === "darkmode" && (
              <div>
                <h2 className="mb-1 font-poppins text-xl font-extrabold text-slate-800 dark:text-[#F9FAFB]">Dark Mode</h2>
                <p className="mb-6 font-poppins text-sm text-slate-500 dark:text-gray-400">Switch between light and dark appearance across the app.</p>
                <div className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-[rgba(255,255,255,0.10)] px-4 py-3">
                  <span className="flex items-center gap-2 font-poppins text-sm font-semibold text-slate-700 dark:text-gray-300">
                    <Moon size={16} /> Dark Mode
                  </span>
                  <label className="relative inline-block h-5 w-[38px] cursor-pointer">
                    <input type="checkbox" className="peer h-0 w-0 opacity-0" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                    <span className="absolute inset-0 rounded-full bg-gray-300 transition-colors after:absolute after:bottom-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform after:content-[''] peer-checked:bg-[#4E69D3] peer-checked:after:translate-x-[18px]" />
                  </label>
                </div>
              </div>
            )}

            {tab === "privacy" && <Placeholder title="Privacy and Security" />}
            {tab === "display" && <Placeholder title="Display Settings" />}
            {tab === "contact" && <Placeholder title="Contact" />}
            {tab === "feedback" && <Placeholder title="Feedback" />}
            {tab === "terms" && <Placeholder title="Terms and Conditions" />}
            {tab === "help" && <Placeholder title="Help and Support" />}
            {tab === "about" && <Placeholder title="About Us" />}
          </div>
        </div>
      </div>
    </div>
  );
}
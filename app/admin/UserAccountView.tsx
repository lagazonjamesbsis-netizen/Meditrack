// File location: app/admin/UserAccountView.tsx
"use client";

import { Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import type { MedUser } from "@/app/admin/AdminDataContext";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</div>
      <div className="text-sm text-slate-700">{value}</div>
    </div>
  );
}

export default function UserAccountView({ user, onClose }: { user: MedUser; onClose: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const idLabel = user.tab === "patient" ? "Patient ID" : "Medical Staff ID";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Account Details</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          <Field label="Name" value={user.name} />
          <Field label="Email" value={user.email} />
          <Field label="Username" value={user.username} />

          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Password</div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">{showPassword ? user.password : "••••••••"}</span>
              <button onClick={() => setShowPassword((v) => !v)} className="text-slate-400 hover:text-slate-600">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Field label={idLabel} value={user.accountId} />
          <Field label="Role" value={user.role} />
        </div>

        <p className="mt-4 text-[11px] text-slate-400">
          Temporary demo credentials shown for reference only — not a real authentication system.
        </p>
      </div>
    </div>
  );
}
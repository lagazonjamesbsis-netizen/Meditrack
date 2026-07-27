// File location: app/admin/profile/page.tsx
"use client";

import { ChevronDown, Save, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useCurrentUser, type PersonalInfo } from "@/app/admin/CurrentUserContext";

function Field({
  label,
  value,
  onChange,
  required = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-bold uppercase tracking-[0.5px] font-poppins text-slate-500 dark:text-gray-400">
        {label}
        {required && "*"}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 dark:border-[rgba(255,255,255,0.10)] bg-white dark:bg-[#2d1b4e] px-3 py-2.5 text-[13px] font-poppins text-slate-800 dark:text-[#F9FAFB] outline-none focus:border-[#4E69D3]"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-bold uppercase tracking-[0.5px] font-poppins text-slate-500 dark:text-gray-400">
        {label}
        {required && "*"}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-slate-200 dark:border-[rgba(255,255,255,0.10)] bg-white dark:bg-[#2d1b4e] px-3 py-2.5 text-[13px] font-poppins text-slate-800 dark:text-[#F9FAFB] outline-none focus:border-[#4E69D3]"
        >
          <option value="">Select</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { user, updatePersonal } = useCurrentUser();
  const [form, setForm] = useState<PersonalInfo>(user.personal);
  const [savedMsg, setSavedMsg] = useState(false);

  // Keep the local form in sync if the underlying user data changes elsewhere
  useEffect(() => {
    setForm(user.personal);
  }, [user.personal]);

  function set<K extends keyof PersonalInfo>(key: K, value: PersonalInfo[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    updatePersonal(form);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  }

  return (
    <div className="flex-1">
      <div className="px-12 pt-5 pb-12">
        <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
          {/* Left card: identity summary, matches the MY PROFILE screenshot */}
          <div className="h-fit rounded-2xl border border-slate-200 dark:border-[rgba(255,255,255,0.10)] bg-white dark:bg-[#2d1b4e] p-6 text-center">
            <h2 className="mb-5 font-poppins text-2xl font-extrabold text-slate-700 dark:text-[#F9FAFB]">MY PROFILE</h2>
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-slate-800 dark:border-[rgba(255,255,255,0.30)]">
              <UserRound size={44} className="text-slate-800 dark:text-gray-300" />
            </div>
            <p className="font-poppins text-xl font-bold text-slate-800 dark:text-[#F9FAFB]">{user.fullName}</p>
            <p className="font-poppins text-sm text-slate-500 dark:text-gray-400">{user.id}</p>
            <p className="font-poppins text-sm text-slate-500 dark:text-gray-400">{user.role}</p>
          </div>

          {/* Right card: editable Personal Information + Address */}
          <div className="rounded-2xl border border-slate-200 dark:border-[rgba(255,255,255,0.10)] bg-white dark:bg-[#2d1b4e] p-6">
            <h2 className="mb-5 font-poppins text-2xl font-extrabold text-slate-700 dark:text-[#F9FAFB]">Personal Information</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Last Name" required value={form.lastName} onChange={(v) => set("lastName", v)} />
              <Field label="Given Name" required value={form.givenName} onChange={(v) => set("givenName", v)} />
              <Field label="Middle Name" required value={form.middleName} onChange={(v) => set("middleName", v)} />

              <Field label="Suffix" value={form.suffix} onChange={(v) => set("suffix", v)} />
              <Field
                label="Maiden Name (For Married Woman)"
                value={form.maidenName}
                onChange={(v) => set("maidenName", v)}
              />
              <SelectField label="Sex" value={form.sex} onChange={(v) => set("sex", v)} options={["Male", "Female"]} />

              <SelectField
                label="Blood Type"
                required
                value={form.bloodType}
                onChange={(v) => set("bloodType", v)}
                options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
              />
              <Field label="Birthdate" required value={form.birthdate} onChange={(v) => set("birthdate", v)} placeholder="MM/DD/YYYY" />
              <Field label="Age" required value={form.age} onChange={(v) => set("age", v)} />

              <Field label="Place of Birth" required value={form.placeOfBirth} onChange={(v) => set("placeOfBirth", v)} />
              <SelectField
                label="Civil Status"
                value={form.civilStatus}
                onChange={(v) => set("civilStatus", v)}
                options={["Single", "Married", "Widowed", "Separated"]}
              />
              <Field label="Religion" value={form.religion} onChange={(v) => set("religion", v)} />

              <Field label="Contact No." value={form.contactNo} onChange={(v) => set("contactNo", v)} />
            </div>

            <h2 className="mb-5 mt-8 font-poppins text-2xl font-extrabold text-slate-700 dark:text-[#F9FAFB]">Address</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Region" required value={form.region} onChange={(v) => set("region", v)} />
              <Field label="Province" required value={form.province} onChange={(v) => set("province", v)} />
              <Field label="City or Municipality" required value={form.cityOrMunicipality} onChange={(v) => set("cityOrMunicipality", v)} />

              <Field label="Barangay" required value={form.barangay} onChange={(v) => set("barangay", v)} />
              <Field
                label="Street Name, Building, House No."
                required
                value={form.streetAddress}
                onChange={(v) => set("streetAddress", v)}
              />
              <Field label="Postal Code" value={form.postalCode} onChange={(v) => set("postalCode", v)} />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg bg-[#4E69D3] px-5 py-2.5 text-[13px] font-semibold font-poppins text-white hover:bg-[#3D56B8]"
              >
                <Save size={16} />
                Save Changes
              </button>
              {savedMsg && <span className="font-poppins text-sm font-semibold text-emerald-600">Saved.</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
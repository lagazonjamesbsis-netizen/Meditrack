// File location: app/admin/PatientRecordView.tsx
"use client";

import { X } from "lucide-react";

export interface PatientRecord {
  ptn: string;
  lastName: string;
  givenName: string;
  middleName: string;
  role: string; // "Patient"
  birthdate?: string;
  age?: string;
  placeOfBirth?: string;
  sex?: string;
  bloodType?: string;
  civilStatus?: string;
  religion?: string;
  contactNo?: string;
  fatherName?: string;
  motherMaidenName?: string;
  address?: string;
  philhealthNumber?: string;
  memberName?: string;
  chiefComplaints?: string;
  diagnosis?: string;
  medications?: string;
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</div>
      <div className="text-sm text-slate-700">{value?.trim() ? value : "—"}</div>
    </div>
  );
}

export default function PatientRecordView({
  patient,
  onClose,
}: {
  patient: PatientRecord;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-poppins text-xl font-extrabold text-slate-800">Individual Treatment Record</h2>
            <p className="text-sm text-slate-500">
              {patient.ptn} &middot; {patient.lastName}, {patient.givenName} {patient.middleName}
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={22} />
          </button>
        </div>

        <section className="mb-6">
          <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-sky-600">Patient Personal Information</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Last Name" value={patient.lastName} />
            <Field label="Given Name" value={patient.givenName} />
            <Field label="Middle Name" value={patient.middleName} />
            <Field label="Birthdate" value={patient.birthdate} />
            <Field label="Age" value={patient.age} />
            <Field label="Place of Birth" value={patient.placeOfBirth} />
            <Field label="Sex" value={patient.sex} />
            <Field label="Blood Type" value={patient.bloodType} />
            <Field label="Civil Status" value={patient.civilStatus} />
            <Field label="Religion" value={patient.religion} />
            <Field label="Contact No." value={patient.contactNo} />
          </div>
        </section>

        <section className="mb-6">
          <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-sky-600">Family & Address</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Father's Name" value={patient.fatherName} />
            <Field label="Mother's Maiden Name" value={patient.motherMaidenName} />
          </div>
          <div className="mt-3">
            <Field label="Complete Address" value={patient.address} />
          </div>
        </section>

        <section className="mb-6">
          <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-sky-600">PhilHealth Information</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="PhilHealth Number" value={patient.philhealthNumber} />
            <Field label="Member's Name" value={patient.memberName} />
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wide text-sky-600">Clinical Notes</h3>
          <div className="space-y-3">
            <Field label="Chief Complaints" value={patient.chiefComplaints} />
            <Field label="Diagnosis" value={patient.diagnosis} />
            <Field label="Medications / Treatment" value={patient.medications} />
          </div>
        </section>
      </div>
    </div>
  );
}
// File location: app/admin/AdminDataContext.tsx
"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type UserTab = "staff" | "patient";
export type UserStatus = "Active" | "Inactive" | "Pending";
export type RequestStatus = "Pending" | "Accepted" | "Rejected";

export interface MedUser {
  accountId: string; // "PTN-0000001" for patients, "MS-0000001" for staff
  name: string;
  email: string;
  username: string;
  password: string; // TODO: never store/display real plaintext passwords once this is wired to a real backend — see note below
  role: string;
  status: UserStatus;
  joined: string; // MM-DD-YYYY
  tab: UserTab;
}

export interface ApprovalRequest {
  id: string;
  name: string;
  email: string;
  role: string; // always "Patient" — approval requests are patient signups only
  status: RequestStatus;
  joined: string; // MM-DD-YYYY, date the request was submitted (display)
  createdAt: number; // epoch ms, used for strict FIFO ordering
}

function makeUsername(name: string, email: string) {
  const emailPrefix = email.split("@")[0]?.toLowerCase();
  return emailPrefix || name.toLowerCase().replace(/[^a-z]/g, "");
}

// TODO: this generates a placeholder password purely so the "view account"
// modal has something to display. Once real auth exists, drop this entirely —
// never generate, store, or display real user passwords in plaintext.
function makeTempPassword() {
  return `Med${Math.floor(1000 + Math.random() * 9000)}!`;
}

let patientIdCounter = 3; // seed data below already uses 00000001–00000002
let staffIdCounter = 4; // seed data below already uses 0000001–0000003

function nextAccountId(tab: UserTab) {
  if (tab === "patient") {
    return `PTN-${String(patientIdCounter++).padStart(8, "0")}`;
  }
  return `MS-${String(staffIdCounter++).padStart(7, "0")}`;
}

const initialUsers: MedUser[] = [
  { accountId: "MS-0000001", name: "Sarah Johnson", email: "sarahjohnson@gmail.com", username: "sarahjohnson", password: "Med4821!", role: "Nurse", status: "Active", joined: "01-05-2026", tab: "staff" },
  { accountId: "PTN-00000001", name: "Juan Dela Cruz", email: "DCruzjohn@gmail.com", username: "dcruzjohn", password: "Med1092!", role: "Patient", status: "Active", joined: "01-15-2026", tab: "patient" },
  { accountId: "PTN-00000002", name: "Maria Dela Cruz", email: "mariaDcruz@gmail.com", username: "mariadcruz", password: "Med7734!", role: "Patient", status: "Active", joined: "01-15-2026", tab: "patient" },
  { accountId: "MS-0000002", name: "John Smith", email: "Jsmith20@gmail.com", username: "jsmith20", password: "Med3358!", role: "Midwife", status: "Active", joined: "01-05-2026", tab: "staff" },
  { accountId: "MS-0000003", name: "Sarah Hernandez", email: "sarahH@gmail.com", username: "sarahh", password: "Med6610!", role: "BHW", status: "Active", joined: "01-05-2026", tab: "staff" },
];

// Approval requests are patient signups only — staff are added directly via
// Add Users and never appear here. createdAt values are staggered so the
// FIFO (oldest-first) ordering is meaningful even for this seed data.
const now = Date.now();
const initialRequests: ApprovalRequest[] = [
  { id: "1", name: "Sarah Johnson", email: "sarahjohnson2@gmail.com", role: "Patient", status: "Pending", joined: "01-05-2026", createdAt: now - 5 * 60_000 },
  { id: "2", name: "Juan Dela Cruz", email: "DCruzjohn2@gmail.com", role: "Patient", status: "Pending", joined: "01-15-2026", createdAt: now - 4 * 60_000 },
  { id: "3", name: "Maria Dela Cruz", email: "mariaDcruz2@gmail.com", role: "Patient", status: "Pending", joined: "01-15-2026", createdAt: now - 3 * 60_000 },
  { id: "4", name: "Odette Clemente", email: "oclemente@gmail.com", role: "Patient", status: "Pending", joined: "01-16-2026", createdAt: now - 2 * 60_000 },
  { id: "5", name: "Jobert Domingo", email: "jdomingo@gmail.com", role: "Patient", status: "Pending", joined: "01-16-2026", createdAt: now - 1 * 60_000 },
];

function todayStamp() {
  const d = new Date();
  return `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}-${d.getFullYear()}`;
}

interface AdminDataContextValue {
  users: MedUser[];
  requests: ApprovalRequest[];
  /** Admin-created staff account — becomes Active immediately, no approval step. */
  addStaffUser: (input: { name: string; email: string; role: string }) => { ok: true } | { ok: false; error: string };
  /** Patient self-signup — goes into the Approval Requests queue. */
  addPendingPatient: (input: { name: string; email: string }) => { ok: true } | { ok: false; error: string };
  acceptRequest: (id: string) => void;
  rejectRequest: (id: string) => void;
  acceptRequests: (ids: string[]) => void;
  rejectRequests: (ids: string[]) => void;
}

const AdminDataContext = createContext<AdminDataContextValue | undefined>(undefined);

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<MedUser[]>(initialUsers);
  const [requests, setRequests] = useState<ApprovalRequest[]>(initialRequests);

  function emailTaken(email: string) {
    const e = email.trim().toLowerCase();
    const inUsers = users.some((u) => u.email.toLowerCase() === e);
    const inRequests = requests.some((r) => r.email.toLowerCase() === e && r.status === "Pending");
    return inUsers || inRequests;
  }

  function addStaffUser(input: { name: string; email: string; role: string }) {
    if (!input.name.trim() || !input.email.trim()) {
      return { ok: false as const, error: "Name and email are required." };
    }
    if (emailTaken(input.email)) {
      return { ok: false as const, error: "This email is already in use." };
    }
    // TODO: call your create-staff-user API here, e.g.
    // await fetch("/api/admin/users", { method: "POST", body: JSON.stringify({ ...input, tab: "staff" }) });
    const name = input.name.trim();
    const email = input.email.trim();
    setUsers((prev) => [
      {
        accountId: nextAccountId("staff"),
        name,
        email,
        username: makeUsername(name, email),
        password: makeTempPassword(),
        role: input.role,
        status: "Active",
        joined: todayStamp(),
        tab: "staff",
      },
      ...prev,
    ]);
    return { ok: true as const };
  }

  function addPendingPatient(input: { name: string; email: string }) {
    if (!input.name.trim() || !input.email.trim()) {
      return { ok: false as const, error: "Name and email are required." };
    }
    if (emailTaken(input.email)) {
      return { ok: false as const, error: "This email is already an active user or has a pending request." };
    }
    // TODO: call your create-request API here, e.g.
    // await fetch("/api/patient-signup", { method: "POST", body: JSON.stringify(input) });
    const newRequest: ApprovalRequest = {
      id: `${Date.now()}`,
      name: input.name.trim(),
      email: input.email.trim(),
      role: "Patient",
      status: "Pending",
      joined: todayStamp(),
      createdAt: Date.now(),
    };
    setRequests((prev) => [...prev, newRequest]);
    return { ok: true as const };
  }

  function acceptRequest(id: string) {
    setRequests((prev) => {
      const req = prev.find((r) => r.id === id);
      if (req && req.status === "Pending") {
        // TODO: call your accept API here, e.g.
        // await fetch(`/api/admin/approval-requests/${id}/accept`, { method: "POST" });
        setUsers((u) => [
          {
            accountId: nextAccountId("patient"),
            name: req.name,
            email: req.email,
            username: makeUsername(req.name, req.email),
            password: makeTempPassword(),
            role: "Patient",
            status: "Active",
            joined: todayStamp(),
            tab: "patient",
          },
          ...u,
        ]);
      }
      return prev.map((r) => (r.id === id ? { ...r, status: "Accepted" } : r));
    });
  }

  function rejectRequest(id: string) {
    // TODO: call your reject API here
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r)));
  }

  function acceptRequests(ids: string[]) {
    ids.forEach((id) => acceptRequest(id));
  }

  function rejectRequests(ids: string[]) {
    ids.forEach((id) => rejectRequest(id));
  }

  return (
    <AdminDataContext.Provider
      value={{ users, requests, addStaffUser, addPendingPatient, acceptRequest, rejectRequest, acceptRequests, rejectRequests }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error("useAdminData must be used within an AdminDataProvider");
  return ctx;
}
// File location: app/admin/AdminDataContext.tsx
"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type UserTab = "staff" | "patient";
export type UserStatus = "Active" | "Inactive" | "Pending";
export type RequestStatus = "Pending" | "Accepted" | "Rejected";

export interface MedUser {
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  joined: string; // MM-DD-YYYY
  tab: UserTab;
}

export interface ApprovalRequest {
  id: string;
  name: string;
  email: string;
  role: string;
  tab: UserTab;
  status: RequestStatus;
  joined: string; // MM-DD-YYYY, date the request was submitted
}

const initialUsers: MedUser[] = [
  { name: "Sarah Johnson", email: "sarahjohnson@gmail.com", role: "Nurse", status: "Active", joined: "01-05-2026", tab: "staff" },
  { name: "Juan Dela Cruz", email: "DCruzjohn@gmail.com", role: "Patient", status: "Active", joined: "01-15-2026", tab: "patient" },
  { name: "Maria Dela Cruz", email: "mariaDcruz@gmail.com", role: "Patient", status: "Active", joined: "01-15-2026", tab: "patient" },
  { name: "John Smith", email: "Jsmith20@gmail.com", role: "Midwife", status: "Active", joined: "01-05-2026", tab: "staff" },
  { name: "Sarah Hernandez", email: "sarahH@gmail.com", role: "BHW", status: "Active", joined: "01-05-2026", tab: "staff" },
];

const initialRequests: ApprovalRequest[] = [
  { id: "1", name: "Sarah Johnson", email: "sarahjohnson@gmail.com", role: "Patient", tab: "patient", status: "Pending", joined: "01-05-2026" },
  { id: "2", name: "Juan Dela Cruz", email: "DCruzjohn@gmail.com", role: "Patient", tab: "patient", status: "Pending", joined: "01-15-2026" },
  { id: "3", name: "Maria Dela Cruz", email: "mariaDcruz@gmail.com", role: "Patient", tab: "patient", status: "Pending", joined: "01-15-2026" },
  { id: "4", name: "John Smith", email: "Jsmith20@gmail.com", role: "Nurse", tab: "staff", status: "Pending", joined: "01-05-2026" },
  { id: "5", name: "Sarah Hernandez", email: "sarahH@gmail.com", role: "BHW", tab: "staff", status: "Pending", joined: "01-05-2026" },
];

function todayStamp() {
  const d = new Date();
  return `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}-${d.getFullYear()}`;
}

interface AdminDataContextValue {
  users: MedUser[];
  requests: ApprovalRequest[];
  /** Submits a new signup — goes into the Approval Requests queue, not directly into Users. */
  addPendingUser: (input: { name: string; email: string; role: string; tab: UserTab }) => { ok: true } | { ok: false; error: string };
  acceptRequest: (id: string) => void;
  rejectRequest: (id: string) => void;
  acceptRequests: (ids: string[]) => void;
  rejectRequests: (ids: string[]) => void;
}

const AdminDataContext = createContext<AdminDataContextValue | undefined>(undefined);

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<MedUser[]>(initialUsers);
  const [requests, setRequests] = useState<ApprovalRequest[]>(initialRequests);

  function addPendingUser(input: { name: string; email: string; role: string; tab: UserTab }) {
    const email = input.email.trim().toLowerCase();
    if (!input.name.trim() || !email) {
      return { ok: false as const, error: "Name and email are required." };
    }
    const alreadyUser = users.some((u) => u.email.toLowerCase() === email);
    const alreadyRequested = requests.some((r) => r.email.toLowerCase() === email && r.status === "Pending");
    if (alreadyUser || alreadyRequested) {
      return { ok: false as const, error: "This email is already an active user or has a pending request." };
    }

    // TODO: call your create-request API here, e.g.
    // await fetch("/api/admin/approval-requests", { method: "POST", body: JSON.stringify(input) });
    const newRequest: ApprovalRequest = {
      id: `${Date.now()}`,
      name: input.name.trim(),
      email: input.email.trim(),
      role: input.role,
      tab: input.tab,
      status: "Pending",
      joined: todayStamp(),
    };
    setRequests((prev) => [newRequest, ...prev]);
    return { ok: true as const };
  }

  function acceptRequest(id: string) {
    setRequests((prev) => {
      const req = prev.find((r) => r.id === id);
      if (req && req.status === "Pending") {
        // TODO: call your accept API here, e.g.
        // await fetch(`/api/admin/approval-requests/${id}/accept`, { method: "POST" });
        setUsers((u) => [
          { name: req.name, email: req.email, role: req.role, status: "Active", joined: todayStamp(), tab: req.tab },
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
    <AdminDataContext.Provider value={{ users, requests, addPendingUser, acceptRequest, rejectRequest, acceptRequests, rejectRequests }}>
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error("useAdminData must be used within an AdminDataProvider");
  return ctx;
}
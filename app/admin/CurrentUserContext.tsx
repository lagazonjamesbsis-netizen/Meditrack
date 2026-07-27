// File location: app/meditrack/CurrentUserContext.tsx
"use client";

import { createContext, useContext, useState, type ReactNode } from "react";


export interface PersonalInfo {
  lastName: string;
  givenName: string;
  middleName: string;
  suffix: string;
  maidenName: string;
  sex: string;
  bloodType: string;
  birthdate: string;
  age: string;
  placeOfBirth: string;
  civilStatus: string;
  religion: string;
  contactNo: string;
  region: string;
  province: string;
  cityOrMunicipality: string;
  barangay: string;
  streetAddress: string;
  postalCode: string;
}

export interface CurrentUser {
  id: string; // e.g. "DTR-2610201"
  fullName: string; // "Parker, Peter"
  email: string;
  role: string; // "Admin" | "Nurse" | "Midwife" | "Patient" ...
  initials: string; // "PP"
  personal: PersonalInfo;
}

// TODO: replace this mock with the session user returned by your auth
// provider (e.g. next-auth `useSession()` or your `/api/auth/session` route).
const MOCK_USER: CurrentUser = {
  id: "DTR-2610201",
  fullName: "Parker, Peter",
  email: "pparker@meditrack.com",
  role: "Admin",
  initials: "PP",
  personal: {
    lastName: "Parker",
    givenName: "Peter",
    middleName: "",
    suffix: "",
    maidenName: "",
    sex: "",
    bloodType: "",
    birthdate: "",
    age: "",
    placeOfBirth: "",
    civilStatus: "",
    religion: "",
    contactNo: "",
    region: "",
    province: "",
    cityOrMunicipality: "",
    barangay: "",
    streetAddress: "",
    postalCode: "",
  },
};

interface CurrentUserContextValue {
  user: CurrentUser;
  updatePersonal: (patch: Partial<PersonalInfo>) => void;
}

const CurrentUserContext = createContext<CurrentUserContextValue | undefined>(undefined);

export function CurrentUserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser>(MOCK_USER);

  function updatePersonal(patch: Partial<PersonalInfo>) {
    // TODO: call your update-profile API here, e.g.
    // await fetch("/api/users/me", { method: "PATCH", body: JSON.stringify(patch) });
    setUser((prev) => ({ ...prev, personal: { ...prev.personal, ...patch } }));
  }

  return (
    <CurrentUserContext.Provider value={{ user, updatePersonal }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  const ctx = useContext(CurrentUserContext);
  if (!ctx) throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  return ctx;
}
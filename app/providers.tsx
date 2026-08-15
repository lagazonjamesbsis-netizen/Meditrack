"use client"

import { SessionProvider } from "next-auth/react"
import { DarkModeProvider } from "@/app/staff/DarkModeContext"

type Props = {
  children?: React.ReactNode
}

export const Providers = ({ children }: Props) => {
  return (
    <DarkModeProvider>
      <SessionProvider>{children}</SessionProvider>
    </DarkModeProvider>
  )
}
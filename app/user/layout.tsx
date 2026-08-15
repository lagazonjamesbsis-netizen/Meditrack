import { Metadata } from 'next'
import { ReactNode } from 'react'
import TemplateDashboard from '@/templates/Dashboard'

export const metadata: Metadata = {
  title: 'User',
  description: 'User dashboard',
}

export default function UserLayout({ children }: { children: ReactNode }) {
  return <TemplateDashboard>{children}</TemplateDashboard>
}

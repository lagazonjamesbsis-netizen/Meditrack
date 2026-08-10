import { Metadata } from 'next'
import { ReactNode } from 'react'
import TemplateBlank from '@/templates/Blank'

export const metadata: Metadata = {
  title: 'Verification',
  description: 'Verification',
}

export default function BlankLayout({ children }: { children: ReactNode }) {
  return <TemplateBlank>{children}</TemplateBlank>
}

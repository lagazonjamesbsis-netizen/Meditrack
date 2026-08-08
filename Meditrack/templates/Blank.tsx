import { ReactNode } from "react"

export default function TemplateBlank({
  children,
  className
}: {
  children: ReactNode,
  className?: string
}) {
  return (
    <main className={className}>{children}</main>
  )
}
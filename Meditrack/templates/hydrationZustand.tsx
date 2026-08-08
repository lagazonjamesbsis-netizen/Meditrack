// This is a workaround with hydration issue with Next.js server elements
// different from client

"use client"

import { ReactNode, useSyncExternalStore } from "react"

const noopSubscribe = () => () => {}

export default function HydrationZustand({
  children
}:{
  children: ReactNode
}) {

  // Server renders false (not hydrated), client flips true after hydration
  // without triggering a cascading re-render effect.
  const isHydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  )

  return <>
    {isHydrated ? children : null}
  </>

}
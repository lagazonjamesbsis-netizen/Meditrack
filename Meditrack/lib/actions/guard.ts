import { getServerSession, Session } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import prisma from '@/lib/prisma'

const ADMIN_ROLES = ['SUPERADMIN', 'ADMIN']

// Account approval statuses (must match the AccountStatus enum in prisma/schema.prisma).
export const ACCOUNT_STATUSES = ['PENDING', 'APPROVED', 'REJECTED'] as const
export type AccountStatus = (typeof ACCOUNT_STATUSES)[number]

// Result returned to the client when a guard denies access. Server actions
// return this shape instead of throwing so the calling form can render it.
export const unauthorized = {
  success: false as const,
  payload: null,
  message: 'You are not authorized to perform this action.',
}

// Result returned when the account is still awaiting approval.
export const pendingApproval = {
  success: false as const,
  payload: null,
  message:
    'Your account is currently awaiting approval from Barangay Sumapang Matanda Health Center.',
}

// Returns the current session, or null if the caller is not signed in.
export async function getSession(): Promise<Session | null> {
  return (await getServerSession(authOptions)) as Session | null
}

// Guards a server action for any signed-in user. Returns the session, or an
// `unauthorized` result the caller should return as-is when null.
export async function requireUser(): Promise<Session | null> {
  const session = await getSession()
  if (!session?.user?.id) return null
  return session
}

// Guards a server action for admins (SUPERADMIN/ADMIN).
export async function requireAdmin(): Promise<Session | null> {
  const session = await getSession()
  if (!session?.user?.id) return null
  if (!ADMIN_ROLES.includes((session.user.role as string) ?? '')) return null
  return session
}

// Fresh account-approval state for the signed-in user, read from the DB so the
// JWT (1-day lifetime) never gates access. Admins always count as approved.
// Returns null when there is no signed-in user.
export async function getAccountAccess(): Promise<{
  status: string
  approved: boolean
  admin: boolean
} | null> {
  const session = await getSession()
  if (!session?.user?.id) return null

  const user = await prisma.user.findFirst({
    where: { id: +session.user.id, deletedAt: null },
    select: { role: true, status: true },
  })
  if (!user) return null

  const admin = ADMIN_ROLES.includes(user.role)
  const approved = admin || user.status === 'APPROVED'

  return { status: user.status, approved, admin }
}

// Guards a server action for signed-in users whose account is APPROVED
// (admins are exempt). Pending/rejected accounts are denied server-side.
export async function requireApprovedUser(): Promise<Session | null> {
  const session = await getSession()
  if (!session?.user?.id) return null

  const access = await getAccountAccess()
  if (!access?.approved) return null

  return session
}

// Strips the password hash (and any other secrets) before a user row is sent
// to the client. Accepts a single row or an array.
export function sanitizeUser<T extends { password?: unknown } | null>(
  user: T
): T {
  if (!user) return user
  const safe = { ...(user as Record<string, unknown>) }
  delete safe.password
  return safe as T
}

export function sanitizeUsers<T extends { password?: unknown }>(
  users: T[] | null | undefined
): T[] {
  if (!users) return []
  return users.map((u) => sanitizeUser(u))
}

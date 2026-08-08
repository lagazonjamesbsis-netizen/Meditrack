"use server"

import prisma from "@/lib/prisma"
import type { AccountStatus, Role } from "@prisma/client"
import { hash } from "bcrypt"
import { revalidateTag, revalidatePath } from "next/cache"
import { cacheLife, cacheTag } from "next/cache"
import { USERS_PER_PAGE } from "@/config/constants"
import { isValidEmail } from "@/lib/helper"
import { requireAdmin, requireUser, sanitizeUser, sanitizeUsers } from "@/lib/actions/guard"
import { ACCOUNT_STATUSES } from "@/lib/actions/guard"
import type { ActionResult } from "@/lib/actions/types"

const table = "user"
const MIN_PASSWORD_LENGTH = 8
const VALID_ROLES = ["SUPERADMIN", "ADMIN", "USER"]

// GET ONE
async function getUserData(id: string) {
  'use cache'
  cacheTag('users')
  cacheLife('max')

  try {
    const user = await prisma[table].findFirst({ where: { id: +id, deletedAt: null } })
    return { success: true, payload: sanitizeUser(user) }
  } catch {
    return { success: false, payload: null, message: "Failed to get user" }
  }
}

export async function getUser(id: string) {
  // Any signed-in user reaching an admin surface; page-level guards still apply.
  if (!(await requireUser())) return { success: false, payload: null, message: "Not authorized" }
  return getUserData(id)
}

// GET ALL (paginated)
async function getUsersData(page: number, perPage: number) {
  'use cache'
  cacheTag('users')
  cacheLife('max')

  try {
    const skip = (page - 1) * perPage
    const [users, total] = await prisma.$transaction([
      prisma[table].findMany({
        where: { deletedAt: null },
        skip,
        take: perPage,
        orderBy: { id: "asc" },
      }),
      prisma[table].count({ where: { deletedAt: null } }),
    ])
    return {
      success: true,
      payload: sanitizeUsers(users),
      total,
      totalPages: Math.max(1, Math.ceil(total / perPage)),
    }
  } catch {
    return { success: false, payload: null, total: 0, totalPages: 1, message: "Failed to get users" }
  }
}

export async function getUsers(page: number = 1, perPage: number = USERS_PER_PAGE) {
  if (!(await requireAdmin())) return { success: false, payload: null, total: 0, totalPages: 1, message: "Not authorized" }
  return getUsersData(page, perPage)
}

// SIGNUP STEP 1 (public, pre-login) — validates the credentials and does NOT
// create a database record. The account is only persisted after the full
// onboarding flow completes at the Verification step (completeRegistration).
export async function signupUser(_prevState: ActionResult, formData: FormData) {
  const name = formData.get("name")?.toString().trim()
  const email = formData.get("email")?.toString().trim()
  const password = formData.get("password")?.toString().trim()

  const errors: Record<string, string> = {}
  if (!name) errors.name = "Name is required."
  if (!email) errors.email = "Email is required."
  else if (!isValidEmail(email)) errors.email = "Please enter a valid email address."
  if (!password) errors.password = "Password is required."
  else if (password.length < MIN_PASSWORD_LENGTH)
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, input: { name, email } }
  }

  // Surface duplicate emails now rather than at the final submit step.
  const userExist = await prisma[table].findFirst({ where: { email } })
  if (userExist) {
    return {
      success: false,
      message: `Email ${email} already exists.`,
      input: { name, email },
    }
  }

  return {
    success: true,
    message: "Details accepted. Proceeding to Residence Details.",
  }
}

// FINAL SUBMIT (public, pre-login) — called from the Verification step with
// the entire collected draft (credentials + residence). This is the ONLY point
// in the onboarding flow where the account row is created. It always starts
// as a plain USER awaiting approval (status PENDING); the role is never read
// from input.
export async function completeRegistration(_prevState: ActionResult, formData: FormData) {
  const name = formData.get("name")?.toString().trim()
  const email = formData.get("email")?.toString().trim()
  const password = formData.get("password")?.toString().trim()
  const address = formData.get("address")?.toString().trim() || null
  const barangay = formData.get("barangay")?.toString().trim() || null
  const city = formData.get("city")?.toString().trim() || null
  const province = formData.get("province")?.toString().trim() || null
  const zipCode = formData.get("zipCode")?.toString().trim() || null

  const errors: Record<string, string> = {}
  if (!name) errors.name = "Name is required."
  if (!email) errors.email = "Email is required."
  else if (!isValidEmail(email)) errors.email = "Please enter a valid email address."
  if (!password) errors.password = "Password is required."
  else if (password.length < MIN_PASSWORD_LENGTH)
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`

  // Required fields follow the PRAMIS onboarding form.
  const required = [
    { key: "address", label: "Address", value: address },
    { key: "barangay", label: "Barangay", value: barangay },
    { key: "city", label: "City / Municipality", value: city },
    { key: "province", label: "Province", value: province },
  ]

  required.forEach(({ key, label, value }) => {
    if (!value) errors[key] = `${label} is required.`
    else if (value.length > 255) errors[key] = `${label} is too long.`
  })

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      input: { name, email, address, barangay, city, province, zipCode },
    }
  }

  try {
    const userExist = await prisma[table].findFirst({ where: { email } })
    if (userExist) {
      return {
        success: false,
        message: `Email ${email} already exists.`,
        input: { name, email },
      }
    }

    // Patients start PENDING and are approved by the health center admin.
    const user = await prisma[table].create({
      data: {
        name,
        email,
        password: await hash(password!, 12),
        role: "USER" as Role,
        status: "PENDING" as AccountStatus,
        address,
        barangay,
        city,
        province,
        zipCode,
      },
    })

    revalidateTag("users", "max")
    revalidatePath("/dashboard/users")

    return {
      success: true,
      message: "Account registered. Awaiting approval.",
      payload: sanitizeUser(user),
    }
  } catch {
    return { success: false, payload: null, message: "Failed to create account." }
  }
}

// CREATE (admin only) — may assign a role.
export async function createUser(_prevState: ActionResult, formData: FormData) {
  if (!(await requireAdmin())) {
    return { success: false, message: "You are not authorized to perform this action." }
  }

  const name = formData.get("name")?.toString().trim()
  const email = formData.get("email")?.toString().trim()
  const password = formData.get("password")?.toString().trim()
  const role = formData.get("role")?.toString().trim() || "USER"
  const safeRole = VALID_ROLES.includes(role) ? role : "USER"

  const errors: Record<string, string> = {}
  if (!name) errors.name = "Name is required."
  if (!email) errors.email = "Email is required."
  else if (!isValidEmail(email)) errors.email = "Please enter a valid email address."
  if (!password) errors.password = "Password is required."
  else if (password.length < MIN_PASSWORD_LENGTH)
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, input: { name, email } }
  }

  return persistNewUser({ name: name!, email: email!, password: password!, role: safeRole })
}

// Shared insert path for signup + admin create.
async function persistNewUser(data: { name: string; email: string; password: string; role: string }) {
  try {
    const userExist = await prisma[table].findFirst({ where: { email: data.email } })
    if (userExist) {
      return {
        success: false,
        message: `Email ${data.email} already exists.`,
        input: { name: data.name, email: data.email },
      }
    }

    // Account approval workflow: patient accounts start PENDING and must be
    // approved by a health center admin. Admin accounts are approved instantly.
    const status = data.role === "USER" ? "PENDING" : "APPROVED"

    const user = await prisma[table].create({
      data: {
        name: data.name,
        email: data.email,
        password: await hash(data.password, 12),
        role: data.role as Role,
        status: status as AccountStatus,
      },
    })

    revalidateTag("users", "max")
    revalidatePath("/dashboard/users")

    return { success: true, message: "User created successfully", payload: sanitizeUser(user) }
  } catch {
    return { success: false, payload: null, message: "Failed to create user" }
  }
}

// SOFT DELETE (admin only)
export async function softDeleteUser(id: string) {
  const session = await requireAdmin()
  if (!session) {
    return { success: false, payload: null, message: "You are not authorized to perform this action." }
  }

  const targetId = parseInt(id)
  if (Number.isNaN(targetId)) {
    return { success: false, payload: null, message: "Invalid user id." }
  }

  // Cannot delete yourself.
  if (String(targetId) === String(session.user.id)) {
    return { success: false, payload: null, message: "You cannot delete your own account." }
  }

  try {
    const target = await prisma[table].findFirst({ where: { id: targetId, deletedAt: null } })
    if (!target) {
      return { success: false, payload: null, message: "User not found." }
    }

    // Only a SUPERADMIN may delete another SUPERADMIN.
    if (target.role === "SUPERADMIN" && session.user.role !== "SUPERADMIN") {
      return { success: false, payload: null, message: "You cannot delete a superadmin." }
    }

    const user = await prisma[table].update({
      where: { id: targetId },
      data: { deletedAt: new Date() },
    })

    revalidateTag("users", "max")
    revalidatePath("/dashboard/users")

    return { success: true, payload: sanitizeUser(user) }
  } catch {
    return { success: false, payload: null, message: "Failed to delete user" }
  }
}

// UPDATE (admin only)
export async function updateUser(_prevState: ActionResult, formData: FormData) {
  const session = await requireAdmin()
  if (!session) {
    return { success: false, message: "You are not authorized to perform this action." }
  }

  const id = formData.get("id")?.toString().trim()
  const name = formData.get("name")?.toString().trim()
  const email = formData.get("email")?.toString().trim()
  const role = formData.get("role")?.toString().trim() || "USER"
  const safeRole = VALID_ROLES.includes(role) ? role : "USER"
  const status = formData.get("status")?.toString().trim() || "PENDING"
  const safeStatus = ACCOUNT_STATUSES.includes(status as AccountStatus) ? status : "PENDING"

  const errors: Record<string, string> = {}
  if (!name) errors.name = "Name is required."
  if (!email) errors.email = "Email is required."
  else if (!isValidEmail(email)) errors.email = "Please enter a valid email address."

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, input: { id, name, email, role } }
  }

  const targetId = parseInt(id!)
  if (Number.isNaN(targetId)) {
    return { success: false, message: "Invalid user id.", input: { id, name, email, role } }
  }

  try {
    const target = await prisma[table].findFirst({ where: { id: targetId, deletedAt: null } })
    if (!target) {
      return { success: false, message: "User not found.", input: { id, name, email, role } }
    }

    // Only a SUPERADMIN may change another SUPERADMIN or grant SUPERADMIN.
    if (
      session.user.role !== "SUPERADMIN" &&
      (target.role === "SUPERADMIN" || safeRole === "SUPERADMIN")
    ) {
      return { success: false, message: "You cannot modify superadmin roles.", input: { id, name, email, role } }
    }

    const userExist = await prisma[table].findFirst({
      where: { email, NOT: { id: targetId } },
    })
    if (userExist) {
      return {
        success: false,
        message: `Email ${email} is already in use.`,
        input: { id, name, email, role },
      }
    }

    const user = await prisma[table].update({
      where: { id: targetId },
      data: { name, email, role: safeRole as Role, status: safeStatus as AccountStatus },
    })

    revalidateTag("users", "max")
    revalidatePath("/dashboard/users")

    return { success: true, message: "User updated successfully.", payload: sanitizeUser(user) }
  } catch {
    return { success: false, payload: null, message: "Failed to update user." }
  }
}

// UPDATE ACCOUNT STATUS (admin only) — approves/rejects a patient's account.
export async function updateUserStatus(_prevState: ActionResult, formData: FormData) {
  const session = await requireAdmin()
  if (!session) {
    return { success: false, message: "You are not authorized to perform this action." }
  }

  const id = formData.get("id")?.toString().trim()
  const status = formData.get("status")?.toString().trim()

  if (!ACCOUNT_STATUSES.includes(status as AccountStatus)) {
    return { success: false, message: "Invalid account status." }
  }

  const targetId = parseInt(id!)
  if (Number.isNaN(targetId)) {
    return { success: false, message: "Invalid user id." }
  }

  try {
    const target = await prisma[table].findFirst({ where: { id: targetId, deletedAt: null } })
    if (!target) {
      return { success: false, message: "User not found." }
    }

    // Only a SUPERADMIN may change the status of a SUPERADMIN.
    if (target.role === "SUPERADMIN" && session.user.role !== "SUPERADMIN") {
      return { success: false, message: "You cannot modify superadmin accounts." }
    }

    const user = await prisma[table].update({
      where: { id: targetId },
      data: { status: status as AccountStatus, updatedAt: new Date() },
    })

    revalidateTag("users", "max")
    revalidatePath("/dashboard/users")

    return {
      success: true,
      message: `Account ${status === "APPROVED" ? "approved" : status === "REJECTED" ? "rejected" : "reset to pending"}.`,
      payload: sanitizeUser(user),
    }
  } catch {
    return { success: false, payload: null, message: "Failed to update account status." }
  }
}

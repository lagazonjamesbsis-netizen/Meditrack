// Shared response shape of every server action, returned to the calling
// form so it can render inline errors and success messages.

export type ActionResult = {
  success?: boolean
  message?: string | null
  errors?: Record<string, string> | null
  input?: Record<string, string | number | null | undefined> | null
  payload?: unknown
}

export type ActionState = ActionResult | null
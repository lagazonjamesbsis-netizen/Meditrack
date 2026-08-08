import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      role?: string | null
      status?: string | null
      image?: string | null
    }
  }

  interface User {
    id: string
    role?: string
    status?: string
    image?: string
  }

  interface JWT {
    id: string
    role?: string
    status?: string
    image?: string
  }
}

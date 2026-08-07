import { compare } from 'bcrypt'
import { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Signin',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await prisma.user.findFirst({
          where: {
            deletedAt: null,
            email: credentials.email,
          },
        })

        // Not found
        if (!user) {
          return null
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password + ''
        )

        if (!isPasswordValid) {
          return null
        }

        await prisma.user.update({
          where: {
            email: credentials.email,
          },
          data: {
            loggedInAt: new Date().toISOString(),
          },
        })

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      // On profile update, re-read the authoritative record from the DB rather
      // than trusting client-supplied session fields.
      if (trigger === 'update' && token.id) {
        const dbUser = await prisma.user.findFirst({
          where: { id: +(token.id as string), deletedAt: null },
        })
        if (dbUser) {
          token.name = dbUser.name
          token.email = dbUser.email
          token.image = dbUser.image
          token.role = dbUser.role
        }
      }

      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: {
            id: +user.id,
          },
        })

        if (dbUser) {
          token.id = dbUser.id
          token.name = dbUser.name
          token.email = dbUser.email
          token.image = dbUser.image
          token.role = dbUser.role
        }
      }
      return token
    },
    async session({ session, token }) {
      // Custom sessions
      session.user.id = token.id as string
      session.user.name = token.name as string
      session.user.email = token.email as string
      session.user.image = token.image as string
      session.user.role = token.role as string

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

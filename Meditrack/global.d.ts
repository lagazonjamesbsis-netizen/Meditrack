import "next-auth"

declare global {

  type User = import('@prisma/client').User

}
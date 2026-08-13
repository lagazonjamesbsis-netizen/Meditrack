import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL_UNPOOLED! }),
})

async function main() {
  const defaultEmail = 'admin@domain.com'
  const passwordHash = await bcrypt.hash('defaultpass', 10)

  const admin = await prisma.user.upsert({
    where: { email: defaultEmail },
    update: {},
    create: {
      name: 'Admin User',
      email: defaultEmail,
      password: passwordHash,
      role: 'SUPERADMIN',
      activatedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  const nurseElaine = await prisma.user.upsert({
    where: { email: 'elaine@meditrack.com' },
    update: {},
    create: {
      name: 'Nurse Elaine',
      email: 'elaine@meditrack.com',
      password: await bcrypt.hash('nurseElaine123', 10),
      role: 'NURSE',
      activatedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  const midwife = await prisma.user.upsert({
    where: { email: 'vhernandez@meditrack.com' },
    update: { role: 'ADMIN' },
    create: {
      name: 'Vivianne Hernandez',
      email: 'vhernandez@meditrack.com',
      password: await bcrypt.hash('midwife123', 10),
      role: 'ADMIN',
      activatedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  console.log('✅ Seeded admin user:', admin.email)
  console.log('✅ Seeded nurse user:', nurseElaine.email)
  console.log('✅ Seeded midwife user:', midwife.email)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

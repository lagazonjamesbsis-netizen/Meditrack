import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import bcrypt from 'bcrypt'

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL ?? process.env.DATABASE_URL_UNPOOLED!,
})
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.user.deleteMany({
    where: { email: 'admin@domain.com' },
  })

  const admin = await prisma.user.upsert({
    where: { email: 'vhernandez@meditrack.com' },
    update: {
      name: 'Vivianne Hernandez',
      email: 'vhernandez@meditrack.com',
      password: await bcrypt.hash('midwife123', 10),
      role: 'ADMIN',
      position: 'MIDWIFE',
      status: 'APPROVED',
      activatedAt: new Date(),
    },
    create: {
      name: 'Vivianne Hernandez',
      email: 'vhernandez@meditrack.com',
      password: await bcrypt.hash('midwife123', 10),
      role: 'ADMIN',
      position: 'MIDWIFE',
      status: 'APPROVED',
      activatedAt: new Date(),
    },
  })

  // Ensure Elaine (nurse) is removed from the database
  await prisma.user.deleteMany({ where: { email: 'elaine.nurse@meditrack.com' } })

  console.log('✅ Seeded admin user:', admin.email, '(ADMIN)')
  console.log('✅ Ensured nurse user elaine.nurse@meditrack.com is removed')
  console.log('✅ Removed super admin: admin@domain.com')
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
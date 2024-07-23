import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.staff.upsert({
    where: { email: 'admin' },
    update: {},
    create: {
      email: 'admin',
      fullname: 'Admin',
      password: bcrypt.hashSync('admin', 10),
    },
  });
  console.log({ admin });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

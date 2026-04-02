import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const rounds = Number(process.env.BCRYPT_ROUNDS) || 12;
  const passwordHash = await bcrypt.hash('123456', rounds);

  await prisma.role.upsert({
    where: { code: 'admin' },
    create: { code: 'admin', name: 'Administrator' },
    update: {},
  });
  await prisma.role.upsert({
    where: { code: 'member' },
    create: { code: 'member', name: 'Member' },
    update: {},
  });

  const adminRole = await prisma.role.findUniqueOrThrow({ where: { code: 'admin' } });
  const memberRole = await prisma.role.findUniqueOrThrow({ where: { code: 'member' } });

  const user = await prisma.user.upsert({
    where: { username: 'admin' },
    create: {
      username: 'admin',
      email: 'admin@local',
      passwordHash,
      displayName: 'Admin',
      status: 'active',
      preferences: {
        background: 'frontend-engineer',
        goal: 'skill-upgrade',
        preferredDirection: 'ai-agent',
        pace: 'normal',
      },
    },
    update: {
      passwordHash,
      // 与 create 一致，保证重复 seed 后联调 / e2e 有确定基线
      preferences: {
        background: 'frontend-engineer',
        goal: 'skill-upgrade',
        preferredDirection: 'ai-agent',
        pace: 'normal',
      },
    },
  });

  await prisma.userRole.deleteMany({ where: { userId: user.id } });
  await prisma.userRole.createMany({
    data: [
      { userId: user.id, roleId: adminRole.id },
      { userId: user.id, roleId: memberRole.id },
    ],
  });

  console.log('Seed OK: user admin / 123456');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

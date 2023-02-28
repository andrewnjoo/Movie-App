import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

import testUsers from './testUsers';
import type { TestUser } from './testUsers';

export async function createTestUsersData(prisma: PrismaClient): Promise<void> {
  const saltRounds = 10;

  const hashedTestUsers: TestUser[] = await Promise.all(
    testUsers.map(async (user: TestUser) => {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      return {
        ...user,
        password: hashedPassword,
      };
    })
  );

  const createdUsers = await prisma.user.createMany({
    data: hashedTestUsers,
  });

  console.log('Created users:', createdUsers);
}

import { PrismaClient } from '@prisma/client';

import { createTestUsersData } from './createTestUsersData';
import { createTestMoviesData } from './createTestMoviesData';

const prisma = new PrismaClient();

export type CreateTestDataCallback = (prisma: PrismaClient) => Promise<void>;

async function main(callbackArray: CreateTestDataCallback[]) {
  try {
    await prisma.$connect();

    await prisma.movie.deleteMany();
    await prisma.user.deleteMany();

    await prisma.$queryRaw`ALTER TABLE User AUTO_INCREMENT = 1`;
    await prisma.$queryRaw`ALTER TABLE Movie AUTO_INCREMENT = 1`;

    for (const callback of callbackArray) {
      await callback(prisma);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main([createTestUsersData, createTestMoviesData]).catch((error) => {
  console.error(error);
  process.exit(1);
});

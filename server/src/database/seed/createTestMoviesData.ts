import { PrismaClient } from '@prisma/client';

import testUsers from './testUsers';

export async function createTestMoviesData(
  prisma: PrismaClient
): Promise<void> {
  try {
    const user1 = await prisma.user.findFirst({
      where: { email: testUsers[0].email },
    });

    const user2 = await prisma.user.findFirst({
      where: { email: testUsers[1].email },
    });

    if (!user1) {
      console.log('User not found');
      return;
    }

    if (!user2) {
      console.log('User not found');
      return;
    }

    const moviesData = [
      {
        tmdb_id: 505642, // Black Panther Wakanda Forever
        liked_by: user1.id,
      },
      {
        tmdb_id: 315162, // Puss in Boots Last Wish
        liked_by: user1.id,
      },
      {
        tmdb_id: 536554, // M3GAN
        liked_by: user1.id,
      },
      {
        tmdb_id: 505642,
        liked_by: user2.id,
      },
    ];

    const createdMovies = await prisma.movie.createMany({
      data: moviesData,
    });

    console.log('Created movies:', createdMovies);
  } catch (err: any) {
    console.error(err.message);
  }
}

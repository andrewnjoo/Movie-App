import { Request } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { jwtSecret } from '../../../config';
import { registerUser } from '../../../authentication/controllers/UserController';
import testUsers from '../../../database/seed/testUsers';
import {
  getAllMovies,
  getUserMovies,
  addMovie,
  deleteMovie,
} from '../MovieController';
import authorization from '../../../authentication/middleware/authorization';

jest.mock('../../../authentication/middleware/authorization');
const prisma = new PrismaClient();
const movieIds = Array.from({ length: 3 }, () =>
  Math.ceil(Math.random() * 100)
);
const modifiedTestUsers = testUsers.map((user) => ({
  ...user,
  email: `${user.name.toLowerCase()}@moviecontroller.com`,
}));

describe('MovieController', () => {
  const testUsersInfo: any = [];
  (authorization as jest.Mock).mockImplementation(
    (req: any, res: any, next: any) => next()
  );

  beforeAll(async () => {
    for (let i = 0; i < modifiedTestUsers.length; i++) {
      const user = modifiedTestUsers[i];
      const req = {
        body: user,
      } as Request;
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as any;

      await registerUser(req, res);

      const token = res.json.mock.calls[0][0].token;
      const payload = jwt.verify(token, jwtSecret) as any;
      testUsersInfo.push({
        id: payload.user,
        token,
      });
    }

    const moviesData = [
      {
        tmdb_id: movieIds[0],
        liked_by: testUsersInfo[0].id,
      },
      {
        tmdb_id: movieIds[1],
        liked_by: testUsersInfo[0].id,
      },
      {
        tmdb_id: movieIds[0],
        liked_by: testUsersInfo[1].id,
      },
    ];
    await prisma.movie.createMany({
      data: moviesData,
    });
  });

  afterAll(async () => {
    await prisma.movie.deleteMany({
      where: {
        tmdb_id: {
          in: movieIds,
        },
      },
    });
    await prisma.user.deleteMany({
      where: {
        email: {
          in: modifiedTestUsers.map((user) => user.email),
        },
      },
    });

    await prisma.$disconnect();
  });

  describe('getAllMovies', () => {
    it('should return a sorted list of movies with their respective like counts', async () => {
      const req = {} as Request;
      const res = {
        json: jest.fn((movies) => movies),
        status: jest.fn(),
      } as any;

      await getAllMovies(req, res);

      const movies = res.json.mock.calls[0][0];
      const movie1 = movies.find((movie: any) => movie.tmdb_id === movieIds[0]);
      const movie2 = movies.find((movie: any) => movie.tmdb_id === movieIds[1]);

      expect(movie1.likes).toBe(2);
      expect(movie2.likes).toBe(1);
    });
  });

  describe('getUserMovies', () => {
    it('should return a list of movies liked by the user', async () => {
      const req = {
        user: testUsersInfo[0].id,
        header: jest.fn().mockReturnValue(testUsersInfo[0].token),
      } as any;
      const moviesRes = {
        json: jest.fn(),
        status: jest.fn(),
        send: jest.fn(),
      } as any;

      await getUserMovies(req, moviesRes);

      expect(moviesRes.json.mock.calls[0][0]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            tmdb_id: movieIds[0],
          }),
          expect.objectContaining({
            tmdb_id: movieIds[1],
          }),
        ])
      );
    });
  });

  describe('addMovie', () => {
    it('should add a movie to the database', async () => {
      const req = {
        body: {
          tmdb_id: movieIds[2],
        },
        user: testUsersInfo[0].id,
        header: jest.fn().mockReturnValue(testUsersInfo[0].token),
      } as any;
      const res = {
        json: jest.fn(),
        status: jest.fn(),
        send: jest.fn(),
      } as any;

      await addMovie(req, res);

      expect(res.json.mock.calls[0][0]).toEqual(
        expect.objectContaining({
          tmdb_id: movieIds[2],
        })
      );
    });
  });

  describe('deleteMovie', () => {
    it('should delete a movie from the database', async () => {
      const req = {
        body: {
          tmdb_id: movieIds[2],
        },
        user: testUsersInfo[0].id,
        header: jest.fn().mockReturnValue(testUsersInfo[0].token),
      } as any;
      const res = {
        json: jest.fn(),
        status: jest.fn(),
        send: jest.fn(),
      } as any;

      await deleteMovie(req, res);

      expect(res.json.mock.calls[0][0]).toEqual(
        expect.objectContaining({
          tmdb_id: movieIds[2],
        })
      );
    });
  });
});

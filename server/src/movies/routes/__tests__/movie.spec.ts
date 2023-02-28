import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { jwtSecret } from '../../../config';
import testUsers from '../../../database/seed/testUsers';
import app from '../../../app';
import { registerUser } from '../../../authentication/controllers/UserController';

const prisma = new PrismaClient();

const testUser = {
  ...testUsers[0],
  email: `${testUsers[0].name.toLowerCase()}@movie.com`,
};

const testMovies = [
  {
    tmdb_id: Math.ceil(Math.random() * 100),
  },
  {
    tmdb_id: Math.ceil(Math.random() * 100),
  },
];

describe('movie', () => {
  let testUserInfo: any;
  beforeAll(async () => {
    const req = {
      body: testUser,
    } as any;
    const res = {
      json: jest.fn((data) => data),
    } as any;

    await registerUser(req, res);

    const token = res.json.mock.calls[0][0].token;
    const payload = jwt.verify(token, jwtSecret) as any;
    testUserInfo = {
      id: payload.user,
      token,
    };

    await prisma.movie.createMany({
      data: [
        {
          tmdb_id: testMovies[0].tmdb_id,
          liked_by: testUserInfo.id,
        },
        {
          tmdb_id: testMovies[1].tmdb_id,
          liked_by: testUserInfo.id,
        },
      ],
    });
  });

  afterAll(async () => {
    await prisma.movie.deleteMany({
      where: {
        liked_by: testUserInfo.id,
      },
    });

    await prisma.user.delete({
      where: {
        email: testUser.email,
      },
    });
  });

  describe('GET /', () => {
    it('should return all movies', async () => {
      const response = await request(app).get('/movies');

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('GET /user', () => {
    it('should return all movies liked by the user', async () => {
      const response = await request(app)
        .get('/movies/user')
        .set('token', testUserInfo.token);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].liked_by).toEqual(testUserInfo.id);
    });

    describe('POST /add', () => {
      it('should add a movie to the user', async () => {
        const newMovie = {
          tmdb_id: 200,
        };

        const response = await request(app)
          .post('/movies/add')
          .set('token', testUserInfo.token)
          .send(newMovie);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('tmdb_id', newMovie.tmdb_id);
        expect(response.body).toHaveProperty('liked_by', testUserInfo.id);
      });
    });

    describe('DELETE /delete', () => {
      it('should delete a movie the user liked', async () => {
        const response = await request(app)
          .delete('/movies/delete')
          .set('token', testUserInfo.token)
          .send({ tmdb_id: 200 });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('tmdb_id', 200);
        expect(response.body).toHaveProperty('liked_by', testUserInfo.id);
      });
    });
  });
});

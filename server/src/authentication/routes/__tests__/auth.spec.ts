import request from 'supertest';
import { PrismaClient } from '@prisma/client';

import testUsers from '../../../database/seed/testUsers';
import app from '../../../app';

const testUser = {
  ...testUsers[0],
  email: 'test@auth.com',
};

const prisma = new PrismaClient();

describe('auth', () => {
  afterAll(async () => {
    await prisma.user.delete({
      where: {
        email: testUser.email,
      },
    });
  });

  describe('POST /register', () => {
    it('should register a new user and return a JWT token', async () => {
      const response = await request(app).post('/auth/register').send(testUser);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  });

  describe('POST /login', () => {
    it('should log in an existing user and return a JWT token', async () => {
      const response = await request(app).post('/auth/login').send({
        email: testUser.email,
        password: testUser.password,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  });
});

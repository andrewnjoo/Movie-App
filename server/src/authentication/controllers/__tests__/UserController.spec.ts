import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { jwtSecret } from '../../../config';
import testUsers from '../../../database/seed/testUsers';
import { registerUser, loginUser, isAuthorized } from '../UserController';

const testUser = {
  ...testUsers[0],
  email: `alice_${Math.random()}@usercontroller.com`,
};

let jwtToken = '';

const prisma = new PrismaClient();
const mockRequest = {
  body: testUser,
} as Request;
const mockResponse = {
  json: jest.fn((data) => data),
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
} as any;

describe('UserController', () => {
  afterAll(async () => {
    await prisma.user.delete({
      where: {
        email: mockRequest.body.email,
      },
    });

    await prisma.$disconnect();
  });

  describe('registerUser', () => {
    it('registers a new user and returns a JWT token', async () => {
      await registerUser(mockRequest, mockResponse);

      const user = await prisma.user.findUnique({
        where: {
          email: mockRequest.body.email,
        },
      });
      expect(user).toBeTruthy();
      expect(user?.name).toBe(mockRequest.body.name);
      expect(user?.password).not.toBe(mockRequest.body.password);

      const token = mockResponse.json.mock.calls[0][0].token;
      expect(token).toBeTruthy();
      jwtToken = token;

      const decoded: any = jwt.verify(token, jwtSecret);
      expect(decoded.user).toBe(user?.id);
    });
  });

  describe('loginUser', () => {
    it('should return a valid JWT token when the user provides correct credentials', async () => {
      const req = {
        body: testUser,
      } as Request;

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as any;

      await loginUser(req, res);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        token: expect.any(String),
      });
    });
  });

  describe('isAuthorized', () => {
    it('should return true with user name, if authorized', async () => {
      const req = {
        header: jest.fn().mockReturnValue(jwtToken),
      } as any;
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as any;

      await isAuthorized(req, res);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(true);
      expect(req.name).toBe(testUser.name);
    });

    it('should return false if the user is not authorized', async () => {
      const req = {
        header: jest.fn().mockReturnValue('invalid token'),
      } as any;
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as any;

      await isAuthorized(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(
        'Authorization failed: invalid token',
      );
    });
  });
});

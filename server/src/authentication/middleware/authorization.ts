import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

import { jwtSecret } from '../../config/';

const prisma = new PrismaClient();

async function authorization(req: any, res: any, next: any) {
  try {
    const jwtToken = req.header('token');

    if (!jwtToken) {
      res.json('Authorization failed: no token provided');
      return res.status(403);
    }

    const payload: any = jwt.verify(jwtToken, jwtSecret);

    const user = await prisma.user.findUnique({
      where: {
        id: Number(payload.user),
      },
    });

    req.user = payload.user;
    req.name = user?.name;

    next();
  } catch (err: any) {
    res.json('Authorization failed: invalid token');
    return res.status(403);
  }
}

export default authorization;

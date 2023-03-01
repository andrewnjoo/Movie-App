import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import { jwtGenerator } from '../utils/jwtGenerator';
import authorization from '../middleware/authorization';

const prisma = new PrismaClient();

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return res.status(409).json('User already exists');
    }

    const saltRound = Number(process.env.SALT_ROUND || 10);
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: bcryptPassword,
      },
    });

    const token = jwtGenerator(newUser.id);

    res.json({ token });
  } catch (err: any) {
    console.log(err.message);

    res.status(500).send('Server error');
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json('Invalid email');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json('Invalid password');
    }

    const token = jwtGenerator(user.id);

    res.json({ token });
  } catch (err: any) {
    console.log(err.message);

    res.status(500).send('Server error');
  }
};

const isAuthorized = async (req: Request, res: Response) => {
  try {
    await authorization(req, res, async () => {
      res.json(true);
    });
  } catch (err: any) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
};

export { registerUser, loginUser, isAuthorized };

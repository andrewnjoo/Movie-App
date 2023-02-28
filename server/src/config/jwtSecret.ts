import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const env = dotenv.config();
dotenvExpand.expand(env);

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

export const jwtSecret = process.env.JWT_SECRET;

import jwt from 'jsonwebtoken';

import { jwtSecret } from '../../../config';
import { jwtGenerator } from '../jwtGenerator';

describe('jwtGenerator', () => {
  it('generates a valid JWT token with a given user id', () => {
    const userId = 123;
    const token = jwtGenerator(userId);

    const decoded: any = jwt.verify(token, jwtSecret);

    expect(typeof token).toBe('string');
    expect(decoded.user).toBe(userId);
  });
});

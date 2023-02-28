import jwt from 'jsonwebtoken';

import { jwtSecret } from '../../config/';

export function jwtGenerator(user_id: any) {
  const payload = {
    user: user_id,
  };

  return jwt.sign(payload, jwtSecret, { expiresIn: '1hr' });
}

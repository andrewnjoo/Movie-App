import jwt from 'jsonwebtoken';

import { jwtSecret } from '../../config/';

async function authorization(req: any, res: any, next: any) {
  try {
    const jwtToken = req.header('token');

    if (!jwtToken) {
      res.json('Authorization failed: no token provided');
      return res.status(403);
    }

    const payload: any = jwt.verify(jwtToken, jwtSecret);

    req.user = payload.user;

    next();
  } catch (err: any) {
    res.json('Authorization failed: invalid token');
    return res.status(403);
  }
}

export default authorization;

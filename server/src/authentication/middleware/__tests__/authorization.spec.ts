import jwt from 'jsonwebtoken';

import { authorization } from '../';
import { jwtSecret } from '../../../config/';

describe('authorization', () => {
  const req = {
    header: jest.fn(),
  } as any;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns error message if no token is provided', async () => {
    req.header.mockReturnValueOnce(undefined);

    await authorization(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
    expect(res.json).toBeCalledWith('Authorization failed: no token provided');
  });

  it('returns error message if an invalid token is provided', async () => {
    req.header.mockReturnValueOnce('invalid-token');

    await authorization(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith(
      'Authorization failed: invalid token',
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('calls the next function if a valid token is provided', async () => {
    const token = jwt.sign({ user: '1' }, jwtSecret);
    req.header.mockReturnValueOnce(token);

    await authorization(req, res, next);

    expect(req.user).toEqual('1');
    expect(next).toHaveBeenCalled();
  });
});

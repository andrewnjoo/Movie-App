import register from '../validInfo';

describe('validInfo', () => {
  const req = {
    path: '/register',
    body: {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
    },
  } as any;
  const res = {
    json: jest.fn().mockReturnValue('Missing Credentials'),
    status: jest.fn().mockReturnThis(),
  } as any;
  const next = jest.fn();

  it('returns "Missing Credentials" if any credentials are missing', () => {
    const { email, name, password } = req.body;
    delete req.body.email;

    register(req, res, next);

    expect(res.json).toHaveBeenCalledWith('Missing Credentials');
  });

  it('returns "Invalid Email" if email is not in the correct format', () => {
    req.body.email = 'invalid-email';

    register(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith('Invalid Email');
  });

  it('calls the next function if all credentials are present and email is valid', () => {
    req.body.email = 'test@example.com';

    register(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

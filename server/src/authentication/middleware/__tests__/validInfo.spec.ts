import { validInfo } from '../validInfo';

describe('validInfo', () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = {
      path: '/register',
      body: {
        email: 'test@example.com',
        name: 'Test User',
        password: 'C0mplexP@ss',
      },
    } as any;
    res = {
      json: jest.fn().mockReturnValue('Missing Credentials'),
      status: jest.fn().mockReturnThis(),
    } as any;
    next = jest.fn();
  });

  it('returns "Missing Credentials" if any credentials are missing', () => {
    const { email, name, password } = req.body;
    delete req.body.email;

    validInfo(req, res, next);

    expect(res.json).toHaveBeenCalledWith('Missing Credentials');
  });

  it('returns "Invalid Email" if email is not in the correct format', () => {
    req.body.email = 'invalid-email';

    validInfo(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith('Invalid Email');
  });

  it('returns "Invalid Password" if password is not in the correct format', () => {
    req.body.password = 'invalid-password';

    validInfo(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith('Invalid Password');
  });

  it('calls the next function if all credentials are present and email is valid', () => {
    validInfo(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

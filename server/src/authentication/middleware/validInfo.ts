import { Request, Response, NextFunction } from 'express';

function validInfo(req: Request, res: Response, next: NextFunction) {
  const { email, name, password } = req.body;

  if (req.path === '/register') {
    if (![email, name, password].every(Boolean)) {
      return res.json('Missing Credentials');
    }
  }

  if (req.path === '/login') {
    if (![email, password].every(Boolean)) {
      return res.json('Missing Credentials');
    }
  }

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json('Invalid Email');
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json('Invalid Password');
  }

  next();
}

export { validInfo };
validInfo;

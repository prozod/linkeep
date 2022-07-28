import { Request, Response, NextFunction } from 'express';

require('dotenv').config();
const jwt = require('jsonwebtoken');

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers['authorization'];
  const cookie = req.cookies['access'];
  const token = header && header.split(' ')[1];
  console.log('authToken or cookie coming from client', token, cookie);
  console.log('authTokenENV from server', process.env.JWT_ACCESS_TOKEN);
  // if (!header || token == null)
  //   return res
  //     .status(403)
  //     .send('Authorization Bearer token or HTTPOnly Cookie is missing!');

  jwt.verify(
    token ? token : cookie,
    process.env.JWT_ACCESS_TOKEN,
    (err: any, user: any) => {
      if (err) return res.status(403).send(err);
      req.body = user;
      next();
    }
  );
};

import { Request, Response, NextFunction } from 'express';

require('dotenv').config();
const jwt = require('jsonwebtoken');

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers['authorization'];
  const token = header && header.split(' ')[1];
  console.log('authTokenMiddleware', header);
  console.log('authTokenENV', process.env.JWT_ACCESS_TOKEN);
  if (token == null) return res.status(401);

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err: any, user: any) => {
    if (err) return res.status(403).send(err);
    req.body = user;
    next();
  });
};

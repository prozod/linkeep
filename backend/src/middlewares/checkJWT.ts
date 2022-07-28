import { Request, Response, NextFunction } from 'express';
import { generateAccessToken } from '../utils/tokenUtils';
require('dotenv').config();
const jwt = require('jsonwebtoken');

export const checkJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies['refresh'];
  const accessToken = req.cookies['access'];
  console.log('checkExisting: Checking for accces or refresh token.');
  if (refreshToken == null)
    return res.status(401).send('Non-existent refresh token on client-side.');

  jwt.verify(
    accessToken,
    process.env.JWT_ACCESS_TOKEN,
    (err: any, user: any) => {
      if (err) {
        console.log('Local access JWT expired, trying to refresh it.');

        jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_TOKEN,
          (err: any, data: any) => {
            console.log(refreshToken);
            if (err) {
              return res.status(403).send({
                message: 'Failed to generate new access token.',
                error: err,
              });
            }

            const newAccessToken = generateAccessToken({
              id: data?.id,
              name: data?.name,
              email: data?.email,
            });

            req.body = {
              id: data?.id,
              name: data?.name,
              email: data?.email,
              access: newAccessToken,
            };
          }
        );
        next();
      } else {
        req.body = user;
        next();
      }
    }
  );
};

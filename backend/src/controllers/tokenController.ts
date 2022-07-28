import { NextFunction, Request, Response } from 'express';
import { generateAccessToken } from '../utils/tokenUtils';
require('dotenv').config();
const jwt = require('jsonwebtoken');

export const checkExistingRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies['refresh'];
  const accessToken = req.cookies['access'];
  if (refreshToken == null)
    return res.status(401).send('Non-existent refresh token on client-side.');
  console.log('tokenController refreshToken', refreshToken);
  //INFO: Check if the access token is still available, if it is, return the data... else try to generate a new one using the refresh token  available, if that fails --> throw an Error.
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
            console.log('Access JWT refreshed successfully.');

            res.cookie('access', newAccessToken, {
              httpOnly: true,
              sameSite: 'strict',
              // secure: true, //localhost is http
            });
            res.send({
              id: data?.id,
              name: data?.name,
              email: data?.email,
              access: newAccessToken,
            });
          }
        );
        next();
      } else {
        res.send({ ...user, access: accessToken });
        next();
      }
    }
  );
};

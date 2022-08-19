import { Request, Response, NextFunction } from 'express';
import { UserTokenInfoDTO } from '../models/auth.dto';
import { generateAccessToken } from '../utils/tokenUtils';
require('dotenv').config();
const jwt = require('jsonwebtoken');

export const validateExistingJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies['refresh'];
  const accessToken = req.cookies['access'];

  // Checking if refresh token exists client-side (http-only cookie)
  if (refreshToken == null) {
    return res
      .status(401)
      .send('Non-existent refresh token on client-side, please log in.');
  } else {
    // Chjck if access token exists in client-side (http-only cookie)
    jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN,
      (err: unknown, data: UserTokenInfoDTO) => {
        if (err) {
          console.log('Local access JWT expired, trying to refresh it.');

          // If client-side access token is invalid -->
          // Verify the refresh token stored in the cookies, if that is valid --> generate a brand new access token based on it, else log out.
          jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_TOKEN,
            (err: unknown, data: UserTokenInfoDTO) => {
              if (err) {
                return res.status(401).send({
                  message: 'Failed to generate new access token.',
                  error: err,
                });
              }

              const newAccessToken = generateAccessToken({
                id: data?.id,
                name: data?.name,
                email: data?.email,
              });

              res.cookie('access', newAccessToken, {
                // httpOnly: true, // im accessing it client side to read the user info (nothing sensitive, just email and userid)
                // sameSite: 'strict', // host port is not the same, strict implies same address, same port, same everything (try a proxy)
                sameSite: 'none',
                maxAge: 900 * 1000,
                secure: true, //localhost is http
              });

              req.body = { ...data, ...req.body };
            }
          );
          next();
        } else {
          req.body = { ...data, ...req.body };
          next();
        }
      }
    );
  }
};

// login flow, see wtf this access token is here??
// do we need it here? whats up with the refresh in cookies? do we store that there? confusing
// rewrite shit to class constructors yuo cunt

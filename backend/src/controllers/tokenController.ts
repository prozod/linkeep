import { Request, Response } from 'express';
import { z } from 'zod';
import { UserTokenInfoDTO } from '../models/auth.dto';
import { generateAccessToken } from '../utils/tokenUtils';
const jwt = require('jsonwebtoken');

console.log('NODE ENVVVVVV IN TOKENCTRL', process.env.NODE_ENV);
console.log('DB USED:', process.env.DATABASE_URL);

const cookieType = z.object({
  refresh: z.string(),
});

export const checkExistingRefreshToken = async (
  req: Request,
  res: Response
) => {
  const parsedCookieRequest = cookieType.safeParse(req.cookies);
  if (parsedCookieRequest.success) {
    const refreshToken = req.cookies['refresh'];
    const accessToken = req.cookies['access'];
    // Checking if refresh token exists client-side (http-only cookie)

    if (refreshToken == null) {
      return res
        .status(401)
        .send('Non-existent refresh token on client-side, please log in.');
    } else {
      // Check if access token exists in client-side (http-only cookie)
      jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_TOKEN,
        (err: unknown, data: UserTokenInfoDTO) => {
          if (err) {
            res.clearCookie('access');
            console.log('Local access JWT expired, trying to refresh it.');

            // If client-side access token is invalid -->
            // Verify the refresh token stored in the cookies, if that is valid --> generate a brand new access token based on it, else log out.
            jwt.verify(
              refreshToken,
              process.env.JWT_REFRESH_TOKEN,
              (err: unknown, data: UserTokenInfoDTO) => {
                if (err) {
                  res.clearCookie('refresh');
                  res.clearCookie('access');
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

                res.cookie('access', newAccessToken, {
                  // httpOnly: true, // im accessing it client side to read the user info (nothing sensitive, just email and userid)
                  // sameSite: 'strict', // host port is not the same, strict implies same address, same port, same everything (try a proxy)
                  sameSite: 'none',
                  maxAge: 900 * 1000,
                  secure: true, //localhost is http
                });

                res.status(200).send({
                  message:
                    'Refresh token is valid, a new access token was generated successfully',
                });
              }
            );
          } else {
            res.status(200).send({ message: 'access valid, go on pal!' });
          }
        }
      );
    }
  } else {
    res.status(401).send({ ...parsedCookieRequest.error });
  }
};

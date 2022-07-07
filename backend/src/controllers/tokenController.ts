import { Request, Response } from 'express';
import { generateAccessToken } from '../utils/tokenUtils';
require('dotenv').config();
const jwt = require('jsonwebtoken');

export const checkExistingRefreshToken = async (
  req: Request,
  res: Response
) => {
  const refreshToken = req.cookies['refresh'];
  console.log(refreshToken);
  if (refreshToken == null) return res.sendStatus(401);

  // make db call and check if refreshtoken existss
  // console.log('checkExistingRefreshToken:', req.cookies['refreshToken']);
  jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, data) => {
    if (err) return res.sendStatus(401);

    const newlyGeneratedAccessToken = generateAccessToken({
      id: data?.id,
      name: data?.name,
      email: data?.email,
    });

    res.send({
      user: { id: data?.id, name: data?.name, email: data?.email },
      access: newlyGeneratedAccessToken,
    });
  });
};

import { UserTokenInfoDTO } from '../models/auth.dto';

require('dotenv').config();
const jwt = require('jsonwebtoken');

export const generateAccessToken = (data: UserTokenInfoDTO): void =>
  jwt.sign(data, process.env.JWT_ACCESS_TOKEN, { expiresIn: '15s' });

export const generateRefreshToken = (data: UserTokenInfoDTO) =>
  jwt.sign(data, process.env.JWT_REFRESH_TOKEN, { expiresIn: '30d' });

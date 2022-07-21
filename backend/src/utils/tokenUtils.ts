import { Request, Response, NextFunction } from 'express';

require('dotenv').config();
const jwt = require('jsonwebtoken');

export const generateAccessToken = (data: any) =>
  jwt.sign(data, process.env.JWT_ACCESS_TOKEN, { expiresIn: '15m' });

export const generateRefreshToken = (data: any) =>
  jwt.sign(data, process.env.JWT_REFRESH_TOKEN);

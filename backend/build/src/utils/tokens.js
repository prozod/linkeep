"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const generateAccessToken = (data) => jwt.sign(data, process.env.JWT_ACCESS_TOKEN, { expiresIn: '15s' });
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (data) => jwt.sign(data, process.env.JWT_REFRESH_TOKEN);
exports.generateRefreshToken = generateRefreshToken;

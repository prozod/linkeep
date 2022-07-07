"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const authenticateToken = (req, res, next) => {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];
    console.log('authTokenMiddleware', header);
    console.log('authTokenENV', process.env.JWT_ACCESS_TOKEN);
    if (token == null)
        return res.status(401);
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
        if (err)
            return res.status(403).send(err);
        req.body = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
